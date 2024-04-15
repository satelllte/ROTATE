import {Bounds} from './Bounds';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game} from './Rotate';

export class ROTATE_InvertCheckbox extends ROTATE_CanvasObject {
  constructor() {
    super();

    this.set_x(12);
    this.set_y(12);
    this.mouseEnabled = this.buttonMode = !0;
    var a = new ROTATE_Text(ROTATE_Game.fontMain, 'Invert [Q] & [E]?');
    a.set_x(30);
    a.set_y(-4);
    a.set_alpha(0.5);
    this.addChild(a);
    var b = new ROTATE_ImageObject(ROTATE_Images.configToggle);
    b.clipRect.width = 22;
    ROTATE_Game.instance.invert && (b.clipRect.x = 22);
    b.set_alpha(0.75);
    this.addChild(b);
    this.addEventListener('click', (c) => {
      2 > c.which &&
        ((ROTATE_Game.instance.invert = !ROTATE_Game.instance.invert),
        (b.clipRect.x = ROTATE_Game.instance.invert ? 22 : 0),
        ROTATE_Game.instance.saveProgress());
    });
  }

  public getBoundsSelf() {
    return new Bounds(0, 0, 198, 22);
  }
}
