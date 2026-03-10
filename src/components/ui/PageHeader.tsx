"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backHref?: string;
    actions?: React.ReactNode;
    badge?: string;
}

export function PageHeader({
    title,
    subtitle,
    backHref,
    actions,
    badge,
}: PageHeaderProps) {
    return (
        <div
            className="sticky top-0 z-30 border-b bg-white/60 backdrop-blur-md"
            style={{ borderColor: "#e5e7eb" }}
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 lg:px-8">
                <div className="flex items-center gap-3">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                            style={{ backgroundColor: "#f4f7f5", color: "#6b7280" }}
                        >
                            <ArrowLeft size={16} />
                        </Link>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-bold" style={{ color: "#1a1a1a" }}>
                                {title}
                            </h1>
                            {badge && (
                                <span
                                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{ backgroundColor: "#d8f3dc", color: "#2d6a4f" }}
                                >
                                    {badge}
                                </span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-sm" style={{ color: "#6b7280" }}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
        </div>
    );
}
