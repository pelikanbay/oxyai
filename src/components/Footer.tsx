import { Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Linkuri afiliate relevante pentru cybersecurity
  const affiliateLinks = [
    {
      name: "NordVPN",
      description: "VPN securizat - 70% discount",
      url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_AFFILIATE_ID",
      category: "🔒 VPN"
    },
    {
      name: "Udemy Security",
      description: "Cursuri Pentesting & Hacking",
      url: "https://www.udemy.com/courses/it-and-software/network-and-security/?ranMID=39197&ranEAID=YOUR_ID",
      category: "📚 Training"
    },
    {
      name: "Kali Linux Tools",
      description: "Ghid complet security tools",
      url: "https://www.amazon.com/s?k=kali+linux+penetration+testing&tag=YOUR_TAG",
      category: "🛠️ Tools"
    },
    {
      name: "HackTheBox",
      description: "Platformă de practică pentesting",
      url: "https://www.hackthebox.com/",
      category: "🎯 Practice"
    }
  ];

  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Affiliate Links Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-4 text-center text-muted-foreground">
            🔐 Resurse Recomandate Cybersecurity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {affiliateLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-glow text-center"
              >
                <span className="text-xs text-primary font-medium">{link.category}</span>
                <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {link.name}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {link.description}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Link-uri afiliate - susținem proiectul prin comisioane mici
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Realizat cu
            </span>
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              de Kent
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Confidențialitate
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Termeni
            </Link>
            <Link 
              to="/cookies" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie-uri
            </Link>
            <Link 
              to="/dpa" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              DPA
            </Link>
            <a 
              href="mailto:contact@recyeai.com" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 RecyeAI. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
