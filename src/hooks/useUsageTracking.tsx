import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UsageStats {
  messagesCount: number;
  tokensUsed: number;
  limit: number;
  isUnlimited: boolean;
}

const FREE_MESSAGE_LIMIT = 50;
const FREE_TOKEN_LIMIT = 100000;

export const useUsageTracking = () => {
  const [usage, setUsage] = useState<UsageStats>({
    messagesCount: 0,
    tokensUsed: 0,
    limit: FREE_MESSAGE_LIMIT,
    isUnlimited: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }

      // Check if user is premium
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .in("role", ["premium", "admin"])
        .single();

      const isPremium = !!roleData;

      // Get current month's usage
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: usageData } = await supabase
        .from("usage_stats")
        .select("messages_count, tokens_used")
        .eq("user_id", session.user.id)
        .gte("period_start", startOfMonth.toISOString())
        .single();

      setUsage({
        messagesCount: usageData?.messages_count || 0,
        tokensUsed: usageData?.tokens_used || 0,
        limit: isPremium ? Infinity : FREE_MESSAGE_LIMIT,
        isUnlimited: isPremium,
      });
    } catch (error) {
      console.error("Error fetching usage:", error);
    } finally {
      setLoading(false);
    }
  };

  const incrementUsage = async (tokensUsed: number = 0) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);

      // Try to update existing record
      const { data: existingUsage } = await supabase
        .from("usage_stats")
        .select("id, messages_count, tokens_used")
        .eq("user_id", session.user.id)
        .gte("period_start", startOfMonth.toISOString())
        .lte("period_start", endOfMonth.toISOString())
        .single();

      if (existingUsage) {
        // Update existing record
        await supabase
          .from("usage_stats")
          .update({
            messages_count: existingUsage.messages_count + 1,
            tokens_used: existingUsage.tokens_used + tokensUsed,
          })
          .eq("id", existingUsage.id);
      } else {
        // Create new record
        await supabase
          .from("usage_stats")
          .insert({
            user_id: session.user.id,
            messages_count: 1,
            tokens_used: tokensUsed,
            period_start: startOfMonth.toISOString(),
            period_end: endOfMonth.toISOString(),
          });
      }

      await fetchUsage();
    } catch (error) {
      console.error("Error incrementing usage:", error);
    }
  };

  const canSendMessage = () => {
    if (usage.isUnlimited) return true;
    return usage.messagesCount < usage.limit;
  };

  const remainingMessages = () => {
    if (usage.isUnlimited) return Infinity;
    return Math.max(0, usage.limit - usage.messagesCount);
  };

  const usagePercentage = () => {
    if (usage.isUnlimited) return 0;
    return Math.min(100, (usage.messagesCount / usage.limit) * 100);
  };

  return {
    usage,
    loading,
    canSendMessage,
    remainingMessages,
    usagePercentage,
    incrementUsage,
    refetch: fetchUsage,
  };
};
