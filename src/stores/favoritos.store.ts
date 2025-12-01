// stores/favoritos.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  getFavoritos,
  postFavorito,
  deleteFavorito,
} from "@/services/favorito.service";

interface FavoritosState {
  favoritos: number[];
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchFavoritos: () => Promise<void>;
  toggleFavorito: (id: number) => Promise<void>;
  isFavorito: (id: number) => boolean;
  clearFavoritos: () => void;
  clearError: () => void;
}

const useFavoritosStore = create<FavoritosState>()(
  persist(
    (set, get) => ({
      favoritos: [],
      isLoading: false,
      error: null,

      fetchFavoritos: async () => {
        set({ isLoading: true, error: null });
        try {
          const favoritosFromBackend: number[] = await getFavoritos();
          set({ favoritos: favoritosFromBackend, isLoading: false });
        } catch (error: unknown) {
          const msg =
            error instanceof Error ? error.message : "Error fetching favoritos";
          set({ error: msg, isLoading: false });
        }
      },

      toggleFavorito: async (id: number) => {
        const { favoritos } = get();
        const wasFavorito = favoritos.includes(id);

        // Optimistic update - actualizar UI inmediatamente
        const optimisticFavoritos = wasFavorito
          ? favoritos.filter((favId) => favId !== id)
          : [...favoritos, id];

        set({
          favoritos: optimisticFavoritos,
          isLoading: true,
          error: null,
        });

        try {
          let updatedFavoritos: number[];

          if (wasFavorito) {
            updatedFavoritos = await deleteFavorito(id);
          } else {
            updatedFavoritos = await postFavorito(id);
          }

          // Sincronizar con la respuesta del backend
          set({ favoritos: updatedFavoritos, isLoading: false });
        } catch (error: unknown) {
          // Rollback en caso de error
          set({
            favoritos: favoritos, // volver al estado anterior
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Error toggling favorito",
          });
        }
      },

      isFavorito: (id: number) => get().favoritos.includes(id),

      clearFavoritos: () => set({ favoritos: [], error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "favoritos-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favoritos: state.favoritos }),
    }
  )
);

export default useFavoritosStore;
