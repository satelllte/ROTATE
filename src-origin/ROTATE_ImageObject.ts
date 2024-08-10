import {Bounds} from './Bounds';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {Surface} from './Surface';
import {subString} from './utils';

export class ROTATE_ImageObject extends ROTATE_CanvasObject {
  public imageWidth = 0;
  public imageHeight = 0;
  public clipRect: Bounds = new Bounds(0, 0, 0, 0);

  constructor(public image: HTMLImageElement) {
    super();
    this.create(image);
    this.addEventListener('render', (c) => {
      this.render(c.surface);
    });
  }

  public create(image: HTMLImageElement) {
    this.image = image;
    var b = image.width,
      c = image.height;
    'svg' == subString(image.src, image.src.length - 3) &&
      (window.document.body.appendChild(image),
      (b = image.offsetWidth),
      (c = image.offsetHeight),
      window.document.body.removeChild(image));
    this.imageWidth = b;
    this.imageHeight = c;
    this.set_clipRect(new Bounds(0, 0, b, c));
  }

  public get_rect() {
    return new Bounds(
      0,
      0,
      null != this.clipRect ? this.clipRect.width : 0,
      null != this.clipRect ? this.clipRect.height : 0,
    );
  }

  public set_clipRect(bounds: Bounds) {
    this.clipRect = bounds;
  }

  public getBoundsSelf() {
    return new Bounds(
      0,
      0,
      null != this.image ? this.clipRect.width : 0,
      null != this.image ? this.clipRect.height : 0,
    );
  }

  public render(surface: Surface) {
    null != this.image &&
      surface.drawImage(
        this.image,
        this.clipRect,
        0,
        0,
        0 != this.clipRect.x ||
          0 != this.clipRect.y ||
          this.clipRect.width != this.imageWidth ||
          this.clipRect.height != this.imageHeight,
      );
  }
}
