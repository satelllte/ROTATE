import {ROTATE_ActiveGameObject} from './ROTATE_ActiveGameObject';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_GridToggle} from './Rotate';

export class ROTATE_EditorBarLower extends ROTATE_CanvasObject {
  public static readonly HEIGHT = 48;

  public selector;
  public gridToggle;

  constructor(callback: () => void) {
    super();

    this.selector = new ROTATE_ActiveGameObject();
    this.set_y(ROTATE_Canvas.height - ROTATE_EditorBarLower.HEIGHT);
    this.mouseEnabled = !0;
    this.graphics.beginFill(2105376);
    this.graphics.drawRect(
      0,
      0,
      ROTATE_Canvas.width,
      ROTATE_EditorBarLower.HEIGHT,
    );
    this.gridToggle = new ROTATE_GridToggle(callback);
    this.addChild(this.gridToggle);
    this.selector.set_x(12);
    this.selector.set_y(
      Math.round(
        (ROTATE_EditorBarLower.HEIGHT - this.selector.get_height()) / 2,
      ),
    );
    this.addChild(this.selector);
    this.addEventListener('mouseDown', (c) => {
      2 > c.which && c.target == this && (this.selector.bubble.visible = !1);
    });
  }
}
