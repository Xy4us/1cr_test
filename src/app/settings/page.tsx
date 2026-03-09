"use client";
import { motion } from "framer-motion";
import { Bell, Moon, Globe, Shield, CreditCard, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { toast } from "sonner";

const settings = [
    { icon: Bell, label: "Notifications", sub: "Manage alerts and reminders", color: "#d8f3dc", iconColor: "#2d6a4f" },
    { icon: Moon, label: "Appearance", sub: "Theme and display preferences", color: "#e8f4fd", iconColor: "#3d5af1" },
    { icon: Globe, label: "Currency & Language", sub: "₹ INR · English", color: "#fff3e0", iconColor: "#f4a261" },
    { icon: Shield, label: "Privacy & Security", sub: "Data and account security", color: "#ffe8e8", iconColor: "#ef4444" },
    { icon: CreditCard, label: "Subscription", sub: "Free Plan · Upgrade to Pro", color: "#f0e8fd", iconColor: "#7c3aed" },
    { icon: HelpCircle, label: "Help & Support", sub: "FAQs and contact support", color: "#d8f3dc", iconColor: "#2d6a4f" },
];

export default function SettingsPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader title="Settings" />
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="px-4 lg:px-8 py-6 max-w-2xl space-y-3">
                {settings.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={s.label} variants={fadeUp} custom={i}
                            onClick={() => toast.info(`${s.label} — coming soon!`)}
                            className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer"
                            style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.color }}>
                                <Icon size={20} color={s.iconColor} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>{s.label}</p>
                                <p className="text-xs" style={{ color: "#6b7280" }}>{s.sub}</p>
                            </div>
                            <span style={{ color: "#9ca3af" }}>›</span>
                        </motion.div>
                    );
                })}

                <motion.div variants={fadeUp} custom={settings.length} className="text-center pt-4">
                    <p className="text-xs" style={{ color: "#9ca3af" }}>1CR Club v1.0 · Made with ❤️ in India</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
