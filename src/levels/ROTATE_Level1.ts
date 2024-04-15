import {ROTATE_ConditionDelay} from '../ROTATE_Condition';
import {ROTATE_ImageObject} from '../ROTATE_ImageObject';
import {ROTATE_Images} from '../ROTATE_Images';
import {ROTATE_Speech, ROTATE_SpeechPart} from '../ROTATE_Speech';
import {
  ROTATE_Game,
  ROTATE_LevelEditorManager,
  ROTATE_Levels,
  ROTATE_ScreenPrimaryGame,
} from '../Rotate';
import {ROTATE_GameConstants} from '../constants';
import {ROTATE_BaseLevelInterface} from './ROTATE_BaseLevelInterface';

export class ROTATE_Level1 implements ROTATE_BaseLevelInterface {
  public static readonly fadeSpeed = 0.1;

  startDir: number;
  finishRow: number;
  finishCol: number;
  startRow: number;
  startCol: number;
  tiles: number[][][];
  theme: number;

  public a1: number = 0;
  public a2: number = 0;
  public a3: number = 0;
  public a4: number = 0;
  public a5: number = 0;
  public s1: boolean = false;
  public s2: boolean = false;
  public s3: boolean = false;
  public s4: boolean = false;
  public s5: boolean = false;
  public c1?: ROTATE_ImageObject;
  public c2?: ROTATE_ImageObject;
  public c3?: ROTATE_ImageObject;
  public c4?: ROTATE_ImageObject;
  public c5?: ROTATE_ImageObject;
  public speech?: ROTATE_Speech;

  constructor() {
    this.startDir = 1;
    this.finishRow = 3;
    this.finishCol = 25;
    this.startRow = 7;
    this.startCol = 4;
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
        [1],
        [3, 2],
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
        [7, -1],
        [7, 1],
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
      ],
      [
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
      ],
      [
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
        [0],
        [0],
        [0],
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
        [0],
        [0],
        [0],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
      ],
      [
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
        [10],
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
        [2, 1],
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
        [2, 1],
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
      ],
    ];
    this.theme = 0;
  }

  public start(): void {
    var a = ROTATE_Game.instance.currentScreen;
    this.a1 = this.a2 = this.a3 = this.a4 = this.a5 = 0;
    this.s1 = !0;
    this.s2 = this.s3 = this.s4 = this.s5 = !1;
    null == this.c1 &&
      (this.c1 = new ROTATE_ImageObject(ROTATE_Images.controls1));
    this.c1.set_x(3.5 * ROTATE_GameConstants.tileSize);
    this.c1.set_y(9 * ROTATE_GameConstants.tileSize);
    this.c1.set_alpha(this.a1);
    a.overlay.addChild(this.c1);
    null == this.c2 &&
      (this.c2 = new ROTATE_ImageObject(ROTATE_Images.controls2));
    this.c2.set_x(10 * ROTATE_GameConstants.tileSize);
    this.c2.set_y(11 * ROTATE_GameConstants.tileSize);
    this.c2.set_alpha(this.a2);
    a.overlay.addChild(this.c2);
    null == this.c3 &&
      (this.c3 = new ROTATE_ImageObject(ROTATE_Images.controls3));
    this.c3.set_x(18.5 * ROTATE_GameConstants.tileSize);
    this.c3.set_y(9 * ROTATE_GameConstants.tileSize);
    this.c3.set_alpha(this.a3);
    this.c3.clipRect.width = 48;
    ROTATE_Game.instance.invert && (this.c3.clipRect.x = 48);
    a.overlay.addChild(this.c3);
    null == this.c4 &&
      (this.c4 = new ROTATE_ImageObject(ROTATE_Images.controls4));
    this.c4.set_x(29 * ROTATE_GameConstants.tileSize);
    this.c4.set_y(ROTATE_GameConstants.tileSize);
    this.c4.set_alpha(this.a4);
    this.c4.clipRect.width = 48;
    ROTATE_Game.instance.invert && (this.c4.clipRect.x = 48);
    a.overlay.addChild(this.c4);
    null == this.c5 &&
      (this.c5 = new ROTATE_ImageObject(ROTATE_Images.controls5));
    this.c5.set_x(24.5 * ROTATE_GameConstants.tileSize);
    this.c5.set_y(5 * ROTATE_GameConstants.tileSize);
    this.c5.set_alpha(this.a5);
    a.overlay.addChild(this.c5);
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1),
        'Make your way to the exit.',
      ),
    ]);
  }

  public tick(): void {
    var a = 0.25 * Math.sin(8 * ROTATE_Game.instance.get_gameTime()) + 0.75;
    this.s1 && 1 > this.a1
      ? ((this.a1 += ROTATE_Level1.fadeSpeed), 1 < this.a1 && (this.a1 = 1))
      : !this.s1 &&
        0 < this.a1 &&
        ((this.a1 -= ROTATE_Level1.fadeSpeed), 0 > this.a1 && (this.a1 = 0));
    this.c1.set_alpha(this.a1 * a);
    this.s2 && 1 > this.a2
      ? ((this.a2 += ROTATE_Level1.fadeSpeed), 1 < this.a2 && (this.a2 = 1))
      : !this.s2 &&
        0 < this.a2 &&
        ((this.a2 -= ROTATE_Level1.fadeSpeed), 0 > this.a2 && (this.a2 = 0));
    this.c2.set_alpha(this.a2 * a);
    this.s3 && 1 > this.a3
      ? ((this.a3 += ROTATE_Level1.fadeSpeed), 1 < this.a3 && (this.a3 = 1))
      : !this.s3 &&
        0 < this.a3 &&
        ((this.a3 -= ROTATE_Level1.fadeSpeed), 0 > this.a3 && (this.a3 = 0));
    this.c3.set_alpha(this.a3 * a);
    this.s4 && 1 > this.a4
      ? ((this.a4 += ROTATE_Level1.fadeSpeed), 1 < this.a4 && (this.a4 = 1))
      : !this.s4 &&
        0 < this.a4 &&
        ((this.a4 -= ROTATE_Level1.fadeSpeed), 0 > this.a4 && (this.a4 = 0));
    this.c4.set_alpha(this.a4 * a);
    this.s5 && 1 > this.a5
      ? ((this.a5 += ROTATE_Level1.fadeSpeed), 1 < this.a5 && (this.a5 = 1))
      : !this.s5 &&
        0 < this.a5 &&
        ((this.a5 -= ROTATE_Level1.fadeSpeed), 0 > this.a5 && (this.a5 = 0));
    this.c5.set_alpha(this.a5 * a);
  }

  public update(): void {
    this.speech.update();
    this.s1 &&
    ROTATE_ScreenPrimaryGame.i.player.x > 10 * ROTATE_GameConstants.tileSize
      ? ((this.s1 = !1), (this.s2 = !0))
      : this.s2 &&
          ROTATE_ScreenPrimaryGame.i.player.x >
            17 * ROTATE_GameConstants.tileSize
        ? ((this.s2 = !1), (this.s3 = !0))
        : this.s3 &&
            ROTATE_ScreenPrimaryGame.i.player.x >
              27 * ROTATE_GameConstants.tileSize &&
            ROTATE_ScreenPrimaryGame.i.player.grounded &&
            !ROTATE_LevelEditorManager.rotating &&
            1 == ROTATE_LevelEditorManager.rotation
          ? ((this.s3 = !1), (this.s4 = !0))
          : this.s4 &&
            ROTATE_ScreenPrimaryGame.i.player.x >
              22 * ROTATE_GameConstants.tileSize &&
            ROTATE_ScreenPrimaryGame.i.player.grounded &&
            !ROTATE_LevelEditorManager.rotating &&
            0 == ROTATE_LevelEditorManager.rotation &&
            ((this.s4 = !1), (this.s5 = !0));
    this.c3.clipRect.x = this.c4.clipRect.x = ROTATE_Game.instance.invert
      ? 48
      : 0;
  }

  public finished() {
    return ROTATE_Levels.level2;
  }

  public kill(): void {
    this.c1.parent.removeChild(this.c1);
    this.c2.parent.removeChild(this.c2);
    this.c3.parent.removeChild(this.c3);
    this.c4.parent.removeChild(this.c4);
    this.c5.parent.removeChild(this.c5);
  }
}
