import {Bounds} from './Bounds';
import {Collider, Collider2, Collider3, ColliderNoop} from './Collider';
import {ROTATE_Audio} from './ROTATE_Audio';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Text} from './ROTATE_Text';
import {
  ROTATE_Game,
  ROTATE_LevelEditorManager,
  ROTATE_ScreenEditor,
  ROTATE_ScreenPrimaryGame,
} from './Rotate';
import {Surface} from './Surface';
import {ROTATE_GameConstants} from './constants';

export class BlockData {
  public x: number; // TODO: possibly mark as readonly
  public y: number; // TODO: possibly mark as readonly
  public id: number; // TODO: possibly mark as readonly
  public meta: number[]; // TODO: possibly mark as readonly

  constructor(x: number, y: number, id: number, meta?: number[] = []) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.meta = meta;
  }

  public get_block(): Block {
    return ROTATE_GameObjectsRegistry.getBlock(this.id);
  }

  public getMeta(index: number): number {
    // TODO: remove redundant null checks once types fully covered
    return null != this.meta && null != this.meta[index] ? this.meta[index] : 0;
  }

  // TODO: define signature
  public metaEquals(meta?: number[]): boolean {
    // TODO: improve implementation
    if (null == this.meta && null == meta) return true;
    if (this.meta.length != meta.length) return false;
    for (var b = 0, c = meta.length; b < c; ) {
      var d = b++;
      if (meta[d] != this.meta[d]) return false;
    }
    return true;
  }
}

export class Block {
  public id: number = 0;
  public bubbleHeight: number = 46;
  public bubbleWidth: number = 124;
  public configurable: boolean = false;

  constructor() {}

  public shouldRender(blockData: BlockData): boolean {
    return true;
  }

  // TODO: define signature
  public render(surface: Surface, blockData: BlockData, c?: boolean): void {}

  public collides(blockData: BlockData): boolean {
    return true;
  }

  public isTrigger(blockData: BlockData): boolean {
    return false;
  }

  // TODO: define signature
  public getColliders(blockData: BlockData) {
    return [
      new Collider(
        new Bounds(
          0,
          0,
          ROTATE_GameConstants.tileSize,
          ROTATE_GameConstants.tileSize,
        ),
      ),
    ];
  }

  public onTrigger(blockData: BlockData): boolean {
    return true;
  }

  public setupBubble(a: ROTATE_CanvasObject) {}

  // TODO: define signature
  public getConfigMeta(): number[] {
    return [];
  }

  public alwaysUpdate(blockData: BlockData): boolean {
    return false;
  }

  public onPlay(blockData: BlockData): void {}

  public rotatePreview(): boolean {
    return true;
  }

  // TODO: define signature
  public showArrow(a: BlockData): boolean {
    return false;
  }

  public onInteract(blockData: BlockData): void {}
}

// TODO: simplify the logic of ROTATE_GameObjectsRegistry and ROTATE_GameObjects.
// Once the codebase will be more stable and typed, the ID's for each object could be leveraged via TypeScript union
export class ROTATE_GameObjectsRegistry {
  private static _registry: Map<number, Block> = new Map();

  public static register(index: number, block: Block): Block | null {
    if (ROTATE_GameObjectsRegistry._registry.has(index)) return null;
    ROTATE_GameObjectsRegistry._registry.set(index, block);
    block.id = index;
    return block;
  }

  public static getBlock(index: number): Block {
    return ROTATE_GameObjectsRegistry._registry.get(index);
  }
}

export class GameObject_Air extends Block {
  constructor() {
    super();
  }

  public collides(blockData: BlockData): boolean {
    return false;
  }

  public shouldRender(blockData: BlockData): boolean {
    return false;
  }
}

type ROTATE_Angle = 0 | 1 | 2 | 3;

export class GameObject_Door extends Block {
  public angle: ROTATE_Angle; // TODO: possibly mark as readonly
  public length: number; // TODO: possibly mark as readonly
  public channel: number; // TODO: possibly mark as readonly

  constructor() {
    super();

    this.bubbleWidth = 148;
    this.bubbleHeight = 106;
    this.configurable = true;

    this.angle = 0;
    this.length = 3;
    this.channel = 0;
  }

  public set_angle(angle: ROTATE_Angle): void {
    this.angle = 0 > angle ? 3 : 3 < angle ? 0 : angle;
  }

  // TODO: define signature
  public collides(blockData: BlockData) {
    var b = this.isOpen(blockData);
    !b && this.isStuck(blockData) && ROTATE_ScreenPrimaryGame.i.killPlayer();
    return !b;
  }

  public alwaysUpdate(blockData: BlockData): boolean {
    return true;
  }

  // TODO: define signature
  public render(surface: Surface, blockData: BlockData, c) {
    null == c && (c = !0);
    var d = blockData.getMeta(1);
    if (!(0 >= d)) {
      var e = blockData.getMeta(2),
        f = ROTATE_GameConstants.tileSize;
      surface.translate(f / 2, f / 2);
      surface.rotate((e * Math.PI) / 2);
      surface.translate(-f / 2, -f / 2);
      if (c) {
        var m = this.isOpen(blockData),
          k = 0.5 * d - 0.16666666666666666;
        c = m ? 0 : k;
        if (
          ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenPrimaryGame
        ) {
          var p = ROTATE_ScreenPrimaryGame.i.channels,
            y = blockData.getMeta(0);
          p = p.h[y];
          null != p &&
            ((c = Math.min(
              1,
              (ROTATE_Game.instance.get_gameTime() - p.lastChanged) /
                ROTATE_GameConstants.doorSlideTime,
            )),
            (c = ROTATE_Game.smootherStep(c)),
            (c = m ? (1 - c) * k : c * k));
        }
        m = c;
        for (k = 0; 0 < m; )
          (p = 1 < m ? 1 : m),
            surface.drawImage(
              ROTATE_Images.blocks,
              new Bounds(3 * f, 3 * f, p * f, f),
              k,
              0,
            ),
            surface.drawImage(
              ROTATE_Images.blocks,
              new Bounds((4 - p) * f, 3 * f, p * f, f),
              d * f - k - p * f,
              0,
            ),
            (m -= p),
            (k += p * f);
        surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(4 * f, 3 * f, f, f),
          c * f,
          0,
        );
        surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(5 * f, 3 * f, f, f),
          (d - c - 1) * f,
          0,
        );
        if (
          ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor &&
          (ROTATE_ScreenEditor.renderBlockText(
            surface,
            blockData.getMeta(0) + '',
          ),
          1 < d)
        )
          for (blockData = 1; blockData < d; )
            (c = blockData++),
              ROTATE_ScreenEditor.renderBlockRed(surface, c * f, 0);
      } else
        surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(3 * f, 3 * f, 0.33333333333333337 * f, f),
          0,
          0,
        ),
          surface.drawImage(
            ROTATE_Images.blocks,
            new Bounds(4 * f, 3 * f, f, f),
            0.33333333333333337 * f,
            0,
          ),
          surface.drawImage(
            ROTATE_Images.blocks,
            new Bounds(5 * f, 3 * f, f, f),
            -0.33333333333333337 * f,
            0,
          ),
          surface.drawImage(
            ROTATE_Images.blocks,
            new Bounds(
              3.6666666666666665 * f,
              3 * f,
              0.33333333333333337 * f,
              f,
            ),
            0.6666666666666666 * f,
            0,
          );
      surface.translate(f / 2, f / 2);
      surface.rotate((-e * Math.PI) / 2);
      surface.translate(-f / 2, -f / 2);
    }
  }

  public isOpen(blockData: BlockData): boolean {
    // TODO: implement properly
    return ROTATE_Game.instance.currentScreen instanceof
      ROTATE_ScreenPrimaryGame &&
      ROTATE_ScreenPrimaryGame.i.getChannelStatus(blockData.getMeta(0))
      ? true
      : false;
  }

  public isStuck(blockData: BlockData): boolean {
    // TODO: implement properly
    for (
      var b = 0, c = ROTATE_ScreenPrimaryGame.i.player.touching;
      b < c.length;

    ) {
      var d = c[b];
      ++b;
      if (d.get_block() == this && d.getMeta(0) == blockData.getMeta(0))
        return true;
    }
    return false;
  }

  public setupBubble(a: ROTATE_CanvasObject): void {
    var _this = this;
    var c = new ROTATE_Text(ROTATE_Game.fontMain, 'Channel');
    c.set_x(8);
    c.set_y(8);
    a.addChild(c);
    var d = new ROTATE_Text(ROTATE_Game.fontMain, this.channel + '');
    d.align = ROTATE_Text.ALIGN_CENTER;
    d.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    d.set_x(this.bubbleWidth - 31);
    d.set_y(c.y);
    a.addChild(d);
    var e = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    e.mouseEnabled = e.buttonMode = !0;
    e.addEventListener('mouseDown', function (p) {
      1 < p.which ||
        ((_this.channel = 99 <= _this.channel ? 0 : _this.channel + 1),
        d.set_text(_this.channel + ''));
    });
    e.set_x(d.x + 11);
    e.set_y(d.y + 4);
    a.addChild(e);
    var f = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    f.mouseEnabled = f.buttonMode = !0;
    f.addEventListener('mouseDown', function (p) {
      1 < p.which ||
        ((_this.channel = 0 >= _this.channel ? 99 : _this.channel - 1),
        d.set_text(_this.channel + ''));
    });
    f.set_scaleX(-1);
    f.set_x(d.x - 11);
    f.set_y(e.y);
    a.addChild(f);
    e = new ROTATE_Text(ROTATE_Game.fontMain, 'Length');
    e.set_x(16);
    e.set_y(c.y + 30);
    a.addChild(e);
    var m = new ROTATE_Text(ROTATE_Game.fontMain, this.length + '');
    m.align = ROTATE_Text.ALIGN_CENTER;
    m.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    m.set_x(this.bubbleWidth - 31);
    m.set_y(e.y);
    a.addChild(m);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', function (p) {
      1 < p.which ||
        ((_this.length = 9 <= _this.length ? 1 : _this.length + 1),
        m.set_text(_this.length + ''));
    });
    c.set_x(m.x + 11);
    c.set_y(m.y + 4);
    a.addChild(c);
    f = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    f.mouseEnabled = f.buttonMode = !0;
    f.addEventListener('mouseDown', function (p) {
      1 < p.which ||
        ((_this.length = 1 >= _this.length ? 9 : _this.length - 1),
        m.set_text(_this.length + ''));
    });
    f.set_scaleX(-1);
    f.set_x(m.x - 11);
    f.set_y(c.y);
    a.addChild(f);
    c = new ROTATE_Text(ROTATE_Game.fontMain, 'Angle');
    c.set_x(32);
    c.set_y(e.y + 30);
    a.addChild(c);
    var k = new ROTATE_Text(ROTATE_Game.fontMain, this.angle + '');
    k.align = ROTATE_Text.ALIGN_CENTER;
    k.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    k.set_x(this.bubbleWidth - 31);
    k.set_y(c.y);
    a.addChild(k);
    e = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    e.mouseEnabled = e.buttonMode = !0;
    e.addEventListener('mouseDown', function (p) {
      1 < p.which ||
        (_this.set_angle(_this.angle + 1), k.set_text(_this.angle + ''));
    });
    e.set_x(k.x + 11);
    e.set_y(k.y + 4);
    a.addChild(e);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', function (p) {
      1 < p.which ||
        (_this.set_angle(_this.angle - 1), k.set_text(_this.angle + ''));
    });
    c.set_scaleX(-1);
    c.set_x(k.x - 11);
    c.set_y(e.y);
    a.addChild(c);
  }

  public getConfigMeta(): number[] {
    return [this.channel, this.length, this.angle];
  }
}

export class ROTATE_GameObject_Angle extends Block {
  public angle: number = 0;
  public configurable: boolean = true;

  public set_angle(angle: number) {
    return (this.angle = 0 > angle ? 3 : 3 < angle ? 0 : angle);
  }
  public setupBubble(a: ROTATE_CanvasObject) {
    var c = new ROTATE_Text(ROTATE_Game.fontMain, 'Angle');
    c.set_x(8);
    c.set_y(8);
    a.addChild(c);
    var d = new ROTATE_Text(ROTATE_Game.fontMain, this.angle + '');
    d.align = ROTATE_Text.ALIGN_CENTER;
    d.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    d.set_x(this.bubbleWidth - 31);
    d.set_y(c.y);
    a.addChild(d);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', (e) => {
      1 < e.which ||
        (this.set_angle(this.angle + 1), d.set_text(this.angle + ''));
    });
    c.set_x(d.x + 11);
    c.set_y(12);
    a.addChild(c);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', (e) => {
      1 < e.which ||
        (this.set_angle(this.angle - 1), d.set_text(this.angle + ''));
    });
    c.set_scaleX(-1);
    c.set_x(d.x - 11);
    c.set_y(12);
    a.addChild(c);
  }
  public getConfigMeta() {
    return [this.angle];
  }
  public renderRotated(
    surface: Surface,
    blockData: BlockData,
    x: number,
    y: number,
  ) {
    var e = ROTATE_GameConstants.tileSize,
      f = e / 2;
    surface.translate(f, f);
    surface.rotate((blockData.getMeta(0) * Math.PI) / 2);
    surface.drawImage(ROTATE_Images.blocks, new Bounds(x, y, e, e), -f, -f);
    surface.rotate((-blockData.getMeta(0) * Math.PI) / 2);
    surface.translate(-f, -f);
  }
}

export class ROTATE_GameObject_Fan extends ROTATE_GameObject_Angle {
  public alwaysUpdate(blockData: BlockData) {
    return !0;
  }
  public collides(blockData: BlockData) {
    return !1;
  }
  public render(surface: Surface, blockData: BlockData, c: boolean = true) {
    blockData = blockData.getMeta(0) % 4;
    c =
      !c || ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor
        ? 0
        : Math.floor(ROTATE_Game.instance.get_gameTimeMS() / 50) % 3;
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(
        ((0 < blockData && 3 > blockData ? 1 : 0) + 2 * c) *
          ROTATE_GameConstants.tileSize,
        (5 + (1 < blockData ? 1 : 0)) * ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
      ),
      0,
      0,
    );
  }
}

export class GameObject_Finish extends Block {
  public render(surface: Surface, blockData: BlockData, c: any): void {
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(
        0,
        3 * ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
      ),
      0,
      0,
    );
  }

  public shouldRender(blockData: BlockData): boolean {
    return false;
  }
}

export class GameObject_Lever extends Block {
  private static readonly _TOGGLE_TIMER = 0.67;

  public on = false; // TODO: mark as private or readonly
  public channel = 0; // TODO: mark as private or readonly

  constructor() {
    super();
    this.bubbleWidth = 148;
    this.bubbleHeight = 76;
    this.configurable = true;
  }

  public isTrigger(blockData: BlockData): boolean {
    return true;
  }

  // TODO: define signature
  public showArrow(a: BlockData): boolean {
    return true;
  }

  public onInteract(blockData: BlockData): void {
    // TODO: re-implement properly
    var b = blockData.y * ROTATE_LevelEditorManager.get_width() + blockData.x,
      c = ROTATE_LevelEditorManager.leversChanged.h[b];
    if (
      !(
        null != c &&
        ROTATE_Game.instance.get_gameTime() - c < GameObject_Lever._TOGGLE_TIMER
      )
    ) {
      c = ROTATE_ScreenPrimaryGame.i.channels;
      var d = blockData.getMeta(0),
        e = c.h[d];
      d = null != e && e.get_status();
      (c = 1 > blockData.getMeta(1))
        ? ROTATE_ScreenPrimaryGame.i.signalOn(
            blockData.x,
            blockData.y,
            blockData.getMeta(0),
          )
        : ROTATE_ScreenPrimaryGame.i.signalOff(
            blockData.x,
            blockData.y,
            blockData.getMeta(0),
          );
      var f = ROTATE_LevelEditorManager.leversChanged,
        m = ROTATE_Game.instance.get_gameTime();
      f.h[b] = m;
      null == e &&
        ((b = ROTATE_ScreenPrimaryGame.i.channels),
        (e = blockData.getMeta(0)),
        (e = b.h[e]));
      e = null != e && e.get_status();
      b = !1;
      if (d != e)
        for (d = 0, e = ROTATE_ScreenPrimaryGame.i.doors; d < e.length; )
          if (((f = e[d]), ++d, f.channel == blockData.getMeta(0))) {
            b = !0;
            break;
          }
      c ? ROTATE_Audio.leverOn.play() : ROTATE_Audio.leverOff.play();
      !b || ROTATE_Audio.door.play();
      ROTATE_LevelEditorManager.setBlockMeta(blockData.x, blockData.y, [
        blockData.getMeta(0),
        c ? 1 : 0,
      ]);
    }
  }

  public onPlay(blockData: BlockData): void {
    // TODO: re-implement properly
    0 < blockData.getMeta(1) &&
      ROTATE_ScreenPrimaryGame.i.signalOn(
        blockData.x,
        blockData.y,
        blockData.getMeta(0),
      );
  }

  // TODO: define signature
  public getColliders(blockData: BlockData) {
    return [
      new Collider(
        new Bounds(
          0.15 * ROTATE_GameConstants.tileSize,
          0.15 * ROTATE_GameConstants.tileSize,
          0.7 * ROTATE_GameConstants.tileSize,
          0.7 * ROTATE_GameConstants.tileSize,
        ),
      ),
    ];
  }

  public alwaysUpdate(blockData: BlockData): boolean {
    return ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor;
  }

  // TODO: define signature
  public render(surface: Surface, blockData: BlockData, c: any): void {
    // TODO: re-implement properly
    null == c && (c = !0);
    var d = 0 < blockData.getMeta(1);
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(
        (d ? 4 : 3) * ROTATE_GameConstants.tileSize,
        2 * ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
      ),
      0,
      0,
    );
    c &&
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor &&
      ROTATE_ScreenEditor.renderBlockText(surface, blockData.getMeta(0) + '');
  }

  public setupBubble(a: ROTATE_CanvasObject): void {
    // TODO: re-implement properly
    var b = this,
      c = new ROTATE_Text(ROTATE_Game.fontMain, 'Channel');
    c.set_x(8);
    c.set_y(8);
    a.addChild(c);
    var d = new ROTATE_Text(ROTATE_Game.fontMain, this.channel + '');
    d.align = ROTATE_Text.ALIGN_CENTER;
    d.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    d.set_x(this.bubbleWidth - 31);
    d.set_y(c.y);
    a.addChild(d);
    var e = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    e.mouseEnabled = e.buttonMode = !0;
    e.addEventListener('mouseDown', function (k) {
      1 < k.which ||
        ((b.channel = 98 < b.channel ? 0 : b.channel + 1),
        d.set_text(b.channel + ''));
    });
    e.set_x(d.x + 11);
    e.set_y(d.y + 4);
    a.addChild(e);
    var f = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    f.mouseEnabled = f.buttonMode = !0;
    f.addEventListener('mouseDown', function (k) {
      1 < k.which ||
        ((b.channel = 1 > b.channel ? 99 : b.channel - 1),
        d.set_text(b.channel + ''));
    });
    f.set_scaleX(-1);
    f.set_x(d.x - 11);
    f.set_y(e.y);
    a.addChild(f);
    e = new ROTATE_Text(ROTATE_Game.fontMain, 'State');
    e.set_x(32);
    e.set_y(c.y + 30);
    a.addChild(e);
    var m = new ROTATE_Text(ROTATE_Game.fontMain, this.on ? '1' : '0');
    m.align = ROTATE_Text.ALIGN_CENTER;
    m.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    m.set_x(this.bubbleWidth - 31);
    m.set_y(e.y);
    a.addChild(m);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', function (k) {
      1 < k.which || ((b.on = !b.on), m.set_text(b.on ? '1' : '0'));
    });
    c.set_x(m.x + 11);
    c.set_y(m.y + 4);
    a.addChild(c);
    e = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    e.mouseEnabled = e.buttonMode = !0;
    e.addEventListener('mouseDown', function (k) {
      1 < k.which || ((b.on = !b.on), m.set_text(b.on ? '1' : '0'));
    });
    e.set_scaleX(-1);
    e.set_x(m.x - 11);
    e.set_y(c.y);
    a.addChild(e);
  }

  public getConfigMeta(): number[] {
    return [this.channel, this.on ? 1 : 0];
  }
}

export class ROTATE_GameObject_Solid extends Block {
  public render(surface: Surface, blockData: BlockData, c = true) {
    var d = c && this.testCanSolidConnect(blockData.x - 1, blockData.y - 1, 0),
      e = c && this.testCanSolidConnect(blockData.x, blockData.y - 1, 1),
      f = c && this.testCanSolidConnect(blockData.x + 1, blockData.y - 1, 2),
      m = c && this.testCanSolidConnect(blockData.x + 1, blockData.y, 3),
      k = c && this.testCanSolidConnect(blockData.x + 1, blockData.y + 1, 4),
      p = c && this.testCanSolidConnect(blockData.x, blockData.y + 1, 5),
      y = c && this.testCanSolidConnect(blockData.x - 1, blockData.y + 1, 6);
    blockData = c && this.testCanSolidConnect(blockData.x - 1, blockData.y, 7);
    f = e || m ? (m ? (e ? (f ? 0 : 1) : 2) : 3) : 4;
    y = p || blockData ? (blockData ? (p ? (y ? 0 : 1) : 2) : 3) : 4;
    m = p || m ? (m ? (p ? (k ? 0 : 1) : 2) : 3) : 4;
    k = ROTATE_GameConstants.tileSize;
    p = ROTATE_GameConstants.tileSize / 2;
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(
        (e || blockData ? (blockData ? (e ? (d ? 0 : 1) : 2) : 3) : 4) * k,
        0,
        p,
        p,
      ),
      0,
      0,
    );
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(f * k + p, 0, p, p),
      p,
      0,
    );
    surface.drawImage(ROTATE_Images.blocks, new Bounds(y * k, p, p, p), 0, p);
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(m * k + p, p, p, p),
      p,
      p,
    );
  }
  public testCanSolidConnect(a: number, b: number, _c) {
    if (!ROTATE_LevelEditorManager.isInBounds(a, b)) return !0;
    a = ROTATE_LevelEditorManager.getBlockData(a, b);
    b = a.get_block();
    if (b instanceof ROTATE_GameObject_Solid) return !0;
    a.getMeta(0);
    return !1;
  }
}

export class ROTATE_GameObject_Number extends ROTATE_GameObject_Solid {
  public value = 1;
  public configurable = true;

  public set_value(value: number) {
    return (this.value = 0 > value ? 99 : 99 < value ? 0 : value);
  }

  public render(surface: Surface, blockData: BlockData, c = true) {
    c
      ? super.render(surface, blockData, c)
      : surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(
            0,
            0,
            ROTATE_GameConstants.tileSize,
            ROTATE_GameConstants.tileSize,
          ),
          0,
          0,
          !1,
        );
    blockData = blockData.getMeta(0);
    0 > blockData
      ? (surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(
            100,
            4 * ROTATE_GameConstants.tileSize,
            10,
            ROTATE_GameConstants.tileSize,
          ),
          14,
          0,
          !1,
        ),
        -1 == blockData &&
          surface.drawImage(
            ROTATE_Images.blocks,
            new Bounds(
              110,
              4 * ROTATE_GameConstants.tileSize,
              10,
              ROTATE_GameConstants.tileSize,
            ),
            0,
            0,
            !1,
          ),
        -2 == blockData &&
          surface.drawImage(
            ROTATE_Images.blocks,
            new Bounds(
              120,
              4 * ROTATE_GameConstants.tileSize,
              10,
              ROTATE_GameConstants.tileSize,
            ),
            0,
            0,
            !1,
          ))
      : (surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(
            (blockData % 10) * 10,
            4 * ROTATE_GameConstants.tileSize,
            10,
            ROTATE_GameConstants.tileSize,
          ),
          14,
          0,
          !1,
        ),
        surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(
            10 * Math.min(Math.floor(0.1 * blockData), 9),
            4 * ROTATE_GameConstants.tileSize,
            10,
            ROTATE_GameConstants.tileSize,
          ),
          0,
          0,
          !1,
        ));
  }

  public setupBubble(a: ROTATE_CanvasObject) {
    var b = this,
      c = new ROTATE_Text(ROTATE_Game.fontMain, 'Value');
    c.set_x(8);
    c.set_y(8);
    a.addChild(c);
    var d = new ROTATE_Text(ROTATE_Game.fontMain, this.value + '');
    d.align = ROTATE_Text.ALIGN_CENTER;
    d.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    d.set_x(this.bubbleWidth - 31);
    d.set_y(c.y);
    a.addChild(d);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', function (e) {
      1 < e.which || (b.set_value(b.value + 1), d.set_text(b.value + ''));
    });
    c.set_x(d.x + 11);
    c.set_y(12);
    a.addChild(c);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.addEventListener('mouseDown', function (e) {
      1 < e.which || (b.set_value(b.value - 1), d.set_text(b.value + ''));
    });
    c.set_scaleX(-1);
    c.set_x(d.x - 11);
    c.set_y(12);
    a.addChild(c);
  }

  public getConfigMeta() {
    return [this.value];
  }
}

export class ROTATE_GameObject_Platform extends ROTATE_GameObject_Angle {
  public render(surface: Surface, blockData: BlockData, c?: boolean) {
    this.renderRotated(
      surface,
      blockData,
      7 * ROTATE_GameConstants.tileSize,
      0,
    );
  }
  public getColliders(blockData: BlockData) {
    return [new Collider2(blockData.getMeta(0))];
  }
}

export class ROTATE_GameObject_Ramp extends ROTATE_GameObject_Angle {
  public render(surface: Surface, blockData: BlockData, c) {
    this.renderRotated(
      surface,
      blockData,
      6 * ROTATE_GameConstants.tileSize,
      0,
    );
  }
  public getColliders(a: BlockData) {
    return [new Collider3(a.getMeta(0))];
  }
}

export class ROTATE_GameObject_Saw extends ROTATE_GameObject_Angle {
  public isTrigger(blockData: BlockData) {
    return !0;
  }
  public render(surface: Surface, blockData: BlockData, c = true) {
    var d = ROTATE_Game.instance.get_gameTimeMS() / 40;
    c =
      !c || ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor
        ? 0
        : Math.floor(
            d -
              (d < ROTATE_GameConstants.EPSILON
                ? 0
                : ROTATE_GameConstants.EPSILON),
          ) % 3;
    this.renderRotated(
      surface,
      blockData,
      (4 + c) * ROTATE_GameConstants.tileSize,
      ROTATE_GameConstants.tileSize,
    );
  }
  public getColliders(blockData: BlockData) {
    return [new ColliderNoop(blockData.getMeta(0))];
  }
  public onTrigger(blockData: BlockData) {
    ROTATE_ScreenPrimaryGame.i.killPlayer(!0);
    return !1;
  }
  public alwaysUpdate(blockData: BlockData) {
    return !(ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor);
  }
}

export class ROTATE_GameObject_Spikes extends ROTATE_GameObject_Angle {
  public isTrigger(blockData: BlockData) {
    return !0;
  }
  public render(surface: Surface, blockData: BlockData, c = true) {
    this.renderRotated(
      surface,
      blockData,
      (c ? Math.floor((blockData.x + blockData.y) % 4) : 0) *
        ROTATE_GameConstants.tileSize,
      ROTATE_GameConstants.tileSize,
    );
  }
  public getColliders(blockData: BlockData) {
    var b = ROTATE_GameConstants.tileSize;
    var c = b / 2,
      d = 0.5 * b,
      e = (b - d) / 2;
    3 == blockData.getMeta(0)
      ? ((blockData = new Bounds(0, e, c, d)), (b = new Bounds(c, 0, c, b)))
      : 2 == blockData.getMeta(0)
        ? ((blockData = new Bounds(e, b - c, d, c)),
          (b = new Bounds(0, 0, b, c)))
        : 1 == blockData.getMeta(0)
          ? ((blockData = new Bounds(b - c, e, c, d)),
            (b = new Bounds(0, 0, c, b)))
          : ((blockData = new Bounds(e, 0, d, c)),
            (b = new Bounds(0, c, b, c)));
    return [new Collider(blockData), new Collider(b)];
  }
  public onTrigger(blockData: BlockData) {
    ROTATE_ScreenPrimaryGame.i.killPlayer();
    return !1;
  }
}

export class ROTATE_GameObject_Stairs extends ROTATE_GameObject_Ramp {
  public render(a: Surface, b: BlockData, c) {
    c = ROTATE_GameConstants.tileSize;
    var d = c / 2;
    a.translate(d, d);
    1 < b.getMeta(0) && a.rotate(Math.PI);
    (1 != b.getMeta(0) && 3 != b.getMeta(0)) || a.scale(-1, 1);
    a.drawImage(
      ROTATE_Images.blocks,
      new Bounds(5 * ROTATE_GameConstants.tileSize, 0, c, c),
      -d,
      -d,
    );
    (1 != b.getMeta(0) && 3 != b.getMeta(0)) || a.scale(-1, 1);
    1 < b.getMeta(0) && a.rotate(-Math.PI);
    a.translate(-d, -d);
  }
}

export class GameObject_Start extends Block {
  // TODO: define signature
  public render(surface: Surface, blockData: BlockData, c: any): void {
    surface.drawImage(
      // TODO: define type
      ROTATE_Images.blocks,
      new Bounds(
        0,
        2 * ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
      ),
      0,
      0,
    );
  }

  public shouldRender(blockData: BlockData): boolean {
    return false;
  }
}

export class ROTATE_GameObject_Vent extends ROTATE_GameObject_Solid {
  public render(surface: Surface, blockData: BlockData, c = true) {
    c
      ? super.render(surface, blockData, c)
      : surface.drawImage(
          ROTATE_Images.blocks,
          new Bounds(
            0,
            0,
            ROTATE_GameConstants.tileSize,
            ROTATE_GameConstants.tileSize,
          ),
          0,
          0,
          !1,
        );
    surface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(
        5 * ROTATE_GameConstants.tileSize,
        2 * ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
      ),
      0,
      0,
      !1,
    );
  }
}

export const OBJECT_ID = {
  start: -1,
  finish: -2,
  air: 0,
  solid: 1,
  stairs: 2,
  ramp: 3,
  platform: 4,
  spikes: 5,
  saw: 6,
  number: 7,
  lever: 8,
  door: 9,
  vent: 10,
  fan: 11,
} as const;

export class ROTATE_GameObjects {
  public static readonly start = ROTATE_GameObjectsRegistry.register(
    -1,
    new GameObject_Start(),
  );
  public static readonly finish = ROTATE_GameObjectsRegistry.register(
    -2,
    new GameObject_Finish(),
  );
  public static readonly air = ROTATE_GameObjectsRegistry.register(
    0,
    new GameObject_Air(),
  );
  public static readonly solid = ROTATE_GameObjectsRegistry.register(
    1,
    new ROTATE_GameObject_Solid(),
  );
  public static readonly stairs = ROTATE_GameObjectsRegistry.register(
    2,
    new ROTATE_GameObject_Stairs(),
  );
  public static readonly ramp = ROTATE_GameObjectsRegistry.register(
    3,
    new ROTATE_GameObject_Ramp(),
  );
  public static readonly platform = ROTATE_GameObjectsRegistry.register(
    4,
    new ROTATE_GameObject_Platform(),
  );
  public static readonly spikes = ROTATE_GameObjectsRegistry.register(
    5,
    new ROTATE_GameObject_Spikes(),
  );
  public static readonly saw = ROTATE_GameObjectsRegistry.register(
    6,
    new ROTATE_GameObject_Saw(),
  );
  public static readonly lever = ROTATE_GameObjectsRegistry.register(
    8,
    new GameObject_Lever(),
  );
  public static readonly door = ROTATE_GameObjectsRegistry.register(
    9,
    new GameObject_Door(),
  );
  public static readonly number = ROTATE_GameObjectsRegistry.register(
    7,
    new ROTATE_GameObject_Number(),
  );
  public static readonly vent = ROTATE_GameObjectsRegistry.register(
    10,
    new ROTATE_GameObject_Vent(),
  );
  public static readonly fan = ROTATE_GameObjectsRegistry.register(
    11,
    new ROTATE_GameObject_Fan(),
  );
}
