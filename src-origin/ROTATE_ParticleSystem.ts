import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Particle} from './ROTATE_Particle';
import {ROTATE_Game, ROTATE_LevelEditorManager} from './Rotate';
import {Surface} from './Surface';
import {Vector2} from './Vector2';
import {ROTATE_GameConstants} from './constants';

export class ROTATE_ParticleSystem extends ROTATE_CanvasObject {
  public particles: ROTATE_Particle[];
  public color;

  constructor(
    a: number,
    b: number,
    color: number,
    d: number,
    e: number,
    f: number,
    m: number,
    k = false,
    p = 1,
  ) {
    super();

    this.particles = [];
    this.color = color;
    for (color = 0; 75 > color; ) {
      color++;
      var H = Math.random() * Math.PI * 2,
        K = 3 * (0.7 * Math.random() + 0.3) * p,
        W = 20 * Math.random();
      H = new ROTATE_Particle(
        6 * (0.6 * Math.random() + 0.4),
        Math.round(50 * (0.5 * Math.random() + 0.5)),
        a + Math.cos(H) * W,
        b + Math.sin(H) * W,
        d + Math.cos(H) * K,
        e + Math.sin(H) * K,
        f,
        m,
        k ? this.collsionHandler.bind(this) : null,
      );
      this.particles.push(H);
    }

    this.addEventListener('enterFrame', this.update.bind(this));

    this.addEventListener('render', ({surface}) => {
      this.render(surface);
    });
  }

  public update() {
    var a;
    if (!ROTATE_Game.instance.paused)
      for (a = this.particles.length; 0 <= --a; ) {
        var b = this.particles[a];
        0 >= b.life ? this.particles.splice(a, 1) : b.update();
      }
  }

  public collsionHandler(particle: ROTATE_Particle) {
    var b = Math.floor(particle.x / ROTATE_GameConstants.tileSize),
      c = Math.floor(particle.y / ROTATE_GameConstants.tileSize);
    if (ROTATE_LevelEditorManager.isInBounds(b, c)) {
      var d = ROTATE_LevelEditorManager.getBlockData(b, c),
        e = d.get_block();
      if (e.collides(d) && !e.isTrigger(d)) {
        var f = new Vector2(
          particle.x - b * ROTATE_GameConstants.tileSize,
          particle.y - c * ROTATE_GameConstants.tileSize,
        );
        d = e.getColliders(d);
        for (e = 0; e < d.length; ) {
          var m = d[e];
          ++e;
          if (
            m.testPoint(
              f,
              new Vector2(
                particle.lastX - b * ROTATE_GameConstants.tileSize,
                particle.lastY - c * ROTATE_GameConstants.tileSize,
              ),
            )
          ) {
            particle.freeze = !0;
            break;
          }
        }
      }
    } else particle.freeze = !0;
  }

  public render(surface: Surface) {
    surface.beginFill(this.color);
    for (var b = 0, c = this.particles; b < c.length; ) {
      var d = c[b];
      ++b;
      var e = Math.round(d.size),
        f = d.size / 2;
      surface.drawRect(Math.round(d.x - f), Math.round(d.y - f), e, e);
    }
  }
}
