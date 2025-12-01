// stores/perfil.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/interfaces/user.type";

interface PerfilState {
  perfil: User | null;
  setPerfil: (perfil: User) => void;
  updatePerfil: (partialPerfil: Partial<User>) => void;
  clearPerfil: () => void;
}

export const usePerfilStore = create<PerfilState>()(
  persist(
    (set, get) => ({
      perfil: null,
      setPerfil: (perfil) => set({ perfil: { ...perfil } }), // fuerza nueva referencia
      updatePerfil: (partialPerfil) =>
        set((state) => ({
          perfil: state.perfil
            ? ({ ...state.perfil, ...partialPerfil } as User)
            : { ...(partialPerfil as User) },
        })),
      clearPerfil: () => set({ perfil: null }),
    }),
    {
      name: "perfil-storage",
    }
  )
);
