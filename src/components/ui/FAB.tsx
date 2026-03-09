"use client";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FABProps {
    label: string;
    icon: LucideIcon;
    color?: "green" | "blue";
    onClick?: () => void;
}

const colors = {
    green: { bg: "#2d6a4f", hover: "#52b788" },
    blue: { bg: "#3d5af1", hover: "#5b76f5" },
};

export function FAB({ label, icon: Icon, color = "green", onClick }: FABProps) {
    const c = colors[color];
    return (
        <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className="fixed bottom-20 right-5 lg:bottom-6 lg:right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold shadow-lg"
            style={{ backgroundColor: c.bg }}
        >
            <Icon size={16} />
            <span>{label}</span>
        </motion.button>
    );
}
