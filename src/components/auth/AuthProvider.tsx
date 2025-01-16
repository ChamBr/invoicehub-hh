import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  session: null, 
  isLoading: true,
  clearSession: () => {} 
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Função para limpar a sessão e storage local
  const clearSession = () => {
    setSession(null);
    localStorage.clear(); // Limpa todo o localStorage
  };

  // Função para limpar a sessão e redirecionar para login
  const handleSessionEnd = (message: string) => {
    clearSession();
    navigate("/login");
    toast({
      title: "Sessão encerrada",
      description: message,
    });
  };

  // Função para verificar a validade da sessão
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erro ao verificar sessão:", error);
          handleSessionEnd("Erro ao verificar sua sessão. Por favor, faça login novamente.");
          return;
        }

        if (!currentSession) {
          console.log("Nenhuma sessão encontrada");
          navigate("/login");
          return;
        }

        if (checkSessionValidity(currentSession)) {
          setSession(currentSession);
          console.log("Sessão inicializada com sucesso");
        }
      } catch (error) {
        console.error("Erro ao inicializar auth:", error);
        handleSessionEnd("Ocorreu um erro ao inicializar sua sessão.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Mudança no estado de autenticação:", event);
      setIsLoading(true);
      
      switch (event) {
        case "SIGNED_OUT":
          clearSession();
          navigate("/login");
          break;
          
        case "SIGNED_IN":
          if (newSession) {
            setSession(newSession);
            toast({
              title: "Login realizado",
              description: "Bem-vindo ao sistema",
            });
            navigate("/");
          }
          break;
          
        case "TOKEN_REFRESHED":
          if (newSession) {
            console.log("Token atualizado com sucesso");
            setSession(newSession);
          }
          break;
          
        case "USER_UPDATED":
          if (newSession) {
            setSession(newSession);
          }
          break;
      }

      setIsLoading(false);
    });

    // Verificar sessão a cada minuto
    const sessionCheck = setInterval(async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession) {
        checkSessionValidity(currentSession);
      }
    }, 60000);

    return () => {
      subscription.unsubscribe();
      clearInterval(sessionCheck);
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ session, isLoading, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};