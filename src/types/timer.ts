export interface TimerPreset {
  id: string;
  name: string;
  workMinutes: number;
  breakMinutes: number;
  workSeconds: number;
  breakSeconds: number;
  iterations: number;
}

export interface ThemeColors {
  background: string;
  workColor: string;
  breakColor: string;
  text: string;
}

export const defaultPresets: TimerPreset[] = [
  {
    id: 'classic',
    name: 'Classic Pomodoro',
    workMinutes: 25,
    breakMinutes: 5,
    workSeconds: 0,
    breakSeconds: 0,
    iterations: 4
  },
  {
    id: 'short',
    name: 'Short Sessions',
    workMinutes: 15,
    breakMinutes: 3,
    workSeconds: 0,
    breakSeconds: 0,
    iterations: 6
  },
  {
    id: 'long',
    name: 'Long Focus',
    workMinutes: 45,
    breakMinutes: 15,
    workSeconds: 0,
    breakSeconds: 0,
    iterations: 2
  }
];

export const defaultTheme: ThemeColors = {
  background: '#111827',
  workColor: '#ef4444',
  breakColor: '#10b981',
  text: '#ffffff'
};