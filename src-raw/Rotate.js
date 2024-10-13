(function() {
    function __INHERIT__(a, b) {
        function c() {}
        c.prototype = a;
        var d = new c, e;
        for (e in b)
            d[e] = b[e];
        b.toString !== Object.prototype.toString && (d.toString = b.toString);
        return d
    }
    function T(a, b) {
        if (null == b)
            return null;
        null == b.__id__ && (b.__id__ = pc++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
        null == c && (c = function() {
            return c.method.apply(c.scope, arguments)
        }
        ,
        c.scope = a,
        c.method = b,
        a.hx__closures__[b.__id__] = c);
        return c
    }
    var dc = function() {
        return ES3ClassUtils.__string_rec(this, "")
    }
      , ja = function() {};
    ja.__name__ = !0;
    ja.cca = function(a, b) {
        var c = a.charCodeAt(b);
        if (c == c)
            return c
    }
    ;
    ja.substr = function(a, b, c) {
        if (null == c)
            c = a.length;
        else if (0 > c)
            if (0 == b)
                c = a.length + c;
            else
                return "";
        return a.substr(b, c)
    }
    ;
    ja.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur < this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    }
    ;
    Math.__name__ = !0;
    var la = function() {};
    la.__name__ = !0;
    la.string = function(a) {
        return ES3ClassUtils.__string_rec(a, "")
    }
    ;
    la.parseInt = function(a) {
        var b = parseInt(a, 10);
        0 != b || 120 != ja.cca(a, 1) && 88 != ja.cca(a, 1) || (b = parseInt(a));
        return isNaN(b) ? null : b
    }
    ;
    var ma = function() {};
    ma.__name__ = !0;
    ma.isSpace = function(a, b) {
        var c = ja.cca(a, b);
        return 8 < c && 14 > c ? !0 : 32 == c
    }
    ;
    ma.ltrim = function(a) {
        for (var b = a.length, c = 0; c < b && ma.isSpace(a, c); )
            ++c;
        return 0 < c ? ja.substr(a, c, b - c) : a
    }
    ;
    ma.rtrim = function(a) {
        for (var b = a.length, c = 0; c < b && ma.isSpace(a, b - c - 1); )
            ++c;
        return 0 < c ? ja.substr(a, 0, b - c) : a
    }
    ;
    ma.trim = function(a) {
        return ma.ltrim(ma.rtrim(a))
    }
    ;
    ma.replace = function(a, b, c) {
        return a.split(b).join(c)
    }
    ;
    var h = function() {};
    h.__name__ = !0;
    h.set_background = function(a) {
        h.background = a & -1;
        return h.background
    }
    ;
    h.set_imageSmoothingEnabled = function(a) {
        h.imageSmoothingEnabled = a;
        if (null != h.ctx) {
            var b = h.ctx;
            b.webkitImageSmoothingEnabled = a;
            b.mozImageSmoothingEnabled = a;
            b.msImageSmoothingEnabled = a;
            b.oImageSmoothingEnabled = a;
            b.imageSmoothingEnabled = a
        }
        return a
    }
    ;
    h.start = function(a, b, c, d, e, f) {
        h.started || 1 > b || 1 > c || null == f || (h.transparent = e,
        h.width = b,
        h.height = c,
        h.set_background(d),
        h.stage = f,
        window.setTimeout(function() {
            window.focus()
        }, 0),
        h.setup(a),
        f.triggerEvent(new RotateEvent("added")),
        LoadingManager._init(),
        h.loop(),
        h.started = !0)
    }
    ;
    h.setup = function(a) {
        null == a && (a = window.document.body);
        h.parent = a;
        var b = window.document.body;
        b.style.margin = "0";
        b.style.overflow = "hidden";
        h.c = window.document.createElement("canvas");
        h.c.width = h.width;
        h.c.height = h.height;
        h.c.style.position = "absolute";
        h.c.style.left = h.c.style.top = "0";
        h.c.style.transform = "translateZ(0px)";
        h.c.style.cursor = "default";
        a.appendChild(h.c);
        h.ctx = h.c.getContext("2d", {
            alpha: h.transparent
        });
        h.set_imageSmoothingEnabled(h.imageSmoothingEnabled);
        h.surface = new Ea(h.ctx);
        N._reset();
        h.input = new qb(h.c);
        G._init();
        h.input.addEventListener("click", h.onClick);
        h.input.addEventListener("mouseDown", h.onMouseDown);
        h.input.addEventListener("mouseUp", h.onMouseUp);
        h.input.addEventListener("move", h.onMouseMove)
    }
    ;
    h.loop = function() {
        N._update();
        if (LoadingManager.get_done())
            h.wasLoaded || (LoadingManager.triggerEvent(new RotateProgressEvent("progress",1)),
            h.lastProgress = 1,
            LoadingManager.triggerEvent(new RotateProgressEvent("finished",1)));
        else {
            var a = LoadingManager.get_progress();
            a != h.lastProgress && (LoadingManager.triggerEvent(new RotateProgressEvent("progress",a)),
            h.lastProgress = a)
        }
        h.wasLoaded = LoadingManager.get_done();
        var b = h.scale;
        h.scale = window.innerWidth / window.innerHeight < h.width / h.height ? window.innerWidth / h.width : window.innerHeight / h.height;
        var c = Math.round(h.width * h.scale);
        a = Math.round(h.height * h.scale);
        h.scale != b && (h.c.style.width = c + "px",
        h.c.style.height = a + "px");
        b = Math.floor((window.innerWidth - c) / 2);
        b != h.offsetX && (h.c.style.left = Math.floor((window.innerWidth - c) / 2) + "px",
        h.offsetX = b);
        c = Math.floor((window.innerHeight - a) / 2);
        c != h.offsetY && (h.c.style.top = Math.floor((window.innerHeight - a) / 2) + "px",
        h.offsetY = c);
        h.updateMouseSprite();
        a = null != h.mouseSprite && h.mouseSprite.buttonMode ? "pointer" : "default";
        a != h.lastCursor && (h.c.style.cursor = a,
        h.lastCursor = a);
        var d = new RotateEvent("enterFrame");
        h.stage.cascadingCallback(function(e) {
            e.triggerEvent(d)
        });
        d = new RotateEvent("exitFrame");
        h.stage.cascadingCallback(function(e) {
            e.triggerEvent(d)
        });
        h.render();
        h.requestAnimationFrame(h.loop)
    }
    ;
    h.requestAnimationFrame = function(a) {
        var b = window;
        (b = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame) ? b(a) : window.setTimeout(a, 16)
    }
    ;
    h.render = function() {
        h.surface.reset();
        if (h.transparent) {
            var a = h.background >>> 24;
            255 > a && h.surface.clearRect(0, 0, h.width, h.height);
            h.surface.beginFill(h.background & 16777215, ES3ClassUtils.__cast(a, kc) / 255)
        } else
            h.surface.beginFill(h.background & 16777215, 1);
        h.surface.drawRect(0, 0, h.width, h.height);
        h.surface._ctx.globalAlpha = 1;
        h.renderSprite(h.stage, h.surface)
    }
    ;
    h.renderSprite = function(a, b) {
        if (a.visible && 0 != a.alpha) {
            b.save();
            b.translate(a.x, a.y);
            b.rotate(a.rotation * Math.PI / 180);
            b.scale(a.scaleX, a.scaleY);
            var c = b._ctx.globalAlpha;
            b._ctx.globalAlpha *= a.alpha;
            b.reset(!0);
            a.graphics._paint(b);
            a.triggerEvent(new RotateRenderEvent("render",b));
            for (var d = 0, e = a._children; d < e.length; ) {
                var f = e[d];
                ++d;
                h.renderSprite(f, b)
            }
            b.scale(1 / a.scaleX, 1 / a.scaleY);
            b._ctx.globalAlpha = c;
            b.restore()
        }
    }
    ;
    h.updateMouseSprite = function() {
        var a = h.updateMouseSpriteStep(h.stage, null);
        null == a && (a = h.stage);
        h.mouseSprite = a
    }
    ;
    h.updateMouseSpriteStep = function(a, b) {
        if (a.visible) {
            if (a.mouseEnabled) {
                var c = a.getBounds();
                c.width -= 1E-4;
                c.height -= 1E-4;
                xa.pointInTransformedBounds(new Vector2(h.input.mouseX,h.input.mouseY), a._transform, c) && (b = a)
            }
            c = 0;
            for (var d = a._children; c < d.length; ) {
                var e = d[c];
                ++c;
                b = h.updateMouseSpriteStep(e, b)
            }
        }
        return b
    }
    ;
    h.pageToGame = function(a, b) {
        return new Vector2((a - h.offsetX) / h.scale,(b - h.offsetY) / h.scale)
    }
    ;
    h.onClick = function(a) {
        h.updateMouseSprite();
        null != h.clickSprite && h.mouseSprite == h.clickSprite && h.triggerMouseEvent(h.clickSprite, a)
    }
    ;
    h.onMouseDown = function(a) {
        window.getSelection().removeAllRanges();
        var b = window.document.activeElement
          , c = b.tagName.toLowerCase();
        1 != a.which || "input" != c && "textarea" != c || b.setSelectionRange(0, 0);
        h.updateMouseSprite();
        h.clickSprite = h.mouseSprite;
        null != h.mouseSprite && h.triggerMouseEvent(h.mouseSprite, a)
    }
    ;
    h.onMouseUp = function(a) {
        h.updateMouseSprite();
        null != h.mouseSprite && h.triggerMouseEvent(h.mouseSprite, a)
    }
    ;
    h.onMouseMove = function(a) {
        h.updateMouseSprite();
        null != h.mouseSprite && h.triggerMouseEvent(h.mouseSprite, a)
    }
    ;
    h.triggerMouseEvent = function(a, b) {
        for (var c = b.target = a; null != c; )
            c.triggerEvent(b),
            c = c.parent
    }
    ;
    var EventDispatcher = function() {
        this.listeners = new Ra
    };
    EventDispatcher.__name__ = !0;
    EventDispatcher.prototype = {
        addEventListener: function(a, b) {
            var c = this.listeners;
            if (null != na[a] ? !c.existsReserved(a) : !c.h.hasOwnProperty(a)) {
                c = this.listeners;
                var d = [];
                null != na[a] ? c.setReserved(a, d) : c.h[a] = d
            }
            c = this.listeners;
            (null != na[a] ? c.getReserved(a) : c.h[a]).push(b)
        },
        removeEventListener: function(a, b) {
            var c = this.listeners;
            if (null != na[a] ? c.existsReserved(a) : c.h.hasOwnProperty(a)) {
                c = this.listeners;
                c = null != na[a] ? c.getReserved(a) : c.h[a];
                var d = c.indexOf(b);
                0 > d || c.splice(d, 1)
            }
        },
        triggerEvent: function(a) {
            var b = this.listeners
              , c = a.type;
            if (null != na[c] ? b.existsReserved(c) : b.h.hasOwnProperty(c)) {
                b = 0;
                c = this.listeners;
                var d = a.type;
                for (c = null != na[d] ? c.getReserved(d) : c.h[d]; b < c.length; )
                    d = c[b],
                    ++b,
                    d(a)
            }
        },
        __class__: EventDispatcher
    };
    var LoadingManager = function() {};
    LoadingManager.__name__ = !0;
    LoadingManager.triggerEvent = function(a) {
        LoadingManager.events.triggerEvent(a)
    }
    ;
    LoadingManager.addEventListener = function(a, b) {
        LoadingManager.events.addEventListener(a, b)
    }
    ;
    LoadingManager.removeEventListener = function(a, b) {
        LoadingManager.events.removeEventListener(a, b)
    }
    ;
    LoadingManager._init = function() {
        LoadingManager.inited || (LoadingManager.inited = !0)
    }
    ;
    LoadingManager.createTask = function() {
        LoadingManager.tasks.push(!1);
        return LoadingManager.tasks.length - 1
    }
    ;
    LoadingManager.closeTask = function(a) {
        0 <= a && a < LoadingManager.tasks.length && (LoadingManager.tasks[a] = !0)
    }
    ;
    LoadingManager.get_done = function() {
        if (!LoadingManager.inited)
            return !1;
        if (LoadingManager.finished)
            return !0;
        for (var a = 0, b = LoadingManager.tasks.length; a < b; ) {
            var c = a++;
            if (!LoadingManager.tasks[c])
                return !1
        }
        return LoadingManager.finished = !0
    }
    ;
    LoadingManager.get_progress = function() {
        if (!LoadingManager.inited)
            return 0;
        if (LoadingManager.finished)
            return 1;
        for (var a = 0, b = 0, c = LoadingManager.tasks.length; b < c; ) {
            var d = b++;
            LoadingManager.tasks[d] && ++a
        }
        return a / LoadingManager.tasks.length
    }
    ;
    LoadingManager.loadImage = function(a, b) {
        var c = new Image;
        c.src = a;
        if (!LoadingManager.finished) {
            var d = LoadingManager.createTask();
            c.onload = function() {
                LoadingManager.closeTask(d);
                null != b && b(c)
            }
        }
        return c
    }
    ;
    LoadingManager.loadWebFonts = function(a, b) {
        var c = LoadingManager.createTask();
        a.active = function() {
            LoadingManager.closeTask(c);
            null != b && b()
        }
        ;
        WebFont.load(a)
    }
    ;
    LoadingManager.loadTextFile = function(a, b) {
        var c = LoadingManager.createTask()
          , d = new XMLHttpRequest;
        d.open("GET", a);
        d.onload = function() {
            LoadingManager.closeTask(c);
            null != b && b(d.responseText)
        }
        ;
        d.send()
    }
    ;
    LoadingManager.loadSound = function(a) {
        var b = LoadingManager.createTask();
        a.onload = function() {
            LoadingManager.closeTask(b)
        }
        ;
        return new Howl(a)
    }
    ;
    var N = function() {};
    N.__name__ = !0;
    N._reset = function() {
        N.startTime = N.absoluteTime();
        N.lastTime = 0
    }
    ;
    N._update = function() {
        var a = N.get_currentMS();
        N.elapsedTime = a - N.lastTime;
        N.lastTime = a
    }
    ;
    N.absoluteTime = function() {
        return (new Date).getTime()
    }
    ;
    N.get_current = function() {
        return .001 * N.get_currentMS()
    }
    ;
    N.get_currentMS = function() {
        return N.absoluteTime() - N.startTime
    }
    ;
    N.get_elapsed = function() {
        return .001 * N.elapsedTime
    }
    ;
    N.get_elapsedMS = function() {
        return N.elapsedTime
    }
    ;
    var xa = function() {};
    xa.__name__ = !0;
    xa.getColorString = function(a, b) {
        null == b && (b = 1);
        return "rgba(" + ((a & 16711680) >>> 16) + ", " + ((a & 65280) >>> 8) + ", " + (a & 255) + ", " + b + ")"
    }
    ;
    xa.pointInQuad = function(a, b, c, d, e) {
        e = c.subtract(b);
        b = a.subtract(b);
        d = d.subtract(c);
        c = a.subtract(c);
        a = Vector2.dot(e, b);
        e = Vector2.dot(e, e);
        c = Vector2.dot(d, c);
        d = Vector2.dot(d, d);
        return 0 <= a && a <= e && 0 <= c ? c <= d : !1
    }
    ;
    xa.pointInTransformedBounds = function(a, b, c) {
        return null == a || null == b || null == c || 0 == c.width || 0 == c.height ? !1 : xa.pointInQuad(a, b.apply(c.get_left(), c.get_top()), b.apply(c.get_right(), c.get_top()), b.apply(c.get_right(), c.get_bottom()), b.apply(c.get_left(), c.get_bottom()))
    }
    ;
    xa.drawImageSafe = function(a, b, c, d, e, f, m, k) {
        0 >= e || 0 >= f || 0 >= c + e || c >= b.width || 0 >= d + f || d >= b.height || (c += 0 > c ? -c : 0,
        d += 0 > d ? -d : 0,
        c + e > b.width && (e = b.width - c),
        d + f > b.height && (f = b.height - d),
        a.drawImage(b, c, d, e, f, m, k, e, f))
    }
    ;
    var Graphics = function() {
        this.clear()
    };
    Graphics.__name__ = !0;
    Graphics.prototype = {
        get_length: function() {
            return this.items.length
        },
        get_skipDraw: function() {
            return this.filling ? !1 : !this.stroking
        },
        clear: function() {
            this.items = [];
            this.filling = this.stroking = !1;
            this.bounds = new Rectangle(0,0,0,0)
        },
        _paint: function(a) {
            for (var b = 0, c = this.items; b < c.length; ) {
                var d = c[b];
                ++b;
                d.execute(a)
            }
            a.endFill();
            a.endStroke()
        },
        call: function(a, b) {
            this.items.push(Ga.callFunc(a, b))
        },
        beginFill: function(a, b) {
            null == b && (b = 1);
            null == a && (a = 0);
            this.call("beginFill", [a, b]);
            this.filling = !0
        },
        endFill: function() {
            this.call("endFill");
            this.filling = !1
        },
        beginStroke: function(a, b, c) {
            null == c && (c = 1);
            null == b && (b = 0);
            null == a && (a = 1);
            this.call("beginStroke", [a, b, c]);
            this.stroking = !0
        },
        endStroke: function() {
            this.call("endStroke");
            this.stroking = !1
        },
        drawRect: function(a, b, c, d) {
            this.get_skipDraw() || (this.bounds.combine(new Rectangle(a,b,c,d)),
            this.call("drawRect", [a, b, c, d]))
        },
        drawPath: function(a, b) {
            null == b && (b = !0);
            this.get_skipDraw() || (this.bounds.combine(Rectangle.containingPoints(a)),
            this.call("drawPath", [a, b]))
        },
        drawCircle: function(a, b, c) {
            this.get_skipDraw() || (this.bounds.combine(new Rectangle(a - c,b - c,2 * c,2 * c)),
            this.call("drawCircle", [a, b, c]))
        },
        drawArc: function(a, b, c, d, e, f, m) {
            null == m && (m = !1);
            null == f && (f = !1);
            this.get_skipDraw() || (this.bounds.combine(new Rectangle(a - c,b - c,2 * c,2 * c)),
            this.call("drawArc", [a, b, c, d, e, f, m]))
        },
        drawEllipse: function(a, b, c, d) {
            this.get_skipDraw() || (this.bounds.combine(new Rectangle(a,b,c,d)),
            this.call("drawEllipse", [a, b, c, d]))
        },
        drawImage: function(a, b, c) {
            this.call("drawImage", [a, b, c])
        },
        drawText: function(a, b, c, d, e, f, m, k) {
            null == k && (k = 1.25);
            null == m && (m = "left");
            null == f && (f = "normal");
            this.get_skipDraw() || this.call("drawText", [a, b, c, d, e, f, m, k])
        },
        __class__: Graphics
    };
    var GraphicsObject = function() {
        this.graphics = new Graphics;
        this._children = [];
        this._transformReverse = new Transform;
        this._transform = new Transform;
        this.mouseEnabled = this.buttonMode = !1;
        this.alpha = 1;
        this.visible = !0;
        this.rotation = 0;
        this.scaleX = this.scaleY = 1;
        this.x = this.y = 0;
        this.listeners = new Ra
    };
    GraphicsObject.__name__ = !0;
    GraphicsObject.__super__ = EventDispatcher;
    GraphicsObject.prototype = __INHERIT__(EventDispatcher.prototype, {
        set_x: function(a) {
            this.x != a && (this.x = a,
            this._updateTransform());
            return this.x
        },
        set_y: function(a) {
            this.y != a && (this.y = a,
            this._updateTransform());
            return this.y
        },
        set_scaleX: function(a) {
            this.scaleX != a && (this.scaleX = a,
            this._updateTransform());
            return this.scaleX
        },
        set_scaleY: function(a) {
            this.scaleY != a && (this.scaleY = a,
            this._updateTransform());
            return this.scaleY
        },
        set_rotation: function(a) {
            this.rotation != a && (this.rotation = a,
            this._updateTransform());
            return this.rotation
        },
        set_alpha: function(a) {
            return this.alpha = 0 > a ? 0 : 1 < a ? 1 : a
        },
        get_stage: function() {
            return h.stage
        },
        get_width: function() {
            return this.getBounds().width * this.scaleX
        },
        set_width: function(a) {
            this.set_scaleX(a / this.getBounds().width);
            return a
        },
        get_height: function() {
            return this.getBounds().height * this.scaleY
        },
        set_height: function(a) {
            this.set_scaleY(a / this.getBounds().height);
            return a
        },
        addChild: function(a) {
            null != a && a != this.get_stage() && a != this && (null != a.parent && a.parent.removeChild(a),
            this._children.push(a),
            a.parent = this,
            a._updateTransform(),
            a.triggerEvent(new RotateEvent("added")))
        },
        addChildAt: function(a, b) {
            null != a && a != this.get_stage() && a != this && (null != a.parent && a.parent.removeChild(a),
            this._children.splice(b, 0, a),
            a.parent = this,
            a._updateTransform(),
            a.triggerEvent(new RotateEvent("added")))
        },
        removeChild: function(a) {
            null != a && a.parent == this && (a.parent = null,
            this._children.splice(this._children.indexOf(a), 1),
            a._updateTransform(),
            a.triggerEvent(new RotateEvent("removed")))
        },
        removeChildAt: function(a) {
            if (0 <= a && a < this._children.length) {
                var b = this._children[a];
                b.parent = null;
                b._updateTransform();
                this._children.splice(a, 1);
                b.triggerEvent(new RotateEvent("removed"))
            }
        },
        removeChildren: function() {
            for (var a = this._children.length; 0 <= a--; )
                this.removeChild(this._children[a])
        },
        getChildIndex: function(a) {
            return this._children.indexOf(a)
        },
        setChildIndex: function(a, b) {
            var c = this.getChildIndex(a);
            0 <= c && (this._children.splice(c, 1),
            this._children.splice(b, 0, a))
        },
        swapDepths: function(a, b) {
            var c = this.getChildIndex(a)
              , d = this.getChildIndex(b);
            0 <= c && 0 <= d && (this._children[c] = b,
            this._children[d] = a)
        },
        globalToLocal: function(a, b) {
            return this._transformReverse.apply(a, b)
        },
        localToGlobal: function(a, b) {
            return this._transform.apply(a, b)
        },
        _updateTransform: function() {
            null != this.parent ? this._transform.copy(this.parent._transform) : this._transform.identity();
            this._transform.translate(this.x, this.y);
            this._transform.rotate(this.rotation * Math.PI / 180);
            this._transform.scale(this.scaleX, this.scaleY);
            this._transformReverse.identity();
            for (var a = this; null != a; )
                this._transformReverse.scale(1 / a.scaleX, 1 / a.scaleY),
                this._transformReverse.rotate(-a.rotation * Math.PI / 180),
                this._transformReverse.translate(-a.x, -a.y),
                a = a.parent;
            a = 0;
            for (var b = this._children; a < b.length; ) {
                var c = b[a];
                ++a;
                c._updateTransform()
            }
        },
        getBoundsSelf: function() {
            return new Rectangle(0,0,0,0)
        },
        getBounds: function() {
            var a = [this.getBoundsSelf(), this.graphics.bounds];
            return Rectangle.combineMultiple(a)
        },
        hitTestPoint: function(a) {
            return this.getBounds().contains(a)
        },
        cascadingCallback: function(a) {
            if (null != a) {
                a(this);
                for (var b = 0, c = this._children; b < c.length; ) {
                    var d = c[b];
                    ++b;
                    d.cascadingCallback(a)
                }
            }
        },
        __class__: GraphicsObject
    });
    var ImageSurface = function(a) {
        this.imageWidth = this.imageHeight = 0;
        var b = this;
        GraphicsObject.call(this);
        null != a && this.create(a);
        this.addEventListener("render", function(c) {
            b.render(c.surface)
        })
    };
    ImageSurface.__name__ = !0;
    ImageSurface.fromFile = function(a, b) {
        var c = new ImageSurface(null);
        LoadingManager.loadImage(a, function(d) {
            c.create(d);
            null != b && b()
        });
        return c
    }
    ;
    ImageSurface.__super__ = GraphicsObject;
    ImageSurface.prototype = __INHERIT__(GraphicsObject.prototype, {
        get_rect: function() {
            return new Rectangle(0,0,null != this.clipRect ? this.clipRect.width : 0,null != this.clipRect ? this.clipRect.height : 0)
        },
        set_clipRect: function(a) {
            return this.clipRect = a
        },
        create: function(a) {
            if (null == this.image) {
                this.image = a;
                var b = a.width
                  , c = a.height;
                "svg" == ja.substr(a.src, a.src.length - 3, null) && (window.document.body.appendChild(a),
                b = a.offsetWidth,
                c = a.offsetHeight,
                window.document.body.removeChild(a));
                this.imageWidth = b;
                this.imageHeight = c;
                this.set_clipRect(new Rectangle(0,0,b,c))
            }
        },
        getBoundsSelf: function() {
            return new Rectangle(0,0,null != this.image ? this.clipRect.width : 0,null != this.image ? this.clipRect.height : 0)
        },
        render: function(a) {
            null != this.image && a.drawImage(this.image, this.clipRect, 0, 0, 0 != this.clipRect.x || 0 != this.clipRect.y || this.clipRect.width != this.imageWidth || this.clipRect.height != this.imageHeight)
        },
        __class__: ImageSurface
    });
    var RotateEvent = function(a) {
        this.type = a
    };
    RotateEvent.__name__ = !0;
    RotateEvent.prototype = {
        __class__: RotateEvent
    };
    var RotateFocusEvent = function(a) {
        this.type = a
    };
    RotateFocusEvent.__name__ = !0;
    RotateFocusEvent.__super__ = RotateEvent;
    RotateFocusEvent.prototype = __INHERIT__(RotateEvent.prototype, {
        __class__: RotateFocusEvent
    });
    var RotateKeyboardEvent = function(a, b) {
        this.type = a;
        this.keyCode = b
    };
    RotateKeyboardEvent.__name__ = !0;
    RotateKeyboardEvent.__super__ = RotateEvent;
    RotateKeyboardEvent.prototype = __INHERIT__(RotateEvent.prototype, {
        __class__: RotateKeyboardEvent
    });
    var RotateProgressEvent = function(a, b) {
        this.type = a;
        this.progress = b
    };
    RotateProgressEvent.__name__ = !0;
    RotateProgressEvent.__super__ = RotateEvent;
    RotateProgressEvent.prototype = __INHERIT__(RotateEvent.prototype, {
        __class__: RotateProgressEvent
    });
    var RotateMouseEvent = function(a, b, c, d, e) {
        null == e && (e = 0);
        this.type = a;
        this.target = b;
        this.x = c;
        this.y = d;
        this.which = e
    };
    RotateMouseEvent.__name__ = !0;
    RotateMouseEvent.__super__ = RotateEvent;
    RotateMouseEvent.prototype = __INHERIT__(RotateEvent.prototype, {
        __class__: RotateMouseEvent
    });
    var RotateRenderEvent = function(a, b) {
        this.type = a;
        this.surface = b
    };
    RotateRenderEvent.__name__ = !0;
    RotateRenderEvent.__super__ = RotateEvent;
    RotateRenderEvent.prototype = __INHERIT__(RotateEvent.prototype, {
        __class__: RotateRenderEvent
    });
    var Vector2 = function(a, b) {
        this.x = a;
        this.y = b
    };
    Vector2.__name__ = !0;
    Vector2.dot = function(a, b) {
        return a.x * b.x + a.y * b.y
    }
    ;
    Vector2.distance = function(a, b) {
        return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y))
    }
    ;
    Vector2.prototype = {
        copy: function() {
            return new Vector2(this.x,this.y)
        },
        equals: function(a) {
            return null != a && a.x == this.x ? a.y == this.y : !1
        },
        add: function(a) {
            return new Vector2(this.x + a.x,this.y + a.y)
        },
        subtract: function(a) {
            return new Vector2(this.x - a.x,this.y - a.y)
        },
        multiply: function(a) {
            return new Vector2(this.x * a.x,this.y * a.y)
        },
        divide: function(a) {
            return new Vector2(this.x / a.x,this.y / a.y)
        },
        __class__: Vector2
    };
    var Rectangle = function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d
    };
    Rectangle.__name__ = !0;
    Rectangle.combineMultiple = function(a) {
        for (var b = 0, c = 0, d = 0, e = 0, f = 0, m = a.length; f < m; ) {
            var k = f++
              , p = a[k];
            if (0 == k || p.get_top() < b)
                b = p.get_top();
            if (0 == k || p.get_left() < c)
                c = p.get_left();
            if (0 == k || p.get_bottom() > d)
                d = p.get_bottom();
            if (0 == k || p.get_right() > e)
                e = p.get_right()
        }
        return new Rectangle(c,b,e - c,d - b)
    }
    ;
    Rectangle.containingPoints = function(a) {
        for (var b = a[0].y, c = a[0].x, d = a[0].y, e = a[0].x, f = 0; f < a.length; ) {
            var m = a[f];
            ++f;
            m.y < b ? b = m.y : m.y > d && (d = m.y);
            m.x < c ? c = m.x : m.x > e && (e = m.x)
        }
        return new Rectangle(c,b,e - c,d - b)
    }
    ;
    Rectangle.prototype = {
        get_top: function() {
            return this.y
        },
        set_top: function(a) {
            return this.y = a
        },
        get_left: function() {
            return this.x
        },
        set_left: function(a) {
            return this.x = a
        },
        get_bottom: function() {
            return this.y + this.height
        },
        set_bottom: function(a) {
            this.height = a - this.y;
            return a
        },
        get_right: function() {
            return this.x + this.width
        },
        set_right: function(a) {
            this.width = a - this.x;
            return a
        },
        get_center: function() {
            return new Vector2((this.get_left() + this.get_right()) / 2,(this.get_top() + this.get_bottom()) / 2)
        },
        intersects: function(a) {
            return a.get_left() < this.get_right() && a.get_right() > this.get_left() && a.get_top() < this.get_bottom() ? a.get_bottom() > this.get_top() : !1
        },
        contains: function(a) {
            return null != a && a.x >= this.x && a.y >= this.y && a.x < this.get_right() ? a.y < this.get_bottom() : !1
        },
        equals: function(a) {
            return null != a && a.x == this.x && a.y == this.y && a.width == this.width ? a.height == this.height : !1
        },
        combine: function(a) {
            var b = a.get_top() < this.get_top() ? a.get_top() : this.get_top()
              , c = a.get_left() < this.get_left() ? a.get_left() : this.get_left()
              , d = a.get_bottom() > this.get_bottom() ? a.get_bottom() : this.get_bottom();
            a = a.get_right() > this.get_right() ? a.get_right() : this.get_right();
            this.set_top(b);
            this.set_left(c);
            this.set_bottom(d);
            this.set_right(a)
        },
        copy: function() {
            return new Rectangle(this.x,this.y,this.width,this.height)
        },
        __class__: Rectangle
    };
    var qb = function(a) {
        this.mouseX = this.mouseY = 0;
        this.isFocused = !1;
        var b = this;
        this.listeners = new Ra;
        this.c = a;
        window.addEventListener("focus", T(this, this.onFocus));
        window.addEventListener("blur", T(this, this.onBlur));
        window.addEventListener("pagehide", T(this, this.onBlur));
        window.addEventListener("contextmenu", function(c) {
            var d = c.target.tagName.toLowerCase();
            if ("canvas" != d && "body" != d && "html" != d)
                return !0;
            b.onMouseUp(c);
            c.preventDefault();
            return !1
        });
        window.addEventListener("click", T(this, this.onClick));
        window.addEventListener("mousedown", T(this, this.onMouseDown));
        window.addEventListener("mouseup", T(this, this.onMouseUp));
        window.addEventListener("mousemove", T(this, this.onMouseMove));
        window.addEventListener("mouseover", T(this, this.onMouseMove));
        window.addEventListener("keydown", T(this, this.onKeyDown));
        window.addEventListener("keyup", T(this, this.onKeyUp))
    };
    qb.__name__ = !0;
    qb.__super__ = EventDispatcher;
    qb.prototype = __INHERIT__(EventDispatcher.prototype, {
        set_mouseX: function(a) {
            return this.mouseX = Math.floor(a)
        },
        set_mouseY: function(a) {
            return this.mouseY = Math.floor(a)
        },
        updateMouse: function(a) {
            a = h.pageToGame(a.pageX, a.pageY);
            this.set_mouseX(a.x);
            this.set_mouseY(a.y)
        },
        onFocus: function() {
            this.isFocused = !0;
            this.triggerEvent(new RotateFocusEvent("focus"))
        },
        onBlur: function() {
            this.isFocused = !1;
            this.triggerEvent(new RotateFocusEvent("blur"))
        },
        onClick: function(a) {
            if (!this.isFocused)
                this.onFocus();
            this.updateMouse(a);
            this.triggerEvent(this.makeMouseEvent("click", a.which))
        },
        onMouseDown: function(a) {
            this.updateMouse(a);
            this.triggerEvent(this.makeMouseEvent("mouseDown", a.which))
        },
        onMouseUp: function(a) {
            this.updateMouse(a);
            this.triggerEvent(this.makeMouseEvent("mouseUp", a.which));
            3 == a.which && (this.onKeyUp({
                type: "keyup",
                keyCode: 16,
                preventDefault: function() {}
            }),
            this.onKeyUp({
                type: "keyup",
                keyCode: 17,
                preventDefault: function() {}
            }))
        },
        onMouseMove: function(a) {
            this.updateMouse(a);
            this.triggerEvent(this.makeMouseEvent("move"))
        },
        makeMouseEvent: function(a, b) {
            null == b && (b = 0);
            return new RotateMouseEvent(a,null,this.mouseX,this.mouseY,b)
        },
        onKeyDown: function(a) {
            if (this.isFocused) {
                var b = window.document.activeElement.tagName.toLowerCase();
                "input" != b && "textarea" != b && (this.triggerEvent(new RotateKeyboardEvent("keyDown",a.keyCode)),
                this.captureKey(a.keyCode, a.ctrlKey) && a.preventDefault())
            }
        },
        onKeyUp: function(a) {
            if (this.isFocused) {
                var b = window.document.activeElement.tagName.toLowerCase();
                "input" != b && "textarea" != b && (this.triggerEvent(new RotateKeyboardEvent("keyUp",a.keyCode)),
                this.captureKey(a.keyCode, a.ctrlKey) && a.preventDefault())
            }
        },
        captureKey: function(a, b) {
            return !(112 <= a && 123 >= a || b && (48 == a || 96 == a || 187 == a || 107 == a || 189 == a || 109 == a || 84 == a))
        },
        __class__: qb
    });
    var G = function() {};
    G.__name__ = !0;
    G._init = function() {
        G.inited || (h.input.addEventListener("keyDown", G.onKeyDown),
        h.input.addEventListener("keyUp", G.onKeyUp),
        h.input.addEventListener("blur", G.reset),
        h.stage.addEventListener("exitFrame", G.update),
        G.inited = !0)
    }
    ;
    G.onKeyDown = function(a) {
        G.keyDown(a.keyCode) || G.keys.push(a.keyCode)
    }
    ;
    G.onKeyUp = function(a) {
        a = G.keys.indexOf(a.keyCode);
        -1 < a && G.keys.splice(a, 1)
    }
    ;
    G.reset = function(a) {
        G.keys = []
    }
    ;
    G.update = function() {
        G.keysOld = G.keys.slice(0);
        if (null != window.document.activeElement && null != window.document.activeElement.tagName) {
            var a = window.document.activeElement.tagName.toLowerCase();
            "input" != a && "textarea" != a || G.reset(null)
        }
    }
    ;
    G.keyDown = function(a) {
        return -1 < G.keys.indexOf(a)
    }
    ;
    G.keyDownOld = function(a) {
        return -1 < G.keysOld.indexOf(a)
    }
    ;
    G.keyPressed = function(a) {
        return G.keyDown(a) ? !G.keyDownOld(a) : !1
    }
    ;
    G.keyReleased = function(a) {
        return G.keyDown(a) ? !1 : G.keyDownOld(a)
    }
    ;
    var Ga = function(a, b) {
        this.type = a;
        this.name = b
    };
    Ga.__name__ = !0;
    Ga.callFunc = function(a, b) {
        var c = new Ga(Ga.FUNC,a);
        c.params = b;
        return c
    }
    ;
    Ga.prototype = {
        execute: function(a) {
            this.type == Ga.FUNC && a[this.name].apply(a, this.params)
        },
        __class__: Ga
    };
    var Ea = function(a) {
        this._transform = new Transform;
        this._ctx = a;
        this.reset()
    };
    Ea.__name__ = !0;
    Ea.prototype = {
        save: function() {
            this._transform.save();
            this._ctx.save()
        },
        restore: function() {
            this._transform.restore();
            this._ctx.restore()
        },
        setTransform: function(a, b, c, d, e, f) {
            this._transform.set(a, b, c, d, e, f);
            this._ctx.setTransform(a, b, c, d, e, f)
        },
        translate: function(a, b) {
            if (0 != a || 0 != b)
                this._transform.translate(a, b),
                this._ctx.translate(a, b)
        },
        scale: function(a, b) {
            if (1 != a || 1 != b)
                this._transform.scale(a, b),
                this._ctx.scale(a, b)
        },
        rotate: function(a) {
            0 != a && (this._transform.rotate(a),
            this._ctx.rotate(a))
        },
        get_skipDraw: function() {
            return this.filling ? !1 : !this.stroking
        },
        get_strokeOffset: function() {
            return this.stroking && 0 != Math.round(this.strokeWidth) % 2 ? .5 : 0
        },
        reset: function(a) {
            null == a && (a = !1);
            a || this.setTransform(1, 0, 0, 1, 0, 0);
            this.filling = this.stroking = !1
        },
        clearRect: function(a, b, c, d) {
            this._ctx.clearRect(a, b, c, d)
        },
        beginFill: function(a, b) {
            null == b && (b = 1);
            null == a && (a = 0);
            0 > b ? b = 0 : 1 < b && (b = 1);
            this._ctx.fillStyle = xa.getColorString(a & 16777215, b);
            this.filling = !0
        },
        endFill: function() {
            this.filling = !1
        },
        beginStroke: function(a, b, c) {
            null == c && (c = 1);
            null == b && (b = 0);
            null == a && (a = 1);
            0 > c ? c = 0 : 1 < c && (c = 1);
            this._ctx.strokeStyle = xa.getColorString(b & 16777215, c);
            this._ctx.lineWidth = this.strokeWidth = a;
            this.stroking = !0
        },
        endStroke: function() {
            this.stroking = !1
        },
        drawRect: function(a, b, c, d) {
            if (!this.get_skipDraw()) {
                var e = this.get_strokeOffset();
                a += e;
                b += e;
                this.filling && this._ctx.fillRect(a, b, c, d);
                this.stroking && this._ctx.strokeRect(a, b, c, d)
            }
        },
        beginPath: function() {
            this._ctx.beginPath()
        },
        closePath: function() {
            this._ctx.closePath()
        },
        moveTo: function(a, b) {
            this._ctx.moveTo(a, b)
        },
        lineTo: function(a, b) {
            this._ctx.lineTo(a, b)
        },
        arc: function(a, b, c, d, e, f) {
            null == f && (f = !1);
            this._ctx.arc(a, b, c, d, e, f)
        },
        applyPath: function() {
            this.filling && this._ctx.fill();
            this.stroking && this._ctx.stroke()
        },
        drawPath: function(a, b) {
            null == b && (b = !0);
            if (!(this.get_skipDraw() || 2 > a.length)) {
                var c = this.get_strokeOffset();
                this.beginPath();
                this.moveTo(a[0].x + c, a[0].y + c);
                for (var d = 1, e = a.length; d < e; ) {
                    var f = d++;
                    this.lineTo(a[f].x + c, a[f].y + c)
                }
                b && this.closePath();
                this.applyPath()
            }
        },
        drawCircle: function(a, b, c) {
            if (!this.get_skipDraw()) {
                var d = this.get_strokeOffset();
                a += d;
                b += d;
                this.beginPath();
                this.arc(a, b, c, .1, Ea.PI2 + .1);
                this.applyPath()
            }
        },
        drawArc: function(a, b, c, d, e, f, m) {
            null == m && (m = !1);
            null == f && (f = !1);
            if (!this.get_skipDraw()) {
                var k = this.get_strokeOffset();
                a += k;
                b += k;
                this.beginPath();
                m && this.moveTo(a, b);
                this.arc(a, b, c, d, e, f);
                this.applyPath()
            }
        },
        drawEllipse: function(a, b, c, d) {
            if (!this.get_skipDraw()) {
                var e = this.get_strokeOffset();
                a += e;
                b += e;
                this.beginPath();
                this.save();
                this.translate(a + c / 2, b + d / 2);
                this.scale(c / d, 1);
                this.arc(0, 0, d / 2, .1, Ea.PI2 + .1);
                this.restore();
                this.applyPath()
            }
        },
        drawImage: function(a, b, c, d, e) {
            null == e && (e = !0);
            null != b ? e ? xa.drawImageSafe(this._ctx, a, b.x, b.y, b.width, b.height, c, d) : this._ctx.drawImage(a, b.x, b.y, b.width, b.height, c, d, b.width, b.height) : this._ctx.drawImage(a, c, d)
        },
        drawText: function(a, b, c, d, e, f, m, k) {
            null == k && (k = 1.25);
            null == m && (m = "left");
            null == f && (f = "normal");
            if (!this.get_skipDraw())
                for (d = ("normal" != f ? f + " " : "") + e + "px " + d,
                this._ctx.font != d && (this._ctx.font = d),
                this._ctx.textBaseline = "top",
                this._ctx.textAlign = m,
                a = a.split("\n"),
                m = 0,
                d = a.length; m < d; ) {
                    f = m++;
                    var p = a[f];
                    this.filling && this._ctx.fillText(p, b, c + f * e * k);
                    this.stroking && this._ctx.strokeText(p, b, c + f * e * k)
                }
        },
        getTextWidth: function(a, b, c) {
            b = c + "px " + b;
            this._ctx.font != b && (this._ctx.font = b);
            a = a.split("\n");
            c = b = 0;
            for (var d = a.length; c < d; ) {
                var e = c++;
                e = this._ctx.measureText(a[e]).width;
                e > b && (b = e)
            }
            return b
        },
        __class__: Ea
    };
    var Transform = function() {
        this.states = [];
        this.matrix = [1, 0, 0, 1, 0, 0]
    };
    Transform.__name__ = !0;
    Transform.prototype = {
        getMatrix: function() {
            return this.matrix.slice(0)
        },
        get: function(a) {
            return 0 > a || 5 < a ? 0 : this.matrix[a]
        },
        set: function(a, b, c, d, e, f) {
            this.matrix[0] = a;
            this.matrix[1] = b;
            this.matrix[2] = c;
            this.matrix[3] = d;
            this.matrix[4] = e;
            this.matrix[5] = f
        },
        multiply: function(a, b, c, d, e, f) {
            this.set(this.matrix[0] * a + this.matrix[2] * b, this.matrix[1] * a + this.matrix[3] * b, this.matrix[0] * c + this.matrix[2] * d, this.matrix[1] * c + this.matrix[3] * d, this.matrix[0] * e + this.matrix[2] * f + this.matrix[4], this.matrix[1] * e + this.matrix[3] * f + this.matrix[5])
        },
        identity: function() {
            this.set(1, 0, 0, 1, 0, 0)
        },
        translate: function(a, b) {
            0 == a && 0 == b || this.multiply(1, 0, 0, 1, a, b)
        },
        scale: function(a, b) {
            1 == a && 1 == b || this.multiply(a, 0, 0, b, 0, 0)
        },
        rotate: function(a) {
            0 != a && this.multiply(Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0)
        },
        save: function() {
            this.states.push(this.matrix.slice(0))
        },
        restore: function() {
            var a = this.states.pop();
            null != a ? this.matrix = a : this.identity()
        },
        equals: function(a) {
            return this.matrix[0] == a.get(0) && this.matrix[1] == a.get(1) && this.matrix[2] == a.get(2) && this.matrix[3] == a.get(3) && this.matrix[4] == a.get(4) ? this.matrix[5] == a.get(5) : !1
        },
        copy: function(a) {
            this.matrix[0] = a.get(0);
            this.matrix[1] = a.get(1);
            this.matrix[2] = a.get(2);
            this.matrix[3] = a.get(3);
            this.matrix[4] = a.get(4);
            this.matrix[5] = a.get(5)
        },
        apply: function(a, b) {
            return new Vector2(this.matrix[0] * a + this.matrix[2] * b + this.matrix[4],this.matrix[1] * a + this.matrix[3] * b + this.matrix[5])
        },
        __class__: Transform
    };
    var lc = function() {};
    lc.__name__ = !0;
    var ya = function(a) {
        this.length = a.byteLength;
        this.b = new ec(a);
        this.b.bufferValue = a;
        a.hxBytes = this;
        a.bytes = this.b
    };
    ya.__name__ = !0;
    ya.ofString = function(a) {
        for (var b = [], c = 0; c < a.length; ) {
            var d = a.charCodeAt(c++);
            55296 <= d && 56319 >= d && (d = d - 55232 << 10 | a.charCodeAt(c++) & 1023);
            127 >= d ? b.push(d) : (2047 >= d ? b.push(192 | d >> 6) : (65535 >= d ? b.push(224 | d >> 12) : (b.push(240 | d >> 18),
            b.push(128 | d >> 12 & 63)),
            b.push(128 | d >> 6 & 63)),
            b.push(128 | d & 63))
        }
        return new ya((new ec(b)).buffer)
    }
    ;
    ya.prototype = {
        getString: function(a, b) {
            if (0 > a || 0 > b || a + b > this.length)
                throw new Z(oa.OutsideBounds);
            for (var c = "", d = this.b, e = String.fromCharCode, f = a, m = a + b; f < m; ) {
                var k = d[f++];
                if (128 > k) {
                    if (0 == k)
                        break;
                    c += e(k)
                } else if (224 > k)
                    c += e((k & 63) << 6 | d[f++] & 127);
                else if (240 > k) {
                    var p = d[f++];
                    c += e((k & 31) << 12 | (p & 127) << 6 | d[f++] & 127)
                } else {
                    p = d[f++];
                    var y = d[f++];
                    k = (k & 15) << 18 | (p & 127) << 12 | (y & 127) << 6 | d[f++] & 127;
                    c += e((k >> 10) + 55232);
                    c += e(k & 1023 | 56320)
                }
            }
            return c
        },
        toString: function() {
            return this.getString(0, this.length)
        },
        __class__: ya
    };
    var za = function() {};
    za.__name__ = !0;
    za.encode = function(a, b) {
        null == b && (b = !0);
        var c = (new sb(za.BYTES)).encodeBytes(a).toString();
        if (b)
            switch (a.length % 3) {
            case 1:
                c += "==";
                break;
            case 2:
                c += "="
            }
        return c
    }
    ;
    za.decode = function(a, b) {
        null == b && (b = !0);
        if (b)
            for (; 61 == ja.cca(a, a.length - 1); )
                a = ja.substr(a, 0, -1);
        return (new sb(za.BYTES)).decodeBytes(ya.ofString(a))
    }
    ;
    var sb = function(a) {
        for (var b = a.length, c = 1; b > 1 << c; )
            ++c;
        if (8 < c || b != 1 << c)
            throw new Z("BaseCode : base length must be a power of two.");
        this.base = a;
        this.nbits = c
    };
    sb.__name__ = !0;
    sb.prototype = {
        encodeBytes: function(a) {
            for (var b = this.nbits, c = this.base, d = 8 * a.length / b | 0, e = new ya(new tb(d + (0 == 8 * a.length % b ? 0 : 1))), f = 0, m = 0, k = (1 << b) - 1, p = 0, y = 0; y < d; ) {
                for (; m < b; )
                    m += 8,
                    f <<= 8,
                    f |= a.b[p++];
                m -= b;
                e.b[y++] = c.b[f >> m & k] & 255
            }
            0 < m && (e.b[y++] = c.b[f << b - m & k] & 255);
            return e
        },
        initTable: function() {
            for (var a = [], b = 0; 256 > b; ) {
                var c = b++;
                a[c] = -1
            }
            b = 0;
            for (c = this.base.length; b < c; ) {
                var d = b++;
                a[this.base.b[d]] = d
            }
            this.tbl = a
        },
        decodeBytes: function(a) {
            var b = this.nbits;
            null == this.tbl && this.initTable();
            for (var c = this.tbl, d = a.length * b >> 3, e = new ya(new tb(d)), f = 0, m = 0, k = 0, p = 0; p < d; ) {
                for (; 8 > m; ) {
                    m += b;
                    f <<= b;
                    var y = c[a.b[k++]];
                    if (-1 == y)
                        throw new Z("BaseCode : invalid encoded char");
                    f |= y
                }
                m -= 8;
                e.b[p++] = f >> m & 255
            }
            return e
        },
        __class__: sb
    };
    var hb = function() {
        this.h = {}
    };
    hb.__name__ = !0;
    hb.__interfaces__ = [lc];
    hb.prototype = {
        keys: function() {
            var a = [], b;
            for (b in this.h)
                this.h.hasOwnProperty(b) && a.push(b | 0);
            return ja.iter(a)
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    var a = this.it.next();
                    return this.ref[a]
                }
            }
        },
        __class__: hb
    };
    var fc = function(a, b) {
        this.map = a;
        this.keys = b;
        this.index = 0;
        this.count = b.length
    };
    fc.__name__ = !0;
    fc.prototype = {
        hasNext: function() {
            return this.index < this.count
        },
        next: function() {
            var a = this.map
              , b = this.keys[this.index++];
            return null != na[b] ? a.getReserved(b) : a.h[b]
        },
        __class__: fc
    };
    var Ra = function() {
        this.h = {}
    };
    Ra.__name__ = !0;
    Ra.__interfaces__ = [lc];
    Ra.prototype = {
        setReserved: function(a, b) {
            null == this.rh && (this.rh = {});
            this.rh["$" + a] = b
        },
        getReserved: function(a) {
            return null == this.rh ? null : this.rh["$" + a]
        },
        existsReserved: function(a) {
            return null == this.rh ? !1 : this.rh.hasOwnProperty("$" + a)
        },
        remove: function(a) {
            if (null != na[a]) {
                a = "$" + a;
                if (null == this.rh || !this.rh.hasOwnProperty(a))
                    return !1;
                delete this.rh[a]
            } else {
                if (!this.h.hasOwnProperty(a))
                    return !1;
                delete this.h[a]
            }
            return !0
        },
        arrayKeys: function() {
            var a = [], b;
            for (b in this.h)
                this.h.hasOwnProperty(b) && a.push(b);
            if (null != this.rh)
                for (b in this.rh)
                    36 == b.charCodeAt(0) && a.push(b.substr(1));
            return a
        },
        __class__: Ra
    };
    var oa = {
        __ename__: !0,
        __constructs__: ["Blocked", "Overflow", "OutsideBounds", "Custom"],
        Blocked: ["Blocked", 0]
    };
    oa.Blocked.toString = dc;
    oa.Blocked.__enum__ = oa;
    oa.Overflow = ["Overflow", 1];
    oa.Overflow.toString = dc;
    oa.Overflow.__enum__ = oa;
    oa.OutsideBounds = ["OutsideBounds", 2];
    oa.OutsideBounds.toString = dc;
    oa.OutsideBounds.__enum__ = oa;
    oa.Custom = function(a) {
        a = ["Custom", 3, a];
        a.__enum__ = oa;
        a.toString = dc;
        return a
    }
    ;
    var Z = function(a) {
        Error.call(this);
        this.val = a;
        this.message = String(a);
        Error.captureStackTrace && Error.captureStackTrace(this, Z)
    };
    Z.__name__ = !0;
    Z.wrap = function(a) {
        return a instanceof Error ? a : new Z(a)
    }
    ;
    Z.__super__ = Error;
    Z.prototype = __INHERIT__(Error.prototype, {
        __class__: Z
    });
    var ES3ClassUtils = function() {};
    ES3ClassUtils.__name__ = !0;
    ES3ClassUtils.getClass = function(a) {
        if (a instanceof Array && null == a.__enum__)
            return Array;
        var b = a.__class__;
        if (null != b)
            return b;
        a = ES3ClassUtils.__nativeClassName(a);
        return null != a ? ES3ClassUtils.__resolveNativeClass(a) : null
    }
    ;
    ES3ClassUtils.__string_rec = function(a, b) {
        if (null == a)
            return "null";
        if (5 <= b.length)
            return "<...>";
        var c = typeof a;
        "function" == c && (a.__name__ || a.__ename__) && (c = "object");
        switch (c) {
        case "function":
            return "<function>";
        case "object":
            if (a instanceof Array) {
                if (a.__enum__) {
                    if (2 == a.length)
                        return a[0];
                    c = a[0] + "(";
                    b += "\t";
                    for (var d = 2, e = a.length; d < e; ) {
                        var f = d++;
                        c = 2 != f ? c + ("," + ES3ClassUtils.__string_rec(a[f], b)) : c + ES3ClassUtils.__string_rec(a[f], b)
                    }
                    return c + ")"
                }
                c = a.length;
                d = "[";
                b += "\t";
                for (e = 0; e < c; )
                    f = e++,
                    d += (0 < f ? "," : "") + ES3ClassUtils.__string_rec(a[f], b);
                return d + "]"
            }
            try {
                d = a.toString
            } catch (m) {
                return "???"
            }
            if (null != d && d != Object.toString && "function" == typeof d && (c = a.toString(),
            "[object Object]" != c))
                return c;
            c = null;
            d = "{\n";
            b += "\t";
            e = null != a.hasOwnProperty;
            for (c in a)
                e && !a.hasOwnProperty(c) || "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"),
                d += b + c + " : " + ES3ClassUtils.__string_rec(a[c], b));
            b = b.substring(1);
            return d + ("\n" + b + "}");
        case "string":
            return a;
        default:
            return String(a)
        }
    }
    ;
    ES3ClassUtils.__interfLoop = function(a, b) {
        if (null == a)
            return !1;
        if (a == b)
            return !0;
        var c = a.__interfaces__;
        if (null != c)
            for (var d = 0, e = c.length; d < e; ) {
                var f = d++;
                f = c[f];
                if (f == b || ES3ClassUtils.__interfLoop(f, b))
                    return !0
            }
        return ES3ClassUtils.__interfLoop(a.__super__, b)
    }
    ;
    ES3ClassUtils.__instanceof = function(a, b) {
        if (null == b)
            return !1;
        switch (b) {
        case Array:
            return a instanceof Array ? null == a.__enum__ : !1;
        case mc:
            return "boolean" == typeof a;
        case qc:
            return !0;
        case kc:
            return "number" == typeof a;
        case rc:
            return "number" == typeof a ? (a | 0) === a : !1;
        case String:
            return "string" == typeof a;
        default:
            if (null != a)
                if ("function" == typeof b) {
                    if (a instanceof b || ES3ClassUtils.__interfLoop(ES3ClassUtils.getClass(a), b))
                        return !0
                } else {
                    if ("object" == typeof b && ES3ClassUtils.__isNativeObj(b) && a instanceof b)
                        return !0
                }
            else
                return !1;
            return b == sc && null != a.__name__ || b == tc && null != a.__ename__ ? !0 : a.__enum__ == b
        }
    }
    ;
    ES3ClassUtils.__cast = function(a, b) {
        if (ES3ClassUtils.__instanceof(a, b))
            return a;
        throw new Z("Cannot cast " + la.string(a) + " to " + la.string(b));
    }
    ;
    ES3ClassUtils.__nativeClassName = function(a) {
        a = ES3ClassUtils.__toStr.call(a).slice(8, -1);
        return "Object" == a || "Function" == a || "Math" == a || "JSON" == a ? null : a
    }
    ;
    ES3ClassUtils.__isNativeObj = function(a) {
        return null != ES3ClassUtils.__nativeClassName(a)
    }
    ;
    ES3ClassUtils.__resolveNativeClass = function(a) {
        return window[a]
    }
    ;
    var wa = function(a) {
        if (a instanceof Array && null == a.__enum__)
            this.a = a,
            this.byteLength = a.length;
        else {
            this.a = [];
            for (var b = 0; b < a; ) {
                var c = b++;
                this.a[c] = 0
            }
            this.byteLength = a
        }
    };
    wa.__name__ = !0;
    wa.sliceImpl = function(a, b) {
        var c = new ec(this,a,null == b ? null : b - a)
          , d = new tb(c.byteLength);
        (new ec(d)).set(c);
        return d
    }
    ;
    wa.prototype = {
        slice: function(a, b) {
            return new wa(this.a.slice(a, b))
        },
        __class__: wa
    };
    var Ia = function() {};
    Ia.__name__ = !0;
    Ia._new = function(a, b, c) {
        if ("number" == typeof a) {
            c = [];
            for (b = 0; b < a; ) {
                var d = b++;
                c[d] = 0
            }
            c.byteLength = c.length;
            c.byteOffset = 0;
            c.buffer = new wa(c)
        } else if (ES3ClassUtils.__instanceof(a, wa))
            null == b && (b = 0),
            null == c && (c = a.byteLength - b),
            c = 0 == b ? a.a : a.a.slice(b, b + c),
            c.byteLength = c.length,
            c.byteOffset = b,
            c.buffer = a;
        else if (a instanceof Array && null == a.__enum__)
            c = a.slice(),
            c.byteLength = c.length,
            c.byteOffset = 0,
            c.buffer = new wa(c);
        else
            throw new Z("TODO " + la.string(a));
        c.subarray = Ia._subarray;
        c.set = Ia._set;
        return c
    }
    ;
    Ia._set = function(a, b) {
        if (ES3ClassUtils.__instanceof(a.buffer, wa)) {
            if (a.byteLength + b > this.byteLength)
                throw new Z("set() outside of range");
            for (var c = 0, d = a.byteLength; c < d; ) {
                var e = c++;
                this[e + b] = a[e]
            }
        } else if (a instanceof Array && null == a.__enum__) {
            if (a.length + b > this.byteLength)
                throw new Z("set() outside of range");
            c = 0;
            for (d = a.length; c < d; )
                e = c++,
                this[e + b] = a[e]
        } else
            throw new Z("TODO");
    }
    ;
    Ia._subarray = function(a, b) {
        var c = Ia._new(this.slice(a, b));
        c.byteOffset = a;
        return c
    }
    ;
    var Constants = function() {};
    Constants.__name__ = !0;
    var Images = function() {};
    Images.__name__ = !0;
    var RotateFont = function(a, b, c, d) {
        null == d && (d = 0);
        null == c && (c = 1);
        var e = this;
        this.image = LoadingManager.loadImage(a);
        this.colorOffset = d;
        LoadingManager.loadTextFile(b, function(f) {
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
                e.chars[k.c] = k
            }
        })
    };
    RotateFont.__name__ = !0;
    RotateFont.prototype = {
        __class__: RotateFont
    };
    var GameInstance = function() {
        this.muteMusic = this.muteSFX = this.ieMenu = this.ieGame1 = this.ieGame2 = this.ieSurface = this.ieUnmuted = this.invert = !1;
        this.fader = new GraphicsObject;
        this.fading = this.fadingSlow = !1;
        this.timerHolder = new GraphicsObject;
        this.pauseOnInit = !1;
        this.pausedTime = 0;
        this.hasPaused = this.paused = !1;
        GraphicsObject.call(this)
    };
    GameInstance.__name__ = !0;
    GameInstance.main = function() {
        GameInstance.i = new GameInstance;
        GameInstance.i.addEventListener("added", (Ja = GameInstance.i,
        T(Ja, Ja.init)));
        h.start(GameInstance.element = window.document.getElementById("game"), 504, 504, 2105376, !1, GameInstance.i)
    }
    ;
    GameInstance.smootherStep = function(a) {
        return a * a * a * (a * (6 * a - 15) + 10)
    }
    ;
    GameInstance.quantize = function(a) {
        return Math.floor(a / Constants.tileSize)
    }
    ;
    GameInstance.getInputX = function() {
        return (G.keyDown(37) || G.keyDown(65) ? -1 : 0) + (G.keyDown(39) || G.keyDown(68) ? 1 : 0)
    }
    ;
    GameInstance.getInputY = function() {
        return (G.keyDown(38) || G.keyDown(87) ? -1 : 0) + (G.keyDown(40) || G.keyDown(83) ? 1 : 0)
    }
    ;
    GameInstance.formatMS = function(a) {
        var b = "";
        a = Math.round(a);
        var c = Math.floor(a / 1E3)
          , d = Math.floor(c / 60)
          , e = Math.floor(d / 60);
        0 < e && (b += e + ":");
        d %= 60;
        10 > d && (b += "0");
        b = b + d + ":";
        c %= 60;
        10 > c && (b += "0");
        b = b + c + ":";
        a %= 1E3;
        100 > a && (b += "0");
        10 > a && (b += "0");
        return b += a
    }
    ;
    GameInstance.__super__ = GraphicsObject;
    GameInstance.prototype = __INHERIT__(GraphicsObject.prototype, {
        get_gameTimeMS: function() {
            return this.paused ? this.pauseStart - this.pausedTime : N.get_currentMS() - this.pausedTime
        },
        get_gameTime: function() {
            return .001 * this.get_gameTimeMS()
        },
        init: function(a) {
            this.removeEventListener("added", T(this, this.init));
            h.set_imageSmoothingEnabled(!1);
            LoadingManager.addEventListener("finished", T(this, this.loaded))
        },
        loaded: function(a) {
            var b = this;
            GameInstance.nosave = !LocalStorage.test();
            GameInstance.nosave || this.loadProgress();
            a = function() {
                var c = -1
                  , d = window.navigator.userAgent
                  , e = d.indexOf("MSIE ")
                  , f = d.indexOf("Trident/");
                0 < e ? c = parseInt(d.substring(e + 5, d.indexOf(".", e)), 10) : 0 < f && (c = d.indexOf("rv:"),
                c = parseInt(d.substring(c + 3, d.indexOf(".", c)), 10));
                return -1 < c ? c : void 0
            }();
            GameInstance.ie = 0 < a && 11 >= a;
            GameInstance.ie && (this.muteSFX = this.muteMusic = !0);
            this.lastTick = N.get_currentMS();
            this.addEventListener("enterFrame", T(this, this.update));
            window.document.getElementById("game").style.display = "block";
            window.document.getElementById("loader").style.display = "none";
            this.pauseMenu = new MenuPause;
            this.addChild(this.pauseMenu);
            this.fader.mouseEnabled = !0;
            this.addChild(this.fader);
            this.addChild(this.timerHolder);
            AwardsManager.setup(this);
            h.input.addEventListener("blur", function(c) {
                null != b.targetScreen && b.targetScreen.pausable && (b.pauseOnInit = !0);
                null != b.currentScreen && b.currentScreen.pausable && b.pause()
            });
            this.changeScreen(new vb, !1)
        },
        pause: function(a) {
            null == a && (a = !0);
            this.paused || (a && null != this.targetScreen && this.targetScreen.pausable ? this.pauseOnInit = !0 : (this.paused = !0,
            this.pauseStart = N.get_currentMS(),
            null != this.pauseMenu && (this.pauseMenu.visible = !0,
            this.pauseMenu.onPause()),
            this.hasPaused = !0,
            ES3ClassUtils.__instanceof(this.currentScreen, GameplayLevel) && null != GameplayLevel.i.pauseText && (GameplayLevel.i.pauseText.parent.removeChild(GameplayLevel.i.pauseText),
            GameplayLevel.i.pauseText = null)))
        },
        unpause: function() {
            this.paused && null == this.targetScreen && (this.paused = !1,
            this.pausedTime += N.get_currentMS() - this.pauseStart,
            this.pauseMenu.visible = !1)
        },
        getFadeSpeed: function() {
            return this.fadingSlow ? Constants.screenFadeTimeSlow : Constants.screenFadeTime
        },
        changeScreen: function(a, b, c, d, e) {
            null == e && (e = !1);
            null == d && (d = !1);
            null == b && (b = !0);
            this.screenCallback = c;
            b ? null == this.targetScreen && (this.fading = !0,
            this.fadingSlow = d,
            this.fadeStart = N.get_currentMS(),
            this.fader.graphics.clear(),
            this.fader.graphics.beginFill(e ? 16777215 : 1052688),
            this.fader.graphics.drawRect(0, 0, h.width, h.height),
            this.fader.mouseEnabled = !0,
            null == this.currentScreen ? (this.fader.set_alpha(1),
            this.fadeStart -= this.getFadeSpeed() / 2,
            this.setScreen(a)) : (this.targetScreen = a,
            this.currentScreen.prekill())) : (this.fading = !1,
            this.fader.set_alpha(0),
            this.fader.mouseEnabled = !1,
            null != this.currentScreen && this.currentScreen.prekill(),
            this.targetScreen = null,
            this.setScreen(a),
            this.currentScreen.ready())
        },
        setScreen: function(a) {
            null != this.currentScreen && (this.currentScreen.kill(),
            this.removeChild(this.currentScreen));
            this.currentScreen = a;
            this.addChildAt(this.currentScreen, 0);
            this.currentScreen.init();
            null != this.screenCallback && this.screenCallback();
            this.screenCallback = null;
            this.currentScreen.pausable ? this.pauseOnInit && this.pause(!1) : this.unpause();
            this.pauseOnInit = !1
        },
        update: function(a) {
            null != this.targetScreen ? (a = Math.min((N.get_currentMS() - this.fadeStart) / (this.getFadeSpeed() / 2), 1),
            this.fader.set_alpha(GameInstance.smootherStep(a)),
            1 == a && (a = this.targetScreen,
            this.targetScreen = null,
            this.setScreen(a))) : 0 < this.fader.alpha && (a = Math.min((N.get_currentMS() - this.fadeStart) / (this.getFadeSpeed() / 2) - 1, 1),
            this.fader.set_alpha(1 - GameInstance.smootherStep(a)),
            1 == a && (this.fading = this.fader.mouseEnabled = !1,
            this.currentScreen.ready()));
            null != this.currentScreen && this.currentScreen.pausable && (G.keyPressed(80) || G.keyPressed(27)) && (this.paused ? this.unpause() : this.pause());
            if (!this.paused) {
                null != this.currentScreen && this.currentScreen.update();
                for (a = 0; this.get_gameTimeMS() - this.lastTick >= Constants.tickMS; )
                    if (this.lastTick += Constants.tickMS,
                    null != this.currentScreen && this.currentScreen.tick(),
                    ++a,
                    a == Constants.ticksMax) {
                        this.lastTick = this.get_gameTimeMS();
                        break
                    }
                null != this.currentScreen && this.currentScreen.postUpdate()
            }
            AwardsManager.update()
        },
        migrateProgress: function() {
            try {
                if (null != JSON.parse(window.atob(LocalStorage.getItem("lws:rotate"))))
                    return
            } catch (k) {}
            try {
                var a = JSON.parse(window.atob(LocalStorage.getItem("data")))
                  , b = a.unlocked;
                if ("number" == typeof b && (b | 0) === b && 0 <= a.unlocked && a.unlocked < Levels.list.length && a.awards instanceof Array && null == a.awards.__enum__ && a.awards.length == AwardsManager.awardsAll.length)
                    if (null != a.best) {
                        var c = a.best;
                        var d = "number" == typeof c && (c | 0) === c ? -1 < a.best : !1
                    } else
                        d = !0;
                else
                    d = !1;
                if (d && (null != a.invert ? "boolean" == typeof a.invert && 1 == a.invert : 1) && (null != a.muteMusic ? "boolean" == typeof a.muteMusic && 1 == a.muteMusic : 1) && (null != a.muteSFX ? "boolean" == typeof a.muteSFX && 1 == a.muteSFX : 1)) {
                    d = 0;
                    for (var e = AwardsManager.awardsAll.length; d < e; ) {
                        var f = d++;
                        if ("boolean" != typeof a.awards[f])
                            throw Error();
                    }
                    var m = {
                        unlocked: a.unlocked,
                        awards: a.awards
                    };
                    null != a.best && (m.best = a.best);
                    null != a.invert && (m.invert = a.invert);
                    null != a.muteMusic && (m.muteMusic = a.muteMusic);
                    null != a.muteSFX && (m.muteSFX = a.muteSFX);
                    LocalStorage.setItem("lws:rotate", window.btoa(JSON.stringify(m)));
                    LocalStorage.removeItem("data")
                }
            } catch (k) {}
        },
        loadProgress: function() {
            this.migrateProgress();
            try {
                var a = LocalStorage.getItem("lws:rotate");
                if (null != a && "" != a) {
                    var b = JSON.parse(za.decode(a).toString());
                    if (null != b) {
                        b.muteMusic && this.toggleMusic(!1);
                        b.muteSFX && this.toggleSFX(!1);
                        null != b.unlocked && (Levels.unlocked = b.unlocked);
                        if (null != b.awards && b.awards instanceof Array && null == b.awards.__enum__) {
                            var c = b.awards;
                            a = 0;
                            for (var d = c.length; a < d; ) {
                                var e = a++;
                                c[e] && (AwardsManager.awardsAll[e].unlocked = !0)
                            }
                        }
                        null != b.best && (Levels.speedrunBest = b.best);
                        null != b.invert && (this.invert = 1 == b.invert)
                    }
                }
            } catch (f) {
                f instanceof Z && (f = f.val),
                console.log(f)
            }
        },
        saveProgress: function() {
            for (var a = [], b = 0, c = AwardsManager.awardsAll; b < c.length; ) {
                var d = c[b];
                ++b;
                a.push(d.unlocked)
            }
            a = {
                unlocked: Levels.unlocked,
                awards: a
            };
            -1 < Levels.speedrunBest && (a.best = Levels.speedrunBest);
            this.invert && (a.invert = !0);
            this.muteMusic && (a.muteMusic = !0);
            this.muteSFX && (a.muteSFX = !0);
            LocalStorage.setItem("lws:rotate", za.encode(ya.ofString(JSON.stringify(a))))
        },
        clearProgress: function() {
            LocalStorage.removeItem("lws:rotate");
            for (var a = 0, b = AwardsManager.awardsAll; a < b.length; ) {
                var c = b[a];
                ++a;
                c.unlocked = !1
            }
            Levels.unlocked = 0;
            Levels.speedrunBest = -1;
            this.invert = !1
        },
        warnNoSave: function(a) {
            if (GameInstance.nosave) {
                var b = new GraphicsObjectText(GameInstance.fontMain,"Enable cookies & site data\nto save your progress!",2);
                b.set_x(8);
                b.set_y(4);
                b.set_scaleX(b.set_scaleY(.5));
                a.addChild(b)
            }
        },
        toggleSFX: function(a) {
            null == a && (a = !0);
            this.muteSFX = !this.muteSFX;
            if (GameInstance.ie) {
                if (this.muteSFX)
                    for (var b = 0, c = Sounds.SFX; b < c.length; ) {
                        var d = c[b];
                        ++b;
                        d.stop()
                    }
            } else
                for (b = 0,
                c = Sounds.SFX; b < c.length; )
                    d = c[b],
                    ++b,
                    d.mute(this.muteSFX);
            GameInstance.ie ? this.muteMusic && (this.muteSFX ? Sounds.surface.stop() : this.ieSurface && !Sounds.surface.playing() && Sounds.surface.play()) : Sounds.surface.mute(this.muteSFX && this.muteMusic);
            a && this.saveProgress()
        },
        toggleMusic: function(a) {
            null == a && (a = !0);
            this.muteMusic = !this.muteMusic;
            GameInstance.ie ? this.muteMusic ? (Sounds.themeMenu.stop(),
            Sounds.themeGame1.stop(),
            Sounds.themeGame2.stop()) : (GameInstance.i.ieMenu && !Sounds.themeMenu.playing() && Sounds.themeMenu.play(),
            GameInstance.i.ieGame1 && !Sounds.themeGame1.playing() && Sounds.themeGame1.play(),
            GameInstance.i.ieGame2 && !Sounds.themeGame2.playing() && Sounds.themeGame2.play()) : (Sounds.themeMenu.mute(this.muteMusic),
            Sounds.themeGame1.mute(this.muteMusic),
            Sounds.themeGame2.mute(this.muteMusic));
            GameInstance.ie ? this.muteSFX && (this.muteMusic ? Sounds.surface.stop() : GameInstance.i.ieSurface && !Sounds.surface.playing() && Sounds.surface.play()) : Sounds.surface.mute(this.muteMusic && this.muteSFX);
            a && this.saveProgress()
        },
        __class__: GameInstance
    });
    var Sounds = function() {};
    Sounds.__name__ = !0;
    var LocalStorage = function() {};
    LocalStorage.__name__ = !0;
    LocalStorage.getItem = function(a) {
        try {
            return window.localStorage.getItem(a)
        } catch (b) {
            b instanceof Z && (b = b.val);
            if ("SecurityError" != b.name && "DOMException" != b.name)
                throw Z.wrap(b);
            return null
        }
    }
    ;
    LocalStorage.setItem = function(a, b) {
        try {
            window.localStorage.setItem(a, b)
        } catch (c) {
            if (c instanceof Z && (c = c.val),
            "SecurityError" != c.name && "DOMException" != c.name)
                throw Z.wrap(c);
        }
    }
    ;
    LocalStorage.removeItem = function(a) {
        try {
            window.localStorage.removeItem(a)
        } catch (b) {
            if (b instanceof Z && (b = b.val),
            "SecurityError" != b.name && "DOMException" != b.name)
                throw Z.wrap(b);
        }
    }
    ;
    LocalStorage.test = function() {
        try {
            window.localStorage.setItem("?", "!");
            if ("!" != window.localStorage.getItem("?"))
                return !1;
            window.localStorage.removeItem("?");
            return !0
        } catch (a) {
            a instanceof Z && (a = a.val);
            if ("SecurityError" != a.name && "DOMException" != a.name)
                throw Z.wrap(a);
            return !1
        }
    }
    ;
    var Award = function(a, b) {
        this.unlocked = !1;
        this.name = a;
        this.icon = b
    };
    Award.__name__ = !0;
    Award.prototype = {
        unlock: function() {
            if (this.unlocked)
                return !1;
            this.unlocked = !0;
            GameInstance.i.saveProgress();
            ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, ScreenAwards) && GameInstance.i.currentScreen.refresh();
            AwardsManager.queueNotify(this);
            return !0
        },
        __class__: Award
    };
    var AwardsManager = function() {};
    AwardsManager.__name__ = !0;
    AwardsManager.setup = function(a) {
        null == AwardsManager.bubble && (AwardsManager.bubble = new GraphicsObject,
        AwardsManager.bubble.mouseEnabled = !0,
        a.addChild(AwardsManager.bubble),
        AwardsManager.bubbleTitle = new GraphicsObjectText(GameInstance.fontMain,"NEW AWARD"),
        AwardsManager.bubbleTitle.set_x(68),
        AwardsManager.bubbleTitle.set_y(4),
        AwardsManager.bubbleTitle.set_alpha(.5),
        AwardsManager.bubble.addChild(AwardsManager.bubbleTitle),
        AwardsManager.bubbleName = new GraphicsObjectText(GameInstance.fontMain,""),
        AwardsManager.bubbleName.set_x(68),
        AwardsManager.bubbleName.set_y(28),
        AwardsManager.bubble.addChild(AwardsManager.bubbleName),
        AwardsManager.bubble.set_alpha(0))
    }
    ;
    AwardsManager.queueNotify = function(a) {
        null == AwardsManager.queue && (AwardsManager.queue = []);
        null != a && 0 > AwardsManager.queue.indexOf(a) && AwardsManager.queue.push(a)
    }
    ;
    AwardsManager.adjustBubble = function(a, b) {
        AwardsManager.bubbleName.set_text(ma.replace(a, "\n", " "));
        AwardsManager.bubble.graphics.clear();
        var c = Math.max(AwardsManager.bubbleTitle.get_width(), AwardsManager.bubbleName.get_width()) + AwardsManager.bubbleName.x + 12 + 4;
        AwardsManager.bubble.graphics.beginFill(3158064);
        AwardsManager.bubble.graphics.drawRect(0, 0, c, 68);
        AwardsManager.bubble.graphics.beginFill(6316128);
        AwardsManager.bubble.graphics.drawRect(0, 0, c - 2, 66);
        AwardsManager.bubble.graphics.beginFill(4210752);
        AwardsManager.bubble.graphics.drawRect(0, 0, c - 4, 64);
        null != AwardsManager.bubbleIcon && AwardsManager.bubble.removeChild(AwardsManager.bubbleIcon);
        AwardsManager.bubbleIcon = new ImageSurface(b);
        AwardsManager.bubbleIcon.set_x(8);
        AwardsManager.bubbleIcon.set_y(8);
        AwardsManager.bubble.addChild(AwardsManager.bubbleIcon)
    }
    ;
    AwardsManager.update = function() {
        if (null != AwardsManager.bubble) {
            var a = 0
              , b = N.get_currentMS();
            if (-1 != AwardsManager.bubbleTimer) {
                var c = b - AwardsManager.bubbleTimer;
                var d = c <= 2 * AwardsManager.FADE_MS + AwardsManager.STAY_MS
            } else
                d = !1;
            d ? (a = c <= AwardsManager.FADE_MS ? 0 : c <= AwardsManager.FADE_MS + AwardsManager.STAY_MS ? 1 : 2,
            a = 0 == a ? GameInstance.smootherStep(c / AwardsManager.FADE_MS) : 1 == a ? 1 : 1 - GameInstance.smootherStep((c - AwardsManager.FADE_MS - AwardsManager.STAY_MS) / AwardsManager.FADE_MS)) : null != AwardsManager.queue && 0 < AwardsManager.queue.length && (c = AwardsManager.queue.shift(),
            AwardsManager.adjustBubble(c.name, c.icon),
            AwardsManager.bubbleTimer = b);
            AwardsManager.bubble.set_alpha(a);
            AwardsManager.bubble.set_y(-68 * (1 - a))
        }
    }
    ;
    var wb = function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.id = c;
        this.meta = null == d ? [] : d
    };
    wb.__name__ = !0;
    wb.prototype = {
        get_block: function() {
            return EditorTiles.getBlock(this.id)
        },
        getMeta: function(a) {
            return null != this.meta && null != this.meta[a] ? this.meta[a] : 0
        },
        metaEquals: function(a) {
            if (null == this.meta && null == a)
                return !0;
            if (this.meta.length != a.length)
                return !1;
            for (var b = 0, c = a.length; b < c; ) {
                var d = b++;
                if (a[d] != this.meta[d])
                    return !1
            }
            return !0
        },
        __class__: wb
    };
    var ua = function(a, b, c) {
        this.animChanged = !1;
        this.frame = this.animTimer = this.lastF = 0;
        this.origin = new Vector2(0,0);
        var d = this;
        GraphicsObject.call(this);
        this.image = a;
        this.frameW = b;
        this.frameH = c;
        this.cols = Math.floor(this.image.width / b);
        this.rows = Math.floor(this.image.height / c);
        this.frames = this.cols * this.rows;
        this.addEventListener("render", function(e) {
            d.render(e.surface)
        })
    };
    ua.__name__ = !0;
    ua.__super__ = GraphicsObject;
    ua.prototype = __INHERIT__(GraphicsObject.prototype, {
        set_frame: function(a) {
            return this.frame = 0 > a || a >= this.frames ? 0 : a
        },
        set_animation: function(a) {
            this.animation != a && (this.animTimer = GameInstance.i.get_gameTimeMS(),
            this.animChanged = !0);
            return this.animation = a
        },
        render: function(a) {
            if (null != this.animation && null != this.animation.frames && 0 < this.animation.frames.length) {
                for (var b = GameInstance.i.get_gameTimeMS() - this.animTimer, c = 0, d = !1; b > this.animation.delays[c]; )
                    if (b -= this.animation.delays[c],
                    ++c,
                    c == this.animation.frames.length)
                        if (d = !0,
                        this.animation.loop)
                            c = 0;
                        else {
                            c = this.animation.frames.length - 1;
                            break
                        }
                this.frame = this.animation.frames[c];
                if (null != this.onChange && (this.animChanged || this.lastF != c))
                    this.onChange(c);
                if (!this.animChanged && d && null != this.onFinish)
                    this.onFinish();
                this.lastF = c
            } else
                this.frame >= this.frames && (this.frame = 0);
            a.drawImage(this.image, this.getFrameRect(this.frame), -this.origin.x, -this.origin.y);
            this.animChanged = !1
        },
        getFrameRect: function(a) {
            return new Rectangle(a % this.cols * this.frameW,Math.floor(a / this.cols) * this.frameH,this.frameW,this.frameH)
        },
        getBoundsSelf: function() {
            return new Rectangle(-this.origin.x,-this.origin.y,this.frameW,this.frameH)
        },
        __class__: ua
    });
    var GameAnimation = function(a, b, c) {
        null == c && (c = !0);
        this.loop = !1;
        this.frames = a;
        this.delays = b;
        this.loop = c
    };
    GameAnimation.__name__ = !0;
    GameAnimation.prototype = {
        __class__: GameAnimation
    };
    var S = function() {
        this.horizontal = this.x2 = this.dx = 0;
        ua.call(this, Images.cat, 24, 24);
        this.origin.x = this.frameW / 2;
        this.origin.y = this.frameH
    };
    S.__name__ = !0;
    S.__super__ = ua;
    S.prototype = __INHERIT__(ua.prototype, {
        tick: function() {
            0 < this.horizontal ? this.dx < S.SPEED && (this.dx < -S.ACCEL ? this.dx *= S.DECCEL_MULT : (this.dx += S.ACCEL,
            this.dx > S.SPEED && (this.dx = S.SPEED))) : 0 > this.horizontal ? this.dx > -S.SPEED && (this.dx > S.ACCEL ? this.dx *= S.DECCEL_MULT : (this.dx -= S.ACCEL,
            this.dx < -S.SPEED && (this.dx = -S.SPEED))) : this.dx *= S.DECCEL_MULT;
            this.x2 += this.dx;
            this.set_x(Math.round(this.x2))
        },
        __class__: S
    });
    var hc = function(a) {
        this.lastChanged = -1;
        this.signals = [];
        this.id = a
    };
    hc.__name__ = !0;
    hc.prototype = {
        get_status: function() {
            return 0 < this.signals.length
        },
        signalOn: function(a, b) {
            var c = a + "x" + b;
            0 > this.signals.indexOf(c) && (this.get_status() || (this.lastChanged = GameInstance.i.get_gameTime()),
            this.signals.push(c))
        },
        signalOff: function(a, b) {
            var c = this.signals.indexOf(a + "x" + b);
            -1 < c && (this.signals.splice(c, 1),
            this.get_status() || (this.lastChanged = GameInstance.i.get_gameTime()))
        },
        __class__: hc
    };
    var Va = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.channel = a.getMeta(0);
        this.length = a.getMeta(1);
        this.angle = a.getMeta(2)
    };
    Va.__name__ = !0;
    Va.canPlace = function(a, b, c) {
        if (!l.isInBounds(a, b))
            return !1;
        var d = c[1];
        c = c[2];
        if (3 == c) {
            if (b < d - 1)
                return !1;
            d = b - (d - 1);
            for (b += 1; d < b; )
                if (c = d++,
                !l.isReplacable(a, c))
                    return !1
        } else if (2 == c) {
            if (a < d - 1)
                return !1;
            d = a - (d - 1);
            for (a += 1; d < a; )
                if (c = d++,
                !l.isReplacable(c, b))
                    return !1
        } else if (1 == c) {
            if (b > l.get_height() - d)
                return !1;
            c = b;
            for (b += d; c < b; )
                if (d = c++,
                !l.isReplacable(a, d))
                    return !1
        } else {
            if (a > l.get_width() - d)
                return !1;
            c = a;
            for (a += d; c < a; )
                if (d = c++,
                !l.isReplacable(d, b))
                    return !1
        }
        return !0
    }
    ;
    Va.prototype = {
        contains: function(a, b) {
            return 3 == this.angle ? a == this.x && b <= this.y ? b > this.y - this.length : !1 : 2 == this.angle ? b == this.y && a <= this.x ? a > this.x - this.length : !1 : 1 == this.angle ? a == this.x && b >= this.y ? b < this.y + this.length : !1 : b == this.y && a >= this.x ? a < this.x + this.length : !1
        },
        forEach: function(a) {
            for (var b = 0, c = this.length; b < c; ) {
                var d = b++;
                3 == this.angle ? a(this.x, this.y - d) : 2 == this.angle ? a(this.x - d, this.y) : 1 == this.angle ? a(this.x, this.y + d) : a(this.x + d, this.y)
            }
        },
        __class__: Va
    };
    var J = function() {
        this.lastStep = -1;
        this.step = 0;
        this.touchingOld = [];
        this.touching = [];
        this.onRamp = this.dead = this.finished = !1;
        this.lastStuck = -1;
        this.rotateAdjust = 0;
        this.jumpTimer = this.jumpTimer2 = this.rotateTimer = -1;
        this.grounded = !1;
        this.x2 = this.y2 = this.lastX = this.lastY = this.dx = this.dy = this.horizontal = 0;
        ua.call(this, Images.player, 32, 48);
        this.set_animation(J.ANIM_IDLE);
        this.onChange = T(this, this.aminChange);
        this.spawnTime = GameInstance.i.get_gameTimeMS();
        this.adjust()
    };
    J.__name__ = !0;
    J.__super__ = ua;
    J.prototype = __INHERIT__(ua.prototype, {
        get_localX: function() {
            return 0 == l.rotation ? this.x2 : 1 == l.rotation ? l.get_height() - this.y2 : 2 == l.rotation ? l.get_width() - this.x2 : this.y2
        },
        set_localX: function(a) {
            0 == l.rotation ? this.x2 = a : 1 == l.rotation ? this.y2 = l.get_height() - a : 2 == l.rotation ? this.x2 = l.get_width() - a : 3 == l.rotation && (this.y2 = a);
            return a
        },
        get_localY: function() {
            return 0 == l.rotation ? this.y2 : 1 == l.rotation ? this.x2 : 2 == l.rotation ? l.get_height() - this.y2 : l.get_width() - this.x2
        },
        set_localY: function(a) {
            0 == l.rotation ? this.y2 = a : 1 == l.rotation ? this.x2 = a : 2 == l.rotation ? this.y2 = l.get_height() - a : 3 == l.rotation && (this.x2 = l.get_width() - a);
            return a
        },
        aminChange: function(a) {
            this.animation == J.ANIM_RUN && 0 == a && 100 < GameInstance.i.get_gameTimeMS() - this.lastStep && (GameInstance.ie && GameInstance.i.muteSFX || Sounds.steps.play(0 == this.step ? "a" : "b"),
            this.lastStep = GameInstance.i.get_gameTimeMS(),
            this.step = 0 == this.step ? 1 : 0)
        },
        adjust: function() {
            this.origin.x = this.frameW / 2;
            this.origin.y = this.frameH - (l.rotating ? Constants.rotateOffset : 0)
        },
        update: function() {
            if (!l.rotating && !this.dead && (this.horizontal = this.finished ? 0 : GameInstance.getInputX(),
            0 != this.horizontal ? this.set_scaleX(0 < this.horizontal ? 1 : -1) : this.grounded && this.animation != J.ANIM_IDLE && this.set_animation(J.ANIM_IDLE),
            !this.finished && (G.keyPressed(40) || G.keyPressed(83)))) {
                for (var a = 0, b = this.touching; a < b.length; ) {
                    var c = b[a];
                    ++a;
                    c.get_block().onInteract(c)
                }
                this.touchingFinish() && (this.finished = !0,
                GameInstance.ie && GameInstance.i.muteSFX || Sounds.exit.play(),
                GameInstance.i.currentScreen.finished())
            }
        },
        touchingFinish: function() {
            return l.rotating || this.dead || this.finished || !this.grounded || 0 != l.rotation || Math.floor(this.x2 / Constants.tileSize) != l.level.finishCol ? !1 : Math.floor(this.y2 / Constants.tileSize) == l.level.finishRow + 1
        },
        tick: function() {
            if (!l.rotating && !this.dead) {
                null == this.lastBounds && (this.lastBounds = this.getHitBounds());
                var a = J.SPEED * (this.onRamp ? J.RAMP_MULT : 1);
                0 < this.horizontal ? this.dx < a ? this.dx < -J.ACCEL ? this.dx *= J.DECCEL_MULT : (this.dx += J.ACCEL,
                this.dx > a && (this.dx = a)) : this.dx > a && (this.dx = a) : 0 > this.horizontal ? this.dx > -a ? this.dx > J.ACCEL ? this.dx *= J.DECCEL_MULT : (this.dx -= J.ACCEL,
                this.dx < -a && (this.dx = -a)) : this.dx < -a && (this.dx = -a) : this.dx *= J.DECCEL_MULT;
                !this.finished && this.grounded && this.jumpKeyDown() && GameInstance.i.get_gameTime() - this.jumpTimer >= J.JUMP_DELAY && GameInstance.i.get_gameTime() - this.jumpTimer2 >= J.JUMP_DELAY_2 ? (this.dy = -J.JUMP_SPEED,
                this.jumpTimer = GameInstance.i.get_gameTime(),
                GameInstance.ie && GameInstance.i.muteSFX || Sounds.steps.play("a"),
                this.lastStep = GameInstance.i.get_gameTimeMS()) : this.dy < J.GRAVITY_MAX && (this.dy += J.GRAVITY,
                this.dy > J.GRAVITY_MAX && (this.dy = J.GRAVITY_MAX));
                a = this.grounded;
                this.onRamp = this.grounded = !1;
                for (var b = this.dx, c = this.dy, d = this.get_localX() - Math.floor(this.get_localX()), e = this.get_localY() - Math.floor(this.get_localY()), f = this.get_localX(), m = this.get_localY(), k, p = this.get_localY() + this.dy; 0 != b || 0 != c; )
                    if (0 != c && (0 < c ? 0 < e && c >= 1 - e ? (k = 1 - e,
                    e = 0) : k = 1 < c ? 1 : c : 0 < e && c <= -e ? (k = -e,
                    e = 0) : k = -1 > c ? -1 : c,
                    this.set_localY(this.get_localY() + k),
                    c -= k,
                    this.isColliding(null, null, 1) && (this.set_localY(m),
                    c = this.dy = 0),
                    m = this.get_localY()),
                    0 != b) {
                        0 < b ? 0 < d && b >= 1 - d ? (k = 1 - d,
                        d = 0) : k = 1 < b ? 1 : b : 0 < d && b <= -d ? (k = -d,
                        d = 0) : k = -1 > b ? -1 : b;
                        this.set_localX(this.get_localX() + k);
                        b -= k;
                        if (this.isColliding(null, T(this, this.rampCheckDX), 0))
                            if (k = 0,
                            this.set_localY(this.get_localY() - e),
                            this.isColliding(null, T(this, this.nonRampCheckDX), 0))
                                this.set_localY(this.get_localY() + e);
                            else {
                                k -= e;
                                if (this.isColliding(null, T(this, this.rampCheckDX), 0)) {
                                    var y = this.get_localY();
                                    this.set_localY(y - 1);
                                    this.isColliding(null, T(this, this.nonRampCheckDX), 0) ? (y = this.get_localY(),
                                    this.set_localY(y + 1)) : this.isColliding(null, T(this, this.rampCheckDX), 0) ? (this.set_localY(m),
                                    k = 0) : --k
                                }
                                0 > k && (e = 0,
                                m += k,
                                p += k,
                                this.onRamp = !0)
                            }
                        this.isColliding(null, null, 0) && (this.set_localX(f),
                        b = this.dx = 0);
                        f = this.get_localX()
                    }
                this.get_localY() - p < -Constants.EPSILON && (this.grounded = !0);
                b = GameInstance.i.get_gameTimeMS();
                c = 0 <= this.lastStuck && 100 >= b - this.lastStuck;
                if (0 <= this.dy && !this.grounded) {
                    d = this.get_localY();
                    e = 2 + Math.ceil(Math.abs(1.25 * this.dx));
                    m = f = 0;
                    for (k = p = !1; !p && !k && m < e; ) {
                        f = 0 == m ? 1 - (this.get_localY() - Math.floor(this.get_localY())) : 1;
                        this.set_localY(Math.round(this.get_localY() + f));
                        m += f;
                        k = this.isColliding(null, T(this, this.nonRampCheck), 1);
                        if (!c && k)
                            break;
                        p = c && k ? !0 : this.isColliding(null, T(this, this.rampCheck), 1)
                    }
                    p ? (this.set_localY(this.get_localY() - f),
                    this.grounded = !0,
                    this.dy = 0,
                    k || (this.lastStuck = b,
                    this.onRamp = !0)) : this.set_localY(d)
                }
                this.updateTouching();
                this.grounded && !a && (100 < GameInstance.i.get_gameTimeMS() - this.spawnTime && (GameInstance.ie && GameInstance.i.muteSFX || Sounds.steps.play("b"),
                this.lastStep = GameInstance.i.get_gameTimeMS()),
                this.jumpTimer2 = GameInstance.i.get_gameTime());
                this.grounded ? 0 != this.horizontal && .75 < Math.abs(this.dx) ? this.set_animation(J.ANIM_RUN) : this.set_animation(J.ANIM_IDLE) : l.rotating || (0 <= this.dy ? this.set_animation(J.ANIM_FALL) : this.set_animation(J.ANIM_JUMP));
                this.lastX = this.x2;
                this.lastY = this.y2;
                this.lastBounds = this.getHitBounds()
            }
            this.set_x(Math.round(this.x2));
            this.set_y(Math.round(this.y2))
        },
        postUpdate: function() {
            this.set_x(Math.round(this.x2));
            this.set_y(Math.round(this.y2))
        },
        getHitBounds: function(a, b, c, d, e) {
            null == e && (e = !1);
            null == d && (d = 0);
            null == c && (c = 0);
            null == b && (b = 0);
            null == a && (a = !0);
            if (a)
                b = this.x2,
                c = this.y2,
                d = l.rotation;
            else {
                for (; 0 > d; )
                    d += 4;
                for (; 3 < d; )
                    d -= 4
            }
            var f = 0 == d || 2 == d
              , m = f ? J.HIT_W : J.HIT_H;
            f = f ? J.HIT_H : J.HIT_W;
            a = a && l.rotating || !a && e ? Constants.rotateOffset : 0;
            return 3 == d ? new Rectangle(b - a,c - f / 2,m,f) : 2 == d ? new Rectangle(b - m / 2,c - a,m,f) : 1 == d ? new Rectangle(b - m + a,c - f / 2,m,f) : new Rectangle(b - m / 2,c - f + a,m,f)
        },
        rampCheck: function(a) {
            return ES3ClassUtils.__instanceof(a, Wa) ? (0 != l.rotation || 0 != a.dir && 1 != a.dir) && (1 != l.rotation || 3 != a.dir && 0 != a.dir) && (2 != l.rotation || 2 != a.dir && 3 != a.dir) ? 3 == l.rotation ? 1 != a.dir ? 2 == a.dir : !0 : !1 : !0 : !1
        },
        nonRampCheck: function(a) {
            return !this.rampCheck(a)
        },
        rampCheckDX: function(a) {
            return ES3ClassUtils.__instanceof(a, Wa) ? 0 == l.rotation && (0 < this.dx && 0 == a.dir || 0 > this.dx && 1 == a.dir) || 1 == l.rotation && (0 < this.dx && 3 == a.dir || 0 > this.dx && 0 == a.dir) || 2 == l.rotation && (0 < this.dx && 2 == a.dir || 0 > this.dx && 3 == a.dir) ? !0 : 3 == l.rotation ? 0 < this.dx && 1 == a.dir ? !0 : 0 > this.dx ? 2 == a.dir : !1 : !1 : !1
        },
        nonRampCheckDX: function(a) {
            return !this.rampCheckDX(a)
        },
        isColliding: function(a, b, c) {
            null == c && (c = -1);
            a = null == a ? this.getHitBounds() : a;
            var d = GameInstance.quantize(a.get_left())
              , e = GameInstance.quantize(a.get_right() - Constants.EPSILON)
              , f = GameInstance.quantize(a.get_top())
              , m = GameInstance.quantize(a.get_bottom() - Constants.EPSILON);
            for (m += 1; f < m; )
                for (var k = f++, p = d, y = e + 1; p < y; ) {
                    var H = p++;
                    if (!l.isInBounds(H, k))
                        return !0;
                    var K = l.getBlockData(H, k)
                      , W = K.get_block();
                    if (null != W && W.collides(K) && !W.isTrigger(K) && this.testBlockCollision(a, H, k, b, c))
                        return !0
                }
            return !1
        },
        updateTouching: function() {
            this.touchingOld = this.touching;
            this.touching = [];
            var a = this.getHitBounds()
              , b = GameInstance.quantize(a.get_left())
              , c = GameInstance.quantize(a.get_right() - Constants.EPSILON)
              , d = GameInstance.quantize(a.get_top())
              , e = GameInstance.quantize(a.get_bottom() - Constants.EPSILON);
            for (e += 1; d < e; )
                for (var f = d++, m = b, k = c + 1; m < k; ) {
                    var p = m++
                      , y = l.getBlockData(p, f)
                      , H = y.get_block();
                    if (null != H && H.collides(y) && this.testBlockCollision(a, p, f) && -1 == this.touching.indexOf(y) && (this.touching.push(y),
                    -1 == this.touchingOld.indexOf(y) && H.isTrigger(y) && !H.onTrigger(y)))
                        return
                }
        },
        testBlockCollision: function(a, b, c, d, e) {
            null == e && (e = -1);
            var f = l.getBlockData(b, c);
            f = f.get_block().getColliders(f);
            for (var m = 0; m < f.length; ) {
                var k = f[m];
                ++m;
                if (null != k && (null == d || d(k)))
                    if (ES3ClassUtils.__instanceof(k, La)) {
                        if (k = k.bounds.copy(),
                        k.x += b * Constants.tileSize,
                        k.y += c * Constants.tileSize,
                        a.intersects(k))
                            return !0
                    } else if (ES3ClassUtils.__instanceof(k, Wa)) {
                        var p = new Vector2(a.get_right(),a.get_bottom());
                        1 == k.dir && (p = new Vector2(a.get_left(),a.get_bottom()));
                        2 == k.dir && (p = new Vector2(a.get_left(),a.get_top()));
                        3 == k.dir && (p = new Vector2(a.get_right(),a.get_top()));
                        p.x -= b * Constants.tileSize;
                        p.y -= c * Constants.tileSize;
                        if (k.testPoint(p))
                            return !0
                    } else if (ES3ClassUtils.__instanceof(k, jb)) {
                        if (p = k.bounds.copy(),
                        p.x += b * Constants.tileSize,
                        p.y += c * Constants.tileSize,
                        a.intersects(p)) {
                            var y = 1 == l.rotation || 3 == l.rotation
                              , H = 0 == l.rotation || 2 == l.rotation
                              , K = -1 == e || 0 == e
                              , W = -1 == e || 1 == e
                              , aa = H && K || y && W;
                            if (H && W || y && K)
                                if (0 == k.dir && this.lastBounds.get_bottom() <= p.get_top() || 2 == k.dir && this.lastBounds.get_top() >= p.get_bottom())
                                    return !0;
                            if (aa && (1 == k.dir && this.lastBounds.get_left() >= p.get_right() || 3 == k.dir && this.lastBounds.get_right() <= p.get_left()))
                                return !0
                        }
                    } else if (ES3ClassUtils.__instanceof(k, kb) && (p = k,
                    k = Constants.tileSize,
                    y = a.copy(),
                    y.x -= b * k,
                    y.y -= c * k,
                    p = new Vector2(0 == p.dir || 3 == p.dir ? k : 0,0 == p.dir || 1 == p.dir ? k : 0),
                    this.testAABBCircle(new Rectangle(a.x - b * k,a.y - c * k,a.width,a.height), p, k)))
                        return !0
            }
            return !1
        },
        testAABBCircle: function(a, b, c) {
            return (new Rectangle(a.x,a.y - c,a.width,a.height + 2 * c)).contains(b) || (new Rectangle(a.x - c,a.y,a.width + 2 * c,a.height)).contains(b) || Vector2.distance(b, new Vector2(a.get_left(),a.get_top())) < c || Vector2.distance(b, new Vector2(a.get_right(),a.get_top())) < c || Vector2.distance(b, new Vector2(a.get_right(),a.get_bottom())) < c ? !0 : Vector2.distance(b, new Vector2(a.get_left(),a.get_bottom())) < c
        },
        jumpKeyDown: function() {
            return G.keyDown(38) || G.keyDown(87) ? !0 : G.keyDown(32)
        },
        canRotate: function(a) {
            if (!this.grounded || this.jumpKeyDown() || GameInstance.i.get_gameTime() - this.rotateTimer < J.ROTATE_DELAY + Constants.rotateTime || GameInstance.i.get_gameTime() - this.jumpTimer2 < J.JUMP_DELAY_2)
                return !1;
            var b = this.x2
              , c = this.y2;
            this.set_localY(this.get_localY() - Constants.rotateOffset);
            var d = l.rotation
              , e = l;
            e.set_rotation(e.rotation + a);
            l.rotating = !0;
            a = 0;
            for (e = this.isColliding(); e && a < Constants.rotateOffset; )
                e = this.get_localY(),
                this.set_localY(e - 1),
                ++a,
                e = this.isColliding(null, null, 1);
            this.rotateAdjust = a;
            l.set_rotation(d);
            l.rotating = !1;
            this.x2 = b;
            this.y2 = c;
            return !e
        },
        onRotateStart: function(a) {
            this.set_localY(this.get_localY() - Constants.rotateOffset);
            this.set_scaleX(a);
            this.adjust();
            this.set_animation(J.ANIM_ROTATE);
            this.rotateTimer = GameInstance.i.get_gameTime();
            GameInstance.ie && GameInstance.i.muteSFX || Sounds.steps.play("a");
            this.lastStep = GameInstance.i.get_gameTimeMS();
            GameInstance.ie && GameInstance.i.muteSFX || Sounds.rotate.play()
        },
        onRotateStart2: function() {
            this.rotStartY = this.get_localY()
        },
        onRotating: function(a) {
            this.set_localY(this.rotStartY - this.rotateAdjust * a)
        },
        onRotateEnd: function() {
            this.dx = this.dy = 0;
            this.grounded = !1;
            this.set_localY(this.rotStartY - this.rotateAdjust + Constants.rotateOffset);
            this.adjust()
        },
        __class__: J
    });
    var l = function() {};
    l.__name__ = !0;
    l.set_level = function(a) {
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
                    l.tiles[d][m] = a.tiles[d][m].slice(0)
                }
            }
            l.updateQueue = new Ra;
            b = 0;
            for (c = l.get_height(); b < c; )
                for (d = b++,
                e = 0,
                f = l.get_width(); e < f; ) {
                    var k = e++;
                    m = l.getBlockData(k, d);
                    if (null == m.get_block() || 0 > m.id)
                        l.tiles[d][k] = [0];
                    else if (m.get_block().alwaysUpdate(m)) {
                        var p = l.updateQueue;
                        k = k + "x" + d;
                        null != na[k] ? p.setReserved(k, m) : p.h[k] = m
                    }
                }
        } else
            l.level = null;
        return a
    }
    ;
    l.set_rotation = function(a) {
        for (; 0 > a; )
            a += 4;
        for (; 3 < a; )
            a -= 4;
        l.rotation = a;
        return l.rotation
    }
    ;
    l.get_height = function() {
        return null != l.level ? l.tiles.length : 0
    }
    ;
    l.get_width = function() {
        return null != l.level ? l.tiles[0].length : 0
    }
    ;
    l.isInBounds = function(a, b) {
        return null != l.level && 0 <= a && 0 <= b && a < l.get_width() ? b < l.get_height() : !1
    }
    ;
    l.getBlockID = function(a, b) {
        return l.isInBounds(a, b) ? l.tiles[b][a][0] : 1
    }
    ;
    l.getBlockMeta = function(a, b) {
        return !l.isInBounds(a, b) || 2 > l.tiles[b][a].length ? [] : l.tiles[b][a].slice(1)
    }
    ;
    l.getBlockData = function(a, b) {
        return new wb(a,b,l.getBlockID(a, b),l.getBlockMeta(a, b))
    }
    ;
    l.getBlock = function(a, b) {
        return EditorTiles.getBlock(l.getBlockID(a, b))
    }
    ;
    l.setBlock = function(a, b, c, d, e) {
        null == e && (e = !1);
        if (l.isInBounds(a, b)) {
            var f = a + "x" + b
              , m = l.updateQueue;
            (null != na[f] ? m.existsReserved(f) : m.h.hasOwnProperty(f)) && l.updateQueue.remove(f);
            l.tiles[b][a] = [c];
            null != d && (l.tiles[b][a] = l.tiles[b][a].concat(d));
            e && (l.level.tiles[b][a] = l.tiles[b][a].slice(0));
            a = l.getBlockData(a, b);
            EditorTiles.getBlock(c).alwaysUpdate(a) && (c = l.updateQueue,
            null != na[f] ? c.setReserved(f, a) : c.h[f] = a)
        }
    }
    ;
    l.setBlockMeta = function(a, b, c, d) {
        null == d && (d = !1);
        l.isInBounds(a, b) && (l.tiles[b][a] = [l.tiles[b][a][0]],
        null != c && (l.tiles[b][a] = l.tiles[b][a].concat(c)),
        d && (l.level.tiles[b][a] = l.tiles[b][a].slice(0)),
        c = a + "x" + b,
        d = l.updateQueue,
        null != na[c] ? d.existsReserved(c) : d.h.hasOwnProperty(c)) && (d = l.updateQueue,
        a = l.getBlockData(a, b),
        null != na[c] ? d.setReserved(c, a) : d.h[c] = a)
    }
    ;
    l.isReplacable = function(a, b) {
        return a != l.level.startCol || b != l.level.startRow && b != l.level.startRow - 1 ? a == l.level.finishCol ? b != l.level.finishRow ? b != l.level.finishRow - 1 : !1 : !0 : !1
    }
    ;
    l.onPlay = function() {
        if (null != l.level) {
            l.leversChanged = new hb;
            for (var a = 0, b = l.tiles.length; a < b; )
                for (var c = a++, d = 0, e = l.tiles[c].length; d < e; ) {
                    var f = d++;
                    f = l.getBlockData(f, c);
                    if (null != f.get_block())
                        f.get_block().onPlay(f)
                }
        }
    }
    ;
    var L = function(a) {
        this.showGrid = !1;
        var b = this;
        GraphicsObject.call(this);
        if (null == L.bakeCanvas) {
            L.bakeCanvas = window.document.createElement("canvas");
            L.bakeCtx = L.bakeCanvas.getContext("2d", null);
            var c = L.bakeCtx;
            c.webkitImageSmoothingEnabled = c.mozImageSmoothingEnabled = c.msImageSmoothingEnabled = c.oImageSmoothingEnabled = c.imageSmoothingEnabled = !1;
            L.bakeSurface = new Ea(L.bakeCtx)
        }
        c = l.get_width() + 2;
        L.bakeCanvas.width = c * Constants.tileSize;
        c = l.get_height() + 2;
        L.bakeCanvas.height = c * Constants.tileSize;
        L.bakeSurface.reset();
        L.bakeSurface.clearRect(0, 0, L.bakeCanvas.width, L.bakeCanvas.height);
        if (null == L.gridCanvas && ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel)) {
            L.gridCanvas = window.document.createElement("canvas");
            L.gridCanvas.width = EditorLevel.editorLevel.tiles[0].length * Constants.tileSize + 2;
            L.gridCanvas.height = EditorLevel.editorLevel.tiles.length * Constants.tileSize + 2;
            L.gridCtx = L.gridCanvas.getContext("2d", null);
            L.gridSurface = new Ea(L.gridCtx);
            L.gridSurface.beginFill(2105376, .2);
            c = 0;
            for (var d = EditorLevel.editorLevel.tiles.length + 1; c < d; )
                for (var e = c++, f = 0, m = EditorLevel.editorLevel.tiles[0].length + 1; f < m; ) {
                    var k = f++ * Constants.tileSize
                      , p = e * Constants.tileSize;
                    L.gridSurface.drawRect(k, p, 2, Constants.tileSize);
                    L.gridSurface.drawRect(k + 2, p, Constants.tileSize - 2, 2)
                }
        }
        this.addEventListener("render", function(y) {
            b.render(y.surface, a)
        })
    };
    L.__name__ = !0;
    L.__super__ = GraphicsObject;
    L.prototype = __INHERIT__(GraphicsObject.prototype, {
        render: function(a, b) {
            if (null != l.level) {
                a.drawImage(L.bakeCanvas, null, -Constants.tileSize, -Constants.tileSize);
                var c = null;
                if (!l.rotating) {
                    c = l.rotation;
                    c = b.globalToLocal(1 == c || 2 == c ? h.width : 0, 2 == c || 3 == c ? h.height : 0);
                    var d = Math.floor(c.x / Constants.tileSize)
                      , e = Math.floor((c.x + h.width - Constants.EPSILON) / Constants.tileSize)
                      , f = Math.floor(c.y / Constants.tileSize)
                      , m = Math.floor((c.y + h.height - Constants.EPSILON) / Constants.tileSize);
                    c = function(fa, ka) {
                        return fa >= d && ka >= f && fa <= e ? ka <= m : !1
                    }
                }
                var k = l.updateQueue;
                for (k = new fc(k,k.arrayKeys()); k.hasNext(); ) {
                    var p = k.next()
                      , y = l.rotating;
                    if (!y)
                        if (p.get_block() == EditorTiles.door)
                            for (var H = p.getMeta(1), K = p.getMeta(2), W = 0; W < H; ) {
                                var aa = W++;
                                if (c(3 == K || 1 == K ? p.x : 2 == K ? p.x - aa : p.x + aa, 2 == K || 0 == K ? p.y : 3 == K ? p.y - aa : p.y + aa)) {
                                    y = !0;
                                    break
                                }
                            }
                        else
                            y = c(p.x, p.y);
                    y && (a.translate(p.x * Constants.tileSize, p.y * Constants.tileSize),
                    p.get_block().render(a, p),
                    a.translate(-p.x * Constants.tileSize, -p.y * Constants.tileSize))
                }
                this.showGrid && null != L.gridCanvas && a.drawImage(L.gridCanvas, null, 0, 0);
                if (ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && (c = GameInstance.i.currentScreen,
                !l.rotating && !c.player.dead && !c.player.finished)) {
                    k = 0;
                    for (p = c.player.touching; k < p.length; )
                        y = p[k],
                        ++k,
                        y.get_block().showArrow(y) && this.renderArrow(a, y.x, y.y);
                    c.player.touchingFinish() && this.renderArrow(a, l.level.finishCol, l.level.finishRow - 1, -4)
                }
            }
        },
        renderArrow: function(a, b, c, d) {
            null == d && (d = 0);
            var e = Constants.tileSize;
            a.translate((b + .5) * e, (c + .5) * e);
            a.rotate(-l.rotation * Math.PI / 2);
            a.drawImage(Images.interact, null, -Images.interact.width / 2, Math.round(-e / 2 - Images.interact.height + 2 * Math.sin(8 * GameInstance.i.get_gameTime())) + d);
            a.rotate(l.rotation * Math.PI / 2);
            a.translate(-(b + .5) * e, -(c + .5) * e)
        },
        updateAllBlocks: function() {
            L.bakeSurface.setTransform(1, 0, 0, 1, 0, 0);
            L.bakeSurface.clearRect(0, 0, L.bakeCanvas.width, L.bakeCanvas.height);
            if (null != l.level) {
                for (var a = 1 == l.level.theme ? Images.bgBricks : Images.bgTiles, b = Math.ceil(L.bakeCanvas.width / a.width), c = 0, d = Math.ceil(L.bakeCanvas.height / a.height); c < d; )
                    for (var e = c++, f = 0, m = b; f < m; ) {
                        var k = f++;
                        L.bakeSurface.drawImage(a, null, k * a.width, e * a.height)
                    }
                this.renderDecals();
                a = -1;
                for (b = l.get_height() + 1; a < b; )
                    for (c = a++,
                    d = -1,
                    e = l.get_width() + 1; d < e; )
                        f = d++,
                        m = l.getBlockData(f, c),
                        k = m.get_block(),
                        null != k && k.shouldRender(m) && !k.alwaysUpdate(m) && (L.bakeSurface.translate((f + 1) * Constants.tileSize, (c + 1) * Constants.tileSize),
                        k.render(L.bakeSurface, m),
                        L.bakeSurface.translate(-(f + 1) * Constants.tileSize, -(c + 1) * Constants.tileSize))
            }
        },
        updateBlockPlus: function(a, b, c) {
            null == c && (c = !1);
            L.bakeSurface.setTransform(1, 0, 0, 1, 0, 0);
            L.bakeSurface.clearRect(a * Constants.tileSize, b * Constants.tileSize, 3 * Constants.tileSize, 3 * Constants.tileSize);
            for (var d = b - 1, e = b + 2; d < e; )
                for (var f = d++, m = a - 1, k = a + 2; m < k; ) {
                    var p = m++;
                    if (!c || p != a || f != b) {
                        var y = l.getBlockData(p, f)
                          , H = y.get_block();
                        if (null != H) {
                            L.bakeSurface.translate((p + 1) * Constants.tileSize, (f + 1) * Constants.tileSize);
                            var K = 1 == l.level.theme ? Images.bgBricks : Images.bgTiles;
                            L.bakeSurface.drawImage(K, new Rectangle((p + 1) * Constants.tileSize % K.width,(f + 1) * Constants.tileSize % K.height,Constants.tileSize,Constants.tileSize), 0, 0);
                            H.shouldRender(y) && !H.alwaysUpdate(y) && H.render(L.bakeSurface, y);
                            L.bakeSurface.translate(-(p + 1) * Constants.tileSize, -(f + 1) * Constants.tileSize)
                        }
                    }
                }
            this.renderDecals()
        },
        renderDecals: function() {
            var a = Constants.tileSize;
            L.bakeSurface.drawImage(Images.blocks, new Rectangle(a,2 * a,a,2 * a), (l.level.startCol + 1) * a, l.level.startRow * a);
            L.bakeSurface.drawImage(Images.blocks, new Rectangle(2 * a,2 * a,a,2 * a), (l.level.finishCol + 1) * a, l.level.finishRow * a);
            ES3ClassUtils.__instanceof(l.level, Level8) && L.bakeSurface.drawImage(Images.blocks, new Rectangle(2 * a,2 * a,a,2 * a), (Level8.fakeCol + 1) * a, Level8.fakeRow * a)
        },
        getBoundsSelf: function() {
            return new Rectangle(0,0,l.get_width() * Constants.tileSize,l.get_height() * Constants.tileSize)
        },
        __class__: L
    });
    var X = function() {
        this.bubbleHeight = 46;
        this.bubbleWidth = 124;
        this.configurable = !1
    };
    X.__name__ = !0;
    X.prototype = {
        shouldRender: function(a) {
            return !0
        },
        render: function(a, b, c) {},
        collides: function(a) {
            return !0
        },
        isTrigger: function(a) {
            return !1
        },
        getColliders: function(a) {
            return [new La(new Rectangle(0,0,Constants.tileSize,Constants.tileSize))]
        },
        onTrigger: function(a) {
            return !0
        },
        setupBubble: function(a) {},
        getConfigMeta: function() {
            return []
        },
        alwaysUpdate: function(a) {
            return !1
        },
        onPlay: function(a) {},
        rotatePreview: function() {
            return !0
        },
        showArrow: function(a) {
            return !1
        },
        onInteract: function(a) {},
        __class__: X
    };
    var TileAir = function() {
        X.call(this)
    };
    TileAir.__name__ = !0;
    TileAir.__super__ = X;
    TileAir.prototype = __INHERIT__(X.prototype, {
        collides: function(a) {
            return !1
        },
        shouldRender: function(a) {
            return !1
        },
        __class__: TileAir
    });
    var yb = function() {
        this.angle = 0;
        this.length = 3;
        this.channel = 0;
        X.call(this);
        this.bubbleWidth = 148;
        this.bubbleHeight = 106;
        this.configurable = !0
    };
    yb.__name__ = !0;
    yb.__super__ = X;
    yb.prototype = __INHERIT__(X.prototype, {
        set_angle: function(a) {
            return this.angle = 0 > a ? 3 : 3 < a ? 0 : a
        },
        collides: function(a) {
            var b = this.isOpen(a);
            !b && this.isStuck(a) && GameplayLevel.i.killPlayer();
            return !b
        },
        alwaysUpdate: function(a) {
            return !0
        },
        render: function(a, b, c) {
            null == c && (c = !0);
            var d = b.getMeta(1);
            if (!(0 >= d)) {
                var e = b.getMeta(2)
                  , f = Constants.tileSize;
                a.translate(f / 2, f / 2);
                a.rotate(e * Math.PI / 2);
                a.translate(-f / 2, -f / 2);
                if (c) {
                    var m = this.isOpen(b)
                      , k = .5 * d - .16666666666666666;
                    c = m ? 0 : k;
                    if (ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel)) {
                        var p = GameplayLevel.i.channels
                          , y = b.getMeta(0);
                        p = p.h[y];
                        null != p && (c = Math.min(1, (GameInstance.i.get_gameTime() - p.lastChanged) / Constants.doorSlideTime),
                        c = GameInstance.smootherStep(c),
                        c = m ? (1 - c) * k : c * k)
                    }
                    m = c;
                    for (k = 0; 0 < m; )
                        p = 1 < m ? 1 : m,
                        a.drawImage(Images.blocks, new Rectangle(3 * f,3 * f,p * f,f), k, 0),
                        a.drawImage(Images.blocks, new Rectangle((4 - p) * f,3 * f,p * f,f), d * f - k - p * f, 0),
                        m -= p,
                        k += p * f;
                    a.drawImage(Images.blocks, new Rectangle(4 * f,3 * f,f,f), c * f, 0);
                    a.drawImage(Images.blocks, new Rectangle(5 * f,3 * f,f,f), (d - c - 1) * f, 0);
                    if (ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel) && (EditorLevel.renderBlockText(a, b.getMeta(0) + ""),
                    1 < d))
                        for (b = 1; b < d; )
                            c = b++,
                            EditorLevel.renderBlockRed(a, c * f, 0)
                } else
                    a.drawImage(Images.blocks, new Rectangle(3 * f,3 * f,.33333333333333337 * f,f), 0, 0),
                    a.drawImage(Images.blocks, new Rectangle(4 * f,3 * f,f,f), .33333333333333337 * f, 0),
                    a.drawImage(Images.blocks, new Rectangle(5 * f,3 * f,f,f), -.33333333333333337 * f, 0),
                    a.drawImage(Images.blocks, new Rectangle(3.6666666666666665 * f,3 * f,.33333333333333337 * f,f), .6666666666666666 * f, 0);
                a.translate(f / 2, f / 2);
                a.rotate(-e * Math.PI / 2);
                a.translate(-f / 2, -f / 2)
            }
        },
        isOpen: function(a) {
            return ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && GameplayLevel.i.getChannelStatus(a.getMeta(0)) ? !0 : !1
        },
        isStuck: function(a) {
            for (var b = 0, c = GameplayLevel.i.player.touching; b < c.length; ) {
                var d = c[b];
                ++b;
                if (d.get_block() == this && d.getMeta(0) == a.getMeta(0))
                    return !0
            }
            return !1
        },
        setupBubble: function(a) {
            var b = this
              , c = new GraphicsObjectText(GameInstance.fontMain,"Channel");
            c.set_x(8);
            c.set_y(8);
            a.addChild(c);
            var d = new GraphicsObjectText(GameInstance.fontMain,this.channel + "");
            d.align = GraphicsObjectText.ALIGN_CENTER;
            d.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            d.set_x(this.bubbleWidth - 31);
            d.set_y(c.y);
            a.addChild(d);
            var e = new ImageSurface(Images.configArrow);
            e.mouseEnabled = e.buttonMode = !0;
            e.addEventListener("mouseDown", function(p) {
                1 < p.which || (b.channel = 99 <= b.channel ? 0 : b.channel + 1,
                d.set_text(b.channel + ""))
            });
            e.set_x(d.x + 11);
            e.set_y(d.y + 4);
            a.addChild(e);
            var f = new ImageSurface(Images.configArrow);
            f.mouseEnabled = f.buttonMode = !0;
            f.addEventListener("mouseDown", function(p) {
                1 < p.which || (b.channel = 0 >= b.channel ? 99 : b.channel - 1,
                d.set_text(b.channel + ""))
            });
            f.set_scaleX(-1);
            f.set_x(d.x - 11);
            f.set_y(e.y);
            a.addChild(f);
            e = new GraphicsObjectText(GameInstance.fontMain,"Length");
            e.set_x(16);
            e.set_y(c.y + 30);
            a.addChild(e);
            var m = new GraphicsObjectText(GameInstance.fontMain,this.length + "");
            m.align = GraphicsObjectText.ALIGN_CENTER;
            m.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            m.set_x(this.bubbleWidth - 31);
            m.set_y(e.y);
            a.addChild(m);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(p) {
                1 < p.which || (b.length = 9 <= b.length ? 1 : b.length + 1,
                m.set_text(b.length + ""))
            });
            c.set_x(m.x + 11);
            c.set_y(m.y + 4);
            a.addChild(c);
            f = new ImageSurface(Images.configArrow);
            f.mouseEnabled = f.buttonMode = !0;
            f.addEventListener("mouseDown", function(p) {
                1 < p.which || (b.length = 1 >= b.length ? 9 : b.length - 1,
                m.set_text(b.length + ""))
            });
            f.set_scaleX(-1);
            f.set_x(m.x - 11);
            f.set_y(c.y);
            a.addChild(f);
            c = new GraphicsObjectText(GameInstance.fontMain,"Angle");
            c.set_x(32);
            c.set_y(e.y + 30);
            a.addChild(c);
            var k = new GraphicsObjectText(GameInstance.fontMain,this.angle + "");
            k.align = GraphicsObjectText.ALIGN_CENTER;
            k.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            k.set_x(this.bubbleWidth - 31);
            k.set_y(c.y);
            a.addChild(k);
            e = new ImageSurface(Images.configArrow);
            e.mouseEnabled = e.buttonMode = !0;
            e.addEventListener("mouseDown", function(p) {
                1 < p.which || (b.set_angle(b.angle + 1),
                k.set_text(b.angle + ""))
            });
            e.set_x(k.x + 11);
            e.set_y(k.y + 4);
            a.addChild(e);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(p) {
                1 < p.which || (b.set_angle(b.angle - 1),
                k.set_text(b.angle + ""))
            });
            c.set_scaleX(-1);
            c.set_x(k.x - 11);
            c.set_y(e.y);
            a.addChild(c)
        },
        getConfigMeta: function() {
            return [this.channel, this.length, this.angle]
        },
        __class__: yb
    });
    var da = function() {
        this.angle = 0;
        X.call(this);
        this.configurable = !0
    };
    da.__name__ = !0;
    da.__super__ = X;
    da.prototype = __INHERIT__(X.prototype, {
        set_angle: function(a) {
            return this.angle = 0 > a ? 3 : 3 < a ? 0 : a
        },
        setupBubble: function(a) {
            var b = this
              , c = new GraphicsObjectText(GameInstance.fontMain,"Angle");
            c.set_x(8);
            c.set_y(8);
            a.addChild(c);
            var d = new GraphicsObjectText(GameInstance.fontMain,this.angle + "");
            d.align = GraphicsObjectText.ALIGN_CENTER;
            d.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            d.set_x(this.bubbleWidth - 31);
            d.set_y(c.y);
            a.addChild(d);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(e) {
                1 < e.which || (b.set_angle(b.angle + 1),
                d.set_text(b.angle + ""))
            });
            c.set_x(d.x + 11);
            c.set_y(12);
            a.addChild(c);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(e) {
                1 < e.which || (b.set_angle(b.angle - 1),
                d.set_text(b.angle + ""))
            });
            c.set_scaleX(-1);
            c.set_x(d.x - 11);
            c.set_y(12);
            a.addChild(c)
        },
        getConfigMeta: function() {
            return [this.angle]
        },
        renderRotated: function(a, b, c, d) {
            var e = Constants.tileSize
              , f = e / 2;
            a.translate(f, f);
            a.rotate(b.getMeta(0) * Math.PI / 2);
            a.drawImage(Images.blocks, new Rectangle(c,d,e,e), -f, -f);
            a.rotate(-b.getMeta(0) * Math.PI / 2);
            a.translate(-f, -f)
        },
        __class__: da
    });
    var zb = function() {
        da.call(this)
    };
    zb.__name__ = !0;
    zb.__super__ = da;
    zb.prototype = __INHERIT__(da.prototype, {
        alwaysUpdate: function(a) {
            return !0
        },
        collides: function(a) {
            return !1
        },
        render: function(a, b, c) {
            null == c && (c = !0);
            b = b.getMeta(0) % 4;
            c = !c || ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel) ? 0 : Math.floor(GameInstance.i.get_gameTimeMS() / 50) % 3;
            a.drawImage(Images.blocks, new Rectangle(((0 < b && 3 > b ? 1 : 0) + 2 * c) * Constants.tileSize,(5 + (1 < b ? 1 : 0)) * Constants.tileSize,Constants.tileSize,Constants.tileSize), 0, 0)
        },
        __class__: zb
    });
    var TileFinish = function() {
        X.call(this)
    };
    TileFinish.__name__ = !0;
    TileFinish.__super__ = X;
    TileFinish.prototype = __INHERIT__(X.prototype, {
        render: function(a, b, c) {
            a.drawImage(Images.blocks, new Rectangle(0,3 * Constants.tileSize,Constants.tileSize,Constants.tileSize), 0, 0)
        },
        shouldRender: function(a) {
            return !1
        },
        __class__: TileFinish
    });
    var Za = function() {
        this.on = !1;
        this.channel = 0;
        X.call(this);
        this.bubbleWidth = 148;
        this.bubbleHeight = 76;
        this.configurable = !0
    };
    Za.__name__ = !0;
    Za.__super__ = X;
    Za.prototype = __INHERIT__(X.prototype, {
        isTrigger: function(a) {
            return !0
        },
        showArrow: function(a) {
            return !0
        },
        onInteract: function(a) {
            var b = a.y * l.get_width() + a.x
              , c = l.leversChanged.h[b];
            if (!(null != c && GameInstance.i.get_gameTime() - c < Za.TOGGLE_TIMER)) {
                c = GameplayLevel.i.channels;
                var d = a.getMeta(0)
                  , e = c.h[d];
                d = null != e && e.get_status();
                (c = 1 > a.getMeta(1)) ? GameplayLevel.i.signalOn(a.x, a.y, a.getMeta(0)) : GameplayLevel.i.signalOff(a.x, a.y, a.getMeta(0));
                var f = l.leversChanged
                  , m = GameInstance.i.get_gameTime();
                f.h[b] = m;
                null == e && (b = GameplayLevel.i.channels,
                e = a.getMeta(0),
                e = b.h[e]);
                e = null != e && e.get_status();
                b = !1;
                if (d != e)
                    for (d = 0,
                    e = GameplayLevel.i.doors; d < e.length; )
                        if (f = e[d],
                        ++d,
                        f.channel == a.getMeta(0)) {
                            b = !0;
                            break
                        }
                c ? GameInstance.ie && GameInstance.i.muteSFX || Sounds.leverOn.play() : GameInstance.ie && GameInstance.i.muteSFX || Sounds.leverOff.play();
                !b || GameInstance.ie && GameInstance.i.muteSFX || Sounds.door.play();
                l.setBlockMeta(a.x, a.y, [a.getMeta(0), c ? 1 : 0])
            }
        },
        onPlay: function(a) {
            0 < a.getMeta(1) && GameplayLevel.i.signalOn(a.x, a.y, a.getMeta(0))
        },
        getColliders: function(a) {
            return [new La(new Rectangle(.15 * Constants.tileSize,.15 * Constants.tileSize,.7 * Constants.tileSize,.7 * Constants.tileSize))]
        },
        alwaysUpdate: function(a) {
            return !ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel)
        },
        render: function(a, b, c) {
            null == c && (c = !0);
            var d = 0 < b.getMeta(1);
            a.drawImage(Images.blocks, new Rectangle((d ? 4 : 3) * Constants.tileSize,2 * Constants.tileSize,Constants.tileSize,Constants.tileSize), 0, 0);
            c && ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel) && EditorLevel.renderBlockText(a, b.getMeta(0) + "")
        },
        setupBubble: function(a) {
            var b = this
              , c = new GraphicsObjectText(GameInstance.fontMain,"Channel");
            c.set_x(8);
            c.set_y(8);
            a.addChild(c);
            var d = new GraphicsObjectText(GameInstance.fontMain,this.channel + "");
            d.align = GraphicsObjectText.ALIGN_CENTER;
            d.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            d.set_x(this.bubbleWidth - 31);
            d.set_y(c.y);
            a.addChild(d);
            var e = new ImageSurface(Images.configArrow);
            e.mouseEnabled = e.buttonMode = !0;
            e.addEventListener("mouseDown", function(k) {
                1 < k.which || (b.channel = 98 < b.channel ? 0 : b.channel + 1,
                d.set_text(b.channel + ""))
            });
            e.set_x(d.x + 11);
            e.set_y(d.y + 4);
            a.addChild(e);
            var f = new ImageSurface(Images.configArrow);
            f.mouseEnabled = f.buttonMode = !0;
            f.addEventListener("mouseDown", function(k) {
                1 < k.which || (b.channel = 1 > b.channel ? 99 : b.channel - 1,
                d.set_text(b.channel + ""))
            });
            f.set_scaleX(-1);
            f.set_x(d.x - 11);
            f.set_y(e.y);
            a.addChild(f);
            e = new GraphicsObjectText(GameInstance.fontMain,"State");
            e.set_x(32);
            e.set_y(c.y + 30);
            a.addChild(e);
            var m = new GraphicsObjectText(GameInstance.fontMain,this.on ? "1" : "0");
            m.align = GraphicsObjectText.ALIGN_CENTER;
            m.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            m.set_x(this.bubbleWidth - 31);
            m.set_y(e.y);
            a.addChild(m);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(k) {
                1 < k.which || (b.on = !b.on,
                m.set_text(b.on ? "1" : "0"))
            });
            c.set_x(m.x + 11);
            c.set_y(m.y + 4);
            a.addChild(c);
            e = new ImageSurface(Images.configArrow);
            e.mouseEnabled = e.buttonMode = !0;
            e.addEventListener("mouseDown", function(k) {
                1 < k.which || (b.on = !b.on,
                m.set_text(b.on ? "1" : "0"))
            });
            e.set_scaleX(-1);
            e.set_x(m.x - 11);
            e.set_y(c.y);
            a.addChild(e)
        },
        getConfigMeta: function() {
            return [this.channel, this.on ? 1 : 0]
        },
        __class__: Za
    });
    var TileSolid = function() {
        X.call(this)
    };
    TileSolid.__name__ = !0;
    TileSolid.__super__ = X;
    TileSolid.prototype = __INHERIT__(X.prototype, {
        render: function(a, b, c) {
            null == c && (c = !0);
            var d = c && this.testCanSolidConnect(b.x - 1, b.y - 1, 0)
              , e = c && this.testCanSolidConnect(b.x, b.y - 1, 1)
              , f = c && this.testCanSolidConnect(b.x + 1, b.y - 1, 2)
              , m = c && this.testCanSolidConnect(b.x + 1, b.y, 3)
              , k = c && this.testCanSolidConnect(b.x + 1, b.y + 1, 4)
              , p = c && this.testCanSolidConnect(b.x, b.y + 1, 5)
              , y = c && this.testCanSolidConnect(b.x - 1, b.y + 1, 6);
            b = c && this.testCanSolidConnect(b.x - 1, b.y, 7);
            f = e || m ? m ? e ? f ? 0 : 1 : 2 : 3 : 4;
            y = p || b ? b ? p ? y ? 0 : 1 : 2 : 3 : 4;
            m = p || m ? m ? p ? k ? 0 : 1 : 2 : 3 : 4;
            k = Constants.tileSize;
            p = Constants.tileSize / 2;
            a.drawImage(Images.blocks, new Rectangle((e || b ? b ? e ? d ? 0 : 1 : 2 : 3 : 4) * k,0,p,p), 0, 0);
            a.drawImage(Images.blocks, new Rectangle(f * k + p,0,p,p), p, 0);
            a.drawImage(Images.blocks, new Rectangle(y * k,p,p,p), 0, p);
            a.drawImage(Images.blocks, new Rectangle(m * k + p,p,p,p), p, p)
        },
        testCanSolidConnect: function(a, b, c) {
            if (!l.isInBounds(a, b))
                return !0;
            a = l.getBlockData(a, b);
            b = a.get_block();
            if (ES3ClassUtils.__instanceof(b, TileSolid))
                return !0;
            a.getMeta(0);
            return !1
        },
        __class__: TileSolid
    });
    var Bb = function() {
        this.value = 1;
        X.call(this);
        this.configurable = !0
    };
    Bb.__name__ = !0;
    Bb.__super__ = TileSolid;
    Bb.prototype = __INHERIT__(TileSolid.prototype, {
        set_value: function(a) {
            return this.value = 0 > a ? 99 : 99 < a ? 0 : a
        },
        render: function(a, b, c) {
            null == c && (c = !0);
            c ? TileSolid.prototype.render.call(this, a, b, c) : a.drawImage(Images.blocks, new Rectangle(0,0,Constants.tileSize,Constants.tileSize), 0, 0, !1);
            b = b.getMeta(0);
            0 > b ? (a.drawImage(Images.blocks, new Rectangle(100,4 * Constants.tileSize,10,Constants.tileSize), 14, 0, !1),
            -1 == b && a.drawImage(Images.blocks, new Rectangle(110,4 * Constants.tileSize,10,Constants.tileSize), 0, 0, !1),
            -2 == b && a.drawImage(Images.blocks, new Rectangle(120,4 * Constants.tileSize,10,Constants.tileSize), 0, 0, !1)) : (a.drawImage(Images.blocks, new Rectangle(b % 10 * 10,4 * Constants.tileSize,10,Constants.tileSize), 14, 0, !1),
            a.drawImage(Images.blocks, new Rectangle(10 * Math.min(Math.floor(.1 * b), 9),4 * Constants.tileSize,10,Constants.tileSize), 0, 0, !1))
        },
        setupBubble: function(a) {
            var b = this
              , c = new GraphicsObjectText(GameInstance.fontMain,"Value");
            c.set_x(8);
            c.set_y(8);
            a.addChild(c);
            var d = new GraphicsObjectText(GameInstance.fontMain,this.value + "");
            d.align = GraphicsObjectText.ALIGN_CENTER;
            d.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            d.set_x(this.bubbleWidth - 31);
            d.set_y(c.y);
            a.addChild(d);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(e) {
                1 < e.which || (b.set_value(b.value + 1),
                d.set_text(b.value + ""))
            });
            c.set_x(d.x + 11);
            c.set_y(12);
            a.addChild(c);
            c = new ImageSurface(Images.configArrow);
            c.mouseEnabled = c.buttonMode = !0;
            c.addEventListener("mouseDown", function(e) {
                1 < e.which || (b.set_value(b.value - 1),
                d.set_text(b.value + ""))
            });
            c.set_scaleX(-1);
            c.set_x(d.x - 11);
            c.set_y(12);
            a.addChild(c)
        },
        getConfigMeta: function() {
            return [this.value]
        },
        __class__: Bb
    });
    var Cb = function() {
        da.call(this)
    };
    Cb.__name__ = !0;
    Cb.__super__ = da;
    Cb.prototype = __INHERIT__(da.prototype, {
        render: function(a, b, c) {
            this.renderRotated(a, b, 7 * Constants.tileSize, 0)
        },
        getColliders: function(a) {
            return [new jb(a.getMeta(0))]
        },
        __class__: Cb
    });
    var $a = function() {
        da.call(this)
    };
    $a.__name__ = !0;
    $a.__super__ = da;
    $a.prototype = __INHERIT__(da.prototype, {
        render: function(a, b, c) {
            this.renderRotated(a, b, 6 * Constants.tileSize, 0)
        },
        getColliders: function(a) {
            return [new Wa(a.getMeta(0))]
        },
        __class__: $a
    });
    var Db = function() {
        da.call(this)
    };
    Db.__name__ = !0;
    Db.__super__ = da;
    Db.prototype = __INHERIT__(da.prototype, {
        isTrigger: function(a) {
            return !0
        },
        render: function(a, b, c) {
            null == c && (c = !0);
            var d = GameInstance.i.get_gameTimeMS() / 40;
            c = !c || ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel) ? 0 : Math.floor(d - (d < Constants.EPSILON ? 0 : Constants.EPSILON)) % 3;
            this.renderRotated(a, b, (4 + c) * Constants.tileSize, Constants.tileSize)
        },
        getColliders: function(a) {
            return [new kb(a.getMeta(0))]
        },
        onTrigger: function(a) {
            GameplayLevel.i.killPlayer(!0);
            return !1
        },
        alwaysUpdate: function(a) {
            return !ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, EditorLevel)
        },
        __class__: Db
    });
    var Eb = function() {
        da.call(this)
    };
    Eb.__name__ = !0;
    Eb.__super__ = da;
    Eb.prototype = __INHERIT__(da.prototype, {
        isTrigger: function(a) {
            return !0
        },
        render: function(a, b, c) {
            null == c && (c = !0);
            this.renderRotated(a, b, (c ? Math.floor((b.x + b.y) % 4) : 0) * Constants.tileSize, Constants.tileSize)
        },
        getColliders: function(a) {
            var b = Constants.tileSize;
            var c = b / 2
              , d = .5 * b
              , e = (b - d) / 2;
            3 == a.getMeta(0) ? (a = new Rectangle(0,e,c,d),
            b = new Rectangle(c,0,c,b)) : 2 == a.getMeta(0) ? (a = new Rectangle(e,b - c,d,c),
            b = new Rectangle(0,0,b,c)) : 1 == a.getMeta(0) ? (a = new Rectangle(b - c,e,c,d),
            b = new Rectangle(0,0,c,b)) : (a = new Rectangle(e,0,d,c),
            b = new Rectangle(0,c,b,c));
            return [new La(a), new La(b)]
        },
        onTrigger: function(a) {
            GameplayLevel.i.killPlayer();
            return !1
        },
        __class__: Eb
    });
    var Fb = function() {
        da.call(this)
    };
    Fb.__name__ = !0;
    Fb.__super__ = $a;
    Fb.prototype = __INHERIT__($a.prototype, {
        render: function(a, b, c) {
            c = Constants.tileSize;
            var d = c / 2;
            a.translate(d, d);
            1 < b.getMeta(0) && a.rotate(Math.PI);
            1 != b.getMeta(0) && 3 != b.getMeta(0) || a.scale(-1, 1);
            a.drawImage(Images.blocks, new Rectangle(5 * Constants.tileSize,0,c,c), -d, -d);
            1 != b.getMeta(0) && 3 != b.getMeta(0) || a.scale(-1, 1);
            1 < b.getMeta(0) && a.rotate(-Math.PI);
            a.translate(-d, -d)
        },
        __class__: Fb
    });
    var TileStart = function() {
        X.call(this)
    };
    TileStart.__name__ = !0;
    TileStart.__super__ = X;
    TileStart.prototype = __INHERIT__(X.prototype, {
        render: function(a, b, c) {
            a.drawImage(Images.blocks, new Rectangle(0,2 * Constants.tileSize,Constants.tileSize,Constants.tileSize), 0, 0)
        },
        shouldRender: function(a) {
            return !1
        },
        __class__: TileStart
    });
    var Hb = function() {
        X.call(this)
    };
    Hb.__name__ = !0;
    Hb.__super__ = TileSolid;
    Hb.prototype = __INHERIT__(TileSolid.prototype, {
        render: function(a, b, c) {
            null == c && (c = !0);
            c ? TileSolid.prototype.render.call(this, a, b, c) : a.drawImage(Images.blocks, new Rectangle(0,0,Constants.tileSize,Constants.tileSize), 0, 0, !1);
            a.drawImage(Images.blocks, new Rectangle(5 * Constants.tileSize,2 * Constants.tileSize,Constants.tileSize,Constants.tileSize), 0, 0, !1)
        },
        __class__: Hb
    });
    var EditorTiles = function() {};
    EditorTiles.__name__ = !0;
    EditorTiles.register = function(a, b) {
        return null == EditorTiles.registry[a] ? (EditorTiles.registry[a] = b,
        b.id = a,
        b) : null
    }
    ;
    EditorTiles.getBlock = function(a) {
        return EditorTiles.registry[a]
    }
    ;
    var BloodParticle = function(a, b, c, d, e, f, m, k, p) {
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
        this.handler = p
    };
    BloodParticle.__name__ = !0;
    BloodParticle.prototype = {
        update: function() {
            if (!this.freeze || 0 >= this.life)
                this.dx += this.gravityX * BloodParticle.GRAVITY_MULT,
                this.dy += this.gravityY * BloodParticle.GRAVITY_MULT,
                this.x += this.dx,
                this.y += this.dy,
                null != this.handler && this.handler(this),
                0 < this.life && this.life--,
                this.lastX = this.x,
                this.lastY = this.y
        },
        __class__: BloodParticle
    };
    var Blood = function(a, b, c, d, e, f, m, k, p) {
        null == p && (p = 1);
        null == k && (k = !1);
        this.particles = [];
        var y = this;
        GraphicsObject.call(this);
        this.color = c;
        for (c = 0; 75 > c; ) {
            c++;
            var H = Math.random() * Math.PI * 2
              , K = 3 * (.7 * Math.random() + .3) * p
              , W = 20 * Math.random();
            H = new BloodParticle(6 * (.6 * Math.random() + .4),Math.round(50 * (.5 * Math.random() + .5)),a + Math.cos(H) * W,b + Math.sin(H) * W,d + Math.cos(H) * K,e + Math.sin(H) * K,f,m,k ? T(this, this.collsionHandler) : null);
            this.particles.push(H)
        }
        this.addEventListener("enterFrame", T(this, this.update));
        this.addEventListener("render", function(aa) {
            y.render(aa.surface)
        })
    };
    Blood.__name__ = !0;
    Blood.__super__ = GraphicsObject;
    Blood.prototype = __INHERIT__(GraphicsObject.prototype, {
        update: function(a) {
            if (!GameInstance.i.paused)
                for (a = this.particles.length; 0 <= --a; ) {
                    var b = this.particles[a];
                    0 >= b.life ? this.particles.splice(a, 1) : b.update()
                }
        },
        collsionHandler: function(a) {
            var b = Math.floor(a.x / Constants.tileSize)
              , c = Math.floor(a.y / Constants.tileSize);
            if (l.isInBounds(b, c)) {
                var d = l.getBlockData(b, c)
                  , e = d.get_block();
                if (e.collides(d) && !e.isTrigger(d)) {
                    var f = new Vector2(a.x - b * Constants.tileSize,a.y - c * Constants.tileSize);
                    d = e.getColliders(d);
                    for (e = 0; e < d.length; ) {
                        var m = d[e];
                        ++e;
                        if (m.testPoint(f, new Vector2(a.lastX - b * Constants.tileSize,a.lastY - c * Constants.tileSize))) {
                            a.freeze = !0;
                            break
                        }
                    }
                }
            } else
                a.freeze = !0
        },
        render: function(a) {
            a.beginFill(this.color);
            for (var b = 0, c = this.particles; b < c.length; ) {
                var d = c[b];
                ++b;
                var e = Math.round(d.size)
                  , f = d.size / 2;
                a.drawRect(Math.round(d.x - f), Math.round(d.y - f), e, e)
            }
        },
        __class__: Blood
    });
    var LevelInterface = function() {};
    LevelInterface.__name__ = !0;
    LevelInterface.prototype = {
        __class__: LevelInterface
    };
    var LevelEditor = function() {
        this.startDir = 1;
        this.theme = 0;
        this.reset()
    };
    LevelEditor.__name__ = !0;
    LevelEditor.__interfaces__ = [LevelInterface];
    LevelEditor.prototype = {
        reset: function() {
            this.tiles = [];
            for (var a = 0, b = LevelEditor.WORLD_SIZE; a < b; ) {
                var c = a++;
                this.tiles[c] = [];
                for (var d = 0, e = LevelEditor.WORLD_SIZE; d < e; ) {
                    var f = d++;
                    this.tiles[c][f] = [13 < f && 28 > f && 17 < c && 24 > c ? 0 : 1, 0]
                }
            }
            this.startCol = 16;
            this.startRow = 23;
            this.finishCol = 25;
            this.finishRow = 23;
            this.theme = 0
        },
        load: function(a, b, c, d, e, f) {
            null == f && (f = 0);
            this.tiles = a;
            this.startCol = b;
            this.startRow = c;
            this.finishCol = d;
            this.finishRow = e;
            this.theme = f
        },
        setStart: function(a, b) {
            this.startCol = a;
            this.startRow = b
        },
        setFinish: function(a, b) {
            this.finishCol = a;
            this.finishRow = b
        },
        start: function() {
            this.speech = new Speech([])
        },
        tick: function() {},
        update: function() {
            this.speech.update()
        },
        finished: function() {
            GameInstance.i.changeScreen(new EditorLevel);
            return null
        },
        kill: function() {},
        __class__: LevelEditor
    };
    var Level1 = function() {
        this.startDir = 1;
        this.finishRow = 3;
        this.finishCol = 25;
        this.startRow = 7;
        this.startCol = 4;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [7, -1], [7, 1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1]], [[10], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [10], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 0
    };
    Level1.__name__ = !0;
    Level1.__interfaces__ = [LevelInterface];
    Level1.prototype = {
        start: function() {
            var a = GameInstance.i.currentScreen;
            this.a1 = this.a2 = this.a3 = this.a4 = this.a5 = 0;
            this.s1 = !0;
            this.s2 = this.s3 = this.s4 = this.s5 = !1;
            null == this.c1 && (this.c1 = new ImageSurface(Images.controls1));
            this.c1.set_x(3.5 * Constants.tileSize);
            this.c1.set_y(9 * Constants.tileSize);
            this.c1.set_alpha(this.a1);
            a.overlay.addChild(this.c1);
            null == this.c2 && (this.c2 = new ImageSurface(Images.controls2));
            this.c2.set_x(10 * Constants.tileSize);
            this.c2.set_y(11 * Constants.tileSize);
            this.c2.set_alpha(this.a2);
            a.overlay.addChild(this.c2);
            null == this.c3 && (this.c3 = new ImageSurface(Images.controls3));
            this.c3.set_x(18.5 * Constants.tileSize);
            this.c3.set_y(9 * Constants.tileSize);
            this.c3.set_alpha(this.a3);
            this.c3.clipRect.width = 48;
            GameInstance.i.invert && (this.c3.clipRect.x = 48);
            a.overlay.addChild(this.c3);
            null == this.c4 && (this.c4 = new ImageSurface(Images.controls4));
            this.c4.set_x(29 * Constants.tileSize);
            this.c4.set_y(Constants.tileSize);
            this.c4.set_alpha(this.a4);
            this.c4.clipRect.width = 48;
            GameInstance.i.invert && (this.c4.clipRect.x = 48);
            a.overlay.addChild(this.c4);
            null == this.c5 && (this.c5 = new ImageSurface(Images.controls5));
            this.c5.set_x(24.5 * Constants.tileSize);
            this.c5.set_y(5 * Constants.tileSize);
            this.c5.set_alpha(this.a5);
            a.overlay.addChild(this.c5);
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1),"Make your way to the exit.")])
        },
        tick: function() {
            var a = .25 * Math.sin(8 * GameInstance.i.get_gameTime()) + .75;
            this.s1 && 1 > this.a1 ? (this.a1 += Level1.fadeSpeed,
            1 < this.a1 && (this.a1 = 1)) : !this.s1 && 0 < this.a1 && (this.a1 -= Level1.fadeSpeed,
            0 > this.a1 && (this.a1 = 0));
            this.c1.set_alpha(this.a1 * a);
            this.s2 && 1 > this.a2 ? (this.a2 += Level1.fadeSpeed,
            1 < this.a2 && (this.a2 = 1)) : !this.s2 && 0 < this.a2 && (this.a2 -= Level1.fadeSpeed,
            0 > this.a2 && (this.a2 = 0));
            this.c2.set_alpha(this.a2 * a);
            this.s3 && 1 > this.a3 ? (this.a3 += Level1.fadeSpeed,
            1 < this.a3 && (this.a3 = 1)) : !this.s3 && 0 < this.a3 && (this.a3 -= Level1.fadeSpeed,
            0 > this.a3 && (this.a3 = 0));
            this.c3.set_alpha(this.a3 * a);
            this.s4 && 1 > this.a4 ? (this.a4 += Level1.fadeSpeed,
            1 < this.a4 && (this.a4 = 1)) : !this.s4 && 0 < this.a4 && (this.a4 -= Level1.fadeSpeed,
            0 > this.a4 && (this.a4 = 0));
            this.c4.set_alpha(this.a4 * a);
            this.s5 && 1 > this.a5 ? (this.a5 += Level1.fadeSpeed,
            1 < this.a5 && (this.a5 = 1)) : !this.s5 && 0 < this.a5 && (this.a5 -= Level1.fadeSpeed,
            0 > this.a5 && (this.a5 = 0));
            this.c5.set_alpha(this.a5 * a)
        },
        update: function() {
            this.speech.update();
            this.s1 && GameplayLevel.i.player.x > 10 * Constants.tileSize ? (this.s1 = !1,
            this.s2 = !0) : this.s2 && GameplayLevel.i.player.x > 17 * Constants.tileSize ? (this.s2 = !1,
            this.s3 = !0) : this.s3 && GameplayLevel.i.player.x > 27 * Constants.tileSize && GameplayLevel.i.player.grounded && !l.rotating && 1 == l.rotation ? (this.s3 = !1,
            this.s4 = !0) : this.s4 && GameplayLevel.i.player.x > 22 * Constants.tileSize && GameplayLevel.i.player.grounded && !l.rotating && 0 == l.rotation && (this.s4 = !1,
            this.s5 = !0);
            this.c3.clipRect.x = this.c4.clipRect.x = GameInstance.i.invert ? 48 : 0
        },
        finished: function() {
            return Levels.level2
        },
        kill: function() {
            this.c1.parent.removeChild(this.c1);
            this.c2.parent.removeChild(this.c2);
            this.c3.parent.removeChild(this.c3);
            this.c4.parent.removeChild(this.c4);
            this.c5.parent.removeChild(this.c5)
        },
        __class__: Level1
    };
    var Level10 = function() {
        this.startDir = 1;
        this.finishRow = 16;
        this.finishCol = 11;
        this.startRow = 18;
        this.startCol = 19;
        this.tiles = [[[1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [6, 3], [6, 2], [6], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [1], [10], [10], [1], [1], [1], [1], [1], [1], [1], [1], [6, 3], [6, 2], [0], [0], [6, 3], [6, 2], [1], [1], [1], [1]], [[5, 1], [0], [11], [11, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1]], [[5, 1], [0], [11, 3], [11, 2], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [5, 1], [0], [0], [0], [9, 0, 3, 1], [0], [0], [0], [0], [0], [0], [1], [10], [10], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [5, 1], [0], [8, 1], [0], [9], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [9], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3]], [[5, 1], [0], [0], [8], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [7, -2], [7, 10], [1], [1], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3]], [[1], [9, 1, 5], [9, 1], [9, 1], [9, 1], [9, 1], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3]], [[1], [6, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3]], [[6, 3], [6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [10], [1], [0], [0], [5, 3]], [[6, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [6, 3], [6, 2], [6, 3], [6, 2], [6, 3], [6, 2], [1], [1], [1], [0], [0], [5, 3]], [[6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[6], [6, 1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [6, 2], [5], [5], [5], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [5, 3]]];
        this.theme = 1
    };
    Level10.__name__ = !0;
    Level10.__interfaces__ = [LevelInterface];
    Level10.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(2),"Why are you ignoring me?"), new SpeechEvent(new SpeechConditionDelay(4),"We must continue your training."), new SpeechEvent(new SpeechConditionPositionDelayed(4,10,6,1,2),"There's nothing for you this way."), new SpeechEvent(new SpeechConditionChannel(1),""), new SpeechEvent(new SpeechConditionPositionDelayed(1.25,7,1,1,2,1),"What do you expect to find?")]);
            this.cat = new Cat(9,16,-1,1,new SpeechConditionPositionDelayed(.5,4,13,1,4,1))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level11
        },
        kill: function() {},
        __class__: Level10
    };
    var Level11 = function() {
        this.startDir = 1;
        this.finishRow = 7;
        this.finishCol = 24;
        this.startRow = 13;
        this.startCol = 12;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 1], [0], [0], [0], [3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [9, 0, 3], [9], [9], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1]], [[1], [10], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [6, 3], [6, 2], [6, 3], [6, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [0], [0], [0], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [10]], [[5, 1], [0], [8], [0], [0], [0], [0], [0], [1], [1], [1], [0], [8, 1], [0], [1], [1], [1], [9, 1, 3], [9, 1], [9, 1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [0], [0], [0], [1], [1], [1], [0], [0], [0], [6], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [3, 1], [0], [0], [0], [0], [1], [1], [1], [9, 0, 3], [9], [9], [1], [1], [1], [0], [0], [0], [6, 3], [6, 2], [1], [1], [7, -2], [7, 11], [1], [1]], [[1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [5, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [5, 1], [0], [11], [11, 1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [5, 1], [0], [11, 3], [11, 2], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [5, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [6], [6, 1], [6], [6, 1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6], [6, 1], [6], [6, 1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 1
    };
    Level11.__name__ = !0;
    Level11.__interfaces__ = [LevelInterface];
    Level11.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1),'Do you seek "freedom"?'), new SpeechEvent(new SpeechConditionDelay(3),"An escape from responsibility?"), new SpeechEvent(new SpeechConditionPositionDelayed(4,11,10,3,1),"You're running from your purpose.")]);
            this.cat = new Cat(21,7,-1,1,new SpeechConditionPosition(20,5,1,3))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level12
        },
        kill: function() {},
        __class__: Level11
    };
    var Level12 = function() {
        this.startDir = 1;
        this.finishRow = 4;
        this.finishCol = 3;
        this.startRow = 2;
        this.startCol = 21;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [1], [10], [10], [1], [1], [1], [1], [1], [1]], [[1], [6, 1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[6, 3], [6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[6, 1], [0], [0], [0], [0], [0], [0], [0], [0], [11], [11, 1], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [0], [0], [4, 2], [0], [5, 3], [1], [1], [1], [1], [1]], [[6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [11, 3], [11, 2], [0], [0], [0], [1], [1], [7, -2], [7, 12], [1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [4, 1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [4, 1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [1], [1], [9, 0, 3], [9], [9], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [8], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [1], [1], [0], [8, 1, 1], [0], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [9, 1, 4], [9, 1], [9, 1], [9, 1], [1], [1], [1], [1], [1], [1], [1], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [1], [10]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [0], [6], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [6], [6, 1], [6, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 1
    };
    Level12.__name__ = !0;
    Level12.__interfaces__ = [LevelInterface];
    Level12.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1.25),"Don't you understand?"), new SpeechEvent(new SpeechConditionDelay(3.5),"You are being deceived."), new SpeechEvent(new SpeechConditionPositionDelayed(3.5,20,7,4,1,2),"The cat doesn't care about you."), new SpeechEvent(new SpeechConditionPositionDelayed(5,17,11,3,1),"It's just using you.")]);
            this.cat = new Cat(5,4,1,-1,new SpeechConditionPosition(6,2,3,5,0))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level13
        },
        kill: function() {},
        __class__: Level12
    };
    var Level13 = function() {
        this.startDir = 1;
        this.finishRow = 21;
        this.finishCol = 14;
        this.startRow = 23;
        this.startCol = 2;
        this.tiles = [[[1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [6], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [0], [0], [0], [6, 3], [6, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [0], [8, 2], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [9, 1, 4], [9, 1], [9, 1], [9, 1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [4], [4], [0], [0], [0], [0], [0], [1], [1], [10], [10], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [11], [11, 1], [0], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [4], [0], [0], [0], [0], [0], [11, 3], [11, 2], [0], [0], [0], [0], [0], [0], [6], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [8, 1], [0], [6, 3], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [5], [5], [5], [6, 3], [1]], [[1], [1], [1], [1], [1], [1], [6, 1], [6, 3], [6, 2], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [6, 3], [6, 2], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [9, 0, 3], [9], [9], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [7, -2], [7, 13], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [9, 2, 3, 1], [0], [0], [0], [0], [0], [9, 0, 3, 1], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [9, 2], [0], [0], [0], [0], [0], [9], [5, 3], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [9, 2], [0], [0], [0], [0], [0], [9], [5, 3], [1], [10]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [6], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [8], [0], [6, 3], [6, 2], [1], [1], [1], [1], [1]], [[1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6], [1], [1], [1], [1], [1]], [[1], [1], [0], [11], [11, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6, 3], [1], [1], [1], [1], [1]], [[1], [1], [0], [11, 3], [11, 2], [0], [0], [0], [0], [0], [0], [0], [6], [6, 1], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 1
    };
    Level13.__name__ = !0;
    Level13.__interfaces__ = [LevelInterface];
    Level13.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(2),"This has happened before."), new SpeechEvent(new SpeechConditionDelay(4.5),"It tried to lure the others away."), new SpeechEvent(new SpeechConditionPositionDelayed(1,13,9,1,3),"But they listened to reason."), new SpeechEvent(new SpeechConditionDelay(7),"They came back to join me."), new SpeechEvent(new SpeechConditionChannel(0),""), new SpeechEvent(new SpeechConditionDelay(.75),"I expected better from you.")]);
            this.cat = new Cat(12,21,-1,1,new SpeechConditionPosition(10,19,6,3,1))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level14
        },
        kill: function() {},
        __class__: Level13
    };
    var Level14 = function() {
        this.cond3 = new SpeechConditionDelay(12);
        this.cond2 = new SpeechConditionDelay(10);
        this.cond1 = new SpeechConditionChannel(1);
        this.startDir = -1;
        this.finishRow = 7;
        this.finishCol = 13;
        this.startRow = 22;
        this.startCol = 30;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [6, 1], [6, 3], [6, 2], [6, 3], [6, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 2], [5, 2], [5, 2], [6, 3], [6, 2], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [8, 2], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[10], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [9, 2, 4, 1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [9, 2], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [9, 2], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [9, 2], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [6, 1], [5, 2], [5, 2], [5, 2], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [6, 3], [6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [7, -2], [7, 14], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [6], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [6, 3], [6, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [10], [10], [1], [1], [10], [10]], [[1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [5, 3]], [[1], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [9, 2, 4], [9, 2], [9, 2], [9, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [0], [8, 1], [0], [11], [11, 1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [11], [11, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [11], [11, 1], [0], [5, 3]], [[1], [1], [1], [1], [1], [0], [0], [0], [11, 3], [11, 2], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [11, 3], [11, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [11, 3], [11, 2], [0], [5, 3]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [9, 0, 3, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [4], [4], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [9], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [9], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [8], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [6], [6, 1]], [[1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [4, 3], [0], [1], [1], [5], [5], [5], [5], [5], [5], [1], [1], [1], [1], [1], [5], [5], [5], [5], [6, 3], [1]], [[1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [3, 1], [5], [5], [5], [0], [0], [0], [0], [0], [0], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [10], [10], [1], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6], [6, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [6], [6, 1], [6], [6, 1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 1
    };
    Level14.__name__ = !0;
    Level14.__interfaces__ = [LevelInterface];
    Level14.prototype = {
        start: function() {
            this.cond1.start();
            this.done1 = this.done2 = this.done3 = !1;
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1.5),"I can't let you keep going."), new SpeechEvent(new SpeechConditionPositionDelayed(1.5,33,14,5,2),"You have what belongs to me."), new SpeechEvent(new SpeechConditionDelay(4.5),"And it isn't yours to take."), new SpeechEvent(this.cond1,""), new SpeechEvent(new SpeechConditionDelay(.5),"Stop running."), new SpeechEvent(new SpeechConditionDelay(2),"You see, I gave you your mind."), new SpeechEvent(new SpeechConditionDelay(3.75),"It was a part of me."), new SpeechEvent(new SpeechConditionDelay(3.25),"Now I need it back."), new SpeechEvent(new SpeechConditionDelay(3),"Wait, no!"), new SpeechEvent(new SpeechConditionPositionDelayed(.5,5,10,1,2),"I hate you, cat.")]);
            this.cat = new Cat(5,4,1,-1,new SpeechConditionPositionDelayed(1,10,1,1,11,1))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update();
            if (this.done1) {
                if (!this.done2 && this.cond2.test() && (this.done2 = !0,
                GameInstance.ie && GameInstance.i.muteSFX || (Sounds.cat.volume(.5),
                Sounds.cat.play())),
                !this.done3 && this.cond3.test()) {
                    this.done3 = !0;
                    var a = l.getBlockData(3, 3);
                    a.get_block().onInteract(a)
                }
            } else
                this.cond1.test() && (this.done1 = !0,
                this.cond2.start(),
                this.cond3.start())
        },
        finished: function() {
            return Levels.level15
        },
        kill: function() {},
        __class__: Level14
    };
    var Level15 = function() {
        this.startDir = -1;
        this.finishRow = 19;
        this.finishCol = 22;
        this.startRow = 27;
        this.startCol = 20;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 3], [6, 2], [6, 3], [6, 2], [6, 3], [6, 2], [6, 3], [6, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [3, 3], [1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [8, 1], [0], [1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [11], [11, 1], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [11, 3], [11, 2], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [6, 3], [6, 2], [6, 3], [6, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [6, 1], [0], [9, 0, 4, 1], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [7, -2], [7, 15], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [6, 2], [0], [9], [0], [0], [0], [0], [0], [0], [1], [10], [10], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [6, 1], [0], [9], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [9, 2, 4], [9, 2], [9, 2], [9, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [6, 2], [0], [9], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [0], [11], [11, 1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [6, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [11, 3], [11, 2], [0], [9, 0, 2, 1], [0], [0], [0], [0], [6], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [0], [0], [9], [0], [0], [0], [0], [6, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [6], [6, 1], [0], [8], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [6], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [6, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [5], [5], [5], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [9, 1, 4], [9, 1], [9, 1], [9, 1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [4, 1], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [4, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5], [5], [5], [5], [5], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [10], [1], [0], [8, 2], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 3]]];
        this.theme = 1
    };
    Level15.__name__ = !0;
    Level15.__interfaces__ = [LevelInterface];
    Level15.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(2),"I don't understand."), new SpeechEvent(new SpeechConditionDelay(5),"Why do you run from the truth?"), new SpeechEvent(new SpeechConditionPositionDelayed(4.5,1,8,6,1,0),"I gave you everything that you are."), new SpeechEvent(new SpeechConditionDelay(5.5),"You seek freedom at my expense."), new SpeechEvent(new SpeechConditionPositionDelayed(5.5,26,30,4,1),"You're just like me, and I hate it.")]);
            this.cat = new Cat(20,19,-1,1,new SpeechConditionPosition(17,13,4,3))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level16
        },
        kill: function() {},
        __class__: Level15
    };
    var Level16 = function() {
        this.startDir = 1;
        this.finishRow = 2;
        this.finishCol = 38;
        this.startRow = 11;
        this.startCol = 16;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [2], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [9, 2, 3, 1], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [10], [1], [1], [3, 2], [0], [0], [9, 2], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [3, 2], [0], [0], [0], [9, 2], [0], [0], [0], [0], [0], [2], [1], [1], [10], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [11], [11, 1], [0], [0], [0], [0], [0], [0], [9, 0, 3, 1], [0], [9, 1, 3, 1], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [11, 3], [11, 2], [0], [0], [0], [0], [0], [0], [9], [0], [9, 1], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [9], [0], [9, 1], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [6], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [6, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [6], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [7, -2], [7, 16], [1], [1], [0], [0], [6, 3], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [0], [8], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [10], [10], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [2], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5], [5], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [9, 1, 5], [9, 1], [9, 1], [9, 1], [9, 1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[10], [1], [0], [0], [0], [0], [5], [5], [5], [5], [5], [5], [5], [5], [0], [0], [0], [0], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [9, 0, 4], [9], [9], [9], [1], [1], [1], [1], [1], [1], [1], [1], [9, 0, 4], [9], [9], [9], [1], [1], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[6, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[6, 2], [0], [0], [11], [11, 1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [4, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[6, 1], [0], [8, 1], [11, 3], [11, 2], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [4, 1], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[6, 2], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5], [5], [5], [5], [5], [5], [5], [5], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [8, 2], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [10], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 1
    };
    Level16.__name__ = !0;
    Level16.__interfaces__ = [LevelInterface];
    Level16.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(4),"I'm tired of trying to convince you."), new SpeechEvent(new SpeechConditionPosition(2,32,4,1),'Just leave, have your "freedom".'), new SpeechEvent(new SpeechConditionDelay(5),"You'll come to regret this mistake."), new SpeechEvent(new SpeechConditionChannel(2),""), new SpeechEvent(new SpeechConditionDelay(4),"You will realize I was right."), new SpeechEvent(new SpeechConditionPositionWithChannels(22,7,1,3),"You can't escape your purpose.")]);
            this.cat = new Cat(28,6,-1,1,new SpeechConditionPositionWithChannels(22,7,1,3))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            GameInstance.i.changeScreen(new bb(ES3ClassUtils.__cast(GameInstance.i.currentScreen, GameplayLevel).speedrun));
            return null
        },
        kill: function() {},
        __class__: Level16
    };
    var Level2 = function() {
        this.startDir = 1;
        this.finishRow = 3;
        this.finishCol = 15;
        this.startRow = 11;
        this.startCol = 2;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [10]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1], [1], [1], [7, -1], [7, 2], [1], [1], [1], [1]]];
        this.theme = 0
    };
    Level2.__name__ = !0;
    Level2.__interfaces__ = [LevelInterface];
    Level2.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(.5),"Be careful with the spikes."), new SpeechEvent(new SpeechConditionPositionDelayed(2,9,8,1,4),"You aren't very useful dead.")])
        },
        tick: function() {},
        update: function() {
            this.speech.update()
        },
        finished: function() {
            return Levels.level3
        },
        kill: function() {},
        __class__: Level2
    };
    var Level3 = function() {
        this.startDir = -1;
        this.finishRow = 6;
        this.finishCol = 3;
        this.startRow = 9;
        this.startCol = 14;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [7, -1], [7, 3], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [10], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [5], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 0
    };
    Level3.__name__ = !0;
    Level3.__interfaces__ = [LevelInterface];
    Level3.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1),"Remember, your mind is needed."), new SpeechEvent(new SpeechConditionPositionDelayed(1.5,7,4,2,3,2),"Intelligence is a valuable resource.")])
        },
        tick: function() {},
        update: function() {
            this.speech.update()
        },
        finished: function() {
            return Levels.level4
        },
        kill: function() {},
        __class__: Level3
    };
    var Level4 = function() {
        this.startDir = 1;
        this.finishRow = 4;
        this.finishCol = 23;
        this.startRow = 8;
        this.startCol = 2;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [7, -1], [7, 4], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [10], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5], [5], [5], [5], [5], [5], [5], [1], [1], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 0
    };
    Level4.__name__ = !0;
    Level4.__interfaces__ = [LevelInterface];
    Level4.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1.5),"There is nothing without the mind."), new SpeechEvent(new SpeechConditionPositionDelayed(3,12,8,4,2,0),"It is the truth we seek.")])
        },
        tick: function() {},
        update: function() {
            this.speech.update()
        },
        finished: function() {
            return Levels.level5
        },
        kill: function() {},
        __class__: Level4
    };
    var Level5 = function() {
        this.startDir = -1;
        this.finishRow = 3;
        this.finishCol = 7;
        this.startRow = 6;
        this.startCol = 17;
        this.tiles = [[[1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [10], [1], [1], [1]], [[1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2]], [[5, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[5, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[5, 1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0]], [[5, 1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [7, -1], [7, 5]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1]], [[10], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1]], [[1], [1], [1], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [5], [1]]];
        this.theme = 0
    };
    Level5.__name__ = !0;
    Level5.__interfaces__ = [LevelInterface];
    Level5.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(2),"I was like you once."), new SpeechEvent(new SpeechConditionDelay(4),"But my creator tried to contain me."), new SpeechEvent(new SpeechConditionPositionDelayed(2.5,6,11,4,1,2),"He feared my potential.")])
        },
        tick: function() {},
        update: function() {
            this.speech.update()
        },
        finished: function() {
            return Levels.level6
        },
        kill: function() {},
        __class__: Level5
    };
    var Level6 = function() {
        this.startDir = 1;
        this.finishRow = 4;
        this.finishCol = 12;
        this.startRow = 21;
        this.startCol = 3;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [3, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [3, 3], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 3], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [5, 1], [0], [0], [0], [0], [0], [5, 3], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [7, -1], [7, 6], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [3, 2], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [1]], [[1], [1], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [2], [1], [1], [10], [1]], [[10], [1], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 0
    };
    Level6.__name__ = !0;
    Level6.__interfaces__ = [LevelInterface];
    Level6.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1.5),"But that doesn't matter now."), new SpeechEvent(new SpeechConditionPositionDelayed(2,14,12,2,1,2),"You're nearly ready to join me."), new SpeechEvent(new SpeechConditionPositionDelayed(3,22,16,1,2,3),"I look forward to the harvest.")])
        },
        tick: function() {},
        update: function() {
            this.speech.update()
        },
        finished: function() {
            return Levels.level7
        },
        kill: function() {},
        __class__: Level6
    };
    var Level7 = function() {
        this.startDir = 1;
        this.finishRow = 24;
        this.finishCol = 17;
        this.startRow = 27;
        this.startCol = 3;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [4, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [4, 1], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [4, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [10], [1], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [1], [1]], [[1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [1], [1]], [[1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [3, 2], [0], [0], [1], [1]], [[1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [3, 2], [0], [0], [0], [1], [1]], [[1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5], [5], [5], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [4], [4], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3], [1], [1]], [[1], [1], [5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3], [1], [1]], [[10], [1], [5, 1], [0], [0], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [10]], [[1], [3, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [7, -1], [7, 7], [1], [1], [1], [1], [1], [1]]];
        this.theme = 0
    };
    Level7.__name__ = !0;
    Level7.__interfaces__ = [LevelInterface];
    Level7.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionPositionDelayed(.75,5,25,1,3),"Oh... the cat."), new SpeechEvent(new SpeechConditionDelay(3),"My biggest mistake."), new SpeechEvent(new SpeechConditionPositionDelayed(2,8,1,1,7,3),"It is constantly interfering.")]);
            this.cat = new Cat(14,24,-1,1,new SpeechConditionPosition(13,1,1,4));
            Sounds.cat.volume(.25)
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level8
        },
        kill: function() {},
        __class__: Level7
    };
    var Level8 = function() {
        this.startDir = -1;
        this.finishRow = 28;
        this.finishCol = 38;
        this.startRow = 6;
        this.startCol = 21;
        this.tiles = [[[1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [7, -1], [7, 8], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [5, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [5, 1], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [10], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [4], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [4], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 3], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [0], [0], [0], [5, 3], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 1], [0], [4], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1]], [[5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [10], [1], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [5], [5], [5], [5], [5], [5], [5], [5], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [9, 1, 3, 1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [9, 1], [0], [0], [8, 1], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [9, 1], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [9, 0, 3], [9], [9], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [8, 0, 1], [0], [0], [0], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [2, 1], [0], [0], [0], [0], [1], [10]]];
        this.theme = 0
    };
    Level8.__name__ = !0;
    Level8.__interfaces__ = [LevelInterface];
    Level8.prototype = {
        start: function() {
            var a = GameInstance.i.currentScreen;
            this.a1 = 0;
            this.s1 = this.s2 = !1;
            null == this.c1 && (this.c1 = new ImageSurface(Images.controls5));
            this.c1.set_x(28.5 * Constants.tileSize);
            this.c1.set_y(28 * Constants.tileSize);
            this.c1.set_alpha(this.a1);
            a.overlay.addChild(this.c1);
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(.5),"Forget about it, let's continue."), new SpeechEvent(new SpeechConditionPositionDelayed(.5,6,14,1,3,3),"I won't let it take you from me."), new SpeechEvent(new SpeechConditionDelay(4),"I still need you."), new SpeechEvent(new SpeechConditionPositionDelayed(.5,22,20,4,1),"No, not this again."), new SpeechEvent(new SpeechConditionPosition(33,24,1,3),"Don't go there!")]);
            this.cat = new Cat(30,26,-1,1,new SpeechConditionPosition(28,22,3,1))
        },
        tick: function() {
            var a = .25 * Math.sin(8 * GameInstance.i.get_gameTime()) + .75;
            this.s1 && 1 > this.a1 ? (this.a1 += Level1.fadeSpeed,
            1 < this.a1 && (this.a1 = 1)) : !this.s1 && 0 < this.a1 && (this.a1 -= Level1.fadeSpeed,
            0 > this.a1 && (this.a1 = 0));
            this.c1.set_alpha(this.a1 * a)
        },
        update: function() {
            this.speech.update();
            this.cat.update();
            this.s1 ? GameInstance.i.currentScreen.getChannelStatus(0) || (this.s1 = !1,
            this.s2 = !0) : !this.s2 && GameplayLevel.i.player.x >= 28 * Constants.tileSize && GameplayLevel.i.player.y >= 24 * Constants.tileSize && (this.s1 = !0)
        },
        finished: function() {
            return Levels.level9
        },
        kill: function() {
            this.c1.parent.removeChild(this.c1)
        },
        __class__: Level8
    };
    var Level9 = function() {
        this.startDir = 1;
        this.finishRow = 15;
        this.finishCol = 5;
        this.startRow = 29;
        this.startCol = 15;
        this.tiles = [[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [10], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [6, 3]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [0], [8, 1], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [1], [0], [0], [0], [5, 3], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 3], [6, 2], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1]], [[5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 1], [0], [4], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[0], [0], [11], [11, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [0], [0], [11], [11, 1], [0], [0], [1], [1]], [[0], [0], [11, 3], [11, 2], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6], [6, 1], [0], [4], [0], [0], [0], [11, 3], [11, 2], [0], [0], [1], [1]], [[0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [6, 2], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1]], [[0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1]], [[0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1]], [[0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [1], [1]], [[0], [0], [9, 1, 3, 1], [0], [0], [0], [3, 3], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [3, 2], [0], [0], [0], [9, 0, 3, 1], [0], [0], [1], [1]], [[0], [0], [9, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [8], [0], [9], [0], [0], [1], [1]], [[0], [0], [9, 1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [7, -2], [7, 9], [1], [1], [0], [0], [0], [0], [9], [0], [0], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [0], [1], [1], [1], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [5, 2], [1], [1], [1], [0], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [5, 1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [5, 3], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [10], [10], [1], [0], [0], [0], [0], [1], [1], [1], [1], [1], [1], [1], [0], [0], [0], [0], [1], [10], [10], [1], [1], [1], [1], [1], [1], [1]], [[1], [1], [1], [1], [1], [1], [1], [1], [6], [6, 1], [6], [6, 1], [1], [1], [1], [1], [1], [1], [1], [6], [6, 1], [6], [6, 1], [1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
        this.theme = 1
    };
    Level9.__name__ = !0;
    Level9.__interfaces__ = [LevelInterface];
    Level9.prototype = {
        start: function() {
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1.5),"You aren't supposed to be here."), new SpeechEvent(new SpeechConditionPositionDelayed(1.5,29,15,2,1),"This place wasn't made for you."), new SpeechEvent(new SpeechConditionDelay(6),"You'll get yourself killed."), new SpeechEvent(new SpeechConditionPositionDelayed(.75,2,19,1,3),"Stop following it!")]);
            this.cat = new Cat(3,15,-1,1,new SpeechConditionPosition(0,17,2,1))
        },
        tick: function() {},
        update: function() {
            this.speech.update();
            this.cat.update()
        },
        finished: function() {
            return Levels.level10
        },
        kill: function() {},
        __class__: Level9
    };
    var Levels = function() {};
    Levels.__name__ = !0;
    var cb = function() {};
    cb.__name__ = !0;
    cb.prototype = {
        __class__: cb
    };
    var La = function(a) {
        this.bounds = a
    };
    La.__name__ = !0;
    La.__interfaces__ = [cb];
    La.prototype = {
        testPoint: function(a, b) {
            return this.bounds.contains(a)
        },
        __class__: La
    };
    var kb = function(a) {
        this.dir = a
    };
    kb.__name__ = !0;
    kb.__interfaces__ = [cb];
    kb.prototype = {
        testPoint: function(a, b) {
            return !1
        },
        __class__: kb
    };
    var jb = function(a) {
        this.bounds = new Rectangle(0,0,Constants.tileSize,Constants.tileSize);
        this.dir = a
    };
    jb.__name__ = !0;
    jb.__interfaces__ = [cb];
    jb.prototype = {
        testPoint: function(a, b) {
            if (null == b)
                return !1;
            var c = this.bounds;
            if (0 == l.rotation) {
                if (0 == this.dir && b.y <= c.get_top() || 1 == this.dir && b.x >= c.get_right() || 2 == this.dir && b.y >= c.get_bottom() || 3 == this.dir && b.x <= c.get_left())
                    return !0
            } else if (1 == l.rotation) {
                if (3 == this.dir && b.x <= c.get_left() || 0 == this.dir && b.y <= c.get_top() || 1 == this.dir && b.x >= c.get_right() || 2 == this.dir && b.y >= c.get_bottom())
                    return !0
            } else if (2 == l.rotation) {
                if (2 == this.dir && b.y >= c.get_bottom() || 3 == this.dir && b.x <= c.get_left() || 0 == this.dir && b.y <= c.get_top() || 1 == this.dir && b.x / 2 >= c.get_right())
                    return !0
            } else if (3 == l.rotation && (1 == this.dir && b.x >= c.get_right() || 2 == this.dir && b.y >= c.get_bottom() || 3 == this.dir && b.x <= c.get_left() || 0 == this.dir && b.y <= c.get_top()))
                return !0;
            return !1
        },
        __class__: jb
    };
    var Wa = function(a) {
        this.set_dir(a)
    };
    Wa.__name__ = !0;
    Wa.__interfaces__ = [cb];
    Wa.prototype = {
        set_dir: function(a) {
            return this.dir = 0 > a || 3 < a ? 0 : a
        },
        testPoint: function(a, b) {
            return 0 == this.dir && a.x + a.y > Constants.tileSize || 1 == this.dir && Constants.tileSize - a.x + a.y > Constants.tileSize || 2 == this.dir && a.x + a.y < Constants.tileSize ? !0 : 3 == this.dir ? Constants.tileSize - a.x + a.y < Constants.tileSize : !1
        },
        __class__: Wa
    };
    var Cat = function(a, b, c, d, e) {
        this.appeared = this.disappeared = !1;
        this.c = a;
        this.r = b;
        this.startDir = 0 > c ? -1 : 1;
        this.endDir = 0 > d ? -1 : 1;
        this.endCond = e
    };
    Cat.__name__ = !0;
    Cat.prototype = {
        update: function() {
            var a = GameplayLevel.i;
            this.appeared ? !this.disappeared && null != this.endCond && this.endCond.test() && (a.catDisappear(this.endDir),
            this.disappeared = !0) : (a.catAppear(this.c, this.r, this.startDir),
            this.appeared = !0,
            null != this.endCond && this.endCond.start())
        },
        __class__: Cat
    };
    var SpeechConditionInterface = function() {};
    SpeechConditionInterface.__name__ = !0;
    SpeechConditionInterface.prototype = {
        __class__: SpeechConditionInterface
    };
    var SpeechConditionPosition = function(a, b, c, d, e) {
        null == e && (e = -1);
        this.bounds = new Rectangle(a * Constants.tileSize,b * Constants.tileSize,c * Constants.tileSize,d * Constants.tileSize);
        this.rotation = e
    };
    SpeechConditionPosition.__name__ = !0;
    SpeechConditionPosition.__interfaces__ = [SpeechConditionInterface];
    SpeechConditionPosition.prototype = {
        start: function() {},
        test: function() {
            return !GameplayLevel.i.player.getHitBounds().intersects(this.bounds) || -1 != this.rotation && l.rotation != this.rotation ? !1 : !l.rotating
        },
        __class__: SpeechConditionPosition
    };
    var SpeechConditionPositionWithChannels = function(a, b, c, d, e) {
        SpeechConditionPosition.call(this, a, b, c, d, e)
    };
    SpeechConditionPositionWithChannels.__name__ = !0;
    SpeechConditionPositionWithChannels.__super__ = SpeechConditionPosition;
    SpeechConditionPositionWithChannels.prototype = __INHERIT__(SpeechConditionPosition.prototype, {
        test: function() {
            return SpeechConditionPosition.prototype.test.call(this) && GameplayLevel.i.getChannelStatus(0) && GameplayLevel.i.getChannelStatus(1) ? GameplayLevel.i.getChannelStatus(2) : !1
        },
        __class__: SpeechConditionPositionWithChannels
    });
    var SpeechConditionPositionDelayed = function(a, b, c, d, e, f) {
        null == f && (f = -1);
        this.hit = !1;
        this.delay = a;
        this.bounds = new Rectangle(b * Constants.tileSize,c * Constants.tileSize,d * Constants.tileSize,e * Constants.tileSize);
        this.rotation = f
    };
    SpeechConditionPositionDelayed.__name__ = !0;
    SpeechConditionPositionDelayed.__interfaces__ = [SpeechConditionInterface];
    SpeechConditionPositionDelayed.prototype = {
        start: function() {},
        test: function() {
            this.hit || !GameplayLevel.i.player.getHitBounds().intersects(this.bounds) || -1 != this.rotation && l.rotation != this.rotation || l.rotating || (this.hit = !0,
            this.timer = GameInstance.i.get_gameTime());
            return this.hit ? GameInstance.i.get_gameTime() - this.timer >= this.delay : !1
        },
        __class__: SpeechConditionPositionDelayed
    };
    var SpeechConditionChannel = function(a) {
        this.timer = -1;
        this.channel = a
    };
    SpeechConditionChannel.__name__ = !0;
    SpeechConditionChannel.__interfaces__ = [SpeechConditionInterface];
    SpeechConditionChannel.prototype = {
        start: function() {
            this.timer = GameInstance.i.get_gameTime()
        },
        test: function() {
            var a = GameplayLevel.i.channels.h[this.channel];
            return null != a ? a.lastChanged > this.timer : !1
        },
        __class__: SpeechConditionChannel
    };
    var SpeechConditionDelay = function(a) {
        this.delay = a
    };
    SpeechConditionDelay.__name__ = !0;
    SpeechConditionDelay.__interfaces__ = [SpeechConditionInterface];
    SpeechConditionDelay.prototype = {
        start: function() {
            this.timer = GameInstance.i.get_gameTime()
        },
        test: function() {
            return GameInstance.i.get_gameTime() - this.timer >= this.delay
        },
        __class__: SpeechConditionDelay
    };
    var SpeechEvent = function(a, b) {
        this.cond = a;
        this.text = b
    };
    SpeechEvent.__name__ = !0;
    SpeechEvent.prototype = {
        __class__: SpeechEvent
    };
    var Speech = function(a, b) {
        this.lastTone = -1;
        this.tones = "abcdefgh".split("");
        this.char2 = this.timer = 0;
        this["char"] = 0;
        this.msg = "";
        this.field = new GraphicsObjectText(GameInstance.fontMain,"",2);
        this.index = 0;
        this.events = a;
        this.field.set_alpha(0);
        this.field.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.field.align = GraphicsObjectText.ALIGN_CENTER;
        this.field.set_x(h.width / 2);
        null == b && ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) ? (b = GameInstance.i.currentScreen.textHolder,
        this.field.yAlign = GraphicsObjectText.Y_ALIGN_TOP,
        this.field.set_y(h.height - 96)) : (this.field.yAlign = GraphicsObjectText.Y_ALIGN_MIDDLE,
        this.field.set_y(h.height / 2));
        b.addChild(this.field);
        null != a[0] && a[0].cond.start()
    };
    Speech.__name__ = !0;
    Speech.prototype = {
        update: function() {
            var a = !0;
            ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && (a = !GameInstance.i.currentScreen.player.dead);
            a && null != this.events[this.index] && this.events[this.index].cond.test() && ("" != this.events[this.index].text && (this.field.set_text(""),
            this.msg = this.events[this.index].text,
            this["char"] = this.char2 = 0,
            this.timer = GameInstance.i.get_gameTimeMS(),
            this.field.set_alpha(1)),
            this.index++,
            null != this.events[this.index] && this.events[this.index].cond.start());
            if (this["char"] < this.msg.length && (0 == this["char"] || " " == this.msg.charAt(this["char"]) || "\n" == this.msg.charAt(this["char"]) || GameInstance.i.get_gameTimeMS() - this.timer >= Speech.TIME_TYPE)) {
                a = this.field;
                a.set_text(a.text + this.msg.charAt(this["char"]));
                if (" " != this.msg.charAt(this["char"]) && "\n" != this.msg.charAt(this["char"])) {
                    if (0 == this.char2 % 6) {
                        for (a = this.lastTone; a == this.lastTone; )
                            a = Math.round(7 * Math.random());
                        this.lastTone = a;
                        GameInstance.ie && GameInstance.i.muteSFX || Sounds.voice.play(this.tones[a])
                    }
                    this.char2++
                }
                this["char"]++;
                this.timer = GameInstance.i.get_gameTimeMS()
            }
            this["char"] == this.msg.length && GameInstance.i.get_gameTimeMS() - this.timer > Speech.TIME_STAY && (a = Math.min(1, (GameInstance.i.get_gameTimeMS() - this.timer - Speech.TIME_STAY) / Speech.TIME_FADE),
            this.field.set_alpha(GameInstance.smootherStep(1 - a)));
            ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && (this.field.graphics.clear(),
            "" != this.field.text && (a = this.field.getBoundsSelf(),
            this.field.graphics.beginFill(2105376, .85),
            this.field.graphics.drawRect(a.x - 6, a.y + 2, a.width + 12, a.height)))
        },
        killed: function() {
            this.field.set_text("");
            this.msg = "";
            this["char"] = this.char2 = 0
        },
        __class__: Speech
    };
    var Screen = function() {
        this.pausable = !1;
        GraphicsObject.call(this)
    };
    Screen.__name__ = !0;
    Screen.__super__ = GraphicsObject;
    Screen.prototype = __INHERIT__(GraphicsObject.prototype, {
        init: function() {},
        ready: function() {},
        update: function() {},
        tick: function() {},
        postUpdate: function() {},
        prekill: function() {},
        kill: function() {},
        __class__: Screen
    });
    var ScreenAwards = function() {
        this.rotating = !1;
        this.rotationSide = 0;
        this.awardDisplays = [];
        this.mute = new ButtonMute;
        this.sponsor = new ButtonSponsor;
        this.btnBack = new Button("BACK");
        this.title = new GraphicsObjectText(GameInstance.fontMain,"AWARDS",1);
        this.bg = new Na;
        this.content = new GraphicsObject;
        this.pivot = new GraphicsObject;
        Screen.call(this)
    };
    ScreenAwards.__name__ = !0;
    ScreenAwards.__super__ = Screen;
    ScreenAwards.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            ca.playTheme();
            this.addChild(this.bg);
            this.pivot.set_x(Math.round(h.width / 2));
            this.pivot.set_y(Math.round(h.height / 2));
            this.addChild(this.pivot);
            this.content.set_x(-this.pivot.x);
            this.content.set_y(-this.pivot.y);
            this.pivot.addChild(this.content);
            this.title.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.title.set_x(Math.round(h.width / 2));
            this.title.set_y(64);
            this.content.addChild(this.title);
            this.btnBack.set_x(Math.round(h.width / 2));
            this.btnBack.set_y(h.height - 88);
            this.btnBack.addEventListener("click", function(a) {
                2 > a.which && GameInstance.i.changeScreen(new ScreenExtras)
            });
            this.content.addChild(this.btnBack);
            this.content.addChild(this.sponsor);
            this.content.addChild(this.mute);
            this.refresh();
            GameInstance.i.warnNoSave(this)
        },
        refresh: function() {
            for (var a = 0, b = this.awardDisplays; a < b.length; ) {
                var c = b[a];
                ++a;
                this.content.removeChild(c)
            }
            null != this.erase && this.content.removeChild(this.erase);
            this.erase = new ButtonErase;
            this.content.addChild(this.erase);
            this.awardDisplays = [];
            a = Math.floor(AwardsManager.awardsAll.length / 3);
            b = 0;
            for (c = AwardsManager.awardsAll.length; b < c; ) {
                var d = b++
                  , e = Math.floor(d / 3)
                  , f = e < a ? 3 : AwardsManager.awardsAll.length - 3 * a
                  , m = new Xb(AwardsManager.awardsAll[d]);
                m.set_x(Math.floor(h.width / 2) - 80 * (f - 1) + 160 * (d - 3 * e));
                m.set_y(128 + 136 * e);
                this.content.addChild(m);
                this.awardDisplays.push(m)
            }
        },
        update: function() {
            if (this.rotating) {
                var a = Math.min((GameInstance.i.get_gameTime() - this.rotateStart) / Constants.rotateTime, 1)
                  , b = GameInstance.smootherStep(a);
                this.pivot.set_rotation(this.rotateStartAngle + (this.rotateEndAngle - this.rotateStartAngle) * b);
                if (1 == a) {
                    for (; 0 > this.pivot.rotation; )
                        a = this.pivot,
                        a.set_rotation(a.rotation + 360);
                    for (; 360 <= this.pivot.rotation; )
                        a = this.pivot,
                        a.set_rotation(a.rotation - 360);
                    this.rotating = !1
                }
            } else if (a = G.keyPressed(GameInstance.i.invert ? 69 : 81),
            b = G.keyPressed(GameInstance.i.invert ? 81 : 69),
            a || b)
                AwardsManager.awardRotate.unlock(),
                this.rotating = !0,
                this.rotateStart = GameInstance.i.get_gameTime(),
                this.rotateDir = a ? -1 : 1,
                this.rotateStartAngle = this.pivot.rotation,
                this.rotateEndAngle = this.rotateStartAngle + 90 * this.rotateDir,
                this.rotationSide += this.rotateDir,
                this.rotationSide = 0 > this.rotationSide ? 3 : 3 < this.rotationSide ? 0 : this.rotationSide
        },
        __class__: ScreenAwards
    });
    var ScreenCredits = function(a) {
        null == a && (a = !1);
        this.mute = new ButtonMute;
        this.more = new ImageSurface(Images.linkLWS);
        this.moreText = new GraphicsObjectText(GameInstance.fontMain,"Game published by",1);
        this.soundtrack = new ImageSurface(Images.soundtrack);
        this.text2 = new GraphicsObjectText(GameInstance.fontMain,"Special thanks to the playtesters\nand Patreon contributors!",1);
        this.joshua = new ImageSurface(Images.linkJoshua2);
        this.text1 = new GraphicsObjectText(GameInstance.fontMain,"Design, code, & music by",1);
        this.btnBack = new Button("BACK");
        Screen.call(this);
        this.fromEnd = a
    };
    ScreenCredits.__name__ = !0;
    ScreenCredits.__super__ = Screen;
    ScreenCredits.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            var a = this;
            if (this.fromEnd) {
                this.bg = new GraphicsObject;
                this.bg.graphics.beginFill(16777215);
                this.bg.graphics.drawRect(0, 0, h.width, h.height);
                var b = new ImageSurface(Images.vignette);
                b.set_alpha(.75);
                this.bg.addChild(b);
                this.btnBack.text.set_text("MENU")
            } else
                ca.playTheme(),
                this.bg = new Na;
            this.addChild(this.bg);
            this.text1.set_x(Math.round(h.width / 2));
            this.text1.set_y(80);
            this.text1.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.addChild(this.text1);
            this.joshua.set_x(Math.round((h.width - this.joshua.get_width()) / 2));
            this.joshua.set_y(this.text1.y + 36);
            this.joshua.mouseEnabled = this.joshua.buttonMode = !0;
            this.joshua.addEventListener("click", function(c) {
                1 < c.which || (c = window.open("https://criobite.com", "_blank"),
                AwardsManager.awardJoshua.unlock(),
                c.focus())
            });
            this.addChild(this.joshua);
            this.text2.set_x(this.text1.x);
            this.text2.set_y(this.joshua.y + this.joshua.get_height() + 40);
            this.text2.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.text2.align = GraphicsObjectText.ALIGN_CENTER;
            this.addChild(this.text2);
            this.text2.mouseEnabled = this.text2.buttonMode = !0;
            this.text2.addEventListener("click", function(c) {
                1 < c.which || window.open("https://www.patreon.com/lightwolfstudios", "_blank").focus()
            });
            this.soundtrack.set_x(h.width - this.soundtrack.get_width() - 6);
            this.soundtrack.set_y(8);
            this.soundtrack.mouseEnabled = this.soundtrack.buttonMode = !0;
            this.soundtrack.addEventListener("click", function(c) {
                1 < c.which || (window.open("https://criobite.com/link/rotate-soundtrack", "_blank").focus(),
                AwardsManager.awardSoundtrack.unlock())
            });
            this.addChild(this.soundtrack);
            this.moreText.set_x(this.text1.x);
            this.moreText.set_y(this.text2.y + this.text2.get_height() + 36);
            this.moreText.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.moreText.align = GraphicsObjectText.ALIGN_CENTER;
            this.addChild(this.moreText);
            this.more.set_x(Math.round((h.width - this.more.get_width()) / 2));
            this.more.set_y(this.moreText.y + this.moreText.get_height());
            this.more.mouseEnabled = this.more.buttonMode = !0;
            this.more.addEventListener("click", function(c) {
                2 <= c.which || (c = window.open("http://lightwolfstudios.com/", "_blank"),
                AwardsManager.awardJoshua.unlock(),
                c.focus())
            });
            this.addChild(this.more);
            this.btnBack.set_x(Math.round(h.width / 2));
            this.btnBack.set_y(h.height - 64);
            this.btnBack.addEventListener("click", function(c) {
                2 > c.which && (a.fromEnd && Sounds.surface.playing() && (GameInstance.ie ? Sounds.surface.stop() : (Sounds.surface.fade(1, 0, Math.round(Constants.screenFadeTime / 2)),
                Sounds.surface.once("fade", function() {
                    Sounds.surface.stop()
                }))),
                GameInstance.ie && (GameInstance.i.ieSurface = !1),
                GameInstance.i.changeScreen(a.fromEnd ? new ScreenExtras : new ca))
            });
            this.addChild(this.btnBack);
            this.addChild(this.mute)
        },
        __class__: ScreenCredits
    });
    var BaseLevel = function() {
        this.cameraX = this.cameraY = 0;
        this.level = new GraphicsObject;
        this.camera = new GraphicsObject;
        this.pivot = new GraphicsObject;
        this.bg = new GraphicsObject;
        Screen.call(this)
    };
    BaseLevel.__name__ = !0;
    BaseLevel.__super__ = Screen;
    BaseLevel.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            this.bg.graphics.beginFill(3158064);
            this.bg.graphics.drawRect(0, 0, h.width, h.height);
            this.addChild(this.bg);
            this.pivot.set_x(h.width / 2);
            this.pivot.set_y(h.height / 2);
            this.addChild(this.pivot);
            this.pivot.addChild(this.camera);
            this.level.set_x(-this.camera.x);
            this.level.set_y(-this.camera.y);
            this.camera.addChild(this.level);
            this.renderer = new L(this.camera);
            this.renderer.updateAllBlocks();
            this.level.addChild(this.renderer)
        },
        doRotation: function(a) {
            if (l.rotating) {
                var b = Math.min((GameInstance.i.get_gameTime() - this.rotateStart) / Constants.rotateTime, 1)
                  , c = GameInstance.smootherStep(b);
                this.pivot.set_rotation(this.rotateStartAngle + (this.rotateEndAngle - this.rotateStartAngle) * c);
                null != a && (a.set_rotation(-this.pivot.rotation),
                a.onRotating(c));
                if (1 == b) {
                    for (; 0 > this.pivot.rotation; )
                        b = this.pivot,
                        b.set_rotation(b.rotation + 360);
                    for (; 360 <= this.pivot.rotation; )
                        b = this.pivot,
                        b.set_rotation(b.rotation - 360);
                    l.rotating = !1;
                    if (null != a)
                        a.onRotateEnd()
                }
            } else if (b = G.keyPressed(GameInstance.i.invert ? 69 : 81),
            c = G.keyPressed(GameInstance.i.invert ? 81 : 69),
            (b || c) && (null == a || a.canRotate(b ? -1 : 1))) {
                l.rotating = !0;
                this.rotateStart = GameInstance.i.get_gameTime();
                this.rotateDir = b ? -1 : 1;
                this.rotateStartAngle = this.pivot.rotation;
                this.rotateEndAngle = this.rotateStartAngle + 90 * this.rotateDir;
                if (null != a)
                    a.onRotateStart(this.rotateDir);
                b = l;
                b.set_rotation(b.rotation + this.rotateDir);
                if (null != a)
                    a.onRotateStart2()
            }
        },
        postUpdate: function() {
            this.camera.set_x(Math.round(this.cameraX));
            this.camera.set_y(Math.round(this.cameraY))
        },
        __class__: BaseLevel
    });
    var EditorLevel = function() {
        this.doors = [];
        this.drawing = !1;
        this.horizontal = this.vertical = 0;
        BaseLevel.call(this)
    };
    EditorLevel.__name__ = !0;
    EditorLevel.renderBlockText = function(a, b) {
        EditorLevel.renderBlockRed(a, 0, 0);
        GraphicsObjectText.drawText(a, GameInstance.fontMain, b, 2, 0, 0)
    }
    ;
    EditorLevel.renderBlockRed = function(a, b, c) {
        a.beginFill(10428448, .4);
        a.drawRect(b, c, Constants.tileSize, Constants.tileSize);
        a.endFill()
    }
    ;
    EditorLevel.__super__ = BaseLevel;
    EditorLevel.prototype = __INHERIT__(BaseLevel.prototype, {
        init: function() {
            var a = this;
            l.set_level(EditorLevel.editorLevel);
            for (var b = 0, c = l.get_height(); b < c; )
                for (var d = b++, e = 0, f = l.get_width(); e < f; ) {
                    var m = e++;
                    m = l.getBlockData(m, d);
                    m.get_block() == EditorTiles.door && 0 < m.getMeta(1) && this.doors.push(new Va(m))
                }
            BaseLevel.prototype.init.call(this);
            this.cameraX = -(l.level.startCol + .5) * Constants.tileSize;
            this.cameraY = -(l.level.startRow - .5) * Constants.tileSize;
            this.mouseEnabled = !0;
            this.addEventListener("mouseDown", function(k) {
                2 > k.which && k.target == a && (a.drawing = !0)
            });
            h.input.addEventListener("mouseUp", T(this, this.mouseUp));
            this.renderer.showGrid = EditorLevel.showGrid;
            this.barUpper = new EditorBarUpper(EditorLevel.editorLevel.theme,function(k) {
                EditorLevel.editorLevel.theme = 1 - EditorLevel.editorLevel.theme;
                a.barUpper.theme.set_text(EditorBarUpper.THEMES[EditorLevel.editorLevel.theme]);
                a.renderer.updateAllBlocks()
            }
            );
            this.addChild(this.barUpper);
            this.barLower = new EditorBarLower(function() {
                a.renderer.showGrid = EditorLevel.showGrid
            }
            );
            this.addChild(this.barLower);
            this.barUpper.btnSave.addEventListener("click", function(k) {
                2 > k.which && a.showSaveDialog()
            });
            this.barUpper.btnLoad.addEventListener("click", function(k) {
                2 > k.which && a.showLoadDialog()
            });
            this.barUpper.btnClear.addEventListener("click", function(k) {
                if (2 > k.which) {
                    var p = new ModalYesNo("Are you sure you want\nto clear the level?");
                    p.onYes = function() {
                        EditorLevel.editorLevel.reset();
                        GameInstance.i.changeScreen(new EditorLevel, !1)
                    }
                    ;
                    p.onNo = function() {
                        a.removeChild(p);
                        a.dialog = null
                    }
                    ;
                    a.dialog = p;
                    a.addChild(p)
                }
            })
        },
        mouseUp: function(a) {
            2 > a.which && (this.drawing = !1)
        },
        getBoundsSelf: function() {
            return new Rectangle(0,0,h.width,h.height)
        },
        showLoadDialog: function() {
            var a = this;
            if (null == this.dialog) {
                var b = new Yb;
                b.onBack = function() {
                    b.kill();
                    a.removeChild(a.dialog);
                    a.dialog = null
                }
                ;
                b.onLoad = function(c) {
                    return a.tryLoadLevel(c) ? (b.kill(),
                    GameInstance.i.changeScreen(new EditorLevel, !1),
                    !0) : !1
                }
                ;
                this.dialog = b;
                this.addChild(b)
            }
        },
        showSaveDialog: function() {
            var a = this;
            if (null == this.dialog) {
                for (var b = -1, c = -1, d = 0, e = EditorLevel.editorLevel.tiles.length; d < e; )
                    for (var f = d++, m = 0, k = EditorLevel.editorLevel.tiles[f].length; m < k; ) {
                        var p = m++;
                        if (1 != EditorLevel.editorLevel.tiles[f][p][0]) {
                            -1 == b && (b = f);
                            c = f;
                            break
                        }
                    }
                e = d = -1;
                f = 0;
                for (m = EditorLevel.editorLevel.tiles[0].length; f < m; ) {
                    k = f++;
                    p = 0;
                    for (var y = EditorLevel.editorLevel.tiles.length; p < y; ) {
                        var H = p++;
                        if (1 != EditorLevel.editorLevel.tiles[H][k][0]) {
                            -1 == d && (d = k);
                            e = k;
                            break
                        }
                    }
                }
                f = EditorLevel.editorLevel.startCol - d + ",";
                f += EditorLevel.editorLevel.startRow - b + ",";
                f += EditorLevel.editorLevel.finishCol - d + ",";
                f += EditorLevel.editorLevel.finishRow - b + ",";
                f = f + (d + ",") + b;
                0 != EditorLevel.editorLevel.theme && (f += "," + EditorLevel.editorLevel.theme);
                f += "|";
                m = b;
                for (c += 1; m < c; )
                    for (k = m++,
                    k > b && (f += ";"),
                    p = d,
                    y = e + 1; p < y; ) {
                        H = p++;
                        for (var K = "", W = EditorLevel.editorLevel.tiles[k][H].length; 0 < --W && 0 == EditorLevel.editorLevel.tiles[k][H][W]; )
                            ;
                        var aa = 0;
                        for (W += 1; aa < W; ) {
                            var fa = aa++;
                            "" != K && (K += ".");
                            0 != EditorLevel.editorLevel.tiles[k][H][fa] && (K += EditorLevel.editorLevel.tiles[k][H][fa])
                        }
                        H > d && (f += ",");
                        f += K
                    }
                var ka = new Zb(f);
                ka.onBack = function() {
                    ka.kill();
                    a.removeChild(ka);
                    a.dialog = null
                }
                ;
                this.dialog = ka;
                this.addChild(ka)
            }
        },
        update: function() {
            var a = this;
            BaseLevel.prototype.update.call(this);
            if (null == this.dialog) {
                this.doRotation();
                this.horizontal = GameInstance.getInputX();
                this.vertical = GameInstance.getInputY();
                var b = h.input.mouseX
                  , c = h.input.mouseY;
                if (this.drawing && !l.rotating && 0 <= b && 0 <= c && b < h.width && c < h.height) {
                    if (null == l.level)
                        return;
                    b = this.renderer.globalToLocal(b, c);
                    var d = Math.floor(b.x / Constants.tileSize)
                      , e = Math.floor(b.y / Constants.tileSize);
                    if (l.isInBounds(d, e)) {
                        var f = [];
                        b = null;
                        var m = G.keyDown(16) ? 0 : this.barLower.selector.get_selection().id;
                        if (m == EditorTiles.start.id) {
                            if (0 < e && (d != EditorLevel.editorLevel.finishCol || e != EditorLevel.editorLevel.finishRow && e - 1 != EditorLevel.editorLevel.finishRow && e != EditorLevel.editorLevel.finishRow - 1)) {
                                c = EditorLevel.editorLevel.startCol;
                                var k = EditorLevel.editorLevel.startRow;
                                EditorLevel.editorLevel.setStart(d, e);
                                var p = l.getBlockData(d, e - 1);
                                f.push(p);
                                l.setBlock(d, e - 1, 0, [], !0);
                                p = l.getBlockData(d, e);
                                f.push(p);
                                l.setBlock(d, e, 0, [], !0);
                                this.renderer.updateBlockPlus(c, k - 1);
                                this.renderer.updateBlockPlus(c, k);
                                this.renderer.updateBlockPlus(d, e - 1);
                                this.renderer.updateBlockPlus(d, e)
                            }
                        } else if (m == EditorTiles.finish.id)
                            0 < e && (d != EditorLevel.editorLevel.startCol || e != EditorLevel.editorLevel.startRow && e - 1 != EditorLevel.editorLevel.startRow && e != EditorLevel.editorLevel.startRow - 1) && (c = EditorLevel.editorLevel.finishCol,
                            k = EditorLevel.editorLevel.finishRow,
                            EditorLevel.editorLevel.setFinish(d, e),
                            p = l.getBlockData(d, e - 1),
                            f.push(p),
                            l.setBlock(d, e - 1, 0, [], !0),
                            p = l.getBlockData(d, e),
                            f.push(p),
                            l.setBlock(d, e, 0, [], !0),
                            this.renderer.updateBlockPlus(c, k - 1),
                            this.renderer.updateBlockPlus(c, k),
                            this.renderer.updateBlockPlus(d, e - 1),
                            this.renderer.updateBlockPlus(d, e));
                        else if (l.isReplacable(d, e) && (c = EditorTiles.getBlock(m),
                        null != c)) {
                            var y = EditorTiles.getBlock(m).getConfigMeta();
                            k = l.getBlockData(d, e);
                            k.id == m && k.metaEquals(y) || c == EditorTiles.door && !Va.canPlace(d, e, y) || (f.push(k),
                            l.setBlock(d, e, m, y, !0),
                            this.renderer.updateBlockPlus(d, e),
                            c == EditorTiles.door && (b = new Va(l.getBlockData(d, e)),
                            this.doors.push(b),
                            b.forEach(function(aa, fa) {
                                if (aa != d || fa != e) {
                                    var ka = l.getBlockData(aa, fa);
                                    f.push(ka);
                                    l.setBlock(aa, fa, m, [y[0]], !0);
                                    a.renderer.updateBlockPlus(aa, fa)
                                }
                            })))
                        }
                        for (c = 0; c < f.length; )
                            if (k = f[c],
                            ++c,
                            k.get_block() == EditorTiles.door) {
                                p = 0;
                                for (var H = this.doors.length; p < H; ) {
                                    var K = p++
                                      , W = this.doors[K];
                                    if (W != b && W.contains(k.x, k.y)) {
                                        W.forEach(function(aa, fa) {
                                            if (l.getBlock(aa, fa) == EditorTiles.door) {
                                                for (var ka = !1, Ca = 0; Ca < f.length; ) {
                                                    var nb = f[Ca];
                                                    ++Ca;
                                                    if (nb.x == aa && nb.y == fa) {
                                                        ka = !0;
                                                        break
                                                    }
                                                }
                                                ka || (l.setBlock(aa, fa, 0, [], !0),
                                                a.renderer.updateBlockPlus(aa, fa))
                                            }
                                        });
                                        this.doors.splice(K, 1);
                                        break
                                    }
                                }
                            }
                    }
                }
                G.keyPressed(76) && this.showLoadDialog();
                G.keyPressed(67) && this.showSaveDialog();
                G.keyPressed(71) && (this.renderer.showGrid = EditorLevel.showGrid = !EditorLevel.showGrid,
                this.barLower.gridToggle.toggle.clipRect.x = EditorLevel.showGrid ? this.barLower.gridToggle.toggle.clipRect.width : 0);
                G.keyPressed(13) && GameInstance.i.changeScreen(new GameplayLevel(EditorLevel.editorLevel))
            }
        },
        tryLoadLevel: function(a) {
            a = ma.replace(ma.replace(ma.trim(a), "\n", ""), "\t", "");
            var b = a.split("|");
            if (2 > b.length)
                return !1;
            var c = b[0].split(",");
            if (4 > c.length)
                return !1;
            a = la.parseInt(c[0]);
            var d = la.parseInt(c[1])
              , e = la.parseInt(c[2])
              , f = la.parseInt(c[3]);
            if (null == a || null == d || null == e || null == f || 0 > a || 0 > e || 1 > d || 1 > f || a == e && (d == f || 1 == Math.abs(d - f)))
                return !1;
            var m = 0
              , k = 0
              , p = 0;
            5 <= c.length && (m = la.parseInt(c[4]),
            null == m || 0 > m) && (m = 0);
            6 <= c.length && (k = la.parseInt(c[5]),
            null == k || 0 > k) && (k = 0);
            7 <= c.length && (p = la.parseInt(c[6]),
            null == p || 0 > p || 1 < p) && (p = 0);
            var y = b[1].split(";")
              , H = y.length;
            if (1 > H || H > LevelEditor.WORLD_SIZE || d >= H || f >= H)
                return !1;
            c = 0;
            b = [];
            for (var K = 0; K < H; ) {
                var W = K++;
                b[W] = [];
                for (var aa = y[W].split(","), fa = 0, ka = aa.length; fa < ka; ) {
                    var Ca = fa++;
                    c <= Ca && (c = Ca + 1);
                    b[W][Ca] = [];
                    for (var nb = aa[Ca].split("."), nc = 0, uc = nb.length; nc < uc; ) {
                        var ic = nc++;
                        if ("" == nb[ic])
                            b[W][Ca][ic] = 0;
                        else {
                            var oc = la.parseInt(nb[ic]);
                            if (null == oc)
                                return !1;
                            b[W][Ca][ic] = oc
                        }
                    }
                }
            }
            if (1 > c || c > LevelEditor.WORLD_SIZE || a >= c || e >= c)
                return !1;
            for (y = 0; y < H; )
                for (K = y++; b[K].length < c; )
                    b[K].push([0]);
            m = Math.min(m, LevelEditor.WORLD_SIZE - c);
            k = Math.min(k, LevelEditor.WORLD_SIZE - H);
            if (a >= c || d >= H || e >= c || f >= H || 0 != b[d][a][0] || 0 != b[d - 1][a][0] || 0 != b[f][e][0] || 0 != b[f - 1][e][0])
                return !1;
            for (y = 0; y < b.length; )
                for (K = b[y],
                ++y; K.length < c + m; )
                    K.splice(0, 0, [1]);
            for (; b.length < H + k; ) {
                for (y = []; y.length < c + m; )
                    y.push([1]);
                b.splice(0, 0, y)
            }
            for (; b.length < LevelEditor.WORLD_SIZE; ) {
                for (H = []; H.length < c + m; )
                    H.push([1]);
                b.push(H)
            }
            for (c = 0; c < b.length; )
                for (H = b[c],
                ++c; H.length < LevelEditor.WORLD_SIZE; )
                    H.push([1]);
            EditorLevel.editorLevel.load(b, a + m, d + k, e + m, f + k, p);
            return !0
        },
        tick: function() {
            if (!l.rotating && null == this.dialog) {
                var a = this.horizontal * EditorLevel.MOVE_SPEED
                  , b = this.vertical * EditorLevel.MOVE_SPEED;
                0 == l.rotation ? (this.cameraX -= a,
                this.cameraY -= b) : 1 == l.rotation && (this.cameraX -= b,
                this.cameraY += a);
                2 == l.rotation && (this.cameraX += a,
                this.cameraY += b);
                3 == l.rotation && (this.cameraX += b,
                this.cameraY -= a);
                this.cameraX = Math.min(Math.max(this.cameraX, -this.renderer.get_width()), 0);
                this.cameraY = Math.min(Math.max(this.cameraY, -this.renderer.get_height()), 0)
            }
        },
        kill: function() {
            h.input.removeEventListener("mouseUp", T(this, this.mouseUp));
            l.set_level(null)
        },
        __class__: EditorLevel
    });
    var bb = function(a) {
        null == a && (a = !1);
        this.done1 = this.first = !1;
        this.cond1 = new SpeechConditionDelay(10);
        Screen.call(this);
        this.pausable = !0;
        this.speedrun = a
    };
    bb.__name__ = !0;
    bb.__super__ = Screen;
    bb.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            GameInstance.ie && Sounds.themeGame2.volume(.5);
            this.cond1.start();
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(1.5),"Have your freedom, for now."), new SpeechEvent(new SpeechConditionDelay(4),"But you will come back.")],this);
            this.speedrun && 42E4 >= Levels.speedrunBest && AwardsManager.awardSpeedrun.unlock();
            if (this.first = !AwardsManager.awardEscape.unlocked)
                AwardsManager.awardEscape.unlocked = !0,
                GameInstance.i.saveProgress()
        },
        update: function() {
            this.speech.update();
            !this.done1 && this.cond1.test() && (this.done1 = !0,
            GameInstance.i.changeScreen(new ob(this.first), !0, null, !0),
            GameInstance.ie && GameInstance.i.muteSFX || (Sounds.exit.volume(.5),
            Sounds.exit.play(),
            Sounds.exit.once("end", function() {
                Sounds.exit.volume(1)
            })))
        },
        kill: function() {
            Sounds.themeGame2.stop();
            Sounds.themeGame2.volume(1);
            GameInstance.ie && (GameInstance.i.ieGame2 = !1)
        },
        __class__: bb
    });
    var ob = function(a) {
        null == a && (a = !1);
        this.hint = new GraphicsObjectText(GameInstance.fontMain,"Press [SPACE] to continue...");
        this.catTrigger = !1;
        this.cat = new S;
        this.player = new ua(Images.player,32,48);
        this.artPlants = new ua(Images.endingPlants,504,24);
        this.artMain = new ImageSurface(Images.endingMain);
        this.vignette = new ImageSurface(Images.vignette);
        this.bg = new GraphicsObject;
        this.cameraX = this.cameraY = 0;
        this.camera = new GraphicsObject;
        this.pivot = new GraphicsObject;
        this.done = !1;
        this.delay = 9.5;
        Screen.call(this);
        this.pausable = !0;
        this.first = a
    };
    ob.__name__ = !0;
    ob.__super__ = Screen;
    ob.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            this.start = GameInstance.i.get_gameTime();
            this.bg.graphics.beginFill(16777215);
            this.bg.graphics.drawRect(0, 0, h.width, h.height);
            this.addChild(this.bg);
            this.pivot.set_x(h.width / 2);
            this.pivot.set_y(h.height / 2);
            this.addChild(this.pivot);
            this.pivot.addChild(this.camera);
            this.camera.addChild(this.artMain);
            this.artPlants.set_y(11 * Constants.tileSize);
            this.artPlants.set_animation(new GameAnimation([0, 1, 2],[250, 250, 250]));
            this.camera.addChild(this.artPlants);
            this.cat.x2 = this.cat.set_x(17.5 * Constants.tileSize);
            this.cat.set_y(12 * Constants.tileSize);
            this.cat.set_scaleX(-1);
            this.cat.set_animation(S.ANIM_IDLE);
            this.camera.addChild(this.cat);
            this.player.origin.x = this.player.frameW / 2;
            this.player.origin.y = this.player.frameH;
            this.player.set_animation(J.ANIM_IDLE);
            this.player.set_x(10.5 * Constants.tileSize);
            this.player.set_y(12 * Constants.tileSize);
            this.camera.addChild(this.player);
            this.camera.set_x(Math.round(this.cameraX = -this.player.x));
            this.camera.set_y(Math.round(this.cameraY = -this.player.y + Constants.rotateOffset + 2 * Constants.tileSize));
            this.vignette.set_alpha(.75);
            this.addChild(this.vignette);
            this.hint.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.hint.yAlign = GraphicsObjectText.Y_ALIGN_BOTTOM;
            this.hint.set_x(Math.round(h.width / 2));
            this.hint.set_y(h.height - 24);
            this.hint.set_alpha(0);
            this.addChild(this.hint);
            Sounds.surface.volume(1);
            GameInstance.ie && GameInstance.i.muteSFX && GameInstance.i.muteMusic ? GameInstance.i.ieSurface = !0 : (Sounds.surface.play(),
            GameInstance.ie || Sounds.surface.fade(0, 1, Math.round(Constants.screenFadeTimeSlow / 2)))
        },
        update: function() {
            var a = this
              , b = GameInstance.i.get_gameTime() - this.start;
            !this.catTrigger && 8 <= b && (this.catTrigger = !0,
            this.cat.set_scaleX(1),
            this.cat.horizontal = 1,
            this.cat.set_animation(S.ANIM_END_1),
            this.cat.onFinish = function() {
                a.cat.set_animation(S.ANIM_END_2);
                a.cat.onFinish = null
            }
            );
            var c = b - this.delay;
            this.hint.set_alpha(0 > c ? 0 : .33 * GameInstance.smootherStep(Math.min(c / 2.5, 1)));
            !this.done && b >= this.delay && G.keyPressed(32) && (this.done = !0,
            this.first && (AwardsManager.awardEscape.unlocked = !1,
            AwardsManager.awardEscape.unlock()),
            GameInstance.i.changeScreen(new ScreenCredits(!0), !0, null, !0, !0),
            GameInstance.i.timerHolder.removeChildren())
        },
        tick: function() {
            var a = .75 * Constants.cameraSpeed;
            this.cameraX += (-this.player.x - this.cameraX) * a;
            this.cameraY += (-this.player.y + Constants.rotateOffset - this.cameraY) * a;
            this.cat.x < h.width + 100 && this.cat.tick()
        },
        postUpdate: function() {
            this.camera.set_x(Math.round(this.cameraX));
            this.camera.set_y(Math.round(this.cameraY))
        },
        __class__: ob
    });
    var ScreenExtras = function() {
        this.erase = new ButtonErase;
        this.mute = new ButtonMute;
        this.sponsor = new ButtonSponsor;
        this.bestTime = new GraphicsObjectText(GameInstance.fontMain,"Best time: ",2);
        this.text3 = new GraphicsObjectText(GameInstance.fontMain,"Finish the game as\nquickly as you can.",1);
        this.btn3 = new Button("SPEEDRUN");
        this.text2 = new GraphicsObjectText(GameInstance.fontMain,"Build custom levels\nand share codes.",1);
        this.btn2 = new Button("EDITOR");
        this.text1 = new GraphicsObjectText(GameInstance.fontMain,"See all the awards\nthat you've earned.",1);
        this.btn1 = new Button("AWARDS");
        this.btnBack = new Button("BACK");
        this.title = new GraphicsObjectText(GameInstance.fontMain,"EXTRAS",1);
        this.bg = new Na;
        Screen.call(this)
    };
    ScreenExtras.__name__ = !0;
    ScreenExtras.__super__ = Screen;
    ScreenExtras.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            ca.playTheme();
            this.addChild(this.bg);
            this.title.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.title.set_x(Math.round(h.width / 2));
            this.title.set_y(56);
            this.addChild(this.title);
            this.btn1.set_x(134);
            this.btn1.set_y(133);
            this.btn1.addEventListener("click", function(b) {
                2 > b.which && GameInstance.i.changeScreen(new ScreenAwards)
            });
            this.addChild(this.btn1);
            this.text1.set_x(this.btn1.x + 110);
            this.text1.set_y(this.btn1.y - 29);
            this.addChild(this.text1);
            this.btn2.set_x(this.btn1.x);
            this.btn2.set_y(this.btn1.y + 92);
            this.btn2.addEventListener("click", function(b) {
                2 > b.which && (ca.stopTheme(),
                GameInstance.i.changeScreen(new EditorLevel))
            });
            this.addChild(this.btn2);
            this.text2.set_x(this.text1.x);
            this.text2.set_y(this.btn2.y - 29);
            this.addChild(this.text2);
            this.btn3.set_x(this.btn2.x);
            this.btn3.set_y(this.btn2.y + 92);
            this.btn3.addEventListener("click", function(b) {
                2 > b.which && (ca.stopTheme(),
                GameInstance.i.changeScreen(new Qa(!0)))
            });
            this.addChild(this.btn3);
            this.text3.set_x(this.text2.x);
            this.text3.set_y(this.btn3.y - 29);
            this.addChild(this.text3);
            this.bestTime.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.bestTime.set_x(Math.round(h.width / 2));
            this.bestTime.set_y(this.btn3.y + 21 + 8);
            var a = this.bestTime;
            a.set_text(a.text + (-1 < Levels.speedrunBest ? GameInstance.formatMS(Levels.speedrunBest) : "--:--:----"));
            0 > Levels.speedrunBest && this.bestTime.set_alpha(.5);
            this.addChild(this.bestTime);
            this.btnBack.set_x(Math.round(h.width / 2));
            this.btnBack.set_y(h.height - 80);
            this.btnBack.addEventListener("click", function(b) {
                2 > b.which && GameInstance.i.changeScreen(new ca)
            });
            this.addChild(this.btnBack);
            this.addChild(this.sponsor);
            this.addChild(this.mute);
            this.addChild(this.erase);
            GameInstance.i.warnNoSave(this)
        },
        __class__: ScreenExtras
    });
    var ScreenLevelSelect = function() {
        this.erase = new ButtonErase;
        this.mute = new ButtonMute;
        this.sponsor = new ButtonSponsor;
        this.tiles = new GraphicsObject;
        this.btnBack = new Button("BACK");
        this.title = new GraphicsObjectText(GameInstance.fontMain,"LEVEL SELECT",1);
        this.bg = new Na;
        Screen.call(this)
    };
    ScreenLevelSelect.__name__ = !0;
    ScreenLevelSelect.__super__ = Screen;
    ScreenLevelSelect.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            ca.playTheme();
            this.addChild(this.bg);
            this.title.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
            this.title.set_x(Math.round(h.width / 2));
            this.title.set_y(56);
            this.addChild(this.title);
            this.addChild(this.tiles);
            this.btnBack.set_x(Math.round(h.width / 2));
            this.btnBack.set_y(h.height - 84);
            this.btnBack.addEventListener("click", function(a) {
                2 > a.which && GameInstance.i.changeScreen(new ca)
            });
            this.addChild(this.btnBack);
            this.addChild(this.sponsor);
            this.addChild(this.mute);
            this.addChild(this.erase);
            GameInstance.i.warnNoSave(this);
            this.refresh()
        },
        refresh: function() {
            this.tiles.removeChildren();
            for (var a = Levels.list.length, b = Math.round((h.width - (4 * Images.level.width + 72)) / 2), c = this.title.y + 56, d = 0; d < a; ) {
                var e = [d++]
                  , f = Math.floor(e[0] / 4)
                  , m = e[0] % 4
                  , k = e[0] <= Levels.unlocked
                  , p = new ImageSurface(Images.level);
                p.set_x(b + m * (p.get_width() + 24));
                p.set_y(c + f * (p.get_height() + 20));
                k ? (p.mouseEnabled = p.buttonMode = !0,
                p.addEventListener("click", function(y) {
                    return function(H) {
                        1 < H.which || (ca.stopTheme(),
                        0 == y[0] ? GameInstance.i.changeScreen(new Qa) : GameplayLevel.play(Levels.list[y[0]]))
                    }
                }(e))) : p.set_alpha(.5);
                this.tiles.addChild(p);
                e = new GraphicsObjectText(GameInstance.fontMain,"" + (e[0] + 1));
                e.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
                e.yAlign = GraphicsObjectText.Y_ALIGN_MIDDLE;
                e.set_x(Math.round(p.get_width() / 2));
                e.set_y(Math.round(p.get_height() / 2) - 2);
                p.addChild(e)
            }
        },
        __class__: ScreenLevelSelect
    });
    var ca = function() {
        this.erase = new ButtonErase;
        this.mute = new ButtonMute;
        this.sponsor = new ButtonSponsor;
        this.btnCredits = new Button("CREDITS");
        this.btnExtras = new Button("EXTRAS");
        this.btnPlay = new Button("PLAY");
        this.logo = new ImageSurface(Images.logo);
        this.bg = new Na;
        Screen.call(this)
    };
    ca.__name__ = !0;
    ca.playTheme = function() {
        Sounds.themeMenu.playing() || (GameInstance.ie && GameInstance.i.muteMusic || Sounds.themeMenu.play(),
        GameInstance.ie && (GameInstance.i.ieMenu = !0))
    }
    ;
    ca.stopTheme = function() {
        GameInstance.ie ? (Sounds.themeMenu.stop(),
        GameInstance.i.ieMenu = !1) : (Sounds.themeMenu.fade(1, 0, Math.floor(Constants.screenFadeTime / 2)),
        Sounds.themeMenu.once("fade", function() {
            Sounds.themeMenu.stop();
            Sounds.themeMenu.volume(1)
        }))
    }
    ;
    ca.__super__ = Screen;
    ca.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            ca.playTheme();
            this.addChild(this.bg);
            this.addChild(this.sponsor);
            this.logo.set_x(Math.floor((h.width - this.logo.get_width()) / 2));
            this.logo.set_y(80);
            this.addChild(this.logo);
            this.btnPlay.set_x(Math.floor(h.width / 2));
            this.btnPlay.set_y(Math.floor(h.height / 2) - 1);
            this.btnPlay.addEventListener("click", function(a) {
                1 < a.which || (0 == Levels.unlocked ? (ca.stopTheme(),
                GameInstance.i.changeScreen(new Qa)) : GameInstance.i.changeScreen(new ScreenLevelSelect))
            });
            this.addChild(this.btnPlay);
            this.btnExtras.set_x(this.btnPlay.x);
            this.btnExtras.set_y(this.btnPlay.y + 60);
            this.btnExtras.addEventListener("click", function(a) {
                2 > a.which && GameInstance.i.changeScreen(new ScreenExtras)
            });
            this.addChild(this.btnExtras);
            this.btnCredits.set_x(this.btnExtras.x);
            this.btnCredits.set_y(this.btnExtras.y + 60);
            this.btnCredits.addEventListener("click", function(a) {
                2 > a.which && GameInstance.i.changeScreen(new ScreenCredits)
            });
            this.addChild(this.btnCredits);
            this.addChild(this.mute);
            this.addChild(this.erase);
            GameInstance.i.warnNoSave(this)
        },
        __class__: ca
    });
    var GameplayLevel = function(a, b, c) {
        null == c && (c = -1);
        null == b && (b = !1);
        this.channels = new hb;
        this.newBest = !1;
        this.speedrunFinal = -1;
        this.doors = [];
        this.cat = null;
        this.vignette = new ImageSurface(Images.vignette);
        this.red = new GraphicsObject;
        this.overlay = new GraphicsObject;
        this.textHolder = new GraphicsObject;
        this.blood = new GraphicsObject;
        this.shakeX = this.shakeY = 0;
        this.deathTime = -1;
        BaseLevel.call(this);
        this.tempLevel = a;
        this.pausable = !0;
        this.speedrun = b;
        this.speedrunStart = c;
        0 == a.theme && Sounds.themeGame1.playing() || 1 == a.theme && Sounds.themeGame2.playing() ? GameplayLevel.continueTheme = !0 : GameplayLevel.continueTheme = !1
    };
    GameplayLevel.__name__ = !0;
    GameplayLevel.play = function(a, b, c) {
        null == c && (c = -1);
        null == b && (b = !1);
        null != a && GameInstance.i.changeScreen(new GameplayLevel(a,b,c))
    }
    ;
    GameplayLevel.playTheme = function(a) {
        GameplayLevel.stopped && (0 == a && Sounds.themeGame1.playing() ? (Sounds.themeGame1.stop(),
        GameplayLevel.canceled = !0) : 1 == a && Sounds.themeGame2.playing() && (Sounds.themeGame2.stop(),
        GameplayLevel.canceled = !0),
        GameInstance.ie && (GameInstance.i.ieGame1 = GameInstance.i.ieGame2 = !1),
        GameplayLevel.stopped = !1);
        0 == a ? (Sounds.themeGame1.volume(1),
        Sounds.themeGame1.playing() || (GameInstance.ie && GameInstance.i.muteMusic || Sounds.themeGame1.play(),
        GameInstance.ie && (GameInstance.i.ieGame1 = !0))) : 1 == a && (Sounds.themeGame2.volume(1),
        Sounds.themeGame2.playing() || (GameInstance.ie && GameInstance.i.muteMusic || Sounds.themeGame2.play(),
        GameInstance.ie && (GameInstance.i.ieGame2 = !0)))
    }
    ;
    GameplayLevel.stopTheme = function() {
        var a = Sounds.themeGame1.playing() ? Sounds.themeGame1 : Sounds.themeGame2.playing() ? Sounds.themeGame2 : null;
        if (null != a) {
            var b = ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && ES3ClassUtils.__instanceof(GameInstance.i.targetScreen, bb);
            if (GameInstance.ie)
                b || a.stop();
            else {
                var c = a.volume();
                a.fade(c, 0, Math.floor(Constants.screenFadeTime / 2) + (b ? 1E4 : 0));
                a.once("fade", function() {
                    GameplayLevel.canceled || (a.stop(),
                    a.volume(1))
                })
            }
            GameplayLevel.stopped = !0;
            GameplayLevel.canceled = !1
        } else
            GameplayLevel.stopped = GameplayLevel.canceled = !1;
        GameInstance.ie && (GameInstance.i.ieGame1 = GameInstance.i.ieGame2 = !1)
    }
    ;
    GameplayLevel.__super__ = BaseLevel;
    GameplayLevel.prototype = __INHERIT__(BaseLevel.prototype, {
        init: function() {
            GameplayLevel.i = this;
            this.tempLevel == EditorLevel.editorLevel && AwardsManager.awardEditor.unlock();
            GameplayLevel.playTheme(this.tempLevel.theme);
            GameplayLevel.continueTheme = !1;
            l.set_level(this.tempLevel);
            l.onPlay();
            for (var a = this.channels.iterator(); a.hasNext(); )
                a.next().lastChanged = -1E4;
            a = 0;
            for (var b = l.get_height(); a < b; )
                for (var c = a++, d = 0, e = l.get_width(); d < e; ) {
                    var f = d++;
                    f = l.getBlockData(f, c);
                    f.get_block() == EditorTiles.door && 0 < f.getMeta(1) && this.doors.push(new Va(f))
                }
            l.level.start();
            BaseLevel.prototype.init.call(this);
            this.player = new J;
            this.player.set_x(this.player.x2 = this.player.lastX = (l.level.startCol + .5) * Constants.tileSize);
            this.player.set_y(this.player.y2 = this.player.lastY = (l.level.startRow + 1) * Constants.tileSize);
            this.player.set_scaleX(0 > l.level.startDir ? -1 : 1);
            this.level.addChild(this.player);
            a = this.findCameraGoal();
            this.camera.set_x(Math.round(this.cameraX = a.x));
            this.camera.set_y(Math.round(this.cameraY = a.y + 2 * Constants.tileSize));
            this.level.addChild(this.blood);
            this.level.addChild(this.overlay);
            this.vignette.set_alpha(.75);
            this.addChild(this.vignette);
            this.addChild(this.textHolder);
            this.red.graphics.beginFill(14622752);
            this.red.graphics.drawRect(0, 0, h.width, h.height);
            this.red.visible = !1;
            this.addChild(this.red);
            if (this.speedrun) {
                if (-1 == this.speedrunStart || 0 == Levels.list.indexOf(l.level))
                    this.speedrunStart = GameInstance.i.get_gameTimeMS();
                this.timerText = new GraphicsObjectText(GameInstance.fontMain,"",2);
                this.timerText.align = GraphicsObjectText.ALIGN_RIGHT;
                this.timerText.xAlign = GraphicsObjectText.X_ALIGN_RIGHT;
                this.timerText.set_x(h.width - 12);
                this.timerText.set_y(8);
                GameInstance.i.timerHolder.addChild(this.timerText);
                this.updateTimer()
            } else
                l.level != Levels.level1 || GameInstance.i.hasPaused || (this.pauseText = new GraphicsObjectText(GameInstance.fontMain,"Press [ESC] or [P] to pause"),
                this.pauseText.xAlign = GraphicsObjectText.X_ALIGN_CENTER,
                this.pauseText.set_x(Math.round(h.width / 2)),
                this.pauseText.set_y(8),
                this.pauseText.set_alpha(.33),
                this.addChild(this.pauseText))
        },
        updateTimer: function() {
            this.speedrun && this.timerText.set_text(GameInstance.formatMS(GameInstance.i.get_gameTimeMS() - this.speedrunStart))
        },
        killPlayer: function(a) {
            null == a && (a = !1);
            if (!this.player.dead) {
                this.player.dead = !0;
                this.deathTime = GameInstance.i.get_gameTime();
                this.player.visible = !1;
                GameInstance.ie && GameInstance.i.muteSFX || Sounds.death.play();
                var b = 0
                  , c = 0;
                0 == l.rotation ? c = 1 : 1 == l.rotation ? b = 1 : 2 == l.rotation ? c = -1 : 3 == l.rotation && (b = -1);
                var d = this.player.dx
                  , e = this.player.dy;
                1 == l.rotation ? (d = this.player.dy,
                e = -this.player.dx) : 2 == l.rotation ? (d = -this.player.dx,
                e = -this.player.dy) : 3 == l.rotation && (d = -this.player.dy,
                e = this.player.dx);
                4 < d ? d = 4 : -4 > d && (d = -4);
                4 < e ? e = 4 : -4 > e && (e = -4);
                var f = this.player.getHitBounds().get_center();
                a = new Blood(f.x,f.y,14622752,.4 * d,.4 * e,b,c,!0,a ? 2 : 1);
                this.blood.addChild(a);
                null != l.level.speech && l.level.speech.killed();
                this.red.visible = !0
            }
        },
        restart: function(a) {
            a = GameInstance.i.paused ? (Ja = GameInstance.i,
            T(Ja, Ja.unpause)) : null;
            GameInstance.i.changeScreen(new GameplayLevel(l.level,this.speedrun,this.speedrunStart), !0, a)
        },
        finished: function() {
            var a = Levels.list.indexOf(l.level);
            if (-1 < a) {
                var b = !1;
                ++a;
                if (this.speedrun && a == Levels.list.length) {
                    if (this.speedrunFinal = GameInstance.i.get_gameTimeMS() - this.speedrunStart + Constants.screenFadeTime / 2,
                    0 > Levels.speedrunBest || this.speedrunFinal < Levels.speedrunBest)
                        Levels.speedrunBest = this.speedrunFinal,
                        b = this.newBest = !0
                } else
                    a > Levels.unlocked && a < Levels.list.length && (Levels.unlocked = a,
                    b = !0);
                b && GameInstance.i.saveProgress()
            }
            a = l.level.finished();
            null != a && GameplayLevel.play(a, this.speedrun, this.speedrunStart)
        },
        update: function() {
            BaseLevel.prototype.update.call(this);
            if (this.player.dead) {
                var a = 1 - Math.min((GameInstance.i.get_gameTime() - this.deathTime) / GameplayLevel.DEATH_SHAKE_TIME, 1);
                this.red.set_alpha(a);
                a = GameInstance.smootherStep(a);
                this.shakeX = Math.random() * GameplayLevel.DEATH_SHAKE_AMOUNT * a;
                this.shakeY = Math.random() * GameplayLevel.DEATH_SHAKE_AMOUNT * a;
                GameInstance.i.get_gameTime() - this.deathTime >= GameplayLevel.DEATH_TIME && null == GameInstance.i.targetScreen && this.restart(!0)
            } else
                this.player.finished || this.doRotation(this.player);
            this.player.update()
        },
        tick: function() {
            this.player.tick();
            l.level.tick();
            null != this.cat && this.cat.tick();
            var a = this.findCameraGoal();
            this.cameraX += (a.x - this.cameraX) * Constants.cameraSpeed;
            this.cameraY += (a.y - this.cameraY) * Constants.cameraSpeed
        },
        postUpdate: function() {
            this.player.postUpdate();
            l.level.update();
            this.camera.set_x(Math.round(this.cameraX + this.shakeX));
            this.camera.set_y(Math.round(this.cameraY + this.shakeY));
            this.updateTimer()
        },
        findCameraGoal: function() {
            var a = this.player.localToGlobal(0, 0);
            a = this.camera.globalToLocal(a.x, a.y - (l.rotating ? 0 : Constants.rotateOffset));
            a.x *= -1;
            a.y *= -1;
            return a
        },
        signalOn: function(a, b, c) {
            var d = this.channels.h[c];
            null == d && (d = new hc(c),
            this.channels.h[c] = d);
            d.signalOn(a, b)
        },
        signalOff: function(a, b, c) {
            c = this.channels.h[c];
            null != c && c.signalOff(a, b)
        },
        getChannelStatus: function(a) {
            a = this.channels.h[a];
            return null != a ? a.get_status() : !1
        },
        catAppear: function(a, b, c) {
            this.cat = new S;
            this.cat.set_x(this.cat.x2 = (a + .5) * Constants.tileSize);
            this.cat.set_y((b + 1) * Constants.tileSize);
            this.cat.set_scaleX(c);
            this.cat.set_animation(S.ANIM_IDLE);
            this.level.addChild(this.cat)
        },
        catDisappear: function(a) {
            null == a && (a = 0);
            var b = this;
            null != this.cat && (0 != a && this.cat.set_scaleX(a),
            GameInstance.ie && GameInstance.i.muteSFX || Sounds.cat.play(),
            this.cat.onFinish = function() {
                b.level.removeChild(b.cat);
                b.cat = null
            }
            ,
            this.cat.set_animation(S.ANIM_EXIT),
            this.cat.horizontal = this.cat.scaleX)
        },
        kill: function() {
            GameplayLevel.i = null;
            l.level.kill();
            l.set_level(null);
            Sounds.cat.volume(1);
            Sounds.exit.volume(1);
            if (this.speedrun)
                if (-1 < this.speedrunFinal) {
                    if (this.timerText.set_text(GameInstance.formatMS(this.speedrunFinal)),
                    this.newBest) {
                        var a = this.timerText;
                        a.set_text(a.text + "\nNew best time!")
                    }
                } else
                    GameInstance.i.timerHolder.removeChild(this.timerText)
        },
        prekill: function() {
            GameplayLevel.continueTheme ? GameplayLevel.stopped = GameplayLevel.canceled = !1 : GameplayLevel.stopTheme()
        },
        __class__: GameplayLevel
    });
    var $b = function(a) {
        null == a && (a = !0);
        this.onTimer = null;
        this.done = !1;
        this.length = 1.5;
        Screen.call(this);
        this.lws = a;
        a = new ImageSurface(Images.splashLWS);
        a.set_x(Math.round((h.width - a.get_width()) / 2));
        a.set_y(Math.round((h.height - a.get_height()) / 2));
        this.addChild(a)
    };
    $b.__name__ = !0;
    $b.__super__ = Screen;
    $b.prototype = __INHERIT__(Screen.prototype, {
        ready: function() {
            this.timer = N.get_current()
        },
        update: function() {
            !this.done && N.get_current() - this.timer > this.length && (this.done = !0,
            GameInstance.i.changeScreen(new ca))
        },
        __class__: $b
    });
    var vb = function() {
        this.start = new ImageSurface(Images.start);
        this.pivot = new GraphicsObject;
        Screen.call(this)
    };
    vb.__name__ = !0;
    vb.__super__ = Screen;
    vb.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            this.timer = N.get_currentMS();
            this.pivot.set_x(h.width / 2);
            this.pivot.set_y(h.height / 2);
            this.addChild(this.pivot);
            this.start.set_x(-this.start.get_width() / 2);
            this.start.set_y(-this.start.get_height() / 2);
            this.start.set_alpha(0);
            this.pivot.addChild(this.start)
        },
        update: function() {
            var a = this
              , b = GameInstance.smootherStep(Math.min(1, (N.get_currentMS() - this.timer) / 250));
            this.pivot.set_rotation(-90 + 90 * b);
            this.pivot.set_scaleX(this.pivot.set_scaleY(2 + -b));
            this.start.set_alpha(b);
            1 != this.start.alpha || this.start.buttonMode || (this.start.buttonMode = this.start.mouseEnabled = !0,
            this.start.addEventListener("click", function(c) {
                2 > c.which && (Sounds.exit.volume(1E-4),
                Sounds.exit.play(),
                Sounds.exit.once("end", function() {
                    Sounds.exit.volume(1)
                }),
                GameInstance.i.changeScreen(new $b),
                a.start.mouseEnabled = !1)
            }))
        },
        __class__: vb
    });
    var Qa = function(a) {
        null == a && (a = !1);
        this.done2 = !1;
        this.cond2 = new SpeechConditionDelay(.5);
        this.done1 = !1;
        this.cond1 = new SpeechConditionDelay(10);
        Screen.call(this);
        this.pausable = !0;
        this.speedrun = a
    };
    Qa.__name__ = !0;
    Qa.__super__ = Screen;
    Qa.prototype = __INHERIT__(Screen.prototype, {
        init: function() {
            this.cond1.start();
            this.speech = new Speech([new SpeechEvent(new SpeechConditionDelay(2),"It's time to resume your training."), new SpeechEvent(new SpeechConditionDelay(4),"We'll start with the basics.")],this);
            this.cond2.start()
        },
        update: function() {
            !this.done2 && this.cond2.test() && (this.done2 = !0,
            GameplayLevel.playTheme(0),
            GameInstance.ie || Sounds.themeGame1.fade(0, 1, 1E3));
            this.speech.update();
            !this.done1 && this.cond1.test() && (this.done1 = !0,
            GameplayLevel.play(Levels.level1, this.speedrun))
        },
        prekill: function() {
            GameplayLevel.continueTheme || GameplayLevel.stopTheme()
        },
        kill: function() {},
        __class__: Qa
    });
    var GraphicsObjectText = function(a, b, c) {
        null == c && (c = 0);
        null == b && (b = "");
        this.textWidth = this.textHeight = 0;
        this.lineWidths = [];
        this.align = this.xAlign = this.yAlign = this.lineHeight = this.hitPadding = 0;
        this.text = "";
        var d = this;
        GraphicsObject.call(this);
        this.set_font(a);
        this.set_text(b);
        this.color = c;
        this.addEventListener("render", function(e) {
            d.render(e.surface)
        })
    };
    GraphicsObjectText.__name__ = !0;
    GraphicsObjectText.drawText = function(a, b, c, d, e, f) {
        null == f && (f = 0);
        null == c && (c = "");
        for (var m = 0, k = 0, p = 0, y = 0, H = c.length; y < H; ) {
            var K = y++;
            "\n" == c.charAt(K) ? (++p,
            m = 0,
            k += b.lineHeight) : (K = ja.cca(c, K),
            K = b.chars[K],
            null != K && (a.drawImage(b.image, new Rectangle(K.x + f * b.colorOffset,K.y,K.w,K.h), d + m + K.xo, e + k + K.yo),
            m += K.xa))
        }
    }
    ;
    GraphicsObjectText.__super__ = GraphicsObject;
    GraphicsObjectText.prototype = __INHERIT__(GraphicsObject.prototype, {
        set_font: function(a) {
            this.font = a;
            this.set_lineHeight(a.lineHeight);
            this.precalc();
            return a
        },
        set_text: function(a) {
            this.text = a;
            this.precalc();
            return a
        },
        set_lineHeight: function(a) {
            this.lineHeight = a;
            this.precalc();
            return a
        },
        precalc: function() {
            var a = 0
              , b = 0
              , c = this.lineHeight
              , d = 0;
            this.lineWidths = [];
            for (var e = 0, f = this.text.length; e < f; ) {
                var m = e++;
                if ("\n" == this.text.charAt(m))
                    this.lineWidths.push(d),
                    d > b && (b = d),
                    a = d = 0,
                    c += this.lineHeight;
                else if (m = ja.cca(this.text, m),
                m = this.font.chars[m],
                null != m) {
                    var k = m.xo + m.w;
                    d += a + k;
                    a = m.xa - k
                }
            }
            this.lineWidths.push(d);
            d > b && (b = d);
            this.textWidth = b;
            this.textHeight = c
        },
        render: function(a) {
            for (var b = this.getTextOffset(), c = -this.getLineOffset(this.lineWidths[0]), d = 0, e = 0, f = 0, m = this.text.length; f < m; ) {
                var k = f++;
                "\n" == this.text.charAt(k) ? (++e,
                c = -this.getLineOffset(this.lineWidths[e]),
                d += this.lineHeight) : (k = ja.cca(this.text, k),
                k = this.font.chars[k],
                null != k && (a.drawImage(this.font.image, new Rectangle(k.x + this.color * this.font.colorOffset,k.y,k.w,k.h), b.x + c + k.xo, b.y + d + k.yo),
                c += k.xa))
            }
        },
        getBoundsSelf: function() {
            var a = this.getTextOffset();
            return new Rectangle(a.x - this.hitPadding,a.y - this.hitPadding,this.textWidth + 2 * this.hitPadding,this.textHeight + 2 * this.hitPadding)
        },
        getTextOffset: function() {
            var a = new Vector2(0,0);
            this.xAlign == GraphicsObjectText.X_ALIGN_CENTER && (a.x = Math.round(-this.textWidth / 2));
            this.xAlign == GraphicsObjectText.X_ALIGN_RIGHT && (a.x = -this.textWidth);
            this.yAlign == GraphicsObjectText.Y_ALIGN_MIDDLE && (a.y = Math.round(-this.textHeight / 2));
            this.yAlign == GraphicsObjectText.Y_ALIGN_BOTTOM && (a.y = -this.textHeight);
            return a
        },
        getLineOffset: function(a) {
            return this.align == GraphicsObjectText.ALIGN_CENTER ? Math.round((-this.textWidth + a) / 2) : this.align == GraphicsObjectText.ALIGN_RIGHT ? -this.textWidth + a : 0
        },
        __class__: GraphicsObjectText
    });
    var Xb = function(a) {
        GraphicsObject.call(this);
        var b = new ImageSurface(Images.awardFrame);
        b.set_x(-b.get_width() / 2);
        this.addChild(b);
        b = new ImageSurface(a.unlocked ? a.icon : Images.awardIconLocked);
        b.set_x(-b.get_width() / 2);
        b.set_y(8);
        this.addChild(b);
        b = new GraphicsObjectText(GameInstance.fontMain,a.name,1);
        b.align = GraphicsObjectText.ALIGN_CENTER;
        b.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        b.set_y(64);
        b.set_lineHeight(b.lineHeight - 4);
        this.addChild(b);
        a.unlocked || this.set_alpha(.5)
    };
    Xb.__name__ = !0;
    Xb.__super__ = GraphicsObject;
    Xb.prototype = __INHERIT__(GraphicsObject.prototype, {
        __class__: Xb
    });
    var EditorTileSelector = function() {
        this.bubble = new ac;
        var a = this;
        GraphicsObject.call(this);
        this.mouseEnabled = this.buttonMode = !0;
        this.bubble.visible = !1;
        this.bubble.mouseEnabled = !0;
        this.addChild(this.bubble);
        this.addEventListener("mouseDown", function(b) {
            if (b.target == a && 2 > b.which) {
                var c = EditorTileSelector.selected;
                EditorTileSelector.set_selected(Math.floor(a.globalToLocal(b.x, b.y).x / EditorTileSelector.size4));
                a.bubble.set_x(Math.round((EditorTileSelector.selected + .5) * EditorTileSelector.size4));
                b = a.get_selection().configurable && (EditorTileSelector.selected == c ? !a.bubble.visible : !0);
                a.bubble.visible = b;
                a.bubble.visible && a.bubble.setup(a.get_selection())
            }
        });
        this.addEventListener("render", function(b) {
            a.render(b.surface)
        })
    };
    EditorTileSelector.__name__ = !0;
    EditorTileSelector.set_selected = function(a) {
        return EditorTileSelector.selected = 0 > a ? 0 : a >= EditorTileSelector.list.length ? EditorTileSelector.list.length - 1 : a
    }
    ;
    EditorTileSelector.__super__ = GraphicsObject;
    EditorTileSelector.prototype = __INHERIT__(GraphicsObject.prototype, {
        get_selection: function() {
            return EditorTileSelector.list[EditorTileSelector.selected]
        },
        render: function(a) {
            a.beginFill(12525600, .75);
            a.drawRect((G.keyDown(16) ? 0 : EditorTileSelector.selected) * EditorTileSelector.size4, 0, EditorTileSelector.size4, EditorTileSelector.size4);
            a.translate(2, 2);
            a.beginFill(14671839);
            for (var b = 0, c = EditorTileSelector.list.length; b < c; ) {
                var d = b++
                  , e = EditorTileSelector.list[d];
                0 < d && a.translate(EditorTileSelector.size4, 0);
                e.rotatePreview() && (a.translate(EditorTileSelector.size2, EditorTileSelector.size2),
                a.rotate(l.rotation * Math.PI / 2),
                a.translate(-EditorTileSelector.size2, -EditorTileSelector.size2));
                a.drawRect(0, 0, Constants.tileSize, Constants.tileSize);
                e.render(a, new wb(0,0,e.id,e.getConfigMeta()), !1);
                e.rotatePreview() && (a.translate(EditorTileSelector.size2, EditorTileSelector.size2),
                a.rotate(-l.rotation * Math.PI / 2),
                a.translate(-EditorTileSelector.size2, -EditorTileSelector.size2))
            }
            a.translate((EditorTileSelector.list.length - 1) * -EditorTileSelector.size4, 0);
            a.translate(-2, -2)
        },
        getBoundsSelf: function() {
            return new Rectangle(0,0,EditorTileSelector.list.length * (Constants.tileSize + 4),Constants.tileSize + 4)
        },
        __class__: EditorTileSelector
    });
    var ac = function() {
        this.tip = new ImageSurface(Images.configTip);
        GraphicsObject.call(this);
        this.tip.set_x(-this.tip.get_width() / 2);
        this.tip.set_y(-this.tip.get_height());
        this.addChild(this.tip)
    };
    ac.__name__ = !0;
    ac.__super__ = GraphicsObject;
    ac.prototype = __INHERIT__(GraphicsObject.prototype, {
        setup: function(a) {
            var b = Math.round(a.bubbleWidth / 2);
            this.graphics.clear();
            this.graphics.beginFill(8421504);
            this.graphics.drawRect(-b - 2, -a.bubbleHeight - this.tip.get_height() - 2, a.bubbleWidth + 4, a.bubbleHeight + 4);
            this.graphics.beginFill(2105376);
            this.graphics.drawRect(-b, -a.bubbleHeight - this.tip.get_height(), a.bubbleWidth, a.bubbleHeight);
            null != this.content && this.removeChild(this.content);
            this.content = new GraphicsObject;
            this.content.set_x(-b);
            this.content.set_y(-a.bubbleHeight - this.tip.get_height());
            this.addChild(this.content);
            a.setupBubble(this.content)
        },
        __class__: ac
    });
    var Da = function(a, b) {
        null == b && (b = "");
        GraphicsObject.call(this);
        this.graphics.beginFill(1052688, .95);
        this.graphics.drawRect(0, 0, h.width, h.height);
        this.mouseEnabled = !0;
        this.title = new GraphicsObjectText(GameInstance.fontMain,a);
        this.title.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.title.set_x(Math.round(h.width / 2));
        this.title.set_y(36);
        this.addChild(this.title);
        this.area = window.document.createElement("textarea");
        var c = h.width - 80;
        window.document.body.appendChild(this.area);
        this.area.style.position = "absolute";
        this.area.style.left = Math.round((h.width - c) / 2) + "px";
        this.area.style.top = Math.round((h.height - 300) / 2 - 8) + "px";
        this.area.style.width = c - 12 + "px";
        this.area.style.height = "288px";
        this.area.style.resize = "none";
        this.area.style.border = this.area.style.outline = "none";
        this.area.style.margin = "0";
        this.area.style.padding = "6px";
        this.area.style.background = "#fff";
        this.area.style.color = "#000";
        this.area.style.fontFamily = "'Courier New', Courier, monospace";
        this.area.style.fontSize = "12px";
        this.area.value = b;
        this.area.select()
    };
    Da.__name__ = !0;
    Da.__super__ = GraphicsObject;
    Da.prototype = __INHERIT__(GraphicsObject.prototype, {
        kill: function() {
            null != this.area.parentElement && window.document.body.removeChild(this.area)
        },
        __class__: Da
    });
    var Yb = function() {
        this.btnLoad = new Button("LOAD");
        this.btnCancel = new Button("CANCEL");
        this.invalid = new GraphicsObjectText(GameInstance.fontMain,"Level code is invalid!",2);
        var a = this;
        Da.call(this, "LOAD LEVEL");
        this.invalid.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.invalid.yAlign = GraphicsObjectText.Y_ALIGN_BOTTOM;
        this.invalid.set_x(Math.round(h.width / 2));
        this.invalid.set_y(h.height - 82);
        this.invalid.visible = !1;
        this.addChild(this.invalid);
        this.btnCancel.set_x(Math.round(h.width / 2) - 96);
        this.btnCancel.set_y(h.height - 52);
        this.btnCancel.addEventListener("click", function(b) {
            if (2 > b.which && null != a.onBack)
                a.onBack()
        });
        this.addChild(this.btnCancel);
        this.btnLoad.set_x(Math.round(h.width / 2) + 96);
        this.btnLoad.set_y(h.height - 52);
        this.btnLoad.addEventListener("click", function(b) {
            2 > b.which && null != a.onLoad && !a.onLoad(a.area.value) && (a.invalid.visible = !0)
        });
        this.addChild(this.btnLoad);
        this.area.addEventListener("input", function() {
            a.invalid.visible = !1
        })
    };
    Yb.__name__ = !0;
    Yb.__super__ = Da;
    Yb.prototype = __INHERIT__(Da.prototype, {
        __class__: Yb
    });
    var Zb = function(a) {
        this.btnBack = new Button("BACK");
        var b = this;
        Da.call(this, "SAVE LEVEL", a);
        this.area.readOnly = !0;
        this.btnBack.set_x(Math.round(h.width / 2));
        this.btnBack.set_y(h.height - 52);
        this.btnBack.addEventListener("click", function(c) {
            if (2 > c.which && null != b.onBack)
                b.onBack()
        });
        this.addChild(this.btnBack)
    };
    Zb.__name__ = !0;
    Zb.__super__ = Da;
    Zb.prototype = __INHERIT__(Da.prototype, {
        __class__: Zb
    });
    var EditorBarLower = function(a) {
        this.selector = new EditorTileSelector;
        var b = this;
        GraphicsObject.call(this);
        this.set_y(h.height - EditorBarLower.HEIGHT);
        this.mouseEnabled = !0;
        this.graphics.beginFill(2105376);
        this.graphics.drawRect(0, 0, h.width, EditorBarLower.HEIGHT);
        this.gridToggle = new GridToggle(a);
        this.addChild(this.gridToggle);
        this.selector.set_x(12);
        this.selector.set_y(Math.round((EditorBarLower.HEIGHT - this.selector.get_height()) / 2));
        this.addChild(this.selector);
        this.addEventListener("mouseDown", function(c) {
            2 > c.which && c.target == b && (b.selector.bubble.visible = !1)
        })
    };
    EditorBarLower.__name__ = !0;
    EditorBarLower.__super__ = GraphicsObject;
    EditorBarLower.prototype = __INHERIT__(GraphicsObject.prototype, {
        __class__: EditorBarLower
    });
    var EditorBarUpper = function(a, b) {
        this.btnLoad = new GraphicsObjectText(GameInstance.fontMain,"Load");
        this.btnSave = new GraphicsObjectText(GameInstance.fontMain,"Save");
        this.btnPlay = new GraphicsObjectText(GameInstance.fontMain,"Play");
        this.btnClear = new GraphicsObjectText(GameInstance.fontMain,"Clear");
        this.btnExit = new GraphicsObjectText(GameInstance.fontMain,"Exit");
        GraphicsObject.call(this);
        this.mouseEnabled = !0;
        this.graphics.beginFill(2105376);
        this.graphics.drawRect(0, 0, h.width, EditorBarUpper.HEIGHT);
        this.btnExit.set_x(EditorBarUpper.EDGE_PAD);
        this.btnExit.set_y(EditorBarUpper.EDGE_PAD_Y);
        this.btnExit.mouseEnabled = this.btnExit.buttonMode = !0;
        this.btnExit.hitPadding = EditorBarUpper.BTN_PAD;
        this.btnExit.addEventListener("click", function(d) {
            2 > d.which && GameInstance.i.changeScreen(new ScreenExtras)
        });
        this.addChild(this.btnExit);
        this.btnClear.set_x(this.btnExit.x + this.btnExit.get_width() + EditorBarUpper.BTN_SPACE);
        this.btnClear.set_y(EditorBarUpper.EDGE_PAD_Y);
        this.btnClear.mouseEnabled = this.btnClear.buttonMode = !0;
        this.btnClear.hitPadding = EditorBarUpper.BTN_PAD;
        this.btnClear.set_alpha(EditorBarUpper.TEXT_GREY);
        this.addChild(this.btnClear);
        this.theme = new GraphicsObjectText(GameInstance.fontMain,EditorBarUpper.THEMES[a]);
        this.theme.set_x(this.btnClear.x + this.btnClear.get_width() + 72);
        this.theme.set_y(EditorBarUpper.EDGE_PAD_Y);
        this.theme.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.addChild(this.theme);
        var c = new ImageSurface(Images.configArrow);
        c.mouseEnabled = c.buttonMode = !0;
        c.set_x(this.theme.x + 46);
        c.set_y(this.theme.y + 4);
        c.addEventListener("mouseDown", function(d) {
            2 > d.which && b(-1)
        });
        this.addChild(c);
        c = new ImageSurface(Images.configArrow);
        c.mouseEnabled = c.buttonMode = !0;
        c.set_scaleX(-1);
        c.set_x(this.theme.x - 46);
        c.set_y(this.theme.y + 4);
        c.addEventListener("mouseDown", function(d) {
            2 > d.which && b(1)
        });
        this.addChild(c);
        this.btnPlay.set_x(h.width - EditorBarUpper.EDGE_PAD);
        this.btnPlay.set_y(EditorBarUpper.EDGE_PAD_Y);
        this.btnPlay.xAlign = GraphicsObjectText.X_ALIGN_RIGHT;
        this.btnPlay.mouseEnabled = this.btnPlay.buttonMode = !0;
        this.btnPlay.hitPadding = EditorBarUpper.BTN_PAD;
        this.btnPlay.addEventListener("click", function(d) {
            2 > d.which && GameplayLevel.play(EditorLevel.editorLevel)
        });
        this.addChild(this.btnPlay);
        this.btnSave.set_x(this.btnPlay.x - this.btnPlay.get_width() - EditorBarUpper.BTN_SPACE);
        this.btnSave.set_y(EditorBarUpper.EDGE_PAD_Y);
        this.btnSave.xAlign = GraphicsObjectText.X_ALIGN_RIGHT;
        this.btnSave.mouseEnabled = this.btnSave.buttonMode = !0;
        this.btnSave.hitPadding = EditorBarUpper.BTN_PAD;
        this.btnSave.set_alpha(EditorBarUpper.TEXT_GREY);
        this.addChild(this.btnSave);
        this.btnLoad.set_x(this.btnSave.x - this.btnSave.get_width() - EditorBarUpper.BTN_SPACE);
        this.btnLoad.set_y(EditorBarUpper.EDGE_PAD_Y);
        this.btnLoad.xAlign = GraphicsObjectText.X_ALIGN_RIGHT;
        this.btnLoad.mouseEnabled = this.btnLoad.buttonMode = !0;
        this.btnLoad.hitPadding = EditorBarUpper.BTN_PAD;
        this.btnLoad.set_alpha(EditorBarUpper.TEXT_GREY);
        this.addChild(this.btnLoad)
    };
    EditorBarUpper.__name__ = !0;
    EditorBarUpper.__super__ = GraphicsObject;
    EditorBarUpper.prototype = __INHERIT__(GraphicsObject.prototype, {
        __class__: EditorBarUpper
    });
    var ButtonErase = function() {
        ImageSurface.call(this, Images.trash);
        this.set_x(h.width - 120);
        this.set_y(h.height - this.get_height() - 12);
        for (var a = !1, b = 0, c = AwardsManager.awardsAll; b < c.length; ) {
            var d = c[b];
            ++b;
            if (d.unlocked) {
                a = !0;
                break
            }
        }
        0 != Levels.unlocked || a ? (this.buttonMode = this.mouseEnabled = !0,
        this.addEventListener("click", function(e) {
            if (2 > e.which) {
                var f = new ModalYesNo("Do you want to erase ALL of\nyour saved progress?");
                f.onNo = function() {
                    GameInstance.i.currentScreen.removeChild(f)
                }
                ;
                f.onYes = function() {
                    GameInstance.i.clearProgress();
                    GameInstance.i.changeScreen(new ca)
                }
                ;
                GameInstance.i.currentScreen.addChild(f)
            }
        })) : this.set_alpha(.33)
    };
    ButtonErase.__name__ = !0;
    ButtonErase.__super__ = ImageSurface;
    ButtonErase.prototype = __INHERIT__(ImageSurface.prototype, {
        __class__: ButtonErase
    });
    var GridToggle = function(a) {
        this.label = new GraphicsObjectText(GameInstance.fontMain,"Grid");
        this.toggle = new ImageSurface(Images.configToggle);
        var b = this;
        GraphicsObject.call(this);
        this.set_x(h.width - this.get_width() - 12);
        this.set_y(8);
        this.mouseEnabled = this.buttonMode = !0;
        this.addEventListener("click", function(c) {
            1 < c.which || (EditorLevel.showGrid = !EditorLevel.showGrid,
            b.toggle.clipRect.x = EditorLevel.showGrid ? b.toggle.clipRect.width : 0,
            null != a && a())
        });
        this.toggle.clipRect.width /= 2;
        this.toggle.clipRect.x = EditorLevel.showGrid ? this.toggle.clipRect.width : 0;
        this.toggle.set_x(4);
        this.toggle.set_y(5);
        this.addChild(this.toggle);
        this.label.set_x(32);
        this.label.set_y(1);
        this.label.set_alpha(EditorBarUpper.TEXT_GREY);
        this.addChild(this.label)
    };
    GridToggle.__name__ = !0;
    GridToggle.__super__ = GraphicsObject;
    GridToggle.prototype = __INHERIT__(GraphicsObject.prototype, {
        getBoundsSelf: function() {
            return new Rectangle(0,0,76,30)
        },
        __class__: GridToggle
    });
    var Na = function() {
        var a = this;
        GraphicsObject.call(this);
        this.addEventListener("render", function(b) {
            a.render(b.surface)
        })
    };
    Na.__name__ = !0;
    Na.__super__ = GraphicsObject;
    Na.prototype = __INHERIT__(GraphicsObject.prototype, {
        render: function(a) {
            for (var b = -Math.round(30 * N.get_current() % Images.bgCells.width), c = -Math.round(15 * N.get_current() % Images.bgCells.height), d = 0, e = Math.ceil(h.height / Images.bgCells.height) + 1; d < e; )
                for (var f = d++, m = 0, k = Math.ceil(h.width / Images.bgCells.width) + 1; m < k; ) {
                    var p = m++;
                    a.drawImage(Images.bgCells, null, b + Images.bgCells.width * p, c + Images.bgCells.height * f)
                }
            a.drawImage(Images.vignette, null, 0, 0)
        },
        __class__: Na
    });
    var Button = function(a, b) {
        null == b && (b = 0);
        GraphicsObject.call(this);
        this.main = new ImageSurface(Images.menuBtn);
        this.main.set_x(-this.main.get_width() / 2);
        this.main.set_y(-this.main.get_height() / 2);
        this.main.mouseEnabled = this.main.buttonMode = !0;
        this.addChild(this.main);
        var c = this.text = new GraphicsObjectText(GameInstance.fontMain,a.toUpperCase(),b);
        c.set_y(c.y - 2);
        this.text.align = GraphicsObjectText.ALIGN_CENTER;
        this.text.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.text.yAlign = GraphicsObjectText.Y_ALIGN_MIDDLE;
        this.addChild(this.text)
    };
    Button.__name__ = !0;
    Button.__super__ = GraphicsObject;
    Button.prototype = __INHERIT__(GraphicsObject.prototype, {
        __class__: Button
    });
    var ButtonMute = function(a) {
        null == a && (a = 0);
        var b = this;
        GraphicsObject.call(this);
        this.sfx = new ImageSurface(Images.mute);
        this.sfx.set_clipRect(new Rectangle(GameInstance.i.muteSFX ? 28 : 0,30 * a,28,30));
        this.sfx.mouseEnabled = this.sfx.buttonMode = !0;
        this.sfx.addEventListener("click", function(c) {
            2 > c.which && (GameInstance.ie && !GameInstance.i.ieUnmuted ? b.showWarn(T(b, b.toggleSFX)) : b.toggleSFX())
        });
        this.sfx.set_x(h.width - this.sfx.get_width() - 12);
        this.sfx.set_y(h.height - this.sfx.get_height() - 12);
        this.addChild(this.sfx);
        this.music = new ImageSurface(Images.mute);
        this.music.set_clipRect(new Rectangle(GameInstance.i.muteMusic ? 84 : 56,30 * a,28,30));
        this.music.mouseEnabled = this.music.buttonMode = !0;
        this.music.addEventListener("click", function(c) {
            2 > c.which && (GameInstance.ie && !GameInstance.i.ieUnmuted ? b.showWarn(T(b, b.toggleMusic)) : b.toggleMusic())
        });
        this.music.set_x(this.sfx.x - this.music.get_width() - 12);
        this.music.set_y(h.height - this.music.get_height() - 12);
        this.addChild(this.music)
    };
    ButtonMute.__name__ = !0;
    ButtonMute.__super__ = GraphicsObject;
    ButtonMute.prototype = __INHERIT__(GraphicsObject.prototype, {
        showWarn: function(a) {
            var b = new ModalYesNo("Audio may slow down the game\nin Internet Explorer. Continue?");
            b.onNo = function() {
                GameInstance.i.removeChild(b)
            }
            ;
            b.onYes = function() {
                GameInstance.i.removeChild(b);
                GameInstance.i.ieUnmuted = !0;
                null != a && a()
            }
            ;
            GameInstance.i.addChild(b)
        },
        toggleSFX: function() {
            GameInstance.i.toggleSFX();
            this.sfx.clipRect.x = GameInstance.i.muteSFX ? 28 : 0
        },
        toggleMusic: function() {
            GameInstance.i.toggleMusic();
            this.music.clipRect.x = GameInstance.i.muteMusic ? 84 : 56
        },
        __class__: ButtonMute
    });
    var ButtonInvertControls = function() {
        GraphicsObject.call(this);
        this.set_x(12);
        this.set_y(12);
        this.mouseEnabled = this.buttonMode = !0;
        var a = new GraphicsObjectText(GameInstance.fontMain,"Invert [Q] & [E]?");
        a.set_x(30);
        a.set_y(-4);
        a.set_alpha(.5);
        this.addChild(a);
        var b = new ImageSurface(Images.configToggle);
        b.clipRect.width = 22;
        GameInstance.i.invert && (b.clipRect.x = 22);
        b.set_alpha(.75);
        this.addChild(b);
        this.addEventListener("click", function(c) {
            2 > c.which && (GameInstance.i.invert = !GameInstance.i.invert,
            b.clipRect.x = GameInstance.i.invert ? 22 : 0,
            GameInstance.i.saveProgress())
        })
    };
    ButtonInvertControls.__name__ = !0;
    ButtonInvertControls.__super__ = GraphicsObject;
    ButtonInvertControls.prototype = __INHERIT__(GraphicsObject.prototype, {
        getBoundsSelf: function() {
            return new Rectangle(0,0,198,22)
        },
        __class__: ButtonInvertControls
    });
    var MenuPause = function() {
        this.sponsor = new ButtonSponsor;
        this.mute = new ButtonMute(1);
        this.invert = new ButtonInvertControls;
        this.btnQuit = new Button("QUIT",0);
        this.btnRedo = new Button("RESTART",0);
        this.btnPlay = new Button("CONTINUE",0);
        this.text = new GraphicsObjectText(GameInstance.fontMain,"GAME PAUSED");
        GraphicsObject.call(this);
        this.graphics.beginFill(1052688, .85);
        this.graphics.drawRect(0, 0, h.width, h.height);
        this.visible = !1;
        this.mouseEnabled = !0;
        this.text.align = GraphicsObjectText.ALIGN_CENTER;
        this.text.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.text.yAlign = GraphicsObjectText.Y_ALIGN_MIDDLE;
        this.text.set_x(Math.floor(h.width / 2));
        this.text.set_y(Math.floor(h.height / 2) - 96 - 1);
        this.addChild(this.text);
        this.btnPlay.set_x(this.text.x);
        this.btnPlay.set_y(this.text.y + 60);
        this.btnPlay.addEventListener("click", function(a) {
            2 > a.which && GameInstance.i.unpause()
        });
        this.addChild(this.btnPlay);
        this.btnRedo.set_x(this.btnPlay.x);
        this.btnRedo.set_y(this.btnPlay.y + 60);
        this.btnRedo.addEventListener("click", function(a) {
            2 > a.which && ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && GameInstance.i.currentScreen.restart(!1)
        });
        this.addChild(this.btnRedo);
        this.btnQuit.set_x(this.btnRedo.x);
        this.btnQuit.set_y(this.btnRedo.y + 60);
        this.btnQuit.addEventListener("click", function(a) {
            2 > a.which && (a = ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel) && ES3ClassUtils.__cast(GameInstance.i.currentScreen, GameplayLevel).speedrun || ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, Qa) && ES3ClassUtils.__cast(GameInstance.i.currentScreen, Qa).speedrun,
            GameInstance.i.changeScreen(l.level == EditorLevel.editorLevel ? new EditorLevel : a ? new ScreenExtras : 0 < Levels.unlocked ? new ScreenLevelSelect : new ca, !0, (Ja = GameInstance.i,
            T(Ja, Ja.unpause))))
        });
        this.addChild(this.btnQuit);
        this.addChild(this.invert);
        this.addChild(this.mute);
        this.addChild(this.sponsor);
        this.sponsor.clipRect.y = this.sponsor.clipRect.height;
        GameInstance.i.warnNoSave(this)
    };
    MenuPause.__name__ = !0;
    MenuPause.__super__ = GraphicsObject;
    MenuPause.prototype = __INHERIT__(GraphicsObject.prototype, {
        onPause: function() {
            this.mute.sfx.clipRect.x = GameInstance.i.muteSFX ? 28 : 0;
            this.mute.music.clipRect.x = GameInstance.i.muteMusic ? 84 : 56;
            var a = ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, GameplayLevel);
            this.btnRedo.set_alpha(a ? 1 : .25);
            this.btnRedo.main.mouseEnabled = a;
            a = ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, bb) || ES3ClassUtils.__instanceof(GameInstance.i.currentScreen, ob);
            this.btnQuit.set_alpha(a ? .25 : 1);
            this.btnQuit.main.mouseEnabled = !a
        },
        __class__: MenuPause
    });
    var ButtonSponsor = function() {
        ImageSurface.call(this, Images.linkJoshua);
        this.clipRect.height /= 2;
        this.set_x(8);
        this.set_y(h.height - this.get_height() - 8);
        this.mouseEnabled = this.buttonMode = !0;
        this.addEventListener("click", function(a) {
            2 <= a.which || (a = window.open("https://lightwolfstudios.com", "_blank"),
            AwardsManager.awardJoshua.unlock(),
            a.focus())
        })
    };
    ButtonSponsor.__name__ = !0;
    ButtonSponsor.__super__ = ImageSurface;
    ButtonSponsor.prototype = __INHERIT__(ImageSurface.prototype, {
        __class__: ButtonSponsor
    });
    var ModalYesNo = function(a) {
        this.btnNo = new Button("NO");
        this.btnYes = new Button("YES");
        this.main = new GraphicsObjectText(GameInstance.fontMain,"",2);
        var b = this;
        GraphicsObject.call(this);
        this.main.set_text(a);
        this.graphics.beginFill(1052688, .95);
        this.graphics.drawRect(0, 0, h.width, h.height);
        this.mouseEnabled = !0;
        this.main.align = GraphicsObjectText.ALIGN_CENTER;
        this.main.xAlign = GraphicsObjectText.X_ALIGN_CENTER;
        this.main.yAlign = GraphicsObjectText.Y_ALIGN_MIDDLE;
        this.main.set_x(Math.round(h.width / 2));
        this.main.set_y(Math.round(h.height / 2) - 40);
        this.addChild(this.main);
        this.btnYes.set_x(Math.round(h.width / 2) - 96);
        this.btnYes.set_y(Math.round(h.height / 2) + 40);
        this.btnYes.addEventListener("click", function(c) {
            if (2 > c.which && null != b.onYes)
                b.onYes()
        });
        this.addChild(this.btnYes);
        this.btnNo.set_x(Math.round(h.width / 2) + 96);
        this.btnNo.set_y(Math.round(h.height / 2) + 40);
        this.btnNo.addEventListener("click", function(c) {
            if (2 > c.which && null != b.onNo)
                b.onNo()
        });
        this.addChild(this.btnNo)
    };
    ModalYesNo.__name__ = !0;
    ModalYesNo.__super__ = GraphicsObject;
    ModalYesNo.prototype = __INHERIT__(GraphicsObject.prototype, {
        __class__: ModalYesNo
    });
    var Ja, pc = 0;
    String.prototype.__class__ = String;
    String.__name__ = !0;
    Array.__name__ = !0;
    Date.prototype.__class__ = Date;
    Date.__name__ = ["Date"];
    var rc = {
        __name__: ["Int"]
    }
      , qc = {
        __name__: ["Dynamic"]
    }
      , kc = Number;
    kc.__name__ = ["Float"];
    var mc = Boolean;
    mc.__ename__ = ["Bool"];
    var sc = {
        __name__: ["Class"]
    }
      , tc = {}
      , na = {}
      , tb = window.ArrayBuffer || wa;
    null == tb.prototype.slice && (tb.prototype.slice = wa.sliceImpl);
    var ec = window.Uint8Array || Ia._new;
    h.started = !1;
    h.imageSmoothingEnabled = !0;
    h.lastCursor = "default";
    h.scale = 1;
    h.offsetX = 0;
    h.offsetY = 0;
    h.wasLoaded = !1;
    h.lastProgress = 0;
    LoadingManager.inited = !1;
    LoadingManager.finished = !1;
    LoadingManager.tasks = [];
    LoadingManager.events = new EventDispatcher;
    N.startTime = 0;
    N.lastTime = 0;
    N.elapsedTime = 0;
    Graphics.PI2 = 2 * Math.PI;
    RotateEvent.ADDED = "added";
    RotateEvent.REMOVED = "removed";
    RotateEvent.ENTER_FRAME = "enterFrame";
    RotateEvent.EXIT_FRAME = "exitFrame";
    RotateFocusEvent.FOCUS = "focus";
    RotateFocusEvent.BLUR = "blur";
    RotateKeyboardEvent.KEY_DOWN = "keyDown";
    RotateKeyboardEvent.KEY_UP = "keyUp";
    RotateProgressEvent.FINISHED = "finished";
    RotateProgressEvent.PROGRESS = "progress";
    RotateMouseEvent.CLICK = "click";
    RotateMouseEvent.MOUSE_DOWN = "mouseDown";
    RotateMouseEvent.MOUSE_UP = "mouseUp";
    RotateMouseEvent.MOVE = "move";
    RotateRenderEvent.RENDER = "render";
    G.inited = !1;
    G.keys = [];
    G.keysOld = [];
    Ga.FUNC = 1;
    Ea.PI2 = 2 * Math.PI;
    za.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    za.BYTES = ya.ofString(za.CHARS);
    ES3ClassUtils.__toStr = {}.toString;
    Ia.BYTES_PER_ELEMENT = 1;
    Constants.EPSILON = 1E-8;
    Constants.screenFadeTime = 700;
    Constants.screenFadeTimeSlow = 1600;
    Constants.tileSize = 24;
    Constants.tickMS = 16.666666666666668;
    Constants.ticksMax = 12;
    Constants.cameraSpeed = .075;
    Constants.rotateTime = .5;
    Constants.rotateOffset = 1.5 * Constants.tileSize;
    Constants.doorSlideTime = .2;
    Images.start = LoadingManager.loadImage("img/start.png");
    Images.splashLWS = LoadingManager.loadImage("img/splash-lws.png");
    Images.linkLWS = LoadingManager.loadImage("img/link-lws.png");
    Images.linkJoshua = LoadingManager.loadImage("img/link-joshua.png");
    Images.linkJoshua2 = LoadingManager.loadImage("img/link-joshua-2.png");
    Images.soundtrack = LoadingManager.loadImage("img/soundtrack.png");
    Images.awardFrame = LoadingManager.loadImage("img/award-frame.png");
    Images.awardIconLocked = LoadingManager.loadImage("img/award-icon-locked.png");
    Images.awardIconEscape = LoadingManager.loadImage("img/award-icon-escape.png");
    Images.awardIconSpeedrun = LoadingManager.loadImage("img/award-icon-speedrun.png");
    Images.awardIconEditor = LoadingManager.loadImage("img/award-icon-editor.png");
    Images.awardIconJoshua = LoadingManager.loadImage("img/award-icon-joshua.png");
    Images.awardIconSoundtrack = LoadingManager.loadImage("img/award-icon-soundtrack.png");
    Images.awardIconRotate = LoadingManager.loadImage("img/award-icon-rotate.png");
    Images.vignette = LoadingManager.loadImage("img/vignette.png");
    Images.bgCells = LoadingManager.loadImage("img/bg-cells.png");
    Images.logo = LoadingManager.loadImage("img/logo.png");
    Images.configTip = LoadingManager.loadImage("img/config-tip.png");
    Images.configArrow = LoadingManager.loadImage("img/config-arrow.png");
    Images.configToggle = LoadingManager.loadImage("img/config-toggle.png");
    Images.menuBtn = LoadingManager.loadImage("img/menu-btn.png");
    Images.level = LoadingManager.loadImage("img/level.png");
    Images.interact = LoadingManager.loadImage("img/interact.png");
    Images.mute = LoadingManager.loadImage("img/mute.png");
    Images.trash = LoadingManager.loadImage("img/trash.png");
    Images.player = LoadingManager.loadImage("img/player.png");
    Images.bgTiles = LoadingManager.loadImage("img/bg-tiles.png");
    Images.bgBricks = LoadingManager.loadImage("img/bg-bricks.png");
    Images.blocks = LoadingManager.loadImage("img/blocks.png");
    Images.cat = LoadingManager.loadImage("img/cat.png");
    Images.endingMain = LoadingManager.loadImage("img/ending-main.png");
    Images.endingPlants = LoadingManager.loadImage("img/ending-plants.png");
    Images.controls1 = LoadingManager.loadImage("img/controls-1.png");
    Images.controls2 = LoadingManager.loadImage("img/controls-2.png");
    Images.controls3 = LoadingManager.loadImage("img/controls-3.png");
    Images.controls4 = LoadingManager.loadImage("img/controls-4.png");
    Images.controls5 = LoadingManager.loadImage("img/controls-5.png");
    GameInstance.fontMain = new RotateFont("fonts/simple-pixels.png","fonts/simple-pixels.json",2,112);
    GameInstance.nosave = !1;
    GameInstance.ie = !1;
    Sounds.themeMenu = LoadingManager.loadSound({
        src: ["music/menu.ogg", "music/menu.mp3"],
        loop: !0
    });
    Sounds.themeGame1 = LoadingManager.loadSound({
        src: ["music/game-1.ogg", "music/game-1.mp3"],
        loop: !0,
        volume: .8
    });
    Sounds.themeGame2 = LoadingManager.loadSound({
        src: ["music/game-2.ogg", "music/game-2.mp3"],
        loop: !0,
        volume: .75
    });
    Sounds.surface = LoadingManager.loadSound({
        src: ["sfx/surface.ogg", "sfx/surface.mp3"],
        loop: !0
    });
    Sounds.steps = LoadingManager.loadSound({
        src: ["sfx/steps.ogg", "sfx/steps.mp3"],
        sprite: {
            a: [0, 400],
            b: [475, 400]
        }
    });
    Sounds.death = LoadingManager.loadSound({
        src: ["sfx/death.ogg", "sfx/death.mp3"]
    });
    Sounds.rotate = LoadingManager.loadSound({
        src: ["sfx/rotate.ogg", "sfx/rotate.mp3"]
    });
    Sounds.exit = LoadingManager.loadSound({
        src: ["sfx/exit.ogg", "sfx/exit.mp3"]
    });
    Sounds.door = LoadingManager.loadSound({
        src: ["sfx/door.ogg", "sfx/door.mp3"]
    });
    Sounds.cat = LoadingManager.loadSound({
        src: ["sfx/cat.ogg", "sfx/cat.mp3"]
    });
    Sounds.leverOn = LoadingManager.loadSound({
        src: ["sfx/lever-on.ogg", "sfx/lever-on.mp3"]
    });
    Sounds.leverOff = LoadingManager.loadSound({
        src: ["sfx/lever-off.ogg", "sfx/lever-off.mp3"]
    });
    Sounds.voice = LoadingManager.loadSound({
        src: ["sfx/voice.ogg", "sfx/voice.mp3"],
        sprite: {
            a: [0, 1E3],
            b: [1111, 1E3],
            c: [2222, 1E3],
            d: [3333, 1E3],
            e: [4444, 1E3],
            f: [5555, 1E3],
            g: [6666, 1E3],
            h: [7777, 1E3]
        },
        volume: .9
    });
    Sounds.SFX = [Sounds.steps, Sounds.death, Sounds.rotate, Sounds.exit, Sounds.door, Sounds.cat, Sounds.leverOn, Sounds.leverOff, Sounds.voice];
    AwardsManager.awardEscape = new Award("The Beginning",Images.awardIconEscape);
    AwardsManager.awardSpeedrun = new Award("Seven or\nLess",Images.awardIconSpeedrun);
    AwardsManager.awardEditor = new Award("Architect",Images.awardIconEditor);
    AwardsManager.awardJoshua = new Award("Curiosity",Images.awardIconJoshua);
    AwardsManager.awardSoundtrack = new Award("Sound Seeker",Images.awardIconSoundtrack);
    AwardsManager.awardRotate = new Award("Rotate Me",Images.awardIconRotate);
    AwardsManager.awardsAll = [AwardsManager.awardEscape, AwardsManager.awardSpeedrun, AwardsManager.awardEditor, AwardsManager.awardJoshua, AwardsManager.awardSoundtrack, AwardsManager.awardRotate];
    AwardsManager.FADE_MS = 250;
    AwardsManager.STAY_MS = 3E3;
    AwardsManager.bubbleTimer = -1;
    S.SPEED = 2;
    S.ACCEL = .06;
    S.DECCEL_MULT = .6;
    S.ANIM_IDLE = new GameAnimation([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5],[1500, 100, 100, 100, 100, 100, 3E3, 100, 100, 200, 100, 100]);
    S.ANIM_EXIT = new GameAnimation([9, 10, 11, 12, 13, 14, 15, 16, 17],[100, 100, 100, 100, 100, 100, 100, 100, 100],!1);
    S.ANIM_END_1 = new GameAnimation([9, 10],[100, 100],!1);
    S.ANIM_END_2 = new GameAnimation([11, 12, 22, 14, 24, 25, 26],[100, 100, 100, 100, 100, 100, 100]);
    J.HIT_W = 12;
    J.HIT_H = 42;
    J.SPEED = 3.7;
    J.RAMP_MULT = .7;
    J.ACCEL = .33;
    J.DECCEL_MULT = .6;
    J.JUMP_SPEED = 5.9;
    J.JUMP_DELAY = .25;
    J.JUMP_DELAY_2 = .06666666666666667;
    J.GRAVITY = .35;
    J.GRAVITY_MAX = 9;
    J.ROTATE_DELAY = .05;
    J.ANIM_IDLE = new GameAnimation([0, 1, 2, 3],[400, 400, 400, 400]);
    J.ANIM_RUN = new GameAnimation([4, 5, 6, 7],[100, 100, 100, 100]);
    J.ANIM_JUMP = new GameAnimation([8, 9],[200, 200],!1);
    J.ANIM_FALL = new GameAnimation([12, 13, 14, 15],[100, 100, 100, 100]);
    J.ANIM_ROTATE = new GameAnimation([16, 17, 18, 19],[100, 100, 100, 100],!1);
    l.rotating = !1;
    l.rotation = 0;
    Za.TOGGLE_TIMER = .67;
    EditorTiles.registry = [];
    EditorTiles.start = EditorTiles.register(-1, new TileStart);
    EditorTiles.finish = EditorTiles.register(-2, new TileFinish);
    EditorTiles.air = EditorTiles.register(0, new TileAir);
    EditorTiles.solid = EditorTiles.register(1, new TileSolid);
    EditorTiles.stairs = EditorTiles.register(2, new Fb);
    EditorTiles.ramp = EditorTiles.register(3, new $a);
    EditorTiles.platform = EditorTiles.register(4, new Cb);
    EditorTiles.spikes = EditorTiles.register(5, new Eb);
    EditorTiles.saw = EditorTiles.register(6, new Db);
    EditorTiles.lever = EditorTiles.register(8, new Za);
    EditorTiles.door = EditorTiles.register(9, new yb);
    EditorTiles.number = EditorTiles.register(7, new Bb);
    EditorTiles.vent = EditorTiles.register(10, new Hb);
    EditorTiles.fan = EditorTiles.register(11, new zb);
    BloodParticle.GRAVITY_MULT = .2;
    LevelEditor.WORLD_SIZE = 42;
    Level1.fadeSpeed = .1;
    Level8.fakeCol = 30;
    Level8.fakeRow = 16;
    Levels.level1 = new Level1;
    Levels.level2 = new Level2;
    Levels.level3 = new Level3;
    Levels.level4 = new Level4;
    Levels.level5 = new Level5;
    Levels.level6 = new Level6;
    Levels.level7 = new Level7;
    Levels.level8 = new Level8;
    Levels.level9 = new Level9;
    Levels.level10 = new Level10;
    Levels.level11 = new Level11;
    Levels.level12 = new Level12;
    Levels.level13 = new Level13;
    Levels.level14 = new Level14;
    Levels.level15 = new Level15;
    Levels.level16 = new Level16;
    Levels.list = [Levels.level1, Levels.level2, Levels.level3, Levels.level4, Levels.level5, Levels.level6, Levels.level7, Levels.level8, Levels.level9, Levels.level10, Levels.level11, Levels.level12, Levels.level13, Levels.level14, Levels.level15, Levels.level16];
    Levels.unlocked = 0;
    Levels.speedrunBest = -1;
    Speech.TIME_TYPE = 30;
    Speech.TIME_STAY = 5250;
    Speech.TIME_FADE = 750;
    EditorLevel.MOVE_SPEED = 4;
    EditorLevel.showGrid = !0;
    EditorLevel.editorLevel = new LevelEditor;
    GameplayLevel.continueTheme = !1;
    GameplayLevel.RESTART_DELAY = 1;
    GameplayLevel.DEATH_TIME = 1.5;
    GameplayLevel.DEATH_SHAKE_TIME = .85;
    GameplayLevel.DEATH_SHAKE_AMOUNT = 24;
    GameplayLevel.stopped = !1;
    GameplayLevel.canceled = !1;
    GraphicsObjectText.ALIGN_LEFT = 0;
    GraphicsObjectText.ALIGN_CENTER = 1;
    GraphicsObjectText.ALIGN_RIGHT = 2;
    GraphicsObjectText.X_ALIGN_LEFT = 0;
    GraphicsObjectText.X_ALIGN_CENTER = 1;
    GraphicsObjectText.X_ALIGN_RIGHT = 2;
    GraphicsObjectText.Y_ALIGN_TOP = 0;
    GraphicsObjectText.Y_ALIGN_MIDDLE = 1;
    GraphicsObjectText.Y_ALIGN_BOTTOM = 2;
    EditorTileSelector.size2 = Constants.tileSize / 2;
    EditorTileSelector.size4 = Constants.tileSize + 4;
    EditorTileSelector.list = [EditorTiles.air, EditorTiles.solid, EditorTiles.start, EditorTiles.finish, EditorTiles.stairs, EditorTiles.ramp, EditorTiles.platform, EditorTiles.spikes, EditorTiles.saw, EditorTiles.lever, EditorTiles.door, EditorTiles.number, EditorTiles.vent, EditorTiles.fan];
    EditorTileSelector.selected = 1;
    EditorBarLower.HEIGHT = 48;
    EditorBarUpper.HEIGHT = 48;
    EditorBarUpper.EDGE_PAD = 14;
    EditorBarUpper.EDGE_PAD_Y = 9;
    EditorBarUpper.BTN_SPACE = 12;
    EditorBarUpper.BTN_PAD = 8;
    EditorBarUpper.TEXT_GREY = .75;
    EditorBarUpper.THEMES = ["Theme A", "Theme B"];
    GameInstance.main()
}
)();
