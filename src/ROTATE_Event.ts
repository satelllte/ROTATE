import {type Surface} from './Surface';

export const EVENT = {
  added: 'added',
  blur: 'blur',
  click: 'click',
  enterFrame: 'enterFrame',
  exitFrame: 'exitFrame',
  finished: 'finished',
  focus: 'focus',
  keyDown: 'keyDown',
  keyUp: 'keyUp',
  mouseDown: 'mouseDown',
  mouseUp: 'mouseUp',
  move: 'move',
  progress: 'progress',
  removed: 'removed',
  render: 'render',
} as const satisfies Record<string, string>;

export type ROTATE_EventHandlersEventMap = {
  [EVENT.added]: ROTATE_Event;
  [EVENT.blur]: ROTATE_FocusingEvent;
  [EVENT.click]: ROTATE_MouseEvent;
  [EVENT.enterFrame]: ROTATE_Event;
  [EVENT.exitFrame]: ROTATE_Event;
  [EVENT.finished]: ROTATE_ManagerEvent;
  [EVENT.focus]: ROTATE_FocusingEvent;
  [EVENT.keyDown]: ROTATE_KeyEvent;
  [EVENT.keyUp]: ROTATE_KeyEvent;
  [EVENT.mouseDown]: ROTATE_MouseEvent;
  [EVENT.mouseUp]: ROTATE_MouseEvent;
  [EVENT.move]: ROTATE_MouseEvent;
  [EVENT.progress]: ROTATE_ManagerEvent;
  [EVENT.removed]: ROTATE_Event;
  [EVENT.render]: ROTATE_RenderEvent;
};

export class ROTATE_Event {
  public type: string; // TODO: mark as readonly

  constructor(type: string) {
    this.type = type;
  }

  public static readonly ADDED = EVENT.added;
  public static readonly REMOVED = EVENT.removed;
  public static readonly ENTER_FRAME = EVENT.enterFrame;
  public static readonly EXIT_FRAME = EVENT.exitFrame;
}

export class ROTATE_FocusingEvent extends ROTATE_Event {
  public static readonly FOCUS = EVENT.focus;
  public static readonly BLUR = EVENT.blur;
}

export class ROTATE_KeyEvent extends ROTATE_Event {
  public readonly keyCode: number;

  constructor(type: string, keyCode: number) {
    super(type);
    this.keyCode = keyCode;
  }

  public static readonly KEY_DOWN = EVENT.keyDown;
  public static readonly KEY_UP = EVENT.keyUp;
}

export class ROTATE_ManagerEvent extends ROTATE_Event {
  public readonly progress: number;

  constructor(type: string, progress: number) {
    super(type);
    this.progress = progress;
  }

  public static readonly FINISHED = EVENT.finished;
  public static readonly PROGRESS = EVENT.progress;
}

export class ROTATE_MouseEvent extends ROTATE_Event {
  public target: null; // TODO: mark as readonly, define types
  public readonly x: number;
  public readonly y: number;
  public readonly which: number;

  constructor(
    type: string,
    target: null,
    x: number,
    y: number,
    which: number = 0,
  ) {
    super(type);
    this.target = target;
    this.x = x;
    this.y = y;
    this.which = which;
  }

  public static readonly CLICK = EVENT.click;
  public static readonly MOUSE_DOWN = EVENT.mouseDown;
  public static readonly MOUSE_UP = EVENT.mouseUp;
  public static readonly MOVE = EVENT.move;
}

export class ROTATE_RenderEvent extends ROTATE_Event {
  public readonly surface: Surface;

  constructor(type: string, surface: Surface) {
    super(type);
    this.surface = surface;
  }

  public static readonly RENDER = EVENT.render;
}
