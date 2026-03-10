"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, TrendingDown, CheckCircle } from "lucide-react";
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
import { calculateEMI } from "@/lib/calculations";
import { toast } from "sonner";
import { PageContainer } from "@/components/layout/PageContainer";

const filterChips = ["All", "Mortgage", "Personal Loan", "Credit Card", "Auto Loan"];
const debtTypes = ["Mortgage", "Personal Loan", "Credit Card", "Auto Loan", "Education Loan", "Business Loan", "Other"];

interface Debt {
    id: string;
    type: string;
    lender: string;
    principal: number;
    outstanding: number;
    interestRate: number;
    tenureMonths: number;
    emi: number;
    startDate: string;
}

export default function DebtsPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        type: "Personal Loan",
        lender: "",
        principal: "",
        outstanding: "",
        interestRate: "",
        tenureMonths: "",
        startDate: "",
    });

    const computedEMI =
        form.principal && form.interestRate && form.tenureMonths
            ? calculateEMI(
                parseFloat(form.principal),
                parseFloat(form.interestRate),
                parseInt(form.tenureMonths)
            )
            : 0;

    const handleAdd = () => {
        if (!form.lender || !form.principal) return;
        const newDebt: Debt = {
            id: Date.now().toString(),
            type: form.type,
            lender: form.lender,
            principal: parseFloat(form.principal),
            outstanding: parseFloat(form.outstanding) || parseFloat(form.principal),
            interestRate: parseFloat(form.interestRate) || 0,
            tenureMonths: parseInt(form.tenureMonths) || 12,
            emi: computedEMI,
            startDate: form.startDate,
        };
        setDebts((prev) => [...prev, newDebt]);
        setShowModal(false);
        setForm({ type: "Personal Loan", lender: "", principal: "", outstanding: "", interestRate: "", tenureMonths: "", startDate: "" });
        toast.success("Debt added successfully!");
    };

    const filtered = activeFilter === "All" ? debts : debts.filter((d) => d.type === activeFilter);
    const totalOutstanding = debts.reduce((s, d) => s + d.outstanding, 0);
    const totalEMI = debts.reduce((s, d) => s + d.emi, 0);
    const totalPaid = debts.reduce((s, d) => s + (d.principal - d.outstanding), 0);

    const formatRupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader
                title="My Debts"
                actions={
                    <>
                        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#2d6a4f" }}>
                            <Plus size={14} /> Add Debt
                        </button>
                        <button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ borderColor: "#e5e7eb", color: "#6b7280" }}>
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
                    className="space-y-6"
                >
                    {/* Summary Card */}
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        className="rounded-2xl p-6 relative overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #ef4444 0%, #2d6a4f 100%)" }}
                    >
                    <p className="text-xs uppercase tracking-widest text-white/70 mb-2">Total Outstanding</p>
                    <p className="text-4xl font-bold font-mono text-white mb-4">{formatRupee(totalOutstanding)}</p>
                    <div className="flex gap-6">
                        <div>
                            <p className="text-xs text-white/60">Monthly EMI</p>
                            <p className="text-xl font-bold font-mono text-white">{formatRupee(totalEMI)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-white/60">Total Paid</p>
                            <p className="text-xl font-bold font-mono text-white">{formatRupee(totalPaid)}</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                        <span className="text-xs text-white/70">Debt-to-Income Ratio</span>
                        <span className="text-sm font-bold text-white">0.0%</span>
                    </div>
                </motion.div>

                {/* Filter Chips */}
                <motion.div variants={fadeUp} custom={1} className="flex gap-2 flex-wrap">
                    {filterChips.map((chip) => {
                        const isActive = activeFilter === chip;
                        return (
                            <button
                                key={chip}
                                onClick={() => setActiveFilter(chip)}
                                className="relative px-4 py-2 rounded-full text-sm font-medium transition-all"
                                style={{
                                    backgroundColor: isActive ? "#2d6a4f" : "#ffffff",
                                    color: isActive ? "#ffffff" : "#6b7280",
                                    border: `1px solid ${isActive ? "#2d6a4f" : "#e5e7eb"}`,
                                }}
                            >
                                {isActive && <span className="mr-1">✓</span>}
                                {chip}
                            </button>
                        );
                    })}
                </motion.div>

                {/* Debt List */}
                <motion.div variants={fadeUp} custom={2}>
                    {filtered.length === 0 ? (
                        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                            <EmptyState emoji="✅" title="No debts found" subtitle={activeFilter === "All" ? "You're debt-free! 🎉" : `No ${activeFilter} debts found.`} />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map((debt, i) => (
                                <motion.div
                                    key={debt.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="rounded-2xl p-5"
                                    style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-semibold" style={{ color: "#1a1a1a" }}>{debt.lender}</p>
                                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#ffe8e8", color: "#ef4444" }}>{debt.type}</span>
                                        </div>
                                        <button onClick={() => setDebts(prev => prev.filter(d => d.id !== debt.id))} className="text-xs text-red-400">Remove</button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div><p className="text-xs text-gray-400">Outstanding</p><p className="font-bold font-mono" style={{ color: "#ef4444" }}>{formatRupee(debt.outstanding)}</p></div>
                                        <div><p className="text-xs text-gray-400">Monthly EMI</p><p className="font-bold font-mono" style={{ color: "#1a1a1a" }}>{formatRupee(debt.emi)}</p></div>
                                        <div><p className="text-xs text-gray-400">Interest Rate</p><p className="font-bold font-mono" style={{ color: "#1a1a1a" }}>{debt.interestRate}%</p></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
                </motion.div>
            </PageContainer>

            <FAB label="Payoff Strategy" icon={TrendingDown} color="blue" onClick={() => toast.info("Navigate to Scenario Analysis to plan payoff!")} />

            {/* Add Debt Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Debt</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2 block">Debt Type</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {debtTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setForm(f => ({ ...f, type }))}
                                        className="text-left px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all"
                                        style={{
                                            backgroundColor: form.type === type ? "#d8f3dc" : "transparent",
                                            borderColor: form.type === type ? "#2d6a4f" : "#e5e7eb",
                                            color: form.type === type ? "#2d6a4f" : "#6b7280",
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Lender Name *</Label>
                            <Input placeholder="e.g. HDFC Bank" value={form.lender} onChange={(e) => setForm(f => ({ ...f, lender: e.target.value }))} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Principal ₹ *</Label>
                                <Input type="number" placeholder="0" value={form.principal} onChange={(e) => setForm(f => ({ ...f, principal: e.target.value }))} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Outstanding ₹</Label>
                                <Input type="number" placeholder="0" value={form.outstanding} onChange={(e) => setForm(f => ({ ...f, outstanding: e.target.value }))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Interest Rate %</Label>
                                <Input type="number" step="0.1" placeholder="8.5" value={form.interestRate} onChange={(e) => setForm(f => ({ ...f, interestRate: e.target.value }))} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Tenure (months)</Label>
                                <Input type="number" placeholder="60" value={form.tenureMonths} onChange={(e) => setForm(f => ({ ...f, tenureMonths: e.target.value }))} />
                            </div>
                        </div>
                        {computedEMI > 0 && (
                            <div className="p-3 rounded-xl" style={{ backgroundColor: "#d8f3dc" }}>
                                <p className="text-xs text-gray-500">Auto-calculated EMI</p>
                                <p className="text-xl font-bold font-mono" style={{ color: "#2d6a4f" }}>₹{computedEMI.toLocaleString("en-IN", { maximumFractionDigits: 0 })}/mo</p>
                            </div>
                        )}
                        <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: "#2d6a4f", color: "white" }}>
                            Add Debt
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
