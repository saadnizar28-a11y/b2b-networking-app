"use client";

import React, { useState } from "react";
import { ThemeProvider } from "@/context/theme-context";
import { ExecutiveLogin } from "@/components/executive-login";
import { ExecutiveProfile } from "@/components/executive-profile";
import { MemberDirectory } from "@/components/member-directory";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "profile" | "directory">("login");

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
              <ExecutiveLogin onSuccess={() => setCurrentScreen("profile")} />
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
                onBackToLogin={() => setCurrentScreen("login")}
                onNavigateToDirectory={() => setCurrentScreen("directory")}
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
