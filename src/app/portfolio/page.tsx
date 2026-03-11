"use client";

import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PortfolioOverview } from "@/components/portfolio/PortfolioOverview";
import { NetWorthTrendChart } from "@/components/portfolio/NetWorthTrendChart";
import { AllocationCharts } from "@/components/portfolio/AllocationCharts";
import { AssetTable } from "@/components/portfolio/AssetTable";
import { LiabilityTable } from "@/components/portfolio/LiabilityTable";
import { DUMMY_ASSETS, DUMMY_LIABILITIES, sumAssets, sumLiabilities } from "@/lib/portfolio";

export default function PortfolioPage() {
  // We use the dummy data for now to provide a rich visual experience as requested
  const totalAssets = sumAssets(DUMMY_ASSETS);
  const totalLiabilities = sumLiabilities(DUMMY_LIABILITIES);

  return (
    <PageContainer size="wide" className="pb-8">
      <div className="flex flex-col gap-6">
        {/* Page Header Insight */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Portfolio Insights</h1>
            <p className="text-sm font-bold text-gray-400">Comprehensive analysis of your wealth and liabilities</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 py-1.5 bg-gray-50 rounded-lg">Last Updated: Just Now</span>
          </div>
        </div>

        {/* 1. PORTFOLIO OVERVIEW METRICS */}
        <div className="w-full">
          <PortfolioOverview 
            totalAssets={totalAssets} 
            totalLiabilities={totalLiabilities} 
          />
        </div>

        {/* 2. NET WORTH TREND CHART */}
        <div className="w-full">
          <NetWorthTrendChart />
        </div>

        {/* 3. ALLOCATION CHARTS (DONUTS) */}
        <div className="w-full">
          <AllocationCharts />
        </div>

        {/* 4. ASSETS TABLE */}
        <div className="w-full">
          <AssetTable assets={DUMMY_ASSETS} />
        </div>

        {/* 5. LIABILITIES TABLE */}
        <div className="w-full">
          <LiabilityTable liabilities={DUMMY_LIABILITIES} />
        </div>
      </div>
    </PageContainer>
  );
}
