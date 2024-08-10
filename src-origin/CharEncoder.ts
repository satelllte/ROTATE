import {ROTATE_Error} from './ROTATE_Error';
import {StringBytesObject} from './StringBytesObject';

// TODO: test and re-implement properly
export class CharEncoder {
  private base: StringBytesObject; // TODO: rename to "_base"
  private nbits: number; // TODO: rename to "_nbits" (or "_bitsCount")
  private tbl: number[] | null = null; // TODO: rename to "_table"

  constructor(stringBytes: StringBytesObject) {
    for (var b = stringBytes.length, c = 1; b > 1 << c; ) ++c;
    if (8 < c || b != 1 << c)
      throw new ROTATE_Error('BaseCode : base length must be a power of two.');
    this.base = stringBytes;
    this.nbits = c;
  }

  public encodeBytes(stringBytes: StringBytesObject) {
    for (
      var b = this.nbits,
        c = this.base,
        d = ((8 * stringBytes.length) / b) | 0,
        e = new StringBytesObject(
          new ArrayBuffer(d + (0 == (8 * stringBytes.length) % b ? 0 : 1)),
        ),
        f = 0,
        m = 0,
        k = (1 << b) - 1,
        p = 0,
        y = 0;
      y < d;

    ) {
      for (; m < b; ) (m += 8), (f <<= 8), (f |= stringBytes.b[p++]);
      m -= b;
      e.b[y++] = c.b[(f >> m) & k] & 255;
    }
    0 < m && (e.b[y++] = c.b[(f << (b - m)) & k] & 255);
    return e;
  }

  public decodeBytes(stringBytes: StringBytesObject) {
    var b = this.nbits;
    null == this.tbl && this.initTable();
    if (!this.tbl) throw new Error("table wasn't set after initialization");
    for (
      var c = this.tbl,
        d = (stringBytes.length * b) >> 3,
        e = new StringBytesObject(new ArrayBuffer(d)),
        f = 0,
        m = 0,
        k = 0,
        p = 0;
      p < d;

    ) {
      for (; 8 > m; ) {
        m += b;
        f <<= b;
        var y = c[stringBytes.b[k++]];
        if (-1 == y) throw new ROTATE_Error('BaseCode : invalid encoded char');
        f |= y;
      }
      m -= 8;
      e.b[p++] = (f >> m) & 255;
    }
    return e;
  }

  // TODO: rename to "_initTable"
  private initTable() {
    for (var a = [], b = 0; 256 > b; ) {
      var c = b++;
      a[c] = -1;
    }
    b = 0;
    for (c = this.base.length; b < c; ) {
      var d = b++;
      a[this.base.b[d]] = d;
    }
    this.tbl = a;
  }
}
