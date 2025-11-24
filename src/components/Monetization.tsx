import { DollarSign, TrendingUp, Users, Zap, CreditCard, Code } from "lucide-react";
import AdSpace from "./AdSpace";
import { Button } from "./ui/button";

const Monetization = () => {
  const monetizationStrategies = [
    {
      name: "Google AdSense",
      description: "Integrează reclame automate și câștigă din fiecare vizitator. Potențial: $1-5 per 1000 vizite.",
      icon: TrendingUp,
      action: "Configurează AdSense",
      link: "https://www.google.com/adsense/start/",
      color: "text-green-500",
      potential: "$1-5 / 1000 vizite"
    },
    {
      name: "Subscripții Premium",
      description: "Oferă funcții avansate (mai multe mesaje, răspunsuri prioritare) prin abonament lunar.",
      icon: CreditCard,
      action: "Activează Stripe",
      potential: "$5-20 / user / lună",
      color: "text-blue-500"
    },
    {
      name: "Affiliate Marketing",
      description: "Promovează produse și servicii relevante și câștigă comisioane din vânzări.",
      icon: DollarSign,
      action: "Vezi Programe",
      potential: "5-50% comision",
      color: "text-purple-500"
    },
    {
      name: "API pentru Dezvoltatori",
      description: "Oferă acces API la platforma ta pentru dezvoltatori și companii.",
      icon: Code,
      action: "Creează API Key",
      potential: "$0.01-0.10 / request",
      color: "text-cyan-500"
    },
    {
      name: "Sponsorizări",
      description: "Contactează companii pentru sponsorizări directe și integrări brand.",
      icon: Users,
      action: "Contact Sponsori",
      potential: "$500-5000 / lună",
      color: "text-orange-500"
    },
    {
      name: "White Label",
      description: "Vinde versiuni personalizate ale platformei către alte companii.",
      icon: Zap,
      action: "Pachete Enterprise",
      potential: "$1000-10000 / client",
      color: "text-pink-500"
    }
  ];

  return (
    <section id="monetization" className="py-20 px-4 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto max-w-6xl">
        {/* Top Ad Space */}
        <div className="mb-12">
          <AdSpace id="monetization-top" format="horizontal" />
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 border border-primary/20 mb-6">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Strategii de Monetizare</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Transformă Traficul în
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Venituri Reale
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            6 metode dovedite pentru a genera venituri pasive din aplicația ta AI
          </p>
        </div>

        {/* Monetization Strategies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {monetizationStrategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div 
                key={index}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-all hover:shadow-glow group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-primary/10 flex items-center justify-center mb-4 ${strategy.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{strategy.name}</h3>
                
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full mb-3">
                  {strategy.potential}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {strategy.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-primary/50 transition-all"
                  onClick={() => strategy.link && window.open(strategy.link, '_blank')}
                >
                  {strategy.action}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Revenue Calculator */}
        <div className="bg-gradient-primary/10 rounded-2xl border border-primary/20 p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">💰 Calculator Potențial de Venit</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-background/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,000</div>
              <div className="text-sm text-muted-foreground mb-3">utilizatori zilnici</div>
              <div className="text-xs text-muted-foreground">
                <strong className="text-green-500">$30-150</strong> / zi din ads<br/>
                <strong className="text-blue-500">$100-500</strong> / lună subscripții<br/>
                <strong className="text-purple-500">$50-300</strong> / lună affiliate
              </div>
            </div>

            <div className="bg-background/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000</div>
              <div className="text-sm text-muted-foreground mb-3">utilizatori zilnici</div>
              <div className="text-xs text-muted-foreground">
                <strong className="text-green-500">$300-1,500</strong> / zi din ads<br/>
                <strong className="text-blue-500">$1,000-5,000</strong> / lună subscripții<br/>
                <strong className="text-purple-500">$500-3,000</strong> / lună affiliate
              </div>
            </div>

            <div className="bg-background/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100,000</div>
              <div className="text-sm text-muted-foreground mb-3">utilizatori zilnici</div>
              <div className="text-xs text-muted-foreground">
                <strong className="text-green-500">$3,000-15,000</strong> / zi din ads<br/>
                <strong className="text-blue-500">$10,000-50,000</strong> / lună subscripții<br/>
                <strong className="text-purple-500">$5,000-30,000</strong> / lună affiliate
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            * Estimări bazate pe date reale din industrie. Rezultatele pot varia.
          </p>
        </div>

        {/* Implementation Guide */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="text-2xl font-bold mb-6">🚀 Pași Pentru Implementare</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
              <div>
                <h4 className="font-semibold mb-1">Configurează Google AdSense</h4>
                <p className="text-sm text-muted-foreground">Creează cont AdSense, obține codul și integrează-l în componentele AdSpace existente</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
              <div>
                <h4 className="font-semibold mb-1">Activează Stripe pentru Subscripții</h4>
                <p className="text-sm text-muted-foreground">Integrează Stripe pentru a oferi planuri premium (mai multe mesaje, răspunsuri prioritare)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
              <div>
                <h4 className="font-semibold mb-1">Alătură-te Programelor Affiliate</h4>
                <p className="text-sm text-muted-foreground">Înregistrează-te la Amazon Associates, ShareASale, Impact și promovează produse relevante</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">4</div>
              <div>
                <h4 className="font-semibold mb-1">Creează Pachete API</h4>
                <p className="text-sm text-muted-foreground">Oferă acces API pentru dezvoltatori și companii care vor să integreze AI-ul tău</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">5</div>
              <div>
                <h4 className="font-semibold mb-1">Contactează Sponsori</h4>
                <p className="text-sm text-muted-foreground">Creează un media kit și contactează companii relevante pentru sponsorizări și partnerships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-12">
          <AdSpace id="monetization-bottom" format="horizontal" />
        </div>
      </div>
    </section>
  );
};

export default Monetization;
