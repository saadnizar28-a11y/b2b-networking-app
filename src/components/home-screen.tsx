"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  User,
  Users,
  PlusCircle,
  Home as HomeIcon,
  LogOut,
  Calendar,
  Clock,
  MapPin,
  Bookmark,
  Share2,
  Heart,
  MessageSquare,
  Shield,
  Layers,
  Building2,
  Radio,
  ChevronRight,
  X,
  Settings,
  HelpCircle
} from "lucide-react";
import { BCCLogo } from "@/components/ui/bcc-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/theme-context";

interface HomeScreenProps {
  onNavigateToProfile: () => void;
  onNavigateToDirectory: () => void;
  onBackToLogin: () => void;
  onSelectEvent?: (eventId: number) => void;
}

// REAL EVENT DATA WITH EXACT REORDERED LIST & UNIFORM FIXED BANNER FRAMES
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "BCC UAE Chapter Meet Up @ Ibis Styles",
    banner: "/event3.png",
    date: "28 April 2026",
    time: "6:00 PM - 9:00 PM",
    venue: "Ibis Styles Dubai Jumeira",
    organizer: "BCC UAE Chapter",
    badge: "Executive Networking",
    likes: 34
  },
  {
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
    likes: 89
  },
  {
    id: 3,
    title: "BCC UAE Chapter's Monthly Gathering",
    banner: "/event1.jpg",
    date: "05 April 2026",
    time: "1:00 PM (Lunch)",
    venue: "Flora Inn Hotel, Dubai",
    organizer: "BCC UAE Chapter",
    badge: "Monthly Meetup",
    likes: 42
  },
  {
    id: 4,
    title: "BCC Session 72 Live with Dr. Abdussalam Omar",
    subtitle: "Family & Business Balance for Growth",
    banner: "/event4.jpg",
    date: "11 June 2026",
    time: "5:00 PM - 9:00 PM",
    venue: "Ibis Styles Dubai Jumeira",
    organizer: "BCC Members Only",
    badge: "Exclusive Masterclass",
    likes: 67
  },
  {
    id: 5,
    title: "International Logistics in Uncertain Times",
    speaker: "Shankar Subrahmoniam (CEO, Salt Tech International)",
    banner: "/event5.jpg",
    date: "16 May 2026 (Saturday)",
    time: "5:00 PM - 9:00 PM",
    venue: "Dubai, UAE",
    organizer: "BCC UAE Chapter",
    badge: "Keynote Discussion",
    likes: 55
  }
];

// EXECUTIVE PROGRAMS
const PROGRAMS = [
  {
    id: 1,
    name: "BCC 10x ScaleUp Mastermind",
    desc: "12-month intensive business acceleration framework for IoT, Logistics, and Tech founders.",
    duration: "12 Months",
    seats: "4 Seats Left"
  },
  {
    id: 2,
    name: "GCC Executive Leadership Program",
    desc: "High-net-worth peer coaching for C-suite executives scaling across UAE, KSA, & Qatar.",
    duration: "6 Months",
    seats: "2 Seats Left"
  }
];

// OFFICIAL ANNOUNCEMENTS
const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "BCC Launches Saudi Arabia Chapter in Riyadh",
    desc: "Expanding the top 1% executive network across KSA to facilitate cross-border trade & IoT infrastructure partnerships.",
    date: "August 05, 2026"
  },
  {
    id: 2,
    title: "Annual GCC Business Conclave Announced",
    desc: "Over 500 verified CEOs and investors will gather in Dubai for 2 days of strategic dealmaking.",
    date: "July 28, 2026"
  }
];

// BUSINESS NEWS
const BUSINESS_NEWS = [
  {
    id: 1,
    category: "Product Launch",
    title: "Synosys Unveils Next-Gen AI Telematics Software",
    company: "Synosys",
    desc: "Enabling fleet operators across 6 GCC nations to reduce operational wastage by 35%."
  },
  {
    id: 2,
    category: "Partnership",
    title: "Gulf Logistics Solutions Partners with Salt Tech",
    company: "Gulf Logistics",
    desc: "Strategic alliance to optimize supply chain routes in uncertain economic climates."
  }
];

export function HomeScreen({ onNavigateToProfile, onNavigateToDirectory, onBackToLogin, onSelectEvent }: HomeScreenProps) {
  const { theme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState<Record<number, boolean>>({});
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({ 1: 34, 2: 89, 3: 42, 4: 67, 5: 55 });

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: prev[id] + (likedPosts[id] ? -1 : 1)
    }));
  };

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRegister = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRegisteredEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between relative select-none font-sans transition-colors duration-300 pb-20 ${
        theme === "dark" ? "bg-[#0B0B0D] text-white" : "bg-[#F3F2EF] text-[#191919]"
      }`}
    >
      {/* ========================================================================= */}
      {/* LEFT NAVIGATION DRAWER SLIDE-OUT MENU */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className={`fixed top-0 left-0 bottom-0 w-[310px] z-50 p-6 flex flex-col justify-between shadow-2xl border-r ${
                theme === "dark" ? "bg-[#121215] border-white/10 text-white" : "bg-white border-black/10 text-[#191919]"
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b pb-5 border-current/10">
                  <BCCLogo width={140} height={50} />
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-full hover:bg-current/10 cursor-pointer"
                  >
                    <X className="w-5 h-5 opacity-70" />
                  </button>
                </div>

                <div
                  onClick={() => {
                    setDrawerOpen(false);
                    onNavigateToProfile();
                  }}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                    theme === "dark" ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  <div className="w-11 h-11 rounded-full border border-[#ED1B3B]/60 bg-[#0B0B0D] flex items-center justify-center font-bold text-white text-sm shrink-0">
                    SO
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-sm truncate">Shams O&apos;Bil</span>
                    <span className="text-xs text-[#ED1B3B] font-semibold truncate">CEO @ Synosys</span>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </div>

                <div className="flex flex-col gap-1 text-[15px] font-medium pt-1">
                  {[
                    { label: "My Profile", icon: User, action: () => { setDrawerOpen(false); onNavigateToProfile(); } },
                    { label: "Directory", icon: Users, action: () => { setDrawerOpen(false); onNavigateToDirectory(); } },
                    { label: "Events", icon: Calendar, action: () => alert("Viewing Official BCC Events") },
                    { label: "Programs", icon: Layers, action: () => alert("BCC Executive Programs") },
                    { label: "News & Updates", icon: Radio, action: () => alert("BCC Business News") },
                    { label: "Community", icon: Building2, action: () => alert("Private BCC Executive Community") },
                    { label: "Saved", icon: Bookmark, action: () => alert("Your Saved Items") },
                    { label: "Notifications", icon: Bell, action: () => alert("Notifications Center") },
                    { label: "Settings", icon: Settings, action: () => alert("App Settings") },
                    { label: "Help & Support", icon: HelpCircle, action: () => alert("BCC Concierge Support") }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="py-2.5 px-3 rounded-xl flex items-center gap-3 hover:bg-current/10 transition-colors text-left cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 text-[#ED1B3B]" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-current/10">
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onBackToLogin();
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-2 font-semibold text-sm cursor-pointer transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="w-full pt-3 pb-2.5 px-4 flex items-center justify-between z-30 sticky top-0 backdrop-blur-xl bg-opacity-90 border-b border-current/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-full border border-[#ED1B3B]/60 bg-[#0B0B0D] flex items-center justify-center text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm active:scale-95 transition-transform"
          >
            SO
          </button>

          <BCCLogo width={115} height={40} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Search BCC Executive Hub...")}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              theme === "dark" ? "bg-white/10 border-white/15 text-white" : "bg-white border-[#D0CFCC] text-gray-800 shadow-sm"
            }`}
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => alert("You have 3 new executive notifications.")}
            className={`p-2 rounded-full border relative transition-all cursor-pointer ${
              theme === "dark" ? "bg-white/10 border-white/15 text-white" : "bg-white border-[#D0CFCC] text-gray-800 shadow-sm"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ED1B3B] animate-pulse" />
          </button>

          <ThemeToggle />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HOME FEED CONTENT */}
      {/* ========================================================================= */}
      <div className="w-full flex-1 px-4 sm:px-5 pt-4 flex flex-col gap-6 z-10 no-scrollbar overflow-y-auto">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight">Executive Hub</h1>
            <p className="text-[12px] opacity-60 font-medium">Verified BCC UAE Chapter Updates</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#ED1B3B]/10 border border-[#ED1B3B]/30 text-[#ED1B3B] text-[11px] font-bold flex items-center gap-1">
            <Shield className="w-3 h-3" /> Private Hub
          </span>
        </div>


        {/* ========================================================================= */}
        {/* SECTION 1: UPCOMING EVENTS (Clicking Card Opens Event Details Page) */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold tracking-tight flex items-center gap-2">
              <Calendar className="w-4.5 h-4.5 text-[#ED1B3B]" /> Upcoming Events
            </h2>
            <span className="text-[12px] opacity-60 font-medium">5 Events</span>
          </div>

          {UPCOMING_EVENTS.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => onSelectEvent?.(event.id)}
              className={`w-full rounded-t-none rounded-b-[24px] border overflow-hidden flex flex-col cursor-pointer transition-all hover:border-[#ED1B3B]/60 ${
                theme === "dark" ? "natural-card-reflection" : "bg-white border-[#E0DFDC] shadow-sm"
              }`}
            >
              {/* Sharp Top Banner Frame */}
              <div className="relative w-full h-52 sm:h-56 bg-black overflow-hidden rounded-t-none">
                <Image
                  src={event.banner}
                  alt={event.title}
                  fill
                  unoptimized
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#ED1B3B] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {event.badge}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-[18px] font-bold leading-snug tracking-tight">
                  {event.title}
                </h3>
                {event.subtitle && (
                  <p className="text-[13px] font-semibold text-[#ED1B3B] -mt-1">{event.subtitle}</p>
                )}
                {event.speaker && (
                  <p className="text-[12px] opacity-80 font-medium">Keynote: {event.speaker}</p>
                )}

                <div className="grid grid-cols-2 gap-2 text-[12px] pt-1 opacity-90 border-t border-current/10">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#ED1B3B]" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#ED1B3B]" /> {event.time}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[12px] opacity-90 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#ED1B3B]" /> {event.venue}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] opacity-50 font-medium">Organizer: {event.organizer}</span>
                  <button
                    onClick={(e) => toggleRegister(event.id, e)}
                    className={`py-2 px-5 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
                      registeredEvents[event.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-[#ED1B3B] text-white hover:bg-[#F02847]"
                    }`}
                  >
                    {registeredEvents[event.id] ? "Registered ✓" : "Register Event"}
                  </button>
                </div>

                <div className="flex items-center justify-between border-t pt-3 mt-1 border-current/10">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <button
                      onClick={(e) => toggleLike(event.id, e)}
                      className={`flex items-center gap-1.5 cursor-pointer ${
                        likedPosts[event.id] ? "text-[#ED1B3B]" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts[event.id] ? "fill-current" : ""}`} />
                      <span>{likeCounts[event.id]}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent?.(event.id);
                      }}
                      className="flex items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Event link copied to clipboard.");
                      }}
                      className="flex items-center gap-1.5 opacity-60 hover:opacity-100 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => toggleSave(event.id, e)}
                    className={`cursor-pointer ${
                      savedPosts[event.id] ? "text-[#ED1B3B]" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedPosts[event.id] ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* ========================================================================= */}
        {/* SECTION 2: EXECUTIVE PROGRAMS */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold tracking-tight flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-[#ED1B3B]" /> Executive Programs
            </h2>
          </div>

          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className={`p-5 rounded-[22px] border flex flex-col gap-3 ${
                theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E0DFDC] shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#ED1B3B] bg-[#ED1B3B]/10 px-2.5 py-0.5 rounded-full border border-[#ED1B3B]/20">
                  {prog.duration} Program
                </span>
                <span className="text-[11px] font-semibold opacity-60">{prog.seats}</span>
              </div>
              <h3 className="font-bold text-[16px] leading-snug">{prog.name}</h3>
              <p className="text-[13px] opacity-80 leading-relaxed">{prog.desc}</p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => alert(`Application submitted for ${prog.name}`)}
                  className="py-2 px-4 rounded-xl bg-current/10 font-bold text-xs hover:bg-[#ED1B3B] hover:text-white transition-all cursor-pointer border border-current/15"
                >
                  Apply Program
                </button>
              </div>
            </div>
          ))}
        </div>


        {/* ========================================================================= */}
        {/* SECTION 3: OFFICIAL ANNOUNCEMENTS & BUSINESS NEWS */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-3 pt-2">
          <h2 className="text-[17px] font-bold tracking-tight flex items-center gap-2">
            <Radio className="w-4.5 h-4.5 text-[#ED1B3B]" /> Announcements & News
          </h2>

          {ANNOUNCEMENTS.map((ann) => (
            <div
              key={ann.id}
              className={`p-5 rounded-[22px] border flex flex-col gap-2 ${
                theme === "dark" ? "bg-white/[0.03] border-white/10" : "bg-white border-[#E0DFDC] shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] opacity-60">
                <span className="font-semibold text-[#ED1B3B]">Official Announcement</span>
                <span>{ann.date}</span>
              </div>
              <h3 className="font-bold text-[15px]">{ann.title}</h3>
              <p className="text-[13px] opacity-80 leading-relaxed">{ann.desc}</p>
              <button
                onClick={() => alert(ann.title)}
                className="text-[12px] font-bold text-[#ED1B3B] hover:underline self-start mt-1 cursor-pointer"
              >
                Read Full Announcement →
              </button>
            </div>
          ))}

          {BUSINESS_NEWS.map((news) => (
            <div
              key={news.id}
              className={`p-4 rounded-[20px] border flex flex-col gap-1.5 ${
                theme === "dark" ? "bg-white/[0.02] border-white/10" : "bg-white border-[#E0DFDC] shadow-sm"
              }`}
            >
              <span className="text-[11px] font-bold text-emerald-500">{news.category} • {news.company}</span>
              <h4 className="font-bold text-[14px]">{news.title}</h4>
              <p className="text-[12px] opacity-75">{news.desc}</p>
            </div>
          ))}
        </div>


        {/* ========================================================================= */}
        {/* SECTION 4: SPONSORS */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-2.5 pt-2 pb-4">
          <span className="text-[11px] font-bold tracking-widest uppercase opacity-40 text-center">
            Official Corporate Partners & Sponsors
          </span>
          <div className="flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-bold tracking-tight">
            <span>SYNOSYS</span>
            <span>•</span>
            <span>LOCATOR.AE</span>
            <span>•</span>
            <span>SALT TECH</span>
            <span>•</span>
            <span>EMIRATES GROUP</span>
          </div>
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
          <button
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 text-[#ED1B3B] font-bold cursor-pointer"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={onNavigateToDirectory}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Directory</span>
          </button>

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

          <button
            onClick={() => alert("Executive Notifications Center")}
            className="py-1.5 px-2 rounded-2xl flex flex-col items-center gap-1 opacity-60 hover:opacity-100 hover:text-[#ED1B3B] transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px]">Notifs</span>
          </button>

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
