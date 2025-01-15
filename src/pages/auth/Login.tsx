import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

const Login = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F1F0FB] via-[#D6BCFA] to-[#9b87f5]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F1F0FB] via-[#D6BCFA] to-[#9b87f5] p-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8">
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
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                transform: 'translateY(0)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              },
              input: {
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              },
              label: {
                fontSize: '0.875rem',
                color: '#4B5563',
                marginBottom: '0.5rem',
                fontWeight: '500'
              },
              anchor: {
                color: '#10B981',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontWeight: '500'
              },
              container: {
                perspective: '1000px'
              }
            }
          }}
          theme="custom"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Login;