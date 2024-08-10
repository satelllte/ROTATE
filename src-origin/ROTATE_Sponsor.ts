import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Awards} from './ROTATE_Awards';

export class ROTATE_Sponsor extends ROTATE_ImageObject {
  constructor() {
    super(ROTATE_Images.linkJoshua);

    this.clipRect.height /= 2;
    this.set_x(8);
    this.set_y(ROTATE_Canvas.height - this.get_height() - 8);
    this.mouseEnabled = true;
    this.buttonMode = true;

    this.addEventListener('click', (event) => {
      if (2 <= event.which) return;

      const win = window.open('https://lightwolfstudios.com', '_blank');
      ROTATE_Awards.awardJoshua.unlock();
      win?.focus();
    });
  }
}
