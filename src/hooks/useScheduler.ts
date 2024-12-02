import { useState, useCallback, useEffect } from 'react';
import { PresetSchedule } from '../types/timer';
import { dbOperations } from '../db';

export function useScheduler() {
  const [schedules, setSchedules] = useState<PresetSchedule[]>(() => dbOperations.getAllSchedules());

  const addSchedule = useCallback((scheduleData: Omit<PresetSchedule, 'id' | 'isActive'>) => {
    const newSchedule: Omit<PresetSchedule, 'isActive'> = {
      ...scheduleData,
      id: Date.now().toString(),
    };
    dbOperations.addSchedule(newSchedule);
    setSchedules(prev => [...prev, { ...newSchedule, isActive: false }]);
  }, []);

  const removeSchedule = useCallback((id: string) => {
    dbOperations.deleteSchedule(id);
    setSchedules(prev => prev.filter(s => s.id !== id));
  }, []);

  const checkSchedules = useCallback(() => {
    const activeSchedules = dbOperations.getActiveSchedules();
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });

    return activeSchedules.filter(schedule => {
      if (schedule.startTime !== currentTime) return false;
      
      if (schedule.isRecurring) {
        return schedule.weekDays.includes(currentDay as any);
      } else {
        return schedule.specificDate === now.toISOString().split('T')[0];
      }
    });
  }, []);

  return {
    schedules,
    addSchedule,
    removeSchedule,
    checkSchedules,
  };
}