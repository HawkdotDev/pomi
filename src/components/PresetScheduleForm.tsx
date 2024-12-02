import React, { useState } from 'react';
import { TimerPreset, WeekDay } from '../types/timer';
// import { Calendar, Clock } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface PresetScheduleFormProps {
  presets: TimerPreset[];
  onSubmit: (data: {
    presetId: string;
    startTime: string;
    weekDays: WeekDay[];
    isRecurring: boolean;
    specificDate?: string;
  }) => void;
  onCancel: () => void;
}

const WEEKDAYS: WeekDay[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function PresetScheduleForm({ presets, onSubmit, onCancel }: PresetScheduleFormProps) {
  const [formData, setFormData] = useState({
    presetId: presets[0]?.id || '',
    startTime: '',
    weekDays: [] as WeekDay[],
    isRecurring: true,
    specificDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleWeekDay = (day: WeekDay) => {
    setFormData(prev => ({
      ...prev,
      weekDays: prev.weekDays.includes(day)
        ? prev.weekDays.filter(d => d !== day)
        : [...prev.weekDays, day],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Preset
        </label>
        <select
          value={formData.presetId}
          onChange={(e) => setFormData(prev => ({ ...prev, presetId: e.target.value }))}
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
          Schedule Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isRecurring: true, specificDate: '' }))}
            className={`flex items-center px-3 py-2 rounded-md ${
              formData.isRecurring
                ? 'bg-rose-100 text-rose-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {/* <Clock className="w-4 h-4 mr-2" /> */}
            <img src={error} alt="error logo" />
            Recurring
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isRecurring: false, weekDays: [] }))}
            className={`flex items-center px-3 py-2 rounded-md ${
              !formData.isRecurring
                ? 'bg-rose-100 text-rose-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {/* <Calendar className="w-4 h-4 mr-2" /> */}
            <img src={error} alt="error logo" />
            One-time
          </button>
        </div>
      </div>

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

      {formData.isRecurring ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Repeat on
          </label>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleWeekDay(day)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.weekDays.includes(day)
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.specificDate}
            onChange={(e) => setFormData(prev => ({ ...prev, specificDate: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            required
          />
        </div>
      )}

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
        >
          Add Schedule
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