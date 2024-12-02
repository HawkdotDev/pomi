import { PresetSchedule } from '../types/timer';
// import { Calendar, Clock, Trash2 } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface PresetScheduleListProps {
  schedules: PresetSchedule[];
  onDelete: (id: string) => void;
}

export function PresetScheduleList({ schedules, onDelete }: PresetScheduleListProps) {
  if (schedules.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No scheduled presets
      </div>
    );
  }

  const formatWeekDays = (weekDays: string[]) => {
    return weekDays
      .map(day => day.charAt(0).toUpperCase() + day.slice(1))
      .join(', ');
  };

  return (
    <div className="space-y-2">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">
              {schedule.presetId} {/* Replace with actual preset name */}
            </h3>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              {/* <Clock className="w-4 h-4 mr-1" /> */}
              <img src={error} alt="error logo" />
              {schedule.startTime}
              <span className="mx-2">•</span>
              {schedule.isRecurring ? (
                <span>{formatWeekDays(schedule.weekDays)}</span>
              ) : (
                <span className="flex items-center">
                  {/* <Calendar className="w-4 h-4 mr-1" /> */}
                  <img src={error} alt="error logo" />
                  {schedule.specificDate}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onDelete(schedule.id)}
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