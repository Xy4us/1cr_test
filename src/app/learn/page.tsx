"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";

const assets = [
    {
        name: "Stocks",
        emoji: "📈",
        desc: "Equity ownership in companies",
        risk: "High",
        riskColor: "#ef4444",
        riskBg: "#ffe8e8",
        return: "10–15%",
        details:
            "Stocks represent ownership stakes in public companies. They offer high growth potential but come with significant market volatility. Best for long-term investors with a high risk appetite.",
        grad: "linear-gradient(135deg, #d8f3dc 0%, #b7e4c7 100%)",
    },
    {
        name: "Mutual Funds",
        emoji: "🏦",
        desc: "Pooled investment vehicles",
        risk: "Medium",
        riskColor: "#f4a261",
        riskBg: "#fff3e0",
        return: "8–12%",
        details:
            "Mutual funds pool money from multiple investors to invest in diversified portfolios managed by professional fund managers. Good for beginners seeking diversification.",
        grad: "linear-gradient(135deg, #e8f4fd 0%, #dbeafe 100%)",
    },
    {
        name: "Real Estate",
        emoji: "🏠",
        desc: "Physical property assets",
        risk: "Medium",
        riskColor: "#f4a261",
        riskBg: "#fff3e0",
        return: "6–10%",
        details:
            "Real estate provides rental income and capital appreciation. It requires high upfront capital but offers stability and inflation hedging benefits.",
        grad: "linear-gradient(135deg, #f0e8fd 0%, #ede9fe 100%)",
    },
    {
        name: "Fixed Deposits",
        emoji: "🏧",
        desc: "Bank-backed guaranteed returns",
        risk: "Low",
        riskColor: "#2d6a4f",
        riskBg: "#d8f3dc",
        return: "5–7%",
        details:
            "Fixed deposits offer guaranteed returns with full capital protection. Backed by banks, they are ideal for conservative investors and emergency funds.",
        grad: "linear-gradient(135deg, #d8f3dc 0%, #dcfce7 100%)",
    },
    {
        name: "Gold",
        emoji: "🥇",
        desc: "Precious metal hedge asset",
        risk: "Low-Medium",
        riskColor: "#f4a261",
        riskBg: "#fff3e0",
        return: "7–9%",
        details:
            "Gold is a traditional store of value and acts as a hedge against inflation and currency depreciation. It shines during economic uncertainty.",
        grad: "linear-gradient(135deg, #fff3e0 0%, #fef3c7 100%)",
    },
    {
        name: "Bonds",
        emoji: "📄",
        desc: "Debt securities by government/corps",
        risk: "Low",
        riskColor: "#2d6a4f",
        riskBg: "#d8f3dc",
        return: "5–8%",
        details:
            "Bonds are fixed-income instruments where you lend money to governments or corporations in exchange for periodic interest and principal repayment.",
        grad: "linear-gradient(135deg, #e8f4fd 0%, #eff6ff 100%)",
    },
    {
        name: "Crypto",
        emoji: "₿",
        desc: "Digital decentralized assets",
        risk: "Very High",
        riskColor: "#ef4444",
        riskBg: "#ffe8e8",
        return: "Variable",
        details:
            "Cryptocurrencies are digital assets on blockchain networks. Extremely volatile and speculative. Only invest what you can afford to lose entirely.",
        grad: "linear-gradient(135deg, #ffe8e8 0%, #fee2e2 100%)",
    },
];

export default function LearnPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [expanded, setExpanded] = useState<string | null>(null);
    const [learned, setLearned] = useState<string[]>([]);

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader title="Learn Assets" />

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a2e23 0%, #2d6a4f 100%)" }}
            >
                <PageContainer size="wide" className="py-10">
                    <div className="absolute right-8 top-8 text-7xl opacity-10">🎓</div>
                    <h2 className="text-2xl font-bold text-white mb-1">Build Your Knowledge</h2>
                    <p className="text-sm text-green-200/70 mb-4">Explore asset classes and make informed decisions</p>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-white font-mono">{learned.length}/{assets.length}</span>
                        <div className="flex-1 max-w-48 h-2 rounded-full bg-white/20">
                            <div
                                className="h-2 rounded-full bg-white transition-all"
                                style={{ width: `${(learned.length / assets.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-xs text-white/60">Modules completed</span>
                    </div>
                </PageContainer>
            </motion.div>

            {/* Tabs */}
            <PageContainer size="wide" className="pt-5">
                <div className="flex gap-2 flex-wrap">
                    {["overview", "compare", "learn"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all"
                            style={{
                                backgroundColor: activeTab === tab ? "#2d6a4f" : "#ffffff",
                                color: activeTab === tab ? "#ffffff" : "#6b7280",
                                border: `1px solid ${activeTab === tab ? "#2d6a4f" : "#e5e7eb"}`,
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </PageContainer>

            <PageContainer className="py-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                >
                {assets.map((asset, i) => (
                    <motion.div
                        key={asset.name}
                        variants={fadeUp}
                        custom={i}
                        className="rounded-2xl overflow-hidden"
                        style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}
                    >
                        {/* Card header gradient */}
                        <div className="relative h-16" style={{ background: asset.grad }}>
                            <div className="absolute bottom-3 left-5 text-3xl">{asset.emoji}</div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-bold" style={{ color: "#1a1a1a" }}>{asset.name}</h3>
                                    <p className="text-sm" style={{ color: "#6b7280" }}>{asset.desc}</p>
                                </div>
                                {learned.includes(asset.name) && (
                                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "#d8f3dc", color: "#2d6a4f" }}>
                                        ✓ Learned
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: asset.riskBg, color: asset.riskColor }}>
                                    Risk: {asset.risk}
                                </span>
                                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: "#d8f3dc", color: "#2d6a4f" }}>
                                    Return: {asset.return} p.a.
                                </span>
                            </div>

                            {expanded === asset.name && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="text-sm mb-4 p-3 rounded-xl"
                                    style={{ color: "#6b7280", backgroundColor: "#f4f7f5" }}
                                >
                                    {asset.details}
                                </motion.p>
                            )}

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setExpanded(expanded === asset.name ? null : asset.name);
                                        if (!learned.includes(asset.name)) setLearned(prev => [...prev, asset.name]);
                                    }}
                                    className="flex-1"
                                    style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                                >
                                    {expanded === asset.name ? "Show Less" : "Learn More"}
                                </Button>
                                <Button
                                    size="sm"
                                    className="flex-1 text-white"
                                    style={{ backgroundColor: "#2d6a4f" }}
                                    onClick={() => window.location.href = "/scenarios"}
                                >
                                    Try Scenario
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </motion.div>
            </PageContainer>
        </div>
    );
}
