import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TimerDisplay } from './components/TimerDisplay';
import { QuickSettings } from './components/QuickSettings';
import { useTimer } from './hooks/useTimer';
import { TimerPreset, ThemeColors, defaultPresets, defaultTheme } from './types/timer';

export default function App() {
  const [presets, setPresets] = useState<TimerPreset[]>(defaultPresets);
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset>(defaultPresets[0]);
  const [showPresetForm, setShowPresetForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [colors, setColors] = useState<ThemeColors>(defaultTheme);
  const [isCustom, setIsCustom] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    workMinutes: 25,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    iterations: 4
  });
  
  const activeSettings = isCustom ? customSettings : selectedPreset;
  
  const {
    isBreak,
    timeLeft,
    isRunning,
    progress,
    currentIteration,
    isComplete,
    toggleTimer,
    reset,
    updateSettings
  } = useTimer(activeSettings);

  const handleSavePreset = (newPreset: Omit<TimerPreset, 'id'>) => {
    const preset: TimerPreset = {
      ...newPreset,
      id: Date.now().toString(),
      workSeconds: 0,
      breakSeconds: 0
    };
    setPresets((prev) => [...prev, preset]);
    setSelectedPreset(preset);
    setShowPresetForm(false);
    setIsCustom(false);
  };

  const handleCustomSettingChange = (
    key: keyof typeof customSettings,
    value: number
  ) => {
    setCustomSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      updateSettings(newSettings);
      return newSettings;
    });
    setIsCustom(true);
  };

  const handlePresetSelect = (preset: TimerPreset) => {
    setSelectedPreset(preset);
    setIsCustom(false);
  };

  const handleSaveCustomAsPreset = () => {
    setShowPresetForm(true);
    setShowSettings(true);
  };

  return (
    <div 
      className="min-h-screen transition-colors pb-32"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Navbar 
        showSettings={showSettings}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      <Sidebar
        show={showSettings}
        onClose={() => setShowSettings(false)}
        showPresetForm={showPresetForm}
        presets={presets}
        selectedPreset={selectedPreset}
        onSelectPreset={handlePresetSelect}
        onOpenPresetForm={() => setShowPresetForm(true)}
        onSavePreset={handleSavePreset}
        onCancelPresetForm={() => setShowPresetForm(false)}
        colors={colors}
        onColorChange={setColors}
        initialPresetValues={isCustom ? customSettings : undefined}
      />

      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl p-8">
          {isComplete ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Session Complete!</h2>
              <button
                onClick={reset}
                className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                Start New Session
              </button>
            </div>
          ) : (
            <TimerDisplay
              isBreak={isBreak}
              timeLeft={timeLeft}
              isRunning={isRunning}
              progress={progress}
              currentIteration={currentIteration}
              totalIterations={activeSettings.iterations}
              workColor={colors.workColor}
              breakColor={colors.breakColor}
              presetName={selectedPreset.name}
              onToggle={toggleTimer}
              onReset={reset}
              onSaveAsPreset={isCustom ? handleSaveCustomAsPreset : undefined}
              isCustom={isCustom}
            />
          )}
        </div>
      </main>

      <QuickSettings
        workMinutes={activeSettings.workMinutes}
        workSeconds={activeSettings.workSeconds}
        breakMinutes={activeSettings.breakMinutes}
        breakSeconds={activeSettings.breakSeconds}
        iterations={activeSettings.iterations}
        onWorkMinutesChange={(value) => handleCustomSettingChange('workMinutes', value)}
        onWorkSecondsChange={(value) => handleCustomSettingChange('workSeconds', value)}
        onBreakMinutesChange={(value) => handleCustomSettingChange('breakMinutes', value)}
        onBreakSecondsChange={(value) => handleCustomSettingChange('breakSeconds', value)}
        onIterationsChange={(value) => handleCustomSettingChange('iterations', value)}
        disabled={isRunning}
      />
    </div>
  );
}