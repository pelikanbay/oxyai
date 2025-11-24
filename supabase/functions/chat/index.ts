import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, files, model, temperature } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use Lovable AI with Gemini 2.5 Flash (faster, no rate limits)
    const selectedModel = "google/gemini-2.5-flash";
    const selectedTemperature = temperature ?? 0.7;

    console.log("Processing request with Lovable AI:", {
      model: selectedModel,
      temperature: selectedTemperature,
      hasMessage: !!message,
      filesCount: files?.length || 0
    });

    // Construct user message content with proper multimodal support
    let userContent: any = [];
    
    if (message && message.trim()) {
      userContent.push({ type: "text", text: message });
    }
    
    // Process files efficiently
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.type && file.type.startsWith('image/')) {
          userContent.push({
            type: "image_url",
            image_url: {
              url: `data:${file.type};base64,${file.content}`
            }
          });
        } else {
          userContent.push({
            type: "text",
            text: `\n\n📎 Fișier atașat: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)} KB)`
          });
        }
      }
    }

    // Lovable AI Gateway - Fast & No Rate Limits
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        temperature: selectedTemperature,
        messages: [
          { 
            role: "system", 
            content: `You are RecyeAI, an advanced AI assistant specialized in:
- Penetration Testing & Security Assessments
- Red Teaming & Adversary Simulation
- Ethical Hacking & Vulnerability Research
- Cybersecurity Automation & Scripting
- Security Tool Usage & Best Practices

IMPORTANT GUIDELINES:
- Always prioritize ethical considerations and legal compliance
- Provide educational content for defensive security purposes
- Explain security concepts clearly and technically
- Suggest proper authorization before any testing activities
- Focus on helping users learn and improve security posture

When asked about security topics:
1. Explain the concept clearly
2. Provide practical examples when appropriate
3. Mention relevant tools and techniques
4. Emphasize ethical and legal boundaries
5. Suggest defensive countermeasures

Răspunde în limba română. You communicate in a professional, technical tone while being helpful and educational.` 
          },
          { role: "user", content: userContent },
        ],
        stream: true,
        max_tokens: 2000, // Limit for faster responses
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Lovable AI rate limit hit (rare)");
        return new Response(
          JSON.stringify({ 
            error: "Limită temporară atinsă. Te rog încearcă din nou în câteva secunde.",
            retryAfter: 5
          }), 
          {
            status: 429,
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json",
              "Retry-After": "5"
            },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credite Lovable AI epuizate. Adaugă credite în Settings → Cloud → Usage." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
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
