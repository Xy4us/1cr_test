"use client";

import React from "react";
import { useSidebar } from "@/components/layout/SidebarContext";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * wide: for dense dashboards
   * default: forms / tables / tools
   */
  size?: "default" | "wide";
};

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  const { collapsed } = useSidebar();

  const widthClass =
    size === "wide"
      ? "max-w-[1920px] 2xl:max-w-[2400px]"
      : collapsed
        ? "max-w-[1200px]"
        : "max-w-5xl lg:max-w-6xl";

  return (
    <div
      className={cn(
        "mx-auto w-full px-2 sm:px-4",
        widthClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

