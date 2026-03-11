"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export function SecureYourFuture() {
  return (
    <div className="bg-gradient-to-br from-[#1a2e23] to-[#2d6a4f] rounded-3xl p-6 text-white shadow-xl shadow-[#2d6a4f]/20 relative overflow-hidden group h-full flex flex-col justify-center">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-[#52b788]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#52b788]">Next Milestone</span>
        </div>
        <h3 className="text-xl font-bold mb-2 tracking-tight">Secure Your Future</h3>
        <p className="text-xs text-gray-300 leading-relaxed mb-6">
          You're on track to reach your <span className="text-white font-bold italic">₹1Cr Retirement Goal</span> by 2045. Set up a dedicated SIP to accelerate your progress!
        </p>
        <button className="flex items-center gap-2 bg-white text-[#2d6a4f] px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#f0faf4] transition-all group-hover:gap-3 w-fit">
          Explore Strategy <ArrowRight size={14} />
        </button>
      </div>

      {/* Background blobs */}
      <div className="absolute top-1/2 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#52b788]/20 rounded-full -ml-16 -mb-16 blur-2xl" />
    </div>
  );
}
