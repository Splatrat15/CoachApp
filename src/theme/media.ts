import type { Theme } from './ThemeContext';

/**
 * Breakpoint helpers — use inside `useThemedStyles` like CSS @media blocks.
 *
 * @example
 * const styles = useThemedStyles((theme) => ({
 *   title: {
 *     fontSize: media(theme).when({ compact: 22, phone: 26, tablet: 30, expanded: 32 }, 26),
 *   },
 * }));
 */
export function media(theme: Theme) {
  const { layout } = theme;

  return {
    when<T>(values: Partial<Record<typeof layout.breakpoint, T>>, fallback: T): T {
      return values[layout.breakpoint] ?? fallback;
    },
    compact: layout.breakpoint === 'compact',
    phone: layout.breakpoint === 'phone',
    tablet: layout.isTablet,
    expanded: layout.isExpanded,
  };
}
