import {type Bounds} from './Bounds';
import {type Transform} from './Transform';
import {Vector2} from './Vector2';

// TODO: test this function
export const clamp = (x: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, x));

// TODO: test this function
export const clamp01 = (x: number): number => clamp(x, 0, 1);

// TODO: test this function
export const getColorString = (
  rgb: number,
  alpha: number = 1.0,
): `rgba(${number},${number},${number},${number})` => {
  return `rgba(${(rgb & 0xff0000) >>> 16},${(rgb & 0xff00) >>> 8},${rgb & 0xff},${alpha})`;
};

// TODO: test this function
export const pointInTransformedBounds = (
  point: Vector2,
  transform: Transform,
  bounds: Bounds,
): boolean => {
  return null == point ||
    null == transform ||
    null == bounds ||
    0 == bounds.width ||
    0 == bounds.height
    ? false
    : pointInQuad(
        point,
        transform.apply(bounds.get_left(), bounds.get_top()),
        transform.apply(bounds.get_right(), bounds.get_top()),
        transform.apply(bounds.get_right(), bounds.get_bottom()),
        transform.apply(bounds.get_left(), bounds.get_bottom()),
      );
};

// TODO: test this function
const pointInQuad = (
  point: Vector2,
  p1: Vector2,
  p2: Vector2,
  p3: Vector2,
  p4: Vector2,
): boolean => {
  // TODO: re-implement properly
  p4 = p2.subtract(p1);
  p1 = point.subtract(p1);
  p3 = p3.subtract(p2);
  p2 = point.subtract(p2);
  const p = Vector2.dot(p4, p1);
  const _p4 = Vector2.dot(p4, p4);
  const _p2 = Vector2.dot(p3, p2);
  const _p3 = Vector2.dot(p3, p3);
  return 0 <= p && p <= _p4 && 0 <= _p2 ? _p2 <= _p3 : false;
};

// TODO: test this function
export const charCodeAt = (str: string, positionIndex: number) => {
  return str.charCodeAt(positionIndex);
};

// TODO: test this function
export const subString = (
  str: string,
  startPositionIndex: number,
  endPositionIndex: number = str.length,
) => {
  // TODO: re-implement properly
  if (0 > endPositionIndex) {
    if (0 == startPositionIndex) {
      endPositionIndex = str.length + endPositionIndex;
    } else {
      return '';
    }
  }
  // TODO: don't use deprecated method here
  return str.substr(startPositionIndex, endPositionIndex);
};

// TODO: test
export const getOneTimeIterator = <T>(arr: T[]) => {
  return {
    cur: 0,
    arr: arr,
    hasNext: function () {
      return this.cur < this.arr.length;
    },
    next: function () {
      return this.arr[this.cur++];
    },
  };
};
