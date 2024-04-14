import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game, type ROTATE_Award} from './Rotate';

export class ROTATE_AwardObject extends ROTATE_CanvasObject {
  constructor(award: ROTATE_Award) {
    super();

    const frame = new ROTATE_ImageObject(ROTATE_Images.awardFrame);
    frame.set_x(-frame.get_width() / 2);
    this.addChild(frame);

    const icon = new ROTATE_ImageObject(
      award.unlocked ? award.icon : ROTATE_Images.awardIconLocked,
    );
    icon.set_x(-icon.get_width() / 2);
    icon.set_y(8);
    this.addChild(icon);

    const text = new ROTATE_Text(ROTATE_Game.fontMain, award.name, 1);
    text.align = ROTATE_Text.ALIGN_CENTER;
    text.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    text.set_y(64);
    text.set_lineHeight(text.lineHeight - 4);
    this.addChild(text);

    award.unlocked || this.set_alpha(0.5);
  }
}
