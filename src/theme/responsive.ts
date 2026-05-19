import { design } from './layout';

export function horizontalScale(size: number, width: number) {
  return Math.round((width / design.baseWidth) * size);
}

export function verticalScale(size: number, height: number) {
  return Math.round((height / design.baseHeight) * size);
}

/**
 * Balanced scale — limits how much sizes grow/shrink on very large or small devices.
 * Works well across iPhone SE through iPad and Android phones/tablets.
 */
export function moderateScale(size: number, width: number, factor = 0.45) {
  const scaled = horizontalScale(size, width);
  return Math.round(size + (scaled - size) * factor);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
