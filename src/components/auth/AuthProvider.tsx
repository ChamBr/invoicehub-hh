import { createContext, useContext } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useSessionManagement } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthInitialization } from "./hooks/useAuthInitialization";
import { useAuthSubscription } from "./hooks/useAuthSubscription";
import { useSessionCheck } from "./hooks/useSessionCheck";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  clearSession: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { session, setSession, isLoading, setIsLoading } = useAuthState();
  const { toast } = useToast();

  const clearSession = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.refreshToken');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar desconectar sua conta",
        variant: "destructive",
      });
    }
  };

  const { checkSessionValidity } = useSessionManagement(session, setSession);

  useAuthInitialization(setSession, setIsLoading, clearSession);
  useAuthSubscription(setSession, setIsLoading);
  useSessionCheck(session, checkSessionValidity);

  return (
    <AuthContext.Provider value={{ session, isLoading, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;