"use client";

import React, { useState } from "react";
import type { ThreeSetVennRegions } from "@/types/math";
import type { Operation3Set, ActiveOperation } from "./SetOperationsToolbar";

export interface VennDiagram3SetProps {
  setAName: string;
  setBName: string;
  setCName: string;
  regions: ThreeSetVennRegions<string>;
  activeOperation: ActiveOperation;
  onSelectRegion: (op: Operation3Set) => void;
}

export function VennDiagram3Set({
  setAName,
  setBName,
  setCName,
  regions,
  activeOperation,
  onSelectRegion,
}: VennDiagram3SetProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Region active checks based on 3-set algebraic operation
  const isOnlyAActive = activeOperation === "only_a" || activeOperation === "union_abc";
  const isOnlyBActive = activeOperation === "only_b" || activeOperation === "union_abc";
  const isOnlyCActive = activeOperation === "only_c" || activeOperation === "union_abc";

  const isOnlyABActive =
    activeOperation === "only_ab" ||
    activeOperation === "inter_ab" ||
    activeOperation === "union_abc";

  const isOnlyACActive =
    activeOperation === "only_ac" ||
    activeOperation === "inter_ac" ||
    activeOperation === "union_abc";

  const isOnlyBCActive =
    activeOperation === "only_bc" ||
    activeOperation === "inter_bc" ||
    activeOperation === "union_abc";

  const isAllThreeActive =
    activeOperation === "inter_abc" ||
    activeOperation === "inter_ab" ||
    activeOperation === "inter_ac" ||
    activeOperation === "inter_bc" ||
    activeOperation === "union_abc";

  const isOutsideActive = activeOperation === "outside_abc";

  return (
    <div className="relative flex flex-col items-center justify-between rounded-3xl border border-[#EAE3D5] bg-white p-6 shadow-xs text-[#1C1B18] overflow-hidden">
      {/* Top Banner with 3 Set Labels */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mb-4 border-b border-[#F5F1E8] pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600 shadow-xs flex-shrink-0" />
          <span className="font-montserrat font-bold text-[#1C1B18] truncate" title={setAName}>
            Set A: {setAName}
          </span>
          <span className="font-sora text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            n = {regions.onlyA.size + regions.onlyAB.size + regions.onlyAC.size + regions.allThree.size}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-start sm:justify-center">
          <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-xs flex-shrink-0" />
          <span className="font-montserrat font-bold text-[#1C1B18] truncate" title={setBName}>
            Set B: {setBName}
          </span>
          <span className="font-sora text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            n = {regions.onlyB.size + regions.onlyAB.size + regions.onlyBC.size + regions.allThree.size}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-start sm:justify-end">
          <span className="h-3 w-3 rounded-full bg-purple-600 shadow-xs flex-shrink-0" />
          <span className="font-montserrat font-bold text-[#1C1B18] truncate" title={setCName}>
            Set C: {setCName}
          </span>
          <span className="font-sora text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            n = {regions.onlyC.size + regions.onlyAC.size + regions.onlyBC.size + regions.allThree.size}
          </span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full max-w-[560px] aspect-[560/460] relative">
        <svg
          viewBox="0 0 560 460"
          className="w-full h-full select-none"
          role="img"
          aria-label="Three-set Venn diagram representing Sets A, B, and C"
        >
          {/* Universal Set Bounding Rectangle */}
          <rect
            x="8"
            y="8"
            width="544"
            height="444"
            rx="20"
            fill={isOutsideActive ? "#F5F1E8" : "#FAF8F5"}
            stroke={isOutsideActive ? "#1C1B18" : "#EAE3D5"}
            strokeWidth={isOutsideActive ? "2" : "1.5"}
            strokeDasharray={isOutsideActive ? "none" : "5 5"}
            className="transition-colors cursor-pointer"
            onClick={() => onSelectRegion("outside_abc")}
            onMouseEnter={() => setHoveredRegion("outside")}
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

          {/* Outside Region Button */}
          <g
            className="cursor-pointer"
            onClick={() => onSelectRegion("outside_abc")}
            onMouseEnter={() => setHoveredRegion("outside")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="370"
              y="16"
              width="170"
              height="28"
              rx="14"
              fill={isOutsideActive ? "#1C1B18" : "#FFFFFF"}
              stroke={isOutsideActive ? "#1C1B18" : hoveredRegion === "outside" ? "#1C1B18" : "#EAE3D5"}
              strokeWidth="1.5"
            />
            <text
              x="455"
              y="34"
              textAnchor="middle"
              fill={isOutsideActive ? "#FFFFFF" : "#57534E"}
              fontSize="11"
              fontWeight="600"
              fontFamily="Sora, sans-serif"
            >
              (A ∪ B ∪ C)ᶜ : n={regions.outside.size}
            </text>
          </g>

          {/* 3 Translucent Circles Background */}
          {/* Circle A (Top): (280, 170), R=115 */}
          <circle
            cx="280"
            cy="170"
            r="115"
            fill="#3B82F6"
            fillOpacity={0.12}
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Circle B (Bottom-Left): (215, 275), R=115 */}
          <circle
            cx="215"
            cy="275"
            r="115"
            fill="#10B981"
            fillOpacity={0.12}
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Circle C (Bottom-Right): (345, 275), R=115 */}
          <circle
            cx="345"
            cy="275"
            r="115"
            fill="#A855F7"
            fillOpacity={0.12}
            stroke="#A855F7"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* ========================================================== */}
          {/* 7 Interactive Region Badges with Exact Dynamic Counts       */}
          {/* ========================================================== */}

          {/* 1. Only A: Top (280, 110) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(280, 110)"
            onClick={() => onSelectRegion("only_a")}
            onMouseEnter={() => setHoveredRegion("onlyA")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-50"
              y="-19"
              width="100"
              height="38"
              rx="12"
              fill={isOnlyAActive ? "#2563EB" : "#FFFFFF"}
              stroke={isOnlyAActive ? "#1D4ED8" : "#BFDBFE"}
              strokeWidth={isOnlyAActive ? "2.5" : "1.5"}
            />
            <text
              y="-3"
              textAnchor="middle"
              fontSize="10"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyAActive ? "#EFF6FF" : "#1E40AF"}
            >
              A only
            </text>
            <text
              y="12"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill={isOnlyAActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyA.size}
            </text>
          </g>

          {/* 2. Only B: Bottom-Left (150, 320) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(150, 320)"
            onClick={() => onSelectRegion("only_b")}
            onMouseEnter={() => setHoveredRegion("onlyB")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-50"
              y="-19"
              width="100"
              height="38"
              rx="12"
              fill={isOnlyBActive ? "#059669" : "#FFFFFF"}
              stroke={isOnlyBActive ? "#047857" : "#A7F3D0"}
              strokeWidth={isOnlyBActive ? "2.5" : "1.5"}
            />
            <text
              y="-3"
              textAnchor="middle"
              fontSize="10"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyBActive ? "#D1FAE5" : "#065F46"}
            >
              B only
            </text>
            <text
              y="12"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill={isOnlyBActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyB.size}
            </text>
          </g>

          {/* 3. Only C: Bottom-Right (410, 320) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(410, 320)"
            onClick={() => onSelectRegion("only_c")}
            onMouseEnter={() => setHoveredRegion("onlyC")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-50"
              y="-19"
              width="100"
              height="38"
              rx="12"
              fill={isOnlyCActive ? "#9333EA" : "#FFFFFF"}
              stroke={isOnlyCActive ? "#7E22CE" : "#E9D5FF"}
              strokeWidth={isOnlyCActive ? "2.5" : "1.5"}
            />
            <text
              y="-3"
              textAnchor="middle"
              fontSize="10"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyCActive ? "#F3E8FF" : "#7E22CE"}
            >
              C only
            </text>
            <text
              y="12"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill={isOnlyCActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyC.size}
            </text>
          </g>

          {/* 4. Only AB: (A ∩ B) \ C (210, 200) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(210, 200)"
            onClick={() => onSelectRegion("only_ab")}
            onMouseEnter={() => setHoveredRegion("onlyAB")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-46"
              y="-17"
              width="92"
              height="34"
              rx="10"
              fill={isOnlyABActive ? "#0284C7" : "#FFFFFF"}
              stroke={isOnlyABActive ? "#0369A1" : "#BAE6FD"}
              strokeWidth={isOnlyABActive ? "2.5" : "1.5"}
            />
            <text
              y="-3"
              textAnchor="middle"
              fontSize="9"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyABActive ? "#FFFFFF" : "#0369A1"}
            >
              (A ∩ B) \ C
            </text>
            <text
              y="11"
              textAnchor="middle"
              fontSize="13"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill={isOnlyABActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyAB.size}
            </text>
          </g>

          {/* 5. Only AC: (A ∩ C) \ B (350, 200) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(350, 200)"
            onClick={() => onSelectRegion("only_ac")}
            onMouseEnter={() => setHoveredRegion("onlyAC")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-46"
              y="-17"
              width="92"
              height="34"
              rx="10"
              fill={isOnlyACActive ? "#6366F1" : "#FFFFFF"}
              stroke={isOnlyACActive ? "#4338CA" : "#C7D2FE"}
              strokeWidth={isOnlyACActive ? "2.5" : "1.5"}
            />
            <text
              y="-3"
              textAnchor="middle"
              fontSize="9"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyACActive ? "#FFFFFF" : "#4338CA"}
            >
              (A ∩ C) \ B
            </text>
            <text
              y="11"
              textAnchor="middle"
              fontSize="13"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill={isOnlyACActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyAC.size}
            </text>
          </g>

          {/* 6. Only BC: (B ∩ C) \ A (280, 345) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(280, 345)"
            onClick={() => onSelectRegion("only_bc")}
            onMouseEnter={() => setHoveredRegion("onlyBC")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-46"
              y="-17"
              width="92"
              height="34"
              rx="10"
              fill={isOnlyBCActive ? "#10B981" : "#FFFFFF"}
              stroke={isOnlyBCActive ? "#047857" : "#A7F3D0"}
              strokeWidth={isOnlyBCActive ? "2.5" : "1.5"}
            />
            <text
              y="-3"
              textAnchor="middle"
              fontSize="9"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill={isOnlyBCActive ? "#FFFFFF" : "#047857"}
            >
              (B ∩ C) \ A
            </text>
            <text
              y="11"
              textAnchor="middle"
              fontSize="13"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill={isOnlyBCActive ? "#FFFFFF" : "#0F172A"}
            >
              n = {regions.onlyBC.size}
            </text>
          </g>

          {/* 7. Triple Intersection: A ∩ B ∩ C Center (280, 240) */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            transform="translate(280, 240)"
            onClick={() => onSelectRegion("inter_abc")}
            onMouseEnter={() => setHoveredRegion("allThree")}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <rect
              x="-54"
              y="-22"
              width="108"
              height="44"
              rx="12"
              fill={isAllThreeActive ? "#1C1B18" : "#2E2A25"}
              stroke={isAllThreeActive ? "#60A5FA" : "#57534E"}
              strokeWidth={isAllThreeActive ? "2.5" : "1.5"}
            />
            <text
              y="-4"
              textAnchor="middle"
              fontSize="10"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              fill="#93C5FD"
            >
              A ∩ B ∩ C
            </text>
            <text
              y="14"
              textAnchor="middle"
              fontSize="16"
              fontWeight="800"
              fontFamily="Sora, sans-serif"
              fill="#FFFFFF"
            >
              n = {regions.allThree.size}
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Helper Text */}
      <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#78716C] border-t border-[#F5F1E8] pt-3">
        <span className="font-sans font-medium">Click any region to inspect its exact respondent membership</span>
        <span className="font-sora font-semibold text-[#1C1B18] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#EAE3D5]">
          |A ∪ B ∪ C| = {regions.unionSet.size} of {regions.universeSet.size} students
        </span>
      </div>
    </div>
  );
}
