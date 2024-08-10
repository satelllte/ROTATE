import {Bounds} from './Bounds';
import {ROTATE_LevelEditorManager} from './Rotate';
import {type Vector2} from './Vector2';
import {ROTATE_GameConstants} from './constants';

export class Collider {
  constructor(public bounds: Bounds) {}

  public testPoint(point: Vector2) {
    return this.bounds.contains(point);
  }
}

export class ColliderNoop {
  constructor(public dir: number) {}

  public testPoint(_point: Vector2) {
    return !1;
  }
}

export class Collider2 {
  public bounds = new Bounds(
    0,
    0,
    ROTATE_GameConstants.tileSize,
    ROTATE_GameConstants.tileSize,
  );

  constructor(public dir: number) {}

  public testPoint(_point: Vector2, pointB: Vector2) {
    if (null == pointB) return !1;

    var bounds = this.bounds;
    if (0 == ROTATE_LevelEditorManager.rotation) {
      if (
        (0 == this.dir && pointB.y <= bounds.get_top()) ||
        (1 == this.dir && pointB.x >= bounds.get_right()) ||
        (2 == this.dir && pointB.y >= bounds.get_bottom()) ||
        (3 == this.dir && pointB.x <= bounds.get_left())
      )
        return !0;
    } else if (1 == ROTATE_LevelEditorManager.rotation) {
      if (
        (3 == this.dir && pointB.x <= bounds.get_left()) ||
        (0 == this.dir && pointB.y <= bounds.get_top()) ||
        (1 == this.dir && pointB.x >= bounds.get_right()) ||
        (2 == this.dir && pointB.y >= bounds.get_bottom())
      )
        return !0;
    } else if (2 == ROTATE_LevelEditorManager.rotation) {
      if (
        (2 == this.dir && pointB.y >= bounds.get_bottom()) ||
        (3 == this.dir && pointB.x <= bounds.get_left()) ||
        (0 == this.dir && pointB.y <= bounds.get_top()) ||
        (1 == this.dir && pointB.x / 2 >= bounds.get_right())
      )
        return !0;
    } else if (
      3 == ROTATE_LevelEditorManager.rotation &&
      ((1 == this.dir && pointB.x >= bounds.get_right()) ||
        (2 == this.dir && pointB.y >= bounds.get_bottom()) ||
        (3 == this.dir && pointB.x <= bounds.get_left()) ||
        (0 == this.dir && pointB.y <= bounds.get_top()))
    )
      return !0;
    return !1;
  }
}

export class Collider3 {
  public dir = 0;

  constructor(dir: number) {
    this.set_dir(dir);
  }

  public set_dir(dir: number) {
    return (this.dir = 0 > dir || 3 < dir ? 0 : dir);
  }

  public testPoint(point: Vector2) {
    return (0 == this.dir &&
      point.x + point.y > ROTATE_GameConstants.tileSize) ||
      (1 == this.dir &&
        ROTATE_GameConstants.tileSize - point.x + point.y >
          ROTATE_GameConstants.tileSize) ||
      (2 == this.dir && point.x + point.y < ROTATE_GameConstants.tileSize)
      ? !0
      : 3 == this.dir
        ? ROTATE_GameConstants.tileSize - point.x + point.y <
          ROTATE_GameConstants.tileSize
        : !1;
  }
}
