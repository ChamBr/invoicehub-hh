import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plan } from "@/pages/profile/components/plan/types";
import { PlanTableRow } from "./PlanTableRow";

interface PlansTableProps {
  plans: Plan[];
  onStatusChange: (id: string, status: string) => void;
  formatCurrency: (value: number) => string;
}

export function PlansTable({ plans, onStatusChange, formatCurrency }: PlansTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Monthly</TableHead>
          <TableHead>Semi-Annual</TableHead>
          <TableHead>Annual</TableHead>
          <TableHead>Features</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans?.map((plan) => (
          <PlanTableRow
            key={plan.id}
            plan={plan}
            onStatusChange={onStatusChange}
            formatCurrency={formatCurrency}
          />
        ))}
      </TableBody>
    </Table>
  );
}