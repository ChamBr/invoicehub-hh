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
        // Verificar sessão atual
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erro ao verificar sessão:", error);
          toast({
            variant: "destructive",
            title: "Erro de autenticação",
            description: "Por favor, faça login novamente",
          });
          navigate("/login");
          return;
        }

        setSession(currentSession);
        
        if (!currentSession && window.location.pathname !== "/login") {
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Configurar listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      
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
          setSession(newSession);
          toast({
            title: "Login realizado",
            description: "Bem-vindo ao sistema",
          });
          navigate("/");
          break;
          
        case "TOKEN_REFRESHED":
          console.log("Token atualizado com sucesso");
          setSession(newSession);
          break;
          
        case "USER_UPDATED":
          setSession(newSession);
          break;
      }

      setIsLoading(false);
    });

    // Verificar expiração da sessão a cada 5 minutos
    const checkSessionExpiration = setInterval(async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      if (!currentSession) {
        clearInterval(checkSessionExpiration);
        return;
      }

      if (currentSession?.expires_at) {
        const expirationTime = new Date(currentSession.expires_at * 1000);
        const now = new Date();
        const timeUntilExpiration = expirationTime.getTime() - now.getTime();
        
        // Se faltar menos de 5 minutos para expirar
        if (timeUntilExpiration < 5 * 60 * 1000 && timeUntilExpiration > 0) {
          toast({
            title: "Atenção",
            description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
            duration: 10000,
          });
        }
        
        // Se já expirou
        if (timeUntilExpiration <= 0) {
          await supabase.auth.signOut();
          navigate("/login");
          toast({
            variant: "destructive",
            title: "Sessão expirada",
            description: "Sua sessão expirou. Por favor, faça login novamente.",
          });
        }
      }
    }, 300000); // 5 minutos

    return () => {
      subscription.unsubscribe();
      clearInterval(checkSessionExpiration);
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};