import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSessionManagement } from "@/hooks/use-session";

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
  const { clearSession, handleSessionEnd, checkSessionValidity } = useSessionManagement(session, setSession);

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
  }, [navigate, toast, clearSession, handleSessionEnd, checkSessionValidity]);

  return (
    <AuthContext.Provider value={{ session, isLoading, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};