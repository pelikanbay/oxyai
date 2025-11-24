import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  files?: any[];
  timestamp?: string;
}

const ChatMessage = ({ role, content, files }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 md:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
      {!isUser && (
        <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-primary/20">
          <AvatarFallback className="bg-gradient-primary">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex-1 max-w-[85%] md:max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-sm' 
            : 'bg-muted border border-border rounded-tl-sm'
        }`}>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
            {content}
          </p>
        </div>
        
        {files && files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative">
                {file.type?.startsWith('image/') ? (
                  <img
                    src={`data:${file.type};base64,${file.content}`}
                    alt={file.name}
                    className="max-w-[200px] md:max-w-xs rounded-lg border border-border"
                  />
                ) : (
                  <div className="px-3 py-2 bg-muted border border-border rounded-lg text-xs">
                    📎 {file.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-border">
          <AvatarFallback className="bg-secondary">
            <User className="h-4 w-4 md:h-5 md:w-5 text-secondary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
