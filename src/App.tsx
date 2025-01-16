import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Login from "@/pages/auth/Login";
import Index from "@/pages/Index";
import CustomersIndex from "@/pages/customers/Index";
import NewCustomer from "@/pages/customers/New";
import ProductsIndex from "@/pages/products/Index";
import InvoicesIndex from "@/pages/invoices/Index";
import PlansIndex from "@/pages/plans/Index";
import FeedbackIndex from "@/pages/feedback/Index";
import AdminIndex from "@/pages/admin/Index";
import AdminCustomersIndex from "@/pages/admin/customers/Index";
import AdminIntegrationsIndex from "@/pages/admin/integrations/Index";
import AdminPlansIndex from "@/pages/admin/plans/Index";
import AdminReportsIndex from "@/pages/admin/reports/Index";
import AdminSettingsIndex from "@/pages/admin/settings/Index";
import ProfileIndex from "@/pages/profile/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <CustomersIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers/new"
              element={
                <ProtectedRoute>
                  <NewCustomer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <InvoicesIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/plans"
              element={
                <ProtectedRoute>
                  <PlansIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <FeedbackIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute>
                  <AdminCustomersIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/integrations"
              element={
                <ProtectedRoute>
                  <AdminIntegrationsIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/plans"
              element={
                <ProtectedRoute>
                  <AdminPlansIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute>
                  <AdminReportsIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminSettingsIndex />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileIndex />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;