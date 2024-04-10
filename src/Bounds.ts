import {Vector2} from './Vector2';

// TODO: consider renaming to "Bound" or "Bounding"
export class Bounds {
  public x: number; // TODO: make readonly and access through getter only
  public y: number; // TODO: make readonly and access through getter only
  public width: number; // TODO: make readonly and access through getter only
  public height: number; // TODO: make readonly and access through getter only

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public get_top(): number {
    return this.y;
  }

  public set_top(y: number): void {
    this.y = y;
  }

  public get_left(): number {
    return this.x;
  }

  public set_left(x: number): void {
    this.x = x;
  }

  public get_bottom(): number {
    return this.y + this.height;
  }

  public set_bottom(y: number): void {
    this.height = y - this.y;
  }

  public get_right(): number {
    return this.x + this.width;
  }

  public set_right(x: number): void {
    this.width = x - this.x;
  }

  public get_center(): Vector2 {
    return new Vector2(
      (this.get_left() + this.get_right()) / 2,
      (this.get_top() + this.get_bottom()) / 2,
    );
  }

  public intersects(bounds: Bounds): boolean {
    return bounds.get_left() < this.get_right() &&
      bounds.get_right() > this.get_left() &&
      bounds.get_top() < this.get_bottom()
      ? bounds.get_bottom() > this.get_top()
      : false;
  }

  public contains(bounds: Bounds): boolean {
    // TODO: remove null check (once type-safety is covered)
    return null != bounds &&
      bounds.x >= this.x &&
      bounds.y >= this.y &&
      bounds.x < this.get_right()
      ? bounds.y < this.get_bottom()
      : false;
  }

  public equals(bounds: Bounds): boolean {
    // TODO: remove null check (once type-safety is covered)
    return null != bounds &&
      bounds.x == this.x &&
      bounds.y == this.y &&
      bounds.width == this.width
      ? bounds.height == this.height
      : false;
  }

  public combine(bounds: Bounds): void {
    const top =
      bounds.get_top() < this.get_top() ? bounds.get_top() : this.get_top();
    const left =
      bounds.get_left() < this.get_left() ? bounds.get_left() : this.get_left();
    const bottom =
      bounds.get_bottom() > this.get_bottom()
        ? bounds.get_bottom()
        : this.get_bottom();
    const right =
      bounds.get_right() > this.get_right()
        ? bounds.get_right()
        : this.get_right();
    this.set_top(top);
    this.set_left(left);
    this.set_bottom(bottom);
    this.set_right(right);
  }

  public copy(): Bounds {
    return new Bounds(this.x, this.y, this.width, this.height);
  }

  public static combineMultiple(boundsList: Bounds[]): Bounds {
    for (
      var b = 0, c = 0, d = 0, e = 0, f = 0, m = boundsList.length;
      f < m;

    ) {
      var k = f++,
        p = boundsList[k];
      if (0 == k || p.get_top() < b) b = p.get_top();
      if (0 == k || p.get_left() < c) c = p.get_left();
      if (0 == k || p.get_bottom() > d) d = p.get_bottom();
      if (0 == k || p.get_right() > e) e = p.get_right();
    }
    return new Bounds(c, b, e - c, d - b);
  }

  public static containingPoints(boundsList: Bounds[]): Bounds {
    for (
      var b = boundsList[0].y,
        c = boundsList[0].x,
        d = boundsList[0].y,
        e = boundsList[0].x,
        f = 0;
      f < boundsList.length;

    ) {
      var m = boundsList[f];
      ++f;
      m.y < b ? (b = m.y) : m.y > d && (d = m.y);
      m.x < c ? (c = m.x) : m.x > e && (e = m.x);
    }
    return new Bounds(c, b, e - c, d - b);
  }
}
