import { Button } from "@/components/ui/button";
import { Users, UserPlus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

export function CustomerHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-900">{t('customers.title')}</h1>
      </div>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          {t('customers.add')}
        </Button>
      </DialogTrigger>
    </div>
  );
}