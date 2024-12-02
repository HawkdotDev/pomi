import React from 'react';
import { CustomBreakFormData } from '../types/timer';
// import { Clock, Hash } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface CustomBreakFormProps {
  onSubmit: (data: CustomBreakFormData) => void;
  onCancel: () => void;
}

export function CustomBreakForm({ onSubmit, onCancel }: CustomBreakFormProps) {
  const [formData, setFormData] = React.useState<CustomBreakFormData>({
    name: '',
    duration: 30,
  });

  const [triggerType, setTriggerType] = React.useState<'time' | 'sessions'>('time');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Break Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trigger Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              setTriggerType('time');
              setFormData(prev => ({ ...prev, afterSessions: undefined }));
            }}
            className={`flex items-center px-3 py-2 rounded-md ${
              triggerType === 'time' 
                ? 'bg-rose-100 text-rose-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {/* <Clock className="w-4 h-4 mr-2" /> */}
            <img src={error} alt="error logo" />
            Time Based
          </button>
          <button
            type="button"
            onClick={() => {
              setTriggerType('sessions');
              setFormData(prev => ({ ...prev, startTime: undefined }));
            }}
            className={`flex items-center px-3 py-2 rounded-md ${
              triggerType === 'sessions' 
                ? 'bg-rose-100 text-rose-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {/* <Hash className="w-4 h-4 mr-2" /> */}
            <img src={error} alt="error logo" />
            Session Based
          </button>
        </div>
      </div>

      {triggerType === 'time' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
      )}

      {triggerType === 'sessions' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            After Sessions
          </label>
          <input
            type="number"
            min="1"
            value={formData.afterSessions}
            onChange={(e) => setFormData(prev => ({ ...prev, afterSessions: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration (minutes)
        </label>
        <input
          type="number"
          min="1"
          value={formData.duration}
          onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
        >
          Add Break
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}