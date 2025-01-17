import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerFormValues, customerFormSchema } from "./types";
import { CustomerFormContent } from "./form/CustomerFormContent";
import { useCustomerForm } from "./hooks/useCustomerForm";
import { LoadingState } from "@/components/ui/loading-state";

interface CustomerFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: CustomerFormValues | null;
}

export function CustomerForm({ onSuccess, onCancel, initialData }: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: initialData || {
      type: "personal",
      status: "active",
      country: "US",
      taxExempt: false
    }
  });

  const { handleSubmit, isLoadingSubscriber } = useCustomerForm(onSuccess, initialData);

  if (isLoadingSubscriber) {
    return <LoadingState message="Carregando..." />;
  }

  return (
    <CustomerFormContent
      form={form}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}