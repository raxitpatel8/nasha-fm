import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "./icons";

export function TransportControls({
  isPlaying,
  onToggle,
  onPrev,
  onNext,
  size = "sm",
}: {
  isPlaying: boolean;
  onToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  size?: "sm" | "lg";
}) {
  const playSize = size === "lg" ? "h-[52px] w-[52px]" : "h-10 w-10";
  const sideSize = size === "lg" ? "h-11 w-11" : "h-8 w-8";
  const iconSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  const sideIconSize = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <div className="flex items-center gap-1 sm:gap-1">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className={`grid ${sideSize} place-items-center rounded-full text-paper/75 transition-colors hover:text-paper active:scale-95`}
      >
        <PrevIcon className={sideIconSize} />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={`grid ${playSize} place-items-center rounded-full bg-gradient-to-b from-amber to-amber-dim text-ink ring-1 ring-white/25 shadow-[0_8px_20px_-4px_rgba(232,163,61,0.65)] transition-transform active:scale-95`}
      >
        {isPlaying ? (
          <PauseIcon className={iconSize} />
        ) : (
          <PlayIcon className={`${iconSize} translate-x-[1px]`} />
        )}
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className={`grid ${sideSize} place-items-center rounded-full text-paper/75 transition-colors hover:text-paper active:scale-95`}
      >
        <NextIcon className={sideIconSize} />
      </button>
    </div>
  );
}
