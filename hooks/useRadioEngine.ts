"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track as trackAnalyticsEvent } from "@vercel/analytics";
import { playlists as allPlaylists, type Track } from "@/lib/tracks";
import { useYouTubeApiReady } from "./useYouTubeApiReady";
import type { YTPlayer, YTPlayerEvent, YTErrorEvent } from "@/lib/youtube-types";

export type RadioState = {
  playlistIndex: number;
  trackIndex: number;
  track: Track;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  isReady: boolean;
};

export type RadioControls = {
  mountRef: (el: HTMLDivElement | null) => void;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (seconds: number) => void;
  selectPlaylist: (playlistIndex: number) => void;
  selectTrack: (trackIndex: number) => void;
};

export function useRadioEngine(): RadioState & RadioControls {
  const apiReady = useYouTubeApiReady();

  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const wantsAutoplayRef = useRef(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = allPlaylists[playlistIndex].tracks[trackIndex];

  // ---- keep latest indices in refs so YT callbacks (bound once) stay fresh ----
  const stateRef = useRef({ playlistIndex, trackIndex });
  stateRef.current = { playlistIndex, trackIndex };

  const advanceTrack = useCallback((direction: 1 | -1) => {
    const { playlistIndex: pIdx, trackIndex: tIdx } = stateRef.current;
    const list = allPlaylists[pIdx].tracks;
    const nextIndex = (tIdx + direction + list.length) % list.length;
    setTrackIndex(nextIndex);
  }, []);

  const startPolling = useCallback(() => {
    if (pollRef.current) return;
    pollRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      const d = p.getDuration();
      setCurrentTime(p.getCurrentTime());
      if (d > 0) setDuration(d);
    }, 500);
  }, []);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  // ---- create the player exactly once, as soon as both the API and the
  // DOM mount node exist (mount node can arrive asynchronously, after the
  // video stage measures its anchor — so this is state, not a ref, to
  // re-trigger the effect below when it shows up) ----
  const mountRef = useCallback((el: HTMLDivElement | null) => {
    setContainerEl(el);
  }, []);

  // latest videoId, kept fresh for the onError closure (bound once at
  // player construction) so it always reports the track that actually errored
  const currentVideoIdRef = useRef(track.videoId);
  currentVideoIdRef.current = track.videoId;
  // tracks which videoId is currently loaded in the player, so the
  // track-change effect below doesn't redundantly reload on first ready
  const lastLoadedVideoIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!apiReady || !containerEl || playerRef.current) return;
    if (!window.YT) return;

    const currentTrack = allPlaylists[stateRef.current.playlistIndex].tracks[
      stateRef.current.trackIndex
    ];

    playerRef.current = new window.YT.Player(containerEl, {
      // Constructed with no videoId when none is set yet — a later effect
      // cues/loads it as soon as the track has one, so newly-added
      // videoIds pick up without a page refresh.
      videoId: currentTrack.videoId || undefined,
      playerVars: {
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        fs: 0,
      },
      events: {
        onReady: () => {
          lastLoadedVideoIdRef.current = currentTrack.videoId || null;
          setIsReady(true);
        },
        onStateChange: (e: YTPlayerEvent) => {
          const YTns = window.YT!;
          if (e.data === YTns.PlayerState.PLAYING) {
            setIsPlaying(true);
            setIsBuffering(false);
            startPolling();
          } else if (e.data === YTns.PlayerState.PAUSED) {
            setIsPlaying(false);
            stopPolling();
          } else if (e.data === YTns.PlayerState.BUFFERING) {
            setIsBuffering(true);
          } else if (e.data === YTns.PlayerState.ENDED) {
            setIsPlaying(false);
            stopPolling();
            wantsAutoplayRef.current = true;
            advanceTrack(1);
          }
        },
        onError: (e: YTErrorEvent) => {
          trackAnalyticsEvent("youtube_playback_error", {
            code: e.data,
            videoId: currentVideoIdRef.current,
          });
          wantsAutoplayRef.current = true;
          advanceTrack(1);
        },
      },
    });

    return () => {
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiReady, containerEl]);

  // ---- whenever the active track changes, cue/load it into the player ----
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !isReady) return;
    if (!track.videoId) return;
    if (lastLoadedVideoIdRef.current === track.videoId) return;
    lastLoadedVideoIdRef.current = track.videoId;

    setCurrentTime(0);
    setDuration(0);
    if (wantsAutoplayRef.current || isPlaying) {
      p.loadVideoById(track.videoId);
      wantsAutoplayRef.current = false;
    } else {
      p.cueVideoById(track.videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.videoId, isReady]);

  useEffect(() => stopPolling, [stopPolling]);

  const play = useCallback(() => {
    playerRef.current?.playVideo();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    wantsAutoplayRef.current = isPlaying;
    advanceTrack(1);
  }, [advanceTrack, isPlaying]);

  const prev = useCallback(() => {
    wantsAutoplayRef.current = isPlaying;
    advanceTrack(-1);
  }, [advanceTrack, isPlaying]);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setCurrentTime(seconds);
  }, []);

  const selectPlaylist = useCallback(
    (nextPlaylistIndex: number) => {
      wantsAutoplayRef.current = isPlaying;
      setPlaylistIndex(nextPlaylistIndex);
      setTrackIndex(0); // switching playlist always restarts at track 1
    },
    [isPlaying]
  );

  const selectTrack = useCallback(
    (nextTrackIndex: number) => {
      wantsAutoplayRef.current = isPlaying;
      setTrackIndex(nextTrackIndex);
    },
    [isPlaying]
  );

  return {
    playlistIndex,
    trackIndex,
    track,
    isPlaying,
    isBuffering,
    currentTime,
    duration,
    isReady,
    mountRef,
    toggle,
    play,
    pause,
    next,
    prev,
    seekTo,
    selectPlaylist,
    selectTrack,
  };
}
