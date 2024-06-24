export class LocalStorage {
  public static getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  public static setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  public static removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
