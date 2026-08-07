"use client";

import { useEffect, useState } from "react";
import { Signal, Wifi } from "lucide-react";

export function StatusBar() {
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pt-3 pb-2 px-6 flex items-center justify-between text-white text-[15px] font-semibold tracking-tight select-none z-20">
      {/* Left Time */}
      <span className="font-semibold tracking-tight text-sm text-white/90">{time}</span>

      {/* Center Empty Space for Clean Dynamic Island Hardware Alignment */}
      <div className="w-28 h-5" />

      {/* Right Icons (Signal, Wifi, Battery) */}
      <div className="flex items-center gap-2 text-white/90">
        <Signal className="w-3.5 h-3.5 fill-current" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5 ml-0.5">
          <div className="w-5 h-2.5 rounded-[4px] border border-white/80 p-[1px] flex items-center">
            <div className="h-full w-3.5 bg-white rounded-[1.5px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
