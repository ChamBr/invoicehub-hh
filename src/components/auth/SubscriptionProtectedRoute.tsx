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

      // Verificar se o usuário está vinculado a um subscriber ativo com plano
      const { data: subscriberUser } = await supabase
        .from('subscriber_users')
        .select(`
          subscriber:subscribers!inner(
            id,
            status,
            plan_id
          )
        `)
        .eq('user_id', session.user.id)
        .eq('subscribers.status', 'active')
        .maybeSingle();

      return !!subscriberUser?.subscriber?.plan_id;
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