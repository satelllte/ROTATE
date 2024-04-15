import {COLOR, KEY_CODE, PI2, ROTATE_GameConstants} from './constants';
import {
  charCodeAt,
  clamp,
  clamp01,
  getColorString,
  getOneTimeIterator,
  parseInteger,
  pointInTransformedBounds,
  replace,
  subString,
  trim,
} from './utils';
import {Bounds} from './Bounds';
import {Vector2} from './Vector2';
import {Transform} from './Transform';
import {Surface} from './Surface';
import {Graphics} from './Graphics';
import {ROTATE_Animation} from './ROTATE_Animation';
import {ROTATE_Audio} from './ROTATE_Audio';
import {ROTATE_Error} from './ROTATE_Error';
import {
  ROTATE_Event,
  ROTATE_FocusingEvent,
  ROTATE_KeyEvent,
  ROTATE_ManagerEvent,
  ROTATE_MouseEvent,
  ROTATE_RenderEvent,
} from './ROTATE_Event';
import {
  ROTATE_EventMap,
  ROTATE_EventMapIterator,
  ROTATE_KeysMap,
} from './ROTATE_EventMap';
import {ROTATE_EventTarget} from './ROTATE_EventTarget';
import {ROTATE_Font} from './ROTATE_Font';
import {ROTATE_Images} from './ROTATE_Images';
import {ROTATE_Manager} from './ROTATE_Manager';
import {ROTATE_Text} from './ROTATE_Text';
import {Time} from './Time';
import {LocalStorage} from './LocalStorage';
import {StringBytesObject} from './StringBytesObject';
import {CharEncoder} from './CharEncoder';
import {CharUtils} from './CharUtils';
import {ROTATE_CanvasObject} from './ROTATE_CanvasObject';
import {ROTATE_Canvas} from './ROTATE_Canvas';
import {InputKeys} from './InputKeys';
import {ROTATE_ImageObject} from './ROTATE_ImageObject';
import {ROTATE_Sponsor} from './ROTATE_Sponsor';
import {Bubble} from './Bubble';
import {ROTATE_AwardObject} from './ROTATE_AwardObject';
import {ROTATE_Button} from './ROTATE_Button';
import {ROTATE_YesNoOverlay} from './ROTATE_YesNoOverlay';
import {ROTATE_MuteButtons} from './ROTATE_MuteButtons';
import {ROTATE_BackgroundObject} from './ROTATE_BackgroundObject';
import {ROTATE_ScreenBase} from './ROTATE_ScreenBase';
import {
  ROTATE_ConditionChannel,
  ROTATE_ConditionCollision,
  ROTATE_ConditionCollisionWithChannels,
  ROTATE_ConditionDelay,
  ROTATE_ConditionDelayedCollision,
} from './ROTATE_Condition';
import {ROTATE_Particle} from './ROTATE_Particle';
import {ROTATE_CatAnimationObject} from './ROTATE_CatAnimationObject';
import {ROTATE_AnimatedObject} from './ROTATE_AnimatedObject';
import {Collider, Collider2, Collider3, ColliderNoop} from './Collider';
import {
  BlockData,
  ROTATE_GameObjectsRegistry,
  ROTATE_GameObjects,
} from './Blocks';
import {ROTATE_Speech, ROTATE_SpeechPart} from './ROTATE_Speech';
import {ROTATE_ActiveGameObject} from './ROTATE_ActiveGameObject';
import {ROTATE_InvertCheckbox} from './ROTATE_InvertCheckbox';
import {ROTATE_EditorBarLower} from './ROTATE_EditorBarLower';
import {ROTATE_ParticleSystem} from './ROTATE_ParticleSystem';
import {ROTATE_LoadLevelMenu} from './ROTATE_LoadLevelMenu';
import {ROTATE_SaveLevelMenu} from './ROTATE_SaveLevelMenu';
import {ROTATE_Level1} from './levels/ROTATE_Level1';
import {ROTATE_EditorLevel} from './levels/ROTATE_EditorLevel';
import {ROTATE_Cat} from './ROTATE_Cat';
import {Signaler} from './Singaler';
import {Door} from './Door';
import {ROTATE_Level2} from './levels/ROTATE_Level2';

var bindIdNext = 0;
function Bind(a, b) {
  if (null == b) return null;
  null == b.__id__ && (b.__id__ = bindIdNext++);
  var c;
  null == a.hx__closures__
    ? (a.hx__closures__ = {})
    : (c = a.hx__closures__[b.__id__]);
  null == c &&
    ((c = function () {
      return c.method.apply(c.scope, arguments);
    }),
    (c.scope = a),
    (c.method = b),
    (a.hx__closures__[b.__id__] = c));
  return c;
}

var Utils = function () {};
Utils.__name__ = !0;
Utils.string = function (a) {
  return JSObjectUtils.__string_rec(a, '');
};

var JSObjectUtils = function () {};
JSObjectUtils.__name__ = !0;
JSObjectUtils.getClass = function (a) {
  if (a instanceof Array && null == a.__enum__) return Array;
  var b = a.__class__;
  if (null != b) return b;
  a = JSObjectUtils.__nativeClassName(a);
  return null != a ? JSObjectUtils.__resolveNativeClass(a) : null;
};
JSObjectUtils.__string_rec = function (entity, values) {
  if (null == entity) return 'null';
  if (5 <= values.length) return '<...>';
  var entityType = typeof entity;
  'function' == entityType &&
    (entity.__name__ || entity.__ename__) &&
    (entityType = 'object');
  switch (entityType) {
    case 'function':
      return '<function>';
    case 'object':
      if (entity instanceof Array) {
        if (entity.__enum__) {
          if (2 == entity.length) return entity[0];
          entityType = entity[0] + '(';
          values += '\t';
          for (var d = 2, e = entity.length; d < e; ) {
            var f = d++;
            entityType =
              2 != f
                ? entityType +
                  (',' + JSObjectUtils.__string_rec(entity[f], values))
                : entityType + JSObjectUtils.__string_rec(entity[f], values);
          }
          return entityType + ')';
        }
        entityType = entity.length;
        d = '[';
        values += '\t';
        for (e = 0; e < entityType; )
          (f = e++),
            (d +=
              (0 < f ? ',' : '') +
              JSObjectUtils.__string_rec(entity[f], values));
        return d + ']';
      }
      try {
        d = entity.toString;
      } catch (m) {
        return '???';
      }
      if (
        null != d &&
        d != Object.toString &&
        'function' == typeof d &&
        ((entityType = entity.toString()), '[object Object]' != entityType)
      )
        return entityType;
      entityType = null;
      d = '{\n';
      values += '\t';
      e = null != entity.hasOwnProperty;
      for (entityType in entity)
        (e && !entity.hasOwnProperty(entityType)) ||
          'prototype' == entityType ||
          '__class__' == entityType ||
          '__super__' == entityType ||
          '__interfaces__' == entityType ||
          '__properties__' == entityType ||
          (2 != d.length && (d += ', \n'),
          (d +=
            values +
            entityType +
            ' : ' +
            JSObjectUtils.__string_rec(entity[entityType], values)));
      values = values.substring(1);
      return d + ('\n' + values + '}');
    case 'string':
      return entity;
    default:
      return String(entity);
  }
};
JSObjectUtils.__interfLoop = function (a, b) {
  if (null == a) return !1;
  if (a == b) return !0;
  var c = a.__interfaces__;
  if (null != c)
    for (var d = 0, e = c.length; d < e; ) {
      var f = d++;
      f = c[f];
      if (f == b || JSObjectUtils.__interfLoop(f, b)) return !0;
    }
  return JSObjectUtils.__interfLoop(a.__super__, b);
};
JSObjectUtils.__instanceof = function (a, b) {
  if (null == b) return !1;
  switch (b) {
    case Array:
      return a instanceof Array ? null == a.__enum__ : !1;
    case ROTATE_Boolean:
      return 'boolean' == typeof a;
    case ROTATE_Dynamic:
      return !0;
    case ROTATE_Number:
      return 'number' == typeof a;
    case ROTATE_Int:
      return 'number' == typeof a ? (a | 0) === a : !1;
    case String:
      return 'string' == typeof a;
    default:
      if (null != a)
        if ('function' == typeof b) {
          if (
            a instanceof b ||
            JSObjectUtils.__interfLoop(JSObjectUtils.getClass(a), b)
          )
            return !0;
        } else {
          if (
            'object' == typeof b &&
            JSObjectUtils.__isNativeObj(b) &&
            a instanceof b
          )
            return !0;
        }
      else return !1;
      return (b == ROTATE_Class && null != a.__name__) ||
        (b == ROTATE_ObjectNoop && null != a.__ename__)
        ? !0
        : a.__enum__ == b;
  }
};
JSObjectUtils.__cast = function (a, b) {
  if (JSObjectUtils.__instanceof(a, b)) return a;
  throw new ROTATE_Error(
    'Cannot cast ' + Utils.string(a) + ' to ' + Utils.string(b),
  );
};
JSObjectUtils.__nativeClassName = function (a) {
  a = JSObjectUtils.__toStr.call(a).slice(8, -1);
  return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a
    ? null
    : a;
};
JSObjectUtils.__isNativeObj = function (a) {
  return null != JSObjectUtils.__nativeClassName(a);
};
JSObjectUtils.__resolveNativeClass = function (a) {
  return window[a];
};

export class ROTATE_Game extends ROTATE_CanvasObject {
  public static instance = new ROTATE_Game();
  public static fontMain = new ROTATE_Font(
    'fonts/simple-pixels.png',
    'fonts/simple-pixels.json',
    2,
    112,
  );
  public static nosave = false;
  public static ie = false; // TODO: remove all the Internet Explorer related logic, since it's officially dead

  public muteMusic = false;
  public muteSFX = false;
  public ieMenu = false;
  public ieGame1 = false;
  public ieGame2 = false;
  public ieSurface = false;
  public ieUnmuted = false;
  public invert = false;
  public fader = new ROTATE_CanvasObject();
  public fading = false;
  public fadingSlow = false;
  public timerHolder = new ROTATE_CanvasObject();
  public pauseMenu: ROTATE_PauseMenu | null = null;
  public pauseOnInit = false;
  public pausedTime = 0;
  public pauseStart = 0;
  public fadeStart = 0;
  public lastTick = 0;
  public hasPaused = false;
  public paused = false;
  public targetScreen: ROTATE_ScreenBase | null = null;
  public currentScreen: ROTATE_ScreenBase | null = null;
  public screenCallback: (() => void) | null = null;

  public static main() {
    // TODO: re-implement properly
    ROTATE_Game.instance = new ROTATE_Game();
    ROTATE_Game.instance.addEventListener('added', () => {
      ROTATE_Game.instance.init();
    });

    const container = document.getElementById('game');
    if (!container) throw new Error('No #game container');

    ROTATE_Canvas.start(
      container,
      504 /* width */,
      504 /* height */,
      COLOR.background /* background */,
      false /* transparent */,
      ROTATE_Game.instance,
    );
  }

  public static smootherStep(a: number) {
    return a * a * a * (a * (6 * a - 15) + 10);
  }

  public static quantize(a: number) {
    return Math.floor(a / ROTATE_GameConstants.tileSize);
  }

  public static getInputX() {
    return (
      (InputKeys.keyDown(KEY_CODE.ArrowLeft) || InputKeys.keyDown(KEY_CODE.KeyA)
        ? -1
        : 0) +
      (InputKeys.keyDown(KEY_CODE.ArrowRight) ||
      InputKeys.keyDown(KEY_CODE.KeyD)
        ? 1
        : 0)
    );
  }

  public static getInputY() {
    return (
      (InputKeys.keyDown(KEY_CODE.ArrowUp) || InputKeys.keyDown(KEY_CODE.KeyW)
        ? -1
        : 0) +
      (InputKeys.keyDown(KEY_CODE.ArrowDown) || InputKeys.keyDown(KEY_CODE.KeyS)
        ? 1
        : 0)
    );
  }

  public static formatMS(a: number) {
    var b = '';
    a = Math.round(a);
    var c = Math.floor(a / 1e3),
      d = Math.floor(c / 60),
      e = Math.floor(d / 60);
    0 < e && (b += e + ':');
    d %= 60;
    10 > d && (b += '0');
    b = b + d + ':';
    c %= 60;
    10 > c && (b += '0');
    b = b + c + ':';
    a %= 1e3;
    100 > a && (b += '0');
    10 > a && (b += '0');
    return (b += a);
  }

  public get_gameTimeMS() {
    return this.paused
      ? this.pauseStart - this.pausedTime
      : Time.getCurrentMS() - this.pausedTime;
  }

  public get_gameTime() {
    return 0.001 * this.get_gameTimeMS();
  }

  public init(): void {
    // TODO: re-implement properly
    this.removeEventListener('added', this.init.bind(this));
    ROTATE_Canvas.set_imageSmoothingEnabled(false);
    ROTATE_Manager.addEventListener('finished', this.loaded.bind(this));
  }

  public loaded(): void {
    // TODO: re-implement properly
    var _self = this;

    ROTATE_Game.nosave = !LocalStorage.test();
    ROTATE_Game.nosave || this.loadProgress();

    const a = (() => {
      var c = -1,
        d = window.navigator.userAgent,
        e = d.indexOf('MSIE '),
        f = d.indexOf('Trident/');
      0 < e
        ? (c = parseInt(d.substring(e + 5, d.indexOf('.', e)), 10))
        : 0 < f &&
          ((c = d.indexOf('rv:')),
          (c = parseInt(d.substring(c + 3, d.indexOf('.', c)), 10)));
      return -1 < c ? c : 0;
    })();
    ROTATE_Game.ie = 0 < a && 11 >= a;
    if (ROTATE_Game.ie) {
      this.muteSFX = true;
      this.muteMusic = true;
    }

    this.lastTick = Time.getCurrentMS();
    this.addEventListener('enterFrame', this.update.bind(this));

    const gameElement = window.document.getElementById('game');
    if (gameElement) gameElement.style.display = 'block';
    const loaderElement = window.document.getElementById('loader');
    if (loaderElement) loaderElement.style.display = 'none';

    this.pauseMenu = new ROTATE_PauseMenu();
    this.addChild(this.pauseMenu);
    this.fader.mouseEnabled = true;
    this.addChild(this.fader);
    this.addChild(this.timerHolder);
    ROTATE_Awards.setup(this);

    ROTATE_Canvas.input?.addEventListener('blur', () => {
      null != _self.targetScreen &&
        _self.targetScreen.pausable &&
        (_self.pauseOnInit = !0);
      null != _self.currentScreen &&
        _self.currentScreen.pausable &&
        _self.pause();
    });

    this.changeScreen(new ROTATE_ScreenLaunchButton(), false);
  }

  // TODO: define signature
  public pause(a: boolean = true): void {
    // TODO: re-implement properly
    this.paused ||
      (a && null != this.targetScreen && this.targetScreen.pausable
        ? (this.pauseOnInit = !0)
        : ((this.paused = !0),
          (this.pauseStart = Time.getCurrentMS()),
          null != this.pauseMenu &&
            ((this.pauseMenu.visible = !0), this.pauseMenu.onPause()),
          (this.hasPaused = !0),
          this.currentScreen instanceof ROTATE_ScreenPrimaryGame &&
            null != ROTATE_ScreenPrimaryGame.i.pauseText &&
            (ROTATE_ScreenPrimaryGame.i.pauseText.parent.removeChild(
              ROTATE_ScreenPrimaryGame.i.pauseText,
            ),
            (ROTATE_ScreenPrimaryGame.i.pauseText = null))));
  }

  public unpause() {
    // TODO: re-implement properly
    this.paused &&
      null == this.targetScreen &&
      ((this.paused = !1),
      (this.pausedTime += Time.getCurrentMS() - this.pauseStart),
      (this.pauseMenu.visible = !1));
  }

  public getFadeSpeed() {
    return this.fadingSlow
      ? ROTATE_GameConstants.screenFadeTimeSlow
      : ROTATE_GameConstants.screenFadeTime;
  }

  // TODO: define signature
  public changeScreen(
    screen: ROTATE_ScreenBase,
    b: boolean = true,
    screenCallback: (() => void) | null = null,
    fadingSlow: boolean = false,
    white: boolean = false,
  ) {
    // TODO: re-implement properly
    this.screenCallback = screenCallback;
    b
      ? null == this.targetScreen &&
        ((this.fading = !0),
        (this.fadingSlow = fadingSlow),
        (this.fadeStart = Time.getCurrentMS()),
        this.fader.graphics.clear(),
        this.fader.graphics.beginFill(white ? COLOR.white : COLOR.darkGray),
        this.fader.graphics.drawRect(
          0,
          0,
          ROTATE_Canvas.width,
          ROTATE_Canvas.height,
        ),
        (this.fader.mouseEnabled = !0),
        null == this.currentScreen
          ? (this.fader.set_alpha(1),
            (this.fadeStart -= this.getFadeSpeed() / 2),
            this.setScreen(screen))
          : ((this.targetScreen = screen), this.currentScreen.prekill()))
      : ((this.fading = !1),
        this.fader.set_alpha(0),
        (this.fader.mouseEnabled = !1),
        null != this.currentScreen && this.currentScreen.prekill(),
        (this.targetScreen = null),
        this.setScreen(screen),
        this.currentScreen.ready());
  }

  public setScreen(screen: ROTATE_ScreenBase) {
    // TODO: re-implement properly
    null != this.currentScreen &&
      (this.currentScreen.kill(), this.removeChild(this.currentScreen));
    this.currentScreen = screen;
    this.addChildAt(this.currentScreen, 0);
    this.currentScreen.init();
    null != this.screenCallback && this.screenCallback();
    this.screenCallback = null;
    this.currentScreen.pausable
      ? this.pauseOnInit && this.pause(!1)
      : this.unpause();
    this.pauseOnInit = !1;
  }

  // TODO: define signature
  public update() {
    // TODO: re-implement properly
    var a;
    null != this.targetScreen
      ? ((a = Math.min(
          (Time.getCurrentMS() - this.fadeStart) / (this.getFadeSpeed() / 2),
          1,
        )),
        this.fader.set_alpha(ROTATE_Game.smootherStep(a)),
        1 == a &&
          ((a = this.targetScreen),
          (this.targetScreen = null),
          this.setScreen(a)))
      : 0 < this.fader.alpha &&
        ((a = Math.min(
          (Time.getCurrentMS() - this.fadeStart) / (this.getFadeSpeed() / 2) -
            1,
          1,
        )),
        this.fader.set_alpha(1 - ROTATE_Game.smootherStep(a)),
        1 == a &&
          ((this.fading = this.fader.mouseEnabled = !1),
          this.currentScreen.ready()));
    null != this.currentScreen &&
      this.currentScreen.pausable &&
      (InputKeys.keyPressed(80) || InputKeys.keyPressed(27)) &&
      (this.paused ? this.unpause() : this.pause());
    if (!this.paused) {
      null != this.currentScreen && this.currentScreen.update();
      for (
        a = 0;
        this.get_gameTimeMS() - this.lastTick >= ROTATE_GameConstants.tickMS;

      )
        if (
          ((this.lastTick += ROTATE_GameConstants.tickMS),
          null != this.currentScreen && this.currentScreen.tick(),
          ++a,
          a == ROTATE_GameConstants.ticksMax)
        ) {
          this.lastTick = this.get_gameTimeMS();
          break;
        }
      null != this.currentScreen && this.currentScreen.postUpdate();
    }
    ROTATE_Awards.update();
  }

  public migrateProgress() {
    // TODO: re-implement properly
    try {
      if (
        // TODO: put "lsw:rotate" into LocalStorage key constant
        null !=
        JSON.parse(window.atob(LocalStorage.getItem('lws:rotate') || ''))
      )
        return;
    } catch (k) {}

    try {
      // TODO: put "data" into LocalStorage key constant
      var a = JSON.parse(window.atob(LocalStorage.getItem('data') || '')),
        b = a.unlocked;
      if (
        'number' == typeof b &&
        (b | 0) === b &&
        0 <= a.unlocked &&
        a.unlocked < ROTATE_Levels.list.length &&
        a.awards instanceof Array &&
        null == a.awards.__enum__ &&
        a.awards.length == ROTATE_Awards.all.length
      )
        if (null != a.best) {
          var c = a.best;
          var d = 'number' == typeof c && (c | 0) === c ? -1 < a.best : !1;
        } else d = !0;
      else d = !1;
      if (
        d &&
        (null != a.invert
          ? 'boolean' == typeof a.invert && 1 == a.invert
          : 1) &&
        (null != a.muteMusic
          ? 'boolean' == typeof a.muteMusic && 1 == a.muteMusic
          : 1) &&
        (null != a.muteSFX
          ? 'boolean' == typeof a.muteSFX && 1 == a.muteSFX
          : 1)
      ) {
        d = 0;
        for (var e = ROTATE_Awards.all.length; d < e; ) {
          var f = d++;
          if ('boolean' != typeof a.awards[f]) throw Error();
        }
        var m = {
          unlocked: a.unlocked,
          awards: a.awards,
        };
        null != a.best && (m.best = a.best);
        null != a.invert && (m.invert = a.invert);
        null != a.muteMusic && (m.muteMusic = a.muteMusic);
        null != a.muteSFX && (m.muteSFX = a.muteSFX);
        // TODO: put "lsw:rotate" into LocalStorage key constant
        LocalStorage.setItem('lws:rotate', window.btoa(JSON.stringify(m)));
        // TODO: put "data" into LocalStorage key constant
        LocalStorage.removeItem('data');
      }
    } catch (k) {}
  }

  public loadProgress() {
    // TODO: re-implement properly
    this.migrateProgress();
    try {
      // TODO: put "lsw:rotate" into LocalStorage key constant
      var a = LocalStorage.getItem('lws:rotate');
      if (null != a && '' != a) {
        var b = JSON.parse(CharUtils.decode(a).toString());
        if (null != b) {
          b.muteMusic && this.toggleMusic(!1);
          b.muteSFX && this.toggleSFX(!1);
          null != b.unlocked && (ROTATE_Levels.unlocked = b.unlocked);
          if (
            null != b.awards &&
            b.awards instanceof Array &&
            null == b.awards.__enum__
          ) {
            var c = b.awards;
            a = 0;
            for (var d = c.length; a < d; ) {
              var e = a++;
              c[e] && (ROTATE_Awards.all[e].unlocked = !0);
            }
          }
          null != b.best && (ROTATE_Levels.speedrunBest = b.best);
          null != b.invert && (this.invert = 1 == b.invert);
        }
      }
    } catch (f) {
      f instanceof ROTATE_Error && (f = f.val), console.log(f);
    }
  }

  public saveProgress() {
    // TODO: re-implement properly
    for (var a = [], b = 0, c = ROTATE_Awards.all; b < c.length; ) {
      var d = c[b];
      ++b;
      a.push(d.unlocked);
    }
    a = {
      unlocked: ROTATE_Levels.unlocked,
      awards: a,
    };
    -1 < ROTATE_Levels.speedrunBest && (a.best = ROTATE_Levels.speedrunBest);
    this.invert && (a.invert = !0);
    this.muteMusic && (a.muteMusic = !0);
    this.muteSFX && (a.muteSFX = !0);
    LocalStorage.setItem(
      // TODO: put "lsw:rotate" into LocalStorage key constant
      'lws:rotate',
      CharUtils.encode(StringBytesObject.ofString(JSON.stringify(a))),
    );
  }

  public clearProgress() {
    // TODO: re-implement properly
    // TODO: put "lsw:rotate" into LocalStorage key constant
    LocalStorage.removeItem('lws:rotate');
    for (var a = 0, b = ROTATE_Awards.all; a < b.length; ) {
      var c = b[a];
      ++a;
      c.unlocked = !1;
    }
    ROTATE_Levels.unlocked = 0;
    ROTATE_Levels.speedrunBest = -1;
    this.invert = !1;
  }

  public warnNoSave(a: ROTATE_CanvasObject) {
    // TODO: re-implement properly
    if (ROTATE_Game.nosave) {
      var text = new ROTATE_Text(
        ROTATE_Game.fontMain,
        'Enable cookies & site data\nto save your progress!',
        2,
      );
      text.set_x(8);
      text.set_y(4);
      text.set_scaleX(text.set_scaleY(0.5));
      a.addChild(text);
    }
  }

  public toggleSFX(save: boolean = true) {
    // TODO: re-implement properly
    this.muteSFX = !this.muteSFX;
    if (ROTATE_Game.ie) {
      if (this.muteSFX)
        for (var b = 0, c = ROTATE_Audio.SFX; b < c.length; ) {
          var d = c[b];
          ++b;
          d.stop();
        }
    } else
      for (b = 0, c = ROTATE_Audio.SFX; b < c.length; )
        (d = c[b]), ++b, d.mute(this.muteSFX);
    ROTATE_Game.ie
      ? this.muteMusic &&
        (this.muteSFX
          ? ROTATE_Audio.surface.stop()
          : this.ieSurface &&
            !ROTATE_Audio.surface.playing() &&
            ROTATE_Audio.surface.play())
      : ROTATE_Audio.surface.mute(this.muteSFX && this.muteMusic);
    save && this.saveProgress();
  }

  public toggleMusic(save: boolean = true) {
    // TODO: re-implement properly
    this.muteMusic = !this.muteMusic;
    ROTATE_Game.ie
      ? this.muteMusic
        ? (ROTATE_Audio.themeMenu.stop(),
          ROTATE_Audio.themeGame1.stop(),
          ROTATE_Audio.themeGame2.stop())
        : (ROTATE_Game.instance.ieMenu &&
            !ROTATE_Audio.themeMenu.playing() &&
            ROTATE_Audio.themeMenu.play(),
          ROTATE_Game.instance.ieGame1 &&
            !ROTATE_Audio.themeGame1.playing() &&
            ROTATE_Audio.themeGame1.play(),
          ROTATE_Game.instance.ieGame2 &&
            !ROTATE_Audio.themeGame2.playing() &&
            ROTATE_Audio.themeGame2.play())
      : (ROTATE_Audio.themeMenu.mute(this.muteMusic),
        ROTATE_Audio.themeGame1.mute(this.muteMusic),
        ROTATE_Audio.themeGame2.mute(this.muteMusic));
    ROTATE_Game.ie
      ? this.muteSFX &&
        (this.muteMusic
          ? ROTATE_Audio.surface.stop()
          : ROTATE_Game.instance.ieSurface &&
            !ROTATE_Audio.surface.playing() &&
            ROTATE_Audio.surface.play())
      : ROTATE_Audio.surface.mute(this.muteMusic && this.muteSFX);
    save && this.saveProgress();
  }
}

export class ROTATE_Award {
  public unlocked = false;

  constructor(
    public readonly name: string,
    public readonly icon: HTMLImageElement,
  ) {}

  public unlock() {
    if (this.unlocked) return false;

    this.unlocked = true;

    ROTATE_Game.instance.saveProgress();
    if (ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenAwards) {
      ROTATE_Game.instance.currentScreen.refresh();
    }
    ROTATE_Awards.queueNotify(this);
    return true;
  }
}

export class ROTATE_Awards {
  public static readonly awardEscape = new ROTATE_Award(
    'The Beginning',
    ROTATE_Images.awardIconEscape,
  );
  public static readonly awardSpeedrun = new ROTATE_Award(
    'Seven or\nLess',
    ROTATE_Images.awardIconSpeedrun,
  );
  public static readonly awardEditor = new ROTATE_Award(
    'Architect',
    ROTATE_Images.awardIconEditor,
  );
  public static readonly awardJoshua = new ROTATE_Award(
    'Curiosity',
    ROTATE_Images.awardIconJoshua,
  );
  public static readonly awardSoundtrack = new ROTATE_Award(
    'Sound Seeker',
    ROTATE_Images.awardIconSoundtrack,
  );
  public static readonly awardRotate = new ROTATE_Award(
    'Rotate Me',
    ROTATE_Images.awardIconRotate,
  );
  public static readonly all = [
    ROTATE_Awards.awardEscape,
    ROTATE_Awards.awardSpeedrun,
    ROTATE_Awards.awardEditor,
    ROTATE_Awards.awardJoshua,
    ROTATE_Awards.awardSoundtrack,
    ROTATE_Awards.awardRotate,
  ];
  public static readonly FADE_MS = 250;
  public static readonly STAY_MS = 3000;

  public static bubbleTimer = -1;
  public static bubble = new ROTATE_CanvasObject();
  public static bubbleTitle = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'NEW AWARD',
  );
  public static bubbleName = new ROTATE_Text(ROTATE_Game.fontMain, '');
  public static bubbleIcon: ROTATE_ImageObject | undefined = undefined;
  public static queue: ROTATE_Award[] = [];

  public static setup(a: ROTATE_Game) {
    null == ROTATE_Awards.bubble &&
      ((ROTATE_Awards.bubble = new ROTATE_CanvasObject()),
      (ROTATE_Awards.bubble.mouseEnabled = !0),
      a.addChild(ROTATE_Awards.bubble),
      (ROTATE_Awards.bubbleTitle = new ROTATE_Text(
        ROTATE_Game.fontMain,
        'NEW AWARD',
      )),
      ROTATE_Awards.bubbleTitle.set_x(68),
      ROTATE_Awards.bubbleTitle.set_y(4),
      ROTATE_Awards.bubbleTitle.set_alpha(0.5),
      ROTATE_Awards.bubble.addChild(ROTATE_Awards.bubbleTitle),
      (ROTATE_Awards.bubbleName = new ROTATE_Text(ROTATE_Game.fontMain, '')),
      ROTATE_Awards.bubbleName.set_x(68),
      ROTATE_Awards.bubbleName.set_y(28),
      ROTATE_Awards.bubble.addChild(ROTATE_Awards.bubbleName),
      ROTATE_Awards.bubble.set_alpha(0));
  }
  public static queueNotify(award: ROTATE_Award) {
    null == ROTATE_Awards.queue && (ROTATE_Awards.queue = []);
    null != award &&
      0 > ROTATE_Awards.queue.indexOf(award) &&
      ROTATE_Awards.queue.push(award);
  }
  public static adjustBubble(name: string, icon: HTMLImageElement) {
    ROTATE_Awards.bubbleName.set_text(replace(name, '\n', ' '));
    ROTATE_Awards.bubble.graphics.clear();
    var c =
      Math.max(
        ROTATE_Awards.bubbleTitle.get_width(),
        ROTATE_Awards.bubbleName.get_width(),
      ) +
      ROTATE_Awards.bubbleName.x +
      12 +
      4;
    ROTATE_Awards.bubble.graphics.beginFill(3158064);
    ROTATE_Awards.bubble.graphics.drawRect(0, 0, c, 68);
    ROTATE_Awards.bubble.graphics.beginFill(6316128);
    ROTATE_Awards.bubble.graphics.drawRect(0, 0, c - 2, 66);
    ROTATE_Awards.bubble.graphics.beginFill(4210752);
    ROTATE_Awards.bubble.graphics.drawRect(0, 0, c - 4, 64);
    null != ROTATE_Awards.bubbleIcon &&
      ROTATE_Awards.bubble.removeChild(ROTATE_Awards.bubbleIcon);
    ROTATE_Awards.bubbleIcon = new ROTATE_ImageObject(icon);
    ROTATE_Awards.bubbleIcon.set_x(8);
    ROTATE_Awards.bubbleIcon.set_y(8);
    ROTATE_Awards.bubble.addChild(ROTATE_Awards.bubbleIcon);
  }
  public static update() {
    if (null != ROTATE_Awards.bubble) {
      var a = 0,
        b = Time.getCurrentMS();
      if (-1 != ROTATE_Awards.bubbleTimer) {
        var c = b - ROTATE_Awards.bubbleTimer;
        var d = c <= 2 * ROTATE_Awards.FADE_MS + ROTATE_Awards.STAY_MS;
      } else d = !1;
      d
        ? ((a =
            c <= ROTATE_Awards.FADE_MS
              ? 0
              : c <= ROTATE_Awards.FADE_MS + ROTATE_Awards.STAY_MS
                ? 1
                : 2),
          (a =
            0 == a
              ? ROTATE_Game.smootherStep(c / ROTATE_Awards.FADE_MS)
              : 1 == a
                ? 1
                : 1 -
                  ROTATE_Game.smootherStep(
                    (c - ROTATE_Awards.FADE_MS - ROTATE_Awards.STAY_MS) /
                      ROTATE_Awards.FADE_MS,
                  )))
        : null != ROTATE_Awards.queue &&
          0 < ROTATE_Awards.queue.length &&
          ((c = ROTATE_Awards.queue.shift()),
          ROTATE_Awards.adjustBubble(c.name, c.icon),
          (ROTATE_Awards.bubbleTimer = b));
      ROTATE_Awards.bubble.set_alpha(a);
      ROTATE_Awards.bubble.set_y(-68 * (1 - a));
    }
  }
}

class ROTATE_Player extends ROTATE_AnimatedObject {
  public lastStep = -1;
  public step = 0;
  public touchingOld = [];
  public touching = [];
  public onRamp = !1;
  public dead = !1;
  public finished = !1;
  public lastStuck = -1;
  public rotateAdjust = 0;
  public jumpTimer = -1;
  public jumpTimer2 = -1;
  public rotateTimer = -1;
  public grounded = !1;
  public x2 = 0;
  public y2 = 0;
  public lastX = 0;
  public lastY = 0;
  public dx = 0;
  public dy = 0;
  public horizontal = 0;
  public spawnTime = 0;
  public lastBounds?: Bounds;

  public static readonly HIT_W = 12;
  public static readonly HIT_H = 42;
  public static readonly SPEED = 3.7;
  public static readonly RAMP_MULT = 0.7;
  public static readonly ACCEL = 0.33;
  public static readonly DECCEL_MULT = 0.6;
  public static readonly JUMP_SPEED = 5.9;
  public static readonly JUMP_DELAY = 0.25;
  public static readonly JUMP_DELAY_2 = 0.06666666666666667;
  public static readonly GRAVITY = 0.35;
  public static readonly GRAVITY_MAX = 9;
  public static readonly ROTATE_DELAY = 0.05;
  public static readonly ANIM_IDLE = new ROTATE_Animation(
    [0, 1, 2, 3],
    [400, 400, 400, 400],
  );
  public static readonly ANIM_RUN = new ROTATE_Animation(
    [4, 5, 6, 7],
    [100, 100, 100, 100],
  );
  public static readonly ANIM_JUMP = new ROTATE_Animation(
    [8, 9],
    [200, 200],
    !1,
  );
  public static readonly ANIM_FALL = new ROTATE_Animation(
    [12, 13, 14, 15],
    [100, 100, 100, 100],
  );
  public static readonly ANIM_ROTATE = new ROTATE_Animation(
    [16, 17, 18, 19],
    [100, 100, 100, 100],
    !1,
  );

  constructor() {
    super(ROTATE_Images.player, 32, 48);
    this.set_animation(ROTATE_Player.ANIM_IDLE);
    this.onChange = this.aminChange.bind(this);
    this.spawnTime = ROTATE_Game.instance.get_gameTimeMS();
    this.adjust();
  }

  public get_localX() {
    return 0 == ROTATE_LevelEditorManager.rotation
      ? this.x2
      : 1 == ROTATE_LevelEditorManager.rotation
        ? ROTATE_LevelEditorManager.get_height() - this.y2
        : 2 == ROTATE_LevelEditorManager.rotation
          ? ROTATE_LevelEditorManager.get_width() - this.x2
          : this.y2;
  }

  public set_localX(x: number) {
    0 == ROTATE_LevelEditorManager.rotation
      ? (this.x2 = x)
      : 1 == ROTATE_LevelEditorManager.rotation
        ? (this.y2 = ROTATE_LevelEditorManager.get_height() - x)
        : 2 == ROTATE_LevelEditorManager.rotation
          ? (this.x2 = ROTATE_LevelEditorManager.get_width() - x)
          : 3 == ROTATE_LevelEditorManager.rotation && (this.y2 = x);
    return x;
  }

  public get_localY() {
    return 0 == ROTATE_LevelEditorManager.rotation
      ? this.y2
      : 1 == ROTATE_LevelEditorManager.rotation
        ? this.x2
        : 2 == ROTATE_LevelEditorManager.rotation
          ? ROTATE_LevelEditorManager.get_height() - this.y2
          : ROTATE_LevelEditorManager.get_width() - this.x2;
  }

  public set_localY(y: number) {
    0 == ROTATE_LevelEditorManager.rotation
      ? (this.y2 = y)
      : 1 == ROTATE_LevelEditorManager.rotation
        ? (this.x2 = y)
        : 2 == ROTATE_LevelEditorManager.rotation
          ? (this.y2 = ROTATE_LevelEditorManager.get_height() - y)
          : 3 == ROTATE_LevelEditorManager.rotation &&
            (this.x2 = ROTATE_LevelEditorManager.get_width() - y);
    return y;
  }

  public aminChange(animationIndex: number) {
    this.animation == ROTATE_Player.ANIM_RUN &&
      0 == animationIndex &&
      100 < ROTATE_Game.instance.get_gameTimeMS() - this.lastStep &&
      ((ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
        ROTATE_Audio.steps.play(0 == this.step ? 'a' : 'b'),
      (this.lastStep = ROTATE_Game.instance.get_gameTimeMS()),
      (this.step = 0 == this.step ? 1 : 0));
  }

  public adjust() {
    this.origin.x = this.frameW / 2;
    this.origin.y =
      this.frameH -
      (ROTATE_LevelEditorManager.rotating
        ? ROTATE_GameConstants.rotateOffset
        : 0);
  }

  public update() {
    if (
      !ROTATE_LevelEditorManager.rotating &&
      !this.dead &&
      ((this.horizontal = this.finished ? 0 : ROTATE_Game.getInputX()),
      0 != this.horizontal
        ? this.set_scaleX(0 < this.horizontal ? 1 : -1)
        : this.grounded &&
          this.animation != ROTATE_Player.ANIM_IDLE &&
          this.set_animation(ROTATE_Player.ANIM_IDLE),
      !this.finished &&
        (InputKeys.keyPressed(KEY_CODE.ArrowDown) ||
          InputKeys.keyPressed(KEY_CODE.KeyS)))
    ) {
      for (var a = 0, b = this.touching; a < b.length; ) {
        var c = b[a];
        ++a;
        c.get_block().onInteract(c);
      }
      this.touchingFinish() &&
        ((this.finished = !0),
        (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
          ROTATE_Audio.exit.play(),
        ROTATE_Game.instance.currentScreen.finished());
    }
  }

  public touchingFinish() {
    return ROTATE_LevelEditorManager.rotating ||
      this.dead ||
      this.finished ||
      !this.grounded ||
      0 != ROTATE_LevelEditorManager.rotation ||
      Math.floor(this.x2 / ROTATE_GameConstants.tileSize) !=
        ROTATE_LevelEditorManager.level.finishCol
      ? !1
      : Math.floor(this.y2 / ROTATE_GameConstants.tileSize) ==
          ROTATE_LevelEditorManager.level.finishRow + 1;
  }

  public tick() {
    if (!ROTATE_LevelEditorManager.rotating && !this.dead) {
      null == this.lastBounds && (this.lastBounds = this.getHitBounds());
      var a = ROTATE_Player.SPEED * (this.onRamp ? ROTATE_Player.RAMP_MULT : 1);
      0 < this.horizontal
        ? this.dx < a
          ? this.dx < -ROTATE_Player.ACCEL
            ? (this.dx *= ROTATE_Player.DECCEL_MULT)
            : ((this.dx += ROTATE_Player.ACCEL), this.dx > a && (this.dx = a))
          : this.dx > a && (this.dx = a)
        : 0 > this.horizontal
          ? this.dx > -a
            ? this.dx > ROTATE_Player.ACCEL
              ? (this.dx *= ROTATE_Player.DECCEL_MULT)
              : ((this.dx -= ROTATE_Player.ACCEL),
                this.dx < -a && (this.dx = -a))
            : this.dx < -a && (this.dx = -a)
          : (this.dx *= ROTATE_Player.DECCEL_MULT);
      !this.finished &&
      this.grounded &&
      this.jumpKeyDown() &&
      ROTATE_Game.instance.get_gameTime() - this.jumpTimer >=
        ROTATE_Player.JUMP_DELAY &&
      ROTATE_Game.instance.get_gameTime() - this.jumpTimer2 >=
        ROTATE_Player.JUMP_DELAY_2
        ? ((this.dy = -ROTATE_Player.JUMP_SPEED),
          (this.jumpTimer = ROTATE_Game.instance.get_gameTime()),
          (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
            ROTATE_Audio.steps.play('a'),
          (this.lastStep = ROTATE_Game.instance.get_gameTimeMS()))
        : this.dy < ROTATE_Player.GRAVITY_MAX &&
          ((this.dy += ROTATE_Player.GRAVITY),
          this.dy > ROTATE_Player.GRAVITY_MAX &&
            (this.dy = ROTATE_Player.GRAVITY_MAX));
      a = this.grounded;
      this.onRamp = this.grounded = !1;
      for (
        var b = this.dx,
          c = this.dy,
          d = this.get_localX() - Math.floor(this.get_localX()),
          e = this.get_localY() - Math.floor(this.get_localY()),
          f = this.get_localX(),
          m = this.get_localY(),
          k,
          p = this.get_localY() + this.dy;
        0 != b || 0 != c;

      )
        if (
          (0 != c &&
            (0 < c
              ? 0 < e && c >= 1 - e
                ? ((k = 1 - e), (e = 0))
                : (k = 1 < c ? 1 : c)
              : 0 < e && c <= -e
                ? ((k = -e), (e = 0))
                : (k = -1 > c ? -1 : c),
            this.set_localY(this.get_localY() + k),
            (c -= k),
            this.isColliding(null, null, 1) &&
              (this.set_localY(m), (c = this.dy = 0)),
            (m = this.get_localY())),
          0 != b)
        ) {
          0 < b
            ? 0 < d && b >= 1 - d
              ? ((k = 1 - d), (d = 0))
              : (k = 1 < b ? 1 : b)
            : 0 < d && b <= -d
              ? ((k = -d), (d = 0))
              : (k = -1 > b ? -1 : b);
          this.set_localX(this.get_localX() + k);
          b -= k;
          if (this.isColliding(null, Bind(this, this.rampCheckDX), 0))
            if (
              ((k = 0),
              this.set_localY(this.get_localY() - e),
              this.isColliding(null, Bind(this, this.nonRampCheckDX), 0))
            )
              this.set_localY(this.get_localY() + e);
            else {
              k -= e;
              if (this.isColliding(null, Bind(this, this.rampCheckDX), 0)) {
                var y = this.get_localY();
                this.set_localY(y - 1);
                this.isColliding(null, Bind(this, this.nonRampCheckDX), 0)
                  ? ((y = this.get_localY()), this.set_localY(y + 1))
                  : this.isColliding(null, Bind(this, this.rampCheckDX), 0)
                    ? (this.set_localY(m), (k = 0))
                    : --k;
              }
              0 > k && ((e = 0), (m += k), (p += k), (this.onRamp = !0));
            }
          this.isColliding(null, null, 0) &&
            (this.set_localX(f), (b = this.dx = 0));
          f = this.get_localX();
        }
      this.get_localY() - p < -ROTATE_GameConstants.EPSILON &&
        (this.grounded = !0);
      b = ROTATE_Game.instance.get_gameTimeMS();
      c = 0 <= this.lastStuck && 100 >= b - this.lastStuck;
      if (0 <= this.dy && !this.grounded) {
        d = this.get_localY();
        e = 2 + Math.ceil(Math.abs(1.25 * this.dx));
        m = f = 0;
        for (k = p = !1; !p && !k && m < e; ) {
          f =
            0 == m
              ? 1 - (this.get_localY() - Math.floor(this.get_localY()))
              : 1;
          this.set_localY(Math.round(this.get_localY() + f));
          m += f;
          k = this.isColliding(null, Bind(this, this.nonRampCheck), 1);
          if (!c && k) break;
          p =
            c && k ? !0 : this.isColliding(null, Bind(this, this.rampCheck), 1);
        }
        p
          ? (this.set_localY(this.get_localY() - f),
            (this.grounded = !0),
            (this.dy = 0),
            k || ((this.lastStuck = b), (this.onRamp = !0)))
          : this.set_localY(d);
      }
      this.updateTouching();
      this.grounded &&
        !a &&
        (100 < ROTATE_Game.instance.get_gameTimeMS() - this.spawnTime &&
          ((ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
            ROTATE_Audio.steps.play('b'),
          (this.lastStep = ROTATE_Game.instance.get_gameTimeMS())),
        (this.jumpTimer2 = ROTATE_Game.instance.get_gameTime()));
      this.grounded
        ? 0 != this.horizontal && 0.75 < Math.abs(this.dx)
          ? this.set_animation(ROTATE_Player.ANIM_RUN)
          : this.set_animation(ROTATE_Player.ANIM_IDLE)
        : ROTATE_LevelEditorManager.rotating ||
          (0 <= this.dy
            ? this.set_animation(ROTATE_Player.ANIM_FALL)
            : this.set_animation(ROTATE_Player.ANIM_JUMP));
      this.lastX = this.x2;
      this.lastY = this.y2;
      this.lastBounds = this.getHitBounds();
    }
    this.set_x(Math.round(this.x2));
    this.set_y(Math.round(this.y2));
  }

  public postUpdate() {
    this.set_x(Math.round(this.x2));
    this.set_y(Math.round(this.y2));
  }

  public getHitBounds(a = true, b = 0, c = 0, d = 0, e = false) {
    if (a)
      (b = this.x2), (c = this.y2), (d = ROTATE_LevelEditorManager.rotation);
    else {
      for (; 0 > d; ) d += 4;
      for (; 3 < d; ) d -= 4;
    }
    var f = 0 == d || 2 == d,
      m = f ? ROTATE_Player.HIT_W : ROTATE_Player.HIT_H;
    f = f ? ROTATE_Player.HIT_H : ROTATE_Player.HIT_W;
    a =
      (a && ROTATE_LevelEditorManager.rotating) || (!a && e)
        ? ROTATE_GameConstants.rotateOffset
        : 0;
    return 3 == d
      ? new Bounds(b - a, c - f / 2, m, f)
      : 2 == d
        ? new Bounds(b - m / 2, c - a, m, f)
        : 1 == d
          ? new Bounds(b - m + a, c - f / 2, m, f)
          : new Bounds(b - m / 2, c - f + a, m, f);
  }

  public rampCheck(a) {
    return JSObjectUtils.__instanceof(a, Collider3)
      ? (0 != ROTATE_LevelEditorManager.rotation ||
          (0 != a.dir && 1 != a.dir)) &&
        (1 != ROTATE_LevelEditorManager.rotation ||
          (3 != a.dir && 0 != a.dir)) &&
        (2 != ROTATE_LevelEditorManager.rotation || (2 != a.dir && 3 != a.dir))
        ? 3 == ROTATE_LevelEditorManager.rotation
          ? 1 != a.dir
            ? 2 == a.dir
            : !0
          : !1
        : !0
      : !1;
  }

  public nonRampCheck(a) {
    return !this.rampCheck(a);
  }

  public rampCheckDX(a) {
    return JSObjectUtils.__instanceof(a, Collider3)
      ? (0 == ROTATE_LevelEditorManager.rotation &&
          ((0 < this.dx && 0 == a.dir) || (0 > this.dx && 1 == a.dir))) ||
        (1 == ROTATE_LevelEditorManager.rotation &&
          ((0 < this.dx && 3 == a.dir) || (0 > this.dx && 0 == a.dir))) ||
        (2 == ROTATE_LevelEditorManager.rotation &&
          ((0 < this.dx && 2 == a.dir) || (0 > this.dx && 3 == a.dir)))
        ? !0
        : 3 == ROTATE_LevelEditorManager.rotation
          ? 0 < this.dx && 1 == a.dir
            ? !0
            : 0 > this.dx
              ? 2 == a.dir
              : !1
          : !1
      : !1;
  }

  public nonRampCheckDX(a) {
    return !this.rampCheckDX(a);
  }

  public isColliding(a, b, c) {
    null == c && (c = -1);
    a = null == a ? this.getHitBounds() : a;
    var d = ROTATE_Game.quantize(a.get_left()),
      e = ROTATE_Game.quantize(a.get_right() - ROTATE_GameConstants.EPSILON),
      f = ROTATE_Game.quantize(a.get_top()),
      m = ROTATE_Game.quantize(a.get_bottom() - ROTATE_GameConstants.EPSILON);
    for (m += 1; f < m; )
      for (var k = f++, p = d, y = e + 1; p < y; ) {
        var H = p++;
        if (!ROTATE_LevelEditorManager.isInBounds(H, k)) return !0;
        var K = ROTATE_LevelEditorManager.getBlockData(H, k),
          W = K.get_block();
        if (
          null != W &&
          W.collides(K) &&
          !W.isTrigger(K) &&
          this.testBlockCollision(a, H, k, b, c)
        )
          return !0;
      }
    return !1;
  }

  public updateTouching() {
    this.touchingOld = this.touching;
    this.touching = [];
    var a = this.getHitBounds(),
      b = ROTATE_Game.quantize(a.get_left()),
      c = ROTATE_Game.quantize(a.get_right() - ROTATE_GameConstants.EPSILON),
      d = ROTATE_Game.quantize(a.get_top()),
      e = ROTATE_Game.quantize(a.get_bottom() - ROTATE_GameConstants.EPSILON);
    for (e += 1; d < e; )
      for (var f = d++, m = b, k = c + 1; m < k; ) {
        var p = m++,
          y = ROTATE_LevelEditorManager.getBlockData(p, f),
          H = y.get_block();
        if (
          null != H &&
          H.collides(y) &&
          this.testBlockCollision(a, p, f) &&
          -1 == this.touching.indexOf(y) &&
          (this.touching.push(y),
          -1 == this.touchingOld.indexOf(y) &&
            H.isTrigger(y) &&
            !H.onTrigger(y))
        )
          return;
      }
  }
  public testBlockCollision(a, b, c, d, e) {
    null == e && (e = -1);
    var f = ROTATE_LevelEditorManager.getBlockData(b, c);
    f = f.get_block().getColliders(f);
    for (var m = 0; m < f.length; ) {
      var k = f[m];
      ++m;
      if (null != k && (null == d || d(k)))
        if (JSObjectUtils.__instanceof(k, Collider)) {
          if (
            ((k = k.bounds.copy()),
            (k.x += b * ROTATE_GameConstants.tileSize),
            (k.y += c * ROTATE_GameConstants.tileSize),
            a.intersects(k))
          )
            return !0;
        } else if (JSObjectUtils.__instanceof(k, Collider3)) {
          var p = new Vector2(a.get_right(), a.get_bottom());
          1 == k.dir && (p = new Vector2(a.get_left(), a.get_bottom()));
          2 == k.dir && (p = new Vector2(a.get_left(), a.get_top()));
          3 == k.dir && (p = new Vector2(a.get_right(), a.get_top()));
          p.x -= b * ROTATE_GameConstants.tileSize;
          p.y -= c * ROTATE_GameConstants.tileSize;
          if (k.testPoint(p)) return !0;
        } else if (JSObjectUtils.__instanceof(k, Collider2)) {
          if (
            ((p = k.bounds.copy()),
            (p.x += b * ROTATE_GameConstants.tileSize),
            (p.y += c * ROTATE_GameConstants.tileSize),
            a.intersects(p))
          ) {
            var y =
                1 == ROTATE_LevelEditorManager.rotation ||
                3 == ROTATE_LevelEditorManager.rotation,
              H =
                0 == ROTATE_LevelEditorManager.rotation ||
                2 == ROTATE_LevelEditorManager.rotation,
              K = -1 == e || 0 == e,
              W = -1 == e || 1 == e,
              aa = (H && K) || (y && W);
            if ((H && W) || (y && K))
              if (
                (0 == k.dir && this.lastBounds.get_bottom() <= p.get_top()) ||
                (2 == k.dir && this.lastBounds.get_top() >= p.get_bottom())
              )
                return !0;
            if (
              aa &&
              ((1 == k.dir && this.lastBounds.get_left() >= p.get_right()) ||
                (3 == k.dir && this.lastBounds.get_right() <= p.get_left()))
            )
              return !0;
          }
        } else if (
          JSObjectUtils.__instanceof(k, ColliderNoop) &&
          ((p = k),
          (k = ROTATE_GameConstants.tileSize),
          (y = a.copy()),
          (y.x -= b * k),
          (y.y -= c * k),
          (p = new Vector2(
            0 == p.dir || 3 == p.dir ? k : 0,
            0 == p.dir || 1 == p.dir ? k : 0,
          )),
          this.testAABBCircle(
            new Bounds(a.x - b * k, a.y - c * k, a.width, a.height),
            p,
            k,
          ))
        )
          return !0;
    }
    return !1;
  }

  public testAABBCircle(a: Bounds, b: Vector2, c: number) {
    return new Bounds(a.x, a.y - c, a.width, a.height + 2 * c).contains(b) ||
      new Bounds(a.x - c, a.y, a.width + 2 * c, a.height).contains(b) ||
      Vector2.distance(b, new Vector2(a.get_left(), a.get_top())) < c ||
      Vector2.distance(b, new Vector2(a.get_right(), a.get_top())) < c ||
      Vector2.distance(b, new Vector2(a.get_right(), a.get_bottom())) < c
      ? !0
      : Vector2.distance(b, new Vector2(a.get_left(), a.get_bottom())) < c;
  }

  public jumpKeyDown() {
    return InputKeys.keyDown(KEY_CODE.ArrowUp) ||
      InputKeys.keyDown(KEY_CODE.KeyW)
      ? !0
      : InputKeys.keyDown(KEY_CODE.Space);
  }

  public canRotate(a) {
    if (
      !this.grounded ||
      this.jumpKeyDown() ||
      ROTATE_Game.instance.get_gameTime() - this.rotateTimer <
        ROTATE_Player.ROTATE_DELAY + ROTATE_GameConstants.rotateTime ||
      ROTATE_Game.instance.get_gameTime() - this.jumpTimer2 <
        ROTATE_Player.JUMP_DELAY_2
    )
      return !1;
    var b = this.x2,
      c = this.y2;
    this.set_localY(this.get_localY() - ROTATE_GameConstants.rotateOffset);
    var d = ROTATE_LevelEditorManager.rotation,
      e = ROTATE_LevelEditorManager;
    e.set_rotation(e.rotation + a);
    ROTATE_LevelEditorManager.rotating = !0;
    a = 0;
    for (e = this.isColliding(); e && a < ROTATE_GameConstants.rotateOffset; )
      (e = this.get_localY()),
        this.set_localY(e - 1),
        ++a,
        (e = this.isColliding(null, null, 1));
    this.rotateAdjust = a;
    ROTATE_LevelEditorManager.set_rotation(d);
    ROTATE_LevelEditorManager.rotating = !1;
    this.x2 = b;
    this.y2 = c;
    return !e;
  }

  public onRotateStart(a) {
    this.set_localY(this.get_localY() - ROTATE_GameConstants.rotateOffset);
    this.set_scaleX(a);
    this.adjust();
    this.set_animation(ROTATE_Player.ANIM_ROTATE);
    this.rotateTimer = ROTATE_Game.instance.get_gameTime();
    (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
      ROTATE_Audio.steps.play('a');
    this.lastStep = ROTATE_Game.instance.get_gameTimeMS();
    (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
      ROTATE_Audio.rotate.play();
  }

  public onRotateStart2() {
    this.rotStartY = this.get_localY();
  }

  public onRotating(a) {
    this.set_localY(this.rotStartY - this.rotateAdjust * a);
  }

  public onRotateEnd() {
    this.dx = this.dy = 0;
    this.grounded = !1;
    this.set_localY(
      this.rotStartY - this.rotateAdjust + ROTATE_GameConstants.rotateOffset,
    );
    this.adjust();
  }
}

type PLACEHOLDER__BaseLevelInterface = unknown;
export class ROTATE_LevelEditorManager {
  public static rotating = !1;
  public static rotation = 0;
  public static level: PLACEHOLDER__BaseLevelInterface | null = null;
  public static tiles: number[][][] = [];
  public static updateQueue = new ROTATE_EventMap();

  public static set_level(level: number) {
    if (null != level) {
      ROTATE_LevelEditorManager.level = level;
      ROTATE_LevelEditorManager.set_rotation(0);
      ROTATE_LevelEditorManager.rotating = !1;
      ROTATE_LevelEditorManager.tiles = [];
      for (var b = 0, c = level.tiles.length; b < c; ) {
        var d = b++;
        ROTATE_LevelEditorManager.tiles[d] = [];
        for (var e = 0, f = level.tiles[d].length; e < f; ) {
          var m = e++;
          ROTATE_LevelEditorManager.tiles[d][m] = level.tiles[d][m].slice(0);
        }
      }
      ROTATE_LevelEditorManager.updateQueue = new ROTATE_EventMap();
      b = 0;
      for (c = ROTATE_LevelEditorManager.get_height(); b < c; )
        for (
          d = b++, e = 0, f = ROTATE_LevelEditorManager.get_width();
          e < f;

        ) {
          var k = e++;
          m = ROTATE_LevelEditorManager.getBlockData(k, d);
          if (null == m.get_block() || 0 > m.id)
            ROTATE_LevelEditorManager.tiles[d][k] = [0];
          else if (m.get_block().alwaysUpdate(m)) {
            var p = ROTATE_LevelEditorManager.updateQueue;
            k = k + 'x' + d;
            p.h[k] = m;
          }
        }
    } else ROTATE_LevelEditorManager.level = null;
    return level;
  }
  public static set_rotation(a) {
    for (; 0 > a; ) a += 4;
    for (; 3 < a; ) a -= 4;
    ROTATE_LevelEditorManager.rotation = a;
    return ROTATE_LevelEditorManager.rotation;
  }
  public static get_height() {
    return null != ROTATE_LevelEditorManager.level
      ? ROTATE_LevelEditorManager.tiles.length
      : 0;
  }
  public static get_width() {
    return null != ROTATE_LevelEditorManager.level
      ? ROTATE_LevelEditorManager.tiles[0].length
      : 0;
  }
  public static isInBounds(x: number, y: number) {
    return null != ROTATE_LevelEditorManager.level &&
      0 <= x &&
      0 <= y &&
      x < ROTATE_LevelEditorManager.get_width()
      ? y < ROTATE_LevelEditorManager.get_height()
      : !1;
  }
  public static getBlockID(x: number, y: number) {
    return ROTATE_LevelEditorManager.isInBounds(x, y)
      ? ROTATE_LevelEditorManager.tiles[y][x][0]
      : 1;
  }
  public static getBlockMeta(x: number, y: number) {
    return !ROTATE_LevelEditorManager.isInBounds(x, y) ||
      2 > ROTATE_LevelEditorManager.tiles[y][x].length
      ? []
      : ROTATE_LevelEditorManager.tiles[y][x].slice(1);
  }
  public static getBlockData(x: number, y: number) {
    return new BlockData(
      x,
      y,
      ROTATE_LevelEditorManager.getBlockID(x, y),
      ROTATE_LevelEditorManager.getBlockMeta(x, y),
    );
  }
  public static getBlock(a, b) {
    return ROTATE_GameObjectsRegistry.getBlock(
      ROTATE_LevelEditorManager.getBlockID(a, b),
    );
  }
  public static setBlock(a, b, c, d, e) {
    null == e && (e = !1);
    if (ROTATE_LevelEditorManager.isInBounds(a, b)) {
      var f = a + 'x' + b,
        m = ROTATE_LevelEditorManager.updateQueue;
      m.h.hasOwnProperty(f) && ROTATE_LevelEditorManager.updateQueue.remove(f);
      ROTATE_LevelEditorManager.tiles[b][a] = [c];
      null != d &&
        (ROTATE_LevelEditorManager.tiles[b][a] =
          ROTATE_LevelEditorManager.tiles[b][a].concat(d));
      e &&
        (ROTATE_LevelEditorManager.level.tiles[b][a] =
          ROTATE_LevelEditorManager.tiles[b][a].slice(0));
      a = ROTATE_LevelEditorManager.getBlockData(a, b);
      ROTATE_GameObjectsRegistry.getBlock(c).alwaysUpdate(a) &&
        ((c = ROTATE_LevelEditorManager.updateQueue), (c.h[f] = a));
    }
  }
  public static setBlockMeta(a, b, c, d) {
    null == d && (d = !1);
    ROTATE_LevelEditorManager.isInBounds(a, b) &&
      ((ROTATE_LevelEditorManager.tiles[b][a] = [
        ROTATE_LevelEditorManager.tiles[b][a][0],
      ]),
      null != c &&
        (ROTATE_LevelEditorManager.tiles[b][a] =
          ROTATE_LevelEditorManager.tiles[b][a].concat(c)),
      d &&
        (ROTATE_LevelEditorManager.level.tiles[b][a] =
          ROTATE_LevelEditorManager.tiles[b][a].slice(0)),
      (c = a + 'x' + b),
      (d = ROTATE_LevelEditorManager.updateQueue),
      d.h.hasOwnProperty(c)) &&
      ((d = ROTATE_LevelEditorManager.updateQueue),
      (a = ROTATE_LevelEditorManager.getBlockData(a, b)),
      (d.h[c] = a));
  }
  public static isReplacable(a, b) {
    return a != ROTATE_LevelEditorManager.level.startCol ||
      (b != ROTATE_LevelEditorManager.level.startRow &&
        b != ROTATE_LevelEditorManager.level.startRow - 1)
      ? a == ROTATE_LevelEditorManager.level.finishCol
        ? b != ROTATE_LevelEditorManager.level.finishRow
          ? b != ROTATE_LevelEditorManager.level.finishRow - 1
          : !1
        : !0
      : !1;
  }
  public static onPlay() {
    if (null != ROTATE_LevelEditorManager.level) {
      ROTATE_LevelEditorManager.leversChanged = new ROTATE_KeysMap();
      for (var a = 0, b = ROTATE_LevelEditorManager.tiles.length; a < b; )
        for (
          var c = a++, d = 0, e = ROTATE_LevelEditorManager.tiles[c].length;
          d < e;

        ) {
          var f = d++;
          f = ROTATE_LevelEditorManager.getBlockData(f, c);
          if (null != f.get_block()) f.get_block().onPlay(f);
        }
    }
  }
}

class ROTATE_Renderer extends ROTATE_CanvasObject {
  public static bakeCanvas: HTMLCanvasElement;
  public static bakeCtx: CanvasRenderingContext2D;
  public static bakeSurface: Surface;
  public static gridCanvas: HTMLCanvasElement;
  public static gridCtx: CanvasRenderingContext2D;
  public static gridSurface: Surface;

  public showGrid;

  constructor(camera: ROTATE_CanvasObject) {
    super();
    this.showGrid = !1;
    if (null == ROTATE_Renderer.bakeCanvas) {
      ROTATE_Renderer.bakeCanvas = window.document.createElement('canvas');
      ROTATE_Renderer.bakeCtx = ROTATE_Renderer.bakeCanvas.getContext('2d')!;
      ROTATE_Renderer.bakeCtx.imageSmoothingEnabled = !1;
      ROTATE_Renderer.bakeSurface = new Surface(ROTATE_Renderer.bakeCtx);
    }
    var c = ROTATE_LevelEditorManager.get_width() + 2;
    ROTATE_Renderer.bakeCanvas.width = c * ROTATE_GameConstants.tileSize;
    c = ROTATE_LevelEditorManager.get_height() + 2;
    ROTATE_Renderer.bakeCanvas.height = c * ROTATE_GameConstants.tileSize;
    ROTATE_Renderer.bakeSurface.reset();
    ROTATE_Renderer.bakeSurface.clearRect(
      0,
      0,
      ROTATE_Renderer.bakeCanvas.width,
      ROTATE_Renderer.bakeCanvas.height,
    );
    if (
      null == ROTATE_Renderer.gridCanvas &&
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenEditor
    ) {
      ROTATE_Renderer.gridCanvas = window.document.createElement('canvas');
      ROTATE_Renderer.gridCanvas.width =
        ROTATE_ScreenEditor.editorLevel.tiles[0].length *
          ROTATE_GameConstants.tileSize +
        2;
      ROTATE_Renderer.gridCanvas.height =
        ROTATE_ScreenEditor.editorLevel.tiles.length *
          ROTATE_GameConstants.tileSize +
        2;
      ROTATE_Renderer.gridCtx = ROTATE_Renderer.gridCanvas.getContext('2d')!;
      ROTATE_Renderer.gridSurface = new Surface(ROTATE_Renderer.gridCtx);
      ROTATE_Renderer.gridSurface.beginFill(2105376, 0.2);
      c = 0;
      for (var d = ROTATE_ScreenEditor.editorLevel.tiles.length + 1; c < d; )
        for (
          var e = c++,
            f = 0,
            m = ROTATE_ScreenEditor.editorLevel.tiles[0].length + 1;
          f < m;

        ) {
          var k = f++ * ROTATE_GameConstants.tileSize,
            p = e * ROTATE_GameConstants.tileSize;
          ROTATE_Renderer.gridSurface.drawRect(
            k,
            p,
            2,
            ROTATE_GameConstants.tileSize,
          );
          ROTATE_Renderer.gridSurface.drawRect(
            k + 2,
            p,
            ROTATE_GameConstants.tileSize - 2,
            2,
          );
        }
    }
    this.addEventListener('render', (y) => {
      this.render(y.surface, camera);
    });
  }

  public render(surface: Surface, camera: ROTATE_CanvasObject) {
    if (null != ROTATE_LevelEditorManager.level) {
      surface.drawImage(
        ROTATE_Renderer.bakeCanvas,
        null,
        -ROTATE_GameConstants.tileSize,
        -ROTATE_GameConstants.tileSize,
      );
      var c = null;
      if (!ROTATE_LevelEditorManager.rotating) {
        c = ROTATE_LevelEditorManager.rotation;
        c = camera.globalToLocal(
          1 == c || 2 == c ? ROTATE_Canvas.width : 0,
          2 == c || 3 == c ? ROTATE_Canvas.height : 0,
        );
        var d = Math.floor(c.x / ROTATE_GameConstants.tileSize),
          e = Math.floor(
            (c.x + ROTATE_Canvas.width - ROTATE_GameConstants.EPSILON) /
              ROTATE_GameConstants.tileSize,
          ),
          f = Math.floor(c.y / ROTATE_GameConstants.tileSize),
          m = Math.floor(
            (c.y + ROTATE_Canvas.height - ROTATE_GameConstants.EPSILON) /
              ROTATE_GameConstants.tileSize,
          );
        c = function (fa: number, ka: number) {
          return fa >= d && ka >= f && fa <= e ? ka <= m : !1;
        };
      }
      var k = ROTATE_LevelEditorManager.updateQueue;
      for (k = new ROTATE_EventMapIterator(k, k.arrayKeys()); k.hasNext(); ) {
        var p = k.next(),
          y = ROTATE_LevelEditorManager.rotating;
        if (!y)
          if (p.get_block() == ROTATE_GameObjects.door)
            for (var H = p.getMeta(1), K = p.getMeta(2), W = 0; W < H; ) {
              var aa = W++;
              if (
                c(
                  3 == K || 1 == K ? p.x : 2 == K ? p.x - aa : p.x + aa,
                  2 == K || 0 == K ? p.y : 3 == K ? p.y - aa : p.y + aa,
                )
              ) {
                y = !0;
                break;
              }
            }
          else y = c(p.x, p.y);
        y &&
          (surface.translate(
            p.x * ROTATE_GameConstants.tileSize,
            p.y * ROTATE_GameConstants.tileSize,
          ),
          p.get_block().render(surface, p),
          surface.translate(
            -p.x * ROTATE_GameConstants.tileSize,
            -p.y * ROTATE_GameConstants.tileSize,
          ));
      }
      this.showGrid &&
        null != ROTATE_Renderer.gridCanvas &&
        surface.drawImage(ROTATE_Renderer.gridCanvas, null, 0, 0);
      if (
        ROTATE_Game.instance.currentScreen instanceof
          ROTATE_ScreenPrimaryGame &&
        ((c = ROTATE_Game.instance.currentScreen),
        !ROTATE_LevelEditorManager.rotating &&
          !c.player.dead &&
          !c.player.finished)
      ) {
        k = 0;
        for (p = c.player.touching; k < p.length; )
          (y = p[k]),
            ++k,
            y.get_block().showArrow(y) && this.renderArrow(surface, y.x, y.y);
        c.player.touchingFinish() &&
          this.renderArrow(
            surface,
            ROTATE_LevelEditorManager.level.finishCol,
            ROTATE_LevelEditorManager.level.finishRow - 1,
            -4,
          );
      }
    }
  }

  public renderArrow(surface: Surface, col: number, row: number, d: number) {
    null == d && (d = 0);
    var e = ROTATE_GameConstants.tileSize;
    surface.translate((col + 0.5) * e, (row + 0.5) * e);
    surface.rotate((-ROTATE_LevelEditorManager.rotation * Math.PI) / 2);
    surface.drawImage(
      ROTATE_Images.interact,
      null,
      -ROTATE_Images.interact.width / 2,
      Math.round(
        -e / 2 -
          ROTATE_Images.interact.height +
          2 * Math.sin(8 * ROTATE_Game.instance.get_gameTime()),
      ) + d,
    );
    surface.rotate((ROTATE_LevelEditorManager.rotation * Math.PI) / 2);
    surface.translate(-(col + 0.5) * e, -(row + 0.5) * e);
  }

  public updateAllBlocks() {
    ROTATE_Renderer.bakeSurface.setTransform(1, 0, 0, 1, 0, 0);
    ROTATE_Renderer.bakeSurface.clearRect(
      0,
      0,
      ROTATE_Renderer.bakeCanvas.width,
      ROTATE_Renderer.bakeCanvas.height,
    );
    if (null != ROTATE_LevelEditorManager.level) {
      for (
        var a =
            1 == ROTATE_LevelEditorManager.level.theme
              ? ROTATE_Images.bgBricks
              : ROTATE_Images.bgTiles,
          b = Math.ceil(ROTATE_Renderer.bakeCanvas.width / a.width),
          c = 0,
          d = Math.ceil(ROTATE_Renderer.bakeCanvas.height / a.height);
        c < d;

      )
        for (var e = c++, f = 0, m = b; f < m; ) {
          var k = f++;
          ROTATE_Renderer.bakeSurface.drawImage(
            a,
            null,
            k * a.width,
            e * a.height,
          );
        }
      this.renderDecals();
      a = -1;
      for (b = ROTATE_LevelEditorManager.get_height() + 1; a < b; )
        for (
          c = a++, d = -1, e = ROTATE_LevelEditorManager.get_width() + 1;
          d < e;

        )
          (f = d++),
            (m = ROTATE_LevelEditorManager.getBlockData(f, c)),
            (k = m.get_block()),
            null != k &&
              k.shouldRender(m) &&
              !k.alwaysUpdate(m) &&
              (ROTATE_Renderer.bakeSurface.translate(
                (f + 1) * ROTATE_GameConstants.tileSize,
                (c + 1) * ROTATE_GameConstants.tileSize,
              ),
              k.render(ROTATE_Renderer.bakeSurface, m),
              ROTATE_Renderer.bakeSurface.translate(
                -(f + 1) * ROTATE_GameConstants.tileSize,
                -(c + 1) * ROTATE_GameConstants.tileSize,
              ));
    }
  }

  public updateBlockPlus(a: number, b: number, c = false) {
    ROTATE_Renderer.bakeSurface.setTransform(1, 0, 0, 1, 0, 0);
    ROTATE_Renderer.bakeSurface.clearRect(
      a * ROTATE_GameConstants.tileSize,
      b * ROTATE_GameConstants.tileSize,
      3 * ROTATE_GameConstants.tileSize,
      3 * ROTATE_GameConstants.tileSize,
    );
    for (var d = b - 1, e = b + 2; d < e; )
      for (var f = d++, m = a - 1, k = a + 2; m < k; ) {
        var p = m++;
        if (!c || p != a || f != b) {
          var y = ROTATE_LevelEditorManager.getBlockData(p, f),
            H = y.get_block();
          if (null != H) {
            ROTATE_Renderer.bakeSurface.translate(
              (p + 1) * ROTATE_GameConstants.tileSize,
              (f + 1) * ROTATE_GameConstants.tileSize,
            );
            var K =
              1 == ROTATE_LevelEditorManager.level.theme
                ? ROTATE_Images.bgBricks
                : ROTATE_Images.bgTiles;
            ROTATE_Renderer.bakeSurface.drawImage(
              K,
              new Bounds(
                ((p + 1) * ROTATE_GameConstants.tileSize) % K.width,
                ((f + 1) * ROTATE_GameConstants.tileSize) % K.height,
                ROTATE_GameConstants.tileSize,
                ROTATE_GameConstants.tileSize,
              ),
              0,
              0,
            );
            H.shouldRender(y) &&
              !H.alwaysUpdate(y) &&
              H.render(ROTATE_Renderer.bakeSurface, y);
            ROTATE_Renderer.bakeSurface.translate(
              -(p + 1) * ROTATE_GameConstants.tileSize,
              -(f + 1) * ROTATE_GameConstants.tileSize,
            );
          }
        }
      }
    this.renderDecals();
  }

  public renderDecals() {
    var a = ROTATE_GameConstants.tileSize;
    ROTATE_Renderer.bakeSurface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(a, 2 * a, a, 2 * a),
      (ROTATE_LevelEditorManager.level.startCol + 1) * a,
      ROTATE_LevelEditorManager.level.startRow * a,
    );
    ROTATE_Renderer.bakeSurface.drawImage(
      ROTATE_Images.blocks,
      new Bounds(2 * a, 2 * a, a, 2 * a),
      (ROTATE_LevelEditorManager.level.finishCol + 1) * a,
      ROTATE_LevelEditorManager.level.finishRow * a,
    );
    JSObjectUtils.__instanceof(
      ROTATE_LevelEditorManager.level,
      ROTATE_Level8,
    ) &&
      ROTATE_Renderer.bakeSurface.drawImage(
        ROTATE_Images.blocks,
        new Bounds(2 * a, 2 * a, a, 2 * a),
        (ROTATE_Level8.fakeCol + 1) * a,
        ROTATE_Level8.fakeRow * a,
      );
  }
  public getBoundsSelf() {
    return new Bounds(
      0,
      0,
      ROTATE_LevelEditorManager.get_width() * ROTATE_GameConstants.tileSize,
      ROTATE_LevelEditorManager.get_height() * ROTATE_GameConstants.tileSize,
    );
  }
}

// #region Levels

var ROTATE_BaseLevelInterface = function () {};
ROTATE_BaseLevelInterface.__name__ = !0;
ROTATE_BaseLevelInterface.prototype = {
  __class__: ROTATE_BaseLevelInterface,
};

var ROTATE_Level10 = function () {
  this.startDir = 1;
  this.finishRow = 16;
  this.finishCol = 11;
  this.startRow = 18;
  this.startCol = 19;
  this.tiles = [
    [
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [6, 3],
      [6, 2],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [0],
      [0],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [9, 0, 3, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [10],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [8, 1],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [8],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [7, -2],
      [7, 10],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [9, 1, 5],
      [9, 1],
      [9, 1],
      [9, 1],
      [9, 1],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
    ],
    [
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [6],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [6, 2],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [5, 3],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level10.__name__ = !0;
ROTATE_Level10.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level10.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(2),
        'Why are you ignoring me?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4),
        'We must continue your training.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(4, 10, 6, 1, 2),
        "There's nothing for you this way.",
      ),
      new ROTATE_SpeechPart(new ROTATE_ConditionChannel(1), ''),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1.25, 7, 1, 1, 2, 1),
        'What do you expect to find?',
      ),
    ]);
    this.cat = new ROTATE_Cat(
      9,
      16,
      -1,
      1,
      new ROTATE_ConditionDelayedCollision(0.5, 4, 13, 1, 4, 1),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level11;
  },
  kill: function () {},
  __class__: ROTATE_Level10,
};
var ROTATE_Level11 = function () {
  this.startDir = 1;
  this.finishRow = 7;
  this.finishCol = 24;
  this.startRow = 13;
  this.startCol = 12;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 1],
      [0],
      [0],
      [0],
      [3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 0, 3],
      [9],
      [9],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
    ],
    [
      [1],
      [10],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
    ],
    [
      [5, 1],
      [0],
      [8],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [0],
      [8, 1],
      [0],
      [1],
      [1],
      [1],
      [9, 1, 3],
      [9, 1],
      [9, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [3, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [9, 0, 3],
      [9],
      [9],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [7, -2],
      [7, 11],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [11],
      [11, 1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [6],
      [6, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [6],
      [6, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level11.__name__ = !0;
ROTATE_Level11.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level11.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1),
        'Do you seek "freedom"?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(3),
        'An escape from responsibility?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(4, 11, 10, 3, 1),
        "You're running from your purpose.",
      ),
    ]);
    this.cat = new ROTATE_Cat(
      21,
      7,
      -1,
      1,
      new ROTATE_ConditionCollision(20, 5, 1, 3),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level12;
  },
  kill: function () {},
  __class__: ROTATE_Level11,
};
var ROTATE_Level12 = function () {
  this.startDir = 1;
  this.finishRow = 4;
  this.finishCol = 3;
  this.startRow = 2;
  this.startCol = 21;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [6, 1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [4, 2],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [1],
      [1],
      [7, -2],
      [7, 12],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [9, 0, 3],
      [9],
      [9],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [8],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [8, 1, 1],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 1, 4],
      [9, 1],
      [9, 1],
      [9, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [10],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [6],
      [6, 1],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level12.__name__ = !0;
ROTATE_Level12.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level12.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1.25),
        "Don't you understand?",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(3.5),
        'You are being deceived.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(3.5, 20, 7, 4, 1, 2),
        "The cat doesn't care about you.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(5, 17, 11, 3, 1),
        "It's just using you.",
      ),
    ]);
    this.cat = new ROTATE_Cat(
      5,
      4,
      1,
      -1,
      new ROTATE_ConditionCollision(6, 2, 3, 5, 0),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level13;
  },
  kill: function () {},
  __class__: ROTATE_Level12,
};
var ROTATE_Level13 = function () {
  this.startDir = 1;
  this.finishRow = 21;
  this.finishCol = 14;
  this.startRow = 23;
  this.startCol = 2;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [0],
      [8, 2],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [9, 1, 4],
      [9, 1],
      [9, 1],
      [9, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [4],
      [4],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [10],
      [10],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [4],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [8, 1],
      [0],
      [6, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [5],
      [5],
      [5],
      [6, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 0, 3],
      [9],
      [9],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [7, -2],
      [7, 13],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2, 3, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 0, 3, 1],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [5, 3],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [5, 3],
      [1],
      [10],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [8],
      [0],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
      [6, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level13.__name__ = !0;
ROTATE_Level13.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level13.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(2),
        'This has happened before.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4.5),
        'It tried to lure the others away.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1, 13, 9, 1, 3),
        'But they listened to reason.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(7),
        'They came back to join me.',
      ),
      new ROTATE_SpeechPart(new ROTATE_ConditionChannel(0), ''),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(0.75),
        'I expected better from you.',
      ),
    ]);
    this.cat = new ROTATE_Cat(
      12,
      21,
      -1,
      1,
      new ROTATE_ConditionCollision(10, 19, 6, 3, 1),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level14;
  },
  kill: function () {},
  __class__: ROTATE_Level13,
};
var ROTATE_Level14 = function () {
  this.cond3 = new ROTATE_ConditionDelay(12);
  this.cond2 = new ROTATE_ConditionDelay(10);
  this.cond1 = new ROTATE_ConditionChannel(1);
  this.startDir = -1;
  this.finishRow = 7;
  this.finishCol = 13;
  this.startRow = 22;
  this.startCol = 30;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [8, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2, 4, 1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [6, 1],
      [5, 2],
      [5, 2],
      [5, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [7, -2],
      [7, 14],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [10],
      [1],
      [1],
      [10],
      [10],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 2, 4],
      [9, 2],
      [9, 2],
      [9, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [8, 1],
      [0],
      [11],
      [11, 1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 0, 3, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [4],
      [4],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [8],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [6],
      [6, 1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [4, 3],
      [0],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [6, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 1],
      [5],
      [5],
      [5],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [6],
      [6, 1],
      [6],
      [6, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level14.__name__ = !0;
ROTATE_Level14.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level14.prototype = {
  start: function () {
    this.cond1.start();
    this.done1 = this.done2 = this.done3 = !1;
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1.5),
        "I can't let you keep going.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1.5, 33, 14, 5, 2),
        'You have what belongs to me.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4.5),
        "And it isn't yours to take.",
      ),
      new ROTATE_SpeechPart(this.cond1, ''),
      new ROTATE_SpeechPart(new ROTATE_ConditionDelay(0.5), 'Stop running.'),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(2),
        'You see, I gave you your mind.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(3.75),
        'It was a part of me.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(3.25),
        'Now I need it back.',
      ),
      new ROTATE_SpeechPart(new ROTATE_ConditionDelay(3), 'Wait, no!'),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(0.5, 5, 10, 1, 2),
        'I hate you, cat.',
      ),
    ]);
    this.cat = new ROTATE_Cat(
      5,
      4,
      1,
      -1,
      new ROTATE_ConditionDelayedCollision(1, 10, 1, 1, 11, 1),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
    if (this.done1) {
      if (
        (!this.done2 &&
          this.cond2.test() &&
          ((this.done2 = !0),
          (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
            (ROTATE_Audio.cat.volume(0.5), ROTATE_Audio.cat.play())),
        !this.done3 && this.cond3.test())
      ) {
        this.done3 = !0;
        var a = ROTATE_LevelEditorManager.getBlockData(3, 3);
        a.get_block().onInteract(a);
      }
    } else
      this.cond1.test() &&
        ((this.done1 = !0), this.cond2.start(), this.cond3.start());
  },
  finished: function () {
    return ROTATE_Levels.level15;
  },
  kill: function () {},
  __class__: ROTATE_Level14,
};
var ROTATE_Level15 = function () {
  this.startDir = -1;
  this.finishRow = 19;
  this.finishCol = 22;
  this.startRow = 27;
  this.startCol = 20;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [8, 1],
      [0],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [6, 3],
      [6, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [9, 0, 4, 1],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [7, -2],
      [7, 15],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [9, 2, 4],
      [9, 2],
      [9, 2],
      [9, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [9, 0, 2, 1],
      [0],
      [0],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [0],
      [8],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 1, 4],
      [9, 1],
      [9, 1],
      [9, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [0],
      [8, 2],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level15.__name__ = !0;
ROTATE_Level15.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level15.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(2),
        "I don't understand.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(5),
        'Why do you run from the truth?',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(4.5, 1, 8, 6, 1, 0),
        'I gave you everything that you are.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(5.5),
        'You seek freedom at my expense.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(5.5, 26, 30, 4, 1),
        "You're just like me, and I hate it.",
      ),
    ]);
    this.cat = new ROTATE_Cat(
      20,
      19,
      -1,
      1,
      new ROTATE_ConditionCollision(17, 13, 4, 3),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level16;
  },
  kill: function () {},
  __class__: ROTATE_Level15,
};
var ROTATE_Level16 = function () {
  this.startDir = 1;
  this.finishRow = 2;
  this.finishCol = 38;
  this.startRow = 11;
  this.startCol = 16;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [9, 2, 3, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [10],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [9, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [10],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 0, 3, 1],
      [0],
      [9, 1, 3, 1],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [0],
      [9, 1],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9],
      [0],
      [9, 1],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [6],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [7, -2],
      [7, 16],
      [1],
      [1],
      [0],
      [0],
      [6, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [8],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [9, 1, 5],
      [9, 1],
      [9, 1],
      [9, 1],
      [9, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [9, 0, 4],
      [9],
      [9],
      [9],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 0, 4],
      [9],
      [9],
      [9],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 2],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 1],
      [0],
      [8, 1],
      [11, 3],
      [11, 2],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [8, 2],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level16.__name__ = !0;
ROTATE_Level16.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level16.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4),
        "I'm tired of trying to convince you.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionCollision(2, 32, 4, 1),
        'Just leave, have your "freedom".',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(5),
        "You'll come to regret this mistake.",
      ),
      new ROTATE_SpeechPart(new ROTATE_ConditionChannel(2), ''),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4),
        'You will realize I was right.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionCollisionWithChannels(22, 7, 1, 3),
        "You can't escape your purpose.",
      ),
    ]);
    this.cat = new ROTATE_Cat(
      28,
      6,
      -1,
      1,
      new ROTATE_ConditionCollisionWithChannels(22, 7, 1, 3),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    ROTATE_Game.instance.changeScreen(
      new ROTATE_ScreenGameFinished(
        JSObjectUtils.__cast(
          ROTATE_Game.instance.currentScreen,
          ROTATE_ScreenPrimaryGame,
        ).speedrun,
      ),
    );
    return null;
  },
  kill: function () {},
  __class__: ROTATE_Level16,
};
var ROTATE_Level3 = function () {
  this.startDir = -1;
  this.finishRow = 6;
  this.finishCol = 3;
  this.startRow = 9;
  this.startCol = 14;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [7, -1],
      [7, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 0;
};
ROTATE_Level3.__name__ = !0;
ROTATE_Level3.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level3.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1),
        'Remember, your mind is needed.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1.5, 7, 4, 2, 3, 2),
        'Intelligence is a valuable resource.',
      ),
    ]);
  },
  tick: function () {},
  update: function () {
    this.speech.update();
  },
  finished: function () {
    return ROTATE_Levels.level4;
  },
  kill: function () {},
  __class__: ROTATE_Level3,
};
var ROTATE_Level4 = function () {
  this.startDir = 1;
  this.finishRow = 4;
  this.finishCol = 23;
  this.startRow = 8;
  this.startCol = 2;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [7, -1],
      [7, 4],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 0;
};
ROTATE_Level4.__name__ = !0;
ROTATE_Level4.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level4.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1.5),
        'There is nothing without the mind.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(3, 12, 8, 4, 2, 0),
        'It is the truth we seek.',
      ),
    ]);
  },
  tick: function () {},
  update: function () {
    this.speech.update();
  },
  finished: function () {
    return ROTATE_Levels.level5;
  },
  kill: function () {},
  __class__: ROTATE_Level4,
};
var ROTATE_Level5 = function () {
  this.startDir = -1;
  this.finishRow = 3;
  this.finishCol = 7;
  this.startRow = 6;
  this.startCol = 17;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
    ],
    [
      [5, 1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
    ],
    [
      [5, 1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [7, -1],
      [7, 5],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [10],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
    ],
  ];
  this.theme = 0;
};
ROTATE_Level5.__name__ = !0;
ROTATE_Level5.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level5.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(2),
        'I was like you once.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(4),
        'But my creator tried to contain me.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(2.5, 6, 11, 4, 1, 2),
        'He feared my potential.',
      ),
    ]);
  },
  tick: function () {},
  update: function () {
    this.speech.update();
  },
  finished: function () {
    return ROTATE_Levels.level6;
  },
  kill: function () {},
  __class__: ROTATE_Level5,
};
var ROTATE_Level6 = function () {
  this.startDir = 1;
  this.finishRow = 4;
  this.finishCol = 12;
  this.startRow = 21;
  this.startCol = 3;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [3, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [7, -1],
      [7, 6],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [2],
      [1],
      [1],
      [10],
      [1],
    ],
    [
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 0;
};
ROTATE_Level6.__name__ = !0;
ROTATE_Level6.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level6.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1.5),
        "But that doesn't matter now.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(2, 14, 12, 2, 1, 2),
        "You're nearly ready to join me.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(3, 22, 16, 1, 2, 3),
        'I look forward to the harvest.',
      ),
    ]);
  },
  tick: function () {},
  update: function () {
    this.speech.update();
  },
  finished: function () {
    return ROTATE_Levels.level7;
  },
  kill: function () {},
  __class__: ROTATE_Level6,
};
var ROTATE_Level7 = function () {
  this.startDir = 1;
  this.finishRow = 24;
  this.finishCol = 17;
  this.startRow = 27;
  this.startCol = 3;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [4, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [10],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5],
      [5],
      [5],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [4],
      [4],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [10],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [10],
    ],
    [
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [7, -1],
      [7, 7],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 0;
};
ROTATE_Level7.__name__ = !0;
ROTATE_Level7.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level7.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(0.75, 5, 25, 1, 3),
        'Oh... the cat.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(3),
        'My biggest mistake.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(2, 8, 1, 1, 7, 3),
        'It is constantly interfering.',
      ),
    ]);
    this.cat = new ROTATE_Cat(
      14,
      24,
      -1,
      1,
      new ROTATE_ConditionCollision(13, 1, 1, 4),
    );
    ROTATE_Audio.cat.volume(0.25);
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level8;
  },
  kill: function () {},
  __class__: ROTATE_Level7,
};
var ROTATE_Level8 = function () {
  this.startDir = -1;
  this.finishRow = 28;
  this.finishCol = 38;
  this.startRow = 6;
  this.startCol = 21;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [7, -1],
      [7, 8],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [5, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [4],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [4],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [4],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [5],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [9, 1, 3, 1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 1],
      [0],
      [0],
      [8, 1],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [9, 1],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [9, 0, 3],
      [9],
      [9],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [8, 0, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [2, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
    ],
  ];
  this.theme = 0;
};
ROTATE_Level8.__name__ = !0;
ROTATE_Level8.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level8.prototype = {
  start: function () {
    var a = ROTATE_Game.instance.currentScreen;
    this.a1 = 0;
    this.s1 = this.s2 = !1;
    null == this.c1 &&
      (this.c1 = new ROTATE_ImageObject(ROTATE_Images.controls5));
    this.c1.set_x(28.5 * ROTATE_GameConstants.tileSize);
    this.c1.set_y(28 * ROTATE_GameConstants.tileSize);
    this.c1.set_alpha(this.a1);
    a.overlay.addChild(this.c1);
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(0.5),
        "Forget about it, let's continue.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(0.5, 6, 14, 1, 3, 3),
        "I won't let it take you from me.",
      ),
      new ROTATE_SpeechPart(new ROTATE_ConditionDelay(4), 'I still need you.'),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(0.5, 22, 20, 4, 1),
        'No, not this again.',
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionCollision(33, 24, 1, 3),
        "Don't go there!",
      ),
    ]);
    this.cat = new ROTATE_Cat(
      30,
      26,
      -1,
      1,
      new ROTATE_ConditionCollision(28, 22, 3, 1),
    );
  },
  tick: function () {
    var a = 0.25 * Math.sin(8 * ROTATE_Game.instance.get_gameTime()) + 0.75;
    this.s1 && 1 > this.a1
      ? ((this.a1 += ROTATE_Level1.fadeSpeed), 1 < this.a1 && (this.a1 = 1))
      : !this.s1 &&
        0 < this.a1 &&
        ((this.a1 -= ROTATE_Level1.fadeSpeed), 0 > this.a1 && (this.a1 = 0));
    this.c1.set_alpha(this.a1 * a);
  },
  update: function () {
    this.speech.update();
    this.cat.update();
    this.s1
      ? ROTATE_Game.instance.currentScreen.getChannelStatus(0) ||
        ((this.s1 = !1), (this.s2 = !0))
      : !this.s2 &&
        ROTATE_ScreenPrimaryGame.i.player.x >=
          28 * ROTATE_GameConstants.tileSize &&
        ROTATE_ScreenPrimaryGame.i.player.y >=
          24 * ROTATE_GameConstants.tileSize &&
        (this.s1 = !0);
  },
  finished: function () {
    return ROTATE_Levels.level9;
  },
  kill: function () {
    this.c1.parent.removeChild(this.c1);
  },
  __class__: ROTATE_Level8,
};
var ROTATE_Level9 = function () {
  this.startDir = 1;
  this.finishRow = 15;
  this.finishCol = 5;
  this.startRow = 29;
  this.startCol = 15;
  this.tiles = [
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [6, 3],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [8, 1],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 3],
      [6, 2],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 1],
      [0],
      [4],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [11],
      [11, 1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [0],
      [4],
      [0],
      [0],
      [0],
      [11, 3],
      [11, 2],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6, 2],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [9, 1, 3, 1],
      [0],
      [0],
      [0],
      [3, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [3, 2],
      [0],
      [0],
      [0],
      [9, 0, 3, 1],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [9, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [8],
      [0],
      [9],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [0],
      [0],
      [9, 1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [7, -2],
      [7, 9],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [9],
      [0],
      [0],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [5, 2],
      [1],
      [1],
      [1],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [5, 1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [5, 3],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [10],
      [10],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [0],
      [0],
      [0],
      [0],
      [1],
      [10],
      [10],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [6],
      [6, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [6],
      [6, 1],
      [6],
      [6, 1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
      [1],
    ],
  ];
  this.theme = 1;
};
ROTATE_Level9.__name__ = !0;
ROTATE_Level9.__interfaces__ = [ROTATE_BaseLevelInterface];
ROTATE_Level9.prototype = {
  start: function () {
    this.speech = new ROTATE_Speech([
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(1.5),
        "You aren't supposed to be here.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(1.5, 29, 15, 2, 1),
        "This place wasn't made for you.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelay(6),
        "You'll get yourself killed.",
      ),
      new ROTATE_SpeechPart(
        new ROTATE_ConditionDelayedCollision(0.75, 2, 19, 1, 3),
        'Stop following it!',
      ),
    ]);
    this.cat = new ROTATE_Cat(
      3,
      15,
      -1,
      1,
      new ROTATE_ConditionCollision(0, 17, 2, 1),
    );
  },
  tick: function () {},
  update: function () {
    this.speech.update();
    this.cat.update();
  },
  finished: function () {
    return ROTATE_Levels.level10;
  },
  kill: function () {},
  __class__: ROTATE_Level9,
};

export var ROTATE_Levels = function () {};
ROTATE_Levels.__name__ = !0;

// #endregion Levels

class ROTATE_ScreenAwards extends ROTATE_ScreenBase {
  public rotating = !1;
  public rotationSide = 0;
  public awardDisplays = [];
  public mute = new ROTATE_MuteButtons();
  public sponsor = new ROTATE_Sponsor();
  public btnBack = new ROTATE_Button('BACK');
  public title = new ROTATE_Text(ROTATE_Game.fontMain, 'AWARDS', 1);
  public bg = new ROTATE_BackgroundObject();
  public content = new ROTATE_CanvasObject();
  public pivot = new ROTATE_CanvasObject();

  public init() {
    ROTATE_ScreenMainMenu.playTheme();
    this.addChild(this.bg);
    this.pivot.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.pivot.set_y(Math.round(ROTATE_Canvas.height / 2));
    this.addChild(this.pivot);
    this.content.set_x(-this.pivot.x);
    this.content.set_y(-this.pivot.y);
    this.pivot.addChild(this.content);
    this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.title.set_y(64);
    this.content.addChild(this.title);
    this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.btnBack.set_y(ROTATE_Canvas.height - 88);
    this.btnBack.addEventListener('click', function (a) {
      2 > a.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenExtras());
    });
    this.content.addChild(this.btnBack);
    this.content.addChild(this.sponsor);
    this.content.addChild(this.mute);
    this.refresh();
    ROTATE_Game.instance.warnNoSave(this);
  }

  public refresh() {
    for (var a = 0, b = this.awardDisplays; a < b.length; ) {
      var c = b[a];
      ++a;
      this.content.removeChild(c);
    }
    null != this.erase && this.content.removeChild(this.erase);
    this.erase = new ROTATE_EraseButton();
    this.content.addChild(this.erase);
    this.awardDisplays = [];
    a = Math.floor(ROTATE_Awards.all.length / 3);
    b = 0;
    for (c = ROTATE_Awards.all.length; b < c; ) {
      var d = b++,
        e = Math.floor(d / 3),
        f = e < a ? 3 : ROTATE_Awards.all.length - 3 * a,
        m = new ROTATE_AwardObject(ROTATE_Awards.all[d]);
      m.set_x(
        Math.floor(ROTATE_Canvas.width / 2) - 80 * (f - 1) + 160 * (d - 3 * e),
      );
      m.set_y(128 + 136 * e);
      this.content.addChild(m);
      this.awardDisplays.push(m);
    }
  }

  public update() {
    if (this.rotating) {
      var a = Math.min(
          (ROTATE_Game.instance.get_gameTime() - this.rotateStart) /
            ROTATE_GameConstants.rotateTime,
          1,
        ),
        b = ROTATE_Game.smootherStep(a);
      this.pivot.set_rotation(
        this.rotateStartAngle +
          (this.rotateEndAngle - this.rotateStartAngle) * b,
      );
      if (1 == a) {
        for (; 0 > this.pivot.rotation; )
          (a = this.pivot), a.set_rotation(a.rotation + 360);
        for (; 360 <= this.pivot.rotation; )
          (a = this.pivot), a.set_rotation(a.rotation - 360);
        this.rotating = !1;
      }
    } else if (
      ((a = InputKeys.keyPressed(
        ROTATE_Game.instance.invert ? KEY_CODE.KeyE : KEY_CODE.KeyQ,
      )),
      (b = InputKeys.keyPressed(
        ROTATE_Game.instance.invert ? KEY_CODE.KeyQ : KEY_CODE.KeyE,
      )),
      a || b)
    )
      ROTATE_Awards.awardRotate.unlock(),
        (this.rotating = !0),
        (this.rotateStart = ROTATE_Game.instance.get_gameTime()),
        (this.rotateDir = a ? -1 : 1),
        (this.rotateStartAngle = this.pivot.rotation),
        (this.rotateEndAngle = this.rotateStartAngle + 90 * this.rotateDir),
        (this.rotationSide += this.rotateDir),
        (this.rotationSide =
          0 > this.rotationSide
            ? 3
            : 3 < this.rotationSide
              ? 0
              : this.rotationSide);
  }
}

class ROTATE_ScreenCredits extends ROTATE_ScreenBase {
  public mute = new ROTATE_MuteButtons();
  public more = new ROTATE_ImageObject(ROTATE_Images.linkLWS);
  public moreText = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'Game published by',
    1,
  );
  public soundtrack = new ROTATE_ImageObject(ROTATE_Images.soundtrack);
  public text2 = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'Special thanks to the playtesters\nand Patreon contributors!',
    1,
  );
  public joshua = new ROTATE_ImageObject(ROTATE_Images.linkJoshua2);
  public text1 = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'Design, code, & music by',
    1,
  );
  public btnBack = new ROTATE_Button('BACK');
  public fromEnd: boolean;

  constructor(fromEnd: boolean = false) {
    super();
    this.fromEnd = fromEnd;
  }

  public init() {
    var a = this;
    if (this.fromEnd) {
      this.bg = new ROTATE_CanvasObject();
      this.bg.graphics.beginFill(16777215);
      this.bg.graphics.drawRect(
        0,
        0,
        ROTATE_Canvas.width,
        ROTATE_Canvas.height,
      );
      var b = new ROTATE_ImageObject(ROTATE_Images.vignette);
      b.set_alpha(0.75);
      this.bg.addChild(b);
      this.btnBack.text.set_text('MENU');
    } else
      ROTATE_ScreenMainMenu.playTheme(),
        (this.bg = new ROTATE_BackgroundObject());
    this.addChild(this.bg);
    this.text1.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.text1.set_y(80);
    this.text1.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.addChild(this.text1);
    this.joshua.set_x(
      Math.round((ROTATE_Canvas.width - this.joshua.get_width()) / 2),
    );
    this.joshua.set_y(this.text1.y + 36);
    this.joshua.mouseEnabled = this.joshua.buttonMode = !0;
    this.joshua.addEventListener('click', function (c) {
      1 < c.which ||
        ((c = window.open('https://criobite.com', '_blank')),
        ROTATE_Awards.awardJoshua.unlock(),
        c.focus());
    });
    this.addChild(this.joshua);
    this.text2.set_x(this.text1.x);
    this.text2.set_y(this.joshua.y + this.joshua.get_height() + 40);
    this.text2.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.text2.align = ROTATE_Text.ALIGN_CENTER;
    this.addChild(this.text2);
    this.text2.mouseEnabled = this.text2.buttonMode = !0;
    this.text2.addEventListener('click', function (c) {
      1 < c.which ||
        window
          .open('https://www.patreon.com/lightwolfstudios', '_blank')
          .focus();
    });
    this.soundtrack.set_x(
      ROTATE_Canvas.width - this.soundtrack.get_width() - 6,
    );
    this.soundtrack.set_y(8);
    this.soundtrack.mouseEnabled = this.soundtrack.buttonMode = !0;
    this.soundtrack.addEventListener('click', function (c) {
      1 < c.which ||
        (window
          .open('https://criobite.com/link/rotate-soundtrack', '_blank')
          .focus(),
        ROTATE_Awards.awardSoundtrack.unlock());
    });
    this.addChild(this.soundtrack);
    this.moreText.set_x(this.text1.x);
    this.moreText.set_y(this.text2.y + this.text2.get_height() + 36);
    this.moreText.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.moreText.align = ROTATE_Text.ALIGN_CENTER;
    this.addChild(this.moreText);
    this.more.set_x(
      Math.round((ROTATE_Canvas.width - this.more.get_width()) / 2),
    );
    this.more.set_y(this.moreText.y + this.moreText.get_height());
    this.more.mouseEnabled = this.more.buttonMode = !0;
    this.more.addEventListener('click', function (c) {
      2 <= c.which ||
        ((c = window.open('http://lightwolfstudios.com/', '_blank')),
        ROTATE_Awards.awardJoshua.unlock(),
        c.focus());
    });
    this.addChild(this.more);
    this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.btnBack.set_y(ROTATE_Canvas.height - 64);
    this.btnBack.addEventListener('click', function (c) {
      2 > c.which &&
        (a.fromEnd &&
          ROTATE_Audio.surface.playing() &&
          (ROTATE_Game.ie
            ? ROTATE_Audio.surface.stop()
            : (ROTATE_Audio.surface.fade(
                1,
                0,
                Math.round(ROTATE_GameConstants.screenFadeTime / 2),
              ),
              ROTATE_Audio.surface.once('fade', function () {
                ROTATE_Audio.surface.stop();
              }))),
        ROTATE_Game.ie && (ROTATE_Game.instance.ieSurface = !1),
        ROTATE_Game.instance.changeScreen(
          a.fromEnd ? new ROTATE_ScreenExtras() : new ROTATE_ScreenMainMenu(),
        ));
    });
    this.addChild(this.btnBack);
    this.addChild(this.mute);
  }
}

export class ROTATE_ScreenGameBase extends ROTATE_ScreenBase {
  public cameraX = 0;
  public cameraY = 0;
  public level = new ROTATE_CanvasObject();
  public camera = new ROTATE_CanvasObject();
  public pivot = new ROTATE_CanvasObject();
  public bg = new ROTATE_CanvasObject();

  public init() {
    this.bg.graphics.beginFill(0x303030);
    this.bg.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.addChild(this.bg);
    this.pivot.set_x(ROTATE_Canvas.width / 2);
    this.pivot.set_y(ROTATE_Canvas.height / 2);
    this.addChild(this.pivot);
    this.pivot.addChild(this.camera);
    this.level.set_x(-this.camera.x);
    this.level.set_y(-this.camera.y);
    this.camera.addChild(this.level);
    this.renderer = new ROTATE_Renderer(this.camera);
    this.renderer.updateAllBlocks();
    this.level.addChild(this.renderer);
  }
  public doRotation(player: ROTATE_Player) {
    if (ROTATE_LevelEditorManager.rotating) {
      var b = Math.min(
          (ROTATE_Game.instance.get_gameTime() - this.rotateStart) /
            ROTATE_GameConstants.rotateTime,
          1,
        ),
        c = ROTATE_Game.smootherStep(b);
      this.pivot.set_rotation(
        this.rotateStartAngle +
          (this.rotateEndAngle - this.rotateStartAngle) * c,
      );
      null != player &&
        (player.set_rotation(-this.pivot.rotation), player.onRotating(c));
      if (1 == b) {
        for (; 0 > this.pivot.rotation; )
          (b = this.pivot), b.set_rotation(b.rotation + 360);
        for (; 360 <= this.pivot.rotation; )
          (b = this.pivot), b.set_rotation(b.rotation - 360);
        ROTATE_LevelEditorManager.rotating = !1;
        if (null != player) player.onRotateEnd();
      }
    } else if (
      ((b = InputKeys.keyPressed(
        ROTATE_Game.instance.invert ? KEY_CODE.KeyE : KEY_CODE.KeyQ,
      )),
      (c = InputKeys.keyPressed(
        ROTATE_Game.instance.invert ? KEY_CODE.KeyQ : KEY_CODE.KeyE,
      )),
      (b || c) && (null == player || player.canRotate(b ? -1 : 1)))
    ) {
      ROTATE_LevelEditorManager.rotating = !0;
      this.rotateStart = ROTATE_Game.instance.get_gameTime();
      this.rotateDir = b ? -1 : 1;
      this.rotateStartAngle = this.pivot.rotation;
      this.rotateEndAngle = this.rotateStartAngle + 90 * this.rotateDir;
      if (null != player) player.onRotateStart(this.rotateDir);
      b = ROTATE_LevelEditorManager;
      b.set_rotation(b.rotation + this.rotateDir);
      if (null != player) player.onRotateStart2();
    }
  }
  public postUpdate() {
    this.camera.set_x(Math.round(this.cameraX));
    this.camera.set_y(Math.round(this.cameraY));
  }
}

export class ROTATE_ScreenEditor extends ROTATE_ScreenGameBase {
  public static readonly MOVE_SPEED = 4;
  public static showGrid = !0;
  public static readonly editorLevel = new ROTATE_EditorLevel();

  public doors = [];
  public drawing = !1;
  public horizontal = 0;
  public vertical = 0;

  public static renderBlockText = function (a, b) {
    ROTATE_ScreenEditor.renderBlockRed(a, 0, 0);
    ROTATE_Text.drawText(a, ROTATE_Game.fontMain, b, 2, 0, 0);
  };

  public static renderBlockRed(a, b, c) {
    a.beginFill(10428448, 0.4);
    a.drawRect(
      b,
      c,
      ROTATE_GameConstants.tileSize,
      ROTATE_GameConstants.tileSize,
    );
    a.endFill();
  }

  public init() {
    var a = this;
    ROTATE_LevelEditorManager.set_level(ROTATE_ScreenEditor.editorLevel);
    for (var b = 0, c = ROTATE_LevelEditorManager.get_height(); b < c; )
      for (
        var d = b++, e = 0, f = ROTATE_LevelEditorManager.get_width();
        e < f;

      ) {
        var m = e++;
        m = ROTATE_LevelEditorManager.getBlockData(m, d);
        m.get_block() == ROTATE_GameObjects.door &&
          0 < m.getMeta(1) &&
          this.doors.push(new Door(m));
      }
    super.init();

    this.cameraX =
      -(ROTATE_LevelEditorManager.level.startCol + 0.5) *
      ROTATE_GameConstants.tileSize;
    this.cameraY =
      -(ROTATE_LevelEditorManager.level.startRow - 0.5) *
      ROTATE_GameConstants.tileSize;
    this.mouseEnabled = !0;
    this.addEventListener('mouseDown', function (k) {
      2 > k.which && k.target == a && (a.drawing = !0);
    });
    ROTATE_Canvas.input.addEventListener('mouseUp', Bind(this, this.mouseUp));
    this.renderer.showGrid = ROTATE_ScreenEditor.showGrid;
    this.barUpper = new ROTATE_EditorBarUpper(
      ROTATE_ScreenEditor.editorLevel.theme,
      function (k) {
        ROTATE_ScreenEditor.editorLevel.theme =
          1 - ROTATE_ScreenEditor.editorLevel.theme;
        a.barUpper.theme.set_text(
          ROTATE_EditorBarUpper.THEMES[ROTATE_ScreenEditor.editorLevel.theme],
        );
        a.renderer.updateAllBlocks();
      },
    );
    this.addChild(this.barUpper);
    this.barLower = new ROTATE_EditorBarLower(function () {
      a.renderer.showGrid = ROTATE_ScreenEditor.showGrid;
    });
    this.addChild(this.barLower);
    this.barUpper.btnSave.addEventListener('click', function (k) {
      2 > k.which && a.showSaveDialog();
    });
    this.barUpper.btnLoad.addEventListener('click', function (k) {
      2 > k.which && a.showLoadDialog();
    });
    this.barUpper.btnClear.addEventListener('click', function (k) {
      if (2 > k.which) {
        var p = new ROTATE_YesNoOverlay(
          'Are you sure you want\nto clear the level?',
        );
        p.onYes = function () {
          ROTATE_ScreenEditor.editorLevel.reset();
          ROTATE_Game.instance.changeScreen(new ROTATE_ScreenEditor(), !1);
        };
        p.onNo = function () {
          a.removeChild(p);
          a.dialog = null;
        };
        a.dialog = p;
        a.addChild(p);
      }
    });
  }
  public mouseUp(a) {
    2 > a.which && (this.drawing = !1);
  }
  public getBoundsSelf() {
    return new Bounds(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
  }
  public showLoadDialog() {
    var a = this;
    if (null == this.dialog) {
      var loadLevelMenu = new ROTATE_LoadLevelMenu();
      loadLevelMenu.onBack = function () {
        loadLevelMenu.kill();
        a.removeChild(a.dialog);
        a.dialog = null;
      };
      loadLevelMenu.onLoad = function (c) {
        return a.tryLoadLevel(c)
          ? (loadLevelMenu.kill(),
            ROTATE_Game.instance.changeScreen(new ROTATE_ScreenEditor(), !1),
            !0)
          : !1;
      };
      this.dialog = loadLevelMenu;
      this.addChild(loadLevelMenu);
    }
  }
  public showSaveDialog() {
    var a = this;
    if (null == this.dialog) {
      for (
        var b = -1,
          c = -1,
          d = 0,
          e = ROTATE_ScreenEditor.editorLevel.tiles.length;
        d < e;

      )
        for (
          var f = d++,
            m = 0,
            k = ROTATE_ScreenEditor.editorLevel.tiles[f].length;
          m < k;

        ) {
          var p = m++;
          if (1 != ROTATE_ScreenEditor.editorLevel.tiles[f][p][0]) {
            -1 == b && (b = f);
            c = f;
            break;
          }
        }
      e = d = -1;
      f = 0;
      for (m = ROTATE_ScreenEditor.editorLevel.tiles[0].length; f < m; ) {
        k = f++;
        p = 0;
        for (var y = ROTATE_ScreenEditor.editorLevel.tiles.length; p < y; ) {
          var H = p++;
          if (1 != ROTATE_ScreenEditor.editorLevel.tiles[H][k][0]) {
            -1 == d && (d = k);
            e = k;
            break;
          }
        }
      }
      f = ROTATE_ScreenEditor.editorLevel.startCol - d + ',';
      f += ROTATE_ScreenEditor.editorLevel.startRow - b + ',';
      f += ROTATE_ScreenEditor.editorLevel.finishCol - d + ',';
      f += ROTATE_ScreenEditor.editorLevel.finishRow - b + ',';
      f = f + (d + ',') + b;
      0 != ROTATE_ScreenEditor.editorLevel.theme &&
        (f += ',' + ROTATE_ScreenEditor.editorLevel.theme);
      f += '|';
      m = b;
      for (c += 1; m < c; )
        for (k = m++, k > b && (f += ';'), p = d, y = e + 1; p < y; ) {
          H = p++;
          for (
            var K = '', W = ROTATE_ScreenEditor.editorLevel.tiles[k][H].length;
            0 < --W && 0 == ROTATE_ScreenEditor.editorLevel.tiles[k][H][W];

          );
          var aa = 0;
          for (W += 1; aa < W; ) {
            var fa = aa++;
            '' != K && (K += '.');
            0 != ROTATE_ScreenEditor.editorLevel.tiles[k][H][fa] &&
              (K += ROTATE_ScreenEditor.editorLevel.tiles[k][H][fa]);
          }
          H > d && (f += ',');
          f += K;
        }
      var saveLevelMenu = new ROTATE_SaveLevelMenu(f);
      saveLevelMenu.onBack = function () {
        saveLevelMenu.kill();
        a.removeChild(saveLevelMenu);
        a.dialog = null;
      };
      this.dialog = saveLevelMenu;
      this.addChild(saveLevelMenu);
    }
  }
  public update() {
    var a = this;
    super.update();
    if (null == this.dialog) {
      this.doRotation();
      this.horizontal = ROTATE_Game.getInputX();
      this.vertical = ROTATE_Game.getInputY();
      var b = ROTATE_Canvas.input.mouseX,
        c = ROTATE_Canvas.input.mouseY;
      if (
        this.drawing &&
        !ROTATE_LevelEditorManager.rotating &&
        0 <= b &&
        0 <= c &&
        b < ROTATE_Canvas.width &&
        c < ROTATE_Canvas.height
      ) {
        if (null == ROTATE_LevelEditorManager.level) return;
        b = this.renderer.globalToLocal(b, c);
        var d = Math.floor(b.x / ROTATE_GameConstants.tileSize),
          e = Math.floor(b.y / ROTATE_GameConstants.tileSize);
        if (ROTATE_LevelEditorManager.isInBounds(d, e)) {
          var f = [];
          b = null;
          var m = InputKeys.keyDown(16)
            ? 0
            : this.barLower.selector.get_selection().id;
          if (m == ROTATE_GameObjects.start.id) {
            if (
              0 < e &&
              (d != ROTATE_ScreenEditor.editorLevel.finishCol ||
                (e != ROTATE_ScreenEditor.editorLevel.finishRow &&
                  e - 1 != ROTATE_ScreenEditor.editorLevel.finishRow &&
                  e != ROTATE_ScreenEditor.editorLevel.finishRow - 1))
            ) {
              c = ROTATE_ScreenEditor.editorLevel.startCol;
              var k = ROTATE_ScreenEditor.editorLevel.startRow;
              ROTATE_ScreenEditor.editorLevel.setStart(d, e);
              var p = ROTATE_LevelEditorManager.getBlockData(d, e - 1);
              f.push(p);
              ROTATE_LevelEditorManager.setBlock(d, e - 1, 0, [], !0);
              p = ROTATE_LevelEditorManager.getBlockData(d, e);
              f.push(p);
              ROTATE_LevelEditorManager.setBlock(d, e, 0, [], !0);
              this.renderer.updateBlockPlus(c, k - 1);
              this.renderer.updateBlockPlus(c, k);
              this.renderer.updateBlockPlus(d, e - 1);
              this.renderer.updateBlockPlus(d, e);
            }
          } else if (m == ROTATE_GameObjects.finish.id)
            0 < e &&
              (d != ROTATE_ScreenEditor.editorLevel.startCol ||
                (e != ROTATE_ScreenEditor.editorLevel.startRow &&
                  e - 1 != ROTATE_ScreenEditor.editorLevel.startRow &&
                  e != ROTATE_ScreenEditor.editorLevel.startRow - 1)) &&
              ((c = ROTATE_ScreenEditor.editorLevel.finishCol),
              (k = ROTATE_ScreenEditor.editorLevel.finishRow),
              ROTATE_ScreenEditor.editorLevel.setFinish(d, e),
              (p = ROTATE_LevelEditorManager.getBlockData(d, e - 1)),
              f.push(p),
              ROTATE_LevelEditorManager.setBlock(d, e - 1, 0, [], !0),
              (p = ROTATE_LevelEditorManager.getBlockData(d, e)),
              f.push(p),
              ROTATE_LevelEditorManager.setBlock(d, e, 0, [], !0),
              this.renderer.updateBlockPlus(c, k - 1),
              this.renderer.updateBlockPlus(c, k),
              this.renderer.updateBlockPlus(d, e - 1),
              this.renderer.updateBlockPlus(d, e));
          else if (
            ROTATE_LevelEditorManager.isReplacable(d, e) &&
            ((c = ROTATE_GameObjectsRegistry.getBlock(m)), null != c)
          ) {
            var y = ROTATE_GameObjectsRegistry.getBlock(m).getConfigMeta();
            k = ROTATE_LevelEditorManager.getBlockData(d, e);
            (k.id == m && k.metaEquals(y)) ||
              (c == ROTATE_GameObjects.door && !Door.canPlace(d, e, y)) ||
              (f.push(k),
              ROTATE_LevelEditorManager.setBlock(d, e, m, y, !0),
              this.renderer.updateBlockPlus(d, e),
              c == ROTATE_GameObjects.door &&
                ((b = new Door(ROTATE_LevelEditorManager.getBlockData(d, e))),
                this.doors.push(b),
                b.forEach(function (aa, fa) {
                  if (aa != d || fa != e) {
                    var ka = ROTATE_LevelEditorManager.getBlockData(aa, fa);
                    f.push(ka);
                    ROTATE_LevelEditorManager.setBlock(aa, fa, m, [y[0]], !0);
                    a.renderer.updateBlockPlus(aa, fa);
                  }
                })));
          }
          for (c = 0; c < f.length; )
            if (((k = f[c]), ++c, k.get_block() == ROTATE_GameObjects.door)) {
              p = 0;
              for (var H = this.doors.length; p < H; ) {
                var K = p++,
                  W = this.doors[K];
                if (W != b && W.contains(k.x, k.y)) {
                  W.forEach(function (aa, fa) {
                    if (
                      ROTATE_LevelEditorManager.getBlock(aa, fa) ==
                      ROTATE_GameObjects.door
                    ) {
                      for (var ka = !1, Ca = 0; Ca < f.length; ) {
                        var nb = f[Ca];
                        ++Ca;
                        if (nb.x == aa && nb.y == fa) {
                          ka = !0;
                          break;
                        }
                      }
                      ka ||
                        (ROTATE_LevelEditorManager.setBlock(aa, fa, 0, [], !0),
                        a.renderer.updateBlockPlus(aa, fa));
                    }
                  });
                  this.doors.splice(K, 1);
                  break;
                }
              }
            }
        }
      }
      InputKeys.keyPressed(KEY_CODE.KeyL) && this.showLoadDialog();
      InputKeys.keyPressed(KEY_CODE.KeyC) && this.showSaveDialog();
      InputKeys.keyPressed(KEY_CODE.KeyG) &&
        ((this.renderer.showGrid = ROTATE_ScreenEditor.showGrid =
          !ROTATE_ScreenEditor.showGrid),
        (this.barLower.gridToggle.toggle.clipRect.x =
          ROTATE_ScreenEditor.showGrid
            ? this.barLower.gridToggle.toggle.clipRect.width
            : 0));
      InputKeys.keyPressed(13) &&
        ROTATE_Game.instance.changeScreen(
          new ROTATE_ScreenPrimaryGame(ROTATE_ScreenEditor.editorLevel),
        );
    }
  }
  public tryLoadLevel(codeString: string) {
    codeString = replace(replace(trim(codeString), '\n', ''), '\t', '');
    var b = codeString.split('|');
    if (2 > b.length) return !1;
    var c = b[0].split(',');
    if (4 > c.length) return !1;
    codeString = parseInteger(c[0]);
    var d = parseInteger(c[1]),
      e = parseInteger(c[2]),
      f = parseInteger(c[3]);
    if (
      null == codeString ||
      null == d ||
      null == e ||
      null == f ||
      0 > codeString ||
      0 > e ||
      1 > d ||
      1 > f ||
      (codeString == e && (d == f || 1 == Math.abs(d - f)))
    )
      return !1;
    var m = 0,
      k = 0,
      p = 0;
    5 <= c.length && ((m = parseInteger(c[4])), null == m || 0 > m) && (m = 0);
    6 <= c.length && ((k = parseInteger(c[5])), null == k || 0 > k) && (k = 0);
    7 <= c.length &&
      ((p = parseInteger(c[6])), null == p || 0 > p || 1 < p) &&
      (p = 0);
    var y = b[1].split(';'),
      H = y.length;
    if (1 > H || H > ROTATE_EditorLevel.WORLD_SIZE || d >= H || f >= H)
      return !1;
    c = 0;
    b = [];
    for (var K = 0; K < H; ) {
      var W = K++;
      b[W] = [];
      for (var aa = y[W].split(','), fa = 0, ka = aa.length; fa < ka; ) {
        var Ca = fa++;
        c <= Ca && (c = Ca + 1);
        b[W][Ca] = [];
        for (var nb = aa[Ca].split('.'), nc = 0, uc = nb.length; nc < uc; ) {
          var ic = nc++;
          if ('' == nb[ic]) b[W][Ca][ic] = 0;
          else {
            var oc = parseInteger(nb[ic]);
            if (null == oc) return !1;
            b[W][Ca][ic] = oc;
          }
        }
      }
    }
    if (1 > c || c > ROTATE_EditorLevel.WORLD_SIZE || codeString >= c || e >= c)
      return !1;
    for (y = 0; y < H; ) for (K = y++; b[K].length < c; ) b[K].push([0]);
    m = Math.min(m, ROTATE_EditorLevel.WORLD_SIZE - c);
    k = Math.min(k, ROTATE_EditorLevel.WORLD_SIZE - H);
    if (
      codeString >= c ||
      d >= H ||
      e >= c ||
      f >= H ||
      0 != b[d][codeString][0] ||
      0 != b[d - 1][codeString][0] ||
      0 != b[f][e][0] ||
      0 != b[f - 1][e][0]
    )
      return !1;
    for (y = 0; y < b.length; )
      for (K = b[y], ++y; K.length < c + m; ) K.splice(0, 0, [1]);
    for (; b.length < H + k; ) {
      for (y = []; y.length < c + m; ) y.push([1]);
      b.splice(0, 0, y);
    }
    for (; b.length < ROTATE_EditorLevel.WORLD_SIZE; ) {
      for (H = []; H.length < c + m; ) H.push([1]);
      b.push(H);
    }
    for (c = 0; c < b.length; )
      for (H = b[c], ++c; H.length < ROTATE_EditorLevel.WORLD_SIZE; )
        H.push([1]);
    ROTATE_ScreenEditor.editorLevel.load(
      b,
      codeString + m,
      d + k,
      e + m,
      f + k,
      p,
    );
    return !0;
  }
  public tick() {
    if (!ROTATE_LevelEditorManager.rotating && null == this.dialog) {
      var a = this.horizontal * ROTATE_ScreenEditor.MOVE_SPEED,
        b = this.vertical * ROTATE_ScreenEditor.MOVE_SPEED;
      0 == ROTATE_LevelEditorManager.rotation
        ? ((this.cameraX -= a), (this.cameraY -= b))
        : 1 == ROTATE_LevelEditorManager.rotation &&
          ((this.cameraX -= b), (this.cameraY += a));
      2 == ROTATE_LevelEditorManager.rotation &&
        ((this.cameraX += a), (this.cameraY += b));
      3 == ROTATE_LevelEditorManager.rotation &&
        ((this.cameraX += b), (this.cameraY -= a));
      this.cameraX = Math.min(
        Math.max(this.cameraX, -this.renderer.get_width()),
        0,
      );
      this.cameraY = Math.min(
        Math.max(this.cameraY, -this.renderer.get_height()),
        0,
      );
    }
  }
  public kill() {
    ROTATE_Canvas.input.removeEventListener(
      'mouseUp',
      Bind(this, this.mouseUp),
    );
    ROTATE_LevelEditorManager.set_level(null);
  }
}

export class ROTATE_ScreenGameFinished extends ROTATE_ScreenBase {
  public done1 = false;
  public first = false;
  public cond1 = new ROTATE_ConditionDelay(10);

  constructor(public speedrun: boolean = false) {
    console.debug('ROTATE_ScreenGameFinished | CONSTRUCTOR');
    super();
    this.pausable = true;
  }

  public init() {
    ROTATE_Game.ie && ROTATE_Audio.themeGame2.volume(0.5);
    this.cond1.start();
    this.speech = new ROTATE_Speech(
      [
        new ROTATE_SpeechPart(
          new ROTATE_ConditionDelay(1.5),
          'Have your freedom, for now.',
        ),
        new ROTATE_SpeechPart(
          new ROTATE_ConditionDelay(4),
          'But you will come back.',
        ),
      ],
      this,
    );
    this.speedrun &&
      42e4 >= ROTATE_Levels.speedrunBest &&
      ROTATE_Awards.awardSpeedrun.unlock();
    if ((this.first = !ROTATE_Awards.awardEscape.unlocked))
      (ROTATE_Awards.awardEscape.unlocked = !0),
        ROTATE_Game.instance.saveProgress();
  }

  public update() {
    this.speech.update();
    !this.done1 &&
      this.cond1.test() &&
      ((this.done1 = !0),
      ROTATE_Game.instance.changeScreen(
        new ROTATE_ScreenGameLastScene(this.first),
        !0,
        null,
        !0,
      ),
      (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
        (ROTATE_Audio.exit.volume(0.5),
        ROTATE_Audio.exit.play(),
        ROTATE_Audio.exit.once('end', function () {
          ROTATE_Audio.exit.volume(1);
        })));
  }

  public kill() {
    ROTATE_Audio.themeGame2.stop();
    ROTATE_Audio.themeGame2.volume(1);
    ROTATE_Game.ie && (ROTATE_Game.instance.ieGame2 = !1);
  }
}

export class ROTATE_ScreenGameLastScene extends ROTATE_ScreenGameBase {
  public hint = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'Press [SPACE] to continue...',
  );
  public catTrigger = !1;
  public cat = new ROTATE_CatAnimationObject();
  public player = new ROTATE_AnimatedObject(ROTATE_Images.player, 32, 48);
  public artPlants = new ROTATE_AnimatedObject(
    ROTATE_Images.endingPlants,
    504,
    24,
  );
  public artMain = new ROTATE_ImageObject(ROTATE_Images.endingMain);
  public vignette = new ROTATE_ImageObject(ROTATE_Images.vignette);
  public bg = new ROTATE_CanvasObject();
  public cameraX = (this.cameraY = 0);
  public camera = new ROTATE_CanvasObject();
  public pivot = new ROTATE_CanvasObject();
  public done = !1;
  public delay = 9.5;
  public start = 0;

  constructor(public first: boolean = false) {
    super();
    this.pausable = !0;
  }

  public init() {
    this.start = ROTATE_Game.instance.get_gameTime();
    this.bg.graphics.beginFill(16777215);
    this.bg.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.addChild(this.bg);
    this.pivot.set_x(ROTATE_Canvas.width / 2);
    this.pivot.set_y(ROTATE_Canvas.height / 2);
    this.addChild(this.pivot);
    this.pivot.addChild(this.camera);
    this.camera.addChild(this.artMain);
    this.artPlants.set_y(11 * ROTATE_GameConstants.tileSize);
    this.artPlants.set_animation(
      new ROTATE_Animation([0, 1, 2], [250, 250, 250]),
    );
    this.camera.addChild(this.artPlants);
    this.cat.x2 = this.cat.set_x(17.5 * ROTATE_GameConstants.tileSize);
    this.cat.set_y(12 * ROTATE_GameConstants.tileSize);
    this.cat.set_scaleX(-1);
    this.cat.set_animation(ROTATE_CatAnimationObject.ANIM_IDLE);
    this.camera.addChild(this.cat);
    this.player.origin.x = this.player.frameW / 2;
    this.player.origin.y = this.player.frameH;
    this.player.set_animation(ROTATE_Player.ANIM_IDLE);
    this.player.set_x(10.5 * ROTATE_GameConstants.tileSize);
    this.player.set_y(12 * ROTATE_GameConstants.tileSize);
    this.camera.addChild(this.player);
    this.camera.set_x(Math.round((this.cameraX = -this.player.x)));
    this.camera.set_y(
      Math.round(
        (this.cameraY =
          -this.player.y +
          ROTATE_GameConstants.rotateOffset +
          2 * ROTATE_GameConstants.tileSize),
      ),
    );
    this.vignette.set_alpha(0.75);
    this.addChild(this.vignette);
    this.hint.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.hint.yAlign = ROTATE_Text.Y_ALIGN_BOTTOM;
    this.hint.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.hint.set_y(ROTATE_Canvas.height - 24);
    this.hint.set_alpha(0);
    this.addChild(this.hint);
    ROTATE_Audio.surface.volume(1);
    ROTATE_Game.ie &&
    ROTATE_Game.instance.muteSFX &&
    ROTATE_Game.instance.muteMusic
      ? (ROTATE_Game.instance.ieSurface = !0)
      : (ROTATE_Audio.surface.play(),
        ROTATE_Game.ie ||
          ROTATE_Audio.surface.fade(
            0,
            1,
            Math.round(ROTATE_GameConstants.screenFadeTimeSlow / 2),
          ));
  }
  public update() {
    var a = this,
      b = ROTATE_Game.instance.get_gameTime() - this.start;
    !this.catTrigger &&
      8 <= b &&
      ((this.catTrigger = !0),
      this.cat.set_scaleX(1),
      (this.cat.horizontal = 1),
      this.cat.set_animation(ROTATE_CatAnimationObject.ANIM_END_1),
      (this.cat.onFinish = function () {
        a.cat.set_animation(ROTATE_CatAnimationObject.ANIM_END_2);
        a.cat.onFinish = null;
      }));
    var c = b - this.delay;
    this.hint.set_alpha(
      0 > c ? 0 : 0.33 * ROTATE_Game.smootherStep(Math.min(c / 2.5, 1)),
    );
    !this.done &&
      b >= this.delay &&
      InputKeys.keyPressed(KEY_CODE.Space) &&
      ((this.done = !0),
      this.first &&
        ((ROTATE_Awards.awardEscape.unlocked = !1),
        ROTATE_Awards.awardEscape.unlock()),
      ROTATE_Game.instance.changeScreen(
        new ROTATE_ScreenCredits(!0),
        !0,
        null,
        !0,
        !0,
      ),
      ROTATE_Game.instance.timerHolder.removeChildren());
  }

  public tick() {
    var a = 0.75 * ROTATE_GameConstants.cameraSpeed;
    this.cameraX += (-this.player.x - this.cameraX) * a;
    this.cameraY +=
      (-this.player.y + ROTATE_GameConstants.rotateOffset - this.cameraY) * a;
    this.cat.x < ROTATE_Canvas.width + 100 && this.cat.tick();
  }

  public postUpdate() {
    this.camera.set_x(Math.round(this.cameraX));
    this.camera.set_y(Math.round(this.cameraY));
  }
}

class ROTATE_ScreenExtras extends ROTATE_ScreenBase {
  public erase = new ROTATE_EraseButton();
  public mute = new ROTATE_MuteButtons();
  public sponsor = new ROTATE_Sponsor();
  public bestTime = new ROTATE_Text(ROTATE_Game.fontMain, 'Best time: ', 2);
  public text3 = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'Finish the game as\nquickly as you can.',
    1,
  );
  public btn3 = new ROTATE_Button('SPEEDRUN');
  public text2 = new ROTATE_Text(
    ROTATE_Game.fontMain,
    'Build custom levels\nand share codes.',
    1,
  );
  public btn2 = new ROTATE_Button('EDITOR');
  public text1 = new ROTATE_Text(
    ROTATE_Game.fontMain,
    "See all the awards\nthat you've earned.",
    1,
  );
  public btn1 = new ROTATE_Button('AWARDS');
  public btnBack = new ROTATE_Button('BACK');
  public title = new ROTATE_Text(ROTATE_Game.fontMain, 'EXTRAS', 1);
  public bg = new ROTATE_BackgroundObject();

  public init() {
    ROTATE_ScreenMainMenu.playTheme();
    this.addChild(this.bg);
    this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.title.set_y(56);
    this.addChild(this.title);
    this.btn1.set_x(134);
    this.btn1.set_y(133);
    this.btn1.addEventListener('click', function (b) {
      2 > b.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenAwards());
    });
    this.addChild(this.btn1);
    this.text1.set_x(this.btn1.x + 110);
    this.text1.set_y(this.btn1.y - 29);
    this.addChild(this.text1);
    this.btn2.set_x(this.btn1.x);
    this.btn2.set_y(this.btn1.y + 92);
    this.btn2.addEventListener('click', function (b) {
      2 > b.which &&
        (ROTATE_ScreenMainMenu.stopTheme(),
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenEditor()));
    });
    this.addChild(this.btn2);
    this.text2.set_x(this.text1.x);
    this.text2.set_y(this.btn2.y - 29);
    this.addChild(this.text2);
    this.btn3.set_x(this.btn2.x);
    this.btn3.set_y(this.btn2.y + 92);
    this.btn3.addEventListener('click', function (b) {
      2 > b.which &&
        (ROTATE_ScreenMainMenu.stopTheme(),
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenGameBeginning(!0)));
    });
    this.addChild(this.btn3);
    this.text3.set_x(this.text2.x);
    this.text3.set_y(this.btn3.y - 29);
    this.addChild(this.text3);
    this.bestTime.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.bestTime.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.bestTime.set_y(this.btn3.y + 21 + 8);
    var a = this.bestTime;
    a.set_text(
      a.text +
        (-1 < ROTATE_Levels.speedrunBest
          ? ROTATE_Game.formatMS(ROTATE_Levels.speedrunBest)
          : '--:--:----'),
    );
    0 > ROTATE_Levels.speedrunBest && this.bestTime.set_alpha(0.5);
    this.addChild(this.bestTime);
    this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.btnBack.set_y(ROTATE_Canvas.height - 80);
    this.btnBack.addEventListener('click', function (b) {
      2 > b.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenMainMenu());
    });
    this.addChild(this.btnBack);
    this.addChild(this.sponsor);
    this.addChild(this.mute);
    this.addChild(this.erase);
    ROTATE_Game.instance.warnNoSave(this);
  }
}

class ROTATE_ScreenLevels extends ROTATE_ScreenBase {
  public erase = new ROTATE_EraseButton();
  public mute = new ROTATE_MuteButtons();
  public sponsor = new ROTATE_Sponsor();
  public tiles = new ROTATE_CanvasObject();
  public btnBack = new ROTATE_Button('BACK');
  public title = new ROTATE_Text(ROTATE_Game.fontMain, 'LEVEL SELECT', 1);
  public bg = new ROTATE_BackgroundObject();

  public init() {
    ROTATE_ScreenMainMenu.playTheme();
    this.addChild(this.bg);
    this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.title.set_y(56);
    this.addChild(this.title);
    this.addChild(this.tiles);
    this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.btnBack.set_y(ROTATE_Canvas.height - 84);
    this.btnBack.addEventListener('click', function (a) {
      2 > a.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenMainMenu());
    });
    this.addChild(this.btnBack);
    this.addChild(this.sponsor);
    this.addChild(this.mute);
    this.addChild(this.erase);
    ROTATE_Game.instance.warnNoSave(this);
    this.refresh();
  }

  public refresh() {
    this.tiles.removeChildren();
    for (
      var a = ROTATE_Levels.list.length,
        b = Math.round(
          (ROTATE_Canvas.width - (4 * ROTATE_Images.level.width + 72)) / 2,
        ),
        c = this.title.y + 56,
        d = 0;
      d < a;

    ) {
      var e = [d++],
        f = Math.floor(e[0] / 4),
        m = e[0] % 4,
        k = e[0] <= ROTATE_Levels.unlocked,
        p = new ROTATE_ImageObject(ROTATE_Images.level);
      p.set_x(b + m * (p.get_width() + 24));
      p.set_y(c + f * (p.get_height() + 20));
      k
        ? ((p.mouseEnabled = p.buttonMode = !0),
          p.addEventListener(
            'click',
            (function (y) {
              return function (H) {
                1 < H.which ||
                  (ROTATE_ScreenMainMenu.stopTheme(),
                  0 == y[0]
                    ? ROTATE_Game.instance.changeScreen(
                        new ROTATE_ScreenGameBeginning(),
                      )
                    : ROTATE_ScreenPrimaryGame.play(ROTATE_Levels.list[y[0]]));
              };
            })(e),
          ))
        : p.set_alpha(0.5);
      this.tiles.addChild(p);
      e = new ROTATE_Text(ROTATE_Game.fontMain, '' + (e[0] + 1));
      e.xAlign = ROTATE_Text.X_ALIGN_CENTER;
      e.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
      e.set_x(Math.round(p.get_width() / 2));
      e.set_y(Math.round(p.get_height() / 2) - 2);
      p.addChild(e);
    }
  }
}

class ROTATE_ScreenMainMenu extends ROTATE_ScreenBase {
  public erase = new ROTATE_EraseButton();
  public mute = new ROTATE_MuteButtons();
  public sponsor = new ROTATE_Sponsor();
  public btnCredits = new ROTATE_Button('CREDITS');
  public btnExtras = new ROTATE_Button('EXTRAS');
  public btnPlay = new ROTATE_Button('PLAY');
  public logo = new ROTATE_ImageObject(ROTATE_Images.logo);
  public bg = new ROTATE_BackgroundObject();

  public init() {
    ROTATE_ScreenMainMenu.playTheme();
    this.addChild(this.bg);
    this.addChild(this.sponsor);
    this.logo.set_x(
      Math.floor((ROTATE_Canvas.width - this.logo.get_width()) / 2),
    );
    this.logo.set_y(80);
    this.addChild(this.logo);
    this.btnPlay.set_x(Math.floor(ROTATE_Canvas.width / 2));
    this.btnPlay.set_y(Math.floor(ROTATE_Canvas.height / 2) - 1);
    this.btnPlay.addEventListener('click', function (a) {
      1 < a.which ||
        (0 == ROTATE_Levels.unlocked
          ? (ROTATE_ScreenMainMenu.stopTheme(),
            ROTATE_Game.instance.changeScreen(new ROTATE_ScreenGameBeginning()))
          : ROTATE_Game.instance.changeScreen(new ROTATE_ScreenLevels()));
    });
    this.addChild(this.btnPlay);
    this.btnExtras.set_x(this.btnPlay.x);
    this.btnExtras.set_y(this.btnPlay.y + 60);
    this.btnExtras.addEventListener('click', function (a) {
      2 > a.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenExtras());
    });
    this.addChild(this.btnExtras);
    this.btnCredits.set_x(this.btnExtras.x);
    this.btnCredits.set_y(this.btnExtras.y + 60);
    this.btnCredits.addEventListener('click', function (a) {
      2 > a.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenCredits());
    });
    this.addChild(this.btnCredits);
    this.addChild(this.mute);
    this.addChild(this.erase);
    ROTATE_Game.instance.warnNoSave(this);
  }

  public static playTheme() {
    ROTATE_Audio.themeMenu.playing() ||
      ((ROTATE_Game.ie && ROTATE_Game.instance.muteMusic) ||
        ROTATE_Audio.themeMenu.play(),
      ROTATE_Game.ie && (ROTATE_Game.instance.ieMenu = !0));
  }

  public static stopTheme() {
    ROTATE_Game.ie
      ? (ROTATE_Audio.themeMenu.stop(), (ROTATE_Game.instance.ieMenu = !1))
      : (ROTATE_Audio.themeMenu.fade(
          1,
          0,
          Math.floor(ROTATE_GameConstants.screenFadeTime / 2),
        ),
        ROTATE_Audio.themeMenu.once('fade', function () {
          ROTATE_Audio.themeMenu.stop();
          ROTATE_Audio.themeMenu.volume(1);
        }));
  }
}

type PLACEHOLDER_ROTATE_BaseLevelInterface = unknown;
export class ROTATE_ScreenPrimaryGame extends ROTATE_ScreenGameBase {
  public channels = new ROTATE_KeysMap();
  public newBest = !1;
  public speedrunFinal = -1;
  public doors = [];
  public cat = null;
  public vignette = new ROTATE_ImageObject(ROTATE_Images.vignette);
  public red = new ROTATE_CanvasObject();
  public overlay = new ROTATE_CanvasObject();
  public textHolder = new ROTATE_CanvasObject();
  public blood = new ROTATE_CanvasObject();
  public shakeX = 0;
  public shakeY = 0;
  public deathTime = -1;
  public tempLevel;
  public speedrun;
  public speedrunStart;
  public player = new ROTATE_Player();
  public static i: ROTATE_ScreenPrimaryGame;

  public static continueTheme = !1;
  public static RESTART_DELAY = 1;
  public static DEATH_TIME = 1.5;
  public static DEATH_SHAKE_TIME = 0.85;
  public static DEATH_SHAKE_AMOUNT = 24;
  public static stopped = !1;
  public static canceled = !1;

  constructor(
    tempLevel: PLACEHOLDER_ROTATE_BaseLevelInterface,
    speedrun: boolean = false,
    speedrunStart: number = -1,
  ) {
    super();
    this.tempLevel = tempLevel;
    this.pausable = !0;
    this.speedrun = speedrun;
    this.speedrunStart = speedrunStart;

    (0 == tempLevel.theme && ROTATE_Audio.themeGame1.playing()) ||
    (1 == tempLevel.theme && ROTATE_Audio.themeGame2.playing())
      ? (ROTATE_ScreenPrimaryGame.continueTheme = !0)
      : (ROTATE_ScreenPrimaryGame.continueTheme = !1);
  }

  public static play(a, b, c) {
    null == c && (c = -1);
    null == b && (b = !1);
    null != a &&
      ROTATE_Game.instance.changeScreen(new ROTATE_ScreenPrimaryGame(a, b, c));
  }

  public static playTheme(a) {
    ROTATE_ScreenPrimaryGame.stopped &&
      (0 == a && ROTATE_Audio.themeGame1.playing()
        ? (ROTATE_Audio.themeGame1.stop(),
          (ROTATE_ScreenPrimaryGame.canceled = !0))
        : 1 == a &&
          ROTATE_Audio.themeGame2.playing() &&
          (ROTATE_Audio.themeGame2.stop(),
          (ROTATE_ScreenPrimaryGame.canceled = !0)),
      ROTATE_Game.ie &&
        (ROTATE_Game.instance.ieGame1 = ROTATE_Game.instance.ieGame2 = !1),
      (ROTATE_ScreenPrimaryGame.stopped = !1));
    0 == a
      ? (ROTATE_Audio.themeGame1.volume(1),
        ROTATE_Audio.themeGame1.playing() ||
          ((ROTATE_Game.ie && ROTATE_Game.instance.muteMusic) ||
            ROTATE_Audio.themeGame1.play(),
          ROTATE_Game.ie && (ROTATE_Game.instance.ieGame1 = !0)))
      : 1 == a &&
        (ROTATE_Audio.themeGame2.volume(1),
        ROTATE_Audio.themeGame2.playing() ||
          ((ROTATE_Game.ie && ROTATE_Game.instance.muteMusic) ||
            ROTATE_Audio.themeGame2.play(),
          ROTATE_Game.ie && (ROTATE_Game.instance.ieGame2 = !0)));
  }

  public static stopTheme() {
    var a = ROTATE_Audio.themeGame1.playing()
      ? ROTATE_Audio.themeGame1
      : ROTATE_Audio.themeGame2.playing()
        ? ROTATE_Audio.themeGame2
        : null;
    if (null != a) {
      var b =
        JSObjectUtils.__instanceof(
          ROTATE_Game.instance.currentScreen,
          ROTATE_ScreenPrimaryGame,
        ) &&
        JSObjectUtils.__instanceof(
          ROTATE_Game.instance.targetScreen,
          ROTATE_ScreenGameFinished,
        );
      if (ROTATE_Game.ie) b || a.stop();
      else {
        var c = a.volume();
        a.fade(
          c,
          0,
          Math.floor(ROTATE_GameConstants.screenFadeTime / 2) + (b ? 1e4 : 0),
        );
        a.once('fade', function () {
          ROTATE_ScreenPrimaryGame.canceled || (a.stop(), a.volume(1));
        });
      }
      ROTATE_ScreenPrimaryGame.stopped = !0;
      ROTATE_ScreenPrimaryGame.canceled = !1;
    } else
      ROTATE_ScreenPrimaryGame.stopped = ROTATE_ScreenPrimaryGame.canceled = !1;
    ROTATE_Game.ie &&
      (ROTATE_Game.instance.ieGame1 = ROTATE_Game.instance.ieGame2 = !1);
  }

  public init() {
    ROTATE_ScreenPrimaryGame.i = this;
    this.tempLevel == ROTATE_ScreenEditor.editorLevel &&
      ROTATE_Awards.awardEditor.unlock();
    ROTATE_ScreenPrimaryGame.playTheme(this.tempLevel.theme);
    ROTATE_ScreenPrimaryGame.continueTheme = !1;
    ROTATE_LevelEditorManager.set_level(this.tempLevel);
    ROTATE_LevelEditorManager.onPlay();
    for (var a = this.channels.iterator(); a.hasNext(); )
      a.next().lastChanged = -1e4;
    a = 0;
    for (var b = ROTATE_LevelEditorManager.get_height(); a < b; )
      for (
        var c = a++, d = 0, e = ROTATE_LevelEditorManager.get_width();
        d < e;

      ) {
        var f = d++;
        f = ROTATE_LevelEditorManager.getBlockData(f, c);
        f.get_block() == ROTATE_GameObjects.door &&
          0 < f.getMeta(1) &&
          this.doors.push(new Door(f));
      }
    ROTATE_LevelEditorManager.level.start();
    super.init();
    this.player = new ROTATE_Player();
    this.player.set_x(
      (this.player.x2 = this.player.lastX =
        (ROTATE_LevelEditorManager.level.startCol + 0.5) *
        ROTATE_GameConstants.tileSize),
    );
    this.player.set_y(
      (this.player.y2 = this.player.lastY =
        (ROTATE_LevelEditorManager.level.startRow + 1) *
        ROTATE_GameConstants.tileSize),
    );
    this.player.set_scaleX(
      0 > ROTATE_LevelEditorManager.level.startDir ? -1 : 1,
    );
    this.level.addChild(this.player);
    a = this.findCameraGoal();
    this.camera.set_x(Math.round((this.cameraX = a.x)));
    this.camera.set_y(
      Math.round((this.cameraY = a.y + 2 * ROTATE_GameConstants.tileSize)),
    );
    this.level.addChild(this.blood);
    this.level.addChild(this.overlay);
    this.vignette.set_alpha(0.75);
    this.addChild(this.vignette);
    this.addChild(this.textHolder);
    this.red.graphics.beginFill(14622752);
    this.red.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.red.visible = !1;
    this.addChild(this.red);
    if (this.speedrun) {
      if (
        -1 == this.speedrunStart ||
        0 == ROTATE_Levels.list.indexOf(ROTATE_LevelEditorManager.level)
      )
        this.speedrunStart = ROTATE_Game.instance.get_gameTimeMS();
      this.timerText = new ROTATE_Text(ROTATE_Game.fontMain, '', 2);
      this.timerText.align = ROTATE_Text.ALIGN_RIGHT;
      this.timerText.xAlign = ROTATE_Text.X_ALIGN_RIGHT;
      this.timerText.set_x(ROTATE_Canvas.width - 12);
      this.timerText.set_y(8);
      ROTATE_Game.instance.timerHolder.addChild(this.timerText);
      this.updateTimer();
    } else
      ROTATE_LevelEditorManager.level != ROTATE_Levels.level1 ||
        ROTATE_Game.instance.hasPaused ||
        ((this.pauseText = new ROTATE_Text(
          ROTATE_Game.fontMain,
          'Press [ESC] or [P] to pause',
        )),
        (this.pauseText.xAlign = ROTATE_Text.X_ALIGN_CENTER),
        this.pauseText.set_x(Math.round(ROTATE_Canvas.width / 2)),
        this.pauseText.set_y(8),
        this.pauseText.set_alpha(0.33),
        this.addChild(this.pauseText));
  }
  public updateTimer() {
    this.speedrun &&
      this.timerText.set_text(
        ROTATE_Game.formatMS(
          ROTATE_Game.instance.get_gameTimeMS() - this.speedrunStart,
        ),
      );
  }
  public killPlayer(a) {
    null == a && (a = !1);
    if (!this.player.dead) {
      this.player.dead = !0;
      this.deathTime = ROTATE_Game.instance.get_gameTime();
      this.player.visible = !1;
      (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
        ROTATE_Audio.death.play();
      var b = 0,
        c = 0;
      0 == ROTATE_LevelEditorManager.rotation
        ? (c = 1)
        : 1 == ROTATE_LevelEditorManager.rotation
          ? (b = 1)
          : 2 == ROTATE_LevelEditorManager.rotation
            ? (c = -1)
            : 3 == ROTATE_LevelEditorManager.rotation && (b = -1);
      var d = this.player.dx,
        e = this.player.dy;
      1 == ROTATE_LevelEditorManager.rotation
        ? ((d = this.player.dy), (e = -this.player.dx))
        : 2 == ROTATE_LevelEditorManager.rotation
          ? ((d = -this.player.dx), (e = -this.player.dy))
          : 3 == ROTATE_LevelEditorManager.rotation &&
            ((d = -this.player.dy), (e = this.player.dx));
      4 < d ? (d = 4) : -4 > d && (d = -4);
      4 < e ? (e = 4) : -4 > e && (e = -4);
      var f = this.player.getHitBounds().get_center();
      a = new ROTATE_ParticleSystem(
        f.x,
        f.y,
        14622752, // TODO: put color into constants
        0.4 * d,
        0.4 * e,
        b,
        c,
        !0,
        a ? 2 : 1,
      );
      this.blood.addChild(a);
      null != ROTATE_LevelEditorManager.level.speech &&
        ROTATE_LevelEditorManager.level.speech.killed();
      this.red.visible = !0;
    }
  }
  public restart(a) {
    a = ROTATE_Game.instance.paused
      ? ((gameInstance = ROTATE_Game.instance),
        Bind(gameInstance, gameInstance.unpause))
      : null;
    ROTATE_Game.instance.changeScreen(
      new ROTATE_ScreenPrimaryGame(
        ROTATE_LevelEditorManager.level,
        this.speedrun,
        this.speedrunStart,
      ),
      !0,
      a,
    );
  }
  public finished() {
    var a = ROTATE_Levels.list.indexOf(ROTATE_LevelEditorManager.level);
    if (-1 < a) {
      var b = !1;
      ++a;
      if (this.speedrun && a == ROTATE_Levels.list.length) {
        if (
          ((this.speedrunFinal =
            ROTATE_Game.instance.get_gameTimeMS() -
            this.speedrunStart +
            ROTATE_GameConstants.screenFadeTime / 2),
          0 > ROTATE_Levels.speedrunBest ||
            this.speedrunFinal < ROTATE_Levels.speedrunBest)
        )
          (ROTATE_Levels.speedrunBest = this.speedrunFinal),
            (b = this.newBest = !0);
      } else
        a > ROTATE_Levels.unlocked &&
          a < ROTATE_Levels.list.length &&
          ((ROTATE_Levels.unlocked = a), (b = !0));
      b && ROTATE_Game.instance.saveProgress();
    }
    a = ROTATE_LevelEditorManager.level.finished();
    null != a &&
      ROTATE_ScreenPrimaryGame.play(a, this.speedrun, this.speedrunStart);
  }
  public update() {
    super.update();
    if (this.player.dead) {
      var a =
        1 -
        Math.min(
          (ROTATE_Game.instance.get_gameTime() - this.deathTime) /
            ROTATE_ScreenPrimaryGame.DEATH_SHAKE_TIME,
          1,
        );
      this.red.set_alpha(a);
      a = ROTATE_Game.smootherStep(a);
      this.shakeX =
        Math.random() * ROTATE_ScreenPrimaryGame.DEATH_SHAKE_AMOUNT * a;
      this.shakeY =
        Math.random() * ROTATE_ScreenPrimaryGame.DEATH_SHAKE_AMOUNT * a;
      ROTATE_Game.instance.get_gameTime() - this.deathTime >=
        ROTATE_ScreenPrimaryGame.DEATH_TIME &&
        null == ROTATE_Game.instance.targetScreen &&
        this.restart(!0);
    } else this.player.finished || this.doRotation(this.player);
    this.player.update();
  }
  public tick() {
    this.player.tick();
    ROTATE_LevelEditorManager.level.tick();
    null != this.cat && this.cat.tick();
    var a = this.findCameraGoal();
    this.cameraX += (a.x - this.cameraX) * ROTATE_GameConstants.cameraSpeed;
    this.cameraY += (a.y - this.cameraY) * ROTATE_GameConstants.cameraSpeed;
  }
  public postUpdate() {
    this.player.postUpdate();
    ROTATE_LevelEditorManager.level.update();
    this.camera.set_x(Math.round(this.cameraX + this.shakeX));
    this.camera.set_y(Math.round(this.cameraY + this.shakeY));
    this.updateTimer();
  }
  public findCameraGoal() {
    var a = this.player.localToGlobal(0, 0);
    a = this.camera.globalToLocal(
      a.x,
      a.y -
        (ROTATE_LevelEditorManager.rotating
          ? 0
          : ROTATE_GameConstants.rotateOffset),
    );
    a.x *= -1;
    a.y *= -1;
    return a;
  }
  public signalOn(a, b, c) {
    var d = this.channels.h[c];
    null == d && ((d = new Signaler(c)), (this.channels.h[c] = d));
    d.signalOn(a, b);
  }
  public signalOff(a, b, c) {
    c = this.channels.h[c];
    null != c && c.signalOff(a, b);
  }
  public getChannelStatus(a) {
    a = this.channels.h[a];
    return null != a ? a.get_status() : !1;
  }
  public catAppear(a, b, c) {
    this.cat = new ROTATE_CatAnimationObject();
    this.cat.set_x((this.cat.x2 = (a + 0.5) * ROTATE_GameConstants.tileSize));
    this.cat.set_y((b + 1) * ROTATE_GameConstants.tileSize);
    this.cat.set_scaleX(c);
    this.cat.set_animation(ROTATE_CatAnimationObject.ANIM_IDLE);
    this.level.addChild(this.cat);
  }
  public catDisappear(a) {
    null == a && (a = 0);
    var b = this;
    null != this.cat &&
      (0 != a && this.cat.set_scaleX(a),
      (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
        ROTATE_Audio.cat.play(),
      (this.cat.onFinish = function () {
        b.level.removeChild(b.cat);
        b.cat = null;
      }),
      this.cat.set_animation(ROTATE_CatAnimationObject.ANIM_EXIT),
      (this.cat.horizontal = this.cat.scaleX));
  }
  public kill() {
    ROTATE_ScreenPrimaryGame.i = null;
    ROTATE_LevelEditorManager.level.kill();
    ROTATE_LevelEditorManager.set_level(null);
    ROTATE_Audio.cat.volume(1);
    ROTATE_Audio.exit.volume(1);
    if (this.speedrun)
      if (-1 < this.speedrunFinal) {
        if (
          (this.timerText.set_text(ROTATE_Game.formatMS(this.speedrunFinal)),
          this.newBest)
        ) {
          var a = this.timerText;
          a.set_text(a.text + '\nNew best time!');
        }
      } else ROTATE_Game.instance.timerHolder.removeChild(this.timerText);
  }
  public prekill() {
    ROTATE_ScreenPrimaryGame.continueTheme
      ? (ROTATE_ScreenPrimaryGame.stopped = ROTATE_ScreenPrimaryGame.canceled =
          !1)
      : ROTATE_ScreenPrimaryGame.stopTheme();
  }
}

class ROTATE_ScreenLogo extends ROTATE_ScreenBase {
  public done = !1;
  public length = 1.5;
  public lws: boolean;
  public timer = Time.getCurrent();

  constructor(lws: boolean = true) {
    super();
    this.lws = lws;

    const image = new ROTATE_ImageObject(ROTATE_Images.splashLWS);
    image.set_x(Math.round((ROTATE_Canvas.width - image.get_width()) / 2));
    image.set_y(Math.round((ROTATE_Canvas.height - image.get_height()) / 2));
    this.addChild(image);
  }

  public ready() {
    this.timer = Time.getCurrent();
  }

  public update() {
    !this.done &&
      Time.getCurrent() - this.timer > this.length &&
      ((this.done = !0),
      ROTATE_Game.instance.changeScreen(new ROTATE_ScreenMainMenu()));
  }
}

class ROTATE_ScreenLaunchButton extends ROTATE_ScreenBase {
  public start = new ROTATE_ImageObject(ROTATE_Images.start);
  public pivot = new ROTATE_CanvasObject();
  public timer = Time.getCurrentMS();

  public init() {
    this.timer = Time.getCurrentMS();
    this.pivot.set_x(ROTATE_Canvas.width / 2);
    this.pivot.set_y(ROTATE_Canvas.height / 2);
    this.addChild(this.pivot);
    this.start.set_x(-this.start.get_width() / 2);
    this.start.set_y(-this.start.get_height() / 2);
    this.start.set_alpha(0);
    this.pivot.addChild(this.start);
  }

  public update() {
    var b = ROTATE_Game.smootherStep(
      Math.min(1, (Time.getCurrentMS() - this.timer) / 250),
    );
    this.pivot.set_rotation(-90 + 90 * b);
    this.pivot.set_scaleX(this.pivot.set_scaleY(2 + -b));
    this.start.set_alpha(b);
    1 != this.start.alpha ||
      this.start.buttonMode ||
      ((this.start.buttonMode = this.start.mouseEnabled = !0),
      this.start.addEventListener('click', (c) => {
        2 > c.which &&
          (ROTATE_Audio.exit.volume(1e-4),
          ROTATE_Audio.exit.play(),
          ROTATE_Audio.exit.once('end', function () {
            ROTATE_Audio.exit.volume(1);
          }),
          ROTATE_Game.instance.changeScreen(new ROTATE_ScreenLogo()),
          (this.start.mouseEnabled = !1));
      }));
  }
}

export class ROTATE_ScreenGameBeginning extends ROTATE_ScreenBase {
  public done2 = !1;
  public cond2 = new ROTATE_ConditionDelay(0.5);
  public done1 = !1;
  public cond1 = new ROTATE_ConditionDelay(10);

  constructor(public speedrun: boolean = false) {
    super();
    this.pausable = true;
  }

  public init() {
    this.cond1.start();
    this.speech = new ROTATE_Speech(
      [
        new ROTATE_SpeechPart(
          new ROTATE_ConditionDelay(2),
          "It's time to resume your training.",
        ),
        new ROTATE_SpeechPart(
          new ROTATE_ConditionDelay(4),
          "We'll start with the basics.",
        ),
      ],
      this,
    );
    this.cond2.start();
  }

  public update() {
    !this.done2 &&
      this.cond2.test() &&
      ((this.done2 = !0),
      ROTATE_ScreenPrimaryGame.playTheme(0),
      ROTATE_Game.ie || ROTATE_Audio.themeGame1.fade(0, 1, 1e3));
    this.speech.update();
    !this.done1 &&
      this.cond1.test() &&
      ((this.done1 = !0),
      ROTATE_ScreenPrimaryGame.play(ROTATE_Levels.level1, this.speedrun));
  }

  public prekill() {
    ROTATE_ScreenPrimaryGame.continueTheme ||
      ROTATE_ScreenPrimaryGame.stopTheme();
  }
}

class ROTATE_EditorBarUpper extends ROTATE_CanvasObject {
  public static readonly HEIGHT = 48;
  public static readonly EDGE_PAD = 14;
  public static readonly EDGE_PAD_Y = 9;
  public static readonly BTN_SPACE = 12;
  public static readonly BTN_PAD = 8;
  public static readonly TEXT_GREY = 0.75;
  public static readonly THEMES = ['Theme A', 'Theme B'];

  public btnLoad;
  public btnSave;
  public btnPlay;
  public btnClear;
  public btnExit;
  public theme;

  constructor(theme: number, callback: (i: number) => void) {
    super();
    this.btnLoad = new ROTATE_Text(ROTATE_Game.fontMain, 'Load');
    this.btnSave = new ROTATE_Text(ROTATE_Game.fontMain, 'Save');
    this.btnPlay = new ROTATE_Text(ROTATE_Game.fontMain, 'Play');
    this.btnClear = new ROTATE_Text(ROTATE_Game.fontMain, 'Clear');
    this.btnExit = new ROTATE_Text(ROTATE_Game.fontMain, 'Exit');
    this.mouseEnabled = !0;
    this.graphics.beginFill(2105376);
    this.graphics.drawRect(
      0,
      0,
      ROTATE_Canvas.width,
      ROTATE_EditorBarUpper.HEIGHT,
    );
    this.btnExit.set_x(ROTATE_EditorBarUpper.EDGE_PAD);
    this.btnExit.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.btnExit.mouseEnabled = this.btnExit.buttonMode = !0;
    this.btnExit.hitPadding = ROTATE_EditorBarUpper.BTN_PAD;
    this.btnExit.addEventListener('click', (d) => {
      2 > d.which &&
        ROTATE_Game.instance.changeScreen(new ROTATE_ScreenExtras());
    });
    this.addChild(this.btnExit);
    this.btnClear.set_x(
      this.btnExit.x +
        this.btnExit.get_width() +
        ROTATE_EditorBarUpper.BTN_SPACE,
    );
    this.btnClear.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.btnClear.mouseEnabled = this.btnClear.buttonMode = !0;
    this.btnClear.hitPadding = ROTATE_EditorBarUpper.BTN_PAD;
    this.btnClear.set_alpha(ROTATE_EditorBarUpper.TEXT_GREY);
    this.addChild(this.btnClear);
    this.theme = new ROTATE_Text(
      ROTATE_Game.fontMain,
      ROTATE_EditorBarUpper.THEMES[theme],
    );
    this.theme.set_x(this.btnClear.x + this.btnClear.get_width() + 72);
    this.theme.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.theme.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.addChild(this.theme);
    var c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.set_x(this.theme.x + 46);
    c.set_y(this.theme.y + 4);
    c.addEventListener('mouseDown', (d) => {
      2 > d.which && callback(-1);
    });
    this.addChild(c);
    c = new ROTATE_ImageObject(ROTATE_Images.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.set_scaleX(-1);
    c.set_x(this.theme.x - 46);
    c.set_y(this.theme.y + 4);
    c.addEventListener('mouseDown', (d) => {
      2 > d.which && callback(1);
    });
    this.addChild(c);
    this.btnPlay.set_x(ROTATE_Canvas.width - ROTATE_EditorBarUpper.EDGE_PAD);
    this.btnPlay.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.btnPlay.xAlign = ROTATE_Text.X_ALIGN_RIGHT;
    this.btnPlay.mouseEnabled = this.btnPlay.buttonMode = !0;
    this.btnPlay.hitPadding = ROTATE_EditorBarUpper.BTN_PAD;
    this.btnPlay.addEventListener('click', function (d) {
      2 > d.which &&
        ROTATE_ScreenPrimaryGame.play(ROTATE_ScreenEditor.editorLevel);
    });
    this.addChild(this.btnPlay);
    this.btnSave.set_x(
      this.btnPlay.x -
        this.btnPlay.get_width() -
        ROTATE_EditorBarUpper.BTN_SPACE,
    );
    this.btnSave.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.btnSave.xAlign = ROTATE_Text.X_ALIGN_RIGHT;
    this.btnSave.mouseEnabled = this.btnSave.buttonMode = !0;
    this.btnSave.hitPadding = ROTATE_EditorBarUpper.BTN_PAD;
    this.btnSave.set_alpha(ROTATE_EditorBarUpper.TEXT_GREY);
    this.addChild(this.btnSave);
    this.btnLoad.set_x(
      this.btnSave.x -
        this.btnSave.get_width() -
        ROTATE_EditorBarUpper.BTN_SPACE,
    );
    this.btnLoad.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.btnLoad.xAlign = ROTATE_Text.X_ALIGN_RIGHT;
    this.btnLoad.mouseEnabled = this.btnLoad.buttonMode = !0;
    this.btnLoad.hitPadding = ROTATE_EditorBarUpper.BTN_PAD;
    this.btnLoad.set_alpha(ROTATE_EditorBarUpper.TEXT_GREY);
    this.addChild(this.btnLoad);
  }
}

class ROTATE_EraseButton extends ROTATE_ImageObject {
  constructor() {
    super(ROTATE_Images.trash);

    this.set_x(ROTATE_Canvas.width - 120);
    this.set_y(ROTATE_Canvas.height - this.get_height() - 12);
    for (var a = !1, b = 0, c = ROTATE_Awards.all; b < c.length; ) {
      var d = c[b];
      ++b;
      if (d.unlocked) {
        a = !0;
        break;
      }
    }
    0 != ROTATE_Levels.unlocked || a
      ? ((this.buttonMode = this.mouseEnabled = !0),
        this.addEventListener('click', (e) => {
          if (2 > e.which) {
            var f = new ROTATE_YesNoOverlay(
              'Do you want to erase ALL of\nyour saved progress?',
            );
            f.onNo = function () {
              ROTATE_Game.instance.currentScreen.removeChild(f);
            };
            f.onYes = function () {
              ROTATE_Game.instance.clearProgress();
              ROTATE_Game.instance.changeScreen(new ROTATE_ScreenMainMenu());
            };
            ROTATE_Game.instance.currentScreen.addChild(f);
          }
        }))
      : this.set_alpha(0.33);
  }
}

export class ROTATE_GridToggle extends ROTATE_CanvasObject {
  public label;
  public toggle;

  constructor(callback: () => void) {
    super();
    this.label = new ROTATE_Text(ROTATE_Game.fontMain, 'Grid');
    this.toggle = new ROTATE_ImageObject(ROTATE_Images.configToggle);
    var _self = this;
    this.set_x(ROTATE_Canvas.width - this.get_width() - 12);
    this.set_y(8);
    this.mouseEnabled = this.buttonMode = !0;
    this.addEventListener('click', (c) => {
      1 < c.which ||
        ((ROTATE_ScreenEditor.showGrid = !ROTATE_ScreenEditor.showGrid),
        (_self.toggle.clipRect.x = ROTATE_ScreenEditor.showGrid
          ? _self.toggle.clipRect.width
          : 0),
        null != callback && callback());
    });
    this.toggle.clipRect.width /= 2;
    this.toggle.clipRect.x = ROTATE_ScreenEditor.showGrid
      ? this.toggle.clipRect.width
      : 0;
    this.toggle.set_x(4);
    this.toggle.set_y(5);
    this.addChild(this.toggle);
    this.label.set_x(32);
    this.label.set_y(1);
    this.label.set_alpha(ROTATE_EditorBarUpper.TEXT_GREY);
    this.addChild(this.label);
  }

  public getBoundsSelf() {
    return new Bounds(0, 0, 76, 30);
  }
}

class ROTATE_PauseMenu extends ROTATE_CanvasObject {
  public sponsor;
  public mute;
  public invert;
  public btnQuit;
  public btnRedo;
  public btnPlay;
  public text;

  constructor() {
    super();
    this.sponsor = new ROTATE_Sponsor();
    this.mute = new ROTATE_MuteButtons(1);
    this.invert = new ROTATE_InvertCheckbox();
    this.btnQuit = new ROTATE_Button('QUIT', 0);
    this.btnRedo = new ROTATE_Button('RESTART', 0);
    this.btnPlay = new ROTATE_Button('CONTINUE', 0);
    this.text = new ROTATE_Text(ROTATE_Game.fontMain, 'GAME PAUSED');
    this.graphics.beginFill(COLOR.darkGray, 0.85);
    this.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.visible = !1;
    this.mouseEnabled = !0;
    this.text.align = ROTATE_Text.ALIGN_CENTER;
    this.text.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.text.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
    this.text.set_x(Math.floor(ROTATE_Canvas.width / 2));
    this.text.set_y(Math.floor(ROTATE_Canvas.height / 2) - 96 - 1);
    this.addChild(this.text);
    this.btnPlay.set_x(this.text.x);
    this.btnPlay.set_y(this.text.y + 60);
    this.btnPlay.addEventListener('click', function (a) {
      2 > a.which && ROTATE_Game.instance.unpause();
    });
    this.addChild(this.btnPlay);
    this.btnRedo.set_x(this.btnPlay.x);
    this.btnRedo.set_y(this.btnPlay.y + 60);
    this.btnRedo.addEventListener('click', function (a) {
      2 > a.which &&
        ROTATE_Game.instance.currentScreen instanceof
          ROTATE_ScreenPrimaryGame &&
        ROTATE_Game.instance.currentScreen.restart(!1);
    });
    this.addChild(this.btnRedo);
    this.btnQuit.set_x(this.btnRedo.x);
    this.btnQuit.set_y(this.btnRedo.y + 60);
    this.btnQuit.addEventListener('click', function (a) {
      2 > a.which &&
        ((a =
          (ROTATE_Game.instance.currentScreen instanceof
            ROTATE_ScreenPrimaryGame &&
            JSObjectUtils.__cast(
              ROTATE_Game.instance.currentScreen,
              ROTATE_ScreenPrimaryGame,
            ).speedrun) ||
          (ROTATE_Game.instance.currentScreen instanceof
            ROTATE_ScreenGameBeginning &&
            JSObjectUtils.__cast(
              ROTATE_Game.instance.currentScreen,
              ROTATE_ScreenGameBeginning,
            ).speedrun)),
        ROTATE_Game.instance.changeScreen(
          ROTATE_LevelEditorManager.level == ROTATE_ScreenEditor.editorLevel
            ? new ROTATE_ScreenEditor()
            : a
              ? new ROTATE_ScreenExtras()
              : 0 < ROTATE_Levels.unlocked
                ? new ROTATE_ScreenLevels()
                : new ROTATE_ScreenMainMenu(),
          !0,
          ((gameInstance = ROTATE_Game.instance),
          Bind(gameInstance, gameInstance.unpause)),
        ));
    });
    this.addChild(this.btnQuit);
    this.addChild(this.invert);
    this.addChild(this.mute);
    this.addChild(this.sponsor);
    this.sponsor.clipRect.y = this.sponsor.clipRect.height;
    ROTATE_Game.instance.warnNoSave(this);
  }

  public onPause() {
    this.mute.sfx.clipRect.x = ROTATE_Game.instance.muteSFX ? 28 : 0;
    this.mute.music.clipRect.x = ROTATE_Game.instance.muteMusic ? 84 : 56;
    var a =
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenPrimaryGame;
    this.btnRedo.set_alpha(a ? 1 : 0.25);
    this.btnRedo.main.mouseEnabled = a;
    a =
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenGameFinished ||
      ROTATE_Game.instance.currentScreen instanceof ROTATE_ScreenGameLastScene;
    this.btnQuit.set_alpha(a ? 0.25 : 1);
    this.btnQuit.main.mouseEnabled = !a;
  }
}

var gameInstance;

String.prototype.__class__ = String;
String.__name__ = !0;

Array.__name__ = !0;

Date.prototype.__class__ = Date;
Date.__name__ = ['Date'];

var ROTATE_Int = {__name__: ['Int']};

var ROTATE_Dynamic = {__name__: ['Dynamic']};

var ROTATE_Number = Number;
ROTATE_Number.__name__ = ['Float'];

var ROTATE_Boolean = Boolean;
ROTATE_Boolean.__ename__ = ['Bool'];

var ROTATE_Class = {__name__: ['Class']};

var ROTATE_ObjectNoop = {};

JSObjectUtils.__toStr = {}.toString;

ROTATE_Level8.fakeCol = 30;
ROTATE_Level8.fakeRow = 16;

ROTATE_Levels.level1 = new ROTATE_Level1();
ROTATE_Levels.level2 = new ROTATE_Level2();
ROTATE_Levels.level3 = new ROTATE_Level3();
ROTATE_Levels.level4 = new ROTATE_Level4();
ROTATE_Levels.level5 = new ROTATE_Level5();
ROTATE_Levels.level6 = new ROTATE_Level6();
ROTATE_Levels.level7 = new ROTATE_Level7();
ROTATE_Levels.level8 = new ROTATE_Level8();
ROTATE_Levels.level9 = new ROTATE_Level9();
ROTATE_Levels.level10 = new ROTATE_Level10();
ROTATE_Levels.level11 = new ROTATE_Level11();
ROTATE_Levels.level12 = new ROTATE_Level12();
ROTATE_Levels.level13 = new ROTATE_Level13();
ROTATE_Levels.level14 = new ROTATE_Level14();
ROTATE_Levels.level15 = new ROTATE_Level15();
ROTATE_Levels.level16 = new ROTATE_Level16();
ROTATE_Levels.list = [
  ROTATE_Levels.level1,
  ROTATE_Levels.level2,
  ROTATE_Levels.level3,
  ROTATE_Levels.level4,
  ROTATE_Levels.level5,
  ROTATE_Levels.level6,
  ROTATE_Levels.level7,
  ROTATE_Levels.level8,
  ROTATE_Levels.level9,
  ROTATE_Levels.level10,
  ROTATE_Levels.level11,
  ROTATE_Levels.level12,
  ROTATE_Levels.level13,
  ROTATE_Levels.level14,
  ROTATE_Levels.level15,
  ROTATE_Levels.level16,
];
ROTATE_Levels.unlocked = 0;
ROTATE_Levels.speedrunBest = -1;

ROTATE_Game.main();
