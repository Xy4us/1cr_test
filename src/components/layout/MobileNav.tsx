"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Target, User } from "lucide-react";

const tabs = [
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/profile", label: "Profile", icon: User },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav
            className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
            style={{
                backgroundColor: "#1a2e23",
                borderColor: "#243d2f",
                paddingBottom: "env(safe-area-inset-bottom)",
            }}
        >
            <div className="flex">
                {tabs.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || pathname.startsWith(href + "/");
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors"
                            style={{ color: active ? "#52b788" : "#6b9e82" }}
                        >
                            <Icon size={20} />
                            <span className="text-xs font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
