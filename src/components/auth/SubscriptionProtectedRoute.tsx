import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface SubscriptionProtectedRouteProps {
  children: React.ReactNode;
}

const SubscriptionProtectedRoute = ({ children }: SubscriptionProtectedRouteProps) => {
  const { session } = useAuth();
  const location = useLocation();

  const { data: hasActiveSubscription, isLoading } = useQuery({
    queryKey: ['active-subscription', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return false;

      // Primeiro, verificar se o usuário tem uma assinatura direta
      const { data: directSubscription } = await supabase
        .from('subscriptions')
        .select('id, status')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (directSubscription) return true;

      // Se não tiver assinatura direta, verificar através do subscriber
      const { data: subscriberUser } = await supabase
        .from('subscriber_users')
        .select('subscriber_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!subscriberUser?.subscriber_id) return false;

      const { data: subscriber } = await supabase
        .from('subscribers')
        .select('plan_id, status')
        .eq('id', subscriberUser.subscriber_id)
        .eq('status', 'active')
        .maybeSingle();

      return !!subscriber?.plan_id;
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return <Navigate to="/profile/plan" state={{ from: location, requiresSubscription: true }} replace />;
  }

  return <>{children}</>;
};

export default SubscriptionProtectedRoute;