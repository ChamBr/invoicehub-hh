import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface SubscriberUser {
  id: string;
  user_id: string;
  role: "superadmin" | "admin" | "user" | "dependent";
  status: string;
  user: {
    full_name: string | null;
    email: string | null;
  };
}

interface Subscriber {
  id: string;
  company_name: string | null;
}

interface SubscriberUsersDialogProps {
  subscriber: Subscriber | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscriberUsersDialog({
  subscriber,
  open,
  onOpenChange,
}: SubscriberUsersDialogProps) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["subscriber-users", subscriber?.id],
    queryFn: async () => {
      if (!subscriber?.id) return [];

      const { data, error } = await supabase
        .from("subscriber_users")
        .select(`
          *,
          user:profiles!subscriber_users_user_id_fkey(full_name, email)
        `)
        .eq("subscriber_id", subscriber.id);

      if (error) throw error;

      return (data || []).map(user => ({
        ...user,
        user: user.user || { full_name: null, email: null }
      })) as SubscriberUser[];
    },
    enabled: !!subscriber?.id,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Usuários de {subscriber?.company_name || "Empresa"}
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
                    <p className="font-medium">{user.user.email}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </div>
              ))}
              {users?.length === 0 && (
                <p className="text-center text-gray-500">Nenhum usuário encontrado</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}