import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminSubscribers from "@/pages/admin/subscribers/Index";
import AdminPlans from "@/pages/admin/plans/Index";
import AdminIntegrations from "@/pages/admin/integrations/Index";
import AdminReports from "@/pages/admin/reports/Index";
import AdminSettings from "@/pages/admin/settings/Index";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/subscribers" element={<ProtectedRoute requiresAdmin><AdminSubscribers /></ProtectedRoute>} />
      <Route path="/plans" element={<ProtectedRoute requiresAdmin><AdminPlans /></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute requiresAdmin><AdminIntegrations /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute requiresAdmin><AdminReports /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute requiresAdmin><AdminSettings /></ProtectedRoute>} />
    </Routes>
  );
};