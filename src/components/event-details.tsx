"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Home as HomeIcon,
  Bell,
  Share2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  Building2
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/theme-context";

export interface EventData {
  id: number;
  title: string;
  subtitle?: string;
  speaker?: string;
  banner: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  badge: string;
  likes: number;
  description: string;
  agenda: { time: string; activity: string }[];
}

export const ALL_EVENTS_DATA: Record<number, EventData> = {
  1: {
    id: 1,
    title: "BCC UAE Chapter Meet Up @ Ibis Styles",
    banner: "/event3.png",
    date: "28 April 2026",
    time: "6:00 PM - 9:00 PM",
    venue: "Ibis Styles Dubai Jumeira, Dubai, UAE",
    organizer: "BCC UAE Chapter",
    badge: "Executive Networking",
    likes: 34,
    description:
      "Join fellow verified entrepreneurs, business owners, and C-suite executives for an exclusive evening of high-level networking, strategic business discussion, and collaborative dealmaking in Dubai.",
    agenda: [
      { time: "6:00 PM", activity: "Executive Registration & Welcome Drinks" },
      { time: "7:00 PM", activity: "Chapter Insights & Regional Business Trends" },
      { time: "8:00 PM", activity: "Interactive Q&A & Dinner Networking" }
    ]
  },
  2: {
    id: 2,
    title: "Double Your Profit in One Year: The BCC Strategy",
    subtitle: "Business Leaders Conclave 2026",
    speaker: "Dr. Abdussalam Omar (Business Leadership Coach)",
    banner: "/event2.jpg",
    date: "17 August 2026",
    time: "10:00 AM - 6:00 PM",
    venue: "Capkon Convention Centre, Calicut",
    organizer: "BCC Conclave Committee",
    badge: "Annual Conclave",
    likes: 89,
    description:
      "A flagship one-day business leadership conclave where you will learn practical, system-driven strategies to build a profitable, scalable business and double your company profit within 12 months.",
    agenda: [
      { time: "10:00 AM", activity: "Keynote: The 10x Systemized Growth Blueprint" },
      { time: "1:00 PM", activity: "Executive Networking Lunch" },
      { time: "2:30 PM", activity: "Profit Optimization & Delegation Masterclass" },
      { time: "5:00 PM", activity: "Valedictory Ceremony & Strategic Alliances" }
    ]
  },
  3: {
    id: 3,
    title: "BCC UAE Chapter's Monthly Gathering",
    banner: "/event1.jpg",
    date: "05 April 2026",
    time: "1:00 PM (Lunch)",
    venue: "Flora Inn Hotel, Dubai, UAE",
    organizer: "BCC UAE Chapter",
    badge: "Monthly Meetup",
    likes: 42,
    description:
      "Monthly executive gathering for BCC UAE Chapter members. Connect over lunch with leaders from IoT, Logistics, Real Estate, and Healthcare industries to explore joint venture opportunities.",
    agenda: [
      { time: "1:00 PM", activity: "Arrival & Welcome Networking" },
      { time: "1:30 PM", activity: "Keynote Speech & Chapter Strategy" },
      { time: "2:30 PM", activity: "Executive Networking Lunch" }
    ]
  },
  4: {
    id: 4,
    title: "BCC Session 72 Live with Dr. Abdussalam Omar",
    subtitle: "Family & Business Balance for Growth",
    speaker: "Dr. Abdussalam Omar",
    banner: "/event4.jpg",
    date: "11 June 2026",
    time: "5:00 PM - 9:00 PM",
    venue: "Ibis Styles Dubai Jumeira, Dubai, UAE",
    organizer: "BCC Members Only",
    badge: "Exclusive Masterclass",
    likes: 67,
    description:
      "Special masterclass focusing on business systemization, family-work harmony for entrepreneurs, and scaling revenue across GCC and international markets.",
    agenda: [
      { time: "5:00 PM", activity: "BCC Team Meetup & Orientation" },
      { time: "8:00 PM", activity: "BCC Session 72 Live with Dr. Abdussalam Omar" },
      { time: "9:00 PM", activity: "Executive Dinner & Peer Networking" }
    ]
  },
  5: {
    id: 5,
    title: "International Logistics in Uncertain Times",
    speaker: "Shankar Subrahmoniam (CEO, Salt Tech International)",
    banner: "/event5.jpg",
    date: "16 May 2026 (Saturday)",
    time: "5:00 PM - 9:00 PM",
    venue: "Dubai, UAE",
    organizer: "BCC UAE Chapter",
    badge: "Keynote Discussion",
    likes: 55,
    description:
      "Keynote address and panel discussion on navigating geopolitical uncertainty, optimizing global supply chains, and leveraging IoT technology for international freight & fleet management.",
    agenda: [
      { time: "5:00 PM", activity: "Keynote Address by Shankar Subrahmoniam" },
      { time: "6:30 PM", activity: "Supply Chain & Logistics Panel Q&A" },
      { time: "8:00 PM", activity: "Networking Reception & Dinner" }
    ]
  }
};

interface EventDetailsProps {
  eventId: number;
  onBack: () => void;
  onNavigateToHome?: () => void;
  onNavigateToDirectory?: () => void;
  onNavigateToProfile?: () => void;
}

export function EventDetails({
  eventId,
  onBack,
  onNavigateToHome,
  onNavigateToDirectory,
  onNavigateToProfile
}: EventDetailsProps) {
  const { theme } = useTheme();
  const event = ALL_EVENTS_DATA[eventId] || ALL_EVENTS_DATA[1];
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between relative select-none font-sans transition-colors duration-300 pb-20 ${
        theme === "dark" ? "bg-[#0B0B0D] text-white" : "bg-[#F3F2EF] text-[#191919]"
      }`}
    >
      {/* Top Mobile Header Navigation */}
      <div className="w-full pt-3 pb-2.5 px-5 flex items-center justify-between z-30 sticky top-0 backdrop-blur-xl bg-opacity-90 border-b border-current/10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border light-red-glow ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/15 border-white/15 text-white"
              : "bg-white hover:bg-gray-100 border-[#D0CFCC] text-[#191919] shadow-sm"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Scrollable Content Container */}
      <div className="w-full flex-1 px-4 sm:px-5 pt-3 flex flex-col gap-6 z-10 no-scrollbar overflow-y-auto">
        
        {/* Banner Section */}
        <div className="relative w-full h-56 sm:h-64 rounded-[22px] overflow-hidden border border-current/10 bg-black shadow-md">
          <Image
            src={event.banner}
            alt={event.title}
            fill
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute top-3 left-3 bg-[#ED1B3B] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
            {event.badge}
          </div>
        </div>

        {/* Event Header Information */}
        <div className="flex flex-col gap-2.5">
          <h1 className="text-[24px] font-bold leading-snug tracking-tight">
            {event.title}
          </h1>

          {event.subtitle && (
            <p className="text-[15px] font-bold text-[#ED1B3B]">{event.subtitle}</p>
          )}

          {event.speaker && (
            <p className="text-[13px] font-semibold opacity-90">
              Keynote Speaker: <span className="text-[#ED1B3B]">{event.speaker}</span>
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <span className="px-3 py-1 rounded-full bg-[#ED1B3B]/10 border border-[#ED1B3B]/30 text-[#ED1B3B] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified BCC Event
            </span>
          </div>
        </div>

        {/* Date, Time, Venue Box */}
        <div className={`p-5 rounded-[22px] border flex flex-col gap-3.5 ${
          theme === "dark" ? "bg-white/[0.04] border-white/10" : "bg-white border-[#E0DFDC] shadow-sm"
        }`}>
          <div className="flex items-center gap-3 text-[14px] font-semibold">
            <Calendar className="w-4 h-4 text-[#ED1B3B] shrink-0" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-3 text-[14px] font-semibold border-t border-current/10 pt-3">
            <Clock className="w-4 h-4 text-[#ED1B3B] shrink-0" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-3 text-[14px] font-semibold border-t border-current/10 pt-3">
            <MapPin className="w-4 h-4 text-[#ED1B3B] shrink-0" />
            <span>{event.venue}</span>
          </div>

          <div className="flex items-center gap-3 text-[13px] opacity-75 border-t border-current/10 pt-3 font-medium">
            <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Organizer: {event.organizer}</span>
          </div>
        </div>

        {/* Registration CTA Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsRegistered(!isRegistered)}
          className={`w-full py-4 rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ${
            isRegistered
              ? "bg-emerald-600 text-white"
              : "bg-[#ED1B3B] text-white hover:bg-[#F02847]"
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{isRegistered ? "Seat Confirmed ✓" : "Register For Event"}</span>
        </motion.button>

        {/* Brief Description */}
        <div className={`p-5 rounded-[22px] border flex flex-col gap-2 ${
          theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E0DFDC] shadow-sm"
        }`}>
          <h2 className="text-[16px] font-bold tracking-tight">About Event</h2>
          <p className="text-[14px] opacity-85 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Event Agenda Schedule */}
        <div className={`p-5 rounded-[22px] border flex flex-col gap-3 ${
          theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E0DFDC] shadow-sm"
        }`}>
          <h2 className="text-[16px] font-bold tracking-tight border-b pb-2.5 border-current/10">
            Event Agenda Schedule
          </h2>

          <div className="flex flex-col gap-3 pt-1">
            {event.agenda.map((slot, index) => (
              <div key={index} className="flex items-start gap-3 text-[13px]">
                <span className="font-bold text-[#ED1B3B] w-20 shrink-0">{slot.time}</span>
                <span className="font-medium opacity-90">{slot.activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Share & Save Actions */}
        <div className="flex items-center justify-between pt-2 pb-6">
          <button
            onClick={() => alert("Event invitation link copied to clipboard.")}
            className={`py-2.5 px-4 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer ${
              theme === "dark" ? "bg-white/10 border-white/15" : "bg-white border-[#D0CFCC]"
            }`}
          >
            <Share2 className="w-4 h-4 text-[#ED1B3B]" /> Share Invitation
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`py-2.5 px-4 rounded-xl border flex items-center gap-2 text-xs font-semibold cursor-pointer ${
              isSaved ? "text-[#ED1B3B] border-[#ED1B3B]" : theme === "dark" ? "bg-white/10 border-white/15" : "bg-white border-[#D0CFCC]"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            <span>{isSaved ? "Saved" : "Save Event"}</span>
          </button>
        </div>
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
            onClick={onNavigateToHome || onBack}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 text-[#ED1B3B] font-bold cursor-pointer"
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
            onClick={onNavigateToProfile}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <User className="w-5 h-5" />
            <span className="text-[11px]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
