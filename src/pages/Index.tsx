import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Monetization from "@/components/Monetization";
import Footer from "@/components/Footer";
import { Auth } from "@/components/Auth";
import { ConversationHistory } from "@/components/ConversationHistory";

const Index = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(true);
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
  };

  const handleNewConversation = () => {
    setCurrentConversationId(undefined);
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
      <Header />
      <div className="flex">
        {/* Sidebar with conversation history */}
        {showHistory && (
          <aside className="w-80 border-r border-border bg-card/50 hidden lg:block">
            <ConversationHistory
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              currentConversationId={currentConversationId}
            />
          </aside>
        )}
        
        {/* Main content */}
        <main className="flex-1">
          <Hero 
            conversationId={currentConversationId}
            onConversationCreated={setCurrentConversationId}
          />
          <HowItWorks />
          <Monetization />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
