import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useProducts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Erro ao carregar produtos",
      description: error.message,
    });
  }

  return { products };
};