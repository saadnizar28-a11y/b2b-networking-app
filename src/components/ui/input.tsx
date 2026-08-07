"use client";

import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon: Icon, rightElement, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        <div
          className={`relative flex items-center w-full rounded-[18px] clean-input-glass py-1 ${
            error ? "border-[#ED1B3B]/60" : ""
          } ${className}`}
        >
          {Icon && (
            <div className="pl-4 pr-1.5 flex items-center pointer-events-none text-[#8E8E93]">
              <div className="w-7 h-7 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-[#A1A1A6]" />
              </div>
            </div>
          )}

          <input
            ref={ref}
            className="w-full py-3.5 px-3 bg-transparent text-white text-[15px] placeholder:text-[#6E6E73] focus:outline-none tracking-tight font-normal"
            {...props}
          />

          {rightElement && <div className="pr-4 flex items-center">{rightElement}</div>}
        </div>

        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              className="text-[12px] text-[#ED1B3B] font-medium pl-2 tracking-tight mt-0.5"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
