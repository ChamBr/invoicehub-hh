import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";

interface SubscriberUsersDialogProps {
  subscriber: {
    id: string;
    company_name: string | null;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscriberUsersDialog({
  subscriber,
  open,
  onOpenChange,
}: SubscriberUsersDialogProps) {
  const { t } = useTranslation();

  const { data: users, isLoading } = useQuery({
    queryKey: ["subscriber-users", subscriber?.id],
    queryFn: async () => {
      if (!subscriber?.id) return [];

      const { data, error } = await supabase
        .from("subscriber_users")
        .select(`
          *,
          user:profiles(full_name)
        `)
        .eq("subscriber_id", subscriber.id);

      if (error) throw error;
      return data;
    },
    enabled: !!subscriber?.id,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {t("admin.subscribers.users.title", {
              company: subscriber?.company_name || t("admin.subscribers.no_company")
            })}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="space-y-4">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">{user.user?.full_name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {t(`admin.subscribers.status.${user.status}`)}
                  </Badge>
                </div>
              ))}
              {users?.length === 0 && (
                <p className="text-center text-gray-500">{t("admin.subscribers.users.no_users")}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}