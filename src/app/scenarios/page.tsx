"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Shield,
    TrendingUp,
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer,
    AreaChart, Area, CartesianGrid,
} from "recharts";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PageHeader } from "@/components/ui/PageHeader";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateAvalanchePayoff, calculateSIP } from "@/lib/calculations";
import { PageContainer } from "@/components/layout/PageContainer";

const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

function DebtPayoffTab() {
    const [debt, setDebt] = useState(500000);
    const [rate, setRate] = useState(18);
    const [monthly, setMonthly] = useState(20000);
    const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
    const [result, setResult] = useState<{ months: number; totalInterest: number } | null>(null);

    const handleCalculate = () => {
        const res = calculateAvalanchePayoff(debt, rate, monthly);
        setResult(res);
    };

    const barData = result
        ? Array.from({ length: Math.min(result.months, 12) }, (_, i) => ({
            month: `M${i + 1}`,
            balance: Math.max(0, debt - monthly * (i + 1)),
        }))
        : [];

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                    <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>Debt Details</h3>
                    <div>
                        <div className="flex justify-between mb-2">
                            <Label className="text-sm">Total Debt Amount</Label>
                            <span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(debt)}</span>
                        </div>
                        <Slider value={[debt]} min={10000} max={5000000} step={10000} onValueChange={v => setDebt(v[0])} />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <Label className="text-sm">Annual Interest Rate</Label>
                            <span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>{rate}%</span>
                        </div>
                        <Slider value={[rate]} min={1} max={42} step={0.5} onValueChange={v => setRate(v[0])} />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <Label className="text-sm">Monthly Payment</Label>
                            <span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(monthly)}</span>
                        </div>
                        <Slider value={[monthly]} min={1000} max={200000} step={1000} onValueChange={v => setMonthly(v[0])} />
                    </div>

                    <h3 className="font-semibold pt-2" style={{ color: "#1a1a1a" }}>Payment Strategy</h3>
                    <div className="space-y-2">
                        {[
                            { key: "avalanche", label: "Avalanche Method", sub: "Pay highest interest rate first (saves more money)" },
                            { key: "snowball", label: "Snowball Method", sub: "Pay smallest balance first (quick wins)" },
                        ].map((s) => (
                            <button
                                key={s.key}
                                onClick={() => setStrategy(s.key as "avalanche" | "snowball")}
                                className="w-full text-left p-4 rounded-xl border-2 transition-all"
                                style={{
                                    borderColor: strategy === s.key ? "#2d6a4f" : "#e5e7eb",
                                    backgroundColor: strategy === s.key ? "#d8f3dc" : "transparent",
                                }}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                        style={{ borderColor: strategy === s.key ? "#2d6a4f" : "#d1d5db" }}>
                                        {strategy === s.key && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2d6a4f" }} />}
                                    </div>
                                    <span className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>{s.label}</span>
                                </div>
                                <p className="text-xs ml-6" style={{ color: "#6b7280" }}>{s.sub}</p>
                            </button>
                        ))}
                    </div>
                    <Button onClick={handleCalculate} className="w-full text-white" style={{ backgroundColor: "#2d6a4f" }}>
                        Calculate Payoff Plan
                    </Button>
                </div>

                {result && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>Results</h3>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: "#d8f3dc" }}>
                            <p className="text-xs text-gray-500">Months to Payoff</p>
                            <p className="text-3xl font-bold font-mono" style={{ color: "#2d6a4f" }}>{result.months}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: "#fff3e0" }}>
                            <p className="text-xs text-gray-500">Total Interest Paid</p>
                            <p className="text-2xl font-bold font-mono" style={{ color: "#f4a261" }}>{fmt(result.totalInterest)}</p>
                        </div>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={barData}>
                                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                                <Tooltip formatter={(v: unknown) => typeof v === 'number' ? fmt(v) : String(v)} />
                                <Bar dataKey="balance" radius={[4, 4, 0, 0]}>
                                    {barData.map((_, i) => <Cell key={i} fill={`hsl(${140 + i * 3}, 50%, ${45 + i}%)`} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function EmergencyFundTab() {
    const [expenses, setExpenses] = useState(40000);
    const [coverage, setCoverage] = useState(6);
    const [current, setCurrent] = useState(0);
    const [monthlySaving, setMonthlySaving] = useState(5000);

    const target = expenses * coverage;
    const remaining = Math.max(0, target - current);
    const monthsToGoal = monthlySaving > 0 ? Math.ceil(remaining / monthlySaving) : Infinity;
    const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">
                <div>
                    <div className="flex justify-between mb-2"><Label>Monthly Expenses</Label><span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(expenses)}</span></div>
                    <Slider value={[expenses]} min={5000} max={500000} step={5000} onValueChange={v => setExpenses(v[0])} />
                </div>
                <div>
                    <Label className="text-sm mb-2 block">Coverage Target</Label>
                    <div className="flex gap-2">
                        {[3, 6, 9, 12].map((m) => (
                            <button key={m} onClick={() => setCoverage(m)}
                                className="flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all"
                                style={{ borderColor: coverage === m ? "#2d6a4f" : "#e5e7eb", backgroundColor: coverage === m ? "#d8f3dc" : "transparent", color: coverage === m ? "#2d6a4f" : "#6b7280" }}>
                                {m}mo
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-2"><Label>Current Emergency Fund</Label><span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(current)}</span></div>
                    <Slider value={[current]} min={0} max={target * 1.2 || 600000} step={5000} onValueChange={v => setCurrent(v[0])} />
                </div>
                <div>
                    <div className="flex justify-between mb-2"><Label>Monthly Savings toward Fund</Label><span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(monthlySaving)}</span></div>
                    <Slider value={[monthlySaving]} min={1000} max={100000} step={1000} onValueChange={v => setMonthlySaving(v[0])} />
                </div>
            </div>
            <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#d8f3dc" }}>
                    <p className="text-xs text-gray-500">Target Amount</p>
                    <p className="text-2xl font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(target)}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#e8f4fd" }}>
                    <p className="text-xs text-gray-500">Months to Goal</p>
                    <p className="text-2xl font-bold font-mono" style={{ color: "#3d5af1" }}>{isFinite(monthsToGoal) ? monthsToGoal : "∞"}</p>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-2" style={{ color: "#6b7280" }}>
                        <span>Progress</span><span>{pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                        <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: "#2d6a4f" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InvestmentTab() {
    const [initial, setInitial] = useState(100000);
    const [sip, setSip] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [inflation, setInflation] = useState(6);

    const sipFuture = calculateSIP(sip, rate, years);
    const lumpsumFuture = initial * Math.pow(1 + rate / 100, years);
    const total = sipFuture + lumpsumFuture;
    const realValue = total / Math.pow(1 + inflation / 100, years);
    const wealthMultiplier = total / (initial + sip * years * 12);

    const chartData = Array.from({ length: years }, (_, i) => ({
        year: i + 1,
        nominal: Math.round(calculateSIP(sip, rate, i + 1) + initial * Math.pow(1 + rate / 100, i + 1)),
        real: Math.round((calculateSIP(sip, rate, i + 1) + initial * Math.pow(1 + rate / 100, i + 1)) / Math.pow(1 + inflation / 100, i + 1)),
    }));

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                {[
                    { label: "Initial Investment", val: initial, min: 0, max: 10000000, step: 10000, setter: setInitial },
                    { label: "Monthly SIP", val: sip, min: 500, max: 200000, step: 500, setter: setSip },
                    { label: "Expected Return %", val: rate, min: 1, max: 30, step: 0.5, setter: setRate },
                    { label: "Investment Period (years)", val: years, min: 1, max: 40, step: 1, setter: setYears },
                    { label: "Inflation Rate %", val: inflation, min: 1, max: 15, step: 0.5, setter: setInflation },
                ].map(({ label, val, min, max, step, setter }) => (
                    <div key={label}>
                        <div className="flex justify-between mb-2">
                            <Label className="text-sm">{label}</Label>
                            <span className="text-sm font-bold font-mono" style={{ color: "#2d6a4f" }}>
                                {label.includes("%") || label.includes("years") ? `${val}${label.includes("%") ? "%" : " yr"}` : fmt(val)}
                            </span>
                        </div>
                        <Slider value={[val]} min={min} max={max} step={step} onValueChange={v => setter(v[0])} />
                    </div>
                ))}
            </div>
            <div className="space-y-3">
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#d8f3dc" }}>
                    <p className="text-xs text-gray-500">Future Value (Nominal)</p>
                    <p className="text-2xl font-bold font-mono" style={{ color: "#2d6a4f" }}>{fmt(total)}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#fff3e0" }}>
                    <p className="text-xs text-gray-500">Real Value (Inflation-adjusted)</p>
                    <p className="text-xl font-bold font-mono" style={{ color: "#f4a261" }}>{fmt(realValue)}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: "#e8f4fd" }}>
                    <p className="text-xs text-gray-500">Wealth Multiplier</p>
                    <p className="text-xl font-bold font-mono" style={{ color: "#3d5af1" }}>{wealthMultiplier.toFixed(2)}x</p>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="nomGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2d6a4f" stopOpacity={0.5} />
                                <stop offset="100%" stopColor="#2d6a4f" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
                        <Tooltip formatter={(v: unknown) => typeof v === 'number' ? fmt(v) : String(v)} />
                        <Area type="monotone" dataKey="nominal" fill="url(#nomGrad)" stroke="#2d6a4f" strokeWidth={2} name="Nominal" />
                        <Area type="monotone" dataKey="real" fill="none" stroke="#52b788" strokeDasharray="4 3" strokeWidth={1.5} name="Real" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default function ScenariosPage() {
    const [activeTab, setActiveTab] = useState("debt");

    const tabs = [
        { id: "debt", label: "💳 Debt Payoff", component: <DebtPayoffTab /> },
        { id: "emergency", label: "🛡️ Emergency Fund", component: <EmergencyFundTab /> },
        { id: "investment", label: "📈 Investment", component: <InvestmentTab /> },
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader title="Scenario Analysis" />

            <PageContainer className="py-6">
                <div className="flex gap-2 mb-6 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                            style={{
                                backgroundColor: activeTab === tab.id ? "#2d6a4f" : "#ffffff",
                                color: activeTab === tab.id ? "#ffffff" : "#6b7280",
                                border: `1px solid ${activeTab === tab.id ? "#2d6a4f" : "#e5e7eb"}`,
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-6"
                    style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}
                >
                    {tabs.find(t => t.id === activeTab)?.component}
                </motion.div>
            </PageContainer>
        </div>
    );
}
