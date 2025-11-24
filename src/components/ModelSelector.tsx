import { useState } from "react";
import { Check, ChevronDown, Info, Zap, Clock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useModelSettings, AIModel } from "@/hooks/useModelSettings";

const ModelSelector = () => {
  const {
    selectedModel,
    temperature,
    setSelectedModel,
    setTemperature,
    getSelectedModelInfo,
    availableModels,
  } = useModelSettings();

  const [showSettings, setShowSettings] = useState(false);
  const currentModel = getSelectedModelInfo();

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'fast': return <Zap className="w-3 h-3 text-accent" />;
      case 'medium': return <Clock className="w-3 h-3 text-primary" />;
      case 'slow': return <Brain className="w-3 h-3 text-secondary" />;
      default: return <Zap className="w-3 h-3" />;
    }
  };

  const getTemperatureLabel = (temp: number) => {
    if (temp <= 0.3) return "Precis";
    if (temp <= 0.7) return "Balansat";
    if (temp <= 1.0) return "Creativ";
    return "Foarte Creativ";
  };

  return (
    <div className="flex items-center gap-2">
      {/* Model Selector Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
          >
            <Brain className="w-4 h-4" />
            <span className="hidden md:inline text-xs font-medium truncate max-w-[120px]">
              {currentModel?.name || 'Select Model'}
            </span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-[320px] md:w-[400px] bg-card/95 backdrop-blur-sm border-border z-50"
        >
          <DropdownMenuLabel className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Models (Free)
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {availableModels.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className="flex flex-col items-start gap-1 p-3 cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{model.name}</span>
                  {model.id === selectedModel && (
                    <Check className="w-4 h-4 text-accent" />
                  )}
                </div>
                {getSpeedIcon(model.speed)}
              </div>
              
              <span className="text-xs text-muted-foreground line-clamp-2">
                {model.description}
              </span>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {model.capabilities.slice(0, 3).map((cap) => (
                  <Badge 
                    key={cap} 
                    variant="secondary" 
                    className="text-[10px] px-1.5 py-0"
                  >
                    {cap}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  {model.contextWindow}
                </Badge>
              </div>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <div className="p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Info className="w-3 h-3" />
              <span className="font-medium">Rate Limits:</span>
            </div>
            <span>
              Modele gratuite pot avea limite de cereri per minut. Pentru rate limits mai mari, consideră upgrade la modele paid.
            </span>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings Toggle */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="w-8 h-8"
            >
              <Info className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Temperature Slider (shown when settings open) */}
      {showSettings && (
        <div className="flex items-center gap-3 px-3 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg">
          <div className="flex flex-col gap-1 min-w-[100px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Creativitate</span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {getTemperatureLabel(temperature)}
              </Badge>
            </div>
            <Slider
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              min={0}
              max={1.5}
              step={0.1}
              className="w-[100px]"
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {temperature.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
