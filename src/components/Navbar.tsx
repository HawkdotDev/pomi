import React from 'react';
import { Timer, Settings, Link2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  showSettings: boolean;
  onToggleSettings: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  showChainPanel: boolean;
  onToggleChainPanel: () => void;
}

export function Navbar({ 
  showSettings, 
  onToggleSettings, 
  isDark, 
  onToggleTheme,
  showChainPanel,
  onToggleChainPanel
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6" />
          <h1 className="text-xl font-bold">Pomodoro Timer</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleChainPanel}
            className={`p-2 rounded-lg transition-colors ${
              showChainPanel ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
            title="Preset Chains"
          >
            <Link2 size={20} />
          </button>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button
            onClick={onToggleSettings}
            className={`p-2 rounded-lg transition-colors ${
              showSettings ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}