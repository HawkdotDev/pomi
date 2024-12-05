import React, { useState } from 'react';
import { Plus, Calendar, Clock, Trash2, Edit2 } from 'lucide-react';
import { Schedule, TimerPreset, PresetChain, RecurrenceType } from '../../types/timer';
import { ScheduleForm } from './ScheduleForm';
import { Switch } from '../Switch';

interface ScheduleManagerProps {
  schedules: Schedule[];
  presets: TimerPreset[];
  chains: PresetChain[];
  onSave: (schedule: Omit<Schedule, 'id'>) => void;
  onDelete: (scheduleId: string) => void;
  onToggle: (scheduleId: string, enabled: boolean) => void;
}

export function ScheduleManager({
  schedules,
  presets,
  chains,
  onSave,
  onDelete,
  onToggle
}: ScheduleManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleSave = (schedule: Omit<Schedule, 'id'>) => {
    onSave(schedule);
    setShowForm(false);
    setEditingSchedule(null);
  };

  const formatRecurrence = (schedule: Schedule) => {
    switch (schedule.recurrence) {
      case RecurrenceType.DAILY:
        return 'Every day';
      case RecurrenceType.WEEKLY:
        if (schedule.days) {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return `Every ${schedule.days.map(d => days[d]).join(', ')}`;
        }
        return 'Weekly';
      case RecurrenceType.MONTHLY:
        if (schedule.days) {
          return `Monthly on ${schedule.days.map(d => formatOrdinal(d)).join(', ')}`;
        }
        return 'Monthly';
      default:
        return 'One time';
    }
  };

  const formatOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const getItemName = (schedule: Schedule) => {
    if (schedule.chainId) {
      const chain = chains.find(c => c.id === schedule.chainId);
      return chain ? `Chain: ${chain.name}` : 'Unknown Chain';
    } else {
      const preset = presets.find(p => p.id === schedule.presetId);
      return preset ? `Preset: ${preset.name}` : 'Unknown Preset';
    }
  };

  if (showForm) {
    return (
      <ScheduleForm
        presets={presets}
        chains={chains}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingSchedule(null);
        }}
        initialValues={editingSchedule || undefined}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Scheduled Timers</h2>
        <button
          onClick={() => setShowForm(true)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="Add new schedule"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="p-4 bg-gray-800 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{schedule.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{getItemName(schedule)}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Clock size={14} />
                  <span>{schedule.startTime}</span>
                  <span>•</span>
                  <Calendar size={14} />
                  <span>{formatRecurrence(schedule)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={schedule.isEnabled}
                  onChange={(enabled) => onToggle(schedule.id, enabled)}
                />
                <button
                  onClick={() => handleEdit(schedule)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                  title="Edit schedule"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(schedule.id)}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300"
                  title="Delete schedule"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {schedules.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Calendar size={40} className="mx-auto mb-4 opacity-50" />
            <p>No scheduled timers yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Create your first schedule
            </button>
          </div>
        )}
      </div>
    </div>
  );
}