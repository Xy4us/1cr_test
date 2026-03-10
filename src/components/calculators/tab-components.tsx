"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { calculateEMI, calculateSIP, calculateLumpsum, calculateFutureValue, calculatePreEMI } from "@/lib/calculations";
import { SliderRow, fmt } from "./shared";

const PIE_COLORS = ["#2d6a4f", "#e5e7eb"];

export function LoanCalcComponent({ type }: { type: "home" | "car" | "personal" }) {
    const defaults = {
        personal: { principal: 500000, rate: 12, tenure: 36, label: "Personal Loan" },
        home: { principal: 5000000, rate: 8.5, tenure: 240, label: "Housing Loan" },
        car: { principal: 800000, rate: 10, tenure: 60, label: "Car Loan" },
    };

    const d = defaults[type] || defaults.personal;
    const [mode, setMode] = useState<"emi" | "pre-emi">("emi");
    const [principal, setPrincipal] = useState(d.principal);
    const [rate, setRate] = useState(d.rate);
    const [tenure, setTenure] = useState(d.tenure);
    
    // Pre-EMI specific state
    const [disbursed, setDisbursed] = useState(d.principal);
    const [preEmiMonths, setPreEmiMonths] = useState(3);

    useEffect(() => {
        setPrincipal(d.principal);
        setRate(d.rate);
        setTenure(d.tenure);
        setDisbursed(d.principal);
    }, [type]);

    const emi = calculateEMI(principal, rate, tenure);
    const preEmi = calculatePreEMI(disbursed, rate);
    
    const totalPayment = mode === "emi" ? emi * tenure : (preEmi * preEmiMonths) + (emi * tenure);
    const totalInterest = mode === "emi" ? (emi * tenure) - principal : ((preEmi * preEmiMonths) + (emi * tenure)) - principal;

    const pieData = mode === "emi" ? [
        { name: "Principal", value: Math.round(principal) },
        { name: "Interest", value: Math.round(totalInterest) },
    ] : [
        { name: "Principal", value: Math.round(principal) },
        { name: "Pre-EMI Interest", value: Math.round(preEmi * preEmiMonths) },
        { name: "EMI Interest", value: Math.round((emi * tenure) - principal) },
    ];

    const COLORS = mode === "emi" ? PIE_COLORS : ["#2d6a4f", "#52b788", "#b7e4c7"];

    return (
        <div className="space-y-12">
            {/* Sub-Tab Navigation */}
            <div className="flex justify-center">
                <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
                    <button 
                        onClick={() => setMode("emi")}
                        className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${mode === "emi" ? "bg-white text-[#2d6a4f] shadow-md" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        EMI Calculator
                    </button>
                    <button 
                        onClick={() => setMode("pre-emi")}
                        className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${mode === "pre-emi" ? "bg-white text-[#2d6a4f] shadow-md" : "text-gray-400 hover:text-gray-600"}`}
                    >
                        Pre-EMI Calculator
                    </button>
                </div>
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col gap-8 h-full">
                <div className="flex-1 space-y-8">
                    <SliderRow label="Loan Amount" value={principal} min={50000} max={50000000} step={50000} prefix="₹" onChange={setPrincipal} />
                    <SliderRow label="Interest Rate (p.a)" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                    <SliderRow label="Loan Tenure (Months)" value={tenure} min={12} max={360} step={12} unit=" mo" onChange={setTenure} />
                    
                    {mode === "pre-emi" && (
                        <div className="pt-8 mt-8 border-t border-gray-100 space-y-8">
                            <SliderRow label="Disbursed Amount" value={disbursed} min={50000} max={principal} step={50000} prefix="₹" onChange={setDisbursed} />
                            <SliderRow label="Pre-EMI Period" value={preEmiMonths} min={1} max={36} step={1} unit=" mo" onChange={setPreEmiMonths} />
                        </div>
                    )}
                </div>

                <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-8 ring-1 ring-black/[0.02] mt-auto">
                    <div className="space-y-1">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{mode === "emi" ? "Monthly EMI" : "Monthly Pre-EMI"}</p>
                        <p className="text-3xl font-black text-[#2d6a4f]">{fmt(mode === "emi" ? emi : preEmi)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Total Interest</p>
                        <p className="text-xl font-bold text-gray-900">{fmt(totalInterest)}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-green-900/5 relative overflow-hidden group h-full min-h-[500px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-green-100/50 transition-colors" />
                    
                    <h3 className="text-sm font-black text-gray-500 mb-10 uppercase tracking-[0.2em]">Payment Visualization</h3>
                    <div className="w-full aspect-square max-w-[320px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={pieData} 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius="75%" 
                                    outerRadius="95%" 
                                    paddingAngle={mode === "emi" ? 8 : 4} 
                                    dataKey="value" 
                                    strokeWidth={0} 
                                    startAngle={90} 
                                    endAngle={-270}
                                >
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                                </Pie>
                                <Tooltip formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Loan Principal</span>
                            <span className="text-3xl font-black text-gray-900">{Math.round((principal / totalPayment) * 100)}%</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-12 w-full max-w-[280px]">
                        {pieData.map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SIPCalcComponent() {
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col gap-8 h-full">
                <div className="flex-1 space-y-8">
                    <SliderRow label="Monthly SIP Amount" value={monthly} min={500} max={1000000} step={1000} prefix="₹" onChange={setMonthly} />
                    <SliderRow label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                    <SliderRow label="Investment Period" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
                </div>
                
                <div className="p-8 rounded-[32px] bg-[#2d6a4f] text-white shadow-2xl shadow-green-900/20 mt-auto">
                    <p className="text-green-100/70 text-xs font-bold uppercase tracking-widest mb-2">Wealth Created</p>
                    <p className="text-5xl font-black mb-6">{fmt(totalValue)}</p>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                        <div>
                            <p className="text-green-100/50 text-[10px] font-bold uppercase tracking-widest mb-1">Invested</p>
                            <p className="text-lg font-bold">{fmt(invested)}</p>
                        </div>
                        <div>
                            <p className="text-green-100/50 text-[10px] font-bold uppercase tracking-widest mb-1">Returns</p>
                            <p className="text-lg font-bold">{fmt(returns)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-green-900/5 h-full flex flex-col justify-center min-h-[480px]">
                <h3 className="text-lg font-bold text-gray-900 mb-8 text-center uppercase tracking-widest">Growth Projection</h3>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="year" hide />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                            <Tooltip formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="value" stroke="#2d6a4f" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                            <Area type="monotone" dataKey="invested" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export function LumpsumCalcComponent() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col gap-8 h-full">
                <div className="flex-1 space-y-8">
                    <SliderRow label="Investment Amount" value={amount} min={10000} max={10000000} step={10000} prefix="₹" onChange={setAmount} />
                    <SliderRow label="Expected Return Rate" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                    <SliderRow label="Time Period" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
                </div>
                
                <div className="p-8 rounded-[40px] bg-white border-2 border-[#2d6a4f]/10 space-y-8 mt-auto">
                   <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Future Value</p>
                            <p className="text-5xl font-black text-gray-900">{fmt(totalValue)}</p>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-[#2d6a4f] text-[10px] font-black uppercase tracking-widest mb-2">Profit</span>
                            <p className="text-2xl font-black text-[#2d6a4f]">+{fmt(profit)}</p>
                        </div>
                   </div>
                   <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex p-1">
                        <div className="h-full bg-gray-200 rounded-full" style={{ width: `${(amount/totalValue)*100}%` }} />
                        <div className="h-full bg-[#2d6a4f] rounded-full ml-1" style={{ width: `${(profit/totalValue)*100}%` }} />
                   </div>
                </div>
            </div>

            <div className="bg-gray-50/50 rounded-[40px] p-10 h-full flex flex-col justify-center min-h-[420px]">
                <h3 className="text-lg font-bold text-gray-900 mb-8 text-center uppercase tracking-widest">Compound Growth</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="lumGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="year" hide />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                            <Tooltip formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey="value" stroke="#2d6a4f" strokeWidth={5} fillOpacity={1} fill="url(#lumGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export function FutureValueCalcComponent() {
    const [amount, setAmount] = useState(100000);
    const [inflation, setInflation] = useState(6);
    const [years, setYears] = useState(10);

    const futureValue = calculateFutureValue(amount, inflation, years);
    const difference = futureValue - amount;

    const chartData = [
        { name: "Today", value: amount, fill: "#f1f5f9" },
        { name: `In ${years}Y`, value: Math.round(futureValue), fill: "#2d6a4f" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col gap-8 h-full">
                <div className="flex-1 space-y-8">
                    <SliderRow label="Current Lifecycle Cost" value={amount} min={1000} max={10000000} step={1000} prefix="₹" onChange={setAmount} />
                    <SliderRow label="Avg. Inflation Rate" value={inflation} min={1} max={15} step={0.5} unit="%" onChange={setInflation} />
                    <SliderRow label="Years into the Future" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
                </div>
                
                <div className="p-10 rounded-[48px] bg-[#111827] text-white overflow-hidden relative mt-auto">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2d6a4f]/20 blur-[60px] rounded-full" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Inflation Adjusted Goal</p>
                    <p className="text-6xl font-black text-white mb-6">{fmt(futureValue)}</p>
                    <p className="text-sm font-medium text-gray-400">
                        You'll need <span className="text-[#2d6a4f] font-bold">+{fmt(difference)}</span> more to buy the same things.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-12 bg-gray-50/30 rounded-[48px] border border-gray-100 h-full min-h-[440px]">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Purchasing Power Erosion</h3>
                <div className="h-[280px] w-full max-w-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 900, fill: '#1e293b' }} />
                            <Tooltip cursor={{ fill: 'transparent' }} formatter={(v: any) => fmt(Number(v))} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }} />
                            <YAxis hide />
                            <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={100}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
