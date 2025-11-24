import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "user" | "premium" | "admin";

export const useUserRole = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRole();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setRole(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        setRole("user"); // Default to user role
      } else {
        setRole(data?.role as UserRole || "user");
      }
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      setRole("user");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = role === "admin";
  const isPremium = role === "premium" || role === "admin";

  return {
    role,
    loading,
    isAdmin,
    isPremium,
    refetch: fetchUserRole,
  };
};
