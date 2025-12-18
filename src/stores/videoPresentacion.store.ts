import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VideoState {
  hasWatchedVideo: boolean;
  setWatched: () => void;
  reset: () => void;
  clear: () => void;
}

export const useVideoStore = create<VideoState>()(
  persist(
    (set) => ({
      hasWatchedVideo: false,
      setWatched: () => set({ hasWatchedVideo: true }),
      reset: () => set({ hasWatchedVideo: false }),
      clear: () => {
        useVideoStore.persist.clearStorage();
        set({ hasWatchedVideo: false });
      },
    }),
    {
      name: "video-presentacion",
    }
  )
);
