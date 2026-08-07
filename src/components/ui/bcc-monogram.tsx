"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";

interface BCCMonogramProps {
  className?: string;
  height?: number;
}

export function BCCMonogram({ className = "", height = 24 }: BCCMonogramProps) {
  const [imageError, setImageError] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`flex items-center select-none ${className}`}>
      {!imageError ? (
        <Image
          src="/bcc-monogram.png"
          alt="BCC Logo"
          width={height * 3}
          height={height}
          priority
          unoptimized
          className={`h-6 sm:h-7 w-auto object-contain transition-all duration-300 ${
            theme === "light" ? "invert brightness-0 contrast-200" : ""
          }`}
          onError={() => setImageError(true)}
        />
      ) : (
        /* Vector SVG fallback matching BCC monogram */
        <div className="flex items-baseline tracking-tighter font-black text-xl leading-none">
          <span className={theme === "dark" ? "text-white" : "text-[#0B0B0D]"}>B</span>
          <span className="text-[#ED1B3B]">C</span>
          <span className={`relative ${theme === "dark" ? "text-white" : "text-[#0B0B0D]"}`}>
            C
            <span className="absolute -top-0.5 -right-2 text-[7px] font-normal opacity-70">®</span>
          </span>
        </div>
      )}
    </div>
  );
}
