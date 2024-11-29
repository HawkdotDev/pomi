import React from 'react';
import { ThemeColors } from '../types/timer';

interface ColorPickerProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold">Customize Colors</h2>
      <div className="flex flex-col gap-4">
        {(Object.keys(colors) as Array<keyof ThemeColors>).map((key) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  className="w-10 h-10 rounded-full cursor-pointer appearance-none bg-transparent"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none border border-gray-600"
                  style={{ backgroundColor: colors[key] }}
                />
              </div>
              <input
                type="text"
                value={colors[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}