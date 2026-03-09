"use client";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface AlertCardProps {
    title: string;
    description: string;
    type?: "warning" | "info" | "danger";
}

export function AlertCard({
    title,
    description,
    type = "warning",
}: AlertCardProps) {
    const colors = {
        warning: { border: "#f4a261", bg: "#fff8f0", icon: "#f4a261" },
        info: { border: "#52b788", bg: "#f0fdf4", icon: "#52b788" },
        danger: { border: "#ef4444", bg: "#fff5f5", icon: "#ef4444" },
    };
    const c = colors[type];

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer border-l-4"
            style={{
                backgroundColor: c.bg,
                borderLeftColor: c.border,
                boxShadow: "var(--shadow-card)",
                border: `1px solid ${c.border}30`,
                borderLeft: `4px solid ${c.border}`,
            }}
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: c.border + "20" }}
            >
                <AlertTriangle size={18} color={c.icon} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>
                    {title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                    {description}
                </p>
            </div>
            <ChevronRight size={16} color="#9ca3af" />
        </motion.div>
    );
}
