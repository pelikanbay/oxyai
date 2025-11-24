import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AnalyticsTracker = () => {
  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // You can send analytics to your backend or Google Analytics
        const analyticsData = {
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          referrer: document.referrer,
          user_id: session?.user?.id || 'anonymous',
          user_agent: navigator.userAgent,
        };

        // Log to console for now - replace with actual analytics service
        console.log("Page view tracked:", analyticsData);

        // Option 1: Send to Google Analytics
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title,
          });
        }

        // Option 2: Send to your own analytics endpoint
        // await fetch('/api/analytics', {
        //   method: 'POST',
        //   body: JSON.stringify(analyticsData),
        // });

      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    };

    trackPageView();

    // Track time spent on page
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Date.now() - startTime;
      console.log(`Time spent on page: ${Math.round(timeSpent / 1000)}s`);
    };
  }, []);

  return null; // This component doesn't render anything
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default AnalyticsTracker;
