"use client";
import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { calculateSIP } from "@/lib/calculations";
import { SliderRow, CalcLayout, fmt } from "@/components/calculators/shared";

const PIE_COLORS = ["#2d6a4f", "#e5e7eb"];

export default function SIPCalculator() {
    const [monthly, setMonthly] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const totalValue = calculateSIP(monthly, rate, years);
    const invested = monthly * years * 12;
    const returns = totalValue - invested;

    const chartData = Array.from({ length: years + 1 }, (_, i) => ({
        year: i,
        invested: monthly * i * 12,
        value: Math.round(calculateSIP(monthly, rate, i)),
    }));

    const pieData = [
        { name: "Invested", value: invested },
        { name: "Returns", value: Math.max(0, returns) },
    ];

    return (
        <CalcLayout title="SIP Calculator" description="Estimate the wealth you can accumulate by investing a fixed amount regularly.">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Inputs */}
                <div className="space-y-8">
                    <SliderRow label="Monthly SIP Amount" value={monthly} min={500} max={500000} step={500} prefix="₹" onChange={setMonthly} />
                    <SliderRow label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                    <SliderRow label="Investment Period (Years)" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
                    
                    <div className="p-8 rounded-3xl bg-[#2d6a4f] text-white shadow-xl shadow-green-900/20">
                        <div className="space-y-6">
                            <div>
                                <p className="text-green-100/70 text-sm font-medium mb-1">Estimated Total Value</p>
                                <p className="text-4xl font-bold">{fmt(totalValue)}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                <div>
                                    <p className="text-green-100/60 text-xs font-medium mb-1 uppercase tracking-wider">Invested</p>
                                    <p className="text-lg font-semibold">{fmt(invested)}</p>
                                </div>
                                <div>
                                    <p className="text-green-100/60 text-xs font-medium mb-1 uppercase tracking-wider">Estimated Returns</p>
                                    <p className="text-lg font-semibold">{fmt(returns)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Visualization */}
                <div className="space-y-10">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Growth Projection</h3>
                        <div className="h-[240px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="sipTrend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                                    <Tooltip 
                                        formatter={(v: any) => fmt(Number(v))} 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#2d6a4f" strokeWidth={3} fillOpacity={1} fill="url(#sipTrend)" name="Portfolio Value" />
                                    <Area type="monotone" dataKey="invested" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Invested" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Portfolio Composition</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f]" />
                                    <span className="text-xs font-medium text-gray-500">Returns</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                                    <span className="text-xs font-medium text-gray-500">Invested</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-6 w-full rounded-full bg-gray-100 overflow-hidden flex">
                            <div 
                                className="h-full bg-gray-200" 
                                style={{ width: `${(invested/totalValue)*100}%` }} 
                            />
                            <div 
                                className="h-full bg-[#2d6a4f]" 
                                style={{ width: `${(returns/totalValue)*100}%` }} 
                            />
                        </div>
                        <div className="flex justify-between mt-3 text-xs font-bold text-gray-900">
                            <span>{((invested/totalValue)*100).toFixed(0)}% Invested</span>
                            <span>{((returns/totalValue)*100).toFixed(0)}% Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </CalcLayout>
    );
}
