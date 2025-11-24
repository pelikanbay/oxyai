import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { GhostModeIndicator } from "./GhostModeIndicator";
import NavLink from "./NavLink";

interface HeaderProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
  isGhostMode?: boolean;
  onToggleGhostMode?: () => void;
}

const Header = ({ onMenuClick, onLogoClick, isGhostMode, onToggleGhostMode }: HeaderProps) => {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              RecyeAI
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <NavLink href="/terms">Termeni</NavLink>
          <NavLink href="/privacy">Confidențialitate</NavLink>
          <NavLink href="/dpa">DPA</NavLink>

          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {onToggleGhostMode && (
            <GhostModeIndicator 
              isGhostMode={isGhostMode || false}
              onToggle={onToggleGhostMode}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
