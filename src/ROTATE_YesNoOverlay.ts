import {ROTATE_Button} from './ROTATE_Button';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game} from './Rotate';
import {COLOR} from './constants';

export class ROTATE_YesNoOverlay extends ROTATE_CanvasObject {
  public btnNo;
  public btnYes;
  public main;
  public onYes: (() => void) | undefined;
  public onNo: (() => void) | undefined;

  constructor(questionText: string) {
    super();

    this.btnNo = new ROTATE_Button('NO');
    this.btnYes = new ROTATE_Button('YES');
    this.main = new ROTATE_Text(ROTATE_Game.fontMain, '', 2);
    this.main.set_text(questionText);
    this.graphics.beginFill(COLOR.darkGray, 0.95);
    this.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.mouseEnabled = !0;
    this.main.align = ROTATE_Text.ALIGN_CENTER;
    this.main.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.main.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
    this.main.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.main.set_y(Math.round(ROTATE_Canvas.height / 2) - 40);
    this.addChild(this.main);
    this.btnYes.set_x(Math.round(ROTATE_Canvas.width / 2) - 96);
    this.btnYes.set_y(Math.round(ROTATE_Canvas.height / 2) + 40);
    this.btnYes.addEventListener('click', (event) => {
      if (2 > event.which && this.onYes) this.onYes();
    });
    this.addChild(this.btnYes);
    this.btnNo.set_x(Math.round(ROTATE_Canvas.width / 2) + 96);
    this.btnNo.set_y(Math.round(ROTATE_Canvas.height / 2) + 40);
    this.btnNo.addEventListener('click', (event) => {
      if (2 > event.which && this.onNo) this.onNo();
    });
    this.addChild(this.btnNo);
  }
}
