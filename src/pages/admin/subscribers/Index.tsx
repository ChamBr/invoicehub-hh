import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditSubscriberDialog } from "./components/EditSubscriberDialog";
import { SubscriberUsersDialog } from "./components/SubscriberUsersDialog";
import { toast } from "@/components/ui/use-toast";

interface Subscriber {
  id: string;
  company_name: string;
  status: string;
  created_at: string;
  owner: {
    email: string;
  };
  users_count: number;
}

const AdminSubscribers = () => {
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showUsersDialog, setShowUsersDialog] = useState(false);

  const { data: subscribers, isLoading, refetch } = useQuery({
    queryKey: ["admin-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscribers")
        .select(`
          *,
          owner:owner_id(email),
          users_count:subscriber_users(count)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar assinantes",
          description: error.message,
        });
        throw error;
      }
      return data as Subscriber[];
    },
  });

  const handleEditClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowEditDialog(true);
  };

  const handleUsersClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowUsersDialog(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-6 w-6" />
        Gerenciamento de Assinantes
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Assinantes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Email do Proprietário</TableHead>
                  <TableHead>Usuários</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers?.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      {subscriber.company_name || "N/A"}
                    </TableCell>
                    <TableCell>{subscriber.owner?.email}</TableCell>
                    <TableCell>{subscriber.users_count}</TableCell>
                    <TableCell>
                      <Badge
                        variant={subscriber.status === "active" ? "default" : "secondary"}
                      >
                        {subscriber.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(subscriber.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUsersClick(subscriber)}
                      >
                        Usuários
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(subscriber)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedSubscriber && showEditDialog && (
        <EditSubscriberDialog
          subscriber={selectedSubscriber}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onSuccess={() => {
            refetch();
            setShowEditDialog(false);
          }}
        />
      )}

      {selectedSubscriber && showUsersDialog && (
        <SubscriberUsersDialog
          subscriber={selectedSubscriber}
          open={showUsersDialog}
          onOpenChange={setShowUsersDialog}
          onSuccess={() => {
            refetch();
            setShowUsersDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminSubscribers;