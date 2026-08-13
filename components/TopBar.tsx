import { Clock } from "./Clock";
import { ListenerCount } from "./ListenerCount";
import { SocialLinks } from "./SocialLinks";

export function TopBar() {
  return (
    <div className="safe-t safe-l safe-r fixed z-20 grid grid-cols-3 items-start">
      <div className="justify-self-start pt-1">
        <Clock />
      </div>

      <div className="justify-self-center text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-[var(--color-amber)]">〽</span>
          <span>Nasha FM</span>
          <span className="text-[var(--color-amber)]">〽</span>
        </div>
        <div className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-paper-dim sm:text-xs">
          90s Hindi Nostalgia
        </div>
        <div className="mt-1 text-[10px] font-semibold tracking-wide text-[var(--color-amber)] sm:text-xs">
          Nasha FM • Raxit
        </div>
        <div className="mt-3">
          <ListenerCount />
        </div>
      </div>

      <div className="justify-self-end pt-0">
        <SocialLinks />
      </div>
    </div>
  );
}
