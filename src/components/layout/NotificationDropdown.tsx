"use client";

import React from "react";
import { Bell, ShieldCheck, AlertCircle, Info, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "alert" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  link?: string;
  read: boolean;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Insurance Coverage Gap",
    message: "Your life insurance coverage is 40% below recommended levels.",
    time: "2 mins ago",
    link: "/dashboard",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Portfolio Rebalancing",
    message: "Equity allocation has exceeded target by 8% due to recent gains.",
    time: "1 hour ago",
    link: "/portfolio",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New Investment Insight",
    message: "A new tax-saving opportunity is available for your profile.",
    time: "5 hours ago",
    read: true,
  },
];

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile or closing on click outside */}
          <div 
            className="fixed inset-0 z-40 bg-transparent" 
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-[#2d6a4f]" />
                <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
              </div>
              <span className="text-[10px] font-black text-[#2d6a4f] uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-gray-100">
                2 New
              </span>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {DUMMY_NOTIFICATIONS.map((notif) => (
                <div 
                  key={notif.id}
                  className={cn(
                    "p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group",
                    !notif.read && "bg-[#f0faf4]/30"
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      notif.type === "alert" ? "bg-red-50 text-red-500" : 
                      notif.type === "warning" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
                    )}>
                      {notif.type === "alert" ? <AlertCircle size={14} /> : 
                       notif.type === "warning" ? <ShieldCheck size={14} /> : <Info size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-xs font-bold text-gray-900 truncate">{notif.title}</p>
                        <span className="text-[9px] font-medium text-gray-400 whitespace-nowrap">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
                        {notif.message}
                      </p>
                      {notif.link && (
                        <div className="flex items-center gap-1 text-[10px] font-black text-[#2d6a4f] uppercase tracking-widest group-hover:underline">
                          Take action <ExternalLink size={10} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-gray-50/50 flex justify-center border-t border-gray-50">
              <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#2d6a4f] transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
