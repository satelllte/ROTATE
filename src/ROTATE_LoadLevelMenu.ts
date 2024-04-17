import {ROTATE_Button} from './ROTATE_Button';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_MenuWithTextarea} from './ROTATE_MenuWithTextarea';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game} from './Rotate';

export class ROTATE_LoadLevelMenu extends ROTATE_MenuWithTextarea {
  public btnLoad;
  public btnCancel;
  public invalid;
  public onLoad?: (text: string) => boolean;
  public onBack?: () => void;

  constructor() {
    super('LOAD LEVEL');
    this.btnLoad = new ROTATE_Button('LOAD');
    this.btnCancel = new ROTATE_Button('CANCEL');
    this.invalid = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Level code is invalid!',
      2,
    );
    this.invalid.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.invalid.yAlign = ROTATE_Text.Y_ALIGN_BOTTOM;
    this.invalid.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.invalid.set_y(ROTATE_Canvas.height - 82);
    this.invalid.visible = !1;
    this.addChild(this.invalid);
    this.btnCancel.set_x(Math.round(ROTATE_Canvas.width / 2) - 96);
    this.btnCancel.set_y(ROTATE_Canvas.height - 52);
    this.btnCancel.addEventListener('click', (b) => {
      if (2 > b.which && null != this.onBack) this.onBack();
    });
    this.addChild(this.btnCancel);
    this.btnLoad.set_x(Math.round(ROTATE_Canvas.width / 2) + 96);
    this.btnLoad.set_y(ROTATE_Canvas.height - 52);
    this.btnLoad.addEventListener('click', (b) => {
      2 > b.which &&
        null != this.onLoad &&
        !this.onLoad(this.area.value) &&
        (this.invalid.visible = !0);
    });
    this.addChild(this.btnLoad);
    this.area.addEventListener('input', () => {
      this.invalid.visible = !1;
    });
  }
}
