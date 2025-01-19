import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SubscriptionProtectedRoute from "@/components/auth/SubscriptionProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import CustomersIndex from "@/pages/customers/Index";
import ProductsIndex from "@/pages/products/Index";
import InvoicesIndex from "@/pages/invoices/Index";
import PlansIndex from "@/pages/plans/Index";
import FeedbackIndex from "@/pages/feedback/Index";
import UserProfile from "@/pages/profile/UserProfile";
import UserPlan from "@/pages/profile/UserPlan";
import CompanyDetails from "@/pages/profile/CompanyDetails";
import InvoiceSettings from "@/pages/profile/InvoiceSettings";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Rotas que requerem assinatura */}
      <Route path="/customers" element={
        <ProtectedRoute>
          <SubscriptionProtectedRoute>
            <CustomersIndex />
          </SubscriptionProtectedRoute>
        </ProtectedRoute>
      } />
      <Route path="/products" element={
        <ProtectedRoute>
          <SubscriptionProtectedRoute>
            <ProductsIndex />
          </SubscriptionProtectedRoute>
        </ProtectedRoute>
      } />
      <Route path="/invoices" element={
        <ProtectedRoute>
          <SubscriptionProtectedRoute>
            <InvoicesIndex />
          </SubscriptionProtectedRoute>
        </ProtectedRoute>
      } />
      
      {/* Rotas de usuário */}
      <Route path="/plans" element={<ProtectedRoute><PlansIndex /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><FeedbackIndex /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      <Route path="/profile/company" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
      <Route path="/profile/plan" element={<ProtectedRoute><UserPlan /></ProtectedRoute>} />
      <Route path="/profile/invoice-settings" element={
        <ProtectedRoute>
          <SubscriptionProtectedRoute>
            <InvoiceSettings />
          </SubscriptionProtectedRoute>
        </ProtectedRoute>
      } />
    </Routes>
  );
};