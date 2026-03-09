"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export function NextActionCard() {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
                backgroundColor: "#ffffff",
                boxShadow: "var(--shadow-card)",
                border: "1px solid #e5e7eb",
            }}
        >
            {/* Badge */}
            <span
                className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
                style={{ backgroundColor: "#fff3e0", color: "#f4a261" }}
            >
                Protection
            </span>

            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#9ca3af" }}>
                Your Next Action
            </p>
            <div className="flex items-start gap-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#d8f3dc" }}
                >
                    <Shield size={22} color="#2d6a4f" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: "#1a1a1a" }}>
                        Secure Your Future
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                        You don't have any insurance coverage linked. Protect yourself and
                        your family from unexpected financial shocks.
                    </p>
                    <Link
                        href="/learn"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: "#2d6a4f" }}
                    >
                        View All Plans <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
