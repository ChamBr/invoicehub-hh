import { useNavigate } from "react-router-dom";
import { PlanForm } from "./components/PlanForm";

export const NewPlan = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Plan</h1>
      <PlanForm 
        onSuccess={() => navigate("/admin/plans")}
        onCancel={() => navigate("/admin/plans")}
      />
    </div>
  );
};