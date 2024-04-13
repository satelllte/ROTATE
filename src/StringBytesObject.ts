import {ROTATE_Error} from './ROTATE_Error';

// TODO: test and re-implement properly
export class StringBytesObject {
  public length: number; // TODO: mark private
  public b: Uint8Array; // TODO: mark private

  constructor(buffer: ArrayBuffer) {
    // TODO: re-implement properly
    this.length = buffer.byteLength;
    this.b = new Uint8Array(buffer);
  }

  public getString(startIndex: number, length: number) {
    // TODO: re-implement properly
    if (0 > startIndex || 0 > length || startIndex + length > this.length)
      throw new ROTATE_Error('OutsideBounds');
    for (
      var c = '',
        d = this.b,
        e = String.fromCharCode,
        f = startIndex,
        m = startIndex + length;
      f < m;

    ) {
      var k = d[f++];
      if (128 > k) {
        if (0 == k) break;
        c += e(k);
      } else if (224 > k) c += e(((k & 63) << 6) | (d[f++] & 127));
      else if (240 > k) {
        var p = d[f++];
        c += e(((k & 31) << 12) | ((p & 127) << 6) | (d[f++] & 127));
      } else {
        p = d[f++];
        var y = d[f++];
        k =
          ((k & 15) << 18) |
          ((p & 127) << 12) |
          ((y & 127) << 6) |
          (d[f++] & 127);
        c += e((k >> 10) + 55232);
        c += e((k & 1023) | 56320);
      }
    }
    return c;
  }

  public toString() {
    return this.getString(0, this.length);
  }

  public static ofString(a: string) {
    // TODO: re-implement properly
    for (var b: number[] = [], c = 0; c < a.length; ) {
      var d = a.charCodeAt(c++);
      55296 <= d &&
        56319 >= d &&
        (d = ((d - 55232) << 10) | (a.charCodeAt(c++) & 1023));
      127 >= d
        ? b.push(d)
        : (2047 >= d
            ? b.push(192 | (d >> 6))
            : (65535 >= d
                ? b.push(224 | (d >> 12))
                : (b.push(240 | (d >> 18)), b.push(128 | ((d >> 12) & 63))),
              b.push(128 | ((d >> 6) & 63))),
          b.push(128 | (d & 63)));
    }
    // @ts-expect-error Argument of type 'ArrayBufferLike' is not assignable to parameter of type 'ArrayBuffer'. Property 'resize' is missing in type 'SharedArrayBuffer' but required in type 'ArrayBuffer'
    return new StringBytesObject(new Uint8Array(b).buffer);
  }
}
