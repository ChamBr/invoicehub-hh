import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { session, clearSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const pageTitles: { [key: string]: string } = {
      "/": "Dashboard",
      "/customers": t('navigation.customers'),
      "/products": t('navigation.products'),
      "/invoices": t('navigation.invoices'),
      "/profile": t('navigation.profile'),
      "/admin": t('navigation.admin'),
      "/feedback": t('navigation.feedback.submit')
    };
    document.title = `InvoiceHub - ${pageTitles[location.pathname] || ""}`;
  }, [location, t]);

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

  if (!session) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-[1px]">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-primary">{session?.user.email}</span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;