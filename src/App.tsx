import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TimerDisplay } from './components/TimerDisplay';
import { QuickSettings } from './components/QuickSettings';
import { PresetChainList } from './components/PresetChainList';
import { PresetChainForm } from './components/PresetChainForm';
import { useTimer } from './hooks/useTimer';
import { useScheduler } from './hooks/useScheduler';
import { usePresetChain } from './hooks/usePresetChain';
import { useNotificationSettings } from './hooks/useNotificationSettings';
import { 
  TimerPreset, 
  PresetChain, 
  ThemeColors, 
  defaultPresets, 
  darkTheme,
  lightTheme,
  Schedule,
  RecurrenceType,
  defaultNotificationSettings
} from './types/timer';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [presets, setPresets] = useState<TimerPreset[]>(defaultPresets);
  const [chains, setChains] = useState<PresetChain[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
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

  const { settings: notificationSettings, updateSettings: updateNotificationSettings } = 
    useNotificationSettings(defaultNotificationSettings);
  
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

  const handleScheduleStart = (presetId: string, chainId?: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(preset);
      setIsCustom(false);
      reset();
      toggleTimer();
    }
    if (chainId) {
      const chain = chains.find(c => c.id === chainId);
      if (chain) {
        setSelectedChain(chain);
      }
    }
  };

  useScheduler(schedules, presets, chains, handleScheduleStart);

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

  const handleSaveChain = (chain: Omit<PresetChain, 'id'>) => {
    const newChain: PresetChain = {
      ...chain,
      id: Date.now().toString()
    };
    setChains(prev => [...prev, newChain]);
    setShowChainForm(false);
  };

  const handleEditChain = (chain: PresetChain) => {
    setChains(prev => prev.map(c => c.id === chain.id ? chain : c));
    setShowChainForm(false);
  };

  const handleDeleteChain = (chainId: string) => {
    setChains(prev => prev.filter(chain => chain.id !== chainId));
    if (selectedChain?.id === chainId) {
      setSelectedChain(null);
    }
  };

  const handleSaveSchedule = (newSchedule: Omit<Schedule, 'id'>) => {
    const schedule: Schedule = {
      ...newSchedule,
      id: Date.now().toString()
    };
    setSchedules(prev => [...prev, schedule]);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.filter(s => s.id !== scheduleId));
  };

  const handleToggleSchedule = (scheduleId: string, enabled: boolean) => {
    setSchedules(prev => prev.map(s => 
      s.id === scheduleId ? { ...s, isEnabled: enabled } : s
    ));
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
        schedules={schedules}
        chains={chains}
        onSaveSchedule={handleSaveSchedule}
        onDeleteSchedule={handleDeleteSchedule}
        onToggleSchedule={handleToggleSchedule}
        notificationSettings={notificationSettings}
        onUpdateNotificationSettings={updateNotificationSettings}
      />

      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
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
            <div className="w-1/2 p-6 bg-gray-800/30 rounded-lg">
              {showChainForm ? (
                <PresetChainForm
                  presets={presets}
                  onSave={handleSaveChain}
                  onCancel={() => setShowChainForm(false)}
                />
              ) : (
                <PresetChainList
                  chains={chains}
                  onSelectChain={setSelectedChain}
                  onCreateChain={() => setShowChainForm(true)}
                  onEditChain={(chain) => {
                    setSelectedChain(chain);
                    setShowChainForm(true);
                  }}
                  onDeleteChain={handleDeleteChain}
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