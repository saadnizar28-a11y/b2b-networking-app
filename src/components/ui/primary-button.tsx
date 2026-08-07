"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function PrimaryButton({
  children,
  onClick,
  type = "submit",
  isLoading = false,
  disabled = false,
  className = "",
}: PrimaryButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full py-4 px-6 clean-primary-btn text-white rounded-[20px] font-semibold text-[16px] tracking-tight flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 select-none ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-white" />
      ) : (
        <span>{children}</span>
      )}
    </motion.button>
  );
}
