import { NotificationSettings } from '../types/timer';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

export function playSound(soundUrl: string, volume: number = 1) {
  const audio = new Audio(soundUrl);
  audio.volume = volume;
  audio.play().catch(error => console.error('Error playing sound:', error));
}