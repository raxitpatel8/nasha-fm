"use client";

import { useEffect, useState, type RefObject } from "react";

type Rect = { top: number; left: number; width: number; height: number };

function measureVisible(
  desktopEl: HTMLElement | null,
  mobileEl: HTMLElement | null
): Rect | null {
  const el =
    desktopEl && desktopEl.offsetParent !== null
      ? desktopEl
      : mobileEl && mobileEl.offsetParent !== null
        ? mobileEl
        : null;
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

export function VideoStage({
  desktopAnchorRef,
  mobileAnchorRef,
  mountRef,
  isPlaying,
  hasVideo,
}: {
  desktopAnchorRef: RefObject<HTMLDivElement | null>;
  mobileAnchorRef: RefObject<HTMLDivElement | null>;
  mountRef: (el: HTMLDivElement | null) => void;
  isPlaying: boolean;
  hasVideo: boolean;
}) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    const recalc = () =>
      setRect(measureVisible(desktopAnchorRef.current, mobileAnchorRef.current));
    recalc();

    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);
    const ro = new ResizeObserver(recalc);
    if (desktopAnchorRef.current) ro.observe(desktopAnchorRef.current);
    if (mobileAnchorRef.current) ro.observe(mobileAnchorRef.current);
    // catch late webfont/layout shifts pushing the anchor around
    const id = window.setTimeout(recalc, 300);

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
      ro.disconnect();
      window.clearTimeout(id);
    };
  }, [desktopAnchorRef, mobileAnchorRef]);

  if (!rect) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed z-30 overflow-hidden rounded-full ring-2 ring-white/30 ${
        isPlaying ? "vinyl-spin" : ""
      }`}
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        animationPlayState: isPlaying ? "running" : "paused",
      }}
    >
      {hasVideo ? (
        // The live YouTube video fills the circle (cropped to a 1:1 "cover"),
        // spinning with the disc. This is the visible player — never hidden
        // or shrunk to nothing, per YouTube's embed policy.
        <div
          ref={mountRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "178%", height: "100%" }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-terracotta via-terracotta-dim to-ink-2" />
      )}
      <div className="absolute inset-0 m-auto h-[15%] w-[15%] rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}
