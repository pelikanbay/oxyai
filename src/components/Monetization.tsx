import { ExternalLink, Shield, Zap, TrendingUp, Code } from "lucide-react";
import AdSpace from "./AdSpace";

const Monetization = () => {
  // Real affiliate programs and monetization opportunities
  const affiliatePrograms = [
    {
      name: "NordVPN Affiliate",
      description: "70% comision pentru fiecare vânzare de VPN securizat",
      icon: Shield,
      link: "https://nordvpn.com/ro/affiliate/",
      commission: "70%",
      color: "text-blue-500"
    },
    {
      name: "Udemy Courses",
      description: "15% comision pentru cursuri de IT și Cybersecurity",
      icon: Code,
      link: "https://www.udemy.com/affiliate/",
      commission: "15%",
      color: "text-purple-500"
    },
    {
      name: "Digital Ocean",
      description: "$25 pentru fiecare referral activ",
      icon: Zap,
      link: "https://www.digitalocean.com/referral-program",
      commission: "$25/user",
      color: "text-cyan-500"
    },
    {
      name: "Amazon Associates",
      description: "Până la 10% din produse tech și cărți IT",
      icon: TrendingUp,
      link: "https://affiliate-program.amazon.com/",
      commission: "3-10%",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Top Ad Space */}
        <div className="mb-8">
          <AdSpace id="top-ad-1" format="horizontal" />
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              Susține OxyAI & Câștigă Venituri
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              OxyAI este 100% gratuit. Poți genera venituri promovând servicii premium pentru IT și cybersecurity prin programele noastre affiliate.
            </p>
          </div>
          
          {/* Affiliate Programs Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {affiliatePrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <a 
                  key={index}
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-muted/50 rounded-xl border border-border hover:border-primary/50 transition-all group hover:shadow-glow"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`p-3 rounded-lg bg-background ${program.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-lg">{program.name}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                        Comision: {program.commission}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {program.description}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Middle Ad Space */}
          <div className="my-8">
            <AdSpace id="middle-ad-1" format="horizontal" />
          </div>

          {/* Monetization Tips */}
          <div className="mt-8 p-6 bg-gradient-primary/10 rounded-xl border border-primary/20">
            <h4 className="font-semibold text-lg mb-3">💰 Cum să generezi venituri maxime:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span><strong>Google AdSense:</strong> Adaugă codul tău AdSense în componentele AdSpace pentru reclame automate (recomandat pentru trafic mare)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span><strong>Affiliate Marketing:</strong> Înlocuiește link-urile de mai sus cu propriile tale link-uri affiliate pentru comisioane</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span><strong>Servicii Premium:</strong> Oferă consultanță sau servicii personalizate pentru utilizatorii avansați</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                <span><strong>Sponsorizări:</strong> Contactează companii de IT/Cybersecurity pentru sponsorizări directe</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-8">
          <AdSpace id="bottom-ad-1" format="horizontal" />
        </div>
      </div>
    </section>
  );
};

export default Monetization;
