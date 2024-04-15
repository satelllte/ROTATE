import {ROTATE_Condition} from './ROTATE_Condition';
import {ROTATE_ScreenPrimaryGame} from './Rotate';

export class ROTATE_Cat {
  public appeared;
  public disappeared;
  public c;
  public r;
  public startDir;
  public endDir;
  public endCond;

  constructor(
    col: number,
    row: number,
    startDir: number,
    endDir: number,
    endCondition: ROTATE_Condition,
  ) {
    this.appeared = false;
    this.disappeared = false;
    this.c = col;
    this.r = row;
    this.startDir = 0 > startDir ? -1 : 1;
    this.endDir = 0 > endDir ? -1 : 1;
    this.endCond = endCondition;
  }

  public update() {
    var a = ROTATE_ScreenPrimaryGame.i;
    this.appeared
      ? !this.disappeared &&
        null != this.endCond &&
        this.endCond.test() &&
        (a.catDisappear(this.endDir), (this.disappeared = !0))
      : (a.catAppear(this.c, this.r, this.startDir),
        (this.appeared = !0),
        null != this.endCond && this.endCond.start());
  }
}
