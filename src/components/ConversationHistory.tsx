import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

interface ConversationHistoryProps {
  onSelectConversation: (id: string) => void;
  currentConversationId?: string;
}

export const ConversationHistory = ({ onSelectConversation, currentConversationId }: ConversationHistoryProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("id, title, created_at")
      .order("updated_at", { ascending: false });

    if (error) {
      toast.error("Failed to load conversations");
      return;
    }

    setConversations(data || []);
  };

  return (
    <Card className="p-4 h-full">
      <h3 className="font-semibold mb-4">Conversation History</h3>
      <ScrollArea className="h-[calc(100%-3rem)]">
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Button
              key={conv.id}
              variant={currentConversationId === conv.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectConversation(conv.id)}
            >
              <span className="truncate">{conv.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
