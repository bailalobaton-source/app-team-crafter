import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getLikeComentarioForo,
  postLikeComentarioForo,
  deleteLikeComentarioForo,
} from "@/services/likesComentarioForo.service";

interface LikeComentarioForoState {
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

const useLikeComentarioForoStore = create<LikeComentarioForoState>()(
  persist(
    (set, get) => ({
      likedComentarios: [],
      isLoading: false,
      error: null,

      fetchLikes: async () => {
        set({ isLoading: true, error: null });
        try {
          const likesFromBackend: number[] = await getLikeComentarioForo();
          set({ likedComentarios: likesFromBackend, isLoading: false });
        } catch (error: unknown) {
          const msg =
            error instanceof Error
              ? error.message
              : "Error fetching comentario foro likes";
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
            updatedLikes = await deleteLikeComentarioForo(comentarioId);
          } else {
            updatedLikes = await postLikeComentarioForo(comentarioId);
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
                : "Error toggling comentario foro like",
          });
        }
      },

      isLiked: (comentarioId: number) =>
        get().likedComentarios.includes(comentarioId),

      clearLikes: () => set({ likedComentarios: [], error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "liked-comentarios-foro-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ likedComentarios: state.likedComentarios }),
    }
  )
);

export default useLikeComentarioForoStore;
