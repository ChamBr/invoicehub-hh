import { Button } from "@/components/ui/button";

interface CustomerFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function CustomerFormActions({ isSubmitting, onCancel }: CustomerFormActionsProps) {
  return (
    <div className="flex gap-4 justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Cliente"}
      </Button>
    </div>
  );
}