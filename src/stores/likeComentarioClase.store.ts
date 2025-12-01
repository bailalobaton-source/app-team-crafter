// stores/likeComentarioClase.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getLikeComentarioClase,
  postLikeComentarioClase,
  deleteLikeComentarioClase,
} from "@/services/likesComentarioClase.service";

interface LikeComentarioClaseState {
  likedComentarios: number[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchLikes: () => Promise<void>;
  toggleLike: (comentarioId: number) => Promise<void>;
  isLiked: (comentarioId: number) => boolean;
  clearLikes: () => void;
  clearError: () => void;
}

const useLikeComentarioClaseStore = create<LikeComentarioClaseState>()(
  persist(
    (set, get) => ({
      likedComentarios: [],
      isLoading: false,
      error: null,

      fetchLikes: async () => {
        set({ isLoading: true, error: null });
        try {
          const likesFromBackend: number[] = await getLikeComentarioClase();
          set({ likedComentarios: likesFromBackend, isLoading: false });
        } catch (error: unknown) {
          const msg =
            error instanceof Error
              ? error.message
              : "Error fetching comentario likes";
          set({ error: msg, isLoading: false });
        }
      },

      toggleLike: async (comentarioId: number) => {
        const { likedComentarios } = get();
        const wasLiked = likedComentarios.includes(comentarioId);

        // Optimistic update
        const optimisticLikes = wasLiked
          ? likedComentarios.filter((id) => id !== comentarioId)
          : [...likedComentarios, comentarioId];

        set({
          likedComentarios: optimisticLikes,
          isLoading: true,
          error: null,
        });

        try {
          let updatedLikes: number[];

          if (wasLiked) {
            updatedLikes = await deleteLikeComentarioClase(comentarioId);
          } else {
            updatedLikes = await postLikeComentarioClase(comentarioId);
          }

          set({ likedComentarios: updatedLikes, isLoading: false });
        } catch (error: unknown) {
          // Rollback
          set({
            likedComentarios: likedComentarios,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Error toggling comentario like",
          });
        }
      },

      isLiked: (comentarioId: number) =>
        get().likedComentarios.includes(comentarioId),

      clearLikes: () => set({ likedComentarios: [], error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "liked-comentarios-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ likedComentarios: state.likedComentarios }),
    }
  )
);

export default useLikeComentarioClaseStore;
