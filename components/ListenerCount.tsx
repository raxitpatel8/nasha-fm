"use client";

import { useEffect, useState } from "react";

export function ListenerCount() {
  const [count, setCount] = useState(482);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3..+3
        return Math.max(140, c + delta);
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_6px_2px_rgba(232,163,61,0.7)]" />
      <span className="font-mono text-xs tabular text-paper/90 sm:text-sm">
        {count.toLocaleString("en-IN")}
      </span>
      <span className="hidden text-xs text-paper/60 sm:inline">tuned in</span>
    </div>
  );
}
