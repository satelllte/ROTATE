import {getOneTimeIterator} from './utils';

export class ROTATE_EventMap /** extends MapInterface (?) */ {
  public h: Record<string, unknown> = {}; // TODO: define type properly

  public remove(key: string): boolean {
    if (!this.h.hasOwnProperty(key)) return false;
    delete this.h[key];
    return true;
  }

  public arrayKeys(): string[] {
    const keys = [];
    for (const key in this.h) this.h.hasOwnProperty(key) && keys.push(key);
    return keys;
  }
}

export class ROTATE_KeysMap /** extends MapInterface (?) */ {
  public h: Record<string, unknown> = {}; // TODO: define type properly

  public keys() {
    var a = [],
      b;
    for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
    return getOneTimeIterator(a);
  }

  public iterator() {
    return {
      ref: this.h,
      it: this.keys(),
      hasNext: function () {
        return this.it.hasNext();
      },
      next: function () {
        var a = this.it.next();
        return this.ref[a];
      },
    };
  }
}

/*
var MapInterface = function () {};
MapInterface.__name__ = !0;
*/
