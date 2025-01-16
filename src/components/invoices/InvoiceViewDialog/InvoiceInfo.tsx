import { Card, CardContent } from "@/components/ui/card";
import { Invoice } from "../types";

interface InvoiceInfoProps {
  invoice: Invoice;
}

export const InvoiceInfo = ({ invoice }: InvoiceInfoProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Data de Emissão</p>
          <p className="font-medium">
            {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Data de Vencimento</p>
          <p className="font-medium">
            {new Date(invoice.due_date).toLocaleDateString("pt-BR")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-medium">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(invoice.total)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};