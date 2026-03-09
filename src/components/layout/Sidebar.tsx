"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Briefcase, Target, User,
    CreditCard, FlaskConical, Calculator, BookOpen, Settings, ChevronRight,
} from "lucide-react";

const mainNav = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/profile", label: "Profile", icon: User },
];
const toolsNav = [
    { href: "/debts", label: "My Debts", icon: CreditCard },
    { href: "/scenarios", label: "Scenario Analysis", icon: FlaskConical },
    { href: "/calculators", label: "Calculators", icon: Calculator },
    { href: "/learn", label: "Learn Assets", icon: BookOpen },
    { href: "/settings", label: "Settings", icon: Settings },
];

function NavItem({ href, label, icon: Icon, active }: {
    href: string; label: string; icon: React.ElementType; active: boolean;
}) {
    return (
        <Link href={href} className="relative block group">
            <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
                style={{
                    backgroundColor: active ? "#f0faf4" : "transparent",
                    color: active ? "#2d6a4f" : "#6b7280",
                }}
            >
                {active && (
                    <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
                        style={{ backgroundColor: "#2d6a4f" }}
                    />
                )}
                <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-sm font-medium hidden lg:block">{label}</span>
                {active && (
                    <ChevronRight size={13} className="ml-auto hidden lg:block opacity-50" />
                )}
            </div>
        </Link>
    );
}

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="hidden sm:flex flex-col h-screen sticky top-0 shrink-0 border-r"
            style={{
                width: "220px",
                backgroundColor: "#ffffff",
                borderColor: "#e5e7eb",
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-4 py-5 border-b" style={{ borderColor: "#f3f4f6" }}>
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "#2d6a4f" }}
                >
                    1C
                </div>
                <span className="font-bold text-sm hidden lg:block" style={{ color: "#111827" }}>
                    1CR Club
                </span>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                <div>
                    <p className="text-xs font-semibold px-3 mb-2 uppercase tracking-wider hidden lg:block"
                        style={{ color: "#9ca3af" }}>Main</p>
                    <div className="space-y-0.5">
                        {mainNav.map(item => (
                            <NavItem key={item.href} {...item} active={pathname === item.href} />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold px-3 mb-2 uppercase tracking-wider hidden lg:block"
                        style={{ color: "#9ca3af" }}>Tools</p>
                    <div className="space-y-0.5">
                        {toolsNav.map(item => (
                            <NavItem key={item.href} {...item} active={pathname === item.href} />
                        ))}
                    </div>
                </div>
            </nav>

            {/* User */}
            <div className="px-3 py-4 border-t" style={{ borderColor: "#f3f4f6" }}>
                <div className="flex items-center gap-2.5 px-2">
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: "#2d6a4f" }}
                    >
                        U
                    </div>
                    <div className="hidden lg:block min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: "#111827" }}>User</p>
                        <span
                            className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: "#f0faf4", color: "#2d6a4f" }}
                        >
                            Free
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
