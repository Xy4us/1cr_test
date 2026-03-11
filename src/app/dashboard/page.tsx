"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PageContainer } from "@/components/layout/PageContainer";
import { FinancialHealthScore } from "@/components/dashboard/FinancialHealthScore";
import { NetWorthSummary } from "@/components/dashboard/NetWorthSummary";
import { ActiveAlerts } from "@/components/dashboard/ActiveAlerts";
import { TopAssets } from "@/components/dashboard/TopAssets";
import { NetWorthGrowthChart } from "@/components/dashboard/NetWorthGrowthChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SecureYourFuture } from "@/components/dashboard/SecureYourFuture";
import { DUMMY_ASSETS, DUMMY_LIABILITIES, sumAssets, sumLiabilities } from "@/lib/portfolio";

import { GoalsProgress } from "@/components/dashboard/GoalsProgress";

export default function DashboardPage() {
  // Real data from store or dummy for now
  const goals = useSelector((state: RootState) => state.goals.items);

  // Calculating actual metrics from dummy data for now
  const totalAssets = sumAssets(DUMMY_ASSETS);
  const totalLiabilities = sumLiabilities(DUMMY_LIABILITIES);

  return (
    <PageContainer size="wide" className="pb-8">
      <div className="flex flex-col gap-4">
        {/* ROW 1: CORE METRICS */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="lg:flex-[3] min-w-0">
            <FinancialHealthScore />
          </div>
          <div className="lg:flex-[6] min-w-0">
            <NetWorthSummary
              totalAssets={totalAssets}
              totalLiabilities={totalLiabilities}
            />
          </div>
          <div className="lg:flex-[3] min-w-0">
            <ActiveAlerts />
          </div>
        </div>

        {/* ROW 2: QUICK ACTIONS (WIDE BAR) */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="w-full min-w-0">
            <QuickActions />
          </div>
        </div>

        {/* ROW 3: PERFORMANCE & GOALS */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="lg:flex-1 min-w-0">
            <TopAssets />
          </div>
          <div className="lg:flex-1 min-w-0">
            <GoalsProgress />
          </div>
        </div>

        {/* ROW 4: TRENDS & FUTURE */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="lg:flex-[9] min-w-0">
            <NetWorthGrowthChart />
          </div>
          <div className="lg:flex-[3] min-w-0">
            <SecureYourFuture />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
