import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const AdUnit = ({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '' 
}: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Check marketing consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      const preferences = JSON.parse(consent);
      setHasConsent(preferences.marketing === true);
    }

    // Listen for consent changes
    const handleStorage = () => {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        const preferences = JSON.parse(consent);
        setHasConsent(preferences.marketing === true);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (!hasConsent || adError) return;

    try {
      // Initialize AdSense
      if (window.adsbygoogle && adRef.current) {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
      setAdError(true);
    }
  }, [hasConsent, adError]);

  if (!hasConsent) {
    return (
      <Card className={`p-4 text-center bg-muted/20 border-dashed ${className}`}>
        <p className="text-sm text-muted-foreground">
          🍪 Acceptă cookie-urile de marketing pentru a vizualiza reclame personalizate
        </p>
      </Card>
    );
  }

  if (adError) {
    return null; // Hide if ad fails to load
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXX" // Replace with your AdSense Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdUnit;
