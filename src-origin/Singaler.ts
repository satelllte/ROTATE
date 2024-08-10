import {ROTATE_Game} from './Rotate';

export class Signaler {
  public lastChanged: number;
  public signals: string[];
  public id: number;

  constructor(id: number) {
    this.lastChanged = -1;
    this.signals = [];
    this.id = id;
  }

  public get_status() {
    return 0 < this.signals.length;
  }

  public signalOn(a: number, b: number) {
    const key = this._key(a, b);
    0 > this.signals.indexOf(key) &&
      (this.get_status() ||
        (this.lastChanged = ROTATE_Game.instance.get_gameTime()),
      this.signals.push(key));
  }

  public signalOff(a: number, b: number) {
    const index = this.signals.indexOf(this._key(a, b));
    -1 < index &&
      (this.signals.splice(index, 1),
      this.get_status() ||
        (this.lastChanged = ROTATE_Game.instance.get_gameTime()));
  }

  private _key(a: number, b: number) {
    return a + 'x' + b;
  }
}
