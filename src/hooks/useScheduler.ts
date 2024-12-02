import { useEffect, useState } from 'react';
import { Schedule, TimerPreset, PresetChain } from '../types/timer';

export function useScheduler(
  schedules: Schedule[],
  presets: TimerPreset[],
  chains: PresetChain[],
  onScheduleStart: (presetId: string, chainId?: string) => void
) {
  const [nextSchedule, setNextSchedule] = useState<Schedule | null>(null);
  const [timeToNext, setTimeToNext] = useState<number | null>(null);

  useEffect(() => {
    const checkSchedules = () => {
      const now = new Date();
      const enabledSchedules = schedules.filter(s => s.isEnabled);
      
      for (const schedule of enabledSchedules) {
        const [hours, minutes] = schedule.startTime.split(':').map(Number);
        const scheduleDate = new Date();
        scheduleDate.setHours(hours, minutes, 0, 0);

        if (schedule.recurrence === 'weekly' && schedule.days) {
          const currentDay = now.getDay();
          if (!schedule.days.includes(currentDay)) {
            continue;
          }
        } else if (schedule.recurrence === 'monthly' && schedule.days) {
          const currentDate = now.getDate();
          if (!schedule.days.includes(currentDate)) {
            continue;
          }
        }

        // If it's time to start
        if (Math.abs(now.getTime() - scheduleDate.getTime()) < 1000) {
          onScheduleStart(schedule.presetId, schedule.chainId);
        }
      }

      // Find next schedule
      let nextTime = Infinity;
      let next: Schedule | null = null;

      for (const schedule of enabledSchedules) {
        const [hours, minutes] = schedule.startTime.split(':').map(Number);
        const scheduleDate = new Date();
        scheduleDate.setHours(hours, minutes, 0, 0);

        if (scheduleDate.getTime() <= now.getTime()) {
          scheduleDate.setDate(scheduleDate.getDate() + 1);
        }

        const timeUntil = scheduleDate.getTime() - now.getTime();
        if (timeUntil < nextTime) {
          nextTime = timeUntil;
          next = schedule;
        }
      }

      setNextSchedule(next);
      setTimeToNext(nextTime === Infinity ? null : nextTime);
    };

    const interval = setInterval(checkSchedules, 1000);
    checkSchedules();

    return () => clearInterval(interval);
  }, [schedules, onScheduleStart]);

  return { nextSchedule, timeToNext };
}