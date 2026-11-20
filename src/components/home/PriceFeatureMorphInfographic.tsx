"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SurveyResponse, BudgetRange } from "@/types/survey";
import { BUDGET_RANGES, SMARTPHONE_FEATURES } from "@/types/survey";

interface PriceFeatureMorphInfographicProps {
  responses: readonly SurveyResponse[];
}

export function PriceFeatureMorphInfographic({ responses }: PriceFeatureMorphInfographicProps) {
  const [activeTier, setActiveTier] = useState<BudgetRange>("₹30,000 - ₹60,000");

  const tierPersonas: Record<BudgetRange, {
    title: string;
    archetype: string;
    stickerEmoji: string;
    stickerBg: string;
    stickerBorder: string;
    quote: string;
    dominantNeed: string;
  }> = {
    "Under ₹15,000": {
      title: "The Budget Pragmatist",
      archetype: "Endurance & Capacity",
      stickerEmoji: "🔋",
      stickerBg: "bg-emerald-100",
      stickerBorder: "border-emerald-300",
      quote: "I need a phone that never dies during full lecture days, with storage for all my course materials.",
      dominantNeed: "Battery Life (80%) + Storage (60%)",
    },
    "₹15,000 - ₹30,000": {
      title: "The Balanced Daily Driver",
      archetype: "Stability & Clean UX",
      stickerEmoji: "📱",
      stickerBg: "bg-blue-100",
      stickerBorder: "border-blue-300",
      quote: "Smooth software experience and reliable battery without spending premium money.",
      dominantNeed: "Balanced across Battery (67%), Software (50%), Camera (50%)",
    },
    "₹30,000 - ₹60,000": {
      title: "The Campus Powerhouse (Dominant 40%)",
      archetype: "Velocity & Gaming",
      stickerEmoji: "⚡",
      stickerBg: "bg-amber-100",
      stickerBorder: "border-amber-300",
      quote: "High-refresh screen and raw processing power for mobile gaming, split-screen multitasking, and entertainment.",
      dominantNeed: "Processing Performance (75%) + Display Quality (67%)",
    },
    "Above ₹60,000": {
      title: "The Flagship Creator",
      archetype: "Optics & Prestige",
      stickerEmoji: "✨",
      stickerBg: "bg-purple-100",
      stickerBorder: "border-purple-300",
      quote: "Top-tier photography for creative projects and a titanium premium build that feels luxurious in the hand.",
      dominantNeed: "Camera Quality (100% Saturation) + Build Quality (71%)",
    },
  };

  // Filter responses by current budget tier
  const tierResponses = useMemo(() => {
    return responses.filter((r) => r.budget_range === activeTier);
  }, [responses, activeTier]);

  // Calculate feature percentages in this tier
  const featureStats = useMemo(() => {
    const counts: Record<string, number> = {};
    SMARTPHONE_FEATURES.forEach((f) => (counts[f] = 0));

    tierResponses.forEach((r) => {
      r.preferred_features.forEach((f) => {
        counts[f] = (counts[f] || 0) + 1;
      });
    });

    return SMARTPHONE_FEATURES.map((feature) => {
      const count = counts[feature] || 0;
      const pct = tierResponses.length > 0 ? Math.round((count / tierResponses.length) * 100) : 0;
      return { feature, count, pct };
    }).sort((a, b) => b.pct - a.pct);
  }, [tierResponses]);

  const activePersona = tierPersonas[activeTier];

  return (
    <section className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-amber-900">
              Economic Demand Morphing
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-[#1C1B18] mt-1.5">
            Price Range vs. Feature Priority Shifts
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
            Drag or click through the price intervals. Watch how student priorities transition from battery survival to raw speed and optical luxury.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#FAF7F0] px-3.5 py-1.5 font-sora text-xs font-bold text-stone-800 border border-[#EAE3D5]">
            {tierResponses.length} Students in this Tier
          </span>
        </div>
      </div>

      {/* Tactile Tier Scrubber Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BUDGET_RANGES.map((tier) => {
          const isSelected = tier === activeTier;
          const count = responses.filter((r) => r.budget_range === tier).length;
          const pct = Math.round((count / responses.length) * 100);

          return (
            <motion.button
              key={tier}
              type="button"
              onClick={() => setActiveTier(tier)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-3xl p-5 text-left transition-all border ${
                isSelected
                  ? "bg-[#1C1B18] text-white border-[#1C1B18] shadow-md scale-[1.02]"
                  : "bg-[#FAF8F5] text-stone-700 border-[#EAE3D5] hover:bg-[#F5F1E8]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-sora text-[10px] uppercase font-bold ${isSelected ? "text-amber-300" : "text-stone-500"}`}>
                  {tierPersonas[tier].archetype}
                </span>
                <span className="text-sm">{tierPersonas[tier].stickerEmoji}</span>
              </div>
              <div className="mt-2 font-heading text-base font-extrabold">
                {tier}
              </div>
              <div className="mt-1 font-sora text-xs opacity-75">
                {count} students ({pct}%)
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Persona & Morphing Bar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Student Persona Sticker Card (5 cols) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5 rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 sm:p-8 space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-2xl ${activePersona.stickerBg} ${activePersona.stickerBorder} border px-3 py-1.5 text-2xl`}>
                {activePersona.stickerEmoji}
              </span>
              <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wider">
                Persona Profile
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-heading font-extrabold text-[#1C1B18]">
                {activePersona.title}
              </h3>
              <p className="font-sora text-xs font-semibold text-stone-600 mt-1">
                Dominant Need: <span className="text-[#1C1B18]">{activePersona.dominantNeed}</span>
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] shadow-2xs space-y-2">
              <span className="font-sora text-[10px] font-bold text-stone-400 uppercase">
                Student Rationale
              </span>
              <p className="font-sans text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                &ldquo;{activePersona.quote}&rdquo;
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] space-y-1 text-xs font-sora">
              <span className="text-[10px] font-bold text-stone-400 uppercase block">
                Combinatorial Implication
              </span>
              <p className="text-stone-700">
                In this tier, student preference vectors collapse into {new Set(tierResponses.map((r) => [...r.preferred_features].sort().join("+"))).size} distinct triplets of the 35 available.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Column: Morphing Feature Distribution Bars (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5F1E8]">
            <div>
              <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Priority Ranking in {activeTier}
              </span>
              <h4 className="font-heading text-base font-extrabold text-[#1C1B18] mt-0.5">
                Feature Selection Frequency
              </h4>
            </div>
            <span className="rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 font-sora text-xs font-bold border border-emerald-200">
              Live Morphing
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {featureStats.map((item, index) => (
              <div key={item.feature} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-sora">
                  <span className="font-medium text-stone-800 flex items-center gap-1.5">
                    <span className="font-bold text-stone-400 text-[10px]">#{index + 1}</span>
                    <span>{item.feature}</span>
                  </span>
                  <span className="font-bold text-[#1C1B18]">
                    {item.pct}% ({item.count} students)
                  </span>
                </div>
                <div className="w-full bg-[#FAF8F5] border border-[#EAE3D5] rounded-full h-3 overflow-hidden p-0.5">
                  <motion.div
                    className={`h-full rounded-full ${
                      index === 0
                        ? "bg-[#1C1B18]"
                        : index === 1
                        ? "bg-amber-600"
                        : index === 2
                        ? "bg-blue-600"
                        : "bg-stone-400"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
