import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Upload, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load conversation messages when conversationId changes
  useEffect(() => {
    if (externalConversationId) {
      setConversationId(externalConversationId);
      loadConversationMessages(externalConversationId);
    } else {
      // New conversation
      setConversationId(null);
      setMessages([]);
      setInput("");
      setOutput("");
      setFiles([]);
    }
  }, [externalConversationId]);

  const loadConversationMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      
      // Set output to last assistant message
      const lastAssistant = data?.reverse().find(m => m.role === "assistant");
      if (lastAssistant) {
        setOutput(lastAssistant.content);
      }
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
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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
    setOutput("");
    
    try {
      // Create or use existing conversation
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

      // Save user message
      await supabase.from("messages").insert({
        conversation_id: currentConversationId,
        role: "user",
        content: input,
        files: filesData.length > 0 ? filesData : null,
      });
      
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
              setOutput(fullResponse);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullResponse += content;
              setOutput(fullResponse);
            }
          } catch {}
        }
      }

      // Save AI response
      await supabase.from("messages").insert({
        conversation_id: currentConversationId,
        role: "assistant",
        content: fullResponse,
      });

      setInput("");
      setFiles([]);

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "A apărut o eroare la generarea răspunsului",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Tool AI 100% Gratuit</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Idei IT și Cybersecurity
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Instant, Gratis
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Obține răspunsuri și soluții pentru orice provocare IT sau cybersecurity în câteva secunde
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="ai-input" className="block text-sm font-medium mb-2">
                Întreabă OxyAI orice despre IT și Cybersecurity
              </label>
              <Textarea
                id="ai-input"
                placeholder="Ex: Care sunt cele mai bune practici pentru securizarea unei aplicații web?"
                className="min-h-[120px] bg-background border-border resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* File Upload Area */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-background hover:border-primary/50'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-10 h-10 text-primary mb-3" />
                <p className="text-sm font-medium mb-1">
                  Trage fișiere aici sau click pentru a încărca
                </p>
                <p className="text-xs text-muted-foreground">
                  Orice tip de fișier, fără limită de mărime
                </p>
              </label>
            </div>

            {/* Files List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Fișiere încărcate ({files.length})</p>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border group hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerate}
              disabled={isLoading || (!input.trim() && files.length === 0)}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold py-6 text-lg shadow-glow transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generez răspuns...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generează Răspuns
                </>
              )}
            </Button>

            {output && (
              <div className="mt-6 p-6 bg-muted rounded-xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Răspuns OxyAI
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{output}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
