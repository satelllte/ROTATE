import {OBJECT_ID} from '../Blocks';

export type Tiles = RowTile[];
export type RowTile = ColTile[];
export type ColTile = [ObjectId] | [ObjectId, number];
export type ObjectId =
  | typeof OBJECT_ID.air
  | typeof OBJECT_ID.solid
  | typeof OBJECT_ID.stairs
  | typeof OBJECT_ID.ramp
  | typeof OBJECT_ID.platform
  | typeof OBJECT_ID.spikes
  | typeof OBJECT_ID.saw
  | typeof OBJECT_ID.number
  | typeof OBJECT_ID.lever
  | typeof OBJECT_ID.door
  | typeof OBJECT_ID.vent
  | typeof OBJECT_ID.fan;
export type Direction = 1 | -1;
export type Theme = 0 | 1;

export interface ROTATE_BaseLevelInterface {
  startDir: Direction;
  finishRow: number;
  finishCol: number;
  startRow: number;
  startCol: number;
  tiles: Tiles;
  theme: Theme;
  start(): void;
  tick(): void;
  update(): void;
  finished(): void;
  kill(): void;
}
