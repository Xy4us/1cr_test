"use client";

import React, { useEffect, useState } from "react";
import { Bell, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "./NotificationDropdown";

export function Header() {
  const [greeting, setGreeting] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const userName = "Ayush"; // This can be made dynamic from a store or auth context later

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 12) setGreeting("Good Morning");
      else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateGreeting();
    // Update every minute to keep it fresh
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-[#f1f3f5] bg-white/80 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-900">
          {greeting}, <span className="text-[#2d6a4f]">{userName}</span> 👋
        </h1>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">
          Your personal wealth dashboard
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Quick Actions */}
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          <button
            title="Refresh Data"
            aria-label="Refresh Data"
            className="flex h-9 w-9 items-center justify-center text-gray-400 hover:text-[#2d6a4f] hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200"
          >
            <RefreshCw size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
              aria-label="View Notifications"
              className={cn(
                "relative flex h-9 w-9 items-center justify-center transition-all duration-200 rounded-lg",
                showNotifications 
                  ? "bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20" 
                  : "text-gray-400 hover:text-[#2d6a4f] hover:bg-white hover:shadow-sm"
              )}
            >
              <Bell size={18} />
              <span className={cn(
                "absolute top-2.5 right-2.5 flex h-2 w-2",
                showNotifications && "hidden"
              )}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white"></span>
              </span>
            </button>
            
            <NotificationDropdown 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
            />
          </div>
        </div>

        {/* User Identity */}
        <div className="flex items-center gap-3.5 pl-6 border-l border-gray-100">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900 tracking-tight">{userName}</span>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#2d6a4f]"></span>
              <span className="text-[9px] font-bold text-[#2d6a4f] uppercase tracking-wider">Premium Account</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2d6a4f] to-[#52b788] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#2d6a4f]/20 ring-2 ring-white">
            AY
          </div>
        </div>
      </div>
    </header>
  );
}
