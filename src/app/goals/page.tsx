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

const goalCategories = [
    { value: "home", label: "🏠 Home Purchase" },
    { value: "car", label: "🚗 Car Purchase" },
    { value: "education", label: "🎓 Education" },
    { value: "retirement", label: "👴 Retirement" },
    { value: "vacation", label: "✈️ Vacation" },
    { value: "emergency", label: "🛡️ Emergency Fund" },
    { value: "wedding", label: "💍 Wedding" },
    { value: "other", label: "🎯 Other" },
];

interface Goal {
    id: string;
    category: string;
    title: string;
    targetAmount: number;
    targetDate: string;
    currentAmount: number;
}

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
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
        ? Math.max(0, Math.floor((new Date(form.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30.4)))
        : 24;
    const monthlyNeeded = monthsLeft > 0 ? needed / monthsLeft : 0;
    const pct = targetAmt > 0 ? Math.min(100, (currentAmt / targetAmt) * 100) : 0;
    const status = pct >= 75 ? "On Track" : pct >= 40 ? "Moderate" : "Risky";
    const statusColor = pct >= 75 ? "#2d6a4f" : pct >= 40 ? "#f4a261" : "#ef4444";

    const handleAdd = () => {
        if (!form.title || !form.targetAmount) return;
        setGoals(prev => [...prev, {
            id: Date.now().toString(),
            category: form.category,
            title: form.title,
            targetAmount: targetAmt,
            targetDate: form.targetDate,
            currentAmount: currentAmt,
        }]);
        setShowModal(false);
        setForm({ category: "home", title: "", targetAmount: "", targetDate: "", currentAmount: "0" });
        toast.success("Goal created successfully!");
    };

    const formatRupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader
                title="My Goals"
                badge={`${goals.length} active`}
                actions={
                    <>
                        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#2d6a4f" }}>
                            <Plus size={14} /> Create Goal
                        </button>
                        <button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ borderColor: "#e5e7eb", color: "#6b7280" }}>
                            <Filter size={15} />
                        </button>
                    </>
                }
            />

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="px-4 lg:px-8 py-6 max-w-5xl">
                {goals.length === 0 ? (
                    <motion.div variants={fadeUp} custom={0}>
                        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                            <EmptyState
                                icon={Target}
                                title="No goals yet"
                                subtitle="Set your first financial goal and start your wealth building journey."
                                action={
                                    <Button onClick={() => setShowModal(true)} style={{ backgroundColor: "#2d6a4f", color: "white" }}>
                                        <Plus size={14} className="mr-2" /> Create First Goal
                                    </Button>
                                }
                            />
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {goals.map((goal, i) => {
                            const catInfo = goalCategories.find(c => c.value === goal.category);
                            const pct = goal.targetAmount > 0 ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100) : 0;
                            return (
                                <motion.div
                                    key={goal.id}
                                    variants={fadeUp}
                                    custom={i}
                                    className="rounded-2xl p-5"
                                    style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-lg font-bold" style={{ color: "#1a1a1a" }}>{goal.title}</p>
                                            <span className="text-xs" style={{ color: "#6b7280" }}>{catInfo?.label}</span>
                                        </div>
                                        <button onClick={() => setGoals(prev => prev.filter(g => g.id !== goal.id))} className="text-xs text-red-400">Remove</button>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1" style={{ color: "#6b7280" }}>
                                            <span>{formatRupee(goal.currentAmount)} saved</span>
                                            <span>{formatRupee(goal.targetAmount)} goal</span>
                                        </div>
                                        <div className="h-2 rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                                            <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: "#2d6a4f" }} />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs" style={{ color: "#9ca3af" }}>Target: {goal.targetDate || "Not set"}</span>
                                        <span className="text-xs font-semibold" style={{ color: "#2d6a4f" }}>{pct.toFixed(0)}%</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>

            <FAB label="Create Goal" icon={Plus} color="green" onClick={() => setShowModal(true)} />

            {/* Create Goal Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create New Goal</DialogTitle>
                    </DialogHeader>
                    <div className="grid sm:grid-cols-2 gap-6 py-2">
                        {/* Left: Form */}
                        <div className="space-y-4">
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2 block">Goal Category</Label>
                                <div className="grid grid-cols-2 gap-1.5">
                                    {goalCategories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            onClick={() => setForm(f => ({ ...f, category: cat.value }))}
                                            className="text-left px-2.5 py-2 rounded-xl text-xs font-medium border-2 transition-all"
                                            style={{
                                                backgroundColor: form.category === cat.value ? "#d8f3dc" : "transparent",
                                                borderColor: form.category === cat.value ? "#2d6a4f" : "#e5e7eb",
                                                color: form.category === cat.value ? "#2d6a4f" : "#6b7280",
                                            }}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Goal Title *</Label>
                                <Input placeholder="e.g. Dream Home" value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Target Amount ₹ *</Label>
                                <Input type="number" placeholder="0" value={form.targetAmount} onChange={(e) => setForm(f => ({ ...f, targetAmount: e.target.value }))} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Current Savings ₹</Label>
                                <Input type="number" placeholder="0" value={form.currentAmount} onChange={(e) => setForm(f => ({ ...f, currentAmount: e.target.value }))} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Target Date</Label>
                                <Input type="date" value={form.targetDate} onChange={(e) => setForm(f => ({ ...f, targetDate: e.target.value }))} />
                            </div>
                            <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: "#2d6a4f", color: "white" }}>
                                Create Goal
                            </Button>
                        </div>

                        {/* Right: Live Analysis Card */}
                        <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: "linear-gradient(135deg, #1a2e23 0%, #3d5af1 100%)" }}>
                            <p className="text-xs uppercase tracking-widest text-white/60">Goal Analysis</p>
                            <p className="text-3xl font-bold font-mono text-white">{formatRupee(targetAmt)}</p>
                            <div className="flex gap-4 text-xs">
                                <div>
                                    <p className="text-white/50">Current</p>
                                    <p className="text-white font-bold font-mono">{formatRupee(currentAmt)}</p>
                                </div>
                                <div>
                                    <p className="text-white/50">Still Needed</p>
                                    <p className="text-white font-bold font-mono">{formatRupee(needed)}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-white/60 mb-1">
                                    <span>Progress</span>
                                    <span>{pct.toFixed(0)}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/10">
                                    <div className="h-2 rounded-full bg-white/70 transition-all" style={{ width: `${pct}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-white/50">Monthly Needed</p>
                                    <p className="text-white font-bold font-mono">{formatRupee(monthlyNeeded)}/mo</p>
                                </div>
                                <span
                                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                                    style={{ backgroundColor: statusColor + "30", color: statusColor === "#2d6a4f" ? "#52b788" : statusColor }}
                                >
                                    {status}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-white/50">Months to Goal</p>
                                <p className="text-white font-bold font-mono">{monthsLeft} months</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
