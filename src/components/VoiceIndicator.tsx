import { Mic, Volume2 } from "lucide-react";

interface VoiceIndicatorProps {
  isListening: boolean;
  isSpeaking: boolean;
}

const VoiceIndicator = ({ isListening, isSpeaking }: VoiceIndicatorProps) => {
  if (!isListening && !isSpeaking) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-glow-accent px-4 py-3 flex items-center gap-3">
        {isListening && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Mic className="w-5 h-5 text-accent" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Ascult...</span>
              <span className="text-xs text-muted-foreground">Vorbește acum</span>
            </div>
          </div>
        )}
        
        {isSpeaking && (
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-secondary animate-pulse" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Vorbesc...</span>
              <span className="text-xs text-muted-foreground">AI răspunde</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceIndicator;
