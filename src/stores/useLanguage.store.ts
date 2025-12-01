import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LanguageState {
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "es", // idioma por defecto
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set({ language: get().language === "es" ? "en" : "es" }),
    }),
    {
      name: "language-preference", // clave del localStorage
      storage: createJSONStorage(() => localStorage), // persistencia en localStorage
    }
  )
);
