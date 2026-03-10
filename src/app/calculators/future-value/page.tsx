"use client";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { calculateFutureValue } from "@/lib/calculations";
import { SliderRow, CalcLayout, fmt } from "@/components/calculators/shared";

export default function FutureValueCalculator() {
    const [amount, setAmount] = useState(100000);
    const [inflation, setInflation] = useState(6);
    const [years, setYears] = useState(10);

    const futureValue = calculateFutureValue(amount, inflation, years);
    const difference = futureValue - amount;

    const chartData = [
        { name: "Today", value: amount, fill: "#e5e7eb" },
        { name: `In ${years} Years`, value: Math.round(futureValue), fill: "#2d6a4f" },
    ];

    return (
        <CalcLayout title="Future Value" description="Calculate how much money you will need in the future to maintain the same purchasing power today.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div className="space-y-8">
                    <SliderRow label="Current Cost / Amount" value={amount} min={1000} max={10000000} step={1000} prefix="₹" onChange={setAmount} />
                    <SliderRow label="Expected Inflation Rate" value={inflation} min={1} max={15} step={0.5} unit="%" onChange={setInflation} />
                    <SliderRow label="Time Period" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
                    
                    <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col justify-center">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Required Future Amount</p>
                        <p className="text-5xl font-black text-gray-900 mb-4">{fmt(futureValue)}</p>
                        <div className="flex items-center gap-2 text-[#2d6a4f]">
                            <span className="text-sm font-bold">+{fmt(difference)}</span>
                            <span className="text-xs font-medium text-gray-400">due to inflation</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-lg font-semibold text-gray-900">Purchasing Power Impact</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 600, fill: '#64748b' }} />
                                <YAxis hide />
                                <Tooltip cursor={{ fill: 'transparent' }} formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
                                <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={80}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </CalcLayout>
    );
}
