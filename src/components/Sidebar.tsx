import  X  from '../assets/icons/x.svg';
import { PresetSelector } from './PresetSelector';
import { PresetForm } from './PresetForm';
import { ColorPicker } from './ColorPicker';
import { TimerPreset, ThemeColors } from '../types/timer';

interface SidebarProps {
  show: boolean;
  onClose: () => void;
  showPresetForm: boolean;
  presets: TimerPreset[];
  selectedPreset: TimerPreset;
  onSelectPreset: (preset: TimerPreset) => void;
  onOpenPresetForm: () => void;
  onSavePreset: (preset: Omit<TimerPreset, 'id'>) => void;
  onCancelPresetForm: () => void;
  colors: ThemeColors;
  onColorChange: (colors: ThemeColors) => void;
}

export function Sidebar({
  show,
  onClose,
  showPresetForm,
  presets,
  selectedPreset,
  onSelectPreset,
  onOpenPresetForm,
  onSavePreset,
  onCancelPresetForm,
  colors,
  onColorChange,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gray-900 border-l border-gray-800 transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-none p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <img src={X} alt="Logo" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-8">
            {showPresetForm ? (
              <PresetForm
                onSave={onSavePreset}
                onCancel={onCancelPresetForm}
              />
            ) : (
              <>
                <PresetSelector
                  presets={presets}
                  selectedPreset={selectedPreset}
                  onSelectPreset={onSelectPreset}
                  onOpenPresetForm={onOpenPresetForm}
                />
                <ColorPicker colors={colors} onChange={onColorChange} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}