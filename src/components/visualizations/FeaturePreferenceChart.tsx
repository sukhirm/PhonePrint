"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export interface FeatureDataPoint {
  feature: string;
  count: number;
  percentage?: number;
}

export interface FeaturePreferenceChartProps {
  data: FeatureDataPoint[];
  height?: number;
}

export function FeaturePreferenceChart({
  data,
  height = 320,
}: FeaturePreferenceChartProps) {
  // Sort descending by count for clear rank hierarchy
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const getGradientId = (index: number) => {
    if (index < 2) return "featureGradTop";
    if (index < 5) return "featureGradMid";
    return "featureGradTail";
  };

  return (
    <div style={{ width: "100%", height }} className="pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 10, right: 35, left: 15, bottom: 10 }}
        >
          <defs>
            {/* Top tier dominant priorities: Emerald to Teal gradient */}
            <linearGradient id="featureGradTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#059669" stopOpacity={1} />
            </linearGradient>
            {/* Core performance tier: Cobalt gradient */}
            <linearGradient id="featureGradMid" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={1} />
            </linearGradient>
            {/* Supporting tier: Slate gradient */}
            <linearGradient id="featureGradTail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#64748B" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            horizontal={false}
            stroke="#F1F5F9"
          />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "var(--font-sora), Sora, sans-serif" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="feature"
            tick={{ fontSize: 12, fill: "#1E293B", fontFamily: "var(--font-dm-sans), DM Sans, sans-serif", fontWeight: 500 }}
            width={175}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
          />
          <Tooltip
            content={<ChartTooltip unit="Selections" />}
            cursor={{ fill: "rgba(16, 185, 129, 0.04)" }}
          />
          <Bar
            dataKey="count"
            name="Selections"
            radius={[0, 8, 8, 0]}
            maxBarSize={24}
            barSize={20}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {sortedData.map((_, index) => (
              <Cell
                key={`feature-cell-${index}`}
                fill={`url(#${getGradientId(index)})`}
                className="transition-all duration-200 hover:opacity-85"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
