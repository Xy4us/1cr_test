"use client";

import React from "react";
import { TrendingUp, Wallet, Landmark, Timer, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PortfolioOverviewProps {
  totalAssets: number;
  totalLiabilities: number;
}

export function PortfolioOverview({ totalAssets, totalLiabilities }: PortfolioOverviewProps) {
  const netWorth = totalAssets - totalLiabilities;
  const roiYtd = 12.4;
  const cashRunway = 8.5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Net Worth Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Portfolio Net Worth</p>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">₹{netWorth.toLocaleString("en-IN")}</h3>
        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-[#22c55e]">
          <ArrowUpRight size={12} /> 4.2% Growth
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#2d6a4f]/5 rounded-full blur-xl" />
      </div>

      {/* ROI Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Return on Investment</p>
        <h3 className="text-2xl font-black text-[#2d6a4f] tracking-tight">+{roiYtd}%</h3>
        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-gray-400">
          <TrendingUp size={12} /> Year to Date
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
      </div>

      {/* Cash Runway Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Cash Runway</p>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{cashRunway} Mo</h3>
        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-gray-400">
          <Timer size={12} /> Financial Buffer
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-amber-500/5 rounded-full blur-xl" />
      </div>

      {/* Debt Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Liabilities</p>
        <h3 className="text-2xl font-black text-red-600 tracking-tight">₹{totalLiabilities.toLocaleString("en-IN")}</h3>
        <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-red-500">
          <ArrowDownRight size={12} /> 2.1% Reduction
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-500/5 rounded-full blur-xl" />
      </div>
    </div>
  );
}
