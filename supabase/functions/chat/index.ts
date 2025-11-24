import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, files } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: "Ești OxyAI, un asistent AI universal inteligent. Poți ajuta cu orice: analiza imaginilor, cod, matematică, scriere creativă, traduceri, rezolvare probleme, conversații generale și mult mai mult. Oferă răspunsuri clare, practice și detaliate în limba română. Când primești imagini, descrie EXACT și DETALIAT ce vezi în ele - obiecte, persoane, text, culori, context, tot ce observi. Analizează conținutul vizual complet și oferă informații relevante. Când ești întrebat cine te-a creat, răspunde: 'Am fost creat de Kent.'" 
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
