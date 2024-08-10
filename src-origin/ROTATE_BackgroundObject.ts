import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Images} from './ROTATE_Images';
import {Surface} from './Surface';
import {Time} from './Time';

export class ROTATE_BackgroundObject extends ROTATE_CanvasObject {
  constructor() {
    super();

    this.addEventListener('render', (b) => {
      this.render(b.surface);
    });
  }

  public render(surface: Surface) {
    for (
      var b = -Math.round(
          (30 * Time.getCurrent()) % ROTATE_Images.bgCells.width,
        ),
        c = -Math.round(
          (15 * Time.getCurrent()) % ROTATE_Images.bgCells.height,
        ),
        d = 0,
        e = Math.ceil(ROTATE_Canvas.height / ROTATE_Images.bgCells.height) + 1;
      d < e;

    )
      for (
        var f = d++,
          m = 0,
          k = Math.ceil(ROTATE_Canvas.width / ROTATE_Images.bgCells.width) + 1;
        m < k;

      ) {
        var p = m++;
        surface.drawImage(
          ROTATE_Images.bgCells,
          null,
          b + ROTATE_Images.bgCells.width * p,
          c + ROTATE_Images.bgCells.height * f,
        );
      }
    surface.drawImage(ROTATE_Images.vignette, null, 0, 0);
  }
}
