import {CanvasInput} from './CanvasInput';
import {InputKeys} from './InputKeys';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {
  ROTATE_Event,
  ROTATE_ManagerEvent,
  ROTATE_MouseEvent,
  ROTATE_RenderEvent,
} from './ROTATE_Event';
import {ROTATE_Manager} from './ROTATE_Manager';
import {ROTATE_Game} from './Rotate';
import {Surface} from './Surface';
import {Time} from './Time';
import {Vector2} from './Vector2';
import {pointInTransformedBounds} from './utils';

export class ROTATE_Canvas {
  public static canvas: HTMLCanvasElement | null = null;
  public static ctx: CanvasRenderingContext2D | null = null;
  public static parent: HTMLElement | null = null;
  public static started = false;
  public static imageSmoothingEnabled = true;
  public static lastCursor = 'default';
  public static scale = 1;
  public static offsetX = 0;
  public static offsetY = 0;
  public static wasLoaded = false;
  public static lastProgress = 0;
  public static background: number = 0x000000;
  public static width: number = 0;
  public static height: number = 0;
  public static transparent: boolean = false;
  public static surface: Surface | null = null;
  public static input: CanvasInput | null = null;
  public static stage: ROTATE_Game | null = null;
  public static mouseSprite: ROTATE_CanvasObject | null = null;
  public static clickSprite: ROTATE_CanvasObject | null = null;

  public static set_background(color: number): void {
    // TODO: re-implement properly
    ROTATE_Canvas.background = color & -1;
  }

  public static set_imageSmoothingEnabled(enabled: boolean): void {
    ROTATE_Canvas.imageSmoothingEnabled = enabled;
    if (!ROTATE_Canvas.ctx) return;
    ROTATE_Canvas.ctx.imageSmoothingEnabled = enabled;
  }

  public static start(
    container: HTMLElement,
    width: number,
    height: number,
    background: number,
    transparent: boolean,
    gameInstance: ROTATE_Game,
  ): void {
    if (ROTATE_Canvas.started) return;
    if (gameInstance === null) return;

    ROTATE_Canvas.transparent = transparent;
    ROTATE_Canvas.width = width;
    ROTATE_Canvas.height = height;
    ROTATE_Canvas.set_background(background);
    ROTATE_Canvas.stage = gameInstance;
    window.setTimeout(function () {
      window.focus();
    }, 0);
    ROTATE_Canvas.setup(container);
    gameInstance.triggerEvent(new ROTATE_Event(ROTATE_Event.ADDED));
    ROTATE_Manager._init();
    ROTATE_Canvas.loop();
    ROTATE_Canvas.started = true;
  }

  public static setup(container: HTMLElement): void {
    ROTATE_Canvas.parent = container;
    const body = document.body;
    body.style.margin = '0';
    body.style.overflow = 'hidden';
    ROTATE_Canvas.canvas = document.createElement('canvas');
    ROTATE_Canvas.canvas.width = ROTATE_Canvas.width;
    ROTATE_Canvas.canvas.height = ROTATE_Canvas.height;
    ROTATE_Canvas.canvas.style.position = 'absolute';
    ROTATE_Canvas.canvas.style.left = '0';
    ROTATE_Canvas.canvas.style.top = '0';
    ROTATE_Canvas.canvas.style.transform = 'translateZ(0px)';
    ROTATE_Canvas.canvas.style.cursor = 'default';
    container.appendChild(ROTATE_Canvas.canvas);
    ROTATE_Canvas.ctx = ROTATE_Canvas.canvas.getContext('2d', {
      alpha: ROTATE_Canvas.transparent,
    });
    if (!ROTATE_Canvas.ctx)
      throw new Error('Was not able to get CanvasRenderingContext2D of canvas');
    ROTATE_Canvas.set_imageSmoothingEnabled(
      ROTATE_Canvas.imageSmoothingEnabled,
    );
    ROTATE_Canvas.surface = new Surface(ROTATE_Canvas.ctx);
    Time.reset();
    ROTATE_Canvas.input = new CanvasInput(ROTATE_Canvas.canvas);
    InputKeys._init();
    ROTATE_Canvas.input.addEventListener(
      'click',
      // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
      ROTATE_Canvas.onClick,
    );
    ROTATE_Canvas.input.addEventListener(
      'mouseDown',
      // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
      ROTATE_Canvas.onMouseDown,
    );
    ROTATE_Canvas.input.addEventListener(
      'mouseUp',
      // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
      ROTATE_Canvas.onMouseUp,
    );
    ROTATE_Canvas.input.addEventListener(
      'move',
      // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
      ROTATE_Canvas.onMouseMove,
    );
  }

  public static loop(): void {
    if (!ROTATE_Canvas.canvas) throw new Error('No canvas. Cannot run loop');
    if (!ROTATE_Canvas.stage) throw new Error('No initialized game stage');

    Time.update();
    if (ROTATE_Manager.get_done()) {
      if (!ROTATE_Canvas.wasLoaded) {
        ROTATE_Manager.triggerEvent(
          new ROTATE_ManagerEvent(ROTATE_ManagerEvent.PROGRESS, 1),
        );
        ROTATE_Canvas.lastProgress = 1;
        ROTATE_Manager.triggerEvent(
          new ROTATE_ManagerEvent(ROTATE_ManagerEvent.FINISHED, 1),
        );
      }
    } else {
      const progress = ROTATE_Manager.get_progress();
      if (progress !== ROTATE_Canvas.lastProgress) {
        ROTATE_Manager.triggerEvent(
          new ROTATE_ManagerEvent(ROTATE_ManagerEvent.PROGRESS, progress),
        );
        ROTATE_Canvas.lastProgress = progress;
      }
    }

    ROTATE_Canvas.wasLoaded = ROTATE_Manager.get_done();
    var prevScale = ROTATE_Canvas.scale;
    ROTATE_Canvas.scale =
      window.innerWidth / window.innerHeight <
      ROTATE_Canvas.width / ROTATE_Canvas.height
        ? window.innerWidth / ROTATE_Canvas.width
        : window.innerHeight / ROTATE_Canvas.height;
    const w = Math.round(ROTATE_Canvas.width * ROTATE_Canvas.scale);
    const h = Math.round(ROTATE_Canvas.height * ROTATE_Canvas.scale);
    ROTATE_Canvas.scale != prevScale &&
      ((ROTATE_Canvas.canvas.style.width = w + 'px'),
      (ROTATE_Canvas.canvas.style.height = h + 'px'));
    var b = Math.floor((window.innerWidth - w) / 2);
    b != ROTATE_Canvas.offsetX &&
      ((ROTATE_Canvas.canvas.style.left =
        Math.floor((window.innerWidth - w) / 2) + 'px'),
      (ROTATE_Canvas.offsetX = b));
    var verticalSpacing = Math.floor((window.innerHeight - h) / 2);
    verticalSpacing != ROTATE_Canvas.offsetY &&
      ((ROTATE_Canvas.canvas.style.top =
        Math.floor((window.innerHeight - h) / 2) + 'px'),
      (ROTATE_Canvas.offsetY = verticalSpacing));
    ROTATE_Canvas.updateMouseSprite();
    var a =
      null != ROTATE_Canvas.mouseSprite && ROTATE_Canvas.mouseSprite.buttonMode
        ? 'pointer'
        : 'default';
    a != ROTATE_Canvas.lastCursor &&
      ((ROTATE_Canvas.canvas.style.cursor = a), (ROTATE_Canvas.lastCursor = a));
    const enterFrameEvent = new ROTATE_Event(ROTATE_Event.ENTER_FRAME);
    ROTATE_Canvas.stage.cascadingCallback(function (target) {
      target.triggerEvent(enterFrameEvent);
    });
    const exitFrameEvent = new ROTATE_Event(ROTATE_Event.EXIT_FRAME);
    ROTATE_Canvas.stage.cascadingCallback(function (target) {
      target.triggerEvent(exitFrameEvent);
    });
    ROTATE_Canvas.render();
    ROTATE_Canvas.requestAnimationFrame(ROTATE_Canvas.loop);
  }

  public static requestAnimationFrame(callback: FrameRequestCallback): void {
    requestAnimationFrame(callback);
  }

  public static render(): void {
    if (!ROTATE_Canvas.surface)
      throw new Error('Cannot render without surface');
    if (!ROTATE_Canvas.stage) throw new Error('Cannot render without stage');

    ROTATE_Canvas.surface.reset();
    if (ROTATE_Canvas.transparent) {
      var a = ROTATE_Canvas.background >>> 24;
      255 > a &&
        ROTATE_Canvas.surface.clearRect(
          0,
          0,
          ROTATE_Canvas.width,
          ROTATE_Canvas.height,
        );
      ROTATE_Canvas.surface.beginFill(
        ROTATE_Canvas.background & 16777215,
        // TODO: try without cast
        // @ts-expect-error Property '__cast' does not exist on type '() => void'.ts(2339)
        JSObjectUtils.__cast(a, ROTATE_Number) / 255,
      );
    } else
      ROTATE_Canvas.surface.beginFill(ROTATE_Canvas.background & 16777215, 1);
    ROTATE_Canvas.surface.drawRect(
      0,
      0,
      ROTATE_Canvas.width,
      ROTATE_Canvas.height,
    );
    ROTATE_Canvas.surface._ctx.globalAlpha = 1;
    ROTATE_Canvas.renderSprite(ROTATE_Canvas.stage, ROTATE_Canvas.surface);
  }

  public static renderSprite(node: ROTATE_CanvasObject, surface: Surface) {
    // TODO: re-implement properly
    if (node.visible && 0 != node.alpha) {
      surface.save();
      surface.translate(node.x, node.y);
      surface.rotate((node.rotation * Math.PI) / 180);
      surface.scale(node.scaleX, node.scaleY);
      var c = surface._ctx.globalAlpha;
      surface._ctx.globalAlpha *= node.alpha;
      surface.reset(!0);
      node.graphics._paint(surface);
      node.triggerEvent(
        new ROTATE_RenderEvent(ROTATE_RenderEvent.RENDER, surface),
      );
      for (var d = 0, e = node._children; d < e.length; ) {
        var f = e[d];
        ++d;
        ROTATE_Canvas.renderSprite(f, surface);
      }
      surface.scale(1 / node.scaleX, 1 / node.scaleY);
      surface._ctx.globalAlpha = c;
      surface.restore();
    }
  }

  public static updateMouseSprite(): void {
    if (!ROTATE_Canvas.stage) return;

    // TODO: re-implement properly
    var canvasObject = ROTATE_Canvas.updateMouseSpriteStep(
      ROTATE_Canvas.stage,
      null,
    );
    null == canvasObject && (canvasObject = ROTATE_Canvas.stage);
    ROTATE_Canvas.mouseSprite = canvasObject;
  }

  // TODO: define signature
  public static updateMouseSpriteStep(
    gameInstance: ROTATE_CanvasObject,
    canvasObject: ROTATE_CanvasObject | null,
  ): ROTATE_CanvasObject | null {
    // TODO: re-implement properly
    if (!ROTATE_Canvas.input) throw new Error('No input object initialized');

    if (gameInstance.visible) {
      if (gameInstance.mouseEnabled) {
        const bounds = gameInstance.getBounds();
        bounds.width -= 1e-4;
        bounds.height -= 1e-4;
        if (
          pointInTransformedBounds(
            new Vector2(ROTATE_Canvas.input.mouseX, ROTATE_Canvas.input.mouseY),
            gameInstance._transform,
            bounds,
          )
        ) {
          canvasObject = gameInstance;
        }
      }
      let i = 0;
      for (var d = gameInstance._children; i < d.length; ) {
        const e = d[i];
        ++i;
        canvasObject = ROTATE_Canvas.updateMouseSpriteStep(e, canvasObject);
      }
    }
    return canvasObject;
  }

  public static pageToGame(pageX: number, pageY: number): Vector2 {
    return new Vector2(
      (pageX - ROTATE_Canvas.offsetX) / ROTATE_Canvas.scale,
      (pageY - ROTATE_Canvas.offsetY) / ROTATE_Canvas.scale,
    );
  }

  public static onClick(event: ROTATE_MouseEvent): void {
    // TODO: re-implement properly
    ROTATE_Canvas.updateMouseSprite();
    null != ROTATE_Canvas.clickSprite &&
      ROTATE_Canvas.mouseSprite == ROTATE_Canvas.clickSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.clickSprite, event);
  }

  public static onMouseDown(event: ROTATE_MouseEvent) {
    // TODO: re-implement properly
    window.getSelection()?.removeAllRanges();
    const activeElement = window.document.activeElement;
    const activeElementTagName = activeElement?.tagName.toLowerCase();
    1 != event.which ||
      ('input' != activeElementTagName && 'textarea' != activeElementTagName) ||
      // TODO: use instanceOf check against HTMLInputElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
      // @ts-expect-error Property 'setSelectionRange' does not exist on type 'Element'
      activeElement?.setSelectionRange(0, 0);
    ROTATE_Canvas.updateMouseSprite();
    ROTATE_Canvas.clickSprite = ROTATE_Canvas.mouseSprite;
    null != ROTATE_Canvas.mouseSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.mouseSprite, event);
  }

  public static onMouseUp(event: ROTATE_MouseEvent) {
    // TODO: re-implement properly
    ROTATE_Canvas.updateMouseSprite();
    null != ROTATE_Canvas.mouseSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.mouseSprite, event);
  }

  public static onMouseMove(event: ROTATE_MouseEvent) {
    // TODO: re-implement properly
    ROTATE_Canvas.updateMouseSprite();
    null != ROTATE_Canvas.mouseSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.mouseSprite, event);
  }

  public static triggerMouseEvent(
    mouseSprite: ROTATE_CanvasObject,
    event: ROTATE_MouseEvent,
  ) {
    // TODO: re-implement properly
    for (var c = (event.target = mouseSprite); null != c; )
      c.triggerEvent(event), (c = c.parent);
  }
}
