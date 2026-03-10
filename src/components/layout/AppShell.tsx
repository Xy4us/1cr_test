"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className={cn(
          "flex-1 min-w-0 overflow-y-auto pb-16 lg:pb-0 transition-[margin-left] duration-200",
          // No sidebar margin on mobile; icon-rail on larger screens when collapsed.
          collapsed ? "ml-0 sm:ml-[72px]" : "ml-0 sm:ml-[220px]",
        )}
      >
        {children}
      </main>
    </div>
  );
}

