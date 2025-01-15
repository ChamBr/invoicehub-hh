import { formatTimeLeft } from "@/lib/utils";

interface DebugTimerProps {
  timeLeft: number | null;
}

export const DebugTimer = ({ timeLeft }: DebugTimerProps) => {
  if (timeLeft === null) return null;

  return (
    <span className="text-sm text-orange-600 ml-2">
      ({formatTimeLeft(timeLeft)})
    </span>
  );
};