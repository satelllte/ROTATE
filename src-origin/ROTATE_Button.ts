import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game} from './Rotate';
import {COLOR} from './constants';

export class ROTATE_Button extends ROTATE_CanvasObject {
  public main: ROTATE_ImageObject;
  public text: ROTATE_Text;

  constructor(title: string, color: number = COLOR.black) {
    super();

    this.main = new ROTATE_ImageObject(ROTATE_Images.menuBtn);
    this.main.set_x(-this.main.get_width() / 2);
    this.main.set_y(-this.main.get_height() / 2);
    this.main.mouseEnabled = this.main.buttonMode = !0;
    this.addChild(this.main);
    this.text = new ROTATE_Text(
      ROTATE_Game.fontMain,
      title.toUpperCase(),
      color,
    );
    this.text.set_y(this.text.y - 2);
    this.text.align = ROTATE_Text.ALIGN_CENTER;
    this.text.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.text.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
    this.addChild(this.text);
  }
}
