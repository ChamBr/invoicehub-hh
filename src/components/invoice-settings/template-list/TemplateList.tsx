import { ScrollArea } from "@/components/ui/scroll-area";
import { InvoiceTemplate } from "@/components/invoices/templates/types";
import { TemplateCard } from "./TemplateCard";

interface TemplateListProps {
  templates: InvoiceTemplate[];
  activeTemplateId?: string;
  onPreview: (template: InvoiceTemplate) => void;
  onActivate: (templateId: string) => void;
  isActivating: boolean;
}

export const TemplateList = ({
  templates,
  activeTemplateId,
  onPreview,
  onActivate,
  isActivating,
}: TemplateListProps) => {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {templates?.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isActive={template.id === activeTemplateId}
            onPreview={() => onPreview(template)}
            onActivate={() => onActivate(template.id)}
            isActivating={isActivating}
          />
        ))}
      </div>
    </ScrollArea>
  );
};