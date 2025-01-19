import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export const useSubscription = () => {
  const { session } = useAuth();

  const { data: hasActiveSubscription } = useQuery({
    queryKey: ['active-subscription', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return false;

      const { data: subscriberUser, error } = await supabase
        .from('subscriber_users')
        .select(`
          subscriber:subscribers(
            id,
            status,
            plan_id
          )
        `)
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar assinatura:', error);
        return false;
      }

      return !!subscriberUser?.subscriber?.plan_id;
    },
    enabled: !!session?.user?.id,
  });

  return { hasActiveSubscription };
};