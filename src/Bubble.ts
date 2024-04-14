import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {type Block} from './Rotate';
import {COLOR} from './constants';

export class Bubble extends ROTATE_CanvasObject {
  public tip = new ROTATE_ImageObject(ROTATE_Images.configTip);
  public content = new ROTATE_CanvasObject();

  constructor() {
    super();

    this.tip.set_x(-this.tip.get_width() / 2);
    this.tip.set_y(-this.tip.get_height());
    this.addChild(this.tip);
  }

  public setup(block: Block) {
    const halfWidth = Math.round(block.bubbleWidth / 2);
    this.graphics.clear();
    this.graphics.beginFill(COLOR.border);
    this.graphics.drawRect(
      -halfWidth - 2,
      -block.bubbleHeight - this.tip.get_height() - 2,
      block.bubbleWidth + 4,
      block.bubbleHeight + 4,
    );
    this.graphics.beginFill(COLOR.background);
    this.graphics.drawRect(
      -halfWidth,
      -block.bubbleHeight - this.tip.get_height(),
      block.bubbleWidth,
      block.bubbleHeight,
    );
    null != this.content && this.removeChild(this.content);
    this.content = new ROTATE_CanvasObject();
    this.content.set_x(-halfWidth);
    this.content.set_y(-block.bubbleHeight - this.tip.get_height());
    this.addChild(this.content);
    block.setupBubble(this.content);
  }
}
