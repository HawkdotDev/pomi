// import { Sun, Moon } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        // <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <img src={error} alt="error logo" />
      ) : (
        // <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <img src={error} alt="error logo" />
      )}
    </button>
  );
}