"use client";

import { ExecutiveLogin } from "@/components/executive-login";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#0B0B0D] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans subtle-grain">
      <ExecutiveLogin />
    </main>
  );
}
