"use client";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    emoji?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    subtitle,
    action,
    emoji,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            {emoji ? (
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4"
                    style={{ backgroundColor: "#d8f3dc" }}
                >
                    {emoji}
                </div>
            ) : Icon ? (
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#d8f3dc" }}
                >
                    <Icon size={36} color="#2d6a4f" />
                </div>
            ) : null}
            <h3 className="text-lg font-semibold mb-1" style={{ color: "#1a1a1a" }}>
                {title}
            </h3>
            {subtitle && (
                <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                    {subtitle}
                </p>
            )}
            {action && action}
        </div>
    );
}
