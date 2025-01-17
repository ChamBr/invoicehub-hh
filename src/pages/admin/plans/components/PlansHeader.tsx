import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PlansHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Plans Management</h1>
      <Button onClick={() => navigate("/admin/plans/new")}>
        <PlusIcon className="w-4 h-4 mr-2" />
        New Plan
      </Button>
    </div>
  );
}