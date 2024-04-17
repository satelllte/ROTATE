import {Bounds} from './Bounds';
import {ROTATE_Animation} from './ROTATE_Animation';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Game} from './Rotate';
import {type Surface} from './Surface';
import {Vector2} from './Vector2';

export class ROTATE_AnimatedObject extends ROTATE_CanvasObject {
  public animChanged = false;
  public frame = 0;
  public animTimer = 0;
  public lastF = 0;
  public origin = new Vector2(0, 0);
  public cols;
  public rows;
  public frames;
  public animation: ROTATE_Animation | undefined;
  public onChange: ((animationIndex: number) => void) | undefined;
  public onFinish: (() => void) | undefined;

  constructor(
    public image: HTMLImageElement,
    public frameW: number,
    public frameH: number,
  ) {
    super();
    this.cols = Math.floor(this.image.width / frameW);
    this.rows = Math.floor(this.image.height / frameH);
    this.frames = this.cols * this.rows;
    this.addEventListener('render', (e) => {
      this.render(e.surface);
    });
  }

  public set_frame(index: number) {
    return (this.frame = 0 > index || index >= this.frames ? 0 : index);
  }

  public set_animation(animation: ROTATE_Animation) {
    this.animation != animation &&
      ((this.animTimer = ROTATE_Game.instance.get_gameTimeMS()),
      (this.animChanged = !0));
    return (this.animation = animation);
  }

  public render(a: Surface) {
    if (
      null != this.animation &&
      null != this.animation.frames &&
      0 < this.animation.frames.length
    ) {
      for (
        var b = ROTATE_Game.instance.get_gameTimeMS() - this.animTimer,
          c = 0,
          d = !1;
        b > this.animation.delays[c];

      )
        if (
          ((b -= this.animation.delays[c]),
          ++c,
          c == this.animation.frames.length)
        )
          if (((d = !0), this.animation.loop)) c = 0;
          else {
            c = this.animation.frames.length - 1;
            break;
          }
      this.frame = this.animation.frames[c];
      if (null != this.onChange && (this.animChanged || this.lastF != c))
        this.onChange(c);
      if (!this.animChanged && d && null != this.onFinish) this.onFinish();
      this.lastF = c;
    } else this.frame >= this.frames && (this.frame = 0);
    a.drawImage(
      this.image,
      this.getFrameRect(this.frame),
      -this.origin.x,
      -this.origin.y,
    );
    this.animChanged = !1;
  }

  public getFrameRect(a) {
    return new Bounds(
      (a % this.cols) * this.frameW,
      Math.floor(a / this.cols) * this.frameH,
      this.frameW,
      this.frameH,
    );
  }

  public getBoundsSelf() {
    return new Bounds(-this.origin.x, -this.origin.y, this.frameW, this.frameH);
  }
}
