import {Bounds} from './Bounds';
import {Surface} from './Surface';

// TODO: find a better solution to retrieve "SurfaceInstance" type
const _noopSurface = new Surface(
  document.createElement('canvas').getContext('2d')!,
);
type SurfaceInstance = typeof _noopSurface;

class GraphicsSurfaceExecutor {
  public readonly method: string; // TODO: define type properly
  public readonly args: unknown; // TODO: define type properly

  // TODO: define type properly
  constructor(method: string, args: unknown) {
    this.method = method;
    this.args = args;
  }

  public execute(surface: Surface): void {
    // TODO: figure out why .apply() must be used instead of straight call
    // @ts-expect-error // TODO: define types
    surface[this.method].apply(surface, this.args);
    // surface[this.method](this.args);
  }
}

export class Graphics {
  public items: GraphicsSurfaceExecutor[] = [];
  public bounds: Bounds = new Bounds(0, 0, 0, 0);
  private filling: boolean = false; // TODO: rename to "_filling"
  private stroking: boolean = false; // TODO: rename to "_stroking"

  constructor() {
    this.clear();
  }

  public clear(): void {
    this.items = [];
    this.filling = false;
    this.stroking = false;
    this.bounds = new Bounds(0, 0, 0, 0);
  }

  public get_length(): number {
    return this.items.length;
  }

  public get_skipDraw(): boolean {
    return this.filling ? false : !this.stroking;
  }

  // TODO: rename to "paint", since this is a public method
  public _paint(surface: Surface): void {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].execute(surface);
    }
    surface.endFill();
    surface.endStroke();
  }

  public call<TMethod extends keyof SurfaceInstance>(
    method: TMethod,
    // @ts-expect-error Type 'Surface[TMethod]' does not satisfy the constraint (because Surface._ctx is public)
    args: Parameters<SurfaceInstance[TMethod]>,
  ): void {
    this.items.push(new GraphicsSurfaceExecutor(method, args));
  }

  public beginFill(rgb?: number, alpha?: number): void {
    this.call('beginFill', [rgb, alpha]);
    this.filling = true;
  }

  public endFill(): void {
    this.call('endFill', []);
    this.filling = false;
  }

  public beginStroke(width?: number, rgb?: number, alpha?: number): void {
    this.call('beginStroke', [width, rgb, alpha]);
    this.stroking = true;
  }

  public endStroke(): void {
    this.call('endStroke', []);
    this.stroking = false;
  }

  public drawRect(x: number, y: number, width: number, height: number): void {
    if (this.get_skipDraw()) return;
    this.bounds.combine(new Bounds(x, y, width, height));
    this.call('drawRect', [x, y, width, height]);
  }

  public drawPath(boundsList: Bounds[], shouldClosePath?: boolean): void {
    if (this.get_skipDraw()) return;
    this.bounds.combine(Bounds.containingPoints(boundsList));
    this.call('drawPath', [boundsList, shouldClosePath]);
  }

  public drawCircle(x: number, y: number, radius: number): void {
    if (this.get_skipDraw()) return;
    this.bounds.combine(
      new Bounds(x - radius, y - radius, 2 * radius, 2 * radius),
    );
    this.call('drawCircle', [x, y, radius]);
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
    this.bounds.combine(
      new Bounds(x - radius, y - radius, 2 * radius, 2 * radius),
    );
    this.call('drawArc', [
      x,
      y,
      radius,
      startAngle,
      endAngle,
      counterclockwise,
      moveToXY,
    ]);
  }

  public drawEllipse(
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    if (this.get_skipDraw()) return;
    this.bounds.combine(new Bounds(x, y, width, height));
    this.call('drawEllipse', [x, y, width, height]);
  }

  // TODO: remove if this not needed at all
  // TODO: define signature
  // public drawImage(a, b, c) {
  //   this.call('drawImage', [a, b, c]);
  // }

  // TODO: remove if this not needed at all
  // TODO: define signature
  // public drawText(a, b, c, d, e, f, m, k) {
  //   null == k && (k = 1.25);
  //   null == m && (m = 'left');
  //   null == f && (f = 'normal');
  //   this.get_skipDraw() || this.call('drawText', [a, b, c, d, e, f, m, k]);
  // }
}
