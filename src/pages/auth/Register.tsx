import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showError, setShowError] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!hasInteracted) return;
      
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Conta criada com sucesso",
          description: "Bem-vindo ao InvoiceHub!",
        });
        console.log("User signed in, redirecting...");
        navigate("/dashboard");
      }

      if (event === 'SIGNED_OUT') {
        setShowError(true);
        toast({
          title: "Erro no cadastro",
          description: "Verifique os dados informados e tente novamente.",
          variant: "destructive",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast, hasInteracted]);

  useEffect(() => {
    if (session) {
      console.log("Session exists, redirecting...");
      navigate("/dashboard");
    }
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleAuthEvent = () => {
    setHasInteracted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50/50">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para página inicial
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              InvoiceHub
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900">
              Criar nova conta
            </h2>
          </div>

          <Auth
            supabaseClient={supabase}
            view="sign_up"
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
            redirectTo="https://lovable.dev/projects/6da9d077-2ba7-49f4-b3cc-e8187014400b/dashboard"
            localization={{
              variables: {
                sign_up: {
                  email_label: 'E-mail',
                  password_label: 'Senha',
                  button_label: 'Criar conta',
                  loading_button_label: 'Criando conta...',
                  email_input_placeholder: 'Seu e-mail',
                  password_input_placeholder: 'Sua senha',
                  link_text: 'Já tem uma conta? Entre',
                  confirmation_text: 'Ao criar uma conta, você concorda com nossos termos de serviço',
                }
              }
            }}
            magicLink={false}
          />

          {showError && hasInteracted && (
            <div className="mt-4">
              <Alert variant="default" className="bg-gray-50 border-gray-200">
                <AlertDescription>
                  A senha deve ter no mínimo 6 caracteres.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;