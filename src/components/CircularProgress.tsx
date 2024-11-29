import React from 'react';

interface CircularProgressProps {
  progress: number;
  isBreak: boolean;
  workColor: string;
  breakColor: string;
  children: React.ReactNode;
  size?: number;
}

export function CircularProgress({
  progress,
  isBreak,
  workColor,
  breakColor,
  children,
  size = 240
}: CircularProgressProps) {
  const strokeWidth = 8;
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          stroke={isBreak ? breakColor : workColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute">{children}</div>
    </div>
  );
}