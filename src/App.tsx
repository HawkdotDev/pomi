import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TimerDisplay } from './components/TimerDisplay';
import { QuickSettings } from './components/QuickSettings';
import { PresetChainForm } from './components/PresetChainForm';
import { PresetChainList } from './components/PresetChainList';
import { useTimer } from './hooks/useTimer';
import { usePresetChain } from './hooks/usePresetChain';
import { 
  TimerPreset, 
  PresetChain, 
  ThemeColors, 
  defaultPresets, 
  darkTheme,
  lightTheme 
} from './types/timer';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [presets, setPresets] = useState<TimerPreset[]>(defaultPresets);
  const [chains, setChains] = useState<PresetChain[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset>(defaultPresets[0]);
  const [selectedChain, setSelectedChain] = useState<PresetChain | null>(null);
  const [showPresetForm, setShowPresetForm] = useState(false);
  const [showChainForm, setShowChainForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChainPanel, setShowChainPanel] = useState(false);
  const [colors, setColors] = useState<ThemeColors>(darkTheme);
  const [isCustom, setIsCustom] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    workMinutes: 25,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,
    iterations: 4,
    requireManualStart: false
  });
  
  const activeSettings = isCustom ? customSettings : selectedPreset;
  
  const {
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
  } = useTimer(activeSettings);

  const chainTimer = selectedChain ? usePresetChain(selectedChain) : null;

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
    setColors(prev => prev === darkTheme ? lightTheme : darkTheme);
  };

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

  const handleSaveChain = (newChain: Omit<PresetChain, 'id'>) => {
    const chain: PresetChain = {
      ...newChain,
      id: Date.now().toString()
    };
    setChains(prev => [...prev, chain]);
    setShowChainForm(false);
  };

  const handleCustomSettingChange = (
    key: keyof typeof customSettings,
    value: number | boolean
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
    setSelectedChain(null);
    setIsCustom(false);
  };

  const handleChainSelect = (chain: PresetChain) => {
    setSelectedChain(chain);
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
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onToggleChainPanel={() => setShowChainPanel(!showChainPanel)}
        showChainPanel={showChainPanel}
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

      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 flex">
          <div className={`flex-1 flex items-center justify-center ${showChainPanel ? 'w-1/2' : 'w-full'}`}>
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
                waitingForManualStart={waitingForManualStart}
              />
            )}
          </div>

          {showChainPanel && (
            <div className="w-1/2 p-8 border-l border-gray-800">
              {showChainForm ? (
                <PresetChainForm
                  presets={presets}
                  onSave={handleSaveChain}
                  onCancel={() => setShowChainForm(false)}
                />
              ) : (
                <PresetChainList
                  chains={chains}
                  onSelectChain={handleChainSelect}
                  onCreateChain={() => setShowChainForm(true)}
                  onEditChain={(chain) => {
                    // Implement edit functionality
                  }}
                  onDeleteChain={(chainId) => {
                    setChains(prev => prev.filter(chain => chain.id !== chainId));
                  }}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <QuickSettings
        workMinutes={activeSettings.workMinutes}
        workSeconds={activeSettings.workSeconds}
        breakMinutes={activeSettings.breakMinutes}
        breakSeconds={activeSettings.breakSeconds}
        iterations={activeSettings.iterations}
        requireManualStart={activeSettings.requireManualStart}
        onWorkMinutesChange={(value) => handleCustomSettingChange('workMinutes', value)}
        onWorkSecondsChange={(value) => handleCustomSettingChange('workSeconds', value)}
        onBreakMinutesChange={(value) => handleCustomSettingChange('breakMinutes', value)}
        onBreakSecondsChange={(value) => handleCustomSettingChange('breakSeconds', value)}
        onIterationsChange={(value) => handleCustomSettingChange('iterations', value)}
        onRequireManualStartChange={(value) => handleCustomSettingChange('requireManualStart', value)}
        disabled={isRunning}
      />
    </div>
  );
}