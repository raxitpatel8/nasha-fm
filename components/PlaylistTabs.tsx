import { playlists } from "@/lib/tracks";

export function PlaylistTabs({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 px-1">
      {playlists.map((pl, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={pl.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors sm:text-xs ${
              active
                ? "border-amber/60 bg-amber/15 text-amber"
                : "border-white/10 bg-black/25 text-paper/60 hover:text-paper/90"
            }`}
          >
            {pl.name}
          </button>
        );
      })}
    </div>
  );
}
