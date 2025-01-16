import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

const UserMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Erro ao fazer logout:", error);
        toast({
          variant: "destructive",
          title: "Erro ao sair",
          description: error.message || "Tente novamente em alguns instantes",
        });
        return;
      }

      // Limpar qualquer estado local se necessário
      localStorage.removeItem('supabase.auth.token');
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso",
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Erro inesperado ao fazer logout:", error);
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
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