import { Platform } from 'react-native';
import { clamp, moderateScale } from './responsive';

export function createTypography(width: number) {
  const scale = (size: number) =>
    clamp(moderateScale(size, width), size * 0.9, size * 1.35);

  const fontFamily = Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  });

  return {
    fontFamily,
    title: {
      fontSize: scale(28),
      fontWeight: '700' as const,
      lineHeight: scale(34),
    },
    heading: {
      fontSize: scale(20),
      fontWeight: '700' as const,
      lineHeight: scale(26),
    },
    body: {
      fontSize: scale(17),
      fontWeight: '600' as const,
      lineHeight: scale(24),
    },
    bodyRegular: {
      fontSize: scale(16),
      fontWeight: '400' as const,
      lineHeight: scale(22),
    },
    label: {
      fontSize: scale(15),
      fontWeight: '500' as const,
      lineHeight: scale(20),
    },
    caption: {
      fontSize: scale(12),
      fontWeight: '700' as const,
      lineHeight: scale(16),
      letterSpacing: 0.3,
    },
    button: {
      fontSize: scale(18),
      fontWeight: '700' as const,
      lineHeight: scale(24),
    },
  } as const;
}

export type Typography = ReturnType<typeof createTypography>;
