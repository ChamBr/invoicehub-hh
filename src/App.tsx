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
import Index from "./pages/Index";
import CustomersIndex from "./pages/customers/Index";
import NewCustomer from "./pages/customers/New";
import ProductsIndex from "./pages/products/Index";
import InvoicesIndex from "./pages/invoices/Index";
import PlansIndex from "./pages/plans/Index";
import FeedbackIndex from "./pages/feedback/Index";
import ProfileIndex from "./pages/profile/Index";
import AdminCustomers from "./pages/admin/customers/Index";
import AdminPlans from "./pages/admin/plans/Index";
import AdminIntegrations from "./pages/admin/integrations/Index";
import AdminReports from "./pages/admin/reports/Index";
import AdminSettings from "./pages/admin/settings/Index";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-8">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/customers" element={<ProtectedRoute><CustomersIndex /></ProtectedRoute>} />
                <Route path="/customers/new" element={<ProtectedRoute><NewCustomer /></ProtectedRoute>} />
                <Route path="/products" element={<ProtectedRoute><ProductsIndex /></ProtectedRoute>} />
                <Route path="/invoices" element={<ProtectedRoute><InvoicesIndex /></ProtectedRoute>} />
                <Route path="/plans" element={<ProtectedRoute><PlansIndex /></ProtectedRoute>} />
                <Route path="/feedback" element={<ProtectedRoute><FeedbackIndex /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfileIndex /></ProtectedRoute>} />
                
                {/* Novas rotas administrativas */}
                <Route path="/admin/customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      )}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;