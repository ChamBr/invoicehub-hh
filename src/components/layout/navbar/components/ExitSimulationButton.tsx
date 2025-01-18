import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface ExitSimulationButtonProps {
  onClick: () => void;
  ownerName: string | null;
}

export const ExitSimulationButton = ({ onClick, ownerName }: ExitSimulationButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="gap-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
    >
      <LogOut className="h-4 w-4" />
      <span>Sair da simulação ({ownerName || "Usuário"})</span>
    </Button>
  );
};