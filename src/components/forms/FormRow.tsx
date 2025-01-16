import { cn } from "@/lib/utils";

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
}

export function FormRow({ children, className }: FormRowProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {children}
    </div>
  );
}