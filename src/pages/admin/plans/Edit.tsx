import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { PlanForm } from "./components/PlanForm";

export const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: plan, isLoading } = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Plan</h1>
      <Card className="p-6">
        <PlanForm
          planId={id}
          defaultValues={plan}
          onSuccess={() => navigate("/admin/plans")}
          onCancel={() => navigate("/admin/plans")}
        />
      </Card>
    </div>
  );
};