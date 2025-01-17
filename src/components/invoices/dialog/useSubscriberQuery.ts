import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useSubscriberQuery = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["current-subscriber"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Usuário não autenticado",
        });
        throw new Error("Usuário não autenticado");
      }

      try {
        const { data: subscriberUsers, error: subscriberError } = await supabase
          .from("subscriber_users")
          .select("subscriber_id")
          .eq("user_id", user.id);

        if (subscriberError) {
          console.error("Error fetching subscriber:", subscriberError);
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Não foi possível carregar os dados do assinante.",
          });
          throw subscriberError;
        }

        if (!subscriberUsers || subscriberUsers.length === 0) {
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Usuário não está associado a nenhum assinante.",
          });
          return null;
        }

        return { subscriber_id: subscriberUsers[0].subscriber_id };
      } catch (error) {
        console.error("Error in subscriber query:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Erro ao buscar dados do assinante.",
        });
        throw error;
      }
    },
  });
};