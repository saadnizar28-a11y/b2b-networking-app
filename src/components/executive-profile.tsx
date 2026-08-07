"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Users,
  ExternalLink,
  Camera,
  Home as HomeIcon,
  Bell
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/theme-context";

interface ExecutiveProfileProps {
  onBackToLogin?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDirectory?: () => void;
}

export function ExecutiveProfile({ onBackToLogin, onNavigateToHome, onNavigateToDirectory }: ExecutiveProfileProps) {
  const { theme } = useTheme();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between relative select-none font-sans transition-colors duration-300 pb-20 ${
        theme === "dark" ? "bg-[#0B0B0D] text-white" : "bg-[#F3F2EF] text-[#191919]"
      }`}
    >
      {/* Top Header Bar Navigation */}
      <div className="w-full pt-3 pb-2.5 px-5 flex items-center justify-between z-30 sticky top-0 backdrop-blur-xl bg-opacity-90 border-b border-current/10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigateToHome ? onNavigateToHome() : onBackToLogin?.()}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border light-red-glow ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/15 border-white/15 text-white"
              : "bg-white hover:bg-gray-100 border-[#D0CFCC] text-[#191919] shadow-sm"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Scrollable Content Container */}
      <div className="w-full flex-1 px-4 sm:px-5 pt-4 flex flex-col gap-6 z-10 no-scrollbar overflow-y-auto">
        
        {/* ========================================================================= */}
        {/* PROFILE HERO (LinkedIn Style Circular Monogram / Camera Upload Frame) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center pt-2 pb-1 w-full"
        >
          {/* LinkedIn Style Circular Avatar Frame */}
          <div className="relative mb-4">
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#ED1B3B]/70 shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative flex items-center justify-center font-bold text-3xl sm:text-4xl select-none group cursor-pointer transition-all ${
                theme === "dark"
                  ? "bg-[#16161A] text-white"
                  : "bg-white border-[#ED1B3B]/60 text-[#0B0B0D] shadow-md"
              }`}
              onClick={() => alert("Upload profile picture feature enabled.")}
            >
              <span className="drop-shadow-sm tracking-tighter">SO</span>

              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-semibold transition-opacity duration-200 gap-1">
                <Camera className="w-5 h-5 text-[#ED1B3B]" />
                <span>Add Photo</span>
              </div>
            </div>
          </div>

          {/* Name & Position */}
          <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">
            Shams O&apos;Bil
          </h1>

          <p className="text-[17px] font-bold text-[#ED1B3B] mt-0.5">
            CEO <span className="opacity-40">•</span> Synosys
          </p>

          {/* Location & Category Badges */}
          <div className="flex items-center gap-2 mt-2.5 flex-wrap justify-center text-[13px] font-medium">
            <span
              className={`px-3.5 py-1 rounded-full border ${
                theme === "dark"
                  ? "bg-white/[0.06] border-white/15 text-white/90"
                  : "bg-white border-[#D0CFCC] text-gray-800 shadow-sm"
              }`}
            >
              Dubai, UAE
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#ED1B3B]/10 border border-[#ED1B3B]/30 text-[#ED1B3B] font-bold">
              Business Category: IoT
            </span>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsConnected(!isConnected)}
              className={`py-3.5 px-4 rounded-[20px] font-semibold text-[15px] flex items-center justify-center cursor-pointer shadow-md transition-all ${
                isConnected
                  ? "bg-emerald-600 text-white"
                  : "bg-[#ED1B3B] text-white hover:bg-[#F02847]"
              }`}
            >
              <span>{isConnected ? "Connected" : "Connect Member"}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => window.open("https://wa.me/971508746688", "_blank")}
              className={`py-3.5 px-4 rounded-[20px] font-medium text-[15px] border flex items-center justify-center cursor-pointer transition-all light-red-glow ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/15 border-white/15 text-white"
                  : "bg-white hover:bg-gray-100 border-[#D0CFCC] text-[#191919] shadow-sm"
              }`}
            >
              <span>WhatsApp</span>
            </motion.button>
          </div>
        </motion.div>


        {/* ========================================================================= */}
        {/* SECTION 1: CONTACT & PERSONAL */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`w-full p-6 rounded-[28px] border flex flex-col gap-4 ${
            theme === "dark"
              ? "natural-card-reflection"
              : "bg-white border-[#E0DFDC] shadow-sm"
          }`}
        >
          <div className="border-b pb-3 border-current/10">
            <h2 className="text-[17px] font-bold tracking-tight">
              Contact & Personal
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 text-[15px]">
            {/* Email */}
            <div className="flex flex-col py-0.5">
              <span className="text-[12px] opacity-60 font-medium">Email</span>
              <a
                href="mailto:shams@locator.ae"
                className="font-semibold tracking-tight text-[#ED1B3B] hover:underline mt-0.5"
              >
                shams@locator.ae
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Phone</span>
              <a href="tel:0508746688" className="font-semibold tracking-tight mt-0.5">
                0508746688
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">WhatsApp</span>
              <a
                href="https://wa.me/971508746688"
                target="_blank"
                rel="noreferrer"
                className="font-semibold tracking-tight text-emerald-500 hover:underline mt-0.5 flex items-center gap-1"
              >
                0508746688 <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </motion.div>


        {/* ========================================================================= */}
        {/* SECTION 2: COMPANY INFORMATION */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`w-full p-6 rounded-[28px] border flex flex-col gap-4 ${
            theme === "dark"
              ? "natural-card-reflection"
              : "bg-white border-[#E0DFDC] shadow-sm"
          }`}
        >
          <div className="border-b pb-3 border-current/10">
            <h2 className="text-[17px] font-bold tracking-tight">
              Company Information
            </h2>
          </div>

          <div className="flex flex-col gap-3.5 text-[15px]">
            <div className="flex flex-col py-0.5">
              <span className="text-[12px] opacity-60 font-medium">Company Name</span>
              <span className="font-bold text-[17px] tracking-tight">Synosys</span>
            </div>

            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Company Address</span>
              <span className="font-semibold tracking-tight mt-0.5">
                City Tower 2, Sheikh Zayed Road, Dubai
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-current/10 pt-3">
              <div>
                <span className="text-[12px] opacity-60 font-medium">Primary City</span>
                <p className="font-semibold tracking-tight mt-0.5">Dubai</p>
              </div>
              <div>
                <span className="text-[12px] opacity-60 font-medium">Primary Country</span>
                <p className="font-semibold tracking-tight mt-0.5">UAE</p>
              </div>
            </div>

            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Countries Covered</span>
              <span className="font-semibold tracking-tight mt-0.5">
                UAE, India, KSA, Qatar, Oman and Kuwait
              </span>
            </div>

            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Company Website</span>
              <a
                href="https://www.locator.ae"
                target="_blank"
                rel="noreferrer"
                className="font-semibold tracking-tight text-[#ED1B3B] hover:underline mt-0.5 flex items-center gap-1"
              >
                www.locator.ae <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Business Categories</span>
              <span className="font-semibold tracking-tight mt-0.5 text-[#ED1B3B]">
                IoT
              </span>
            </div>

            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Services Offered</span>
              <p className={`text-[14px] leading-relaxed mt-1.5 p-3.5 rounded-2xl border ${
                theme === "dark" ? "bg-white/[0.03] border-white/10 opacity-90" : "bg-[#F8F8F6] border-[#E5E4E1] text-gray-800"
              }`}>
                Most companies struggle to effectively utilize their Vehicles & Field staff. We have created a Software tool that helps them manage & control their vehicles, so their company start growing again and increase revenue.
              </p>
            </div>

            <div className="flex flex-col py-1 border-t border-current/10 pt-3">
              <span className="text-[12px] opacity-60 font-medium">Company Vision</span>
              <p className={`text-[14px] leading-relaxed mt-1.5 p-3.5 rounded-2xl border ${
                theme === "dark" ? "bg-white/[0.03] border-white/10 opacity-90" : "bg-[#F8F8F6] border-[#E5E4E1] text-gray-800"
              }`}>
                By 2035, we envision a globally connected world where one million IoT devices enable smarter mobility, safer assets, and more intelligent operations—positioning us as a trusted global leader in AI-powered IoT innovation.
              </p>
            </div>
          </div>
        </motion.div>


        {/* ========================================================================= */}
        {/* SECTION 3: NETWORKING & INTERESTS */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`w-full p-6 rounded-[28px] border flex flex-col gap-4 ${
            theme === "dark"
              ? "natural-card-reflection"
              : "bg-white border-[#E0DFDC] shadow-sm"
          }`}
        >
          <div className="border-b pb-3 border-current/10">
            <h2 className="text-[17px] font-bold tracking-tight">
              Networking & Interests
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {[
              "IoT",
              "Artificial Intelligence",
              "GPS Tracking",
              "Fleet Management",
              "Smart Mobility",
              "Business Growth",
              "Digital Transformation",
              "Enterprise Technology"
            ].map((interest) => (
              <span
                key={interest}
                className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold border transition-all ${
                  theme === "dark"
                    ? "bg-white/[0.05] border-white/12 text-white"
                    : "bg-[#F3F2EF] border-[#D8D7D4] text-gray-900"
                }`}
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* UNIFIED 4-TAB BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-3 py-2.5 z-40 border-t backdrop-blur-2xl transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0B0B0D]/95 border-white/10"
          : "bg-[#F3F2EF]/95 border-black/10"
      }`}>
        <div className="grid grid-cols-4 gap-1 items-center text-center">
          <button
            onClick={onNavigateToHome}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[11px]">Home</span>
          </button>

          <button
            onClick={onNavigateToDirectory}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <Users className="w-5 h-5" />
            <span className="text-[11px]">Directory</span>
          </button>

          <button
            onClick={() => alert("Executive Notifications Center")}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="text-[11px]">Notifs</span>
          </button>

          <button
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 text-[#ED1B3B] font-bold cursor-pointer"
          >
            <User className="w-5 h-5" />
            <span className="text-[11px]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
