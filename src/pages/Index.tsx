import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Auth } from "@/components/Auth";
import { ConversationHistory } from "@/components/ConversationHistory";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";
import { UsageTracker } from "@/components/UsageTracker";
import { useGhostMode } from "@/hooks/useGhostMode";
import AdUnit from "@/components/AdUnit";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const Index = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | undefined>();
  const { isGhostMode, toggleGhostMode } = useGhostMode();

  useEffect(() => {
    // Clear any corrupted auth data on mount
    const initAuth = async () => {
      try {
        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          // Clear corrupted session
          await supabase.auth.signOut();
          localStorage.clear();
        }
        
        console.log('Initial session:', session?.user?.email || 'none');
        setSession(session);
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.clear();
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth event:', _event, session?.user?.email || 'none');
      setSession(session);
      setLoading(false);
    });

    initAuth();

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
      <CookieConsent />
      <UsageTracker />
      <Header 
        onMenuClick={() => setMobileMenuOpen(true)} 
        onLogoClick={handleNewConversation}
        isGhostMode={isGhostMode}
        onToggleGhostMode={toggleGhostMode}
      />
      
      {/* Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Istoric Conversații</SheetTitle>
            <SheetDescription>
              Vezi și gestionează toate conversațiile tale anterioare
            </SheetDescription>
          </SheetHeader>
          <ConversationHistory
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            currentConversationId={currentConversationId}
          />
        </SheetContent>
      </Sheet>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-border bg-card/50 overflow-y-auto">
          <ConversationHistory
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
            currentConversationId={currentConversationId}
          />
          
          {/* Sidebar Ad Unit */}
          <div className="p-4 border-t border-border/50">
            <AdUnit 
              slot="1234567890" 
              format="vertical"
              className="min-h-[250px]"
            />
          </div>
        </aside>
        
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Top Banner Ad - Mobile & Desktop */}
          <div className="w-full border-b border-border/50 bg-card/30 flex justify-center py-2">
            <AdUnit 
              slot="0987654321" 
              format="horizontal"
              className="max-w-[728px] min-h-[90px]"
            />
          </div>
          
          <Hero 
            conversationId={currentConversationId}
            onConversationCreated={setCurrentConversationId}
            isGhostMode={isGhostMode}
          />
          
          {/* Bottom Banner Ad - Sticky */}
          <div className="w-full border-t border-border/50 bg-card/30 flex justify-center py-2 sticky bottom-0">
            <AdUnit 
              slot="1122334455" 
              format="horizontal"
              responsive={true}
              className="max-w-[728px] min-h-[90px]"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
