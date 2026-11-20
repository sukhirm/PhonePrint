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
  BudgetCombinationAnalysisResult,
  BudgetCombinationRow,
} from "@/types/experiment";
import type { BudgetRange } from "@/types/survey";

export interface BudgetCombinationChartProps {
  result: BudgetCombinationAnalysisResult;
  onSelectRow?: (row: BudgetCombinationRow) => void;
}

const BUDGET_PALETTE: Record<BudgetRange, string> = {
  "Under ₹15,000": "#84cc16", // Acid lime
  "₹15,000 - ₹30,000": "#2563eb", // Cobalt
  "₹30,000 - ₹60,000": "#f59e0b", // Amber
  "Above ₹60,000": "#8b5cf6", // Purple
};

export function BudgetCombinationChart({
  result,
  onSelectRow,
}: BudgetCombinationChartProps) {
  const { selectedBudgets, observedRows, budgetTotals } = result;

  // Filter observed rows to those that appear in at least one of the selected budgets
  const activeRows = observedRows.filter((r) =>
    selectedBudgets.some((b) => r.frequenciesByBudget[b] > 0)
  );

  // Transform data for Recharts
  const chartData = activeRows.map((row) => {
    const shortNames = row.features
      .map((f) => f.split(" ")[0])
      .join(" + ");

    const entry: Record<string, string | number> = {
      combinationId: row.combinationId,
      label: `${row.combinationId}: ${shortNames}`,
      features: row.features.join(" • "),
    };

    for (const b of selectedBudgets) {
      entry[`${b}_count`] = row.frequenciesByBudget[b] ?? 0;
      entry[`${b}_pct`] = row.percentagesByBudget[b] ?? 0;
    }

    return entry;
  });

  return (
    <Card>
      <CardHeader
        title="Observed Feature Combination Frequencies by Budget Tier"
        subtitle="Comparing exact triplet frequencies C(p, t) across selected student budget segments"
        badge={<Badge variant="cobalt">Exact Triplet Frequencies</Badge>}
      />
      <CardContent className="space-y-4">
        {activeRows.length === 0 ? (
          <div className="p-8 text-center rounded-xs border border-dashed border-stone-200 bg-[#FAF9F5]">
            <p className="text-sm text-stone-500 font-medium">
              No observed feature combinations exist for the currently selected budget segment(s).
            </p>
          </div>
        ) : (
          <div className="w-full h-84 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EAE3D5" />
                <XAxis
                  type="number"
                  domain={[0, "dataMax + 1"]}
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#78716C", fontFamily: "Sora, sans-serif" }}
                  axisLine={{ stroke: "#EAE3D5" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={200}
                  tick={{ fontSize: 11, fill: "#1C1B18", fontFamily: "Sora, sans-serif", fontWeight: 600 }}
                  axisLine={{ stroke: "#EAE3D5" }}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = chartData.find((d) => d.label === label);
                      return (
                        <div className="rounded-2xl border border-[#EAE3D5] bg-white p-3.5 shadow-xl text-xs space-y-1.5 min-w-56 font-sans">
                          <div className="font-sora font-bold text-[#1C1B18] border-b border-[#F5F1E8] pb-1.5 text-sm">
                            {item?.combinationId}
                          </div>
                          <div className="text-xs text-[#57534E]">
                            {item?.features}
                          </div>
                          <div className="space-y-1.5 pt-1.5">
                            {payload.map((entry) => {
                              const budgetName = entry.dataKey
                                ? String(entry.dataKey).replace("_count", "")
                                : "";
                              const count = entry.value;
                              const pct = item?.[`${budgetName}_pct`] ?? 0;
                              const n_p = budgetTotals[budgetName as BudgetRange] ?? 0;

                              return (
                                <div
                                  key={entry.name}
                                  className="flex items-center justify-between gap-3 text-xs"
                                >
                                  <span className="flex items-center gap-1.5 font-medium text-[#57534E]">
                                    <span
                                      className="h-2.5 w-2.5 rounded-full"
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    {budgetName}:
                                  </span>
                                  <span className="font-sora font-extrabold text-[#1C1B18]">
                                    {count} resp. ({pct}% of {n_p})
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
                  align="right"
                  wrapperStyle={{ paddingBottom: 12, fontSize: 11, fontFamily: "Sora, sans-serif" }}
                  formatter={(value) => value.replace("_count", "")}
                />
                {selectedBudgets.map((budget) => (
                  <Bar
                    key={budget}
                    dataKey={`${budget}_count`}
                    name={budget}
                    fill={BUDGET_PALETTE[budget] ?? "#78716c"}
                    radius={[0, 6, 6, 0]}
                    maxBarSize={18}
                    onClick={(entry) => {
                      const found = activeRows.find(
                        (r) => r.combinationId === entry.combinationId
                      );
                      if (found) onSelectRow?.(found);
                    }}
                    className="cursor-pointer"
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <p className="text-[11px] text-stone-500 italic text-center">
          *Within-segment percentages use the specific budget cohort size N(p) as denominator: P(t | p) = C(p, t) / N(p).
        </p>
      </CardContent>
    </Card>
  );
}
