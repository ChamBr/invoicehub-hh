import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const UserPlan = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

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
    },
    onError: () => {
      toast({
        title: t('errors.load_subscription'),
        description: t('errors.try_again'),
        variant: "destructive",
      });
    }
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
        <Card className="p-6 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{subscription.plan.name}</h2>
              <p className="text-gray-600 mt-1">{subscription.plan.description}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(subscription.plan.price)}
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
                Object.entries(subscription.plan.features as Record<string, boolean>).map(
                  ([feature, included]) => (
                    <div
                      key={feature}
                      className={`flex items-center gap-3 ${
                        included ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      <Check
                        className={`h-5 w-5 ${
                          included ? "text-primary" : "text-gray-300"
                        }`}
                      />
                      <span className="text-sm">
                        {t(`profile.plan.feature_${feature}`)}
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: t('profile.plan.contact_support'),
                  description: t('profile.plan.contact_description'),
                });
              }}
            >
              {t('profile.plan.cancel')}
            </Button>
            <Button 
              variant="default"
              onClick={() => {
                toast({
                  title: t('profile.plan.upgrade_soon'),
                  description: t('profile.plan.upgrade_description'),
                });
              }}
            >
              {t('profile.plan.change')}
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-8 text-center bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('profile.plan.no_subscription_title')}</h3>
          <p className="text-gray-600 mb-6">{t('profile.plan.no_subscription')}</p>
          <Button 
            size="lg"
            onClick={() => {
              toast({
                title: t('profile.plan.subscribe_soon'),
                description: t('profile.plan.subscribe_description'),
              });
            }}
          >
            {t('profile.plan.subscribe')}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default UserPlan;