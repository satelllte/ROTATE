import {type Bounds} from './Bounds';
import {Transform} from './Transform';
import {COLOR, PI2} from './constants';
import {clamp01, getColorString} from './utils';

export class Surface {
  private _transform: Transform;
  public _ctx: CanvasRenderingContext2D;
  private filling: boolean = false; // TODO: rename to "_filling"
  private stroking: boolean = false; // TODO: rename to "_stroking"
  private strokeWidth: number = 0; // TODO: rename to "strokeWidth"

  constructor(ctx: CanvasRenderingContext2D) {
    this._transform = new Transform();
    this._ctx = ctx;
    this.reset();
  }

  public save(): void {
    this._transform.save();
    this._ctx.save();
  }

  public restore(): void {
    this._transform.restore();
    this._ctx.restore();
  }

  public setTransform(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ): void {
    this._transform.set(a, b, c, d, e, f);
    this._ctx.setTransform(a, b, c, d, e, f);
  }

  public translate(x: number, y: number): void {
    if (0 != x || 0 != y)
      this._transform.translate(x, y), this._ctx.translate(x, y);
  }

  public scale(x: number, y: number): void {
    if (1 != x || 1 != y) this._transform.scale(x, y), this._ctx.scale(x, y);
  }

  public rotate(rad: number): void {
    0 != rad && (this._transform.rotate(rad), this._ctx.rotate(rad));
  }

  public get_skipDraw(): boolean {
    return this.filling ? false : !this.stroking;
  }

  public get_strokeOffset(): 0.5 | 0 {
    return this.stroking && 0 != Math.round(this.strokeWidth) % 2 ? 0.5 : 0;
  }

  public reset(skipTransformReset: boolean = false): void {
    if (!skipTransformReset) this.setTransform(1, 0, 0, 1, 0, 0);
    this.filling = false;
    this.stroking = false;
  }

  public clearRect(x: number, y: number, w: number, h: number): void {
    this._ctx.clearRect(x, y, w, h);
  }

  public beginFill(rgb: number = COLOR.black, alpha: number = 1.0): void {
    alpha = clamp01(alpha);
    this._ctx.fillStyle = getColorString(rgb & 0xffffff, alpha);
    this.filling = true;
  }

  public endFill(): void {
    this.filling = false;
  }

  public beginStroke(
    width: number = 1,
    rgb: number = COLOR.black,
    alpha: number = 1.0,
  ) {
    alpha = clamp01(alpha);
    this._ctx.strokeStyle = getColorString(rgb & COLOR.white, alpha);
    this._ctx.lineWidth = width;
    this.strokeWidth = width;
    this.stroking = true;
  }

  public endStroke(): void {
    this.stroking = false;
  }

  public drawRect(x: number, y: number, w: number, h: number): void {
    if (this.get_skipDraw()) return;

    var strokeOffset = this.get_strokeOffset();
    x += strokeOffset;
    y += strokeOffset;

    if (this.filling) this._ctx.fillRect(x, y, w, h);
    if (this.stroking) this._ctx.strokeRect(x, y, w, h);
  }

  public beginPath(): void {
    this._ctx.beginPath();
  }

  public closePath(): void {
    this._ctx.closePath();
  }

  public moveTo(x: number, y: number): void {
    this._ctx.moveTo(x, y);
  }

  public lineTo(x: number, y: number): void {
    this._ctx.lineTo(x, y);
  }

  public arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise: boolean = false,
  ): void {
    this._ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  }

  public applyPath(): void {
    if (this.filling) this._ctx.fill();
    if (this.stroking) this._ctx.stroke();
  }

  public drawPath(boundsList: Bounds[], shouldClosePath: boolean = true): void {
    if (this.get_skipDraw()) return;
    if (boundsList.length < 2) return;

    const strokeOffset = this.get_strokeOffset();
    this.beginPath();
    this.moveTo(boundsList[0].x + strokeOffset, boundsList[0].y + strokeOffset);
    for (let i = 1; i < boundsList.length; i++) {
      this.lineTo(
        boundsList[i].x + strokeOffset,
        boundsList[i].y + strokeOffset,
      );
    }
    if (shouldClosePath) this.closePath();
    this.applyPath();
  }

  public drawCircle(x: number, y: number, radius: number): void {
    if (this.get_skipDraw()) return;

    const strokeOffset = this.get_strokeOffset();
    x += strokeOffset;
    y += strokeOffset;
    this.beginPath();
    this.arc(x, y, radius, 0.1, PI2 + 0.1);
    this.applyPath();
  }

  public drawArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise: boolean = false,
    moveToXY: boolean = false,
  ): void {
    if (this.get_skipDraw()) return;

    const strokeOffset = this.get_strokeOffset();
    x += strokeOffset;
    y += strokeOffset;
    this.beginPath();
    if (moveToXY) this.moveTo(x, y);
    this.arc(x, y, radius, startAngle, endAngle, counterclockwise);
    this.applyPath();
  }

  public drawEllipse(
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (this.get_skipDraw()) return;

    const strokeOffset = this.get_strokeOffset();
    x += strokeOffset;
    y += strokeOffset;
    this.beginPath();
    this.save();
    this.translate(x + width / 2, y + height / 2);
    this.scale(width / height, 1);
    this.arc(0, 0, height / 2, 0.1, PI2 + 0.1);
    this.restore();
    this.applyPath();
  }

  // TODO: remove if this is not needed at all
  private static _drawImageSafe(
    ctx: CanvasRenderingContext2D,
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
  ): void {
    // TODO: simplify the implementation
    0 >= sw ||
      0 >= sh ||
      0 >= sx + sw ||
      // @ts-expect-error
      sx >= image.width ||
      0 >= sy + sh ||
      // @ts-expect-error
      sy >= image.height ||
      ((sx += 0 > sx ? -sx : 0),
      (sy += 0 > sy ? -sy : 0),
      // @ts-expect-error
      sx + sw > image.width && (sw = image.width - sx),
      // @ts-expect-error
      sy + sh > image.height && (sh = image.height - sy),
      ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw, sh));
  }

  public drawImage(
    image: CanvasImageSource,
    bounds: Bounds | null,
    dx: number,
    dy: number,
    safe: boolean = true,
  ): void {
    if (!bounds) {
      this._ctx.drawImage(image, dx, dy);
      return;
    }

    if (safe) {
      // TODO: remove if this is not needed at all
      Surface._drawImageSafe(
        this._ctx,
        image,
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height,
        dx,
        dy,
      );
      return;
    }

    this._ctx.drawImage(
      image,
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height,
      dx,
      dy,
      bounds.width,
      bounds.height,
    );
  }

  // TODO: remove if this is not needed at all
  // TODO: define signature
  // public drawText(a, b, c, d, e, f, m, k): void {
  //   null == k && (k = 1.25);
  //   null == m && (m = 'left');
  //   null == f && (f = 'normal');
  //   if (!this.get_skipDraw())
  //     for (
  //       d = ('normal' != f ? f + ' ' : '') + e + 'px ' + d,
  //         this._ctx.font != d && (this._ctx.font = d),
  //         this._ctx.textBaseline = 'top',
  //         this._ctx.textAlign = m,
  //         a = a.split('\n'),
  //         m = 0,
  //         d = a.length;
  //       m < d;

  //     ) {
  //       f = m++;
  //       var p = a[f];
  //       this.filling && this._ctx.fillText(p, b, c + f * e * k);
  //       this.stroking && this._ctx.strokeText(p, b, c + f * e * k);
  //     }
  // }
}
