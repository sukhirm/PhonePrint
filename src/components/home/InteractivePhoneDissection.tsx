"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SurveyResponse, SmartphoneFeature } from "@/types/survey";

interface InteractivePhoneDissectionProps {
  responses: readonly SurveyResponse[];
}

interface HardwareModule {
  id: SmartphoneFeature;
  title: string;
  hardwareName: string;
  badge: string;
  color: string;
  bgLight: string;
  borderLight: string;
  description: string;
  svgHighlightRegion: "camera" | "soc" | "battery" | "display" | "storage" | "os" | "frame";
}

const HARDWARE_MODULES: HardwareModule[] = [
  {
    id: "Camera Quality",
    title: "Camera Quality",
    hardwareName: "Tri-Lens Optical Sensor Module",
    badge: "57% of Campus",
    color: "#2563EB",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    description: "Chosen by 17 students. 100% saturation in the Flagship tier (Above ₹60,000). Students consider high-dynamic range photo capture essential for lectures and social media.",
    svgHighlightRegion: "camera",
  },
  {
    id: "Battery Life",
    title: "Battery Life",
    hardwareName: "5000mAh High-Density Anode Cell",
    badge: "67% of Campus",
    color: "#16A34A",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    description: "The #1 overall priority across the university (20 of 30 students). Dominates budget tiers (<₹15k) at 80% demand to ensure all-day campus survival without power banks.",
    svgHighlightRegion: "battery",
  },
  {
    id: "Processing Performance",
    title: "Processing Performance",
    hardwareName: "4nm Octa-Core SoC Silicon Engine",
    badge: "50% of Campus",
    color: "#EA580C",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-200",
    description: "15 students selected performance. Surges to 75% in the ₹30,000–₹60,000 range, driven by mobile gaming, heavy multitasking, and smooth high-fps rendering.",
    svgHighlightRegion: "soc",
  },
  {
    id: "Display Quality",
    title: "Display Quality",
    hardwareName: "120Hz LTPO AMOLED Precision Panel",
    badge: "47% of Campus",
    color: "#8B5CF6",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    description: "Chosen by 14 students. Most frequently paired with Processing Performance for streaming lecture videos and visual media.",
    svgHighlightRegion: "display",
  },
  {
    id: "Storage Capacity",
    title: "Storage Capacity",
    hardwareName: "256GB / 512GB UFS 4.0 Flash Storage",
    badge: "37% of Campus",
    color: "#0284C7",
    bgLight: "bg-sky-50",
    borderLight: "border-sky-200",
    description: "Crucial in the Under ₹15,000 tier (60% demand) where students keep heavy PDF textbooks, lecture recordings, and offline video caches.",
    svgHighlightRegion: "storage",
  },
  {
    id: "Software & OS Experience",
    title: "Software & OS Experience",
    hardwareName: "Low-Latency Kernel & Clean UI Rom",
    badge: "27% of Campus",
    color: "#4F46E5",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-200",
    description: "Prioritized by students looking for ad-free clean interfaces, privacy permissions, and long software update lifecycles.",
    svgHighlightRegion: "os",
  },
  {
    id: "Build & Design Quality",
    title: "Build & Design Quality",
    hardwareName: "CNC Aerospace Titanium & Ceramic Shield",
    badge: "17% of Campus",
    color: "#475569",
    bgLight: "bg-slate-50",
    borderLight: "border-slate-200",
    description: "Highly correlated with premium pricing. 71% of students spending Above ₹60,000 selected build quality, treating design as a symbol of craftsmanship.",
    svgHighlightRegion: "frame",
  },
];

export function InteractivePhoneDissection({ responses }: InteractivePhoneDissectionProps) {
  const [activeModule, setActiveModule] = useState<HardwareModule>(HARDWARE_MODULES[0]!);

  // Calculate live stats for the active module
  const featureCount = responses.filter((r) =>
    r.preferred_features.includes(activeModule.id)
  ).length;
  const featurePct = Math.round((featureCount / responses.length) * 100);

  return (
    <section id="dissection" className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F5F1E8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
            <span className="font-sora text-xs font-bold uppercase tracking-wider text-blue-800">
              Visual Hardware Infographic
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-[#1C1B18] mt-1.5">
            Interactive Smartphone Chassis &amp; Feature Dissection
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-0.5">
            Click on any physical component or feature chip to inspect where discrete survey preferences intersect with device hardware.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#FAF7F0] px-3.5 py-1.5 font-sora text-xs font-bold text-stone-800 border border-[#EAE3D5] shadow-2xs">
            7 Canonical Physical Modules
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Phone Blueprint on Left, Dynamic Info Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Interactive Vector Smartphone Blueprint (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-[#FAF8F5] border border-[#EAE3D5] relative overflow-hidden">
          <div className="text-center mb-4">
            <span className="font-sora text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              Anatomy Blueprint — Click to Inspect
            </span>
          </div>

          {/* Smartphone Chassis SVG */}
          <div className="relative w-64 h-[440px] rounded-[3rem] border-4 border-stone-800 bg-stone-900 shadow-2xl p-3 flex flex-col justify-between">
            {/* Top Speaker Slit & Dynamic Island */}
            <div className="flex justify-center mb-1">
              <div className="w-20 h-4 rounded-full bg-black border border-stone-700 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-stone-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>

            {/* Inner Component Blueprint Stack */}
            <div className="flex-1 rounded-[2.2rem] bg-stone-950 p-3 flex flex-col gap-2 relative overflow-hidden border border-stone-800">
              {/* 1. Camera Array (Top Left) */}
              <motion.div
                onClick={() => setActiveModule(HARDWARE_MODULES[0]!)}
                whileHover={{ scale: 1.03 }}
                className={`cursor-pointer rounded-2xl p-2.5 transition-all duration-300 border ${
                  activeModule.svgHighlightRegion === "camera"
                    ? "bg-blue-600/30 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "bg-stone-900/90 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sora text-[10px] font-bold text-blue-400">
                    📷 Camera Island (50MP)
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                </div>
                <div className="flex gap-1.5 mt-1.5">
                  <div className="w-5 h-5 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[8px] text-stone-400">
                    OIS
                  </div>
                  <div className="w-5 h-5 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[8px] text-stone-400">
                    UW
                  </div>
                  <div className="w-5 h-5 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[8px] text-stone-400">
                    3x
                  </div>
                </div>
              </motion.div>

              {/* 2. Silicon SoC Chipset (Middle Top) */}
              <motion.div
                onClick={() => setActiveModule(HARDWARE_MODULES[2]!)}
                whileHover={{ scale: 1.03 }}
                className={`cursor-pointer rounded-2xl p-2.5 transition-all duration-300 border ${
                  activeModule.svgHighlightRegion === "soc"
                    ? "bg-orange-600/30 border-orange-400 shadow-[0_0_15px_rgba(234,88,12,0.5)]"
                    : "bg-stone-900/90 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sora text-[10px] font-bold text-orange-400">
                    ⚡ 4nm Silicon SoC
                  </span>
                  <span className="text-[9px] font-sora text-stone-400 font-semibold">
                    Octa-Core
                  </span>
                </div>
              </motion.div>

              {/* 3. Battery Cell (Middle Large Area) */}
              <motion.div
                onClick={() => setActiveModule(HARDWARE_MODULES[1]!)}
                whileHover={{ scale: 1.03 }}
                className={`cursor-pointer flex-1 rounded-2xl p-3 transition-all duration-300 border flex flex-col justify-between ${
                  activeModule.svgHighlightRegion === "battery"
                    ? "bg-emerald-600/30 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "bg-stone-900/90 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sora text-[10px] font-bold text-emerald-400">
                    🔋 5000mAh Battery Cell
                  </span>
                  <span className="font-sora text-[9px] text-emerald-300">
                    67% Campus #1
                  </span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    animate={{ width: ["70%", "85%", "70%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* 4. Storage & OS (Bottom Split) */}
              <div className="grid grid-cols-2 gap-2">
                <motion.div
                  onClick={() => setActiveModule(HARDWARE_MODULES[4]!)}
                  whileHover={{ scale: 1.03 }}
                  className={`cursor-pointer rounded-xl p-2 border transition-all text-center ${
                    activeModule.svgHighlightRegion === "storage"
                      ? "bg-sky-600/30 border-sky-400 text-sky-300"
                      : "bg-stone-900/90 border-stone-800 text-stone-400 hover:border-stone-700"
                  }`}
                >
                  <span className="font-sora text-[9px] font-bold block">💾 UFS 4.0</span>
                  <span className="text-[8px] opacity-75">NVMe Flash</span>
                </motion.div>

                <motion.div
                  onClick={() => setActiveModule(HARDWARE_MODULES[5]!)}
                  whileHover={{ scale: 1.03 }}
                  className={`cursor-pointer rounded-xl p-2 border transition-all text-center ${
                    activeModule.svgHighlightRegion === "os"
                      ? "bg-indigo-600/30 border-indigo-400 text-indigo-300"
                      : "bg-stone-900/90 border-stone-800 text-stone-400 hover:border-stone-700"
                  }`}
                >
                  <span className="font-sora text-[9px] font-bold block">⚙️ OS Kernel</span>
                  <span className="text-[8px] opacity-75">Clean ROM</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Navigation Indicator Bar */}
            <div className="flex justify-center mt-1">
              <div className="w-24 h-1 rounded-full bg-stone-700" />
            </div>
          </div>

          <span className="font-sora text-[11px] text-stone-500 mt-4">
            Active Focus: <strong className="text-stone-800">{activeModule.title}</strong>
          </span>
        </div>

        {/* Right Column: Tactile Feature Buttons & Detailed Infographic Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Selector Chips */}
          <div className="space-y-2">
            <span className="font-sora text-xs font-bold text-stone-500 uppercase tracking-wide">
              Select Component:
            </span>
            <div className="flex flex-wrap gap-2">
              {HARDWARE_MODULES.map((mod) => {
                const isActive = mod.id === activeModule.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setActiveModule(mod)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-sora font-semibold transition-all border ${
                      isActive
                        ? "bg-[#1C1B18] text-white border-[#1C1B18] shadow-xs scale-[1.02]"
                        : "bg-white hover:bg-[#FAF7F0] text-stone-700 border-[#EAE3D5]"
                    }`}
                  >
                    <span>{mod.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Detailed Infographic Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EAE3D5]">
                <div>
                  <span className="font-sora text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                    {activeModule.hardwareName}
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-[#1C1B18] mt-0.5">
                    {activeModule.title}
                  </h3>
                </div>
                <div className="rounded-full bg-white px-3.5 py-1 text-xs font-sora font-bold text-stone-800 border border-[#EAE3D5] shadow-2xs">
                  {activeModule.badge}
                </div>
              </div>

              {/* Data Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] shadow-2xs">
                  <span className="font-sora text-[10px] font-bold text-stone-500 uppercase block">
                    Total Choices
                  </span>
                  <div className="font-heading text-2xl font-extrabold text-[#1C1B18] mt-1">
                    {featureCount} <span className="text-sm font-normal text-stone-500">of 30</span>
                  </div>
                  <span className="font-sora text-[11px] font-semibold text-emerald-700 mt-0.5 block">
                    {featurePct}% cohort frequency
                  </span>
                </div>

                <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] shadow-2xs">
                  <span className="font-sora text-[10px] font-bold text-stone-500 uppercase block">
                    Subset Formula
                  </span>
                  <div className="font-heading text-xl font-extrabold text-blue-900 mt-1">
                    |F| = {featureCount}
                  </div>
                  <span className="font-sora text-[11px] text-stone-500 mt-0.5 block">
                    Cardinality in Universe
                  </span>
                </div>

                <div className="rounded-2xl bg-white p-4 border border-[#EAE3D5] shadow-2xs col-span-2 sm:col-span-1">
                  <span className="font-sora text-[10px] font-bold text-stone-500 uppercase block">
                    Triplets Involving
                  </span>
                  <div className="font-heading text-xl font-extrabold text-indigo-900 mt-1">
                    15 of 35
                  </div>
                  <span className="font-sora text-[11px] text-stone-500 mt-0.5 block">
                    C(6,2) = 15 combinations
                  </span>
                </div>
              </div>

              {/* Qualitative Insight */}
              <div className="rounded-2xl bg-white p-5 border border-[#EAE3D5] space-y-2">
                <h4 className="font-heading text-xs font-bold text-[#1C1B18] uppercase tracking-wide">
                  Survey Empirical Insight:
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                  {activeModule.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
