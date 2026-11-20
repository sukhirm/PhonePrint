"use client";

import React from "react";
import {
  SMARTPHONE_BRANDS,
  SMARTPHONE_FEATURES,
  type SmartphoneBrand,
  type SmartphoneFeature,
} from "@/types/survey";

export interface BrandFeatureControlsProps {
  selectedBrands: readonly SmartphoneBrand[];
  setSelectedBrands: (brands: SmartphoneBrand[]) => void;
  selectedFeatures: readonly SmartphoneFeature[];
  setSelectedFeatures: (features: SmartphoneFeature[]) => void;
}

export function BrandFeatureControls({
  selectedBrands,
  setSelectedBrands,
  selectedFeatures,
  setSelectedFeatures,
}: BrandFeatureControlsProps) {
  const toggleBrand = (b: SmartphoneBrand) => {
    if (selectedBrands.includes(b)) {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== b));
    } else {
      setSelectedBrands([...selectedBrands, b]);
    }
  };

  const toggleFeature = (f: SmartphoneFeature) => {
    if (selectedFeatures.includes(f)) {
      setSelectedFeatures(selectedFeatures.filter((feat) => feat !== f));
    } else {
      setSelectedFeatures([...selectedFeatures, f]);
    }
  };

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-5 shadow-xs text-[#1C1B18]">
      {/* Brand Selection */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D5] pb-2.5">
          <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
            1. Select Brands to Compare ({selectedBrands.length} of {SMARTPHONE_BRANDS.length})
          </span>
          <div className="flex items-center gap-2 text-xs font-sora">
            <button
              onClick={() => setSelectedBrands([...SMARTPHONE_BRANDS])}
              className="text-blue-700 hover:underline font-semibold"
            >
              Select All
            </button>
            <span className="text-[#A8A29E]">|</span>
            <button
              onClick={() => setSelectedBrands(["Apple", "Samsung", "Google"])}
              className="text-blue-700 hover:underline font-semibold"
            >
              Top 3 Rivals
            </button>
            <span className="text-[#A8A29E]">|</span>
            <button
              onClick={() => setSelectedBrands(["Xiaomi", "Motorola", "OnePlus"])}
              className="text-blue-700 hover:underline font-semibold"
            >
              Alternative Tier
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {SMARTPHONE_BRANDS.map((b) => {
            const isSelected = selectedBrands.includes(b);
            return (
              <button
                key={b}
                onClick={() => toggleBrand(b)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1C1B18] text-white shadow-xs font-bold"
                    : "bg-white hover:bg-[#F5F1E8] text-[#57534E] border border-[#EAE3D5] font-medium"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Selection */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D5] pb-2.5">
          <span className="text-xs font-montserrat font-bold uppercase tracking-wider text-[#1C1B18]">
            2. Canonical Features to Evaluate ({selectedFeatures.length} of {SMARTPHONE_FEATURES.length})
          </span>
          <div className="flex items-center gap-2 text-xs font-sora">
            <button
              onClick={() => setSelectedFeatures([...SMARTPHONE_FEATURES])}
              className="text-blue-700 hover:underline font-semibold"
            >
              All 7 Features
            </button>
            <span className="text-[#A8A29E]">|</span>
            <button
              onClick={() =>
                setSelectedFeatures([
                  "Camera Quality",
                  "Battery Life",
                  "Processing Performance",
                ])
              }
              className="text-blue-700 hover:underline font-semibold"
            >
              Core Trinity
            </button>
            <span className="text-[#A8A29E]">|</span>
            <button
              onClick={() => setSelectedFeatures([])}
              className="text-[#78716C] hover:underline font-semibold"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {SMARTPHONE_FEATURES.map((f) => {
            const isSelected = selectedFeatures.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sora transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-700 text-white shadow-xs font-bold"
                    : "bg-white hover:bg-[#F5F1E8] text-[#57534E] border border-[#EAE3D5] font-medium"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
