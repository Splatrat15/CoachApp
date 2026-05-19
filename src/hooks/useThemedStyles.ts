import { useMemo } from 'react';
import { useTheme, type Theme } from '../theme';

/**
 * Rebuilds styles when screen size changes (rotation, split view, foldables).
 * Use this instead of static StyleSheet.create at module level.
 */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- factory is stable per render
  return useMemo(() => factory(theme), [theme]);
}
