import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/i18n/config";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
import AdminIndex from "./pages/admin/Index";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                  <Route path="/customers" element={<ProtectedRoute><CustomersIndex /></ProtectedRoute>} />
                  <Route path="/customers/new" element={<ProtectedRoute><NewCustomer /></ProtectedRoute>} />
                  <Route path="/products" element={<ProtectedRoute><ProductsIndex /></ProtectedRoute>} />
                  <Route path="/invoices" element={<ProtectedRoute><InvoicesIndex /></ProtectedRoute>} />
                  <Route path="/plans" element={<ProtectedRoute><PlansIndex /></ProtectedRoute>} />
                  <Route path="/feedback" element={<ProtectedRoute><FeedbackIndex /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfileIndex /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute><AdminIndex /></ProtectedRoute>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;