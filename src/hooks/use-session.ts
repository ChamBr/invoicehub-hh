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
      const { data: { session: newSession }, error } = await supabase.auth.refreshSession({
        refresh_token: currentSession.refresh_token,
      });
      
      if (error) {
        console.error("Erro ao atualizar sessão:", error);
        handleSessionEnd("Erro ao atualizar sua sessão. Por favor, faça login novamente.");
        return false;
      }

      if (newSession) {
        setSession(newSession);
        localStorage.setItem('supabase.auth.token', JSON.stringify({
          currentSession: {
            access_token: newSession.access_token,
            refresh_token: newSession.refresh_token,
          }
        }));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao tentar refresh da sessão:", error);
      handleSessionEnd("Ocorreu um erro ao tentar atualizar sua sessão.");
      return false;
    }
  };

  const checkSessionValidity = async (currentSession: Session) => {
    const expirationTime = new Date(currentSession.expires_at! * 1000);
    const now = new Date();
    const timeUntilExpiration = expirationTime.getTime() - now.getTime();

    // Se a sessão já expirou
    if (timeUntilExpiration <= 0) {
      const refreshSuccessful = await refreshSession(currentSession);
      if (!refreshSuccessful) {
        handleSessionEnd("Sua sessão expirou. Por favor, faça login novamente.");
        return false;
      }
      return true;
    }

    // Se a sessão vai expirar em menos de 5 minutos, tenta renovar
    if (timeUntilExpiration < 5 * 60 * 1000) {
      const refreshSuccessful = await refreshSession(currentSession);
      if (!refreshSuccessful) {
        toast({
          title: "Atenção",
          description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
          duration: 10000,
        });
      }
    }

    return true;
  };

  return {
    clearSession,
    handleSessionEnd,
    checkSessionValidity,
    refreshSession,
  };
};