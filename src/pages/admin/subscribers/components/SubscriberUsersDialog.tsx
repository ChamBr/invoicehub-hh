import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SubscriberUser {
  id: string;
  user: {
    email: string;
  };
  role: "superadmin" | "admin" | "user" | "dependent";
  status: string;
}

interface SubscriberUsersDialogProps {
  subscriber: {
    id: string;
    company_name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function SubscriberUsersDialog({
  subscriber,
  open,
  onOpenChange,
  onSuccess,
}: SubscriberUsersDialogProps) {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "user" | "dependent">("user");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: users, refetch } = useQuery({
    queryKey: ["subscriber-users", subscriber.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscriber_users")
        .select(`
          *,
          user:user_id(email)
        `)
        .eq("subscriber_id", subscriber.id);

      if (error) throw error;
      return data as SubscriberUser[];
    },
  });

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Primeiro, verifica se o usuário existe
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", newUserEmail)
        .single();

      if (userError || !userData) {
        throw new Error("Usuário não encontrado");
      }

      // Adiciona o usuário ao subscriber
      const { error } = await supabase.from("subscriber_users").insert({
        subscriber_id: subscriber.id,
        user_id: userData.id,
        role: newUserRole,
      });

      if (error) throw error;

      toast({
        title: "Usuário adicionado",
        description: "O usuário foi adicionado com sucesso.",
      });

      setNewUserEmail("");
      refetch();
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar usuário",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("subscriber_users")
        .update({ role: newRole })
        .eq("user_id", userId)
        .eq("subscriber_id", subscriber.id);

      if (error) throw error;

      toast({
        title: "Função atualizada",
        description: "A função do usuário foi atualizada com sucesso.",
      });

      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar função",
        description: "Ocorreu um erro ao atualizar a função do usuário.",
      });
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("subscriber_users")
        .update({ status: newStatus })
        .eq("user_id", userId)
        .eq("subscriber_id", subscriber.id);

      if (error) throw error;

      toast({
        title: "Status atualizado",
        description: "O status do usuário foi atualizado com sucesso.",
      });

      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro ao atualizar o status do usuário.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Usuários do Assinante: {subscriber.company_name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email do Novo Usuário</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="dependent">Dependente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adicionando..." : "Adicionar Usuário"}
              </Button>
            </div>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleUpdateRole(user.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="user">Usuário</SelectItem>
                        <SelectItem value="dependent">Dependente</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() =>
                        handleUpdateStatus(
                          user.id,
                          user.status === "active" ? "inactive" : "active"
                        )
                      }
                    >
                      {user.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(
                          user.id,
                          user.status === "active" ? "inactive" : "active"
                        )
                      }
                    >
                      {user.status === "active" ? "Desativar" : "Ativar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}