// stores/likeClases.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getLikeClases,
  postLikeClases,
  deleteLikeClases,
} from "@/services/likesClases.service";

interface LikeClasesState {
  likedClases: number[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchLikes: () => Promise<void>;
  toggleLike: (claseId: number) => Promise<void>;
  isLiked: (claseId: number) => boolean;
  clearLikes: () => void;
  clearError: () => void;
}

const useLikedClasesStore = create<LikeClasesState>()(
  persist(
    (set, get) => ({
      likedClases: [],
      isLoading: false,
      error: null,

      fetchLikes: async () => {
        set({ isLoading: true, error: null });
        try {
          const likesFromBackend: number[] = await getLikeClases();
          set({ likedClases: likesFromBackend, isLoading: false });
        } catch (error: unknown) {
          const msg =
            error instanceof Error ? error.message : "Error fetching likes";
          set({ error: msg, isLoading: false });
        }
      },

      toggleLike: async (claseId: number) => {
        const { likedClases } = get();
        const wasLiked = likedClases.includes(claseId);

        // Optimistic update - actualizar UI inmediatamente
        const optimisticLikes = wasLiked
          ? likedClases.filter((id) => id !== claseId)
          : [...likedClases, claseId];

        set({
          likedClases: optimisticLikes,
          isLoading: true,
          error: null,
        });

        try {
          let updatedLikes: number[];

          if (wasLiked) {
            updatedLikes = await deleteLikeClases(claseId);
          } else {
            updatedLikes = await postLikeClases(claseId);
          }

          // Sincronizar con la respuesta del backend
          set({ likedClases: updatedLikes, isLoading: false });
        } catch (error: unknown) {
          // Rollback en caso de error
          set({
            likedClases: likedClases, // volver al estado anterior
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Error toggling like",
          });
        }
      },

      isLiked: (claseId: number) => get().likedClases.includes(claseId),

      clearLikes: () => set({ likedClases: [], error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "liked-clases-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ likedClases: state.likedClases }),
    }
  )
);

export default useLikedClasesStore;
