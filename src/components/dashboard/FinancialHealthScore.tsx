"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Droplet, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const categories = [
  { id: "liquidity", label: "Liquidity", score: 85, icon: Droplet, color: "#3b82f6" },
  { id: "debt", label: "Debt", score: 92, icon: CreditCard, color: "#10b981" },
  { id: "savings", label: "Savings", score: 45, icon: PiggyBank, color: "#f59e0b" },
  { id: "investments", label: "Investments", score: 78, icon: TrendingUp, color: "#8b5cf6" },
  { id: "protection", label: "Protection", score: 60, icon: ShieldCheck, color: "#ef4444" },
];

export function FinancialHealthScore() {
  const overallScore = 72;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - overallScore / 100);
  
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden group mb-8">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d6a4f]/5 rounded-full -mr-32 -mt-32 blur-3xl transition-colors group-hover:bg-[#2d6a4f]/10" />
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        {/* Left Section: Gauge */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-12">
          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Financial Health Score</h3>
            <span className="text-[10px] font-black text-[#2d6a4f] bg-[#f0faf4] px-2 py-0.5 rounded-full ring-1 ring-[#2d6a4f]/10">• Excellent</span>
          </div>

          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#f1f3f5"
                strokeWidth="10"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="#2d6a4f"
                strokeWidth="10"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-gray-900 leading-none">{overallScore}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">/ 100</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[200px]">
              You are in the <span className="text-gray-900 font-bold">top 15%</span> of wealth creators in your age bracket.
            </p>
            <button className="mt-3 text-[10px] font-black text-[#2d6a4f] uppercase tracking-widest hover:underline flex items-center gap-1 mx-auto">
              View Full Report <ChevronRight size={10} />
            </button>
          </div>
        </div>

        {/* Right Section: Pillars */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-gray-900 text-sm font-black uppercase tracking-tight">Health Pillars</h3>
            <span className="text-[10px] font-bold text-gray-400">Core metrics</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
            {categories.map((cat) => (
              <div key={cat.id} className="group/item cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-all group-hover/item:scale-110"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <cat.icon size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{cat.label}</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">{cat.score}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.score}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: cat.color,
                      boxShadow: `0 0 10px ${cat.color}40` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
