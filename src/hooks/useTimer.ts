import { useState, useEffect, useCallback } from 'react';
import { TimerPreset } from '../types/timer';

interface TimerSettings extends TimerPreset {
  workMinutes: number;
  breakMinutes: number;
  workSeconds: number;
  breakSeconds: number;
  iterations: number;
  requireManualStart?: boolean;
}

export function useTimer(initialSettings: TimerSettings) {
  const [settings, setSettings] = useState(initialSettings);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    initialSettings.workMinutes * 60 + initialSettings.workSeconds
  );
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(1);
  const [currentIteration, setCurrentIteration] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [waitingForManualStart, setWaitingForManualStart] = useState(false);

  const totalSeconds = isBreak 
    ? settings.breakMinutes * 60 + settings.breakSeconds
    : settings.workMinutes * 60 + settings.workSeconds;

  const reset = useCallback(() => {
    setIsBreak(false);
    setTimeLeft(settings.workMinutes * 60 + settings.workSeconds);
    setIsRunning(false);
    setProgress(1);
    setCurrentIteration(1);
    setIsComplete(false);
    setWaitingForManualStart(false);
  }, [settings.workMinutes, settings.workSeconds]);

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    if (!isRunning) {
      setTimeLeft(newSettings.workMinutes * 60 + newSettings.workSeconds);
      setProgress(1);
    }
  };

  const toggleTimer = () => {
    if (waitingForManualStart) {
      setWaitingForManualStart(false);
    }
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (!isRunning) {
      updateSettings(initialSettings);
    }
  }, [initialSettings, isRunning]);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0 && !waitingForManualStart) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(newTime / totalSeconds);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        // After break, start next work session
        setIsBreak(false);
        setTimeLeft(settings.workMinutes * 60 + settings.workSeconds);
        setProgress(1);
        setCurrentIteration(prev => prev + 1);
        if (settings.requireManualStart) {
          setWaitingForManualStart(true);
          setIsRunning(false);
        }
      } else {
        // After work session
        if (currentIteration < settings.iterations) {
          // If not the last iteration, start break
          setIsBreak(true);
          setTimeLeft(settings.breakMinutes * 60 + settings.breakSeconds);
          setProgress(1);
          if (settings.requireManualStart) {
            setWaitingForManualStart(true);
            setIsRunning(false);
          }
        } else {
          // If last iteration, complete the session
          setIsComplete(true);
          setIsRunning(false);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, settings, currentIteration, totalSeconds, waitingForManualStart]);

  return {
    isBreak,
    timeLeft,
    isRunning,
    progress,
    currentIteration,
    isComplete,
    waitingForManualStart,
    toggleTimer,
    reset,
    updateSettings
  };
}