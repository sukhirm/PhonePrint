"use client";

import React, { useState } from "react";
import type { TwoSetVennRegions } from "@/types/math";
import type { Operation2Set, ActiveOperation } from "./SetOperationsToolbar";

export interface VennDiagram2SetProps {
  setAName: string;
  setBName: string;
  regions: TwoSetVennRegions<string>;
  activeOperation: ActiveOperation;
  onSelectRegion: (op: Operation2Set) => void;
}

export function VennDiagram2Set({
  setAName,
  setBName,
  regions,
  activeOperation,
  onSelectRegion,
}: VennDiagram2SetProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Region active checks based on algebraic operation
  const isOnlyAActive =
    activeOperation === "diff_ab" ||
    activeOperation === "union" ||
    activeOperation === "sym_diff" ||
    activeOperation === "comp_b";

  const isBothActive =
    activeOperation === "intersection" ||
    activeOperation === "union" ||
    activeOperation === "disjoint_ab";

  const isOnlyBActive =
    activeOperation === "diff_ba" ||
    activeOperation === "union" ||
    activeOperation === "sym_diff" ||
    activeOperation === "comp_a";

  const isNeitherActive =
    activeOperation === "neither" ||
    activeOperation === "comp_a" ||
    activeOperation === "comp_b";

  return (
    <div className="relative flex flex-col items-center justify-between rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] overflow-hidden">
      {/* Top Banner with Set Labels */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-4 pb-3 border-b border-[#F5F1E8]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600 shadow-xs" />
          <span className="font-montserrat font-bold text-[#1C1B18] text-xs truncate max-w-[220px]" title={setAName}>
            Set A: {setAName}
          </span>
          <span className="font-sora text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            n = {regions.onlyA.size + regions.both.size}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sora text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            n = {regions.onlyB.size + regions.both.size}
          </span>
          <span className="font-montserrat font-bold text-[#1C1B18] text-xs truncate max-w-[220px]" title={setBName}>
            Set B: {setBName}
          </span>
          <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-xs" />
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full max-w-[540px] aspect-[540/320] relative">
        <svg
          viewBox="0 0 540 320"
          className="w-full h-full select-none"
          role="img"
          aria-label="Two-set Venn diagram representing Set A and Set B"
        >
          {/* Universal Set Bounding Rectangle */}
          <rect
            x="8"
            y="8"
            width="524"
            height="304"
            rx="20"
            fill={isNeitherActive ? "#F5F1E8" : "#FAF8F5"}
            stroke={isNeitherActive ? "#1C1B18" : "#EAE3D5"}
            strokeWidth={isNeitherActive ? "2" : "1.5"}
            strokeDasharray={isNeitherActive ? "none" : "5 5"}
            className="transition-colors cursor-pointer"
            onClick={() => onSelectRegion("neither")}
            onMouseEnter={() => setHoveredRegion("neither")}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Universe Label */}
          <text
            x="24"
            y="32"
            fill="#78716C"
            fontSize="11"
            fontFamily="Sora, sans-serif"
            fontWeight="600"
          >
            Universal Set U (N = {regions.universeSet.size})
          </text>

          {/* Outside Region (Neither) Button Indicator */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectRegion("neither")}
            onMouseEnter={() => setHoveredRegion("neither")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="360"
              y="16"
              width="160"
              height="28"
              rx="14"
              fill={isNeitherActive ? "#1C1B18" : "#FFFFFF"}
              stroke={isNeitherActive ? "#1C1B18" : "#EAE3D5"}
              strokeWidth="1.5"
            />
            <text
              x="440"
              y="34"
              textAnchor="middle"
              fill={isNeitherActive ? "#FFFFFF" : "#57534E"}
              fontSize="11"
              fontWeight="600"
              fontFamily="Sora, sans-serif"
            >
              (A ∪ B)ᶜ : n={regions.neither.size}
            </text>
          </g>

          {/* ============================================================== */}
          {/* Region 1: Only A (A \ B)                                       */}
          {/* Center (200, 160), R=105, intersection pts: (270, 81.74) to (270, 238.26) */}
          {/* ============================================================== */}
          <path
            d="M 270,81.74 A 105,105 0 1,0 270,238.26 A 105,105 0 0,0 270,81.74 Z"
            fill={
              isOnlyAActive
                ? "#2563EB"
                : hoveredRegion === "onlyA"
                ? "#93C5FD"
                : "#DBEAFE"
            }
            fillOpacity={isOnlyAActive ? 0.9 : 0.55}
            stroke={isOnlyAActive ? "#1D4ED8" : "#3B82F6"}
            strokeWidth={isOnlyAActive ? 3 : 1.5}
            className="transition-all cursor-pointer hover:opacity-95"
            onClick={() => onSelectRegion("diff_ab")}
            onMouseEnter={() => setHoveredRegion("onlyA")}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* ============================================================== */}
          {/* Region 2: Only B (B \ A)                                       */}
          {/* ============================================================== */}
          <path
            d="M 270,81.74 A 105,105 0 1,1 270,238.26 A 105,105 0 0,0 270,81.74 Z"
            fill={
              isOnlyBActive
                ? "#059669"
                : hoveredRegion === "onlyB"
                ? "#86EFAC"
                : "#D1FAE5"
            }
            fillOpacity={isOnlyBActive ? 0.9 : 0.55}
            stroke={isOnlyBActive ? "#047857" : "#10B981"}
            strokeWidth={isOnlyBActive ? 3 : 1.5}
            className="transition-all cursor-pointer hover:opacity-95"
            onClick={() => onSelectRegion("diff_ba")}
            onMouseEnter={() => setHoveredRegion("onlyB")}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* ============================================================== */}
          {/* Region 3: Intersection (A ∩ B)                                  */}
          {/* ============================================================== */}
          <path
            d="M 270,81.74 A 105,105 0 0,1 270,238.26 A 105,105 0 0,1 270,81.74 Z"
            fill={
              isBothActive
                ? "#4F46E5"
                : hoveredRegion === "both"
                ? "#A5B4FC"
                : "#C7D2FE"
            }
            fillOpacity={isBothActive ? 0.95 : 0.65}
            stroke={isBothActive ? "#3730A3" : "#6366F1"}
            strokeWidth={isBothActive ? 3 : 1.5}
            className="transition-all cursor-pointer hover:opacity-95"
            onClick={() => onSelectRegion("intersection")}
            onMouseEnter={() => setHoveredRegion("both")}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Labels & Dynamic Cardinality Badges */}

          {/* Region A Only Text */}
          <g
            className="pointer-events-none"
            transform="translate(180, 160)"
          >
            <text
              textAnchor="middle"
              y="-12"
              fontSize="12"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyAActive ? "#FFFFFF" : "#1E3A8A"}
            >
              A only
            </text>
            <text
              textAnchor="middle"
              y="12"
              fontSize="20"
              fontFamily="Sora, sans-serif"
              fontWeight="800"
              fill={isOnlyAActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyA.size}
            </text>
            <text
              textAnchor="middle"
              y="28"
              fontSize="11"
              fontFamily="Sora, sans-serif"
              fontWeight="600"
              fill={isOnlyAActive ? "#DBEAFE" : "#3B82F6"}
            >
              A \ B
            </text>
          </g>

          {/* Intersection A ∩ B Text */}
          <g
            className="pointer-events-none"
            transform="translate(270, 160)"
          >
            <text
              textAnchor="middle"
              y="-14"
              fontSize="12"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isBothActive ? "#FFFFFF" : "#312E81"}
            >
              Shared Overlap
            </text>
            <text
              textAnchor="middle"
              y="12"
              fontSize="22"
              fontFamily="Sora, sans-serif"
              fontWeight="800"
              fill={isBothActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.both.size}
            </text>
            <text
              textAnchor="middle"
              y="30"
              fontSize="11"
              fontFamily="Sora, sans-serif"
              fontWeight="600"
              fill={isBothActive ? "#E0E7FF" : "#4338CA"}
            >
              A ∩ B
            </text>
          </g>

          {/* Region B Only Text */}
          <g
            className="pointer-events-none"
            transform="translate(360, 160)"
          >
            <text
              textAnchor="middle"
              y="-12"
              fontSize="12"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyBActive ? "#FFFFFF" : "#064E3B"}
            >
              B only
            </text>
            <text
              textAnchor="middle"
              y="12"
              fontSize="20"
              fontFamily="Sora, sans-serif"
              fontWeight="800"
              fill={isOnlyBActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyB.size}
            </text>
            <text
              textAnchor="middle"
              y="28"
              fontSize="11"
              fontFamily="Sora, sans-serif"
              fontWeight="600"
              fill={isOnlyBActive ? "#D1FAE5" : "#059669"}
            >
              B \ A
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Helper Text */}
      <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#78716C] border-t border-[#F5F1E8] pt-3">
        <span className="font-sans font-medium">Click any Venn region to inspect its matching student respondents</span>
        <span className="font-sora font-semibold text-[#1C1B18] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE3D5]">
          |A ∪ B| = {regions.unionSet.size} of {regions.universeSet.size} students
        </span>
      </div>
    </div>
  );
}
