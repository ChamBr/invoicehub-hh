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

  const { data: activeSubscription, isLoading } = useQuery({
    queryKey: ['active-subscription', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('id, status, plan_id')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('Erro ao verificar assinatura:', error);
        return null;
      }

      return data;
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

  if (!activeSubscription) {
    return <Navigate to="/profile/plan" state={{ from: location, requiresSubscription: true }} replace />;
  }

  return <>{children}</>;
};

export default SubscriptionProtectedRoute;