import {Bounds} from './Bounds';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_YesNoOverlay} from './ROTATE_YesNoOverlay';
import {ROTATE_Game} from './Rotate';

export class ROTATE_MuteButtons extends ROTATE_CanvasObject {
  public sfx: ROTATE_ImageObject;
  public music: ROTATE_ImageObject;

  constructor(verticalClipFactor: number = 0) {
    super();

    // var _self = this;
    this.sfx = new ROTATE_ImageObject(ROTATE_Images.mute);
    this.sfx.set_clipRect(
      new Bounds(
        ROTATE_Game.instance.muteSFX ? 28 : 0,
        30 * verticalClipFactor,
        28,
        30,
      ),
    );

    this.sfx.mouseEnabled = this.sfx.buttonMode = !0;
    this.sfx.addEventListener('click', (c) => {
      2 > c.which &&
        (ROTATE_Game.ie && !ROTATE_Game.instance.ieUnmuted
          ? this.showWarn(this.toggleSFX.bind(this))
          : this.toggleSFX());
    });
    this.sfx.set_x(ROTATE_Canvas.width - this.sfx.get_width() - 12);
    this.sfx.set_y(ROTATE_Canvas.height - this.sfx.get_height() - 12);
    this.addChild(this.sfx);

    this.music = new ROTATE_ImageObject(ROTATE_Images.mute);
    this.music.set_clipRect(
      new Bounds(
        ROTATE_Game.instance.muteMusic ? 84 : 56,
        30 * verticalClipFactor,
        28,
        30,
      ),
    );
    this.music.mouseEnabled = this.music.buttonMode = !0;
    this.music.addEventListener('click', (c) => {
      2 > c.which &&
        (ROTATE_Game.ie && !ROTATE_Game.instance.ieUnmuted
          ? this.showWarn(this.toggleMusic.bind(this))
          : this.toggleMusic());
    });
    this.music.set_x(this.sfx.x - this.music.get_width() - 12);
    this.music.set_y(ROTATE_Canvas.height - this.music.get_height() - 12);
    this.addChild(this.music);
  }

  public showWarn(onYesCallback?: () => void) {
    const overlay = new ROTATE_YesNoOverlay(
      'Audio may slow down the game\nin Internet Explorer. Continue?',
    );
    overlay.onNo = function () {
      ROTATE_Game.instance.removeChild(overlay);
    };
    overlay.onYes = function () {
      ROTATE_Game.instance.removeChild(overlay);
      ROTATE_Game.instance.ieUnmuted = !0;
      null != onYesCallback && onYesCallback();
    };
    ROTATE_Game.instance.addChild(overlay);
  }

  public toggleSFX() {
    ROTATE_Game.instance.toggleSFX();
    this.sfx.clipRect.x = ROTATE_Game.instance.muteSFX ? 28 : 0;
  }

  public toggleMusic() {
    ROTATE_Game.instance.toggleMusic();
    this.music.clipRect.x = ROTATE_Game.instance.muteMusic ? 84 : 56;
  }
}
