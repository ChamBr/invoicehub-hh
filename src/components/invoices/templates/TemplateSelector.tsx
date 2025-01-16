import { useState } from "react";
import { InvoiceTemplate } from "./types";
import { TemplateList } from "./TemplateList";
import { TemplatePreview } from "./TemplatePreview";

interface TemplateSelectorProps {
  value?: string;
  onChange: (templateId: string) => void;
}

export const TemplateSelector = ({ value, onChange }: TemplateSelectorProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<InvoiceTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (template: InvoiceTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleSelect = (template: InvoiceTemplate) => {
    onChange(template.id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Selecione um Template</h3>
      
      <TemplateList
        selectedTemplate={value}
        onSelect={handleSelect}
        onPreview={handlePreview}
      />

      <TemplatePreview
        template={previewTemplate}
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </div>
  );
};