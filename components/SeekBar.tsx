"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export function SeekBar({
  currentTime,
  duration,
  onSeek,
}: {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragProgress, setDragProgress] = useState<number | null>(null);

  const progress = dragProgress ?? (duration > 0 ? currentTime / duration : 0);

  const ratioFromEvent = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragProgress(ratioFromEvent(e));
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragProgress === null) return;
    setDragProgress(ratioFromEvent(e));
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragProgress === null) return;
    const ratio = ratioFromEvent(e);
    setDragProgress(null);
    if (duration > 0) onSeek(ratio * duration);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="group relative flex h-6 w-full touch-none items-center"
    >
      <div className="relative h-[3px] w-full rounded-full bg-white/15">
        <div
          className="seek-fill-glow absolute inset-y-0 left-0 rounded-full bg-amber"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100"
          style={{ left: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
