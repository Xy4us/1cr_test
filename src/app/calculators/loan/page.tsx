"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Minus, Plus } from "lucide-react";
import { calculateEMI } from "@/lib/calculations";
import { SliderRow, CalcLayout, fmt } from "@/components/calculators/shared";

const PIE_COLORS = ["#2d6a4f", "#e5e7eb"];

export default function LoanCalculator() {
    const searchParams = useSearchParams();
    const type = (searchParams.get("type") as "personal" | "home" | "car") || "personal";

    const defaults = {
        personal: { principal: 500000, rate: 12, tenure: 36, label: "Personal Loan" },
        home: { principal: 5000000, rate: 8.5, tenure: 240, label: "Housing Loan" },
        car: { principal: 800000, rate: 10, tenure: 60, label: "Car Loan" },
    };

    const d = defaults[type] || defaults.personal;
    const [principal, setPrincipal] = useState(d.principal);
    const [rate, setRate] = useState(d.rate);
    const [tenure, setTenure] = useState(d.tenure);

    // Reset when type changes
    useEffect(() => {
        setPrincipal(d.principal);
        setRate(d.rate);
        setTenure(d.tenure);
    }, [type]);

    const emi = calculateEMI(principal, rate, tenure);
    const total = emi * tenure;
    const interest = total - principal;

    const pieData = [
        { name: "Principal", value: Math.round(principal) },
        { name: "Interest", value: Math.round(interest) },
    ];

    return (
        <CalcLayout title={d.label} description={`Calculate your monthly EMI and total interest for a ${d.label.toLowerCase()}.`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Inputs */}
                <div className="space-y-8">
                    <SliderRow label="Loan Amount" value={principal} min={50000} max={50000000} step={50000} prefix="₹" onChange={setPrincipal} />
                    <SliderRow label="Interest Rate (p.a)" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                    <SliderRow label="Loan Tenure (Months)" value={tenure} min={12} max={360} step={12} unit=" mo" onChange={setTenure} />
                    
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Monthly EMI</span>
                            <span className="text-2xl font-bold text-[#2d6a4f]">{fmt(emi)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Total Interest</span>
                            <span className="text-lg font-semibold text-gray-900">{fmt(interest)}</span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-900">Total Amount</span>
                            <span className="text-xl font-bold text-gray-900">{fmt(total)}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Charts */}
                <div className="flex flex-col items-center justify-center space-y-8">
                    <h3 className="text-lg font-semibold text-gray-900">Breakdown of Total Payment</h3>
                    <div className="w-full aspect-square max-w-[320px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius="65%" outerRadius="90%" paddingAngle={5} dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}>
                                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                                </Pie>
                                <Tooltip formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Monthly</span>
                            <span className="text-2xl font-bold text-gray-900">{fmt(emi)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full max-w-[280px]">
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#2d6a4f] mb-2" />
                            <span className="text-xs text-gray-500 font-medium">Principal</span>
                            <span className="text-sm font-bold text-gray-900">{((principal/total)*100).toFixed(0)}%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-200 mb-2" />
                            <span className="text-xs text-gray-500 font-medium">Interest</span>
                            <span className="text-sm font-bold text-gray-900">{((interest/total)*100).toFixed(0)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </CalcLayout>
    );
}
