"use client";

import { useTheme } from "@/context/theme-context";

interface BCCLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function BCCLogo({ className = "", width = 135, height = 45 }: BCCLogoProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      {theme === "light" ? (
        // Light Mode: Uploaded official BCC Logo (Black B, Red C, Black C, ®)
        <div className="relative flex justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bcc-logo-light.png"
            alt="BCC Executive"
            style={{ width: `${width}px`, maxHeight: `${height}px` }}
            className="h-auto object-contain mix-blend-multiply"
          />
        </div>
      ) : (
        // Dark Mode: Uploaded official BCC Logo inverted (White B, Red C, White C, ®)
        <div className="relative flex justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bcc-logo-light.png"
            alt="BCC Executive"
            style={{ width: `${width}px`, maxHeight: `${height}px` }}
            className="h-auto object-contain invert hue-rotate-180 mix-blend-screen"
          />
        </div>
      )}
    </div>
  );
}
