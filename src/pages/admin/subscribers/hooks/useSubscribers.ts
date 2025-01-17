import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SubscriberWithDetails } from "../types";

export function useSubscribers() {
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data: subscribersData, error: subscribersError } = await supabase
        .from("subscribers")
        .select(`
          *,
          users_count:subscriber_users(count)
        `)
        .order("created_at", { ascending: false });

      if (subscribersError) throw subscribersError;

      const subscribersWithOwners = await Promise.all((subscribersData || []).map(async (subscriber) => {
        if (!subscriber.owner_id) {
          return {
            ...subscriber,
            users_count: subscriber.users_count?.[0]?.count || 0,
            owner: null
          };
        }

        const { data: ownerData } = await supabase
          .from("profiles")
          .select("full_name, id")
          .eq("id", subscriber.owner_id)
          .maybeSingle();

        return {
          ...subscriber,
          users_count: subscriber.users_count?.[0]?.count || 0,
          owner: ownerData
        };
      }));

      return subscribersWithOwners as SubscriberWithDetails[];
    },
  });
}