import { moderateScale } from './responsive';

export function createRadius(width: number) {
  return {
    sm: moderateScale(8, width),
    md: moderateScale(12, width),
    lg: moderateScale(14, width),
    xl: moderateScale(20, width),
    full: 999,
  } as const;
}

export type Radius = ReturnType<typeof createRadius>;
