import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SubscriberUsersDialog } from "./components/SubscriberUsersDialog";
import { EditSubscriberDialog } from "./components/EditSubscriberDialog";
import { SubscriberCard } from "./components/SubscriberCard";
import { useSubscribers } from "./hooks/useSubscribers";
import { SubscriberWithDetails } from "./types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function SubscribersList() {
  const { t } = useTranslation();
  const [selectedSubscriber, setSelectedSubscriber] = useState<SubscriberWithDetails | null>(null);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: subscribers, isLoading } = useSubscribers();
  
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      return profile;
    }
  });

  const isSuperAdmin = userProfile?.role === 'superadmin';

  const handleManageUsers = (subscriber: SubscriberWithDetails) => {
    setSelectedSubscriber(subscriber);
    setIsUsersDialogOpen(true);
  };

  const handleEdit = (subscriber: SubscriberWithDetails) => {
    setSelectedSubscriber(subscriber);
    setIsEditDialogOpen(true);
  };

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
            <SubscriberCard
              key={subscriber.id}
              subscriber={subscriber}
              onManageUsers={handleManageUsers}
              onEdit={handleEdit}
              isSuperAdmin={isSuperAdmin}
            />
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