"use client";

import { useTheme } from "@/context/theme-context";
import { Lightbulb, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer border flex items-center justify-center shadow-sm ${
        theme === "dark"
          ? "bg-white/[0.08] hover:bg-white/15 border-white/15 text-yellow-400"
          : "bg-black/[0.06] hover:bg-black/10 border-black/10 text-amber-600"
      }`}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Lightbulb className="w-4 h-4 fill-yellow-400/20" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </motion.button>
  );
}
