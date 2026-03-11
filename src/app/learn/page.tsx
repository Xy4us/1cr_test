"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown, ArrowRight, BarChart2, Scale, BookOpen } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PageContainer } from "@/components/layout/PageContainer";

const assets = [
  {
    name: "Stocks",
    emoji: "📈",
    desc: "Equity ownership in companies",
    risk: "High",
    riskColor: "#ef4444",
    riskBg: "#fef2f2",
    return: "10–15%",
    minInvestment: "₹500",
    liquidity: "High",
    taxBenefit: "LTCG @ 10%",
    details: "Stocks represent ownership stakes in public companies. They offer high growth potential but come with significant market volatility. Best for long-term investors with a high risk appetite.",
    grad: "linear-gradient(135deg, #d8f3dc 0%, #b7e4c7 100%)",
    accent: "#2d6a4f",
  },
  {
    name: "Mutual Funds",
    emoji: "🏦",
    desc: "Pooled investment vehicles",
    risk: "Medium",
    riskColor: "#d97706",
    riskBg: "#fffbeb",
    return: "8–12%",
    minInvestment: "₹100/SIP",
    liquidity: "Medium-High",
    taxBenefit: "ELSS saves ₹1.5L",
    details: "Mutual funds pool money from multiple investors to invest in diversified portfolios managed by professional fund managers. Good for beginners seeking diversification.",
    grad: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
    accent: "#3b82f6",
  },
  {
    name: "Real Estate",
    emoji: "🏠",
    desc: "Physical property assets",
    risk: "Medium",
    riskColor: "#d97706",
    riskBg: "#fffbeb",
    return: "6–10%",
    minInvestment: "₹20L+",
    liquidity: "Low",
    taxBenefit: "HRA deduction",
    details: "Real estate provides rental income and capital appreciation. It requires high upfront capital but offers stability and inflation hedging benefits.",
    grad: "linear-gradient(135deg, #f0e8fd 0%, #ede9fe 100%)",
    accent: "#7c3aed",
  },
  {
    name: "Fixed Deposits",
    emoji: "🏧",
    desc: "Bank-backed guaranteed returns",
    risk: "Low",
    riskColor: "#2d6a4f",
    riskBg: "#f0fdf4",
    return: "5–7%",
    minInvestment: "₹1,000",
    liquidity: "Low",
    taxBenefit: "80C (5yr FD)",
    details: "Fixed deposits offer guaranteed returns with full capital protection. Backed by banks, they are ideal for conservative investors and emergency funds.",
    grad: "linear-gradient(135deg, #d8f3dc 0%, #dcfce7 100%)",
    accent: "#16a34a",
  },
  {
    name: "Gold",
    emoji: "🥇",
    desc: "Precious metal hedge asset",
    risk: "Low-Medium",
    riskColor: "#d97706",
    riskBg: "#fffbeb",
    return: "7–9%",
    minInvestment: "₹1 (digital)",
    liquidity: "Medium",
    taxBenefit: "LTCG after 3 yr",
    details: "Gold is a traditional store of value and acts as a hedge against inflation and currency depreciation. It shines during economic uncertainty.",
    grad: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)",
    accent: "#f59e0b",
  },
  {
    name: "Bonds",
    emoji: "📄",
    desc: "Debt securities by government/corps",
    risk: "Low",
    riskColor: "#2d6a4f",
    riskBg: "#f0fdf4",
    return: "5–8%",
    minInvestment: "₹1,000",
    liquidity: "Medium",
    taxBenefit: "Tax-free govt bonds",
    details: "Bonds are fixed-income instruments where you lend money to governments or corporations in exchange for periodic interest and principal repayment.",
    grad: "linear-gradient(135deg, #e0f2fe 0%, #eff6ff 100%)",
    accent: "#0284c7",
  },
  {
    name: "Crypto",
    emoji: "₿",
    desc: "Digital decentralized assets",
    risk: "Very High",
    riskColor: "#dc2626",
    riskBg: "#fef2f2",
    return: "Variable",
    minInvestment: "₹100",
    liquidity: "Very High",
    taxBenefit: "30% flat tax",
    details: "Cryptocurrencies are digital assets on blockchain networks. Extremely volatile and speculative. Only invest what you can afford to lose entirely.",
    grad: "linear-gradient(135deg, #fee2e2 0%, #fce7f3 100%)",
    accent: "#ef4444",
  },
];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [learned, setLearned] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a2e23 0%, #2d6a4f 100%)" }}>
        <PageContainer size="wide" className="py-10">
          <div className="absolute right-0 top-0 text-[120px] opacity-5 select-none pointer-events-none">🎓</div>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Build Your Knowledge</h1>
              <p className="text-sm text-green-200/70">Explore asset classes and make informed decisions</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-2.5">
              <span className="text-sm text-white font-black font-mono">{learned.length}/{assets.length}</span>
              <div className="w-32 h-2 rounded-full bg-white/20">
                <div className="h-2 rounded-full bg-white transition-all" style={{ width: `${(learned.length / assets.length) * 100}%` }} />
              </div>
              <span className="text-xs text-white/60">Modules completed</span>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <PageContainer size="wide" className="">
          <div className="flex gap-1 py-3">
              {[ 
                { id: "overview", label: "Overview", Icon: BarChart2 },
                { id: "compare", label: "Compare", Icon: Scale },
                { id: "learn", label: "Learn", Icon: BookOpen },
              ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all"
                style={{
                  backgroundColor: activeTab === id ? "#2d6a4f" : "transparent",
                  color: activeTab === id ? "#ffffff" : "#6b7280",
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </PageContainer>
      </div>

      <PageContainer size="wide" className="py-8">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {assets.map((asset, i) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Gradient header */}
                    <div className="relative h-20 flex items-end pb-3 px-5" style={{ background: asset.grad }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: asset.accent + "30" }}>
                        <BarChart2 size={20} style={{ color: asset.accent }} />
                      </div>
                      {learned.includes(asset.name) && (
                        <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-white/80 text-[#2d6a4f]">✓ Learned</span>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-black text-gray-900">{asset.name}</h3>
                          <p className="text-sm text-gray-500">{asset.desc}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ backgroundColor: asset.riskBg, color: asset.riskColor }}>
                          Risk: {asset.risk}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#f0fdf4] text-[#2d6a4f]">
                          {asset.return} p.a.
                        </span>
                      </div>

                      <AnimatePresence>
                        {expanded === asset.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-gray-500 mb-4 p-3 rounded-xl bg-gray-50 leading-relaxed">{asset.details}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setExpanded(expanded === asset.name ? null : asset.name);
                            if (!learned.includes(asset.name)) setLearned(prev => [...prev, asset.name]);
                          }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-1"
                        >
                          {expanded === asset.name ? "Show Less" : "Learn More"}
                          <ChevronDown size={14} className={`transition-transform ${expanded === asset.name ? "rotate-180" : ""}`} />
                        </button>
                        <button
                          onClick={() => window.location.href = "/scenarios"}
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-1"
                          style={{ backgroundColor: asset.accent }}
                        >
                          Try Scenario <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                  <h2 className="text-xl font-black text-gray-900">Asset Class Comparison</h2>
                  <p className="text-sm text-gray-400 mt-1">Side-by-side comparison of all asset classes</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Class</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Risk Level</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected Return</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Min. Investment</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Liquidity</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tax Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {assets.map((asset) => (
                        <tr key={asset.name} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{asset.emoji}</span>
                              <span className="text-sm font-bold text-gray-900">{asset.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: asset.riskBg, color: asset.riskColor }}>
                              {asset.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-black text-gray-900">{asset.return}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-gray-600">{asset.minInvestment}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-gray-600">{asset.liquidity}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">{asset.taxBenefit}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {assets.map((asset, i) => (
                <motion.div
                  key={asset.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: asset.grad }}>
                      {asset.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-black text-gray-900">{asset.name}</h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: asset.riskBg, color: asset.riskColor }}>
                          {asset.risk} Risk
                        </span>
                        {learned.includes(asset.name) && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f0fdf4] text-[#2d6a4f]">✓ Learned</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{asset.details}</p>
                    </div>
                    <button
                      onClick={() => {
                        setExpanded(expanded === asset.name ? null : asset.name);
                        if (!learned.includes(asset.name)) setLearned(prev => [...prev, asset.name]);
                      }}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{ backgroundColor: expanded === asset.name ? asset.accent : "#f3f4f6", color: expanded === asset.name ? "white" : "#374151" }}
                    >
                      {expanded === asset.name ? "Read Less" : "Read More"}
                    </button>
                  </div>
                  <AnimatePresence>
                    {expanded === asset.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Expected Return</p><p className="text-sm font-black text-gray-900">{asset.return}</p></div>
                          <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Min. Investment</p><p className="text-sm font-black text-gray-900">{asset.minInvestment}</p></div>
                          <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Liquidity</p><p className="text-sm font-black text-gray-900">{asset.liquidity}</p></div>
                          <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tax Benefit</p><p className="text-sm font-black text-gray-900">{asset.taxBenefit}</p></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </div>
  );
}
