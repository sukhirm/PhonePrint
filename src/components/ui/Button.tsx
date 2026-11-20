import React from "react";

export type ButtonVariant = "primary" | "secondary" | "lime" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#1C1B18] text-white hover:bg-black active:scale-[0.98] shadow-xs border border-[#1C1B18] disabled:opacity-50",
    secondary:
      "bg-white text-stone-800 hover:bg-[#F5F1E8] active:bg-[#EAE3D5] border border-[#EAE3D5] shadow-2xs hover:border-stone-400",
    lime:
      "bg-emerald-700 text-white hover:bg-emerald-800 active:bg-emerald-900 shadow-xs border border-emerald-700 disabled:opacity-50",
    outline:
      "bg-white/90 text-stone-700 border border-[#EAE3D5] hover:bg-white hover:border-stone-400 active:bg-[#F5F1E8] shadow-2xs",
    ghost:
      "bg-transparent text-stone-600 hover:bg-[#F5F1E8] hover:text-[#1C1B18] active:bg-[#EAE3D5]",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5 rounded-full font-sora font-semibold",
    md: "px-4.5 py-2 text-xs sm:text-sm gap-2 rounded-full font-sora font-semibold",
    lg: "px-6 py-2.5 text-sm gap-2.5 rounded-full font-sora font-bold",
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
