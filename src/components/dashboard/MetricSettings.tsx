import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MetricSettingsProps {
  metrics: Array<{
    id: string;
    title: string;
    isEnabled: boolean;
  }>;
  onUpdate: (updatedMetrics: string[]) => void;
}

export function MetricSettings({ metrics, onUpdate }: MetricSettingsProps) {
  const [localMetrics, setLocalMetrics] = useState(metrics);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleToggle = (id: string) => {
    const enabledCount = localMetrics.filter((m) => m.isEnabled).length;
    const metric = localMetrics.find((m) => m.id === id);
    
    if (!metric?.isEnabled && enabledCount >= 4) {
      toast({
        title: "Limite atingido",
        description: "Você pode habilitar no máximo 4 métricas",
        variant: "destructive",
      });
      return;
    }

    if (metric?.isEnabled && enabledCount <= 3) {
      toast({
        title: "Mínimo requerido",
        description: "Você deve manter pelo menos 3 métricas habilitadas",
        variant: "destructive",
      });
      return;
    }

    setLocalMetrics((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isEnabled: !m.isEnabled } : m
      )
    );
  };

  const handleSave = async () => {
    const enabledMetrics = localMetrics
      .filter((m) => m.isEnabled)
      .map((m) => m.id);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Usuário não autenticado",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("user_dashboard_metrics")
      .upsert(
        { 
          user_id: user.id,
          metrics: enabledMetrics 
        }, 
        { onConflict: "user_id" }
      );

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas preferências",
        variant: "destructive",
      });
      return;
    }

    onUpdate(enabledMetrics);
    setIsOpen(false);
    toast({
      title: "Sucesso",
      description: "Suas preferências foram salvas",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Configurar Métricas</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Métricas do Dashboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {localMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex items-center justify-between py-2"
            >
              <span>{metric.title}</span>
              <Switch
                checked={metric.isEnabled}
                onCheckedChange={() => handleToggle(metric.id)}
              />
            </div>
          ))}
          <Button onClick={handleSave} className="w-full">
            Salvar Preferências
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}