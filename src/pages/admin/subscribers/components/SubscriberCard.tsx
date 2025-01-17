import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { SubscriberWithDetails } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubscriberCardProps {
  subscriber: SubscriberWithDetails;
  onManageUsers: (subscriber: SubscriberWithDetails) => void;
  onEdit: (subscriber: SubscriberWithDetails) => void;
  isSuperAdmin?: boolean;
}

export function SubscriberCard({ subscriber, onManageUsers, onEdit, isSuperAdmin }: SubscriberCardProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSimulateLogin = async () => {
    try {
      const { data, error } = await supabase.rpc('simulate_subscriber_login', {
        subscriber_id: subscriber.id
      });

      if (error) throw error;

      toast({
        title: "Simulação iniciada",
        description: `Simulando login como ${subscriber.company_name || 'Assinante sem nome'}`,
      });

      console.log('Simulation data:', data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao simular login",
        description: error.message || "Você não tem permissão para realizar esta ação.",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              {subscriber.company_name || t("admin.subscribers.no_company")}
            </h2>
            <p className="text-sm text-gray-500">
              {subscriber.owner?.full_name || t("admin.subscribers.no_owner")}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                {t(`admin.subscribers.status.${subscriber.status}`)}
              </Badge>
              <span className="text-sm text-gray-500">
                {t("admin.subscribers.created_at", {
                  date: format(new Date(subscriber.created_at), "PP"),
                })}
              </span>
              <Badge variant="outline">
                {t("admin.subscribers.users_count", { count: subscriber.users_count })}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onManageUsers(subscriber)}
            >
              {t("admin.subscribers.manage_users")}
            </Button>
            <Button
              variant="outline"
              onClick={() => onEdit(subscriber)}
            >
              {t("admin.subscribers.edit")}
            </Button>
            {isSuperAdmin && (
              <Button
                variant="secondary"
                onClick={handleSimulateLogin}
              >
                Simular Login
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}