import React from 'react';
import { TimeInput } from './TimeInput';
import { Switch } from './Switch';

interface QuickSettingsProps {
  workMinutes: number;
  workSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
  onWorkMinutesChange: (value: number) => void;
  onWorkSecondsChange: (value: number) => void;
  onBreakMinutesChange: (value: number) => void;
  onBreakSecondsChange: (value: number) => void;
  onIterationsChange: (value: number) => void;
  onRequireManualStartChange: (value: boolean) => void;
  disabled?: boolean;
}

export function QuickSettings({
  workMinutes,
  workSeconds,
  breakMinutes,
  breakSeconds,
  iterations,
  requireManualStart,
  onWorkMinutesChange,
  onWorkSecondsChange,
  onBreakMinutesChange,
  onBreakSecondsChange,
  onIterationsChange,
  onRequireManualStartChange,
  disabled = false
}: QuickSettingsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <TimeInput
            label="Work Time"
            minutes={workMinutes}
            seconds={workSeconds}
            onMinutesChange={onWorkMinutesChange}
            onSecondsChange={onWorkSecondsChange}
            disabled={disabled}
          />
          <TimeInput
            label="Break Time"
            minutes={breakMinutes}
            seconds={breakSeconds}
            onMinutesChange={onBreakMinutesChange}
            onSecondsChange={onBreakSecondsChange}
            disabled={disabled}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Iterations</label>
            <input
              type="number"
              min="1"
              max="10"
              value={iterations}
              onChange={(e) => onIterationsChange(parseInt(e.target.value) || 1)}
              disabled={disabled}
              className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Manual Start</label>
            <Switch
              checked={requireManualStart || false}
              onChange={onRequireManualStartChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}