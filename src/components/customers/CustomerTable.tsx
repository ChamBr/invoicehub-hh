import { Button } from "@/components/ui/button";
import { Building2, Trash2, User } from "lucide-react";
import { CustomerFormValues } from "./types";
import { useTranslation } from "react-i18next";

interface CustomerTableProps {
  customers: CustomerFormValues[];
  onRowClick: (customer: CustomerFormValues) => void;
  onDeleteClick: (customer: CustomerFormValues, e: React.MouseEvent) => void;
}

export function CustomerTable({ customers, onRowClick, onDeleteClick }: CustomerTableProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow">
      {customers?.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          {t('customers.table.empty')}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.table.type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.table.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.table.company_name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.table.status')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('customers.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers?.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => onRowClick(customer)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.type === "company" ? (
                      <Building2 className="h-5 w-5 text-gray-500" />
                    ) : (
                      <User className="h-5 w-5 text-gray-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.type === "company" ? customer.contactName : customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.type === "company" ? customer.name : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => onDeleteClick(customer, e)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}