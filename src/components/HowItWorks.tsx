import { MessageSquare, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Pune Întrebarea",
    description: "Scrie orice întrebare sau încarcă o imagine pentru analiză - subiect, problemă sau idee"
  },
  {
    icon: Sparkles,
    title: "2. AI Procesează",
    description: "Inteligența artificială analizează cererea ta și generează răspunsuri personalizate instant"
  },
  {
    icon: CheckCircle,
    title: "3. Obții Rezultate",
    description: "Primești răspunsuri detaliate, analize complete și soluții concrete în secunde"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cum Funcționează
            <span className="block text-primary">OxyAI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trei pași simpli pentru a obține răspunsuri AI instant la orice întrebare
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                <div className="bg-card rounded-2xl border border-border p-8 h-full hover:border-primary/50 transition-all hover:shadow-card">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-all">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: "🖼️", title: "Analiză Imagini", desc: "Descrie și analizează orice imagine" },
            { emoji: "💻", title: "Cod & Tech", desc: "Generare cod, debugging și soluții" },
            { emoji: "✍️", title: "Scriere Creativă", desc: "Articole, povești și conținut" },
            { emoji: "🌍", title: "Traduceri", desc: "Traduceri precise în orice limbă" },
          ].map((feature, i) => (
            <div key={i} className="bg-muted/50 rounded-xl p-6 border border-border hover:border-primary/30 transition-all">
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
