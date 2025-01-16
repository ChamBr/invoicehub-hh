import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ProductFormActionsProps {
  onCancel: () => void;
  isLoading: boolean;
}

export const ProductFormActions = ({ onCancel, isLoading }: ProductFormActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end gap-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        {t('common.actions.cancel')}
      </Button>
      <Button type="submit" disabled={isLoading}>
        {t('common.actions.create')}
      </Button>
    </div>
  );
};