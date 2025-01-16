import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<{ name: string; included: boolean }[]>([]);

  const { data: plan, isLoading: isPlanLoading } = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (plan?.features) {
      const featuresArray = Object.entries(plan.features as Record<string, boolean>).map(
        ([name, included]) => ({ name, included })
      );
      setFeatures(featuresArray);
    }
  }, [plan]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const featuresObject = features.reduce(
      (acc, feature) => ({
        ...acc,
        [feature.name]: feature.included,
      }),
      {}
    );

    try {
      const planData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        billing_period: formData.get("billing_period") as string,
        features: featuresObject,
      };

      const { error } = await supabase
        .from("plans")
        .update(planData)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Plano atualizado",
        description: "O plano foi atualizado com sucesso.",
      });
      navigate("/admin/plans");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar plano",
        description: "Ocorreu um erro ao atualizar o plano.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isPlanLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Editar Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Plano</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={plan?.name}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={plan?.description || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={plan?.price}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Período de Cobrança</Label>
                <RadioGroup
                  defaultValue={plan?.billing_period}
                  name="billing_period"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Mensal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Anual</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Recursos do Plano</Label>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Input
                      value={feature.name}
                      onChange={(e) => {
                        const newFeatures = [...features];
                        newFeatures[index].name = e.target.value;
                        setFeatures(newFeatures);
                      }}
                      placeholder="Nome do recurso"
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={feature.included}
                        onCheckedChange={(checked) => {
                          const newFeatures = [...features];
                          newFeatures[index].included = checked;
                          setFeatures(newFeatures);
                        }}
                      />
                      <Label>Incluído</Label>
                    </div>
                    {features.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setFeatures(features.filter((_, i) => i !== index));
                        }}
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFeatures([...features, { name: "", included: true }]);
                  }}
                >
                  Adicionar Recurso
                </Button>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/plans")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPlan;