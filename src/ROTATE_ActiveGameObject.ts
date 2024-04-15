import {BlockData, ROTATE_GameObjects} from './Blocks';
import {Bounds} from './Bounds';
import {Bubble} from './Bubble';
import {InputKeys} from './InputKeys';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_LevelEditorManager} from './Rotate';
import {Surface} from './Surface';
import {ROTATE_GameConstants} from './constants';

export class ROTATE_ActiveGameObject extends ROTATE_CanvasObject {
  public static readonly size2 = ROTATE_GameConstants.tileSize / 2;
  public static readonly size4 = ROTATE_GameConstants.tileSize + 4;
  public static readonly list = [
    ROTATE_GameObjects.air,
    ROTATE_GameObjects.solid,
    ROTATE_GameObjects.start,
    ROTATE_GameObjects.finish,
    ROTATE_GameObjects.stairs,
    ROTATE_GameObjects.ramp,
    ROTATE_GameObjects.platform,
    ROTATE_GameObjects.spikes,
    ROTATE_GameObjects.saw,
    ROTATE_GameObjects.lever,
    ROTATE_GameObjects.door,
    ROTATE_GameObjects.number,
    ROTATE_GameObjects.vent,
    ROTATE_GameObjects.fan,
  ];
  public static selected = 1;

  public bubble;

  constructor() {
    super();
    this.bubble = new Bubble();
    this.mouseEnabled = this.buttonMode = !0;
    this.bubble.visible = !1;
    this.bubble.mouseEnabled = !0;
    this.addChild(this.bubble);
    this.addEventListener('mouseDown', (b) => {
      if (b.target == this && 2 > b.which) {
        var c = ROTATE_ActiveGameObject.selected;
        ROTATE_ActiveGameObject.set_selected(
          Math.floor(
            this.globalToLocal(b.x, b.y).x / ROTATE_ActiveGameObject.size4,
          ),
        );
        this.bubble.set_x(
          Math.round(
            (ROTATE_ActiveGameObject.selected + 0.5) *
              ROTATE_ActiveGameObject.size4,
          ),
        );
        b =
          this.get_selection().configurable &&
          (ROTATE_ActiveGameObject.selected == c ? !this.bubble.visible : !0);
        this.bubble.visible = b;
        this.bubble.visible && this.bubble.setup(this.get_selection());
      }
    });
    this.addEventListener('render', (b) => {
      this.render(b.surface);
    });
  }

  public static set_selected(selected: number) {
    return (ROTATE_ActiveGameObject.selected =
      0 > selected
        ? 0
        : selected >= ROTATE_ActiveGameObject.list.length
          ? ROTATE_ActiveGameObject.list.length - 1
          : selected);
  }

  public get_selection() {
    return ROTATE_ActiveGameObject.list[ROTATE_ActiveGameObject.selected];
  }

  public render(surface: Surface) {
    surface.beginFill(12525600, 0.75);
    surface.drawRect(
      // TODO: use key code from constants
      (InputKeys.keyDown(16) ? 0 : ROTATE_ActiveGameObject.selected) *
        ROTATE_ActiveGameObject.size4,
      0,
      ROTATE_ActiveGameObject.size4,
      ROTATE_ActiveGameObject.size4,
    );
    surface.translate(2, 2);
    surface.beginFill(14671839);
    for (var b = 0, c = ROTATE_ActiveGameObject.list.length; b < c; ) {
      var d = b++,
        e = ROTATE_ActiveGameObject.list[d];
      0 < d && surface.translate(ROTATE_ActiveGameObject.size4, 0);
      e.rotatePreview() &&
        (surface.translate(
          ROTATE_ActiveGameObject.size2,
          ROTATE_ActiveGameObject.size2,
        ),
        surface.rotate((ROTATE_LevelEditorManager.rotation * Math.PI) / 2),
        surface.translate(
          -ROTATE_ActiveGameObject.size2,
          -ROTATE_ActiveGameObject.size2,
        ));
      surface.drawRect(
        0,
        0,
        ROTATE_GameConstants.tileSize,
        ROTATE_GameConstants.tileSize,
      );
      e.render(surface, new BlockData(0, 0, e.id, e.getConfigMeta()), !1);
      e.rotatePreview() &&
        (surface.translate(
          ROTATE_ActiveGameObject.size2,
          ROTATE_ActiveGameObject.size2,
        ),
        surface.rotate((-ROTATE_LevelEditorManager.rotation * Math.PI) / 2),
        surface.translate(
          -ROTATE_ActiveGameObject.size2,
          -ROTATE_ActiveGameObject.size2,
        ));
    }
    surface.translate(
      (ROTATE_ActiveGameObject.list.length - 1) *
        -ROTATE_ActiveGameObject.size4,
      0,
    );
    surface.translate(-2, -2);
  }

  public getBoundsSelf() {
    return new Bounds(
      0,
      0,
      ROTATE_ActiveGameObject.list.length * (ROTATE_GameConstants.tileSize + 4),
      ROTATE_GameConstants.tileSize + 4,
    );
  }
}
