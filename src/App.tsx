import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BaseLayout from "@/components/layout/BaseLayout";

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
                  <BaseLayout>
                    <Index />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <CustomersIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers/new"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <NewCustomer />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <ProductsIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <InvoicesIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/plans"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <PlansIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <FeedbackIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <AdminIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <AdminCustomersIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/integrations"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <AdminIntegrationsIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/plans"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <AdminPlansIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <AdminReportsIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <AdminSettingsIndex />
                  </BaseLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <BaseLayout>
                    <ProfileIndex />
                  </BaseLayout>
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