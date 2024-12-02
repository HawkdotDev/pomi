import React from 'react';
import { TimerPreset } from '../types/timer';
// import { Plus } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface PresetSelectorProps {
  presets: TimerPreset[];
  onAddToChain: (preset: TimerPreset, repetitions: number) => void;
}

export function PresetSelector({ presets, onAddToChain }: PresetSelectorProps) {
  const [selectedPreset, setSelectedPreset] = React.useState<string>(presets[0]?.id || '');
  const [repetitions, setRepetitions] = React.useState(1);

  const handleAdd = () => {
    const preset = presets.find(p => p.id === selectedPreset);
    if (preset) {
      onAddToChain(preset, repetitions);
      setRepetitions(1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Preset
          </label>
          <select
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {presets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repetitions
          </label>
          <input
            type="number"
            min="1"
            value={repetitions}
            onChange={(e) => setRepetitions(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center space-x-2 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
      >
        {/* <Plus className="w-4 h-4" /> */}
        <img src={error} alt="error logo" />
        <span>Add to Chain</span>
      </button>
    </div>
  );
}