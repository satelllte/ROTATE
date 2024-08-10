import {CharEncoder} from './CharEncoder';
import {StringBytesObject} from './StringBytesObject';
import {charCodeAt, subString} from './utils';

// TODO: test and re-implement properly
export class CharUtils {
  private static readonly CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  private static readonly BYTES = StringBytesObject.ofString(CharUtils.CHARS);

  // TODO: see if "b" never passed, if true - then just delete it
  public static encode(a: StringBytesObject, b: boolean = true) {
    var c = new CharEncoder(CharUtils.BYTES).encodeBytes(a).toString();
    if (b)
      switch (a.length % 3) {
        case 1:
          c += '==';
          break;
        case 2:
          c += '=';
      }
    return c;
  }

  // TODO: see if "b" never passed, if true - then just delete it
  public static decode(a: string, b: boolean = true) {
    if (b) for (; 61 == charCodeAt(a, a.length - 1); ) a = subString(a, 0, -1);
    return new CharEncoder(CharUtils.BYTES).decodeBytes(
      StringBytesObject.ofString(a),
    );
  }
}
