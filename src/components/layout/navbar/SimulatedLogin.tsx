import { useSimulatedLogin } from "./hooks/useSimulatedLogin";
import { ExitSimulationButton } from "./components/ExitSimulationButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export const SimulatedLogin = () => {
  const { session } = useAuth();
  const { simulatedLogin, exitSimulation } = useSimulatedLogin();

  // Verificar se o usuário é admin/superadmin
  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user?.id)
        .maybeSingle();
      return data;
    },
    enabled: !!session?.user?.id
  });

  // Só mostrar o botão se for admin/superadmin e tiver uma simulação ativa
  if (!profile || (profile.role !== 'admin' && profile.role !== 'superadmin') || !simulatedLogin?.owner?.id) {
    return null;
  }

  return (
    <ExitSimulationButton
      onClick={exitSimulation}
      ownerName={simulatedLogin.owner.full_name}
    />
  );
};

export default SimulatedLogin;