import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export function FormActions({
  onCancel,
  isSubmitting,
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  className = "flex justify-end gap-4"
}: FormActionsProps) {
  return (
    <div className={className}>
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </Button>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : submitLabel}
      </Button>
    </div>
  );
}