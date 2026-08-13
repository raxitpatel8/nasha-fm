"use client";

import { useRef } from "react";
import { useRadioEngine } from "@/hooks/useRadioEngine";
import { VideoStage } from "./VideoStage";
import { DesktopPlayer } from "./DesktopPlayer";
import { MobilePlayer } from "./MobilePlayer";
import { PlaylistTabs } from "./PlaylistTabs";

export function RadioPlayer() {
  const engine = useRadioEngine();
  const desktopAnchorRef = useRef<HTMLDivElement>(null);
  const mobileAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="safe-pb relative z-20 mt-auto flex w-full max-w-xl flex-col gap-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
      <PlaylistTabs
        activeIndex={engine.playlistIndex}
        onSelect={engine.selectPlaylist}
      />

      <DesktopPlayer
        track={engine.track}
        isPlaying={engine.isPlaying}
        currentTime={engine.currentTime}
        duration={engine.duration}
        onSeek={engine.seekTo}
        onToggle={engine.toggle}
        onPrev={engine.prev}
        onNext={engine.next}
        vinylAnchorRef={desktopAnchorRef}
      />
      <MobilePlayer
        track={engine.track}
        isPlaying={engine.isPlaying}
        currentTime={engine.currentTime}
        duration={engine.duration}
        onSeek={engine.seekTo}
        onToggle={engine.toggle}
        onPrev={engine.prev}
        onNext={engine.next}
        vinylAnchorRef={mobileAnchorRef}
      />

      <VideoStage
        desktopAnchorRef={desktopAnchorRef}
        mobileAnchorRef={mobileAnchorRef}
        mountRef={engine.mountRef}
        isPlaying={engine.isPlaying}
        hasVideo={Boolean(engine.track.videoId)}
      />
    </div>
  );
}
