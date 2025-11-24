import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Auth } from "@/components/Auth";
import { ConversationHistory } from "@/components/ConversationHistory";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { UsageTracker } from "@/components/UsageTracker";
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
      <UsageTracker />
      <Header 
        onMenuClick={() => setMobileMenuOpen(true)} 
        onLogoClick={handleNewConversation}
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
        </aside>
        
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Hero 
            conversationId={currentConversationId}
            onConversationCreated={setCurrentConversationId}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
