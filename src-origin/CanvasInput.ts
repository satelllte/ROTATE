import {ROTATE_Canvas} from './ROTATE_Canvas';
import {
  ROTATE_FocusingEvent,
  ROTATE_KeyEvent,
  ROTATE_MouseEvent,
} from './ROTATE_Event';
import {ROTATE_EventMap} from './ROTATE_EventMap';
import {ROTATE_EventTarget} from './ROTATE_EventTarget';
import {Vector2} from './Vector2';

export class CanvasInput extends ROTATE_EventTarget {
  public readonly c: HTMLCanvasElement;
  public mouseX: number = 0;
  public mouseY: number = 0;
  public isFocused: boolean = false;
  public listeners = new ROTATE_EventMap();

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.c = canvas;

    window.addEventListener('focus', this.onFocus.bind(this));
    window.addEventListener('blur', this.onBlur.bind(this));
    window.addEventListener('pagehide', this.onBlur.bind(this));
    window.addEventListener('contextmenu', (event) => {
      // @ts-expect-error Property 'tagName' does not exist on type 'EventTarget'.ts(2339)
      var tag = event.target?.tagName.toLowerCase();
      if (tag !== 'canvas' && tag !== 'body' && tag !== 'html') return true;
      this.onMouseUp(event);
      event.preventDefault();
      return false;
    });
    window.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseover', this.onMouseMove.bind(this));
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  public set_mouseX(value: number): void {
    this.mouseX = Math.floor(value);
  }

  public set_mouseY(value: number): void {
    this.mouseY = Math.floor(value);
  }

  public updateMouse(event: MouseEvent): void {
    const mousePosition: Vector2 = ROTATE_Canvas.pageToGame(
      event.pageX,
      event.pageY,
    );
    this.set_mouseX(mousePosition.x);
    this.set_mouseY(mousePosition.y);
  }

  public onFocus() {
    this.isFocused = true;
    this.triggerEvent(new ROTATE_FocusingEvent(ROTATE_FocusingEvent.FOCUS));
  }

  public onBlur() {
    this.isFocused = false;
    this.triggerEvent(new ROTATE_FocusingEvent(ROTATE_FocusingEvent.BLUR));
  }

  public onClick(event: MouseEvent) {
    if (!this.isFocused) this.onFocus();
    this.updateMouse(event);
    // TODO: don't use deprecated "which" field
    this.triggerEvent(this.makeMouseEvent('click', event.which));
  }

  public onMouseDown(event: MouseEvent) {
    this.updateMouse(event);
    // TODO: don't use deprecated "which" field
    this.triggerEvent(this.makeMouseEvent('mouseDown', event.which));
  }

  public onMouseUp(event: MouseEvent) {
    this.updateMouse(event);
    this.triggerEvent(this.makeMouseEvent('mouseUp', event.which));
    // TODO: don't use deprecated "which" field
    3 == event.which &&
      (this.onKeyUp(
        new KeyboardEvent('keyup', {keyCode: 16 /* TODO: use constant */}),
      ),
      this.onKeyUp(
        new KeyboardEvent('keyup', {keyCode: 17 /* TODO: use constant */}),
      ));
    // (this.onKeyUp({
    //   type: 'keyup',
    //   keyCode: 16, // TODO: use constant
    //   preventDefault: function () {},
    // }),
    // this.onKeyUp({
    //   type: 'keyup',
    //   keyCode: 17, // TODO: use constant
    //   preventDefault: function () {},
    // }));
  }

  public onMouseMove(event: MouseEvent) {
    this.updateMouse(event);
    this.triggerEvent(this.makeMouseEvent('move'));
  }

  public makeMouseEvent(type: string, which: number = 0) {
    null == which && (which = 0);
    return new ROTATE_MouseEvent(type, null, this.mouseX, this.mouseY, which);
  }

  public onKeyDown(event: KeyboardEvent) {
    // TODO: re-implement properly
    if (this.isFocused) {
      var tag = window.document.activeElement?.tagName.toLowerCase();
      'input' != tag &&
        'textarea' != tag &&
        (this.triggerEvent(
          new ROTATE_KeyEvent(ROTATE_KeyEvent.KEY_DOWN, event.keyCode),
        ),
        this.captureKey(event.keyCode, event.ctrlKey) &&
          event.preventDefault());
    }
  }

  public onKeyUp(event: KeyboardEvent) {
    // TODO: re-implement properly
    if (this.isFocused) {
      var tag = window.document.activeElement?.tagName.toLowerCase();
      'input' != tag &&
        'textarea' != tag &&
        (this.triggerEvent(
          new ROTATE_KeyEvent(ROTATE_KeyEvent.KEY_UP, event.keyCode),
        ),
        this.captureKey(event.keyCode, event.ctrlKey) &&
          event.preventDefault());
    }
  }

  public captureKey(keyCode: number, ctrlKey: boolean): boolean {
    // TODO: re-implement properly: use constants for key codes
    return !(
      (112 <= keyCode && 123 >= keyCode) ||
      (ctrlKey &&
        (48 == keyCode ||
          96 == keyCode ||
          187 == keyCode ||
          107 == keyCode ||
          189 == keyCode ||
          109 == keyCode ||
          84 == keyCode))
    );
  }
}
