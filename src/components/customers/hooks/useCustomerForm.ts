import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthProvider";

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

      // Primeiro, tentar encontrar um subscriber_user existente
      const { data: subscriberUser, error: subscriberUserError } = await supabase
        .from("subscriber_users")
        .select("subscriber_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (subscriberUserError) {
        console.error("Erro ao buscar subscriber_user:", subscriberUserError);
        throw subscriberUserError;
      }

      // Se já existe um subscriber_user, retornar o subscriber_id
      if (subscriberUser?.subscriber_id) {
        return { subscriber_id: subscriberUser.subscriber_id };
      }

      // Se não existe, criar um novo subscriber
      const { data: newSubscriber, error: subscriberError } = await supabase
        .from("subscribers")
        .insert({
          company_name: `Company of ${session.user.email}`,
          owner_id: session.user.id,
          status: "active"
        })
        .select()
        .maybeSingle();

      if (subscriberError) {
        console.error("Erro ao criar subscriber:", subscriberError);
        throw subscriberError;
      }

      if (!newSubscriber) {
        throw new Error("Falha ao criar novo subscriber");
      }

      // Criar subscriber_user associação
      const { error: linkError } = await supabase
        .from("subscriber_users")
        .insert({
          subscriber_id: newSubscriber.id,
          user_id: session.user.id,
          role: "admin",
          status: "active"
        });

      if (linkError) {
        console.error("Erro ao criar subscriber_user:", linkError);
        throw linkError;
      }

      return { subscriber_id: newSubscriber.id };
    },
    enabled: !!session?.user?.id,
  });

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      if (!currentSubscriber?.subscriber_id) {
        throw new Error("Subscriber não encontrado");
      }

      const customerData = {
        name: data.name,
        type: data.type,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        tax_exempt: data.taxExempt,
        tax_id: data.taxId,
        notes: data.notes,
        status: data.status,
        subscriber_id: currentSubscriber.subscriber_id,
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from("customers")
          .update(customerData)
          .eq("id", initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("customers")
          .insert([customerData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso",
        description: initialData?.id
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