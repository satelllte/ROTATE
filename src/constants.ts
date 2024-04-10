export const COLOR = {
  black: 0x000000,
  white: 0xffffff,
  background: 0x202020,
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
