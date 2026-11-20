"use client";

import React from "react";
import type { SetOption } from "@/lib/data/setDescriptors";
import { Badge } from "@/components/ui/Badge";

export interface SetSelectorProps {
  mode: "2-set" | "3-set";
  onModeChange: (mode: "2-set" | "3-set") => void;
  availableOptions: SetOption[];
  setAId: string;
  setBId: string;
  setCId: string;
  onSelectA: (id: string) => void;
  onSelectB: (id: string) => void;
  onSelectC: (id: string) => void;
  setASize: number;
  setBSize: number;
  setCSize: number;
  totalUniverseSize: number;
}

export function SetSelector({
  mode,
  onModeChange,
  availableOptions,
  setAId,
  setBId,
  setCId,
  onSelectA,
  onSelectB,
  onSelectC,
  setASize,
  setBSize,
  setCSize,
  totalUniverseSize,
}: SetSelectorProps) {
  const brandOptions = availableOptions.filter((o) => o.category === "brand");
  const featureOptions = availableOptions.filter((o) => o.category === "feature");

  const optionA = availableOptions.find((o) => o.id === setAId);
  const optionB = availableOptions.find((o) => o.id === setBId);
  const optionC = availableOptions.find((o) => o.id === setCId);

  return (
    <div className="rounded-3xl border border-[#EAE3D5] bg-white p-6 sm:p-8 shadow-[0_15px_40px_-15px_rgba(44,38,28,0.06)] space-y-6">
      {/* Header and Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5F1E8] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-heading font-extrabold tracking-tight text-[#1C1B18]">
              Set Definition Workspace
            </h3>
            <Badge variant="cobalt">Discrete Partitions</Badge>
          </div>
          <p className="text-xs text-stone-500 mt-0.5 font-sans">
            Select {mode === "2-set" ? "two" : "three"} distinct brand or feature cohorts from the universe (U = {totalUniverseSize} students)
          </p>
        </div>

        {/* 2-Set vs 3-Set Mode Switch */}
        <div className="inline-flex rounded-full border border-[#EAE3D5] bg-[#FBF9F4] p-1 text-xs shadow-2xs">
          <button
            type="button"
            onClick={() => onModeChange("2-set")}
            className={`px-4 py-1.5 rounded-full text-xs font-sora font-semibold transition-all duration-200 cursor-pointer ${
              mode === "2-set"
                ? "bg-[#1C1B18] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Two Sets (A, B)
          </button>
          <button
            type="button"
            onClick={() => onModeChange("3-set")}
            className={`px-4 py-1.5 rounded-full text-xs font-sora font-semibold transition-all duration-200 cursor-pointer ${
              mode === "3-set"
                ? "bg-[#1C1B18] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Three Sets (A, B, C)
          </button>
        </div>
      </div>

      {/* Set Pickers Grid */}
      <div className={`grid grid-cols-1 gap-4 ${mode === "3-set" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {/* SET A */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-blue-700 text-white font-sora font-bold text-xs shadow-2xs">
                A
              </span>
              <span className="font-heading font-extrabold text-[#1C1B18] text-xs">Set A</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sora text-xs font-bold text-blue-900 bg-white border border-[#EAE3D5] px-2.5 py-0.5 rounded-full shadow-2xs">
                |A| = {setASize}
              </span>
              <span className="text-[10px] text-stone-500 font-sora">
                ({Math.round((setASize / totalUniverseSize) * 100)}%)
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="set-a-select" className="sr-only">
              Choose Set A
            </label>
            <select
              id="set-a-select"
              value={setAId}
              onChange={(e) => onSelectA(e.target.value)}
              className="w-full h-11 rounded-2xl border border-[#EAE3D5] bg-white px-3.5 text-xs font-sora font-semibold text-stone-900 shadow-2xs focus:border-[#1C1B18] focus:outline-none"
            >
              <optgroup label="Smartphone Brands">
                {brandOptions.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                    disabled={opt.id === setBId || (mode === "3-set" && opt.id === setCId)}
                  >
                    {opt.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Canonical Features">
                {featureOptions.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                    disabled={opt.id === setBId || (mode === "3-set" && opt.id === setCId)}
                  >
                    {opt.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <p className="text-[11px] text-stone-600 leading-relaxed border-t border-[#EAE3D5] pt-2 font-sans">
            {optionA?.description}
          </p>
        </div>

        {/* SET B */}
        <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-emerald-700 text-white font-sora font-bold text-xs shadow-2xs">
                B
              </span>
              <span className="font-heading font-extrabold text-[#1C1B18] text-xs">Set B</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sora text-xs font-bold text-emerald-900 bg-white border border-[#EAE3D5] px-2.5 py-0.5 rounded-full shadow-2xs">
                |B| = {setBSize}
              </span>
              <span className="text-[10px] text-stone-500 font-sora">
                ({Math.round((setBSize / totalUniverseSize) * 100)}%)
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="set-b-select" className="sr-only">
              Choose Set B
            </label>
            <select
              id="set-b-select"
              value={setBId}
              onChange={(e) => onSelectB(e.target.value)}
              className="w-full h-11 rounded-2xl border border-[#EAE3D5] bg-white px-3.5 text-xs font-sora font-semibold text-stone-900 shadow-2xs focus:border-[#1C1B18] focus:outline-none"
            >
              <optgroup label="Smartphone Brands">
                {brandOptions.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                    disabled={opt.id === setAId || (mode === "3-set" && opt.id === setCId)}
                  >
                    {opt.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Canonical Features">
                {featureOptions.map((opt) => (
                  <option
                    key={opt.id}
                    value={opt.id}
                    disabled={opt.id === setAId || (mode === "3-set" && opt.id === setCId)}
                  >
                    {opt.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <p className="text-[11px] text-stone-600 leading-relaxed border-t border-[#EAE3D5] pt-2 font-sans">
            {optionB?.description}
          </p>
        </div>

        {/* SET C (Only in 3-set mode) */}
        {mode === "3-set" && (
          <div className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F5] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-xl bg-purple-700 text-white font-sora font-bold text-xs shadow-2xs">
                  C
                </span>
                <span className="font-heading font-extrabold text-[#1C1B18] text-xs">Set C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-sora text-xs font-bold text-purple-900 bg-white border border-[#EAE3D5] px-2.5 py-0.5 rounded-full shadow-2xs">
                  |C| = {setCSize}
                </span>
                <span className="text-[10px] text-stone-500 font-sora">
                  ({Math.round((setCSize / totalUniverseSize) * 100)}%)
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="set-c-select" className="sr-only">
                Choose Set C
              </label>
              <select
                id="set-c-select"
                value={setCId}
                onChange={(e) => onSelectC(e.target.value)}
                className="w-full h-11 rounded-2xl border border-[#EAE3D5] bg-white px-3.5 text-xs font-sora font-semibold text-stone-900 shadow-2xs focus:border-[#1C1B18] focus:outline-none"
              >
                <optgroup label="Smartphone Brands">
                  {brandOptions.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                      disabled={opt.id === setAId || opt.id === setBId}
                    >
                      {opt.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Canonical Features">
                  {featureOptions.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                      disabled={opt.id === setAId || opt.id === setBId}
                    >
                      {opt.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <p className="text-[11px] text-stone-600 leading-relaxed border-t border-[#EAE3D5] pt-2 font-sans">
              {optionC?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
