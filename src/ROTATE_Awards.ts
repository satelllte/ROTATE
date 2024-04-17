import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Text} from './ROTATE_Text';
import {ROTATE_Game, ROTATE_ScreenAwards} from './Rotate';
import {Time} from './Time';
import {replace} from './utils';

export class ROTATE_Award {
  public unlocked = false;

  constructor(
    public readonly name: string,
    public readonly icon: HTMLImageElement,
  ) {}

  public unlock() {
    if (this.unlocked) return false;

    this.unlocked = true;

    ROTATE_Game.instance.saveProgress();
    if (ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenAwards) {
      ROTATE_Game.instance.currentScreen.refresh();
    }
    ROTATE_Awards.queueNotify(this);
    return true;
  }
}

export class ROTATE_Awards {
  public static readonly awardEscape = new ROTATE_Award(
    'The Beginning',
    ROTATE_Images.awardIconEscape,
  );
  public static readonly awardSpeedrun = new ROTATE_Award(
    'Seven or\nLess',
    ROTATE_Images.awardIconSpeedrun,
  );
  public static readonly awardEditor = new ROTATE_Award(
    'Architect',
    ROTATE_Images.awardIconEditor,
  );
  public static readonly awardJoshua = new ROTATE_Award(
    'Curiosity',
    ROTATE_Images.awardIconJoshua,
  );
  public static readonly awardSoundtrack = new ROTATE_Award(
    'Sound Seeker',
    ROTATE_Images.awardIconSoundtrack,
  );
  public static readonly awardRotate = new ROTATE_Award(
    'Rotate Me',
    ROTATE_Images.awardIconRotate,
  );
  public static readonly all = [
    ROTATE_Awards.awardEscape,
    ROTATE_Awards.awardSpeedrun,
    ROTATE_Awards.awardEditor,
    ROTATE_Awards.awardJoshua,
    ROTATE_Awards.awardSoundtrack,
    ROTATE_Awards.awardRotate,
  ];
  public static readonly FADE_MS = 250;
  public static readonly STAY_MS = 3000;

  public static bubbleTimer = -1;
  public static bubble: ROTATE_CanvasObject;
  public static bubbleTitle: ROTATE_Text;
  public static bubbleName: ROTATE_Text;
  public static bubbleIcon: ROTATE_ImageObject | undefined = undefined;
  public static queue: ROTATE_Award[] = [];

  public static setup(a: ROTATE_Game) {
    null == ROTATE_Awards.bubble &&
      ((ROTATE_Awards.bubble = new ROTATE_CanvasObject()),
      (ROTATE_Awards.bubble.mouseEnabled = !0),
      a.addChild(ROTATE_Awards.bubble),
      (ROTATE_Awards.bubbleTitle = new ROTATE_Text(
        ROTATE_Game.fontMain,
        'NEW AWARD',
      )),
      ROTATE_Awards.bubbleTitle.set_x(68),
      ROTATE_Awards.bubbleTitle.set_y(4),
      ROTATE_Awards.bubbleTitle.set_alpha(0.5),
      ROTATE_Awards.bubble.addChild(ROTATE_Awards.bubbleTitle),
      (ROTATE_Awards.bubbleName = new ROTATE_Text(ROTATE_Game.fontMain, '')),
      ROTATE_Awards.bubbleName.set_x(68),
      ROTATE_Awards.bubbleName.set_y(28),
      ROTATE_Awards.bubble.addChild(ROTATE_Awards.bubbleName),
      ROTATE_Awards.bubble.set_alpha(0));
  }

  public static queueNotify(award: ROTATE_Award) {
    null == ROTATE_Awards.queue && (ROTATE_Awards.queue = []);
    null != award &&
      0 > ROTATE_Awards.queue.indexOf(award) &&
      ROTATE_Awards.queue.push(award);
  }

  public static adjustBubble(name: string, icon: HTMLImageElement) {
    ROTATE_Awards.bubbleName.set_text(replace(name, '\n', ' '));
    ROTATE_Awards.bubble.graphics.clear();
    var c =
      Math.max(
        ROTATE_Awards.bubbleTitle.get_width(),
        ROTATE_Awards.bubbleName.get_width(),
      ) +
      ROTATE_Awards.bubbleName.x +
      12 +
      4;
    ROTATE_Awards.bubble.graphics.beginFill(3158064);
    ROTATE_Awards.bubble.graphics.drawRect(0, 0, c, 68);
    ROTATE_Awards.bubble.graphics.beginFill(6316128);
    ROTATE_Awards.bubble.graphics.drawRect(0, 0, c - 2, 66);
    ROTATE_Awards.bubble.graphics.beginFill(4210752);
    ROTATE_Awards.bubble.graphics.drawRect(0, 0, c - 4, 64);
    null != ROTATE_Awards.bubbleIcon &&
      ROTATE_Awards.bubble.removeChild(ROTATE_Awards.bubbleIcon);
    ROTATE_Awards.bubbleIcon = new ROTATE_ImageObject(icon);
    ROTATE_Awards.bubbleIcon.set_x(8);
    ROTATE_Awards.bubbleIcon.set_y(8);
    ROTATE_Awards.bubble.addChild(ROTATE_Awards.bubbleIcon);
  }

  public static update() {
    if (null != ROTATE_Awards.bubble) {
      var a = 0,
        b = Time.getCurrentMS();
      if (-1 != ROTATE_Awards.bubbleTimer) {
        var c = b - ROTATE_Awards.bubbleTimer;
        var d = c <= 2 * ROTATE_Awards.FADE_MS + ROTATE_Awards.STAY_MS;
      } else d = !1;
      d
        ? ((a =
            c <= ROTATE_Awards.FADE_MS
              ? 0
              : c <= ROTATE_Awards.FADE_MS + ROTATE_Awards.STAY_MS
                ? 1
                : 2),
          (a =
            0 == a
              ? ROTATE_Game.smootherStep(c / ROTATE_Awards.FADE_MS)
              : 1 == a
                ? 1
                : 1 -
                  ROTATE_Game.smootherStep(
                    (c - ROTATE_Awards.FADE_MS - ROTATE_Awards.STAY_MS) /
                      ROTATE_Awards.FADE_MS,
                  )))
        : null != ROTATE_Awards.queue &&
          0 < ROTATE_Awards.queue.length &&
          ((c = ROTATE_Awards.queue.shift()),
          ROTATE_Awards.adjustBubble(c.name, c.icon),
          (ROTATE_Awards.bubbleTimer = b));
      ROTATE_Awards.bubble.set_alpha(a);
      ROTATE_Awards.bubble.set_y(-68 * (1 - a));
    }
  }
}
