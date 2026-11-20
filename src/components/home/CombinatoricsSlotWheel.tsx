"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SMARTPHONE_FEATURES, type SmartphoneFeature, type SurveyResponse } from "@/types/survey";
import { KaTeXMath } from "@/components/ui/KaTeXMath";

interface CombinatoricsSlotWheelProps {
  responses: readonly SurveyResponse[];
}

export function CombinatoricsSlotWheel({ responses }: CombinatoricsSlotWheelProps) {
  const [slot1, setSlot1] = useState<SmartphoneFeature>("Camera Quality");
  const [slot2, setSlot2] = useState<SmartphoneFeature>("Battery Life");
  const [slot3, setSlot3] = useState<SmartphoneFeature>("Processing Performance");
  const [isSpinning, setIsSpinning] = useState(false);

  const spinRandomTriplet = () => {
    setIsSpinning(true);
    // Pick 3 random distinct features
    const shuffled = [...SMARTPHONE_FEATURES].sort(() => 0.5 - Math.random());
    setTimeout(() => {
      setSlot1(shuffled[0]!);
      setSlot2(shuffled[1]!);
      setSlot3(shuffled[2]!);
      setIsSpinning(false);
    }, 450);
  };

  // Find respondents matching this exact triplet (unordered)
  const currentSet = new Set([slot1, slot2, slot3]);
  const matchingStudents = responses.filter((r) => {
    return r.preferred_features.every((f) => currentSet.has(f));
  });

  // Calculate combinations and permutations
  const allTriplets: string[][] = [];
  for (let i = 0; i < SMARTPHONE_FEATURES.length; i++) {
    for (let j = i + 1; j < SMARTPHONE_FEATURES.length; j++) {
      for (let k = j + 1; k < SMARTPHONE_FEATURES.length; k++) {
        allTriplets.push([
          SMARTPHONE_FEATURES[i]!,
          SMARTPHONE_FEATURES[j]!,
          SMARTPHONE_FEATURES[k]!,
        ]);
      }
    }
  }

  // Find index of current triplet in the 35 combinations universe
  const currentSorted = [slot1, slot2, slot3].sort();
  const tripletIndex = allTriplets.findIndex((t) => {
    const s = [...t].sort();
    return s[0] === currentSorted[0] && s[1] === currentSorted[1] && s[2] === currentSorted[2];
  }) + 1;

  return (
    <section id="wheel" className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-purple-800">
              Interactive Combinatorics Machine
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-[#1C1B18] mt-1.5">
            The Triplet Slot Generator: C(7,3) = 35 vs P(7,3) = 210
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
            Spin or manually select 3 features to see how discrete math structures calculate the combinatorial space and query real student survey records.
          </p>
        </div>

        <motion.button
          type="button"
          onClick={spinRandomTriplet}
          disabled={isSpinning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start lg:self-auto rounded-full bg-[#1C1B18] text-white hover:bg-black px-6 py-2.5 text-xs font-heading font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className={isSpinning ? "animate-spin" : ""}>🎰</span>
          <span>{isSpinning ? "Spinning..." : "Spin Random Triplet"}</span>
        </motion.button>
      </div>

      {/* 3 Physical Slot Reels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Slot 1 */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sora text-[10px] font-bold text-stone-500 uppercase">
              Slot #1
            </span>
            <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 font-sora text-[10px] font-bold">
              Feature A
            </span>
          </div>

          <div className="h-20 flex items-center justify-center rounded-2xl bg-white border border-[#EAE3D5] shadow-2xs p-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slot1}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-heading text-base font-extrabold text-[#1C1B18] text-center"
              >
                {slot1}
              </motion.div>
            </AnimatePresence>
          </div>

          <select
            value={slot1}
            onChange={(e) => setSlot1(e.target.value as SmartphoneFeature)}
            className="w-full rounded-xl border border-[#EAE3D5] bg-white px-3 py-2 text-xs font-sora text-stone-800 focus:outline-none"
          >
            {SMARTPHONE_FEATURES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Slot 2 */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sora text-[10px] font-bold text-stone-500 uppercase">
              Slot #2
            </span>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 font-sora text-[10px] font-bold">
              Feature B
            </span>
          </div>

          <div className="h-20 flex items-center justify-center rounded-2xl bg-white border border-[#EAE3D5] shadow-2xs p-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slot2}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-heading text-base font-extrabold text-[#1C1B18] text-center"
              >
                {slot2}
              </motion.div>
            </AnimatePresence>
          </div>

          <select
            value={slot2}
            onChange={(e) => setSlot2(e.target.value as SmartphoneFeature)}
            className="w-full rounded-xl border border-[#EAE3D5] bg-white px-3 py-2 text-xs font-sora text-stone-800 focus:outline-none"
          >
            {SMARTPHONE_FEATURES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Slot 3 */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sora text-[10px] font-bold text-stone-500 uppercase">
              Slot #3
            </span>
            <span className="rounded-full bg-purple-100 text-purple-800 px-2.5 py-0.5 font-sora text-[10px] font-bold">
              Feature C
            </span>
          </div>

          <div className="h-20 flex items-center justify-center rounded-2xl bg-white border border-[#EAE3D5] shadow-2xs p-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slot3}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-heading text-base font-extrabold text-[#1C1B18] text-center"
              >
                {slot3}
              </motion.div>
            </AnimatePresence>
          </div>

          <select
            value={slot3}
            onChange={(e) => setSlot3(e.target.value as SmartphoneFeature)}
            className="w-full rounded-xl border border-[#EAE3D5] bg-white px-3 py-2 text-xs font-sora text-stone-800 focus:outline-none"
          >
            {SMARTPHONE_FEATURES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Math & Survey Match Analysis Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Math Calculation Card */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Discrete Combinatorics Space
            </span>
            <span className="rounded-full bg-white px-3 py-1 font-sora text-xs font-bold text-[#1C1B18] border border-[#EAE3D5]">
              Triplet #{tripletIndex > 0 ? tripletIndex : 1} of 35
            </span>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] space-y-2">
            <p className="font-heading text-xs font-bold text-stone-800">
              Combinations C(7,3) vs Permutations P(7,3):
            </p>
            <div className="py-2 text-center">
              <KaTeXMath
                math="C(7,3) = \frac{7!}{3!(7-3)!} = 35 \quad \text{vs} \quad P(7,3) = \frac{7!}{(7-3)!} = 210"
                block
                className="text-xs font-semibold text-[#1C1B18]"
              />
            </div>
            <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
              In combinations (unordered device bundle), this constitutes <strong>1 unique outcome</strong> out of 35. If ranked (1st, 2nd, 3rd choice), this expands into <strong>3! = 6 distinct preference sequences</strong>.
            </p>
          </div>
        </div>

        {/* Live Survey Cohort Match Card */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="font-sora text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Live Survey Dataset Match (N=30)
            </span>
            <span className="rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 font-sora text-xs font-bold border border-emerald-200">
              {matchingStudents.length} Students Match
            </span>
          </div>

          {matchingStudents.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 font-sans">
                The following students in the empirical survey selected this exact combination:
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {matchingStudents.map((s) => (
                  <div
                    key={s.response_id}
                    className="rounded-xl border border-[#EAE3D5] bg-[#FAF8F5] p-3 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-sora font-bold text-[#1C1B18]">
                        {s.response_id}
                      </span>
                      <span className="rounded-md bg-white px-2 py-0.5 font-sora text-[10px] font-semibold text-stone-700 border border-[#EAE3D5]">
                        {s.preferred_brand}
                      </span>
                    </div>
                    <span className="font-sora text-stone-600 text-[11px]">
                      {s.budget_range}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#EAE3D5] p-6 text-center space-y-1">
              <span className="font-heading text-sm font-bold text-stone-700 block">
                Combinatorial Void in Sample
              </span>
              <p className="text-xs text-stone-500 font-sans max-w-sm mx-auto">
                No students in the 30-person survey selected this exact triplet. This demonstrates an unpopulated region in the discrete $C(7,3)=35$ choice space.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
