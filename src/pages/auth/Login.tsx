import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session) {
        console.log("User signed in, redirecting...");
        navigate("/");
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      console.log("Session exists, redirecting...");
      navigate("/");
    }
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50/50 p-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            InvoiceHub
          </h1>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#10B981',
                  brandAccent: '#065F46',
                  inputBackground: 'white',
                  inputText: '#1F2937',
                  inputBorder: '#E5E7EB',
                  inputBorderHover: '#10B981',
                  inputBorderFocus: '#10B981',
                }
              }
            },
            style: {
              button: {
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                backgroundColor: '#10B981',
                color: 'white',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
              },
              input: {
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                transition: 'all 0.2s ease',
                outline: 'none'
              },
              label: {
                fontSize: '0.875rem',
                color: '#4B5563',
                marginBottom: '0.5rem'
              },
              anchor: {
                color: '#10B981',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              },
              message: {
                color: '#DC2626',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }
            }
          }}
          theme="custom"
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'E-mail',
                password_label: 'Senha',
                button_label: 'Entrar',
                loading_button_label: 'Entrando...',
                email_input_placeholder: 'Seu e-mail',
                password_input_placeholder: 'Sua senha',
                link_text: 'Já tem uma conta? Entre',
                confirmation_text: 'Verifique seu e-mail para o link de confirmação'
              },
              sign_up: {
                email_label: 'E-mail',
                password_label: 'Senha',
                button_label: 'Cadastrar',
                loading_button_label: 'Cadastrando...',
                email_input_placeholder: 'Seu e-mail',
                password_input_placeholder: 'Sua senha',
                link_text: 'Não tem uma conta? Cadastre-se',
                confirmation_text: 'Verifique seu e-mail para o link de confirmação'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;