export class Time {
  public static startTime = 0;
  public static lastTime = 0;
  public static elapsedTime = 0;

  private static _absoluteTime() {
    // TODO: use high precision timer (performance.now)
    return new Date().getTime();
  }

  public static reset(): void {
    Time.startTime = Time._absoluteTime();
    Time.lastTime = 0;
  }

  public static update(): void {
    var currentMs = Time.getCurrentMS();
    Time.elapsedTime = currentMs - Time.lastTime;
    Time.lastTime = currentMs;
  }

  public static getCurrentMS() {
    return Time._absoluteTime() - Time.startTime;
  }

  public static getCurrent() {
    return 0.001 * Time.getCurrentMS();
  }
}
