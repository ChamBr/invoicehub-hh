import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { NewInvoiceDialog } from "@/components/invoices/NewInvoiceDialog";
import { Invoice } from "@/components/invoices/types";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { InvoiceHeader } from "@/components/invoices/InvoiceHeader";

const InvoicesIndex = () => {
  const [pageTitle, setPageTitle] = useState("InvoiceHub - Faturas");
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { data: invoices, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Invoice[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <InvoiceHeader onNewInvoice={() => setIsNewInvoiceOpen(true)} />
        <InvoiceList invoices={invoices || []} />
      </div>

      <NewInvoiceDialog 
        open={isNewInvoiceOpen} 
        onOpenChange={setIsNewInvoiceOpen} 
      />
    </div>
  );
};

export default InvoicesIndex;