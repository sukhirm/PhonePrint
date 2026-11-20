import React from "react";

export type BadgeVariant =
  | "default"
  | "cobalt"
  | "lime"
  | "success"
  | "warning"
  | "info"
  | "outline";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  dot = false,
  className = "",
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-slate-100/80 text-slate-700 border-slate-200/80",
    cobalt: "bg-blue-50/90 text-blue-700 border-blue-200/80",
    lime: "bg-emerald-50/90 text-emerald-800 border-emerald-200/80",
    success: "bg-emerald-50/90 text-emerald-800 border-emerald-200/80",
    warning: "bg-amber-50/90 text-amber-800 border-amber-200/80",
    info: "bg-sky-50/90 text-sky-800 border-sky-200/80",
    outline: "bg-white/50 text-slate-600 border-slate-200 backdrop-blur-xs",
  };

  const dotColors: Record<BadgeVariant, string> = {
    default: "bg-slate-400",
    cobalt: "bg-blue-600",
    lime: "bg-emerald-600",
    success: "bg-emerald-600",
    warning: "bg-amber-600",
    info: "bg-sky-600",
    outline: "bg-slate-400",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-[11px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-sora font-medium leading-none backdrop-blur-md shadow-xs ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
