import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LegalDisclaimerBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("legal-disclaimer-dismissed");
    if (!dismissed) {
      // Show after 2 seconds for better UX
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const dismissBanner = () => {
    localStorage.setItem("legal-disclaimer-dismissed", "true");
    localStorage.setItem("legal-disclaimer-date", new Date().toISOString());
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Card className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-lg z-50 bg-destructive/10 backdrop-blur-lg border-destructive/30 shadow-glow">
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-sm">
                ⚠️ Platformă în Dezvoltare - Operator Minor
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                RecyeAI este operat de o persoană <strong className="text-foreground">sub 18 ani</strong>.
                Platforma este în regim BETA, iar operatorul lucrează la înființarea unei entități legale (SRL/PFA) 
                pentru conformitate GDPR completă.
              </p>
              <div className="bg-background/50 rounded p-2 space-y-1 text-xs">
                <p className="font-semibold text-foreground">Recomandări importante:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                  <li>Folosește <span className="text-primary font-medium">Ghost Mode</span> pentru confidențialitate</li>
                  <li>NU introduce date sensibile sau confidențiale</li>
                  <li>Reprezentant legal: contact@recyeai.com</li>
                </ul>
              </div>
              <p className="text-xs text-muted-foreground">
                Vezi{" "}
                <a href="/privacy" className="text-primary hover:underline font-medium">
                  Politica de Confidențialitate
                </a>
                {" "}și{" "}
                <a href="/dpa" className="text-primary hover:underline font-medium">
                  DPA
                </a>
                {" "}pentru detalii complete.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={dismissBanner}
            className="flex-shrink-0 h-6 w-6"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={dismissBanner}
            size="sm"
            className="bg-destructive/20 hover:bg-destructive/30 text-foreground text-xs"
          >
            Am înțeles
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LegalDisclaimerBanner;
