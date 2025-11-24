import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Timer, RefreshCw } from "lucide-react";

interface RateLimitRetryProps {
  onRetry: () => void;
  onCancel: () => void;
  retryAfterSeconds?: number;
  autoRetry?: boolean;
}

export const RateLimitRetry = ({ 
  onRetry, 
  onCancel, 
  retryAfterSeconds = 60,
  autoRetry = true 
}: RateLimitRetryProps) => {
  const [countdown, setCountdown] = useState(retryAfterSeconds);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      if (autoRetry && !isRetrying) {
        setIsRetrying(true);
        onRetry();
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, autoRetry, isRetrying, onRetry]);

  const progress = ((retryAfterSeconds - countdown) / retryAfterSeconds) * 100;

  const handleManualRetry = () => {
    setIsRetrying(true);
    onRetry();
  };

  return (
    <Card className="p-6 bg-card border-warning/20 shadow-glow max-w-md mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warning/10 rounded-lg">
            <Timer className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h4 className="font-bold text-lg">Rate Limit Activ</h4>
            <p className="text-sm text-muted-foreground">
              Prea multe cereri. Auto-retry în {countdown}s
            </p>
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex gap-2">
          <Button
            onClick={handleManualRetry}
            disabled={isRetrying}
            className="flex-1"
            variant="default"
          >
            {isRetrying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Se încearcă...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Încearcă Acum
              </>
            )}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Anulează
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          💡 Tip: Modelele gratuite au limite. Așteaptă sau încearcă alt model.
        </p>
      </div>
    </Card>
  );
};
