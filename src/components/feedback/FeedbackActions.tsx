import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

interface FeedbackActionsProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const FeedbackActions = ({
  isSubmitting,
  onSubmit,
}: FeedbackActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
      </Button>
    </div>
  );
};