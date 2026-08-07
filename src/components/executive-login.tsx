"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, CheckCircle2, Shield } from "lucide-react";

import { BCCLogo } from "@/components/ui/bcc-logo";
import { StatusBar } from "@/components/ui/status-bar";
import { GoogleButton } from "@/components/ui/google-button";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/context/theme-context";

const loginSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface ExecutiveLoginProps {
  onSuccess?: () => void;
}

export function ExecutiveLogin({ onSuccess }: ExecutiveLoginProps) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSuccess = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess?.();
    }, 300);
  };

  const onSubmit = (data: LoginFormValues) => {
    handleLoginSuccess();
  };

  const handleGoogleSignIn = () => {
    handleLoginSuccess();
  };

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between p-6 relative overflow-hidden select-none font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0B0B0D] text-white" : "bg-[#F4F4F6] text-[#0B0B0D]"
      }`}
    >
      {/* Top Mobile Header Navigation with Theme Toggle Bulb */}
      <div className="w-full pt-1 mb-2 flex items-center justify-between z-20">
        <StatusBar />
        <div className="absolute top-3 right-5 z-30">
          <ThemeToggle />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center flex-1 justify-center z-10 w-full my-auto"
      >
        {/* TOP: Official BCC UAE Chapter Logo */}
        <div className="pt-2 pb-7 sm:pb-9 flex justify-center w-full">
          <BCCLogo width={210} height={75} />
        </div>

        {/* WELCOME HEADLINE */}
        <div className="text-center mb-7 w-full px-2">
          <h1 className="text-[32px] sm:text-[34px] font-normal sm:font-medium tracking-[-0.02em] leading-tight">
            Welcome Back
          </h1>
          <p
            className={`text-[15px] font-normal mt-2 tracking-normal leading-relaxed max-w-xs mx-auto ${
              theme === "dark" ? "text-[#8E8E93]" : "text-gray-600"
            }`}
          >
            Connect with verified professionals worldwide.
          </p>
        </div>

        {/* AUTHENTICATION CARD */}
        <div className="w-full natural-card-reflection p-6 sm:p-7 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-8 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-[#ED1B3B]/10 border border-[#ED1B3B]/30 flex items-center justify-center text-[#ED1B3B]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mt-1">Signed In Successfully</h3>
                <p className={`text-xs max-w-xs leading-relaxed ${theme === "dark" ? "text-[#8E8E93]" : "text-gray-600"}`}>
                  Opening Executive Profile...
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="standard-form"
                initial={{ opacity: 1 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full"
              >
                {/* ① Continue with Google */}
                <GoogleButton onClick={handleGoogleSignIn} isLoading={isLoading} />

                {/* ② Divider */}
                <div className="flex items-center gap-3 my-0.5">
                  <div className={`h-[1px] flex-1 ${theme === "dark" ? "bg-white/[0.08]" : "bg-black/[0.08]"}`} />
                  <span className={`text-[12px] font-normal ${theme === "dark" ? "text-[#8E8E93]" : "text-gray-500"}`}>
                    or
                  </span>
                  <div className={`h-[1px] flex-1 ${theme === "dark" ? "bg-white/[0.08]" : "bg-black/[0.08]"}`} />
                </div>

                {/* ③ Email Input */}
                <Input
                  type="email"
                  placeholder="Email address"
                  icon={Mail}
                  {...register("email")}
                  autoComplete="email"
                />

                {/* ④ Password Input */}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  icon={Lock}
                  {...register("password")}
                  autoComplete="current-password"
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#8E8E93] hover:text-white/80 transition-colors focus:outline-none p-1 cursor-pointer"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  }
                />

                {/* ⑤ Forgot Password Link */}
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={() => handleLoginSuccess()}
                    className={`text-[13px] hover:underline transition-colors duration-200 cursor-pointer font-normal ${
                      theme === "dark" ? "text-[#8E8E93]" : "text-gray-600"
                    }`}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* ⑥ Primary Sign In Button (BCC Red #ED1B3B) */}
                <div className="mt-1">
                  <PrimaryButton isLoading={isLoading} type="submit">
                    Sign In
                  </PrimaryButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* BOTTOM SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full flex flex-col items-center gap-4 pt-6 pb-2 z-10 text-center"
      >
        {/* Create Account Link (Only Create Account uses BCC Red) */}
        <p className={`text-[14px] ${theme === "dark" ? "text-[#8E8E93]" : "text-gray-600"}`}>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => onSuccess?.()}
            className="text-[#ED1B3B] font-medium hover:underline cursor-pointer ml-0.5"
          >
            Create Account
          </button>
        </p>

        {/* Minimal Security Shield Divider & Terms/Privacy */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2 opacity-30">
            <div className={`w-10 h-[1px] ${theme === "dark" ? "bg-white" : "bg-black"}`} />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              theme === "dark" ? "border-white" : "border-black"
            }`}>
              <Shield className="w-3 h-3" />
            </div>
            <div className={`w-10 h-[1px] ${theme === "dark" ? "bg-white" : "bg-black"}`} />
          </div>

          <div className={`flex items-center gap-3 text-[13px] tracking-tight ${
            theme === "dark" ? "text-[#8E8E93]" : "text-gray-600"
          }`}>
            <button
              type="button"
              onClick={() => alert("Privacy Policy.")}
              className="hover:underline transition-colors cursor-pointer font-normal"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => alert("Terms of Service.")}
              className="hover:underline transition-colors cursor-pointer font-normal"
            >
              Terms
            </button>
          </div>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className={`w-36 h-1 rounded-full mt-2 mx-auto ${theme === "dark" ? "bg-white/30" : "bg-black/30"}`} />
      </motion.div>
    </div>
  );
}
