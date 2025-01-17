import { ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const SimulatedLogin = () => {
  const { toast } = useToast();

  const { data: simulatedLogin } = useQuery({
    queryKey: ['simulatedLogin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscribers')
        .select('id, company_name, owner_id')
        .single();

      if (error) throw error;

      if (data?.owner_id) {
        const { data: ownerData, error: ownerError } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', data.owner_id)
          .single();

        if (ownerError) throw ownerError;
        return { ...data, owner: ownerData };
      }

      return data;
    },
  });

  const exitSimulation = async () => {
    try {
      toast({
        title: "Simulação encerrada",
        description: "Você voltou para sua conta normal",
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao sair da simulação:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível sair da simulação",
      });
    }
  };

  if (!simulatedLogin?.owner?.email) return null;

  return (
    <span className="ml-2 text-sm text-gray-500">
      [Login ativo: {simulatedLogin.owner.email}]
      <Button
        variant="ghost"
        size="sm"
        onClick={exitSimulation}
        className="ml-2"
      >
        <ArrowLeftCircle className="h-4 w-4 mr-1" />
        Sair
      </Button>
    </span>
  );
};

export default SimulatedLogin;