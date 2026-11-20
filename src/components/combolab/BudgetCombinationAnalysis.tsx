"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import {
  BUDGET_RANGES,
  type BudgetRange,
} from "@/types/survey";
import type { CombinationAnalyticsSummary, FeatureCombinationRecord } from "@/types/math";

export interface BudgetCombinationAnalysisProps {
  analytics: CombinationAnalyticsSummary;
  onSelectCombination?: (combination: FeatureCombinationRecord) => void;
}

export function BudgetCombinationAnalysis({
  analytics,
  onSelectCombination,
}: BudgetCombinationAnalysisProps) {
  const [activeBudget, setActiveBudget] = useState<BudgetRange>("₹15,000 - ₹30,000");

  const tierCohortSize = analytics.budgetCohortSizes[activeBudget] ?? 0;

  // Combinations observed in this budget tier
  const tierCombinations = useMemo(() => {
    return analytics.combinations
      .filter((combo) => combo.budgetBreakdown[activeBudget].count > 0)
      .sort(
        (a, b) =>
          b.budgetBreakdown[activeBudget].count -
          a.budgetBreakdown[activeBudget].count
      );
  }, [analytics.combinations, activeBudget]);

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Budget-Segmented Feature Combination Analysis
            </h3>
            <Badge variant="cobalt">Stratified Combinatorics</Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Comparing feature bundle choices across price sensitivity cohorts with rigorous denominator integrity
          </p>
        </div>
      </div>

      {/* Budget Tier Selector Tabs */}
      <div>
        <label className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block mb-2.5">
          Select Budget Segment:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BUDGET_RANGES.map((range) => {
            const count = analytics.budgetCohortSizes[range];
            const isActive = activeBudget === range;
            return (
              <button
                key={range}
                onClick={() => setActiveBudget(range)}
                className={`p-3.5 rounded-2xl border text-left transition-all shadow-2xs ${
                  isActive
                    ? "border-[#1C1B18] bg-white ring-2 ring-[#1C1B18]"
                    : "border-[#EAE3D5] bg-[#FAF8F5] hover:bg-white hover:border-[#1C1B18]"
                }`}
              >
                <span className="text-xs font-montserrat font-bold block text-[#1C1B18]">
                  {range}
                </span>
                <div className="flex items-center justify-between mt-1 text-[11px] font-sora">
                  <span className="text-[#78716C]">Cohort:</span>
                  <span
                    className={`font-extrabold ${
                      count > 0 ? "text-blue-700" : "text-[#A8A29E]"
                    }`}
                  >
                    {count} {count === 1 ? "resp." : "resps."}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 shadow-2xs">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
            Segment Sample Size (N_tier)
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-[#1C1B18]">
            {tierCohortSize}
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Strict denominator for within-budget percentages
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 shadow-2xs">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-blue-700 block">
            Distinct Combinations Observed
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-blue-700">
            {tierCombinations.length}
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Unique feature triplets in this price bracket
          </p>
        </div>

        <div className="rounded-2xl border border-[#1C1B18] bg-[#1C1B18] p-5 shadow-2xs text-white">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-stone-300 block">
            Full Cohort Share
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-[#FEF08A]">
            {analytics.totalRespondents > 0
              ? (
                  (tierCohortSize / analytics.totalRespondents) *
                  100
                ).toFixed(1)
              : 0}
            %
          </div>
          <p className="text-xs text-stone-300 mt-1 font-sans">
            {tierCohortSize} of {analytics.totalRespondents} total study participants
          </p>
        </div>
      </div>

      {/* Combinations Breakdown in Selected Tier */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
            Feature Combinations in {activeBudget}
          </h4>
          <span className="text-xs text-[#78716C] font-sora font-semibold bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE3D5]">
            Denominator = {tierCohortSize}
          </span>
        </div>

        {tierCohortSize === 0 ? (
          <div className="p-10 text-center rounded-2xl border border-dashed border-[#EAE3D5] bg-[#FAF8F5]">
            <p className="text-sm text-[#1C1B18] font-montserrat font-bold">
              No respondents in {activeBudget}
            </p>
            <p className="text-xs text-[#78716C] mt-1 font-sans">
              Within-tier percentage defaults to 0% with division-by-zero protection.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tierCombinations.map((combo) => {
              const tierMetrics = combo.budgetBreakdown[activeBudget];
              return (
                <div
                  key={combo.id}
                  onClick={() => onSelectCombination?.(combo)}
                  className="p-4 rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] hover:bg-white hover:border-[#1C1B18] cursor-pointer transition-all shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D5]/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sora text-xs font-bold text-[#1C1B18] bg-white px-2.5 py-0.5 rounded-full border border-[#EAE3D5]">
                        {combo.id}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {combo.features.map((f) => (
                          <span
                            key={f}
                            className="text-[11px] font-sora font-medium text-[#1C1B18] bg-white px-2 py-0.5 rounded-md border border-[#EAE3D5]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-sora text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {tierMetrics.percentageWithinBudget}% of Tier
                      </span>
                      <span className="font-sora text-[11px] font-semibold text-[#78716C] bg-white px-2.5 py-1 rounded-full border border-[#EAE3D5]">
                        {combo.observedPercentage}% Overall
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E] font-sans">
                    <div>
                      <span className="font-medium text-[#1C1B18]">
                        Within-Tier Calculation:
                      </span>{" "}
                      <span className="font-sora text-blue-700 font-bold">
                        {tierMetrics.count} / {tierCohortSize} respondents ={" "}
                        {tierMetrics.percentageWithinBudget}%
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-[#1C1B18]">
                        Full-Cohort Calculation:
                      </span>{" "}
                      <span className="font-sora text-[#78716C]">
                        {tierMetrics.count} / {analytics.totalRespondents} respondents ={" "}
                        {(
                          (tierMetrics.count / analytics.totalRespondents) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Methodological Alert on Subgroup Denominators */}
      <Callout variant="warning" title="Methodological Safeguard: Denominator Integrity">
        When analyzing sub-populations (such as budget tiers), reporting
        percentages requires using the specific stratum size (
        <KaTeXMath math="N_{\text{tier}}" />
        ) as the denominator. For instance, in the &quot;{activeBudget}&quot;
        segment, frequencies are divided by <KaTeXMath math={`N = ${tierCohortSize}`} />
        . With small subgroup samples, individual preferences produce larger percentage
        swings (e.g., 1 respondent ={" "}
        {tierCohortSize > 0
          ? ((1 / tierCohortSize) * 100).toFixed(1)
          : "0.0"}
        %). Subgroup percentages must never be confused with overall cohort
        proportions.
      </Callout>
    </div>
  );
}
