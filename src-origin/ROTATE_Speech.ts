import {ROTATE_Audio} from './ROTATE_Audio';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Condition} from './ROTATE_Condition';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game, ROTATE_ScreenPrimaryGame} from './Rotate';

export class ROTATE_SpeechPart {
  constructor(
    public readonly cond: ROTATE_Condition,
    public readonly text: string,
  ) {}
}

export class ROTATE_Speech {
  public static readonly TIME_TYPE = 30;
  public static readonly TIME_STAY = 5250;
  public static readonly TIME_FADE = 750;

  public lastTone;
  public tones;
  public char2;
  public timer;
  public char;
  public msg;
  public field: ROTATE_Text;
  public index;
  public events;

  constructor(events: ROTATE_SpeechPart[], node?: ROTATE_CanvasObject) {
    this.lastTone = -1;
    this.tones = 'abcdefgh'.split('');
    this.char2 = this.timer = 0;
    this['char'] = 0;
    this.msg = '';
    this.field = new ROTATE_Text(ROTATE_Game.fontMain, '', 2);
    this.index = 0;
    this.events = events;
    this.field.set_alpha(0);
    this.field.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.field.align = ROTATE_Text.ALIGN_CENTER;
    this.field.set_x(ROTATE_Canvas.width / 2);
    null == node &&
    ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenPrimaryGame
      ? ((node = ROTATE_Game.instance.currentScreen.textHolder),
        (this.field.yAlign = ROTATE_Text.Y_ALIGN_TOP),
        this.field.set_y(ROTATE_Canvas.height - 96))
      : ((this.field.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE),
        this.field.set_y(ROTATE_Canvas.height / 2));
    node?.addChild(this.field);
    null != events[0] && events[0].cond.start();
  }

  public update() {
    var a = !0;
    ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenPrimaryGame &&
      (a = !ROTATE_Game.instance.currentScreen.player.dead);
    a &&
      null != this.events[this.index] &&
      this.events[this.index].cond.test() &&
      ('' != this.events[this.index].text &&
        (this.field.set_text(''),
        (this.msg = this.events[this.index].text),
        (this['char'] = this.char2 = 0),
        (this.timer = ROTATE_Game.instance.get_gameTimeMS()),
        this.field.set_alpha(1)),
      this.index++,
      null != this.events[this.index] && this.events[this.index].cond.start());
    if (
      this['char'] < this.msg.length &&
      (0 == this['char'] ||
        ' ' == this.msg.charAt(this['char']) ||
        '\n' == this.msg.charAt(this['char']) ||
        ROTATE_Game.instance.get_gameTimeMS() - this.timer >=
          ROTATE_Speech.TIME_TYPE)
    ) {
      a = this.field;
      a.set_text(a.text + this.msg.charAt(this['char']));
      if (
        ' ' != this.msg.charAt(this['char']) &&
        '\n' != this.msg.charAt(this['char'])
      ) {
        if (0 == this.char2 % 6) {
          for (a = this.lastTone; a == this.lastTone; )
            a = Math.round(7 * Math.random());
          this.lastTone = a;
          ROTATE_Audio.voice.play(this.tones[a]);
        }
        this.char2++;
      }
      this['char']++;
      this.timer = ROTATE_Game.instance.get_gameTimeMS();
    }
    this['char'] == this.msg.length &&
      ROTATE_Game.instance.get_gameTimeMS() - this.timer >
        ROTATE_Speech.TIME_STAY &&
      ((a = Math.min(
        1,
        (ROTATE_Game.instance.get_gameTimeMS() -
          this.timer -
          ROTATE_Speech.TIME_STAY) /
          ROTATE_Speech.TIME_FADE,
      )),
      this.field.set_alpha(ROTATE_Game.smootherStep(1 - a)));
    ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenPrimaryGame &&
      (this.field.graphics.clear(),
      '' != this.field.text &&
        ((a = this.field.getBoundsSelf()),
        this.field.graphics.beginFill(2105376, 0.85),
        this.field.graphics.drawRect(
          a.x - 6,
          a.y + 2,
          a.width + 12,
          a.height,
        )));
  }

  public killed() {
    this.field.set_text('');
    this.msg = '';
    this['char'] = this.char2 = 0;
  }
}
