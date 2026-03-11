"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Shield,
  TrendingUp,
  TreePalm,
  FlaskConical,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer,
  AreaChart, Area, CartesianGrid, PieChart, Pie,
} from "recharts";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateAvalanchePayoff, calculateSIP } from "@/lib/calculations";
import { PageContainer } from "@/components/layout/PageContainer";

const fmt = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const fmtL = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(1)}Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : fmt(n);

/* ─────────────── DEBT PAYOFF TAB ─────────────── */
function DebtPayoffTab() {
  const [debt, setDebt] = useState(500000);
  const [rate, setRate] = useState(18);
  const [monthly, setMonthly] = useState(20000);
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [result, setResult] = useState<{ months: number; totalInterest: number } | null>(null);

  const handleCalculate = () => setResult(calculateAvalanchePayoff(debt, rate, monthly));

  const barData = result
    ? Array.from({ length: Math.min(result.months, 12) }, (_, i) => ({
        month: `M${i + 1}`,
        balance: Math.max(0, debt - monthly * (i + 1)),
      }))
    : [];

  const DEBT_COLORS = ["#2d6a4f", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h3 className="font-black text-gray-900 text-base">Debt Details</h3>

        {[
          { label: "Total Debt Amount", value: debt, min: 10000, max: 5000000, step: 10000, fmt: fmt, setter: setDebt },
          { label: "Annual Interest Rate", value: rate, min: 1, max: 42, step: 0.5, fmt: (v: number) => `${v}%`, setter: setRate },
          { label: "Monthly Payment", value: monthly, min: 1000, max: 200000, step: 1000, fmt: fmt, setter: setMonthly },
        ].map(({ label, value, min, max, step, fmt: f, setter }) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold text-gray-700">{label}</Label>
              <span className="text-sm font-black text-[#2d6a4f] font-mono">{f(value)}</span>
            </div>
            <Slider value={[value]} min={min} max={max} step={step} onValueChange={v => setter(v[0])} />
          </div>
        ))}

        <h3 className="font-black text-gray-900 text-base pt-2">Payment Strategy</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "avalanche", label: "Avalanche", sub: "Highest interest first — saves more" },
            { key: "snowball", label: "Snowball", sub: "Smallest balance first — quick wins" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setStrategy(s.key as "avalanche" | "snowball")}
              className="text-left p-4 rounded-2xl border-2 transition-all"
              style={{
                borderColor: strategy === s.key ? "#2d6a4f" : "#e5e7eb",
                backgroundColor: strategy === s.key ? "#f0fdf4" : "transparent",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: strategy === s.key ? "#2d6a4f" : "#d1d5db" }}>
                  {strategy === s.key && <div className="w-2 h-2 rounded-full bg-[#2d6a4f]" />}
                </div>
                <span className="text-sm font-bold text-gray-900">{s.label}</span>
              </div>
              <p className="text-xs text-gray-500 ml-6">{s.sub}</p>
            </button>
          ))}
        </div>
        <Button onClick={handleCalculate} className="w-full text-white font-bold" style={{ backgroundColor: "#2d6a4f" }}>
          Calculate Payoff Plan
        </Button>
      </div>

      <div>
        {result ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h3 className="font-black text-gray-900 text-base">Results</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0]">
                <p className="text-xs text-gray-500 font-semibold mb-1">Months to Payoff</p>
                <p className="text-4xl font-black text-[#2d6a4f] font-mono">{result.months}</p>
                <p className="text-xs text-gray-400 mt-1">{(result.months / 12).toFixed(1)} years</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="text-xs text-gray-500 font-semibold mb-1">Total Interest</p>
                <p className="text-2xl font-black text-amber-600 font-mono">{fmtL(result.totalInterest)}</p>
                <p className="text-xs text-gray-400 mt-1">on top of principal</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Balance Over Time (first 12 months)</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: unknown) => typeof v === "number" ? fmt(v) : String(v)} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                  <Bar dataKey="balance" radius={[6, 6, 0, 0]}>
                    {barData.map((_, i) => <Cell key={i} fill={`hsl(${140 + i * 3}, 50%, ${45 + i}%)`} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-[#f0fdf4] flex items-center justify-center mb-4">
              <CreditCard size={28} className="text-[#2d6a4f]" />
            </div>
            <p className="text-gray-400 text-sm font-semibold">Enter your debt details and click Calculate to see your payoff plan.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── EMERGENCY FUND TAB ─────────────── */
function EmergencyFundTab() {
  const [expenses, setExpenses] = useState(40000);
  const [coverage, setCoverage] = useState(6);
  const [current, setCurrent] = useState(80000);
  const [monthlySaving, setMonthlySaving] = useState(10000);

  const target = expenses * coverage;
  const remaining = Math.max(0, target - current);
  const monthsToGoal = monthlySaving > 0 ? Math.ceil(remaining / monthlySaving) : Infinity;
  const pct = target > 0 ? Math.min(100, (current / target) * 100) : 0;

  const pieData = [
    { name: "Saved", value: Math.min(current, target), fill: "#2d6a4f" },
    { name: "Remaining", value: Math.max(0, target - current), fill: "#e5e7eb" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        {[
          { label: "Monthly Expenses", value: expenses, min: 5000, max: 500000, step: 5000, setter: setExpenses, show: fmt(expenses) },
          { label: "Monthly Savings toward Fund", value: monthlySaving, min: 1000, max: 100000, step: 1000, setter: setMonthlySaving, show: fmt(monthlySaving) },
          { label: "Current Emergency Fund", value: current, min: 0, max: target * 1.2 || 600000, step: 5000, setter: setCurrent, show: fmt(current) },
        ].map(({ label, value, min, max, step, setter, show }) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold text-gray-700">{label}</Label>
              <span className="text-sm font-black text-[#2d6a4f] font-mono">{show}</span>
            </div>
            <Slider value={[value]} min={min} max={max} step={step} onValueChange={v => setter(v[0])} />
          </div>
        ))}

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-2 block">Coverage Target (months)</Label>
          <div className="flex gap-2">
            {[3, 6, 9, 12].map((m) => (
              <button key={m} onClick={() => setCoverage(m)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all"
                style={{
                  borderColor: coverage === m ? "#2d6a4f" : "#e5e7eb",
                  backgroundColor: coverage === m ? "#f0fdf4" : "transparent",
                  color: coverage === m ? "#2d6a4f" : "#6b7280",
                }}>
                {m} mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative" style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-[#2d6a4f]">{pct.toFixed(0)}%</span>
            <span className="text-xs text-gray-400 font-semibold">Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-green-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Target Fund</p>
            <p className="text-xl font-black text-[#2d6a4f] font-mono">{fmtL(target)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Months to Goal</p>
            <p className="text-xl font-black text-blue-600 font-mono">{isFinite(monthsToGoal) ? monthsToGoal : "∞"}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
          <div className="flex justify-between text-xs mb-2 text-gray-500 font-semibold">
            <span>{fmtL(current)} saved</span><span>{fmtL(target)} target</span>
          </div>
          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-3 rounded-full bg-[#2d6a4f] transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">{fmtL(remaining)} remaining</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── INVESTMENT TAB ─────────────── */
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
  const totalInvested = initial + sip * years * 12;
  const wealthMultiplier = total / totalInvested;
  const returns = total - totalInvested;

  const chartData = Array.from({ length: years }, (_, i) => ({
    year: `Y${i + 1}`,
    nominal: Math.round(calculateSIP(sip, rate, i + 1) + initial * Math.pow(1 + rate / 100, i + 1)),
    real: Math.round((calculateSIP(sip, rate, i + 1) + initial * Math.pow(1 + rate / 100, i + 1)) / Math.pow(1 + inflation / 100, i + 1)),
  }));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        {[
          { label: "Initial Investment", val: initial, min: 0, max: 10000000, step: 10000, show: fmtL(initial), setter: setInitial },
          { label: "Monthly SIP", val: sip, min: 500, max: 200000, step: 500, show: fmt(sip), setter: setSip },
          { label: "Expected Return", val: rate, min: 1, max: 30, step: 0.5, show: `${rate}%`, setter: setRate },
          { label: "Investment Period", val: years, min: 1, max: 40, step: 1, show: `${years} yr`, setter: setYears },
          { label: "Inflation Rate", val: inflation, min: 1, max: 15, step: 0.5, show: `${inflation}%`, setter: setInflation },
        ].map(({ label, val, min, max, step, show, setter }) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold text-gray-700">{label}</Label>
              <span className="text-sm font-black text-[#2d6a4f] font-mono">{show}</span>
            </div>
            <Slider value={[val]} min={min} max={max} step={step} onValueChange={v => setter(v[0])} />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-green-100 col-span-2">
            <p className="text-xs text-gray-500 font-semibold mb-1">Future Value (Nominal)</p>
            <p className="text-3xl font-black text-[#2d6a4f] font-mono">{fmtL(total)}</p>
            <p className="text-xs text-gray-400 mt-1">Returns: {fmtL(returns)} · {wealthMultiplier.toFixed(2)}x multiplier</p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Real Value</p>
            <p className="text-lg font-black text-amber-600 font-mono">{fmtL(realValue)}</p>
            <p className="text-[10px] text-gray-400">Inflation-adjusted</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Total Invested</p>
            <p className="text-lg font-black text-gray-700 font-mono">{fmtL(totalInvested)}</p>
            <p className="text-[10px] text-gray-400">Principal amount</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="nomGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d6a4f" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: unknown) => typeof v === "number" ? fmtL(v) : String(v)} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }} />
              <Area type="monotone" dataKey="nominal" fill="url(#nomGrad2)" stroke="#2d6a4f" strokeWidth={2.5} name="Nominal" dot={false} />
              <Area type="monotone" dataKey="real" fill="none" stroke="#52b788" strokeDasharray="5 3" strokeWidth={1.5} name="Real" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── RETIRE EARLY TAB ─────────────── */
function RetireEarlyTab() {
  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(45);
  const [monthlyExpenses, setMonthlyExpenses] = useState(80000);
  const [currentSavings, setCurrentSavings] = useState(2000000);
  const [monthlySip, setMonthlySip] = useState(40000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [safeWithdrawal, setSafeWithdrawal] = useState(4);

  const yearsToRetire = retireAge - currentAge;
  const corpusNeeded = (monthlyExpenses * 12 * 100) / safeWithdrawal;
  const sipFuture = yearsToRetire > 0 ? calculateSIP(monthlySip, expectedReturn, yearsToRetire) : 0;
  const savingsGrown = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetire);
  const projectedCorpus = sipFuture + savingsGrown;
  const shortfall = Math.max(0, corpusNeeded - projectedCorpus);
  const isAchievable = projectedCorpus >= corpusNeeded;

  const chartData = Array.from({ length: Math.max(1, yearsToRetire) }, (_, i) => ({
    year: `${currentAge + i + 1}`,
    corpus: Math.round(calculateSIP(monthlySip, expectedReturn, i + 1) + currentSavings * Math.pow(1 + expectedReturn / 100, i + 1)),
    needed: Math.round(corpusNeeded),
  }));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold text-gray-700">Current Age</Label>
              <span className="text-sm font-black text-[#2d6a4f]">{currentAge}</span>
            </div>
            <Slider value={[currentAge]} min={18} max={55} step={1} onValueChange={v => setCurrentAge(v[0])} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold text-gray-700">Retire At</Label>
              <span className="text-sm font-black text-[#2d6a4f]">{retireAge}</span>
            </div>
            <Slider value={[retireAge]} min={currentAge + 1} max={70} step={1} onValueChange={v => setRetireAge(v[0])} />
          </div>
        </div>

        {[
          { label: "Monthly Expenses (at retirement)", value: monthlyExpenses, min: 10000, max: 500000, step: 5000, show: fmt(monthlyExpenses), setter: setMonthlyExpenses },
          { label: "Current Savings / Investments", value: currentSavings, min: 0, max: 50000000, step: 100000, show: fmtL(currentSavings), setter: setCurrentSavings },
          { label: "Monthly SIP", value: monthlySip, min: 1000, max: 300000, step: 1000, show: fmt(monthlySip), setter: setMonthlySip },
          { label: "Expected Return", value: expectedReturn, min: 6, max: 20, step: 0.5, show: `${expectedReturn}%`, setter: setExpectedReturn },
          { label: "Safe Withdrawal Rate", value: safeWithdrawal, min: 2, max: 6, step: 0.5, show: `${safeWithdrawal}%`, setter: setSafeWithdrawal },
        ].map(({ label, value, min, max, step, show, setter }) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold text-gray-700">{label}</Label>
              <span className="text-sm font-black text-[#2d6a4f] font-mono">{show}</span>
            </div>
            <Slider value={[value]} min={min} max={max} step={step} onValueChange={v => setter(v[0])} />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className={`p-5 rounded-2xl border-2 ${isAchievable ? "bg-[#f0fdf4] border-green-300" : "bg-red-50 border-red-200"}`}>
          <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: isAchievable ? "#2d6a4f" : "#dc2626" }}>
            {isAchievable ? "Goal Achievable!" : "Shortfall Warning"}
          </p>
          <p className="text-3xl font-black font-mono" style={{ color: isAchievable ? "#2d6a4f" : "#dc2626" }}>
            {fmtL(projectedCorpus)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {isAchievable ? `Surplus of ${fmtL(projectedCorpus - corpusNeeded)}` : `Shortfall of ${fmtL(shortfall)}`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Corpus Needed</p>
            <p className="text-xl font-black text-gray-800 font-mono">{fmtL(corpusNeeded)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-gray-500 font-semibold mb-1">Years to Retire</p>
            <p className="text-xl font-black text-blue-600 font-mono">{yearsToRetire} yrs</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Corpus Growth vs Target</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d6a4f" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} interval={Math.floor(yearsToRetire / 5)} />
              <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `₹${(v / 10000000).toFixed(1)}Cr`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: unknown) => typeof v === "number" ? fmtL(v) : String(v)} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "12px" }} />
              <Area type="monotone" dataKey="corpus" fill="url(#corpusGrad)" stroke="#2d6a4f" strokeWidth={2.5} name="Projected" dot={false} />
              <Area type="monotone" dataKey="needed" fill="none" stroke="#ef4444" strokeDasharray="5 3" strokeWidth={1.5} name="Target" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
const TABS = [
  { id: "debt", label: "Debt Payoff", Icon: CreditCard, component: <DebtPayoffTab /> },
  { id: "emergency", label: "Emergency Fund", Icon: Shield, component: <EmergencyFundTab /> },
  { id: "investment", label: "Investment Planner", Icon: TrendingUp, component: <InvestmentTab /> },
  { id: "retire", label: "Retire Early", Icon: TreePalm, component: <RetireEarlyTab /> },
];

export default function ScenariosPage() {
  const [activeTab, setActiveTab] = useState("debt");
  const active = TABS.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <PageContainer size="wide" className="py-8 pb-12">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#2d6a4f] flex items-center justify-center">
              <FlaskConical size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Scenario Analysis</h1>
              <p className="text-sm text-gray-400">Run what-if simulations to plan your financial future</p>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border"
                style={{
                  backgroundColor: isActive ? "#2d6a4f" : "#ffffff",
                  color: isActive ? "#ffffff" : "#6b7280",
                  borderColor: isActive ? "#2d6a4f" : "#e5e7eb",
                }}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          {active?.component}
        </motion.div>
      </PageContainer>
    </div>
  );
}
