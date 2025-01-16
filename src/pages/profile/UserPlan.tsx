import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const UserPlan = () => {
  const { t } = useTranslation();

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["user-subscription"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: customer } = await supabase
        .from("customers")
        .select("id")
        .eq("email", user.email)
        .single();

      if (!customer) return null;

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select(`
          *,
          plan:plans(
            name,
            description,
            price,
            billing_period,
            features
          )
        `)
        .eq("customer_id", customer.id)
        .eq("status", "active")
        .single();

      return subscription;
    }
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('profile.plan.title')}</h1>

      {subscription ? (
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">{subscription.plan.name}</h2>
              <p className="text-gray-600">{subscription.plan.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(subscription.plan.price)}
                <span className="text-sm font-normal text-gray-600">
                  /{subscription.plan.billing_period === "monthly" ? t('profile.plan.monthly') : t('profile.plan.yearly')}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">{t('profile.plan.features')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subscription.plan.features &&
                Object.entries(subscription.plan.features as Record<string, boolean>).map(
                  ([feature, included]) => (
                    <div
                      key={feature}
                      className={`flex items-center gap-2 ${
                        included ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      <Check
                        className={`h-4 w-4 ${
                          included ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                      {t(`profile.plan.feature_${feature}`)}
                    </div>
                  )
                )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline">{t('profile.plan.change')}</Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-gray-600 mb-4">{t('profile.plan.no_subscription')}</p>
          <Button>{t('profile.plan.subscribe')}</Button>
        </Card>
      )}
    </div>
  );
};

export default UserPlan;