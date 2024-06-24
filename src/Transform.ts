import {Vector2} from './Vector2';

type TransformMatrix = [number, number, number, number, number, number];

export class Transform {
  public matrix: TransformMatrix; // TODO: make readonly and access through getter only
  private _states: TransformMatrix[];

  constructor() {
    this.matrix = [1, 0, 0, 1, 0, 0];
    this._states = [];
  }

  public getMatrix(): TransformMatrix {
    return [...this.matrix];
  }

  public get(index: number): number {
    return 0 > index || 5 < index ? 0 : this.matrix[index];
  }

  public set(...tuple: TransformMatrix) {
    this.matrix = tuple;
  }

  public multiply(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  ) {
    this.set(
      this.matrix[0] * a + this.matrix[2] * b,
      this.matrix[1] * a + this.matrix[3] * b,
      this.matrix[0] * c + this.matrix[2] * d,
      this.matrix[1] * c + this.matrix[3] * d,
      this.matrix[0] * e + this.matrix[2] * f + this.matrix[4],
      this.matrix[1] * e + this.matrix[3] * f + this.matrix[5],
    );
  }

  public identity(): void {
    this.set(1, 0, 0, 1, 0, 0);
  }

  public translate(x: number, y: number): void {
    (0 == x && 0 == y) || this.multiply(1, 0, 0, 1, x, y);
  }

  public scale(x: number, y: number): void {
    (1 == x && 1 == y) || this.multiply(x, 0, 0, y, 0, 0);
  }

  public rotate(angleRad: number): void {
    0 != angleRad &&
      this.multiply(
        Math.cos(angleRad),
        Math.sin(angleRad),
        -Math.sin(angleRad),
        Math.cos(angleRad),
        0,
        0,
      );
  }

  public save(): void {
    this._states.push([...this.matrix]);
  }

  public restore(): void {
    const latest = this._states.pop();
    if (!latest) {
      this.identity();
      return;
    }
    this.matrix = latest;
  }

  public equals(transform: Transform): boolean {
    return this.matrix[0] == transform.get(0) &&
      this.matrix[1] == transform.get(1) &&
      this.matrix[2] == transform.get(2) &&
      this.matrix[3] == transform.get(3) &&
      this.matrix[4] == transform.get(4)
      ? this.matrix[5] == transform.get(5)
      : false;
  }

  public copy(transform: Transform): void {
    this.matrix[0] = transform.get(0);
    this.matrix[1] = transform.get(1);
    this.matrix[2] = transform.get(2);
    this.matrix[3] = transform.get(3);
    this.matrix[4] = transform.get(4);
    this.matrix[5] = transform.get(5);
  }

  public apply(x: number, y: number): Vector2 {
    return new Vector2(
      this.matrix[0] * x + this.matrix[2] * y + this.matrix[4],
      this.matrix[1] * x + this.matrix[3] * y + this.matrix[5],
    );
  }
}
