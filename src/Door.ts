import {BlockData} from './Blocks';
import {ROTATE_LevelEditorManager} from './Rotate';

export class Door {
  public x;
  public y;
  public channel;
  public length;
  public angle;

  constructor(blockData: BlockData) {
    this.x = blockData.x;
    this.y = blockData.y;
    this.channel = blockData.getMeta(0);
    this.length = blockData.getMeta(1);
    this.angle = blockData.getMeta(2);
  }

  public static canPlace(x: number, y: number, c) {
    if (!ROTATE_LevelEditorManager.isInBounds(x, y)) return !1;
    var d = c[1];
    c = c[2];
    if (3 == c) {
      if (y < d - 1) return !1;
      d = y - (d - 1);
      for (y += 1; d < y; )
        if (((c = d++), !ROTATE_LevelEditorManager.isReplacable(x, c)))
          return !1;
    } else if (2 == c) {
      if (x < d - 1) return !1;
      d = x - (d - 1);
      for (x += 1; d < x; )
        if (((c = d++), !ROTATE_LevelEditorManager.isReplacable(c, y)))
          return !1;
    } else if (1 == c) {
      if (y > ROTATE_LevelEditorManager.get_height() - d) return !1;
      c = y;
      for (y += d; c < y; )
        if (((d = c++), !ROTATE_LevelEditorManager.isReplacable(x, d)))
          return !1;
    } else {
      if (x > ROTATE_LevelEditorManager.get_width() - d) return !1;
      c = x;
      for (x += d; c < x; )
        if (((d = c++), !ROTATE_LevelEditorManager.isReplacable(d, y)))
          return !1;
    }
    return !0;
  }

  public contains(x: number, y: number) {
    return 3 == this.angle
      ? x == this.x && y <= this.y
        ? y > this.y - this.length
        : !1
      : 2 == this.angle
        ? y == this.y && x <= this.x
          ? x > this.x - this.length
          : !1
        : 1 == this.angle
          ? x == this.x && y >= this.y
            ? y < this.y + this.length
            : !1
          : y == this.y && x >= this.x
            ? x < this.x + this.length
            : !1;
  }

  public forEach(callback: (x: number, y: number) => void) {
    for (var b = 0, c = this.length; b < c; ) {
      var d = b++;
      3 == this.angle
        ? callback(this.x, this.y - d)
        : 2 == this.angle
          ? callback(this.x - d, this.y)
          : 1 == this.angle
            ? callback(this.x, this.y + d)
            : callback(this.x + d, this.y);
    }
  }
}
