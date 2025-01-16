import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { type Invoice } from "./types";

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => navigate(`/invoices/${invoice.id}`)}
          >
            <TableCell>#{invoice.id.slice(0, 8)}</TableCell>
            <TableCell>{invoice.customer?.name}</TableCell>
            <TableCell>
              {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              {new Date(invoice.due_date).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(invoice.total)}
            </TableCell>
            <TableCell>
              <StatusBadge status={invoice.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}