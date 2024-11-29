import { useState, useEffect, useCallback } from 'react';
import { TimerPreset } from '../types/timer';

interface TimerSettings {
  workMinutes: number;
  breakMinutes: number;
  workSeconds: number;
  breakSeconds: number;
  iterations: number;
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
  }, [settings.workMinutes, settings.workSeconds]);

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    if (!isRunning) {
      setTimeLeft(newSettings.workMinutes * 60 + newSettings.workSeconds);
      setProgress(1);
    }
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);

  useEffect(() => {
    if (!isRunning) {
      updateSettings(initialSettings);
    }
  }, [initialSettings, isRunning]);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(newTime / totalSeconds);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        if (currentIteration < settings.iterations) {
          setCurrentIteration((prev) => prev + 1);
          setIsBreak(false);
          setTimeLeft(settings.workMinutes * 60 + settings.workSeconds);
          setProgress(1);
        } else {
          setIsComplete(true);
          setIsRunning(false);
        }
      } else {
        setIsBreak(true);
        setTimeLeft(settings.breakMinutes * 60 + settings.breakSeconds);
        setProgress(1);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, settings, currentIteration, totalSeconds]);

  return {
    isBreak,
    timeLeft,
    isRunning,
    progress,
    currentIteration,
    isComplete,
    toggleTimer,
    reset,
    updateSettings
  };
}