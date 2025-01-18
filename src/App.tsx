import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/i18n/config";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import CustomersIndex from "./pages/customers/Index";
import ProductsIndex from "./pages/products/Index";
import InvoicesIndex from "./pages/invoices/Index";
import PlansIndex from "./pages/plans/Index";
import FeedbackIndex from "./pages/feedback/Index";
import UserProfile from "./pages/profile/UserProfile";
import UserPlan from "./pages/profile/UserPlan";
import CompanyDetails from "./pages/profile/CompanyDetails";
import InvoiceSettings from "./pages/profile/InvoiceSettings";
import AdminSubscribers from "./pages/admin/subscribers/Index";
import AdminPlans from "./pages/admin/plans/Index";
import AdminIntegrations from "./pages/admin/integrations/Index";
import AdminReports from "./pages/admin/reports/Index";
import AdminSettings from "./pages/admin/settings/Index";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isPublicRoute = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isPublicRoute ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-8">
              <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/customers" element={<ProtectedRoute><CustomersIndex /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><ProductsIndex /></ProtectedRoute>} />
                <Route path="/invoices" element={<ProtectedRoute><InvoicesIndex /></ProtectedRoute>} />
                <Route path="/plans" element={<ProtectedRoute><PlansIndex /></ProtectedRoute>} />
                <Route path="/feedback" element={<ProtectedRoute><FeedbackIndex /></ProtectedRoute>} />
                
                {/* Rotas de perfil */}
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/profile/company" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
                <Route path="/profile/plan" element={<ProtectedRoute><UserPlan /></ProtectedRoute>} />
                <Route path="/profile/invoice-settings" element={<ProtectedRoute><InvoiceSettings /></ProtectedRoute>} />
                
                {/* Rotas administrativas */}
                <Route path="/admin/subscribers" element={<ProtectedRoute><AdminSubscribers /></ProtectedRoute>} />
                <Route path="/admin/plans" element={<ProtectedRoute><AdminPlans /></ProtectedRoute>} />
                <Route path="/admin/integrations" element={<ProtectedRoute><AdminIntegrations /></ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
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