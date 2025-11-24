import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X, Send, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  role: string;
  content: string;
  files?: any;
  created_at: string;
}

interface HeroProps {
  conversationId?: string;
  onConversationCreated?: (id: string) => void;
}

const Hero = ({ conversationId: externalConversationId, onConversationCreated }: HeroProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (externalConversationId) {
      setConversationId(externalConversationId);
      loadConversationMessages(externalConversationId);
    } else {
      setConversationId(null);
      setMessages([]);
      setInput("");
      setFiles([]);
    }
  }, [externalConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversationMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast({
        title: "Eroare",
        description: "Nu s-au putut încărca mesajele",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!input.trim() && files.length === 0) return;
    
    if (!user) {
      toast({
        title: "Eroare",
        description: "Trebuie să fii autentificat pentru a folosi această funcție",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let currentConversationId = conversationId;
      
      if (!currentConversationId) {
        const { data: newConv, error: convError } = await supabase
          .from("conversations")
          .insert({ user_id: user.id, title: input.slice(0, 50) })
          .select()
          .single();

        if (convError) throw convError;
        currentConversationId = newConv.id;
        setConversationId(currentConversationId);
        if (onConversationCreated) {
          onConversationCreated(currentConversationId);
        }
      }

      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      const filesData = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          content: await readFileAsBase64(file)
        }))
      );

      const userMessage = {
        conversation_id: currentConversationId,
        role: "user",
        content: input,
        files: filesData.length > 0 ? filesData : null,
      };

      const { data: savedUserMsg } = await supabase
        .from("messages")
        .insert(userMessage)
        .select()
        .single();

      if (savedUserMsg) {
        setMessages(prev => [...prev, savedUserMsg]);
      }

      setInput("");
      setFiles([]);
      
      const tempAssistantMessage: Message = {
        id: 'temp-' + Date.now(),
        role: "assistant",
        content: "",
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, tempAssistantMessage]);

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          message: input,
          files: filesData 
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Eroare la generarea răspunsului");
      }

      if (!resp.body) {
        throw new Error("No response body");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let fullResponse = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullResponse += content;
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === tempAssistantMessage.id 
                    ? { ...msg, content: fullResponse }
                    : msg
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      const { data: savedAssistantMsg } = await supabase
        .from("messages")
        .insert({
          conversation_id: currentConversationId,
          role: "assistant",
          content: fullResponse,
        })
        .select()
        .single();

      if (savedAssistantMsg) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === tempAssistantMessage.id ? savedAssistantMsg : msg
          )
        );
      }

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "A apărut o eroare",
        variant: "destructive",
      });
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-')));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Bine ai venit la <span className="bg-gradient-primary bg-clip-text text-transparent">RecyeAI</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              AI assistant specializat în penetration testing, red teaming și ethical hacking. Offensive Intelligence, Simplified.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id || index}
                role={msg.role as "user" | "assistant"}
                content={msg.content}
                files={msg.files}
                timestamp={msg.created_at}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 md:px-6 py-4 max-w-4xl mx-auto">
          {files.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  {file.type.startsWith('image/') ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-lg border-2 border-border"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded-lg">
                      <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder="Întreabă orice: analizează imagini, rezolvă probleme, scrie cod, creează conținut... (Enter = trimite, Shift+Enter = linie nouă)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[60px] max-h-[200px] resize-none pr-12 bg-background"
                disabled={isLoading}
              />
              <label htmlFor="file-input" className="absolute bottom-3 right-3 cursor-pointer">
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading}
                />
                <Upload className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </label>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || (!input.trim() && files.length === 0)}
              size="icon"
              className="h-[60px] w-[60px] bg-gradient-primary hover:opacity-90 shadow-glow"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
