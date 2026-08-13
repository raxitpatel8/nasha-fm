"use client";

import type { RefObject } from "react";
import type { Track } from "@/lib/tracks";
import { SeekBar } from "./SeekBar";
import { TransportControls } from "./TransportControls";
import { formatTime } from "@/lib/format";

export function MobilePlayer({
  track,
  isPlaying,
  currentTime,
  duration,
  onSeek,
  onToggle,
  onPrev,
  onNext,
  vinylAnchorRef,
}: {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  vinylAnchorRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7] sm:hidden">
      <div className="flex items-center gap-3">
        <div
          ref={vinylAnchorRef}
          className="relative h-16 w-16 shrink-0 self-start rounded-full"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-paper">{track.title}</p>
          <p className="truncate text-[12.5px] text-paper/70">
            {track.artist} &middot; {track.film} ({track.year})
          </p>
        </div>
      </div>

      <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <span className="font-mono text-[10.5px] tabular text-paper/55">
          {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : track.duration}
        </span>
        <TransportControls
          isPlaying={isPlaying}
          onToggle={onToggle}
          onPrev={onPrev}
          onNext={onNext}
          size="lg"
        />
        <span aria-hidden />
      </div>
    </div>
  );
}
