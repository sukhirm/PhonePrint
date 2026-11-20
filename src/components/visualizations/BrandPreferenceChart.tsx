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

export interface BrandDataPoint {
  brand: string;
  count: number;
  percentage?: number;
}

export interface BrandPreferenceChartProps {
  data: BrandDataPoint[];
  height?: number;
}

export function BrandPreferenceChart({
  data,
  height = 290,
}: BrandPreferenceChartProps) {
  // Sort descending to establish clear hierarchy
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  const getGradientId = (index: number) => {
    if (index === 0) return "brandGradLeader";
    if (index === 1) return "brandGradSecond";
    if (index === 2) return "brandGradThird";
    return "brandGradTail";
  };

  return (
    <div style={{ width: "100%", height }} className="pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 15, right: 15, left: -15, bottom: 20 }}
        >
          <defs>
            <linearGradient id="brandGradLeader" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="brandGradSecond" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.75} />
            </linearGradient>
            <linearGradient id="brandGradThird" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="brandGradTail" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#64748B" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#F1F5F9"
          />
          <XAxis
            dataKey="brand"
            tick={{ fontSize: 11, fill: "#475569", fontFamily: "var(--font-sora), Sora, sans-serif" }}
            interval={0}
            tickLine={false}
            axisLine={{ stroke: "#E2E8F0" }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "var(--font-sora), Sora, sans-serif" }}
            tickLine={false}
            axisLine={false}
            domain={[0, "auto"]}
          />
          <Tooltip
            content={<ChartTooltip unit="Students" />}
            cursor={{ fill: "rgba(37, 99, 235, 0.04)" }}
          />
          <Bar
            dataKey="count"
            name="Respondents"
            radius={[8, 8, 0, 0]}
            maxBarSize={48}
            barSize={42}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {sortedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
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
