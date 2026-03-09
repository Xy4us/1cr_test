"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Home, Car, TrendingUp, Layers, Clock } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { calculateEMI, calculateSIP, calculateLumpsum, calculateFutureValue } from "@/lib/calculations";

const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const TABS = [
    { id: "personal", label: "Personal Loan", icon: "👤" },
    { id: "home", label: "Housing Loan", icon: "🏠" },
    { id: "car", label: "Car Loan", icon: "🚗" },
    { id: "sip", label: "SIP Investment", icon: "📈" },
];

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

function SliderRow({ label, value, min, max, step, unit = "", prefix = "", onChange }: SliderRowProps) {
    const pct = ((value - min) / (max - min)) * 100;

    const increment = () => onChange(Math.min(max, value + step));
    const decrement = () => onChange(Math.max(min, value - step));

    return (
        <div className="mb-6">
            {/* Label + controls row */}
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium" style={{ color: "#374151" }}>{label}</label>
                <div className="flex items-center gap-2">
                    <button onClick={decrement}
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                        <Minus size={13} />
                    </button>
                    <div className="min-w-28 text-center px-3 py-1.5 rounded-lg border text-sm font-semibold"
                        style={{ borderColor: "#d1d5db", color: "#111827", backgroundColor: "#fff" }}>
                        {prefix}{typeof value === "number" && value >= 1000 ? (value >= 100000 ? `${(value / 100000).toFixed(1)}L` : `${(value / 1000).toFixed(0)}K`) : value}{unit}
                    </div>
                    <button onClick={increment}
                        className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                        <Plus size={13} />
                    </button>
                </div>
            </div>

            {/* Slider track */}
            <div className="relative">
                <div className="relative h-1 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                    <div className="absolute top-0 left-0 h-1 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: "#7a2135" }} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 shadow-sm bg-white cursor-pointer transition-all"
                        style={{ left: `calc(${pct}% - 8px)`, borderColor: "#7a2135" }} />
                </div>
                <input type="range" min={min} max={max} step={step} value={value}
                    onChange={e => onChange(parseFloat(e.target.value))}
                    className="absolute inset-0 opacity-0 w-full h-4 -top-1.5 cursor-pointer" />
                <div className="flex justify-between text-xs mt-2" style={{ color: "#9ca3af" }}>
                    <span>{prefix}{min >= 1000 ? `${(min / 1000).toFixed(0)}K` : min}{unit}</span>
                    <span>{prefix}{max >= 100000 ? `${(max / 100000).toFixed(0)}L` : max >= 1000 ? `${(max / 1000).toFixed(0)}K` : max}{unit}</span>
                </div>
            </div>
        </div>
    );
}

function LoanCalc({ type }: { type: "personal" | "home" | "car" }) {
    const defaults = {
        personal: { principal: 500000, rate: 12, tenure: 36 },
        home: { principal: 5000000, rate: 8.5, tenure: 240 },
        car: { principal: 800000, rate: 10, tenure: 60 },
    };
    const d = defaults[type];
    const [principal, setPrincipal] = useState(d.principal);
    const [rate, setRate] = useState(d.rate);
    const [tenure, setTenure] = useState(d.tenure);

    const emi = calculateEMI(principal, rate, tenure);
    const total = emi * tenure;
    const interest = total - principal;

    const pieData = [
        { name: "Principal Amount", value: Math.round(principal) },
        { name: "Interest Payable", value: Math.round(interest) },
    ];
    const PIE_COLORS = ["#7a2135", "#e5e7eb"];

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border rounded-xl p-2 text-xs shadow-lg" style={{ borderColor: "#e5e7eb" }}>
                    <p className="font-medium">{payload[0].name}</p>
                    <p className="font-bold" style={{ color: "#7a2135" }}>{fmt(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: inputs */}
            <div>
                <SliderRow label="Loan Amount" value={principal}
                    min={type === "home" ? 500000 : 50000} max={type === "home" ? 50000000 : type === "car" ? 5000000 : 5000000}
                    step={type === "home" ? 100000 : 50000} prefix="₹" onChange={setPrincipal} />
                <SliderRow label="Interest Rate (p.a)" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />

                {/* Tenure with Monthly/Yearly toggle */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium" style={{ color: "#374151" }}>Loan Term</label>
                            <div className="flex text-xs rounded-lg overflow-hidden border" style={{ borderColor: "#d1d5db" }}>
                                <button className="px-2 py-1 font-medium" style={{ backgroundColor: "#7a2135", color: "#fff" }}>Monthly</button>
                                <button className="px-2 py-1" style={{ color: "#6b7280", backgroundColor: "#fff" }}>Yearly</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setTenure(Math.max(6, tenure - (type === "home" ? 12 : 6)))}
                                className="w-8 h-8 rounded-full border flex items-center justify-center"
                                style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                                <Minus size={13} />
                            </button>
                            <div className="min-w-28 text-center px-3 py-1.5 rounded-lg border text-sm font-semibold"
                                style={{ borderColor: "#d1d5db", color: "#111827" }}>
                                {tenure} mo
                            </div>
                            <button onClick={() => setTenure(Math.min(360, tenure + (type === "home" ? 12 : 6)))}
                                className="w-8 h-8 rounded-full border flex items-center justify-center"
                                style={{ borderColor: "#d1d5db", color: "#6b7280" }}>
                                <Plus size={13} />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative h-1 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                            <div className="absolute top-0 left-0 h-1 rounded-full"
                                style={{ width: `${((tenure - 12) / (360 - 12)) * 100}%`, backgroundColor: "#7a2135" }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 shadow-sm bg-white"
                                style={{ left: `calc(${((tenure - 12) / (360 - 12)) * 100}% - 8px)`, borderColor: "#7a2135" }} />
                        </div>
                        <input type="range" min={12} max={360} step={12} value={tenure}
                            onChange={e => setTenure(parseInt(e.target.value))}
                            className="absolute inset-0 opacity-0 w-full h-4 -top-1.5 cursor-pointer" />
                        <div className="flex justify-between text-xs mt-2" style={{ color: "#9ca3af" }}>
                            <span>12 months</span><span>360 months</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: results */}
            <div className="flex flex-col">
                {/* EMI chip */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: "#f3f4f6" }}>
                    <span className="text-sm font-semibold" style={{ color: "#7a2135" }}>EMI Amount</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ color: "#9ca3af" }}>₹</span>
                        <span className="text-xl font-bold" style={{ color: "#111827" }}>{Math.round(emi).toLocaleString("en-IN")}</span>
                    </div>
                </div>

                {/* Donut chart */}
                <div className="flex items-center justify-center mb-4">
                    <PieChart width={180} height={180}>
                        <Pie data={pieData} cx={90} cy={90} innerRadius={52} outerRadius={80} paddingAngle={3}
                            dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}>
                            {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                        </Pie>
                        <text x={90} y={85} textAnchor="middle" style={{ fontSize: 10, fill: "#9ca3af", fontFamily: "inherit" }}>EMI</text>
                        <text x={90} y={100} textAnchor="middle" style={{ fontSize: 13, fontWeight: 700, fill: "#111827", fontFamily: "inherit" }}>
                            ₹{Math.round(emi).toLocaleString("en-IN")}
                        </text>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </div>

                {/* Breakdown rows */}
                <div className="space-y-3">
                    {[
                        { label: "Principal Amount", value: fmt(principal), dot: "#7a2135" },
                        { label: "Interest Payable", value: fmt(interest), dot: "#e5e7eb" },
                    ].map(row => (
                        <div key={row.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#f3f4f6" }}>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: row.dot }} />
                                <span className="text-sm" style={{ color: "#7a2135" }}>{row.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs" style={{ color: "#9ca3af" }}>₹</span>
                                <span className="text-sm font-semibold" style={{ color: "#111827" }}>{row.value.replace("₹", "")}</span>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-semibold" style={{ color: "#7a2135" }}>Total Amount Payable</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: "#9ca3af" }}>₹</span>
                            <span className="text-sm font-bold" style={{ color: "#111827" }}>{fmt(total).replace("₹", "")}</span>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-center mt-4" style={{ color: "#9ca3af" }}>*All amounts are indicative</p>
            </div>
        </div>
    );
}

function SIPCalc() {
    const [monthly, setMonthly] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const total = calculateSIP(monthly, rate, years);
    const invested = monthly * years * 12;
    const returns = total - invested;

    const chartData = Array.from({ length: years }, (_, i) => ({
        year: i + 1,
        invested: monthly * (i + 1) * 12,
        value: Math.round(calculateSIP(monthly, rate, i + 1)),
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <SliderRow label="Monthly SIP Amount" value={monthly} min={500} max={500000} step={500} prefix="₹" onChange={setMonthly} />
                <SliderRow label="Expected Annual Return" value={rate} min={1} max={30} step={0.5} unit="%" onChange={setRate} />
                <SliderRow label="Investment Period" value={years} min={1} max={40} step={1} unit=" yr" onChange={setYears} />
            </div>
            <div>
                <div className="space-y-3 mb-4">
                    {[
                        { label: "Invested Amount", value: fmt(invested), dot: "#e5e7eb" },
                        { label: "Est. Returns", value: fmt(returns), dot: "#52b788" },
                        { label: "Total Value", value: fmt(total), dot: "#7a2135", bold: true },
                    ].map(row => (
                        <div key={row.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#f3f4f6" }}>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: row.dot }} />
                                <span className="text-sm" style={{ color: "#7a2135" }}>{row.label}</span>
                            </div>
                            <span className={`text-sm ${row.bold ? "font-bold" : "font-semibold"}`} style={{ color: "#111827" }}>{row.value}</span>
                        </div>
                    ))}
                </div>
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="sipGrad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7a2135" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#7a2135" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
                        <Tooltip formatter={(v: unknown) => typeof v === "number" ? fmt(v) : String(v)} contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
                        <Area type="monotone" dataKey="value" stroke="#7a2135" fill="url(#sipGrad2)" strokeWidth={2} name="Portfolio Value" />
                        <Area type="monotone" dataKey="invested" stroke="#9ca3af" fill="none" strokeDasharray="4 3" strokeWidth={1.5} name="Invested" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default function CalculatorsPage() {
    const [tab, setTab] = useState("personal");

    return (
        <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #f5f7f5 0%, #f5f7f5 50%, #f5f7f5 100%)" }}>
            {/* Decorative texture lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="absolute opacity-10"
                        style={{
                            width: "200%",
                            height: "1px",
                            background: "rgba(255,255,255,0.4)",
                            top: `${10 + i * 12}%`,
                            left: "-50%",
                            transform: `rotate(-${8 + i * 2}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-start min-h-screen py-12 px-4">
                {/* Title */}
                <motion.h1 initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white mb-2 text-center">
                    EMI Calculator
                </motion.h1>
                <p className="text-white/60 text-sm mb-8 text-center">Plan your finances with real-time calculations</p>

                {/* Tab pills */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="flex gap-1.5 flex-wrap justify-center mb-8">
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: tab === t.id ? "#7a2135" : "rgba(255,255,255,0.1)",
                                color: tab === t.id ? "#ffffff" : "rgba(255,255,255,0.7)",
                                border: tab === t.id ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
                                backdropFilter: "blur(8px)",
                                boxShadow: tab === t.id ? "0 4px 20px rgba(0,0,0,0.25)" : "none",
                            }}>
                            <span>{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </motion.div>

                {/* Calculator card */}
                <AnimatePresence mode="wait">
                    <motion.div key={tab}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-4xl rounded-2xl p-8"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.97)",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                            backdropFilter: "blur(20px)",
                        }}>
                        {tab === "sip" ? <SIPCalc /> : (
                            <LoanCalc type={tab as "personal" | "home" | "car"} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
