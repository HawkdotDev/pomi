import Sun from '../assets/icons/sun.svg'
import Moon from '../assets/icons/moon.svg'

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <img src={Sun} alt="Logo" /> : <img src={Moon} alt="Logo" /> }
    </button>
  );
}