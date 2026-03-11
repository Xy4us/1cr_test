"use client";

import React from "react";
import { AlertCircle, ShieldAlert, Zap, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    title: "Kia Seltos At Risk",
    desc: "Insurance expiring in 3 days. Renew to avoid lapse",
    label: "HIGH PRIORITY",
    labelColor: "text-amber-600 bg-amber-50 border-amber-100",
    linkText: "View Goal →",
    link: "/goals",
  },
  {
    id: 2,
    title: "Missing Life Insurance",
    desc: "Liabilities are 4x higher than your protection coverage",
    label: "COVERAGE GAP",
    labelColor: "text-red-600 bg-red-50 border-red-100",
    linkText: "View Plans →",
    link: "/dashboard",
  },
];

export function ActiveAlerts() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertCircle size={18} className="text-gray-900" />
          <h3 className="text-gray-900 text-sm font-black uppercase tracking-tight">Active Alerts</h3>
        </div>
        <span className="text-[9px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100 uppercase tracking-tighter">
          2 Actions Required
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="group relative p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="mb-2">
              <span className={cn(
                "text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest",
                alert.labelColor
              )}>
                {alert.label}
              </span>
            </div>
            
            <h4 className="text-xs font-black text-gray-900 mb-1">{alert.title}</h4>
            <p className="text-[11px] text-gray-500 leading-normal mb-3">
              {alert.desc}
            </p>
            
            <button className="text-[10px] font-bold text-[#2d6a4f] hover:underline flex items-center gap-1">
              {alert.linkText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
