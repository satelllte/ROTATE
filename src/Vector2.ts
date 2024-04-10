export class Vector2 {
  public x: number; // TODO: make readonly and access through getter only
  public y: number; // TODO: make readonly and access through getter only

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  equals(v: Vector2): boolean {
    // TODO: remove null check (once type-safety is covered)
    return null != v && v.x == this.x ? v.y == this.y : false;
  }

  add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  multiply(v: Vector2): Vector2 {
    return new Vector2(this.x * v.x, this.y * v.y);
  }

  divide(v: Vector2): Vector2 {
    return new Vector2(this.x / v.x, this.y / v.y);
  }

  public static dot(a: Vector2, b: Vector2): number {
    return a.x * b.x + a.y * b.y;
  }

  public static distance(a: Vector2, b: Vector2): number {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  }
}
