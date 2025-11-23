import { ExternalLink } from "lucide-react";

const Monetization = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card rounded-2xl border border-border p-8 text-center shadow-card">
          <h3 className="text-2xl font-bold mb-4">Susține OxyAI</h3>
          <p className="text-muted-foreground mb-6">
            Acest tool este gratuit și va rămâne gratuit. Dacă vrei să susții dezvoltarea, poți explora partenerii noștri.
          </p>
          
          {/* Spațiu pentru reclame / affiliate links */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a 
              href="#" 
              className="block p-6 bg-muted rounded-xl border border-border hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Partener Recomandat</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                Spațiu pentru link affiliate sau reclamă
              </p>
            </a>
            
            <a 
              href="#" 
              className="block p-6 bg-muted rounded-xl border border-border hover:border-primary/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Serviciu Premium</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground">
                Spațiu pentru link affiliate sau reclamă
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Monetization;
