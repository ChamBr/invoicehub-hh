import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

const UserMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, clearSession } = useAuth();

  const handleLogout = async () => {
    try {
      // Primeiro limpar a sessão local
      clearSession();
      
      // Tentar fazer o logout no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Erro ao fazer logout:", error);
        // Se houver erro, ainda assim vamos garantir que o usuário seja deslogado localmente
        toast({
          title: "Atenção",
          description: "Houve um problema, mas você foi desconectado por segurança.",
        });
      } else {
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso",
        });
      }
      
      // Sempre redirecionar para login, independente de erro
      navigate("/login");
    } catch (error) {
      console.error("Erro inesperado ao fazer logout:", error);
      // Em caso de erro, garantir que o usuário seja deslogado
      clearSession();
      toast({
        title: "Atenção",
        description: "Houve um problema, mas você foi desconectado por segurança.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => navigate("/profile")}
      >
        <User className="h-4 w-4" />
        {session?.user.email}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    </div>
  );
};

export default UserMenu;