import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUserRole } from "@/hooks/useUserRole";

const PremiumBadge = () => {
  const { isPremium, role } = useUserRole();

  if (!isPremium) return null;

  return (
    <Badge
      variant={role === "admin" ? "default" : "secondary"}
      className="flex items-center gap-1 px-2 py-1"
    >
      <Crown className="w-3 h-3" />
      <span className="text-xs font-medium">
        {role === "admin" ? "ADMIN" : "PREMIUM"}
      </span>
    </Badge>
  );
};

export default PremiumBadge;
