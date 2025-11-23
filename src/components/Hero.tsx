import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

const Hero = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulare răspuns AI - va fi înlocuit cu integrare Lovable AI
    setTimeout(() => {
      setOutput(`Aceasta este o idee generată pentru întrebarea ta: "${input}"\n\nRăspunsul complet va fi generat de AI-ul OxyAI. Aici vei primi sugestii detaliate despre IT și cybersecurity bazate pe întrebarea ta.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Tool AI 100% Gratuit</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Idei IT și Cybersecurity
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Instant, Gratis
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Obține răspunsuri și soluții pentru orice provocare IT sau cybersecurity în câteva secunde
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="ai-input" className="block text-sm font-medium mb-2">
                Întreabă OxyAI orice despre IT și Cybersecurity
              </label>
              <Textarea
                id="ai-input"
                placeholder="Ex: Care sunt cele mai bune practici pentru securizarea unei aplicații web?"
                className="min-h-[120px] bg-background border-border resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 text-lg shadow-glow transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generez răspuns...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generează Răspuns
                </>
              )}
            </Button>

            {output && (
              <div className="mt-6 p-6 bg-muted rounded-xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Răspuns OxyAI
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{output}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
