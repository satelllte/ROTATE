import {ROTATE_Button} from './ROTATE_Button';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_InvertCheckbox} from './ROTATE_InvertCheckbox';
import {ROTATE_MuteButtons} from './ROTATE_MuteButtons';
import {ROTATE_Sponsor} from './ROTATE_Sponsor';
import {ROTATE_Text} from './ROTATE_Text';
import {
  ROTATE_Game,
  ROTATE_LevelEditorManager,
  ROTATE_Levels,
  ROTATE_ScreenEditor,
  ROTATE_ScreenExtras,
  ROTATE_ScreenGameBeginning,
  ROTATE_ScreenGameFinished,
  ROTATE_ScreenGameLastScene,
  ROTATE_ScreenLevels,
  ROTATE_ScreenMainMenu,
  ROTATE_ScreenPrimaryGame,
} from './Rotate';
import {COLOR} from './constants';

export class ROTATE_PauseMenu extends ROTATE_CanvasObject {
  public sponsor;
  public mute;
  public invert;
  public btnQuit;
  public btnRedo;
  public btnPlay;
  public text;

  constructor() {
    super();
    this.sponsor = new ROTATE_Sponsor();
    this.mute = new ROTATE_MuteButtons(1);
    this.invert = new ROTATE_InvertCheckbox();
    this.btnQuit = new ROTATE_Button('QUIT', 0);
    this.btnRedo = new ROTATE_Button('RESTART', 0);
    this.btnPlay = new ROTATE_Button('CONTINUE', 0);
    this.text = new ROTATE_Text(ROTATE_Game.fontMain, 'GAME PAUSED');
    this.graphics.beginFill(COLOR.darkGray, 0.85);
    this.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.visible = !1;
    this.mouseEnabled = !0;
    this.text.align = ROTATE_Text.ALIGN_CENTER;
    this.text.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.text.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
    this.text.set_x(Math.floor(ROTATE_Canvas.width / 2));
    this.text.set_y(Math.floor(ROTATE_Canvas.height / 2) - 96 - 1);
    this.addChild(this.text);
    this.btnPlay.set_x(this.text.x);
    this.btnPlay.set_y(this.text.y + 60);
    this.btnPlay.addEventListener('click', function (a) {
      2 > a.which && ROTATE_Game.instance.unpause();
    });
    this.addChild(this.btnPlay);
    this.btnRedo.set_x(this.btnPlay.x);
    this.btnRedo.set_y(this.btnPlay.y + 60);
    this.btnRedo.addEventListener('click', function (event) {
      2 > event.which &&
        ROTATE_Game.instance.currentScreen instanceof
          ROTATE_ScreenPrimaryGame &&
        ROTATE_Game.instance.currentScreen.restart(!1);
    });
    this.addChild(this.btnRedo);
    this.btnQuit.set_x(this.btnRedo.x);
    this.btnQuit.set_y(this.btnRedo.y + 60);
    this.btnQuit.addEventListener('click', function (event) {
      if (!(2 > event.which)) return;
      var a;
      (a =
        (ROTATE_Game.instance.currentScreen instanceof
          ROTATE_ScreenPrimaryGame &&
          ROTATE_Game.instance.currentScreen.speedrun) ||
        (ROTATE_Game.instance.currentScreen instanceof
          ROTATE_ScreenGameBeginning &&
          ROTATE_Game.instance.currentScreen.speedrun)),
        ROTATE_Game.instance.changeScreen(
          ROTATE_LevelEditorManager.level == ROTATE_ScreenEditor.editorLevel
            ? new ROTATE_ScreenEditor()
            : a
              ? new ROTATE_ScreenExtras()
              : 0 < ROTATE_Levels.unlocked
                ? new ROTATE_ScreenLevels()
                : new ROTATE_ScreenMainMenu(),
          !0,
          ROTATE_Game.instance.unpause.bind(ROTATE_Game.instance),
        );
    });
    this.addChild(this.btnQuit);
    this.addChild(this.invert);
    this.addChild(this.mute);
    this.addChild(this.sponsor);
    this.sponsor.clipRect.y = this.sponsor.clipRect.height;
    ROTATE_Game.instance.warnNoSave(this);
  }

  public onPause() {
    this.mute.sfx.clipRect.x = ROTATE_Game.instance.muteSFX ? 28 : 0;
    this.mute.music.clipRect.x = ROTATE_Game.instance.muteMusic ? 84 : 56;
    var a =
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenPrimaryGame;
    this.btnRedo.set_alpha(a ? 1 : 0.25);
    this.btnRedo.main.mouseEnabled = a;
    a =
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenGameFinished ||
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenGameLastScene;
    this.btnQuit.set_alpha(a ? 0.25 : 1);
    this.btnQuit.main.mouseEnabled = !a;
  }
}
