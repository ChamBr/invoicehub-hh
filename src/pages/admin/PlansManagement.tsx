import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const PlansManagement = () => {
  const navigate = useNavigate();

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price_monthly", { ascending: true })
        .maybeSingle();

      if (error) throw error;
      return data ? [data] : [];
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gerenciamento de Planos</h2>
        <Button onClick={() => navigate("/admin/plans/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Mensal</TableHead>
              <TableHead>Semestral</TableHead>
              <TableHead>Anual</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans?.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{formatCurrency(plan.price_monthly)}</TableCell>
                <TableCell>
                  {formatCurrency(plan.price_semiannual)}
                  {plan.discount_semiannual > 0 && (
                    <span className="ml-2 text-sm text-emerald-600">
                      (-{plan.discount_semiannual}%)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {formatCurrency(plan.price_annual)}
                  {plan.discount_annual > 0 && (
                    <span className="ml-2 text-sm text-emerald-600">
                      (-{plan.discount_annual}%)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      plan.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {plan.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/plans/edit/${plan.id}`)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};