// import { Check } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface SessionProgressProps {
  sessions: number;
  totalSessions: number;
}

export function SessionProgress({ sessions, totalSessions }: SessionProgressProps) {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSessions }).map((_, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index < (sessions % totalSessions)
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {/* <Check className="w-4 h-4" /> */}
          <img src={error} alt="error logo" />
        </div>
      ))}
    </div>
  );
}