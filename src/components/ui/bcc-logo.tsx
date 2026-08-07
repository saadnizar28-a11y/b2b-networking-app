"use client";

import Image from "next/image";
import { useState } from "react";

interface BCCLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function BCCLogo({ className = "", width = 210, height = 75 }: BCCLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {!imageError ? (
        <div className="relative flex justify-center items-center">
          <Image
            src="/bcc-logo.png"
            alt="BCC UAE Chapter"
            width={width}
            height={height}
            priority
            unoptimized
            className="h-auto w-auto object-contain max-h-[82px]"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* Vector SVG matching official BCC UAE Chapter logo */
        <div className="flex flex-col items-center text-center">
          <div className="flex items-baseline tracking-tight font-black text-3xl leading-none">
            <span className="text-white">B</span>
            <span className="text-[#ED1B3B]">C</span>
            <span className="text-white relative">
              C
              <span className="absolute -top-1 -right-3 text-[9px] font-normal text-white/70">®</span>
            </span>
          </div>
          <span className="text-[8px] font-bold tracking-[0.2em] text-white/90 uppercase mt-1">
            CREATING THE TOP ONE PERCENT
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              UAE CHAPTER
            </span>
            <div className="flex items-center h-2 overflow-hidden rounded-[1px] border border-white/20">
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
