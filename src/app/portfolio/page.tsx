"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Upload, Plus, Filter, X, ToggleLeft } from "lucide-react";
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
import { toast } from "sonner";

const categories = [
    { value: "stocks", label: "📈 Stocks", color: "#d8f3dc", text: "#2d6a4f" },
    { value: "mutual_funds", label: "🏦 Mutual Funds", color: "#e8f4fd", text: "#3d5af1" },
    { value: "real_estate", label: "🏠 Real Estate", color: "#f0e8fd", text: "#7c3aed" },
    { value: "gold", label: "🥇 Gold", color: "#fff3e0", text: "#f4a261" },
    { value: "fd", label: "🏧 Fixed Deposits", color: "#e8f4fd", text: "#3d5af1" },
    { value: "crypto", label: "₿ Crypto", color: "#ffe8e8", text: "#ef4444" },
    { value: "bonds", label: "📄 Bonds", color: "#d8f3dc", text: "#2d6a4f" },
    { value: "other", label: "💼 Other", color: "#f4f7f5", text: "#6b7280" },
];

interface Asset {
    id: string;
    name: string;
    category: string;
    currentValue: number;
    purchasePrice: number;
    purchaseDate: string;
    liquid: boolean;
}

export default function PortfolioPage() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        category: "stocks",
        currentValue: "",
        purchasePrice: "",
        purchaseDate: "",
        description: "",
        liquid: false,
    });

    const handleAdd = () => {
        if (!form.name || !form.currentValue) return;
        const newAsset: Asset = {
            id: Date.now().toString(),
            name: form.name,
            category: form.category,
            currentValue: parseFloat(form.currentValue),
            purchasePrice: parseFloat(form.purchasePrice) || 0,
            purchaseDate: form.purchaseDate,
            liquid: form.liquid,
        };
        setAssets((prev) => [...prev, newAsset]);
        setShowModal(false);
        setForm({ name: "", category: "stocks", currentValue: "", purchasePrice: "", purchaseDate: "", description: "", liquid: false });
        toast.success("Asset added successfully!");
    };

    const totalValue = assets.reduce((s, a) => s + a.currentValue, 0);

    const getCatInfo = (val: string) => categories.find((c) => c.value === val) || categories[7];

    const formatRupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader
                title="My Assets"
                actions={
                    <>
                        <button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ borderColor: "#e5e7eb", color: "#6b7280" }}>
                            <Upload size={15} />
                        </button>
                        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#2d6a4f" }}>
                            <Plus size={14} /> Add
                        </button>
                        <button className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ borderColor: "#e5e7eb", color: "#6b7280" }}>
                            <Filter size={15} />
                        </button>
                    </>
                }
            />

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="px-4 lg:px-8 py-6 max-w-5xl space-y-6">
                {/* Summary Card */}
                <motion.div
                    variants={fadeUp}
                    custom={0}
                    className="rounded-2xl p-6 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1a2e23 0%, #2d6a4f 100%)" }}
                >
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Wallet size={22} color="#52b788" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-green-200/70 mb-2">Total Portfolio Value</p>
                    <p className="text-4xl font-bold font-mono text-white">{formatRupee(totalValue)}</p>
                    <div className="flex gap-6 mt-4">
                        <div>
                            <p className="text-xs text-white/50">Total Assets</p>
                            <p className="text-lg font-bold font-mono text-white">{assets.length}</p>
                        </div>
                        <div>
                            <p className="text-xs text-white/50">Liquid Assets</p>
                            <p className="text-lg font-bold font-mono text-white">{formatRupee(assets.filter(a => a.liquid).reduce((s, a) => s + a.currentValue, 0))}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Asset Table */}
                <motion.div variants={fadeUp} custom={1} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                    {assets.length === 0 ? (
                        <EmptyState emoji="📊" title="No assets yet" subtitle="Add your first asset to start tracking your portfolio." />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ backgroundColor: "#f4f7f5", borderBottom: "1px solid #e5e7eb" }}>
                                        {["Asset Name", "Category", "Current Value", "Purchase Price", "P&L", "Actions"].map((h) => (
                                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "#9ca3af" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {assets.map((asset, i) => {
                                        const cat = getCatInfo(asset.category);
                                        const pnl = asset.currentValue - asset.purchasePrice;
                                        const pnlPct = asset.purchasePrice > 0 ? ((pnl / asset.purchasePrice) * 100).toFixed(1) : "0";
                                        return (
                                            <motion.tr
                                                key={asset.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                style={{ borderBottom: "1px solid #f4f7f5" }}
                                                className="hover:bg-gray-50/50"
                                            >
                                                <td className="px-4 py-3 font-semibold" style={{ color: "#1a1a1a" }}>{asset.name}</td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: cat.color, color: cat.text }}>
                                                        {cat.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 font-mono font-semibold" style={{ color: "#1a1a1a" }}>{formatRupee(asset.currentValue)}</td>
                                                <td className="px-4 py-3 font-mono" style={{ color: "#6b7280" }}>{formatRupee(asset.purchasePrice)}</td>
                                                <td className="px-4 py-3 font-mono font-semibold" style={{ color: pnl >= 0 ? "#2d6a4f" : "#ef4444" }}>
                                                    {pnl >= 0 ? "+" : ""}{formatRupee(pnl)} ({pnlPct}%)
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button onClick={() => setAssets(prev => prev.filter(a => a.id !== asset.id))} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            <FAB label="Add Asset" icon={Plus} color="green" onClick={() => setShowModal(true)} />

            {/* Add Asset Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Add New Asset</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2 block">Category</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        onClick={() => setForm(f => ({ ...f, category: cat.value }))}
                                        className="text-left px-3 py-2 rounded-xl text-xs font-medium border-2 transition-all"
                                        style={{
                                            backgroundColor: form.category === cat.value ? cat.color : "transparent",
                                            borderColor: form.category === cat.value ? cat.text : "#e5e7eb",
                                            color: form.category === cat.value ? cat.text : "#6b7280",
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Asset Name *</Label>
                            <Input placeholder="e.g. HDFC Bank Shares" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Current Value ₹ *</Label>
                                <Input type="number" placeholder="0" value={form.currentValue} onChange={(e) => setForm(f => ({ ...f, currentValue: e.target.value }))} />
                            </div>
                            <div>
                                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Purchase Price ₹</Label>
                                <Input type="number" placeholder="0" value={form.purchasePrice} onChange={(e) => setForm(f => ({ ...f, purchasePrice: e.target.value }))} />
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 block">Purchase Date</Label>
                            <Input type="date" value={form.purchaseDate} onChange={(e) => setForm(f => ({ ...f, purchaseDate: e.target.value }))} />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: "#f4f7f5" }}>
                            <span className="text-sm font-medium" style={{ color: "#1a1a1a" }}>Liquid Asset</span>
                            <button
                                onClick={() => setForm(f => ({ ...f, liquid: !f.liquid }))}
                                className="w-12 h-6 rounded-full transition-colors relative"
                                style={{ backgroundColor: form.liquid ? "#2d6a4f" : "#d1d5db" }}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form.liquid ? "left-6" : "left-0.5"}`} />
                            </button>
                        </div>
                        <Button onClick={handleAdd} className="w-full" style={{ backgroundColor: "#2d6a4f", color: "white" }}>
                            Add Asset
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
