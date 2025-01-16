import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Send, FileText, XCircle } from "lucide-react";
import { InvoiceStatus, invoiceStatusConfig } from "./types";

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

const icons = {
  draft: FileText,
  created: CheckCircle2,
  sent: Send,
  pending: Clock,
  overdue: AlertCircle,
  cancelled: XCircle,
  paid: CheckCircle2,
} as const;

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const Icon = icons[status];

  return (
    <Badge
      variant="outline"
      className={cn(
        "flex w-fit items-center gap-1",
        invoiceStatusConfig[status].color,
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{invoiceStatusConfig[status].label}</span>
    </Badge>
  );
}