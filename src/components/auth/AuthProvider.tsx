import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ session: null, isLoading: true });

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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Limpar qualquer sessão antiga que possa estar causando conflito
        const currentSession = await supabase.auth.getSession();
        
        if (currentSession.error) {
          console.error("Erro ao verificar sessão:", currentSession.error);
          await supabase.auth.signOut();
          setSession(null);
          navigate("/login");
          return;
        }

        if (!currentSession.data.session) {
          console.log("Nenhuma sessão encontrada");
          navigate("/login");
          return;
        }

        setSession(currentSession.data.session);
        console.log("Sessão inicializada com sucesso");
        
      } catch (error) {
        console.error("Erro ao inicializar auth:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Mudança no estado de autenticação:", event);
      
      switch (event) {
        case "SIGNED_OUT":
          setSession(null);
          navigate("/login");
          toast({
            title: "Sessão encerrada",
            description: "Você foi desconectado do sistema",
          });
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

    // Verificar expiração da sessão a cada minuto
    const sessionCheck = setInterval(async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession) {
        console.log("Sessão não encontrada durante verificação");
        clearInterval(sessionCheck);
        return;
      }

      const expirationTime = new Date(currentSession.expires_at! * 1000);
      const now = new Date();
      const timeUntilExpiration = expirationTime.getTime() - now.getTime();
      
      // Aviso 5 minutos antes da expiração
      if (timeUntilExpiration < 5 * 60 * 1000 && timeUntilExpiration > 0) {
        toast({
          title: "Atenção",
          description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
          duration: 10000,
        });
      }
      
      // Sessão expirada
      if (timeUntilExpiration <= 0) {
        await supabase.auth.signOut();
        setSession(null);
        navigate("/login");
        toast({
          variant: "destructive",
          title: "Sessão expirada",
          description: "Sua sessão expirou. Por favor, faça login novamente.",
        });
      }
    }, 60000); // Verificar a cada minuto

    return () => {
      subscription.unsubscribe();
      clearInterval(sessionCheck);
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};