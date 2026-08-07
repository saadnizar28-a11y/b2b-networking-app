"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Users,
  LogOut,
  ChevronDown,
  ArrowLeft,
  Home as HomeIcon,
  PlusCircle,
  Bell
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/theme-context";

interface Member {
  id: number;
  name: string;
  position: string;
  company: string;
  industry: string;
  location: string;
  country: string;
  avatar: string;
}

const MEMBERS_DATA: Member[] = [
  {
    id: 1,
    name: "Shams O'Bil",
    position: "CEO",
    company: "Synosys",
    industry: "IoT",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "SO"
  },
  {
    id: 2,
    name: "Warda Abdul Azeez",
    position: "Business Head",
    company: "TravelNGrow",
    industry: "Travel & Tourism",
    location: "Calicut, India",
    country: "India",
    avatar: "WA"
  },
  {
    id: 3,
    name: "Ahmed Al Mansoori",
    position: "Managing Director",
    company: "Gulf Logistics Solutions",
    industry: "Logistics & Supply Chain",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "AM"
  },
  {
    id: 4,
    name: "Fatima Al Mazrouei",
    position: "Chief Operations Officer",
    company: "Emirates Healthcare Group",
    industry: "Healthcare",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    avatar: "FM"
  },
  {
    id: 5,
    name: "Omar Al Nuaimi",
    position: "Technology Director",
    company: "Nexa Digital Technologies",
    industry: "Information Technology",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "ON"
  },
  {
    id: 6,
    name: "Sarah Al Suwaidi",
    position: "Head of Marketing",
    company: "Aurora Properties",
    industry: "Real Estate",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "SS"
  },
  {
    id: 7,
    name: "Khalid Al Hammadi",
    position: "General Manager",
    company: "Desert Energy Solutions",
    industry: "Oil & Gas",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    avatar: "KH"
  },
  {
    id: 8,
    name: "Noor Al Kaabi",
    position: "Business Development Director",
    company: "Gulf Financial Services",
    industry: "Banking & Finance",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "NK"
  },
  {
    id: 9,
    name: "Hassan Al Falasi",
    position: "Fleet Operations Manager",
    company: "Smart Fleet Technologies",
    industry: "Telematics & IoT",
    location: "Sharjah, UAE",
    country: "UAE",
    avatar: "HF"
  },
  {
    id: 10,
    name: "Mariam Al Shamsi",
    position: "Commercial Director",
    company: "Emirates Hospitality Group",
    industry: "Hospitality & Tourism",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "MS"
  },
  {
    id: 11,
    name: "Youssef Al Marri",
    position: "Sales Director",
    company: "Falcon Automotive",
    industry: "Automotive",
    location: "Dubai, UAE",
    country: "UAE",
    avatar: "YM"
  },
  {
    id: 12,
    name: "Aisha Al Dhaheri",
    position: "Managing Partner",
    company: "Vision Legal Consultants",
    industry: "Legal Services",
    location: "Abu Dhabi, UAE",
    country: "UAE",
    avatar: "AD"
  }
];

interface MemberDirectoryProps {
  onNavigateToProfile?: () => void;
  onNavigateToHome?: () => void;
  onBackToLogin?: () => void;
}

export function MemberDirectory({ onNavigateToProfile, onNavigateToHome, onBackToLogin }: MemberDirectoryProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [isAdmin] = useState(true);

  const countriesList = ["All Countries", "UAE", "India"];
  const industriesList = [
    "All Industries",
    "IoT",
    "Travel & Tourism",
    "Logistics & Supply Chain",
    "Healthcare",
    "Information Technology",
    "Real Estate",
    "Oil & Gas",
    "Banking & Finance",
    "Telematics & IoT",
    "Hospitality & Tourism",
    "Automotive",
    "Legal Services"
  ];

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.position.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        selectedCountry === "All Countries" || member.country === selectedCountry;

      const matchesIndustry =
        selectedIndustry === "All Industries" || member.industry === selectedIndustry;

      return matchesSearch && matchesCountry && matchesIndustry;
    });
  }, [searchQuery, selectedCountry, selectedIndustry]);

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

      {/* Main Scrollable Content Area */}
      <div className="w-full flex-1 px-4 sm:px-5 pt-4 flex flex-col gap-4 z-10 no-scrollbar overflow-y-auto">
        
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] sm:text-[28px] font-bold tracking-tight">
            Member Directory
          </h1>
          <p className="text-[13px] opacity-60 font-normal">
            BCC Executive UAE Chapter Verified Network
          </p>
        </div>

        {/* Search Bar */}
        <div className={`relative flex items-center w-full rounded-2xl p-1 border transition-all ${
          theme === "dark" ? "clean-input-glass" : "bg-white border-[#D0CFCC] shadow-sm"
        }`}>
          <div className="pl-3.5 pr-1 text-gray-400">
            <Search className="w-4 h-4 text-[#ED1B3B]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members by name..."
            className="w-full py-3 px-2 bg-transparent text-[15px] focus:outline-none placeholder:text-gray-400 font-normal"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold appearance-none border cursor-pointer focus:outline-none pr-8 ${
                theme === "dark"
                  ? "bg-white/[0.06] border-white/12 text-white"
                  : "bg-white border-[#D0CFCC] text-gray-900 shadow-sm"
              }`}
            >
              {countriesList.map((c) => (
                <option key={c} value={c} className="bg-[#1C1C1F] text-white">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold appearance-none border cursor-pointer focus:outline-none pr-8 ${
                theme === "dark"
                  ? "bg-white/[0.06] border-white/12 text-white"
                  : "bg-white border-[#D0CFCC] text-gray-900 shadow-sm"
              }`}
            >
              {industriesList.map((ind) => (
                <option key={ind} value={ind} className="bg-[#1C1C1F] text-white">
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[13px] font-semibold text-[#ED1B3B]">
            {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"} found
          </span>
        </div>

        {/* Members Cards List */}
        <div className="flex flex-col gap-3.5 pb-6">
          <AnimatePresence>
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => {
                  if (member.id === 1) {
                    onNavigateToProfile?.();
                  } else {
                    alert(`Viewing executive profile of ${member.name} (${member.position} @ ${member.company})`);
                  }
                }}
                className={`p-5 rounded-[18px] border flex items-center gap-4 transition-all cursor-pointer hover:border-[#ED1B3B]/60 ${
                  theme === "dark"
                    ? "bg-[#141417] border-white/10"
                    : "bg-white border-[#E0DFDC] shadow-sm"
                }`}
              >
                <div className={`w-12 h-12 rounded-full border-2 border-[#ED1B3B]/60 flex items-center justify-center font-bold text-sm shrink-0 ${
                  theme === "dark" ? "bg-[#0B0B0D] text-white" : "bg-gray-100 text-[#0B0B0D]"
                }`}>
                  <span>{member.avatar}</span>
                </div>

                <div className="flex flex-col text-left overflow-hidden">
                  <h3 className="font-bold text-[17px] tracking-tight leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-[14px] font-medium opacity-85 mt-0.5">
                    {member.position} <span className="text-[#ED1B3B] font-bold">•</span> {member.company}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-[12px] opacity-65 font-medium">
                    <span>{member.industry}</span>
                    <span>•</span>
                    <span>{member.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNIFIED 5-TAB BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-3 py-2.5 z-40 border-t backdrop-blur-2xl transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0B0B0D]/95 border-white/10"
          : "bg-[#F3F2EF]/95 border-black/10"
      }`}>
        <div className="grid grid-cols-5 gap-1 items-center">
          {/* Tab 1: Home */}
          <button
            onClick={onNavigateToHome}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          {/* Tab 2: Directory (Active) */}
          <button
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 text-[#ED1B3B] font-bold cursor-pointer"
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Directory</span>
          </button>

          {/* Tab 3: Create Post (Admin Center Button) */}
          {isAdmin ? (
            <button
              onClick={() => alert("Admin Publisher Mode: Verified administrators can publish official announcements and events.")}
              className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 text-[#ED1B3B] hover:scale-105 transition-all cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#ED1B3B] text-white flex items-center justify-center shadow-md border-2 border-[#0B0B0D]">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-bold text-[#ED1B3B]">Create</span>
            </button>
          ) : (
            <div className="opacity-20 flex flex-col items-center gap-1">
              <PlusCircle className="w-5 h-5" />
              <span className="text-[9px]">Create</span>
            </div>
          )}

          {/* Tab 4: Notifications */}
          <button
            onClick={() => alert("Executive Notifications Center")}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px]">Notifs</span>
          </button>

          {/* Tab 5: My Profile */}
          <button
            onClick={onNavigateToProfile}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
