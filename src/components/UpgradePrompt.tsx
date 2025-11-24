import { Crown, Zap, Shield, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UpgradePrompt = () => {
  const handleUpgrade = () => {
    // Open Stripe payment link
    window.open("https://buy.stripe.com/test_your_payment_link", "_blank");
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-6 h-6 text-primary" />
          <CardTitle className="text-foreground">Upgrade la Premium</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Deblocează funcționalități avansate și suport prioritar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Mesaje Nelimitate</p>
              <p className="text-sm text-muted-foreground">
                Fără limitări la numărul de conversații
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Modele AI Premium</p>
              <p className="text-sm text-muted-foreground">
                Acces la cele mai avansate modele AI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Suport Prioritar</p>
              <p className="text-sm text-muted-foreground">
                Răspunsuri rapide și asistență dedicată
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-foreground">9.99€</span>
            <span className="text-muted-foreground">/lună</span>
            <Badge variant="secondary" className="ml-auto">
              -20% Ofertă Lansare
            </Badge>
          </div>

          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade Acum
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-3">
            Poți anula oricând. Fără costuri ascunse.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpgradePrompt;
