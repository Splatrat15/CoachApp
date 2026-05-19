import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { brand, createSemanticColors, type SemanticColors } from './colors';
import {
  breakpoints,
  getBreakpoint,
  getContentMaxWidth,
  getHorizontalPadding,
  type Breakpoint,
} from './layout';
import { createRadius, type Radius } from './radius';
import { clamp, moderateScale } from './responsive';
import { createSpacing, type Spacing } from './spacing';
import { createTypography, type Typography } from './typography';

export type Theme = {
  brand: typeof brand;
  colors: SemanticColors;
  spacing: Spacing;
  typography: Typography;
  radius: Radius;
  layout: {
    width: number;
    height: number;
    breakpoint: Breakpoint;
    isCompact: boolean;
    isPhone: boolean;
    isTablet: boolean;
    isExpanded: boolean;
    contentMaxWidth: number;
    horizontalPadding: number;
  };
  ms: (size: number, factor?: number) => number;
  platform: typeof Platform.OS;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { width, height } = useWindowDimensions();

  const theme = useMemo(() => {
    const breakpoint = getBreakpoint(width);
    const ms = (size: number, factor = 0.45) =>
      clamp(moderateScale(size, width, factor), size * 0.85, size * 1.4);

    return {
      brand,
      colors: createSemanticColors(),
      spacing: createSpacing(width),
      typography: createTypography(width),
      radius: createRadius(width),
      layout: {
        width,
        height,
        breakpoint,
        isCompact: breakpoint === 'compact',
        isPhone: width < breakpoints.tablet,
        isTablet: width >= breakpoints.tablet,
        isExpanded: width >= breakpoints.expanded,
        contentMaxWidth: getContentMaxWidth(width),
        horizontalPadding: getHorizontalPadding(width),
      },
      ms,
      platform: Platform.OS,
    };
  }, [width, height]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
}
