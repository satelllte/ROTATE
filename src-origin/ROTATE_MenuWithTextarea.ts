import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game} from './Rotate';
import {COLOR} from './constants';

export class ROTATE_MenuWithTextarea extends ROTATE_CanvasObject {
  public title;
  public area;

  constructor(title: string, initialText = '') {
    super();

    this.graphics.beginFill(COLOR.darkGray, 0.95);
    this.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.mouseEnabled = !0;
    this.title = new ROTATE_Text(ROTATE_Game.fontMain, title);
    this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.title.set_y(36);
    this.addChild(this.title);
    this.area = window.document.createElement('textarea');
    var c = ROTATE_Canvas.width - 80;
    window.document.body.appendChild(this.area);
    this.area.style.position = 'absolute';
    this.area.style.left = Math.round((ROTATE_Canvas.width - c) / 2) + 'px';
    this.area.style.top =
      Math.round((ROTATE_Canvas.height - 300) / 2 - 8) + 'px';
    this.area.style.width = c - 12 + 'px';
    this.area.style.height = '288px';
    this.area.style.resize = 'none';
    this.area.style.border = this.area.style.outline = 'none';
    this.area.style.margin = '0';
    this.area.style.padding = '6px';
    this.area.style.background = '#fff';
    this.area.style.color = '#000';
    this.area.style.fontFamily = "'Courier New', Courier, monospace";
    this.area.style.fontSize = '12px';
    this.area.value = initialText;
    this.area.select();
  }

  public kill() {
    null != this.area.parentElement &&
      window.document.body.removeChild(this.area);
  }
}
