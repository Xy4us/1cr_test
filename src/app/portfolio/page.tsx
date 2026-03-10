"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieIcon,
  LayoutGrid,
  History,
  ShieldCheck,
  CreditCard,
  Home,
  Car,
  CircleDollarSign,
  Download
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  DUMMY_ASSETS,
  DUMMY_LIABILITIES,
  sumAssets,
  sumLiabilities,
  getNetWorthHistory,
  type Asset,
  type Liability,
  type Timeframe,
  CATEGORY_META,
  LIABILITY_META,
  AssetCategory,
  LiabilityCategory
} from "@/lib/portfolio";
import { PageContainer } from "@/components/layout/PageContainer";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const formatRupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function PortfolioPage() {
  const [assets, setAssets] = useState<Asset[]>(DUMMY_ASSETS);
  const [liabilities, setLiabilities] = useState<Liability[]>(DUMMY_LIABILITIES);
  const [timeframe, setTimeframe] = useState<Timeframe>("6M");
  const [activeTab, setActiveTab] = useState<"assets" | "liabilities">("assets");
  const [showAddModal, setShowAddModal] = useState(false);

  // Totals
  const totalAssets = useMemo(() => sumAssets(assets), [assets]);
  const totalLiabilities = useMemo(() => sumLiabilities(liabilities), [liabilities]);
  const netWorth = totalAssets - totalLiabilities;

  // Chart Data
  const chartData = useMemo(() =>
    getNetWorthHistory(assets, liabilities, timeframe),
    [assets, liabilities, timeframe]);

  // Form State
  const [assetForm, setAssetForm] = useState({ name: "", category: "stocks" as AssetCategory, value: "" });
  const [liabForm, setLiabForm] = useState({ name: "", category: "home_loan" as LiabilityCategory, value: "" });

  const handleAddAsset = () => {
    if (!assetForm.name || !assetForm.value) return;
    const newAsset: Asset = {
      id: Date.now().toString(),
      name: assetForm.name,
      category: assetForm.category,
      currentValue: parseFloat(assetForm.value),
      purchasePrice: parseFloat(assetForm.value) * 0.95,
      purchaseDate: new Date().toISOString().split('T')[0],
      liquid: true
    };
    setAssets(prev => [...prev, newAsset]);
    setShowAddModal(false);
    setAssetForm({ name: "", category: "stocks", value: "" });
    toast.success("Asset added to portfolio!");
  };

  const handleAddLiability = () => {
    if (!liabForm.name || !liabForm.value) return;
    const newLiab: Liability = {
      id: Date.now().toString(),
      name: liabForm.name,
      category: liabForm.category,
      currentBalance: parseFloat(liabForm.value),
      interestRate: 10,
      dueDate: "2025-12-31"
    };
    setLiabilities(prev => [...prev, newLiab]);
    setShowAddModal(false);
    setLiabForm({ name: "", category: "home_loan", value: "" });
    toast.success("Liability record created!");
  };

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <PageContainer className="py-10 space-y-10">

        {/* NEW PORTFOLIO HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Portfolio Analysis</h1>
            <p className="text-sm font-bold text-gray-400 mt-1">
              Current Net Worth: <span className="text-[#2d6a4f]">{formatRupee(netWorth)}</span>
            </p>
          </div>
          <Button
            variant="outline"
            className="h-14 px-8 rounded-2xl border-gray-100 font-black text-xs uppercase tracking-widest hover:bg-gray-50 flex items-center gap-2"
            onClick={() => toast.info("Report generation started...")}
          >
            <Download size={16} />
            Download Report
          </Button>
        </header>

        {/* HERO SECTION: Net Worth & Chart */}
        <section className="min-w-screen grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-50/30 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-green-50/50" />

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#2d6a4f] animate-pulse" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Total Net Worth</span>
                </div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
                  {formatRupee(netWorth)}
                </h1>
              </div>

              <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                {(["1M", "3M", "6M", "1Y"] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${timeframe === tf ? "bg-white text-[#2d6a4f] shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: 900 }}
                    formatter={(v: any) => formatRupee(Number(v))}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2d6a4f"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#2d6a4f] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-green-900/20">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <TrendingUp size={80} />
              </div>
              <p className="text-green-100/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Assets</p>
              <h2 className="text-3xl font-black mb-6">{formatRupee(totalAssets)}</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-green-200 bg-white/10 w-fit px-3 py-1.5 rounded-full">
                <ArrowUpRight size={14} />
                <span>+12.4% vs last month</span>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-sm">
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Liabilities</p>
              <h2 className="text-3xl font-black text-gray-900 mb-6">{formatRupee(totalLiabilities)}</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 w-fit px-3 py-1.5 rounded-full">
                <ArrowDownRight size={14} />
                <span>-2.1% debt reduced</span>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full h-20 bg-gray-900 rounded-[32px] flex items-center justify-center gap-3 text-white font-black hover:bg-black transition-all shadow-xl shadow-gray-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={18} />
              </div>
              Add New Record
            </button>
          </div>
        </section>

        {/* TABBED MANAGEMENT */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex gap-10">
              {(["assets", "liabilities"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? "text-[#2d6a4f]" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#2d6a4f] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeTab === "assets" ? (
                <>
                  {assets.map((asset) => (
                    <div key={asset.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                      <button
                        onClick={() => setAssets(prev => prev.filter(a => a.id !== asset.id))}
                        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Asset"
                      >
                        <History size={14} />
                      </button>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: CATEGORY_META[asset.category].color }}
                        >
                          <CircleDollarSign size={20} style={{ color: CATEGORY_META[asset.category].text }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{CATEGORY_META[asset.category].label}</p>
                          <h3 className="font-black text-gray-900 leading-tight">{asset.name}</h3>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-2xl font-black text-gray-900">{formatRupee(asset.currentValue)}</p>
                          <p className="text-[10px] font-bold text-[#2d6a4f]">+4.2% Growth</p>
                        </div>
                        <div className="w-10 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#2d6a4f]" style={{ width: '70%' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {liabilities.map((liab) => (
                    <div key={liab.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                      <button
                        onClick={() => setLiabilities(prev => prev.filter(l => l.id !== liab.id))}
                        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Liability"
                      >
                        <History size={14} />
                      </button>
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: LIABILITY_META[liab.category].color }}
                        >
                          {liab.category.includes('home') ? <Home size={20} style={{ color: LIABILITY_META[liab.category].text }} /> :
                            liab.category.includes('car') ? <Car size={20} style={{ color: LIABILITY_META[liab.category].text }} /> :
                              <CreditCard size={20} style={{ color: LIABILITY_META[liab.category].text }} />}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{LIABILITY_META[liab.category].label}</p>
                          <h3 className="font-black text-gray-900 leading-tight">{liab.name}</h3>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-2xl font-black text-red-600">{formatRupee(liab.currentBalance)}</p>
                          <p className="text-[10px] font-bold text-gray-400">Rate: {liab.interestRate}% p.a</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-red-50 border-t-red-500" style={{ transform: 'rotate(45deg)' }} />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

      </PageContainer>

      {/* ADD RECORD MODAL */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md rounded-[40px] border-none shadow-2xl p-10 bg-gray-50 opacity-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter mb-4">Add {activeTab === 'assets' ? 'Asset' : 'Liability'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Name</Label>
              <Input
                className="rounded-2xl border-gray-100 h-12 px-6 font-bold"
                placeholder={activeTab === 'assets' ? "e.g. Nifty 50 Fund" : "e.g. Home Loan"}
                value={activeTab === 'assets' ? assetForm.name : liabForm.name}
                onChange={(e) => activeTab === 'assets'
                  ? setAssetForm({ ...assetForm, name: e.target.value })
                  : setLiabForm({ ...liabForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-select" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</Label>
              <select
                id="category-select"
                title="Select Category"
                className="w-full h-12 rounded-2xl border border-gray-100 px-6 font-bold bg-white text-sm focus:ring-2 focus:ring-[#2d6a4f] outline-none"
                value={activeTab === 'assets' ? assetForm.category : liabForm.category}
                onChange={(e) => activeTab === 'assets'
                  ? setAssetForm({ ...assetForm, category: e.target.value as AssetCategory })
                  : setLiabForm({ ...liabForm, category: e.target.value as LiabilityCategory })}
              >
                {activeTab === 'assets' ? (
                  Object.entries(CATEGORY_META).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))
                ) : (
                  Object.entries(LIABILITY_META).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))
                )}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Value (₹)</Label>
              <Input
                type="number"
                className="rounded-2xl border-gray-100 h-12 px-6 font-bold"
                placeholder="0"
                value={activeTab === 'assets' ? assetForm.value : liabForm.value}
                onChange={(e) => activeTab === 'assets'
                  ? setAssetForm({ ...assetForm, value: e.target.value })
                  : setLiabForm({ ...liabForm, value: e.target.value })}
              />
            </div>

            <Button
              onClick={activeTab === 'assets' ? handleAddAsset : handleAddLiability}
              className="w-full h-14 bg-[#2d6a4f] rounded-2xl font-black text-white hover:bg-green-800 transition-all mt-4"
            >
              Add to Portfolio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
