import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type PlanFormData = {
  name: string;
  description: string;
  price_monthly: number;
  price_semiannual: number;
  price_annual: number;
  discount_semiannual: number;
  discount_annual: number;
  status: string;
  features: string;
};

export const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch } = useForm<PlanFormData>();

  const { data: plan } = useQuery({
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
    if (plan) {
      setValue("name", plan.name);
      setValue("description", plan.description || "");
      setValue("price_monthly", plan.price_monthly);
      setValue("price_semiannual", plan.price_semiannual);
      setValue("price_annual", plan.price_annual);
      setValue("discount_semiannual", plan.discount_semiannual);
      setValue("discount_annual", plan.discount_annual);
      setValue("status", plan.status || "active");
      setValue("features", JSON.stringify(plan.features, null, 2));
    }
  }, [plan, setValue]);

  const monthlyPrice = watch("price_monthly");

  // Atualiza automaticamente os preços e descontos quando o preço mensal muda
  useEffect(() => {
    if (monthlyPrice) {
      const semiannualDiscount = 10; // 10% de desconto sugerido
      const annualDiscount = 20; // 20% de desconto sugerido

      setValue("discount_semiannual", semiannualDiscount);
      setValue("discount_annual", annualDiscount);

      const semiannualPrice = monthlyPrice * 6 * (1 - semiannualDiscount / 100);
      const annualPrice = monthlyPrice * 12 * (1 - annualDiscount / 100);

      setValue("price_semiannual", Number(semiannualPrice.toFixed(2)));
      setValue("price_annual", Number(annualPrice.toFixed(2)));
    }
  }, [monthlyPrice, setValue]);

  const onSubmit = async (data: PlanFormData) => {
    try {
      let features;
      try {
        features = JSON.parse(data.features);
      } catch (e) {
        toast({
          title: "Invalid JSON format in features",
          description: "Please check the JSON format and try again",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("plans")
        .update({
          name: data.name,
          description: data.description,
          price_monthly: data.price_monthly,
          price_semiannual: data.price_semiannual,
          price_annual: data.price_annual,
          discount_semiannual: data.discount_semiannual,
          discount_annual: data.discount_annual,
          status: data.status,
          features,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Plan updated successfully",
        description: "The plan has been updated with the new information",
      });

      navigate("/admin/plans");
    } catch (error) {
      toast({
        title: "Error updating plan",
        description: "There was an error updating the plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Plan</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input id="name" {...register("name")} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              defaultValue={plan?.status || "active"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_monthly">Monthly Price (USD)</Label>
            <Input
              id="price_monthly"
              type="number"
              step="0.01"
              {...register("price_monthly", { valueAsNumber: true })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_semiannual">Semi-Annual Price (USD)</Label>
            <Input
              id="price_semiannual"
              type="number"
              step="0.01"
              {...register("price_semiannual", { valueAsNumber: true })}
              required
            />
            <p className="text-sm text-gray-500">
              Suggested discount:{" "}
              <span className="font-medium">{watch("discount_semiannual")}%</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price_annual">Annual Price (USD)</Label>
            <Input
              id="price_annual"
              type="number"
              step="0.01"
              {...register("price_annual", { valueAsNumber: true })}
              required
            />
            <p className="text-sm text-gray-500">
              Suggested discount:{" "}
              <span className="font-medium">{watch("discount_annual")}%</span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Features (JSON format)</Label>
          <Textarea
            id="features"
            {...register("features")}
            className="font-mono"
            rows={10}
          />
          <p className="text-sm text-gray-500">
            Enter features as a JSON object. Example:
            {`
{
  "users": 5,
  "storage": "10GB",
  "support": "24/7",
  "features": [
    "Feature 1",
    "Feature 2"
  ]
}
            `}
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/plans")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
};