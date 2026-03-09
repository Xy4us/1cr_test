"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PageHeader } from "@/components/ui/PageHeader";
import { getScoreColor, getScoreLabel, getScoreBg } from "@/lib/calculations";

const scoreFactors = [
    { label: "Insurance Coverage", key: "insurance", score: 0, max: 20, tip: "Link your insurance policy to earn 20 points." },
    { label: "Emergency Fund", key: "emergency", score: 0, max: 20, tip: "Set aside 6 months of expenses in an emergency fund." },
    { label: "Debt-to-Income Ratio", key: "debt", score: 20, max: 20, tip: "Great! Your debt-to-income ratio is healthy." },
    { label: "Financial Goals", key: "goals", score: 0, max: 20, tip: "Create financial goals to earn 20 points." },
    { label: "Asset Portfolio", key: "portfolio", score: 10, max: 20, tip: "Add more assets to strengthen your portfolio score." },
];

const totalScore = scoreFactors.reduce((s, f) => s + f.score, 0);

export default function HealthScorePage() {
    const color = getScoreColor(totalScore);
    const label = getScoreLabel(totalScore);

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader title="Health Score Breakdown" backHref="/dashboard" />

            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="px-4 lg:px-8 py-6 max-w-3xl space-y-4">
                {/* Large Score */}
                <motion.div variants={fadeUp} custom={0} className="rounded-2xl p-8 text-center"
                    style={{ background: getScoreBg(totalScore), boxShadow: "var(--shadow-card)" }}>
                    <p className="text-6xl font-bold font-mono mb-2" style={{ color }}>{totalScore}</p>
                    <p className="text-sm font-semibold px-4 py-2 rounded-full inline-block" style={{ backgroundColor: color + "20", color }}>
                        {label}
                    </p>
                    <p className="text-sm mt-3" style={{ color: "#6b7280" }}>Your score is computed across 5 key financial dimensions.</p>
                </motion.div>

                {/* Factor cards */}
                {scoreFactors.map((factor, i) => (
                    <motion.div key={factor.key} variants={fadeUp} custom={i + 1}
                        className="rounded-2xl p-5" style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                        <div className="flex items-center justify-between mb-3">
                            <p className="font-semibold" style={{ color: "#1a1a1a" }}>{factor.label}</p>
                            <span className="font-bold font-mono text-sm" style={{ color: factor.score > 0 ? "#2d6a4f" : "#ef4444" }}>
                                {factor.score}/{factor.max}
                            </span>
                        </div>
                        <div className="h-2 rounded-full mb-3" style={{ backgroundColor: "#e5e7eb" }}>
                            <div className="h-2 rounded-full transition-all" style={{
                                width: `${(factor.score / factor.max) * 100}%`,
                                backgroundColor: factor.score === factor.max ? "#2d6a4f" : factor.score > 0 ? "#f4a261" : "#ef4444"
                            }} />
                        </div>
                        <p className="text-xs" style={{ color: "#6b7280" }}>{factor.tip}</p>
                    </motion.div>
                ))}

                {/* Accordion */}
                <motion.div variants={fadeUp} custom={6} className="rounded-2xl p-5"
                    style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                    <h3 className="font-semibold mb-2" style={{ color: "#1a1a1a" }}>What impacts your score?</h3>
                    <p className="text-sm" style={{ color: "#6b7280" }}>
                        Your Financial Health Score is a composite metric (0–100) derived from 5 key pillars:
                        insurance protection, emergency preparedness, debt management, goal-setting behaviour, and investment activity.
                        Each pillar contributes 20 points. Complete all sections to reach 100.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
