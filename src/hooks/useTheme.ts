import { useState, useEffect } from 'react';
import { dbOperations } from '../db';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const settings = dbOperations.getSettings();
    return settings.theme || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    dbOperations.updateSettings({ theme: newTheme });
  };

  return { theme, toggleTheme };
}