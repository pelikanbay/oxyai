import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Zap, Crown } from "lucide-react";

const UsageTracker = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const FREE_LIMIT = 10; // Free requests per day

  useEffect(() => {
    loadUsageCount();
  }, []);

  const loadUsageCount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const today = new Date().toISOString().split('T')[0];
      const storageKey = `usage_${session.user.id}_${today}`;
      
      const savedCount = localStorage.getItem(storageKey);
      const count = savedCount ? parseInt(savedCount) : 0;
      
      setRequestCount(count);
      setShowUpgrade(count >= FREE_LIMIT);
    } catch (error) {
      console.error("Error loading usage:", error);
    }
  };

  const incrementUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const today = new Date().toISOString().split('T')[0];
      const storageKey = `usage_${session.user.id}_${today}`;
      
      const newCount = requestCount + 1;
      localStorage.setItem(storageKey, newCount.toString());
      setRequestCount(newCount);
      
      if (newCount >= FREE_LIMIT) {
        setShowUpgrade(true);
      }

      // Track for monetization analytics
      console.log(`User has made ${newCount} requests today`);
    } catch (error) {
      console.error("Error tracking usage:", error);
    }
  };

  if (!showUpgrade) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-card border-2 border-primary rounded-xl p-6 shadow-glow animate-in slide-in-from-bottom-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Upgrade la Premium</h4>
            <p className="text-sm text-muted-foreground">
              Ai folosit {requestCount}/{FREE_LIMIT} cereri gratuite astăzi
            </p>
          </div>
        </div>
        
        <ul className="space-y-2 mb-4 text-sm">
          <li className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Cereri nelimitate</span>
          </li>
          <li className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Prioritate la răspunsuri</span>
          </li>
          <li className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span>Suport dedicat 24/7</span>
          </li>
        </ul>

        <Button 
          className="w-full bg-gradient-primary hover:opacity-90"
          onClick={() => {
            // Implement premium upgrade flow
            console.log("Upgrade to premium clicked");
            window.open("https://buy.stripe.com/your-payment-link", "_blank");
          }}
        >
          Upgrade Acum - 9.99€/lună
        </Button>
        
        <button
          onClick={() => setShowUpgrade(false)}
          className="w-full text-xs text-muted-foreground mt-2 hover:text-foreground transition-colors"
        >
          Continuă cu limită gratuită
        </button>
      </div>
    </div>
  );
};

export { UsageTracker };
