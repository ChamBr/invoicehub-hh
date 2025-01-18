import { supabase } from "@/integrations/supabase/client";
import { CustomerFormValues } from "../../types";
import { toast } from "@/components/ui/use-toast";

export async function saveCustomer(
  data: CustomerFormValues,
  subscriberId: string,
  initialData?: CustomerFormValues | null
) {
  const customerData = {
    name: data.name,
    type: data.type,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zip_code: data.zipCode,
    tax_exempt: data.taxExempt,
    tax_id: data.taxId,
    notes: data.notes,
    status: data.status,
    subscriber_id: subscriberId,
  };

  if (initialData?.id) {
    const { error } = await supabase
      .from("customers")
      .update(customerData)
      .eq("id", initialData.id);

    if (error) throw error;
    return "updated";
  } 

  const { error } = await supabase
    .from("customers")
    .insert([customerData]);

  if (error) throw error;
  return "created";
}