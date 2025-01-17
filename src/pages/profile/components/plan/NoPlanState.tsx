import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NoPlanStateProps {
  onSelectPlan: () => void;
}

export function NoPlanState({ onSelectPlan }: NoPlanStateProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t('profile.plan.title')}</h2>
        <p className="text-muted-foreground">
          {t('profile.plan.description')}
        </p>
      </div>

      <Card className="p-8">
        <Alert className="mb-6 bg-accent border-primary/20">
          <AlertTitle className="text-lg font-semibold text-gray-900">
            {t('profile.plan.no_active_plan_title')}
          </AlertTitle>
          <AlertDescription className="text-gray-600">
            {t('profile.plan.no_active_plan_description')}
          </AlertDescription>
        </Alert>
        <Button
          onClick={onSelectPlan}
          className="w-full md:w-auto"
        >
          {t('profile.plan.select_plan')}
        </Button>
      </Card>
    </div>
  );
}