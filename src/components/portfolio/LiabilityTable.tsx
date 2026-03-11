"use client";

import React from "react";
import { Plus, Home, Car, CreditCard, Landmark, ArrowRight } from "lucide-react";
import { LIABILITY_META, Liability } from "@/lib/portfolio";

interface LiabilityTableProps {
  liabilities: Liability[];
}

export function LiabilityTable({ liabilities }: LiabilityTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
      <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50/30 gap-4">
        <div>
          <h3 className="text-gray-900 text-lg font-bold tracking-tight">Active Liabilities</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tracking your debt commitments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-red-600/10 active:scale-95">
            <Plus size={14} /> Add Debt
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/20">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lender / Loan</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Outstanding (₹)</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Interest Rate</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Next Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {liabilities.map((liab) => {
              const meta = LIABILITY_META[liab.category];
              const Icon = liab.category === "home_loan" ? Home : liab.category === "car_loan" ? Car : liab.category === "credit_card" ? CreditCard : Landmark;

              return (
                <tr key={liab.id} className="hover:bg-red-50/10 transition-colors group/row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover/row:scale-110 transition-transform ring-4 ring-white"
                        style={{ backgroundColor: `${meta.color}`, color: meta.text }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-gray-900 tracking-tight">{liab.name}</span>
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
                    <span className="text-sm font-black text-red-600">{liab.currentBalance.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{liab.interestRate}%</span>
                    <span className="text-[10px] text-gray-400 ml-1 font-medium">p.a</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <span className="text-sm font-bold text-gray-600">
                        {new Date(liab.dueDate).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                      </span>
                      <ArrowRight size={12} className="text-gray-300 group-hover/row:translate-x-1 transition-transform" />
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
        <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors">
          View Liability Insights
        </button>
      </div>
    </div>
  );
}
