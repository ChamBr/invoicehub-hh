import { useTranslation } from 'react-i18next';

export const FeedbackHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">
        {t('feedback.title')}
      </h2>
    </div>
  );
};