"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

const topAssets = [
  { id: 1, name: "Nifty 50 Index Fund", category: "Mutual Fund", value: "₹4,25,000", returns: "+14.2%", color: "#2d6a4f" },
  { id: 2, name: "Reliance Industries", category: "Equity", value: "₹2,10,000", returns: "+11.8%", color: "#3b82f6" },
  { id: 3, name: "Physical Gold", category: "Commodity", value: "₹5,80,000", returns: "+8.5%", color: "#f59e0b" },
];

export function TopAssets() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900 text-lg font-bold">Top Performance</h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 py-1 bg-gray-50 rounded-lg">Last 12 Months</span>
      </div>

      <div className="space-y-4">
        {topAssets.map((asset, index) => (
          <div key={asset.id} className="flex items-center gap-4 group cursor-default p-2 rounded-2xl hover:bg-gray-50 transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 font-black text-xs group-hover:bg-[#2d6a4f] group-hover:text-white transition-all duration-300">
              0{index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">{asset.name}</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{asset.category}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-gray-900">{asset.value}</span>
              <div className="flex items-center gap-1 text-[10px] font-black text-[#22c55e]">
                <TrendingUp size={10} /> {asset.returns}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#2d6a4f]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
