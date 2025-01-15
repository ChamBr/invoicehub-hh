import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useDebugMode = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const { data: debugConfig, isLoading } = useQuery({
    queryKey: ["debug-mode"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("configurations")
        .select("*")
        .eq("name", "debug_mode")
        .single();

      if (error) {
        console.error("Erro ao buscar configuração de debug:", error);
        return null;
      }

      return data;
    },
    refetchInterval: 1000,
  });

  const updateDebugMode = useMutation({
    mutationFn: async (isEnabled: boolean) => {
      const { error } = await supabase
        .from("configurations")
        .update({
          is_enabled: isEnabled,
          debug_activated_at: isEnabled ? new Date().toISOString() : null,
        })
        .eq("name", "debug_mode");

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debug-mode"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar modo debug:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao atualizar o modo debug",
      });
    },
  });

  useEffect(() => {
    if (debugConfig?.is_enabled && debugConfig.debug_activated_at) {
      const interval = setInterval(() => {
        const activatedAt = new Date(debugConfig.debug_activated_at);
        const expiresAt = new Date(activatedAt.getTime() + 10 * 60 * 1000);
        const now = new Date();
        const timeLeftMs = expiresAt.getTime() - now.getTime();

        if (timeLeftMs <= 0) {
          setTimeLeft(null);
          updateDebugMode.mutate(false);
          clearInterval(interval);
        } else {
          setTimeLeft(Math.floor(timeLeftMs / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimeLeft(null);
    }
  }, [debugConfig?.is_enabled, debugConfig?.debug_activated_at]);

  const handleToggle = (checked: boolean) => {
    updateDebugMode.mutate(checked);
    
    if (checked) {
      toast({
        title: "Modo Debug Ativado",
        description: "O modo debug será desativado automaticamente em 10 minutos",
      });
    } else {
      toast({
        title: "Modo Debug Desativado",
        description: "O modo debug foi desativado manualmente",
      });
    }
  };

  return {
    debugConfig,
    isLoading,
    timeLeft,
    handleToggle,
  };
};