import {Howl} from 'howler';
import {
  type ROTATE_EventHandlersEventMap,
  type ROTATE_Event,
} from './ROTATE_Event';
import {ROTATE_EventTarget} from './ROTATE_EventTarget';

export class ROTATE_Manager {
  public static inited = false;
  public static finished = false;
  public static tasks: boolean[] = [];
  public static events = new ROTATE_EventTarget();

  public static triggerEvent(event: ROTATE_Event): void {
    ROTATE_Manager.events.triggerEvent(event);
  }

  public static addEventListener<
    EventType extends keyof ROTATE_EventHandlersEventMap,
  >(
    type: EventType,
    listener: (event: ROTATE_EventHandlersEventMap[EventType]) => void,
  ): void {
    ROTATE_Manager.events.addEventListener(type, listener);
  }

  public static removeEventListener<
    EventType extends keyof ROTATE_EventHandlersEventMap,
  >(
    type: EventType,
    listener: (event: ROTATE_EventHandlersEventMap[EventType]) => void,
  ): void {
    ROTATE_Manager.events.removeEventListener(type, listener);
  }

  public static _init(): void {
    ROTATE_Manager.inited || (ROTATE_Manager.inited = !0);
  }

  public static createTask() {
    // TODO: re-implement properly
    ROTATE_Manager.tasks.push(!1);
    return ROTATE_Manager.tasks.length - 1;
  }

  public static closeTask(a: number) {
    // TODO: re-implement properly
    0 <= a && a < ROTATE_Manager.tasks.length && (ROTATE_Manager.tasks[a] = !0);
  }

  public static get_done() {
    // TODO: re-implement properly
    if (!ROTATE_Manager.inited) return !1;
    if (ROTATE_Manager.finished) return !0;
    for (var a = 0, b = ROTATE_Manager.tasks.length; a < b; ) {
      var c = a++;
      if (!ROTATE_Manager.tasks[c]) return !1;
    }
    return (ROTATE_Manager.finished = !0);
  }

  public static get_progress() {
    // TODO: re-implement properly
    if (!ROTATE_Manager.inited) return 0;
    if (ROTATE_Manager.finished) return 1;
    for (var a = 0, b = 0, c = ROTATE_Manager.tasks.length; b < c; ) {
      var d = b++;
      ROTATE_Manager.tasks[d] && ++a;
    }
    return a / ROTATE_Manager.tasks.length;
  }

  public static loadImage(
    src: string,
    onLoad: ((image: HTMLImageElement) => void) | null = null,
  ) {
    // TODO: re-implement properly
    var c = new Image();
    c.src = src;
    if (!ROTATE_Manager.finished) {
      var d = ROTATE_Manager.createTask();
      c.onload = function () {
        ROTATE_Manager.closeTask(d);
        null != onLoad && onLoad(c);
      };
    }
    return c;
  }

  public static loadTextFile(
    url: string,
    onLoad: (responseText: string) => void,
  ) {
    // TODO: re-implement properly
    var c = ROTATE_Manager.createTask(),
      d = new XMLHttpRequest();
    d.open('GET', url);
    d.onload = function () {
      ROTATE_Manager.closeTask(c);
      null != onLoad && onLoad(d.responseText);
    };
    d.send();
  }

  public static loadSound(howlProps: IHowlProperties) {
    const taskId = ROTATE_Manager.createTask();
    return new Howl({
      ...howlProps,
      onload: () => {
        ROTATE_Manager.closeTask(taskId);
      },
    });
  }
}
