export type ResolvedTheme = "dark" | "light";

const THEME_COLORS = {
  dark: {
    page: "#030712",
    header: "#111827",
  },
  light: {
    page: "#ffffff",
    header: "#ffffff",
  },
} as const;

export function resolveTheme(theme: "dark" | "light" | "system"): ResolvedTheme {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

/** iOS Safari often ignores content updates on an existing theme-color meta tag. */
export function setThemeColor(color: string) {
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove());

  const meta = document.createElement("meta");
  meta.name = "theme-color";
  meta.content = color;
  document.head.appendChild(meta);
}

export function applyDocumentTheme(
  resolvedTheme: ResolvedTheme,
  options?: { scrolled?: boolean },
) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;

  const colors = THEME_COLORS[resolvedTheme];
  const themeColor = options?.scrolled ? colors.header : colors.page;
  setThemeColor(themeColor);

  document.body.style.backgroundColor = colors.page;
}

export function getThemeColor(
  resolvedTheme: ResolvedTheme,
  scrolled = false,
) {
  const colors = THEME_COLORS[resolvedTheme];
  return scrolled ? colors.header : colors.page;
}
