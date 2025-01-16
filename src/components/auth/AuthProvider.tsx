import React, { createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { useAuthSession } from './hooks/useAuthSession';
import { useAuthSubscription } from './hooks/useAuthSubscription';
import { useSessionCheck } from './hooks/useSessionCheck';
import { useSessionManagement } from '@/hooks/use-session';

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    session,
    setSession,
    isLoading,
    initializeAuth
  } = useAuthSession();

  const { clearSession, handleSessionEnd, checkSessionValidity } = useSessionManagement(session, setSession);

  // Inicializa a autenticação
  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Gerencia as mudanças de estado da autenticação
  useAuthSubscription(setSession, handleSessionEnd);

  // Verifica a validade da sessão periodicamente
  useSessionCheck(session, () => checkSessionValidity(session));

  return (
    <AuthContext.Provider value={{ session, isLoading, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;