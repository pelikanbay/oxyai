import { useEffect, useRef } from "react";

interface AdSpaceProps {
  id: string;
  format?: "horizontal" | "vertical" | "square";
  className?: string;
}

const AdSpace = ({ id, format = "horizontal", className = "" }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-load AdSense script if available
    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log("AdSense not loaded yet");
    }
  }, []);

  const getAdStyles = () => {
    switch (format) {
      case "horizontal":
        return "min-h-[90px] md:min-h-[100px]";
      case "vertical":
        return "min-h-[600px] w-[160px]";
      case "square":
        return "min-h-[250px]";
      default:
        return "min-h-[90px]";
    }
  };

  return (
    <div className={`ad-space ${className}`}>
      <div className="text-xs text-muted-foreground text-center mb-1">Publicitate</div>
      <div
        ref={adRef}
        className={`bg-muted/30 border border-border rounded-lg flex items-center justify-center ${getAdStyles()}`}
      >
        {/* Placeholder for AdSense or other ad networks */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXX" // Replace with your AdSense ID
          data-ad-slot={id}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        
        {/* Fallback content if no ads */}
        <div className="text-center p-4 text-muted-foreground text-sm">
          <p>Spațiu publicitar</p>
          <p className="text-xs mt-1">
            Adaugă codul tău Google AdSense aici pentru venituri
          </p>
        </div>
      </div>
    </div>
  );
};

// Declare adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdSpace;
