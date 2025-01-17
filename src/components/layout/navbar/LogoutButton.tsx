import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearSession } = useAuth();

  const handleLogout = async () => {
    try {
      clearSession();
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Erro ao fazer logout:", error);
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
      
      navigate("/login");
    } catch (error) {
      console.error("Erro inesperado ao fazer logout:", error);
      clearSession();
      toast({
        title: "Atenção",
        description: "Houve um problema, mas você foi desconectado por segurança.",
      });
      navigate("/login");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
};

export default LogoutButton;