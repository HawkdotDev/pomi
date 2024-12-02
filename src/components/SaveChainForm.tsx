import React, { useState } from 'react';
import { ChainedPreset } from '../types/timer';
// import { Save } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface SaveChainFormProps {
  chainedPresets: ChainedPreset[];
  onSave: (name: string) => void;
  onCancel: () => void;
}

export function SaveChainForm({ onSave, onCancel }: SaveChainFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Chain Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center space-x-2 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
        >
          {/* <Save className="w-4 h-4" /> */}
          <img src={error} alt="error logo" />
          <span>Save Chain</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}