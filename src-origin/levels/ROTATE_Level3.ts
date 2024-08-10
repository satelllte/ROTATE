import {
  ROTATE_ConditionDelay,
  ROTATE_ConditionDelayedCollision,
} from '../ROTATE_Condition';
import {ROTATE_Speech, ROTATE_SpeechPart} from '../ROTATE_Speech';
import {ROTATE_Levels} from '../Rotate';
import {
  Direction,
  ROTATE_BaseLevelInterface,
  Theme,
  Tiles,
} from './ROTATE_BaseLevelInterface';

export class ROTATE_Level3 implements ROTATE_BaseLevelInterface {
  startDir: Direction;
  finishRow: number;
  finishCol: number;
  startRow: number;
  startCol: number;
  tiles: Tiles;
  theme: Theme;
  speech?: ROTATE_Speech;

  constructor() {
    this.startDir = -1;
    this.finishRow = 6;
    this.finishCol = 3;
    this.startRow = 9;
    this.startCol = 14;
    this.tiles = [
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [5, 2],
        [5, 2],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [7, -1],
        [7, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [10],
        [1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [5],
        [5],
        [5],
        [5],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
    ];
    this.theme = 0;
  }

  start(): void {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1),
        'Remember, your mind is needed.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1.5, 7, 4, 2, 3, 2),
        'Intelligence is a valuable resource.',
      ),
    ]);
  }
  tick(): void {}

  update(): void {
    this.speech?.update();
  }

  finished(): void {
    return ROTATE_Levels.level4;
  }

  kill(): void {}
}
