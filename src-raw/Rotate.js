(function (window) {
  const KEY_CODES = {
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowUp: 38,
    KeyA: 65,
    KeyD: 68,
    KeyE: 69,
    KeyQ: 81,
    KeyS: 83,
    KeyW: 87,
    Space: 32,
  };

  function D(a, b) {
    function c() {}
    c.prototype = a;
    var d = new c(),
      e;
    for (e in b) d[e] = b[e];
    b.toString !== Object.prototype.toString && (d.toString = b.toString);
    return d;
  }

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

  var dc = function () {
      return E.__string_rec(this, '');
    },
    ja = function () {};
  ja.__name__ = !0;

  ja.charCodeAt = function (str, index) {
    return str.charCodeAt(index);
  };

  ja.substr = function (a, b, c) {
    if (null == c) c = a.length;
    else if (0 > c)
      if (0 == b) c = a.length + c;
      else return '';
    return a.substr(b, c);
  };
  ja.iter = function (a) {
    return {
      cur: 0,
      arr: a,
      hasNext: function () {
        return this.cur < this.arr.length;
      },
      next: function () {
        return this.arr[this.cur++];
      },
    };
  };
  Math.__name__ = !0;
  var la = function () {};
  la.__name__ = !0;
  la.string = function (a) {
    return E.__string_rec(a, '');
  };
  la.parseInt = function (a) {
    var b = parseInt(a, 10);
    0 != b ||
      (120 != ja.charCodeAt(a, 1) && 88 != ja.charCodeAt(a, 1)) ||
      (b = parseInt(a));
    return isNaN(b) ? null : b;
  };
  var ma = function () {};
  ma.__name__ = !0;
  ma.isSpace = function (a, b) {
    var c = ja.charCodeAt(a, b);
    return 8 < c && 14 > c ? !0 : 32 == c;
  };
  ma.ltrim = function (a) {
    for (var b = a.length, c = 0; c < b && ma.isSpace(a, c); ) ++c;
    return 0 < c ? ja.substr(a, c, b - c) : a;
  };
  ma.rtrim = function (a) {
    for (var b = a.length, c = 0; c < b && ma.isSpace(a, b - c - 1); ) ++c;
    return 0 < c ? ja.substr(a, 0, b - c) : a;
  };
  ma.trim = function (a) {
    return ma.ltrim(ma.rtrim(a));
  };
  ma.replace = function (a, b, c) {
    return a.split(b).join(c);
  };
  var ROTATE_Canvas = function () {};
  ROTATE_Canvas.__name__ = !0;
  ROTATE_Canvas.set_background = function (color) {
    ROTATE_Canvas.background = color & -1;
    return ROTATE_Canvas.background;
  };
  ROTATE_Canvas.set_imageSmoothingEnabled = function (a) {
    ROTATE_Canvas.imageSmoothingEnabled = a;
    if (null != ROTATE_Canvas.ctx) {
      var b = ROTATE_Canvas.ctx;
      b.webkitImageSmoothingEnabled = a;
      b.mozImageSmoothingEnabled = a;
      b.msImageSmoothingEnabled = a;
      b.oImageSmoothingEnabled = a;
      b.imageSmoothingEnabled = a;
    }
    return a;
  };
  ROTATE_Canvas.start = function (
    container,
    width,
    height,
    background,
    transparent,
    gameInstance,
  ) {
    if (ROTATE_Canvas.started) return;
    if (gameInstance === null) return;

    ROTATE_Canvas.transparent = transparent;
    ROTATE_Canvas.width = width;
    ROTATE_Canvas.height = height;
    ROTATE_Canvas.set_background(background);
    ROTATE_Canvas.stage = gameInstance;
    window.setTimeout(function () {
      window.focus();
    }, 0);
    ROTATE_Canvas.setup(container);
    gameInstance.triggerEvent(new ROTATE_Event('added'));
    ROTATE_Manager._init();
    ROTATE_Canvas.loop();
    ROTATE_Canvas.started = true;
  };
  ROTATE_Canvas.setup = function (container) {
    ROTATE_Canvas.parent = container;
    var body = document.body;
    body.style.margin = '0';
    body.style.overflow = 'hidden';
    ROTATE_Canvas.canvas = document.createElement('canvas');
    ROTATE_Canvas.canvas.width = ROTATE_Canvas.width;
    ROTATE_Canvas.canvas.height = ROTATE_Canvas.height;
    ROTATE_Canvas.canvas.style.position = 'absolute';
    ROTATE_Canvas.canvas.style.left = ROTATE_Canvas.canvas.style.top = '0';
    ROTATE_Canvas.canvas.style.transform = 'translateZ(0px)';
    ROTATE_Canvas.canvas.style.cursor = 'default';
    container.appendChild(ROTATE_Canvas.canvas);
    ROTATE_Canvas.ctx = ROTATE_Canvas.canvas.getContext('2d', {
      alpha: ROTATE_Canvas.transparent,
    });
    ROTATE_Canvas.set_imageSmoothingEnabled(
      ROTATE_Canvas.imageSmoothingEnabled,
    );
    ROTATE_Canvas.surface = new Surface(ROTATE_Canvas.ctx);
    Time._reset();
    ROTATE_Canvas.input = new CanvasInput(ROTATE_Canvas.canvas);
    InputKeys._init();
    ROTATE_Canvas.input.addEventListener('click', ROTATE_Canvas.onClick);
    ROTATE_Canvas.input.addEventListener(
      'mouseDown',
      ROTATE_Canvas.onMouseDown,
    );
    ROTATE_Canvas.input.addEventListener('mouseUp', ROTATE_Canvas.onMouseUp);
    ROTATE_Canvas.input.addEventListener('move', ROTATE_Canvas.onMouseMove);
  };
  ROTATE_Canvas.loop = function () {
    Time._update();
    if (ROTATE_Manager.get_done())
      ROTATE_Canvas.wasLoaded ||
        (ROTATE_Manager.triggerEvent(new ROTATE_ManagerEvent('progress', 1)),
        (ROTATE_Canvas.lastProgress = 1),
        ROTATE_Manager.triggerEvent(new ROTATE_ManagerEvent('finished', 1)));
    else {
      var a = ROTATE_Manager.get_progress();
      a != ROTATE_Canvas.lastProgress &&
        (ROTATE_Manager.triggerEvent(new ROTATE_ManagerEvent('progress', a)),
        (ROTATE_Canvas.lastProgress = a));
    }
    ROTATE_Canvas.wasLoaded = ROTATE_Manager.get_done();
    var b = ROTATE_Canvas.scale;
    ROTATE_Canvas.scale =
      window.innerWidth / window.innerHeight <
      ROTATE_Canvas.width / ROTATE_Canvas.height
        ? window.innerWidth / ROTATE_Canvas.width
        : window.innerHeight / ROTATE_Canvas.height;
    var c = Math.round(ROTATE_Canvas.width * ROTATE_Canvas.scale);
    a = Math.round(ROTATE_Canvas.height * ROTATE_Canvas.scale);
    ROTATE_Canvas.scale != b &&
      ((ROTATE_Canvas.canvas.style.width = c + 'px'),
      (ROTATE_Canvas.canvas.style.height = a + 'px'));
    b = Math.floor((window.innerWidth - c) / 2);
    b != ROTATE_Canvas.offsetX &&
      ((ROTATE_Canvas.canvas.style.left =
        Math.floor((window.innerWidth - c) / 2) + 'px'),
      (ROTATE_Canvas.offsetX = b));
    c = Math.floor((window.innerHeight - a) / 2);
    c != ROTATE_Canvas.offsetY &&
      ((ROTATE_Canvas.canvas.style.top =
        Math.floor((window.innerHeight - a) / 2) + 'px'),
      (ROTATE_Canvas.offsetY = c));
    ROTATE_Canvas.updateMouseSprite();
    a =
      null != ROTATE_Canvas.mouseSprite && ROTATE_Canvas.mouseSprite.buttonMode
        ? 'pointer'
        : 'default';
    a != ROTATE_Canvas.lastCursor &&
      ((ROTATE_Canvas.canvas.style.cursor = a), (ROTATE_Canvas.lastCursor = a));
    var d = new ROTATE_Event('enterFrame');
    ROTATE_Canvas.stage.cascadingCallback(function (e) {
      e.triggerEvent(d);
    });
    d = new ROTATE_Event('exitFrame');
    ROTATE_Canvas.stage.cascadingCallback(function (e) {
      e.triggerEvent(d);
    });
    ROTATE_Canvas.render();
    ROTATE_Canvas.requestAnimationFrame(ROTATE_Canvas.loop);
  };
  ROTATE_Canvas.requestAnimationFrame = function (a) {
    var b = window;
    (b =
      b.requestAnimationFrame ||
      b.webkitRequestAnimationFrame ||
      b.mozRequestAnimationFrame ||
      b.oRequestAnimationFrame ||
      b.msRequestAnimationFrame)
      ? b(a)
      : window.setTimeout(a, 16);
  };
  ROTATE_Canvas.render = function () {
    ROTATE_Canvas.surface.reset();
    if (ROTATE_Canvas.transparent) {
      var a = ROTATE_Canvas.background >>> 24;
      255 > a &&
        ROTATE_Canvas.surface.clearRect(
          0,
          0,
          ROTATE_Canvas.width,
          ROTATE_Canvas.height,
        );
      ROTATE_Canvas.surface.beginFill(
        ROTATE_Canvas.background & 16777215,
        E.__cast(a, kc) / 255,
      );
    } else
      ROTATE_Canvas.surface.beginFill(ROTATE_Canvas.background & 16777215, 1);
    ROTATE_Canvas.surface.drawRect(
      0,
      0,
      ROTATE_Canvas.width,
      ROTATE_Canvas.height,
    );
    ROTATE_Canvas.surface._ctx.globalAlpha = 1;
    ROTATE_Canvas.renderSprite(ROTATE_Canvas.stage, ROTATE_Canvas.surface);
  };
  ROTATE_Canvas.renderSprite = function (a, b) {
    if (a.visible && 0 != a.alpha) {
      b.save();
      b.translate(a.x, a.y);
      b.rotate((a.rotation * Math.PI) / 180);
      b.scale(a.scaleX, a.scaleY);
      var c = b._ctx.globalAlpha;
      b._ctx.globalAlpha *= a.alpha;
      b.reset(!0);
      a.graphics._paint(b);
      a.triggerEvent(new fb('render', b));
      for (var d = 0, e = a._children; d < e.length; ) {
        var f = e[d];
        ++d;
        ROTATE_Canvas.renderSprite(f, b);
      }
      b.scale(1 / a.scaleX, 1 / a.scaleY);
      b._ctx.globalAlpha = c;
      b.restore();
    }
  };
  ROTATE_Canvas.updateMouseSprite = function () {
    var a = ROTATE_Canvas.updateMouseSpriteStep(ROTATE_Canvas.stage, null);
    null == a && (a = ROTATE_Canvas.stage);
    ROTATE_Canvas.mouseSprite = a;
  };
  ROTATE_Canvas.updateMouseSpriteStep = function (a, b) {
    if (a.visible) {
      if (a.mouseEnabled) {
        var c = a.getBounds();
        c.width -= 1e-4;
        c.height -= 1e-4;
        xa.pointInTransformedBounds(
          new Q(ROTATE_Canvas.input.mouseX, ROTATE_Canvas.input.mouseY),
          a._transform,
          c,
        ) && (b = a);
      }
      c = 0;
      for (var d = a._children; c < d.length; ) {
        var e = d[c];
        ++c;
        b = ROTATE_Canvas.updateMouseSpriteStep(e, b);
      }
    }
    return b;
  };
  ROTATE_Canvas.pageToGame = function (a, b) {
    return new Q(
      (a - ROTATE_Canvas.offsetX) / ROTATE_Canvas.scale,
      (b - ROTATE_Canvas.offsetY) / ROTATE_Canvas.scale,
    );
  };
  ROTATE_Canvas.onClick = function (a) {
    ROTATE_Canvas.updateMouseSprite();
    null != ROTATE_Canvas.clickSprite &&
      ROTATE_Canvas.mouseSprite == ROTATE_Canvas.clickSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.clickSprite, a);
  };
  ROTATE_Canvas.onMouseDown = function (a) {
    window.getSelection().removeAllRanges();
    var b = window.document.activeElement,
      c = b.tagName.toLowerCase();
    1 != a.which ||
      ('input' != c && 'textarea' != c) ||
      b.setSelectionRange(0, 0);
    ROTATE_Canvas.updateMouseSprite();
    ROTATE_Canvas.clickSprite = ROTATE_Canvas.mouseSprite;
    null != ROTATE_Canvas.mouseSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.mouseSprite, a);
  };
  ROTATE_Canvas.onMouseUp = function (a) {
    ROTATE_Canvas.updateMouseSprite();
    null != ROTATE_Canvas.mouseSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.mouseSprite, a);
  };
  ROTATE_Canvas.onMouseMove = function (a) {
    ROTATE_Canvas.updateMouseSprite();
    null != ROTATE_Canvas.mouseSprite &&
      ROTATE_Canvas.triggerMouseEvent(ROTATE_Canvas.mouseSprite, a);
  };
  ROTATE_Canvas.triggerMouseEvent = function (a, b) {
    for (var c = (b.target = a); null != c; ) c.triggerEvent(b), (c = c.parent);
  };
  var Sa = function () {
    this.listeners = new Ra();
  };
  Sa.__name__ = !0;
  Sa.prototype = {
    addEventListener: function (a, b) {
      var c = this.listeners;
      if (null != na[a] ? !c.existsReserved(a) : !c.h.hasOwnProperty(a)) {
        c = this.listeners;
        var d = [];
        null != na[a] ? c.setReserved(a, d) : (c.h[a] = d);
      }
      c = this.listeners;
      (null != na[a] ? c.getReserved(a) : c.h[a]).push(b);
    },
    removeEventListener: function (a, b) {
      var c = this.listeners;
      if (null != na[a] ? c.existsReserved(a) : c.h.hasOwnProperty(a)) {
        c = this.listeners;
        c = null != na[a] ? c.getReserved(a) : c.h[a];
        var d = c.indexOf(b);
        0 > d || c.splice(d, 1);
      }
    },
    triggerEvent: function (a) {
      var b = this.listeners,
        c = a.type;
      if (null != na[c] ? b.existsReserved(c) : b.h.hasOwnProperty(c)) {
        b = 0;
        c = this.listeners;
        var d = a.type;
        for (c = null != na[d] ? c.getReserved(d) : c.h[d]; b < c.length; )
          (d = c[b]), ++b, d(a);
      }
    },
    __class__: Sa,
  };
  var ROTATE_Manager = function () {};
  ROTATE_Manager.__name__ = !0;
  ROTATE_Manager.triggerEvent = function (a) {
    ROTATE_Manager.events.triggerEvent(a);
  };
  ROTATE_Manager.addEventListener = function (a, b) {
    ROTATE_Manager.events.addEventListener(a, b);
  };
  ROTATE_Manager.removeEventListener = function (a, b) {
    ROTATE_Manager.events.removeEventListener(a, b);
  };
  ROTATE_Manager._init = function () {
    ROTATE_Manager.inited || (ROTATE_Manager.inited = !0);
  };
  ROTATE_Manager.createTask = function () {
    ROTATE_Manager.tasks.push(!1);
    return ROTATE_Manager.tasks.length - 1;
  };
  ROTATE_Manager.closeTask = function (a) {
    0 <= a && a < ROTATE_Manager.tasks.length && (ROTATE_Manager.tasks[a] = !0);
  };
  ROTATE_Manager.get_done = function () {
    if (!ROTATE_Manager.inited) return !1;
    if (ROTATE_Manager.finished) return !0;
    for (var a = 0, b = ROTATE_Manager.tasks.length; a < b; ) {
      var c = a++;
      if (!ROTATE_Manager.tasks[c]) return !1;
    }
    return (ROTATE_Manager.finished = !0);
  };
  ROTATE_Manager.get_progress = function () {
    if (!ROTATE_Manager.inited) return 0;
    if (ROTATE_Manager.finished) return 1;
    for (var a = 0, b = 0, c = ROTATE_Manager.tasks.length; b < c; ) {
      var d = b++;
      ROTATE_Manager.tasks[d] && ++a;
    }
    return a / ROTATE_Manager.tasks.length;
  };
  ROTATE_Manager.loadImage = function (a, b) {
    var c = new Image();
    c.src = a;
    if (!ROTATE_Manager.finished) {
      var d = ROTATE_Manager.createTask();
      c.onload = function () {
        ROTATE_Manager.closeTask(d);
        null != b && b(c);
      };
    }
    return c;
  };
  ROTATE_Manager.loadWebFonts = function (a, b) {
    var c = ROTATE_Manager.createTask();
    a.active = function () {
      ROTATE_Manager.closeTask(c);
      null != b && b();
    };
    WebFont.load(a);
  };
  ROTATE_Manager.loadTextFile = function (a, b) {
    var c = ROTATE_Manager.createTask(),
      d = new XMLHttpRequest();
    d.open('GET', a);
    d.onload = function () {
      ROTATE_Manager.closeTask(c);
      null != b && b(d.responseText);
    };
    d.send();
  };
  ROTATE_Manager.loadSound = function (a) {
    var b = ROTATE_Manager.createTask();
    a.onload = function () {
      ROTATE_Manager.closeTask(b);
    };
    return new Howl(a);
  };
  var Time = function () {};
  Time.__name__ = !0;
  Time._reset = function () {
    Time.startTime = Time.absoluteTime();
    Time.lastTime = 0;
  };
  Time._update = function () {
    var a = Time.get_currentMS();
    Time.elapsedTime = a - Time.lastTime;
    Time.lastTime = a;
  };
  Time.absoluteTime = function () {
    return new Date().getTime();
  };
  Time.get_current = function () {
    return 0.001 * Time.get_currentMS();
  };
  Time.get_currentMS = function () {
    return Time.absoluteTime() - Time.startTime;
  };
  Time.get_elapsed = function () {
    return 0.001 * Time.elapsedTime;
  };
  Time.get_elapsedMS = function () {
    return Time.elapsedTime;
  };
  var xa = function () {};
  xa.__name__ = !0;
  xa.getColorString = function (a, b) {
    null == b && (b = 1);
    return (
      'rgba(' +
      ((a & 16711680) >>> 16) +
      ', ' +
      ((a & 65280) >>> 8) +
      ', ' +
      (a & 255) +
      ', ' +
      b +
      ')'
    );
  };
  xa.pointInQuad = function (a, b, c, d, e) {
    e = c.subtract(b);
    b = a.subtract(b);
    d = d.subtract(c);
    c = a.subtract(c);
    a = Q.dot(e, b);
    e = Q.dot(e, e);
    c = Q.dot(d, c);
    d = Q.dot(d, d);
    return 0 <= a && a <= e && 0 <= c ? c <= d : !1;
  };
  xa.pointInTransformedBounds = function (a, b, c) {
    return null == a || null == b || null == c || 0 == c.width || 0 == c.height
      ? !1
      : xa.pointInQuad(
          a,
          b.apply(c.get_left(), c.get_top()),
          b.apply(c.get_right(), c.get_top()),
          b.apply(c.get_right(), c.get_bottom()),
          b.apply(c.get_left(), c.get_bottom()),
        );
  };
  xa.drawImageSafe = function (a, b, c, d, e, f, m, k) {
    0 >= e ||
      0 >= f ||
      0 >= c + e ||
      c >= b.width ||
      0 >= d + f ||
      d >= b.height ||
      ((c += 0 > c ? -c : 0),
      (d += 0 > d ? -d : 0),
      c + e > b.width && (e = b.width - c),
      d + f > b.height && (f = b.height - d),
      a.drawImage(b, c, d, e, f, m, k, e, f));
  };
  var Graphics = function () {
    this.clear();
  };
  Graphics.__name__ = !0;
  Graphics.prototype = {
    get_length: function () {
      return this.items.length;
    },
    get_skipDraw: function () {
      return this.filling ? false : !this.stroking;
    },
    clear: function () {
      this.items = [];
      this.filling = false;
      this.stroking = false;
      this.bounds = new Bounds(0, 0, 0, 0);
    },
    _paint: function (a) {
      for (var b = 0, c = this.items; b < c.length; ) {
        var d = c[b];
        ++b;
        d.execute(a);
      }
      a.endFill();
      a.endStroke();
    },
    call: function (a, b) {
      this.items.push(Ga.callFunc(a, b));
    },
    beginFill: function (a, b) {
      null == b && (b = 1);
      null == a && (a = 0);
      this.call('beginFill', [a, b]);
      this.filling = true;
    },
    endFill: function () {
      this.call('endFill');
      this.filling = false;
    },
    beginStroke: function (a, b, c) {
      null == c && (c = 1);
      null == b && (b = 0);
      null == a && (a = 1);
      this.call('beginStroke', [a, b, c]);
      this.stroking = true;
    },
    endStroke: function () {
      this.call('endStroke');
      this.stroking = false;
    },
    drawRect: function (a, b, c, d) {
      this.get_skipDraw() ||
        (this.bounds.combine(new Bounds(a, b, c, d)),
        this.call('drawRect', [a, b, c, d]));
    },
    drawPath: function (a, b) {
      null == b && (b = !0);
      this.get_skipDraw() ||
        (this.bounds.combine(Bounds.containingPoints(a)),
        this.call('drawPath', [a, b]));
    },
    drawCircle: function (a, b, c) {
      this.get_skipDraw() ||
        (this.bounds.combine(new Bounds(a - c, b - c, 2 * c, 2 * c)),
        this.call('drawCircle', [a, b, c]));
    },
    drawArc: function (a, b, c, d, e, f, m) {
      null == m && (m = !1);
      null == f && (f = !1);
      this.get_skipDraw() ||
        (this.bounds.combine(new Bounds(a - c, b - c, 2 * c, 2 * c)),
        this.call('drawArc', [a, b, c, d, e, f, m]));
    },
    drawEllipse: function (a, b, c, d) {
      this.get_skipDraw() ||
        (this.bounds.combine(new Bounds(a, b, c, d)),
        this.call('drawEllipse', [a, b, c, d]));
    },
    drawImage: function (a, b, c) {
      this.call('drawImage', [a, b, c]);
    },
    drawText: function (a, b, c, d, e, f, m, k) {
      null == k && (k = 1.25);
      null == m && (m = 'left');
      null == f && (f = 'normal');
      this.get_skipDraw() || this.call('drawText', [a, b, c, d, e, f, m, k]);
    },
    __class__: Graphics,
  };
  var ROTATE_CanvasObject = function () {
    this.graphics = new Graphics();
    this._children = [];
    this._transformReverse = new Transform();
    this._transform = new Transform();
    this.mouseEnabled = this.buttonMode = !1;
    this.alpha = 1;
    this.visible = !0;
    this.rotation = 0;
    this.scaleX = this.scaleY = 1;
    this.x = this.y = 0;
    this.listeners = new Ra();
  };
  ROTATE_CanvasObject.__name__ = !0;
  ROTATE_CanvasObject.__super__ = Sa;
  ROTATE_CanvasObject.prototype = D(Sa.prototype, {
    set_x: function (a) {
      this.x != a && ((this.x = a), this._updateTransform());
      return this.x;
    },
    set_y: function (a) {
      this.y != a && ((this.y = a), this._updateTransform());
      return this.y;
    },
    set_scaleX: function (a) {
      this.scaleX != a && ((this.scaleX = a), this._updateTransform());
      return this.scaleX;
    },
    set_scaleY: function (a) {
      this.scaleY != a && ((this.scaleY = a), this._updateTransform());
      return this.scaleY;
    },
    set_rotation: function (a) {
      this.rotation != a && ((this.rotation = a), this._updateTransform());
      return this.rotation;
    },
    set_alpha: function (a) {
      return (this.alpha = 0 > a ? 0 : 1 < a ? 1 : a);
    },
    get_stage: function () {
      return ROTATE_Canvas.stage;
    },
    get_width: function () {
      return this.getBounds().width * this.scaleX;
    },
    set_width: function (a) {
      this.set_scaleX(a / this.getBounds().width);
      return a;
    },
    get_height: function () {
      return this.getBounds().height * this.scaleY;
    },
    set_height: function (a) {
      this.set_scaleY(a / this.getBounds().height);
      return a;
    },
    addChild: function (a) {
      null != a &&
        a != this.get_stage() &&
        a != this &&
        (null != a.parent && a.parent.removeChild(a),
        this._children.push(a),
        (a.parent = this),
        a._updateTransform(),
        a.triggerEvent(new ROTATE_Event('added')));
    },
    addChildAt: function (a, b) {
      null != a &&
        a != this.get_stage() &&
        a != this &&
        (null != a.parent && a.parent.removeChild(a),
        this._children.splice(b, 0, a),
        (a.parent = this),
        a._updateTransform(),
        a.triggerEvent(new ROTATE_Event('added')));
    },
    removeChild: function (a) {
      null != a &&
        a.parent == this &&
        ((a.parent = null),
        this._children.splice(this._children.indexOf(a), 1),
        a._updateTransform(),
        a.triggerEvent(new ROTATE_Event('removed')));
    },
    removeChildAt: function (a) {
      if (0 <= a && a < this._children.length) {
        var b = this._children[a];
        b.parent = null;
        b._updateTransform();
        this._children.splice(a, 1);
        b.triggerEvent(new ROTATE_Event('removed'));
      }
    },
    removeChildren: function () {
      for (var a = this._children.length; 0 <= a--; )
        this.removeChild(this._children[a]);
    },
    getChildIndex: function (a) {
      return this._children.indexOf(a);
    },
    setChildIndex: function (a, b) {
      var c = this.getChildIndex(a);
      0 <= c && (this._children.splice(c, 1), this._children.splice(b, 0, a));
    },
    swapDepths: function (a, b) {
      var c = this.getChildIndex(a),
        d = this.getChildIndex(b);
      0 <= c && 0 <= d && ((this._children[c] = b), (this._children[d] = a));
    },
    globalToLocal: function (a, b) {
      return this._transformReverse.apply(a, b);
    },
    localToGlobal: function (a, b) {
      return this._transform.apply(a, b);
    },
    _updateTransform: function () {
      null != this.parent
        ? this._transform.copy(this.parent._transform)
        : this._transform.identity();
      this._transform.translate(this.x, this.y);
      this._transform.rotate((this.rotation * Math.PI) / 180);
      this._transform.scale(this.scaleX, this.scaleY);
      this._transformReverse.identity();
      for (var a = this; null != a; )
        this._transformReverse.scale(1 / a.scaleX, 1 / a.scaleY),
          this._transformReverse.rotate((-a.rotation * Math.PI) / 180),
          this._transformReverse.translate(-a.x, -a.y),
          (a = a.parent);
      a = 0;
      for (var b = this._children; a < b.length; ) {
        var c = b[a];
        ++a;
        c._updateTransform();
      }
    },
    getBoundsSelf: function () {
      return new Bounds(0, 0, 0, 0);
    },
    getBounds: function () {
      var a = [this.getBoundsSelf(), this.graphics.bounds];
      return Bounds.combineMultiple(a);
    },
    hitTestPoint: function (a) {
      return this.getBounds().contains(a);
    },
    cascadingCallback: function (a) {
      if (null != a) {
        a(this);
        for (var b = 0, c = this._children; b < c.length; ) {
          var d = c[b];
          ++b;
          d.cascadingCallback(a);
        }
      }
    },
    __class__: ROTATE_CanvasObject,
  });
  var I = function (a) {
    this.imageWidth = this.imageHeight = 0;
    var b = this;
    ROTATE_CanvasObject.call(this);
    null != a && this.create(a);
    this.addEventListener('render', function (c) {
      b.render(c.surface);
    });
  };
  I.__name__ = !0;
  I.fromFile = function (a, b) {
    var c = new I(null);
    ROTATE_Manager.loadImage(a, function (d) {
      c.create(d);
      null != b && b();
    });
    return c;
  };
  I.__super__ = ROTATE_CanvasObject;
  I.prototype = D(ROTATE_CanvasObject.prototype, {
    get_rect: function () {
      return new Bounds(
        0,
        0,
        null != this.clipRect ? this.clipRect.width : 0,
        null != this.clipRect ? this.clipRect.height : 0,
      );
    },
    set_clipRect: function (a) {
      return (this.clipRect = a);
    },
    create: function (a) {
      if (null == this.image) {
        this.image = a;
        var b = a.width,
          c = a.height;
        'svg' == ja.substr(a.src, a.src.length - 3, null) &&
          (window.document.body.appendChild(a),
          (b = a.offsetWidth),
          (c = a.offsetHeight),
          window.document.body.removeChild(a));
        this.imageWidth = b;
        this.imageHeight = c;
        this.set_clipRect(new Bounds(0, 0, b, c));
      }
    },
    getBoundsSelf: function () {
      return new Bounds(
        0,
        0,
        null != this.image ? this.clipRect.width : 0,
        null != this.image ? this.clipRect.height : 0,
      );
    },
    render: function (a) {
      null != this.image &&
        a.drawImage(
          this.image,
          this.clipRect,
          0,
          0,
          0 != this.clipRect.x ||
            0 != this.clipRect.y ||
            this.clipRect.width != this.imageWidth ||
            this.clipRect.height != this.imageHeight,
        );
    },
    __class__: I,
  });
  var ROTATE_Event = function (type) {
    this.type = type;
  };
  ROTATE_Event.__name__ = !0;
  ROTATE_Event.prototype = {
    __class__: ROTATE_Event,
  };
  var Ta = function (a) {
    this.type = a;
  };
  Ta.__name__ = !0;
  Ta.__super__ = ROTATE_Event;
  Ta.prototype = D(ROTATE_Event.prototype, {
    __class__: Ta,
  });
  var Ua = function (a, b) {
    this.type = a;
    this.keyCode = b;
  };
  Ua.__name__ = !0;
  Ua.__super__ = ROTATE_Event;
  Ua.prototype = D(ROTATE_Event.prototype, {
    __class__: Ua,
  });
  var ROTATE_ManagerEvent = function (type, progress) {
    this.type = type;
    this.progress = progress;
  };
  ROTATE_ManagerEvent.__name__ = !0;
  ROTATE_ManagerEvent.__super__ = ROTATE_Event;
  ROTATE_ManagerEvent.prototype = D(ROTATE_Event.prototype, {
    __class__: ROTATE_ManagerEvent,
  });
  var Ha = function (a, b, c, d, e) {
    null == e && (e = 0);
    this.type = a;
    this.target = b;
    this.x = c;
    this.y = d;
    this.which = e;
  };
  Ha.__name__ = !0;
  Ha.__super__ = ROTATE_Event;
  Ha.prototype = D(ROTATE_Event.prototype, {
    __class__: Ha,
  });
  var fb = function (a, b) {
    this.type = a;
    this.surface = b;
  };
  fb.__name__ = !0;
  fb.__super__ = ROTATE_Event;
  fb.prototype = D(ROTATE_Event.prototype, {
    __class__: fb,
  });
  var Q = function (a, b) {
    this.x = a;
    this.y = b;
  };
  Q.__name__ = !0;
  Q.dot = function (a, b) {
    return a.x * b.x + a.y * b.y;
  };
  Q.distance = function (a, b) {
    return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
  };
  Q.prototype = {
    copy: function () {
      return new Q(this.x, this.y);
    },
    equals: function (a) {
      return null != a && a.x == this.x ? a.y == this.y : !1;
    },
    add: function (a) {
      return new Q(this.x + a.x, this.y + a.y);
    },
    subtract: function (a) {
      return new Q(this.x - a.x, this.y - a.y);
    },
    multiply: function (a) {
      return new Q(this.x * a.x, this.y * a.y);
    },
    divide: function (a) {
      return new Q(this.x / a.x, this.y / a.y);
    },
    __class__: Q,
  };
  var Bounds = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };
  Bounds.__name__ = !0;
  Bounds.combineMultiple = function (a) {
    for (var b = 0, c = 0, d = 0, e = 0, f = 0, m = a.length; f < m; ) {
      var k = f++,
        p = a[k];
      if (0 == k || p.get_top() < b) b = p.get_top();
      if (0 == k || p.get_left() < c) c = p.get_left();
      if (0 == k || p.get_bottom() > d) d = p.get_bottom();
      if (0 == k || p.get_right() > e) e = p.get_right();
    }
    return new Bounds(c, b, e - c, d - b);
  };
  Bounds.containingPoints = function (a) {
    for (
      var b = a[0].y, c = a[0].x, d = a[0].y, e = a[0].x, f = 0;
      f < a.length;

    ) {
      var m = a[f];
      ++f;
      m.y < b ? (b = m.y) : m.y > d && (d = m.y);
      m.x < c ? (c = m.x) : m.x > e && (e = m.x);
    }
    return new Bounds(c, b, e - c, d - b);
  };
  Bounds.prototype = {
    get_top: function () {
      return this.y;
    },
    set_top: function (a) {
      return (this.y = a);
    },
    get_left: function () {
      return this.x;
    },
    set_left: function (a) {
      return (this.x = a);
    },
    get_bottom: function () {
      return this.y + this.height;
    },
    set_bottom: function (a) {
      this.height = a - this.y;
      return a;
    },
    get_right: function () {
      return this.x + this.width;
    },
    set_right: function (a) {
      this.width = a - this.x;
      return a;
    },
    get_center: function () {
      return new Q(
        (this.get_left() + this.get_right()) / 2,
        (this.get_top() + this.get_bottom()) / 2,
      );
    },
    intersects: function (a) {
      return a.get_left() < this.get_right() &&
        a.get_right() > this.get_left() &&
        a.get_top() < this.get_bottom()
        ? a.get_bottom() > this.get_top()
        : !1;
    },
    contains: function (a) {
      return null != a &&
        a.x >= this.x &&
        a.y >= this.y &&
        a.x < this.get_right()
        ? a.y < this.get_bottom()
        : !1;
    },
    equals: function (a) {
      return null != a &&
        a.x == this.x &&
        a.y == this.y &&
        a.width == this.width
        ? a.height == this.height
        : !1;
    },
    combine: function (a) {
      var b = a.get_top() < this.get_top() ? a.get_top() : this.get_top(),
        c = a.get_left() < this.get_left() ? a.get_left() : this.get_left(),
        d =
          a.get_bottom() > this.get_bottom()
            ? a.get_bottom()
            : this.get_bottom();
      a = a.get_right() > this.get_right() ? a.get_right() : this.get_right();
      this.set_top(b);
      this.set_left(c);
      this.set_bottom(d);
      this.set_right(a);
    },
    copy: function () {
      return new Bounds(this.x, this.y, this.width, this.height);
    },
    __class__: Bounds,
  };
  var CanvasInput = function (canvas) {
    this.mouseX = this.mouseY = 0;
    this.isFocused = !1;
    var _self = this;
    this.listeners = new Ra();
    this.c = canvas;
    window.addEventListener('focus', Bind(this, this.onFocus));
    window.addEventListener('blur', Bind(this, this.onBlur));
    window.addEventListener('pagehide', Bind(this, this.onBlur));
    window.addEventListener('contextmenu', function (event) {
      var tag = event.target.tagName.toLowerCase();
      if (tag !== 'canvas' && tag !== 'body' && tag !== 'html') return true;
      _self.onMouseUp(event);
      event.preventDefault();
      return false;
    });
    window.addEventListener('click', Bind(this, this.onClick));
    window.addEventListener('mousedown', Bind(this, this.onMouseDown));
    window.addEventListener('mouseup', Bind(this, this.onMouseUp));
    window.addEventListener('mousemove', Bind(this, this.onMouseMove));
    window.addEventListener('mouseover', Bind(this, this.onMouseMove));
    window.addEventListener('keydown', Bind(this, this.onKeyDown));
    window.addEventListener('keyup', Bind(this, this.onKeyUp));
  };
  CanvasInput.__name__ = !0;
  CanvasInput.__super__ = Sa;
  CanvasInput.prototype = D(Sa.prototype, {
    set_mouseX: function (a) {
      return (this.mouseX = Math.floor(a));
    },
    set_mouseY: function (a) {
      return (this.mouseY = Math.floor(a));
    },
    updateMouse: function (a) {
      a = ROTATE_Canvas.pageToGame(a.pageX, a.pageY);
      this.set_mouseX(a.x);
      this.set_mouseY(a.y);
    },
    onFocus: function () {
      this.isFocused = !0;
      this.triggerEvent(new Ta('focus'));
    },
    onBlur: function () {
      this.isFocused = !1;
      this.triggerEvent(new Ta('blur'));
    },
    onClick: function (a) {
      if (!this.isFocused) this.onFocus();
      this.updateMouse(a);
      this.triggerEvent(this.makeMouseEvent('click', a.which));
    },
    onMouseDown: function (a) {
      this.updateMouse(a);
      this.triggerEvent(this.makeMouseEvent('mouseDown', a.which));
    },
    onMouseUp: function (a) {
      this.updateMouse(a);
      this.triggerEvent(this.makeMouseEvent('mouseUp', a.which));
      3 == a.which &&
        (this.onKeyUp({
          type: 'keyup',
          keyCode: 16,
          preventDefault: function () {},
        }),
        this.onKeyUp({
          type: 'keyup',
          keyCode: 17,
          preventDefault: function () {},
        }));
    },
    onMouseMove: function (a) {
      this.updateMouse(a);
      this.triggerEvent(this.makeMouseEvent('move'));
    },
    makeMouseEvent: function (a, b) {
      null == b && (b = 0);
      return new Ha(a, null, this.mouseX, this.mouseY, b);
    },
    onKeyDown: function (a) {
      if (this.isFocused) {
        var b = window.document.activeElement.tagName.toLowerCase();
        'input' != b &&
          'textarea' != b &&
          (this.triggerEvent(new Ua('keyDown', a.keyCode)),
          this.captureKey(a.keyCode, a.ctrlKey) && a.preventDefault());
      }
    },
    onKeyUp: function (a) {
      if (this.isFocused) {
        var b = window.document.activeElement.tagName.toLowerCase();
        'input' != b &&
          'textarea' != b &&
          (this.triggerEvent(new Ua('keyUp', a.keyCode)),
          this.captureKey(a.keyCode, a.ctrlKey) && a.preventDefault());
      }
    },
    captureKey: function (a, b) {
      return !(
        (112 <= a && 123 >= a) ||
        (b &&
          (48 == a ||
            96 == a ||
            187 == a ||
            107 == a ||
            189 == a ||
            109 == a ||
            84 == a))
      );
    },
    __class__: CanvasInput,
  });
  var InputKeys = function () {};
  InputKeys.__name__ = !0;
  InputKeys._init = function () {
    InputKeys.inited ||
      (ROTATE_Canvas.input.addEventListener('keyDown', InputKeys.onKeyDown),
      ROTATE_Canvas.input.addEventListener('keyUp', InputKeys.onKeyUp),
      ROTATE_Canvas.input.addEventListener('blur', InputKeys.reset),
      ROTATE_Canvas.stage.addEventListener('exitFrame', InputKeys.update),
      (InputKeys.inited = !0));
  };
  InputKeys.onKeyDown = function (a) {
    InputKeys.keyDown(a.keyCode) || InputKeys.keys.push(a.keyCode);
  };
  InputKeys.onKeyUp = function (a) {
    a = InputKeys.keys.indexOf(a.keyCode);
    -1 < a && InputKeys.keys.splice(a, 1);
  };
  InputKeys.reset = function (a) {
    InputKeys.keys = [];
  };
  InputKeys.update = function () {
    InputKeys.keysOld = InputKeys.keys.slice(0);
    if (
      null != window.document.activeElement &&
      null != window.document.activeElement.tagName
    ) {
      var a = window.document.activeElement.tagName.toLowerCase();
      ('input' != a && 'textarea' != a) || InputKeys.reset(null);
    }
  };
  InputKeys.keyDown = function (a) {
    return -1 < InputKeys.keys.indexOf(a);
  };
  InputKeys.keyDownOld = function (a) {
    return -1 < InputKeys.keysOld.indexOf(a);
  };
  InputKeys.keyPressed = function (a) {
    return InputKeys.keyDown(a) ? !InputKeys.keyDownOld(a) : !1;
  };
  InputKeys.keyReleased = function (a) {
    return InputKeys.keyDown(a) ? !1 : InputKeys.keyDownOld(a);
  };
  var Ga = function (a, b) {
    this.type = a;
    this.name = b;
  };
  Ga.__name__ = !0;
  Ga.callFunc = function (a, b) {
    var c = new Ga(Ga.FUNC, a);
    c.params = b;
    return c;
  };
  Ga.prototype = {
    execute: function (a) {
      this.type == Ga.FUNC && a[this.name].apply(a, this.params);
    },
    __class__: Ga,
  };
  var Surface = function (ctx) {
    this._transform = new Transform();
    this._ctx = ctx;
    this.reset();
  };
  Surface.__name__ = !0;
  Surface.prototype = {
    save: function () {
      this._transform.save();
      this._ctx.save();
    },
    restore: function () {
      this._transform.restore();
      this._ctx.restore();
    },
    setTransform: function (a, b, c, d, e, f) {
      this._transform.set(a, b, c, d, e, f);
      this._ctx.setTransform(a, b, c, d, e, f);
    },
    translate: function (a, b) {
      if (0 != a || 0 != b)
        this._transform.translate(a, b), this._ctx.translate(a, b);
    },
    scale: function (a, b) {
      if (1 != a || 1 != b) this._transform.scale(a, b), this._ctx.scale(a, b);
    },
    rotate: function (a) {
      0 != a && (this._transform.rotate(a), this._ctx.rotate(a));
    },
    get_skipDraw: function () {
      return this.filling ? !1 : !this.stroking;
    },
    get_strokeOffset: function () {
      return this.stroking && 0 != Math.round(this.strokeWidth) % 2 ? 0.5 : 0;
    },
    reset: function (a) {
      null == a && (a = !1);
      a || this.setTransform(1, 0, 0, 1, 0, 0);
      this.filling = this.stroking = !1;
    },
    clearRect: function (a, b, c, d) {
      this._ctx.clearRect(a, b, c, d);
    },
    beginFill: function (a, b) {
      null == b && (b = 1);
      null == a && (a = 0);
      0 > b ? (b = 0) : 1 < b && (b = 1);
      this._ctx.fillStyle = xa.getColorString(a & 16777215, b);
      this.filling = !0;
    },
    endFill: function () {
      this.filling = !1;
    },
    beginStroke: function (a, b, c) {
      null == c && (c = 1);
      null == b && (b = 0);
      null == a && (a = 1);
      0 > c ? (c = 0) : 1 < c && (c = 1);
      this._ctx.strokeStyle = xa.getColorString(b & 16777215, c);
      this._ctx.lineWidth = this.strokeWidth = a;
      this.stroking = !0;
    },
    endStroke: function () {
      this.stroking = !1;
    },
    drawRect: function (a, b, c, d) {
      if (!this.get_skipDraw()) {
        var e = this.get_strokeOffset();
        a += e;
        b += e;
        this.filling && this._ctx.fillRect(a, b, c, d);
        this.stroking && this._ctx.strokeRect(a, b, c, d);
      }
    },
    beginPath: function () {
      this._ctx.beginPath();
    },
    closePath: function () {
      this._ctx.closePath();
    },
    moveTo: function (a, b) {
      this._ctx.moveTo(a, b);
    },
    lineTo: function (a, b) {
      this._ctx.lineTo(a, b);
    },
    arc: function (a, b, c, d, e, f) {
      null == f && (f = !1);
      this._ctx.arc(a, b, c, d, e, f);
    },
    applyPath: function () {
      this.filling && this._ctx.fill();
      this.stroking && this._ctx.stroke();
    },
    drawPath: function (a, b) {
      null == b && (b = !0);
      if (!(this.get_skipDraw() || 2 > a.length)) {
        var c = this.get_strokeOffset();
        this.beginPath();
        this.moveTo(a[0].x + c, a[0].y + c);
        for (var d = 1, e = a.length; d < e; ) {
          var f = d++;
          this.lineTo(a[f].x + c, a[f].y + c);
        }
        b && this.closePath();
        this.applyPath();
      }
    },
    drawCircle: function (a, b, c) {
      if (!this.get_skipDraw()) {
        var d = this.get_strokeOffset();
        a += d;
        b += d;
        this.beginPath();
        this.arc(a, b, c, 0.1, Surface.PI2 + 0.1);
        this.applyPath();
      }
    },
    drawArc: function (a, b, c, d, e, f, m) {
      null == m && (m = !1);
      null == f && (f = !1);
      if (!this.get_skipDraw()) {
        var k = this.get_strokeOffset();
        a += k;
        b += k;
        this.beginPath();
        m && this.moveTo(a, b);
        this.arc(a, b, c, d, e, f);
        this.applyPath();
      }
    },
    drawEllipse: function (a, b, c, d) {
      if (!this.get_skipDraw()) {
        var e = this.get_strokeOffset();
        a += e;
        b += e;
        this.beginPath();
        this.save();
        this.translate(a + c / 2, b + d / 2);
        this.scale(c / d, 1);
        this.arc(0, 0, d / 2, 0.1, Surface.PI2 + 0.1);
        this.restore();
        this.applyPath();
      }
    },
    drawImage: function (a, b, c, d, e) {
      null == e && (e = !0);
      null != b
        ? e
          ? xa.drawImageSafe(this._ctx, a, b.x, b.y, b.width, b.height, c, d)
          : this._ctx.drawImage(
              a,
              b.x,
              b.y,
              b.width,
              b.height,
              c,
              d,
              b.width,
              b.height,
            )
        : this._ctx.drawImage(a, c, d);
    },
    drawText: function (a, b, c, d, e, f, m, k) {
      null == k && (k = 1.25);
      null == m && (m = 'left');
      null == f && (f = 'normal');
      if (!this.get_skipDraw())
        for (
          d = ('normal' != f ? f + ' ' : '') + e + 'px ' + d,
            this._ctx.font != d && (this._ctx.font = d),
            this._ctx.textBaseline = 'top',
            this._ctx.textAlign = m,
            a = a.split('\n'),
            m = 0,
            d = a.length;
          m < d;

        ) {
          f = m++;
          var p = a[f];
          this.filling && this._ctx.fillText(p, b, c + f * e * k);
          this.stroking && this._ctx.strokeText(p, b, c + f * e * k);
        }
    },
    getTextWidth: function (a, b, c) {
      b = c + 'px ' + b;
      this._ctx.font != b && (this._ctx.font = b);
      a = a.split('\n');
      c = b = 0;
      for (var d = a.length; c < d; ) {
        var e = c++;
        e = this._ctx.measureText(a[e]).width;
        e > b && (b = e);
      }
      return b;
    },
    __class__: Surface,
  };
  var Transform = function () {
    this.states = [];
    this.matrix = [1, 0, 0, 1, 0, 0];
  };
  Transform.__name__ = !0;
  Transform.prototype = {
    getMatrix: function () {
      return this.matrix.slice(0);
    },
    get: function (a) {
      return 0 > a || 5 < a ? 0 : this.matrix[a];
    },
    set: function (a, b, c, d, e, f) {
      this.matrix[0] = a;
      this.matrix[1] = b;
      this.matrix[2] = c;
      this.matrix[3] = d;
      this.matrix[4] = e;
      this.matrix[5] = f;
    },
    multiply: function (a, b, c, d, e, f) {
      this.set(
        this.matrix[0] * a + this.matrix[2] * b,
        this.matrix[1] * a + this.matrix[3] * b,
        this.matrix[0] * c + this.matrix[2] * d,
        this.matrix[1] * c + this.matrix[3] * d,
        this.matrix[0] * e + this.matrix[2] * f + this.matrix[4],
        this.matrix[1] * e + this.matrix[3] * f + this.matrix[5],
      );
    },
    identity: function () {
      this.set(1, 0, 0, 1, 0, 0);
    },
    translate: function (a, b) {
      (0 == a && 0 == b) || this.multiply(1, 0, 0, 1, a, b);
    },
    scale: function (a, b) {
      (1 == a && 1 == b) || this.multiply(a, 0, 0, b, 0, 0);
    },
    rotate: function (a) {
      0 != a &&
        this.multiply(
          Math.cos(a),
          Math.sin(a),
          -Math.sin(a),
          Math.cos(a),
          0,
          0,
        );
    },
    save: function () {
      this.states.push(this.matrix.slice(0));
    },
    restore: function () {
      var a = this.states.pop();
      null != a ? (this.matrix = a) : this.identity();
    },
    equals: function (a) {
      return this.matrix[0] == a.get(0) &&
        this.matrix[1] == a.get(1) &&
        this.matrix[2] == a.get(2) &&
        this.matrix[3] == a.get(3) &&
        this.matrix[4] == a.get(4)
        ? this.matrix[5] == a.get(5)
        : !1;
    },
    copy: function (a) {
      this.matrix[0] = a.get(0);
      this.matrix[1] = a.get(1);
      this.matrix[2] = a.get(2);
      this.matrix[3] = a.get(3);
      this.matrix[4] = a.get(4);
      this.matrix[5] = a.get(5);
    },
    apply: function (a, b) {
      return new Q(
        this.matrix[0] * a + this.matrix[2] * b + this.matrix[4],
        this.matrix[1] * a + this.matrix[3] * b + this.matrix[5],
      );
    },
    __class__: Transform,
  };
  var lc = function () {};
  lc.__name__ = !0;
  var ya = function (a) {
    this.length = a.byteLength;
    this.b = new ec(a);
    this.b.bufferValue = a;
    a.hxBytes = this;
    a.bytes = this.b;
  };
  ya.__name__ = !0;
  ya.ofString = function (a) {
    for (var b = [], c = 0; c < a.length; ) {
      var d = a.charCodeAt(c++);
      55296 <= d &&
        56319 >= d &&
        (d = ((d - 55232) << 10) | (a.charCodeAt(c++) & 1023));
      127 >= d
        ? b.push(d)
        : (2047 >= d
            ? b.push(192 | (d >> 6))
            : (65535 >= d
                ? b.push(224 | (d >> 12))
                : (b.push(240 | (d >> 18)), b.push(128 | ((d >> 12) & 63))),
              b.push(128 | ((d >> 6) & 63))),
          b.push(128 | (d & 63)));
    }
    return new ya(new ec(b).buffer);
  };
  ya.prototype = {
    getString: function (a, b) {
      if (0 > a || 0 > b || a + b > this.length) throw new Z(oa.OutsideBounds);
      for (
        var c = '', d = this.b, e = String.fromCharCode, f = a, m = a + b;
        f < m;

      ) {
        var k = d[f++];
        if (128 > k) {
          if (0 == k) break;
          c += e(k);
        } else if (224 > k) c += e(((k & 63) << 6) | (d[f++] & 127));
        else if (240 > k) {
          var p = d[f++];
          c += e(((k & 31) << 12) | ((p & 127) << 6) | (d[f++] & 127));
        } else {
          p = d[f++];
          var y = d[f++];
          k =
            ((k & 15) << 18) |
            ((p & 127) << 12) |
            ((y & 127) << 6) |
            (d[f++] & 127);
          c += e((k >> 10) + 55232);
          c += e((k & 1023) | 56320);
        }
      }
      return c;
    },
    toString: function () {
      return this.getString(0, this.length);
    },
    __class__: ya,
  };
  var za = function () {};
  za.__name__ = !0;
  za.encode = function (a, b) {
    null == b && (b = !0);
    var c = new sb(za.BYTES).encodeBytes(a).toString();
    if (b)
      switch (a.length % 3) {
        case 1:
          c += '==';
          break;
        case 2:
          c += '=';
      }
    return c;
  };
  za.decode = function (a, b) {
    null == b && (b = !0);
    if (b)
      for (; 61 == ja.charCodeAt(a, a.length - 1); ) a = ja.substr(a, 0, -1);
    return new sb(za.BYTES).decodeBytes(ya.ofString(a));
  };
  var sb = function (a) {
    for (var b = a.length, c = 1; b > 1 << c; ) ++c;
    if (8 < c || b != 1 << c)
      throw new Z('BaseCode : base length must be a power of two.');
    this.base = a;
    this.nbits = c;
  };
  sb.__name__ = !0;
  sb.prototype = {
    encodeBytes: function (a) {
      for (
        var b = this.nbits,
          c = this.base,
          d = ((8 * a.length) / b) | 0,
          e = new ya(new tb(d + (0 == (8 * a.length) % b ? 0 : 1))),
          f = 0,
          m = 0,
          k = (1 << b) - 1,
          p = 0,
          y = 0;
        y < d;

      ) {
        for (; m < b; ) (m += 8), (f <<= 8), (f |= a.b[p++]);
        m -= b;
        e.b[y++] = c.b[(f >> m) & k] & 255;
      }
      0 < m && (e.b[y++] = c.b[(f << (b - m)) & k] & 255);
      return e;
    },
    initTable: function () {
      for (var a = [], b = 0; 256 > b; ) {
        var c = b++;
        a[c] = -1;
      }
      b = 0;
      for (c = this.base.length; b < c; ) {
        var d = b++;
        a[this.base.b[d]] = d;
      }
      this.tbl = a;
    },
    decodeBytes: function (a) {
      var b = this.nbits;
      null == this.tbl && this.initTable();
      for (
        var c = this.tbl,
          d = (a.length * b) >> 3,
          e = new ya(new tb(d)),
          f = 0,
          m = 0,
          k = 0,
          p = 0;
        p < d;

      ) {
        for (; 8 > m; ) {
          m += b;
          f <<= b;
          var y = c[a.b[k++]];
          if (-1 == y) throw new Z('BaseCode : invalid encoded char');
          f |= y;
        }
        m -= 8;
        e.b[p++] = (f >> m) & 255;
      }
      return e;
    },
    __class__: sb,
  };
  var hb = function () {
    this.h = {};
  };
  hb.__name__ = !0;
  hb.__interfaces__ = [lc];
  hb.prototype = {
    keys: function () {
      var a = [],
        b;
      for (b in this.h) this.h.hasOwnProperty(b) && a.push(b | 0);
      return ja.iter(a);
    },
    iterator: function () {
      return {
        ref: this.h,
        it: this.keys(),
        hasNext: function () {
          return this.it.hasNext();
        },
        next: function () {
          var a = this.it.next();
          return this.ref[a];
        },
      };
    },
    __class__: hb,
  };
  var fc = function (a, b) {
    this.map = a;
    this.keys = b;
    this.index = 0;
    this.count = b.length;
  };
  fc.__name__ = !0;
  fc.prototype = {
    hasNext: function () {
      return this.index < this.count;
    },
    next: function () {
      var a = this.map,
        b = this.keys[this.index++];
      return null != na[b] ? a.getReserved(b) : a.h[b];
    },
    __class__: fc,
  };
  var Ra = function () {
    this.h = {};
  };
  Ra.__name__ = !0;
  Ra.__interfaces__ = [lc];
  Ra.prototype = {
    setReserved: function (a, b) {
      null == this.rh && (this.rh = {});
      this.rh['$' + a] = b;
    },
    getReserved: function (a) {
      return null == this.rh ? null : this.rh['$' + a];
    },
    existsReserved: function (a) {
      return null == this.rh ? !1 : this.rh.hasOwnProperty('$' + a);
    },
    remove: function (a) {
      if (null != na[a]) {
        a = '$' + a;
        if (null == this.rh || !this.rh.hasOwnProperty(a)) return !1;
        delete this.rh[a];
      } else {
        if (!this.h.hasOwnProperty(a)) return !1;
        delete this.h[a];
      }
      return !0;
    },
    arrayKeys: function () {
      var a = [],
        b;
      for (b in this.h) this.h.hasOwnProperty(b) && a.push(b);
      if (null != this.rh)
        for (b in this.rh) 36 == b.charCodeAt(0) && a.push(b.substr(1));
      return a;
    },
    __class__: Ra,
  };
  var oa = {
    __ename__: !0,
    __constructs__: ['Blocked', 'Overflow', 'OutsideBounds', 'Custom'],
    Blocked: ['Blocked', 0],
  };
  oa.Blocked.toString = dc;
  oa.Blocked.__enum__ = oa;
  oa.Overflow = ['Overflow', 1];
  oa.Overflow.toString = dc;
  oa.Overflow.__enum__ = oa;
  oa.OutsideBounds = ['OutsideBounds', 2];
  oa.OutsideBounds.toString = dc;
  oa.OutsideBounds.__enum__ = oa;
  oa.Custom = function (a) {
    a = ['Custom', 3, a];
    a.__enum__ = oa;
    a.toString = dc;
    return a;
  };
  var Z = function (a) {
    Error.call(this);
    this.val = a;
    this.message = String(a);
    Error.captureStackTrace && Error.captureStackTrace(this, Z);
  };
  Z.__name__ = !0;
  Z.wrap = function (a) {
    return a instanceof Error ? a : new Z(a);
  };
  Z.__super__ = Error;
  Z.prototype = D(Error.prototype, {
    __class__: Z,
  });
  var E = function () {};
  E.__name__ = !0;
  E.getClass = function (a) {
    if (a instanceof Array && null == a.__enum__) return Array;
    var b = a.__class__;
    if (null != b) return b;
    a = E.__nativeClassName(a);
    return null != a ? E.__resolveNativeClass(a) : null;
  };
  E.__string_rec = function (a, b) {
    if (null == a) return 'null';
    if (5 <= b.length) return '<...>';
    var c = typeof a;
    'function' == c && (a.__name__ || a.__ename__) && (c = 'object');
    switch (c) {
      case 'function':
        return '<function>';
      case 'object':
        if (a instanceof Array) {
          if (a.__enum__) {
            if (2 == a.length) return a[0];
            c = a[0] + '(';
            b += '\t';
            for (var d = 2, e = a.length; d < e; ) {
              var f = d++;
              c =
                2 != f
                  ? c + (',' + E.__string_rec(a[f], b))
                  : c + E.__string_rec(a[f], b);
            }
            return c + ')';
          }
          c = a.length;
          d = '[';
          b += '\t';
          for (e = 0; e < c; )
            (f = e++), (d += (0 < f ? ',' : '') + E.__string_rec(a[f], b));
          return d + ']';
        }
        try {
          d = a.toString;
        } catch (m) {
          return '???';
        }
        if (
          null != d &&
          d != Object.toString &&
          'function' == typeof d &&
          ((c = a.toString()), '[object Object]' != c)
        )
          return c;
        c = null;
        d = '{\n';
        b += '\t';
        e = null != a.hasOwnProperty;
        for (c in a)
          (e && !a.hasOwnProperty(c)) ||
            'prototype' == c ||
            '__class__' == c ||
            '__super__' == c ||
            '__interfaces__' == c ||
            '__properties__' == c ||
            (2 != d.length && (d += ', \n'),
            (d += b + c + ' : ' + E.__string_rec(a[c], b)));
        b = b.substring(1);
        return d + ('\n' + b + '}');
      case 'string':
        return a;
      default:
        return String(a);
    }
  };
  E.__interfLoop = function (a, b) {
    if (null == a) return !1;
    if (a == b) return !0;
    var c = a.__interfaces__;
    if (null != c)
      for (var d = 0, e = c.length; d < e; ) {
        var f = d++;
        f = c[f];
        if (f == b || E.__interfLoop(f, b)) return !0;
      }
    return E.__interfLoop(a.__super__, b);
  };
  E.__instanceof = function (a, b) {
    if (null == b) return !1;
    switch (b) {
      case Array:
        return a instanceof Array ? null == a.__enum__ : !1;
      case mc:
        return 'boolean' == typeof a;
      case qc:
        return !0;
      case kc:
        return 'number' == typeof a;
      case rc:
        return 'number' == typeof a ? (a | 0) === a : !1;
      case String:
        return 'string' == typeof a;
      default:
        if (null != a)
          if ('function' == typeof b) {
            if (a instanceof b || E.__interfLoop(E.getClass(a), b)) return !0;
          } else {
            if ('object' == typeof b && E.__isNativeObj(b) && a instanceof b)
              return !0;
          }
        else return !1;
        return (b == sc && null != a.__name__) ||
          (b == tc && null != a.__ename__)
          ? !0
          : a.__enum__ == b;
    }
  };
  E.__cast = function (a, b) {
    if (E.__instanceof(a, b)) return a;
    throw new Z('Cannot cast ' + la.string(a) + ' to ' + la.string(b));
  };
  E.__nativeClassName = function (a) {
    a = E.__toStr.call(a).slice(8, -1);
    return 'Object' == a || 'Function' == a || 'Math' == a || 'JSON' == a
      ? null
      : a;
  };
  E.__isNativeObj = function (a) {
    return null != E.__nativeClassName(a);
  };
  E.__resolveNativeClass = function (a) {
    return window[a];
  };
  var wa = function (a) {
    if (a instanceof Array && null == a.__enum__)
      (this.a = a), (this.byteLength = a.length);
    else {
      this.a = [];
      for (var b = 0; b < a; ) {
        var c = b++;
        this.a[c] = 0;
      }
      this.byteLength = a;
    }
  };
  wa.__name__ = !0;
  wa.sliceImpl = function (a, b) {
    var c = new ec(this, a, null == b ? null : b - a),
      d = new tb(c.byteLength);
    new ec(d).set(c);
    return d;
  };
  wa.prototype = {
    slice: function (a, b) {
      return new wa(this.a.slice(a, b));
    },
    __class__: wa,
  };
  var Ia = function () {};
  Ia.__name__ = !0;
  Ia._new = function (a, b, c) {
    if ('number' == typeof a) {
      c = [];
      for (b = 0; b < a; ) {
        var d = b++;
        c[d] = 0;
      }
      c.byteLength = c.length;
      c.byteOffset = 0;
      c.buffer = new wa(c);
    } else if (E.__instanceof(a, wa))
      null == b && (b = 0),
        null == c && (c = a.byteLength - b),
        (c = 0 == b ? a.a : a.a.slice(b, b + c)),
        (c.byteLength = c.length),
        (c.byteOffset = b),
        (c.buffer = a);
    else if (a instanceof Array && null == a.__enum__)
      (c = a.slice()),
        (c.byteLength = c.length),
        (c.byteOffset = 0),
        (c.buffer = new wa(c));
    else throw new Z('TODO ' + la.string(a));
    c.subarray = Ia._subarray;
    c.set = Ia._set;
    return c;
  };
  Ia._set = function (a, b) {
    if (E.__instanceof(a.buffer, wa)) {
      if (a.byteLength + b > this.byteLength)
        throw new Z('set() outside of range');
      for (var c = 0, d = a.byteLength; c < d; ) {
        var e = c++;
        this[e + b] = a[e];
      }
    } else if (a instanceof Array && null == a.__enum__) {
      if (a.length + b > this.byteLength) throw new Z('set() outside of range');
      c = 0;
      for (d = a.length; c < d; ) (e = c++), (this[e + b] = a[e]);
    } else throw new Z('TODO');
  };
  Ia._subarray = function (a, b) {
    var c = Ia._new(this.slice(a, b));
    c.byteOffset = a;
    return c;
  };
  var n = function () {};
  n.__name__ = !0;
  var q = function () {};
  q.__name__ = !0;
  var gc = function (a, b, c, d) {
    null == d && (d = 0);
    null == c && (c = 1);
    var e = this;
    this.image = ROTATE_Manager.loadImage(a);
    this.colorOffset = d;
    ROTATE_Manager.loadTextFile(b, function (f) {
      f = JSON.parse(f);
      e.lineHeight = f.l * c;
      f = f.c;
      e.chars = [];
      for (var m = 0; m < f.length; ) {
        var k = f[m];
        ++m;
        k.x *= c;
        k.y *= c;
        k.w *= c;
        k.h *= c;
        k.xo *= c;
        k.yo *= c;
        k.xa *= c;
        e.chars[k.c] = k;
      }
    });
  };
  gc.__name__ = !0;
  gc.prototype = {
    __class__: gc,
  };
  var ROTATE_Game = function () {
    this.muteMusic = false;
    this.muteSFX = false;
    this.ieMenu = false;
    this.ieGame1 = false;
    this.ieGame2 = false;
    this.ieSurface = false;
    this.ieUnmuted = false;
    this.invert = false;
    this.fader = new ROTATE_CanvasObject();
    this.fading = false;
    this.fadingSlow = false;
    this.timerHolder = new ROTATE_CanvasObject();
    this.pauseOnInit = false;
    this.pausedTime = 0;
    this.hasPaused = false;
    this.paused = false;
    ROTATE_CanvasObject.call(this);
  };
  ROTATE_Game.__name__ = !0;
  ROTATE_Game.main = function () {
    ROTATE_Game.instance = new ROTATE_Game();
    ROTATE_Game.instance.addEventListener(
      'added',
      ((gameInstance = ROTATE_Game.instance),
      Bind(gameInstance, gameInstance.init)),
    );
    ROTATE_Canvas.start(
      document.getElementById('game'),
      504 /* width */,
      504 /* height */,
      0x202020 /* background */,
      false /* transparent */,
      ROTATE_Game.instance,
    );
  };
  ROTATE_Game.smootherStep = function (a) {
    return a * a * a * (a * (6 * a - 15) + 10);
  };
  ROTATE_Game.quantize = function (a) {
    return Math.floor(a / n.tileSize);
  };
  ROTATE_Game.getInputX = function () {
    return (
      (InputKeys.keyDown(KEY_CODES.ArrowLeft) ||
      InputKeys.keyDown(KEY_CODES.KeyA)
        ? -1
        : 0) +
      (InputKeys.keyDown(KEY_CODES.ArrowRight) ||
      InputKeys.keyDown(KEY_CODES.KeyD)
        ? 1
        : 0)
    );
  };
  ROTATE_Game.getInputY = function () {
    return (
      (InputKeys.keyDown(KEY_CODES.ArrowUp) || InputKeys.keyDown(KEY_CODES.KeyW)
        ? -1
        : 0) +
      (InputKeys.keyDown(KEY_CODES.ArrowDown) ||
      InputKeys.keyDown(KEY_CODES.KeyS)
        ? 1
        : 0)
    );
  };
  ROTATE_Game.formatMS = function (a) {
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
  };
  ROTATE_Game.__super__ = ROTATE_CanvasObject;
  ROTATE_Game.prototype = D(ROTATE_CanvasObject.prototype, {
    get_gameTimeMS: function () {
      return this.paused
        ? this.pauseStart - this.pausedTime
        : Time.get_currentMS() - this.pausedTime;
    },
    get_gameTime: function () {
      return 0.001 * this.get_gameTimeMS();
    },
    init: function (a) {
      this.removeEventListener('added', Bind(this, this.init));
      ROTATE_Canvas.set_imageSmoothingEnabled(!1);
      ROTATE_Manager.addEventListener('finished', Bind(this, this.loaded));
    },
    loaded: function (a) {
      var b = this;
      ROTATE_Game.nosave = !ra.test();
      ROTATE_Game.nosave || this.loadProgress();
      a = (function () {
        var c = -1,
          d = window.navigator.userAgent,
          e = d.indexOf('MSIE '),
          f = d.indexOf('Trident/');
        0 < e
          ? (c = parseInt(d.substring(e + 5, d.indexOf('.', e)), 10))
          : 0 < f &&
            ((c = d.indexOf('rv:')),
            (c = parseInt(d.substring(c + 3, d.indexOf('.', c)), 10)));
        return -1 < c ? c : void 0;
      })();
      ROTATE_Game.ie = 0 < a && 11 >= a;
      ROTATE_Game.ie && (this.muteSFX = this.muteMusic = !0);
      this.lastTick = Time.get_currentMS();
      this.addEventListener('enterFrame', Bind(this, this.update));
      window.document.getElementById('game').style.display = 'block';
      window.document.getElementById('loader').style.display = 'none';
      this.pauseMenu = new ub();
      this.addChild(this.pauseMenu);
      this.fader.mouseEnabled = !0;
      this.addChild(this.fader);
      this.addChild(this.timerHolder);
      v.setup(this);
      ROTATE_Canvas.input.addEventListener('blur', function (c) {
        null != b.targetScreen &&
          b.targetScreen.pausable &&
          (b.pauseOnInit = !0);
        null != b.currentScreen && b.currentScreen.pausable && b.pause();
      });
      this.changeScreen(new vb(), !1);
    },
    pause: function (a) {
      null == a && (a = !0);
      this.paused ||
        (a && null != this.targetScreen && this.targetScreen.pausable
          ? (this.pauseOnInit = !0)
          : ((this.paused = !0),
            (this.pauseStart = Time.get_currentMS()),
            null != this.pauseMenu &&
              ((this.pauseMenu.visible = !0), this.pauseMenu.onPause()),
            (this.hasPaused = !0),
            E.__instanceof(this.currentScreen, w) &&
              null != w.i.pauseText &&
              (w.i.pauseText.parent.removeChild(w.i.pauseText),
              (w.i.pauseText = null))));
    },
    unpause: function () {
      this.paused &&
        null == this.targetScreen &&
        ((this.paused = !1),
        (this.pausedTime += Time.get_currentMS() - this.pauseStart),
        (this.pauseMenu.visible = !1));
    },
    getFadeSpeed: function () {
      return this.fadingSlow ? n.screenFadeTimeSlow : n.screenFadeTime;
    },
    changeScreen: function (a, b, c, d, e) {
      null == e && (e = !1);
      null == d && (d = !1);
      null == b && (b = !0);
      this.screenCallback = c;
      b
        ? null == this.targetScreen &&
          ((this.fading = !0),
          (this.fadingSlow = d),
          (this.fadeStart = Time.get_currentMS()),
          this.fader.graphics.clear(),
          this.fader.graphics.beginFill(e ? 16777215 : 1052688),
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
              this.setScreen(a))
            : ((this.targetScreen = a), this.currentScreen.prekill()))
        : ((this.fading = !1),
          this.fader.set_alpha(0),
          (this.fader.mouseEnabled = !1),
          null != this.currentScreen && this.currentScreen.prekill(),
          (this.targetScreen = null),
          this.setScreen(a),
          this.currentScreen.ready());
    },
    setScreen: function (a) {
      null != this.currentScreen &&
        (this.currentScreen.kill(), this.removeChild(this.currentScreen));
      this.currentScreen = a;
      this.addChildAt(this.currentScreen, 0);
      this.currentScreen.init();
      null != this.screenCallback && this.screenCallback();
      this.screenCallback = null;
      this.currentScreen.pausable
        ? this.pauseOnInit && this.pause(!1)
        : this.unpause();
      this.pauseOnInit = !1;
    },
    update: function (a) {
      null != this.targetScreen
        ? ((a = Math.min(
            (Time.get_currentMS() - this.fadeStart) / (this.getFadeSpeed() / 2),
            1,
          )),
          this.fader.set_alpha(ROTATE_Game.smootherStep(a)),
          1 == a &&
            ((a = this.targetScreen),
            (this.targetScreen = null),
            this.setScreen(a)))
        : 0 < this.fader.alpha &&
          ((a = Math.min(
            (Time.get_currentMS() - this.fadeStart) /
              (this.getFadeSpeed() / 2) -
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
        for (a = 0; this.get_gameTimeMS() - this.lastTick >= n.tickMS; )
          if (
            ((this.lastTick += n.tickMS),
            null != this.currentScreen && this.currentScreen.tick(),
            ++a,
            a == n.ticksMax)
          ) {
            this.lastTick = this.get_gameTimeMS();
            break;
          }
        null != this.currentScreen && this.currentScreen.postUpdate();
      }
      v.update();
    },
    migrateProgress: function () {
      try {
        if (null != JSON.parse(window.atob(ra.getItem('lws:rotate')))) return;
      } catch (k) {}
      try {
        var a = JSON.parse(window.atob(ra.getItem('data'))),
          b = a.unlocked;
        if (
          'number' == typeof b &&
          (b | 0) === b &&
          0 <= a.unlocked &&
          a.unlocked < ROTATE_Levels.list.length &&
          a.awards instanceof Array &&
          null == a.awards.__enum__ &&
          a.awards.length == v.all.length
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
          for (var e = v.all.length; d < e; ) {
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
          ra.setItem('lws:rotate', window.btoa(JSON.stringify(m)));
          ra.removeItem('data');
        }
      } catch (k) {}
    },
    loadProgress: function () {
      this.migrateProgress();
      try {
        var a = ra.getItem('lws:rotate');
        if (null != a && '' != a) {
          var b = JSON.parse(za.decode(a).toString());
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
                c[e] && (v.all[e].unlocked = !0);
              }
            }
            null != b.best && (ROTATE_Levels.speedrunBest = b.best);
            null != b.invert && (this.invert = 1 == b.invert);
          }
        }
      } catch (f) {
        f instanceof Z && (f = f.val), console.log(f);
      }
    },
    saveProgress: function () {
      for (var a = [], b = 0, c = v.all; b < c.length; ) {
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
      ra.setItem('lws:rotate', za.encode(ya.ofString(JSON.stringify(a))));
    },
    clearProgress: function () {
      ra.removeItem('lws:rotate');
      for (var a = 0, b = v.all; a < b.length; ) {
        var c = b[a];
        ++a;
        c.unlocked = !1;
      }
      ROTATE_Levels.unlocked = 0;
      ROTATE_Levels.speedrunBest = -1;
      this.invert = !1;
    },
    warnNoSave: function (a) {
      if (ROTATE_Game.nosave) {
        var b = new ROTATE_Text(
          ROTATE_Game.fontMain,
          'Enable cookies & site data\nto save your progress!',
          2,
        );
        b.set_x(8);
        b.set_y(4);
        b.set_scaleX(b.set_scaleY(0.5));
        a.addChild(b);
      }
    },
    toggleSFX: function (a) {
      null == a && (a = !0);
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
      a && this.saveProgress();
    },
    toggleMusic: function (a) {
      null == a && (a = !0);
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
      a && this.saveProgress();
    },
    __class__: ROTATE_Game,
  });
  var ROTATE_Audio = function () {};
  ROTATE_Audio.__name__ = !0;
  var ra = function () {};
  ra.__name__ = !0;
  ra.getItem = function (a) {
    try {
      return window.localStorage.getItem(a);
    } catch (b) {
      b instanceof Z && (b = b.val);
      if ('SecurityError' != b.name && 'DOMException' != b.name)
        throw Z.wrap(b);
      return null;
    }
  };
  ra.setItem = function (a, b) {
    try {
      window.localStorage.setItem(a, b);
    } catch (c) {
      if (
        (c instanceof Z && (c = c.val),
        'SecurityError' != c.name && 'DOMException' != c.name)
      )
        throw Z.wrap(c);
    }
  };
  ra.removeItem = function (a) {
    try {
      window.localStorage.removeItem(a);
    } catch (b) {
      if (
        (b instanceof Z && (b = b.val),
        'SecurityError' != b.name && 'DOMException' != b.name)
      )
        throw Z.wrap(b);
    }
  };
  ra.test = function () {
    try {
      window.localStorage.setItem('?', '!');
      if ('!' != window.localStorage.getItem('?')) return !1;
      window.localStorage.removeItem('?');
      return !0;
    } catch (a) {
      a instanceof Z && (a = a.val);
      if ('SecurityError' != a.name && 'DOMException' != a.name)
        throw Z.wrap(a);
      return !1;
    }
  };
  var Ka = function (a, b) {
    this.unlocked = !1;
    this.name = a;
    this.icon = b;
  };
  Ka.__name__ = !0;
  Ka.prototype = {
    unlock: function () {
      if (this.unlocked) return !1;
      this.unlocked = !0;
      ROTATE_Game.instance.saveProgress();
      E.__instanceof(ROTATE_Game.instance.currentScreen, ib) &&
        ROTATE_Game.instance.currentScreen.refresh();
      v.queueNotify(this);
      return !0;
    },
    __class__: Ka,
  };
  var v = function () {};
  v.__name__ = !0;
  v.setup = function (a) {
    null == v.bubble &&
      ((v.bubble = new ROTATE_CanvasObject()),
      (v.bubble.mouseEnabled = !0),
      a.addChild(v.bubble),
      (v.bubbleTitle = new ROTATE_Text(ROTATE_Game.fontMain, 'NEW AWARD')),
      v.bubbleTitle.set_x(68),
      v.bubbleTitle.set_y(4),
      v.bubbleTitle.set_alpha(0.5),
      v.bubble.addChild(v.bubbleTitle),
      (v.bubbleName = new ROTATE_Text(ROTATE_Game.fontMain, '')),
      v.bubbleName.set_x(68),
      v.bubbleName.set_y(28),
      v.bubble.addChild(v.bubbleName),
      v.bubble.set_alpha(0));
  };
  v.queueNotify = function (a) {
    null == v.queue && (v.queue = []);
    null != a && 0 > v.queue.indexOf(a) && v.queue.push(a);
  };
  v.adjustBubble = function (a, b) {
    v.bubbleName.set_text(ma.replace(a, '\n', ' '));
    v.bubble.graphics.clear();
    var c =
      Math.max(v.bubbleTitle.get_width(), v.bubbleName.get_width()) +
      v.bubbleName.x +
      12 +
      4;
    v.bubble.graphics.beginFill(3158064);
    v.bubble.graphics.drawRect(0, 0, c, 68);
    v.bubble.graphics.beginFill(6316128);
    v.bubble.graphics.drawRect(0, 0, c - 2, 66);
    v.bubble.graphics.beginFill(4210752);
    v.bubble.graphics.drawRect(0, 0, c - 4, 64);
    null != v.bubbleIcon && v.bubble.removeChild(v.bubbleIcon);
    v.bubbleIcon = new I(b);
    v.bubbleIcon.set_x(8);
    v.bubbleIcon.set_y(8);
    v.bubble.addChild(v.bubbleIcon);
  };
  v.update = function () {
    if (null != v.bubble) {
      var a = 0,
        b = Time.get_currentMS();
      if (-1 != v.bubbleTimer) {
        var c = b - v.bubbleTimer;
        var d = c <= 2 * v.FADE_MS + v.STAY_MS;
      } else d = !1;
      d
        ? ((a = c <= v.FADE_MS ? 0 : c <= v.FADE_MS + v.STAY_MS ? 1 : 2),
          (a =
            0 == a
              ? ROTATE_Game.smootherStep(c / v.FADE_MS)
              : 1 == a
                ? 1
                : 1 -
                  ROTATE_Game.smootherStep(
                    (c - v.FADE_MS - v.STAY_MS) / v.FADE_MS,
                  )))
        : null != v.queue &&
          0 < v.queue.length &&
          ((c = v.queue.shift()),
          v.adjustBubble(c.name, c.icon),
          (v.bubbleTimer = b));
      v.bubble.set_alpha(a);
      v.bubble.set_y(-68 * (1 - a));
    }
  };
  var wb = function (a, b, c, d) {
    this.x = a;
    this.y = b;
    this.id = c;
    this.meta = null == d ? [] : d;
  };
  wb.__name__ = !0;
  wb.prototype = {
    get_block: function () {
      return F.getBlock(this.id);
    },
    getMeta: function (a) {
      return null != this.meta && null != this.meta[a] ? this.meta[a] : 0;
    },
    metaEquals: function (a) {
      if (null == this.meta && null == a) return !0;
      if (this.meta.length != a.length) return !1;
      for (var b = 0, c = a.length; b < c; ) {
        var d = b++;
        if (a[d] != this.meta[d]) return !1;
      }
      return !0;
    },
    __class__: wb,
  };
  var ua = function (a, b, c) {
    this.animChanged = !1;
    this.frame = this.animTimer = this.lastF = 0;
    this.origin = new Q(0, 0);
    var d = this;
    ROTATE_CanvasObject.call(this);
    this.image = a;
    this.frameW = b;
    this.frameH = c;
    this.cols = Math.floor(this.image.width / b);
    this.rows = Math.floor(this.image.height / c);
    this.frames = this.cols * this.rows;
    this.addEventListener('render', function (e) {
      d.render(e.surface);
    });
  };
  ua.__name__ = !0;
  ua.__super__ = ROTATE_CanvasObject;
  ua.prototype = D(ROTATE_CanvasObject.prototype, {
    set_frame: function (a) {
      return (this.frame = 0 > a || a >= this.frames ? 0 : a);
    },
    set_animation: function (a) {
      this.animation != a &&
        ((this.animTimer = ROTATE_Game.instance.get_gameTimeMS()),
        (this.animChanged = !0));
      return (this.animation = a);
    },
    render: function (a) {
      if (
        null != this.animation &&
        null != this.animation.frames &&
        0 < this.animation.frames.length
      ) {
        for (
          var b = ROTATE_Game.instance.get_gameTimeMS() - this.animTimer,
            c = 0,
            d = !1;
          b > this.animation.delays[c];

        )
          if (
            ((b -= this.animation.delays[c]),
            ++c,
            c == this.animation.frames.length)
          )
            if (((d = !0), this.animation.loop)) c = 0;
            else {
              c = this.animation.frames.length - 1;
              break;
            }
        this.frame = this.animation.frames[c];
        if (null != this.onChange && (this.animChanged || this.lastF != c))
          this.onChange(c);
        if (!this.animChanged && d && null != this.onFinish) this.onFinish();
        this.lastF = c;
      } else this.frame >= this.frames && (this.frame = 0);
      a.drawImage(
        this.image,
        this.getFrameRect(this.frame),
        -this.origin.x,
        -this.origin.y,
      );
      this.animChanged = !1;
    },
    getFrameRect: function (a) {
      return new Bounds(
        (a % this.cols) * this.frameW,
        Math.floor(a / this.cols) * this.frameH,
        this.frameW,
        this.frameH,
      );
    },
    getBoundsSelf: function () {
      return new Bounds(
        -this.origin.x,
        -this.origin.y,
        this.frameW,
        this.frameH,
      );
    },
    __class__: ua,
  });
  var sa = function (a, b, c) {
    null == c && (c = !0);
    this.loop = !1;
    this.frames = a;
    this.delays = b;
    this.loop = c;
  };
  sa.__name__ = !0;
  sa.prototype = {
    __class__: sa,
  };
  var S = function () {
    this.horizontal = this.x2 = this.dx = 0;
    ua.call(this, q.cat, 24, 24);
    this.origin.x = this.frameW / 2;
    this.origin.y = this.frameH;
  };
  S.__name__ = !0;
  S.__super__ = ua;
  S.prototype = D(ua.prototype, {
    tick: function () {
      0 < this.horizontal
        ? this.dx < S.SPEED &&
          (this.dx < -S.ACCEL
            ? (this.dx *= S.DECCEL_MULT)
            : ((this.dx += S.ACCEL), this.dx > S.SPEED && (this.dx = S.SPEED)))
        : 0 > this.horizontal
          ? this.dx > -S.SPEED &&
            (this.dx > S.ACCEL
              ? (this.dx *= S.DECCEL_MULT)
              : ((this.dx -= S.ACCEL),
                this.dx < -S.SPEED && (this.dx = -S.SPEED)))
          : (this.dx *= S.DECCEL_MULT);
      this.x2 += this.dx;
      this.set_x(Math.round(this.x2));
    },
    __class__: S,
  });
  var hc = function (a) {
    this.lastChanged = -1;
    this.signals = [];
    this.id = a;
  };
  hc.__name__ = !0;
  hc.prototype = {
    get_status: function () {
      return 0 < this.signals.length;
    },
    signalOn: function (a, b) {
      var c = a + 'x' + b;
      0 > this.signals.indexOf(c) &&
        (this.get_status() ||
          (this.lastChanged = ROTATE_Game.instance.get_gameTime()),
        this.signals.push(c));
    },
    signalOff: function (a, b) {
      var c = this.signals.indexOf(a + 'x' + b);
      -1 < c &&
        (this.signals.splice(c, 1),
        this.get_status() ||
          (this.lastChanged = ROTATE_Game.instance.get_gameTime()));
    },
    __class__: hc,
  };
  var Va = function (a) {
    this.x = a.x;
    this.y = a.y;
    this.channel = a.getMeta(0);
    this.length = a.getMeta(1);
    this.angle = a.getMeta(2);
  };
  Va.__name__ = !0;
  Va.canPlace = function (a, b, c) {
    if (!l.isInBounds(a, b)) return !1;
    var d = c[1];
    c = c[2];
    if (3 == c) {
      if (b < d - 1) return !1;
      d = b - (d - 1);
      for (b += 1; d < b; ) if (((c = d++), !l.isReplacable(a, c))) return !1;
    } else if (2 == c) {
      if (a < d - 1) return !1;
      d = a - (d - 1);
      for (a += 1; d < a; ) if (((c = d++), !l.isReplacable(c, b))) return !1;
    } else if (1 == c) {
      if (b > l.get_height() - d) return !1;
      c = b;
      for (b += d; c < b; ) if (((d = c++), !l.isReplacable(a, d))) return !1;
    } else {
      if (a > l.get_width() - d) return !1;
      c = a;
      for (a += d; c < a; ) if (((d = c++), !l.isReplacable(d, b))) return !1;
    }
    return !0;
  };
  Va.prototype = {
    contains: function (a, b) {
      return 3 == this.angle
        ? a == this.x && b <= this.y
          ? b > this.y - this.length
          : !1
        : 2 == this.angle
          ? b == this.y && a <= this.x
            ? a > this.x - this.length
            : !1
          : 1 == this.angle
            ? a == this.x && b >= this.y
              ? b < this.y + this.length
              : !1
            : b == this.y && a >= this.x
              ? a < this.x + this.length
              : !1;
    },
    forEach: function (a) {
      for (var b = 0, c = this.length; b < c; ) {
        var d = b++;
        3 == this.angle
          ? a(this.x, this.y - d)
          : 2 == this.angle
            ? a(this.x - d, this.y)
            : 1 == this.angle
              ? a(this.x, this.y + d)
              : a(this.x + d, this.y);
      }
    },
    __class__: Va,
  };
  var J = function () {
    this.lastStep = -1;
    this.step = 0;
    this.touchingOld = [];
    this.touching = [];
    this.onRamp = this.dead = this.finished = !1;
    this.lastStuck = -1;
    this.rotateAdjust = 0;
    this.jumpTimer = this.jumpTimer2 = this.rotateTimer = -1;
    this.grounded = !1;
    this.x2 =
      this.y2 =
      this.lastX =
      this.lastY =
      this.dx =
      this.dy =
      this.horizontal =
        0;
    ua.call(this, q.player, 32, 48);
    this.set_animation(J.ANIM_IDLE);
    this.onChange = Bind(this, this.aminChange);
    this.spawnTime = ROTATE_Game.instance.get_gameTimeMS();
    this.adjust();
  };
  J.__name__ = !0;
  J.__super__ = ua;
  J.prototype = D(ua.prototype, {
    get_localX: function () {
      return 0 == l.rotation
        ? this.x2
        : 1 == l.rotation
          ? l.get_height() - this.y2
          : 2 == l.rotation
            ? l.get_width() - this.x2
            : this.y2;
    },
    set_localX: function (a) {
      0 == l.rotation
        ? (this.x2 = a)
        : 1 == l.rotation
          ? (this.y2 = l.get_height() - a)
          : 2 == l.rotation
            ? (this.x2 = l.get_width() - a)
            : 3 == l.rotation && (this.y2 = a);
      return a;
    },
    get_localY: function () {
      return 0 == l.rotation
        ? this.y2
        : 1 == l.rotation
          ? this.x2
          : 2 == l.rotation
            ? l.get_height() - this.y2
            : l.get_width() - this.x2;
    },
    set_localY: function (a) {
      0 == l.rotation
        ? (this.y2 = a)
        : 1 == l.rotation
          ? (this.x2 = a)
          : 2 == l.rotation
            ? (this.y2 = l.get_height() - a)
            : 3 == l.rotation && (this.x2 = l.get_width() - a);
      return a;
    },
    aminChange: function (a) {
      this.animation == J.ANIM_RUN &&
        0 == a &&
        100 < ROTATE_Game.instance.get_gameTimeMS() - this.lastStep &&
        ((ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
          ROTATE_Audio.steps.play(0 == this.step ? 'a' : 'b'),
        (this.lastStep = ROTATE_Game.instance.get_gameTimeMS()),
        (this.step = 0 == this.step ? 1 : 0));
    },
    adjust: function () {
      this.origin.x = this.frameW / 2;
      this.origin.y = this.frameH - (l.rotating ? n.rotateOffset : 0);
    },
    update: function () {
      if (
        !l.rotating &&
        !this.dead &&
        ((this.horizontal = this.finished ? 0 : ROTATE_Game.getInputX()),
        0 != this.horizontal
          ? this.set_scaleX(0 < this.horizontal ? 1 : -1)
          : this.grounded &&
            this.animation != J.ANIM_IDLE &&
            this.set_animation(J.ANIM_IDLE),
        !this.finished &&
          (InputKeys.keyPressed(KEY_CODES.ArrowDown) ||
            InputKeys.keyPressed(KEY_CODES.KeyS)))
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
    },
    touchingFinish: function () {
      return l.rotating ||
        this.dead ||
        this.finished ||
        !this.grounded ||
        0 != l.rotation ||
        Math.floor(this.x2 / n.tileSize) != l.level.finishCol
        ? !1
        : Math.floor(this.y2 / n.tileSize) == l.level.finishRow + 1;
    },
    tick: function () {
      if (!l.rotating && !this.dead) {
        null == this.lastBounds && (this.lastBounds = this.getHitBounds());
        var a = J.SPEED * (this.onRamp ? J.RAMP_MULT : 1);
        0 < this.horizontal
          ? this.dx < a
            ? this.dx < -J.ACCEL
              ? (this.dx *= J.DECCEL_MULT)
              : ((this.dx += J.ACCEL), this.dx > a && (this.dx = a))
            : this.dx > a && (this.dx = a)
          : 0 > this.horizontal
            ? this.dx > -a
              ? this.dx > J.ACCEL
                ? (this.dx *= J.DECCEL_MULT)
                : ((this.dx -= J.ACCEL), this.dx < -a && (this.dx = -a))
              : this.dx < -a && (this.dx = -a)
            : (this.dx *= J.DECCEL_MULT);
        !this.finished &&
        this.grounded &&
        this.jumpKeyDown() &&
        ROTATE_Game.instance.get_gameTime() - this.jumpTimer >= J.JUMP_DELAY &&
        ROTATE_Game.instance.get_gameTime() - this.jumpTimer2 >= J.JUMP_DELAY_2
          ? ((this.dy = -J.JUMP_SPEED),
            (this.jumpTimer = ROTATE_Game.instance.get_gameTime()),
            (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
              ROTATE_Audio.steps.play('a'),
            (this.lastStep = ROTATE_Game.instance.get_gameTimeMS()))
          : this.dy < J.GRAVITY_MAX &&
            ((this.dy += J.GRAVITY),
            this.dy > J.GRAVITY_MAX && (this.dy = J.GRAVITY_MAX));
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
        this.get_localY() - p < -n.E && (this.grounded = !0);
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
              c && k
                ? !0
                : this.isColliding(null, Bind(this, this.rampCheck), 1);
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
            ? this.set_animation(J.ANIM_RUN)
            : this.set_animation(J.ANIM_IDLE)
          : l.rotating ||
            (0 <= this.dy
              ? this.set_animation(J.ANIM_FALL)
              : this.set_animation(J.ANIM_JUMP));
        this.lastX = this.x2;
        this.lastY = this.y2;
        this.lastBounds = this.getHitBounds();
      }
      this.set_x(Math.round(this.x2));
      this.set_y(Math.round(this.y2));
    },
    postUpdate: function () {
      this.set_x(Math.round(this.x2));
      this.set_y(Math.round(this.y2));
    },
    getHitBounds: function (a, b, c, d, e) {
      null == e && (e = !1);
      null == d && (d = 0);
      null == c && (c = 0);
      null == b && (b = 0);
      null == a && (a = !0);
      if (a) (b = this.x2), (c = this.y2), (d = l.rotation);
      else {
        for (; 0 > d; ) d += 4;
        for (; 3 < d; ) d -= 4;
      }
      var f = 0 == d || 2 == d,
        m = f ? J.HIT_W : J.HIT_H;
      f = f ? J.HIT_H : J.HIT_W;
      a = (a && l.rotating) || (!a && e) ? n.rotateOffset : 0;
      return 3 == d
        ? new Bounds(b - a, c - f / 2, m, f)
        : 2 == d
          ? new Bounds(b - m / 2, c - a, m, f)
          : 1 == d
            ? new Bounds(b - m + a, c - f / 2, m, f)
            : new Bounds(b - m / 2, c - f + a, m, f);
    },
    rampCheck: function (a) {
      return E.__instanceof(a, Wa)
        ? (0 != l.rotation || (0 != a.dir && 1 != a.dir)) &&
          (1 != l.rotation || (3 != a.dir && 0 != a.dir)) &&
          (2 != l.rotation || (2 != a.dir && 3 != a.dir))
          ? 3 == l.rotation
            ? 1 != a.dir
              ? 2 == a.dir
              : !0
            : !1
          : !0
        : !1;
    },
    nonRampCheck: function (a) {
      return !this.rampCheck(a);
    },
    rampCheckDX: function (a) {
      return E.__instanceof(a, Wa)
        ? (0 == l.rotation &&
            ((0 < this.dx && 0 == a.dir) || (0 > this.dx && 1 == a.dir))) ||
          (1 == l.rotation &&
            ((0 < this.dx && 3 == a.dir) || (0 > this.dx && 0 == a.dir))) ||
          (2 == l.rotation &&
            ((0 < this.dx && 2 == a.dir) || (0 > this.dx && 3 == a.dir)))
          ? !0
          : 3 == l.rotation
            ? 0 < this.dx && 1 == a.dir
              ? !0
              : 0 > this.dx
                ? 2 == a.dir
                : !1
            : !1
        : !1;
    },
    nonRampCheckDX: function (a) {
      return !this.rampCheckDX(a);
    },
    isColliding: function (a, b, c) {
      null == c && (c = -1);
      a = null == a ? this.getHitBounds() : a;
      var d = ROTATE_Game.quantize(a.get_left()),
        e = ROTATE_Game.quantize(a.get_right() - n.E),
        f = ROTATE_Game.quantize(a.get_top()),
        m = ROTATE_Game.quantize(a.get_bottom() - n.E);
      for (m += 1; f < m; )
        for (var k = f++, p = d, y = e + 1; p < y; ) {
          var H = p++;
          if (!l.isInBounds(H, k)) return !0;
          var K = l.getBlockData(H, k),
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
    },
    updateTouching: function () {
      this.touchingOld = this.touching;
      this.touching = [];
      var a = this.getHitBounds(),
        b = ROTATE_Game.quantize(a.get_left()),
        c = ROTATE_Game.quantize(a.get_right() - n.E),
        d = ROTATE_Game.quantize(a.get_top()),
        e = ROTATE_Game.quantize(a.get_bottom() - n.E);
      for (e += 1; d < e; )
        for (var f = d++, m = b, k = c + 1; m < k; ) {
          var p = m++,
            y = l.getBlockData(p, f),
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
    },
    testBlockCollision: function (a, b, c, d, e) {
      null == e && (e = -1);
      var f = l.getBlockData(b, c);
      f = f.get_block().getColliders(f);
      for (var m = 0; m < f.length; ) {
        var k = f[m];
        ++m;
        if (null != k && (null == d || d(k)))
          if (E.__instanceof(k, La)) {
            if (
              ((k = k.bounds.copy()),
              (k.x += b * n.tileSize),
              (k.y += c * n.tileSize),
              a.intersects(k))
            )
              return !0;
          } else if (E.__instanceof(k, Wa)) {
            var p = new Q(a.get_right(), a.get_bottom());
            1 == k.dir && (p = new Q(a.get_left(), a.get_bottom()));
            2 == k.dir && (p = new Q(a.get_left(), a.get_top()));
            3 == k.dir && (p = new Q(a.get_right(), a.get_top()));
            p.x -= b * n.tileSize;
            p.y -= c * n.tileSize;
            if (k.testPoint(p)) return !0;
          } else if (E.__instanceof(k, jb)) {
            if (
              ((p = k.bounds.copy()),
              (p.x += b * n.tileSize),
              (p.y += c * n.tileSize),
              a.intersects(p))
            ) {
              var y = 1 == l.rotation || 3 == l.rotation,
                H = 0 == l.rotation || 2 == l.rotation,
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
            E.__instanceof(k, kb) &&
            ((p = k),
            (k = n.tileSize),
            (y = a.copy()),
            (y.x -= b * k),
            (y.y -= c * k),
            (p = new Q(
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
    },
    testAABBCircle: function (a, b, c) {
      return new Bounds(a.x, a.y - c, a.width, a.height + 2 * c).contains(b) ||
        new Bounds(a.x - c, a.y, a.width + 2 * c, a.height).contains(b) ||
        Q.distance(b, new Q(a.get_left(), a.get_top())) < c ||
        Q.distance(b, new Q(a.get_right(), a.get_top())) < c ||
        Q.distance(b, new Q(a.get_right(), a.get_bottom())) < c
        ? !0
        : Q.distance(b, new Q(a.get_left(), a.get_bottom())) < c;
    },
    jumpKeyDown: function () {
      return InputKeys.keyDown(KEY_CODES.ArrowUp) ||
        InputKeys.keyDown(KEY_CODES.KeyW)
        ? !0
        : InputKeys.keyDown(KEY_CODES.Space);
    },
    canRotate: function (a) {
      if (
        !this.grounded ||
        this.jumpKeyDown() ||
        ROTATE_Game.instance.get_gameTime() - this.rotateTimer <
          J.ROTATE_DELAY + n.rotateTime ||
        ROTATE_Game.instance.get_gameTime() - this.jumpTimer2 < J.JUMP_DELAY_2
      )
        return !1;
      var b = this.x2,
        c = this.y2;
      this.set_localY(this.get_localY() - n.rotateOffset);
      var d = l.rotation,
        e = l;
      e.set_rotation(e.rotation + a);
      l.rotating = !0;
      a = 0;
      for (e = this.isColliding(); e && a < n.rotateOffset; )
        (e = this.get_localY()),
          this.set_localY(e - 1),
          ++a,
          (e = this.isColliding(null, null, 1));
      this.rotateAdjust = a;
      l.set_rotation(d);
      l.rotating = !1;
      this.x2 = b;
      this.y2 = c;
      return !e;
    },
    onRotateStart: function (a) {
      this.set_localY(this.get_localY() - n.rotateOffset);
      this.set_scaleX(a);
      this.adjust();
      this.set_animation(J.ANIM_ROTATE);
      this.rotateTimer = ROTATE_Game.instance.get_gameTime();
      (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
        ROTATE_Audio.steps.play('a');
      this.lastStep = ROTATE_Game.instance.get_gameTimeMS();
      (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
        ROTATE_Audio.rotate.play();
    },
    onRotateStart2: function () {
      this.rotStartY = this.get_localY();
    },
    onRotating: function (a) {
      this.set_localY(this.rotStartY - this.rotateAdjust * a);
    },
    onRotateEnd: function () {
      this.dx = this.dy = 0;
      this.grounded = !1;
      this.set_localY(this.rotStartY - this.rotateAdjust + n.rotateOffset);
      this.adjust();
    },
    __class__: J,
  });
  var l = function () {};
  l.__name__ = !0;
  l.set_level = function (a) {
    if (null != a) {
      l.level = a;
      l.set_rotation(0);
      l.rotating = !1;
      l.tiles = [];
      for (var b = 0, c = a.tiles.length; b < c; ) {
        var d = b++;
        l.tiles[d] = [];
        for (var e = 0, f = a.tiles[d].length; e < f; ) {
          var m = e++;
          l.tiles[d][m] = a.tiles[d][m].slice(0);
        }
      }
      l.updateQueue = new Ra();
      b = 0;
      for (c = l.get_height(); b < c; )
        for (d = b++, e = 0, f = l.get_width(); e < f; ) {
          var k = e++;
          m = l.getBlockData(k, d);
          if (null == m.get_block() || 0 > m.id) l.tiles[d][k] = [0];
          else if (m.get_block().alwaysUpdate(m)) {
            var p = l.updateQueue;
            k = k + 'x' + d;
            null != na[k] ? p.setReserved(k, m) : (p.h[k] = m);
          }
        }
    } else l.level = null;
    return a;
  };
  l.set_rotation = function (a) {
    for (; 0 > a; ) a += 4;
    for (; 3 < a; ) a -= 4;
    l.rotation = a;
    return l.rotation;
  };
  l.get_height = function () {
    return null != l.level ? l.tiles.length : 0;
  };
  l.get_width = function () {
    return null != l.level ? l.tiles[0].length : 0;
  };
  l.isInBounds = function (a, b) {
    return null != l.level && 0 <= a && 0 <= b && a < l.get_width()
      ? b < l.get_height()
      : !1;
  };
  l.getBlockID = function (a, b) {
    return l.isInBounds(a, b) ? l.tiles[b][a][0] : 1;
  };
  l.getBlockMeta = function (a, b) {
    return !l.isInBounds(a, b) || 2 > l.tiles[b][a].length
      ? []
      : l.tiles[b][a].slice(1);
  };
  l.getBlockData = function (a, b) {
    return new wb(a, b, l.getBlockID(a, b), l.getBlockMeta(a, b));
  };
  l.getBlock = function (a, b) {
    return F.getBlock(l.getBlockID(a, b));
  };
  l.setBlock = function (a, b, c, d, e) {
    null == e && (e = !1);
    if (l.isInBounds(a, b)) {
      var f = a + 'x' + b,
        m = l.updateQueue;
      (null != na[f] ? m.existsReserved(f) : m.h.hasOwnProperty(f)) &&
        l.updateQueue.remove(f);
      l.tiles[b][a] = [c];
      null != d && (l.tiles[b][a] = l.tiles[b][a].concat(d));
      e && (l.level.tiles[b][a] = l.tiles[b][a].slice(0));
      a = l.getBlockData(a, b);
      F.getBlock(c).alwaysUpdate(a) &&
        ((c = l.updateQueue),
        null != na[f] ? c.setReserved(f, a) : (c.h[f] = a));
    }
  };
  l.setBlockMeta = function (a, b, c, d) {
    null == d && (d = !1);
    l.isInBounds(a, b) &&
      ((l.tiles[b][a] = [l.tiles[b][a][0]]),
      null != c && (l.tiles[b][a] = l.tiles[b][a].concat(c)),
      d && (l.level.tiles[b][a] = l.tiles[b][a].slice(0)),
      (c = a + 'x' + b),
      (d = l.updateQueue),
      null != na[c] ? d.existsReserved(c) : d.h.hasOwnProperty(c)) &&
      ((d = l.updateQueue),
      (a = l.getBlockData(a, b)),
      null != na[c] ? d.setReserved(c, a) : (d.h[c] = a));
  };
  l.isReplacable = function (a, b) {
    return a != l.level.startCol ||
      (b != l.level.startRow && b != l.level.startRow - 1)
      ? a == l.level.finishCol
        ? b != l.level.finishRow
          ? b != l.level.finishRow - 1
          : !1
        : !0
      : !1;
  };
  l.onPlay = function () {
    if (null != l.level) {
      l.leversChanged = new hb();
      for (var a = 0, b = l.tiles.length; a < b; )
        for (var c = a++, d = 0, e = l.tiles[c].length; d < e; ) {
          var f = d++;
          f = l.getBlockData(f, c);
          if (null != f.get_block()) f.get_block().onPlay(f);
        }
    }
  };
  var L = function (a) {
    this.showGrid = !1;
    var b = this;
    ROTATE_CanvasObject.call(this);
    if (null == L.bakeCanvas) {
      L.bakeCanvas = window.document.createElement('canvas');
      L.bakeCtx = L.bakeCanvas.getContext('2d', null);
      var c = L.bakeCtx;
      c.webkitImageSmoothingEnabled =
        c.mozImageSmoothingEnabled =
        c.msImageSmoothingEnabled =
        c.oImageSmoothingEnabled =
        c.imageSmoothingEnabled =
          !1;
      L.bakeSurface = new Surface(L.bakeCtx);
    }
    c = l.get_width() + 2;
    L.bakeCanvas.width = c * n.tileSize;
    c = l.get_height() + 2;
    L.bakeCanvas.height = c * n.tileSize;
    L.bakeSurface.reset();
    L.bakeSurface.clearRect(0, 0, L.bakeCanvas.width, L.bakeCanvas.height);
    if (
      null == L.gridCanvas &&
      E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor)
    ) {
      L.gridCanvas = window.document.createElement('canvas');
      L.gridCanvas.width =
        ROTATE_Editor.editorLevel.tiles[0].length * n.tileSize + 2;
      L.gridCanvas.height =
        ROTATE_Editor.editorLevel.tiles.length * n.tileSize + 2;
      L.gridCtx = L.gridCanvas.getContext('2d', null);
      L.gridSurface = new Surface(L.gridCtx);
      L.gridSurface.beginFill(2105376, 0.2);
      c = 0;
      for (var d = ROTATE_Editor.editorLevel.tiles.length + 1; c < d; )
        for (
          var e = c++, f = 0, m = ROTATE_Editor.editorLevel.tiles[0].length + 1;
          f < m;

        ) {
          var k = f++ * n.tileSize,
            p = e * n.tileSize;
          L.gridSurface.drawRect(k, p, 2, n.tileSize);
          L.gridSurface.drawRect(k + 2, p, n.tileSize - 2, 2);
        }
    }
    this.addEventListener('render', function (y) {
      b.render(y.surface, a);
    });
  };
  L.__name__ = !0;
  L.__super__ = ROTATE_CanvasObject;
  L.prototype = D(ROTATE_CanvasObject.prototype, {
    render: function (a, b) {
      if (null != l.level) {
        a.drawImage(L.bakeCanvas, null, -n.tileSize, -n.tileSize);
        var c = null;
        if (!l.rotating) {
          c = l.rotation;
          c = b.globalToLocal(
            1 == c || 2 == c ? ROTATE_Canvas.width : 0,
            2 == c || 3 == c ? ROTATE_Canvas.height : 0,
          );
          var d = Math.floor(c.x / n.tileSize),
            e = Math.floor((c.x + ROTATE_Canvas.width - n.E) / n.tileSize),
            f = Math.floor(c.y / n.tileSize),
            m = Math.floor((c.y + ROTATE_Canvas.height - n.E) / n.tileSize);
          c = function (fa, ka) {
            return fa >= d && ka >= f && fa <= e ? ka <= m : !1;
          };
        }
        var k = l.updateQueue;
        for (k = new fc(k, k.arrayKeys()); k.hasNext(); ) {
          var p = k.next(),
            y = l.rotating;
          if (!y)
            if (p.get_block() == F.door)
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
            (a.translate(p.x * n.tileSize, p.y * n.tileSize),
            p.get_block().render(a, p),
            a.translate(-p.x * n.tileSize, -p.y * n.tileSize));
        }
        this.showGrid &&
          null != L.gridCanvas &&
          a.drawImage(L.gridCanvas, null, 0, 0);
        if (
          E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
          ((c = ROTATE_Game.instance.currentScreen),
          !l.rotating && !c.player.dead && !c.player.finished)
        ) {
          k = 0;
          for (p = c.player.touching; k < p.length; )
            (y = p[k]),
              ++k,
              y.get_block().showArrow(y) && this.renderArrow(a, y.x, y.y);
          c.player.touchingFinish() &&
            this.renderArrow(a, l.level.finishCol, l.level.finishRow - 1, -4);
        }
      }
    },
    renderArrow: function (a, b, c, d) {
      null == d && (d = 0);
      var e = n.tileSize;
      a.translate((b + 0.5) * e, (c + 0.5) * e);
      a.rotate((-l.rotation * Math.PI) / 2);
      a.drawImage(
        q.interact,
        null,
        -q.interact.width / 2,
        Math.round(
          -e / 2 -
            q.interact.height +
            2 * Math.sin(8 * ROTATE_Game.instance.get_gameTime()),
        ) + d,
      );
      a.rotate((l.rotation * Math.PI) / 2);
      a.translate(-(b + 0.5) * e, -(c + 0.5) * e);
    },
    updateAllBlocks: function () {
      L.bakeSurface.setTransform(1, 0, 0, 1, 0, 0);
      L.bakeSurface.clearRect(0, 0, L.bakeCanvas.width, L.bakeCanvas.height);
      if (null != l.level) {
        for (
          var a = 1 == l.level.theme ? q.bgBricks : q.bgTiles,
            b = Math.ceil(L.bakeCanvas.width / a.width),
            c = 0,
            d = Math.ceil(L.bakeCanvas.height / a.height);
          c < d;

        )
          for (var e = c++, f = 0, m = b; f < m; ) {
            var k = f++;
            L.bakeSurface.drawImage(a, null, k * a.width, e * a.height);
          }
        this.renderDecals();
        a = -1;
        for (b = l.get_height() + 1; a < b; )
          for (c = a++, d = -1, e = l.get_width() + 1; d < e; )
            (f = d++),
              (m = l.getBlockData(f, c)),
              (k = m.get_block()),
              null != k &&
                k.shouldRender(m) &&
                !k.alwaysUpdate(m) &&
                (L.bakeSurface.translate(
                  (f + 1) * n.tileSize,
                  (c + 1) * n.tileSize,
                ),
                k.render(L.bakeSurface, m),
                L.bakeSurface.translate(
                  -(f + 1) * n.tileSize,
                  -(c + 1) * n.tileSize,
                ));
      }
    },
    updateBlockPlus: function (a, b, c) {
      null == c && (c = !1);
      L.bakeSurface.setTransform(1, 0, 0, 1, 0, 0);
      L.bakeSurface.clearRect(
        a * n.tileSize,
        b * n.tileSize,
        3 * n.tileSize,
        3 * n.tileSize,
      );
      for (var d = b - 1, e = b + 2; d < e; )
        for (var f = d++, m = a - 1, k = a + 2; m < k; ) {
          var p = m++;
          if (!c || p != a || f != b) {
            var y = l.getBlockData(p, f),
              H = y.get_block();
            if (null != H) {
              L.bakeSurface.translate(
                (p + 1) * n.tileSize,
                (f + 1) * n.tileSize,
              );
              var K = 1 == l.level.theme ? q.bgBricks : q.bgTiles;
              L.bakeSurface.drawImage(
                K,
                new Bounds(
                  ((p + 1) * n.tileSize) % K.width,
                  ((f + 1) * n.tileSize) % K.height,
                  n.tileSize,
                  n.tileSize,
                ),
                0,
                0,
              );
              H.shouldRender(y) &&
                !H.alwaysUpdate(y) &&
                H.render(L.bakeSurface, y);
              L.bakeSurface.translate(
                -(p + 1) * n.tileSize,
                -(f + 1) * n.tileSize,
              );
            }
          }
        }
      this.renderDecals();
    },
    renderDecals: function () {
      var a = n.tileSize;
      L.bakeSurface.drawImage(
        q.blocks,
        new Bounds(a, 2 * a, a, 2 * a),
        (l.level.startCol + 1) * a,
        l.level.startRow * a,
      );
      L.bakeSurface.drawImage(
        q.blocks,
        new Bounds(2 * a, 2 * a, a, 2 * a),
        (l.level.finishCol + 1) * a,
        l.level.finishRow * a,
      );
      E.__instanceof(l.level, ROTATE_Level8) &&
        L.bakeSurface.drawImage(
          q.blocks,
          new Bounds(2 * a, 2 * a, a, 2 * a),
          (ROTATE_Level8.fakeCol + 1) * a,
          ROTATE_Level8.fakeRow * a,
        );
    },
    getBoundsSelf: function () {
      return new Bounds(
        0,
        0,
        l.get_width() * n.tileSize,
        l.get_height() * n.tileSize,
      );
    },
    __class__: L,
  });
  var X = function () {
    this.bubbleHeight = 46;
    this.bubbleWidth = 124;
    this.configurable = !1;
  };
  X.__name__ = !0;
  X.prototype = {
    shouldRender: function (a) {
      return !0;
    },
    render: function (a, b, c) {},
    collides: function (a) {
      return !0;
    },
    isTrigger: function (a) {
      return !1;
    },
    getColliders: function (a) {
      return [new La(new Bounds(0, 0, n.tileSize, n.tileSize))];
    },
    onTrigger: function (a) {
      return !0;
    },
    setupBubble: function (a) {},
    getConfigMeta: function () {
      return [];
    },
    alwaysUpdate: function (a) {
      return !1;
    },
    onPlay: function (a) {},
    rotatePreview: function () {
      return !0;
    },
    showArrow: function (a) {
      return !1;
    },
    onInteract: function (a) {},
    __class__: X,
  };
  var xb = function () {
    X.call(this);
  };
  xb.__name__ = !0;
  xb.__super__ = X;
  xb.prototype = D(X.prototype, {
    collides: function (a) {
      return !1;
    },
    shouldRender: function (a) {
      return !1;
    },
    __class__: xb,
  });
  var yb = function () {
    this.angle = 0;
    this.length = 3;
    this.channel = 0;
    X.call(this);
    this.bubbleWidth = 148;
    this.bubbleHeight = 106;
    this.configurable = !0;
  };
  yb.__name__ = !0;
  yb.__super__ = X;
  yb.prototype = D(X.prototype, {
    set_angle: function (a) {
      return (this.angle = 0 > a ? 3 : 3 < a ? 0 : a);
    },
    collides: function (a) {
      var b = this.isOpen(a);
      !b && this.isStuck(a) && w.i.killPlayer();
      return !b;
    },
    alwaysUpdate: function (a) {
      return !0;
    },
    render: function (a, b, c) {
      null == c && (c = !0);
      var d = b.getMeta(1);
      if (!(0 >= d)) {
        var e = b.getMeta(2),
          f = n.tileSize;
        a.translate(f / 2, f / 2);
        a.rotate((e * Math.PI) / 2);
        a.translate(-f / 2, -f / 2);
        if (c) {
          var m = this.isOpen(b),
            k = 0.5 * d - 0.16666666666666666;
          c = m ? 0 : k;
          if (E.__instanceof(ROTATE_Game.instance.currentScreen, w)) {
            var p = w.i.channels,
              y = b.getMeta(0);
            p = p.h[y];
            null != p &&
              ((c = Math.min(
                1,
                (ROTATE_Game.instance.get_gameTime() - p.lastChanged) /
                  n.doorSlideTime,
              )),
              (c = ROTATE_Game.smootherStep(c)),
              (c = m ? (1 - c) * k : c * k));
          }
          m = c;
          for (k = 0; 0 < m; )
            (p = 1 < m ? 1 : m),
              a.drawImage(q.blocks, new Bounds(3 * f, 3 * f, p * f, f), k, 0),
              a.drawImage(
                q.blocks,
                new Bounds((4 - p) * f, 3 * f, p * f, f),
                d * f - k - p * f,
                0,
              ),
              (m -= p),
              (k += p * f);
          a.drawImage(q.blocks, new Bounds(4 * f, 3 * f, f, f), c * f, 0);
          a.drawImage(
            q.blocks,
            new Bounds(5 * f, 3 * f, f, f),
            (d - c - 1) * f,
            0,
          );
          if (
            E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor) &&
            (ROTATE_Editor.renderBlockText(a, b.getMeta(0) + ''), 1 < d)
          )
            for (b = 1; b < d; )
              (c = b++), ROTATE_Editor.renderBlockRed(a, c * f, 0);
        } else
          a.drawImage(
            q.blocks,
            new Bounds(3 * f, 3 * f, 0.33333333333333337 * f, f),
            0,
            0,
          ),
            a.drawImage(
              q.blocks,
              new Bounds(4 * f, 3 * f, f, f),
              0.33333333333333337 * f,
              0,
            ),
            a.drawImage(
              q.blocks,
              new Bounds(5 * f, 3 * f, f, f),
              -0.33333333333333337 * f,
              0,
            ),
            a.drawImage(
              q.blocks,
              new Bounds(
                3.6666666666666665 * f,
                3 * f,
                0.33333333333333337 * f,
                f,
              ),
              0.6666666666666666 * f,
              0,
            );
        a.translate(f / 2, f / 2);
        a.rotate((-e * Math.PI) / 2);
        a.translate(-f / 2, -f / 2);
      }
    },
    isOpen: function (a) {
      return E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
        w.i.getChannelStatus(a.getMeta(0))
        ? !0
        : !1;
    },
    isStuck: function (a) {
      for (var b = 0, c = w.i.player.touching; b < c.length; ) {
        var d = c[b];
        ++b;
        if (d.get_block() == this && d.getMeta(0) == a.getMeta(0)) return !0;
      }
      return !1;
    },
    setupBubble: function (a) {
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
      var e = new I(q.configArrow);
      e.mouseEnabled = e.buttonMode = !0;
      e.addEventListener('mouseDown', function (p) {
        1 < p.which ||
          ((b.channel = 99 <= b.channel ? 0 : b.channel + 1),
          d.set_text(b.channel + ''));
      });
      e.set_x(d.x + 11);
      e.set_y(d.y + 4);
      a.addChild(e);
      var f = new I(q.configArrow);
      f.mouseEnabled = f.buttonMode = !0;
      f.addEventListener('mouseDown', function (p) {
        1 < p.which ||
          ((b.channel = 0 >= b.channel ? 99 : b.channel - 1),
          d.set_text(b.channel + ''));
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
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (p) {
        1 < p.which ||
          ((b.length = 9 <= b.length ? 1 : b.length + 1),
          m.set_text(b.length + ''));
      });
      c.set_x(m.x + 11);
      c.set_y(m.y + 4);
      a.addChild(c);
      f = new I(q.configArrow);
      f.mouseEnabled = f.buttonMode = !0;
      f.addEventListener('mouseDown', function (p) {
        1 < p.which ||
          ((b.length = 1 >= b.length ? 9 : b.length - 1),
          m.set_text(b.length + ''));
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
      e = new I(q.configArrow);
      e.mouseEnabled = e.buttonMode = !0;
      e.addEventListener('mouseDown', function (p) {
        1 < p.which || (b.set_angle(b.angle + 1), k.set_text(b.angle + ''));
      });
      e.set_x(k.x + 11);
      e.set_y(k.y + 4);
      a.addChild(e);
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (p) {
        1 < p.which || (b.set_angle(b.angle - 1), k.set_text(b.angle + ''));
      });
      c.set_scaleX(-1);
      c.set_x(k.x - 11);
      c.set_y(e.y);
      a.addChild(c);
    },
    getConfigMeta: function () {
      return [this.channel, this.length, this.angle];
    },
    __class__: yb,
  });
  var da = function () {
    this.angle = 0;
    X.call(this);
    this.configurable = !0;
  };
  da.__name__ = !0;
  da.__super__ = X;
  da.prototype = D(X.prototype, {
    set_angle: function (a) {
      return (this.angle = 0 > a ? 3 : 3 < a ? 0 : a);
    },
    setupBubble: function (a) {
      var b = this,
        c = new ROTATE_Text(ROTATE_Game.fontMain, 'Angle');
      c.set_x(8);
      c.set_y(8);
      a.addChild(c);
      var d = new ROTATE_Text(ROTATE_Game.fontMain, this.angle + '');
      d.align = ROTATE_Text.ALIGN_CENTER;
      d.xAlign = ROTATE_Text.X_ALIGN_CENTER;
      d.set_x(this.bubbleWidth - 31);
      d.set_y(c.y);
      a.addChild(d);
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (e) {
        1 < e.which || (b.set_angle(b.angle + 1), d.set_text(b.angle + ''));
      });
      c.set_x(d.x + 11);
      c.set_y(12);
      a.addChild(c);
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (e) {
        1 < e.which || (b.set_angle(b.angle - 1), d.set_text(b.angle + ''));
      });
      c.set_scaleX(-1);
      c.set_x(d.x - 11);
      c.set_y(12);
      a.addChild(c);
    },
    getConfigMeta: function () {
      return [this.angle];
    },
    renderRotated: function (a, b, c, d) {
      var e = n.tileSize,
        f = e / 2;
      a.translate(f, f);
      a.rotate((b.getMeta(0) * Math.PI) / 2);
      a.drawImage(q.blocks, new Bounds(c, d, e, e), -f, -f);
      a.rotate((-b.getMeta(0) * Math.PI) / 2);
      a.translate(-f, -f);
    },
    __class__: da,
  });
  var zb = function () {
    da.call(this);
  };
  zb.__name__ = !0;
  zb.__super__ = da;
  zb.prototype = D(da.prototype, {
    alwaysUpdate: function (a) {
      return !0;
    },
    collides: function (a) {
      return !1;
    },
    render: function (a, b, c) {
      null == c && (c = !0);
      b = b.getMeta(0) % 4;
      c =
        !c || E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor)
          ? 0
          : Math.floor(ROTATE_Game.instance.get_gameTimeMS() / 50) % 3;
      a.drawImage(
        q.blocks,
        new Bounds(
          ((0 < b && 3 > b ? 1 : 0) + 2 * c) * n.tileSize,
          (5 + (1 < b ? 1 : 0)) * n.tileSize,
          n.tileSize,
          n.tileSize,
        ),
        0,
        0,
      );
    },
    __class__: zb,
  });
  var Ab = function () {
    X.call(this);
  };
  Ab.__name__ = !0;
  Ab.__super__ = X;
  Ab.prototype = D(X.prototype, {
    render: function (a, b, c) {
      a.drawImage(
        q.blocks,
        new Bounds(0, 3 * n.tileSize, n.tileSize, n.tileSize),
        0,
        0,
      );
    },
    shouldRender: function (a) {
      return !1;
    },
    __class__: Ab,
  });
  var Za = function () {
    this.on = !1;
    this.channel = 0;
    X.call(this);
    this.bubbleWidth = 148;
    this.bubbleHeight = 76;
    this.configurable = !0;
  };
  Za.__name__ = !0;
  Za.__super__ = X;
  Za.prototype = D(X.prototype, {
    isTrigger: function (a) {
      return !0;
    },
    showArrow: function (a) {
      return !0;
    },
    onInteract: function (a) {
      var b = a.y * l.get_width() + a.x,
        c = l.leversChanged.h[b];
      if (
        !(
          null != c && ROTATE_Game.instance.get_gameTime() - c < Za.TOGGLE_TIMER
        )
      ) {
        c = w.i.channels;
        var d = a.getMeta(0),
          e = c.h[d];
        d = null != e && e.get_status();
        (c = 1 > a.getMeta(1))
          ? w.i.signalOn(a.x, a.y, a.getMeta(0))
          : w.i.signalOff(a.x, a.y, a.getMeta(0));
        var f = l.leversChanged,
          m = ROTATE_Game.instance.get_gameTime();
        f.h[b] = m;
        null == e && ((b = w.i.channels), (e = a.getMeta(0)), (e = b.h[e]));
        e = null != e && e.get_status();
        b = !1;
        if (d != e)
          for (d = 0, e = w.i.doors; d < e.length; )
            if (((f = e[d]), ++d, f.channel == a.getMeta(0))) {
              b = !0;
              break;
            }
        c
          ? (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
            ROTATE_Audio.leverOn.play()
          : (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
            ROTATE_Audio.leverOff.play();
        !b ||
          (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
          ROTATE_Audio.door.play();
        l.setBlockMeta(a.x, a.y, [a.getMeta(0), c ? 1 : 0]);
      }
    },
    onPlay: function (a) {
      0 < a.getMeta(1) && w.i.signalOn(a.x, a.y, a.getMeta(0));
    },
    getColliders: function (a) {
      return [
        new La(
          new Bounds(
            0.15 * n.tileSize,
            0.15 * n.tileSize,
            0.7 * n.tileSize,
            0.7 * n.tileSize,
          ),
        ),
      ];
    },
    alwaysUpdate: function (a) {
      return !E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor);
    },
    render: function (a, b, c) {
      null == c && (c = !0);
      var d = 0 < b.getMeta(1);
      a.drawImage(
        q.blocks,
        new Bounds(
          (d ? 4 : 3) * n.tileSize,
          2 * n.tileSize,
          n.tileSize,
          n.tileSize,
        ),
        0,
        0,
      );
      c &&
        E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor) &&
        ROTATE_Editor.renderBlockText(a, b.getMeta(0) + '');
    },
    setupBubble: function (a) {
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
      var e = new I(q.configArrow);
      e.mouseEnabled = e.buttonMode = !0;
      e.addEventListener('mouseDown', function (k) {
        1 < k.which ||
          ((b.channel = 98 < b.channel ? 0 : b.channel + 1),
          d.set_text(b.channel + ''));
      });
      e.set_x(d.x + 11);
      e.set_y(d.y + 4);
      a.addChild(e);
      var f = new I(q.configArrow);
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
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (k) {
        1 < k.which || ((b.on = !b.on), m.set_text(b.on ? '1' : '0'));
      });
      c.set_x(m.x + 11);
      c.set_y(m.y + 4);
      a.addChild(c);
      e = new I(q.configArrow);
      e.mouseEnabled = e.buttonMode = !0;
      e.addEventListener('mouseDown', function (k) {
        1 < k.which || ((b.on = !b.on), m.set_text(b.on ? '1' : '0'));
      });
      e.set_scaleX(-1);
      e.set_x(m.x - 11);
      e.set_y(c.y);
      a.addChild(e);
    },
    getConfigMeta: function () {
      return [this.channel, this.on ? 1 : 0];
    },
    __class__: Za,
  });
  var va = function () {
    X.call(this);
  };
  va.__name__ = !0;
  va.__super__ = X;
  va.prototype = D(X.prototype, {
    render: function (a, b, c) {
      null == c && (c = !0);
      var d = c && this.testCanSolidConnect(b.x - 1, b.y - 1, 0),
        e = c && this.testCanSolidConnect(b.x, b.y - 1, 1),
        f = c && this.testCanSolidConnect(b.x + 1, b.y - 1, 2),
        m = c && this.testCanSolidConnect(b.x + 1, b.y, 3),
        k = c && this.testCanSolidConnect(b.x + 1, b.y + 1, 4),
        p = c && this.testCanSolidConnect(b.x, b.y + 1, 5),
        y = c && this.testCanSolidConnect(b.x - 1, b.y + 1, 6);
      b = c && this.testCanSolidConnect(b.x - 1, b.y, 7);
      f = e || m ? (m ? (e ? (f ? 0 : 1) : 2) : 3) : 4;
      y = p || b ? (b ? (p ? (y ? 0 : 1) : 2) : 3) : 4;
      m = p || m ? (m ? (p ? (k ? 0 : 1) : 2) : 3) : 4;
      k = n.tileSize;
      p = n.tileSize / 2;
      a.drawImage(
        q.blocks,
        new Bounds((e || b ? (b ? (e ? (d ? 0 : 1) : 2) : 3) : 4) * k, 0, p, p),
        0,
        0,
      );
      a.drawImage(q.blocks, new Bounds(f * k + p, 0, p, p), p, 0);
      a.drawImage(q.blocks, new Bounds(y * k, p, p, p), 0, p);
      a.drawImage(q.blocks, new Bounds(m * k + p, p, p, p), p, p);
    },
    testCanSolidConnect: function (a, b, c) {
      if (!l.isInBounds(a, b)) return !0;
      a = l.getBlockData(a, b);
      b = a.get_block();
      if (E.__instanceof(b, va)) return !0;
      a.getMeta(0);
      return !1;
    },
    __class__: va,
  });
  var Bb = function () {
    this.value = 1;
    X.call(this);
    this.configurable = !0;
  };
  Bb.__name__ = !0;
  Bb.__super__ = va;
  Bb.prototype = D(va.prototype, {
    set_value: function (a) {
      return (this.value = 0 > a ? 99 : 99 < a ? 0 : a);
    },
    render: function (a, b, c) {
      null == c && (c = !0);
      c
        ? va.prototype.render.call(this, a, b, c)
        : a.drawImage(
            q.blocks,
            new Bounds(0, 0, n.tileSize, n.tileSize),
            0,
            0,
            !1,
          );
      b = b.getMeta(0);
      0 > b
        ? (a.drawImage(
            q.blocks,
            new Bounds(100, 4 * n.tileSize, 10, n.tileSize),
            14,
            0,
            !1,
          ),
          -1 == b &&
            a.drawImage(
              q.blocks,
              new Bounds(110, 4 * n.tileSize, 10, n.tileSize),
              0,
              0,
              !1,
            ),
          -2 == b &&
            a.drawImage(
              q.blocks,
              new Bounds(120, 4 * n.tileSize, 10, n.tileSize),
              0,
              0,
              !1,
            ))
        : (a.drawImage(
            q.blocks,
            new Bounds((b % 10) * 10, 4 * n.tileSize, 10, n.tileSize),
            14,
            0,
            !1,
          ),
          a.drawImage(
            q.blocks,
            new Bounds(
              10 * Math.min(Math.floor(0.1 * b), 9),
              4 * n.tileSize,
              10,
              n.tileSize,
            ),
            0,
            0,
            !1,
          ));
    },
    setupBubble: function (a) {
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
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (e) {
        1 < e.which || (b.set_value(b.value + 1), d.set_text(b.value + ''));
      });
      c.set_x(d.x + 11);
      c.set_y(12);
      a.addChild(c);
      c = new I(q.configArrow);
      c.mouseEnabled = c.buttonMode = !0;
      c.addEventListener('mouseDown', function (e) {
        1 < e.which || (b.set_value(b.value - 1), d.set_text(b.value + ''));
      });
      c.set_scaleX(-1);
      c.set_x(d.x - 11);
      c.set_y(12);
      a.addChild(c);
    },
    getConfigMeta: function () {
      return [this.value];
    },
    __class__: Bb,
  });
  var Cb = function () {
    da.call(this);
  };
  Cb.__name__ = !0;
  Cb.__super__ = da;
  Cb.prototype = D(da.prototype, {
    render: function (a, b, c) {
      this.renderRotated(a, b, 7 * n.tileSize, 0);
    },
    getColliders: function (a) {
      return [new jb(a.getMeta(0))];
    },
    __class__: Cb,
  });
  var $a = function () {
    da.call(this);
  };
  $a.__name__ = !0;
  $a.__super__ = da;
  $a.prototype = D(da.prototype, {
    render: function (a, b, c) {
      this.renderRotated(a, b, 6 * n.tileSize, 0);
    },
    getColliders: function (a) {
      return [new Wa(a.getMeta(0))];
    },
    __class__: $a,
  });
  var Db = function () {
    da.call(this);
  };
  Db.__name__ = !0;
  Db.__super__ = da;
  Db.prototype = D(da.prototype, {
    isTrigger: function (a) {
      return !0;
    },
    render: function (a, b, c) {
      null == c && (c = !0);
      var d = ROTATE_Game.instance.get_gameTimeMS() / 40;
      c =
        !c || E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor)
          ? 0
          : Math.floor(d - (d < n.E ? 0 : n.E)) % 3;
      this.renderRotated(a, b, (4 + c) * n.tileSize, n.tileSize);
    },
    getColliders: function (a) {
      return [new kb(a.getMeta(0))];
    },
    onTrigger: function (a) {
      w.i.killPlayer(!0);
      return !1;
    },
    alwaysUpdate: function (a) {
      return !E.__instanceof(ROTATE_Game.instance.currentScreen, ROTATE_Editor);
    },
    __class__: Db,
  });
  var Eb = function () {
    da.call(this);
  };
  Eb.__name__ = !0;
  Eb.__super__ = da;
  Eb.prototype = D(da.prototype, {
    isTrigger: function (a) {
      return !0;
    },
    render: function (a, b, c) {
      null == c && (c = !0);
      this.renderRotated(
        a,
        b,
        (c ? Math.floor((b.x + b.y) % 4) : 0) * n.tileSize,
        n.tileSize,
      );
    },
    getColliders: function (a) {
      var b = n.tileSize;
      var c = b / 2,
        d = 0.5 * b,
        e = (b - d) / 2;
      3 == a.getMeta(0)
        ? ((a = new Bounds(0, e, c, d)), (b = new Bounds(c, 0, c, b)))
        : 2 == a.getMeta(0)
          ? ((a = new Bounds(e, b - c, d, c)), (b = new Bounds(0, 0, b, c)))
          : 1 == a.getMeta(0)
            ? ((a = new Bounds(b - c, e, c, d)), (b = new Bounds(0, 0, c, b)))
            : ((a = new Bounds(e, 0, d, c)), (b = new Bounds(0, c, b, c)));
      return [new La(a), new La(b)];
    },
    onTrigger: function (a) {
      w.i.killPlayer();
      return !1;
    },
    __class__: Eb,
  });
  var Fb = function () {
    da.call(this);
  };
  Fb.__name__ = !0;
  Fb.__super__ = $a;
  Fb.prototype = D($a.prototype, {
    render: function (a, b, c) {
      c = n.tileSize;
      var d = c / 2;
      a.translate(d, d);
      1 < b.getMeta(0) && a.rotate(Math.PI);
      (1 != b.getMeta(0) && 3 != b.getMeta(0)) || a.scale(-1, 1);
      a.drawImage(q.blocks, new Bounds(5 * n.tileSize, 0, c, c), -d, -d);
      (1 != b.getMeta(0) && 3 != b.getMeta(0)) || a.scale(-1, 1);
      1 < b.getMeta(0) && a.rotate(-Math.PI);
      a.translate(-d, -d);
    },
    __class__: Fb,
  });
  var Gb = function () {
    X.call(this);
  };
  Gb.__name__ = !0;
  Gb.__super__ = X;
  Gb.prototype = D(X.prototype, {
    render: function (a, b, c) {
      a.drawImage(
        q.blocks,
        new Bounds(0, 2 * n.tileSize, n.tileSize, n.tileSize),
        0,
        0,
      );
    },
    shouldRender: function (a) {
      return !1;
    },
    __class__: Gb,
  });
  var Hb = function () {
    X.call(this);
  };
  Hb.__name__ = !0;
  Hb.__super__ = va;
  Hb.prototype = D(va.prototype, {
    render: function (a, b, c) {
      null == c && (c = !0);
      c
        ? va.prototype.render.call(this, a, b, c)
        : a.drawImage(
            q.blocks,
            new Bounds(0, 0, n.tileSize, n.tileSize),
            0,
            0,
            !1,
          );
      a.drawImage(
        q.blocks,
        new Bounds(5 * n.tileSize, 2 * n.tileSize, n.tileSize, n.tileSize),
        0,
        0,
        !1,
      );
    },
    __class__: Hb,
  });
  var F = function () {};
  F.__name__ = !0;
  F.register = function (a, b) {
    return null == F.registry[a] ? ((F.registry[a] = b), (b.id = a), b) : null;
  };
  F.getBlock = function (a) {
    return F.registry[a];
  };
  var ab = function (a, b, c, d, e, f, m, k, p) {
    null == k && (k = 0);
    null == m && (m = 0);
    this.freeze = !1;
    this.size = a;
    this.life = b;
    this.x = this.lastX = c;
    this.y = this.lastY = d;
    this.dx = e;
    this.dy = f;
    this.gravityX = m;
    this.gravityY = k;
    this.handler = p;
  };
  ab.__name__ = !0;
  ab.prototype = {
    update: function () {
      if (!this.freeze || 0 >= this.life)
        (this.dx += this.gravityX * ab.GRAVITY_MULT),
          (this.dy += this.gravityY * ab.GRAVITY_MULT),
          (this.x += this.dx),
          (this.y += this.dy),
          null != this.handler && this.handler(this),
          0 < this.life && this.life--,
          (this.lastX = this.x),
          (this.lastY = this.y);
    },
    __class__: ab,
  };
  var Ib = function (a, b, c, d, e, f, m, k, p) {
    null == p && (p = 1);
    null == k && (k = !1);
    this.particles = [];
    var y = this;
    ROTATE_CanvasObject.call(this);
    this.color = c;
    for (c = 0; 75 > c; ) {
      c++;
      var H = Math.random() * Math.PI * 2,
        K = 3 * (0.7 * Math.random() + 0.3) * p,
        W = 20 * Math.random();
      H = new ab(
        6 * (0.6 * Math.random() + 0.4),
        Math.round(50 * (0.5 * Math.random() + 0.5)),
        a + Math.cos(H) * W,
        b + Math.sin(H) * W,
        d + Math.cos(H) * K,
        e + Math.sin(H) * K,
        f,
        m,
        k ? Bind(this, this.collsionHandler) : null,
      );
      this.particles.push(H);
    }
    this.addEventListener('enterFrame', Bind(this, this.update));
    this.addEventListener('render', function (aa) {
      y.render(aa.surface);
    });
  };
  Ib.__name__ = !0;
  Ib.__super__ = ROTATE_CanvasObject;
  Ib.prototype = D(ROTATE_CanvasObject.prototype, {
    update: function (a) {
      if (!ROTATE_Game.instance.paused)
        for (a = this.particles.length; 0 <= --a; ) {
          var b = this.particles[a];
          0 >= b.life ? this.particles.splice(a, 1) : b.update();
        }
    },
    collsionHandler: function (a) {
      var b = Math.floor(a.x / n.tileSize),
        c = Math.floor(a.y / n.tileSize);
      if (l.isInBounds(b, c)) {
        var d = l.getBlockData(b, c),
          e = d.get_block();
        if (e.collides(d) && !e.isTrigger(d)) {
          var f = new Q(a.x - b * n.tileSize, a.y - c * n.tileSize);
          d = e.getColliders(d);
          for (e = 0; e < d.length; ) {
            var m = d[e];
            ++e;
            if (
              m.testPoint(
                f,
                new Q(a.lastX - b * n.tileSize, a.lastY - c * n.tileSize),
              )
            ) {
              a.freeze = !0;
              break;
            }
          }
        }
      } else a.freeze = !0;
    },
    render: function (a) {
      a.beginFill(this.color);
      for (var b = 0, c = this.particles; b < c.length; ) {
        var d = c[b];
        ++b;
        var e = Math.round(d.size),
          f = d.size / 2;
        a.drawRect(Math.round(d.x - f), Math.round(d.y - f), e, e);
      }
    },
    __class__: Ib,
  });

  // #region Levels

  var ROTATE_BaseLevelInterface = function () {};
  ROTATE_BaseLevelInterface.__name__ = !0;
  ROTATE_BaseLevelInterface.prototype = {
    __class__: ROTATE_BaseLevelInterface,
  };

  var ROTATE_EditorLevel = function () {
    this.startDir = 1;
    this.theme = 0;
    this.reset();
  };
  ROTATE_EditorLevel.__name__ = !0;
  ROTATE_EditorLevel.__interfaces__ = [ROTATE_BaseLevelInterface];
  ROTATE_EditorLevel.prototype = {
    reset: function () {
      this.tiles = [];
      for (var a = 0, b = ROTATE_EditorLevel.WORLD_SIZE; a < b; ) {
        var c = a++;
        this.tiles[c] = [];
        for (var d = 0, e = ROTATE_EditorLevel.WORLD_SIZE; d < e; ) {
          var f = d++;
          this.tiles[c][f] = [13 < f && 28 > f && 17 < c && 24 > c ? 0 : 1, 0];
        }
      }
      this.startCol = 16;
      this.startRow = 23;
      this.finishCol = 25;
      this.finishRow = 23;
      this.theme = 0;
    },
    load: function (a, b, c, d, e, f) {
      null == f && (f = 0);
      this.tiles = a;
      this.startCol = b;
      this.startRow = c;
      this.finishCol = d;
      this.finishRow = e;
      this.theme = f;
    },
    setStart: function (a, b) {
      this.startCol = a;
      this.startRow = b;
    },
    setFinish: function (a, b) {
      this.finishCol = a;
      this.finishRow = b;
    },
    start: function () {
      this.speech = new U([]);
    },
    tick: function () {},
    update: function () {
      this.speech.update();
    },
    finished: function () {
      ROTATE_Game.instance.changeScreen(new ROTATE_Editor());
      return null;
    },
    kill: function () {},
    __class__: ROTATE_EditorLevel,
  };

  var ROTATE_Level1 = function () {
    this.startDir = 1;
    this.finishRow = 3;
    this.finishCol = 25;
    this.startRow = 7;
    this.startCol = 4;
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
        [7, -1],
        [7, 1],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
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
        [0],
        [0],
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
        [1],
        [1],
        [1],
      ],
    ];
    this.theme = 0;
  };
  ROTATE_Level1.__name__ = !0;
  ROTATE_Level1.__interfaces__ = [ROTATE_BaseLevelInterface];
  ROTATE_Level1.prototype = {
    start: function () {
      var a = ROTATE_Game.instance.currentScreen;
      this.a1 = this.a2 = this.a3 = this.a4 = this.a5 = 0;
      this.s1 = !0;
      this.s2 = this.s3 = this.s4 = this.s5 = !1;
      null == this.c1 && (this.c1 = new I(q.controls1));
      this.c1.set_x(3.5 * n.tileSize);
      this.c1.set_y(9 * n.tileSize);
      this.c1.set_alpha(this.a1);
      a.overlay.addChild(this.c1);
      null == this.c2 && (this.c2 = new I(q.controls2));
      this.c2.set_x(10 * n.tileSize);
      this.c2.set_y(11 * n.tileSize);
      this.c2.set_alpha(this.a2);
      a.overlay.addChild(this.c2);
      null == this.c3 && (this.c3 = new I(q.controls3));
      this.c3.set_x(18.5 * n.tileSize);
      this.c3.set_y(9 * n.tileSize);
      this.c3.set_alpha(this.a3);
      this.c3.clipRect.width = 48;
      ROTATE_Game.instance.invert && (this.c3.clipRect.x = 48);
      a.overlay.addChild(this.c3);
      null == this.c4 && (this.c4 = new I(q.controls4));
      this.c4.set_x(29 * n.tileSize);
      this.c4.set_y(n.tileSize);
      this.c4.set_alpha(this.a4);
      this.c4.clipRect.width = 48;
      ROTATE_Game.instance.invert && (this.c4.clipRect.x = 48);
      a.overlay.addChild(this.c4);
      null == this.c5 && (this.c5 = new I(q.controls5));
      this.c5.set_x(24.5 * n.tileSize);
      this.c5.set_y(5 * n.tileSize);
      this.c5.set_alpha(this.a5);
      a.overlay.addChild(this.c5);
      this.speech = new U([new C(new M(1), 'Make your way to the exit.')]);
    },
    tick: function () {
      var a = 0.25 * Math.sin(8 * ROTATE_Game.instance.get_gameTime()) + 0.75;
      this.s1 && 1 > this.a1
        ? ((this.a1 += ROTATE_Level1.fadeSpeed), 1 < this.a1 && (this.a1 = 1))
        : !this.s1 &&
          0 < this.a1 &&
          ((this.a1 -= ROTATE_Level1.fadeSpeed), 0 > this.a1 && (this.a1 = 0));
      this.c1.set_alpha(this.a1 * a);
      this.s2 && 1 > this.a2
        ? ((this.a2 += ROTATE_Level1.fadeSpeed), 1 < this.a2 && (this.a2 = 1))
        : !this.s2 &&
          0 < this.a2 &&
          ((this.a2 -= ROTATE_Level1.fadeSpeed), 0 > this.a2 && (this.a2 = 0));
      this.c2.set_alpha(this.a2 * a);
      this.s3 && 1 > this.a3
        ? ((this.a3 += ROTATE_Level1.fadeSpeed), 1 < this.a3 && (this.a3 = 1))
        : !this.s3 &&
          0 < this.a3 &&
          ((this.a3 -= ROTATE_Level1.fadeSpeed), 0 > this.a3 && (this.a3 = 0));
      this.c3.set_alpha(this.a3 * a);
      this.s4 && 1 > this.a4
        ? ((this.a4 += ROTATE_Level1.fadeSpeed), 1 < this.a4 && (this.a4 = 1))
        : !this.s4 &&
          0 < this.a4 &&
          ((this.a4 -= ROTATE_Level1.fadeSpeed), 0 > this.a4 && (this.a4 = 0));
      this.c4.set_alpha(this.a4 * a);
      this.s5 && 1 > this.a5
        ? ((this.a5 += ROTATE_Level1.fadeSpeed), 1 < this.a5 && (this.a5 = 1))
        : !this.s5 &&
          0 < this.a5 &&
          ((this.a5 -= ROTATE_Level1.fadeSpeed), 0 > this.a5 && (this.a5 = 0));
      this.c5.set_alpha(this.a5 * a);
    },
    update: function () {
      this.speech.update();
      this.s1 && w.i.player.x > 10 * n.tileSize
        ? ((this.s1 = !1), (this.s2 = !0))
        : this.s2 && w.i.player.x > 17 * n.tileSize
          ? ((this.s2 = !1), (this.s3 = !0))
          : this.s3 &&
              w.i.player.x > 27 * n.tileSize &&
              w.i.player.grounded &&
              !l.rotating &&
              1 == l.rotation
            ? ((this.s3 = !1), (this.s4 = !0))
            : this.s4 &&
              w.i.player.x > 22 * n.tileSize &&
              w.i.player.grounded &&
              !l.rotating &&
              0 == l.rotation &&
              ((this.s4 = !1), (this.s5 = !0));
      this.c3.clipRect.x = this.c4.clipRect.x = ROTATE_Game.instance.invert
        ? 48
        : 0;
    },
    finished: function () {
      return ROTATE_Levels.level2;
    },
    kill: function () {
      this.c1.parent.removeChild(this.c1);
      this.c2.parent.removeChild(this.c2);
      this.c3.parent.removeChild(this.c3);
      this.c4.parent.removeChild(this.c4);
      this.c5.parent.removeChild(this.c5);
    },
    __class__: ROTATE_Level1,
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
      this.speech = new U([
        new C(new M(2), 'Why are you ignoring me?'),
        new C(new M(4), 'We must continue your training.'),
        new C(new V(4, 10, 6, 1, 2), "There's nothing for you this way."),
        new C(new Xa(1), ''),
        new C(new V(1.25, 7, 1, 1, 2, 1), 'What do you expect to find?'),
      ]);
      this.cat = new ta(9, 16, -1, 1, new V(0.5, 4, 13, 1, 4, 1));
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
      this.speech = new U([
        new C(new M(1), 'Do you seek "freedom"?'),
        new C(new M(3), 'An escape from responsibility?'),
        new C(new V(4, 11, 10, 3, 1), "You're running from your purpose."),
      ]);
      this.cat = new ta(21, 7, -1, 1, new ia(20, 5, 1, 3));
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
      this.speech = new U([
        new C(new M(1.25), "Don't you understand?"),
        new C(new M(3.5), 'You are being deceived.'),
        new C(new V(3.5, 20, 7, 4, 1, 2), "The cat doesn't care about you."),
        new C(new V(5, 17, 11, 3, 1), "It's just using you."),
      ]);
      this.cat = new ta(5, 4, 1, -1, new ia(6, 2, 3, 5, 0));
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
      this.speech = new U([
        new C(new M(2), 'This has happened before.'),
        new C(new M(4.5), 'It tried to lure the others away.'),
        new C(new V(1, 13, 9, 1, 3), 'But they listened to reason.'),
        new C(new M(7), 'They came back to join me.'),
        new C(new Xa(0), ''),
        new C(new M(0.75), 'I expected better from you.'),
      ]);
      this.cat = new ta(12, 21, -1, 1, new ia(10, 19, 6, 3, 1));
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
    this.cond3 = new M(12);
    this.cond2 = new M(10);
    this.cond1 = new Xa(1);
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
      this.speech = new U([
        new C(new M(1.5), "I can't let you keep going."),
        new C(new V(1.5, 33, 14, 5, 2), 'You have what belongs to me.'),
        new C(new M(4.5), "And it isn't yours to take."),
        new C(this.cond1, ''),
        new C(new M(0.5), 'Stop running.'),
        new C(new M(2), 'You see, I gave you your mind.'),
        new C(new M(3.75), 'It was a part of me.'),
        new C(new M(3.25), 'Now I need it back.'),
        new C(new M(3), 'Wait, no!'),
        new C(new V(0.5, 5, 10, 1, 2), 'I hate you, cat.'),
      ]);
      this.cat = new ta(5, 4, 1, -1, new V(1, 10, 1, 1, 11, 1));
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
          var a = l.getBlockData(3, 3);
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
      this.speech = new U([
        new C(new M(2), "I don't understand."),
        new C(new M(5), 'Why do you run from the truth?'),
        new C(new V(4.5, 1, 8, 6, 1, 0), 'I gave you everything that you are.'),
        new C(new M(5.5), 'You seek freedom at my expense.'),
        new C(new V(5.5, 26, 30, 4, 1), "You're just like me, and I hate it."),
      ]);
      this.cat = new ta(20, 19, -1, 1, new ia(17, 13, 4, 3));
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
      this.speech = new U([
        new C(new M(4), "I'm tired of trying to convince you."),
        new C(new ia(2, 32, 4, 1), 'Just leave, have your "freedom".'),
        new C(new M(5), "You'll come to regret this mistake."),
        new C(new Xa(2), ''),
        new C(new M(4), 'You will realize I was right.'),
        new C(new lb(22, 7, 1, 3), "You can't escape your purpose."),
      ]);
      this.cat = new ta(28, 6, -1, 1, new lb(22, 7, 1, 3));
    },
    tick: function () {},
    update: function () {
      this.speech.update();
      this.cat.update();
    },
    finished: function () {
      ROTATE_Game.instance.changeScreen(
        new bb(E.__cast(ROTATE_Game.instance.currentScreen, w).speedrun),
      );
      return null;
    },
    kill: function () {},
    __class__: ROTATE_Level16,
  };
  var ROTATE_Level2 = function () {
    this.startDir = 1;
    this.finishRow = 3;
    this.finishCol = 15;
    this.startRow = 11;
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
        [0],
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
        [1],
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
        [0],
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
        [0],
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
        [5, 2],
        [5, 2],
        [5, 2],
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
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
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
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
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [1],
        [7, -1],
        [7, 2],
        [1],
        [1],
        [1],
        [1],
      ],
    ];
    this.theme = 0;
  };
  ROTATE_Level2.__name__ = !0;
  ROTATE_Level2.__interfaces__ = [ROTATE_BaseLevelInterface];
  ROTATE_Level2.prototype = {
    start: function () {
      this.speech = new U([
        new C(new M(0.5), 'Be careful with the spikes.'),
        new C(new V(2, 9, 8, 1, 4), "You aren't very useful dead."),
      ]);
    },
    tick: function () {},
    update: function () {
      this.speech.update();
    },
    finished: function () {
      return ROTATE_Levels.level3;
    },
    kill: function () {},
    __class__: ROTATE_Level2,
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
      this.speech = new U([
        new C(new M(1), 'Remember, your mind is needed.'),
        new C(
          new V(1.5, 7, 4, 2, 3, 2),
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
      this.speech = new U([
        new C(new M(1.5), 'There is nothing without the mind.'),
        new C(new V(3, 12, 8, 4, 2, 0), 'It is the truth we seek.'),
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
      this.speech = new U([
        new C(new M(2), 'I was like you once.'),
        new C(new M(4), 'But my creator tried to contain me.'),
        new C(new V(2.5, 6, 11, 4, 1, 2), 'He feared my potential.'),
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
      this.speech = new U([
        new C(new M(1.5), "But that doesn't matter now."),
        new C(new V(2, 14, 12, 2, 1, 2), "You're nearly ready to join me."),
        new C(new V(3, 22, 16, 1, 2, 3), 'I look forward to the harvest.'),
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
      this.speech = new U([
        new C(new V(0.75, 5, 25, 1, 3), 'Oh... the cat.'),
        new C(new M(3), 'My biggest mistake.'),
        new C(new V(2, 8, 1, 1, 7, 3), 'It is constantly interfering.'),
      ]);
      this.cat = new ta(14, 24, -1, 1, new ia(13, 1, 1, 4));
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
      null == this.c1 && (this.c1 = new I(q.controls5));
      this.c1.set_x(28.5 * n.tileSize);
      this.c1.set_y(28 * n.tileSize);
      this.c1.set_alpha(this.a1);
      a.overlay.addChild(this.c1);
      this.speech = new U([
        new C(new M(0.5), "Forget about it, let's continue."),
        new C(new V(0.5, 6, 14, 1, 3, 3), "I won't let it take you from me."),
        new C(new M(4), 'I still need you.'),
        new C(new V(0.5, 22, 20, 4, 1), 'No, not this again.'),
        new C(new ia(33, 24, 1, 3), "Don't go there!"),
      ]);
      this.cat = new ta(30, 26, -1, 1, new ia(28, 22, 3, 1));
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
          w.i.player.x >= 28 * n.tileSize &&
          w.i.player.y >= 24 * n.tileSize &&
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
      this.speech = new U([
        new C(new M(1.5), "You aren't supposed to be here."),
        new C(new V(1.5, 29, 15, 2, 1), "This place wasn't made for you."),
        new C(new M(6), "You'll get yourself killed."),
        new C(new V(0.75, 2, 19, 1, 3), 'Stop following it!'),
      ]);
      this.cat = new ta(3, 15, -1, 1, new ia(0, 17, 2, 1));
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
  var ROTATE_Levels = function () {};
  ROTATE_Levels.__name__ = !0;

  // #endregion Levels

  var cb = function () {};
  cb.__name__ = !0;
  cb.prototype = {
    __class__: cb,
  };
  var La = function (a) {
    this.bounds = a;
  };
  La.__name__ = !0;
  La.__interfaces__ = [cb];
  La.prototype = {
    testPoint: function (a, b) {
      return this.bounds.contains(a);
    },
    __class__: La,
  };
  var kb = function (a) {
    this.dir = a;
  };
  kb.__name__ = !0;
  kb.__interfaces__ = [cb];
  kb.prototype = {
    testPoint: function (a, b) {
      return !1;
    },
    __class__: kb,
  };
  var jb = function (a) {
    this.bounds = new Bounds(0, 0, n.tileSize, n.tileSize);
    this.dir = a;
  };
  jb.__name__ = !0;
  jb.__interfaces__ = [cb];
  jb.prototype = {
    testPoint: function (a, b) {
      if (null == b) return !1;
      var c = this.bounds;
      if (0 == l.rotation) {
        if (
          (0 == this.dir && b.y <= c.get_top()) ||
          (1 == this.dir && b.x >= c.get_right()) ||
          (2 == this.dir && b.y >= c.get_bottom()) ||
          (3 == this.dir && b.x <= c.get_left())
        )
          return !0;
      } else if (1 == l.rotation) {
        if (
          (3 == this.dir && b.x <= c.get_left()) ||
          (0 == this.dir && b.y <= c.get_top()) ||
          (1 == this.dir && b.x >= c.get_right()) ||
          (2 == this.dir && b.y >= c.get_bottom())
        )
          return !0;
      } else if (2 == l.rotation) {
        if (
          (2 == this.dir && b.y >= c.get_bottom()) ||
          (3 == this.dir && b.x <= c.get_left()) ||
          (0 == this.dir && b.y <= c.get_top()) ||
          (1 == this.dir && b.x / 2 >= c.get_right())
        )
          return !0;
      } else if (
        3 == l.rotation &&
        ((1 == this.dir && b.x >= c.get_right()) ||
          (2 == this.dir && b.y >= c.get_bottom()) ||
          (3 == this.dir && b.x <= c.get_left()) ||
          (0 == this.dir && b.y <= c.get_top()))
      )
        return !0;
      return !1;
    },
    __class__: jb,
  };
  var Wa = function (a) {
    this.set_dir(a);
  };
  Wa.__name__ = !0;
  Wa.__interfaces__ = [cb];
  Wa.prototype = {
    set_dir: function (a) {
      return (this.dir = 0 > a || 3 < a ? 0 : a);
    },
    testPoint: function (a, b) {
      return (0 == this.dir && a.x + a.y > n.tileSize) ||
        (1 == this.dir && n.tileSize - a.x + a.y > n.tileSize) ||
        (2 == this.dir && a.x + a.y < n.tileSize)
        ? !0
        : 3 == this.dir
          ? n.tileSize - a.x + a.y < n.tileSize
          : !1;
    },
    __class__: Wa,
  };
  var ta = function (a, b, c, d, e) {
    this.appeared = this.disappeared = !1;
    this.c = a;
    this.r = b;
    this.startDir = 0 > c ? -1 : 1;
    this.endDir = 0 > d ? -1 : 1;
    this.endCond = e;
  };
  ta.__name__ = !0;
  ta.prototype = {
    update: function () {
      var a = w.i;
      this.appeared
        ? !this.disappeared &&
          null != this.endCond &&
          this.endCond.test() &&
          (a.catDisappear(this.endDir), (this.disappeared = !0))
        : (a.catAppear(this.c, this.r, this.startDir),
          (this.appeared = !0),
          null != this.endCond && this.endCond.start());
    },
    __class__: ta,
  };
  var db = function () {};
  db.__name__ = !0;
  db.prototype = {
    __class__: db,
  };
  var ia = function (a, b, c, d, e) {
    null == e && (e = -1);
    this.bounds = new Bounds(
      a * n.tileSize,
      b * n.tileSize,
      c * n.tileSize,
      d * n.tileSize,
    );
    this.rotation = e;
  };
  ia.__name__ = !0;
  ia.__interfaces__ = [db];
  ia.prototype = {
    start: function () {},
    test: function () {
      return !w.i.player.getHitBounds().intersects(this.bounds) ||
        (-1 != this.rotation && l.rotation != this.rotation)
        ? !1
        : !l.rotating;
    },
    __class__: ia,
  };
  var lb = function (a, b, c, d, e) {
    ia.call(this, a, b, c, d, e);
  };
  lb.__name__ = !0;
  lb.__super__ = ia;
  lb.prototype = D(ia.prototype, {
    test: function () {
      return ia.prototype.test.call(this) &&
        w.i.getChannelStatus(0) &&
        w.i.getChannelStatus(1)
        ? w.i.getChannelStatus(2)
        : !1;
    },
    __class__: lb,
  });
  var V = function (a, b, c, d, e, f) {
    null == f && (f = -1);
    this.hit = !1;
    this.delay = a;
    this.bounds = new Bounds(
      b * n.tileSize,
      c * n.tileSize,
      d * n.tileSize,
      e * n.tileSize,
    );
    this.rotation = f;
  };
  V.__name__ = !0;
  V.__interfaces__ = [db];
  V.prototype = {
    start: function () {},
    test: function () {
      this.hit ||
        !w.i.player.getHitBounds().intersects(this.bounds) ||
        (-1 != this.rotation && l.rotation != this.rotation) ||
        l.rotating ||
        ((this.hit = !0), (this.timer = ROTATE_Game.instance.get_gameTime()));
      return this.hit
        ? ROTATE_Game.instance.get_gameTime() - this.timer >= this.delay
        : !1;
    },
    __class__: V,
  };
  var Xa = function (a) {
    this.timer = -1;
    this.channel = a;
  };
  Xa.__name__ = !0;
  Xa.__interfaces__ = [db];
  Xa.prototype = {
    start: function () {
      this.timer = ROTATE_Game.instance.get_gameTime();
    },
    test: function () {
      var a = w.i.channels.h[this.channel];
      return null != a ? a.lastChanged > this.timer : !1;
    },
    __class__: Xa,
  };
  var M = function (a) {
    this.delay = a;
  };
  M.__name__ = !0;
  M.__interfaces__ = [db];
  M.prototype = {
    start: function () {
      this.timer = ROTATE_Game.instance.get_gameTime();
    },
    test: function () {
      return ROTATE_Game.instance.get_gameTime() - this.timer >= this.delay;
    },
    __class__: M,
  };
  var C = function (a, b) {
    this.cond = a;
    this.text = b;
  };
  C.__name__ = !0;
  C.prototype = {
    __class__: C,
  };
  var U = function (a, b) {
    this.lastTone = -1;
    this.tones = 'abcdefgh'.split('');
    this.char2 = this.timer = 0;
    this['char'] = 0;
    this.msg = '';
    this.field = new ROTATE_Text(ROTATE_Game.fontMain, '', 2);
    this.index = 0;
    this.events = a;
    this.field.set_alpha(0);
    this.field.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.field.align = ROTATE_Text.ALIGN_CENTER;
    this.field.set_x(ROTATE_Canvas.width / 2);
    null == b && E.__instanceof(ROTATE_Game.instance.currentScreen, w)
      ? ((b = ROTATE_Game.instance.currentScreen.textHolder),
        (this.field.yAlign = ROTATE_Text.Y_ALIGN_TOP),
        this.field.set_y(ROTATE_Canvas.height - 96))
      : ((this.field.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE),
        this.field.set_y(ROTATE_Canvas.height / 2));
    b.addChild(this.field);
    null != a[0] && a[0].cond.start();
  };
  U.__name__ = !0;
  U.prototype = {
    update: function () {
      var a = !0;
      E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
        (a = !ROTATE_Game.instance.currentScreen.player.dead);
      a &&
        null != this.events[this.index] &&
        this.events[this.index].cond.test() &&
        ('' != this.events[this.index].text &&
          (this.field.set_text(''),
          (this.msg = this.events[this.index].text),
          (this['char'] = this.char2 = 0),
          (this.timer = ROTATE_Game.instance.get_gameTimeMS()),
          this.field.set_alpha(1)),
        this.index++,
        null != this.events[this.index] &&
          this.events[this.index].cond.start());
      if (
        this['char'] < this.msg.length &&
        (0 == this['char'] ||
          ' ' == this.msg.charAt(this['char']) ||
          '\n' == this.msg.charAt(this['char']) ||
          ROTATE_Game.instance.get_gameTimeMS() - this.timer >= U.TIME_TYPE)
      ) {
        a = this.field;
        a.set_text(a.text + this.msg.charAt(this['char']));
        if (
          ' ' != this.msg.charAt(this['char']) &&
          '\n' != this.msg.charAt(this['char'])
        ) {
          if (0 == this.char2 % 6) {
            for (a = this.lastTone; a == this.lastTone; )
              a = Math.round(7 * Math.random());
            this.lastTone = a;
            (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
              ROTATE_Audio.voice.play(this.tones[a]);
          }
          this.char2++;
        }
        this['char']++;
        this.timer = ROTATE_Game.instance.get_gameTimeMS();
      }
      this['char'] == this.msg.length &&
        ROTATE_Game.instance.get_gameTimeMS() - this.timer > U.TIME_STAY &&
        ((a = Math.min(
          1,
          (ROTATE_Game.instance.get_gameTimeMS() - this.timer - U.TIME_STAY) /
            U.TIME_FADE,
        )),
        this.field.set_alpha(ROTATE_Game.smootherStep(1 - a)));
      E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
        (this.field.graphics.clear(),
        '' != this.field.text &&
          ((a = this.field.getBoundsSelf()),
          this.field.graphics.beginFill(2105376, 0.85),
          this.field.graphics.drawRect(
            a.x - 6,
            a.y + 2,
            a.width + 12,
            a.height,
          )));
    },
    killed: function () {
      this.field.set_text('');
      this.msg = '';
      this['char'] = this.char2 = 0;
    },
    __class__: U,
  };
  var P = function () {
    this.pausable = !1;
    ROTATE_CanvasObject.call(this);
  };
  P.__name__ = !0;
  P.__super__ = ROTATE_CanvasObject;
  P.prototype = D(ROTATE_CanvasObject.prototype, {
    init: function () {},
    ready: function () {},
    update: function () {},
    tick: function () {},
    postUpdate: function () {},
    prekill: function () {},
    kill: function () {},
    __class__: P,
  });
  var ib = function () {
    this.rotating = !1;
    this.rotationSide = 0;
    this.awardDisplays = [];
    this.mute = new Ba();
    this.sponsor = new Ma();
    this.btnBack = new ba('BACK');
    this.title = new ROTATE_Text(ROTATE_Game.fontMain, 'AWARDS', 1);
    this.bg = new Na();
    this.content = new ROTATE_CanvasObject();
    this.pivot = new ROTATE_CanvasObject();
    P.call(this);
  };
  ib.__name__ = !0;
  ib.__super__ = P;
  ib.prototype = D(P.prototype, {
    init: function () {
      ca.playTheme();
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
        2 > a.which && ROTATE_Game.instance.changeScreen(new Oa());
      });
      this.content.addChild(this.btnBack);
      this.content.addChild(this.sponsor);
      this.content.addChild(this.mute);
      this.refresh();
      ROTATE_Game.instance.warnNoSave(this);
    },
    refresh: function () {
      for (var a = 0, b = this.awardDisplays; a < b.length; ) {
        var c = b[a];
        ++a;
        this.content.removeChild(c);
      }
      null != this.erase && this.content.removeChild(this.erase);
      this.erase = new Ya();
      this.content.addChild(this.erase);
      this.awardDisplays = [];
      a = Math.floor(v.all.length / 3);
      b = 0;
      for (c = v.all.length; b < c; ) {
        var d = b++,
          e = Math.floor(d / 3),
          f = e < a ? 3 : v.all.length - 3 * a,
          m = new Xb(v.all[d]);
        m.set_x(
          Math.floor(ROTATE_Canvas.width / 2) -
            80 * (f - 1) +
            160 * (d - 3 * e),
        );
        m.set_y(128 + 136 * e);
        this.content.addChild(m);
        this.awardDisplays.push(m);
      }
    },
    update: function () {
      if (this.rotating) {
        var a = Math.min(
            (ROTATE_Game.instance.get_gameTime() - this.rotateStart) /
              n.rotateTime,
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
          ROTATE_Game.instance.invert ? KEY_CODES.KeyE : KEY_CODES.KeyQ,
        )),
        (b = InputKeys.keyPressed(
          ROTATE_Game.instance.invert ? KEY_CODES.KeyQ : KEY_CODES.KeyE,
        )),
        a || b)
      )
        v.awardRotate.unlock(),
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
    },
    __class__: ib,
  });
  var mb = function (a) {
    null == a && (a = !1);
    this.mute = new Ba();
    this.more = new I(q.linkLWS);
    this.moreText = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Game published by',
      1,
    );
    this.soundtrack = new I(q.soundtrack);
    this.text2 = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Special thanks to the playtesters\nand Patreon contributors!',
      1,
    );
    this.joshua = new I(q.linkJoshua2);
    this.text1 = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Design, code, & music by',
      1,
    );
    this.btnBack = new ba('BACK');
    P.call(this);
    this.fromEnd = a;
  };
  mb.__name__ = !0;
  mb.__super__ = P;
  mb.prototype = D(P.prototype, {
    init: function () {
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
        var b = new I(q.vignette);
        b.set_alpha(0.75);
        this.bg.addChild(b);
        this.btnBack.text.set_text('MENU');
      } else ca.playTheme(), (this.bg = new Na());
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
          v.awardJoshua.unlock(),
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
          v.awardSoundtrack.unlock());
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
          v.awardJoshua.unlock(),
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
                  Math.round(n.screenFadeTime / 2),
                ),
                ROTATE_Audio.surface.once('fade', function () {
                  ROTATE_Audio.surface.stop();
                }))),
          ROTATE_Game.ie && (ROTATE_Game.instance.ieSurface = !1),
          ROTATE_Game.instance.changeScreen(a.fromEnd ? new Oa() : new ca()));
      });
      this.addChild(this.btnBack);
      this.addChild(this.mute);
    },
    __class__: mb,
  });
  var qa = function () {
    this.cameraX = this.cameraY = 0;
    this.level = new ROTATE_CanvasObject();
    this.camera = new ROTATE_CanvasObject();
    this.pivot = new ROTATE_CanvasObject();
    this.bg = new ROTATE_CanvasObject();
    P.call(this);
  };
  qa.__name__ = !0;
  qa.__super__ = P;
  qa.prototype = D(P.prototype, {
    init: function () {
      this.bg.graphics.beginFill(3158064);
      this.bg.graphics.drawRect(
        0,
        0,
        ROTATE_Canvas.width,
        ROTATE_Canvas.height,
      );
      this.addChild(this.bg);
      this.pivot.set_x(ROTATE_Canvas.width / 2);
      this.pivot.set_y(ROTATE_Canvas.height / 2);
      this.addChild(this.pivot);
      this.pivot.addChild(this.camera);
      this.level.set_x(-this.camera.x);
      this.level.set_y(-this.camera.y);
      this.camera.addChild(this.level);
      this.renderer = new L(this.camera);
      this.renderer.updateAllBlocks();
      this.level.addChild(this.renderer);
    },
    doRotation: function (a) {
      if (l.rotating) {
        var b = Math.min(
            (ROTATE_Game.instance.get_gameTime() - this.rotateStart) /
              n.rotateTime,
            1,
          ),
          c = ROTATE_Game.smootherStep(b);
        this.pivot.set_rotation(
          this.rotateStartAngle +
            (this.rotateEndAngle - this.rotateStartAngle) * c,
        );
        null != a && (a.set_rotation(-this.pivot.rotation), a.onRotating(c));
        if (1 == b) {
          for (; 0 > this.pivot.rotation; )
            (b = this.pivot), b.set_rotation(b.rotation + 360);
          for (; 360 <= this.pivot.rotation; )
            (b = this.pivot), b.set_rotation(b.rotation - 360);
          l.rotating = !1;
          if (null != a) a.onRotateEnd();
        }
      } else if (
        ((b = InputKeys.keyPressed(
          ROTATE_Game.instance.invert ? KEY_CODES.KeyE : KEY_CODES.KeyQ,
        )),
        (c = InputKeys.keyPressed(
          ROTATE_Game.instance.invert ? KEY_CODES.KeyQ : KEY_CODES.KeyE,
        )),
        (b || c) && (null == a || a.canRotate(b ? -1 : 1)))
      ) {
        l.rotating = !0;
        this.rotateStart = ROTATE_Game.instance.get_gameTime();
        this.rotateDir = b ? -1 : 1;
        this.rotateStartAngle = this.pivot.rotation;
        this.rotateEndAngle = this.rotateStartAngle + 90 * this.rotateDir;
        if (null != a) a.onRotateStart(this.rotateDir);
        b = l;
        b.set_rotation(b.rotation + this.rotateDir);
        if (null != a) a.onRotateStart2();
      }
    },
    postUpdate: function () {
      this.camera.set_x(Math.round(this.cameraX));
      this.camera.set_y(Math.round(this.cameraY));
    },
    __class__: qa,
  });
  var ROTATE_Editor = function () {
    this.doors = [];
    this.drawing = !1;
    this.horizontal = this.vertical = 0;
    qa.call(this);
  };
  ROTATE_Editor.__name__ = !0;
  ROTATE_Editor.renderBlockText = function (a, b) {
    ROTATE_Editor.renderBlockRed(a, 0, 0);
    ROTATE_Text.drawText(a, ROTATE_Game.fontMain, b, 2, 0, 0);
  };
  ROTATE_Editor.renderBlockRed = function (a, b, c) {
    a.beginFill(10428448, 0.4);
    a.drawRect(b, c, n.tileSize, n.tileSize);
    a.endFill();
  };
  ROTATE_Editor.__super__ = qa;
  ROTATE_Editor.prototype = D(qa.prototype, {
    init: function () {
      var a = this;
      l.set_level(ROTATE_Editor.editorLevel);
      for (var b = 0, c = l.get_height(); b < c; )
        for (var d = b++, e = 0, f = l.get_width(); e < f; ) {
          var m = e++;
          m = l.getBlockData(m, d);
          m.get_block() == F.door &&
            0 < m.getMeta(1) &&
            this.doors.push(new Va(m));
        }
      qa.prototype.init.call(this);
      this.cameraX = -(l.level.startCol + 0.5) * n.tileSize;
      this.cameraY = -(l.level.startRow - 0.5) * n.tileSize;
      this.mouseEnabled = !0;
      this.addEventListener('mouseDown', function (k) {
        2 > k.which && k.target == a && (a.drawing = !0);
      });
      ROTATE_Canvas.input.addEventListener('mouseUp', Bind(this, this.mouseUp));
      this.renderer.showGrid = ROTATE_Editor.showGrid;
      this.barUpper = new ROTATE_EditorBarUpper(
        ROTATE_Editor.editorLevel.theme,
        function (k) {
          ROTATE_Editor.editorLevel.theme = 1 - ROTATE_Editor.editorLevel.theme;
          a.barUpper.theme.set_text(
            ROTATE_EditorBarUpper.THEMES[ROTATE_Editor.editorLevel.theme],
          );
          a.renderer.updateAllBlocks();
        },
      );
      this.addChild(this.barUpper);
      this.barLower = new ROTATE_EditorBarLower(function () {
        a.renderer.showGrid = ROTATE_Editor.showGrid;
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
          var p = new eb('Are you sure you want\nto clear the level?');
          p.onYes = function () {
            ROTATE_Editor.editorLevel.reset();
            ROTATE_Game.instance.changeScreen(new ROTATE_Editor(), !1);
          };
          p.onNo = function () {
            a.removeChild(p);
            a.dialog = null;
          };
          a.dialog = p;
          a.addChild(p);
        }
      });
    },
    mouseUp: function (a) {
      2 > a.which && (this.drawing = !1);
    },
    getBoundsSelf: function () {
      return new Bounds(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    },
    showLoadDialog: function () {
      var a = this;
      if (null == this.dialog) {
        var b = new Yb();
        b.onBack = function () {
          b.kill();
          a.removeChild(a.dialog);
          a.dialog = null;
        };
        b.onLoad = function (c) {
          return a.tryLoadLevel(c)
            ? (b.kill(),
              ROTATE_Game.instance.changeScreen(new ROTATE_Editor(), !1),
              !0)
            : !1;
        };
        this.dialog = b;
        this.addChild(b);
      }
    },
    showSaveDialog: function () {
      var a = this;
      if (null == this.dialog) {
        for (
          var b = -1, c = -1, d = 0, e = ROTATE_Editor.editorLevel.tiles.length;
          d < e;

        )
          for (
            var f = d++, m = 0, k = ROTATE_Editor.editorLevel.tiles[f].length;
            m < k;

          ) {
            var p = m++;
            if (1 != ROTATE_Editor.editorLevel.tiles[f][p][0]) {
              -1 == b && (b = f);
              c = f;
              break;
            }
          }
        e = d = -1;
        f = 0;
        for (m = ROTATE_Editor.editorLevel.tiles[0].length; f < m; ) {
          k = f++;
          p = 0;
          for (var y = ROTATE_Editor.editorLevel.tiles.length; p < y; ) {
            var H = p++;
            if (1 != ROTATE_Editor.editorLevel.tiles[H][k][0]) {
              -1 == d && (d = k);
              e = k;
              break;
            }
          }
        }
        f = ROTATE_Editor.editorLevel.startCol - d + ',';
        f += ROTATE_Editor.editorLevel.startRow - b + ',';
        f += ROTATE_Editor.editorLevel.finishCol - d + ',';
        f += ROTATE_Editor.editorLevel.finishRow - b + ',';
        f = f + (d + ',') + b;
        0 != ROTATE_Editor.editorLevel.theme &&
          (f += ',' + ROTATE_Editor.editorLevel.theme);
        f += '|';
        m = b;
        for (c += 1; m < c; )
          for (k = m++, k > b && (f += ';'), p = d, y = e + 1; p < y; ) {
            H = p++;
            for (
              var K = '', W = ROTATE_Editor.editorLevel.tiles[k][H].length;
              0 < --W && 0 == ROTATE_Editor.editorLevel.tiles[k][H][W];

            );
            var aa = 0;
            for (W += 1; aa < W; ) {
              var fa = aa++;
              '' != K && (K += '.');
              0 != ROTATE_Editor.editorLevel.tiles[k][H][fa] &&
                (K += ROTATE_Editor.editorLevel.tiles[k][H][fa]);
            }
            H > d && (f += ',');
            f += K;
          }
        var ka = new Zb(f);
        ka.onBack = function () {
          ka.kill();
          a.removeChild(ka);
          a.dialog = null;
        };
        this.dialog = ka;
        this.addChild(ka);
      }
    },
    update: function () {
      var a = this;
      qa.prototype.update.call(this);
      if (null == this.dialog) {
        this.doRotation();
        this.horizontal = ROTATE_Game.getInputX();
        this.vertical = ROTATE_Game.getInputY();
        var b = ROTATE_Canvas.input.mouseX,
          c = ROTATE_Canvas.input.mouseY;
        if (
          this.drawing &&
          !l.rotating &&
          0 <= b &&
          0 <= c &&
          b < ROTATE_Canvas.width &&
          c < ROTATE_Canvas.height
        ) {
          if (null == l.level) return;
          b = this.renderer.globalToLocal(b, c);
          var d = Math.floor(b.x / n.tileSize),
            e = Math.floor(b.y / n.tileSize);
          if (l.isInBounds(d, e)) {
            var f = [];
            b = null;
            var m = InputKeys.keyDown(16)
              ? 0
              : this.barLower.selector.get_selection().id;
            if (m == F.start.id) {
              if (
                0 < e &&
                (d != ROTATE_Editor.editorLevel.finishCol ||
                  (e != ROTATE_Editor.editorLevel.finishRow &&
                    e - 1 != ROTATE_Editor.editorLevel.finishRow &&
                    e != ROTATE_Editor.editorLevel.finishRow - 1))
              ) {
                c = ROTATE_Editor.editorLevel.startCol;
                var k = ROTATE_Editor.editorLevel.startRow;
                ROTATE_Editor.editorLevel.setStart(d, e);
                var p = l.getBlockData(d, e - 1);
                f.push(p);
                l.setBlock(d, e - 1, 0, [], !0);
                p = l.getBlockData(d, e);
                f.push(p);
                l.setBlock(d, e, 0, [], !0);
                this.renderer.updateBlockPlus(c, k - 1);
                this.renderer.updateBlockPlus(c, k);
                this.renderer.updateBlockPlus(d, e - 1);
                this.renderer.updateBlockPlus(d, e);
              }
            } else if (m == F.finish.id)
              0 < e &&
                (d != ROTATE_Editor.editorLevel.startCol ||
                  (e != ROTATE_Editor.editorLevel.startRow &&
                    e - 1 != ROTATE_Editor.editorLevel.startRow &&
                    e != ROTATE_Editor.editorLevel.startRow - 1)) &&
                ((c = ROTATE_Editor.editorLevel.finishCol),
                (k = ROTATE_Editor.editorLevel.finishRow),
                ROTATE_Editor.editorLevel.setFinish(d, e),
                (p = l.getBlockData(d, e - 1)),
                f.push(p),
                l.setBlock(d, e - 1, 0, [], !0),
                (p = l.getBlockData(d, e)),
                f.push(p),
                l.setBlock(d, e, 0, [], !0),
                this.renderer.updateBlockPlus(c, k - 1),
                this.renderer.updateBlockPlus(c, k),
                this.renderer.updateBlockPlus(d, e - 1),
                this.renderer.updateBlockPlus(d, e));
            else if (l.isReplacable(d, e) && ((c = F.getBlock(m)), null != c)) {
              var y = F.getBlock(m).getConfigMeta();
              k = l.getBlockData(d, e);
              (k.id == m && k.metaEquals(y)) ||
                (c == F.door && !Va.canPlace(d, e, y)) ||
                (f.push(k),
                l.setBlock(d, e, m, y, !0),
                this.renderer.updateBlockPlus(d, e),
                c == F.door &&
                  ((b = new Va(l.getBlockData(d, e))),
                  this.doors.push(b),
                  b.forEach(function (aa, fa) {
                    if (aa != d || fa != e) {
                      var ka = l.getBlockData(aa, fa);
                      f.push(ka);
                      l.setBlock(aa, fa, m, [y[0]], !0);
                      a.renderer.updateBlockPlus(aa, fa);
                    }
                  })));
            }
            for (c = 0; c < f.length; )
              if (((k = f[c]), ++c, k.get_block() == F.door)) {
                p = 0;
                for (var H = this.doors.length; p < H; ) {
                  var K = p++,
                    W = this.doors[K];
                  if (W != b && W.contains(k.x, k.y)) {
                    W.forEach(function (aa, fa) {
                      if (l.getBlock(aa, fa) == F.door) {
                        for (var ka = !1, Ca = 0; Ca < f.length; ) {
                          var nb = f[Ca];
                          ++Ca;
                          if (nb.x == aa && nb.y == fa) {
                            ka = !0;
                            break;
                          }
                        }
                        ka ||
                          (l.setBlock(aa, fa, 0, [], !0),
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
        InputKeys.keyPressed(76) && this.showLoadDialog();
        InputKeys.keyPressed(67) && this.showSaveDialog();
        InputKeys.keyPressed(71) &&
          ((this.renderer.showGrid = ROTATE_Editor.showGrid =
            !ROTATE_Editor.showGrid),
          (this.barLower.gridToggle.toggle.clipRect.x = ROTATE_Editor.showGrid
            ? this.barLower.gridToggle.toggle.clipRect.width
            : 0));
        InputKeys.keyPressed(13) &&
          ROTATE_Game.instance.changeScreen(new w(ROTATE_Editor.editorLevel));
      }
    },
    tryLoadLevel: function (a) {
      a = ma.replace(ma.replace(ma.trim(a), '\n', ''), '\t', '');
      var b = a.split('|');
      if (2 > b.length) return !1;
      var c = b[0].split(',');
      if (4 > c.length) return !1;
      a = la.parseInt(c[0]);
      var d = la.parseInt(c[1]),
        e = la.parseInt(c[2]),
        f = la.parseInt(c[3]);
      if (
        null == a ||
        null == d ||
        null == e ||
        null == f ||
        0 > a ||
        0 > e ||
        1 > d ||
        1 > f ||
        (a == e && (d == f || 1 == Math.abs(d - f)))
      )
        return !1;
      var m = 0,
        k = 0,
        p = 0;
      5 <= c.length && ((m = la.parseInt(c[4])), null == m || 0 > m) && (m = 0);
      6 <= c.length && ((k = la.parseInt(c[5])), null == k || 0 > k) && (k = 0);
      7 <= c.length &&
        ((p = la.parseInt(c[6])), null == p || 0 > p || 1 < p) &&
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
              var oc = la.parseInt(nb[ic]);
              if (null == oc) return !1;
              b[W][Ca][ic] = oc;
            }
          }
        }
      }
      if (1 > c || c > ROTATE_EditorLevel.WORLD_SIZE || a >= c || e >= c)
        return !1;
      for (y = 0; y < H; ) for (K = y++; b[K].length < c; ) b[K].push([0]);
      m = Math.min(m, ROTATE_EditorLevel.WORLD_SIZE - c);
      k = Math.min(k, ROTATE_EditorLevel.WORLD_SIZE - H);
      if (
        a >= c ||
        d >= H ||
        e >= c ||
        f >= H ||
        0 != b[d][a][0] ||
        0 != b[d - 1][a][0] ||
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
      ROTATE_Editor.editorLevel.load(b, a + m, d + k, e + m, f + k, p);
      return !0;
    },
    tick: function () {
      if (!l.rotating && null == this.dialog) {
        var a = this.horizontal * ROTATE_Editor.MOVE_SPEED,
          b = this.vertical * ROTATE_Editor.MOVE_SPEED;
        0 == l.rotation
          ? ((this.cameraX -= a), (this.cameraY -= b))
          : 1 == l.rotation && ((this.cameraX -= b), (this.cameraY += a));
        2 == l.rotation && ((this.cameraX += a), (this.cameraY += b));
        3 == l.rotation && ((this.cameraX += b), (this.cameraY -= a));
        this.cameraX = Math.min(
          Math.max(this.cameraX, -this.renderer.get_width()),
          0,
        );
        this.cameraY = Math.min(
          Math.max(this.cameraY, -this.renderer.get_height()),
          0,
        );
      }
    },
    kill: function () {
      ROTATE_Canvas.input.removeEventListener(
        'mouseUp',
        Bind(this, this.mouseUp),
      );
      l.set_level(null);
    },
    __class__: ROTATE_Editor,
  });
  var bb = function (a) {
    null == a && (a = !1);
    this.done1 = this.first = !1;
    this.cond1 = new M(10);
    P.call(this);
    this.pausable = !0;
    this.speedrun = a;
  };
  bb.__name__ = !0;
  bb.__super__ = P;
  bb.prototype = D(P.prototype, {
    init: function () {
      ROTATE_Game.ie && ROTATE_Audio.themeGame2.volume(0.5);
      this.cond1.start();
      this.speech = new U(
        [
          new C(new M(1.5), 'Have your freedom, for now.'),
          new C(new M(4), 'But you will come back.'),
        ],
        this,
      );
      this.speedrun &&
        42e4 >= ROTATE_Levels.speedrunBest &&
        v.awardSpeedrun.unlock();
      if ((this.first = !v.awardEscape.unlocked))
        (v.awardEscape.unlocked = !0), ROTATE_Game.instance.saveProgress();
    },
    update: function () {
      this.speech.update();
      !this.done1 &&
        this.cond1.test() &&
        ((this.done1 = !0),
        ROTATE_Game.instance.changeScreen(new ob(this.first), !0, null, !0),
        (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
          (ROTATE_Audio.exit.volume(0.5),
          ROTATE_Audio.exit.play(),
          ROTATE_Audio.exit.once('end', function () {
            ROTATE_Audio.exit.volume(1);
          })));
    },
    kill: function () {
      ROTATE_Audio.themeGame2.stop();
      ROTATE_Audio.themeGame2.volume(1);
      ROTATE_Game.ie && (ROTATE_Game.instance.ieGame2 = !1);
    },
    __class__: bb,
  });
  var ob = function (a) {
    null == a && (a = !1);
    this.hint = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Press [SPACE] to continue...',
    );
    this.catTrigger = !1;
    this.cat = new S();
    this.player = new ua(q.player, 32, 48);
    this.artPlants = new ua(q.endingPlants, 504, 24);
    this.artMain = new I(q.endingMain);
    this.vignette = new I(q.vignette);
    this.bg = new ROTATE_CanvasObject();
    this.cameraX = this.cameraY = 0;
    this.camera = new ROTATE_CanvasObject();
    this.pivot = new ROTATE_CanvasObject();
    this.done = !1;
    this.delay = 9.5;
    P.call(this);
    this.pausable = !0;
    this.first = a;
  };
  ob.__name__ = !0;
  ob.__super__ = P;
  ob.prototype = D(P.prototype, {
    init: function () {
      this.start = ROTATE_Game.instance.get_gameTime();
      this.bg.graphics.beginFill(16777215);
      this.bg.graphics.drawRect(
        0,
        0,
        ROTATE_Canvas.width,
        ROTATE_Canvas.height,
      );
      this.addChild(this.bg);
      this.pivot.set_x(ROTATE_Canvas.width / 2);
      this.pivot.set_y(ROTATE_Canvas.height / 2);
      this.addChild(this.pivot);
      this.pivot.addChild(this.camera);
      this.camera.addChild(this.artMain);
      this.artPlants.set_y(11 * n.tileSize);
      this.artPlants.set_animation(new sa([0, 1, 2], [250, 250, 250]));
      this.camera.addChild(this.artPlants);
      this.cat.x2 = this.cat.set_x(17.5 * n.tileSize);
      this.cat.set_y(12 * n.tileSize);
      this.cat.set_scaleX(-1);
      this.cat.set_animation(S.ANIM_IDLE);
      this.camera.addChild(this.cat);
      this.player.origin.x = this.player.frameW / 2;
      this.player.origin.y = this.player.frameH;
      this.player.set_animation(J.ANIM_IDLE);
      this.player.set_x(10.5 * n.tileSize);
      this.player.set_y(12 * n.tileSize);
      this.camera.addChild(this.player);
      this.camera.set_x(Math.round((this.cameraX = -this.player.x)));
      this.camera.set_y(
        Math.round(
          (this.cameraY = -this.player.y + n.rotateOffset + 2 * n.tileSize),
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
              Math.round(n.screenFadeTimeSlow / 2),
            ));
    },
    update: function () {
      var a = this,
        b = ROTATE_Game.instance.get_gameTime() - this.start;
      !this.catTrigger &&
        8 <= b &&
        ((this.catTrigger = !0),
        this.cat.set_scaleX(1),
        (this.cat.horizontal = 1),
        this.cat.set_animation(S.ANIM_END_1),
        (this.cat.onFinish = function () {
          a.cat.set_animation(S.ANIM_END_2);
          a.cat.onFinish = null;
        }));
      var c = b - this.delay;
      this.hint.set_alpha(
        0 > c ? 0 : 0.33 * ROTATE_Game.smootherStep(Math.min(c / 2.5, 1)),
      );
      !this.done &&
        b >= this.delay &&
        InputKeys.keyPressed(KEY_CODES.Space) &&
        ((this.done = !0),
        this.first && ((v.awardEscape.unlocked = !1), v.awardEscape.unlock()),
        ROTATE_Game.instance.changeScreen(new mb(!0), !0, null, !0, !0),
        ROTATE_Game.instance.timerHolder.removeChildren());
    },
    tick: function () {
      var a = 0.75 * n.cameraSpeed;
      this.cameraX += (-this.player.x - this.cameraX) * a;
      this.cameraY += (-this.player.y + n.rotateOffset - this.cameraY) * a;
      this.cat.x < ROTATE_Canvas.width + 100 && this.cat.tick();
    },
    postUpdate: function () {
      this.camera.set_x(Math.round(this.cameraX));
      this.camera.set_y(Math.round(this.cameraY));
    },
    __class__: ob,
  });
  var Oa = function () {
    this.erase = new Ya();
    this.mute = new Ba();
    this.sponsor = new Ma();
    this.bestTime = new ROTATE_Text(ROTATE_Game.fontMain, 'Best time: ', 2);
    this.text3 = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Finish the game as\nquickly as you can.',
      1,
    );
    this.btn3 = new ba('SPEEDRUN');
    this.text2 = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Build custom levels\nand share codes.',
      1,
    );
    this.btn2 = new ba('EDITOR');
    this.text1 = new ROTATE_Text(
      ROTATE_Game.fontMain,
      "See all the awards\nthat you've earned.",
      1,
    );
    this.btn1 = new ba('AWARDS');
    this.btnBack = new ba('BACK');
    this.title = new ROTATE_Text(ROTATE_Game.fontMain, 'EXTRAS', 1);
    this.bg = new Na();
    P.call(this);
  };
  Oa.__name__ = !0;
  Oa.__super__ = P;
  Oa.prototype = D(P.prototype, {
    init: function () {
      ca.playTheme();
      this.addChild(this.bg);
      this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
      this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
      this.title.set_y(56);
      this.addChild(this.title);
      this.btn1.set_x(134);
      this.btn1.set_y(133);
      this.btn1.addEventListener('click', function (b) {
        2 > b.which && ROTATE_Game.instance.changeScreen(new ib());
      });
      this.addChild(this.btn1);
      this.text1.set_x(this.btn1.x + 110);
      this.text1.set_y(this.btn1.y - 29);
      this.addChild(this.text1);
      this.btn2.set_x(this.btn1.x);
      this.btn2.set_y(this.btn1.y + 92);
      this.btn2.addEventListener('click', function (b) {
        2 > b.which &&
          (ca.stopTheme(),
          ROTATE_Game.instance.changeScreen(new ROTATE_Editor()));
      });
      this.addChild(this.btn2);
      this.text2.set_x(this.text1.x);
      this.text2.set_y(this.btn2.y - 29);
      this.addChild(this.text2);
      this.btn3.set_x(this.btn2.x);
      this.btn3.set_y(this.btn2.y + 92);
      this.btn3.addEventListener('click', function (b) {
        2 > b.which &&
          (ca.stopTheme(), ROTATE_Game.instance.changeScreen(new Qa(!0)));
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
        2 > b.which && ROTATE_Game.instance.changeScreen(new ca());
      });
      this.addChild(this.btnBack);
      this.addChild(this.sponsor);
      this.addChild(this.mute);
      this.addChild(this.erase);
      ROTATE_Game.instance.warnNoSave(this);
    },
    __class__: Oa,
  });
  var pb = function () {
    this.erase = new Ya();
    this.mute = new Ba();
    this.sponsor = new Ma();
    this.tiles = new ROTATE_CanvasObject();
    this.btnBack = new ba('BACK');
    this.title = new ROTATE_Text(ROTATE_Game.fontMain, 'LEVEL SELECT', 1);
    this.bg = new Na();
    P.call(this);
  };
  pb.__name__ = !0;
  pb.__super__ = P;
  pb.prototype = D(P.prototype, {
    init: function () {
      ca.playTheme();
      this.addChild(this.bg);
      this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
      this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
      this.title.set_y(56);
      this.addChild(this.title);
      this.addChild(this.tiles);
      this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
      this.btnBack.set_y(ROTATE_Canvas.height - 84);
      this.btnBack.addEventListener('click', function (a) {
        2 > a.which && ROTATE_Game.instance.changeScreen(new ca());
      });
      this.addChild(this.btnBack);
      this.addChild(this.sponsor);
      this.addChild(this.mute);
      this.addChild(this.erase);
      ROTATE_Game.instance.warnNoSave(this);
      this.refresh();
    },
    refresh: function () {
      this.tiles.removeChildren();
      for (
        var a = ROTATE_Levels.list.length,
          b = Math.round((ROTATE_Canvas.width - (4 * q.level.width + 72)) / 2),
          c = this.title.y + 56,
          d = 0;
        d < a;

      ) {
        var e = [d++],
          f = Math.floor(e[0] / 4),
          m = e[0] % 4,
          k = e[0] <= ROTATE_Levels.unlocked,
          p = new I(q.level);
        p.set_x(b + m * (p.get_width() + 24));
        p.set_y(c + f * (p.get_height() + 20));
        k
          ? ((p.mouseEnabled = p.buttonMode = !0),
            p.addEventListener(
              'click',
              (function (y) {
                return function (H) {
                  1 < H.which ||
                    (ca.stopTheme(),
                    0 == y[0]
                      ? ROTATE_Game.instance.changeScreen(new Qa())
                      : w.play(ROTATE_Levels.list[y[0]]));
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
    },
    __class__: pb,
  });
  var ca = function () {
    this.erase = new Ya();
    this.mute = new Ba();
    this.sponsor = new Ma();
    this.btnCredits = new ba('CREDITS');
    this.btnExtras = new ba('EXTRAS');
    this.btnPlay = new ba('PLAY');
    this.logo = new I(q.logo);
    this.bg = new Na();
    P.call(this);
  };
  ca.__name__ = !0;
  ca.playTheme = function () {
    ROTATE_Audio.themeMenu.playing() ||
      ((ROTATE_Game.ie && ROTATE_Game.instance.muteMusic) ||
        ROTATE_Audio.themeMenu.play(),
      ROTATE_Game.ie && (ROTATE_Game.instance.ieMenu = !0));
  };
  ca.stopTheme = function () {
    ROTATE_Game.ie
      ? (ROTATE_Audio.themeMenu.stop(), (ROTATE_Game.instance.ieMenu = !1))
      : (ROTATE_Audio.themeMenu.fade(1, 0, Math.floor(n.screenFadeTime / 2)),
        ROTATE_Audio.themeMenu.once('fade', function () {
          ROTATE_Audio.themeMenu.stop();
          ROTATE_Audio.themeMenu.volume(1);
        }));
  };
  ca.__super__ = P;
  ca.prototype = D(P.prototype, {
    init: function () {
      ca.playTheme();
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
            ? (ca.stopTheme(), ROTATE_Game.instance.changeScreen(new Qa()))
            : ROTATE_Game.instance.changeScreen(new pb()));
      });
      this.addChild(this.btnPlay);
      this.btnExtras.set_x(this.btnPlay.x);
      this.btnExtras.set_y(this.btnPlay.y + 60);
      this.btnExtras.addEventListener('click', function (a) {
        2 > a.which && ROTATE_Game.instance.changeScreen(new Oa());
      });
      this.addChild(this.btnExtras);
      this.btnCredits.set_x(this.btnExtras.x);
      this.btnCredits.set_y(this.btnExtras.y + 60);
      this.btnCredits.addEventListener('click', function (a) {
        2 > a.which && ROTATE_Game.instance.changeScreen(new mb());
      });
      this.addChild(this.btnCredits);
      this.addChild(this.mute);
      this.addChild(this.erase);
      ROTATE_Game.instance.warnNoSave(this);
    },
    __class__: ca,
  });
  var w = function (a, b, c) {
    null == c && (c = -1);
    null == b && (b = !1);
    this.channels = new hb();
    this.newBest = !1;
    this.speedrunFinal = -1;
    this.doors = [];
    this.cat = null;
    this.vignette = new I(q.vignette);
    this.red = new ROTATE_CanvasObject();
    this.overlay = new ROTATE_CanvasObject();
    this.textHolder = new ROTATE_CanvasObject();
    this.blood = new ROTATE_CanvasObject();
    this.shakeX = this.shakeY = 0;
    this.deathTime = -1;
    qa.call(this);
    this.tempLevel = a;
    this.pausable = !0;
    this.speedrun = b;
    this.speedrunStart = c;
    (0 == a.theme && ROTATE_Audio.themeGame1.playing()) ||
    (1 == a.theme && ROTATE_Audio.themeGame2.playing())
      ? (w.continueTheme = !0)
      : (w.continueTheme = !1);
  };
  w.__name__ = !0;
  w.play = function (a, b, c) {
    null == c && (c = -1);
    null == b && (b = !1);
    null != a && ROTATE_Game.instance.changeScreen(new w(a, b, c));
  };
  w.playTheme = function (a) {
    w.stopped &&
      (0 == a && ROTATE_Audio.themeGame1.playing()
        ? (ROTATE_Audio.themeGame1.stop(), (w.canceled = !0))
        : 1 == a &&
          ROTATE_Audio.themeGame2.playing() &&
          (ROTATE_Audio.themeGame2.stop(), (w.canceled = !0)),
      ROTATE_Game.ie &&
        (ROTATE_Game.instance.ieGame1 = ROTATE_Game.instance.ieGame2 = !1),
      (w.stopped = !1));
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
  };
  w.stopTheme = function () {
    var a = ROTATE_Audio.themeGame1.playing()
      ? ROTATE_Audio.themeGame1
      : ROTATE_Audio.themeGame2.playing()
        ? ROTATE_Audio.themeGame2
        : null;
    if (null != a) {
      var b =
        E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
        E.__instanceof(ROTATE_Game.instance.targetScreen, bb);
      if (ROTATE_Game.ie) b || a.stop();
      else {
        var c = a.volume();
        a.fade(c, 0, Math.floor(n.screenFadeTime / 2) + (b ? 1e4 : 0));
        a.once('fade', function () {
          w.canceled || (a.stop(), a.volume(1));
        });
      }
      w.stopped = !0;
      w.canceled = !1;
    } else w.stopped = w.canceled = !1;
    ROTATE_Game.ie &&
      (ROTATE_Game.instance.ieGame1 = ROTATE_Game.instance.ieGame2 = !1);
  };
  w.__super__ = qa;
  w.prototype = D(qa.prototype, {
    init: function () {
      w.i = this;
      this.tempLevel == ROTATE_Editor.editorLevel && v.awardEditor.unlock();
      w.playTheme(this.tempLevel.theme);
      w.continueTheme = !1;
      l.set_level(this.tempLevel);
      l.onPlay();
      for (var a = this.channels.iterator(); a.hasNext(); )
        a.next().lastChanged = -1e4;
      a = 0;
      for (var b = l.get_height(); a < b; )
        for (var c = a++, d = 0, e = l.get_width(); d < e; ) {
          var f = d++;
          f = l.getBlockData(f, c);
          f.get_block() == F.door &&
            0 < f.getMeta(1) &&
            this.doors.push(new Va(f));
        }
      l.level.start();
      qa.prototype.init.call(this);
      this.player = new J();
      this.player.set_x(
        (this.player.x2 = this.player.lastX =
          (l.level.startCol + 0.5) * n.tileSize),
      );
      this.player.set_y(
        (this.player.y2 = this.player.lastY =
          (l.level.startRow + 1) * n.tileSize),
      );
      this.player.set_scaleX(0 > l.level.startDir ? -1 : 1);
      this.level.addChild(this.player);
      a = this.findCameraGoal();
      this.camera.set_x(Math.round((this.cameraX = a.x)));
      this.camera.set_y(Math.round((this.cameraY = a.y + 2 * n.tileSize)));
      this.level.addChild(this.blood);
      this.level.addChild(this.overlay);
      this.vignette.set_alpha(0.75);
      this.addChild(this.vignette);
      this.addChild(this.textHolder);
      this.red.graphics.beginFill(14622752);
      this.red.graphics.drawRect(
        0,
        0,
        ROTATE_Canvas.width,
        ROTATE_Canvas.height,
      );
      this.red.visible = !1;
      this.addChild(this.red);
      if (this.speedrun) {
        if (
          -1 == this.speedrunStart ||
          0 == ROTATE_Levels.list.indexOf(l.level)
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
        l.level != ROTATE_Levels.level1 ||
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
    },
    updateTimer: function () {
      this.speedrun &&
        this.timerText.set_text(
          ROTATE_Game.formatMS(
            ROTATE_Game.instance.get_gameTimeMS() - this.speedrunStart,
          ),
        );
    },
    killPlayer: function (a) {
      null == a && (a = !1);
      if (!this.player.dead) {
        this.player.dead = !0;
        this.deathTime = ROTATE_Game.instance.get_gameTime();
        this.player.visible = !1;
        (ROTATE_Game.ie && ROTATE_Game.instance.muteSFX) ||
          ROTATE_Audio.death.play();
        var b = 0,
          c = 0;
        0 == l.rotation
          ? (c = 1)
          : 1 == l.rotation
            ? (b = 1)
            : 2 == l.rotation
              ? (c = -1)
              : 3 == l.rotation && (b = -1);
        var d = this.player.dx,
          e = this.player.dy;
        1 == l.rotation
          ? ((d = this.player.dy), (e = -this.player.dx))
          : 2 == l.rotation
            ? ((d = -this.player.dx), (e = -this.player.dy))
            : 3 == l.rotation && ((d = -this.player.dy), (e = this.player.dx));
        4 < d ? (d = 4) : -4 > d && (d = -4);
        4 < e ? (e = 4) : -4 > e && (e = -4);
        var f = this.player.getHitBounds().get_center();
        a = new Ib(f.x, f.y, 14622752, 0.4 * d, 0.4 * e, b, c, !0, a ? 2 : 1);
        this.blood.addChild(a);
        null != l.level.speech && l.level.speech.killed();
        this.red.visible = !0;
      }
    },
    restart: function (a) {
      a = ROTATE_Game.instance.paused
        ? ((gameInstance = ROTATE_Game.instance),
          Bind(gameInstance, gameInstance.unpause))
        : null;
      ROTATE_Game.instance.changeScreen(
        new w(l.level, this.speedrun, this.speedrunStart),
        !0,
        a,
      );
    },
    finished: function () {
      var a = ROTATE_Levels.list.indexOf(l.level);
      if (-1 < a) {
        var b = !1;
        ++a;
        if (this.speedrun && a == ROTATE_Levels.list.length) {
          if (
            ((this.speedrunFinal =
              ROTATE_Game.instance.get_gameTimeMS() -
              this.speedrunStart +
              n.screenFadeTime / 2),
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
      a = l.level.finished();
      null != a && w.play(a, this.speedrun, this.speedrunStart);
    },
    update: function () {
      qa.prototype.update.call(this);
      if (this.player.dead) {
        var a =
          1 -
          Math.min(
            (ROTATE_Game.instance.get_gameTime() - this.deathTime) /
              w.DEATH_SHAKE_TIME,
            1,
          );
        this.red.set_alpha(a);
        a = ROTATE_Game.smootherStep(a);
        this.shakeX = Math.random() * w.DEATH_SHAKE_AMOUNT * a;
        this.shakeY = Math.random() * w.DEATH_SHAKE_AMOUNT * a;
        ROTATE_Game.instance.get_gameTime() - this.deathTime >= w.DEATH_TIME &&
          null == ROTATE_Game.instance.targetScreen &&
          this.restart(!0);
      } else this.player.finished || this.doRotation(this.player);
      this.player.update();
    },
    tick: function () {
      this.player.tick();
      l.level.tick();
      null != this.cat && this.cat.tick();
      var a = this.findCameraGoal();
      this.cameraX += (a.x - this.cameraX) * n.cameraSpeed;
      this.cameraY += (a.y - this.cameraY) * n.cameraSpeed;
    },
    postUpdate: function () {
      this.player.postUpdate();
      l.level.update();
      this.camera.set_x(Math.round(this.cameraX + this.shakeX));
      this.camera.set_y(Math.round(this.cameraY + this.shakeY));
      this.updateTimer();
    },
    findCameraGoal: function () {
      var a = this.player.localToGlobal(0, 0);
      a = this.camera.globalToLocal(
        a.x,
        a.y - (l.rotating ? 0 : n.rotateOffset),
      );
      a.x *= -1;
      a.y *= -1;
      return a;
    },
    signalOn: function (a, b, c) {
      var d = this.channels.h[c];
      null == d && ((d = new hc(c)), (this.channels.h[c] = d));
      d.signalOn(a, b);
    },
    signalOff: function (a, b, c) {
      c = this.channels.h[c];
      null != c && c.signalOff(a, b);
    },
    getChannelStatus: function (a) {
      a = this.channels.h[a];
      return null != a ? a.get_status() : !1;
    },
    catAppear: function (a, b, c) {
      this.cat = new S();
      this.cat.set_x((this.cat.x2 = (a + 0.5) * n.tileSize));
      this.cat.set_y((b + 1) * n.tileSize);
      this.cat.set_scaleX(c);
      this.cat.set_animation(S.ANIM_IDLE);
      this.level.addChild(this.cat);
    },
    catDisappear: function (a) {
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
        this.cat.set_animation(S.ANIM_EXIT),
        (this.cat.horizontal = this.cat.scaleX));
    },
    kill: function () {
      w.i = null;
      l.level.kill();
      l.set_level(null);
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
    },
    prekill: function () {
      w.continueTheme ? (w.stopped = w.canceled = !1) : w.stopTheme();
    },
    __class__: w,
  });
  var $b = function (a) {
    null == a && (a = !0);
    this.onTimer = null;
    this.done = !1;
    this.length = 1.5;
    P.call(this);
    this.lws = a;
    a = new I(q.splashLWS);
    a.set_x(Math.round((ROTATE_Canvas.width - a.get_width()) / 2));
    a.set_y(Math.round((ROTATE_Canvas.height - a.get_height()) / 2));
    this.addChild(a);
  };
  $b.__name__ = !0;
  $b.__super__ = P;
  $b.prototype = D(P.prototype, {
    ready: function () {
      this.timer = Time.get_current();
    },
    update: function () {
      !this.done &&
        Time.get_current() - this.timer > this.length &&
        ((this.done = !0), ROTATE_Game.instance.changeScreen(new ca()));
    },
    __class__: $b,
  });
  var vb = function () {
    this.start = new I(q.start);
    this.pivot = new ROTATE_CanvasObject();
    P.call(this);
  };
  vb.__name__ = !0;
  vb.__super__ = P;
  vb.prototype = D(P.prototype, {
    init: function () {
      this.timer = Time.get_currentMS();
      this.pivot.set_x(ROTATE_Canvas.width / 2);
      this.pivot.set_y(ROTATE_Canvas.height / 2);
      this.addChild(this.pivot);
      this.start.set_x(-this.start.get_width() / 2);
      this.start.set_y(-this.start.get_height() / 2);
      this.start.set_alpha(0);
      this.pivot.addChild(this.start);
    },
    update: function () {
      var a = this,
        b = ROTATE_Game.smootherStep(
          Math.min(1, (Time.get_currentMS() - this.timer) / 250),
        );
      this.pivot.set_rotation(-90 + 90 * b);
      this.pivot.set_scaleX(this.pivot.set_scaleY(2 + -b));
      this.start.set_alpha(b);
      1 != this.start.alpha ||
        this.start.buttonMode ||
        ((this.start.buttonMode = this.start.mouseEnabled = !0),
        this.start.addEventListener('click', function (c) {
          2 > c.which &&
            (ROTATE_Audio.exit.volume(1e-4),
            ROTATE_Audio.exit.play(),
            ROTATE_Audio.exit.once('end', function () {
              ROTATE_Audio.exit.volume(1);
            }),
            ROTATE_Game.instance.changeScreen(new $b()),
            (a.start.mouseEnabled = !1));
        }));
    },
    __class__: vb,
  });
  var Qa = function (a) {
    null == a && (a = !1);
    this.done2 = !1;
    this.cond2 = new M(0.5);
    this.done1 = !1;
    this.cond1 = new M(10);
    P.call(this);
    this.pausable = !0;
    this.speedrun = a;
  };
  Qa.__name__ = !0;
  Qa.__super__ = P;
  Qa.prototype = D(P.prototype, {
    init: function () {
      this.cond1.start();
      this.speech = new U(
        [
          new C(new M(2), "It's time to resume your training."),
          new C(new M(4), "We'll start with the basics."),
        ],
        this,
      );
      this.cond2.start();
    },
    update: function () {
      !this.done2 &&
        this.cond2.test() &&
        ((this.done2 = !0),
        w.playTheme(0),
        ROTATE_Game.ie || ROTATE_Audio.themeGame1.fade(0, 1, 1e3));
      this.speech.update();
      !this.done1 &&
        this.cond1.test() &&
        ((this.done1 = !0), w.play(ROTATE_Levels.level1, this.speedrun));
    },
    prekill: function () {
      w.continueTheme || w.stopTheme();
    },
    kill: function () {},
    __class__: Qa,
  });
  var ROTATE_Text = function (a, b, c) {
    null == c && (c = 0);
    null == b && (b = '');
    this.textWidth = this.textHeight = 0;
    this.lineWidths = [];
    this.align =
      this.xAlign =
      this.yAlign =
      this.lineHeight =
      this.hitPadding =
        0;
    this.text = '';
    var d = this;
    ROTATE_CanvasObject.call(this);
    this.set_font(a);
    this.set_text(b);
    this.color = c;
    this.addEventListener('render', function (e) {
      d.render(e.surface);
    });
  };
  ROTATE_Text.__name__ = !0;
  ROTATE_Text.drawText = function (a, b, c, d, e, f) {
    null == f && (f = 0);
    null == c && (c = '');
    for (var m = 0, k = 0, p = 0, y = 0, H = c.length; y < H; ) {
      var K = y++;
      '\n' == c.charAt(K)
        ? (++p, (m = 0), (k += b.lineHeight))
        : ((K = ja.charCodeAt(c, K)),
          (K = b.chars[K]),
          null != K &&
            (a.drawImage(
              b.image,
              new Bounds(K.x + f * b.colorOffset, K.y, K.w, K.h),
              d + m + K.xo,
              e + k + K.yo,
            ),
            (m += K.xa)));
    }
  };
  ROTATE_Text.__super__ = ROTATE_CanvasObject;
  ROTATE_Text.prototype = D(ROTATE_CanvasObject.prototype, {
    set_font: function (a) {
      this.font = a;
      this.set_lineHeight(a.lineHeight);
      this.precalc();
      return a;
    },
    set_text: function (a) {
      this.text = a;
      this.precalc();
      return a;
    },
    set_lineHeight: function (a) {
      this.lineHeight = a;
      this.precalc();
      return a;
    },
    precalc: function () {
      var a = 0,
        b = 0,
        c = this.lineHeight,
        d = 0;
      this.lineWidths = [];
      for (var e = 0, f = this.text.length; e < f; ) {
        var m = e++;
        if ('\n' == this.text.charAt(m))
          this.lineWidths.push(d),
            d > b && (b = d),
            (a = d = 0),
            (c += this.lineHeight);
        else if (
          ((m = ja.charCodeAt(this.text, m)),
          (m = this.font.chars[m]),
          null != m)
        ) {
          var k = m.xo + m.w;
          d += a + k;
          a = m.xa - k;
        }
      }
      this.lineWidths.push(d);
      d > b && (b = d);
      this.textWidth = b;
      this.textHeight = c;
    },
    render: function (a) {
      for (
        var b = this.getTextOffset(),
          c = -this.getLineOffset(this.lineWidths[0]),
          d = 0,
          e = 0,
          f = 0,
          m = this.text.length;
        f < m;

      ) {
        var k = f++;
        '\n' == this.text.charAt(k)
          ? (++e,
            (c = -this.getLineOffset(this.lineWidths[e])),
            (d += this.lineHeight))
          : ((k = ja.charCodeAt(this.text, k)),
            (k = this.font.chars[k]),
            null != k &&
              (a.drawImage(
                this.font.image,
                new Bounds(
                  k.x + this.color * this.font.colorOffset,
                  k.y,
                  k.w,
                  k.h,
                ),
                b.x + c + k.xo,
                b.y + d + k.yo,
              ),
              (c += k.xa)));
      }
    },
    getBoundsSelf: function () {
      var a = this.getTextOffset();
      return new Bounds(
        a.x - this.hitPadding,
        a.y - this.hitPadding,
        this.textWidth + 2 * this.hitPadding,
        this.textHeight + 2 * this.hitPadding,
      );
    },
    getTextOffset: function () {
      var a = new Q(0, 0);
      this.xAlign == ROTATE_Text.X_ALIGN_CENTER &&
        (a.x = Math.round(-this.textWidth / 2));
      this.xAlign == ROTATE_Text.X_ALIGN_RIGHT && (a.x = -this.textWidth);
      this.yAlign == ROTATE_Text.Y_ALIGN_MIDDLE &&
        (a.y = Math.round(-this.textHeight / 2));
      this.yAlign == ROTATE_Text.Y_ALIGN_BOTTOM && (a.y = -this.textHeight);
      return a;
    },
    getLineOffset: function (a) {
      return this.align == ROTATE_Text.ALIGN_CENTER
        ? Math.round((-this.textWidth + a) / 2)
        : this.align == ROTATE_Text.ALIGN_RIGHT
          ? -this.textWidth + a
          : 0;
    },
    __class__: ROTATE_Text,
  });
  var Xb = function (a) {
    ROTATE_CanvasObject.call(this);
    var b = new I(q.awardFrame);
    b.set_x(-b.get_width() / 2);
    this.addChild(b);
    b = new I(a.unlocked ? a.icon : q.awardIconLocked);
    b.set_x(-b.get_width() / 2);
    b.set_y(8);
    this.addChild(b);
    b = new ROTATE_Text(ROTATE_Game.fontMain, a.name, 1);
    b.align = ROTATE_Text.ALIGN_CENTER;
    b.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    b.set_y(64);
    b.set_lineHeight(b.lineHeight - 4);
    this.addChild(b);
    a.unlocked || this.set_alpha(0.5);
  };
  Xb.__name__ = !0;
  Xb.__super__ = ROTATE_CanvasObject;
  Xb.prototype = D(ROTATE_CanvasObject.prototype, {
    __class__: Xb,
  });
  var O = function () {
    this.bubble = new ac();
    var a = this;
    ROTATE_CanvasObject.call(this);
    this.mouseEnabled = this.buttonMode = !0;
    this.bubble.visible = !1;
    this.bubble.mouseEnabled = !0;
    this.addChild(this.bubble);
    this.addEventListener('mouseDown', function (b) {
      if (b.target == a && 2 > b.which) {
        var c = O.selected;
        O.set_selected(Math.floor(a.globalToLocal(b.x, b.y).x / O.size4));
        a.bubble.set_x(Math.round((O.selected + 0.5) * O.size4));
        b =
          a.get_selection().configurable &&
          (O.selected == c ? !a.bubble.visible : !0);
        a.bubble.visible = b;
        a.bubble.visible && a.bubble.setup(a.get_selection());
      }
    });
    this.addEventListener('render', function (b) {
      a.render(b.surface);
    });
  };
  O.__name__ = !0;
  O.set_selected = function (a) {
    return (O.selected =
      0 > a ? 0 : a >= O.list.length ? O.list.length - 1 : a);
  };
  O.__super__ = ROTATE_CanvasObject;
  O.prototype = D(ROTATE_CanvasObject.prototype, {
    get_selection: function () {
      return O.list[O.selected];
    },
    render: function (a) {
      a.beginFill(12525600, 0.75);
      a.drawRect(
        (InputKeys.keyDown(16) ? 0 : O.selected) * O.size4,
        0,
        O.size4,
        O.size4,
      );
      a.translate(2, 2);
      a.beginFill(14671839);
      for (var b = 0, c = O.list.length; b < c; ) {
        var d = b++,
          e = O.list[d];
        0 < d && a.translate(O.size4, 0);
        e.rotatePreview() &&
          (a.translate(O.size2, O.size2),
          a.rotate((l.rotation * Math.PI) / 2),
          a.translate(-O.size2, -O.size2));
        a.drawRect(0, 0, n.tileSize, n.tileSize);
        e.render(a, new wb(0, 0, e.id, e.getConfigMeta()), !1);
        e.rotatePreview() &&
          (a.translate(O.size2, O.size2),
          a.rotate((-l.rotation * Math.PI) / 2),
          a.translate(-O.size2, -O.size2));
      }
      a.translate((O.list.length - 1) * -O.size4, 0);
      a.translate(-2, -2);
    },
    getBoundsSelf: function () {
      return new Bounds(0, 0, O.list.length * (n.tileSize + 4), n.tileSize + 4);
    },
    __class__: O,
  });
  var ac = function () {
    this.tip = new I(q.configTip);
    ROTATE_CanvasObject.call(this);
    this.tip.set_x(-this.tip.get_width() / 2);
    this.tip.set_y(-this.tip.get_height());
    this.addChild(this.tip);
  };
  ac.__name__ = !0;
  ac.__super__ = ROTATE_CanvasObject;
  ac.prototype = D(ROTATE_CanvasObject.prototype, {
    setup: function (a) {
      var b = Math.round(a.bubbleWidth / 2);
      this.graphics.clear();
      this.graphics.beginFill(8421504);
      this.graphics.drawRect(
        -b - 2,
        -a.bubbleHeight - this.tip.get_height() - 2,
        a.bubbleWidth + 4,
        a.bubbleHeight + 4,
      );
      this.graphics.beginFill(2105376);
      this.graphics.drawRect(
        -b,
        -a.bubbleHeight - this.tip.get_height(),
        a.bubbleWidth,
        a.bubbleHeight,
      );
      null != this.content && this.removeChild(this.content);
      this.content = new ROTATE_CanvasObject();
      this.content.set_x(-b);
      this.content.set_y(-a.bubbleHeight - this.tip.get_height());
      this.addChild(this.content);
      a.setupBubble(this.content);
    },
    __class__: ac,
  });
  var Da = function (a, b) {
    null == b && (b = '');
    ROTATE_CanvasObject.call(this);
    this.graphics.beginFill(1052688, 0.95);
    this.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.mouseEnabled = !0;
    this.title = new ROTATE_Text(ROTATE_Game.fontMain, a);
    this.title.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.title.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.title.set_y(36);
    this.addChild(this.title);
    this.area = window.document.createElement('textarea');
    var c = ROTATE_Canvas.width - 80;
    window.document.body.appendChild(this.area);
    this.area.style.position = 'absolute';
    this.area.style.left = Math.round((ROTATE_Canvas.width - c) / 2) + 'px';
    this.area.style.top =
      Math.round((ROTATE_Canvas.height - 300) / 2 - 8) + 'px';
    this.area.style.width = c - 12 + 'px';
    this.area.style.height = '288px';
    this.area.style.resize = 'none';
    this.area.style.border = this.area.style.outline = 'none';
    this.area.style.margin = '0';
    this.area.style.padding = '6px';
    this.area.style.background = '#fff';
    this.area.style.color = '#000';
    this.area.style.fontFamily = "'Courier New', Courier, monospace";
    this.area.style.fontSize = '12px';
    this.area.value = b;
    this.area.select();
  };
  Da.__name__ = !0;
  Da.__super__ = ROTATE_CanvasObject;
  Da.prototype = D(ROTATE_CanvasObject.prototype, {
    kill: function () {
      null != this.area.parentElement &&
        window.document.body.removeChild(this.area);
    },
    __class__: Da,
  });
  var Yb = function () {
    this.btnLoad = new ba('LOAD');
    this.btnCancel = new ba('CANCEL');
    this.invalid = new ROTATE_Text(
      ROTATE_Game.fontMain,
      'Level code is invalid!',
      2,
    );
    var a = this;
    Da.call(this, 'LOAD LEVEL');
    this.invalid.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.invalid.yAlign = ROTATE_Text.Y_ALIGN_BOTTOM;
    this.invalid.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.invalid.set_y(ROTATE_Canvas.height - 82);
    this.invalid.visible = !1;
    this.addChild(this.invalid);
    this.btnCancel.set_x(Math.round(ROTATE_Canvas.width / 2) - 96);
    this.btnCancel.set_y(ROTATE_Canvas.height - 52);
    this.btnCancel.addEventListener('click', function (b) {
      if (2 > b.which && null != a.onBack) a.onBack();
    });
    this.addChild(this.btnCancel);
    this.btnLoad.set_x(Math.round(ROTATE_Canvas.width / 2) + 96);
    this.btnLoad.set_y(ROTATE_Canvas.height - 52);
    this.btnLoad.addEventListener('click', function (b) {
      2 > b.which &&
        null != a.onLoad &&
        !a.onLoad(a.area.value) &&
        (a.invalid.visible = !0);
    });
    this.addChild(this.btnLoad);
    this.area.addEventListener('input', function () {
      a.invalid.visible = !1;
    });
  };
  Yb.__name__ = !0;
  Yb.__super__ = Da;
  Yb.prototype = D(Da.prototype, {
    __class__: Yb,
  });
  var Zb = function (a) {
    this.btnBack = new ba('BACK');
    var b = this;
    Da.call(this, 'SAVE LEVEL', a);
    this.area.readOnly = !0;
    this.btnBack.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.btnBack.set_y(ROTATE_Canvas.height - 52);
    this.btnBack.addEventListener('click', function (c) {
      if (2 > c.which && null != b.onBack) b.onBack();
    });
    this.addChild(this.btnBack);
  };
  Zb.__name__ = !0;
  Zb.__super__ = Da;
  Zb.prototype = D(Da.prototype, {
    __class__: Zb,
  });
  var ROTATE_EditorBarLower = function (a) {
    this.selector = new O();
    var b = this;
    ROTATE_CanvasObject.call(this);
    this.set_y(ROTATE_Canvas.height - ROTATE_EditorBarLower.HEIGHT);
    this.mouseEnabled = !0;
    this.graphics.beginFill(2105376);
    this.graphics.drawRect(
      0,
      0,
      ROTATE_Canvas.width,
      ROTATE_EditorBarLower.HEIGHT,
    );
    this.gridToggle = new bc(a);
    this.addChild(this.gridToggle);
    this.selector.set_x(12);
    this.selector.set_y(
      Math.round(
        (ROTATE_EditorBarLower.HEIGHT - this.selector.get_height()) / 2,
      ),
    );
    this.addChild(this.selector);
    this.addEventListener('mouseDown', function (c) {
      2 > c.which && c.target == b && (b.selector.bubble.visible = !1);
    });
  };
  ROTATE_EditorBarLower.__name__ = !0;
  ROTATE_EditorBarLower.__super__ = ROTATE_CanvasObject;
  ROTATE_EditorBarLower.prototype = D(ROTATE_CanvasObject.prototype, {
    __class__: ROTATE_EditorBarLower,
  });
  var ROTATE_EditorBarUpper = function (a, b) {
    this.btnLoad = new ROTATE_Text(ROTATE_Game.fontMain, 'Load');
    this.btnSave = new ROTATE_Text(ROTATE_Game.fontMain, 'Save');
    this.btnPlay = new ROTATE_Text(ROTATE_Game.fontMain, 'Play');
    this.btnClear = new ROTATE_Text(ROTATE_Game.fontMain, 'Clear');
    this.btnExit = new ROTATE_Text(ROTATE_Game.fontMain, 'Exit');
    ROTATE_CanvasObject.call(this);
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
    this.btnExit.addEventListener('click', function (d) {
      2 > d.which && ROTATE_Game.instance.changeScreen(new Oa());
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
      ROTATE_EditorBarUpper.THEMES[a],
    );
    this.theme.set_x(this.btnClear.x + this.btnClear.get_width() + 72);
    this.theme.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.theme.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.addChild(this.theme);
    var c = new I(q.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.set_x(this.theme.x + 46);
    c.set_y(this.theme.y + 4);
    c.addEventListener('mouseDown', function (d) {
      2 > d.which && b(-1);
    });
    this.addChild(c);
    c = new I(q.configArrow);
    c.mouseEnabled = c.buttonMode = !0;
    c.set_scaleX(-1);
    c.set_x(this.theme.x - 46);
    c.set_y(this.theme.y + 4);
    c.addEventListener('mouseDown', function (d) {
      2 > d.which && b(1);
    });
    this.addChild(c);
    this.btnPlay.set_x(ROTATE_Canvas.width - ROTATE_EditorBarUpper.EDGE_PAD);
    this.btnPlay.set_y(ROTATE_EditorBarUpper.EDGE_PAD_Y);
    this.btnPlay.xAlign = ROTATE_Text.X_ALIGN_RIGHT;
    this.btnPlay.mouseEnabled = this.btnPlay.buttonMode = !0;
    this.btnPlay.hitPadding = ROTATE_EditorBarUpper.BTN_PAD;
    this.btnPlay.addEventListener('click', function (d) {
      2 > d.which && w.play(ROTATE_Editor.editorLevel);
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
  };
  ROTATE_EditorBarUpper.__name__ = !0;
  ROTATE_EditorBarUpper.__super__ = ROTATE_CanvasObject;
  ROTATE_EditorBarUpper.prototype = D(ROTATE_CanvasObject.prototype, {
    __class__: ROTATE_EditorBarUpper,
  });
  var Ya = function () {
    I.call(this, q.trash);
    this.set_x(ROTATE_Canvas.width - 120);
    this.set_y(ROTATE_Canvas.height - this.get_height() - 12);
    for (var a = !1, b = 0, c = v.all; b < c.length; ) {
      var d = c[b];
      ++b;
      if (d.unlocked) {
        a = !0;
        break;
      }
    }
    0 != ROTATE_Levels.unlocked || a
      ? ((this.buttonMode = this.mouseEnabled = !0),
        this.addEventListener('click', function (e) {
          if (2 > e.which) {
            var f = new eb('Do you want to erase ALL of\nyour saved progress?');
            f.onNo = function () {
              ROTATE_Game.instance.currentScreen.removeChild(f);
            };
            f.onYes = function () {
              ROTATE_Game.instance.clearProgress();
              ROTATE_Game.instance.changeScreen(new ca());
            };
            ROTATE_Game.instance.currentScreen.addChild(f);
          }
        }))
      : this.set_alpha(0.33);
  };
  Ya.__name__ = !0;
  Ya.__super__ = I;
  Ya.prototype = D(I.prototype, {
    __class__: Ya,
  });
  var bc = function (a) {
    this.label = new ROTATE_Text(ROTATE_Game.fontMain, 'Grid');
    this.toggle = new I(q.configToggle);
    var b = this;
    ROTATE_CanvasObject.call(this);
    this.set_x(ROTATE_Canvas.width - this.get_width() - 12);
    this.set_y(8);
    this.mouseEnabled = this.buttonMode = !0;
    this.addEventListener('click', function (c) {
      1 < c.which ||
        ((ROTATE_Editor.showGrid = !ROTATE_Editor.showGrid),
        (b.toggle.clipRect.x = ROTATE_Editor.showGrid
          ? b.toggle.clipRect.width
          : 0),
        null != a && a());
    });
    this.toggle.clipRect.width /= 2;
    this.toggle.clipRect.x = ROTATE_Editor.showGrid
      ? this.toggle.clipRect.width
      : 0;
    this.toggle.set_x(4);
    this.toggle.set_y(5);
    this.addChild(this.toggle);
    this.label.set_x(32);
    this.label.set_y(1);
    this.label.set_alpha(ROTATE_EditorBarUpper.TEXT_GREY);
    this.addChild(this.label);
  };
  bc.__name__ = !0;
  bc.__super__ = ROTATE_CanvasObject;
  bc.prototype = D(ROTATE_CanvasObject.prototype, {
    getBoundsSelf: function () {
      return new Bounds(0, 0, 76, 30);
    },
    __class__: bc,
  });
  var Na = function () {
    var a = this;
    ROTATE_CanvasObject.call(this);
    this.addEventListener('render', function (b) {
      a.render(b.surface);
    });
  };
  Na.__name__ = !0;
  Na.__super__ = ROTATE_CanvasObject;
  Na.prototype = D(ROTATE_CanvasObject.prototype, {
    render: function (a) {
      for (
        var b = -Math.round((30 * Time.get_current()) % q.bgCells.width),
          c = -Math.round((15 * Time.get_current()) % q.bgCells.height),
          d = 0,
          e = Math.ceil(ROTATE_Canvas.height / q.bgCells.height) + 1;
        d < e;

      )
        for (
          var f = d++,
            m = 0,
            k = Math.ceil(ROTATE_Canvas.width / q.bgCells.width) + 1;
          m < k;

        ) {
          var p = m++;
          a.drawImage(
            q.bgCells,
            null,
            b + q.bgCells.width * p,
            c + q.bgCells.height * f,
          );
        }
      a.drawImage(q.vignette, null, 0, 0);
    },
    __class__: Na,
  });
  var ba = function (a, b) {
    null == b && (b = 0);
    ROTATE_CanvasObject.call(this);
    this.main = new I(q.menuBtn);
    this.main.set_x(-this.main.get_width() / 2);
    this.main.set_y(-this.main.get_height() / 2);
    this.main.mouseEnabled = this.main.buttonMode = !0;
    this.addChild(this.main);
    var c = (this.text = new ROTATE_Text(
      ROTATE_Game.fontMain,
      a.toUpperCase(),
      b,
    ));
    c.set_y(c.y - 2);
    this.text.align = ROTATE_Text.ALIGN_CENTER;
    this.text.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.text.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
    this.addChild(this.text);
  };
  ba.__name__ = !0;
  ba.__super__ = ROTATE_CanvasObject;
  ba.prototype = D(ROTATE_CanvasObject.prototype, {
    __class__: ba,
  });
  var Ba = function (a) {
    null == a && (a = 0);
    var b = this;
    ROTATE_CanvasObject.call(this);
    this.sfx = new I(q.mute);
    this.sfx.set_clipRect(
      new Bounds(ROTATE_Game.instance.muteSFX ? 28 : 0, 30 * a, 28, 30),
    );
    this.sfx.mouseEnabled = this.sfx.buttonMode = !0;
    this.sfx.addEventListener('click', function (c) {
      2 > c.which &&
        (ROTATE_Game.ie && !ROTATE_Game.instance.ieUnmuted
          ? b.showWarn(Bind(b, b.toggleSFX))
          : b.toggleSFX());
    });
    this.sfx.set_x(ROTATE_Canvas.width - this.sfx.get_width() - 12);
    this.sfx.set_y(ROTATE_Canvas.height - this.sfx.get_height() - 12);
    this.addChild(this.sfx);
    this.music = new I(q.mute);
    this.music.set_clipRect(
      new Bounds(ROTATE_Game.instance.muteMusic ? 84 : 56, 30 * a, 28, 30),
    );
    this.music.mouseEnabled = this.music.buttonMode = !0;
    this.music.addEventListener('click', function (c) {
      2 > c.which &&
        (ROTATE_Game.ie && !ROTATE_Game.instance.ieUnmuted
          ? b.showWarn(Bind(b, b.toggleMusic))
          : b.toggleMusic());
    });
    this.music.set_x(this.sfx.x - this.music.get_width() - 12);
    this.music.set_y(ROTATE_Canvas.height - this.music.get_height() - 12);
    this.addChild(this.music);
  };
  Ba.__name__ = !0;
  Ba.__super__ = ROTATE_CanvasObject;
  Ba.prototype = D(ROTATE_CanvasObject.prototype, {
    showWarn: function (a) {
      var b = new eb(
        'Audio may slow down the game\nin Internet Explorer. Continue?',
      );
      b.onNo = function () {
        ROTATE_Game.instance.removeChild(b);
      };
      b.onYes = function () {
        ROTATE_Game.instance.removeChild(b);
        ROTATE_Game.instance.ieUnmuted = !0;
        null != a && a();
      };
      ROTATE_Game.instance.addChild(b);
    },
    toggleSFX: function () {
      ROTATE_Game.instance.toggleSFX();
      this.sfx.clipRect.x = ROTATE_Game.instance.muteSFX ? 28 : 0;
    },
    toggleMusic: function () {
      ROTATE_Game.instance.toggleMusic();
      this.music.clipRect.x = ROTATE_Game.instance.muteMusic ? 84 : 56;
    },
    __class__: Ba,
  });
  var cc = function () {
    ROTATE_CanvasObject.call(this);
    this.set_x(12);
    this.set_y(12);
    this.mouseEnabled = this.buttonMode = !0;
    var a = new ROTATE_Text(ROTATE_Game.fontMain, 'Invert [Q] & [E]?');
    a.set_x(30);
    a.set_y(-4);
    a.set_alpha(0.5);
    this.addChild(a);
    var b = new I(q.configToggle);
    b.clipRect.width = 22;
    ROTATE_Game.instance.invert && (b.clipRect.x = 22);
    b.set_alpha(0.75);
    this.addChild(b);
    this.addEventListener('click', function (c) {
      2 > c.which &&
        ((ROTATE_Game.instance.invert = !ROTATE_Game.instance.invert),
        (b.clipRect.x = ROTATE_Game.instance.invert ? 22 : 0),
        ROTATE_Game.instance.saveProgress());
    });
  };
  cc.__name__ = !0;
  cc.__super__ = ROTATE_CanvasObject;
  cc.prototype = D(ROTATE_CanvasObject.prototype, {
    getBoundsSelf: function () {
      return new Bounds(0, 0, 198, 22);
    },
    __class__: cc,
  });
  var ub = function () {
    this.sponsor = new Ma();
    this.mute = new Ba(1);
    this.invert = new cc();
    this.btnQuit = new ba('QUIT', 0);
    this.btnRedo = new ba('RESTART', 0);
    this.btnPlay = new ba('CONTINUE', 0);
    this.text = new ROTATE_Text(ROTATE_Game.fontMain, 'GAME PAUSED');
    ROTATE_CanvasObject.call(this);
    this.graphics.beginFill(1052688, 0.85);
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
        E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
        ROTATE_Game.instance.currentScreen.restart(!1);
    });
    this.addChild(this.btnRedo);
    this.btnQuit.set_x(this.btnRedo.x);
    this.btnQuit.set_y(this.btnRedo.y + 60);
    this.btnQuit.addEventListener('click', function (a) {
      2 > a.which &&
        ((a =
          (E.__instanceof(ROTATE_Game.instance.currentScreen, w) &&
            E.__cast(ROTATE_Game.instance.currentScreen, w).speedrun) ||
          (E.__instanceof(ROTATE_Game.instance.currentScreen, Qa) &&
            E.__cast(ROTATE_Game.instance.currentScreen, Qa).speedrun)),
        ROTATE_Game.instance.changeScreen(
          l.level == ROTATE_Editor.editorLevel
            ? new ROTATE_Editor()
            : a
              ? new Oa()
              : 0 < ROTATE_Levels.unlocked
                ? new pb()
                : new ca(),
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
  };
  ub.__name__ = !0;
  ub.__super__ = ROTATE_CanvasObject;
  ub.prototype = D(ROTATE_CanvasObject.prototype, {
    onPause: function () {
      this.mute.sfx.clipRect.x = ROTATE_Game.instance.muteSFX ? 28 : 0;
      this.mute.music.clipRect.x = ROTATE_Game.instance.muteMusic ? 84 : 56;
      var a = E.__instanceof(ROTATE_Game.instance.currentScreen, w);
      this.btnRedo.set_alpha(a ? 1 : 0.25);
      this.btnRedo.main.mouseEnabled = a;
      a =
        E.__instanceof(ROTATE_Game.instance.currentScreen, bb) ||
        E.__instanceof(ROTATE_Game.instance.currentScreen, ob);
      this.btnQuit.set_alpha(a ? 0.25 : 1);
      this.btnQuit.main.mouseEnabled = !a;
    },
    __class__: ub,
  });
  var Ma = function () {
    I.call(this, q.linkJoshua);
    this.clipRect.height /= 2;
    this.set_x(8);
    this.set_y(ROTATE_Canvas.height - this.get_height() - 8);
    this.mouseEnabled = this.buttonMode = !0;
    this.addEventListener('click', function (a) {
      2 <= a.which ||
        ((a = window.open('https://lightwolfstudios.com', '_blank')),
        v.awardJoshua.unlock(),
        a.focus());
    });
  };
  Ma.__name__ = !0;
  Ma.__super__ = I;
  Ma.prototype = D(I.prototype, {
    __class__: Ma,
  });
  var eb = function (a) {
    this.btnNo = new ba('NO');
    this.btnYes = new ba('YES');
    this.main = new ROTATE_Text(ROTATE_Game.fontMain, '', 2);
    var b = this;
    ROTATE_CanvasObject.call(this);
    this.main.set_text(a);
    this.graphics.beginFill(1052688, 0.95);
    this.graphics.drawRect(0, 0, ROTATE_Canvas.width, ROTATE_Canvas.height);
    this.mouseEnabled = !0;
    this.main.align = ROTATE_Text.ALIGN_CENTER;
    this.main.xAlign = ROTATE_Text.X_ALIGN_CENTER;
    this.main.yAlign = ROTATE_Text.Y_ALIGN_MIDDLE;
    this.main.set_x(Math.round(ROTATE_Canvas.width / 2));
    this.main.set_y(Math.round(ROTATE_Canvas.height / 2) - 40);
    this.addChild(this.main);
    this.btnYes.set_x(Math.round(ROTATE_Canvas.width / 2) - 96);
    this.btnYes.set_y(Math.round(ROTATE_Canvas.height / 2) + 40);
    this.btnYes.addEventListener('click', function (c) {
      if (2 > c.which && null != b.onYes) b.onYes();
    });
    this.addChild(this.btnYes);
    this.btnNo.set_x(Math.round(ROTATE_Canvas.width / 2) + 96);
    this.btnNo.set_y(Math.round(ROTATE_Canvas.height / 2) + 40);
    this.btnNo.addEventListener('click', function (c) {
      if (2 > c.which && null != b.onNo) b.onNo();
    });
    this.addChild(this.btnNo);
  };
  eb.__name__ = !0;
  eb.__super__ = ROTATE_CanvasObject;
  eb.prototype = D(ROTATE_CanvasObject.prototype, {
    __class__: eb,
  });
  var gameInstance;
  String.prototype.__class__ = String;
  String.__name__ = !0;
  Array.__name__ = !0;
  Date.prototype.__class__ = Date;
  Date.__name__ = ['Date'];
  var rc = {
      __name__: ['Int'],
    },
    qc = {
      __name__: ['Dynamic'],
    },
    kc = Number;
  kc.__name__ = ['Float'];
  var mc = Boolean;
  mc.__ename__ = ['Bool'];
  var sc = {
      __name__: ['Class'],
    },
    tc = {},
    na = {},
    tb = window.ArrayBuffer || wa;
  null == tb.prototype.slice && (tb.prototype.slice = wa.sliceImpl);
  var ec = window.Uint8Array || Ia._new;
  ROTATE_Canvas.started = !1;
  ROTATE_Canvas.imageSmoothingEnabled = !0;
  ROTATE_Canvas.lastCursor = 'default';
  ROTATE_Canvas.scale = 1;
  ROTATE_Canvas.offsetX = 0;
  ROTATE_Canvas.offsetY = 0;
  ROTATE_Canvas.wasLoaded = !1;
  ROTATE_Canvas.lastProgress = 0;
  ROTATE_Manager.inited = !1;
  ROTATE_Manager.finished = !1;
  ROTATE_Manager.tasks = [];
  ROTATE_Manager.events = new Sa();
  Time.startTime = 0;
  Time.lastTime = 0;
  Time.elapsedTime = 0;
  Graphics.PI2 = 2 * Math.PI;
  ROTATE_Event.ADDED = 'added';
  ROTATE_Event.REMOVED = 'removed';
  ROTATE_Event.ENTER_FRAME = 'enterFrame';
  ROTATE_Event.EXIT_FRAME = 'exitFrame';
  Ta.FOCUS = 'focus';
  Ta.BLUR = 'blur';
  Ua.KEY_DOWN = 'keyDown';
  Ua.KEY_UP = 'keyUp';
  ROTATE_ManagerEvent.FINISHED = 'finished';
  ROTATE_ManagerEvent.PROGRESS = 'progress';
  Ha.CLICK = 'click';
  Ha.MOUSE_DOWN = 'mouseDown';
  Ha.MOUSE_UP = 'mouseUp';
  Ha.MOVE = 'move';
  fb.RENDER = 'render';
  InputKeys.inited = !1;
  InputKeys.keys = [];
  InputKeys.keysOld = [];
  Ga.FUNC = 1;
  Surface.PI2 = 2 * Math.PI;
  za.CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  za.BYTES = ya.ofString(za.CHARS);
  E.__toStr = {}.toString;
  Ia.BYTES_PER_ELEMENT = 1;
  n.E = 1e-8;
  n.screenFadeTime = 700;
  n.screenFadeTimeSlow = 1600;
  n.tileSize = 24;
  n.tickMS = 16.666666666666668;
  n.ticksMax = 12;
  n.cameraSpeed = 0.075;
  n.rotateTime = 0.5;
  n.rotateOffset = 1.5 * n.tileSize;
  n.doorSlideTime = 0.2;
  q.start = ROTATE_Manager.loadImage('img/start.png');
  q.splashLWS = ROTATE_Manager.loadImage('img/splash-lws.png');
  q.linkLWS = ROTATE_Manager.loadImage('img/link-lws.png');
  q.linkJoshua = ROTATE_Manager.loadImage('img/link-joshua.png');
  q.linkJoshua2 = ROTATE_Manager.loadImage('img/link-joshua-2.png');
  q.soundtrack = ROTATE_Manager.loadImage('img/soundtrack.png');
  q.awardFrame = ROTATE_Manager.loadImage('img/award-frame.png');
  q.awardIconLocked = ROTATE_Manager.loadImage('img/award-icon-locked.png');
  q.awardIconEscape = ROTATE_Manager.loadImage('img/award-icon-escape.png');
  q.awardIconSpeedrun = ROTATE_Manager.loadImage('img/award-icon-speedrun.png');
  q.awardIconEditor = ROTATE_Manager.loadImage('img/award-icon-editor.png');
  q.awardIconJoshua = ROTATE_Manager.loadImage('img/award-icon-joshua.png');
  q.awardIconSoundtrack = ROTATE_Manager.loadImage(
    'img/award-icon-soundtrack.png',
  );
  q.awardIconRotate = ROTATE_Manager.loadImage('img/award-icon-rotate.png');
  q.vignette = ROTATE_Manager.loadImage('img/vignette.png');
  q.bgCells = ROTATE_Manager.loadImage('img/bg-cells.png');
  q.logo = ROTATE_Manager.loadImage('img/logo.png');
  q.configTip = ROTATE_Manager.loadImage('img/config-tip.png');
  q.configArrow = ROTATE_Manager.loadImage('img/config-arrow.png');
  q.configToggle = ROTATE_Manager.loadImage('img/config-toggle.png');
  q.menuBtn = ROTATE_Manager.loadImage('img/menu-btn.png');
  q.level = ROTATE_Manager.loadImage('img/level.png');
  q.interact = ROTATE_Manager.loadImage('img/interact.png');
  q.mute = ROTATE_Manager.loadImage('img/mute.png');
  q.trash = ROTATE_Manager.loadImage('img/trash.png');
  q.player = ROTATE_Manager.loadImage('img/player.png');
  q.bgTiles = ROTATE_Manager.loadImage('img/bg-tiles.png');
  q.bgBricks = ROTATE_Manager.loadImage('img/bg-bricks.png');
  q.blocks = ROTATE_Manager.loadImage('img/blocks.png');
  q.cat = ROTATE_Manager.loadImage('img/cat.png');
  q.endingMain = ROTATE_Manager.loadImage('img/ending-main.png');
  q.endingPlants = ROTATE_Manager.loadImage('img/ending-plants.png');
  q.controls1 = ROTATE_Manager.loadImage('img/controls-1.png');
  q.controls2 = ROTATE_Manager.loadImage('img/controls-2.png');
  q.controls3 = ROTATE_Manager.loadImage('img/controls-3.png');
  q.controls4 = ROTATE_Manager.loadImage('img/controls-4.png');
  q.controls5 = ROTATE_Manager.loadImage('img/controls-5.png');

  ROTATE_Game.fontMain = new gc(
    'fonts/simple-pixels.png',
    'fonts/simple-pixels.json',
    2,
    112,
  );
  ROTATE_Game.nosave = !1;
  ROTATE_Game.ie = !1;

  ROTATE_Audio.themeMenu = ROTATE_Manager.loadSound({
    src: ['music/menu.ogg', 'music/menu.mp3'],
    loop: !0,
  });
  ROTATE_Audio.themeGame1 = ROTATE_Manager.loadSound({
    src: ['music/game-1.ogg', 'music/game-1.mp3'],
    loop: !0,
    volume: 0.8,
  });
  ROTATE_Audio.themeGame2 = ROTATE_Manager.loadSound({
    src: ['music/game-2.ogg', 'music/game-2.mp3'],
    loop: !0,
    volume: 0.75,
  });
  ROTATE_Audio.surface = ROTATE_Manager.loadSound({
    src: ['sfx/surface.ogg', 'sfx/surface.mp3'],
    loop: !0,
  });
  ROTATE_Audio.steps = ROTATE_Manager.loadSound({
    src: ['sfx/steps.ogg', 'sfx/steps.mp3'],
    sprite: {
      a: [0, 400],
      b: [475, 400],
    },
  });
  ROTATE_Audio.death = ROTATE_Manager.loadSound({
    src: ['sfx/death.ogg', 'sfx/death.mp3'],
  });
  ROTATE_Audio.rotate = ROTATE_Manager.loadSound({
    src: ['sfx/rotate.ogg', 'sfx/rotate.mp3'],
  });
  ROTATE_Audio.exit = ROTATE_Manager.loadSound({
    src: ['sfx/exit.ogg', 'sfx/exit.mp3'],
  });
  ROTATE_Audio.door = ROTATE_Manager.loadSound({
    src: ['sfx/door.ogg', 'sfx/door.mp3'],
  });
  ROTATE_Audio.cat = ROTATE_Manager.loadSound({
    src: ['sfx/cat.ogg', 'sfx/cat.mp3'],
  });
  ROTATE_Audio.leverOn = ROTATE_Manager.loadSound({
    src: ['sfx/lever-on.ogg', 'sfx/lever-on.mp3'],
  });
  ROTATE_Audio.leverOff = ROTATE_Manager.loadSound({
    src: ['sfx/lever-off.ogg', 'sfx/lever-off.mp3'],
  });
  ROTATE_Audio.voice = ROTATE_Manager.loadSound({
    src: ['sfx/voice.ogg', 'sfx/voice.mp3'],
    sprite: {
      a: [0, 1e3],
      b: [1111, 1e3],
      c: [2222, 1e3],
      d: [3333, 1e3],
      e: [4444, 1e3],
      f: [5555, 1e3],
      g: [6666, 1e3],
      h: [7777, 1e3],
    },
    volume: 0.9,
  });
  ROTATE_Audio.SFX = [
    ROTATE_Audio.steps,
    ROTATE_Audio.death,
    ROTATE_Audio.rotate,
    ROTATE_Audio.exit,
    ROTATE_Audio.door,
    ROTATE_Audio.cat,
    ROTATE_Audio.leverOn,
    ROTATE_Audio.leverOff,
    ROTATE_Audio.voice,
  ];

  v.awardEscape = new Ka('The Beginning', q.awardIconEscape);
  v.awardSpeedrun = new Ka('Seven or\nLess', q.awardIconSpeedrun);
  v.awardEditor = new Ka('Architect', q.awardIconEditor);
  v.awardJoshua = new Ka('Curiosity', q.awardIconJoshua);
  v.awardSoundtrack = new Ka('Sound Seeker', q.awardIconSoundtrack);
  v.awardRotate = new Ka('Rotate Me', q.awardIconRotate);
  v.all = [
    v.awardEscape,
    v.awardSpeedrun,
    v.awardEditor,
    v.awardJoshua,
    v.awardSoundtrack,
    v.awardRotate,
  ];
  v.FADE_MS = 250;
  v.STAY_MS = 3e3;
  v.bubbleTimer = -1;
  S.SPEED = 2;
  S.ACCEL = 0.06;
  S.DECCEL_MULT = 0.6;
  S.ANIM_IDLE = new sa(
    [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5],
    [1500, 100, 100, 100, 100, 100, 3e3, 100, 100, 200, 100, 100],
  );
  S.ANIM_EXIT = new sa(
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [100, 100, 100, 100, 100, 100, 100, 100, 100],
    !1,
  );
  S.ANIM_END_1 = new sa([9, 10], [100, 100], !1);
  S.ANIM_END_2 = new sa(
    [11, 12, 22, 14, 24, 25, 26],
    [100, 100, 100, 100, 100, 100, 100],
  );
  J.HIT_W = 12;
  J.HIT_H = 42;
  J.SPEED = 3.7;
  J.RAMP_MULT = 0.7;
  J.ACCEL = 0.33;
  J.DECCEL_MULT = 0.6;
  J.JUMP_SPEED = 5.9;
  J.JUMP_DELAY = 0.25;
  J.JUMP_DELAY_2 = 0.06666666666666667;
  J.GRAVITY = 0.35;
  J.GRAVITY_MAX = 9;
  J.ROTATE_DELAY = 0.05;
  J.ANIM_IDLE = new sa([0, 1, 2, 3], [400, 400, 400, 400]);
  J.ANIM_RUN = new sa([4, 5, 6, 7], [100, 100, 100, 100]);
  J.ANIM_JUMP = new sa([8, 9], [200, 200], !1);
  J.ANIM_FALL = new sa([12, 13, 14, 15], [100, 100, 100, 100]);
  J.ANIM_ROTATE = new sa([16, 17, 18, 19], [100, 100, 100, 100], !1);
  l.rotating = !1;
  l.rotation = 0;
  Za.TOGGLE_TIMER = 0.67;
  F.registry = [];
  F.start = F.register(-1, new Gb());
  F.finish = F.register(-2, new Ab());
  F.air = F.register(0, new xb());
  F.solid = F.register(1, new va());
  F.stairs = F.register(2, new Fb());
  F.ramp = F.register(3, new $a());
  F.platform = F.register(4, new Cb());
  F.spikes = F.register(5, new Eb());
  F.saw = F.register(6, new Db());
  F.lever = F.register(8, new Za());
  F.door = F.register(9, new yb());
  F.number = F.register(7, new Bb());
  F.vent = F.register(10, new Hb());
  F.fan = F.register(11, new zb());
  ab.GRAVITY_MULT = 0.2;
  ROTATE_EditorLevel.WORLD_SIZE = 42;

  ROTATE_Level1.fadeSpeed = 0.1;
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

  U.TIME_TYPE = 30;
  U.TIME_STAY = 5250;
  U.TIME_FADE = 750;

  ROTATE_Editor.MOVE_SPEED = 4;
  ROTATE_Editor.showGrid = !0;
  ROTATE_Editor.editorLevel = new ROTATE_EditorLevel();

  w.continueTheme = !1;
  w.RESTART_DELAY = 1;
  w.DEATH_TIME = 1.5;
  w.DEATH_SHAKE_TIME = 0.85;
  w.DEATH_SHAKE_AMOUNT = 24;
  w.stopped = !1;
  w.canceled = !1;

  ROTATE_Text.ALIGN_LEFT = 0;
  ROTATE_Text.ALIGN_CENTER = 1;
  ROTATE_Text.ALIGN_RIGHT = 2;
  ROTATE_Text.X_ALIGN_LEFT = 0;
  ROTATE_Text.X_ALIGN_CENTER = 1;
  ROTATE_Text.X_ALIGN_RIGHT = 2;
  ROTATE_Text.Y_ALIGN_TOP = 0;
  ROTATE_Text.Y_ALIGN_MIDDLE = 1;
  ROTATE_Text.Y_ALIGN_BOTTOM = 2;

  O.size2 = n.tileSize / 2;
  O.size4 = n.tileSize + 4;
  O.list = [
    F.air,
    F.solid,
    F.start,
    F.finish,
    F.stairs,
    F.ramp,
    F.platform,
    F.spikes,
    F.saw,
    F.lever,
    F.door,
    F.number,
    F.vent,
    F.fan,
  ];
  O.selected = 1;

  ROTATE_EditorBarLower.HEIGHT = 48;

  ROTATE_EditorBarUpper.HEIGHT = 48;
  ROTATE_EditorBarUpper.EDGE_PAD = 14;
  ROTATE_EditorBarUpper.EDGE_PAD_Y = 9;
  ROTATE_EditorBarUpper.BTN_SPACE = 12;
  ROTATE_EditorBarUpper.BTN_PAD = 8;
  ROTATE_EditorBarUpper.TEXT_GREY = 0.75;
  ROTATE_EditorBarUpper.THEMES = ['Theme A', 'Theme B'];

  ROTATE_Game.main();
})(window);
