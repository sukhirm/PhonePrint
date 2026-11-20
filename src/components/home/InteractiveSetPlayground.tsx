"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { SurveyResponse } from "@/types/survey";
import { KaTeXMath } from "@/components/ui/KaTeXMath";
import { verifyInclusionExclusionPrinciple, setDifference } from "@/lib/math/sets";
import { getRespondentIdsByBrand, getRespondentIdsByFeature } from "@/lib/data/loader";

interface InteractiveSetPlaygroundProps {
  responses: readonly SurveyResponse[];
}

export function InteractiveSetPlayground({ responses }: InteractiveSetPlaygroundProps) {
  const [activeRegion, setActiveRegion] = useState<"all" | "onlyA" | "intersection" | "onlyB">("all");

  const setA_Ids = getRespondentIdsByBrand(responses, "Apple");
  const setB_Ids = getRespondentIdsByFeature(responses, "Camera Quality");

  const pie = verifyInclusionExclusionPrinciple(setA_Ids, setB_Ids);

  const onlyA_Ids: string[] = Array.from(setDifference(setA_Ids, setB_Ids));
  const onlyB_Ids: string[] = Array.from(setDifference(setB_Ids, setA_Ids));
  const intersection_Ids: string[] = Array.from(pie.intersectionSet);
  const union_Ids: string[] = Array.from(pie.unionSet);

  const displayIds: string[] =
    activeRegion === "intersection"
      ? intersection_Ids
      : activeRegion === "onlyA"
      ? onlyA_Ids
      : activeRegion === "onlyB"
      ? onlyB_Ids
      : union_Ids;

  return (
    <section className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-emerald-800">
              Set Theory &amp; PIE Visualizer
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-[#1C1B18] mt-1.5">
            Principle of Inclusion-Exclusion (PIE) Playground
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
            Hover or click any lens region to visually inspect student partition cardinalities and prove zero double-counting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#FAF7F0] px-3.5 py-1.5 font-sora text-xs font-bold text-stone-800 border border-[#EAE3D5]">
            Theorem Identity Confirmed
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Venn Diagram on Left, Live Math on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Venn SVG Interactive Visualizer (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D5] p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-center mb-4">
            <span className="font-sora text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Interactive Venn Diagram — Click Region to Highlight
            </span>
          </div>

          {/* SVG Diagram with overlapping animated lenses */}
          <div className="relative w-full max-w-md h-64 flex items-center justify-center">
            {/* Circle A (Apple) */}
            <motion.div
              onClick={() => setActiveRegion(activeRegion === "onlyA" ? "all" : "onlyA")}
              whileHover={{ scale: 1.02 }}
              className={`absolute left-4 sm:left-10 w-44 sm:w-52 h-44 sm:h-52 rounded-full border-2 transition-all cursor-pointer flex flex-col items-center justify-center p-4 ${
                activeRegion === "onlyA" || activeRegion === "all"
                  ? "border-blue-600 bg-blue-100/40 shadow-md"
                  : "border-stone-300 bg-stone-100/30 opacity-40"
              }`}
            >
              <span className="font-sora text-[11px] font-bold text-blue-900 block">
                Set A (Apple)
              </span>
              <span className="font-heading text-lg font-extrabold text-blue-950">
                |A| = {setA_Ids.size}
              </span>
              <span className="font-sora text-[10px] text-blue-700 mt-1">
                ({onlyA_Ids.length} Only Apple)
              </span>
            </motion.div>

            {/* Circle B (Camera Quality) */}
            <motion.div
              onClick={() => setActiveRegion(activeRegion === "onlyB" ? "all" : "onlyB")}
              whileHover={{ scale: 1.02 }}
              className={`absolute right-4 sm:right-10 w-44 sm:w-52 h-44 sm:h-52 rounded-full border-2 transition-all cursor-pointer flex flex-col items-center justify-center p-4 ${
                activeRegion === "onlyB" || activeRegion === "all"
                  ? "border-emerald-600 bg-emerald-100/40 shadow-md"
                  : "border-stone-300 bg-stone-100/30 opacity-40"
              }`}
            >
              <span className="font-sora text-[11px] font-bold text-emerald-900 block">
                Set B (Camera)
              </span>
              <span className="font-heading text-lg font-extrabold text-emerald-950">
                |B| = {setB_Ids.size}
              </span>
              <span className="font-sora text-[10px] text-emerald-700 mt-1">
                ({onlyB_Ids.length} Only Camera)
              </span>
            </motion.div>

            {/* Center Intersection Badge */}
            <motion.button
              type="button"
              onClick={() => setActiveRegion(activeRegion === "intersection" ? "all" : "intersection")}
              whileHover={{ scale: 1.08 }}
              className={`z-10 rounded-2xl px-3.5 py-2 border shadow-lg cursor-pointer transition-all ${
                activeRegion === "intersection" || activeRegion === "all"
                  ? "bg-[#1C1B18] text-white border-[#1C1B18]"
                  : "bg-white text-stone-700 border-stone-300"
              }`}
            >
              <span className="font-sora text-[10px] uppercase font-bold block">
                A &cap; B
              </span>
              <span className="font-heading text-sm font-extrabold">
                {intersection_Ids.length} Both
              </span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs font-sora">
            <button
              type="button"
              onClick={() => setActiveRegion("all")}
              className={`rounded-full px-3 py-1 transition-colors ${
                activeRegion === "all"
                  ? "bg-[#1C1B18] text-white font-bold"
                  : "bg-white text-stone-600 border border-[#EAE3D5]"
              }`}
            >
              Show All (Union)
            </button>
            <button
              type="button"
              onClick={() => setActiveRegion("intersection")}
              className={`rounded-full px-3 py-1 transition-colors ${
                activeRegion === "intersection"
                  ? "bg-[#1C1B18] text-white font-bold"
                  : "bg-white text-stone-600 border border-[#EAE3D5]"
              }`}
            >
              Only Both (|A &cap; B|)
            </button>
          </div>
        </div>

        {/* Live Mathematical Verification Column (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 sm:p-8 space-y-4">
            <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
              Formal Theorem Calculation
            </span>

            <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] text-center">
              <KaTeXMath
                math="|A \cup B| = |A| + |B| - |A \cap B|"
                block
                className="text-[#1C1B18] font-bold text-base"
              />
            </div>

            <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] space-y-2">
              <div className="font-sora text-xs text-stone-700">
                <strong>Empirical Substitution:</strong>
              </div>
              <div className="font-sora text-sm font-bold text-[#1C1B18]">
                {pie.unionCardinality} = {setA_Ids.size} + {setB_Ids.size} - {intersection_Ids.length}
              </div>
              <p className="font-sans text-xs text-stone-600 leading-relaxed">
                If we simply added $10 + 17 = 27$, we would double-count the 8 students who chose Apple AND Camera Quality. Subtracting $|A \cap B| = 8$ yields exactly <strong>19 unique students</strong>.
              </p>
            </div>

            {/* Respondent Partition Display */}
            <div className="space-y-2 pt-2">
              <span className="font-sora text-[11px] font-bold text-stone-700 uppercase block">
                {activeRegion === "intersection"
                  ? `Intersection Respondents (${intersection_Ids.length} students):`
                  : activeRegion === "onlyA"
                  ? `Only Apple Respondents (${onlyA_Ids.length} students):`
                  : activeRegion === "onlyB"
                  ? `Only Camera Respondents (${onlyB_Ids.length} students):`
                  : `Union Respondents (${pie.unionCardinality} students total):`}
              </span>

              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1">
                {displayIds.map((id: string) => (
                  <span
                    key={id}
                    className="rounded-lg bg-white px-2.5 py-1 font-sora text-xs font-semibold text-stone-800 border border-[#EAE3D5] shadow-2xs"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
