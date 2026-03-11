"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Plus, Car, Heart, Home, Plane, FileText, User, ChevronRight, AlertTriangle, Check } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

// --- Dummy Data ---
const DUMMY_POLICIES = [
  {
    id: "1",
    company: "HDFC ERGO",
    policyNumber: "HE-VEH-2024-001",
    type: "Vehicle",
    coverage: 1000000,
    premium: 2000,
    premiumFrequency: "annual",
    renewal: "Mar 2027",
    status: "active",
    icon: Car,
    color: "#3b82f6",
    bgColor: "#eff6ff",
    daysToRenewal: 368,
  },
  {
    id: "2",
    company: "Niva Bupa",
    policyNumber: "NB-HLT-2024-052",
    type: "Health",
    coverage: 10000000,
    premium: 7000,
    premiumFrequency: "annual",
    renewal: "Dec 2026",
    status: "active",
    icon: Heart,
    color: "#ef4444",
    bgColor: "#fef2f2",
    daysToRenewal: 270,
  },
  {
    id: "3",
    company: "LIC",
    policyNumber: "LIC-LIFE-2023-789",
    type: "Life",
    coverage: 50000000,
    premium: 15000,
    premiumFrequency: "annual",
    renewal: "May 2028",
    status: "active",
    icon: ShieldCheck,
    color: "#2d6a4f",
    bgColor: "#f0fdf4",
    daysToRenewal: 785,
  },
];

const FILTER_TABS = ["All", "Life", "Health", "Vehicle", "Home", "Travel", "Term"];

const formatRupee = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

export default function InsurancePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPolicies =
    activeFilter === "All"
      ? DUMMY_POLICIES
      : DUMMY_POLICIES.filter((p) => p.type === activeFilter);

  const totalCoverage = DUMMY_POLICIES.reduce((s, p) => s + p.coverage, 0);
  const totalPremium = DUMMY_POLICIES.reduce((s, p) => s + p.premium, 0);
  const activePolicies = DUMMY_POLICIES.filter((p) => p.status === "active").length;
  const expiringCount = DUMMY_POLICIES.filter((p) => p.daysToRenewal < 90).length;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <PageContainer size="wide" className="py-8 pb-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <ShieldCheck className="text-indigo-600" size={22} />
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Insurance & Protection</h1>
            </div>
            <p className="text-sm text-gray-400 font-medium ml-13">Manage your insurance policies and coverage</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-[#2d6a4f] hover:bg-[#245c43] transition-colors shadow-lg shadow-[#2d6a4f]/20">
            <Plus size={16} /> Add Policy
          </button>
        </div>

        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 mb-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Coverage</p>
              <p className="text-4xl font-black text-white">{formatRupee(totalCoverage)}</p>
              <div className="flex items-center gap-2 mt-2">
                <Check size={14} className="text-green-300" />
                <span className="text-sm text-white/70">Across {activePolicies} active policies</span>
              </div>
            </div>

            <div className="h-16 w-px bg-white/10 hidden md:block" />

            <div className="flex-1">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Annual Premium</p>
              <p className="text-4xl font-black text-white">₹{totalPremium.toLocaleString("en-IN")}</p>
              <p className="text-sm text-white/60 mt-2">₹{Math.round(totalPremium / 12).toLocaleString("en-IN")}/month equivalent</p>
            </div>

            <div className="h-16 w-px bg-white/10 hidden md:block" />

            <div className="flex-1">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Active Policies</p>
              <p className="text-4xl font-black text-white">{activePolicies}</p>
              {expiringCount > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <AlertTriangle size={14} className="text-yellow-300" />
                  <span className="text-sm text-yellow-300">{expiringCount} policy expiring soon</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Filter + Summary */}
          <div className="lg:w-64 shrink-0 space-y-4">
            {/* Filter Panel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Filter by Type</p>
              <div className="flex flex-col gap-1">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: activeFilter === tab ? "#f0fdf4" : "transparent",
                      color: activeFilter === tab ? "#2d6a4f" : "#6b7280",
                    }}
                  >
                    <span>{tab}</span>
                    {activeFilter === tab && <ChevronRight size={14} className="text-[#2d6a4f]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Coverage Breakdown</p>
              {DUMMY_POLICIES.map((policy) => {
                const Icon = policy.icon;
                return (
                  <div key={policy.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: policy.bgColor }}>
                      <Icon size={16} style={{ color: policy.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{policy.type}</p>
                      <p className="text-xs text-gray-400">{formatRupee(policy.coverage)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Policy Cards Grid */}
          <div className="flex-1 space-y-4">
            {filteredPolicies.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
                <ShieldCheck className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-xl font-black text-gray-900 mb-2">No {activeFilter} policies</p>
                <p className="text-gray-400 text-sm mb-6">Add your first {activeFilter.toLowerCase()} insurance policy to track it here.</p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-[#2d6a4f]">
                  <Plus size={15} /> Add Policy
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredPolicies.map((policy, i) => {
                  const Icon = policy.icon;
                  const isExpiringSoon = policy.daysToRenewal < 90;
                  return (
                    <motion.div
                      key={policy.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: policy.bgColor }}>
                            <Icon size={22} style={{ color: policy.color }} />
                          </div>
                          <div>
                            <h3 className="font-black text-gray-900 text-base">{policy.company}</h3>
                            <p className="text-xs text-gray-400 font-mono">{policy.policyNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isExpiringSoon && (
                            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200">
                              Expiring Soon
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-[#2d6a4f] border border-green-200">
                            {policy.status}
                          </span>
                        </div>
                      </div>

                      {/* Policy Details Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Coverage</p>
                          <p className="text-lg font-black text-gray-900">{formatRupee(policy.coverage)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Premium</p>
                          <p className="text-lg font-black text-gray-900">₹{policy.premium.toLocaleString("en-IN")}<span className="text-xs font-medium text-gray-400">/{policy.premiumFrequency}</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Type</p>
                          <p className="text-base font-bold text-gray-700">{policy.type}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Renewal</p>
                          <p className="text-base font-bold" style={{ color: isExpiringSoon ? "#f59e0b" : "#374151" }}>{policy.renewal}</p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                        <span className="text-xs text-gray-400">{policy.daysToRenewal} days until renewal</span>
                        <button className="text-xs font-bold text-[#2d6a4f] hover:underline flex items-center gap-1">
                          View Details <ChevronRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
