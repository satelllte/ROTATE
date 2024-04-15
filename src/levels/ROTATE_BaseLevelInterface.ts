export interface ROTATE_BaseLevelInterface {
  startDir: number;
  finishRow: number;
  finishCol: number;
  startRow: number;
  startCol: number;
  tiles: number[][][];
  theme: number;
  start(): void;
  tick(): void;
  update(): void;
  finished(): void;
  kill(): void;
}
