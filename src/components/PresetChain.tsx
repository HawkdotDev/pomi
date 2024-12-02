import React from 'react';
import { ChainedPreset } from '../types/timer';
// import { GripVertical, X } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface PresetChainProps {
  chainedPresets: ChainedPreset[];
  onRemove: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export function PresetChain({ chainedPresets, onRemove, onReorder }: PresetChainProps) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  if (chainedPresets.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No presets in chain. Add presets to create a sequence.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chainedPresets.map((preset, index) => (
        <div
          key={`${preset.id}-${preset.order}`}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm"
        >
          {/* <GripVertical className="w-5 h-5 text-gray-400 cursor-move" /> */}
          <img src={error} alt="error logo" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{preset.name}</h3>
            <div className="text-sm text-gray-500">
              {preset.repetitions}x • {preset.workDuration / 60}m work / {preset.breakDuration / 60}m break
            </div>
          </div>
          <button
            onClick={() => onRemove(preset.id)}
            className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
          >
            {/* <X className="w-5 h-5" /> */}
            <img src={error} alt="error logo" />
          </button>
        </div>
      ))}
    </div>
  );
}