import {Bounds} from './Bounds';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Font} from './ROTATE_Font';
import {Surface} from './Surface';
import {Vector2} from './Vector2';
import {COLOR} from './constants';
import {charCodeAt} from './utils';

// TODO: re-implement properly
export class ROTATE_Text extends ROTATE_CanvasObject {
  public textWidth = 0;
  public textHeight = 0;
  public lineWidths: number[] = [];
  public align = 0;
  public xAlign = 0;
  public yAlign = 0;
  public lineHeight = 0;
  public hitPadding = 0;
  public text = '';
  public color: number = COLOR.black;
  public font: ROTATE_Font | undefined = undefined;

  constructor(
    font: ROTATE_Font,
    text: string = '',
    color: number = COLOR.black,
  ) {
    super();

    this.set_font(font);
    this.set_text(text);
    this.color = color;
    this.addEventListener(
      'render',
      // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
      (e) => {
        this.render(e.surface as Surface);
      },
    );
  }

  public set_font(font: ROTATE_Font) {
    this.font = font;
    this.set_lineHeight(font.lineHeight);
    this.precalc();
    return font;
  }

  public set_text(text: string) {
    this.text = text;
    this.precalc();
    return text;
  }

  public set_lineHeight(lineHeight: number) {
    this.lineHeight = lineHeight;
    this.precalc();
    return lineHeight;
  }

  public precalc() {
    if (!this.font) throw new Error('font was not set');

    var a = 0,
      b = 0,
      c = this.lineHeight,
      d = 0;
    this.lineWidths = [];
    for (var e = 0, f = this.text.length; e < f; ) {
      var m = e++;
      if ('\n' == this.text.charAt(m))
        this.lineWidths.push(d),
          d > b && (b = d),
          (a = d = 0),
          (c += this.lineHeight);
      else if (
        ((m = charCodeAt(this.text, m)), (m = this.font.chars[m]), null != m)
      ) {
        var k = m.xo + m.w;
        d += a + k;
        a = m.xa - k;
      }
    }
    this.lineWidths.push(d);
    d > b && (b = d);
    this.textWidth = b;
    this.textHeight = c;
  }

  public render(surface: Surface) {
    if (!this.font) throw new Error('font was not set');

    for (
      var b = this.getTextOffset(),
        c = -this.getLineOffset(this.lineWidths[0]),
        d = 0,
        e = 0,
        f = 0,
        m = this.text.length;
      f < m;

    ) {
      var k = f++;
      '\n' == this.text.charAt(k)
        ? (++e,
          (c = -this.getLineOffset(this.lineWidths[e])),
          (d += this.lineHeight))
        : ((k = charCodeAt(this.text, k)),
          (k = this.font.chars[k]),
          null != k &&
            (surface.drawImage(
              this.font.image,
              new Bounds(
                k.x + this.color * this.font.colorOffset,
                k.y,
                k.w,
                k.h,
              ),
              b.x + c + k.xo,
              b.y + d + k.yo,
            ),
            (c += k.xa)));
    }
  }

  public getBoundsSelf() {
    var a = this.getTextOffset();
    return new Bounds(
      a.x - this.hitPadding,
      a.y - this.hitPadding,
      this.textWidth + 2 * this.hitPadding,
      this.textHeight + 2 * this.hitPadding,
    );
  }

  public getTextOffset() {
    var a = new Vector2(0, 0);
    this.xAlign == ROTATE_Text.X_ALIGN_CENTER &&
      (a.x = Math.round(-this.textWidth / 2));
    this.xAlign == ROTATE_Text.X_ALIGN_RIGHT && (a.x = -this.textWidth);
    this.yAlign == ROTATE_Text.Y_ALIGN_MIDDLE &&
      (a.y = Math.round(-this.textHeight / 2));
    this.yAlign == ROTATE_Text.Y_ALIGN_BOTTOM && (a.y = -this.textHeight);
    return a;
  }

  public getLineOffset(a: number) {
    return this.align == ROTATE_Text.ALIGN_CENTER
      ? Math.round((-this.textWidth + a) / 2)
      : this.align == ROTATE_Text.ALIGN_RIGHT
        ? -this.textWidth + a
        : 0;
  }

  public static drawText(
    surface: Surface,
    font: ROTATE_Font,
    text: string,
    d: number,
    e: number,
    f: number = 0,
  ) {
    if (!font.lineHeight) throw new Error('No font.lineHeight');
    if (!font.chars) throw new Error('No font.chars');

    for (var m = 0, k = 0, p = 0, y = 0, H = text.length; y < H; ) {
      var K = y++;
      '\n' == text.charAt(K)
        ? (++p, (m = 0), (k += font.lineHeight))
        : ((K = charCodeAt(text, K)),
          (K = font.chars[K]),
          null != K &&
            (surface.drawImage(
              font.image,
              new Bounds(K.x + f * font.colorOffset, K.y, K.w, K.h),
              d + m + K.xo,
              e + k + K.yo,
            ),
            (m += K.xa)));
    }
  }

  public static readonly ALIGN_LEFT = 0;
  public static readonly ALIGN_CENTER = 1;
  public static readonly ALIGN_RIGHT = 2;
  public static readonly X_ALIGN_LEFT = 0;
  public static readonly X_ALIGN_CENTER = 1;
  public static readonly X_ALIGN_RIGHT = 2;
  public static readonly Y_ALIGN_TOP = 0;
  public static readonly Y_ALIGN_MIDDLE = 1;
  public static readonly Y_ALIGN_BOTTOM = 2;
}
