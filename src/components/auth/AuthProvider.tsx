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
    // Verificar modo de desenvolvimento
    const checkDevMode = async () => {
      const { data: devConfigs, error: configError } = await supabase
        .from("configurations")
        .select("*")
        .eq("name", "dev_auto_login")
        .limit(1);

      if (configError) {
        console.error("Erro ao buscar configuração de desenvolvimento:", configError);
        return;
      }

      const devConfig = devConfigs?.[0];
      
      if (devConfig?.is_enabled) {
        console.log("Modo desenvolvimento ativo - tentando auto-login");
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
          email: "admin@example.com",
          password: "admin123",
        });

        if (error) {
          console.error("Erro no auto-login:", error);
          toast({
            variant: "destructive",
            title: "Erro no auto-login",
            description: "Verifique as credenciais de desenvolvimento",
          });
        } else if (session) {
          setSession(session);
          toast({
            title: "Auto-login realizado",
            description: "Modo desenvolvimento ativo",
          });
        }
      }
    };

    // Verificar sessão atual e configurar listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkDevMode();
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
      
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};