import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogOut, User, Users, Crown, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { session, clearSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: userSubscription } = useQuery({
    queryKey: ['userSubscription'],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plan:plans(name)
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: simulatedLogin } = useQuery({
    queryKey: ['simulatedLogin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscribers')
        .select(`
          id,
          company_name,
          owner_id,
          owner:profiles!subscribers_owner_id_fkey(id)
        `)
        .single();

      if (error) throw error;

      if (data?.owner_id) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('id, email:auth.users!profiles_id_fkey(email)')
          .eq('id', data.owner_id)
          .single();

        if (userError) throw userError;
        return { ...data, owner: userData };
      }

      return data;
    },
    enabled: !!session?.user?.id && userProfile?.role === 'superadmin',
  });

  const exitSimulation = async () => {
    try {
      toast({
        title: "Simulação encerrada",
        description: "Você voltou para sua conta normal",
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao sair da simulação:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível sair da simulação",
      });
    }
  };

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

  const isSuperAdmin = userProfile?.role === 'superadmin';

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-[1px]">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            {isSuperAdmin ? (
              <Crown className="h-5 w-5 text-role-superadmin" />
            ) : userProfile?.role === 'admin' ? (
              <Users className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-primary" />
            )}
            <span className={`${isSuperAdmin ? 'text-role-superadmin' : 'text-primary'}`}>
              {session.user.email}
              {simulatedLogin && simulatedLogin.owner?.email && (
                <span className="ml-2 text-sm text-gray-500">
                  [Login ativo: {simulatedLogin.owner.email}]
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={exitSimulation}
                    className="ml-2"
                  >
                    <ArrowLeftCircle className="h-4 w-4 mr-1" />
                    Sair
                  </Button>
                </span>
              )}
              {userSubscription?.plan?.name && (
                <span className="ml-2 text-sm text-gray-500">
                  (PLAN: {userSubscription.plan.name})
                </span>
              )}
            </span>
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