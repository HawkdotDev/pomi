import { PresetChain } from '../types/timer';
// import { Play, Trash2 } from 'lucide-react';
import error from "../assets/icons/error.svg";

interface SavedChainsListProps {
  chains: PresetChain[];
  onLoad: (chain: PresetChain) => void;
  onDelete: (id: string) => void;
}

export function SavedChainsList({ chains, onLoad, onDelete }: SavedChainsListProps) {
  if (chains.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        No saved chains
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chains.map((chain) => (
        <div
          key={chain.id}
          className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              {chain.name}
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {chain.presets.length} presets
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onLoad(chain)}
              className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors"
              title="Load chain"
            >
              {/* <Play className="w-5 h-5" /> */}
              <img src={error} alt="error logo" />
            </button>
            <button
              onClick={() => onDelete(chain.id)}
              className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-colors"
              title="Delete chain"
            >
              {/* <Trash2 className="w-5 h-5" /> */}
              <img src={error} alt="error logo" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}