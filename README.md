# Nasha FM — 90s Hindi Nostalgia Radio

A single-page nostalgia radio built with Next.js App Router, TypeScript, and Tailwind v4.
A floating glass-pill player (stacked card on mobile) drives the YouTube IFrame API across
three mood-based playlists pulled from your "Top 19 Picks" list.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Two things left for you

**1. Video IDs.** Every track in `lib/tracks.ts` has an empty `videoId`. I didn't search
YouTube for these songs myself — per your brief, only add official rights-holder uploads
(T-Series, Saregama, Zee Music, etc.) with embedding enabled. Fill in each `videoId: ""`
and the player picks it up automatically, even mid-session (no refresh needed). Until a
track has an ID, its "vinyl" shows a plain gradient disc instead of live video — that's
expected, not a bug.

**2. Portrait background.** `public/bg/scene-tall.png` is currently a copy of your
landscape scene as a placeholder. Swap in your separately-composed portrait image when
it's ready — `app/globals.css` already swaps to it under `@media (orientation: portrait)`.

## Project structure

```
app/
  layout.tsx        fonts, viewport (viewportFit: cover), metadata, Analytics/SpeedInsights
  page.tsx           assembles the page (server component)
  globals.css        Tailwind v4 @theme tokens, keyframes, safe-area helpers
components/
  RadioPlayer.tsx    owns the engine hook, anchors, renders both player blocks
  DesktopPlayer.tsx  glass pill (sm:flex)
  MobilePlayer.tsx   stacked card (sm:hidden)
  VideoStage.tsx      the one real YT iframe, repositioned over whichever vinyl is visible
  SeekBar.tsx, TransportControls.tsx, PlaylistTabs.tsx, icons.tsx
  Clock.tsx, ListenerCount.tsx, SocialLinks.tsx, TopBar.tsx, BackgroundLayers.tsx
hooks/
  useRadioEngine.ts       playback state machine + the single YT.Player instance
  useYouTubeApiReady.ts   loads the IFrame API script once, globally
lib/
  tracks.ts           the 3 playlists / 19 tracks
  youtube-types.ts    minimal ambient types for the YT IFrame API
  format.ts           mm:ss helper
```

## Notes on a few implementation choices

- **One player, two layouts.** Only one `YT.Player` instance ever exists. `VideoStage`
  measures whichever of the desktop/mobile "vinyl" anchors is currently visible
  (`offsetParent !== null`) and repositions a single fixed, circular, always-visible
  video element over it — so you never get two players fighting for audio, and the
  video is never hidden behind `display:none` while active.
- **Sub-components live at module scope** (`DesktopPlayer`, `MobilePlayer`,
  `TransportControls`, etc.), so the vinyl's CSS animation doesn't restart on every
  progress tick.
- **Play button never gates on `canplay`.** Transport controls call
  `playVideo()`/`pauseVideo()` directly from the click handler.


### Fixed in this version
- Added the reviewed YouTube video IDs for 8 tracks.
- Corrected `Yeh Jo Des Hai Tera` / `Swades` release year from 1997 to 2004.
- The other tracks still have blank `videoId` values and will need their official/rightsholder YouTube IDs added before they can play.

- Replaced `public/bg/scene-wide.png` with the new uploaded street-cricket background artwork.
