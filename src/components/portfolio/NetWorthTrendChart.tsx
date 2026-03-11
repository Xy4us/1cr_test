"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { cn } from "@/lib/utils";

const DATA_ALL = [
  { month: "Apr", assets: 3800000, liabilities: 1350000 },
  { month: "May", assets: 3950000, liabilities: 1310000 },
  { month: "Jun", assets: 4050000, liabilities: 1280000 },
  { month: "Jul", assets: 4100000, liabilities: 1250000 },
  { month: "Aug", assets: 4250000, liabilities: 1220000 },
  { month: "Sep", assets: 4200000, liabilities: 1200000 },
  { month: "Oct", assets: 4400000, liabilities: 1150000 },
  { month: "Nov", assets: 4350000, liabilities: 1100000 },
  { month: "Dec", assets: 4800000, liabilities: 1050000 },
  { month: "Jan", assets: 5100000, liabilities: 1000000 },
  { month: "Feb", assets: 5400000, liabilities: 950000 },
  { month: "Mar", assets: 5690000, liabilities: 920000 },
];

const DATA_6M = DATA_ALL.slice(-6);
const DATA_1M = DATA_ALL.slice(-2);

const withNetWorth = (arr: typeof DATA_ALL) =>
  arr.map((d) => ({ ...d, netWorth: d.assets - d.liabilities }));

const RANGES = ["1M", "6M", "1Y", "ALL"] as const;

const fmtL = (v: number) =>
  v >= 10000000 ? `₹${(v / 10000000).toFixed(2)}Cr` :
  v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` :
  `₹${v.toLocaleString("en-IN")}`;

export function NetWorthTrendChart() {
  const [range, setRange] = useState<typeof RANGES[number]>("1Y");

  const rawData =
    range === "1M" ? DATA_1M :
    range === "6M" ? DATA_6M :
    DATA_ALL;

  const data = withNetWorth(rawData);

  const latest = data[data.length - 1];
  const prev = data[0];
  const netWorthDelta = latest.netWorth - prev.netWorth;
  const netWorthDeltaPct = prev.netWorth > 0 ? ((netWorthDelta / prev.netWorth) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-gray-900 text-base font-black tracking-tight">Net Worth Trend</h3>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Assets · Liabilities · Net Worth</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-[#2d6a4f]">{fmtL(latest.netWorth)}</span>
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              netWorthDelta >= 0 ? "text-[#2d6a4f] bg-[#f0fdf4]" : "text-red-600 bg-red-50"
            )}>
              {netWorthDelta >= 0 ? "+" : ""}{netWorthDeltaPct}%
            </span>
          </div>
        </div>

        <div className="flex gap-1 bg-gray-50 p-1 rounded-xl ring-1 ring-gray-100 shrink-0">
          {RANGES.map((r) => (
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

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="assetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="liabGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.08} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f5" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
              tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              width={55}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 40px rgba(0,0,0,0.10)",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "14px",
              }}
              formatter={(val, name) => [
                fmtL(val as number),
                name === "assets" ? "Total Assets" : name === "liabilities" ? "Liabilities" : "Net Worth",
              ]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: "16px", fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.06em" }}
            />
            <Area
              type="monotone"
              dataKey="assets"
              name="assets"
              stroke="#2d6a4f"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#assetGrad)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="liabilities"
              name="liabilities"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 3"
              fillOpacity={1}
              fill="url(#liabGrad)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="netWorth"
              name="netWorth"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#nwGrad)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
