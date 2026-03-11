"use client";

import React from "react";
import { PlusCircle, MinusCircle, Target, FileText, Shield, Calculator, FlaskConical, BookOpen } from "lucide-react";

const actions = [
  { label: "Add Asset", icon: PlusCircle, color: "#2d6a4f" },
  { label: "Add Debt", icon: MinusCircle, color: "#ef4444" },
  { label: "New Goal", icon: Target, color: "#8b5cf6" },
  { label: "Tax Rep", icon: FileText, color: "#3b82f6" },
  { label: "Insurance", icon: Shield, color: "#f59e0b" },
  { label: "Calculate", icon: Calculator, color: "#06b6d4" },
  { label: "Scenarios", icon: FlaskConical, color: "#ec4899" },
  { label: "Learn", icon: BookOpen, color: "#10b981" },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 text-sm font-black uppercase tracking-tight">Quick Actions</h3>
        <span className="text-[10px] text-gray-400 font-medium">Common tasks</span>
      </div>
      
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 relative z-10">
        {actions.map((action) => (
          <button 
            key={action.label}
            className="flex flex-col items-center gap-2 group/btn flex-1 min-w-[70px] max-w-[100px]"
          >
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-lg shadow-[#00000005] ring-1 ring-white/50"
              style={{ backgroundColor: `${action.color}10`, color: action.color }}
            >
              <action.icon size={20} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 group-hover/btn:text-gray-900 transition-colors uppercase tracking-widest text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Background decoration */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#2d6a4f]/5 rounded-full blur-3xl transition-colors group-hover:bg-[#2d6a4f]/10" />
    </div>
  );
}
