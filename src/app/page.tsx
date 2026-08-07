"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/context/theme-context";
import { ExecutiveLogin } from "@/components/executive-login";
import { HomeScreen } from "@/components/home-screen";
import { ExecutiveProfile } from "@/components/executive-profile";
import { MemberDirectory } from "@/components/member-directory";
import { EventDetails } from "@/components/event-details";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "home" | "profile" | "directory" | "event-details">("login");
  const [selectedEventId, setSelectedEventId] = useState<number>(1);

  const handleSelectEvent = (id: number) => {
    setSelectedEventId(id);
    setCurrentScreen("event-details");
  };

  return (
    <ThemeProvider>
      <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-x-hidden font-sans subtle-grain">
        <AnimatePresence mode="wait">
          {currentScreen === "login" && (
            <motion.div
              key="login-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <ExecutiveLogin onSuccess={() => setCurrentScreen("home")} />
            </motion.div>
          )}

          {currentScreen === "home" && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <HomeScreen
                onNavigateToProfile={() => setCurrentScreen("profile")}
                onNavigateToDirectory={() => setCurrentScreen("directory")}
                onBackToLogin={() => setCurrentScreen("login")}
                onSelectEvent={handleSelectEvent}
              />
            </motion.div>
          )}

          {currentScreen === "event-details" && (
            <motion.div
              key="event-details-screen"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <EventDetails
                eventId={selectedEventId}
                onBack={() => setCurrentScreen("home")}
                onNavigateToHome={() => setCurrentScreen("home")}
                onNavigateToDirectory={() => setCurrentScreen("directory")}
                onNavigateToProfile={() => setCurrentScreen("profile")}
              />
            </motion.div>
          )}

          {currentScreen === "profile" && (
            <motion.div
              key="profile-screen"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <ExecutiveProfile
                onNavigateToHome={() => setCurrentScreen("home")}
                onNavigateToDirectory={() => setCurrentScreen("directory")}
                onBackToLogin={() => setCurrentScreen("login")}
              />
            </motion.div>
          )}

          {currentScreen === "directory" && (
            <motion.div
              key="directory-screen"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              <MemberDirectory
                onNavigateToHome={() => setCurrentScreen("home")}
                onNavigateToProfile={() => setCurrentScreen("profile")}
                onBackToLogin={() => setCurrentScreen("login")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ThemeProvider>
  );
}
