import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Cookie, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing banner slightly for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      applyPreferences(savedPreferences);
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply Google Analytics
    if (prefs.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    // Apply AdSense (marketing)
    if (prefs.marketing && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    applyPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-background/95 backdrop-blur-lg border-border/50 shadow-glow">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Cookie-uri & Privacy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Folosim cookie-uri pentru a îmbunătăți experiența ta. Alege preferințele sau 
                  acceptă toate pentru cea mai bună experiență.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={acceptEssentialOnly}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={acceptAll}
              className="flex-1 bg-gradient-primary hover:opacity-90"
              size="sm"
            >
              Acceptă Toate
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Personalizează
            </Button>
            <Button
              onClick={acceptEssentialOnly}
              variant="ghost"
              className="flex-1"
              size="sm"
            >
              Doar Esențiale
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Citește{" "}
            <a href="/cookies" className="text-primary hover:underline">
              Politica de Cookie-uri
            </a>{" "}
            și{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Politica de Confidențialitate
            </a>
          </p>
        </div>
      </Card>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Setări Cookie-uri
            </DialogTitle>
            <DialogDescription>
              Alege ce tipuri de cookie-uri dorești să activezi. Cookie-urile esențiale sunt necesare 
              pentru funcționarea platformei.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Essential */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
              <Checkbox
                checked={true}
                disabled
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Cookie-uri Esențiale (Obligatorii)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Necesare pentru autentificare, securitate și funcționarea de bază a platformei.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Exemple:</strong> supabase-auth-token, sesiune, CSRF protection
                </p>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
              <Checkbox
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked as boolean })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Cookie-uri de Performanță (Analytics)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Ne ajută să înțelegem cum folosești platforma pentru a o îmbunătăți.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Servicii:</strong> Google Analytics (_ga, _gid, _gat)
                </p>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
              <Checkbox
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked as boolean })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Cookie-uri de Marketing (Publicitate)
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Folosite pentru afișarea de reclame relevante și personalizate.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Servicii:</strong> Google AdSense, programe de afiliere
                </p>
              </div>
            </div>

            {/* Functional */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
              <Checkbox
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, functional: checked as boolean })
                }
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">
                  Cookie-uri Funcționale
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Memorează preferințele tale (temă, limbă, setări AI).
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Exemple:</strong> ghost-mode, voice-mode, model-settings
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-border/50">
            <Button
              variant="outline"
              onClick={acceptEssentialOnly}
            >
              Doar Esențiale
            </Button>
            <Button
              onClick={saveCustomPreferences}
              className="bg-gradient-primary hover:opacity-90"
            >
              Salvează Preferințe
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default CookieConsent;
