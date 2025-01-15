import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PlansIndex = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price");

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Planos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold mb-4">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(plan.price)}
                <span className="text-sm font-normal text-gray-600">
                  /{plan.billing_period === "monthly" ? "mês" : "ano"}
                </span>
              </div>
              <div className="flex-grow">
                {plan.features &&
                  Object.entries(plan.features).map(([feature, included]) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm mb-2"
                    >
                      <span
                        className={`mr-2 ${
                          included ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {included ? "✓" : "✕"}
                      </span>
                      {feature}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansIndex;