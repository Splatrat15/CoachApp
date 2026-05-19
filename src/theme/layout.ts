/**
 * Breakpoints — React Native equivalent of CSS @media (min-width).
 * Layout recalculates automatically when the window size changes.
 */
export const breakpoints = {
  /** Small phones (e.g. narrow Android devices) */
  compact: 380,
  /** Tablets, large phones in landscape, foldables */
  tablet: 768,
  /** Large tablets, desktop web */
  expanded: 1024,
} as const;

export type Breakpoint = 'compact' | 'phone' | 'tablet' | 'expanded';

export const design = {
  baseWidth: 390,
  baseHeight: 844,
  maxContentWidth: {
    phone: Number.POSITIVE_INFINITY,
    tablet: 560,
    expanded: 720,
  },
} as const;

export function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints.expanded) {
    return 'expanded';
  }
  if (width >= breakpoints.tablet) {
    return 'tablet';
  }
  if (width < breakpoints.compact) {
    return 'compact';
  }
  return 'phone';
}

export function getContentMaxWidth(width: number): number {
  const bp = getBreakpoint(width);
  if (bp === 'expanded') {
    return design.maxContentWidth.expanded;
  }
  if (bp === 'tablet') {
    return design.maxContentWidth.tablet;
  }
  return Math.min(width, design.maxContentWidth.phone);
}

export function getHorizontalPadding(width: number): number {
  const bp = getBreakpoint(width);
  switch (bp) {
    case 'compact':
      return 12;
    case 'phone':
      return 16;
    case 'tablet':
      return 24;
    case 'expanded':
      return 32;
    default:
      return 16;
  }
}
