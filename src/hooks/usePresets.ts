import { useState, useCallback, useEffect } from 'react';
import { TimerPreset, ChainedPreset } from '../types/timer';
import { dbOperations } from '../db';

export function usePresets() {
  const [presets, setPresets] = useState<TimerPreset[]>(() => dbOperations.getPresets());
  const [chainedPresets, setChainedPresets] = useState<ChainedPreset[]>(() => dbOperations.getChainedPresets());

  const addPreset = useCallback((preset: Omit<TimerPreset, 'id'>) => {
    const newPreset: TimerPreset = {
      ...preset,
      id: Date.now().toString(),
    };
    setPresets(prev => [...prev, newPreset]);
  }, []);

  const removePreset = useCallback((id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
    setChainedPresets(prev => prev.filter(p => p.id !== id));
  }, []);

  const addToChain = useCallback((preset: TimerPreset, repetitions: number) => {
    const order = chainedPresets.length;
    const newChainedPreset = { ...preset, repetitions, order };
    dbOperations.addToChain(preset, repetitions, order);
    setChainedPresets(prev => [...prev, newChainedPreset]);
  }, [chainedPresets]);

  const removeFromChain = useCallback((id: string) => {
    dbOperations.removeFromChain(id);
    setChainedPresets(prev => {
      const filtered = prev.filter(p => p.id !== id);
      const reordered = filtered.map((p, index) => ({ ...p, order: index }));
      dbOperations.reorderChain(reordered);
      return reordered;
    });
  }, []);

  const reorderChain = useCallback((fromIndex: number, toIndex: number) => {
    setChainedPresets(prev => {
      const newChain = [...prev];
      const [moved] = newChain.splice(fromIndex, 1);
      newChain.splice(toIndex, 0, moved);
      const reordered = newChain.map((p, index) => ({ ...p, order: index }));
      dbOperations.reorderChain(reordered);
      return reordered;
    });
  }, []);

  return {
    presets,
    chainedPresets,
    addPreset,
    removePreset,
    addToChain,
    removeFromChain,
    reorderChain,
  };
}