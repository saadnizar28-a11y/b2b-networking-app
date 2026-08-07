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

// Zod schema for login form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function ExecutiveLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen flex flex-col justify-between p-6 relative overflow-hidden select-none font-sans">
      {/* Top Mobile Status Header */}
      <div className="w-full pt-1 mb-2">
        <StatusBar />
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
          <h1 className="text-[32px] sm:text-[34px] font-normal sm:font-medium text-white tracking-[-0.02em] leading-tight">
            Welcome Back
          </h1>
          <p className="text-[#8E8E93] text-[15px] font-normal mt-2 tracking-normal leading-relaxed max-w-xs mx-auto">
            Connect with verified professionals worldwide.
          </p>
        </div>

        {/* AUTHENTICATION CARD */}
        <div className="w-full clean-app-card p-6 sm:p-7 flex flex-col gap-4">
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
                <h3 className="text-lg font-medium text-white mt-1">Signed In Successfully</h3>
                <p className="text-xs text-[#8E8E93] max-w-xs leading-relaxed">
                  Connecting to BCC Executive Portal...
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-3 text-xs text-[#ED1B3B] hover:underline font-medium cursor-pointer"
                >
                  Sign in with another account
                </button>
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
                  <div className="h-[1px] flex-1 bg-white/[0.08]" />
                  <span className="text-[12px] font-normal text-[#8E8E93]">
                    or
                  </span>
                  <div className="h-[1px] flex-1 bg-white/[0.08]" />
                </div>

                {/* ③ Email Input */}
                <Input
                  type="email"
                  placeholder="Email address"
                  icon={Mail}
                  error={errors.email?.message}
                  {...register("email")}
                  autoComplete="email"
                />

                {/* ④ Password Input */}
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  icon={Lock}
                  error={errors.password?.message}
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
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  }
                />

                {/* ⑤ Forgot Password Link */}
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={() => alert("Password reset instructions sent to your registered email.")}
                    className="text-[13px] text-[#8E8E93] hover:text-white transition-colors duration-200 cursor-pointer font-normal"
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
        <p className="text-[14px] text-[#8E8E93]">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => alert("Redirecting to executive account creation...")}
            className="text-[#ED1B3B] font-medium hover:underline cursor-pointer ml-0.5"
          >
            Create Account
          </button>
        </p>

        {/* Minimal Security Shield Divider & Terms/Privacy */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2 text-white/20">
            <div className="w-10 h-[1px] bg-white/10" />
            <div className="w-5 h-5 rounded-full border border-white/15 flex items-center justify-center">
              <Shield className="w-3 h-3 text-[#8E8E93]" />
            </div>
            <div className="w-10 h-[1px] bg-white/10" />
          </div>

          <div className="flex items-center gap-3 text-[13px] text-[#8E8E93] tracking-tight">
            <button
              type="button"
              onClick={() => alert("Privacy Policy.")}
              className="hover:text-white transition-colors cursor-pointer font-normal"
            >
              Privacy
            </button>
            <span className="text-[#8E8E93]">•</span>
            <button
              type="button"
              onClick={() => alert("Terms of Service.")}
              className="hover:text-white transition-colors cursor-pointer font-normal"
            >
              Terms
            </button>
          </div>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="w-36 h-1 bg-white/30 rounded-full mt-2 mx-auto" />
      </motion.div>
    </div>
  );
}
