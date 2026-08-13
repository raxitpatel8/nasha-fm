"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function Clock() {
  const [parts, setParts] = useState<{ time: string; period: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const formatted = formatter.format(new Date());
      const [time, period] = formatted.split(" ");
      setParts({ time, period: period ?? "" });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!parts) {
    return <span className="font-mono text-sm text-paper/60">--:--</span>;
  }

  const [hour, minute] = parts.time.split(":");

  return (
    <div className="flex items-baseline gap-1 font-mono text-sm text-paper tabular sm:text-base">
      <span>{hour}</span>
      <span className="blink">:</span>
      <span>{minute}</span>
      <span className="ml-0.5 text-[0.65em] uppercase tracking-wide text-paper/60">
        {parts.period}
      </span>
    </div>
  );
}
