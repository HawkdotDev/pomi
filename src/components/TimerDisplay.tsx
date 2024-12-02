import React from 'react';
import { Play, Pause, RotateCcw, Save } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { formatTime } from '../utils/timeFormat';

interface TimerDisplayProps {
  isBreak: boolean;
  timeLeft: number;
  isRunning: boolean;
  progress: number;
  currentIteration: number;
  totalIterations: number;
  workColor: string;
  breakColor: string;
  presetName: string;
  waitingForManualStart?: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSaveAsPreset?: () => void;
  isCustom?: boolean;
}

export function TimerDisplay({
  isBreak,
  timeLeft,
  isRunning,
  progress,
  currentIteration,
  totalIterations,
  workColor,
  breakColor,
  presetName,
  waitingForManualStart,
  onToggle,
  onReset,
  onSaveAsPreset,
  isCustom
}: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          {isBreak ? 'Break Time' : 'Work Time'}
          {waitingForManualStart && (
            <span className="ml-2 text-sm font-normal text-yellow-500">
              Waiting for manual start...
            </span>
          )}
        </h2>
        <p className="text-sm opacity-75 mt-1">
          Using {isCustom ? 'Custom Timer' : presetName}
          {isCustom && onSaveAsPreset && (
            <button
              onClick={onSaveAsPreset}
              className="ml-2 inline-flex items-center text-blue-400 hover:text-blue-300"
              title="Save as preset"
            >
              <Save size={14} className="mr-1" />
              Save as preset
            </button>
          )}
        </p>
      </div>
      
      <CircularProgress 
        progress={progress} 
        isBreak={isBreak}
        workColor={workColor}
        breakColor={breakColor}
        size={300}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-7xl font-mono">{formatTime(timeLeft)}</div>
          <div className="text-sm opacity-75">
            Session {currentIteration} of {totalIterations}
          </div>
        </div>
      </CircularProgress>

      <div className="flex gap-4">
        <button
          onClick={onToggle}
          className="p-4 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        >
          {isRunning ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button
          onClick={onReset}
          className="p-4 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
}