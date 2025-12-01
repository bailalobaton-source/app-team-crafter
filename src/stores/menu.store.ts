// stores/cartUIStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MenuUIState {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useMenuUIStore = create<MenuUIState>()(
  persist(
    (set) => ({
      isOpen: false,
      openMenu: () => set({ isOpen: true }),
      closeMenu: () => set({ isOpen: false }),
      toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "shopping-menu-ui",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
