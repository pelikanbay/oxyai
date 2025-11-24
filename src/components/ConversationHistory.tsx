import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSwipe } from "@/hooks/use-swipe";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationHistoryProps {
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  currentConversationId?: string;
}

export const ConversationHistory = ({ 
  onSelectConversation, 
  onNewConversation,
  currentConversationId 
}: ConversationHistoryProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  const currentIndex = conversations.findIndex(conv => conv.id === currentConversationId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < conversations.length - 1;

  const navigateToPrevious = () => {
    if (hasPrevious) {
      onSelectConversation(conversations[currentIndex - 1].id);
    }
  };

  const navigateToNext = () => {
    if (hasNext) {
      onSelectConversation(conversations[currentIndex + 1].id);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: navigateToNext,
    onSwipeRight: navigateToPrevious,
    minSwipeDistance: 50,
  });

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = () => {
    try {
      const stored = localStorage.getItem('conversations');
      if (stored) {
        setConversations(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
      toast.error("Eroare la încărcarea conversațiilor");
    }
  };

  const deleteConversation = (id: string) => {
    try {
      const updated = conversations.filter(conv => conv.id !== id);
      localStorage.setItem('conversations', JSON.stringify(updated));
      localStorage.removeItem(`conversation_${id}`);
      setConversations(updated);
      
      if (currentConversationId === id) {
        onNewConversation();
      }
      
      toast.success("Conversație ștearsă");
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Eroare la ștergerea conversației");
    }
  };

  return (
    <Card className="h-full flex flex-col" {...swipeHandlers}>
      <div className="p-4 border-b border-border space-y-3">
        <Button 
          onClick={onNewConversation}
          className="w-full"
          variant="default"
        >
          <Plus className="mr-2 h-4 w-4" />
          Conversație Nouă
        </Button>

        {/* Navigation Arrows - visible when there's a current conversation */}
        {currentConversationId && conversations.length > 1 && (
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToPrevious}
              disabled={!hasPrevious}
              className="flex-1 transition-all"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {currentIndex + 1} / {conversations.length}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={navigateToNext}
              disabled={!hasNext}
              className="flex-1 transition-all"
            >
              Următor
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-sm text-muted-foreground mb-3">ISTORIC (Sesiune locală)</h3>
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nicio conversație încă</p>
            <p className="text-xs mt-2">Conversațiile sunt stocate local pe acest dispozitiv</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-1">
              {conversations.map((conv, index) => (
                <div key={conv.id} className="group relative">
                  <Button
                    variant={currentConversationId === conv.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-left h-auto py-3 px-3 transition-all hover:translate-x-1 pr-10"
                    onClick={() => onSelectConversation(conv.id)}
                  >
                    <div className="flex flex-col items-start w-full min-w-0">
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          #{index + 1}
                        </span>
                        <span className="font-medium truncate flex-1 text-sm">
                          {conv.title || "Conversație fără titlu"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground ml-6">
                        {new Date(conv.updated_at).toLocaleDateString('ro-RO')}
                      </span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
};
