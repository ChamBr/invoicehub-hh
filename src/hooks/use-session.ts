import { Session } from "@supabase/supabase-js";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

export const useSessionManagement = (
  session: Session | null,
  setSession: (session: Session | null) => void
) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const clearSession = () => {
    setSession(null);
    localStorage.clear();
  };

  const handleSessionEnd = (message: string) => {
    clearSession();
    navigate("/login");
    toast({
      title: "Sessão encerrada",
      description: message,
    });
  };

  const checkSessionValidity = (currentSession: Session) => {
    const expirationTime = new Date(currentSession.expires_at! * 1000);
    const now = new Date();
    const timeUntilExpiration = expirationTime.getTime() - now.getTime();

    if (timeUntilExpiration <= 0) {
      handleSessionEnd("Sua sessão expirou. Por favor, faça login novamente.");
      return false;
    }

    if (timeUntilExpiration < 5 * 60 * 1000) {
      toast({
        title: "Atenção",
        description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
        duration: 10000,
      });
    }

    return true;
  };

  return {
    clearSession,
    handleSessionEnd,
    checkSessionValidity,
  };
};