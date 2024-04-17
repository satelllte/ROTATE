export const COLOR = {
  black: 0x000000,
  white: 0xffffff,
  background: 0x202020,
  darkGray: 0x101010,
  border: 0x808080,
} as const satisfies Record<string, number>;

export const KEY_CODE = {
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  ArrowUp: 38,
  KeyA: 65,
  KeyC: 67,
  KeyD: 68,
  KeyE: 69,
  KeyG: 71,
  KeyL: 76,
  KeyQ: 81,
  KeyS: 83,
  KeyW: 87,
  Space: 32,
} as const satisfies Record<string, number>;

export const PI2 = Math.PI * 2.0;

const tileSize = 24;
export const ROTATE_GameConstants = {
  EPSILON: 1e-8,
  screenFadeTime: 700,
  screenFadeTimeSlow: 1600,
  tileSize,
  rotateOffset: 1.5 * tileSize,
  tickMS: 16.666666666666668,
  ticksMax: 12,
  cameraSpeed: 0.075,
  rotateTime: 0.5,
  doorSlideTime: 0.2,
} as const satisfies Record<string, number>;
