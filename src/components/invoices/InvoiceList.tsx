import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Invoice } from "./types";
import { StatusBadge } from "./StatusBadge";

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice) => (
            <TableRow 
              key={invoice.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/invoices/${invoice.id}`)}
            >
              <TableCell>{invoice.customer?.name}</TableCell>
              <TableCell>
                {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                {new Date(invoice.due_date).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <StatusBadge status={invoice.status} />
              </TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(invoice.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}