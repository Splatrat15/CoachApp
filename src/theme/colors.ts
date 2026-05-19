/**
 * Brand palette — import these across the app instead of hard-coded hex values.
 * Semantic tokens below are derived so combinations stay consistent on iOS & Android.
 */
export const brand = {
  primary: '#0F4C81',
  accent: '#00C2D1',
  neutralDark: '#1E2937',
  neutralLight: '#F8FAFC',
  warning: '#F59E0B',
} as const;

export type BrandColor = keyof typeof brand;

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

/** Applies alpha to a brand hex for borders, overlays, and muted surfaces. */
export function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function createSemanticColors() {
  return {
    ...brand,
    white: '#FFFFFF',
    black: '#000000',

    background: brand.neutralLight,
    surface: '#FFFFFF',
    surfaceMuted: withAlpha(brand.primary, 0.06),

    text: brand.neutralDark,
    textMuted: withAlpha(brand.neutralDark, 0.65),
    textOnPrimary: '#FFFFFF',
    textOnAccent: '#FFFFFF',
    textOnWarning: '#FFFFFF',

    border: withAlpha(brand.neutralDark, 0.12),
    borderStrong: withAlpha(brand.neutralDark, 0.22),
    borderFocus: brand.accent,

    header: brand.primary,
    link: brand.accent,

    pressed: withAlpha(brand.primary, 0.08),
    pressedAccent: withAlpha(brand.accent, 0.12),

    unmarked: withAlpha(brand.neutralDark, 0.28),
    shadow: withAlpha(brand.neutralDark, 0.14),

    success: brand.accent,
    alert: brand.warning,

    attendance: {
      present: brand.accent,
      absent: brand.neutralDark,
      late: brand.warning,
    },
  } as const;
}

export type SemanticColors = ReturnType<typeof createSemanticColors>;

/** @deprecated Use `useTheme().colors` or `semantic` from theme index. */
export const colors = {
  ...brand,
  white: '#FFFFFF',
};
