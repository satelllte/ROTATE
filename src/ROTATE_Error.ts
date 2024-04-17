export class ROTATE_Error extends Error {
  public val: string; // TODO: re-implement properly
  public message: string; // TODO: re-implement properly

  constructor(message: string) {
    super(message);

    this.val = message; // TODO: re-implement properly
    this.message = String(message); // TODO: re-implement properly
    Error.captureStackTrace && Error.captureStackTrace(this, ROTATE_Error);
  }

  public static wrap(a: Error | string) {
    return a instanceof Error ? a : new ROTATE_Error(a);
  }
}
