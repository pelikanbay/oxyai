import { MessageSquare, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Scrie Întrebarea",
    description: "Descrie provocarea ta IT sau cybersecurity în câteva cuvinte simple"
  },
  {
    icon: Sparkles,
    title: "2. AI Analizează",
    description: "Algoritmii noștri AI procesează întrebarea și caută cele mai bune soluții"
  },
  {
    icon: CheckCircle,
    title: "3. Primești Răspunsul",
    description: "Obții idei concrete și soluții practice instant, 100% gratuit"
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
            Trei pași simpli pentru a obține soluții AI instant
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
      </div>
    </section>
  );
};

export default HowItWorks;
