import { CustomBreak } from '../types/timer';
// import { Clock, Hash, Trash2 } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface CustomBreaksListProps {
  breaks: CustomBreak[];
  onDelete: (id: string) => void;
}

export function CustomBreaksList({ breaks, onDelete }: CustomBreaksListProps) {
  if (breaks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No custom breaks added yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {breaks.map((breakItem) => (
        <div
          key={breakItem.id}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{breakItem.name}</h3>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              {breakItem.startTime ? (
                <span className="flex items-center">
                  {/* <Clock className="w-4 h-4 mr-1" /> */}
                  <img src={error} alt="error logo" />
                  {breakItem.startTime}
                </span>
              ) : (
                <span className="flex items-center">
                  {/* <Hash className="w-4 h-4 mr-1" /> */}
                  <img src={error} alt="error logo" />
                  After {breakItem.afterSessions} sessions
                </span>
              )}
              <span className="mx-2">•</span>
              <span>{breakItem.duration} minutes</span>
            </div>
          </div>
          <button
            onClick={() => onDelete(breakItem.id)}
            className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
          >
            {/* <Trash2 className="w-5 h-5" /> */}
            <img src={error} alt="error logo" />
          </button>
        </div>
      ))}
    </div>
  );
}