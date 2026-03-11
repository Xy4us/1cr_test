"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { month: "Sep", value: 3500000 },
  { month: "Oct", value: 3800000 },
  { month: "Nov", value: 3650000 },
  { month: "Dec", value: 4100000 },
  { month: "Jan", value: 4250000 },
  { month: "Feb", value: 4510000 },
];

export function NetWorthGrowthChart() {
  const [range, setRange] = useState("6M");
  
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-gray-900 text-lg font-bold tracking-tight">Net Worth Growth</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Historical trajectory</p>
        </div>
        <div className="flex gap-1 bg-gray-50 p-1 rounded-xl ring-1 ring-gray-100">
          {["1M", "6M", "1Y", "ALL"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-black transition-all",
                range === r ? "bg-white text-[#2d6a4f] shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
              tickFormatter={(val) => `₹${val / 100000}L`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
                fontSize: '12px', 
                fontWeight: 'bold',
                padding: '12px'
              }}
              formatter={(val) => [`₹${(val as number).toLocaleString('en-IN')}`, 'Net Worth']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#2d6a4f" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#growthGradient)" 
              dot={{ r: 4, fill: "#2d6a4f", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 3, stroke: "#fff", fill: "#2d6a4f" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Subtle bottom decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#2d6a4f]/5 rounded-full blur-3xl -mb-16 -mr-16" />
    </div>
  );
}
