export type TimerState = 'work' | 'break' | 'longBreak' | 'customBreak';

export interface TimerSettings {
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  autoContinue: boolean;
  theme: 'light' | 'dark';
}

export interface CustomBreak {
  id: string;
  name: string;
  startTime?: string;
  afterSessions?: number;
  duration: number;
  isActive: boolean;
}

export interface CustomBreakFormData {
  name: string;
  startTime?: string;
  afterSessions?: number;
  duration: number;
}

export interface TimerPreset {
  id: string;
  name: string;
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

export interface ChainedPreset extends TimerPreset {
  repetitions: number;
  order: number;
}

export interface PresetChain {
  id: string;
  name: string;
  presets: ChainedPreset[];
}

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface PresetSchedule {
  id: string;
  presetId?: string;
  chainId?: string;
  startTime: string;
  weekDays: WeekDay[];
  isRecurring: boolean;
  specificDate?: string;
  isActive: boolean;
}