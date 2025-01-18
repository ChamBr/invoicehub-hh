import { useSimulatedLogin } from "./hooks/useSimulatedLogin";
import { ExitSimulationButton } from "./components/ExitSimulationButton";

export const SimulatedLogin = () => {
  const { simulatedLogin, exitSimulation } = useSimulatedLogin();

  if (!simulatedLogin?.owner?.id) return null;

  return (
    <ExitSimulationButton
      onClick={exitSimulation}
      ownerName={simulatedLogin.owner.full_name}
    />
  );
};

export default SimulatedLogin;