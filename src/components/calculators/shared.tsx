"use client";
import React from "react";
import { Minus, Plus } from "lucide-react";

export const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

interface SliderRowProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    prefix?: string;
    onChange: (v: number) => void;
}

export function SliderRow({ label, value, min, max, step, unit = "", prefix = "", onChange }: SliderRowProps) {
    const pct = ((value - min) / (max - min)) * 100;

    const increment = () => onChange(Math.min(max, value + step));
    const decrement = () => onChange(Math.max(min, value - step));

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium" style={{ color: "#374151" }}>{label}</label>
                <div className="flex items-center gap-2">
                    <button onClick={decrement}
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-50 text-gray-400 border-gray-200">
                        <Minus size={13} />
                    </button>
                    <div className="min-w-28 text-center px-3 py-1.5 rounded-lg border text-sm font-semibold border-gray-200 text-gray-900 bg-white">
                        {prefix}{typeof value === "number" && value >= 1000 ? (value >= 100000 ? `${(value / 100000).toFixed(1)}L` : `${(value / 1000).toFixed(0)}K`) : value}{unit}
                    </div>
                    <button onClick={increment}
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-50 text-gray-400 border-gray-200">
                        <Plus size={13} />
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="relative h-1.5 rounded-full bg-gray-100">
                    <div className="absolute top-0 left-0 h-1.5 rounded-full transition-all bg-[#2d6a4f]"
                        style={{ width: `${pct}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 shadow-sm bg-white cursor-pointer transition-all border-[#2d6a4f]"
                        style={{ left: `calc(${pct}% - 8px)` }} />
                </div>
                <input type="range" min={min} max={max} step={step} value={value}
                    onChange={e => onChange(parseFloat(e.target.value))}
                    className="absolute inset-0 opacity-0 w-full h-4 -top-1.5 cursor-pointer" />
                <div className="flex justify-between text-[10px] mt-2 text-gray-400 font-medium">
                    <span>{prefix}{min >= 1000 ? `${(min / 1000).toFixed(0)}K` : min}{unit}</span>
                    <span>{prefix}{max >= 100000 ? `${(max / 100000).toFixed(0)}L` : max >= 1000 ? `${(max / 1000).toFixed(0)}K` : max}{unit}</span>
                </div>
            </div>
        </div>
    );
}

export function CalcLayout({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    <p className="text-gray-500">{description}</p>
                </div>
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-green-900/5 border border-white">
                    {children}
                </div>
            </div>
        </div>
    );
}
