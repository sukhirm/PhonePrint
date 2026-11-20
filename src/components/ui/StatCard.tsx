import React from "react";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  meta?: string;
  className?: string;
}

export function StatCard({ label, value, description, meta, className = "" }: StatCardProps) {
  return (
    <Card className={`p-5 flex flex-col justify-between ${className}`}>
      <div>
        <p className="text-[11px] font-sora font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <div className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
      </div>
      {(description || meta) && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500 font-sans">
          {description && <span>{description}</span>}
          {meta && <span className="font-sora text-blue-700 font-semibold">{meta}</span>}
        </div>
      )}
    </Card>
  );
}
