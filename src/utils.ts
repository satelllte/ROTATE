export const clamp = (x: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, x));

export const clamp01 = (x: number): number => clamp(x, 0, 1);

export const getColorString = (
  rgb: number,
  alpha: number = 1.0,
): `rgba(${number},${number},${number},${number})` => {
  return `rgba(${(rgb & 0xff0000) >>> 16},${(rgb & 0xff00) >>> 8},${rgb & 0xff},${alpha})`;
};
