import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { DebugTimer } from "./debug/DebugTimer";
import { DebugAlert } from "./debug/DebugAlert";
import { useDebugMode } from "./debug/useDebugMode";

const DebugModeSwitch = () => {
  const { t } = useTranslation();
  const { debugConfig, isLoading, timeLeft, handleToggle } = useDebugMode();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch
          checked={debugConfig?.is_enabled || false}
          onCheckedChange={handleToggle}
          disabled={isLoading}
          aria-label="Modo Debug"
        />
        <span className="text-sm text-gray-700">Modo Debug</span>
        <DebugTimer timeLeft={timeLeft} />
      </div>

      {debugConfig?.is_enabled && <DebugAlert />}
    </div>
  );
};

export default DebugModeSwitch;