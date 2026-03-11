"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Target, ChevronRight, TrendingUp, AlertTriangle, CheckCircle, Clock, Home, Car, GraduationCap, TreePalm, Plane, Shield, Heart } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageContainer } from "@/components/layout/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addGoal, removeGoal, type Goal } from "@/store/goalsSlice";
import { toast } from "sonner";

const goalCategories: { value: string; label: string; icon: React.ElementType; color: string }[] = [
  { value: "home", label: "Home", icon: Home, color: "#3b82f6" },
  { value: "car", label: "Vehicle", icon: Car, color: "#f59e0b" },
  { value: "education", label: "Education", icon: GraduationCap, color: "#8b5cf6" },
  { value: "retirement", label: "Retirement", icon: TreePalm, color: "#2d6a4f" },
  { value: "vacation", label: "Vacation", icon: Plane, color: "#06b6d4" },
  { value: "emergency", label: "Emergency", icon: Shield, color: "#ef4444" },
  { value: "wedding", label: "Wedding", icon: Heart, color: "#ec4899" },
  { value: "other", label: "Other", icon: Target, color: "#6b7280" },
];

type GoalStatus = "On Track" | "Possible" | "At Risk" | "Behind";

function getGoalStatus(pct: number, monthsLeft: number): GoalStatus {
  if (pct >= 70) return "On Track";
  if (pct >= 40) return "Possible";
  if (pct >= 15 && monthsLeft > 3) return "At Risk";
  return "Behind";
}

const STATUS_CONFIG: Record<GoalStatus, { color: string; bg: string; border: string; icon: React.ElementType; label: string }> = {
  "On Track": { color: "#2d6a4f", bg: "#f0fdf4", border: "#bbf7d0", icon: CheckCircle, label: "On Track" },
  "Possible": { color: "#d97706", bg: "#fffbeb", border: "#fde68a", icon: TrendingUp, label: "Possible" },
  "At Risk": { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: AlertTriangle, label: "At Risk" },
  "Behind": { color: "#7c3aed", bg: "#faf5ff", border: "#e9d5ff", icon: Clock, label: "Behind" },
};

const formatRupee = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

type FilterType = "All" | GoalStatus;

export default function GoalsPage() {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goals.items);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [form, setForm] = useState({
    category: "home",
    title: "",
    targetAmount: "",
    targetDate: "",
    currentAmount: "0",
    monthlyContribution: "0",
  });

  // Enrich goals with computed fields
  const enrichedGoals = useMemo(() => {
    return goals.map((g: Goal) => {
      const pct = g.targetAmount > 0 ? Math.min(100, (g.currentAmount / g.targetAmount) * 100) : 0;
      const monthsLeft = g.targetDate
        ? Math.max(0, Math.floor((new Date(g.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30.4)))
        : 24;
      const gapToGoal = Math.max(0, g.targetAmount - g.currentAmount);
      const monthlySIPReq = monthsLeft > 0 ? Math.ceil(gapToGoal / monthsLeft) : 0;
      const status = getGoalStatus(pct, monthsLeft);
      const catInfo = goalCategories.find(c => c.value === g.category);
      return { ...g, pct, monthsLeft, gapToGoal, monthlySIPReq, status, catInfo };
    });
  }, [goals]);

  // Summary counts
  const counts = useMemo(() => ({
    total: enrichedGoals.length,
    onTrack: enrichedGoals.filter(g => g.status === "On Track").length,
    possible: enrichedGoals.filter(g => g.status === "Possible").length,
    atRisk: enrichedGoals.filter(g => g.status === "At Risk").length,
    behind: enrichedGoals.filter(g => g.status === "Behind").length,
  }), [enrichedGoals]);

  const netSaved = goals.reduce((s: number, g: Goal) => s + g.currentAmount, 0);
  const totalTarget = goals.reduce((s: number, g: Goal) => s + g.targetAmount, 0);
  const totalSIPReq = enrichedGoals.reduce((s, g) => s + g.monthlySIPReq, 0);

  const filteredGoals = activeFilter === "All" ? enrichedGoals : enrichedGoals.filter(g => g.status === activeFilter);

  // Donut chart data
  const donutData = [
    { name: "On Track", value: Math.max(enrichedGoals.filter(g => g.status === "On Track").reduce((s, g) => s + g.currentAmount, 0), 0), fill: "#2d6a4f" },
    { name: "Possible", value: Math.max(enrichedGoals.filter(g => g.status === "Possible").reduce((s, g) => s + g.currentAmount, 0), 0), fill: "#f59e0b" },
    { name: "At Risk", value: Math.max(enrichedGoals.filter(g => g.status === "At Risk").reduce((s, g) => s + g.currentAmount, 0), 0), fill: "#ef4444" },
    { name: "Remaining", value: Math.max(totalTarget - netSaved, 0), fill: "#e5e7eb" },
  ].filter(d => d.value > 0);

  const overallPct = totalTarget > 0 ? Math.round((netSaved / totalTarget) * 100) : 0;

  const handleAdd = () => {
    if (!form.title || !form.targetAmount) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      category: form.category,
      title: form.title,
      targetAmount: parseFloat(form.targetAmount),
      targetDate: form.targetDate,
      currentAmount: parseFloat(form.currentAmount) || 0,
    };
    dispatch(addGoal(newGoal));
    setShowModal(false);
    setForm({ category: "home", title: "", targetAmount: "", targetDate: "", currentAmount: "0", monthlyContribution: "0" });
    toast.success("Goal created successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <PageContainer size="wide" className="py-8 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Goals</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              {goals.length} active goals · {formatRupee(netSaved)} saved of {formatRupee(totalTarget)} total target
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-[#2d6a4f] hover:bg-[#245c43] transition-colors shadow-lg shadow-[#2d6a4f]/20"
          >
            <Plus size={16} /> Create Goal
          </button>
        </div>

        {/* TOP STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Net Saved", value: formatRupee(netSaved), icon: "💰", accent: "#2d6a4f", bg: "#f0fdf4" },
            { label: "On Track", value: counts.onTrack.toString(), sub: "Goals healthy", icon: "✅", accent: "#2d6a4f", bg: "#f0fdf4" },
            { label: "Possible", value: counts.possible.toString(), sub: "Needs small push", icon: "⚡", accent: "#d97706", bg: "#fffbeb" },
            { label: "At Risk", value: counts.atRisk.toString(), sub: enrichedGoals.find(g => g.status === "At Risk")?.title || "—", icon: "⚠️", accent: "#dc2626", bg: "#fef2f2" },
            { label: "Total Target", value: formatRupee(totalTarget), sub: `${goals.length} goals combined`, icon: "🎯", accent: "#7c3aed", bg: "#faf5ff" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-1"
              style={{ backgroundColor: stat.bg }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="text-2xl font-black" style={{ color: stat.accent }}>{stat.value}</p>
              {stat.sub && <p className="text-[10px] text-gray-500 font-medium truncate">{stat.sub}</p>}
            </motion.div>
          ))}
        </div>

        {/* 3-COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* LEFT COLUMN: Filter + Donut */}
          <div className="lg:w-[220px] shrink-0 space-y-4">
            {/* Status Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Filter by Status</p>
              <div className="flex flex-col gap-1">
                {([
                  { key: "All", label: "All Goals", count: counts.total, color: "#6b7280" },
                  { key: "On Track", label: "On Track", count: counts.onTrack, color: "#2d6a4f" },
                  { key: "Possible", label: "Possible", count: counts.possible, color: "#d97706" },
                  { key: "At Risk", label: "At Risk", count: counts.atRisk, color: "#dc2626" },
                  { key: "Behind", label: "Behind", count: counts.behind, color: "#7c3aed" },
                ] as Array<{key: FilterType, label: string, count: number, color: string}>).map(({ key, label, count, color }) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: activeFilter === key ? `${color}10` : "transparent",
                      color: activeFilter === key ? color : "#6b7280",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {key !== "All" && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />}
                      <span>{label}</span>
                    </div>
                    <span className="text-xs font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: activeFilter === key ? `${color}20` : "#f7f7f7", color }}>{count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Overall Progress Donut */}
            {goals.length > 0 && (
              <div className="bg-gradient-to-br from-[#1a2e23] to-[#2d6a4f] rounded-2xl p-5 text-white">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-3">Overall Progress</p>
                <p className="text-xs text-white/70 mb-2">{formatRupee(netSaved)} saved of {formatRupee(totalTarget)}</p>

                <div className="relative my-3" style={{ height: 140 }}>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={60}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {donutData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: unknown) => typeof v === "number" ? formatRupee(v) : String(v)} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-white">{overallPct}%</span>
                    <span className="text-[10px] text-white/60">Complete</span>
                  </div>
                </div>

                <div className="space-y-1.5 mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2d6a4f] inline-block"/>On Track</span>
                    <span className="font-bold">{counts.onTrack}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f59e0b] inline-block"/>Possible</span>
                    <span className="font-bold">{counts.possible}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ef4444] inline-block"/>At Risk</span>
                    <span className="font-bold">{counts.atRisk}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1 border-t border-white/10">
                    <span className="text-white/60">Remaining</span>
                    <span className="font-bold">{formatRupee(Math.max(0, totalTarget - netSaved))}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CENTER: Goal Cards */}
          <div className="flex-1 min-w-0 space-y-4">
            {filteredGoals.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
                <Target className="mx-auto text-gray-200 mb-4" size={56} />
                <p className="text-xl font-black text-gray-900 mb-2">
                  {activeFilter === "All" ? "No goals yet" : `No ${activeFilter} goals`}
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  {activeFilter === "All" ? "Set your first financial goal and start your wealth journey." : `All your goals are on a different track.`}
                </p>
                {activeFilter === "All" && (
                  <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-[#2d6a4f]">
                    <Plus size={15} /> Create First Goal
                  </button>
                )}
              </div>
            ) : (
              filteredGoals.map((goal, i) => {
                const statusCfg = STATUS_CONFIG[goal.status];
                const StatusIcon = statusCfg.icon;
                const isOnTrack = goal.status === "On Track";
                const tip = isOnTrack
                  ? `✓ At this pace you'll hit your goal ${Math.ceil(goal.monthsLeft * 0.1)} months early.`
                  : goal.status === "At Risk"
                  ? `⚠ Needs ₹${goal.monthlySIPReq.toLocaleString("en-IN")}/mo. Consider revising target date.`
                  : null;

                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Goal Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: goal.catInfo?.color ? `${goal.catInfo.color}22` : "#f0fdf4" }}>
                            {goal.catInfo && (() => { const Icon = goal.catInfo.icon; return <Icon size={22} style={{ color: goal.catInfo.color ?? "#2d6a4f" }} />; })()}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-gray-900">{goal.title}</h3>
                            <p className="text-sm text-gray-400">{goal.catInfo?.label}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full border" style={{ color: statusCfg.color, backgroundColor: statusCfg.bg, borderColor: statusCfg.border }}>
                            <StatusIcon size={11} />
                            {statusCfg.label}
                          </span>
                          <button onClick={() => dispatch(removeGoal(goal.id))} className="text-xs font-bold text-gray-300 hover:text-red-400 transition-colors px-2 py-1 rounded-lg hover:bg-red-50">
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Amount + Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-black" style={{ color: statusCfg.color }}>{formatRupee(goal.currentAmount)}</span>
                          <span className="text-sm text-gray-400">/ {formatRupee(goal.targetAmount)}</span>
                          <span className="text-lg font-black text-gray-500">{goal.pct.toFixed(0)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.pct}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: statusCfg.color }}
                          />
                        </div>
                      </div>

                      {/* 4-metric row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-50">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Target Date</p>
                          <p className="text-sm font-bold text-gray-800">
                            {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Flexible"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Monthly SIP</p>
                          <p className="text-sm font-bold" style={{ color: statusCfg.color }}>
                            {formatRupee(goal.monthlySIPReq)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Time Left</p>
                          <p className="text-sm font-bold text-gray-800">{goal.monthsLeft} months</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Gap to Goal</p>
                          <p className="text-sm font-bold text-gray-800">{formatRupee(goal.gapToGoal)}</p>
                        </div>
                      </div>

                      {/* Smart tip */}
                      {tip && (
                        <div className="mt-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: isOnTrack ? "#f0fdf4" : "#fffbeb", color: isOnTrack ? "#2d6a4f" : "#d97706", borderLeft: `3px solid ${isOnTrack ? "#2d6a4f" : "#f59e0b"}` }}>
                          {tip}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: Recommended SIPs */}
          {goals.length > 0 && (
            <div className="lg:w-[240px] shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-6">
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">Recommended SIPs</p>
                <p className="text-[10px] text-gray-400 mb-4">Monthly contributions per goal</p>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500">Total Suggested / Month</span>
                  <span className="text-base font-black text-[#2d6a4f]">{formatRupee(totalSIPReq)}</span>
                </div>

                <div className="space-y-4">
                  {enrichedGoals.map((goal) => {
                    const statusCfg = STATUS_CONFIG[goal.status];
                    return (
                      <div key={goal.id} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: (goal.catInfo?.color ?? "#2d6a4f") + "22" }}>
                              {goal.catInfo && (() => { const Icon = goal.catInfo.icon; return <Icon size={12} style={{ color: goal.catInfo.color ?? "#2d6a4f" }} />; })()}
                            </div>
                            <span className="text-xs font-semibold text-gray-700 truncate">{goal.title}</span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}>
                            {statusCfg.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] text-gray-400">Current SIP: {formatRupee(goal.monthlySIPReq * 0.6)}</span>
                          <span className="text-xs font-black" style={{ color: statusCfg.color }}>{formatRupee(goal.monthlySIPReq)}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${goal.pct}%`, backgroundColor: statusCfg.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setShowModal(true)} className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-[#2d6a4f] hover:bg-[#245c43] transition-colors">
                  <Plus size={14} /> Create New Goal
                </button>
              </div>
            </div>
          )}
        </div>
      </PageContainer>

      {/* Create Goal Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl w-full border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-gray-900">Create New Goal</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2 block">Category</Label>
                <div className="grid grid-cols-4 gap-2">
                  {goalCategories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setForm(f => ({ ...f, category: cat.value }))}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all text-center"
                      style={{
                        borderColor: form.category === cat.value ? "#2d6a4f" : "#e5e7eb",
                        backgroundColor: form.category === cat.value ? "#f0fdf4" : "transparent",
                      }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-1" style={{ backgroundColor: (cat.color ?? "#2d6a4f") + "22" }}>
                        {(() => { const Icon = cat.icon; return <Icon size={18} style={{ color: cat.color }} />; })()}
                      </div>
                      <span className="text-[9px] font-semibold text-gray-500 leading-tight">{cat.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1 block">Goal Title *</Label>
                <Input placeholder="e.g. Dream Home" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1 block">Target ₹ *</Label>
                  <Input type="number" placeholder="0" value={form.targetAmount} onChange={e => setForm(f => ({ ...f, targetAmount: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1 block">Current Savings ₹</Label>
                  <Input type="number" placeholder="0" value={form.currentAmount} onChange={e => setForm(f => ({ ...f, currentAmount: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1 block">Target Date</Label>
                <Input type="date" value={form.targetDate} onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))} />
              </div>
              <Button onClick={handleAdd} className="w-full font-bold" style={{ backgroundColor: "#2d6a4f", color: "white" }}>
                Create Goal
              </Button>
            </div>

            {/* Live Analysis */}
            <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: "linear-gradient(135deg, #1a2e23 0%, #2d6a4f 100%)" }}>
              <p className="text-xs uppercase tracking-widest text-white/60">Goal Analysis</p>
              <p className="text-3xl font-black font-mono text-white">
                ₹{(parseFloat(form.targetAmount) || 0).toLocaleString("en-IN")}
              </p>
              <div className="flex gap-4 text-xs">
                <div>
                  <p className="text-white/50">Current</p>
                  <p className="text-white font-bold font-mono">₹{(parseFloat(form.currentAmount) || 0).toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-white/50">Gap</p>
                  <p className="text-white font-bold font-mono">
                    ₹{Math.max(0, (parseFloat(form.targetAmount) || 0) - (parseFloat(form.currentAmount) || 0)).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Progress</span>
                  <span>
                    {(parseFloat(form.targetAmount) || 0) > 0
                      ? Math.min(100, ((parseFloat(form.currentAmount) || 0) / parseFloat(form.targetAmount)) * 100).toFixed(0)
                      : 0}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-white/70 transition-all"
                    style={{
                      width: `${(parseFloat(form.targetAmount) || 0) > 0
                        ? Math.min(100, ((parseFloat(form.currentAmount) || 0) / parseFloat(form.targetAmount)) * 100)
                        : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
