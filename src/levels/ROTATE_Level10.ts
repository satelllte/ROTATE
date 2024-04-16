import {ROTATE_Cat} from '../ROTATE_Cat';
import {
  ROTATE_ConditionChannel,
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

export class ROTATE_Level10 implements ROTATE_BaseLevelInterface {
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
    this.finishRow = 16;
    this.finishCol = 11;
    this.startRow = 18;
    this.startCol = 19;
    this.tiles = [
      [
        [1],
        [5, 2],
        [5, 2],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [6, 1],
        [6, 3],
        [6, 2],
        [6],
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
        [6, 3],
        [6, 2],
        [0],
        [0],
        [6, 3],
        [6, 2],
        [1],
        [1],
        [1],
        [1],
      ],
      [
        [5, 1],
        [0],
        [11],
        [11, 1],
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
        [1],
        [1],
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
      ],
      [
        [5, 1],
        [0],
        [11, 3],
        [11, 2],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [3, 3],
        [1],
        [1],
        [1],
        [5, 1],
        [0],
        [0],
        [0],
        [9, 0, 3, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [10],
        [10],
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
        [1],
        [1],
        [1],
        [5, 1],
        [0],
        [8, 1],
        [0],
        [9],
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
        [1],
        [1],
        [1],
        [5, 1],
        [0],
        [0],
        [0],
        [9],
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
        [1],
        [1],
        [1],
        [1],
        [0],
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
        [5, 3],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [1],
        [0],
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
        [5, 3],
      ],
      [
        [5, 1],
        [0],
        [0],
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
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
        [1],
        [1],
        [1],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [0],
        [0],
        [5, 3],
      ],
      [
        [5, 1],
        [0],
        [0],
        [8],
        [0],
        [0],
        [1],
        [1],
        [1],
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
        [1],
        [1],
        [7, -2],
        [7, 10],
        [1],
        [1],
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
        [1],
        [1],
        [1],
        [0],
        [0],
        [5, 3],
      ],
      [
        [1],
        [9, 1, 5],
        [9, 1],
        [9, 1],
        [9, 1],
        [9, 1],
        [1],
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
        [1],
        [1],
        [1],
        [1],
        [0],
        [0],
        [5, 3],
      ],
      [
        [1],
        [6, 1],
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
        [5, 3],
      ],
      [
        [6, 3],
        [6, 2],
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
        [3, 3],
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
        [10],
        [1],
        [0],
        [0],
        [5, 3],
      ],
      [
        [6, 1],
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
        [1],
        [1],
        [1],
        [1],
        [6, 3],
        [6, 2],
        [6, 3],
        [6, 2],
        [6, 3],
        [6, 2],
        [1],
        [1],
        [1],
        [0],
        [0],
        [5, 3],
      ],
      [
        [6, 2],
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
        [5, 3],
      ],
      [
        [6],
        [6, 1],
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
        [6, 2],
        [5],
        [5],
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
        [2, 1],
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
        [2, 1],
        [0],
        [0],
        [0],
        [5, 3],
      ],
    ];
    this.theme = 1;
  }

  start(): void {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(2),
        'Why are you ignoring me?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4),
        'We must continue your training.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(4, 10, 6, 1, 2),
        "There's nothing for you this way.",
      ),
      new ROTATE_SpeechPart(new ROTATE_ConditionChannel(1), ''),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1.25, 7, 1, 1, 2, 1),
        'What do you expect to find?',
      ),
    ]);
    this.cat = new ROTATE_Cat(
      9,
      16,
      -1,
      1,
      new ROTATE_ConditionDelayedCollision(0.5, 4, 13, 1, 4, 1),
    );
  }

  tick(): void {}

  update(): void {
    this.speech?.update();
    this.cat?.update();
  }

  finished(): void {
    return ROTATE_Levels.level11;
  }

  kill(): void {}
}
