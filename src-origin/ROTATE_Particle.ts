export class ROTATE_Particle {
  public static readonly GRAVITY_MULT = 0.2;

  public freeze = !1;
  public lastX;
  public lastY;

  constructor(
    public size: number,
    public life: number,
    public x: number,
    public y: number,
    public dx: number,
    public dy: number,
    public gravityX: number = 0,
    public gravityY: number = 0,
    public handler?: (particle: ROTATE_Particle) => void,
  ) {
    this.lastX = x;
    this.lastY = y;
  }

  public update() {
    if (!this.freeze || 0 >= this.life)
      (this.dx += this.gravityX * ROTATE_Particle.GRAVITY_MULT),
        (this.dy += this.gravityY * ROTATE_Particle.GRAVITY_MULT),
        (this.x += this.dx),
        (this.y += this.dy),
        null != this.handler && this.handler(this),
        0 < this.life && this.life--,
        (this.lastX = this.x),
        (this.lastY = this.y);
  }
}
