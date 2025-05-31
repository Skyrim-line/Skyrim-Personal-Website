import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      /**
       * Toggles the theme between dark and light mode.
       */
      toggleTheme: () => {
        set((state) => {
          const next = !state.isDark;

          // Set the class on the root
          // There is no other way to resolve this unless using document directly
          // shadcn/ui docs also suggest this
          // https://ui.shadcn.com/docs/dark-mode/vite
          const root = window.document.documentElement;
          root.classList.toggle("dark", next);
          return { isDark: next };
        });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
