import React from "react";

export interface PhonePrintLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * PhonePrint Identity Symbol:
 * Refined glassmorphic brand mark combining modern smartphone silhouette,
 * biometric contours, and mathematical data focal node.
 */
export function PhonePrintLogo({
  size = 32,
  className = "",
  showWordmark = false,
  wordmarkClassName = "",
}: PhonePrintLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoCardGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="1" stopColor="#EFF6FF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="logoBorderGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#93C5FD" stopOpacity="0.6" />
            <stop offset="1" stopColor="#E2E8F0" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="nodeGrad" x1="16" y1="21" x2="24" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Squircle container with glass reflection */}
        <rect
          x="2.5"
          y="2.5"
          width="35"
          height="35"
          rx="10"
          fill="url(#logoCardGrad)"
          stroke="url(#logoBorderGrad)"
          strokeWidth="1.2"
        />

        {/* Top speaker slit */}
        <rect
          x="16.5"
          y="6.5"
          width="7"
          height="1.5"
          rx="0.75"
          className="fill-slate-400"
        />

        {/* Outer biometric loop */}
        <path
          d="M10.5 27C10.5 21 14.5 12 20 12C25.5 12 29.5 21 29.5 27"
          className="stroke-slate-700"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Middle biometric loop */}
        <path
          d="M14 27.5C14 23 16.5 16 20 16C23.5 16 26 23 26 27.5"
          className="stroke-slate-800"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Inner biometric arch */}
        <path
          d="M17.5 28C17.5 25 18.5 20 20 20C21.5 20 22.5 25 22.5 28"
          className="stroke-slate-900"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Central preference data node */}
        <circle
          cx="20"
          cy="25"
          r="2.5"
          fill="url(#nodeGrad)"
        />
        <circle
          cx="20"
          cy="25"
          r="4.5"
          stroke="#60A5FA"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
      </svg>

      {showWordmark && (
        <div className={`flex flex-col ${wordmarkClassName}`}>
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-base font-extrabold tracking-tight text-[#1C1B18] whitespace-nowrap">
              Phone<span className="text-blue-700">Print</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
