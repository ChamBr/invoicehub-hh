import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InvoiceTemplate } from "@/components/invoices/templates/types";

interface TemplateCardProps {
  template: InvoiceTemplate;
  isActive: boolean;
  onPreview: () => void;
  onActivate: () => void;
  isActivating: boolean;
}

export const TemplateCard = ({
  template,
  isActive,
  onPreview,
  onActivate,
  isActivating,
}: TemplateCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="h-5 w-5 text-gray-500" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{template.name}</h3>
                {isActive && (
                  <Badge variant="secondary" className="text-xs">
                    Ativo
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            {!isActive && (
              <Button
                variant="default"
                size="sm"
                onClick={onActivate}
                disabled={isActivating}
              >
                <Check className="h-4 w-4 mr-2" />
                Ativar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};