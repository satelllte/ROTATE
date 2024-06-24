import {Bounds} from './Bounds';
import {Graphics} from './Graphics';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_Event} from './ROTATE_Event';
import {ROTATE_EventMap} from './ROTATE_EventMap';
import {ROTATE_EventTarget} from './ROTATE_EventTarget';
import {Transform} from './Transform';

// TODO: re-implement properly
export class ROTATE_CanvasObject extends ROTATE_EventTarget {
  public graphics = new Graphics();
  public _children: ROTATE_CanvasObject[] = [];
  public parent: ROTATE_CanvasObject | null = null;
  public _transformReverse = new Transform();
  public _transform = new Transform();
  public mouseEnabled = false;
  public buttonMode = false;
  public alpha = 1;
  public visible = true;
  public rotation = 0;
  public scaleX = 1;
  public scaleY = 1;
  public x = 0;
  public y = 0;
  public listeners = new ROTATE_EventMap();

  public set_x(x: number) {
    this.x != x && ((this.x = x), this._updateTransform());
    return this.x;
  }

  public set_y(y: number) {
    this.y != y && ((this.y = y), this._updateTransform());
    return this.y;
  }

  public set_scaleX(scaleX: number) {
    this.scaleX != scaleX && ((this.scaleX = scaleX), this._updateTransform());
    return this.scaleX;
  }

  public set_scaleY(scaleY: number) {
    this.scaleY != scaleY && ((this.scaleY = scaleY), this._updateTransform());
    return this.scaleY;
  }

  public set_rotation(rotation: number) {
    this.rotation != rotation &&
      ((this.rotation = rotation), this._updateTransform());
    return this.rotation;
  }

  public set_alpha(alpha: number) {
    return (this.alpha = 0 > alpha ? 0 : 1 < alpha ? 1 : alpha);
  }

  public get_stage() {
    return ROTATE_Canvas.stage;
  }

  public get_width() {
    return this.getBounds().width * this.scaleX;
  }

  public set_width(width: number) {
    this.set_scaleX(width / this.getBounds().width);
    return width;
  }

  public get_height() {
    return this.getBounds().height * this.scaleY;
  }

  public set_height(height: number) {
    this.set_scaleY(height / this.getBounds().height);
    return height;
  }

  public addChild(node: ROTATE_CanvasObject) {
    null != node &&
      node != this.get_stage() &&
      node != this &&
      (null != node.parent && node.parent.removeChild(node),
      this._children.push(node),
      (node.parent = this),
      node._updateTransform(),
      node.triggerEvent(new ROTATE_Event(ROTATE_Event.ADDED)));
  }

  public addChildAt(node: ROTATE_CanvasObject, index: number) {
    null != node &&
      node != this.get_stage() &&
      node != this &&
      (null != node.parent && node.parent.removeChild(node),
      this._children.splice(index, 0, node),
      (node.parent = this),
      node._updateTransform(),
      node.triggerEvent(new ROTATE_Event(ROTATE_Event.ADDED)));
  }

  public removeChild(node: ROTATE_CanvasObject) {
    if (!node) return;
    if (node.parent !== this) return;

    node.parent = null;
    this._children.splice(this._children.indexOf(node), 1);
    node._updateTransform();
    node.triggerEvent(new ROTATE_Event(ROTATE_Event.REMOVED));
  }

  public removeChildren() {
    for (let index = this._children.length; 0 <= index--; )
      this.removeChild(this._children[index]);
  }

  public globalToLocal(x: number, y: number) {
    return this._transformReverse.apply(x, y);
  }

  public localToGlobal(x: number, y: number) {
    return this._transform.apply(x, y);
  }

  public _updateTransform() {
    if (this.parent) {
      this._transform.copy(this.parent._transform);
    } else {
      this._transform.identity();
    }
    this._transform.translate(this.x, this.y);
    this._transform.rotate((this.rotation * Math.PI) / 180);
    this._transform.scale(this.scaleX, this.scaleY);
    this._transformReverse.identity();
    let node: ROTATE_CanvasObject | null = this;
    while (node) {
      this._transformReverse.scale(1 / node.scaleX, 1 / node.scaleY);
      this._transformReverse.rotate((-node.rotation * Math.PI) / 180);
      this._transformReverse.translate(-node.x, -node.y);
      node = node.parent;
    }
    var a = 0;
    for (var b = this._children; a < b.length; ) {
      var c = b[a];
      ++a;
      c._updateTransform();
    }
  }

  public getBoundsSelf() {
    return new Bounds(0, 0, 0, 0);
  }

  public getBounds() {
    const boundsList = [this.getBoundsSelf(), this.graphics.bounds];
    return Bounds.combineMultiple(boundsList);
  }

  public cascadingCallback(
    callback: ((target: ROTATE_CanvasObject) => void) | null = null,
  ) {
    if (!callback) return;
    callback(this);
    this._children.forEach((child) => {
      child.cascadingCallback(callback);
    });
  }
}
