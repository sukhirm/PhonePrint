"use client";

import React, { useState, useMemo } from "react";
import type { SurveyResponse, BudgetRange } from "@/types/survey";
import { BUDGET_RANGES, SMARTPHONE_FEATURES } from "@/types/survey";
import { calculateCombinations, calculatePermutations } from "@/lib/math/combinations";

interface PriceFeatureCombinatoricsInfographicProps {
  responses: readonly SurveyResponse[];
}

export function PriceFeatureCombinatoricsInfographic({
  responses,
}: PriceFeatureCombinatoricsInfographicProps) {
  const [selectedTier, setSelectedTier] = useState<BudgetRange>("₹30,000 - ₹60,000");

  // Combinatorics constants
  const totalCombinations = calculateCombinations(SMARTPHONE_FEATURES.length, 3); // C(7,3) = 35
  const totalPermutations = calculatePermutations(SMARTPHONE_FEATURES.length, 3); // P(7,3) = 210

  // Aggregate data by budget tier
  const tierAnalytics = useMemo(() => {
    return BUDGET_RANGES.map((tier) => {
      const tierResponses = responses.filter((r) => r.budget_range === tier);
      const count = tierResponses.length;
      const share = responses.length > 0 ? Math.round((count / responses.length) * 100) : 0;

      // Feature frequency in this tier
      const featureCounts: Record<string, number> = {};
      tierResponses.forEach((r) => {
        r.preferred_features.forEach((f) => {
          featureCounts[f] = (featureCounts[f] || 0) + 1;
        });
      });

      const topFeatures = Object.entries(featureCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([feature, c]) => ({
          feature,
          count: c,
          pct: count > 0 ? Math.round((c / count) * 100) : 0,
        }));

      // Unique triplets observed in this tier
      const uniqueTriplets = new Set(
        tierResponses.map((r) => [...r.preferred_features].sort().join(" + "))
      );

      return {
        tier,
        count,
        share,
        topFeatures,
        observedTripletsCount: uniqueTriplets.size,
        coveragePct: Math.round((uniqueTriplets.size / totalCombinations) * 100),
      };
    });
  }, [responses, totalCombinations]);

  const activeTierData =
    tierAnalytics.find((t) => t.tier === selectedTier) ?? tierAnalytics[0] ?? {
      tier: selectedTier,
      count: 0,
      share: 0,
      topFeatures: [],
      observedTripletsCount: 0,
      coveragePct: 0,
    };

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-6">
      {/* Infographic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-emerald-800">
              Price-Feature Matrix
            </span>
          </div>
          <h3 className="text-xl font-heading font-extrabold text-[#1C1B18] tracking-tight mt-1">
            Price Range vs. Feature Combinations &amp; Permutations
          </h3>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Empirical mapping of student budget thresholds to discrete feature triplets $C(7,3)=35$ and ordered sequences $P(7,3)=210$.
          </p>
        </div>

        {/* Global Discrete Math Formula Pills */}
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-[#FBF9F4] border border-[#EAE3D5] px-3.5 py-1.5 text-center">
            <span className="block text-[10px] font-sora font-medium text-stone-500">Unordered Triplets</span>
            <span className="font-sora text-xs font-bold text-[#1C1B18]">C(7,3) = {totalCombinations}</span>
          </div>
          <div className="rounded-xl bg-[#FBF9F4] border border-[#EAE3D5] px-3.5 py-1.5 text-center">
            <span className="block text-[10px] font-sora font-medium text-stone-500">Ordered Rankings</span>
            <span className="font-sora text-xs font-bold text-stone-800">P(7,3) = {totalPermutations}</span>
          </div>
        </div>
      </div>

      {/* Tier Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tierAnalytics.map((item) => {
          const isSelected = item.tier === selectedTier;
          return (
            <button
              key={item.tier}
              type="button"
              onClick={() => setSelectedTier(item.tier)}
              className={`rounded-2xl p-4 text-left transition-all duration-200 border ${
                isSelected
                  ? "bg-[#1C1B18] text-white shadow-xs border-[#1C1B18]"
                  : "bg-[#FBF9F4] hover:bg-[#F5F1E8] text-stone-700 border-[#EAE3D5]"
              }`}
            >
              <span className={`block font-sora text-[11px] font-semibold ${isSelected ? "text-stone-300" : "text-stone-500"}`}>
                {item.tier}
              </span>
              <div className="mt-1 flex items-baseline justify-between">
                <span className={`font-heading text-xl font-bold ${isSelected ? "text-white" : "text-[#1C1B18]"}`}>
                  {item.count} <span className="text-xs font-normal opacity-80">students</span>
                </span>
                <span className={`font-sora text-xs font-semibold ${isSelected ? "text-stone-200" : "text-stone-600"}`}>
                  {item.share}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Infographic Panel for Active Tier */}
      <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-sora text-[11px] font-bold text-stone-600 uppercase tracking-wide">
              Active Tier Focus: {activeTierData.tier}
            </span>
            <h4 className="text-base font-heading font-extrabold text-[#1C1B18] mt-0.5">
              Feature Frequency &amp; Triplet Space Coverage
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 font-sora text-xs font-semibold text-stone-700 border border-[#EAE3D5]">
              {activeTierData.observedTripletsCount} Unique Triplets Observed
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-sora text-xs font-semibold text-stone-700 border border-[#EAE3D5]">
              {activeTierData.coveragePct}% Space Coverage
            </span>
          </div>
        </div>

        {/* Feature Rank Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeTierData.topFeatures.map((f, i) => (
            <div
              key={f.feature}
              className="rounded-xl border border-[#EAE3D5] bg-white p-4 space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-sora text-[10px] font-bold text-stone-400">
                  RANK #{i + 1}
                </span>
                <span className="font-sora text-xs font-bold text-stone-800">
                  {f.pct}% Frequency
                </span>
              </div>
              <div className="font-heading text-sm font-bold text-[#1C1B18]">
                {f.feature}
              </div>
              <div className="w-full bg-[#F5F1E8] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#1C1B18] h-full rounded-full"
                  style={{ width: `${f.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
