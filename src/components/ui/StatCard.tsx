"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    change?: number;
    changeLabel?: string;
    className?: string;
}

export function StatCard({ label, value, change, changeLabel, className }: StatCardProps) {
    const isPositive = (change ?? 0) >= 0;
    return (
        <div
            className={`rounded-2xl p-5 ${className || ""}`}
            style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
                border: "1px solid #e5e7eb",
            }}
        >
            <p className="text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#9ca3af" }}>
                {label}
            </p>
            <p className="text-2xl font-bold font-mono" style={{ color: "#1a1a1a" }}>
                {value}
            </p>
            {change !== undefined && (
                <div className={`flex items-center gap-1 mt-2 text-xs font-medium`}>
                    {isPositive ? (
                        <TrendingUp size={13} color="#2d6a4f" />
                    ) : (
                        <TrendingDown size={13} color="#ef4444" />
                    )}
                    <span style={{ color: isPositive ? "#2d6a4f" : "#ef4444" }}>
                        {isPositive ? "+" : ""}{change}%
                    </span>
                    {changeLabel && (
                        <span style={{ color: "#9ca3af" }}>{changeLabel}</span>
                    )}
                </div>
            )}
        </div>
    );
}
