// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard,
//   Briefcase,
//   Target,
//   User,
//   CreditCard,
//   FlaskConical,
//   Calculator,
//   BookOpen,
//   Settings,
//   ChevronRight,
// } from "lucide-react";

// const mainNav = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/portfolio", label: "Portfolio", icon: Briefcase },
//   { href: "/goals", label: "Goals", icon: Target },
//   { href: "/profile", label: "Profile", icon: User },
// ];
// const toolsNav = [
//   { href: "/debts", label: "My Debts", icon: CreditCard },
//   { href: "/scenarios", label: "Scenario Analysis", icon: FlaskConical },
//   { href: "/calculators", label: "Calculators", icon: Calculator },
//   { href: "/learn", label: "Learn Assets", icon: BookOpen },
//   { href: "/settings", label: "Settings", icon: Settings },
// ];

// function NavItem({
//   href,
//   label,
//   icon: Icon,
//   active,
// }: {
//   href: string;
//   label: string;
//   icon: React.ElementType;
//   active: boolean;
// }) {
//   return (
//     <Link href={href} className="relative block group">
//       <div
//         className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
//         style={{
//           backgroundColor: active ? "#f0faf4" : "transparent",
//           color: active ? "#2d6a4f" : "#6b7280",
//         }}
//       >
//         {active && (
//           <motion.div
//             layoutId="sidebar-active"
//             className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
//             style={{ backgroundColor: "#2d6a4f" }}
//           />
//         )}
//         <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
//         <span className="text-sm font-medium hidden lg:block">{label}</span>
//         {active && (
//           <ChevronRight
//             size={13}
//             className="ml-auto hidden lg:block opacity-50"
//           />
//         )}
//       </div>
//     </Link>
//   );
// }

// export function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside
//       className="hidden sm:flex flex-col h-screen  sticky top-0 shrink-0 border-r"
//       style={{
//         width: "220px",
//         backgroundColor: "#ffffff",
//         borderColor: "#e5e7eb",
//       }}
//     >
//       {/* Logo */}
//       <div
//         className="flex items-center gap-2.5 px-4 py-5 border-b"
//         style={{ borderColor: "#f3f4f6" }}
//       >
//         <div
//           className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
//           style={{ backgroundColor: "#2d6a4f" }}
//         >
//           1C
//         </div>
//         <span
//           className="font-bold text-sm hidden lg:block"
//           style={{ color: "#111827" }}
//         >
//           1CR Club
//         </span>
//       </div>

//       {/* Nav */}
//       <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
//         <div>
//           <p
//             className="text-xs font-semibold px-3 mb-2 uppercase tracking-wider hidden lg:block"
//             style={{ color: "#9ca3af" }}
//           >
//             Main
//           </p>
//           <div className="space-y-0.5">
//             {mainNav.map((item) => (
//               <NavItem
//                 key={item.href}
//                 {...item}
//                 active={pathname === item.href}
//               />
//             ))}
//           </div>
//         </div>
//         <div>
//           <p
//             className="text-xs font-semibold px-3 mb-2 uppercase tracking-wider hidden lg:block"
//             style={{ color: "#9ca3af" }}
//           >
//             Tools
//           </p>
//           <div className="space-y-0.5">
//             {toolsNav.map((item) => (
//               <NavItem
//                 key={item.href}
//                 {...item}
//                 active={pathname === item.href}
//               />
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* User */}
//       <div className="px-3 py-4 border-t" style={{ borderColor: "#f3f4f6" }}>
//         <div className="flex items-center gap-2.5 px-2">
//           <div
//             className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
//             style={{ backgroundColor: "#2d6a4f" }}
//           >
//             U
//           </div>
//           <div className="hidden lg:block min-w-0">
//             <p
//               className="text-xs font-semibold truncate"
//               style={{ color: "#111827" }}
//             >
//               User
//             </p>
//             <span
//               className="text-xs px-1.5 py-0.5 rounded-full font-medium"
//               style={{ backgroundColor: "#f0faf4", color: "#2d6a4f" }}
//             >
//               Free
//             </span>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

//----------------------------------------

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   LayoutDashboard,
//   Briefcase,
//   Target,
//   User,
//   CreditCard,
//   FlaskConical,
//   Calculator,
//   BookOpen,
//   Settings,
//   ChevronRight,
// } from "lucide-react";

// const mainNav = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/portfolio", label: "Portfolio", icon: Briefcase },
//   { href: "/goals", label: "Goals", icon: Target },
//   { href: "/profile", label: "Profile", icon: User },
// ];

// const toolsNav = [
//   { href: "/debts", label: "My Debts", icon: CreditCard },
//   { href: "/scenarios", label: "Scenario Analysis", icon: FlaskConical },
//   { href: "/calculators", label: "Calculators", icon: Calculator },
//   { href: "/learn", label: "Learn Assets", icon: BookOpen },
//   { href: "/settings", label: "Settings", icon: Settings },
// ];

// function NavItem({
//   href,
//   label,
//   icon: Icon,
//   active,
// }: {
//   href: string;
//   label: string;
//   icon: React.ElementType;
//   active: boolean;
// }) {
//   return (
//     <Link href={href} className="relative block group">
//       <div
//         className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
//         style={{
//           backgroundColor: active ? "#f0faf4" : "transparent",
//           color: active ? "#2d6a4f" : "#6b7280",
//         }}
//       >
//         {active && (
//           <motion.div
//             layoutId="sidebar-active"
//             className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
//             style={{ backgroundColor: "#2d6a4f" }}
//           />
//         )}

//         <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />

//         <span className="text-sm font-medium hidden lg:block">{label}</span>

//         {active && (
//           <ChevronRight
//             size={13}
//             className="ml-auto hidden lg:block opacity-50"
//           />
//         )}
//       </div>
//     </Link>
//   );
// }

// export function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <aside
//       className="hidden sm:flex flex-col min-h-screen sticky top-0 shrink-0 border-r"
//       style={{
//         width: "220px",
//         backgroundColor: "#ffffff",
//         borderColor: "#e5e7eb",
//       }}
//     >
//       {/* Logo */}
//       <div
//         className="flex items-center gap-2.5 px-4 py-5 border-b"
//         style={{ borderColor: "#f3f4f6" }}
//       >
//         <div
//           className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
//           style={{ backgroundColor: "#2d6a4f" }}
//         >
//           1C
//         </div>

//         <span
//           className="font-bold text-sm hidden lg:block"
//           style={{ color: "#111827" }}
//         >
//           1CR Club
//         </span>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
//         <div>
//           <p
//             className="text-xs font-semibold px-3 mb-2 uppercase tracking-wider hidden lg:block"
//             style={{ color: "#9ca3af" }}
//           >
//             Main
//           </p>

//           <div className="space-y-0.5">
//             {mainNav.map((item) => (
//               <NavItem
//                 key={item.href}
//                 {...item}
//                 active={pathname === item.href}
//               />
//             ))}
//           </div>
//         </div>

//         <div>
//           <p
//             className="text-xs font-semibold px-3 mb-2 uppercase tracking-wider hidden lg:block"
//             style={{ color: "#9ca3af" }}
//           >
//             Tools
//           </p>

//           <div className="space-y-0.5">
//             {toolsNav.map((item) => (
//               <NavItem
//                 key={item.href}
//                 {...item}
//                 active={pathname === item.href}
//               />
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* User */}
//       <div className="px-3 py-4 border-t" style={{ borderColor: "#f3f4f6" }}>
//         <div className="flex items-center gap-2.5 px-2">
//           <div
//             className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
//             style={{ backgroundColor: "#2d6a4f" }}
//           >
//             U
//           </div>

//           <div className="hidden lg:block min-w-0">
//             <p
//               className="text-xs font-semibold truncate"
//               style={{ color: "#111827" }}
//             >
//               User
//             </p>

//             <span
//               className="text-xs px-1.5 py-0.5 rounded-full font-medium"
//               style={{
//                 backgroundColor: "#f0faf4",
//                 color: "#2d6a4f",
//               }}
//             >
//               Free
//             </span>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

"use client";

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
  ChevronLeft,
} from "lucide-react";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

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

function NavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link href={href} className="block">
      <div
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
        style={{
          backgroundColor: active ? "#f0faf4" : "transparent",
          color: active ? "#2d6a4f" : "#6b7280",
        }}
      >
        <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />

        {/* Hide labels when collapsed to create an icon rail */}
        <span
          className={cn(
            "text-sm font-medium text-gray-700",
            "hidden lg:block",
            collapsed && "opacity-0 pointer-events-none",
          )}
        >
          {label}
        </span>

        {!collapsed && active && (
          <ChevronRight
            size={13}
            className="ml-auto hidden lg:block opacity-50"
          />
        )}
      </div>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "hidden sm:flex fixed left-0 top-0 z-40 h-screen flex-col border-r bg-white transition-[width] duration-200",
      )}
      style={{
        width: collapsed ? "72px" : "220px",
        borderColor: "#e5e7eb",
      }}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-[#2d6a4f]">
          1C
        </div>

        <span
          className={cn(
            "font-bold text-sm text-gray-900",
            "hidden lg:block",
            collapsed && "opacity-0 pointer-events-none",
          )}
        >
          1CR Club
        </span>

        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!collapsed && (
            <p className="hidden lg:block px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Main
            </p>
          )}

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

        <div>
          {!collapsed && (
            <p className="hidden lg:block px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Tools
            </p>
          )}

          <div className="space-y-0.5">
            {toolsNav.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                collapsed={collapsed}
                active={pathname === item.href}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-[#2d6a4f]">
            U
          </div>

          <div
            className={cn(
              "hidden lg:block min-w-0",
              collapsed && "opacity-0 pointer-events-none",
            )}
          >
            <p className="text-xs font-semibold truncate text-gray-900">User</p>

            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-[#f0faf4] text-[#2d6a4f]">
              Free
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

