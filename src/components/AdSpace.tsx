import { useEffect, useRef } from "react";
import { DollarSign } from "lucide-react";

interface AdSpaceProps {
  id: string;
  format?: "horizontal" | "vertical" | "square";
  className?: string;
}

/**
 * AdSpace Component - Gata pentru monetizare
 * 
 * PAȘI PENTRU MONETIZARE:
 * 
 * 1. GOOGLE ADSENSE (Recomandat):
 *    - Înregistrează-te la https://www.google.com/adsense
 *    - Obține codul tău AdSense Publisher ID (ca-pub-XXXXXXXXXXXXX)
 *    - Înlocuiește "ca-pub-XXXXXXXXXXXXX" de mai jos cu ID-ul tău
 *    - Adaugă acest script în index.html în <head>:
 *      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXX" crossorigin="anonymous"></script>
 * 
 * 2. MEDIA.NET (Alternativă la AdSense):
 *    - Înregistrează-te la https://www.media.net
 *    - Obține codul tău de integrare
 * 
 * 3. RECLAME DIRECTE:
 *    - Contactează companii direct pentru sponsorizări
 *    - Înlocuiește conținutul cu bannere custom
 * 
 * POTENȚIAL DE VENIT:
 * - 1,000 vizitatori/zi = $1-5/zi ($30-150/lună)
 * - 10,000 vizitatori/zi = $10-50/zi ($300-1,500/lună)
 * - 100,000 vizitatori/zi = $100-500/zi ($3,000-15,000/lună)
 */

const AdSpace = ({ id, format = "horizontal", className = "" }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-load AdSense script if available
    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log("AdSense not loaded yet - Add your AdSense code to start earning!");
    }
  }, []);

  const getAdStyles = () => {
    switch (format) {
      case "horizontal":
        return "min-h-[120px] md:min-h-[90px]";
      case "vertical":
        return "min-h-[600px] w-[160px]";
      case "square":
        return "min-h-[280px]";
      default:
        return "min-h-[120px]";
    }
  };

  return (
    <div className={`ad-space my-6 ${className}`}>
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-2">
        <DollarSign className="w-3 h-3" />
        <span>Sponsored</span>
      </div>
      <div
        ref={adRef}
        className={`bg-gradient-to-br from-muted/50 to-muted/30 border border-border rounded-xl flex items-center justify-center overflow-hidden ${getAdStyles()}`}
      >
        {/* Google AdSense Integration */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXX" // 👈 ÎNLOCUIEȘTE CU ID-UL TĂU ADSENSE!
          data-ad-slot={id}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        
        {/* Fallback content - shown until you add your AdSense code */}
        <div className="text-center p-6 text-muted-foreground">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <p className="font-semibold text-sm mb-1">Spațiu Publicitar Disponibil</p>
          <p className="text-xs max-w-sm mx-auto leading-relaxed">
            Înlocuiește "ca-pub-XXXXXXXXXXXXX" cu ID-ul tău Google AdSense pentru a începe să câștigi bani
          </p>
          <div className="mt-3 text-xs text-primary">
            Potențial: $1-5 per 1,000 vizite
          </div>
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
