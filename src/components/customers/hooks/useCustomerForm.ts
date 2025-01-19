import { useToast } from "@/components/ui/use-toast";
import { CustomerFormValues } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthProvider";
import { getOrCreateSubscriber } from "./subscriber/useSubscriberQuery";
import { saveCustomer } from "./customer/useCustomerMutation";

export function useCustomerForm(
  onSuccess: () => void, 
  initialData?: CustomerFormValues | null,
  subscriberId?: string
) {
  const { toast } = useToast();
  const { session } = useAuth();

  const { data: currentSubscriber, isLoading: isLoadingSubscriber } = useQuery({
    queryKey: ["current-subscriber"],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      return getOrCreateSubscriber(session.user);
    },
    enabled: !!session?.user?.id,
  });

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      // Se já temos um subscriberId passado como prop, usamos ele
      const effectiveSubscriberId = subscriberId || currentSubscriber?.subscriber_id;
      
      if (!effectiveSubscriberId) {
        throw new Error("Subscriber não encontrado");
      }

      const action = await saveCustomer(data, effectiveSubscriberId, initialData);

      toast({
        title: "Sucesso",
        description: action === "updated"
          ? "Cliente atualizado com sucesso!"
          : "Cliente criado com sucesso!",
      });

      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao salvar o cliente. Por favor, tente novamente.",
      });
    }
  };

  return {
    handleSubmit,
    isLoadingSubscriber,
  };
}