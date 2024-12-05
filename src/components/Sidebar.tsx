import React, { useState } from 'react';
import { X, Clock, Bell } from 'lucide-react';
import { PresetSelector } from './PresetSelector';
import { PresetForm } from './PresetForm';
import { ColorPicker } from './ColorPicker';
import { NotificationSettings } from './NotificationSettings';
import { ScheduleManager } from './scheduling/ScheduleManager';
import { TimerPreset, ThemeColors, Schedule, NotificationSettings as NotificationSettingsType } from '../types/timer';

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
  schedules: Schedule[];
  chains: PresetChain[];
  onSaveSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  onDeleteSchedule: (scheduleId: string) => void;
  onToggleSchedule: (scheduleId: string, enabled: boolean) => void;
  notificationSettings: NotificationSettingsType;
  onUpdateNotificationSettings: (settings: NotificationSettingsType) => void;
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
  schedules,
  chains,
  onSaveSchedule,
  onDeleteSchedule,
  onToggleSchedule,
  notificationSettings,
  onUpdateNotificationSettings,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'schedules' | 'appearance' | 'notifications'>('presets');

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[32rem] bg-gray-900 border-l border-gray-800 transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          show ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-none p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'presets' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
              }`}
            >
              Presets
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'schedules' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
              }`}
            >
              <Clock size={16} />
              Schedules
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'notifications' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
              }`}
            >
              <Bell size={16} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'appearance' ? 'bg-gray-800' : 'hover:bg-gray-800/50'
              }`}
            >
              Appearance
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-lg mx-auto">
            {showPresetForm ? (
              <PresetForm
                onSave={onSavePreset}
                onCancel={onCancelPresetForm}
                existingPresets={presets}
              />
            ) : (
              <>
                {activeTab === 'presets' && (
                  <PresetSelector
                    presets={presets}
                    selectedPreset={selectedPreset}
                    onSelectPreset={onSelectPreset}
                    onOpenPresetForm={onOpenPresetForm}
                  />
                )}
                
                {activeTab === 'schedules' && (
                  <ScheduleManager
                    schedules={schedules}
                    presets={presets}
                    chains={chains}
                    onSave={onSaveSchedule}
                    onDelete={onDeleteSchedule}
                    onToggle={onToggleSchedule}
                  />
                )}
                
                {activeTab === 'notifications' && (
                  <NotificationSettings
                    settings={notificationSettings}
                    onUpdate={onUpdateNotificationSettings}
                  />
                )}
                
                {activeTab === 'appearance' && (
                  <ColorPicker colors={colors} onChange={onColorChange} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}