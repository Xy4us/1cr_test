"use client";

import React from "react";
import { Search, Plus, TrendingUp, TrendingDown, CircleDollarSign } from "lucide-react";
import { CATEGORY_META, Asset } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

interface AssetTableProps {
  assets: Asset[];
}

export function AssetTable({ assets }: AssetTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8 group">
      <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50/30 gap-4">
        <div>
          <h3 className="text-gray-900 text-lg font-bold tracking-tight">My Assets</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Detailed breakdown of your holdings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#2d6a4f] outline-none w-40 sm:w-48 transition-all focus:sm:w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#2d6a4f] text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1a2e23] transition-all shadow-lg shadow-[#2d6a4f]/10 active:scale-95">
            <Plus size={14} /> Add Asset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/20">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Value (₹)</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Gain/Loss</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {assets.map((asset) => {
              const meta = CATEGORY_META[asset.category];
              const gain = asset.currentValue - asset.purchasePrice;
              const gainPct = (gain / asset.purchasePrice) * 100;
              const isPositive = gain >= 0;

              return (
                <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors group/row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover/row:scale-110 transition-transform ring-4 ring-white"
                        style={{ backgroundColor: `${meta.color}`, color: meta.text }}
                      >
                        <CircleDollarSign size={18} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 tracking-tight">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest"
                      style={{ backgroundColor: `${meta.color}60`, color: meta.text }}
                    >
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-gray-900">{asset.currentValue.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn("text-xs font-bold", isPositive ? "text-[#22c55e]" : "text-red-500")}>
                      {isPositive ? "+" : "-"}₹{Math.abs(gain).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black", isPositive ? "text-[#22c55e] bg-[#22c55e]/10" : "text-red-500 bg-red-50")}>
                      {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {Math.abs(gainPct).toFixed(1)}%
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className="p-4 bg-gray-50/30 border-t border-gray-50 flex justify-center">
        <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#2d6a4f] transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
}
