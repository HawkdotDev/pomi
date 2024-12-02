import { useState } from "react";
import { useTimer } from "./hooks/useTimer";
import { usePresets } from "./hooks/usePresets";
import { TimerDisplay } from "./components/TimerDisplay";
import { SessionProgress } from "./components/SessionProgress";
import { CustomBreakForm } from "./components/CustomBreakForm";
import { CustomBreaksList } from "./components/CustomBreaksList";
import { TimerSettings } from "./components/TimerSettings";
import { PresetSelector } from "./components/PresetSelector";
import { PresetChain } from "./components/PresetChain";
// import { Timer, Plus } from "lucide-react";
import { Toaster } from "sonner";

import error from "./assets/icons/error.svg";

function App() {
  const {
    timeLeft,
    isActive,
    timerState,
    sessions,
    customBreaks,
    settings,
    toggleTimer,
    resetTimer,
    addCustomBreak,
    removeCustomBreak,
    updateSettings,
  } = useTimer();

  const { presets, chainedPresets, addToChain, removeFromChain, reorderChain } =
    usePresets();

  const [showBreakForm, setShowBreakForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center space-x-2 mb-8">
          {/* <Timer size={24} color="#f43f5e" className="w-6 h-6" /> */}
          <img src={error} alt="error logo" />
          <h1 className="text-2xl font-bold text-gray-800">Pomi</h1>
        </div>

        <TimerDisplay
          timeLeft={timeLeft}
          timerState={timerState}
          isActive={isActive}
          onToggle={toggleTimer}
          onReset={resetTimer}
        />

        <div className="mt-8">
          <TimerSettings
            autoContinue={settings.autoContinue}
            onAutoContinueChange={(value) =>
              updateSettings({ autoContinue: value })
            }
          />
        </div>

        <div className="mt-8 flex justify-center">
          <SessionProgress sessions={sessions} totalSessions={4} />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Preset Chain
          </h2>
          <PresetSelector presets={presets} onAddToChain={addToChain} />
          <div className="mt-4">
            <PresetChain
              chainedPresets={chainedPresets}
              onRemove={removeFromChain}
              onReorder={reorderChain}
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Custom Breaks
            </h2>
            <button
              onClick={() => setShowBreakForm(true)}
              className="flex items-center space-x-1 text-rose-500 hover:text-rose-600 transition-colors"
            >
              {/* <Plus className="w-5 h-5" /> */}
              <img src={error} alt="error logo" />
              <span>Add Break</span>
            </button>
          </div>

          {showBreakForm ? (
            <CustomBreakForm
              onSubmit={(data) => {
                addCustomBreak(data);
                setShowBreakForm(false);
              }}
              onCancel={() => setShowBreakForm(false)}
            />
          ) : (
            <CustomBreaksList
              breaks={customBreaks}
              onDelete={removeCustomBreak}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
