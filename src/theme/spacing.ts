import { moderateScale } from './responsive';

export function createSpacing(width: number) {
  const unit = moderateScale(8, width);
  return {
    xxs: Math.round(unit * 0.5),
    xs: unit,
    sm: unit * 1.5,
    md: unit * 2,
    lg: unit * 3,
    xl: unit * 4,
    xxl: unit * 5,
  } as const;
}

export type Spacing = ReturnType<typeof createSpacing>;
