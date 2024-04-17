import {ROTATE_Button} from './ROTATE_Button';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_MenuWithTextarea} from './ROTATE_MenuWithTextarea';

export class ROTATE_SaveLevelMenu extends ROTATE_MenuWithTextarea {
  public btnBack;
  public onBack?: () => void;

  constructor(initialText: string) {
    super('SAVE LEVEL', initialText);
    this.btnBack = new ROTATE_Button('BACK');
    this.area.readOnly = !0;
    this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.btnBack.set_y(ROTATE_Canvas.height - 52);
    this.btnBack.addEventListener('click', (c) => {
      if (2 > c.which && null != this.onBack) this.onBack();
    });
    this.addChild(this.btnBack);
  }
}
