import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/i18n/config";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
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
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/customers" element={<CustomersIndex />} />
                <Route path="/customers/new" element={<NewCustomer />} />
                <Route path="/products" element={<ProductsIndex />} />
                <Route path="/invoices" element={<InvoicesIndex />} />
                <Route path="/plans" element={<PlansIndex />} />
                <Route path="/feedback" element={<FeedbackIndex />} />
                <Route path="/profile" element={<ProfileIndex />} />
                <Route path="/admin" element={<AdminIndex />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;