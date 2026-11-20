"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type {
  BrandFeatureAssociationResult,
  BrandFeatureCell,
} from "@/types/experiment";
import type { SmartphoneBrand, SmartphoneFeature } from "@/types/survey";

export interface BrandFeatureBarChartProps {
  result: BrandFeatureAssociationResult;
  onSelectCell?: (cell: BrandFeatureCell) => void;
}

/**
 * Consistent, accessible color palette representing the 7 canonical smartphone features.
 */
export const FEATURE_PALETTE: Record<SmartphoneFeature, string> = {
  "Camera Quality": "#2563eb", // Cobalt
  "Battery Life": "#84cc16", // Acid lime
  "Processing Performance": "#f59e0b", // Amber
  "Display Quality": "#06b6d4", // Cyan
  "Storage Capacity": "#8b5cf6", // Purple
  "Build & Design Quality": "#ec4899", // Pink
  "Software & OS Experience": "#14b8a6", // Teal
};

export function BrandFeatureBarChart({
  result,
  onSelectCell,
}: BrandFeatureBarChartProps) {
  const { selectedBrands, selectedFeatures, matrix, brandTotals } = result;

  // Transform data for Recharts: X-axis groups by BRAND, with feature percentage series
  const chartData = selectedBrands.map((brand) => {
    const n_b = brandTotals[brand] ?? 0;
    const entry: Record<string, string | number> = {
      brand,
      displayName: `${brand} (N=${n_b})`,
      cohortSize: n_b,
    };

    for (const feature of selectedFeatures) {
      const cell = matrix.find((c) => c.brand === brand && c.feature === feature);
      entry[`${feature}_pct`] = cell?.percentage ?? 0;
      entry[`${feature}_count`] = cell?.count ?? 0;
    }

    return entry;
  });

  const hasBrands = selectedBrands.length > 0;
  const hasFeatures = selectedFeatures.length > 0;

  return (
    <Card>
      <CardHeader
        title="Comparative Feature Preference Distribution by Brand Cohort"
        subtitle="Grouped by brand cohort on the X-axis to evaluate conditional feature distributions P(Feature | Brand) using brand-specific denominators N(b)"
        badge={<Badge variant="lime">Brand-Grouped Distribution</Badge>}
      />
      <CardContent className="space-y-4">
        {!hasBrands ? (
          <div className="flex h-72 items-center justify-center rounded-xs border border-dashed border-stone-300 bg-[#FAF9F5] text-stone-500 text-xs">
            No brands selected. Please select one or more brands in the controls above.
          </div>
        ) : !hasFeatures ? (
          <div className="flex h-72 items-center justify-center rounded-xs border border-dashed border-stone-300 bg-[#FAF9F5] text-stone-500 text-xs">
            No features selected. Please select one or more canonical features in the controls above.
          </div>
        ) : (
          <div className="w-full h-96 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 35 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EAE3D5"
                />
                <XAxis
                  dataKey="displayName"
                  tick={{ fontSize: 11, fill: "#1C1B18", fontWeight: 700, fontFamily: "Montserrat, sans-serif" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={55}
                  axisLine={{ stroke: "#EAE3D5" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  unit="%"
                  tick={{ fontSize: 11, fill: "#78716C", fontFamily: "Sora, sans-serif" }}
                  axisLine={{ stroke: "#EAE3D5" }}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const brandEntry = chartData.find(
                        (d) => d.displayName === label || d.brand === label
                      );
                      const brandName =
                        (brandEntry?.brand as SmartphoneBrand) ??
                        (String(label).split(" ")[0] as SmartphoneBrand);
                      const n_b =
                        brandEntry?.cohortSize ??
                        (brandTotals[brandName] ?? 0);

                      return (
                        <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 shadow-xl text-xs space-y-2 min-w-56 font-sans">
                          <div className="border-b border-[#F5F1E8] pb-2 flex items-center justify-between gap-2">
                            <span className="font-montserrat font-bold text-[#1C1B18] text-sm">
                              {brandName}
                            </span>
                            <span className="font-sora text-[11px] text-[#1C1B18] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#EAE3D5] font-semibold">
                              Cohort N = {n_b}
                            </span>
                          </div>
                          <div className="space-y-1.5 max-h-56 overflow-y-auto">
                            {payload.map((entry) => {
                              const featureName = entry.dataKey
                                ? String(entry.dataKey).replace("_pct", "")
                                : String(entry.name);
                              const count =
                                brandEntry?.[`${featureName}_count`] ?? 0;
                              const pct = entry.value;

                              return (
                                <div
                                  key={featureName}
                                  className="flex items-center justify-between gap-3 text-xs"
                                >
                                  <span className="flex items-center gap-1.5 font-medium text-[#57534E]">
                                    <span
                                      className="h-2.5 w-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="truncate max-w-36 font-sans">
                                      {featureName}:
                                    </span>
                                  </span>
                                  <span className="font-sora font-extrabold text-[#1C1B18] shrink-0">
                                    {pct}% ({count}/{n_b})
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{ paddingBottom: 16, fontSize: 11, fontFamily: "Sora, sans-serif" }}
                  formatter={(value) => value.replace("_pct", "")}
                />
                {selectedFeatures.map((feature) => (
                  <Bar
                    key={feature}
                    dataKey={`${feature}_pct`}
                    name={feature}
                    fill={FEATURE_PALETTE[feature] ?? "#78716c"}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                    onClick={(data) => {
                      const brandName = (data.brand ??
                        String(data.name)) as SmartphoneBrand;
                      const cell = matrix.find(
                        (c) => c.brand === brandName && c.feature === feature
                      );
                      if (cell) onSelectCell?.(cell);
                    }}
                    className="cursor-pointer"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <p className="text-[11px] text-stone-500 italic text-center">
          *Within-brand percentage: P(f | b) = C(b, f) / N(b) * 100. When all seven features are included, the percentages sum to 300% because each respondent selects exactly three features. Filtering the feature list changes the displayed sum.
        </p>
      </CardContent>
    </Card>
  );
}
