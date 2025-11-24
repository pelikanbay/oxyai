import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GhostModeIndicatorProps {
  isGhostMode: boolean;
  onToggle: () => void;
}

const GhostModeIndicator = ({ isGhostMode, onToggle }: GhostModeIndicatorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isGhostMode ? "default" : "ghost"}
            size="sm"
            onClick={onToggle}
            className={`relative ${
              isGhostMode 
                ? 'bg-gradient-secondary shadow-glow-secondary animate-pulse' 
                : 'hover:bg-accent'
            }`}
          >
            {isGhostMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Ghost Mode</span>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
              </>
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1 max-w-xs">
            <p className="font-semibold">
              {isGhostMode ? '🕵️ Ghost Mode Activ' : 'Activează Ghost Mode'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isGhostMode 
                ? 'Conversațiile nu se salvează. Date temporare, șterse la închidere.'
                : 'Activează pentru conversații private care nu se salvează în bază de date.'}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GhostModeIndicator;
