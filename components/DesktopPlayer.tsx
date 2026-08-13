"use client";

import type { RefObject } from "react";
import type { Track } from "@/lib/tracks";
import { SeekBar } from "./SeekBar";
import { TransportControls } from "./TransportControls";
import { formatTime } from "@/lib/format";

export function DesktopPlayer({
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
    <div className="hidden w-full items-center gap-4 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] p-3 pr-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-[1.7] sm:flex">
      <div
        ref={vinylAnchorRef}
        className="relative h-20 w-20 shrink-0 self-start rounded-full"
      />

      <div className="min-w-0 flex-1">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-paper">{track.title}</p>
          <p className="truncate text-[12.5px] text-paper/70">
            {track.artist} &middot; {track.film} ({track.year})
          </p>
        </div>

        <div className="mt-1">
          <SeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
        </div>
        <div className="-mt-1 flex justify-between font-mono text-[10.5px] tabular text-paper/55">
          <span>{formatTime(currentTime)}</span>
          <span>{duration > 0 ? formatTime(duration) : track.duration}</span>
        </div>
      </div>

      <TransportControls
        isPlaying={isPlaying}
        onToggle={onToggle}
        onPrev={onPrev}
        onNext={onNext}
        size="sm"
      />
    </div>
  );
}
