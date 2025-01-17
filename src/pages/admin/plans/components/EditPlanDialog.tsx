import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plan } from "@/pages/profile/components/plan/types";
import { PlanForm } from "./PlanForm";

interface EditPlanDialogProps {
  plan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditPlanDialog({ plan, isOpen, onClose }: EditPlanDialogProps) {
  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
        </DialogHeader>
        <PlanForm 
          planId={plan.id} 
          defaultValues={{
            name: plan.name,
            description: plan.description || "",
            price_monthly: plan.price_monthly || 0,
            price_annual: plan.price_annual || 0,
            discount_annual: plan.discount_annual || 0,
            features: plan.features,
            status: plan.status as "active" | "inactive"
          }}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}