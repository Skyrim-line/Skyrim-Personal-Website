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
  options?: { scrolled?: boolean; updateThemeColor?: boolean },
) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;

  // Recent iOS Safari versions use the html/body background for the areas
  // around the viewport instead of reliably re-reading theme-color. Resolve
  // the existing CSS variable so this does not introduce a second background
  // color or override the site's current light/dark palette.
  const pageBackground = getComputedStyle(root)
    .getPropertyValue("--background")
    .trim();
  if (pageBackground) {
    root.style.backgroundColor = pageBackground;
    document.body.style.backgroundColor = pageBackground;
  }

  const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  if (colorSchemeMeta) {
    colorSchemeMeta.setAttribute("content", resolvedTheme);
  }

  const colors = THEME_COLORS[resolvedTheme];
  if (options?.updateThemeColor !== false) {
    const themeColor = options?.scrolled ? colors.header : colors.page;
    setThemeColor(themeColor);
  }
}

export function getThemeColor(
  resolvedTheme: ResolvedTheme,
  scrolled = false,
) {
  const colors = THEME_COLORS[resolvedTheme];
  return scrolled ? colors.header : colors.page;
}
