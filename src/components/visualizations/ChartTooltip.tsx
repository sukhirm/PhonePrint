import React from "react";

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    dataKey?: string;
    color?: string;
    payload?: {
      percentage?: number;
      [key: string]: unknown;
    };
  }>;
  label?: string;
  unit?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  unit = "Respondents",
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const primaryItem = payload[0];
  const percentage = primaryItem?.payload?.percentage;

  return (
    <div className="rounded-2xl border border-white/90 bg-white/90 backdrop-blur-2xl p-4 shadow-xl text-xs text-slate-800 min-w-[170px] z-50">
      {label && (
        <p className="font-heading font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2.5 tracking-tight text-xs">
          {label}
        </p>
      )}
      <div className="space-y-2">
        {payload.map((entry, index) => (
          <div
            key={`tooltip-${index}`}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full flex-shrink-0 shadow-xs"
                style={{ backgroundColor: entry.color || "#2563eb" }}
              />
              <span className="text-slate-500 capitalize text-[11px] font-sans">
                {entry.name || "Count"}
              </span>
            </div>
            <span className="font-sora font-bold text-slate-900 text-xs">
              {entry.value} {unit}
            </span>
          </div>
        ))}

        {percentage !== undefined && (
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500 font-sans">Cohort Share</span>
            <span className="font-sora font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {percentage}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
