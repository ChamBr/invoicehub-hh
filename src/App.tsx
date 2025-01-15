import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/i18n/config";
import Navbar from "./components/layout/Navbar";
import Index from "./pages/Index";
import CustomersIndex from "./pages/customers/Index";
import ProductsIndex from "./pages/products/Index";
import InvoicesIndex from "./pages/invoices/Index";
import PlansIndex from "./pages/plans/Index";
import FeedbackIndex from "./pages/feedback/Index";
import ProfileIndex from "./pages/profile/Index";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/customers" element={<CustomersIndex />} />
              <Route path="/products" element={<ProductsIndex />} />
              <Route path="/invoices" element={<InvoicesIndex />} />
              <Route path="/plans" element={<PlansIndex />} />
              <Route path="/feedback" element={<FeedbackIndex />} />
              <Route path="/profile" element={<ProfileIndex />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;