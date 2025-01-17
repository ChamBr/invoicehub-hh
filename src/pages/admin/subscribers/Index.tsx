import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SubscriberUsersDialog } from "./components/SubscriberUsersDialog";
import { EditSubscriberDialog } from "./components/EditSubscriberDialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  company_name: string | null;
  status: string | null;
  created_at: string;
  owner_id: string | null;
  owner: {
    full_name: string | null;
    email: string | null;
  } | null;
  users_count: number;
}

export default function SubscribersList() {
  const { t } = useTranslation();
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const { data: subscribersData, error: subscribersError } = await supabase
        .from("subscribers")
        .select(`
          *,
          owner:profiles!subscribers_owner_id_fkey(full_name, email),
          users_count:subscriber_users(count)
        `)
        .order("created_at", { ascending: false });

      if (subscribersError) throw subscribersError;

      return subscribersData.map(subscriber => ({
        ...subscriber,
        users_count: subscriber.users_count[0]?.count || 0
      })) as Subscriber[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{t("admin.subscribers.title")}</h1>

        <div className="grid gap-4">
          {subscribers?.map((subscriber) => (
            <Card key={subscriber.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">
                      {subscriber.company_name || t("admin.subscribers.no_company")}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {subscriber.owner?.email || t("admin.subscribers.no_owner")}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                        {subscriber.status}
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
                      onClick={() => {
                        setSelectedSubscriber(subscriber);
                        setIsUsersDialogOpen(true);
                      }}
                    >
                      {t("admin.subscribers.manage_users")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedSubscriber(subscriber);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      {t("admin.subscribers.edit")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SubscriberUsersDialog
        subscriber={selectedSubscriber}
        open={isUsersDialogOpen}
        onOpenChange={setIsUsersDialogOpen}
      />

      <EditSubscriberDialog
        subscriber={selectedSubscriber}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}