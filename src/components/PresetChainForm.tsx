import React, { useState } from 'react';
import Plus from '../assets/icons/plus.svg'
import X from '../assets/icons/x.svg'
import { TimerPreset, ChainedPreset, PresetChain } from '../types/timer';
import { TimeInput } from './TimeInput';

interface PresetChainFormProps {
  presets: TimerPreset[];
  onSave: (chain: Omit<PresetChain, 'id'>) => void;
  onCancel: () => void;
}

export function PresetChainForm({ presets, onSave, onCancel }: PresetChainFormProps) {
  const [name, setName] = useState('');
  const [chainedPresets, setChainedPresets] = useState<ChainedPreset[]>([]);

  const addPreset = () => {
    setChainedPresets(prev => [...prev, {
      preset: presets[0],
      delayMinutes: 0,
      delaySeconds: 0
    }]);
  };

  const removePreset = (index: number) => {
    setChainedPresets(prev => prev.filter((_, i) => i !== index));
  };

  const updateChainedPreset = (index: number, updates: Partial<ChainedPreset>) => {
    setChainedPresets(prev => prev.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, presets: chainedPresets });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">Create Preset Chain</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Chain Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>

      <div className="space-y-4">
        {chainedPresets.map((chainedPreset, index) => (
          <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Preset {index + 1}</h3>
              <button
                type="button"
                onClick={() => removePreset(index)}
                className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              >
                <img src={X} alt="Logo" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Select Preset</label>
                <select
                  value={chainedPreset.preset.id}
                  onChange={(e) => updateChainedPreset(index, {
                    preset: presets.find(p => p.id === e.target.value)!
                  })}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {presets.map(preset => (
                    <option key={preset.id} value={preset.id}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Delay Before Start</label>
                <TimeInput
                  label=""
                  minutes={chainedPreset.delayMinutes}
                  seconds={chainedPreset.delaySeconds}
                  onMinutesChange={(value) => updateChainedPreset(index, { delayMinutes: value })}
                  onSecondsChange={(value) => updateChainedPreset(index, { delaySeconds: value })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPreset}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <img src={Plus} alt="Logo" />
        Add Preset
      </button>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Save Chain
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}