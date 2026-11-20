"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { SurveyResponse } from "@/types/survey";

interface HeroDeckCard {
  id: string;
  archetype: string;
  brand: string;
  budget: string;
  features: [string, string, string];
  cohortShare: number;
  rotation: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  patternType: "cosmos" | "silver" | "amber" | "architectural" | "emerald" | "magenta";
}

const DECK_CARDS: HeroDeckCard[] = [
  {
    id: "flagship-creator",
    archetype: "Flagship Creator",
    brand: "Apple",
    budget: "Above ₹60,000",
    features: ["Camera Quality", "Build & Design Quality", "Battery Life"],
    cohortShare: 30,
    rotation: "-rotate-12",
    bgGradient: "from-slate-950 via-slate-900 to-slate-800",
    textColor: "text-white",
    accentColor: "text-blue-400",
    badgeBg: "bg-white/10 text-white border-white/20",
    badgeText: "Dominant Tier",
    patternType: "cosmos",
  },
  {
    id: "performance-core",
    archetype: "Power & Velocity",
    brand: "OnePlus",
    budget: "₹30,000 - ₹60,000",
    features: ["Processing Performance", "Display Quality", "Battery Life"],
    cohortShare: 23,
    rotation: "-rotate-6",
    bgGradient: "from-slate-200 via-slate-100 to-slate-300",
    textColor: "text-slate-900",
    accentColor: "text-blue-700",
    badgeBg: "bg-slate-900/10 text-slate-800 border-slate-900/20",
    badgeText: "High Speed",
    patternType: "silver",
  },
  {
    id: "value-endurance",
    archetype: "Value Endurance",
    brand: "Xiaomi",
    budget: "Under ₹15,000",
    features: ["Battery Life", "Storage Capacity", "Processing Performance"],
    cohortShare: 17,
    rotation: "-rotate-2",
    bgGradient: "from-amber-400 via-amber-500 to-yellow-600",
    textColor: "text-slate-950",
    accentColor: "text-amber-950",
    badgeBg: "bg-black/15 text-slate-950 border-black/20",
    badgeText: "Budget Tier",
    patternType: "amber",
  },
  {
    id: "discrete-math-engine",
    archetype: "Discrete Math Engine",
    brand: "Combinatorics",
    budget: "C(7, 3) = 35",
    features: ["Set Partitioning", "Inclusion-Exclusion", "Triplets Space"],
    cohortShare: 100,
    rotation: "rotate-0",
    bgGradient: "from-white via-slate-50 to-white",
    textColor: "text-slate-950",
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-600 text-white border-blue-500 shadow-sm",
    badgeText: "Mathematical Core",
    patternType: "architectural",
  },
  {
    id: "everyday-camera",
    archetype: "Visual & Intelligent",
    brand: "Google Pixel",
    budget: "₹15,000 - ₹30,000",
    features: ["Camera Quality", "Software & OS Experience", "Battery Life"],
    cohortShare: 20,
    rotation: "rotate-6",
    bgGradient: "from-emerald-600 via-emerald-700 to-teal-800",
    textColor: "text-white",
    accentColor: "text-emerald-200",
    badgeBg: "bg-white/15 text-emerald-100 border-white/20",
    badgeText: "Photography",
    patternType: "emerald",
  },
  {
    id: "gaming-multimedia",
    archetype: "Immersive Display",
    brand: "Samsung",
    budget: "₹30,000 - ₹60,000",
    features: ["Display Quality", "Processing Performance", "Storage Capacity"],
    cohortShare: 10,
    rotation: "rotate-12",
    bgGradient: "from-pink-600 via-rose-700 to-purple-900",
    textColor: "text-white",
    accentColor: "text-pink-200",
    badgeBg: "bg-white/15 text-pink-100 border-white/20",
    badgeText: "Flagship Display",
    patternType: "magenta",
  },
];

interface InteractiveHeroDeckProps {
  responses: readonly SurveyResponse[];
}

export function InteractiveHeroDeck({ responses }: InteractiveHeroDeckProps) {
  const [selectedCard, setSelectedCard] = useState<HeroDeckCard>(DECK_CARDS[3]!);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-14 pb-8 sm:pb-12 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-200/60">
      {/* Background ambient aesthetic curves */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          className="absolute -top-24 -left-24 w-96 h-96 text-slate-100 stroke-current opacity-60"
          fill="none"
          viewBox="0 0 400 400"
        >
          <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="120" strokeWidth="1" />
        </svg>
        <svg
          className="absolute -bottom-24 -right-24 w-96 h-96 text-slate-100 stroke-current opacity-60"
          fill="none"
          viewBox="0 0 400 400"
        >
          <circle cx="200" cy="200" r="160" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Floating Paper Airplane Illustration */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 font-sora text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.7)]" />
            <span>Interactive Discrete Mathematics &amp; Mobile Analytics</span>
          </div>

          {/* Minimalist floating origami airplane */}
          <div className="hidden sm:flex items-center gap-2 group">
            <svg
              className="w-8 h-8 text-slate-800 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 20L34 7L24 33L19 23L6 20Z"
                fill="white"
                stroke="#0F172A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M34 7L19 23"
                stroke="#2563EB"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M19 23L15 28L14 21"
                fill="#3B82F6"
                stroke="#0F172A"
                strokeWidth="1.5"
              />
            </svg>
            <div className="h-1 w-1 rounded-full bg-blue-400 opacity-60 animate-ping" />
          </div>
        </div>

        {/* Hero Headline & Subtitle in strict Montserrat & DM Sans */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            Smartphone preferences. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900">
              Modeled through discrete math.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl">
            Synthesizing student mobile choices through binomial triplets{" "}
            <span className="font-sora font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
              C(7,3) = 35
            </span>
            , ordered rankings{" "}
            <span className="font-sora font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60">
              P(7,3) = 210
            </span>
            , and empirical set-theoretic partitions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/my-phoneprint"
              className="rounded-full bg-black text-white hover:bg-slate-800 px-6 py-3 text-xs font-heading font-bold shadow-sm transition-all hover:shadow-md hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Build Personal PhonePrint</span>
              <span>&rarr;</span>
            </Link>
            <Link
              href="/setlab"
              className="rounded-full bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/90 px-5 py-3 text-xs font-heading font-semibold shadow-2xs transition-all hover:border-slate-300 flex items-center gap-2"
            >
              <span>Venn &amp; PIE Theory</span>
            </Link>
            <Link
              href="/combolab"
              className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200/70 px-5 py-3 text-xs font-sora font-medium transition-colors"
            >
              C(7,3) Triplets &rarr;
            </Link>
          </div>
        </div>

        {/* Fanned-out Interactive Deck (Pinterest Reference Adaptation) */}
        <div className="mt-12 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-sora text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Interactive Archetype Deck
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-sans">
                Hover or click cards to inspect student preference vectors
              </span>
            </div>
            <span className="hidden sm:inline-block font-sora text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/50">
              {responses.length} Survey Records
            </span>
          </div>

          {/* Deck Container: Overlapping Fanned Cards */}
          <div className="relative h-72 sm:h-80 w-full flex items-end justify-center pb-2">
            <div className="relative flex items-end justify-center w-full max-w-4xl mx-auto -space-x-8 sm:-space-x-12">
              {DECK_CARDS.map((card, idx) => {
                const isSelected = selectedCard.id === card.id;
                const isHovered = activeHoverId === card.id;

                return (
                  <div
                    key={card.id}
                    onMouseEnter={() => setActiveHoverId(card.id)}
                    onMouseLeave={() => setActiveHoverId(null)}
                    onClick={() => setSelectedCard(card)}
                    style={{ zIndex: isHovered ? 40 : isSelected ? 30 : idx + 1 }}
                    className={`relative w-44 sm:w-56 h-64 sm:h-72 rounded-3xl p-5 cursor-pointer transition-all duration-300 ease-out select-none shadow-xl border border-white/40 flex flex-col justify-between ${
                      card.bgGradient
                    } bg-gradient-to-b ${card.textColor} ${
                      isHovered
                        ? "-translate-y-12 scale-105 shadow-2xl rotate-0"
                        : isSelected
                        ? "-translate-y-6 scale-[1.02] shadow-2xl " + card.rotation
                        : card.rotation + " hover:-translate-y-8"
                    }`}
                  >
                    {/* Top Card Bar */}
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="font-sora text-[10px] uppercase tracking-wider opacity-70 block">
                          {card.brand}
                        </span>
                        <h4 className="font-heading font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                          {card.archetype}
                        </h4>
                      </div>
                      <span
                        className={`text-[9px] font-sora font-semibold px-2 py-0.5 rounded-full border ${card.badgeBg}`}
                      >
                        {card.badgeText}
                      </span>
                    </div>

                    {/* Middle Card Graphic Accent */}
                    <div className="py-2">
                      {card.patternType === "architectural" && (
                        <div className="h-16 rounded-xl border border-slate-200 bg-slate-50/90 p-2 flex flex-col justify-center items-center text-center">
                          <span className="font-sora text-[10px] font-bold text-blue-700">
                            C(7,3) = 35 Triplets
                          </span>
                          <span className="font-sora text-[9px] text-slate-500">
                            P(7,3) = 210 Permutations
                          </span>
                        </div>
                      )}
                      {card.patternType === "cosmos" && (
                        <div className="h-16 rounded-xl bg-white/5 border border-white/10 p-2 flex flex-col justify-center">
                          <span className="font-sora text-[11px] font-bold text-blue-300">
                            {card.budget}
                          </span>
                          <span className="text-[10px] opacity-70 font-sans">
                            Dominant Flagship Cohort
                          </span>
                        </div>
                      )}
                      {card.patternType !== "architectural" && card.patternType !== "cosmos" && (
                        <div className="h-16 rounded-xl bg-black/10 p-2 flex flex-col justify-center">
                          <span className="font-sora text-[11px] font-bold">
                            {card.budget}
                          </span>
                          <span className="text-[10px] opacity-80 font-sans">
                            {card.cohortShare}% student representation
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Feature Tags */}
                    <div className="space-y-1.5 border-t border-current/15 pt-2.5 text-[10px]">
                      <span className="font-sora font-semibold opacity-70 block text-[9px] uppercase tracking-wider">
                        Feature Triplet:
                      </span>
                      <p className="font-sans font-medium line-clamp-2 text-[10px] opacity-90 leading-tight">
                        {card.features.join(" • ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Card Inspector Details Banner */}
          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-heading font-extrabold text-sm shadow-xs">
                {selectedCard.cohortShare}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-slate-900 text-sm">
                    {selectedCard.archetype} ({selectedCard.brand})
                  </h4>
                  <Badge variant="cobalt">{selectedCard.budget}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Selected Features:{" "}
                  <strong className="text-slate-800">{selectedCard.features.join(", ")}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/my-phoneprint"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-heading font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Test this profile</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
