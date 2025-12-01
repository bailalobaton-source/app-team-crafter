// stores/likeForo.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getLikeForos,
  postLikeForos,
  deleteLikeForos,
} from "@/services/likesForos.service";

interface LikeForoState {
  likedForos: number[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchLikes: () => Promise<void>;
  toggleLike: (foroId: number) => Promise<void>;
  isLiked: (foroId: number) => boolean;
  clearLikes: () => void;
  clearError: () => void;
}

const useLikedForoStore = create<LikeForoState>()(
  persist(
    (set, get) => ({
      likedForos: [],
      isLoading: false,
      error: null,

      fetchLikes: async () => {
        set({ isLoading: true, error: null });
        try {
          const likesFromBackend: number[] = await getLikeForos();

          set({ likedForos: likesFromBackend, isLoading: false });
        } catch (error: unknown) {
          const msg =
            error instanceof Error
              ? error.message
              : "Error fetching foro likes";
          set({ error: msg, isLoading: false });
        }
      },

      toggleLike: async (foroId: number) => {
        const { likedForos } = get();
        const wasLiked = likedForos.includes(foroId);

        // Optimistic update
        const optimisticLikes = wasLiked
          ? likedForos.filter((id) => id !== foroId)
          : [...likedForos, foroId];

        set({
          likedForos: optimisticLikes,
          isLoading: true,
          error: null,
        });

        try {
          let updatedLikes: number[];

          if (wasLiked) {
            updatedLikes = await deleteLikeForos(foroId);
          } else {
            updatedLikes = await postLikeForos(foroId);
          }

          set({ likedForos: updatedLikes, isLoading: false });
        } catch (error: unknown) {
          // Rollback en caso de error
          set({
            likedForos: likedForos,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Error toggling foro like",
          });
        }
      },

      isLiked: (foroId: number) => get().likedForos.includes(foroId),

      clearLikes: () => set({ likedForos: [], error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "liked-foro-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ likedForos: state.likedForos }),
    }
  )
);

export default useLikedForoStore;
