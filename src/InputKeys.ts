import {ROTATE_Canvas} from './ROTATE_Canvas';
import {type ROTATE_KeyEvent} from './ROTATE_Event';

export class InputKeys {
  public static inited = false;
  public static keys: number[] = [];
  public static keysOld: number[] = [];

  public static _init(): void {
    if (!ROTATE_Canvas.input)
      throw new Error('ROTATE_Canvas.input is not initialized');
    if (!ROTATE_Canvas.stage)
      throw new Error('ROTATE_Canvas.stage is not initialized');

    InputKeys.inited ||
      (ROTATE_Canvas.input.addEventListener(
        'keyDown',
        // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
        InputKeys.onKeyDown,
      ),
      ROTATE_Canvas.input.addEventListener(
        'keyUp',
        // @ts-expect-error Target signature provides too few arguments. Expected 1 or more, but got 0
        InputKeys.onKeyUp,
      ),
      ROTATE_Canvas.input.addEventListener('blur', InputKeys.reset),
      ROTATE_Canvas.stage.addEventListener('exitFrame', InputKeys.update),
      (InputKeys.inited = true));
  }
  public static onKeyDown(a: ROTATE_KeyEvent): void {
    InputKeys.keyDown(a.keyCode) || InputKeys.keys.push(a.keyCode);
  }

  public static onKeyUp(a: ROTATE_KeyEvent): void {
    const key = InputKeys.keys.indexOf(a.keyCode);
    -1 < key && InputKeys.keys.splice(key, 1);
  }

  public static reset(): void {
    InputKeys.keys = [];
  }

  public static update(): void {
    InputKeys.keysOld = InputKeys.keys.slice(0);
    if (
      null != window.document.activeElement &&
      null != window.document.activeElement.tagName
    ) {
      var a = window.document.activeElement.tagName.toLowerCase();
      ('input' != a && 'textarea' != a) || InputKeys.reset();
    }
  }

  public static keyDown(a: number): boolean {
    return -1 < InputKeys.keys.indexOf(a);
  }

  public static keyDownOld(a: number): boolean {
    return -1 < InputKeys.keysOld.indexOf(a);
  }
  public static keyPressed(a: number): boolean {
    return InputKeys.keyDown(a) ? !InputKeys.keyDownOld(a) : !1;
  }
  public static keyReleased(a: number): boolean {
    return InputKeys.keyDown(a) ? !1 : InputKeys.keyDownOld(a);
  }
}
