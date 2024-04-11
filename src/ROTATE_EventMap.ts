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
