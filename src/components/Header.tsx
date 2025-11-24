import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, LogOut, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import recyeaiLogo from "@/assets/recyeai-logo.png";
import GhostModeIndicator from "@/components/GhostModeIndicator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface HeaderProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  isGhostMode?: boolean;
  onToggleGhostMode?: () => void;
}

const Header = ({ onMenuClick, onLogoClick, isGhostMode = false, onToggleGhostMode }: HeaderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Header auth state changed:', _event);
      setUser(session?.user ?? null);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    }).catch((error) => {
      console.error('Header: Error getting session:', error);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Attempting logout...');
      
      // Clear everything first
      localStorage.clear();
      sessionStorage.clear();
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      }
      
      console.log('Logout successful');
      toast.success("Deconectat cu succes!");
      
      // Force a complete reload
      window.location.href = '/';
    } catch (error: any) {
      console.error('Logout exception:', error);
      // Even if there's an error, clear everything and reload
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {user && onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow transition-all duration-300 group-hover:shadow-glow-accent">
              <img src={recyeaiLogo} alt="RecyeAI" className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                RecyeAI
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1 tracking-wider">
                OFFENSIVE INTELLIGENCE
              </span>
            </div>
          </button>
        </div>
        <nav className="flex items-center gap-2 md:gap-4">
          {user && onToggleGhostMode && (
            <GhostModeIndicator 
              isGhostMode={isGhostMode} 
              onToggle={onToggleGhostMode} 
            />
          )}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Contul Meu</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profil & Setări</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Deconectare</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
