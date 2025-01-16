import { Routes as RouterRoutes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/auth/Login";
import Profile from "@/pages/profile/Index";
import InvoiceSettings from "@/pages/profile/InvoiceSettings";
import Customers from "@/pages/customers/Index";
import Products from "@/pages/products/Index";
import NewProduct from "@/pages/products/New";
import Invoices from "@/pages/invoices/Index";
import NewInvoice from "@/pages/invoices/new/Index";
import ViewInvoice from "@/pages/invoices/[id]/Index";
import Plans from "@/pages/plans/Index";
import Feedback from "@/pages/feedback/Index";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/invoice-settings" element={<ProtectedRoute><InvoiceSettings /></ProtectedRoute>} />
      
      <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
      
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/products/new" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
      
      <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
      <Route path="/invoices/new" element={<ProtectedRoute><NewInvoice /></ProtectedRoute>} />
      <Route path="/invoices/:id" element={<ProtectedRoute><ViewInvoice /></ProtectedRoute>} />
      
      <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
    </RouterRoutes>
  );
};

export default Routes;