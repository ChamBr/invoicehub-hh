import { Crown, User, Users } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const UserProfile = () => {
  const { session } = useAuth();

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: subscriberData } = useQuery({
    queryKey: ['userSubscriber'],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('subscriber_users')
        .select(`
          subscriber:subscribers!inner(
            id,
            status,
            plan:plans(
              name
            )
          )
        `)
        .eq('user_id', session.user.id)
        .eq('subscribers.status', 'active')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const isSuperAdmin = userProfile?.role === 'superadmin';

  return (
    <div className="flex items-center gap-2">
      {isSuperAdmin ? (
        <Crown className="h-5 w-5 text-role-superadmin" />
      ) : userProfile?.role === 'admin' ? (
        <Users className="h-5 w-5 text-primary" />
      ) : (
        <User className="h-5 w-5 text-primary" />
      )}
      <span className={`${isSuperAdmin ? 'text-role-superadmin' : 'text-primary'}`}>
        {session.user.email}
        {subscriberData?.subscriber?.plan?.name && (
          <span className="ml-2 text-sm text-gray-500">
            (PLAN: {subscriberData.subscriber.plan.name})
          </span>
        )}
      </span>
    </div>
  );
};

export default UserProfile;