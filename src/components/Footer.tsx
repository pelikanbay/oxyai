import { Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Linkuri afiliate reale pentru a genera venituri
  const affiliateLinks = [
    {
      name: "NordVPN",
      description: "VPN securizat - 70% discount",
      url: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=YOUR_AFFILIATE_ID", // Înlocuiește YOUR_AFFILIATE_ID cu ID-ul tău de la nordvpn.com/ro/affiliate/
      category: "🔒 Securitate"
    },
    {
      name: "Udemy",
      description: "Cursuri IT & Programare",
      url: "https://www.udemy.com/?ranMID=39197&ranEAID=YOUR_AFFILIATE_ID&ranSiteID=YOUR_SITE_ID", // Înlocuiește IDs de la udemy.com/affiliate/
      category: "📚 Educație"
    },
    {
      name: "Hostinger",
      description: "Hosting web ieftin",
      url: "https://www.hostinger.com?REFERRALCODE=YOUR_CODE", // Înlocuiește YOUR_CODE de la hostinger.com/affiliates
      category: "🌐 Hosting"
    },
    {
      name: "Amazon",
      description: "Tech & Cărți IT",
      url: "https://www.amazon.com/ref=as_li_ss_tl?ie=UTF8&linkCode=ll2&tag=YOUR_TAG&linkId=YOUR_LINK_ID", // Înlocuiește de la affiliate-program.amazon.com
      category: "🛒 Shopping"
    }
  ];

  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Affiliate Links Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-4 text-center text-muted-foreground">
            🎁 Resurse Recomandate
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
            <a 
              href="mailto:contact@oxyai.app" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 OxyAI. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
