"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Wallet,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DUMMY_ASSETS,
  allocationDonutData,
  categoryBarData,
  portfolioGrowthData,
  sumCurrentValue,
} from "@/lib/portfolio";
import { PageContainer } from "@/components/layout/PageContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { type Goal } from "@/store/goalsSlice";

const balanceData = [
  { day: "Sun", savings: 8, income: 12, expenses: 6 },
  { day: "Mon", savings: 14, income: 20, expenses: 8 },
  { day: "Tue", savings: 10, income: 15, expenses: 11 },
  { day: "Wed", savings: 18, income: 24, expenses: 9 },
  { day: "Thu", savings: 22, income: 28, expenses: 12 },
  { day: "Fri", savings: 16, income: 22, expenses: 14 },
  { day: "Sat", savings: 20, income: 26, expenses: 10 },
];

const spendingCategories = [
  { label: "Housing", pct: 28, color: "#2d6a4f" },
  { label: "Debt payments", pct: 7, color: "#52b788" },
  { label: "Food", pct: 6, color: "#f59e0b" },
  { label: "Transport", pct: 9, color: "#3b82f6" },
  { label: "Healthcare", pct: 10, color: "#8b5cf6" },
  { label: "Investments", pct: 17, color: "#06b6d4" },
  { label: "Other", pct: 23, color: "#e5e7eb" },
];

const transactions = [
  {
    name: "Dividend Payout",
    amount: "+₹1,100",
    date: "12 Feb 2025",
    color: "#dcfce7",
    icon: "↑",
    pos: true,
  },
  {
    name: "Corporate Subscriptions",
    amount: "-₹6,400",
    date: "10 Feb 2025",
    color: "#fee2e2",
    icon: "↓",
    pos: false,
  },
  {
    name: "Investment in ETF",
    amount: "-₹900",
    date: "10 Feb 2025",
    color: "#fee2e2",
    icon: "↓",
    pos: false,
  },
  {
    name: "Consulting Services",
    amount: "+₹4,100",
    date: "8 Feb 2025",
    color: "#dcfce7",
    icon: "↑",
    pos: true,
  },
  {
    name: "Equipment Purchase",
    amount: "-₹1,700",
    date: "7 Feb 2025",
    color: "#fee2e2",
    icon: "↓",
    pos: false,
  },
];


interface StatChipProps {
  label: string;
  val: string;
  change: string;
  up: boolean;
}

function StatChip({ label, val, change, up }: StatChipProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <p className="text-xs font-medium mb-3" style={{ color: "#9ca3af" }}>
        {label}
      </p>
      <p
        className="text-3xl font-bold tracking-tight mb-2"
        style={{ color: "#111827" }}
      >
        {val}
      </p>
      <div className="flex items-center gap-1">
        {up ? (
          <TrendingUp size={13} color="#22c55e" />
        ) : (
          <TrendingDown size={13} color="#ef4444" />
        )}
        <span
          className="text-xs font-medium"
          style={{ color: up ? "#22c55e" : "#ef4444" }}
        >
          {change}
        </span>
        <span className="text-xs" style={{ color: "#9ca3af" }}>
          from last month
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<"1d" | "1w" | "1m">("1w");
  const goals = useSelector((state: RootState) => state.goals.items);
  const totalSpending = 8450;
  const spendingLimit = 10000;
  const healthPct = 68;

  // Portfolio widgets (shared dummy dataset for now; later can be replaced with real data)
  const assets = DUMMY_ASSETS;
  const portfolioTotal = sumCurrentValue(assets);
  const allocation = allocationDonutData(assets);
  const growth = portfolioGrowthData(assets);
  const byCategory = categoryBarData(assets);

  return (
    <PageContainer size="wide" className="py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p
            className="text-xs font-medium mb-0.5"
            style={{ color: "#9ca3af" }}
          >
            Good Evening 👋
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>
            Welcome back
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center border"
            style={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
          >
            <Bell size={16} color="#6b7280" />
          </button>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center border"
            style={{ backgroundColor: "#fff", borderColor: "#e5e7eb" }}
          >
            <Settings size={16} color="#6b7280" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ backgroundColor: "#2d6a4f" }}
          >
            <Plus size={15} /> Add Widget
          </button>
        </div>
      </div>

      {/* 3-col main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 min-w-0">
        {/* ===== COL 1+2: Left+Center ===== */}
        <div className="xl:col-span-2 space-y-4 min-w-0">
          {/* Balance Overview Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Balance overview
                </p>
                <p
                  className="text-4xl font-bold tracking-tight mt-1"
                  style={{ color: "#111827" }}
                >
                  ₹12,450
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex gap-1 rounded-lg p-0.5"
                  style={{ backgroundColor: "#f4f5f7" }}
                >
                  {(["1d", "1w", "1m"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className="px-3 py-1 rounded-md text-xs font-medium transition-all"
                      style={{
                        backgroundColor: period === p ? "#fff" : "transparent",
                        color: period === p ? "#111827" : "#9ca3af",
                        boxShadow:
                          period === p ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div
                  className="flex items-center gap-3 text-xs ml-2"
                  style={{ color: "#9ca3af" }}
                >
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: "#2d6a4f" }}
                    />
                    Savings
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: "#f59e0b" }}
                    />
                    Income
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: "#e5e7eb" }}
                    />
                    Expenses
                  </span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={balanceData} barGap={4} barCategoryGap="35%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 0,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="savings" fill="#2d6a4f" name="Savings" />
                <Bar dataKey="income" fill="#f59e0b" name="Income" />
                <Bar dataKey="expenses" fill="#DC143C" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* 3 stat chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                label: "Total Income",
                val: "₹15,000",
                change: "5.5%",
                up: true,
              },
              {
                label: "Total Expenses",
                val: "₹6,700",
                change: "12.5%",
                up: false,
              },
              {
                label: "Saved Balance",
                val: "₹8,300",
                change: "20.7%",
                up: true,
              },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <StatChip {...s} />
              </motion.div>
            ))}
          </div>

          {/* Bottom 2-col: Spending + Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Monthly spending limit */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#111827" }}
                >
                  Monthly spending limit
                </p>
                <button>
                  <Settings size={14} color="#9ca3af" />
                </button>
              </div>
              <p className="text-xs mb-3" style={{ color: "#9ca3af" }}>
                Retirement account
              </p>
              <div
                className="h-2.5 rounded-full mb-2"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: `${(totalSpending / spendingLimit) * 100}%`,
                    background: "linear-gradient(90deg, #2d6a4f, #52b788)",
                  }}
                />
              </div>
              <div
                className="flex justify-between text-xs"
                style={{ color: "#9ca3af" }}
              >
                <span>₹{totalSpending.toLocaleString("en-IN")}</span>
                <span>₹{spendingLimit.toLocaleString("en-IN")}</span>
              </div>
            </motion.div>

            {/* Financial health gauge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#111827" }}
                  >
                    Financial health
                  </p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    Current status
                  </p>
                </div>
                <select
                  className="text-xs border rounded-lg px-2 py-1"
                  style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                >
                  <option>30d</option>
                </select>
              </div>
              <p
                className="text-2xl font-bold mb-1"
                style={{ color: "#111827" }}
              >
                ₹{(15780).toLocaleString("en-IN")}
              </p>
              <p className="text-xs mb-3" style={{ color: "#22c55e" }}>
                ↑ 17.5% from last month
              </p>
              {/* Gauge */}
              <div className="relative flex items-center justify-center">
                <svg width="100" height="60" viewBox="0 0 100 60">
                  <path
                    d="M 10 55 A 40 40 0 0 1 90 55"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 55 A 40 40 0 0 1 90 55"
                    fill="none"
                    stroke="#2d6a4f"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 * (1 - healthPct / 100)}
                  />
                </svg>
                <div className="absolute bottom-0 text-center">
                  <p className="text-lg font-bold" style={{ color: "#2d6a4f" }}>
                    {healthPct}%
                  </p>
                </div>
              </div>
              <p
                className="text-xs text-center mt-1"
                style={{ color: "#9ca3af" }}
              >
                Of monthly income saved
              </p>
            </motion.div>
          </div>

          {/* Cost Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#111827" }}
                >
                  Cost analysis
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Spending overview
                </p>
              </div>
              <select
                className="text-xs border rounded-lg px-2 py-1"
                style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
              >
                <option>January</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: "#111827" }}
                >
                  ₹8,450
                </p>
                <div className="space-y-2">
                  {spendingCategories.slice(0, 6).map((c) => (
                    <div key={c.label} className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: c.color }}
                      />
                      <span
                        className="text-xs flex-1"
                        style={{ color: "#6b7280" }}
                      >
                        {c.label}
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#111827" }}
                      >
                        {c.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <PieChart width={130} height={130}>
                  <Pie
                    data={spendingCategories.map((c) => ({
                      name: c.label,
                      value: c.pct,
                    }))}
                    cx={65}
                    cy={65}
                    innerRadius={38}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {spendingCategories.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===== COL 3: Right Panel ===== */}
        <div className="space-y-4">
          {/* Portfolio Insights */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#111827" }}
                >
                  Portfolio insights
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Allocation & growth
                </p>
              </div>
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: "#f0faf4", color: "#2d6a4f" }}
              >
                ₹{portfolioTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1️⃣ Asset Allocation Donut */}
              <div className="min-w-0">
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: "#6b7280" }}
                >
                  Asset allocation
                </p>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocation}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={52}
                        outerRadius={72}
                        paddingAngle={2}
                        strokeWidth={0}
                      >
                        {allocation.map((d) => (
                          <Cell key={d.key} fill={d.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: unknown) =>
                          typeof v === "number"
                            ? `₹${v.toLocaleString("en-IN")}`
                            : String(v)
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
                  {allocation.slice(0, 4).map((d) => (
                    <div
                      key={d.key}
                      className="flex items-center gap-2 min-w-0"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: d.color }}
                      />
                      <span
                        className="text-xs truncate"
                        style={{ color: "#6b7280" }}
                      >
                        {d.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2️⃣ Portfolio Growth Chart */}
              <div className="min-w-0">
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: "#6b7280" }}
                >
                  Portfolio growth
                </p>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={growth}
                      margin={{ left: 0, right: 0, top: 6, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="#2d6a4f"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="100%"
                            stopColor="#2d6a4f"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f3f4f6"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                        width={34}
                        tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                      />
                      <Tooltip
                        formatter={(v: unknown) =>
                          typeof v === "number"
                            ? `₹${v.toLocaleString("en-IN")}`
                            : String(v)
                        }
                        contentStyle={{
                          border: "none",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                          fontSize: 12,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#2d6a4f"
                        strokeWidth={2}
                        fill="url(#pg)"
                        dot={false}
                        name="Value"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 3️⃣ Asset Category Bar Chart */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
                  By category
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  value (₹)
                </p>
              </div>
              <div className="h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byCategory} barCategoryGap="35%">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f3f4f6"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      height={44}
                      tickFormatter={(v) =>
                        typeof v === "string" ? v.split(" ")[0] : String(v)
                      }
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      width={34}
                      tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                    />
                    <Tooltip
                      formatter={(v: unknown) =>
                        typeof v === "number"
                          ? `₹${v.toLocaleString("en-IN")}`
                          : String(v)
                      }
                      contentStyle={{
                        border: "none",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {byCategory.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* My Card Widget */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                My card
              </p>
              <button
                className="text-xs flex items-center gap-1"
                style={{ color: "#2d6a4f" }}
              >
                <Plus size={13} /> Add card
              </button>
            </div>
            {/* Card visual */}
            <div
              className="rounded-xl p-4 mb-3 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)",
                minHeight: 110,
              }}
            >
              <div className="absolute top-3 right-3">
                <svg width="40" height="28" viewBox="0 0 40 28">
                  <circle cx="15" cy="14" r="12" fill="rgba(255,255,255,0.3)" />
                  <circle
                    cx="25"
                    cy="14"
                    r="12"
                    fill="rgba(255,255,255,0.15)"
                  />
                </svg>
              </div>
              <p className="text-xs text-white/70 font-medium mb-6">
                Debit card
              </p>
              <p className="text-white font-mono text-sm tracking-widest">
                •••• •••• 7890
              </p>
              <div className="flex justify-between mt-3">
                <p className="text-xs text-white/70">User</p>
                <p className="text-xs text-white/70">03/28</p>
              </div>
            </div>
            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-1 mb-3">
              {["Topup", "Send", "Request", "History"].map((a) => (
                <button
                  key={a}
                  className="flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium transition-colors"
                  style={{ backgroundColor: "#f4f5f7", color: "#6b7280" }}
                >
                  <Wallet size={14} />
                  {a}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Goal Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                Goal tracker
              </p>
              <button
                className="text-xs flex items-center gap-1"
                style={{ color: "#2d6a4f" }}
              >
                <Plus size={13} /> Add goals
              </button>
            </div>
            <p
              className="text-xs font-medium mb-3"
              style={{ color: "#9ca3af" }}
            >
              This year
            </p>
            <div className="space-y-3">
              {goals.map((g) => {
                const pct = (g.currentAmount / g.targetAmount) * 100;
                return (
                  <div key={g.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className="font-medium"
                        style={{ color: "#111827" }}
                      >
                        {g.title}
                      </span>
                      <span style={{ color: "#9ca3af" }}>
                        ₹{g.currentAmount.toLocaleString("en-IN")} / ₹
                        {g.targetAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: "#f3f4f6" }}
                    >
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: "#2d6a4f" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                Transaction history
              </p>
              <select
                className="text-xs border rounded-lg px-2 py-1"
                style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
              >
                <option>7d</option>
              </select>
            </div>
            <div className="space-y-3">
              {transactions.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-medium truncate"
                      style={{ color: "#111827" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>
                      {t.date}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold shrink-0"
                    style={{ color: t.pos ? "#22c55e" : "#ef4444" }}
                  >
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-3 text-xs font-medium py-2 rounded-xl flex items-center justify-center gap-1 transition-colors"
              style={{ backgroundColor: "#f4f5f7", color: "#6b7280" }}
            >
              View all <ChevronRight size={12} />
            </button>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
}
