import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/i18n/config";
import { AuthProvider } from "./components/auth/AuthProvider";
import { AuthenticatedLayout } from "./layouts/AuthenticatedLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminRoutes } from "./routes/AdminRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isPublicRoute = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {isPublicRoute ? (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </PublicLayout>
      ) : (
        <AuthenticatedLayout>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </AuthenticatedLayout>
      )}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppLayout />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;