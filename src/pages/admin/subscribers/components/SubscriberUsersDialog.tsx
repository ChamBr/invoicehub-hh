import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface SubscriberUser {
  id: string;
  user_id: string;
  subscriber_id: string;
  role: "superadmin" | "admin" | "user" | "dependent";
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    email: string;
  };
}

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
      if (!subscriber) return [];

      const { data: usersData, error } = await supabase
        .from("subscriber_users")
        .select(`
          *,
          user:profiles(email)
        `)
        .eq("subscriber_id", subscriber.id);

      if (error) throw error;

      return usersData.map(user => ({
        ...user,
        user: {
          email: user.user.email
        }
      })) as SubscriberUser[];
    },
    enabled: !!subscriber,
  });

  if (!subscriber) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {t("admin.subscribers.users.title", { company: subscriber.company_name })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="space-y-4">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{user.user.email}</p>
                    <div className="flex items-center gap-2">
                      <Badge>{user.role}</Badge>
                      <Badge variant="outline">{user.status}</Badge>
                      <span className="text-sm text-gray-500">
                        {t("admin.subscribers.users.joined_at", {
                          date: format(new Date(user.created_at), "PP"),
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}