"use client";

import React from "react";
import { TrendingUp, Wallet, Landmark, Timer, BarChart3 } from "lucide-react";

interface NetWorthSummaryProps {
  totalAssets: number;
  totalLiabilities: number;
}

export function NetWorthSummary({ totalAssets, totalLiabilities }: NetWorthSummaryProps) {
  const netWorth = totalAssets - totalLiabilities;
  const cashRunway = 14; 
  const roiYtd = 12.8; 
  
  const allocation = [
    { label: "Investments", value: 78.2, color: "#52b788" },
    { label: "Real Estate", value: 17.8, color: "#3b82f6" },
    { label: "Savings", value: 4.0, color: "#f59e0b" },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-[#0a1611] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden group mb-8 h-full flex flex-col justify-between">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d6a4f]/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-[#2d6a4f]/20" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Total Net Worth</p>
            <div className="flex items-center gap-4">
              <h2 className="text-[42px] font-black text-white tracking-tighter leading-none">
                {formatCurrency(netWorth)}
              </h2>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#52b788] bg-[#52b788]/10 px-2 py-1 rounded-md border border-[#52b788]/20">
                <TrendingUp size={10} /> 4.2% from last month
              </div>
            </div>
          </div>

          <div className="flex gap-12 text-right">
            <div>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Assets</p>
              <p className="text-xl font-bold text-white tracking-tight">{formatCurrency(totalAssets)}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Liabilities</p>
              <p className="text-xl font-bold text-red-400/80 tracking-tight">{formatCurrency(totalLiabilities)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-10">
          <div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Cash Runway</p>
            <p className="text-2xl font-bold text-white tracking-tight">{cashRunway} Months</p>
            <p className="text-[10px] text-gray-500 mt-1">Liquid reserves</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">ROI (YTD)</p>
            <p className="text-2xl font-bold text-[#52b788] tracking-tight">{roiYtd}%</p>
            <p className="text-[10px] text-gray-500 mt-1">Portfolio return</p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Portfolio Allocation</p>
        </div>
        
        <div className="h-2 w-full flex rounded-full overflow-hidden bg-white/5 p-0.5">
          {allocation.map((item, i) => (
            <div 
              key={i}
              className="h-full transition-all group-hover:brightness-110"
              style={{ width: `${item.value}%`, backgroundColor: item.color }}
            />
          ))}
        </div>
        
        <div className="flex gap-6 mt-4">
          {allocation.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight">{item.label}</span>
                <span className="text-[10px] font-black text-gray-500">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
