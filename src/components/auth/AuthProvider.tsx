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
    // Verificar sessão atual
    const checkSession = async () => {
      try {
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

    checkSession();

    // Configurar listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      setIsLoading(false);

      if (event === "SIGNED_OUT" || event === "USER_DELETED") {
        navigate("/login");
        toast({
          title: "Sessão encerrada",
          description: "Você foi desconectado do sistema",
        });
      } else if (event === "SIGNED_IN") {
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao sistema",
        });
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};