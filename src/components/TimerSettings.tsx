// import { Settings } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface TimerSettingsProps {
  autoContinue: boolean;
  onAutoContinueChange: (value: boolean) => void;
}

export function TimerSettings({ autoContinue, onAutoContinueChange }: TimerSettingsProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        {/* <Settings className="w-5 h-5 text-gray-500" /> */}
        <img src={error} alt="error logo" />
        <span className="text-sm font-medium text-gray-700">Auto-continue timer</span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={autoContinue}
          onChange={(e) => onAutoContinueChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
      </label>
    </div>
  );
}