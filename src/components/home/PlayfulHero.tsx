"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SMARTPHONE_FEATURES, type SmartphoneFeature } from "@/types/survey";

interface PlayfulHeroProps {
  totalResponses: number;
}

export function PlayfulHero({ totalResponses }: PlayfulHeroProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<SmartphoneFeature[]>([
    "Camera Quality",
    "Battery Life",
    "Processing Performance",
  ]);

  const toggleFeature = (feature: SmartphoneFeature) => {
    if (selectedFeatures.includes(feature)) {
      if (selectedFeatures.length > 1) {
        setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
      }
    } else {
      if (selectedFeatures.length < 3) {
        setSelectedFeatures([...selectedFeatures, feature]);
      } else {
        // Shift out the first and add the new one
        setSelectedFeatures([...selectedFeatures.slice(1), feature]);
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#EAE3D5]/80 bg-gradient-to-b from-[#FAF7F0] via-[#FBF9F4] to-[#F5F1E8]/30">
      {/* Background Subtle Floating Grid Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, -6, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Playful Floating Stickers Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="cursor-default inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-[#FEF08A]/70 px-3.5 py-1 text-xs font-sora font-bold text-amber-950 shadow-2xs rotate-[-2deg]"
          >
            <span>✨</span>
            <span>C(7,3) = 35 Triplets</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="cursor-default inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-[#DCFCE7]/80 px-3.5 py-1 text-xs font-sora font-bold text-emerald-950 shadow-2xs rotate-[2deg]"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{totalResponses} Verified Students</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="cursor-default inline-flex items-center gap-2 rounded-full border border-purple-300/80 bg-[#F3E8FF]/80 px-3.5 py-1 text-xs font-sora font-bold text-purple-950 shadow-2xs rotate-[-1deg]"
          >
            <span>⚡</span>
            <span>P(7,3) = 210 Sequences</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="cursor-default inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-[#E0F2FE]/80 px-3.5 py-1 text-xs font-sora font-bold text-sky-950 shadow-2xs rotate-[3deg]"
          >
            <span>🎯</span>
            <span>Set Theory PIE Proof</span>
          </motion.div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-[#1C1B18] leading-[1.05]"
          >
            Where Student Desire Meets Discrete Math.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Can personal smartphone choice be mathematically modeled? We surveyed 30 university students to prove how real budget thresholds map to combinations $C(7,3)$, ordered permutations $P(7,3)$, and set partitions.
          </motion.p>
        </div>

        {/* Funky Interactive Feature Chooser Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 max-w-4xl mx-auto rounded-3xl border border-[#EAE3D5] bg-white p-5 sm:p-6 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F5F1E8]">
            <div>
              <span className="font-sora text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                Interactive Triplet Builder
              </span>
              <p className="font-heading text-sm font-bold text-[#1C1B18] mt-0.5">
                Pick any 3 features to generate your theoretical phone vector:
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#FAF7F0] px-3 py-1 font-sora text-xs font-semibold text-stone-700 border border-[#EAE3D5]">
                {selectedFeatures.length} of 3 Selected
              </span>
            </div>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap gap-2 pt-4">
            {SMARTPHONE_FEATURES.map((feature) => {
              const isSelected = selectedFeatures.includes(feature);
              return (
                <motion.button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-2xl px-4 py-2 text-xs font-sora transition-all duration-200 border flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#1C1B18] text-white border-[#1C1B18] shadow-xs font-bold"
                      : "bg-[#FBF9F4] text-stone-700 border-[#EAE3D5] hover:bg-[#F5F1E8] font-medium"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? "bg-amber-400" : "bg-stone-300"
                    }`}
                  />
                  <span>{feature}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic Combination Output Card */}
          <div className="mt-5 rounded-2xl bg-[#FAF7F0] p-4 border border-[#EAE3D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-sora text-[10px] font-bold text-stone-500 uppercase">
                Active Triplet Bundle
              </span>
              <div className="font-sora font-semibold text-[#1C1B18]">
                &#123; {selectedFeatures.join(" + ")} &#125;
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="block font-sora text-[10px] text-stone-500">Permutations</span>
                <span className="font-sora text-xs font-bold text-indigo-700">3! = 6 Rankings</span>
              </div>
              <a
                href="#dissection"
                className="rounded-full bg-white hover:bg-stone-100 text-[#1C1B18] px-4 py-1.5 font-heading text-xs font-bold border border-[#EAE3D5] shadow-2xs transition-colors"
              >
                Inspect on Chassis &darr;
              </a>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#dissection"
            className="rounded-full bg-[#1C1B18] text-white hover:bg-black px-6 py-3 text-xs font-heading font-semibold shadow-xs transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <span>Explore Phone Chassis Infographic</span>
            <span>&darr;</span>
          </a>
          <a
            href="#wheel"
            className="rounded-full bg-white hover:bg-[#F5F1E8] text-[#1C1B18] border border-[#EAE3D5] px-5 py-3 text-xs font-heading font-semibold shadow-2xs transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <span>Combinatorics Slot Machine</span>
            <span>&darr;</span>
          </a>
          <Link
            href="/my-phoneprint"
            className="rounded-full bg-[#F5F1E8] hover:bg-[#EAE3D5] text-stone-800 border border-[#EAE3D5] px-5 py-3 text-xs font-heading font-semibold transition-all flex items-center gap-2"
          >
            <span>Match With Cohort</span>
            <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
