import {type Surface} from './Surface';

export class ROTATE_Event {
  public type: string; // TODO: mark as readonly

  constructor(type: string) {
    this.type = type;
  }

  public static readonly ADDED = 'added';
  public static readonly REMOVED = 'removed';
  public static readonly ENTER_FRAME = 'enterFrame';
  public static readonly EXIT_FRAME = 'exitFrame';
}

export class ROTATE_FocusingEvent extends ROTATE_Event {
  public static readonly FOCUS = 'focus';
  public static readonly BLUR = 'blur';
}

export class ROTATE_KeyEvent extends ROTATE_Event {
  public keyCode: number; // TODO: mark as readonly

  constructor(type: string, keyCode: number) {
    super(type);
    this.keyCode = keyCode;
  }

  public static readonly KEY_DOWN = 'keyDown';
  public static readonly KEY_UP = 'keyUp';
}

export class ROTATE_ManagerEvent extends ROTATE_Event {
  public progress: number; // TODO: mark as readonly

  constructor(type: string, progress: number) {
    super(type);
    this.progress = progress;
  }

  public static readonly FINISHED = 'finished';
  public static readonly PROGRESS = 'progress';
}

export class ROTATE_MouseEvent extends ROTATE_Event {
  public target: null; // TODO: mark as readonly
  public x: number; // TODO: mark as readonly
  public y: number; // TODO: mark as readonly
  public which: 0 | 1; // TODO: mark as readonly

  constructor(
    type: string,
    target: null,
    x: number,
    y: number,
    which: 0 | 1 = 0,
  ) {
    super(type);
    this.target = target;
    this.x = x;
    this.y = y;
    this.which = which;
  }

  public static readonly CLICK = 'click';
  public static readonly MOUSE_DOWN = 'mouseDown';
  public static readonly MOUSE_UP = 'mouseUp';
  public static readonly MOVE = 'move';
}

export class ROTATE_RenderEvent extends ROTATE_Event {
  public surface: Surface; // TODO: mark as readonly

  constructor(type: string, surface: Surface) {
    super(type);
    this.surface = surface;
  }

  public static readonly RENDER = 'render';
}
