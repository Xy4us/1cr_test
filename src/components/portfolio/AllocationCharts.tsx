"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DUMMY_ASSETS, DUMMY_LIABILITIES, CATEGORY_META, LIABILITY_META } from "@/lib/portfolio";

// Build real allocation data from DUMMY_ASSETS
function buildAssetAllocation() {
  const map: Record<string, { name: string; value: number; color: string }> = {};
  for (const a of DUMMY_ASSETS) {
    const meta = CATEGORY_META[a.category];
    if (!map[a.category]) {
      map[a.category] = { name: meta.label, value: 0, color: meta.color };
    }
    map[a.category].value += a.currentValue;
  }
  return Object.values(map);
}

function buildLiabAllocation() {
  const map: Record<string, { name: string; value: number; color: string }> = {};
  for (const l of DUMMY_LIABILITIES) {
    const meta = LIABILITY_META[l.category];
    if (!map[l.category]) {
      map[l.category] = { name: meta.label, value: 0, color: meta.color };
    }
    map[l.category].value += l.currentBalance;
  }
  return Object.values(map);
}

const fmtL = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)}Cr` :
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` :
  `₹${n.toLocaleString("en-IN")}`;

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  total: number;
  label: string;
  sublabel: string;
  centerColor?: string;
}

function DonutCard({ data, total, label, sublabel, centerColor = "#2d6a4f" }: DonutChartProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-gray-900 text-base font-black mb-1 tracking-tight">{label}</h3>
      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">{sublabel}</p>

      <div className="relative" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={96}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: unknown) => typeof v === "number" ? [`${fmtL(v)}`, ""] : String(v)}
              contentStyle={{ borderRadius: "14px", border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.09)", fontSize: "12px", fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Total</span>
          <span className="text-xl font-black" style={{ color: centerColor }}>{fmtL(total)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 mt-3">
        {data.map((item) => {
          const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
          return (
            <div key={item.name} className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-semibold text-gray-600 flex-1">{item.name}</span>
              <span className="text-xs font-black text-gray-900">{fmtL(item.value)}</span>
              <span className="text-[10px] font-bold text-gray-400 w-12 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AllocationCharts() {
  const assetData = buildAssetAllocation();
  const liabData = buildLiabAllocation();
  const totalAssets = assetData.reduce((s, d) => s + d.value, 0);
  const totalLiabs = liabData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <DonutCard
        data={assetData}
        total={totalAssets}
        label="Asset Allocation"
        sublabel="By category breakdown"
        centerColor="#2d6a4f"
      />
      <DonutCard
        data={liabData}
        total={totalLiabs}
        label="Debt Concentration"
        sublabel="Outstanding balances"
        centerColor="#ef4444"
      />
    </div>
  );
}
