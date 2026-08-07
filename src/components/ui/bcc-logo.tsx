"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";

interface BCCLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function BCCLogo({ className = "", width = 210, height = 75 }: BCCLogoProps) {
  const [imageError, setImageError] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {!imageError ? (
        <div className="relative flex justify-center items-center">
          <Image
            src={theme === "light" ? "/bcc-logo-light.png" : "/bcc-logo.png"}
            alt="BCC UAE Chapter"
            width={width}
            height={height}
            priority
            unoptimized
            className="h-auto w-auto object-contain max-h-[85px] transition-all duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* Vector SVG matching official BCC UAE Chapter logo with Theme Awareness */
        <div className="flex flex-col items-center text-center">
          <div className="flex items-baseline tracking-tight font-black text-3xl leading-none">
            <span className={theme === "dark" ? "text-white" : "text-[#0B0B0D]"}>B</span>
            <span className="text-[#ED1B3B]">C</span>
            <span className={`relative ${theme === "dark" ? "text-white" : "text-[#0B0B0D]"}`}>
              C
              <span className="absolute -top-1 -right-3 text-[9px] font-normal opacity-70">®</span>
            </span>
          </div>
          <span
            className={`text-[8px] font-bold tracking-[0.2em] uppercase mt-1 ${
              theme === "dark" ? "text-white/90" : "text-gray-900"
            }`}
          >
            CREATING THE TOP ONE PERCENT
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-[10px] font-bold tracking-widest uppercase ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              UAE CHAPTER
            </span>
            <div className="flex items-center h-2 overflow-hidden rounded-[1px] border border-current/20">
              <div className="w-1.5 h-full bg-[#ED1B3B]" />
              <div className="flex flex-col h-full w-4">
                <div className="h-1/3 bg-[#007A3D]" />
                <div className="h-1/3 bg-white" />
                <div className="h-1/3 bg-black" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
