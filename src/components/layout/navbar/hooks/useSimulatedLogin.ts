import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface SimulatedLoginData {
  owner: {
    id: string;
    full_name: string | null;
  } | null;
  subscriber: {
    id: string;
    company_name: string | null;
  } | null;
}

export const useSimulatedLogin = () => {
  const { toast } = useToast();
  const { session } = useAuth();

  const { data: simulatedLogin, isLoading } = useQuery<SimulatedLoginData | null>({
    queryKey: ["simulated-login"],
    queryFn: async () => {
      // Primeiro verificar se o usuário é admin
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session?.user?.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return null;
      }

      // Se não for admin, não buscar dados de simulação
      if (profileData?.role !== 'admin' && profileData?.role !== 'superadmin') {
        return null;
      }

      const { data: subscriberData, error: subscriberError } = await supabase
        .from("subscribers")
        .select("id, company_name, owner_id")
        .limit(1)
        .maybeSingle();

      if (subscriberError) {
        console.error("Error fetching subscriber:", subscriberError);
        return null;
      }

      if (!subscriberData) {
        return null;
      }

      if (!subscriberData?.owner_id) {
        return {
          owner: null,
          subscriber: {
            id: subscriberData.id,
            company_name: subscriberData.company_name,
          },
        };
      }

      const { data: ownerData, error: ownerError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("id", subscriberData.owner_id)
        .maybeSingle();

      if (ownerError) {
        console.error("Error fetching owner:", ownerError);
        return null;
      }

      return {
        owner: ownerData ? {
          id: ownerData.id,
          full_name: ownerData.full_name,
        } : null,
        subscriber: {
          id: subscriberData.id,
          company_name: subscriberData.company_name,
        },
      };
    },
    enabled: !!session?.user?.id,
  });

  const exitSimulation = async () => {
    try {
      const { error } = await supabase.auth.refreshSession();
      if (error) throw error;

      toast({
        title: "Simulação encerrada",
        description: "Você voltou para sua conta normal",
      });

      window.location.reload();
    } catch (error) {
      console.error("Error exiting simulation:", error);
      toast({
        variant: "destructive",
        title: "Erro ao encerrar simulação",
        description: "Tente novamente mais tarde",
      });
    }
  };

  return {
    simulatedLogin,
    isLoading,
    exitSimulation,
  };
};