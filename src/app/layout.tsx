import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import LenisProvider from "@/components/layout/LenisProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "1CR Club — Personal Finance & Wealth Management",
  description:
    "Your premium personal finance dashboard. Track assets, manage debts, plan goals, and grow wealth with 1CR Club.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: "#f4f7f5", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <LenisProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Desktop Sidebar - 240px fixed */}
            <Sidebar />
            {/* Main content area */}
            <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
              {children}
            </main>
          </div>
          {/* Mobile bottom nav */}
          <MobileNav />
        </LenisProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
