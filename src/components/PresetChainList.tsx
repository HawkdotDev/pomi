import Play from '../assets/icons/play.svg'
import Trash from '../assets/icons/trash.svg'
import Plus from '../assets/icons/plus.svg'
import Edit from '../assets/icons/edit.svg'

import { PresetChain } from '../types/timer';
import { formatTime } from '../utils/timeFormat';

interface PresetChainListProps {
  chains: PresetChain[];
  onSelectChain: (chain: PresetChain) => void;
  onCreateChain: () => void;
  onEditChain: (chain: PresetChain) => void;
  onDeleteChain: (chainId: string) => void;
}

export function PresetChainList({
  chains,
  onSelectChain,
  onCreateChain,
  onEditChain,
  onDeleteChain
}: PresetChainListProps) {
  const getTotalDuration = (chain: PresetChain) => {
    return chain.presets.reduce((total, { preset, delayMinutes, delaySeconds }) => {
      const presetDuration = (preset.workMinutes * 60 + preset.workSeconds) * preset.iterations +
                            (preset.breakMinutes * 60 + preset.breakSeconds) * (preset.iterations - 1);
      const delay = delayMinutes * 60 + delaySeconds;
      return total + presetDuration + delay;
    }, 0);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Preset Chains</h2>
        <button
          onClick={onCreateChain}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          title="Create new chain"
        >
          <img src={Plus} alt="Logo" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {chains.map((chain) => (
          <div
            key={chain.id}
            className="p-4 bg-gray-800 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{chain.name}</h3>
                <p className="text-sm text-gray-400">
                  {chain.presets.length} presets • Total: {formatTime(getTotalDuration(chain))}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectChain(chain)}
                  className="p-2 rounded-full hover:bg-gray-600 transition-colors"
                  title="Start chain"
                >
                  <img src={Play} alt="Logo" />
                </button>
                <button
                  onClick={() => onEditChain(chain)}
                  className="p-2 rounded-full hover:bg-gray-600 transition-colors"
                  title="Edit chain"
                >
                  <img src={Edit} alt="Logo" />
                </button>
                <button
                  onClick={() => onDeleteChain(chain.id)}
                  className="p-2 rounded-full hover:bg-gray-600 transition-colors text-red-400 hover:text-red-300"
                  title="Delete chain"
                >
                  <img src={Trash} alt="Logo" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}