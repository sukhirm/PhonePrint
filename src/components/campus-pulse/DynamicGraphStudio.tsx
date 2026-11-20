"use client";

import React, { useState, useMemo } from "react";
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
import type { SurveyResponse } from "@/types/survey";
import { BUDGET_RANGES, SMARTPHONE_BRANDS, SMARTPHONE_FEATURES } from "@/types/survey";

interface DynamicGraphStudioProps {
  responses: readonly SurveyResponse[];
}

export function DynamicGraphStudio({ responses }: DynamicGraphStudioProps) {
  const [selectedBudget, setSelectedBudget] = useState<string>("ALL");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");

  // Filter responses based on active user tweaks
  const filteredResponses = useMemo(() => {
    return responses.filter((r) => {
      const budgetMatch = selectedBudget === "ALL" || r.budget_range === selectedBudget;
      const brandMatch = selectedBrand === "ALL" || r.preferred_brand === selectedBrand;
      return budgetMatch && brandMatch;
    });
  }, [responses, selectedBudget, selectedBrand]);

  // Recalculate feature frequency for the filtered subset
  const featureDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    SMARTPHONE_FEATURES.forEach((f) => {
      counts[f] = 0;
    });

    filteredResponses.forEach((r) => {
      r.preferred_features.forEach((f) => {
        counts[f] = (counts[f] || 0) + 1;
      });
    });

    return SMARTPHONE_FEATURES.map((feature) => {
      const count = counts[feature] || 0;
      const pct =
        filteredResponses.length > 0
          ? Math.round((count / filteredResponses.length) * 100)
          : 0;
      return {
        feature,
        count,
        pct,
      };
    }).sort((a, b) => b.count - a.count);
  }, [filteredResponses]);

  // Recalculate brand distribution for the filtered subset
  const brandDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResponses.forEach((r) => {
      counts[r.preferred_brand] = (counts[r.preferred_brand] || 0) + 1;
    });

    return SMARTPHONE_BRANDS.map((brand) => {
      const count = counts[brand] || 0;
      const pct =
        filteredResponses.length > 0
          ? Math.round((count / filteredResponses.length) * 100)
          : 0;
      return { brand, count, pct };
    }).filter((b) => b.count > 0).sort((a, b) => b.count - a.count);
  }, [filteredResponses]);

  // Unique triplets observed in the active filtered subset
  const uniqueTripletsCount = useMemo(() => {
    const set = new Set(
      filteredResponses.map((r) => [...r.preferred_features].sort().join("+"))
    );
    return set.size;
  }, [filteredResponses]);

  // Dynamic Mathematical Interpretation narrative based on current tweak
  const dynamicInsight = useMemo(() => {
    if (filteredResponses.length === 0) {
      return "No respondents match this exact combination. In discrete mathematics, this represents an empty partition or void region in the sample space.";
    }

    if (selectedBudget === "Above ₹60,000") {
      return `In the flagship tier (Above ₹60,000, N=${filteredResponses.length}), Camera Quality reaches ${featureDistribution.find((f) => f.feature === "Camera Quality")?.pct}% demand. The combination subspace collapses into high-end optics and premium builds.`;
    }

    if (selectedBudget === "Under ₹15,000") {
      return `In the budget tier (Under ₹15,000, N=${filteredResponses.length}), Battery Life is prioritized by ${featureDistribution.find((f) => f.feature === "Battery Life")?.pct}% of students. Processing Performance and Display take a back seat to battery endurance.`;
    }

    if (selectedBrand === "Apple") {
      return `Across Apple users (N=${filteredResponses.length}), ${featureDistribution[0]?.feature} is the dominant priority at ${featureDistribution[0]?.pct}%, reflecting ecosystem alignment and high hardware expectations.`;
    }

    if (selectedBrand === "Xiaomi") {
      return `Across Xiaomi users (N=${filteredResponses.length}), Battery Life and Storage dominate the combinatorial vectors, demonstrating maximum hardware-to-price utility.`;
    }

    return `Across all ${filteredResponses.length} filtered students, ${featureDistribution[0]?.feature} leads at ${featureDistribution[0]?.pct}%, followed by ${featureDistribution[1]?.feature} at ${featureDistribution[1]?.pct}%. Together they formed ${uniqueTripletsCount} distinct feature triplets out of C(7,3)=35 possible.`;
  }, [filteredResponses, selectedBudget, selectedBrand, featureDistribution, uniqueTripletsCount]);

  const resetFilters = () => {
    setSelectedBudget("ALL");
    setSelectedBrand("ALL");
  };

  const isFiltered = selectedBudget !== "ALL" || selectedBrand !== "ALL";

  return (
    <div id="dynamic-graphs" className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-8">
      {/* Studio Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-blue-700">
              Interactive Data Studio
            </span>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-sora text-[10px] font-bold text-blue-700 border border-blue-200">
              Live Tweakable Visualizations
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1C1B18] mt-1.5">
            Dynamic Graph Studio: Roll &amp; Tweak the Numbers
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
            Filter by budget intervals or smartphone brands. Watch the charts re-animate, recalculate percentages, and demonstrate mathematical shifts live.
          </p>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="self-start lg:self-auto rounded-full bg-[#F5F1E8] hover:bg-[#EAE3D5] text-[#1C1B18] px-4 py-1.5 text-xs font-sora font-semibold transition-colors border border-[#EAE3D5]"
          >
            Reset Filters &times;
          </button>
        )}
      </div>

      {/* Interactive Tweak Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#FBF9F4] border border-[#EAE3D5]">
        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="font-sora text-xs font-bold text-stone-700 uppercase tracking-wide block">
            1. Tweak Budget Tier Filter:
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedBudget("ALL")}
              className={`rounded-full px-3 py-1 text-xs font-sora transition-all ${
                selectedBudget === "ALL"
                  ? "bg-[#1C1B18] text-white font-bold shadow-2xs"
                  : "bg-white text-stone-600 border border-[#EAE3D5] hover:bg-[#F5F1E8]"
              }`}
            >
              All Tiers ({responses.length})
            </button>
            {BUDGET_RANGES.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBudget(b)}
                className={`rounded-full px-3 py-1 text-xs font-sora transition-all ${
                  selectedBudget === b
                    ? "bg-[#1C1B18] text-white font-bold shadow-2xs"
                    : "bg-white text-stone-600 border border-[#EAE3D5] hover:bg-[#F5F1E8]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="space-y-2">
          <label className="font-sora text-xs font-bold text-stone-700 uppercase tracking-wide block">
            2. Tweak Brand Filter:
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedBrand("ALL")}
              className={`rounded-full px-3 py-1 text-xs font-sora transition-all ${
                selectedBrand === "ALL"
                  ? "bg-[#1C1B18] text-white font-bold shadow-2xs"
                  : "bg-white text-stone-600 border border-[#EAE3D5] hover:bg-[#F5F1E8]"
              }`}
            >
              All Brands ({responses.length})
            </button>
            {SMARTPHONE_BRANDS.filter((b) => b !== "Other").map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`rounded-full px-3 py-1 text-xs font-sora transition-all ${
                  selectedBrand === brand
                    ? "bg-[#1C1B18] text-white font-bold shadow-2xs"
                    : "bg-white text-stone-600 border border-[#EAE3D5] hover:bg-[#F5F1E8]"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Real-Time Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4">
          <span className="font-sora text-[10px] font-bold uppercase text-stone-500">
            Selected Sample
          </span>
          <div className="font-heading text-2xl font-extrabold text-[#1C1B18] mt-1">
            {filteredResponses.length} Students
          </div>
          <span className="font-sora text-xs text-stone-500 mt-0.5 block">
            {Math.round((filteredResponses.length / responses.length) * 100)}% of cohort
          </span>
        </div>

        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4">
          <span className="font-sora text-[10px] font-bold uppercase text-stone-500">
            #1 Prioritized Feature
          </span>
          <div className="font-heading text-xl font-extrabold text-[#1C1B18] mt-1 truncate">
            {featureDistribution[0]?.feature || "None"}
          </div>
          <span className="font-sora text-xs text-emerald-700 font-semibold mt-0.5 block">
            {featureDistribution[0]?.pct || 0}% choice frequency
          </span>
        </div>

        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4">
          <span className="font-sora text-[10px] font-bold uppercase text-stone-500">
            Observed Triplets
          </span>
          <div className="font-heading text-2xl font-extrabold text-[#1C1B18] mt-1">
            {uniqueTripletsCount} of 35
          </div>
          <span className="font-sora text-xs text-stone-500 mt-0.5 block">
            {Math.round((uniqueTripletsCount / 35) * 100)}% combinatorial coverage
          </span>
        </div>

        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F5] p-4">
          <span className="font-sora text-[10px] font-bold uppercase text-stone-500">
            Dominant Brand
          </span>
          <div className="font-heading text-xl font-extrabold text-[#1C1B18] mt-1 truncate">
            {brandDistribution[0]?.brand || "None"}
          </div>
          <span className="font-sora text-xs text-blue-700 font-semibold mt-0.5 block">
            {brandDistribution[0]?.count || 0} students ({brandDistribution[0]?.pct || 0}%)
          </span>
        </div>
      </div>

      {/* Dynamic Recharts Bar Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Dynamic Feature Frequency Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-[#EAE3D5] bg-white p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F5F1E8]">
            <div>
              <h3 className="font-heading text-base font-bold text-[#1C1B18]">
                Dynamic Feature Preference Ranking (Rolling)
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Real-time frequency of each canonical feature in the current selection
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-sora text-[11px] font-bold text-emerald-700 border border-emerald-200">
              Live Re-animating
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={featureDistribution}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F5F1E8" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 11, fill: "#78716C", fontFamily: "var(--font-sora), Sora, sans-serif" }}
                  axisLine={{ stroke: "#EAE3D5" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  width={160}
                  tick={{ fontSize: 11, fill: "#1C1B18", fontFamily: "var(--font-dm-sans), DM Sans, sans-serif", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: number) => [`${val}% of selected students`, "Frequency"]}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#EAE3D5",
                    borderRadius: "0.75rem",
                    boxShadow: "0 10px 25px -5px rgba(44,38,28,0.1)",
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="pct"
                  name="Frequency"
                  radius={[0, 6, 6, 0]}
                  maxBarSize={22}
                  isAnimationActive={true}
                  animationDuration={600}
                >
                  {featureDistribution.map((_, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={
                        index === 0
                          ? "#15803D"
                          : index < 3
                          ? "#1E3A8A"
                          : "#78716C"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Mathematical Takeaway Card */}
        <div className="rounded-2xl border border-[#EAE3D5] bg-[#FBF9F4] p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="font-sora text-xs font-bold text-blue-700 uppercase tracking-wide">
                Live Math Insight
              </span>
            </div>
            <h4 className="font-heading text-sm font-extrabold text-[#1C1B18]">
              Automated Mathematical Interpretation:
            </h4>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-2.5 bg-white p-4 rounded-xl border border-[#EAE3D5]">
              {dynamicInsight}
            </p>
          </div>

          <div className="rounded-xl border border-[#EAE3D5] bg-white p-3.5 space-y-2">
            <span className="font-sora text-[11px] font-bold text-stone-500 uppercase block">
              Current Active Subset:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs font-sora">
              <span className="rounded-md bg-[#F5F1E8] px-2 py-0.5 text-stone-800">
                Budget: {selectedBudget}
              </span>
              <span className="rounded-md bg-[#F5F1E8] px-2 py-0.5 text-stone-800">
                Brand: {selectedBrand}
              </span>
              <span className="rounded-md bg-emerald-50 text-emerald-800 px-2 py-0.5">
                N = {filteredResponses.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
