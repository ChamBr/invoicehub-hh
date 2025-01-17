import { ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SimulatedLoginData {
  id: string;
  company_name: string | null;
  owner_id: string | null;
  owner?: {
    id: string;
    email: string;
  };
}

const SimulatedLogin = () => {
  const { toast } = useToast();

  const { data: simulatedLogin } = useQuery<SimulatedLoginData>({
    queryKey: ['simulatedLogin'],
    queryFn: async () => {
      // Primeiro, buscar o subscriber
      const { data: subscriberData, error: subscriberError } = await supabase
        .from("subscribers")
        .select("id, company_name, owner_id")
        .limit(1)
        .single();

      if (subscriberError) throw subscriberError;

      // Se não houver owner_id, retornar apenas os dados do subscriber
      if (!subscriberData?.owner_id) {
        return {
          id: subscriberData.id,
          company_name: subscriberData.company_name,
          owner_id: null
        };
      }

      // Depois, buscar o perfil do owner
      const { data: ownerData, error: ownerError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("id", subscriberData.owner_id)
        .single();

      if (ownerError) throw ownerError;

      // Retornar os dados combinados
      return {
        id: subscriberData.id,
        company_name: subscriberData.company_name,
        owner_id: subscriberData.owner_id,
        owner: {
          id: ownerData.id,
          email: ownerData.email
        }
      };
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

  if (!simulatedLogin?.owner?.id) return null;

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