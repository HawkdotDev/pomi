import { useState, useEffect, useCallback } from 'react';
import { TimerState, TimerSettings, CustomBreak } from '../types/timer';
import { toast } from 'sonner';
import { dbOperations } from '../db';

export function useTimer() {
  const [settings, setSettings] = useState<TimerSettings>(() => dbOperations.getSettings());
  const [timeLeft, setTimeLeft] = useState(settings.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>('work');
  const [sessions, setSessions] = useState(0);
  const [customBreaks, setCustomBreaks] = useState<CustomBreak[]>(() => dbOperations.getCustomBreaks());
  const [currentCustomBreak, setCurrentCustomBreak] = useState<CustomBreak | null>(null);

  const getInitialTime = useCallback((state: TimerState) => {
    switch (state) {
      case 'work':
        return settings.workDuration;
      case 'break':
        return settings.breakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
      case 'customBreak':
        return (currentCustomBreak?.duration || 0) * 60;
      default:
        return settings.workDuration;
    }
  }, [settings, currentCustomBreak]);

  const getNextStateMessage = useCallback((currentState: TimerState, nextState: TimerState) => {
    const messages = {
      work: 'Time to focus!',
      break: 'Take a short break.',
      longBreak: 'Time for a long break!',
      customBreak: `Time for ${currentCustomBreak?.name || 'a custom break'}!`,
    };
    
    return `${messages[currentState]} completed. ${messages[nextState]}`;
  }, [currentCustomBreak]);

  const checkCustomBreaks = useCallback(() => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Check time-based breaks
    const timeBasedBreak = customBreaks.find(
      breakItem => breakItem.startTime === currentTime && !breakItem.isActive
    );

    if (timeBasedBreak) {
      setCurrentCustomBreak(timeBasedBreak);
      setTimerState('customBreak');
      setTimeLeft(timeBasedBreak.duration * 60);
      setIsActive(false);
      dbOperations.updateCustomBreakStatus(timeBasedBreak.id, true);
      setCustomBreaks(prev => 
        prev.map(b => b.id === timeBasedBreak.id ? { ...b, isActive: true } : b)
      );
      return true;
    }

    // Check session-based breaks
    const sessionBasedBreak = customBreaks.find(
      breakItem => breakItem.afterSessions === sessions && !breakItem.isActive
    );

    if (sessionBasedBreak) {
      setCurrentCustomBreak(sessionBasedBreak);
      setTimerState('customBreak');
      setTimeLeft(sessionBasedBreak.duration * 60);
      setIsActive(false);
      dbOperations.updateCustomBreakStatus(sessionBasedBreak.id, true);
      setCustomBreaks(prev => 
        prev.map(b => b.id === sessionBasedBreak.id ? { ...b, isActive: true } : b)
      );
      return true;
    }

    return false;
  }, [customBreaks, sessions]);

  const nextTimer = useCallback(() => {
    let nextState: TimerState = 'work';
    
    if (timerState === 'work') {
      const nextSessions = sessions + 1;
      setSessions(nextSessions);
      
      if (!checkCustomBreaks()) {
        if (nextSessions % settings.sessionsUntilLongBreak === 0) {
          nextState = 'longBreak';
        } else {
          nextState = 'break';
        }
      } else {
        nextState = 'customBreak';
      }
    } else if (timerState === 'customBreak') {
      setCurrentCustomBreak(null);
      nextState = 'work';
    } else {
      if (!checkCustomBreaks()) {
        nextState = 'work';
      } else {
        nextState = 'customBreak';
      }
    }

    const message = getNextStateMessage(timerState, nextState);
    toast(message, {
      duration: 4000,
      className: 'bg-white',
    });

    setTimerState(nextState);
    setTimeLeft(getInitialTime(nextState));
    setIsActive(settings.autoContinue);
  }, [timerState, sessions, settings, checkCustomBreaks, getNextStateMessage, getInitialTime]);

  const toggleTimer = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(getInitialTime(timerState));
  }, [timerState, getInitialTime]);

  const addCustomBreak = useCallback((breakData: Omit<CustomBreak, 'id' | 'isActive'>) => {
    const newBreak: CustomBreak = {
      ...breakData,
      id: Date.now().toString(),
      isActive: false,
    };
    dbOperations.addCustomBreak(newBreak);
    setCustomBreaks(prev => [...prev, newBreak]);
  }, []);

  const removeCustomBreak = useCallback((id: string) => {
    dbOperations.deleteCustomBreak(id);
    setCustomBreaks(prev => prev.filter(b => b.id !== id));
  }, []);

  const updateSettings = useCallback((updates: Partial<TimerSettings>) => {
    const newSettings = { ...settings, ...updates };
    dbOperations.updateSettings(newSettings);
    setSettings(newSettings);
  }, [settings]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      nextTimer();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, nextTimer]);

  // Check for time-based breaks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isActive) {
        checkCustomBreaks();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [checkCustomBreaks, isActive]);

  return {
    timeLeft,
    isActive,
    timerState,
    sessions,
    customBreaks,
    currentCustomBreak,
    settings,
    toggleTimer,
    resetTimer,
    addCustomBreak,
    removeCustomBreak,
    updateSettings,
  };
}