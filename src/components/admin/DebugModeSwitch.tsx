import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DebugModeSwitch = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Buscar status atual do modo debug
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
    refetchInterval: 1000, // Atualiza a cada segundo para manter o timer sincronizado
  });

  // Mutation para atualizar o status do modo debug
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
        description: t("common.errors.update"),
      });
    },
  });

  // Calcular tempo restante
  useEffect(() => {
    if (debugConfig?.is_enabled && debugConfig.debug_activated_at) {
      const interval = setInterval(() => {
        const activatedAt = new Date(debugConfig.debug_activated_at);
        const expiresAt = new Date(activatedAt.getTime() + 10 * 60 * 1000); // 10 minutos
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

  const formatTimeLeft = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch
          checked={debugConfig?.is_enabled || false}
          onCheckedChange={handleToggle}
          disabled={isLoading}
          aria-label="Modo Debug"
        />
        <span className="text-sm text-gray-700">Modo Debug</span>
        {timeLeft !== null && (
          <span className="text-sm text-orange-600 ml-2">
            ({formatTimeLeft(timeLeft)})
          </span>
        )}
      </div>

      {debugConfig?.is_enabled && (
        <Alert variant="destructive" className="bg-orange-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Modo debug ativo! O acesso admin sem autenticação está temporariamente liberado.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DebugModeSwitch;