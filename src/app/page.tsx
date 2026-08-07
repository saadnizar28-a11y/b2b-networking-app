"use client";

import { useState } from "react";
import { ExecutiveLogin } from "@/components/executive-login";
import { Smartphone, Monitor, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"phone" | "fullscreen">("phone");

  return (
    <main className="min-h-screen w-full bg-[#0B0B0D] text-white flex flex-col items-center justify-center relative overflow-x-hidden select-none font-sans subtle-grain">
      {/* Top Floating Control Bar */}
      <div className="fixed top-5 z-50 flex items-center gap-2 bg-[#161619]/90 border border-white/10 backdrop-blur-2xl px-4 py-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 pr-3 border-r border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#ED1B3B]" />
          <span className="text-xs font-semibold tracking-wider text-white/90 uppercase">
            BCC iOS 26 Pro
          </span>
        </div>

        <button
          onClick={() => setViewMode("phone")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            viewMode === "phone"
              ? "bg-[#ED1B3B] text-white shadow-[0_4px_16px_rgba(237,27,59,0.4)]"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Device Canvas (9:16)</span>
        </button>

        <button
          onClick={() => setViewMode("fullscreen")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
            viewMode === "fullscreen"
              ? "bg-[#ED1B3B] text-white shadow-[0_4px_16px_rgba(237,27,59,0.4)]"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Viewport</span>
        </button>
      </div>

      {viewMode === "phone" ? (
        <div className="py-16 sm:py-24 flex flex-col items-center justify-center w-full px-4 min-h-screen">
          {/* iOS 26 Titanium Frame Mockup */}
          <div className="relative w-full max-w-[430px] rounded-[54px] p-[11px] phone-mockup-frame">
            {/* Dynamic Island Notch (Single, Clean, Hardware Notch) */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 border border-white/10 shadow-md">
              <div className="w-3 h-3 rounded-full bg-[#0D0D10] border border-white/15 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D62]" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#16161A]" />
            </div>

            {/* Inner Screen Canvas */}
            <div className="w-full bg-[#0B0B0D] rounded-[44px] overflow-hidden border border-white/5 relative">
              <ExecutiveLogin />
            </div>
          </div>

          {/* Minimal Executive Footer Metadata */}
          <div className="mt-8 flex items-center gap-4 text-xs text-[#8E8E93] tracking-tight">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ED1B3B]" /> 1080 × 1920 (9:16)
            </span>
            <span className="text-white/20">•</span>
            <span>Apple Human Interface</span>
            <span className="text-white/20">•</span>
            <span className="text-white/70 font-medium">BCC Red #ED1B3B</span>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center pt-16">
          <ExecutiveLogin />
        </div>
      )}
    </main>
  );
}
