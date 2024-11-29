import React from 'react';

interface TimeInputProps {
  label: string;
  minutes: number;
  seconds: number;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
  disabled?: boolean;
}

export function TimeInput({
  label,
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
  disabled = false
}: TimeInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-300">{label}</label>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col">
          <input
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={(e) => onMinutesChange(Math.max(0, parseInt(e.target.value) || 0))}
            disabled={disabled}
            className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-xs text-gray-400 mt-1 text-center">Minutes</span>
        </div>
        <span className="text-2xl">:</span>
        <div className="flex flex-col">
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => onSecondsChange(Math.max(0, parseInt(e.target.value) || 0))}
            disabled={disabled}
            className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-xs text-gray-400 mt-1 text-center">Seconds</span>
        </div>
      </div>
    </div>
  );
}