"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import type {
  BrandFeatureAssociationResult,
  BrandFeatureCell,
} from "@/types/experiment";

export interface BrandFeatureHeatmapProps {
  result: BrandFeatureAssociationResult;
  onSelectCell?: (cell: BrandFeatureCell) => void;
}

export function BrandFeatureHeatmap({
  result,
  onSelectCell,
}: BrandFeatureHeatmapProps) {
  const {
    selectedBrands,
    selectedFeatures,
    matrix,
    brandTotals,
    featurePercentageSumByBrand,
    isFullFeatureUniverse,
  } = result;

  // Helper to get color intensity based on within-brand percentage P(f | b)
  const getCellBg = (count: number, percentage: number) => {
    if (count === 0) return "bg-[#FAF8F5] text-[#A8A29E] hover:bg-[#F5F1E8]";
    if (percentage >= 80) return "bg-[#10B981] text-white font-extrabold hover:bg-[#059669] shadow-2xs";
    if (percentage >= 60) return "bg-[#3B82F6] text-white font-bold hover:bg-[#2563EB] shadow-2xs";
    if (percentage >= 35) return "bg-[#DBEAFE] text-blue-950 font-bold hover:bg-[#BFDBFE]";
    return "bg-[#F5F1E8] text-[#1C1B18] font-semibold hover:bg-[#EAE3D5]";
  };

  const hasBrands = selectedBrands.length > 0;
  const hasFeatures = selectedFeatures.length > 0;

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-montserrat font-bold tracking-tight text-[#1C1B18]">
              Brand–Feature Preference Matrix (Heatmap)
            </h3>
            <Badge variant="cobalt">
              {isFullFeatureUniverse
                ? "All 7 Features (Expected Sum: 300%)"
                : `Filtered Subset: ${selectedFeatures.length}/7 Features`}
            </Badge>
          </div>
          <p className="text-xs text-[#78716C] mt-1 font-sans">
            Discrete cross-tabulation of brand preference S_b and canonical feature selection S_f
          </p>
        </div>
      </div>

      <div>
        {!hasBrands ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-[#EAE3D5] bg-[#FAF8F5] text-[#78716C] text-xs font-sans">
            No brands selected. Please select one or more brands in the controls above.
          </div>
        ) : !hasFeatures ? (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-[#EAE3D5] bg-[#FAF8F5] text-[#78716C] text-xs font-sans">
            No features selected. Please select one or more canonical features in the controls above to view intersections.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#EAE3D5] bg-white shadow-2xs">
            <table className="w-full text-center text-xs">
              <thead className="bg-[#FAF8F5] text-[11px] font-sora font-semibold uppercase tracking-wider text-[#78716C] border-b border-[#EAE3D5]">
                <tr>
                  <th className="px-4 py-3.5 text-left w-40 font-montserrat">Brand / Feature</th>
                  {selectedFeatures.map((f) => (
                    <th key={f} className="px-2.5 py-3.5 min-w-28 text-center font-sora">
                      <span className="block truncate font-bold text-[#1C1B18]" title={f}>
                        {f.replace(" Quality", "").replace(" Experience", "").replace(" Performance", "")}
                      </span>
                      <span className="text-[10px] text-[#A8A29E] font-medium block truncate">
                        {f}
                      </span>
                    </th>
                  ))}
                  <th className="px-3.5 py-3.5 w-24 text-center bg-[#FAF8F5] border-l border-[#EAE3D5] font-sora">
                    Cohort N(b)
                  </th>
                  <th className="px-3.5 py-3.5 w-32 text-center bg-[#FAF8F5] border-l border-[#EAE3D5] font-sora">
                    Displayed % Sum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F1E8]">
                {selectedBrands.map((brand) => {
                  const n_b = brandTotals[brand] ?? 0;
                  const pctSum = featurePercentageSumByBrand[brand] ?? 0;

                  return (
                    <tr key={brand} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      {/* Row Header: Brand */}
                      <td className="px-4 py-3.5 text-left font-montserrat font-bold text-[#1C1B18] bg-[#FAF8F5] border-r border-[#EAE3D5]">
                        <span className="text-xs">{brand}</span>
                        <span className="text-[10px] text-[#78716C] font-sora font-medium block">
                          N = {n_b} ({n_b > 0 ? ((n_b / result.totalCohortSize) * 100).toFixed(1) : 0}%)
                        </span>
                      </td>

                      {/* Matrix Cells */}
                      {selectedFeatures.map((feature) => {
                        const cell = matrix.find(
                          (c) => c.brand === brand && c.feature === feature
                        );
                        const count = cell?.count ?? 0;
                        const pct = cell?.percentage ?? 0;
                        const cellClass = getCellBg(count, pct);

                        return (
                          <td key={feature} className="p-1.5">
                            <button
                              onClick={() => cell && onSelectCell?.(cell)}
                              className={`w-full h-13 rounded-xl p-1 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${cellClass}`}
                              title={`${brand} ∩ ${feature}: ${count} respondents (${pct}% of ${brand})`}
                            >
                              <span className="font-sora text-xs font-extrabold leading-tight">
                                {count} {count === 1 ? "resp." : "resps."}
                              </span>
                              <span className="text-[10px] font-sora leading-tight opacity-90 font-medium">
                                {n_b > 0 ? `${pct}%` : "—"}
                              </span>
                            </button>
                          </td>
                        );
                      })}

                      {/* Row Total N(b) */}
                      <td className="px-3 py-3.5 font-sora font-extrabold text-[#1C1B18] bg-[#FAF8F5] border-l border-[#EAE3D5]">
                        {n_b}
                      </td>

                      {/* Dynamic Displayed % Sum */}
                      <td className="px-3 py-3.5 font-sora font-bold text-center border-l border-[#EAE3D5] bg-[#FAF8F5]">
                        {n_b > 0 ? (
                          <span
                            className={
                              isFullFeatureUniverse
                                ? "text-emerald-700 font-extrabold"
                                : "text-blue-700 font-extrabold"
                            }
                          >
                            {pctSum.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-[#A8A29E] font-medium">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Legend & Guidance */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#F5F1E8] pt-3 text-[#78716C] font-sans">
        <div className="flex items-center gap-2">
          <span className="font-sora text-[11px] font-semibold text-[#1C1B18]">Heatmap Intensity:</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#A8A29E] font-sora text-[10px] border border-[#EAE3D5]">0%</span>
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5F1E8] text-[#1C1B18] font-sora text-[10px]">&lt;35%</span>
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#DBEAFE] text-blue-900 font-sora text-[10px]">35-59%</span>
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#3B82F6] text-white font-sora text-[10px]">60-79%</span>
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#10B981] text-white font-sora text-[10px]">&ge;80%</span>
          </div>
        </div>
        <span className="font-sora text-[11px] text-[#A8A29E]">
          Click any cell to inspect matching student vectors
        </span>
      </div>
    </div>
  );
}
