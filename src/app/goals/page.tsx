"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Target } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { FAB } from "@/components/ui/FAB";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSIP } from "@/lib/calculations";
import { toast } from "sonner";
import { PageContainer } from "@/components/layout/PageContainer";

const goalCategories = [
  { value: "home", label: "Home Purchase" },
  { value: "car", label: "Car Purchase" },
  { value: "education", label: "Education" },
  { value: "retirement", label: "Retirement" },
  { value: "vacation", label: "Vacation" },
  { value: "emergency", label: "Emergency Fund" },
  { value: "wedding", label: "Wedding" },
  { value: "other", label: "Other" },
];

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addGoal, removeGoal, type Goal } from "@/store/goalsSlice";

export default function GoalsPage() {
  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goals.items);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    category: "home",
    title: "",
    targetAmount: "",
    targetDate: "",
    currentAmount: "0",
  });

  // Live goal analysis
  const targetAmt = parseFloat(form.targetAmount) || 0;
  const currentAmt = parseFloat(form.currentAmount) || 0;
  const needed = Math.max(0, targetAmt - currentAmt);
  const monthsLeft = form.targetDate
    ? Math.max(
        0,
        Math.floor(
          (new Date(form.targetDate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24 * 30.4),
        ),
      )
    : 24;
  const monthlyNeeded = monthsLeft > 0 ? needed / monthsLeft : 0;
  const pct = targetAmt > 0 ? Math.min(100, (currentAmt / targetAmt) * 100) : 0;
  const status = pct >= 75 ? "On Track" : pct >= 40 ? "Moderate" : "Risky";
  const statusColor = pct >= 75 ? "#2d6a4f" : pct >= 40 ? "#f4a261" : "#ef4444";

  const handleAdd = () => {
    if (!form.title || !form.targetAmount) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      category: form.category,
      title: form.title,
      targetAmount: targetAmt,
      targetDate: form.targetDate,
      currentAmount: currentAmt,
    };
    dispatch(addGoal(newGoal));
    setShowModal(false);
    setForm({
      category: "home",
      title: "",
      targetAmount: "",
      targetDate: "",
      currentAmount: "0",
    });
    toast.success("Goal created successfully!");
  };

  const formatRupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#f4f7f5" }}>
      {/* Premium Background Visuals */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2d6a4f]/5 rounded-full blur-[100px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f4a261]/5 rounded-full blur-[80px] -ml-40 -mb-40" />

      <PageHeader
        title="My Goals"
        badge={`${goals.length} active`}
        actions={
          <>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#2d6a4f" }}
            >
              <Plus size={14} /> Create Goal
            </button>
            <button
              className="w-9 h-9 rounded-xl border flex items-center justify-center"
              style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
            >
              <Filter size={15} />
            </button>
          </>
        }
      />

      <PageContainer className="py-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
        {goals.length === 0 ? (
          <motion.div variants={fadeUp} custom={0}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "var(--shadow-card)",
                border: "1px solid #e5e7eb",
              }}
            >
              <EmptyState
                icon={Target}
                title="No goals yet"
                subtitle="Set your first financial goal and start your wealth building journey."
                action={
                  <Button
                    onClick={() => setShowModal(true)}
                    style={{ backgroundColor: "#2d6a4f", color: "white" }}
                  >
                    <Plus size={14} className="mr-2" /> Create First Goal
                  </Button>
                }
              />
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {goals.map((goal: Goal, i: number) => {
              const catInfo = goalCategories.find(
                (c) => c.value === goal.category,
              );
              const goalPct =
                goal.targetAmount > 0
                  ? Math.min(
                      100,
                      (goal.currentAmount / goal.targetAmount) * 100,
                    )
                  : 0;
              
              // Timeline logic
              const startDate = new Date().getTime(); // Dummy start
              const targetDate = goal.targetDate ? new Date(goal.targetDate).getTime() : Date.now() + (24 * 30 * 24 * 60 * 60 * 1000);
              const totalTime = targetDate - startDate;
              const timeLeft = Math.max(0, targetDate - Date.now());
              const timePct = totalTime > 0 ? Math.min(100, ((totalTime - timeLeft) / totalTime) * 100) : 0;

              return (
                <motion.div
                  key={goal.id}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl overflow-hidden border border-gray-100"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#2d6a4f]/5 flex items-center justify-center">
                          <Target className="text-[#2d6a4f]" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-500">{catInfo?.label}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-[#2d6a4f]">
                          {goalPct.toFixed(0)}%
                        </p>
                        <button
                          onClick={() => dispatch(removeGoal(goal.id))}
                          className="text-xs font-semibold text-red-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Timeline Component */}
                    <div className="relative pt-2 pb-8">
                      <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goalPct}%` }}
                          className="h-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                      
                      {/* Milestones */}
                      <div className="absolute top-0 w-full flex justify-between px-1">
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-3 bg-gray-300 mt-2.5 rounded-full" />
                          <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Start</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-3 bg-gray-300 mt-2.5 rounded-full" />
                          <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">50%</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-1 h-3 bg-gray-300 mt-2.5 rounded-full" />
                          <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Target</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Status</p>
                        <p className="text-lg font-bold text-gray-900">{formatRupee(goal.currentAmount)}</p>
                        <p className="text-xs text-gray-500">of {formatRupee(goal.targetAmount)} target</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time Horizon</p>
                        <p className="text-lg font-bold text-gray-900">
                          {goal.targetDate ? new Date(goal.targetDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Flexible'}
                        </p>
                        <p className="text-xs text-gray-500">Target Achievement</p>
                      </div>
                      <div className="bg-[#2d6a4f]/5 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-[#2d6a4f] uppercase tracking-widest mb-1">Recommended Saving</p>
                        <p className="text-lg font-black text-[#2d6a4f]">
                          {formatRupee(Math.ceil((goal.targetAmount - goal.currentAmount) / 12))}/mo
                        </p>
                        <p className="text-[10px] text-[#2d6a4f]/60 font-medium">To reach goal in 12 months</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        </motion.div>
      </PageContainer>

      <FAB
        label="Create Goal"
        icon={Plus}
        color="green"
        onClick={() => setShowModal(true)}
      />

      {/* Create Goal Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl w-full bg-[#f4f5f7] border border-gray-200">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-2">
            {/* Left: Form */}
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">
                  Goal Category
                </Label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-0"
                >
                  {goalCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">
                  Goal Title *
                </Label>
                <Input
                  placeholder="e.g. Dream Home"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">
                  Target Amount ₹ *
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.targetAmount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, targetAmount: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">
                  Current Savings ₹
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={form.currentAmount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currentAmount: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">
                  Target Date
                </Label>
                <Input
                  type="date"
                  value={form.targetDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, targetDate: e.target.value }))
                  }
                />
              </div>
              <Button
                onClick={handleAdd}
                className="w-full"
                style={{ backgroundColor: "#2d6a4f", color: "white" }}
              >
                Create Goal
              </Button>
            </div>

            {/* Right: Live Analysis Card */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{
                background: "linear-gradient(135deg, #1a2e23 0%, #2d6a4f 100%)",
              }}
            >
              <p className="text-xs uppercase tracking-widest text-white/60">
                Goal Analysis
              </p>
              <p className="text-3xl font-bold font-mono text-white">
                {formatRupee(targetAmt)}
              </p>
              <div className="flex gap-4 text-xs">
                <div>
                  <p className="text-white/50">Current</p>
                  <p className="text-white font-bold font-mono">
                    {formatRupee(currentAmt)}
                  </p>
                </div>
                <div>
                  <p className="text-white/50">Still Needed</p>
                  <p className="text-white font-bold font-mono">
                    {formatRupee(needed)}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Progress</span>
                  <span>{pct.toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-white/70 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50">Monthly Needed</p>
                  <p className="text-white font-bold font-mono">
                    {formatRupee(monthlyNeeded)}/mo
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: statusColor + "30",
                    color: statusColor === "#2d6a4f" ? "#52b788" : statusColor,
                  }}
                >
                  {status}
                </span>
              </div>
              <div>
                <p className="text-xs text-white/50">Months to Goal</p>
                <p className="text-white font-bold font-mono">
                  {monthsLeft} months
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
