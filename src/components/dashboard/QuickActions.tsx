"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Target,
    Shield,
    Calculator,
    Briefcase,
    CreditCard,
    TrendingUp,
    FlaskConical,
    BookOpen,
} from "lucide-react";

const actions = [
    { label: "Update Goals", icon: Target, href: "/goals", color: "#d8f3dc", iconColor: "#2d6a4f" },
    { label: "Protection", icon: Shield, href: "/learn", color: "#fff3e0", iconColor: "#f4a261" },
    { label: "Calculators", icon: Calculator, href: "/calculators", color: "#e8f4fd", iconColor: "#3d5af1" },
    { label: "Assets", icon: Briefcase, href: "/portfolio", color: "#f0e8fd", iconColor: "#7c3aed" },
    { label: "Liabilities", icon: CreditCard, href: "/debts", color: "#ffe8e8", iconColor: "#ef4444" },
    { label: "Net Worth", icon: TrendingUp, href: "/portfolio", color: "#d8f3dc", iconColor: "#2d6a4f" },
    { label: "Run Scenario", icon: FlaskConical, href: "/scenarios", color: "#e8f4fd", iconColor: "#3d5af1" },
    { label: "Learn Assets", icon: BookOpen, href: "/learn", color: "#fff3e0", iconColor: "#f4a261" },
];

export function QuickActions() {
    return (
        <div>
            <h2 className="text-base font-semibold mb-4" style={{ color: "#1a1a1a" }}>
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                        <Link key={action.label} href={action.href}>
                            <motion.div
                                whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(45,106,79,0.15)" }}
                                whileTap={{ scale: 0.98 }}
                                className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-pointer"
                                style={{
                                    backgroundColor: "#ffffff",
                                    boxShadow: "var(--shadow-card)",
                                    border: "1px solid #e5e7eb",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: action.color }}
                                >
                                    <Icon size={22} color={action.iconColor} />
                                </div>
                                <span className="text-xs font-semibold text-center" style={{ color: "#1a1a1a" }}>
                                    {action.label}
                                </span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
