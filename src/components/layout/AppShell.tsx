"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE AREA */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out",
          collapsed ? "pl-[72px]" : "pl-[240px]",
        )}
      >
        {/* HEADER */}
        <Header />

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 pt-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}

