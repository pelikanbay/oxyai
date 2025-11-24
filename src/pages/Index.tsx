import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Monetization from "@/components/Monetization";
import Footer from "@/components/Footer";
import { Auth } from "@/components/Auth";
import { ConversationHistory } from "@/components/ConversationHistory";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AdSpace from "@/components/AdSpace";
import { UsageTracker } from "@/components/UsageTracker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Index = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    setMobileMenuOpen(false); // Close mobile menu when selecting
  };

  const handleNewConversation = () => {
    setCurrentConversationId(undefined);
    setMobileMenuOpen(false); // Close mobile menu when creating new
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter']">
      <AnalyticsTracker />
      <UsageTracker />
      <Header onMenuClick={() => setMobileMenuOpen(true)} />
      
      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Istoric Conversații</SheetTitle>
          </SheetHeader>
          <ConversationHistory
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            currentConversationId={currentConversationId}
          />
        </SheetContent>
      </Sheet>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar - visible only on large screens */}
        <aside className="hidden lg:block w-80 border-r border-border bg-card/50 overflow-y-auto">
          <ConversationHistory
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            currentConversationId={currentConversationId}
          />
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <Hero 
            conversationId={currentConversationId}
            onConversationCreated={setCurrentConversationId}
          />
          
          {/* Ad Space after Hero */}
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <AdSpace id="after-hero-ad" format="horizontal" />
          </div>
          
          <HowItWorks />
          <Monetization />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
