import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlanSelection } from "./components/plan/PlanSelection";
import { useAuth } from "@/components/auth/AuthProvider";

const UserPlan = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { session } = useAuth();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["user-subscription"],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data, error } = await supabase
        .from("subscriptions")
        .select(`
          *,
          plan:plans(
            name,
            description,
            price_monthly,
            billing_period,
            features
          )
        `)
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        console.error("Error fetching subscription:", error);
        toast({
          title: t('errors.load_subscription'),
          description: t('errors.try_again'),
          variant: "destructive",
        });
        return null;
      }

      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.plan.title')}</h1>

      {subscription ? (
        <Card className="p-6 bg-white shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{subscription.plan.name}</h2>
              <p className="text-gray-600 mt-1">{subscription.plan.description}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(subscription.plan.price_monthly)}
                <span className="text-sm font-normal text-gray-600 ml-1">
                  /{subscription.plan.billing_period === "monthly" ? t('profile.plan.monthly') : t('profile.plan.yearly')}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {t('profile.plan.next_billing')}: {new Date(subscription.renewal_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('profile.plan.features')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscription.plan.features &&
                Object.entries(subscription.plan.features as Record<string, any>).map(
                  ([feature, value]) => (
                    <div
                      key={feature}
                      className={`flex items-center gap-3 ${
                        value ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      <Check
                        className={`h-5 w-5 ${
                          value ? "text-primary" : "text-gray-300"
                        }`}
                      />
                      <span className="text-sm">
                        {t(`profile.plan.feature_${feature}`)}
                        {typeof value === 'number' && value !== -1 && `: ${value}`}
                        {typeof value === 'number' && value === -1 && `: ${t('profile.plan.unlimited')}`}
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center bg-white shadow-sm mb-8">
          <Alert className="mb-6 bg-accent border-primary/20">
            <AlertTitle className="text-lg font-semibold text-gray-900 mb-2">
              {t('profile.plan.no_active_plan_title')}
            </AlertTitle>
            <AlertDescription className="text-gray-600">
              {t('profile.plan.no_active_plan_description')}
            </AlertDescription>
          </Alert>
        </Card>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">{t('profile.plan.available_plans')}</h2>
        <PlanSelection />
      </div>
    </div>
  );
};

export default UserPlan;