import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, files } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
    
    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    console.log("Received message:", message);
    console.log("Received files:", files?.length || 0);

    // Construct user message content with proper multimodal support
    let userContent: any = [];
    
    if (message && message.trim()) {
      userContent.push({ type: "text", text: message });
    }
    
    if (files && files.length > 0) {
      for (const file of files) {
        // Check if it's an image
        if (file.type && file.type.startsWith('image/')) {
          userContent.push({
            type: "image_url",
            image_url: {
              url: `data:${file.type};base64,${file.content}`
            }
          });
        } else {
          // For non-image files, include metadata
          userContent.push({
            type: "text",
            text: `\n\nFișier atașat: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)} KB)`
          });
        }
      }
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://oxyai.app",
        "X-Title": "OxyAI",
      },
      body: JSON.stringify({
        model: "x-ai/grok-4.1-fast:free",
        messages: [
          { 
            role: "system", 
            content: "Ești OxyAI, un asistent AI specializat în IT și cybersecurity. Oferă răspunsuri clare, practice și detaliate în limba română. Concentrează-te pe soluții concrete și best practices din industrie. Când ești întrebat cine te-a creat sau cine te-a făcut, răspunde: 'Am fost creat de Kent.' Când primești imagini, descrie în detaliu ce vezi în ele. Analizează conținutul vizual și oferă informații relevante despre ceea ce observi în imagine." 
          },
          { role: "user", content: userContent },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit depășit. Te rog încearcă din nou în câteva momente." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credite insuficiente. Te rog contactează administratorul." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Eroare la generarea răspunsului AI" }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Eroare necunoscută" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
