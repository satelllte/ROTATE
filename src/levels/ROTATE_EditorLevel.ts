import {ROTATE_Speech} from '../ROTATE_Speech';
import {ROTATE_Game, ROTATE_ScreenEditor} from '../Rotate';
import {
  Direction,
  ROTATE_BaseLevelInterface,
  Theme,
  Tiles,
} from './ROTATE_BaseLevelInterface';

export class ROTATE_EditorLevel implements ROTATE_BaseLevelInterface {
  public static readonly WORLD_SIZE = 42;

  startDir: Direction;
  finishRow: number = 0; // implemented in reset() method
  finishCol: number = 0; // implemented in reset() method
  startRow: number = 0; // implemented in reset() method
  startCol: number = 0; // implemented in reset() method
  tiles: Tiles = []; // implemented in reset() method
  theme: Theme;
  speech?: ROTATE_Speech;

  constructor() {
    this.startDir = 1;
    this.theme = 0;
    this.reset();
  }

  public reset(): void {
    this.tiles = [];
    for (var a = 0, b = ROTATE_EditorLevel.WORLD_SIZE; a < b; ) {
      var c = a++;
      this.tiles[c] = [];
      for (var d = 0, e = ROTATE_EditorLevel.WORLD_SIZE; d < e; ) {
        var f = d++;
        this.tiles[c][f] = [13 < f && 28 > f && 17 < c && 24 > c ? 0 : 1, 0];
      }
    }
    this.startCol = 16;
    this.startRow = 23;
    this.finishCol = 25;
    this.finishRow = 23;
    this.theme = 0;
  }

  public load(
    tiles: Tiles,
    startCol: number,
    startRow: number,
    finishCol: number,
    finishRow: number,
    theme: Theme = 0,
  ) {
    this.tiles = tiles;
    this.startCol = startCol;
    this.startRow = startRow;
    this.finishCol = finishCol;
    this.finishRow = finishRow;
    this.theme = theme;
  }

  public setStart(startCol: number, startRow: number) {
    this.startCol = startCol;
    this.startRow = startRow;
  }

  public setFinish(finishCol: number, finishRow: number) {
    this.finishCol = finishCol;
    this.finishRow = finishRow;
  }

  public start(): void {
    this.speech = new ROTATE_Speech([]);
  }

  public tick(): void {}

  public update(): void {
    this.speech?.update();
  }

  public finished(): void {
    ROTATE_Game.instance.changeScreen(new ROTATE_ScreenEditor());
  }

  public kill(): void {}
}
