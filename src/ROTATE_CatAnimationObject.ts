import {ROTATE_AnimatedObject} from './ROTATE_AnimatedObject';
import {ROTATE_Animation} from './ROTATE_Animation';
import {ROTATE_Images} from './ROTATE_Images';

export class ROTATE_CatAnimationObject extends ROTATE_AnimatedObject {
  public horizontal;
  public x2;
  public dx;

  constructor() {
    super(ROTATE_Images.cat, 24, 24);
    this.horizontal = 0;
    this.x2 = 0;
    this.dx = 0;
    this.origin.x = this.frameW / 2;
    this.origin.y = this.frameH;
  }

  public tick() {
    0 < this.horizontal
      ? this.dx < ROTATE_CatAnimationObject.SPEED &&
        (this.dx < -ROTATE_CatAnimationObject.ACCEL
          ? (this.dx *= ROTATE_CatAnimationObject.DECCEL_MULT)
          : ((this.dx += ROTATE_CatAnimationObject.ACCEL),
            this.dx > ROTATE_CatAnimationObject.SPEED &&
              (this.dx = ROTATE_CatAnimationObject.SPEED)))
      : 0 > this.horizontal
        ? this.dx > -ROTATE_CatAnimationObject.SPEED &&
          (this.dx > ROTATE_CatAnimationObject.ACCEL
            ? (this.dx *= ROTATE_CatAnimationObject.DECCEL_MULT)
            : ((this.dx -= ROTATE_CatAnimationObject.ACCEL),
              this.dx < -ROTATE_CatAnimationObject.SPEED &&
                (this.dx = -ROTATE_CatAnimationObject.SPEED)))
        : (this.dx *= ROTATE_CatAnimationObject.DECCEL_MULT);
    this.x2 += this.dx;
    this.set_x(Math.round(this.x2));
  }

  public static readonly SPEED = 2;
  public static readonly ACCEL = 0.06;
  public static readonly DECCEL_MULT = 0.6;
  public static readonly ANIM_IDLE = new ROTATE_Animation(
    [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5],
    [1500, 100, 100, 100, 100, 100, 3000, 100, 100, 200, 100, 100],
  );
  public static readonly ANIM_EXIT = new ROTATE_Animation(
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [100, 100, 100, 100, 100, 100, 100, 100, 100],
    !1,
  );
  public static readonly ANIM_END_1 = new ROTATE_Animation(
    [9, 10],
    [100, 100],
    !1,
  );
  public static readonly ANIM_END_2 = new ROTATE_Animation(
    [11, 12, 22, 14, 24, 25, 26],
    [100, 100, 100, 100, 100, 100, 100],
  );
}
