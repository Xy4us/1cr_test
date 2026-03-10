"use client";
import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { calculateLumpsum } from "@/lib/calculations";
import { SliderRow, CalcLayout, fmt } from "@/components/calculators/shared";

export default function LumpsumCalculator() {
    const [amount, setAmount] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const totalValue = calculateLumpsum(amount, rate, years);
    const profit = totalValue - amount;

    const chartData = Array.from({ length: years + 1 }, (_, i) => ({
        year: i,
        value: Math.round(calculateLumpsum(amount, rate, i)),
    }));

    return (
        <CalcLayout title="Lumpsum Calculator" description="See how your one-time investment could grow over time with compound interest.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div className="space-y-8">
                    <SliderRow label="Investment Amount" value={amount} min={10000} max={10000000} step={10000} prefix="₹" onChange={setAmount} />
                    <SliderRow label="Expected Return Rate (p.a)" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                    <SliderRow label="Time Period" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
                    
                    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-green-900/5 space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Value</p>
                                <p className="text-4xl font-black text-gray-900">{fmt(totalValue)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Wealth Gained</p>
                                <p className="text-2xl font-bold text-[#2d6a4f]">+{fmt(profit)}</p>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                            <div className="h-full bg-gray-200" style={{ width: `${(amount/totalValue)*100}%` }} />
                            <div className="h-full bg-[#2d6a4f]" style={{ width: `${(profit/totalValue)*100}%` }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Compound Interest Growth</h3>
                    <div className="h-[300px] w-full bg-gray-50/50 rounded-3xl p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                                <Tooltip formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
                                <Area type="monotone" dataKey="value" stroke="#2d6a4f" strokeWidth={4} fillOpacity={1} fill="url(#growth)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-center text-gray-400 font-medium italic">
                        The power of compounding: Your money grew by {((profit/amount)*100).toFixed(0)}% in {years} years.
                    </p>
                </div>
            </div>
        </CalcLayout>
    );
}
