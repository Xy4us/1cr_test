"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  className?: string;
  disabled?: boolean;
}

function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className,
  disabled,
}: SliderProps) {
  const currentValue = value?.[0] ?? defaultValue?.[0] ?? min;

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${((currentValue - min) / (max - min)) * 100}%`,
            backgroundColor: "#2d6a4f",
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        onChange={(e) => {
          const newVal = parseFloat(e.target.value);
          onValueChange?.([newVal]);
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        style={{ WebkitAppearance: "none" }}
      />
      {/* Thumb */}
      <div
        className="absolute h-4 w-4 rounded-full border-2 border-white shadow-md transition-shadow hover:shadow-lg pointer-events-none"
        style={{
          backgroundColor: "#2d6a4f",
          left: `calc(${((currentValue - min) / (max - min)) * 100}% - 8px)`,
        }}
      />
    </div>
  );
}

export { Slider };
