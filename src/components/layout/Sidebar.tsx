"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Target,
  User,
  CreditCard,
  FlaskConical,
  Calculator,
  BookOpen,
  Settings,
  ChevronRight,
  PanelLeft,
  PanelLeftClose,
  ShieldCheck,
} from "lucide-react";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
];

const planningNav = [
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/insurance", label: "Insurance", icon: ShieldCheck },
];

const accountNav = [
  { href: "/profile", label: "Profile", icon: User },
];

const toolsNav = [
  { href: "/debts", label: "My Debts", icon: CreditCard },
  { href: "/scenarios", label: "Scenario Analysis", icon: FlaskConical },
  { href: "/calculators", label: "Calculators", icon: Calculator },
  { href: "/learn", label: "Learn Assets", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
}

function NavItem({ href, label, icon: Icon, active, collapsed }: NavItemProps) {
  return (
    <Link href={href} className="block group" title={collapsed ? label : undefined}>
      <div
        className={cn(
          "flex items-center rounded-xl transition-all duration-200",
          collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
          active
            ? "bg-[#f0faf4] text-[#2d6a4f] shadow-sm"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        <div className="flex items-center justify-center shrink-0">
          <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        </div>

        {!collapsed && (
          <span className="text-sm font-semibold flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </span>
        )}

        {!collapsed && active && (
          <ChevronRight size={14} className="opacity-40 shrink-0" />
        )}
      </div>
    </Link>
  );
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) {
    return <div className="h-px bg-gray-100 mx-1 my-2" />;
  }
  return (
    <p className="px-3 mb-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
      {label}
    </p>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-[#f1f3f5] bg-white transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* ── HEADER: Logo + brand name ── */}
      <div className={cn(
        "flex items-center h-16 shrink-0 px-3 gap-3",
        collapsed && "justify-center"
      )}>
        {/* Logo square — always visible */}
        <div className="w-10 h-10 rounded-xl bg-[#2d6a4f] flex items-center justify-center text-white shadow-lg shadow-[#2d6a4f]/20 shrink-0">
          <span className="font-extrabold text-sm tracking-tighter">1C</span>
        </div>

        {/* Brand text — hidden when collapsed */}
        {!collapsed && (
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-bold text-[15px] text-gray-900 leading-tight whitespace-nowrap">1CR Club</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider whitespace-nowrap">Premium Finance</span>
          </div>
        )}

        {/* Toggle — always inside sidebar, visible in expanded state */}
        {!collapsed && (
          <button
            onClick={toggle}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-[#2d6a4f] hover:bg-[#f0faf4] transition-all shrink-0"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {/* Toggle button below logo in collapsed state */}
      {collapsed && (
        <div className="flex justify-center pb-2 shrink-0">
          <button
            onClick={toggle}
            title="Expand sidebar"
            aria-label="Expand sidebar"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-[#2d6a4f] bg-[#f0faf4] hover:bg-[#d8f3dc] transition-all border border-[#b7e4c7]"
          >
            <PanelLeft size={18} />
          </button>
        </div>
      )}

      {/* ── DIVIDER ── */}
      <div className="px-3 mb-2 shrink-0">
        <div className="h-px bg-gray-100" />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-3 py-1 scrollbar-hide">
        {/* OVERVIEW */}
        <div>
          <SectionLabel label="Overview" collapsed={collapsed} />
          <div className="space-y-0.5">
            {mainNav.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                collapsed={collapsed}
                active={pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* PLANNING */}
        <div>
          <SectionLabel label="Planning" collapsed={collapsed} />
          <div className="space-y-0.5">
            {planningNav.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                collapsed={collapsed}
                active={pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* ACCOUNT */}
        <div>
          <SectionLabel label="Account" collapsed={collapsed} />
          <div className="space-y-0.5">
            {accountNav.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                collapsed={collapsed}
                active={pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* FINANCIAL TOOLS */}
        <div>
          <SectionLabel label="Financial Tools" collapsed={collapsed} />
          <div className="space-y-0.5">
            {toolsNav.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                collapsed={collapsed}
                active={pathname === item.href || pathname.startsWith(item.href + "/")}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* ── FOOTER: User ── */}
      <div className="p-2 mt-auto shrink-0 border-t border-gray-50">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-2xl transition-all",
          collapsed ? "justify-center" : "px-3 bg-gray-50/50"
        )}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2d6a4f] to-[#52b788] flex items-center justify-center text-white text-xs font-bold shadow-md shrink-0">
            JD
          </div>

          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 truncate">John Doe</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] animate-pulse" />
                <span className="text-[10px] font-bold text-[#2d6a4f] uppercase tracking-wide">Premium</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
