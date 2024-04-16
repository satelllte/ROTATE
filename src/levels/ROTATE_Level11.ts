import {ROTATE_Cat} from '../ROTATE_Cat';
import {
  ROTATE_ConditionCollision,
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

export class ROTATE_Level11 implements ROTATE_BaseLevelInterface {
  startDir: Direction;
  finishRow: number;
  finishCol: number;
  startRow: number;
  startCol: number;
  tiles: Tiles;
  theme: Theme;

  speech?: ROTATE_Speech;
  cat?: ROTATE_Cat;

  constructor() {
    this.startDir = 1;
    this.finishRow = 7;
    this.finishCol = 24;
    this.startRow = 13;
    this.startCol = 12;
    this.tiles = [
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [5, 2],
        [5, 2],
        [5, 2],
        [5, 2],
        [5, 2],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [3, 1],
        [0],
        [0],
        [0],
        [3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [9, 0, 3],
        [9],
        [9],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
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
        [5, 2],
        [5, 2],
        [5, 2],
        [5, 2],
        [5, 2],
        [5, 2],
        [1],
        [1],
      ],
      [
        [1],
        [10],
        [10],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
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
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [6, 3],
        [6, 2],
        [6, 3],
        [6, 2],
        [1],
        [1],
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
        [1],
        [1],
        [1],
        [0],
        [0],
        [0],
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
        [1],
        [10],
      ],
      [
        [5, 1],
        [0],
        [8],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [0],
        [8, 1],
        [0],
        [1],
        [1],
        [1],
        [9, 1, 3],
        [9, 1],
        [9, 1],
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
        [1],
        [1],
        [1],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [0],
        [0],
        [0],
        [6],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [3, 1],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [9, 0, 3],
        [9],
        [9],
        [1],
        [1],
        [1],
        [0],
        [0],
        [0],
        [6, 3],
        [6, 2],
        [1],
        [1],
        [7, -2],
        [7, 11],
        [1],
        [1],
      ],
      [
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [5, 1],
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
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [5, 1],
        [0],
        [11],
        [11, 1],
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
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [5, 1],
        [0],
        [11, 3],
        [11, 2],
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
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [5, 1],
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
        [0],
        [0],
        [0],
        [0],
        [5, 3],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [1],
        [1],
        [1],
        [1],
        [6],
        [6, 1],
        [6],
        [6, 1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [6],
        [6, 1],
        [6],
        [6, 1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
    ];
    this.theme = 1;
  }

  start(): void {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1),
        'Do you seek "freedom"?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(3),
        'An escape from responsibility?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(4, 11, 10, 3, 1),
        "You're running from your purpose.",
      ),
    ]);
    this.cat = new ROTATE_Cat(
      21,
      7,
      -1,
      1,
      new ROTATE_ConditionCollision(20, 5, 1, 3),
    );
  }
  tick(): void {}
  update(): void {
    this.speech?.update();
    this.cat?.update();
  }
  finished(): void {
    return ROTATE_Levels.level12;
  }
  kill(): void {}
}
