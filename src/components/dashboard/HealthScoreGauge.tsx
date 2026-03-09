"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { getScoreColor, getScoreLabel } from "@/lib/calculations";
import Link from "next/link";

interface HealthScoreGaugeProps {
    score: number;
}

export function HealthScoreGauge({ score }: HealthScoreGaugeProps) {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const color = getScoreColor(score);
    const label = getScoreLabel(score);

    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => Math.round(v));

    useEffect(() => {
        const controls = animate(count, score, { duration: 1.4, ease: "easeOut" });
        return controls.stop;
    }, [score, count]);

    const scoreBg =
        score <= 40
            ? "linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)"
            : score <= 70
                ? "linear-gradient(135deg, #fffbf0 0%, #fff3e0 100%)"
                : "linear-gradient(135deg, #f0fdf4 0%, #d8f3dc 100%)";

    return (
        <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: scoreBg, boxShadow: "var(--shadow-card)" }}
        >
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Gauge */}
                <div className="relative w-52 h-52 shrink-0">
                    <svg
                        width="208"
                        height="208"
                        viewBox="0 0 208 208"
                        className="rotate-[-90deg]"
                    >
                        {/* Track */}
                        <circle
                            cx="104"
                            cy="104"
                            r={radius}
                            fill="none"
                            stroke="rgba(0,0,0,0.08)"
                            strokeWidth="16"
                        />
                        {/* Progress */}
                        <motion.circle
                            cx="104"
                            cy="104"
                            r={radius}
                            fill="none"
                            stroke={color}
                            strokeWidth="16"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{
                                strokeDashoffset:
                                    circumference - (score / 100) * circumference,
                            }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            className="text-5xl font-bold font-mono"
                            style={{ color }}
                        >
                            {rounded}
                        </motion.span>
                        <span className="text-xs text-gray-500 mt-1">out of 100</span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className="text-sm font-semibold px-3 py-1.5 rounded-full"
                            style={{
                                backgroundColor: color + "20",
                                color,
                            }}
                        >
                            {label}
                        </span>
                        <span className="text-xs" style={{ color: "#9ca3af" }}>
                            Last updated: 21m ago
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2" style={{ color: "#1a1a1a" }}>
                        Financial Health Score
                    </h2>
                    <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                        Your score is computed across 5 key financial dimensions including
                        insurance, emergency fund, debt ratio, goals, and portfolio.
                    </p>
                    <Link
                        href="/health-score"
                        className="text-sm font-semibold"
                        style={{ color }}
                    >
                        View breakdown →
                    </Link>
                </div>
            </div>
        </div>
    );
}
