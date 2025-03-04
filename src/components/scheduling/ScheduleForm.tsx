import React, { useState } from 'react';
import { TimerPreset, PresetChain, Schedule, RecurrenceType, scheduleSchema } from '../../types/timer';
import { Switch } from '../Switch';
import { ArrowLeft } from 'lucide-react';

interface ScheduleFormProps {
  presets: TimerPreset[];
  chains: PresetChain[];
  onSave: (schedule: Omit<Schedule, 'id'>) => void;
  onCancel: () => void;
  initialValues?: Partial<Schedule>;
}

export function ScheduleForm({
  presets,
  chains,
  onSave,
  onCancel,
  initialValues
}: ScheduleFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [selectedType, setSelectedType] = useState<'preset' | 'chain'>(
    initialValues?.chainId ? 'chain' : 'preset'
  );
  const [selectedId, setSelectedId] = useState(
    initialValues?.chainId || initialValues?.presetId || presets[0].id
  );
  const [startTime, setStartTime] = useState(initialValues?.startTime ?? '09:00');
  const [recurrence, setRecurrence] = useState<RecurrenceType>(
    initialValues?.recurrence ?? RecurrenceType.NONE
  );
  const [days, setDays] = useState<number[]>(initialValues?.days ?? []);
  const [isEnabled, setIsEnabled] = useState(initialValues?.isEnabled ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const schedule = {
      name,
      presetId: selectedType === 'preset' ? selectedId : '',
      chainId: selectedType === 'chain' ? selectedId : undefined,
      startTime,
      days: days.length > 0 ? days : undefined,
      recurrence,
      isEnabled
    };

    try {
      scheduleSchema.parse(schedule);
      onSave(schedule);
    } catch (error) {
      console.error('Invalid schedule:', error);
    }
  };

  const handleDayToggle = (day: number) => {
    setDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">
          {initialValues ? 'Edit Schedule' : 'Create Schedule'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Schedule Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Schedule Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedType('preset')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'preset'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                Preset
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('chain')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'chain'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                Chain
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Select {selectedType === 'preset' ? 'Preset' : 'Chain'}
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            >
              {selectedType === 'preset' ? (
                presets.map(preset => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))
              ) : (
                chains.map(chain => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Recurrence</label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value={RecurrenceType.NONE}>One-time</option>
              <option value={RecurrenceType.DAILY}>Daily</option>
              <option value={RecurrenceType.WEEKLY}>Weekly</option>
              <option value={RecurrenceType.MONTHLY}>Monthly</option>
            </select>
          </div>

          {recurrence === RecurrenceType.WEEKLY && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Select Days</label>
              <div className="flex gap-2 flex-wrap">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(index)}
                    className={`px-3 py-1 rounded-full ${
                      days.includes(index)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recurrence === RecurrenceType.MONTHLY && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Select Dates</label>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleDayToggle(date)}
                    className={`w-8 h-8 rounded-full ${
                      days.includes(date)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-2">
            <label className="text-sm text-gray-300">Enable Schedule</label>
            <Switch checked={isEnabled} onChange={setIsEnabled} />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {initialValues ? 'Update Schedule' : 'Create Schedule'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}