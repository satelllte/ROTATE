import {Bounds} from './Bounds';
import {
  ROTATE_Game,
  ROTATE_LevelEditorManager,
  ROTATE_ScreenPrimaryGame,
} from './Rotate';
import {ROTATE_GameConstants} from './constants';

export interface ROTATE_Condition {
  start(): void;
  test(): boolean;
}

export class ROTATE_ConditionCollision implements ROTATE_Condition {
  public bounds: Bounds;
  public rotation: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number = -1,
  ) {
    this.bounds = new Bounds(
      ROTATE_GameConstants.tileSize * x,
      ROTATE_GameConstants.tileSize * y,
      ROTATE_GameConstants.tileSize * width,
      ROTATE_GameConstants.tileSize * height,
    );
    this.rotation = rotation;
  }

  public start(): void {}

  public test(): boolean {
    return !ROTATE_ScreenPrimaryGame.i.player
      .getHitBounds()
      .intersects(this.bounds) ||
      (-1 != this.rotation &&
        ROTATE_LevelEditorManager.rotation != this.rotation)
      ? !1
      : !ROTATE_LevelEditorManager.rotating;
  }
}

export class ROTATE_ConditionCollisionWithChannels extends ROTATE_ConditionCollision {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    rotation?: number,
  ) {
    super(x, y, width, height, rotation);
  }

  public test(): boolean {
    return super.test() &&
      ROTATE_ScreenPrimaryGame.i.getChannelStatus(0) &&
      ROTATE_ScreenPrimaryGame.i.getChannelStatus(1)
      ? ROTATE_ScreenPrimaryGame.i.getChannelStatus(2)
      : !1;
  }
}

export class ROTATE_ConditionDelayedCollision implements ROTATE_Condition {
  public hit = false;
  public delay: number;
  public bounds: Bounds;
  public rotation: number;
  public timer: number = 0;

  constructor(
    delay: number,
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number = -1,
  ) {
    this.delay = delay;
    this.bounds = new Bounds(
      x * ROTATE_GameConstants.tileSize,
      y * ROTATE_GameConstants.tileSize,
      width * ROTATE_GameConstants.tileSize,
      height * ROTATE_GameConstants.tileSize,
    );
    this.rotation = rotation;
  }

  public start(): void {}

  public test(): boolean {
    this.hit ||
      !ROTATE_ScreenPrimaryGame.i.player
        .getHitBounds()
        .intersects(this.bounds) ||
      (-1 != this.rotation &&
        ROTATE_LevelEditorManager.rotation != this.rotation) ||
      ROTATE_LevelEditorManager.rotating ||
      ((this.hit = !0), (this.timer = ROTATE_Game.instance.get_gameTime()));
    return this.hit
      ? ROTATE_Game.instance.get_gameTime() - this.timer >= this.delay
      : !1;
  }
}

export class ROTATE_ConditionChannel implements ROTATE_Condition {
  public timer = -1;

  constructor(public channel: number) {}

  public start(): void {
    this.timer = ROTATE_Game.instance.get_gameTime();
  }

  public test(): boolean {
    var a = ROTATE_ScreenPrimaryGame.i.channels.h[this.channel];
    return null != a ? a.lastChanged > this.timer : !1;
  }
}

export class ROTATE_ConditionDelay implements ROTATE_Condition {
  public timer = 0;

  constructor(public delay: number) {}

  public start(): void {
    this.timer = ROTATE_Game.instance.get_gameTime();
  }
  public test(): boolean {
    return ROTATE_Game.instance.get_gameTime() - this.timer >= this.delay;
  }
}
