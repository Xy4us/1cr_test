"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Home, ChevronRight } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  target: string;
  dueDate: string;
  progress: number;
  currentAmount: string;
  status: "at-risk" | "possible" | "on-track";
  icon: any;
  color: string;
}

const goals: Goal[] = [
  {
    id: "1",
    title: "Kia Seltos",
    target: "₹14,00,000",
    currentAmount: "₹8.05L",
    dueDate: "Apr 2029",
    progress: 43,
    status: "at-risk",
    icon: Car,
    color: "#f59e0b",
  },
  {
    id: "2",
    title: "Build Home",
    target: "₹15,00,000",
    currentAmount: "₹10.1L",
    dueDate: "Feb 2030",
    progress: 67,
    status: "possible",
    icon: Home,
    color: "#3b82f6",
  },
];

export function GoalsProgress() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 text-sm font-black uppercase tracking-tight">Goals Progress</h3>
          <p className="text-[10px] text-gray-400 font-medium">Track your financial milestones</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black text-[#2d6a4f] bg-[#f0faf4] px-2 py-0.5 rounded-md border border-[#2d6a4f]/10">
            2 Active
          </span>
          <button className="text-[10px] font-bold text-gray-400 hover:text-[#2d6a4f] transition-colors flex items-center gap-0.5">
            View All <ChevronRight size={10} />
          </button>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {goals.map((goal) => (
          <div key={goal.id} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 group hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#2d6a4f] transition-colors">
                  <goal.icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{goal.title}</h4>
                  <p className="text-[10px] text-gray-400">
                    Target {goal.target} <span className="mx-1">•</span> Due {goal.dueDate}
                  </p>
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${
                goal.status === "at-risk" ? "text-red-500" : "text-blue-500"
              }`}>
                {goal.status === "at-risk" ? "At Risk" : "Possible"}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-900">{goal.progress}%</span>
                <span className="text-[9px] font-bold text-gray-400">{goal.currentAmount} / {goal.target}</span>
              </div>
              <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-gray-100/50">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: goal.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-50">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Combined goal completion</span>
          <span className="text-[11px] font-black text-[#2d6a4f]">56%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden ring-1 ring-gray-100">
          <div 
            className="h-full bg-[#2d6a4f] rounded-full transition-all duration-1000"
            style={{ width: '56%' }}
          />
        </div>
      </div>
    </div>
  );
}
