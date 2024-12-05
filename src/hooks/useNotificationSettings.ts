import { useState, useCallback } from 'react';
import { NotificationSettings } from '../types/timer';

export function useNotificationSettings(initialSettings: NotificationSettings) {
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleNotifications = useCallback(async () => {
    if (!settings.enabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          updateSettings({ enabled: true });
          return true;
        }
      }
      return false;
    } else {
      updateSettings({ enabled: false });
      return true;
    }
  }, [settings.enabled, updateSettings]);

  return {
    settings,
    updateSettings,
    toggleNotifications
  };
}