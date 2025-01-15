import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const DebugAlert = () => {
  return (
    <Alert variant="destructive" className="bg-orange-50">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-sm">
        Modo debug ativo! O acesso admin sem autenticação está temporariamente liberado.
      </AlertDescription>
    </Alert>
  );
};