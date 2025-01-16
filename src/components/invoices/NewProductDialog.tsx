import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "@/components/products/components/ProductForm";

interface NewProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewProductDialog({ open, onOpenChange }: NewProductDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('products.new')}</DialogTitle>
        </DialogHeader>
        <ProductForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}