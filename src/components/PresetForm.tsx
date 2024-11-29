import React, { useState } from 'react';
import { TimerPreset } from '../types/timer';

interface PresetFormProps {
  onSave: (preset: Omit<TimerPreset, 'id'>) => void;
  onCancel: () => void;
  initialValues?: {
    workMinutes: number;
    breakMinutes: number;
    iterations: number;
  };
}

export function PresetForm({ onSave, onCancel, initialValues }: PresetFormProps) {
  const [name, setName] = useState('');
  const [workMinutes, setWorkMinutes] = useState(initialValues?.workMinutes ?? 25);
  const [breakMinutes, setBreakMinutes] = useState(initialValues?.breakMinutes ?? 5);
  const [iterations, setIterations] = useState(initialValues?.iterations ?? 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      workMinutes,
      breakMinutes,
      iterations
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">Create New Preset</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Preset Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Work Minutes</label>
          <input
            type="number"
            min="1"
            max="60"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(parseInt(e.target.value) || 1)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">Break Minutes</label>
          <input
            type="number"
            min="1"
            max="60"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 1)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Number of Iterations</label>
        <input
          type="number"
          min="1"
          max="10"
          value={iterations}
          onChange={(e) => setIterations(parseInt(e.target.value) || 1)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Save Preset
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