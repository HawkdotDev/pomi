import React, { useState, useEffect } from 'react';
import { NotificationSettings as NotificationSettingsType } from '../types/timer';
import { Switch } from './Switch';
import { Bell, Volume2, Play } from 'lucide-react';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onUpdate: (settings: NotificationSettingsType) => void;
}

export function NotificationSettings({ settings, onUpdate }: NotificationSettingsProps) {
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionDenied(Notification.permission === 'denied');
    }
  }, []);

  const handleToggleNotifications = async () => {
    if (!settings.enabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPermissionDenied(false);
          onUpdate({ ...settings, enabled: true });
        } else {
          setPermissionDenied(true);
        }
      } else {
        console.warn('Notifications not supported in this browser');
      }
    } else {
      onUpdate({ ...settings, enabled: false });
    }
  };

  const handleTestSound = () => {
    const audio = new Audio('/sounds/complete.mp3');
    audio.volume = settings.volume;
    audio.play().catch(error => console.error('Error playing sound:', error));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300">Enable Notifications</label>
            <Switch checked={settings.enabled} onChange={handleToggleNotifications} />
          </div>
          {permissionDenied && (
            <p className="text-sm text-red-400">
              Please allow notifications in your browser settings to enable this feature.
            </p>
          )}
        </div>

        <div className="space-y-4 opacity-100 transition-opacity duration-200"
             style={{ opacity: settings.enabled ? 1 : 0.5, pointerEvents: settings.enabled ? 'auto' : 'none' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <label className="text-sm text-gray-300">Sound Effects</label>
            </div>
            <Switch
              checked={settings.sound}
              onChange={(checked) => onUpdate({ ...settings, sound: checked })}
              disabled={!settings.enabled}
            />
          </div>

          {settings.sound && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Volume</label>
                <button
                  onClick={handleTestSound}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  title="Test sound"
                  disabled={!settings.enabled}
                >
                  <Play size={16} />
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => onUpdate({ ...settings, volume: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                disabled={!settings.enabled}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0%</span>
                <span>{Math.round(settings.volume * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-800">
          <h3 className="text-sm font-medium mb-3">Notify When:</h3>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300">Work session complete</label>
            <Switch
              checked={settings.workComplete}
              onChange={(checked) => onUpdate({ ...settings, workComplete: checked })}
              disabled={!settings.enabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300">Break session complete</label>
            <Switch
              checked={settings.breakComplete}
              onChange={(checked) => onUpdate({ ...settings, breakComplete: checked })}
              disabled={!settings.enabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300">Full session complete</label>
            <Switch
              checked={settings.sessionComplete}
              onChange={(checked) => onUpdate({ ...settings, sessionComplete: checked })}
              disabled={!settings.enabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}