import { TimerState } from "../types/timer";
import { formatTime } from "../utils/formatTime";
import error from "../assets/icons/error.svg";

interface TimerDisplayProps {
  timeLeft: number;
  timerState: TimerState;
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function TimerDisplay({
  timeLeft,
  timerState,
  isActive,
  onToggle,
  onReset,
}: TimerDisplayProps) {
  const stateColors: Record<TimerState, string> = {
    work: "bg-rose-500",
    break: "bg-emerald-500",
    longBreak: "bg-blue-500",
    customBreak: ""
  };

  const stateText: Record<TimerState, string> = {
    work: "Focus Time",
    break: "Short Break",
    longBreak: "Long Break",
    customBreak: ""
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative w-64 h-64">
        <div
          className={`absolute inset-0 rounded-full ${stateColors[timerState]} opacity-10`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src={error} alt="error logo" />
          <h2 className="text-xl font-medium text-gray-600">
            {stateText[timerState]}
          </h2>
          <div className="text-6xl font-bold text-gray-800 mt-2">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onToggle}
          className={`p-4 rounded-full ${
            isActive
              ? "bg-rose-100 text-rose-600"
              : "bg-emerald-100 text-emerald-600"
          } hover:opacity-90 transition-opacity`}
        >
          <img src={error} alt="error logo" />
        </button>
        <button
          onClick={onReset}
          className="p-4 rounded-full bg-gray-100 text-gray-600 hover:opacity-90 transition-opacity"
        >
          <img src={error} alt="error logo" />
        </button>
      </div>
    </div>
  );
}
