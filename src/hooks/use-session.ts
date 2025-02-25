
import { Session } from "@supabase/supabase-js";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useSessionManagement = (
  session: Session | null,
  setSession: (session: Session | null) => void
) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const clearSession = () => {
    setSession(null);
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('supabase.auth.refreshToken');
  };

  const handleSessionEnd = (message: string) => {
    clearSession();
    navigate("/login");
    toast({
      title: "Sessão encerrada",
      description: message,
    });
  };

  const refreshSession = async (currentSession: Session) => {
    try {
      if (!currentSession?.refresh_token) {
        handleSessionEnd("Sua sessão expirou. Por favor, faça login novamente.");
        return false;
      }

      const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        console.error("Erro ao atualizar sessão:", error);
        if (error.message.includes('refresh_token_not_found')) {
          handleSessionEnd("Sua sessão expirou. Por favor, faça login novamente.");
          return false;
        }
        handleSessionEnd("Erro ao atualizar sua sessão. Por favor, faça login novamente.");
        return false;
      }

      if (newSession) {
        setSession(newSession);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao tentar refresh da sessão:", error);
      handleSessionEnd("Ocorreu um erro ao tentar atualizar sua sessão.");
      return false;
    }
  };

  const checkSessionValidity = async () => {
    if (!session) return;
    
    const expirationTime = new Date(session.expires_at! * 1000);
    const now = new Date();
    const timeUntilExpiration = expirationTime.getTime() - now.getTime();

    // Se a sessão já expirou
    if (timeUntilExpiration <= 0) {
      console.log("Sessão expirada, tentando renovar...");
      const refreshSuccessful = await refreshSession(session);
      if (!refreshSuccessful) {
        handleSessionEnd("Sua sessão expirou. Por favor, faça login novamente.");
      }
      return;
    }

    // Se a sessão vai expirar em menos de 5 minutos
    if (timeUntilExpiration < 5 * 60 * 1000) {
      console.log("Sessão próxima de expirar, tentando renovar...");
      const refreshSuccessful = await refreshSession(session);
      if (!refreshSuccessful) {
        toast({
          title: "Atenção",
          description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
          duration: 10000,
        });
      }
    }
  };

  return {
    clearSession,
    handleSessionEnd,
    checkSessionValidity,
    refreshSession,
  };
};
