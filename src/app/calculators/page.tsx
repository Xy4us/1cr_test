"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Car, TrendingUp, Layers, Clock, Settings2 } from "lucide-react";
import { 
    LoanCalcComponent, 
    SIPCalcComponent, 
    LumpsumCalcComponent, 
    FutureValueCalcComponent 
} from "@/components/calculators/tab-components";

const TABS = [
    { id: "home-loan", label: "Home Loan", icon: Home, component: <LoanCalcComponent type="home" /> },
    { id: "car-loan", label: "Car Loan", icon: Car, component: <LoanCalcComponent type="car" /> },
    { id: "sip", label: "SIP Investment", icon: TrendingUp, component: <SIPCalcComponent /> },
    { id: "lumpsum", label: "Lumpsum", icon: Layers, component: <LumpsumCalcComponent /> },
    { id: "future-value", label: "Future Value", icon: Clock, component: <FutureValueCalcComponent /> },
];

export default function CalculatorsPage() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col">
            {/* Header / Nav Section */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <Settings2 className="text-[#2d6a4f]" size={24} />
                            Financial Command Center
                        </h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                            Professional Planning Tools
                        </p>
                    </div>

                    <nav className="flex items-center gap-1 p-1 bg-gray-50 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                                        ${isActive 
                                            ? "bg-[#2d6a4f] text-white shadow-lg shadow-green-900/20" 
                                            : "text-gray-500 hover:text-gray-900 hover:bg-white"
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 md:p-10 lg:p-16 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-16 lg:p-20 shadow-2xl shadow-green-900/5 border border-white"
                    >
                        {TABS.find(t => t.id === activeTab)?.component}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer space reduction / Fine-tuning */}
            <footer className="py-8 px-6 text-center">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                    1CR Club &copy; 2026 • Advanced Wealth Engineering
                </p>
            </footer>
        </div>
    );
}
