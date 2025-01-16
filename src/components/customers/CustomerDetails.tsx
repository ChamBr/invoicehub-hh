import { Button } from "@/components/ui/button";
import { CustomerFormValues } from "./types";
import { Building2, User, Mail, Phone, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CustomerDetailsProps {
  customer: CustomerFormValues;
  onEdit: () => void;
}

export function CustomerDetails({ customer, onEdit }: CustomerDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {customer.type === "company" ? (
            <Building2 className="h-6 w-6 text-gray-500" />
          ) : (
            <User className="h-6 w-6 text-gray-500" />
          )}
          <div>
            <h3 className="text-lg font-semibold">
              {customer.type === "company" ? customer.name : customer.name}
            </h3>
            {customer.type === "company" && (
              <p className="text-sm text-gray-500">{t('customers.details.contact')}: {customer.contactName}</p>
            )}
          </div>
        </div>
        <Button onClick={onEdit}>{t('customers.details.edit')}</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-medium">{t('customers.form.email')}</span>
          </div>
          <p>{customer.email || t('customers.details.not_informed')}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-500">
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">{t('customers.form.phone')}</span>
          </div>
          <p>{customer.phone || t('customers.details.not_informed')}</p>
        </div>

        {!customer.taxExempt && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-500">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">
                {customer.type === "company" && customer.country === "BR"
                  ? "CNPJ"
                  : "CPF"}
              </span>
            </div>
            <p>{customer.taxId || t('customers.details.not_informed')}</p>
          </div>
        )}

        <div className="space-y-1">
          <span className="text-sm font-medium text-gray-500">{t('customers.details.status.label')}</span>
          <div>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                customer.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {customer.status === "active" 
                ? t('customers.details.status.active')
                : t('customers.details.status.inactive')}
            </span>
          </div>
        </div>
      </div>

      {customer.notes && (
        <div className="space-y-1">
          <span className="text-sm font-medium text-gray-500">{t('customers.form.notes')}</span>
          <p className="text-sm">{customer.notes}</p>
        </div>
      )}
    </div>
  );
}