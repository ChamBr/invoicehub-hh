import { Plan } from "@/pages/profile/components/plan/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlanFeaturesList } from "./PlanFeaturesList";

interface PlanTableRowProps {
  plan: Plan;
  onStatusChange: (id: string, status: string) => void;
  formatCurrency: (value: number) => string;
}

export function PlanTableRow({ plan, onStatusChange, formatCurrency }: PlanTableRowProps) {
  const navigate = useNavigate();

  return (
    <TableRow key={plan.id}>
      <TableCell className="font-medium">{plan.name}</TableCell>
      <TableCell>{formatCurrency(plan.price_monthly || 0)}</TableCell>
      <TableCell>
        {formatCurrency(plan.price_semiannual || 0)}
        {plan.discount_semiannual > 0 && (
          <span className="ml-2 text-sm text-emerald-600">
            (-{plan.discount_semiannual}%)
          </span>
        )}
      </TableCell>
      <TableCell>
        {formatCurrency(plan.price_annual || 0)}
        {plan.discount_annual > 0 && (
          <span className="ml-2 text-sm text-emerald-600">
            (-{plan.discount_annual}%)
          </span>
        )}
      </TableCell>
      <TableCell>
        <PlanFeaturesList features={plan.features} />
      </TableCell>
      <TableCell>
        <Switch
          checked={plan.status === "active"}
          onCheckedChange={(checked) => {
            onStatusChange(plan.id, checked ? "active" : "inactive");
          }}
        />
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/admin/plans/edit/${plan.id}`)}
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}