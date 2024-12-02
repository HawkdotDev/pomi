import { TimerPreset } from '../types/timer';

import Plus from '../assets/icons/plus.svg'
// import Settings from '../assets/icons/settings.svg'

interface PresetSelectorProps {
  presets: TimerPreset[];
  selectedPreset: TimerPreset;
  onSelectPreset: (preset: TimerPreset) => void;
  onOpenPresetForm: () => void;
}

export function PresetSelector({
  presets,
  selectedPreset,
  onSelectPreset,
  onOpenPresetForm
}: PresetSelectorProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Timer Presets</h2>
        <button
          onClick={onOpenPresetForm}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="Add new preset"
        >
          <img src={Plus} alt="Logo" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className={`p-4 rounded-lg transition-colors ${
              selectedPreset.id === preset.id
                ? 'bg-gray-700 ring-2 ring-gray-500'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{preset.name}</span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{preset.workMinutes}m work</span>
                <span>•</span>
                <span>{preset.breakMinutes}m break</span>
                <span>•</span>
                <span>{preset.iterations}x</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}