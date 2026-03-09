"use client";
import { motion } from "framer-motion";
import { TrendingUp, Target } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const activities = [
    {
        id: 1,
        icon: TrendingUp,
        title: "Viewed Net Worth",
        desc: "Checked overall financial position",
        time: "2 min ago",
        color: "#d8f3dc",
        iconColor: "#2d6a4f",
    },
    {
        id: 2,
        icon: Target,
        title: "Viewed Goals",
        desc: "Reviewed financial goals progress",
        time: "15 min ago",
        color: "#e8f4fd",
        iconColor: "#3d5af1",
    },
];

export function ActivityFeed() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold" style={{ color: "#1a1a1a" }}>
                    Recent Activity
                </h2>
                <button className="text-sm font-medium" style={{ color: "#2d6a4f" }}>
                    View All →
                </button>
            </div>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
            >
                {activities.map((a, i) => {
                    const Icon = a.icon;
                    return (
                        <motion.div
                            key={a.id}
                            variants={fadeUp}
                            custom={i}
                            className="flex items-center gap-4 p-4 rounded-xl"
                            style={{
                                backgroundColor: "#ffffff",
                                boxShadow: "var(--shadow-card)",
                                border: "1px solid #e5e7eb",
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: a.color }}
                            >
                                <Icon size={20} color={a.iconColor} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>
                                    {a.title}
                                </p>
                                <p className="text-xs" style={{ color: "#6b7280" }}>
                                    {a.desc}
                                </p>
                            </div>
                            <span className="text-xs" style={{ color: "#9ca3af" }}>
                                {a.time}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
