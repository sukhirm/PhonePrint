"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  SMARTPHONE_BRANDS,
  BUDGET_RANGES,
  SMARTPHONE_FEATURES,
  type SmartphoneBrand,
  type BudgetRange,
  type SmartphoneFeature,
} from "@/types/survey";
import type { UserProfileInput } from "@/types/matcher";

export interface PreferenceBuilderProps {
  brand: SmartphoneBrand;
  setBrand: (brand: SmartphoneBrand) => void;
  budget: BudgetRange;
  setBudget: (budget: BudgetRange) => void;
  features: readonly SmartphoneFeature[];
  toggleFeature: (feature: SmartphoneFeature) => void;
  resetPreferences: () => void;
  onApplyPreset: (preset: UserProfileInput) => void;
}

interface PresetOption {
  label: string;
  emoji: string;
  description: string;
  profile: UserProfileInput;
}

const PRESET_OPTIONS: PresetOption[] = [
  {
    label: "Flagship Creator",
    emoji: "✨",
    description: "Apple • Above ₹60,000 • Camera, Battery, Build",
    profile: {
      brand: "Apple",
      budget: "Above ₹60,000",
      features: [
        "Camera Quality",
        "Battery Life",
        "Build & Design Quality",
      ],
    },
  },
  {
    label: "Everyday Intelligence",
    emoji: "🤖",
    description: "Google • ₹15,000 - ₹30,000 • Camera, Battery, Software",
    profile: {
      brand: "Google",
      budget: "₹15,000 - ₹30,000",
      features: [
        "Camera Quality",
        "Battery Life",
        "Software & OS Experience",
      ],
    },
  },
  {
    label: "Speed & Gaming",
    emoji: "⚡",
    description: "Samsung • ₹30,000 - ₹60,000 • Display, Processing, Storage",
    profile: {
      brand: "Samsung",
      budget: "₹30,000 - ₹60,000",
      features: [
        "Display Quality",
        "Processing Performance",
        "Storage Capacity",
      ],
    },
  },
  {
    label: "Budget Endurance",
    emoji: "🔋",
    description: "Xiaomi • Under ₹15,000 • Battery, Storage, Processing",
    profile: {
      brand: "Xiaomi",
      budget: "Under ₹15,000",
      features: [
        "Battery Life",
        "Storage Capacity",
        "Processing Performance",
      ],
    },
  },
];

export function PreferenceBuilder({
  brand,
  setBrand,
  budget,
  setBudget,
  features,
  toggleFeature,
  resetPreferences,
  onApplyPreset,
}: PreferenceBuilderProps) {
  const isFeatureCountValid = features.length === 3;

  return (
    <Card className="shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] border-[#EAE3D5]">
      <CardHeader
        title="1. Construct Your Preference Vector"
        subtitle="Specify target brand, budget tier, and exactly three priority features"
        badge={
          isFeatureCountValid ? (
            <Badge variant="lime">3 of 3 Features Selected</Badge>
          ) : (
            <Badge variant="warning">{features.length} of 3 Selected</Badge>
          )
        }
      />
      <CardContent className="space-y-6">
        {/* Curated Presets Bar */}
        <div>
          <span className="text-[11px] font-sora font-semibold uppercase tracking-wider text-stone-500 block mb-2.5">
            Campus Archetypes &amp; Quick Presets
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_OPTIONS.map((preset) => {
              const isActive =
                brand === preset.profile.brand &&
                budget === preset.profile.budget &&
                preset.profile.features.every((f) => features.includes(f));
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => onApplyPreset(preset.profile)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold font-sora transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-[#1C1B18] text-white border-[#1C1B18] shadow-xs scale-[1.02]"
                      : "bg-[#FAF8F5] hover:bg-[#F5F1E8] text-stone-700 border-[#EAE3D5]"
                  }`}
                  title={preset.description}
                >
                  <span>{preset.emoji}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step A & B: Brand and Budget Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Brand Selection */}
          <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="select-brand"
                className="text-xs font-heading font-extrabold text-[#1C1B18] tracking-tight uppercase"
              >
                Target Brand (Set B)
              </label>
              <span className="font-sora text-xs font-bold text-[#1C1B18] bg-white px-3 py-1 rounded-full border border-[#EAE3D5] shadow-2xs">
                {brand}
              </span>
            </div>
            <select
              id="select-brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value as SmartphoneBrand)}
              className="h-11 w-full rounded-2xl border border-[#EAE3D5] bg-white px-4 text-xs font-sora font-semibold text-stone-900 shadow-2xs focus:border-[#1C1B18] focus:outline-none"
            >
              {SMARTPHONE_BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-500 font-sans">
              Filters records where preferred_brand = &quot;{brand}&quot;
            </p>
          </div>

          {/* Budget Selection */}
          <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="select-budget"
                className="text-xs font-heading font-extrabold text-[#1C1B18] tracking-tight uppercase"
              >
                Budget Range (Set P)
              </label>
              <span className="font-sora text-xs font-bold text-[#1C1B18] bg-white px-3 py-1 rounded-full border border-[#EAE3D5] shadow-2xs">
                {budget}
              </span>
            </div>
            <select
              id="select-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetRange)}
              className="h-11 w-full rounded-2xl border border-[#EAE3D5] bg-white px-4 text-xs font-sora font-semibold text-stone-900 shadow-2xs focus:border-[#1C1B18] focus:outline-none"
            >
              {BUDGET_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-500 font-sans">
              Filters records where budget_range = &quot;{budget}&quot;
            </p>
          </div>
        </div>

        {/* Step C: Feature Triplet Selection */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-extrabold text-[#1C1B18] uppercase tracking-wide">
              Feature Triplet (Set F) — Pick Exactly 3
            </span>
            <span className="font-sora text-xs font-bold text-stone-600">
              {features.length} of 3 selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {SMARTPHONE_FEATURES.map((feature) => {
              const isSelected = features.includes(feature);
              const isDisabled = !isSelected && features.length >= 3;

              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  disabled={isDisabled}
                  className={`rounded-2xl p-3.5 text-left transition-all border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#1C1B18] text-white border-[#1C1B18] shadow-xs"
                      : isDisabled
                      ? "bg-[#FAF8F5]/60 text-stone-400 border-[#EAE3D5]/60 cursor-not-allowed"
                      : "bg-[#FAF8F5] text-stone-700 border-[#EAE3D5] hover:bg-[#F5F1E8]"
                  }`}
                >
                  <span className="font-sora text-xs font-semibold">{feature}</span>
                  <span
                    className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected
                        ? "bg-emerald-400 text-stone-950 font-bold"
                        : "border border-stone-300"
                    }`}
                  >
                    {isSelected ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset Action Bar */}
        <div className="pt-2 flex items-center justify-between border-t border-[#F5F1E8]">
          <span className="font-sora text-xs text-stone-500">
            Current Vector: {brand} • {budget} • [{features.join(", ") || "none"}]
          </span>
          <button
            type="button"
            onClick={resetPreferences}
            className="rounded-full bg-[#FAF8F5] hover:bg-[#F5F1E8] text-stone-700 px-4 py-1.5 text-xs font-sora font-semibold border border-[#EAE3D5] transition-colors cursor-pointer"
          >
            Reset Vector
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
