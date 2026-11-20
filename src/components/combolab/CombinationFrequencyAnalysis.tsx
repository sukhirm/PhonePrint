"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { CombinationAnalyticsSummary, FeatureCombinationRecord } from "@/types/math";

export interface CombinationFrequencyAnalysisProps {
  analytics: CombinationAnalyticsSummary;
  onSelectCombination?: (combination: FeatureCombinationRecord) => void;
}

export function CombinationFrequencyAnalysis({
  analytics,
  onSelectCombination,
}: CombinationFrequencyAnalysisProps) {
  const {
    totalTheoreticalCombinations,
    totalObservedCombinations,
    totalUnobservedCombinations,
    totalRespondents,
    observedCombinations,
    mostCommonCombinations,
    leastCommonObservedCombinations,
  } = analytics;

  // Space coverage percentage
  const spaceCoveragePct = Number(
    ((totalObservedCombinations / totalTheoreticalCombinations) * 100).toFixed(1)
  );

  // Prepare chart data for observed combinations
  const chartData = observedCombinations.map((combo) => {
    // Short label for y-axis
    const shortNames = combo.features
      .map((f) => f.split(" ")[0])
      .join(" + ");
    return {
      id: combo.id,
      label: `${combo.id}: ${shortNames}`,
      fullLabel: combo.features.join(" • "),
      count: combo.observedCount,
      percentage: combo.observedPercentage,
      raw: combo,
    };
  });

  const maxCount = Math.max(...chartData.map((d) => d.count), 5);
  const xDomainMax = Math.ceil(maxCount * 1.15);

  return (
    <div className="space-y-6">
      {/* Top Level Metric Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-[#EAE3D5] bg-white p-5 shadow-xs">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
            Theoretical Space
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-[#1C1B18]">
            {totalTheoreticalCombinations}
          </div>
          <span className="text-xs text-[#78716C] font-sans mt-1 block">
            C(7, 3) available triplets
          </span>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-xs">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-emerald-800 block">
            Observed in Survey
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-emerald-900">
            {totalObservedCombinations}
          </div>
          <span className="text-xs text-emerald-800 font-semibold font-sora mt-1 block">
            {spaceCoveragePct}% space coverage
          </span>
        </div>

        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 shadow-xs">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] block">
            Unobserved Voids
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-[#78716C]">
            {totalUnobservedCombinations}
          </div>
          <span className="text-xs text-[#78716C] font-sans mt-1 block">
            {(100 - spaceCoveragePct).toFixed(1)}% unchosen combinations
          </span>
        </div>

        <div className="rounded-3xl border border-[#1C1B18] bg-[#1C1B18] p-5 shadow-xs text-white">
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-stone-300 block">
            Survey Cohort Size
          </span>
          <div className="mt-2 font-sora text-3xl font-extrabold text-[#FEF08A]">
            {totalRespondents}
          </div>
          <span className="text-xs text-stone-300 font-sans mt-1 block">
            Valid student survey records
          </span>
        </div>
      </div>

      {/* Frequency Distribution Chart Card */}
      <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
                Empirical Feature Triplet Frequency Ranking
              </h3>
              <Badge variant="lime">Distribution &amp; Ties</Badge>
            </div>
            <p className="text-xs text-[#78716C] mt-1 font-sans">
              Observed student frequency distribution across the {totalObservedCombinations} populated combinations
            </p>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="w-full h-88 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#EAE3D5"
              />
              <XAxis
                type="number"
                domain={[0, xDomainMax]}
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "#78716C", fontFamily: "Sora, sans-serif" }}
                axisLine={{ stroke: "#EAE3D5" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={200}
                tick={{ fontSize: 11, fill: "#1C1B18", fontFamily: "Sora, sans-serif", fontWeight: 600 }}
                axisLine={{ stroke: "#EAE3D5" }}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0]!.payload;
                    return (
                      <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 shadow-lg text-xs space-y-1.5 font-sans">
                        <div className="font-sora font-bold text-[#1C1B18] text-sm">
                          {item.id}
                        </div>
                        <div className="text-[#57534E] font-medium text-xs">
                          {item.fullLabel}
                        </div>
                        <div className="pt-2 border-t border-[#F5F1E8] flex items-center justify-between gap-4 font-sora">
                          <span className="text-[#78716C]">Frequency:</span>
                          <span className="font-extrabold text-blue-700">
                            {item.count} respondents ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                radius={[0, 6, 6, 0]}
                onClick={(entry) => onSelectCombination?.(entry.raw)}
                className="cursor-pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count >= 2 ? "#10B981" : "#3B82F6"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ranking Details & Tied Frequency Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Most Common Combinations */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
                Most Frequent Triplet(s)
              </span>
              <Badge variant="lime">
                {mostCommonCombinations.length > 1
                  ? `${mostCommonCombinations.length}-Way Tie`
                  : "Top Preference"}
              </Badge>
            </div>

            <div className="space-y-2">
              {mostCommonCombinations.map((combo) => (
                <div
                  key={combo.id}
                  onClick={() => onSelectCombination?.(combo)}
                  className="p-3 rounded-xl bg-white border border-emerald-200 text-xs cursor-pointer hover:border-emerald-400 transition-colors flex items-center justify-between shadow-2xs"
                >
                  <div>
                    <span className="font-sora font-bold text-[#1C1B18] block">
                      {combo.id}
                    </span>
                    <span className="text-[#57534E] text-[11px] font-sans">
                      {combo.features.join(", ")}
                    </span>
                  </div>
                  <span className="font-sora font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs">
                    {combo.observedCount} ({combo.observedPercentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Least Common Observed Combinations */}
          <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
                Infrequent Combinations
              </span>
              <Badge variant="default">
                {leastCommonObservedCombinations.length} Combinations Tied
              </Badge>
            </div>

            <p className="text-xs text-[#57534E] leading-relaxed font-sans">
              {leastCommonObservedCombinations.length} distinct feature triplets
              were selected by minority respondents in the cohort.
              These reflect diverse individual smartphone priorities across
              gaming, photography, and general use.
            </p>

            <div className="text-[11px] font-sora text-[#78716C]">
              IDs:{" "}
              {leastCommonObservedCombinations.map((c) => c.id).slice(0, 10).join(", ")}
              {leastCommonObservedCombinations.length > 10 ? "..." : ""}
            </div>
          </div>
        </div>

        {/* Academic & Methodological Disclaimer */}
        <Callout variant="info" title="Academic Note on Statistical Generalizability">
          In this university discrete mathematics study using a {totalRespondents}-respondent
          cohort, observed frequencies demonstrate combinatorial frequency distributions across the C(7, 3) = 35 parameter space.
          Unobserved combinations ({totalUnobservedCombinations} of {totalTheoreticalCombinations}) represent unchosen
          triplets in this sample rather than mathematically impossible feature pairings.
        </Callout>
      </div>
    </div>
  );
}
