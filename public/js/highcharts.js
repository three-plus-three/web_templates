/*
 Highcharts JS v7.1.0 (2019-04-01)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (N, K) {
  "object" === typeof module && module.exports ? (K["default"] = K, module.exports = N.document ? K(N) : K) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function () {
    return K(N)
  }) : (N.Highcharts && N.Highcharts.error(16, !0), N.Highcharts = K(N))
})("undefined" !== typeof window ? window : this, function (N) {
  function K(a, C, I, H) {
    a.hasOwnProperty(C) || (a[C] = H.apply(null, I))
  }

  var F = {};
  K(F, "parts/Globals.js", [], function () {
    var a = "undefined" === typeof N ? "undefined" !== typeof window ? window : {} : N, C = a.document,
        I = a.navigator && a.navigator.userAgent || "",
        H = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
        k = /(edge|msie|trident)/i.test(I) && !a.opera, d = -1 !== I.indexOf("Firefox"), q = -1 !== I.indexOf("Chrome"),
        t = d && 4 > parseInt(I.split("Firefox/")[1], 10);
    return {
      product: "Highcharts",
      version: "7.1.0",
      deg2rad: 2 * Math.PI / 360,
      doc: C,
      hasBidiBug: t,
      hasTouch: C && void 0 !== C.documentElement.ontouchstart,
      isMS: k,
      isWebKit: -1 !== I.indexOf("AppleWebKit"),
      isFirefox: d,
      isChrome: q,
      isSafari: !q && -1 !== I.indexOf("Safari"),
      isTouchDevice: /(Mobile|Android|Windows Phone)/.test(I),
      SVG_NS: "http://www.w3.org/2000/svg",
      chartCount: 0,
      seriesTypes: {},
      symbolSizes: {},
      svg: H,
      win: a,
      marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
      noop: function () {
      },
      charts: [],
      dateFormats: {}
    }
  });
  K(F, "parts/Utilities.js", [F["parts/Globals.js"]], function (a) {
    a.timers = [];
    var C = a.charts, I = a.doc, H = a.win;
    a.error = function (k, d, q) {
      var t = a.isNumber(k) ? "Highcharts error #" + k + ": www.highcharts.com/errors/" + k : k, u = function () {
        if (d) throw Error(t);
        H.console &&
        console.log(t)
      };
      q ? a.fireEvent(q, "displayError", {code: k, message: t}, u) : u()
    };
    a.Fx = function (a, d, q) {
      this.options = d;
      this.elem = a;
      this.prop = q
    };
    a.Fx.prototype = {
      dSetter: function () {
        var a = this.paths[0], d = this.paths[1], q = [], t = this.now, u = a.length, v;
        if (1 === t) q = this.toD; else if (u === d.length && 1 > t) for (; u--;) v = parseFloat(a[u]), q[u] = isNaN(v) ? d[u] : t * parseFloat(d[u] - v) + v; else q = d;
        this.elem.attr("d", q, null, !0)
      }, update: function () {
        var a = this.elem, d = this.prop, q = this.now, t = this.options.step;
        if (this[d + "Setter"]) this[d + "Setter"]();
        else a.attr ? a.element && a.attr(d, q, null, !0) : a.style[d] = q + this.unit;
        t && t.call(a, q, this)
      }, run: function (k, d, q) {
        var t = this, u = t.options, v = function (a) {
          return v.stopped ? !1 : t.step(a)
        }, p = H.requestAnimationFrame || function (a) {
          setTimeout(a, 13)
        }, g = function () {
          for (var e = 0; e < a.timers.length; e++) a.timers[e]() || a.timers.splice(e--, 1);
          a.timers.length && p(g)
        };
        k !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = k, this.end = d, this.unit = q, this.now = this.start, this.pos = 0, v.elem = this.elem, v.prop =
            this.prop, v() && 1 === a.timers.push(v) && p(g)) : (delete u.curAnim[this.prop], u.complete && 0 === Object.keys(u.curAnim).length && u.complete.call(this.elem))
      }, step: function (k) {
        var d = +new Date, q, t = this.options, u = this.elem, v = t.complete, p = t.duration, g = t.curAnim;
        u.attr && !u.element ? k = !1 : k || d >= p + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), q = g[this.prop] = !0, a.objectEach(g, function (a) {
          !0 !== a && (q = !1)
        }), q && v && v.call(u), k = !1) : (this.pos = t.easing((d - this.startTime) / p), this.now = this.start + (this.end - this.start) *
            this.pos, this.update(), k = !0);
        return k
      }, initPath: function (k, d, q) {
        function t(a) {
          var b, f;
          for (c = a.length; c--;) b = "M" === a[c] || "L" === a[c], f = /[a-zA-Z]/.test(a[c + 3]), b && f && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2])
        }

        function u(a, f) {
          for (; a.length < b;) {
            a[0] = f[b - a.length];
            var e = a.slice(0, l);
            [].splice.apply(a, [0, 0].concat(e));
            w && (e = a.slice(a.length - l), [].splice.apply(a, [a.length, 0].concat(e)), c--)
          }
          a[0] = "M"
        }

        function v(a, c) {
          for (var e = (b - a.length) / l; 0 < e && e--;) f = a.slice().splice(a.length / r - l, l * r), f[0] = c[b - l - e * l], m &&
          (f[l - 6] = f[l - 2], f[l - 5] = f[l - 1]), [].splice.apply(a, [a.length / r, 0].concat(f)), w && e--
        }

        d = d || "";
        var p, g = k.startX, e = k.endX, m = -1 < d.indexOf("C"), l = m ? 7 : 3, b, f, c;
        d = d.split(" ");
        q = q.slice();
        var w = k.isArea, r = w ? 2 : 1, J;
        m && (t(d), t(q));
        if (g && e) {
          for (c = 0; c < g.length; c++) if (g[c] === e[0]) {
            p = c;
            break
          } else if (g[0] === e[e.length - g.length + c]) {
            p = c;
            J = !0;
            break
          }
          void 0 === p && (d = [])
        }
        d.length && a.isNumber(p) && (b = q.length + p * r * l, J ? (u(d, q), v(q, d)) : (u(q, d), v(d, q)));
        return [d, q]
      }, fillSetter: function () {
        a.Fx.prototype.strokeSetter.apply(this, arguments)
      },
      strokeSetter: function () {
        this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
      }
    };
    a.merge = function () {
      var k, d = arguments, q, t = {}, u = function (d, p) {
        "object" !== typeof d && (d = {});
        a.objectEach(p, function (g, e) {
          !a.isObject(g, !0) || a.isClass(g) || a.isDOMElement(g) ? d[e] = p[e] : d[e] = u(d[e] || {}, g)
        });
        return d
      };
      !0 === d[0] && (t = d[1], d = Array.prototype.slice.call(d, 2));
      q = d.length;
      for (k = 0; k < q; k++) t = u(t, d[k]);
      return t
    };
    a.pInt = function (a, d) {
      return parseInt(a, d || 10)
    };
    a.isString = function (a) {
      return "string" ===
          typeof a
    };
    a.isArray = function (a) {
      a = Object.prototype.toString.call(a);
      return "[object Array]" === a || "[object Array Iterator]" === a
    };
    a.isObject = function (k, d) {
      return !!k && "object" === typeof k && (!d || !a.isArray(k))
    };
    a.isDOMElement = function (k) {
      return a.isObject(k) && "number" === typeof k.nodeType
    };
    a.isClass = function (k) {
      var d = k && k.constructor;
      return !(!a.isObject(k, !0) || a.isDOMElement(k) || !d || !d.name || "Object" === d.name)
    };
    a.isNumber = function (a) {
      return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
    };
    a.erase =
        function (a, d) {
          for (var k = a.length; k--;) if (a[k] === d) {
            a.splice(k, 1);
            break
          }
        };
    a.defined = function (a) {
      return void 0 !== a && null !== a
    };
    a.attr = function (k, d, q) {
      var t;
      a.isString(d) ? a.defined(q) ? k.setAttribute(d, q) : k && k.getAttribute && ((t = k.getAttribute(d)) || "class" !== d || (t = k.getAttribute(d + "Name"))) : a.defined(d) && a.isObject(d) && a.objectEach(d, function (a, d) {
        k.setAttribute(d, a)
      });
      return t
    };
    a.splat = function (k) {
      return a.isArray(k) ? k : [k]
    };
    a.syncTimeout = function (a, d, q) {
      if (d) return setTimeout(a, d, q);
      a.call(0, q)
    };
    a.clearTimeout =
        function (k) {
          a.defined(k) && clearTimeout(k)
        };
    a.extend = function (a, d) {
      var k;
      a || (a = {});
      for (k in d) a[k] = d[k];
      return a
    };
    a.pick = function () {
      var a = arguments, d, q, t = a.length;
      for (d = 0; d < t; d++) if (q = a[d], void 0 !== q && null !== q) return q
    };
    a.css = function (k, d) {
      a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter = "alpha(opacity\x3d" + 100 * d.opacity + ")");
      a.extend(k.style, d)
    };
    a.createElement = function (k, d, q, t, u) {
      k = I.createElement(k);
      var v = a.css;
      d && a.extend(k, d);
      u && v(k, {padding: 0, border: "none", margin: 0});
      q && v(k, q);
      t && t.appendChild(k);
      return k
    };
    a.extendClass = function (k, d) {
      var q = function () {
      };
      q.prototype = new k;
      a.extend(q.prototype, d);
      return q
    };
    a.pad = function (a, d, q) {
      return Array((d || 2) + 1 - String(a).replace("-", "").length).join(q || 0) + a
    };
    a.relativeLength = function (a, d, q) {
      return /%$/.test(a) ? d * parseFloat(a) / 100 + (q || 0) : parseFloat(a)
    };
    a.wrap = function (a, d, q) {
      var k = a[d];
      a[d] = function () {
        var a = Array.prototype.slice.call(arguments), d = arguments, p = this;
        p.proceed = function () {
          k.apply(p, arguments.length ? arguments : d)
        };
        a.unshift(k);
        a = q.apply(this, a);
        p.proceed = null;
        return a
      }
    };
    a.datePropsToTimestamps = function (k) {
      a.objectEach(k, function (d, q) {
        a.isObject(d) && "function" === typeof d.getTime ? k[q] = d.getTime() : (a.isObject(d) || a.isArray(d)) && a.datePropsToTimestamps(d)
      })
    };
    a.formatSingle = function (k, d, q) {
      var t = /\.([0-9])/, u = a.defaultOptions.lang;
      /f$/.test(k) ? (q = (q = k.match(t)) ? q[1] : -1, null !== d && (d = a.numberFormat(d, q, u.decimalPoint, -1 < k.indexOf(",") ? u.thousandsSep : ""))) : d = (q || a.time).dateFormat(k, d);
      return d
    };
    a.format = function (k, d, q) {
      for (var t = "{", u = !1, v, p, g,
               e, m = [], l; k;) {
        t = k.indexOf(t);
        if (-1 === t) break;
        v = k.slice(0, t);
        if (u) {
          v = v.split(":");
          p = v.shift().split(".");
          e = p.length;
          l = d;
          for (g = 0; g < e; g++) l && (l = l[p[g]]);
          v.length && (l = a.formatSingle(v.join(":"), l, q));
          m.push(l)
        } else m.push(v);
        k = k.slice(t + 1);
        t = (u = !u) ? "}" : "{"
      }
      m.push(k);
      return m.join("")
    };
    a.getMagnitude = function (a) {
      return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
    };
    a.normalizeTickInterval = function (k, d, q, t, u) {
      var v, p = k;
      q = a.pick(q, 1);
      v = k / q;
      d || (d = u ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 ===
      q ? d = d.filter(function (a) {
        return 0 === a % 1
      }) : .1 >= q && (d = [1 / q])));
      for (t = 0; t < d.length && !(p = d[t], u && p * q >= k || !u && v <= (d[t] + (d[t + 1] || d[t])) / 2); t++) ;
      return p = a.correctFloat(p * q, -Math.round(Math.log(.001) / Math.LN10))
    };
    a.stableSort = function (a, d) {
      var k = a.length, t, u;
      for (u = 0; u < k; u++) a[u].safeI = u;
      a.sort(function (a, p) {
        t = d(a, p);
        return 0 === t ? a.safeI - p.safeI : t
      });
      for (u = 0; u < k; u++) delete a[u].safeI
    };
    a.arrayMin = function (a) {
      for (var d = a.length, k = a[0]; d--;) a[d] < k && (k = a[d]);
      return k
    };
    a.arrayMax = function (a) {
      for (var d = a.length,
               k = a[0]; d--;) a[d] > k && (k = a[d]);
      return k
    };
    a.destroyObjectProperties = function (k, d) {
      a.objectEach(k, function (a, t) {
        a && a !== d && a.destroy && a.destroy();
        delete k[t]
      })
    };
    a.discardElement = function (k) {
      var d = a.garbageBin;
      d || (d = a.createElement("div"));
      k && d.appendChild(k);
      d.innerHTML = ""
    };
    a.correctFloat = function (a, d) {
      return parseFloat(a.toPrecision(d || 14))
    };
    a.setAnimation = function (k, d) {
      d.renderer.globalAnimation = a.pick(k, d.options.chart.animation, !0)
    };
    a.animObject = function (k) {
      return a.isObject(k) ? a.merge(k) : {
        duration: k ?
            500 : 0
      }
    };
    a.timeUnits = {
      millisecond: 1,
      second: 1E3,
      minute: 6E4,
      hour: 36E5,
      day: 864E5,
      week: 6048E5,
      month: 24192E5,
      year: 314496E5
    };
    a.numberFormat = function (k, d, q, t) {
      k = +k || 0;
      d = +d;
      var u = a.defaultOptions.lang, v = (k.toString().split(".")[1] || "").split("e")[0].length, p, g,
          e = k.toString().split("e");
      -1 === d ? d = Math.min(v, 20) : a.isNumber(d) ? d && e[1] && 0 > e[1] && (p = d + +e[1], 0 <= p ? (e[0] = (+e[0]).toExponential(p).split("e")[0], d = p) : (e[0] = e[0].split(".")[0] || 0, k = 20 > d ? (e[0] * Math.pow(10, e[1])).toFixed(d) : 0, e[1] = 0)) : d = 2;
      g = (Math.abs(e[1] ?
          e[0] : k) + Math.pow(10, -Math.max(d, v) - 1)).toFixed(d);
      v = String(a.pInt(g));
      p = 3 < v.length ? v.length % 3 : 0;
      q = a.pick(q, u.decimalPoint);
      t = a.pick(t, u.thousandsSep);
      k = (0 > k ? "-" : "") + (p ? v.substr(0, p) + t : "");
      k += v.substr(p).replace(/(\d{3})(?=\d)/g, "$1" + t);
      d && (k += q + g.slice(-d));
      e[1] && 0 !== +k && (k += "e" + e[1]);
      return k
    };
    Math.easeInOutSine = function (a) {
      return -.5 * (Math.cos(Math.PI * a) - 1)
    };
    a.getStyle = function (k, d, q) {
      if ("width" === d) return Math.max(0, Math.min(k.offsetWidth, k.scrollWidth, k.getBoundingClientRect && "none" === a.getStyle(k,
          "transform", !1) ? Math.floor(k.getBoundingClientRect().width) : Infinity) - a.getStyle(k, "padding-left") - a.getStyle(k, "padding-right"));
      if ("height" === d) return Math.max(0, Math.min(k.offsetHeight, k.scrollHeight) - a.getStyle(k, "padding-top") - a.getStyle(k, "padding-bottom"));
      H.getComputedStyle || a.error(27, !0);
      if (k = H.getComputedStyle(k, void 0)) k = k.getPropertyValue(d), a.pick(q, "opacity" !== d) && (k = a.pInt(k));
      return k
    };
    a.inArray = function (a, d, q) {
      return d.indexOf(a, q)
    };
    a.find = Array.prototype.find ? function (a, d) {
          return a.find(d)
        } :
        function (a, d) {
          var k, t = a.length;
          for (k = 0; k < t; k++) if (d(a[k], k)) return a[k]
        };
    a.keys = Object.keys;
    a.offset = function (a) {
      var d = I.documentElement;
      a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {top: 0, left: 0};
      return {
        top: a.top + (H.pageYOffset || d.scrollTop) - (d.clientTop || 0),
        left: a.left + (H.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
      }
    };
    a.stop = function (k, d) {
      for (var q = a.timers.length; q--;) a.timers[q].elem !== k || d && d !== a.timers[q].prop || (a.timers[q].stopped = !0)
    };
    a.objectEach = function (a, d, q) {
      for (var k in a) a.hasOwnProperty(k) &&
      d.call(q || a[k], a[k], k, a)
    };
    a.objectEach({map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some"}, function (k, d) {
      a[d] = function (a) {
        return Array.prototype[k].apply(a, [].slice.call(arguments, 1))
      }
    });
    a.addEvent = function (k, d, q, t) {
      var u, v = k.addEventListener || a.addEventListenerPolyfill;
      u = "function" === typeof k && k.prototype ? k.prototype.protoEvents = k.prototype.protoEvents || {} : k.hcEvents = k.hcEvents || {};
      a.Point && k instanceof a.Point && k.series && k.series.chart && (k.series.chart.runTrackerClick = !0);
      v && v.call(k,
          d, q, !1);
      u[d] || (u[d] = []);
      u[d].push(q);
      t && a.isNumber(t.order) && (q.order = t.order, u[d].sort(function (a, g) {
        return a.order - g.order
      }));
      return function () {
        a.removeEvent(k, d, q)
      }
    };
    a.removeEvent = function (k, d, q) {
      function t(g, e) {
        var m = k.removeEventListener || a.removeEventListenerPolyfill;
        m && m.call(k, g, e, !1)
      }

      function u(g) {
        var e, m;
        k.nodeName && (d ? (e = {}, e[d] = !0) : e = g, a.objectEach(e, function (a, b) {
          if (g[b]) for (m = g[b].length; m--;) t(b, g[b][m])
        }))
      }

      var v, p;
      ["protoEvents", "hcEvents"].forEach(function (a) {
        var e = k[a];
        e && (d ? (v =
            e[d] || [], q ? (p = v.indexOf(q), -1 < p && (v.splice(p, 1), e[d] = v), t(d, q)) : (u(e), e[d] = [])) : (u(e), k[a] = {}))
      })
    };
    a.fireEvent = function (k, d, q, t) {
      var u, v, p, g, e;
      q = q || {};
      I.createEvent && (k.dispatchEvent || k.fireEvent) ? (u = I.createEvent("Events"), u.initEvent(d, !0, !0), a.extend(u, q), k.dispatchEvent ? k.dispatchEvent(u) : k.fireEvent(d, u)) : ["protoEvents", "hcEvents"].forEach(function (m) {
        if (k[m]) for (v = k[m][d] || [], p = v.length, q.target || a.extend(q, {
          preventDefault: function () {
            q.defaultPrevented = !0
          }, target: k, type: d
        }), g = 0; g < p; g++) (e = v[g]) &&
        !1 === e.call(k, q) && q.preventDefault()
      });
      t && !q.defaultPrevented && t.call(k, q)
    };
    a.animate = function (k, d, q) {
      var t, u = "", v, p, g;
      a.isObject(q) || (g = arguments, q = {duration: g[2], easing: g[3], complete: g[4]});
      a.isNumber(q.duration) || (q.duration = 400);
      q.easing = "function" === typeof q.easing ? q.easing : Math[q.easing] || Math.easeInOutSine;
      q.curAnim = a.merge(d);
      a.objectEach(d, function (e, g) {
        a.stop(k, g);
        p = new a.Fx(k, q, g);
        v = null;
        "d" === g ? (p.paths = p.initPath(k, k.d, d.d), p.toD = d.d, t = 0, v = 1) : k.attr ? t = k.attr(g) : (t = parseFloat(a.getStyle(k,
            g)) || 0, "opacity" !== g && (u = "px"));
        v || (v = e);
        v && v.match && v.match("px") && (v = v.replace(/px/g, ""));
        p.run(t, v, u)
      })
    };
    a.seriesType = function (k, d, q, t, u) {
      var v = a.getOptions(), p = a.seriesTypes;
      v.plotOptions[k] = a.merge(v.plotOptions[d], q);
      p[k] = a.extendClass(p[d] || function () {
      }, t);
      p[k].prototype.type = k;
      u && (p[k].prototype.pointClass = a.extendClass(a.Point, u));
      return p[k]
    };
    a.uniqueKey = function () {
      var a = Math.random().toString(36).substring(2, 9), d = 0;
      return function () {
        return "highcharts-" + a + "-" + d++
      }
    }();
    a.isFunction = function (a) {
      return "function" ===
          typeof a
    };
    H.jQuery && (H.jQuery.fn.highcharts = function () {
      var k = [].slice.call(arguments);
      if (this[0]) return k[0] ? (new (a[a.isString(k[0]) ? k.shift() : "Chart"])(this[0], k[0], k[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
    })
  });
  K(F, "parts/Color.js", [F["parts/Globals.js"]], function (a) {
    var C = a.isNumber, I = a.merge, H = a.pInt;
    a.Color = function (k) {
      if (!(this instanceof a.Color)) return new a.Color(k);
      this.init(k)
    };
    a.Color.prototype = {
      parsers: [{
        regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        parse: function (a) {
          return [H(a[1]), H(a[2]), H(a[3]), parseFloat(a[4], 10)]
        }
      }, {
        regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) {
          return [H(a[1]), H(a[2]), H(a[3]), 1]
        }
      }], names: {white: "#ffffff", black: "#000000"}, init: function (k) {
        var d, q, t, u;
        if ((this.input = k = this.names[k && k.toLowerCase ? k.toLowerCase() : ""] || k) && k.stops) this.stops = k.stops.map(function (d) {
          return new a.Color(d[1])
        }); else if (k && k.charAt && "#" === k.charAt() && (d = k.length, k = parseInt(k.substr(1), 16), 7 === d ? q = [(k & 16711680) >>
            16, (k & 65280) >> 8, k & 255, 1] : 4 === d && (q = [(k & 3840) >> 4 | (k & 3840) >> 8, (k & 240) >> 4 | k & 240, (k & 15) << 4 | k & 15, 1])), !q) for (t = this.parsers.length; t-- && !q;) u = this.parsers[t], (d = u.regex.exec(k)) && (q = u.parse(d));
        this.rgba = q || []
      }, get: function (a) {
        var d = this.input, k = this.rgba, t;
        this.stops ? (t = I(d), t.stops = [].concat(t.stops), this.stops.forEach(function (d, k) {
          t.stops[k] = [t.stops[k][0], d.get(a)]
        })) : t = k && C(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : d;
        return t
      }, brighten: function (a) {
        var d,
            k = this.rgba;
        if (this.stops) this.stops.forEach(function (d) {
          d.brighten(a)
        }); else if (C(a) && 0 !== a) for (d = 0; 3 > d; d++) k[d] += H(255 * a), 0 > k[d] && (k[d] = 0), 255 < k[d] && (k[d] = 255);
        return this
      }, setOpacity: function (a) {
        this.rgba[3] = a;
        return this
      }, tweenTo: function (a, d) {
        var k = this.rgba, t = a.rgba;
        t.length && k && k.length ? (a = 1 !== t[3] || 1 !== k[3], d = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (k[0] - t[0]) * (1 - d)) + "," + Math.round(t[1] + (k[1] - t[1]) * (1 - d)) + "," + Math.round(t[2] + (k[2] - t[2]) * (1 - d)) + (a ? "," + (t[3] + (k[3] - t[3]) * (1 - d)) : "") + ")") : d = a.input ||
            "none";
        return d
      }
    };
    a.color = function (k) {
      return new a.Color(k)
    }
  });
  K(F, "parts/SvgRenderer.js", [F["parts/Globals.js"]], function (a) {
    var C, I, H = a.addEvent, k = a.animate, d = a.attr, q = a.charts, t = a.color, u = a.css, v = a.createElement,
        p = a.defined, g = a.deg2rad, e = a.destroyObjectProperties, m = a.doc, l = a.extend, b = a.erase,
        f = a.hasTouch, c = a.isArray, w = a.isFirefox, r = a.isMS, J = a.isObject, G = a.isString, B = a.isWebKit,
        n = a.merge, E = a.noop, z = a.objectEach, A = a.pick, D = a.pInt, h = a.removeEvent, y = a.splat, M = a.stop,
        R = a.svg, L = a.SVG_NS, S = a.symbolSizes,
        P = a.win;
    C = a.SVGElement = function () {
      return this
    };
    l(C.prototype, {
      opacity: 1,
      SVG_NS: L,
      textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
      init: function (x, h) {
        this.element = "span" === h ? v(h) : m.createElementNS(this.SVG_NS, h);
        this.renderer = x;
        a.fireEvent(this, "afterInit")
      },
      animate: function (x, h, c) {
        var b = a.animObject(A(h, this.renderer.globalAnimation, !0));
        A(m.hidden, m.msHidden, m.webkitHidden, !1) && (b.duration = 0);
        0 !== b.duration ? (c && (b.complete = c), k(this, x, b)) : (this.attr(x, null, c), a.objectEach(x, function (a, x) {
          b.step && b.step.call(this, a, {prop: x, pos: 1})
        }, this));
        return this
      },
      complexColor: function (x, h, b) {
        var f = this.renderer, e, y, l, g, L, m, w, E, Q, r, d, D = [], R;
        a.fireEvent(this.renderer, "complexColor", {args: arguments}, function () {
          x.radialGradient ? y = "radialGradient" : x.linearGradient && (y = "linearGradient");
          y && (l = x[y], L = f.gradients, w = x.stops, r = b.radialReference, c(l) && (x[y] = l = {
            x1: l[0],
            y1: l[1],
            x2: l[2],
            y2: l[3],
            gradientUnits: "userSpaceOnUse"
          }),
          "radialGradient" === y && r && !p(l.gradientUnits) && (g = l, l = n(l, f.getRadialAttr(r, g), {gradientUnits: "userSpaceOnUse"})), z(l, function (a, x) {
            "id" !== x && D.push(x, a)
          }), z(w, function (a) {
            D.push(a)
          }), D = D.join(","), L[D] ? d = L[D].attr("id") : (l.id = d = a.uniqueKey(), L[D] = m = f.createElement(y).attr(l).add(f.defs), m.radAttr = g, m.stops = [], w.forEach(function (x) {
            0 === x[1].indexOf("rgba") ? (e = a.color(x[1]), E = e.get("rgb"), Q = e.get("a")) : (E = x[1], Q = 1);
            x = f.createElement("stop").attr({offset: x[0], "stop-color": E, "stop-opacity": Q}).add(m);
            m.stops.push(x)
          })), R = "url(" + f.url + "#" + d + ")", b.setAttribute(h, R), b.gradient = D, x.toString = function () {
            return R
          })
        })
      },
      applyTextOutline: function (x) {
        var h = this.element, b, c, f;
        -1 !== x.indexOf("contrast") && (x = x.replace(/contrast/g, this.renderer.getContrast(h.style.fill)));
        x = x.split(" ");
        b = x[x.length - 1];
        (c = x[0]) && "none" !== c && a.svg && (this.fakeTS = !0, x = [].slice.call(h.getElementsByTagName("tspan")), this.ySetter = this.xSetter, c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, x, h) {
          return 2 * x + h
        }), this.removeTextOutline(x),
            f = h.firstChild, x.forEach(function (a, x) {
          0 === x && (a.setAttribute("x", h.getAttribute("x")), x = h.getAttribute("y"), a.setAttribute("y", x || 0), null === x && h.setAttribute("y", 0));
          a = a.cloneNode(1);
          d(a, {"class": "highcharts-text-outline", fill: b, stroke: b, "stroke-width": c, "stroke-linejoin": "round"});
          h.insertBefore(a, f)
        }))
      },
      removeTextOutline: function (a) {
        for (var x = a.length, h; x--;) h = a[x], "highcharts-text-outline" === h.getAttribute("class") && b(a, this.element.removeChild(h))
      },
      symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
      attr: function (x, h, c, b) {
        var f, y = this.element, e, n = this, l, g, L = this.symbolCustomAttribs;
        "string" === typeof x && void 0 !== h && (f = x, x = {}, x[f] = h);
        "string" === typeof x ? n = (this[x + "Getter"] || this._defaultGetter).call(this, x, y) : (z(x, function (h, c) {
          l = !1;
          b || M(this, c);
          this.symbolName && -1 !== a.inArray(c, L) && (e || (this.symbolAttr(x), e = !0), l = !0);
          !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0);
          l || (g = this[c + "Setter"] || this._defaultSetter, g.call(this, h, c, y), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) &&
          this.updateShadows(c, h, g))
        }, this), this.afterSetters());
        c && c.call(this);
        return n
      },
      afterSetters: function () {
        this.doTransform && (this.updateTransform(), this.doTransform = !1)
      },
      updateShadows: function (a, h, c) {
        for (var x = this.shadows, b = x.length; b--;) c.call(x[b], "height" === a ? Math.max(h - (x[b].cutHeight || 0), 0) : "d" === a ? this.d : h, a, x[b])
      },
      addClass: function (a, h) {
        var x = this.attr("class") || "";
        h || (a = (a || "").split(/ /g).reduce(function (a, h) {
          -1 === x.indexOf(h) && a.push(h);
          return a
        }, x ? [x] : []).join(" "));
        a !== x && this.attr("class",
            a);
        return this
      },
      hasClass: function (a) {
        return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
      },
      removeClass: function (a) {
        return this.attr("class", (this.attr("class") || "").replace(a, ""))
      },
      symbolAttr: function (a) {
        var x = this;
        "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (h) {
          x[h] = A(a[h], x[h])
        });
        x.attr({d: x.renderer.symbols[x.symbolName](x.x, x.y, x.width, x.height, x)})
      },
      clip: function (a) {
        return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
      },
      crisp: function (a, h) {
        var x;
        h = h || a.strokeWidth || 0;
        x = Math.round(h) % 2 / 2;
        a.x = Math.floor(a.x || this.x || 0) + x;
        a.y = Math.floor(a.y || this.y || 0) + x;
        a.width = Math.floor((a.width || this.width || 0) - 2 * x);
        a.height = Math.floor((a.height || this.height || 0) - 2 * x);
        p(a.strokeWidth) && (a.strokeWidth = h);
        return a
      },
      css: function (a) {
        var x = this.styles, h = {}, c = this.element, b, f = "", y, e = !x,
            n = ["textOutline", "textOverflow", "width"];
        a && a.color && (a.fill = a.color);
        x && z(a, function (a, c) {
          a !== x[c] && (h[c] = a, e = !0)
        });
        e && (x && (a = l(x, h)), a && (null === a.width ||
        "auto" === a.width ? delete this.textWidth : "text" === c.nodeName.toLowerCase() && a.width && (b = this.textWidth = D(a.width))), this.styles = a, b && !R && this.renderer.forExport && delete a.width, c.namespaceURI === this.SVG_NS ? (y = function (a, x) {
          return "-" + x.toLowerCase()
        }, z(a, function (a, x) {
          -1 === n.indexOf(x) && (f += x.replace(/([A-Z])/g, y) + ":" + a + ";")
        }), f && d(c, "style", f)) : u(c, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
        return this
      },
      getStyle: function (a) {
        return P.getComputedStyle(this.element ||
            this, "").getPropertyValue(a)
      },
      strokeWidth: function () {
        if (!this.renderer.styledMode) return this["stroke-width"] || 0;
        var a = this.getStyle("stroke-width"), h;
        a.indexOf("px") === a.length - 2 ? a = D(a) : (h = m.createElementNS(L, "rect"), d(h, {
          width: a,
          "stroke-width": 0
        }), this.element.parentNode.appendChild(h), a = h.getBBox().width, h.parentNode.removeChild(h));
        return a
      },
      on: function (a, h) {
        var x = this, c = x.element;
        f && "click" === a ? (c.ontouchstart = function (a) {
          x.touchEventFired = Date.now();
          a.preventDefault();
          h.call(c, a)
        }, c.onclick =
            function (a) {
              (-1 === P.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (x.touchEventFired || 0)) && h.call(c, a)
            }) : c["on" + a] = h;
        return this
      },
      setRadialReference: function (a) {
        var x = this.renderer.gradients[this.element.gradient];
        this.element.radialReference = a;
        x && x.radAttr && x.animate(this.renderer.getRadialAttr(a, x.radAttr));
        return this
      },
      translate: function (a, h) {
        return this.attr({translateX: a, translateY: h})
      },
      invert: function (a) {
        this.inverted = a;
        this.updateTransform();
        return this
      },
      updateTransform: function () {
        var a =
            this.translateX || 0, h = this.translateY || 0, c = this.scaleX, b = this.scaleY, f = this.inverted,
            y = this.rotation, e = this.matrix, n = this.element;
        f && (a += this.width, h += this.height);
        a = ["translate(" + a + "," + h + ")"];
        p(e) && a.push("matrix(" + e.join(",") + ")");
        f ? a.push("rotate(90) scale(-1,1)") : y && a.push("rotate(" + y + " " + A(this.rotationOriginX, n.getAttribute("x"), 0) + " " + A(this.rotationOriginY, n.getAttribute("y") || 0) + ")");
        (p(c) || p(b)) && a.push("scale(" + A(c, 1) + " " + A(b, 1) + ")");
        a.length && n.setAttribute("transform", a.join(" "))
      },
      toFront: function () {
        var a =
            this.element;
        a.parentNode.appendChild(a);
        return this
      },
      align: function (a, h, c) {
        var x, f, y, e, n = {};
        f = this.renderer;
        y = f.alignedObjects;
        var l, g;
        if (a) {
          if (this.alignOptions = a, this.alignByTranslate = h, !c || G(c)) this.alignTo = x = c || "renderer", b(y, this), y.push(this), c = null
        } else a = this.alignOptions, h = this.alignByTranslate, x = this.alignTo;
        c = A(c, f[x], f);
        x = a.align;
        f = a.verticalAlign;
        y = (c.x || 0) + (a.x || 0);
        e = (c.y || 0) + (a.y || 0);
        "right" === x ? l = 1 : "center" === x && (l = 2);
        l && (y += (c.width - (a.width || 0)) / l);
        n[h ? "translateX" : "x"] = Math.round(y);
        "bottom" === f ? g = 1 : "middle" === f && (g = 2);
        g && (e += (c.height - (a.height || 0)) / g);
        n[h ? "translateY" : "y"] = Math.round(e);
        this[this.placed ? "animate" : "attr"](n);
        this.placed = !0;
        this.alignAttr = n;
        return this
      },
      getBBox: function (a, h) {
        var x, c = this.renderer, b, f = this.element, y = this.styles, e, n = this.textStr, L, m = c.cache,
            w = c.cacheKeys, E = f.namespaceURI === this.SVG_NS, r;
        h = A(h, this.rotation);
        b = h * g;
        e = c.styledMode ? f && C.prototype.getStyle.call(f, "font-size") : y && y.fontSize;
        p(n) && (r = n.toString(), -1 === r.indexOf("\x3c") && (r = r.replace(/[0-9]/g,
            "0")), r += ["", h || 0, e, this.textWidth, y && y.textOverflow].join());
        r && !a && (x = m[r]);
        if (!x) {
          if (E || c.forExport) {
            try {
              (L = this.fakeTS && function (a) {
                [].forEach.call(f.querySelectorAll(".highcharts-text-outline"), function (x) {
                  x.style.display = a
                })
              }) && L("none"), x = f.getBBox ? l({}, f.getBBox()) : {
                width: f.offsetWidth,
                height: f.offsetHeight
              }, L && L("")
            } catch (ba) {
            }
            if (!x || 0 > x.width) x = {width: 0, height: 0}
          } else x = this.htmlGetBBox();
          c.isSVG && (a = x.width, c = x.height, E && (x.height = c = {
                "11px,17": 14,
                "13px,20": 16
              }[y && y.fontSize + "," + Math.round(c)] ||
              c), h && (x.width = Math.abs(c * Math.sin(b)) + Math.abs(a * Math.cos(b)), x.height = Math.abs(c * Math.cos(b)) + Math.abs(a * Math.sin(b))));
          if (r && 0 < x.height) {
            for (; 250 < w.length;) delete m[w.shift()];
            m[r] || w.push(r);
            m[r] = x
          }
        }
        return x
      },
      show: function (a) {
        return this.attr({visibility: a ? "inherit" : "visible"})
      },
      hide: function () {
        return this.attr({visibility: "hidden"})
      },
      fadeOut: function (a) {
        var x = this;
        x.animate({opacity: 0}, {
          duration: a || 150, complete: function () {
            x.attr({y: -9999})
          }
        })
      },
      add: function (a) {
        var x = this.renderer, h = this.element,
            c;
        a && (this.parentGroup = a);
        this.parentInverted = a && a.inverted;
        void 0 !== this.textStr && x.buildText(this);
        this.added = !0;
        if (!a || a.handleZ || this.zIndex) c = this.zIndexSetter();
        c || (a ? a.element : x.box).appendChild(h);
        if (this.onAdd) this.onAdd();
        return this
      },
      safeRemoveChild: function (a) {
        var x = a.parentNode;
        x && x.removeChild(a)
      },
      destroy: function () {
        var a = this, h = a.element || {}, c = a.renderer, f = c.isSVG && "SPAN" === h.nodeName && a.parentGroup,
            y = h.ownerSVGElement, e = a.clipPath;
        h.onclick = h.onmouseout = h.onmouseover = h.onmousemove =
            h.point = null;
        M(a);
        e && y && ([].forEach.call(y.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
          -1 < a.getAttribute("clip-path").indexOf(e.element.id) && a.removeAttribute("clip-path")
        }), a.clipPath = e.destroy());
        if (a.stops) {
          for (y = 0; y < a.stops.length; y++) a.stops[y] = a.stops[y].destroy();
          a.stops = null
        }
        a.safeRemoveChild(h);
        for (c.styledMode || a.destroyShadows(); f && f.div && 0 === f.div.childNodes.length;) h = f.parentGroup, a.safeRemoveChild(f.div), delete f.div, f = h;
        a.alignTo && b(c.alignedObjects, a);
        z(a, function (h, x) {
          delete a[x]
        });
        return null
      },
      shadow: function (a, h, c) {
        var x = [], b, f, y = this.element, e, n, l, g;
        if (!a) this.destroyShadows(); else if (!this.shadows) {
          n = A(a.width, 3);
          l = (a.opacity || .15) / n;
          g = this.parentInverted ? "(-1,-1)" : "(" + A(a.offsetX, 1) + ", " + A(a.offsetY, 1) + ")";
          for (b = 1; b <= n; b++) f = y.cloneNode(0), e = 2 * n + 1 - 2 * b, d(f, {
            stroke: a.color || "#000000",
            "stroke-opacity": l * b,
            "stroke-width": e,
            transform: "translate" + g,
            fill: "none"
          }), f.setAttribute("class", (f.getAttribute("class") || "") + " highcharts-shadow"), c && (d(f, "height", Math.max(d(f, "height") -
              e, 0)), f.cutHeight = e), h ? h.element.appendChild(f) : y.parentNode && y.parentNode.insertBefore(f, y), x.push(f);
          this.shadows = x
        }
        return this
      },
      destroyShadows: function () {
        (this.shadows || []).forEach(function (a) {
          this.safeRemoveChild(a)
        }, this);
        this.shadows = void 0
      },
      xGetter: function (a) {
        "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
        return this._defaultGetter(a)
      },
      _defaultGetter: function (a) {
        a = A(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
        /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
        return a
      },
      dSetter: function (a, h, c) {
        a && a.join && (a = a.join(" "));
        /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
        this[h] !== a && (c.setAttribute(h, a), this[h] = a)
      },
      dashstyleSetter: function (a) {
        var h, x = this["stroke-width"];
        "inherit" === x && (x = 1);
        if (a = a && a.toLowerCase()) {
          a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
          for (h = a.length; h--;) a[h] =
              D(a[h]) * x;
          a = a.join(",").replace(/NaN/g, "none");
          this.element.setAttribute("stroke-dasharray", a)
        }
      },
      alignSetter: function (a) {
        var h = {left: "start", center: "middle", right: "end"};
        h[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", h[a]))
      },
      opacitySetter: function (a, h, c) {
        this[h] = a;
        c.setAttribute(h, a)
      },
      titleSetter: function (a) {
        var h = this.element.getElementsByTagName("title")[0];
        h || (h = m.createElementNS(this.SVG_NS, "title"), this.element.appendChild(h));
        h.firstChild && h.removeChild(h.firstChild);
        h.appendChild(m.createTextNode(String(A(a),
            "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
      },
      textSetter: function (a) {
        a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
      },
      setTextPath: function (h, c) {
        var x = this.element, b = {textAnchor: "text-anchor"}, f, y = !1, e, l = this.textPathWrapper, g = !l;
        c = n(!0, {enabled: !0, attributes: {dy: -5, startOffset: "50%", textAnchor: "middle"}}, c);
        f = c.attributes;
        if (h && c && c.enabled) {
          this.options && this.options.padding && (f.dx = -this.options.padding);
          l || (this.textPathWrapper =
              l = this.renderer.createElement("textPath"), y = !0);
          e = l.element;
          (c = h.element.getAttribute("id")) || h.element.setAttribute("id", c = a.uniqueKey());
          if (g) for (h = x.getElementsByTagName("tspan"); h.length;) h[0].setAttribute("y", 0), e.appendChild(h[0]);
          y && l.add({element: this.text ? this.text.element : x});
          e.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + c);
          p(f.dy) && (e.parentNode.setAttribute("dy", f.dy), delete f.dy);
          p(f.dx) && (e.parentNode.setAttribute("dx", f.dx), delete f.dx);
          a.objectEach(f,
              function (a, h) {
                e.setAttribute(b[h] || h, a)
              });
          x.removeAttribute("transform");
          this.removeTextOutline.call(l, [].slice.call(x.getElementsByTagName("tspan")));
          this.applyTextOutline = this.updateTransform = E
        } else l && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(x, h));
        return this
      },
      destroyTextPath: function (a, h) {
        var x;
        h.element.setAttribute("id", "");
        for (x = this.textPathWrapper.element.childNodes; x.length;) a.firstChild.appendChild(x[0]);
        a.firstChild.removeChild(this.textPathWrapper.element);
        delete h.textPathWrapper
      },
      fillSetter: function (a, h, c) {
        "string" === typeof a ? c.setAttribute(h, a) : a && this.complexColor(a, h, c)
      },
      visibilitySetter: function (a, h, c) {
        "inherit" === a ? c.removeAttribute(h) : this[h] !== a && c.setAttribute(h, a);
        this[h] = a
      },
      zIndexSetter: function (a, h) {
        var c = this.renderer, x = this.parentGroup, f = (x || c).element || c.box, b, y = this.element, e, n,
            c = f === c.box;
        b = this.added;
        var l;
        p(a) ? (y.setAttribute("data-z-index", a), a = +a, this[h] === a && (b = !1)) : p(this[h]) && y.removeAttribute("data-z-index");
        this[h] = a;
        if (b) {
          (a =
              this.zIndex) && x && (x.handleZ = !0);
          h = f.childNodes;
          for (l = h.length - 1; 0 <= l && !e; l--) if (x = h[l], b = x.getAttribute("data-z-index"), n = !p(b), x !== y) if (0 > a && n && !c && !l) f.insertBefore(y, h[l]), e = !0; else if (D(b) <= a || n && (!p(a) || 0 <= a)) f.insertBefore(y, h[l + 1] || null), e = !0;
          e || (f.insertBefore(y, h[c ? 3 : 0] || null), e = !0)
        }
        return e
      },
      _defaultSetter: function (a, h, c) {
        c.setAttribute(h, a)
      }
    });
    C.prototype.yGetter = C.prototype.xGetter;
    C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter =
        C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function (a, h) {
          this[h] = a;
          this.doTransform = !0
        };
    C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, h, c) {
      this[h] = a;
      this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === h && 0 === a && this.hasStroke && (c.removeAttribute("stroke"),
          this.hasStroke = !1)
    };
    I = a.SVGRenderer = function () {
      this.init.apply(this, arguments)
    };
    l(I.prototype, {
      Element: C,
      SVG_NS: L,
      init: function (a, h, c, f, b, y, e) {
        var x;
        x = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
        e || x.css(this.getStyle(f));
        f = x.element;
        a.appendChild(f);
        d(a, "dir", "ltr");
        -1 === a.innerHTML.indexOf("xmlns") && d(f, "xmlns", this.SVG_NS);
        this.isSVG = !0;
        this.box = f;
        this.boxWrapper = x;
        this.alignedObjects = [];
        this.url = (w || B) && m.getElementsByTagName("base").length ? P.location.href.split("#")[0].replace(/<[^>]*>/g,
            "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
        this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 7.1.0"));
        this.defs = this.createElement("defs").add();
        this.allowHTML = y;
        this.forExport = b;
        this.styledMode = e;
        this.gradients = {};
        this.cache = {};
        this.cacheKeys = [];
        this.imgCount = 0;
        this.setSize(h, c, !1);
        var n;
        w && a.getBoundingClientRect && (h = function () {
          u(a, {left: 0, top: 0});
          n = a.getBoundingClientRect();
          u(a, {
            left: Math.ceil(n.left) - n.left + "px", top: Math.ceil(n.top) - n.top +
            "px"
          })
        }, h(), this.unSubPixelFix = H(P, "resize", h))
      },
      definition: function (a) {
        function h(a, x) {
          var f;
          y(a).forEach(function (a) {
            var b = c.createElement(a.tagName), y = {};
            z(a, function (a, h) {
              "tagName" !== h && "children" !== h && "textContent" !== h && (y[h] = a)
            });
            b.attr(y);
            b.add(x || c.defs);
            a.textContent && b.element.appendChild(m.createTextNode(a.textContent));
            h(a.children || [], b);
            f = b
          });
          return f
        }

        var c = this;
        return h(a)
      },
      getStyle: function (a) {
        return this.style = l({
          fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
          fontSize: "12px"
        }, a)
      },
      setStyle: function (a) {
        this.boxWrapper.css(this.getStyle(a))
      },
      isHidden: function () {
        return !this.boxWrapper.getBBox().width
      },
      destroy: function () {
        var a = this.defs;
        this.box = null;
        this.boxWrapper = this.boxWrapper.destroy();
        e(this.gradients || {});
        this.gradients = null;
        a && (this.defs = a.destroy());
        this.unSubPixelFix && this.unSubPixelFix();
        return this.alignedObjects = null
      },
      createElement: function (a) {
        var h = new this.Element;
        h.init(this, a);
        return h
      },
      draw: E,
      getRadialAttr: function (a, h) {
        return {
          cx: a[0] - a[2] /
          2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2], r: h.r * a[2]
        }
      },
      truncate: function (a, h, c, f, b, y, e) {
        var x = this, n = a.rotation, l, g = f ? 1 : 0, L = (c || f).length, w = L, E = [], r = function (a) {
          h.firstChild && h.removeChild(h.firstChild);
          a && h.appendChild(m.createTextNode(a))
        }, p = function (y, n) {
          n = n || y;
          if (void 0 === E[n]) if (h.getSubStringLength) try {
            E[n] = b + h.getSubStringLength(0, f ? n + 1 : n)
          } catch (ca) {
          } else x.getSpanWidth && (r(e(c || f, y)), E[n] = b + x.getSpanWidth(a, h));
          return E[n]
        }, z, d;
        a.rotation = 0;
        z = p(h.textContent.length);
        if (d = b + z > y) {
          for (; g <= L;) w = Math.ceil((g +
              L) / 2), f && (l = e(f, w)), z = p(w, l && l.length - 1), g === L ? g = L + 1 : z > y ? L = w - 1 : g = w;
          0 === L ? r("") : c && L === c.length - 1 || r(l || e(c || f, w))
        }
        f && f.splice(0, w);
        a.actualWidth = z;
        a.rotation = n;
        return d
      },
      escapes: {"\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;"},
      buildText: function (a) {
        var h = a.element, c = this, f = c.forExport, b = A(a.textStr, "").toString(), x = -1 !== b.indexOf("\x3c"),
            y = h.childNodes, e, n = d(h, "x"), l = a.styles, g = a.textWidth, w = l && l.lineHeight,
            E = l && l.textOutline, r = l && "ellipsis" === l.textOverflow, p =
            l && "nowrap" === l.whiteSpace, B = l && l.fontSize, M, S, G = y.length, l = g && !a.added && this.box,
            J = function (a) {
              var b;
              c.styledMode || (b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : B || c.style.fontSize || 12);
              return w ? D(w) : c.fontMetrics(b, a.getAttribute("style") ? a : h).h
            }, k = function (a, h) {
              z(c.escapes, function (c, b) {
                h && -1 !== h.indexOf(c) || (a = a.toString().replace(new RegExp(c, "g"), b))
              });
              return a
            }, P = function (a, h) {
              var c;
              c = a.indexOf("\x3c");
              a = a.substring(c, a.indexOf("\x3e") - c);
              c = a.indexOf(h + "\x3d");
              if (-1 !== c && (c = c + h.length +
                      1, h = a.charAt(c), '"' === h || "'" === h)) return a = a.substring(c + 1), a.substring(0, a.indexOf(h))
            };
        M = [b, r, p, w, E, B, g].join();
        if (M !== a.textCache) {
          for (a.textCache = M; G--;) h.removeChild(y[G]);
          x || E || r || g || -1 !== b.indexOf(" ") ? (l && l.appendChild(h), x ? (b = c.styledMode ? b.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : b.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'),
              b = b.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g)) : b = [b], b = b.filter(function (a) {
            return "" !== a
          }), b.forEach(function (b, x) {
            var y, l = 0, w = 0;
            b = b.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
            y = b.split("|||");
            y.forEach(function (b) {
              if ("" !== b || 1 === y.length) {
                var E = {}, z = m.createElementNS(c.SVG_NS, "tspan"), D, A;
                (D = P(b, "class")) && d(z, "class", D);
                if (D = P(b, "style")) D = D.replace(/(;| |^)color([ :])/, "$1fill$2"), d(z, "style",
                    D);
                (A = P(b, "href")) && !f && (d(z, "onclick", 'location.href\x3d"' + A + '"'), d(z, "class", "highcharts-anchor"), c.styledMode || u(z, {cursor: "pointer"}));
                b = k(b.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                if (" " !== b) {
                  z.appendChild(m.createTextNode(b));
                  l ? E.dx = 0 : x && null !== n && (E.x = n);
                  d(z, E);
                  h.appendChild(z);
                  !l && S && (!R && f && u(z, {display: "block"}), d(z, "dy", J(z)));
                  if (g) {
                    var M = b.replace(/([^\^])-/g, "$1- ").split(" "), E = !p && (1 < y.length || x || 1 < M.length);
                    A = 0;
                    var G = J(z);
                    if (r) e = c.truncate(a, z, b, void 0, 0, Math.max(0, g - parseInt(B ||
                        12, 10)), function (a, h) {
                      return a.substring(0, h) + "\u2026"
                    }); else if (E) for (; M.length;) M.length && !p && 0 < A && (z = m.createElementNS(L, "tspan"), d(z, {
                      dy: G,
                      x: n
                    }), D && d(z, "style", D), z.appendChild(m.createTextNode(M.join(" ").replace(/- /g, "-"))), h.appendChild(z)), c.truncate(a, z, null, M, 0 === A ? w : 0, g, function (a, h) {
                      return M.slice(0, h).join(" ").replace(/- /g, "-")
                    }), w = a.actualWidth, A++
                  }
                  l++
                }
              }
            });
            S = S || h.childNodes.length
          }), r && e && a.attr("title", k(a.textStr, ["\x26lt;", "\x26gt;"])), l && l.removeChild(h), E && a.applyTextOutline &&
          a.applyTextOutline(E)) : h.appendChild(m.createTextNode(k(b)))
        }
      },
      getContrast: function (a) {
        a = t(a).rgba;
        a[0] *= 1;
        a[1] *= 1.2;
        a[2] *= .5;
        return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
      },
      button: function (a, h, c, b, f, y, e, g, L, w) {
        var x = this.label(a, h, c, L, null, null, w, null, "button"), m = 0, E = this.styledMode;
        x.attr(n({padding: 8, r: 2}, f));
        if (!E) {
          var z, p, d, D;
          f = n({
            fill: "#f7f7f7",
            stroke: "#cccccc",
            "stroke-width": 1,
            style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
          }, f);
          z = f.style;
          delete f.style;
          y = n(f, {fill: "#e6e6e6"}, y);
          p = y.style;
          delete y.style;
          e = n(f, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, e);
          d = e.style;
          delete e.style;
          g = n(f, {style: {color: "#cccccc"}}, g);
          D = g.style;
          delete g.style
        }
        H(x.element, r ? "mouseover" : "mouseenter", function () {
          3 !== m && x.setState(1)
        });
        H(x.element, r ? "mouseout" : "mouseleave", function () {
          3 !== m && x.setState(m)
        });
        x.setState = function (a) {
          1 !== a && (x.state = m = a);
          x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a ||
          0]);
          E || x.attr([f, y, e, g][a || 0]).css([z, p, d, D][a || 0])
        };
        E || x.attr(f).css(l({cursor: "default"}, z));
        return x.on("click", function (a) {
          3 !== m && b.call(x, a)
        })
      },
      crispLine: function (a, h) {
        a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);
        a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);
        return a
      },
      path: function (a) {
        var h = this.styledMode ? {} : {fill: "none"};
        c(a) ? h.d = a : J(a) && l(h, a);
        return this.createElement("path").attr(h)
      },
      circle: function (a, h, c) {
        a = J(a) ? a : void 0 === a ? {} : {x: a, y: h, r: c};
        h = this.createElement("circle");
        h.xSetter =
            h.ySetter = function (a, h, c) {
              c.setAttribute("c" + h, a)
            };
        return h.attr(a)
      },
      arc: function (a, h, c, b, f, y) {
        J(a) ? (b = a, h = b.y, c = b.r, a = b.x) : b = {innerR: b, start: f, end: y};
        a = this.symbol("arc", a, h, c, c, b);
        a.r = c;
        return a
      },
      rect: function (a, h, c, b, f, y) {
        f = J(a) ? a.r : f;
        var e = this.createElement("rect");
        a = J(a) ? a : void 0 === a ? {} : {x: a, y: h, width: Math.max(c, 0), height: Math.max(b, 0)};
        this.styledMode || (void 0 !== y && (a.strokeWidth = y, a = e.crisp(a)), a.fill = "none");
        f && (a.r = f);
        e.rSetter = function (a, h, c) {
          e.r = a;
          d(c, {rx: a, ry: a})
        };
        e.rGetter = function () {
          return e.r
        };
        return e.attr(a)
      },
      setSize: function (a, h, c) {
        var b = this.alignedObjects, f = b.length;
        this.width = a;
        this.height = h;
        for (this.boxWrapper.animate({width: a, height: h}, {
          step: function () {
            this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
          }, duration: A(c, !0) ? void 0 : 0
        }); f--;) b[f].align()
      },
      g: function (a) {
        var h = this.createElement("g");
        return a ? h.attr({"class": "highcharts-" + a}) : h
      },
      image: function (a, h, c, b, f, y) {
        var e = {preserveAspectRatio: "none"}, x, n = function (a, h) {
          a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink",
              "href", h) : a.setAttribute("hc-svg-href", h)
        }, g = function (h) {
          n(x.element, a);
          y.call(x, h)
        };
        1 < arguments.length && l(e, {x: h, y: c, width: b, height: f});
        x = this.createElement("image").attr(e);
        y ? (n(x.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), e = new P.Image, H(e, "load", g), e.src = a, e.complete && g({})) : n(x.element, a);
        return x
      },
      symbol: function (a, h, c, b, f, y) {
        var e = this, n, x = /^url\((.*?)\)$/, g = x.test(a), L = !g && (this.symbols[a] ? a : "circle"),
            w = L && this.symbols[L], E = p(h) && w && w.call(this.symbols,
            Math.round(h), Math.round(c), b, f, y), r, z;
        w ? (n = this.path(E), e.styledMode || n.attr("fill", "none"), l(n, {
          symbolName: L,
          x: h,
          y: c,
          width: b,
          height: f
        }), y && l(n, y)) : g && (r = a.match(x)[1], n = this.image(r), n.imgwidth = A(S[r] && S[r].width, y && y.width), n.imgheight = A(S[r] && S[r].height, y && y.height), z = function () {
          n.attr({width: n.width, height: n.height})
        }, ["width", "height"].forEach(function (a) {
          n[a + "Setter"] = function (a, h) {
            var c = {}, b = this["img" + h], f = "width" === h ? "translateX" : "translateY";
            this[h] = a;
            p(b) && (y && "within" === y.backgroundSize &&
            this.width && this.height && (b = Math.round(b * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(h, b), this.alignByTranslate || (c[f] = ((this[h] || 0) - b) / 2, this.attr(c)))
          }
        }), p(h) && n.attr({x: h, y: c}), n.isImg = !0, p(n.imgwidth) && p(n.imgheight) ? z() : (n.attr({
          width: 0,
          height: 0
        }), v("img", {
          onload: function () {
            var a = q[e.chartIndex];
            0 === this.width && (u(this, {position: "absolute", top: "-999em"}), m.body.appendChild(this));
            S[r] = {width: this.width, height: this.height};
            n.imgwidth =
                this.width;
            n.imgheight = this.height;
            n.element && z();
            this.parentNode && this.parentNode.removeChild(this);
            e.imgCount--;
            if (!e.imgCount && a && a.onload) a.onload()
          }, src: r
        }), this.imgCount++));
        return n
      },
      symbols: {
        circle: function (a, h, c, b) {
          return this.arc(a + c / 2, h + b / 2, c / 2, b / 2, {start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1})
        }, square: function (a, h, c, b) {
          return ["M", a, h, "L", a + c, h, a + c, h + b, a, h + b, "Z"]
        }, triangle: function (a, h, c, b) {
          return ["M", a + c / 2, h, "L", a + c, h + b, a, h + b, "Z"]
        }, "triangle-down": function (a, h, c, b) {
          return ["M", a, h, "L", a + c,
            h, a + c / 2, h + b, "Z"]
        }, diamond: function (a, h, c, b) {
          return ["M", a + c / 2, h, "L", a + c, h + b / 2, a + c / 2, h + b, a, h + b / 2, "Z"]
        }, arc: function (a, h, c, b, f) {
          var y = f.start, e = f.r || c, n = f.r || b || c, l = f.end - .001;
          c = f.innerR;
          b = A(f.open, .001 > Math.abs(f.end - f.start - 2 * Math.PI));
          var x = Math.cos(y), g = Math.sin(y), L = Math.cos(l), l = Math.sin(l),
              y = .001 > f.end - y - Math.PI ? 0 : 1;
          f = ["M", a + e * x, h + n * g, "A", e, n, 0, y, A(f.clockwise, 1), a + e * L, h + n * l];
          p(c) && f.push(b ? "M" : "L", a + c * L, h + c * l, "A", c, c, 0, y, 0, a + c * x, h + c * g);
          f.push(b ? "" : "Z");
          return f
        }, callout: function (a, h, c, b, f) {
          var y =
              Math.min(f && f.r || 0, c, b), e = y + 6, n = f && f.anchorX;
          f = f && f.anchorY;
          var l;
          l = ["M", a + y, h, "L", a + c - y, h, "C", a + c, h, a + c, h, a + c, h + y, "L", a + c, h + b - y, "C", a + c, h + b, a + c, h + b, a + c - y, h + b, "L", a + y, h + b, "C", a, h + b, a, h + b, a, h + b - y, "L", a, h + y, "C", a, h, a, h, a + y, h];
          n && n > c ? f > h + e && f < h + b - e ? l.splice(13, 3, "L", a + c, f - 6, a + c + 6, f, a + c, f + 6, a + c, h + b - y) : l.splice(13, 3, "L", a + c, b / 2, n, f, a + c, b / 2, a + c, h + b - y) : n && 0 > n ? f > h + e && f < h + b - e ? l.splice(33, 3, "L", a, f + 6, a - 6, f, a, f - 6, a, h + y) : l.splice(33, 3, "L", a, b / 2, n, f, a, b / 2, a, h + y) : f && f > b && n > a + e && n < a + c - e ? l.splice(23, 3, "L", n + 6, h +
              b, n, h + b + 6, n - 6, h + b, a + y, h + b) : f && 0 > f && n > a + e && n < a + c - e && l.splice(3, 3, "L", n - 6, h, n, h - 6, n + 6, h, c - y, h);
          return l
        }
      },
      clipRect: function (h, c, b, f) {
        var y = a.uniqueKey() + "-", e = this.createElement("clipPath").attr({id: y}).add(this.defs);
        h = this.rect(h, c, b, f, 0).add(e);
        h.id = y;
        h.clipPath = e;
        h.count = 0;
        return h
      },
      text: function (a, h, c, b) {
        var f = {};
        if (b && (this.allowHTML || !this.forExport)) return this.html(a, h, c);
        f.x = Math.round(h || 0);
        c && (f.y = Math.round(c));
        p(a) && (f.text = a);
        a = this.createElement("text").attr(f);
        b || (a.xSetter = function (a,
                                    h, c) {
          var b = c.getElementsByTagName("tspan"), f, y = c.getAttribute(h), e;
          for (e = 0; e < b.length; e++) f = b[e], f.getAttribute(h) === y && f.setAttribute(h, a);
          c.setAttribute(h, a)
        });
        return a
      },
      fontMetrics: function (a, h) {
        a = !this.styledMode && /px/.test(a) || !P.getComputedStyle ? a || h && h.style && h.style.fontSize || this.style && this.style.fontSize : h && C.prototype.getStyle.call(h, "font-size");
        a = /px/.test(a) ? D(a) : 12;
        h = 24 > a ? a + 3 : Math.round(1.2 * a);
        return {h: h, b: Math.round(.8 * h), f: a}
      },
      rotCorr: function (a, h, c) {
        var b = a;
        h && c && (b = Math.max(b *
            Math.cos(h * g), 4));
        return {x: -a / 3 * Math.sin(h * g), y: b}
      },
      label: function (c, b, f, y, e, g, L, w, m) {
        var x = this, E = x.styledMode, r = x.g("button" !== m && "label"),
            z = r.text = x.text("", 0, 0, L).attr({zIndex: 1}), d, D, R = 0, A = 3, M = 0, B, S, G, k, J, P = {}, v, q,
            t = /^url\((.*?)\)$/.test(y), u = E || t, Q = function () {
              return E ? d.strokeWidth() % 2 / 2 : (v ? parseInt(v, 10) : 0) % 2 / 2
            }, U, T, O;
        m && r.addClass("highcharts-" + m);
        U = function () {
          var a = z.element.style, h = {};
          D = (void 0 === B || void 0 === S || J) && p(z.textStr) && z.getBBox();
          r.width = (B || D.width || 0) + 2 * A + M;
          r.height = (S || D.height ||
              0) + 2 * A;
          q = A + Math.min(x.fontMetrics(a && a.fontSize, z).b, D ? D.height : Infinity);
          u && (d || (r.box = d = x.symbols[y] || t ? x.symbol(y) : x.rect(), d.addClass(("button" === m ? "" : "highcharts-label-box") + (m ? " highcharts-" + m + "-box" : "")), d.add(r), a = Q(), h.x = a, h.y = (w ? -q : 0) + a), h.width = Math.round(r.width), h.height = Math.round(r.height), d.attr(l(h, P)), P = {})
        };
        T = function () {
          var a = M + A, h;
          h = w ? 0 : q;
          p(B) && D && ("center" === J || "right" === J) && (a += {center: .5, right: 1}[J] * (B - D.width));
          if (a !== z.x || h !== z.y) z.attr("x", a), z.hasBoxWidthChanged && (D = z.getBBox(!0),
              U()), void 0 !== h && z.attr("y", h);
          z.x = a;
          z.y = h
        };
        O = function (a, h) {
          d ? d.attr(a, h) : P[a] = h
        };
        r.onAdd = function () {
          z.add(r);
          r.attr({text: c || 0 === c ? c : "", x: b, y: f});
          d && p(e) && r.attr({anchorX: e, anchorY: g})
        };
        r.widthSetter = function (h) {
          B = a.isNumber(h) ? h : null
        };
        r.heightSetter = function (a) {
          S = a
        };
        r["text-alignSetter"] = function (a) {
          J = a
        };
        r.paddingSetter = function (a) {
          p(a) && a !== A && (A = r.padding = a, T())
        };
        r.paddingLeftSetter = function (a) {
          p(a) && a !== M && (M = a, T())
        };
        r.alignSetter = function (a) {
          a = {left: 0, center: .5, right: 1}[a];
          a !== R && (R = a, D && r.attr({x: G}))
        };
        r.textSetter = function (a) {
          void 0 !== a && z.attr({text: a});
          U();
          T()
        };
        r["stroke-widthSetter"] = function (a, h) {
          a && (u = !0);
          v = this["stroke-width"] = a;
          O(h, a)
        };
        E ? r.rSetter = function (a, h) {
          O(h, a)
        } : r.strokeSetter = r.fillSetter = r.rSetter = function (a, h) {
          "r" !== h && ("fill" === h && a && (u = !0), r[h] = a);
          O(h, a)
        };
        r.anchorXSetter = function (a, h) {
          e = r.anchorX = a;
          O(h, Math.round(a) - Q() - G)
        };
        r.anchorYSetter = function (a, h) {
          g = r.anchorY = a;
          O(h, a - k)
        };
        r.xSetter = function (a) {
          r.x = a;
          R && (a -= R * ((B || D.width) + 2 * A), r["forceAnimate:x"] = !0);
          G = Math.round(a);
          r.attr("translateX",
              G)
        };
        r.ySetter = function (a) {
          k = r.y = Math.round(a);
          r.attr("translateY", k)
        };
        var aa = r.css;
        L = {
          css: function (a) {
            if (a) {
              var h = {};
              a = n(a);
              r.textProps.forEach(function (c) {
                void 0 !== a[c] && (h[c] = a[c], delete a[c])
              });
              z.css(h);
              "width" in h && U();
              "fontSize" in h && (U(), T())
            }
            return aa.call(r, a)
          }, getBBox: function () {
            return {width: D.width + 2 * A, height: D.height + 2 * A, x: D.x - A, y: D.y - A}
          }, destroy: function () {
            h(r.element, "mouseenter");
            h(r.element, "mouseleave");
            z && (z = z.destroy());
            d && (d = d.destroy());
            C.prototype.destroy.call(r);
            r = x = U = T = O = null
          }
        };
        E || (L.shadow = function (a) {
          a && (U(), d && d.shadow(a));
          return r
        });
        return l(r, L)
      }
    });
    a.Renderer = I
  });
  K(F, "parts/Html.js", [F["parts/Globals.js"]], function (a) {
    var C = a.attr, I = a.createElement, H = a.css, k = a.defined, d = a.extend, q = a.isFirefox, t = a.isMS,
        u = a.isWebKit, v = a.pick, p = a.pInt, g = a.SVGElement, e = a.SVGRenderer, m = a.win;
    d(g.prototype, {
      htmlCss: function (a) {
        var b = "SPAN" === this.element.tagName && a && "width" in a, f = v(b && a.width, void 0), c;
        b && (delete a.width, this.textWidth = f, c = !0);
        a && "ellipsis" === a.textOverflow && (a.whiteSpace =
            "nowrap", a.overflow = "hidden");
        this.styles = d(this.styles, a);
        H(this.element, a);
        c && this.htmlUpdateTransform();
        return this
      }, htmlGetBBox: function () {
        var a = this.element;
        return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
      }, htmlUpdateTransform: function () {
        if (this.added) {
          var a = this.renderer, b = this.element, f = this.translateX || 0, c = this.translateY || 0, e = this.x || 0,
              g = this.y || 0, m = this.textAlign || "left", d = {left: 0, center: .5, right: 1}[m], B = this.styles,
              n = B && B.whiteSpace;
          H(b, {marginLeft: f, marginTop: c});
          !a.styledMode && this.shadows && this.shadows.forEach(function (a) {
            H(a, {marginLeft: f + 1, marginTop: c + 1})
          });
          this.inverted && [].forEach.call(b.childNodes, function (c) {
            a.invertChild(c, b)
          });
          if ("SPAN" === b.tagName) {
            var B = this.rotation, E = this.textWidth && p(this.textWidth),
                z = [B, m, b.innerHTML, this.textWidth, this.textAlign].join(), A;
            (A = E !== this.oldTextWidth) && !(A = E > this.oldTextWidth) && ((A = this.textPxLength) || (H(b, {
              width: "",
              whiteSpace: n || "nowrap"
            }), A = b.offsetWidth), A = A > E);
            A && (/[ \-]/.test(b.textContent || b.innerText) ||
                "ellipsis" === b.style.textOverflow) ? (H(b, {
              width: E + "px",
              display: "block",
              whiteSpace: n || "normal"
            }), this.oldTextWidth = E, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
            z !== this.cTT && (n = a.fontMetrics(b.style.fontSize, b).b, !k(B) || B === (this.oldRotation || 0) && m === this.oldAlign || this.setSpanRotation(B, d, n), this.getSpanCorrection(!k(B) && this.textPxLength || b.offsetWidth, n, d, B, m));
            H(b, {left: e + (this.xCorr || 0) + "px", top: g + (this.yCorr || 0) + "px"});
            this.cTT = z;
            this.oldRotation = B;
            this.oldAlign = m
          }
        } else this.alignOnAdd =
            !0
      }, setSpanRotation: function (a, b, f) {
        var c = {}, e = this.renderer.getTransformKey();
        c[e] = c.transform = "rotate(" + a + "deg)";
        c[e + (q ? "Origin" : "-origin")] = c.transformOrigin = 100 * b + "% " + f + "px";
        H(this.element, c)
      }, getSpanCorrection: function (a, b, f) {
        this.xCorr = -a * f;
        this.yCorr = -b
      }
    });
    d(e.prototype, {
      getTransformKey: function () {
        return t && !/Edge/.test(m.navigator.userAgent) ? "-ms-transform" : u ? "-webkit-transform" : q ? "MozTransform" : m.opera ? "-o-transform" : ""
      }, html: function (e, b, f) {
        var c = this.createElement("span"), l = c.element,
            r = c.renderer, m = r.isSVG, p = function (a, c) {
              ["opacity", "visibility"].forEach(function (b) {
                a[b + "Setter"] = function (f, e, h) {
                  var y = a.div ? a.div.style : c;
                  g.prototype[b + "Setter"].call(this, f, e, h);
                  y && (y[e] = f)
                }
              });
              a.addedSetters = !0
            }, B = a.charts[r.chartIndex], B = B && B.styledMode;
        c.textSetter = function (a) {
          a !== l.innerHTML && (delete this.bBox, delete this.oldTextWidth);
          this.textStr = a;
          l.innerHTML = v(a, "");
          c.doTransform = !0
        };
        m && p(c, c.element.style);
        c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function (a, b) {
          "align" === b && (b =
              "textAlign");
          c[b] = a;
          c.doTransform = !0
        };
        c.afterSetters = function () {
          this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
        };
        c.attr({text: e, x: Math.round(b), y: Math.round(f)}).css({position: "absolute"});
        B || c.css({fontFamily: this.style.fontFamily, fontSize: this.style.fontSize});
        l.style.whiteSpace = "nowrap";
        c.css = c.htmlCss;
        m && (c.add = function (a) {
          var b, f = r.box.parentNode, e = [];
          if (this.parentGroup = a) {
            if (b = a.div, !b) {
              for (; a;) e.push(a), a = a.parentGroup;
              e.reverse().forEach(function (a) {
                function h(h, c) {
                  a[c] =
                      h;
                  "translateX" === c ? y.left = h + "px" : y.top = h + "px";
                  a.doTransform = !0
                }

                var y, n = C(a.element, "class");
                n && (n = {className: n});
                b = a.div = a.div || I("div", n, {
                  position: "absolute",
                  left: (a.translateX || 0) + "px",
                  top: (a.translateY || 0) + "px",
                  display: a.display,
                  opacity: a.opacity,
                  pointerEvents: a.styles && a.styles.pointerEvents
                }, b || f);
                y = b.style;
                d(a, {
                  classSetter: function (a) {
                    return function (h) {
                      this.element.setAttribute("class", h);
                      a.className = h
                    }
                  }(b), on: function () {
                    e[0].div && c.on.apply({element: e[0].div}, arguments);
                    return a
                  }, translateXSetter: h,
                  translateYSetter: h
                });
                a.addedSetters || p(a)
              })
            }
          } else b = f;
          b.appendChild(l);
          c.added = !0;
          c.alignOnAdd && c.htmlUpdateTransform();
          return c
        });
        return c
      }
    })
  });
  K(F, "parts/Time.js", [F["parts/Globals.js"]], function (a) {
    var C = a.defined, I = a.extend, H = a.merge, k = a.pick, d = a.timeUnits, q = a.win;
    a.Time = function (a) {
      this.update(a, !1)
    };
    a.Time.prototype = {
      defaultOptions: {}, update: function (a) {
        var d = k(a && a.useUTC, !0), v = this;
        this.options = a = H(!0, this.options || {}, a);
        this.Date = a.Date || q.Date || Date;
        this.timezoneOffset = (this.useUTC = d) &&
            a.timezoneOffset;
        this.getTimezoneOffset = this.timezoneOffsetFunction();
        (this.variableTimezone = !(d && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, g) {
          var e = g.getTime(), m = e - v.getTimezoneOffset(g);
          g.setTime(m);
          a = g["getUTC" + a]();
          g.setTime(e);
          return a
        }, this.set = function (a, g, e) {
          var m;
          if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === g.getTimezoneOffset() % 60) g["set" + a](e); else m = v.getTimezoneOffset(g), m = g.getTime() - m, g.setTime(m), g["setUTC" + a](e), a = v.getTimezoneOffset(g),
              m = g.getTime() + a, g.setTime(m)
        }) : d ? (this.get = function (a, g) {
          return g["getUTC" + a]()
        }, this.set = function (a, g, e) {
          return g["setUTC" + a](e)
        }) : (this.get = function (a, g) {
          return g["get" + a]()
        }, this.set = function (a, g, e) {
          return g["set" + a](e)
        })
      }, makeTime: function (d, q, v, p, g, e) {
        var m, l, b;
        this.useUTC ? (m = this.Date.UTC.apply(0, arguments), l = this.getTimezoneOffset(m), m += l, b = this.getTimezoneOffset(m), l !== b ? m += b - l : l - 36E5 !== this.getTimezoneOffset(m - 36E5) || a.isSafari || (m -= 36E5)) : m = (new this.Date(d, q, k(v, 1), k(p, 0), k(g, 0), k(e, 0))).getTime();
        return m
      }, timezoneOffsetFunction: function () {
        var d = this, k = this.options, v = q.moment;
        if (!this.useUTC) return function (a) {
          return 6E4 * (new Date(a)).getTimezoneOffset()
        };
        if (k.timezone) {
          if (v) return function (a) {
            return 6E4 * -v.tz(a, k.timezone).utcOffset()
          };
          a.error(25)
        }
        return this.useUTC && k.getTimezoneOffset ? function (a) {
          return 6E4 * k.getTimezoneOffset(a)
        } : function () {
          return 6E4 * (d.timezoneOffset || 0)
        }
      }, dateFormat: function (d, k, v) {
        if (!a.defined(k) || isNaN(k)) return a.defaultOptions.lang.invalidDate || "";
        d = a.pick(d, "%Y-%m-%d %H:%M:%S");
        var p = this, g = new this.Date(k), e = this.get("Hours", g), m = this.get("Day", g), l = this.get("Date", g),
            b = this.get("Month", g), f = this.get("FullYear", g), c = a.defaultOptions.lang, w = c.weekdays,
            r = c.shortWeekdays, J = a.pad, g = a.extend({
              a: r ? r[m] : w[m].substr(0, 3),
              A: w[m],
              d: J(l),
              e: J(l, 2, " "),
              w: m,
              b: c.shortMonths[b],
              B: c.months[b],
              m: J(b + 1),
              o: b + 1,
              y: f.toString().substr(2, 2),
              Y: f,
              H: J(e),
              k: e,
              I: J(e % 12 || 12),
              l: e % 12 || 12,
              M: J(p.get("Minutes", g)),
              p: 12 > e ? "AM" : "PM",
              P: 12 > e ? "am" : "pm",
              S: J(g.getSeconds()),
              L: J(Math.floor(k % 1E3), 3)
            }, a.dateFormats);
        a.objectEach(g, function (a, c) {
          for (; -1 !== d.indexOf("%" + c);) d = d.replace("%" + c, "function" === typeof a ? a.call(p, k) : a)
        });
        return v ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
      }, resolveDTLFormat: function (d) {
        return a.isObject(d, !0) ? d : (d = a.splat(d), {main: d[0], from: d[1], to: d[2]})
      }, getTimeTicks: function (a, q, v, p) {
        var g = this, e = [], m, l = {}, b;
        m = new g.Date(q);
        var f = a.unitRange, c = a.count || 1, w;
        p = k(p, 1);
        if (C(q)) {
          g.set("Milliseconds", m, f >= d.second ? 0 : c * Math.floor(g.get("Milliseconds", m) / c));
          f >= d.second && g.set("Seconds", m, f >=
          d.minute ? 0 : c * Math.floor(g.get("Seconds", m) / c));
          f >= d.minute && g.set("Minutes", m, f >= d.hour ? 0 : c * Math.floor(g.get("Minutes", m) / c));
          f >= d.hour && g.set("Hours", m, f >= d.day ? 0 : c * Math.floor(g.get("Hours", m) / c));
          f >= d.day && g.set("Date", m, f >= d.month ? 1 : Math.max(1, c * Math.floor(g.get("Date", m) / c)));
          f >= d.month && (g.set("Month", m, f >= d.year ? 0 : c * Math.floor(g.get("Month", m) / c)), b = g.get("FullYear", m));
          f >= d.year && g.set("FullYear", m, b - b % c);
          f === d.week && (b = g.get("Day", m), g.set("Date", m, g.get("Date", m) - b + p + (b < p ? -7 : 0)));
          b = g.get("FullYear",
              m);
          p = g.get("Month", m);
          var r = g.get("Date", m), J = g.get("Hours", m);
          q = m.getTime();
          g.variableTimezone && (w = v - q > 4 * d.month || g.getTimezoneOffset(q) !== g.getTimezoneOffset(v));
          q = m.getTime();
          for (m = 1; q < v;) e.push(q), q = f === d.year ? g.makeTime(b + m * c, 0) : f === d.month ? g.makeTime(b, p + m * c) : !w || f !== d.day && f !== d.week ? w && f === d.hour && 1 < c ? g.makeTime(b, p, r, J + m * c) : q + f * c : g.makeTime(b, p, r + m * c * (f === d.day ? 1 : 7)), m++;
          e.push(q);
          f <= d.hour && 1E4 > e.length && e.forEach(function (a) {
            0 === a % 18E5 && "000000000" === g.dateFormat("%H%M%S%L", a) && (l[a] = "day")
          })
        }
        e.info =
            I(a, {higherRanks: l, totalRange: f * c});
        return e
      }
    }
  });
  K(F, "parts/Options.js", [F["parts/Globals.js"]], function (a) {
    var C = a.color, I = a.merge;
    a.defaultOptions = {
      colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
      symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
      lang: {
        loading: "Loading...",
        months: "January February March April May June July August September October November December".split(" "),
        shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        decimalPoint: ".",
        numericSymbols: "kMGTPE".split(""),
        resetZoom: "恢复缩放",
        resetZoomTitle: "恢复缩放为 1:1",
        thousandsSep: " "
      },
      global: {},
      time: a.Time.prototype.defaultOptions,
      chart: {
        styledMode: !1,
        borderRadius: 0,
        colorCount: 10,
        defaultSeriesType: "line",
        ignoreHiddenSeries: !0,
        spacing: [10, 10, 15, 10],
        resetZoomButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}},
        width: null,
        height: null,
        borderColor: "#335cad",
        backgroundColor: "#ffffff",
        plotBorderColor: "#cccccc"
      },
      title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
      subtitle: {text: "", align: "center", widthAdjust: -44},
      plotOptions: {},
      labels: {style: {position: "absolute", color: "#333333"}},
      legend: {
        enabled: !0,
        align: "center",
        alignColumns: !0,
        layout: "horizontal",
        labelFormatter: function () {
          return this.name
        },
        borderColor: "#999999",
        borderRadius: 0,
        navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
        itemStyle: {
          color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold",
          textOverflow: "ellipsis"
        },
        itemHoverStyle: {color: "#000000"},
        itemHiddenStyle: {color: "#cccccc"},
        shadow: !1,
        itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
        squareSymbol: !0,
        symbolPadding: 5,
        verticalAlign: "bottom",
        x: 0,
        y: 0,
        title: {style: {fontWeight: "bold"}}
      },
      loading: {
        labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
        style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
      },
      tooltip: {
        enabled: !0,
        animation: a.svg,
        borderRadius: 3,
        dateTimeLabelFormats: {
          millisecond: "%A, %b %e, %H:%M:%S.%L",
          second: "%A, %b %e, %H:%M:%S",
          minute: "%A, %b %e, %H:%M",
          hour: "%A, %b %e, %H:%M",
          day: "%A, %b %e, %Y",
          week: "Week from %A, %b %e, %Y",
          month: "%B %Y",
          year: "%Y"
        },
        footerFormat: "",
        padding: 8,
        snap: a.isTouchDevice ? 25 : 10,
        headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
        pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
        backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
        borderWidth: 1,
        shadow: !0,
        style: {color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap"}
      },
      credits: {
        enabled: !0,
        href: "#",
        position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
        style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
        text: ""
      }
    };
    a.setOptions = function (C) {
      a.defaultOptions = I(!0, a.defaultOptions, C);
      a.time.update(I(a.defaultOptions.global, a.defaultOptions.time), !1);
      return a.defaultOptions
    };
    a.getOptions = function () {
      return a.defaultOptions
    };
    a.defaultPlotOptions = a.defaultOptions.plotOptions;
    a.time = new a.Time(I(a.defaultOptions.global, a.defaultOptions.time));
    a.dateFormat = function (C, k, d) {
      return a.time.dateFormat(C, k, d)
    }
  });
  K(F, "parts/Tick.js", [F["parts/Globals.js"]], function (a) {
    var C = a.correctFloat, I = a.defined, H = a.destroyObjectProperties, k = a.fireEvent, d = a.isNumber, q = a.merge,
        t = a.pick, u = a.deg2rad;
    a.Tick = function (a, d, g, e, m) {
      this.axis = a;
      this.pos = d;
      this.type = g || "";
      this.isNewLabel = this.isNew = !0;
      this.parameters = m || {};
      this.tickmarkOffset = this.parameters.tickmarkOffset;
      this.options = this.parameters.options;
      g || e || this.addLabel()
    };
    a.Tick.prototype = {
      addLabel: function () {
        var d = this, p = d.axis, g = p.options, e = p.chart, m = p.categories, l = p.names, b = d.pos,
            f = t(d.options && d.options.labels, g.labels), c = p.tickPositions, w = b === c[0],
            r = b === c[c.length - 1], m = this.parameters.category || (m ? t(m[b], l[b], b) : b), k = d.label,
            c = c.info, G, B, n, E;
        p.isDatetimeAxis && c && (B = e.time.resolveDTLFormat(g.dateTimeLabelFormats[!g.grid && c.higherRanks[b] || c.unitName]), G = B.main);
        d.isFirst = w;
        d.isLast = r;
        d.formatCtx = {
          axis: p,
          chart: e,
          isFirst: w,
          isLast: r,
          dateTimeLabelFormat: G,
          tickPositionInfo: c,
          value: p.isLog ? C(p.lin2log(m)) : m,
          pos: b
        };
        g = p.labelFormatter.call(d.formatCtx, this.formatCtx);
        if (E = B && B.list) d.shortenLabel = function () {
          for (n = 0; n < E.length; n++) if (k.attr({text: p.labelFormatter.call(a.extend(d.formatCtx, {dateTimeLabelFormat: E[n]}))}), k.getBBox().width < p.getSlotWidth(d) - 2 * t(f.padding, 5)) return;
          k.attr({text: ""})
        };
        if (I(k)) k && k.textStr !== g && (!k.textWidth || f.style && f.style.width || k.styles.width || k.css({width: null}), k.attr({text: g}));
        else {
          if (d.label = k = I(g) && f.enabled ? e.renderer.text(g, 0, 0, f.useHTML).add(p.labelGroup) : null) e.styledMode || k.css(q(f.style)), k.textPxLength = k.getBBox().width;
          d.rotation = 0
        }
      }, getLabelSize: function () {
        return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
      }, handleOverflow: function (a) {
        var d = this.axis, g = d.options.labels, e = a.x, m = d.chart.chartWidth, l = d.chart.spacing,
            b = t(d.labelLeft, Math.min(d.pos, l[3])),
            l = t(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, m - l[1])), f = this.label, c = this.rotation,
            w = {left: 0, center: .5, right: 1}[d.labelAlign || f.attr("align")], r = f.getBBox().width,
            k = d.getSlotWidth(this), G = k, B = 1, n, E = {};
        if (c || "justify" !== t(g.overflow, "justify")) 0 > c && e - w * r < b ? n = Math.round(e / Math.cos(c * u) - b) : 0 < c && e + w * r > l && (n = Math.round((m - e) / Math.cos(c * u))); else if (m = e + (1 - w) * r, e - w * r < b ? G = a.x + G * (1 - w) - b : m > l && (G = l - a.x + G * w, B = -1), G = Math.min(k, G), G < k && "center" === d.labelAlign && (a.x += B * (k - G - w * (k - Math.min(r, G)))), r > G || d.autoRotation && (f.styles || {}).width) n = G;
        n && (this.shortenLabel ? this.shortenLabel() : (E.width =
            Math.floor(n), (g.style || {}).textOverflow || (E.textOverflow = "ellipsis"), f.css(E)))
      }, getPosition: function (d, p, g, e) {
        var m = this.axis, l = m.chart, b = e && l.oldChartHeight || l.chartHeight;
        d = {
          x: d ? a.correctFloat(m.translate(p + g, null, null, e) + m.transB) : m.left + m.offset + (m.opposite ? (e && l.oldChartWidth || l.chartWidth) - m.right - m.left : 0),
          y: d ? b - m.bottom + m.offset - (m.opposite ? m.height : 0) : a.correctFloat(b - m.translate(p + g, null, null, e) - m.transB)
        };
        k(this, "afterGetPosition", {pos: d});
        return d
      }, getLabelPosition: function (a, d, g, e,
                                     m, l, b, f) {
        var c = this.axis, w = c.transA, r = c.reversed, p = c.staggerLines, G = c.tickRotCorr || {x: 0, y: 0}, B = m.y,
            n = e || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ? .5 : 1), E = {};
        I(B) || (B = 0 === c.side ? g.rotation ? -8 : -g.getBBox().height : 2 === c.side ? G.y + 8 : Math.cos(g.rotation * u) * (G.y - g.getBBox(!1, 0).height / 2));
        a = a + m.x + n + G.x - (l && e ? l * w * (r ? -1 : 1) : 0);
        d = d + B - (l && !e ? l * w * (r ? 1 : -1) : 0);
        p && (g = b / (f || 1) % p, c.opposite && (g = p - g - 1), d += c.labelOffset / p * g);
        E.x = a;
        E.y = Math.round(d);
        k(this, "afterGetLabelPosition", {
          pos: E, tickmarkOffset: l,
          index: b
        });
        return E
      }, getMarkPath: function (a, d, g, e, m, l) {
        return l.crispLine(["M", a, d, "L", a + (m ? 0 : -g), d + (m ? g : 0)], e)
      }, renderGridLine: function (a, d, g) {
        var e = this.axis, m = e.options, l = this.gridLine, b = {}, f = this.pos, c = this.type,
            w = t(this.tickmarkOffset, e.tickmarkOffset), r = e.chart.renderer, p = c ? c + "Grid" : "grid",
            k = m[p + "LineWidth"], B = m[p + "LineColor"], m = m[p + "LineDashStyle"];
        l || (e.chart.styledMode || (b.stroke = B, b["stroke-width"] = k, m && (b.dashstyle = m)), c || (b.zIndex = 1), a && (d = 0), this.gridLine = l = r.path().attr(b).addClass("highcharts-" +
            (c ? c + "-" : "") + "grid-line").add(e.gridGroup));
        if (l && (g = e.getPlotLinePath(f + w, l.strokeWidth() * g, a, "pass"))) l[a || this.isNew ? "attr" : "animate"]({
          d: g,
          opacity: d
        })
      }, renderMark: function (a, d, g) {
        var e = this.axis, m = e.options, l = e.chart.renderer, b = this.type, f = b ? b + "Tick" : "tick",
            c = e.tickSize(f), w = this.mark, r = !w, p = a.x;
        a = a.y;
        var k = t(m[f + "Width"], !b && e.isXAxis ? 1 : 0), m = m[f + "Color"];
        c && (e.opposite && (c[0] = -c[0]), r && (this.mark = w = l.path().addClass("highcharts-" + (b ? b + "-" : "") + "tick").add(e.axisGroup), e.chart.styledMode || w.attr({
          stroke: m,
          "stroke-width": k
        })), w[r ? "attr" : "animate"]({d: this.getMarkPath(p, a, c[0], w.strokeWidth() * g, e.horiz, l), opacity: d}))
      }, renderLabel: function (a, p, g, e) {
        var m = this.axis, l = m.horiz, b = m.options, f = this.label, c = b.labels, w = c.step,
            m = t(this.tickmarkOffset, m.tickmarkOffset), r = !0, k = a.x;
        a = a.y;
        f && d(k) && (f.xy = a = this.getLabelPosition(k, a, f, l, c, m, e, w), this.isFirst && !this.isLast && !t(b.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(b.showLastLabel, 1) ? r = !1 : !l || c.step || c.rotation || p || 0 === g || this.handleOverflow(a), w && e % w &&
        (r = !1), r && d(a.y) ? (a.opacity = g, f[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0))
      }, render: function (d, p, g) {
        var e = this.axis, m = e.horiz, l = this.pos, b = t(this.tickmarkOffset, e.tickmarkOffset),
            l = this.getPosition(m, l, b, p), b = l.x, f = l.y,
            e = m && b === e.pos + e.len || !m && f === e.pos ? -1 : 1;
        g = t(g, 1);
        this.isActive = !0;
        this.renderGridLine(p, g, e);
        this.renderMark(l, g, e);
        this.renderLabel(l, p, g, d);
        this.isNew = !1;
        a.fireEvent(this, "afterRender")
      }, destroy: function () {
        H(this, this.axis)
      }
    }
  });
  K(F, "parts/Axis.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.animObject, H = a.arrayMax, k = a.arrayMin, d = a.color, q = a.correctFloat,
        t = a.defaultOptions, u = a.defined, v = a.deg2rad, p = a.destroyObjectProperties, g = a.extend,
        e = a.fireEvent, m = a.format, l = a.getMagnitude, b = a.isArray, f = a.isNumber, c = a.isString, w = a.merge,
        r = a.normalizeTickInterval, J = a.objectEach, G = a.pick, B = a.removeEvent, n = a.seriesTypes, E = a.splat,
        z = a.syncTimeout, A = a.Tick, D = function () {
          this.init.apply(this, arguments)
        };
    a.extend(D.prototype, {
      defaultOptions: {
        dateTimeLabelFormats: {
          millisecond: {
            main: "%H:%M:%S.%L",
            range: !1
          },
          second: {main: "%H:%M:%S", range: !1},
          minute: {main: "%H:%M", range: !1},
          hour: {main: "%H:%M", range: !1},
          day: {main: "%e. %b"},
          week: {main: "%e. %b"},
          month: {main: "%b '%y"},
          year: {main: "%Y"}
        },
        endOnTick: !1,
        labels: {enabled: !0, indentation: 10, x: 0, style: {color: "#666666", cursor: "default", fontSize: "11px"}},
        maxPadding: .01,
        minorTickLength: 2,
        minorTickPosition: "outside",
        minPadding: .01,
        showEmpty: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: "between",
        tickPosition: "outside",
        title: {
          align: "middle",
          style: {color: "#666666"}
        },
        type: "linear",
        minorGridLineColor: "#f2f2f2",
        minorGridLineWidth: 1,
        minorTickColor: "#999999",
        lineColor: "#ccd6eb",
        lineWidth: 1,
        gridLineColor: "#e6e6e6",
        tickColor: "#ccd6eb"
      },
      defaultYAxisOptions: {
        endOnTick: !0,
        maxPadding: .05,
        minPadding: .05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: {x: -8},
        startOnTick: !0,
        title: {rotation: 270, text: "Values"},
        stackLabels: {
          allowOverlap: !1, enabled: !1, formatter: function () {
            return a.numberFormat(this.total, -1)
          }, style: {
            color: "#000000", fontSize: "11px", fontWeight: "bold",
            textOutline: "1px contrast"
          }
        },
        gridLineWidth: 1,
        lineWidth: 0
      },
      defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
      defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
      defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}},
      defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}},
      init: function (a, c) {
        var h = c.isX, b = this;
        b.chart = a;
        b.horiz = a.inverted && !b.isZAxis ? !h : h;
        b.isXAxis = h;
        b.coll = b.coll || (h ? "xAxis" : "yAxis");
        e(this, "init", {userOptions: c});
        b.opposite = c.opposite;
        b.side = c.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
        b.setOptions(c);
        var f = this.options, y = f.type;
        b.labelFormatter = f.labels.formatter || b.defaultLabelFormatter;
        b.userOptions = c;
        b.minPixelPadding = 0;
        b.reversed = f.reversed;
        b.visible = !1 !== f.visible;
        b.zoomEnabled = !1 !== f.zoomEnabled;
        b.hasNames = "category" === y || !0 === f.categories;
        b.categories = f.categories || b.hasNames;
        b.names || (b.names = [], b.names.keys = {});
        b.plotLinesAndBandsGroups = {};
        b.isLog = "logarithmic" === y;
        b.isDatetimeAxis = "datetime" ===
            y;
        b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
        b.isLinked = u(f.linkedTo);
        b.ticks = {};
        b.labelEdge = [];
        b.minorTicks = {};
        b.plotLinesAndBands = [];
        b.alternateBands = {};
        b.len = 0;
        b.minRange = b.userMinRange = f.minRange || f.maxZoom;
        b.range = f.range;
        b.offset = f.offset || 0;
        b.stacks = {};
        b.oldStacks = {};
        b.stacksTouched = 0;
        b.max = null;
        b.min = null;
        b.crosshair = G(f.crosshair, E(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
        c = b.options.events;
        -1 === a.axes.indexOf(b) && (h ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
        b.series = b.series || [];
        a.inverted && !b.isZAxis && h && void 0 === b.reversed && (b.reversed = !0);
        J(c, function (a, h) {
          C(b, h, a)
        });
        b.lin2log = f.linearToLogConverter || b.lin2log;
        b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log);
        e(this, "afterInit")
      },
      setOptions: function (a) {
        this.options = w(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], w(t[this.coll], a));
        e(this, "afterSetOptions",
            {userOptions: a})
      },
      defaultLabelFormatter: function () {
        var h = this.axis, b = this.value, c = h.chart.time, f = h.categories, e = this.dateTimeLabelFormat, n = t.lang,
            l = n.numericSymbols, n = n.numericSymbolMagnitude || 1E3, g = l && l.length, d,
            r = h.options.labels.format, h = h.isLog ? Math.abs(b) : h.tickInterval;
        if (r) d = m(r, this, c); else if (f) d = b; else if (e) d = c.dateFormat(e, b); else if (g && 1E3 <= h) for (; g-- && void 0 === d;) c = Math.pow(n, g + 1), h >= c && 0 === 10 * b % c && null !== l[g] && 0 !== b && (d = a.numberFormat(b / c, -1) + l[g]);
        void 0 === d && (d = 1E4 <= Math.abs(b) ? a.numberFormat(b,
            -1) : a.numberFormat(b, -1, void 0, ""));
        return d
      },
      getSeriesExtremes: function () {
        var a = this, b = a.chart, c;
        e(this, "getSeriesExtremes", null, function () {
          a.hasVisibleSeries = !1;
          a.dataMin = a.dataMax = a.threshold = null;
          a.softThreshold = !a.isXAxis;
          a.buildStacks && a.buildStacks();
          a.series.forEach(function (h) {
            if (h.visible || !b.options.chart.ignoreHiddenSeries) {
              var e = h.options, y = e.threshold, n, l;
              a.hasVisibleSeries = !0;
              a.positiveValuesOnly && 0 >= y && (y = null);
              if (a.isXAxis) e = h.xData, e.length && (c = h.getXExtremes(e), n = c.min, l = c.max,
              f(n) || n instanceof Date || (e = e.filter(f), c = h.getXExtremes(e), n = c.min, l = c.max), e.length && (a.dataMin = Math.min(G(a.dataMin, n), n), a.dataMax = Math.max(G(a.dataMax, l), l))); else if (h.getExtremes(), l = h.dataMax, n = h.dataMin, u(n) && u(l) && (a.dataMin = Math.min(G(a.dataMin, n), n), a.dataMax = Math.max(G(a.dataMax, l), l)), u(y) && (a.threshold = y), !e.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
            }
          })
        });
        e(this, "afterGetSeriesExtremes")
      },
      translate: function (a, b, c, e, n, l) {
        var h = this.linkedParent || this, y = 1, g = 0, d = e ? h.oldTransA :
            h.transA;
        e = e ? h.oldMin : h.min;
        var r = h.minPixelPadding;
        n = (h.isOrdinal || h.isBroken || h.isLog && n) && h.lin2val;
        d || (d = h.transA);
        c && (y *= -1, g = h.len);
        h.reversed && (y *= -1, g -= y * (h.sector || h.len));
        b ? (a = (a * y + g - r) / d + e, n && (a = h.lin2val(a))) : (n && (a = h.val2lin(a)), a = f(e) ? y * (a - e) * d + g + y * r + (f(l) ? d * l : 0) : void 0);
        return a
      },
      toPixels: function (a, b) {
        return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
      },
      toValue: function (a, b) {
        return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
      },
      getPlotLinePath: function (a, b, c, n,
                                 l) {
        var h = this, y = h.chart, g = h.left, d = h.top, r, m, w, z, E = c && y.oldChartHeight || y.chartHeight,
            L = c && y.oldChartWidth || y.chartWidth, p, D = h.transB, A, B = function (a, h, b) {
              if ("pass" !== n && a < h || a > b) n ? a = Math.min(Math.max(h, a), b) : p = !0;
              return a
            };
        A = {value: a, lineWidth: b, old: c, force: n, translatedValue: l};
        e(this, "getPlotLinePath", A, function (e) {
          l = G(l, h.translate(a, null, null, c));
          l = Math.min(Math.max(-1E5, l), 1E5);
          r = w = Math.round(l + D);
          m = z = Math.round(E - l - D);
          f(l) ? h.horiz ? (m = d, z = E - h.bottom, r = w = B(r, g, g + h.width)) : (r = g, w = L - h.right, m = z =
              B(m, d, d + h.height)) : (p = !0, n = !1);
          e.path = p && !n ? null : y.renderer.crispLine(["M", r, m, "L", w, z], b || 1)
        });
        return A.path
      },
      getLinearTickPositions: function (a, b, c) {
        var h, f = q(Math.floor(b / a) * a);
        c = q(Math.ceil(c / a) * a);
        var e = [], y;
        q(f + a) === f && (y = 20);
        if (this.single) return [b];
        for (b = f; b <= c;) {
          e.push(b);
          b = q(b + a, y);
          if (b === h) break;
          h = b
        }
        return e
      },
      getMinorTickInterval: function () {
        var a = this.options;
        return !0 === a.minorTicks ? G(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
      },
      getMinorTickPositions: function () {
        var a =
                this, b = a.options, c = a.tickPositions, f = a.minorTickInterval, e = [], n = a.pointRangePadding || 0,
            l = a.min - n, n = a.max + n, g = n - l;
        if (g && g / f < a.len / 3) if (a.isLog) this.paddedTicks.forEach(function (h, b, c) {
          b && e.push.apply(e, a.getLogTickPositions(f, c[b - 1], c[b], !0))
        }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) e = e.concat(a.getTimeTicks(a.normalizeTimeTickInterval(f), l, n, b.startOfWeek)); else for (b = l + (c[0] - l) % f; b <= n && b !== e[0]; b += f) e.push(b);
        0 !== e.length && a.trimTicks(e);
        return e
      },
      adjustForMinRange: function () {
        var a =
            this.options, b = this.min, c = this.max, f, e, n, l, g, d, r, m;
        this.isXAxis && void 0 === this.minRange && !this.isLog && (u(a.min) || u(a.max) ? this.minRange = null : (this.series.forEach(function (a) {
          d = a.xData;
          for (l = r = a.xIncrement ? 1 : d.length - 1; 0 < l; l--) if (g = d[l] - d[l - 1], void 0 === n || g < n) n = g
        }), this.minRange = Math.min(5 * n, this.dataMax - this.dataMin)));
        c - b < this.minRange && (e = this.dataMax - this.dataMin >= this.minRange, m = this.minRange, f = (m - c + b) / 2, f = [b - f, G(a.min, b - f)], e && (f[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = H(f),
            c = [b + m, G(a.max, b + m)], e && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = k(c), c - b < m && (f[0] = c - m, f[1] = G(a.min, c - m), b = H(f)));
        this.min = b;
        this.max = c
      },
      getClosest: function () {
        var a;
        this.categories ? a = 1 : this.series.forEach(function (h) {
          var b = h.closestPointRange, c = h.visible || !h.chart.options.chart.ignoreHiddenSeries;
          !h.noSharedTooltip && u(b) && c && (a = u(a) ? Math.min(a, b) : b)
        });
        return a
      },
      nameToX: function (a) {
        var h = b(this.categories), c = h ? this.categories : this.names, f = a.options.x, e;
        a.series.requireSorting = !1;
        u(f) || (f = !1 === this.options.uniqueNames ? a.series.autoIncrement() : h ? c.indexOf(a.name) : G(c.keys[a.name], -1));
        -1 === f ? h || (e = c.length) : e = f;
        void 0 !== e && (this.names[e] = a.name, this.names.keys[a.name] = e);
        return e
      },
      updateNames: function () {
        var a = this, b = this.names;
        0 < b.length && (Object.keys(b.keys).forEach(function (a) {
          delete b.keys[a]
        }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (h) {
          h.xIncrement = null;
          if (!h.points || h.isDirtyData) a.max = Math.max(a.max, h.xData.length - 1), h.processData(),
              h.generatePoints();
          h.data.forEach(function (b, c) {
            var f;
            b && b.options && void 0 !== b.name && (f = a.nameToX(b), void 0 !== f && f !== b.x && (b.x = f, h.xData[c] = f))
          })
        }))
      },
      setAxisTranslation: function (a) {
        var h = this, b = h.max - h.min, f = h.axisPointRange || 0, l, g = 0, d = 0, r = h.linkedParent,
            m = !!h.categories, w = h.transA, z = h.isXAxis;
        if (z || m || f) l = h.getClosest(), r ? (g = r.minPointOffset, d = r.pointRangePadding) : h.series.forEach(function (a) {
          var b = m ? 1 : z ? G(a.options.pointRange, l, 0) : h.axisPointRange || 0, e = a.options.pointPlacement;
          f = Math.max(f, b);
          if (!h.single ||
              m) a = n.xrange && a instanceof n.xrange ? !z : z, g = Math.max(g, a && c(e) ? 0 : b / 2), d = Math.max(d, a && "on" === e ? 0 : b)
        }), r = h.ordinalSlope && l ? h.ordinalSlope / l : 1, h.minPointOffset = g *= r, h.pointRangePadding = d *= r, h.pointRange = Math.min(f, b), z && (h.closestPointRange = l);
        a && (h.oldTransA = w);
        h.translationSlope = h.transA = w = h.staticScale || h.len / (b + d || 1);
        h.transB = h.horiz ? h.left : h.bottom;
        h.minPixelPadding = w * g;
        e(this, "afterSetAxisTranslation")
      },
      minFromRange: function () {
        return this.max - this.range
      },
      setTickInterval: function (h) {
        var b = this,
            c = b.chart, n = b.options, g = b.isLog, d = b.isDatetimeAxis, m = b.isXAxis, w = b.isLinked,
            z = n.maxPadding, E = n.minPadding, p, D = n.tickInterval, A = n.tickPixelInterval, B = b.categories,
            k = f(b.threshold) ? b.threshold : null, J = b.softThreshold, v, t, C;
        d || B || w || this.getTickAmount();
        t = G(b.userMin, n.min);
        C = G(b.userMax, n.max);
        w ? (b.linkedParent = c[b.coll][n.linkedTo], p = b.linkedParent.getExtremes(), b.min = G(p.min, p.dataMin), b.max = G(p.max, p.dataMax), n.type !== b.linkedParent.options.type && a.error(11, 1, c)) : (!J && u(k) && (b.dataMin >= k ? (p = k, E = 0) :
            b.dataMax <= k && (v = k, z = 0)), b.min = G(t, p, b.dataMin), b.max = G(C, v, b.dataMax));
        g && (b.positiveValuesOnly && !h && 0 >= Math.min(b.min, G(b.dataMin, b.min)) && a.error(10, 1, c), b.min = q(b.log2lin(b.min), 15), b.max = q(b.log2lin(b.max), 15));
        b.range && u(b.max) && (b.userMin = b.min = t = Math.max(b.dataMin, b.minFromRange()), b.userMax = C = b.max, b.range = null);
        e(b, "foundExtremes");
        b.beforePadding && b.beforePadding();
        b.adjustForMinRange();
        !(B || b.axisPointRange || b.usePercentage || w) && u(b.min) && u(b.max) && (c = b.max - b.min) && (!u(t) && E && (b.min -=
            c * E), !u(C) && z && (b.max += c * z));
        f(n.softMin) && !f(b.userMin) && n.softMin < b.min && (b.min = t = n.softMin);
        f(n.softMax) && !f(b.userMax) && n.softMax > b.max && (b.max = C = n.softMax);
        f(n.floor) && (b.min = Math.min(Math.max(b.min, n.floor), Number.MAX_VALUE));
        f(n.ceiling) && (b.max = Math.max(Math.min(b.max, n.ceiling), G(b.userMax, -Number.MAX_VALUE)));
        J && u(b.dataMin) && (k = k || 0, !u(t) && b.min < k && b.dataMin >= k ? b.min = b.options.minRange ? Math.min(k, b.max - b.minRange) : k : !u(C) && b.max > k && b.dataMax <= k && (b.max = b.options.minRange ? Math.max(k, b.min +
            b.minRange) : k));
        b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : w && !D && A === b.linkedParent.options.tickPixelInterval ? D = b.linkedParent.tickInterval : G(D, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, B ? 1 : (b.max - b.min) * A / Math.max(b.len, A));
        m && !h && b.series.forEach(function (a) {
          a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
        });
        b.setAxisTranslation(!0);
        b.beforeSetTickPositions && b.beforeSetTickPositions();
        b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
        b.pointRange && !D && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
        h = G(n.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
        !D && b.tickInterval < h && (b.tickInterval = h);
        d || g || D || (b.tickInterval = r(b.tickInterval, null, l(b.tickInterval), G(n.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
        this.tickAmount || (b.tickInterval = b.unsquish());
        this.setTickPositions()
      },
      setTickPositions: function () {
        var b = this.options, c, f = b.tickPositions;
        c = this.getMinorTickInterval();
        var n = b.tickPositioner, l = b.startOnTick, g = b.endOnTick;
        this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
        this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
        this.single = this.min === this.max && u(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
        this.tickPositions = c = f && f.slice();
        !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], a.error(19,
            !1, this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, n && (n = n.apply(this, [this.min, this.max]))) && (this.tickPositions = c = n);
        this.paddedTicks =
            c.slice(0);
        this.trimTicks(c, l, g);
        this.isLinked || (this.single && 2 > c.length && !this.categories && (this.min -= .5, this.max += .5), f || n || this.adjustTickAmount());
        e(this, "afterSetTickPositions")
      },
      trimTicks: function (a, b, c) {
        var h = a[0], f = a[a.length - 1], n = this.minPointOffset || 0;
        e(this, "trimTicks");
        if (!this.isLinked) {
          if (b && -Infinity !== h) this.min = h; else for (; this.min - n > a[0];) a.shift();
          if (c) this.max = f; else for (; this.max + n < a[a.length - 1];) a.pop();
          0 === a.length && u(h) && !this.options.tickPositions && a.push((f + h) / 2)
        }
      },
      alignToOthers: function () {
        var a =
            {}, b, c = this.options;
        !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || this.chart[this.coll].forEach(function (h) {
          var c = h.options, c = [h.horiz ? c.left : c.top, c.width, c.height, c.pane].join();
          h.series.length && (a[c] ? b = !0 : a[c] = 1)
        });
        return b
      },
      getTickAmount: function () {
        var a = this.options, b = a.tickAmount, c = a.tickPixelInterval;
        !u(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
        !b && this.alignToOthers() && (b = Math.ceil(this.len /
            c) + 1);
        4 > b && (this.finalTickAmt = b, b = 5);
        this.tickAmount = b
      },
      adjustTickAmount: function () {
        var a = this.options, b = this.tickInterval, c = this.tickPositions, f = this.tickAmount, e = this.finalTickAmt,
            n = c && c.length, l = G(this.threshold, this.softThreshold ? 0 : null), g;
        if (this.hasData()) {
          if (n < f) {
            for (g = this.min; c.length < f;) c.length % 2 || g === l ? c.push(q(c[c.length - 1] + b)) : c.unshift(q(c[0] - b));
            this.transA *= (n - 1) / (f - 1);
            this.min = a.startOnTick ? c[0] : Math.min(this.min, c[0]);
            this.max = a.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length -
            1])
          } else n > f && (this.tickInterval *= 2, this.setTickPositions());
          if (u(e)) {
            for (b = a = c.length; b--;) (3 === e && 1 === b % 2 || 2 >= e && 0 < b && b < a - 1) && c.splice(b, 1);
            this.finalTickAmt = void 0
          }
        }
      },
      setScale: function () {
        var a = this.series.some(function (a) {
          return a.isDirtyData || a.isDirty || a.xAxis.isDirty
        }), b;
        this.oldMin = this.min;
        this.oldMax = this.max;
        this.oldAxisLength = this.len;
        this.setAxisSize();
        (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax ||
        this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
        e(this, "afterSetScale")
      },
      setExtremes: function (a, b, c, f, n) {
        var h = this, l = h.chart;
        c = G(c, !0);
        h.series.forEach(function (a) {
          delete a.kdTree
        });
        n = g(n, {min: a, max: b});
        e(h, "setExtremes", n, function () {
          h.userMin = a;
          h.userMax = b;
          h.eventArgs = n;
          c && l.redraw(f)
        })
      },
      zoom: function (a, b) {
        var h = this.dataMin, c = this.dataMax, f = this.options, n = Math.min(h, G(f.min, h)),
            l = Math.max(c, G(f.max, c));
        a = {newMin: a, newMax: b};
        e(this, "zoom", a, function (a) {
          var b = a.newMin, f = a.newMax;
          if (b !== this.min || f !== this.max) this.allowZoomOutside || (u(h) && (b < n && (b = n), b > l && (b = l)), u(c) && (f < n && (f = n), f > l && (f = l))), this.displayBtn = void 0 !== b || void 0 !== f, this.setExtremes(b, f, !1, void 0, {trigger: "zoom"});
          a.zoomed = !0
        });
        return a.zoomed
      },
      setAxisSize: function () {
        var b =
                this.chart, c = this.options, f = c.offsets || [0, 0, 0, 0], e = this.horiz,
            n = this.width = Math.round(a.relativeLength(G(c.width, b.plotWidth - f[3] + f[1]), b.plotWidth)),
            l = this.height = Math.round(a.relativeLength(G(c.height, b.plotHeight - f[0] + f[2]), b.plotHeight)),
            g = this.top = Math.round(a.relativeLength(G(c.top, b.plotTop + f[0]), b.plotHeight, b.plotTop)),
            c = this.left = Math.round(a.relativeLength(G(c.left, b.plotLeft + f[3]), b.plotWidth, b.plotLeft));
        this.bottom = b.chartHeight - l - g;
        this.right = b.chartWidth - n - c;
        this.len = Math.max(e ? n :
            l, 0);
        this.pos = e ? c : g
      },
      getExtremes: function () {
        var a = this.isLog;
        return {
          min: a ? q(this.lin2log(this.min)) : this.min,
          max: a ? q(this.lin2log(this.max)) : this.max,
          dataMin: this.dataMin,
          dataMax: this.dataMax,
          userMin: this.userMin,
          userMax: this.userMax
        }
      },
      getThreshold: function (a) {
        var b = this.isLog, h = b ? this.lin2log(this.min) : this.min, b = b ? this.lin2log(this.max) : this.max;
        null === a || -Infinity === a ? a = h : Infinity === a ? a = b : h > a ? a = h : b < a && (a = b);
        return this.translate(a, 0, 1, 0, 1)
      },
      autoLabelAlign: function (a) {
        var b = (G(a, 0) - 90 * this.side +
            720) % 360;
        a = {align: "center"};
        e(this, "autoLabelAlign", a, function (a) {
          15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left")
        });
        return a.align
      },
      tickSize: function (a) {
        var b = this.options, h = b[a + "Length"],
            c = G(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0), f;
        c && h && ("inside" === b[a + "Position"] && (h = -h), f = [h, c]);
        a = {tickSize: f};
        e(this, "afterTickSize", a);
        return a.tickSize
      },
      labelMetrics: function () {
        var a = this.tickPositions && this.tickPositions[0] || 0;
        return this.chart.renderer.fontMetrics(this.options.labels.style &&
            this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
      },
      unsquish: function () {
        var a = this.options.labels, b = this.horiz, c = this.tickInterval, f = c,
            e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), n, l = a.rotation,
            g = this.labelMetrics(), d, r = Number.MAX_VALUE, m, w = this.max - this.min, z = function (a) {
              var b = a / (e || 1), b = 1 < b ? Math.ceil(b) : 1;
              b * c > w && Infinity !== a && Infinity !== e && (b = Math.ceil(w / c));
              return q(b * c)
            };
        b ? (m = !a.staggerLines && !a.step && (u(l) ? [l] : e < G(a.autoRotationLimit, 80) && a.autoRotation)) && m.forEach(function (a) {
          var b;
          if (a === l || a && -90 <= a && 90 >= a) d = z(Math.abs(g.h / Math.sin(v * a))), b = d + Math.abs(a / 360), b < r && (r = b, n = a, f = d)
        }) : a.step || (f = z(g.h));
        this.autoRotation = m;
        this.labelRotation = G(n, l);
        return f
      },
      getSlotWidth: function (a) {
        var b = this.chart, c = this.horiz, h = this.options.labels,
            f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), e = b.margin[3];
        return a && a.slotWidth || c && 2 > (h.step || 0) && !h.rotation && (this.staggerLines || 1) * this.len / f || !c && (h.style && parseInt(h.style.width, 10) || e && e - b.spacing[3] || .33 * b.chartWidth)
      },
      renderUnsquish: function () {
        var a =
                this.chart, b = a.renderer, f = this.tickPositions, e = this.ticks, n = this.options.labels,
            l = n && n.style || {}, g = this.horiz, d = this.getSlotWidth(),
            r = Math.max(1, Math.round(d - 2 * (n.padding || 5))), m = {}, w = this.labelMetrics(),
            z = n.style && n.style.textOverflow, E, p, D = 0, A;
        c(n.rotation) || (m.rotation = n.rotation || 0);
        f.forEach(function (a) {
          (a = e[a]) && a.label && a.label.textPxLength > D && (D = a.label.textPxLength)
        });
        this.maxLabelLength = D;
        if (this.autoRotation) D > r && D > w.h ? m.rotation = this.labelRotation : this.labelRotation = 0; else if (d && (E = r,
                !z)) for (p = "clip", r = f.length; !g && r--;) if (A = f[r], A = e[A].label) A.styles && "ellipsis" === A.styles.textOverflow ? A.css({textOverflow: "clip"}) : A.textPxLength > d && A.css({width: d + "px"}), A.getBBox().height > this.len / f.length - (w.h - w.f) && (A.specificTextOverflow = "ellipsis");
        m.rotation && (E = D > .5 * a.chartHeight ? .33 * a.chartHeight : D, z || (p = "ellipsis"));
        if (this.labelAlign = n.align || this.autoLabelAlign(this.labelRotation)) m.align = this.labelAlign;
        f.forEach(function (a) {
          var b = (a = e[a]) && a.label, c = l.width, h = {};
          b && (b.attr(m), a.shortenLabel ?
              a.shortenLabel() : E && !c && "nowrap" !== l.whiteSpace && (E < b.textPxLength || "SPAN" === b.element.tagName) ? (h.width = E, z || (h.textOverflow = b.specificTextOverflow || p), b.css(h)) : b.styles && b.styles.width && !h.width && !c && b.css({width: null}), delete b.specificTextOverflow, a.rotation = m.rotation)
        }, this);
        this.tickRotCorr = b.rotCorr(w.b, this.labelRotation || 0, 0 !== this.side)
      },
      hasData: function () {
        return this.series.some(function (a) {
          return a.hasData()
        }) || this.options.showEmpty && u(this.min) && u(this.max)
      },
      addTitle: function (a) {
        var b =
                this.chart.renderer, c = this.horiz, h = this.opposite, f = this.options.title, e,
            n = this.chart.styledMode;
        this.axisTitle || ((e = f.textAlign) || (e = (c ? {
          low: "left",
          middle: "center",
          high: "right"
        } : {
          low: h ? "right" : "left",
          middle: "center",
          high: h ? "left" : "right"
        })[f.align]), this.axisTitle = b.text(f.text, 0, 0, f.useHTML).attr({
          zIndex: 7,
          rotation: f.rotation || 0,
          align: e
        }).addClass("highcharts-axis-title"), n || this.axisTitle.css(w(f.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
        n || f.style.width || this.isRadial ||
        this.axisTitle.css({width: this.len});
        this.axisTitle[a ? "show" : "hide"](!0)
      },
      generateTick: function (a) {
        var b = this.ticks;
        b[a] ? b[a].addLabel() : b[a] = new A(this, a)
      },
      getOffset: function () {
        var a = this, b = a.chart, c = b.renderer, f = a.options, n = a.tickPositions, l = a.ticks, g = a.horiz,
            d = a.side, r = b.inverted && !a.isZAxis ? [1, 0, 3, 2][d] : d, m, w, z = 0, E, p = 0, D = f.title,
            A = f.labels, k = 0, B = b.axisOffset, b = b.clipOffset, q = [-1, 1, 1, -1][d], v = f.className,
            t = a.axisParent;
        m = a.hasData();
        a.showAxis = w = m || G(f.showEmpty, !0);
        a.staggerLines = a.horiz && A.staggerLines;
        a.axisGroup || (a.gridGroup = c.g("grid").attr({zIndex: f.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (v || "")).add(t), a.axisGroup = c.g("axis").attr({zIndex: f.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (v || "")).add(t), a.labelGroup = c.g("axis-labels").attr({zIndex: A.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (v || "")).add(t));
        m || a.isLinked ? (n.forEach(function (b, c) {
          a.generateTick(b, c)
        }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === d || 2 ===
            d || {
              1: "left",
              3: "right"
            }[d] === a.labelAlign, G(A.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && n.forEach(function (a) {
          k = Math.max(l[a].getLabelSize(), k)
        }), a.staggerLines && (k *= a.staggerLines), a.labelOffset = k * (a.opposite ? -1 : 1)) : J(l, function (a, b) {
          a.destroy();
          delete l[b]
        });
        D && D.text && !1 !== D.enabled && (a.addTitle(w), w && !1 !== D.reserveSpace && (a.titleOffset = z = a.axisTitle.getBBox()[g ? "height" : "width"], E = D.offset, p = u(E) ? 0 : G(D.margin, g ? 5 : 10)));
        a.renderLine();
        a.offset = q * G(f.offset, B[d] ? B[d] +
            (f.margin || 0) : 0);
        a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
        c = 0 === d ? -a.labelMetrics().h : 2 === d ? a.tickRotCorr.y : 0;
        p = Math.abs(k) + p;
        k && (p = p - c + q * (g ? G(A.y, a.tickRotCorr.y + 8 * q) : A.x));
        a.axisTitleMargin = G(E, p);
        a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(l, n));
        g = this.tickSize("tick");
        B[d] = Math.max(B[d], a.axisTitleMargin + z + q * a.offset, p, n && n.length && g ? g[0] + q * a.offset : 0);
        f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
        b[r] = Math.max(b[r], f);
        e(this, "afterGetOffset")
      },
      getLinePath: function (a) {
        var b =
                this.chart, c = this.opposite, h = this.offset, f = this.horiz, e = this.left + (c ? this.width : 0) + h,
            h = b.chartHeight - this.bottom - (c ? this.height : 0) + h;
        c && (a *= -1);
        return b.renderer.crispLine(["M", f ? this.left : e, f ? h : this.top, "L", f ? b.chartWidth - this.right : e, f ? h : b.chartHeight - this.bottom], a)
      },
      renderLine: function () {
        this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
          stroke: this.options.lineColor, "stroke-width": this.options.lineWidth,
          zIndex: 7
        }))
      },
      getTitlePosition: function () {
        var a = this.horiz, b = this.left, c = this.top, f = this.len, n = this.options.title, l = a ? b : c,
            g = this.opposite, d = this.offset, r = n.x || 0, m = n.y || 0, w = this.axisTitle,
            z = this.chart.renderer.fontMetrics(n.style && n.style.fontSize, w),
            w = Math.max(w.getBBox(null, 0).height - z.h - 1, 0),
            f = {low: l + (a ? 0 : f), middle: l + f / 2, high: l + (a ? f : 0)}[n.align],
            b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + [-w, w, z.f, -w][this.side],
            a = {x: a ? f + r : b + (g ? this.width : 0) + d + r, y: a ? b + m - (g ? this.height : 0) + d : f + m};
        e(this, "afterGetTitlePosition", {titlePosition: a});
        return a
      },
      renderMinorTick: function (a) {
        var b = this.chart.hasRendered && f(this.oldMin), c = this.minorTicks;
        c[a] || (c[a] = new A(this, a, "minor"));
        b && c[a].isNew && c[a].render(null, !0);
        c[a].render(null, !1, 1)
      },
      renderTick: function (a, b) {
        var c = this.isLinked, h = this.ticks, e = this.chart.hasRendered && f(this.oldMin);
        if (!c || a >= this.min && a <= this.max) h[a] || (h[a] = new A(this, a)), e && h[a].isNew && h[a].render(b, !0, -1), h[a].render(b)
      },
      render: function () {
        var b = this, c = b.chart, n = b.options,
            l = b.isLog, g = b.isLinked, d = b.tickPositions, r = b.axisTitle, m = b.ticks, w = b.minorTicks,
            E = b.alternateBands, p = n.stackLabels, D = n.alternateGridColor, k = b.tickmarkOffset, B = b.axisLine,
            G = b.showAxis, q = I(c.renderer.globalAnimation), v, t;
        b.labelEdge.length = 0;
        b.overlap = !1;
        [m, w, E].forEach(function (a) {
          J(a, function (a) {
            a.isActive = !1
          })
        });
        if (b.hasData() || g) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (a) {
          b.renderMinorTick(a)
        }), d.length && (d.forEach(function (a, c) {
          b.renderTick(a, c)
        }), k && (0 ===
            b.min || b.single) && (m[-1] || (m[-1] = new A(b, -1, null, !0)), m[-1].render(-1))), D && d.forEach(function (h, f) {
          t = void 0 !== d[f + 1] ? d[f + 1] + k : b.max - k;
          0 === f % 2 && h < b.max && t <= b.max + (c.polar ? -k : k) && (E[h] || (E[h] = new a.PlotLineOrBand(b)), v = h + k, E[h].options = {
            from: l ? b.lin2log(v) : v,
            to: l ? b.lin2log(t) : t,
            color: D
          }, E[h].render(), E[h].isActive = !0)
        }), b._addedPlotLB || ((n.plotLines || []).concat(n.plotBands || []).forEach(function (a) {
          b.addPlotBandOrLine(a)
        }), b._addedPlotLB = !0);
        [m, w, E].forEach(function (a) {
          var b, h = [], f = q.duration;
          J(a, function (a,
                         b) {
            a.isActive || (a.render(b, !1, 0), a.isActive = !1, h.push(b))
          });
          z(function () {
            for (b = h.length; b--;) a[h[b]] && !a[h[b]].isActive && (a[h[b]].destroy(), delete a[h[b]])
          }, a !== E && c.hasRendered && f ? f : 0)
        });
        B && (B[B.isPlaced ? "animate" : "attr"]({d: this.getLinePath(B.strokeWidth())}), B.isPlaced = !0, B[G ? "show" : "hide"](!0));
        r && G && (n = b.getTitlePosition(), f(n.y) ? (r[r.isNew ? "attr" : "animate"](n), r.isNew = !1) : (r.attr("y", -9999), r.isNew = !0));
        p && p.enabled && b.renderStackTotals();
        b.isDirty = !1;
        e(this, "afterRender")
      },
      redraw: function () {
        this.visible &&
        (this.render(), this.plotLinesAndBands.forEach(function (a) {
          a.render()
        }));
        this.series.forEach(function (a) {
          a.isDirty = !0
        })
      },
      keepProps: "extKey hcEvents names series userMax userMin".split(" "),
      destroy: function (a) {
        var b = this, c = b.stacks, f = b.plotLinesAndBands, h;
        e(this, "destroy", {keepEvents: a});
        a || B(b);
        J(c, function (a, b) {
          p(a);
          c[b] = null
        });
        [b.ticks, b.minorTicks, b.alternateBands].forEach(function (a) {
          p(a)
        });
        if (f) for (a = f.length; a--;) f[a].destroy();
        "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
          b[a] &&
          (b[a] = b[a].destroy())
        });
        for (h in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[h] = b.plotLinesAndBandsGroups[h].destroy();
        J(b, function (a, c) {
          -1 === b.keepProps.indexOf(c) && delete b[c]
        })
      },
      drawCrosshair: function (a, b) {
        var c, f = this.crosshair, h = G(f.snap, !0), n, l = this.cross;
        e(this, "drawCrosshair", {e: a, point: b});
        a || (a = this.cross && this.cross.e);
        if (this.crosshair && !1 !== (u(b) || !h)) {
          h ? u(b) && (n = G(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : n = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
          u(n) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : G(b.stackY, b.y)), null, null, null, n) || null);
          if (!u(c)) {
            this.hideCrosshair();
            return
          }
          h = this.categories && !this.isRadial;
          l || (this.cross = l = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h ? "category " : "thin ") + f.className).attr({zIndex: G(f.zIndex, 2)}).add(), this.chart.styledMode || (l.attr({
            stroke: f.color || (h ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
            "stroke-width": G(f.width, 1)
          }).css({"pointer-events": "none"}), f.dashStyle &&
          l.attr({dashstyle: f.dashStyle})));
          l.show().attr({d: c});
          h && !f.width && l.attr({"stroke-width": this.transA});
          this.cross.e = a
        } else this.hideCrosshair();
        e(this, "afterDrawCrosshair", {e: a, point: b})
      },
      hideCrosshair: function () {
        this.cross && this.cross.hide();
        e(this, "afterHideCrosshair")
      }
    });
    return a.Axis = D
  });
  K(F, "parts/DateTimeAxis.js", [F["parts/Globals.js"]], function (a) {
    var C = a.Axis, I = a.getMagnitude, H = a.normalizeTickInterval, k = a.timeUnits;
    C.prototype.getTimeTicks = function () {
      return this.chart.time.getTimeTicks.apply(this.chart.time,
          arguments)
    };
    C.prototype.normalizeTimeTickInterval = function (a, q) {
      var d = q || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
      q = d[d.length - 1];
      var u = k[q[0]], v = q[1], p;
      for (p = 0; p < d.length && !(q = d[p], u = k[q[0]], v = q[1], d[p + 1] && a <= (u * v[v.length - 1] + k[d[p + 1][0]]) / 2); p++) ;
      u === k.year && a < 5 * u && (v = [1, 2, 5]);
      a = H(a / u, v, "year" === q[0] ? Math.max(I(a / u), 1) : 1);
      return {
        unitRange: u,
        count: a, unitName: q[0]
      }
    }
  });
  K(F, "parts/LogarithmicAxis.js", [F["parts/Globals.js"]], function (a) {
    var C = a.Axis, I = a.getMagnitude, H = a.normalizeTickInterval, k = a.pick;
    C.prototype.getLogTickPositions = function (a, q, t, u) {
      var d = this.options, p = this.len, g = [];
      u || (this._minorAutoInterval = null);
      if (.5 <= a) a = Math.round(a), g = this.getLinearTickPositions(a, q, t); else if (.08 <= a) for (var p = Math.floor(q), e, m, l, b, f, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < t + 1 && !f; p++) for (m = d.length, e = 0; e < m && !f; e++) l = this.log2lin(this.lin2log(p) *
          d[e]), l > q && (!u || b <= t) && void 0 !== b && g.push(b), b > t && (f = !0), b = l; else q = this.lin2log(q), t = this.lin2log(t), a = u ? this.getMinorTickInterval() : d.tickInterval, a = k("auto" === a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (u ? 5 : 1) * (t - q) / ((u ? p / this.tickPositions.length : p) || 1)), a = H(a, null, I(a)), g = this.getLinearTickPositions(a, q, t).map(this.log2lin), u || (this._minorAutoInterval = a / 5);
      u || (this.tickInterval = a);
      return g
    };
    C.prototype.log2lin = function (a) {
      return Math.log(a) / Math.LN10
    };
    C.prototype.lin2log = function (a) {
      return Math.pow(10,
          a)
    }
  });
  K(F, "parts/PlotLineOrBand.js", [F["parts/Globals.js"], F["parts/Axis.js"]], function (a, C) {
    var I = a.arrayMax, H = a.arrayMin, k = a.defined, d = a.destroyObjectProperties, q = a.erase, t = a.merge,
        u = a.pick;
    a.PlotLineOrBand = function (a, d) {
      this.axis = a;
      d && (this.options = d, this.id = d.id)
    };
    a.PlotLineOrBand.prototype = {
      render: function () {
        a.fireEvent(this, "render");
        var d = this, p = d.axis, g = p.horiz, e = d.options, m = e.label, l = d.label, b = e.to, f = e.from,
            c = e.value, w = k(f) && k(b), r = k(c), q = d.svgElem, G = !q, B = [], n = e.color, E = u(e.zIndex, 0),
            z = e.events,
            B = {"class": "highcharts-plot-" + (w ? "band " : "line ") + (e.className || "")}, A = {},
            D = p.chart.renderer, h = w ? "bands" : "lines";
        p.isLog && (f = p.log2lin(f), b = p.log2lin(b), c = p.log2lin(c));
        p.chart.styledMode || (r ? (B.stroke = n, B["stroke-width"] = e.width, e.dashStyle && (B.dashstyle = e.dashStyle)) : w && (n && (B.fill = n), e.borderWidth && (B.stroke = e.borderColor, B["stroke-width"] = e.borderWidth)));
        A.zIndex = E;
        h += "-" + E;
        (n = p.plotLinesAndBandsGroups[h]) || (p.plotLinesAndBandsGroups[h] = n = D.g("plot-" + h).attr(A).add());
        G && (d.svgElem = q = D.path().attr(B).add(n));
        if (r) B = p.getPlotLinePath(c, q.strokeWidth()); else if (w) B = p.getPlotBandPath(f, b, e); else return;
        (G || !q.d) && B && B.length ? (q.attr({d: B}), z && a.objectEach(z, function (a, b) {
          q.on(b, function (a) {
            z[b].apply(d, [a])
          })
        })) : q && (B ? (q.show(!0), q.animate({d: B})) : q.d && (q.hide(), l && (d.label = l = l.destroy())));
        m && k(m.text) && B && B.length && 0 < p.width && 0 < p.height && !B.isFlat ? (m = t({
          align: g && w && "center",
          x: g ? !w && 4 : 10,
          verticalAlign: !g && w && "middle",
          y: g ? w ? 16 : 10 : w ? 6 : -4,
          rotation: g && !w && 90
        }, m), this.renderLabel(m, B, w, E)) : l && l.hide();
        return d
      },
      renderLabel: function (a, d, g, e) {
        var m = this.label, l = this.axis.chart.renderer;
        m || (m = {
          align: a.textAlign || a.align,
          rotation: a.rotation,
          "class": "highcharts-plot-" + (g ? "band" : "line") + "-label " + (a.className || "")
        }, m.zIndex = e, this.label = m = l.text(a.text, 0, 0, a.useHTML).attr(m).add(), this.axis.chart.styledMode || m.css(a.style));
        e = d.xBounds || [d[1], d[4], g ? d[6] : d[1]];
        d = d.yBounds || [d[2], d[5], g ? d[7] : d[2]];
        g = H(e);
        l = H(d);
        m.align(a, !1, {x: g, y: l, width: I(e) - g, height: I(d) - l});
        m.show(!0)
      }, destroy: function () {
        q(this.axis.plotLinesAndBands,
            this);
        delete this.axis;
        d(this)
      }
    };
    a.extend(C.prototype, {
      getPlotBandPath: function (a, d) {
        var g = this.getPlotLinePath(d, null, null, !0), e = this.getPlotLinePath(a, null, null, !0), m = [],
            l = this.horiz, b = 1, f;
        a = a < this.min && d < this.min || a > this.max && d > this.max;
        if (e && g) for (a && (f = e.toString() === g.toString(), b = 0), a = 0; a < e.length; a += 6) l && g[a + 1] === e[a + 1] ? (g[a + 1] += b, g[a + 4] += b) : l || g[a + 2] !== e[a + 2] || (g[a + 2] += b, g[a + 5] += b), m.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], g[a + 4], g[a + 5], g[a + 1], g[a + 2], "z"), m.isFlat = f;
        return m
      }, addPlotBand: function (a) {
        return this.addPlotBandOrLine(a,
            "plotBands")
      }, addPlotLine: function (a) {
        return this.addPlotBandOrLine(a, "plotLines")
      }, addPlotBandOrLine: function (d, p) {
        var g = (new a.PlotLineOrBand(this, d)).render(), e = this.userOptions;
        g && (p && (e[p] = e[p] || [], e[p].push(d)), this.plotLinesAndBands.push(g));
        return g
      }, removePlotBandOrLine: function (a) {
        for (var d = this.plotLinesAndBands, g = this.options, e = this.userOptions, m = d.length; m--;) d[m].id === a && d[m].destroy();
        [g.plotLines || [], e.plotLines || [], g.plotBands || [], e.plotBands || []].forEach(function (e) {
          for (m = e.length; m--;) e[m].id ===
          a && q(e, e[m])
        })
      }, removePlotBand: function (a) {
        this.removePlotBandOrLine(a)
      }, removePlotLine: function (a) {
        this.removePlotBandOrLine(a)
      }
    })
  });
  K(F, "parts/Tooltip.js", [F["parts/Globals.js"]], function (a) {
    var C = a.doc, I = a.extend, H = a.format, k = a.isNumber, d = a.merge, q = a.pick, t = a.splat, u = a.syncTimeout,
        v = a.timeUnits;
    a.Tooltip = function () {
      this.init.apply(this, arguments)
    };
    a.Tooltip.prototype = {
      init: function (a, d) {
        this.chart = a;
        this.options = d;
        this.crosshairs = [];
        this.now = {x: 0, y: 0};
        this.isHidden = !0;
        this.split = d.split && !a.inverted;
        this.shared = d.shared || this.split;
        this.outside = d.outside && !this.split
      }, cleanSplit: function (a) {
        this.chart.series.forEach(function (d) {
          var e = d && d.tt;
          e && (!e.isActive || a ? d.tt = e.destroy() : e.isActive = !1)
        })
      }, applyFilter: function () {
        var a = this.chart;
        a.renderer.definition({
          tagName: "filter",
          id: "drop-shadow-" + a.index,
          opacity: .5,
          children: [{tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1}, {
            tagName: "feOffset",
            dx: 1,
            dy: 1
          }, {tagName: "feComponentTransfer", children: [{tagName: "feFuncA", type: "linear", slope: .3}]},
            {tagName: "feMerge", children: [{tagName: "feMergeNode"}, {tagName: "feMergeNode", "in": "SourceGraphic"}]}]
        });
        a.renderer.definition({
          tagName: "style",
          textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
        })
      }, getLabel: function () {
        var d = this, g = this.chart.renderer, e = this.chart.styledMode, m = this.options, l, b;
        this.label || (this.outside && (this.container = l = a.doc.createElement("div"), l.className = "highcharts-tooltip-container", a.css(l, {
          position: "absolute", top: "1px", pointerEvents: m.style &&
          m.style.pointerEvents
        }), a.doc.body.appendChild(l), this.renderer = g = new a.Renderer(l, 0, 0)), this.split ? this.label = g.g("tooltip") : (this.label = g.label("", 0, 0, m.shape || "callout", null, null, m.useHTML, null, "tooltip").attr({
          padding: m.padding,
          r: m.borderRadius
        }), e || this.label.attr({
          fill: m.backgroundColor,
          "stroke-width": m.borderWidth
        }).css(m.style).shadow(m.shadow)), e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (b = {
          x: this.label.xSetter,
          y: this.label.ySetter
        },
            this.label.xSetter = function (a, c) {
              b[c].call(this.label, d.distance);
              l.style.left = a + "px"
            }, this.label.ySetter = function (a, c) {
          b[c].call(this.label, d.distance);
          l.style.top = a + "px"
        }), this.label.attr({zIndex: 8}).add());
        return this.label
      }, update: function (a) {
        this.destroy();
        d(!0, this.chart.options.tooltip.userOptions, a);
        this.init(this.chart, d(!0, this.options, a))
      }, destroy: function () {
        this.label && (this.label = this.label.destroy());
        this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
        this.renderer &&
        (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
        a.clearTimeout(this.hideTimer);
        a.clearTimeout(this.tooltipTimeout)
      }, move: function (d, g, e, m) {
        var l = this, b = l.now,
            f = !1 !== l.options.animation && !l.isHidden && (1 < Math.abs(d - b.x) || 1 < Math.abs(g - b.y)),
            c = l.followPointer || 1 < l.len;
        I(b, {
          x: f ? (2 * b.x + d) / 3 : d,
          y: f ? (b.y + g) / 2 : g,
          anchorX: c ? void 0 : f ? (2 * b.anchorX + e) / 3 : e,
          anchorY: c ? void 0 : f ? (b.anchorY + m) / 2 : m
        });
        l.getLabel().attr(b);
        f && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
          l &&
          l.move(d, g, e, m)
        }, 32))
      }, hide: function (d) {
        var g = this;
        a.clearTimeout(this.hideTimer);
        d = q(d, this.options.hideDelay, 500);
        this.isHidden || (this.hideTimer = u(function () {
          g.getLabel()[d ? "fadeOut" : "hide"]();
          g.isHidden = !0
        }, d))
      }, getAnchor: function (a, d) {
        var e = this.chart, g = e.pointer, l = e.inverted, b = e.plotTop, f = e.plotLeft, c = 0, w = 0, r, k;
        a = t(a);
        this.followPointer && d ? (void 0 === d.chartX && (d = g.normalize(d)), a = [d.chartX - e.plotLeft, d.chartY - b]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function (a) {
          r = a.series.yAxis;
          k = a.series.xAxis;
          c += a.plotX + (!l && k ? k.left - f : 0);
          w += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!l && r ? r.top - b : 0)
        }), c /= a.length, w /= a.length, a = [l ? e.plotWidth - w : c, this.shared && !l && 1 < a.length && d ? d.chartY - b : l ? e.plotHeight - c : w]);
        return a.map(Math.round)
      }, getPosition: function (a, d, e) {
        var g = this.chart, l = this.distance, b = {}, f = g.inverted && e.h || 0, c, w = this.outside,
            r = w ? C.documentElement.clientWidth - 2 * l : g.chartWidth,
            k = w ? Math.max(C.body.scrollHeight, C.documentElement.scrollHeight, C.body.offsetHeight, C.documentElement.offsetHeight,
                C.documentElement.clientHeight) : g.chartHeight, p = g.pointer.chartPosition,
            B = ["y", k, d, (w ? p.top - l : 0) + e.plotY + g.plotTop, w ? 0 : g.plotTop, w ? k : g.plotTop + g.plotHeight],
            n = ["x", r, a, (w ? p.left - l : 0) + e.plotX + g.plotLeft, w ? 0 : g.plotLeft, w ? r : g.plotLeft + g.plotWidth],
            E = !this.followPointer && q(e.ttBelow, !g.inverted === !!e.negative), z = function (a, c, h, e, n, d) {
              var g = h < e - l, r = e + l + h < c, m = e - l - h;
              e += l;
              if (E && r) b[a] = e; else if (!E && g) b[a] = m; else if (g) b[a] = Math.min(d - h, 0 > m - f ? m : m - f); else if (r) b[a] = Math.max(n, e + f + h > c ? e : e + f); else return !1
            }, A =
                function (a, c, f, h) {
                  var e;
                  h < l || h > c - l ? e = !1 : b[a] = h < f / 2 ? 1 : h > c - f / 2 ? c - f - 2 : h - f / 2;
                  return e
                }, D = function (a) {
              var b = B;
              B = n;
              n = b;
              c = a
            }, h = function () {
              !1 !== z.apply(0, B) ? !1 !== A.apply(0, n) || c || (D(!0), h()) : c ? b.x = b.y = 0 : (D(!0), h())
            };
        (g.inverted || 1 < this.len) && D();
        h();
        return b
      }, defaultFormatter: function (a) {
        var d = this.points || t(this), e;
        e = [a.tooltipFooterHeaderFormatter(d[0])];
        e = e.concat(a.bodyFormatter(d));
        e.push(a.tooltipFooterHeaderFormatter(d[0], !0));
        return e
      }, refresh: function (d, g) {
        var e = this.chart, m = this.options, l, b = d, f,
            c = {}, w, r = [];
        w = m.formatter || this.defaultFormatter;
        var c = this.shared, k = e.styledMode, p = [];
        m.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = t(b)[0].series.tooltipOptions.followPointer, f = this.getAnchor(b, g), g = f[0], l = f[1], !c || b.series && b.series.noSharedTooltip ? c = b.getLabelConfig() : (p = e.pointer.getActiveSeries(b), e.series.forEach(function (a) {
          (a.options.inactiveOtherPoints || -1 === p.indexOf(a)) && a.setState("inactive", !0)
        }), b.forEach(function (a) {
          a.setState("hover");
          r.push(a.getLabelConfig())
        }),
            c = {
              x: b[0].category,
              y: b[0].y
            }, c.points = r, b = b[0]), this.len = r.length, w = w.call(c, this), c = b.series, this.distance = q(c.tooltipOptions.distance, 16), !1 === w ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({opacity: 1}).show(), this.split ? this.renderSplit(w, t(d)) : (m.style.width && !k || e.css({width: this.chart.spacingBox.width}), e.attr({text: w && w.join ? w.join("") : w}), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + q(b.colorIndex, c.colorIndex)), k || e.attr({
          stroke: m.borderColor || b.color || c.color ||
          "#666666"
        }), this.updatePosition({
          plotX: g,
          plotY: l,
          negative: b.negative,
          ttBelow: b.ttBelow,
          h: f[2] || 0
        })), this.isHidden = !1), a.fireEvent(this, "refresh"))
      }, renderSplit: function (d, g) {
        var e = this, m = [], l = this.chart, b = l.renderer, f = !0, c = this.options, w = 0, r, k = this.getLabel(),
            p = l.plotTop;
        a.isString(d) && (d = [!1, d]);
        d.slice(0, g.length + 1).forEach(function (a, n) {
          if (!1 !== a && "" !== a) {
            n = g[n - 1] || {isHeader: !0, plotX: g[0].plotX, plotY: l.plotHeight};
            var d = n.series || e, z = d.tt, A = n.series || {}, D = "highcharts-color-" + q(n.colorIndex, A.colorIndex,
                "none");
            z || (z = {
              padding: c.padding,
              r: c.borderRadius
            }, l.styledMode || (z.fill = c.backgroundColor, z.stroke = c.borderColor || n.color || A.color || "#333333", z["stroke-width"] = c.borderWidth), d.tt = z = b.label(null, null, null, (n.isHeader ? c.headerShape : c.shape) || "callout", null, null, c.useHTML).addClass("highcharts-tooltip-box " + D).attr(z).add(k));
            z.isActive = !0;
            z.attr({text: a});
            l.styledMode || z.css(c.style).shadow(c.shadow);
            a = z.getBBox();
            A = a.width + z.strokeWidth();
            n.isHeader ? (w = a.height, l.xAxis[0].opposite && (r = !0, p -= w), A =
                Math.max(0, Math.min(n.plotX + l.plotLeft - A / 2, l.chartWidth + (l.scrollablePixels ? l.scrollablePixels - l.marginRight : 0) - A))) : A = n.plotX + l.plotLeft - q(c.distance, 16) - A;
            0 > A && (f = !1);
            a = (n.series && n.series.yAxis && n.series.yAxis.pos) + (n.plotY || 0);
            a -= p;
            n.isHeader && (a = r ? -w : l.plotHeight + w);
            m.push({target: a, rank: n.isHeader ? 1 : 0, size: d.tt.getBBox().height + 1, point: n, x: A, tt: z})
          }
        });
        this.cleanSplit();
        c.positioner && m.forEach(function (a) {
          var b = c.positioner.call(e, a.tt.getBBox().width, a.size, a.point);
          a.x = b.x;
          a.align = 0;
          a.target =
              b.y;
          a.rank = q(b.rank, a.rank)
        });
        a.distribute(m, l.plotHeight + w);
        m.forEach(function (a) {
          var b = a.point, d = b.series;
          a.tt.attr({
            visibility: void 0 === a.pos ? "hidden" : "inherit",
            x: f || b.isHeader || c.positioner ? a.x : b.plotX + l.plotLeft + e.distance,
            y: a.pos + p,
            anchorX: b.isHeader ? b.plotX + l.plotLeft : b.plotX + d.xAxis.pos,
            anchorY: b.isHeader ? l.plotTop + l.plotHeight / 2 : b.plotY + d.yAxis.pos
          })
        })
      }, updatePosition: function (a) {
        var d = this.chart, e = this.getLabel(),
            m = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a),
            l = a.plotX + d.plotLeft;
        a = a.plotY + d.plotTop;
        var b;
        this.outside && (b = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(e.width + b, e.height + b, !1), l += d.pointer.chartPosition.left - m.x, a += d.pointer.chartPosition.top - m.y);
        this.move(Math.round(m.x), Math.round(m.y || 0), l, a)
      }, getDateFormat: function (a, d, e, m) {
        var l = this.chart.time, b = l.dateFormat("%m-%d %H:%M:%S.%L", d), f, c,
            g = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, r = "millisecond";
        for (c in v) {
          if (a === v.week && +l.dateFormat("%w", d) === e && "00:00:00.000" ===
              b.substr(6)) {
            c = "week";
            break
          }
          if (v[c] > a) {
            c = r;
            break
          }
          if (g[c] && b.substr(g[c]) !== "01-01 00:00:00.000".substr(g[c])) break;
          "week" !== c && (r = c)
        }
        c && (f = l.resolveDTLFormat(m[c]).main);
        return f
      }, getXDateFormat: function (a, d, e) {
        d = d.dateTimeLabelFormats;
        var g = e && e.closestPointRange;
        return (g ? this.getDateFormat(g, a.x, e.options.startOfWeek, d) : d.day) || d.year
      }, tooltipFooterHeaderFormatter: function (d, g) {
        var e = g ? "footer" : "header", m = d.series, l = m.tooltipOptions, b = l.xDateFormat, f = m.xAxis,
            c = f && "datetime" === f.options.type && k(d.key),
            w = l[e + "Format"];
        g = {isFooter: g, labelConfig: d};
        a.fireEvent(this, "headerFormatter", g, function (a) {
          c && !b && (b = this.getXDateFormat(d, l, f));
          c && b && (d.point && d.point.tooltipDateKeys || ["key"]).forEach(function (a) {
            w = w.replace("{point." + a + "}", "{point." + a + ":" + b + "}")
          });
          m.chart.styledMode && (w = this.styledModeFormat(w));
          a.text = H(w, {point: d, series: m}, this.chart.time)
        });
        return g.text
      }, bodyFormatter: function (a) {
        return a.map(function (a) {
          var e = a.series.tooltipOptions;
          return (e[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter).call(a.point, e[(a.point.formatPrefix || "point") + "Format"] || "")
        })
      }, styledModeFormat: function (a) {
        return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"')
      }
    }
  });
  K(F, "parts/Pointer.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.attr, H = a.charts, k = a.color, d = a.css, q = a.defined, t = a.extend, u = a.find,
        v = a.fireEvent, p = a.isNumber, g = a.isObject, e = a.offset, m = a.pick,
        l = a.splat, b = a.Tooltip;
    a.Pointer = function (a, b) {
      this.init(a, b)
    };
    a.Pointer.prototype = {
      init: function (a, c) {
        this.options = c;
        this.chart = a;
        this.runChartClick = c.chart.events && !!c.chart.events.click;
        this.pinchDown = [];
        this.lastValidTouch = {};
        b && (a.tooltip = new b(a, c.tooltip), this.followTouchMove = m(c.tooltip.followTouchMove, !0));
        this.setDOMEvents()
      }, zoomOption: function (a) {
        var b = this.chart, f = b.options.chart, e = f.zoomType || "", b = b.inverted;
        /touch/.test(a.type) && (e = m(f.pinchType, e));
        this.zoomX = a = /x/.test(e);
        this.zoomY =
            e = /y/.test(e);
        this.zoomHor = a && !b || e && b;
        this.zoomVert = e && !b || a && b;
        this.hasZoom = a || e
      }, normalize: function (a, b) {
        var c;
        c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
        b || (this.chartPosition = b = e(this.chart.container));
        return t(a, {chartX: Math.round(c.pageX - b.left), chartY: Math.round(c.pageY - b.top)})
      }, getCoordinates: function (a) {
        var b = {xAxis: [], yAxis: []};
        this.chart.axes.forEach(function (c) {
          b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
        });
        return b
      },
      findNearestKDPoint: function (a, b, e) {
        var c;
        a.forEach(function (a) {
          var f = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
          a = a.searchPoint(e, f);
          if ((f = g(a, !0)) && !(f = !g(c, !0))) var f = c.distX - a.distX, d = c.dist - a.dist,
              n = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex),
              f = 0 < (0 !== f && b ? f : 0 !== d ? d : 0 !== n ? n : c.series.index > a.series.index ? -1 : 1);
          f && (c = a)
        });
        return c
      }, getPointFromEvent: function (a) {
        a = a.target;
        for (var b; a && !b;) b = a.point, a = a.parentNode;
        return b
      }, getChartCoordinatesFromPoint: function (a,
                                                 b) {
        var c = a.series, f = c.xAxis, c = c.yAxis, e = m(a.clientX, a.plotX), d = a.shapeArgs;
        if (f && c) return b ? {chartX: f.len + f.pos - e, chartY: c.len + c.pos - a.plotY} : {
          chartX: e + f.pos,
          chartY: a.plotY + c.pos
        };
        if (d && d.x && d.y) return {chartX: d.x, chartY: d.y}
      }, getHoverData: function (a, b, e, d, l, k) {
        var c, f = [];
        d = !(!d || !a);
        var r = b && !b.stickyTracking ? [b] : e.filter(function (a) {
          return a.visible && !(!l && a.directTouch) && m(a.options.enableMouseTracking, !0) && a.stickyTracking
        });
        b = (c = d ? a : this.findNearestKDPoint(r, l, k)) && c.series;
        c && (l && !b.noSharedTooltip ?
            (r = e.filter(function (a) {
              return a.visible && !(!l && a.directTouch) && m(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
            }), r.forEach(function (a) {
              var b = u(a.points, function (a) {
                return a.x === c.x && !a.isNull
              });
              g(b) && (a.chart.isBoosting && (b = a.getPoint(b)), f.push(b))
            })) : f.push(c));
        return {hoverPoint: c, hoverSeries: b, hoverPoints: f}
      }, runPointActions: function (b, c) {
        var f = this.chart, e = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0, d = e ? e.shared : !1,
            l = c || f.hoverPoint, g = l && l.series || f.hoverSeries, g = this.getHoverData(l,
            g, f.series, "touchmove" !== b.type && (!!c || g && g.directTouch && this.isDirectTouch), d, b), n = [], E,
            l = g.hoverPoint;
        E = g.hoverPoints;
        c = (g = g.hoverSeries) && g.tooltipOptions.followPointer;
        d = d && g && !g.noSharedTooltip;
        if (l && (l !== f.hoverPoint || e && e.isHidden)) {
          (f.hoverPoints || []).forEach(function (a) {
            -1 === E.indexOf(a) && a.setState()
          });
          if (f.hoverSeries !== g) g.onMouseOver();
          n = this.getActiveSeries(E);
          f.series.forEach(function (a) {
            (a.options.inactiveOtherPoints || -1 === n.indexOf(a)) && a.setState("inactive", !0)
          });
          (E || []).forEach(function (a) {
            a.setState("hover")
          });
          f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
          if (!l.series) return;
          l.firePointEvent("mouseOver");
          f.hoverPoints = E;
          f.hoverPoint = l;
          e && e.refresh(d ? E : l, b)
        } else c && e && !e.isHidden && (l = e.getAnchor([{}], b), e.updatePosition({plotX: l[0], plotY: l[1]}));
        this.unDocMouseMove || (this.unDocMouseMove = C(f.container.ownerDocument, "mousemove", function (b) {
          var c = H[a.hoverChartIndex];
          if (c) c.pointer.onDocumentMouseMove(b)
        }));
        f.axes.forEach(function (c) {
          var f = m(c.crosshair.snap, !0), e = f ? a.find(E, function (a) {
            return a.series[c.coll] ===
                c
          }) : void 0;
          e || !f ? c.drawCrosshair(b, e) : c.hideCrosshair()
        })
      }, getActiveSeries: function (a) {
        var b = [], f;
        (a || []).forEach(function (a) {
          f = a.series;
          b.push(f);
          f.linkedParent && b.push(f.linkedParent);
          f.linkedSeries && (b = b.concat(f.linkedSeries));
          f.navigatorSeries && b.push(f.navigatorSeries)
        });
        return b
      }, reset: function (a, b) {
        var c = this.chart, f = c.hoverSeries, e = c.hoverPoint, d = c.hoverPoints, g = c.tooltip,
            n = g && g.shared ? d : e;
        a && n && l(n).forEach(function (b) {
          b.series.isCartesian && void 0 === b.plotX && (a = !1)
        });
        if (a) g && n && l(n).length &&
        (g.refresh(n), g.shared && d ? d.forEach(function (a) {
          a.setState(a.state, !0);
          a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
        }) : e && (e.setState(e.state, !0), c.axes.forEach(function (a) {
          a.crosshair && a.drawCrosshair(null, e)
        }))); else {
          if (e) e.onMouseOut();
          d && d.forEach(function (a) {
            a.setState()
          });
          if (f) f.onMouseOut();
          g && g.hide(b);
          this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
          c.axes.forEach(function (a) {
            a.hideCrosshair()
          });
          this.hoverX = c.hoverPoints = c.hoverPoint = null
        }
      }, scaleGroups: function (a, b) {
        var c = this.chart, f;
        c.series.forEach(function (e) {
          f = a || e.getPlotBox();
          e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(f), e.markerGroup && (e.markerGroup.attr(f), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(f))
        });
        c.clipRect.attr(b || c.clipBox)
      }, dragStart: function (a) {
        var b = this.chart;
        b.mouseIsDown = a.type;
        b.cancelClick = !1;
        b.mouseDownX = this.mouseDownX = a.chartX;
        b.mouseDownY = this.mouseDownY = a.chartY
      },
      drag: function (a) {
        var b = this.chart, f = b.options.chart, e = a.chartX, d = a.chartY, l = this.zoomHor, g = this.zoomVert,
            n = b.plotLeft, m = b.plotTop, z = b.plotWidth, A = b.plotHeight, D, h = this.selectionMarker,
            p = this.mouseDownX, q = this.mouseDownY, t = f.panKey && a[f.panKey + "Key"];
        h && h.touch || (e < n ? e = n : e > n + z && (e = n + z), d < m ? d = m : d > m + A && (d = m + A), this.hasDragged = Math.sqrt(Math.pow(p - e, 2) + Math.pow(q - d, 2)), 10 < this.hasDragged && (D = b.isInsidePlot(p - n, q - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) && D && !t && !h && (this.selectionMarker = h = b.renderer.rect(n,
            m, l ? 1 : z, g ? 1 : A, 0).attr({
          "class": "highcharts-selection-marker",
          zIndex: 7
        }).add(), b.styledMode || h.attr({fill: f.selectionMarkerFill || k("#335cad").setOpacity(.25).get()})), h && l && (e -= p, h.attr({
          width: Math.abs(e),
          x: (0 < e ? 0 : e) + p
        })), h && g && (e = d - q, h.attr({
          height: Math.abs(e),
          y: (0 < e ? 0 : e) + q
        })), D && !h && f.panning && b.pan(a, f.panning)))
      }, drop: function (a) {
        var b = this, f = this.chart, e = this.hasPinched;
        if (this.selectionMarker) {
          var l = {originalEvent: a, xAxis: [], yAxis: []}, g = this.selectionMarker, m = g.attr ? g.attr("x") : g.x,
              n = g.attr ?
                  g.attr("y") : g.y, E = g.attr ? g.attr("width") : g.width, z = g.attr ? g.attr("height") : g.height,
              k;
          if (this.hasDragged || e) f.axes.forEach(function (c) {
            if (c.zoomEnabled && q(c.min) && (e || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
              var f = c.horiz, d = "touchend" === a.type ? c.minPixelPadding : 0, g = c.toValue((f ? m : n) + d),
                  f = c.toValue((f ? m + E : n + z) - d);
              l[c.coll].push({axis: c, min: Math.min(g, f), max: Math.max(g, f)});
              k = !0
            }
          }), k && v(f, "selection", l, function (a) {
            f.zoom(t(a, e ? {animation: !1} : null))
          });
          p(f.index) && (this.selectionMarker = this.selectionMarker.destroy());
          e && this.scaleGroups()
        }
        f && p(f.index) && (d(f.container, {cursor: f._cursor}), f.cancelClick = 10 < this.hasDragged, f.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
      }, onContainerMouseDown: function (a) {
        a = this.normalize(a);
        2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
      }, onDocumentMouseUp: function (b) {
        H[a.hoverChartIndex] && H[a.hoverChartIndex].pointer.drop(b)
      }, onDocumentMouseMove: function (a) {
        var b = this.chart, f = this.chartPosition;
        a = this.normalize(a, f);
        !f ||
        this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
      }, onContainerMouseLeave: function (b) {
        var c = H[a.hoverChartIndex];
        c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
      }, onContainerMouseMove: function (b) {
        var c = this.chart;
        q(a.hoverChartIndex) && H[a.hoverChartIndex] && H[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
        b = this.normalize(b);
        b.preventDefault || (b.returnValue = !1);
        "mousedown" === c.mouseIsDown &&
        this.drag(b);
        !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
      }, inClass: function (a, b) {
        for (var c; a;) {
          if (c = I(a, "class")) {
            if (-1 !== c.indexOf(b)) return !0;
            if (-1 !== c.indexOf("highcharts-container")) return !1
          }
          a = a.parentNode
        }
      }, onTrackerMouseOut: function (a) {
        var b = this.chart.hoverSeries;
        a = a.relatedTarget || a.toElement;
        this.isDirectTouch = !1;
        if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a,
                "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
      }, onContainerClick: function (a) {
        var b = this.chart, f = b.hoverPoint, e = b.plotLeft, d = b.plotTop;
        a = this.normalize(a);
        b.cancelClick || (f && this.inClass(a.target, "highcharts-tracker") ? (v(f.series, "click", t(a, {point: f})), b.hoverPoint && f.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - d) && v(b, "click", a)))
      }, setDOMEvents: function () {
        var b = this, c = b.chart.container, e = c.ownerDocument;
        c.onmousedown =
            function (a) {
              b.onContainerMouseDown(a)
            };
        c.onmousemove = function (a) {
          b.onContainerMouseMove(a)
        };
        c.onclick = function (a) {
          b.onContainerClick(a)
        };
        this.unbindContainerMouseLeave = C(c, "mouseleave", b.onContainerMouseLeave);
        a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(e, "mouseup", b.onDocumentMouseUp));
        a.hasTouch && (c.ontouchstart = function (a) {
          b.onContainerTouchStart(a)
        }, c.ontouchmove = function (a) {
          b.onContainerTouchMove(a)
        }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(e, "touchend", b.onDocumentTouchEnd)))
      },
      destroy: function () {
        var b = this;
        b.unDocMouseMove && b.unDocMouseMove();
        this.unbindContainerMouseLeave();
        a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
        clearInterval(b.tooltipTimeout);
        a.objectEach(b, function (a, f) {
          b[f] = null
        })
      }
    }
  });
  K(F, "parts/TouchPointer.js", [F["parts/Globals.js"]], function (a) {
    var C = a.charts, I = a.extend, H = a.noop, k = a.pick;
    I(a.Pointer.prototype, {
      pinchTranslate: function (a,
                                k, t, u, v, p) {
        this.zoomHor && this.pinchTranslateDirection(!0, a, k, t, u, v, p);
        this.zoomVert && this.pinchTranslateDirection(!1, a, k, t, u, v, p)
      }, pinchTranslateDirection: function (a, k, t, u, v, p, g, e) {
        var d = this.chart, l = a ? "x" : "y", b = a ? "X" : "Y", f = "chart" + b, c = a ? "width" : "height",
            w = d["plot" + (a ? "Left" : "Top")], r, q, G = e || 1, B = d.inverted, n = d.bounds[a ? "h" : "v"],
            E = 1 === k.length, z = k[0][f], A = t[0][f], D = !E && k[1][f], h = !E && t[1][f], y;
        t = function () {
          !E && 20 < Math.abs(z - D) && (G = e || Math.abs(A - h) / Math.abs(z - D));
          q = (w - A) / G + z;
          r = d["plot" + (a ? "Width" : "Height")] /
              G
        };
        t();
        k = q;
        k < n.min ? (k = n.min, y = !0) : k + r > n.max && (k = n.max - r, y = !0);
        y ? (A -= .8 * (A - g[l][0]), E || (h -= .8 * (h - g[l][1])), t()) : g[l] = [A, h];
        B || (p[l] = q - w, p[c] = r);
        p = B ? 1 / G : G;
        v[c] = r;
        v[l] = k;
        u[B ? a ? "scaleY" : "scaleX" : "scale" + b] = G;
        u["translate" + b] = p * w + (A - p * z)
      }, pinch: function (a) {
        var d = this, t = d.chart, u = d.pinchDown, v = a.touches, p = v.length, g = d.lastValidTouch, e = d.hasZoom,
            m = d.selectionMarker, l = {},
            b = 1 === p && (d.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || d.runChartClick), f = {};
        1 < p && (d.initiated = !0);
        e && d.initiated && !b &&
        a.preventDefault();
        [].map.call(v, function (a) {
          return d.normalize(a)
        });
        "touchstart" === a.type ? ([].forEach.call(v, function (a, b) {
          u[b] = {chartX: a.chartX, chartY: a.chartY}
        }), g.x = [u[0].chartX, u[1] && u[1].chartX], g.y = [u[0].chartY, u[1] && u[1].chartY], t.axes.forEach(function (a) {
          if (a.zoomEnabled) {
            var b = t.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding, f = a.toPixels(k(a.options.min, a.dataMin)),
                e = a.toPixels(k(a.options.max, a.dataMax)), d = Math.max(f, e);
            b.min = Math.min(a.pos, Math.min(f, e) - c);
            b.max = Math.max(a.pos + a.len, d + c)
          }
        }),
            d.res = !0) : d.followTouchMove && 1 === p ? this.runPointActions(d.normalize(a)) : u.length && (m || (d.selectionMarker = m = I({
          destroy: H,
          touch: !0
        }, t.plotBox)), d.pinchTranslate(u, v, l, m, f, g), d.hasPinched = e, d.scaleGroups(l, f), d.res && (d.res = !1, this.reset(!1, 0)))
      }, touch: function (d, q) {
        var t = this.chart, u, v;
        if (t.index !== a.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
        a.hoverChartIndex = t.index;
        1 === d.touches.length ? (d = this.normalize(d), (v = t.isInsidePlot(d.chartX - t.plotLeft, d.chartY - t.plotTop)) && !t.openMenu ?
            (q && this.runPointActions(d), "touchmove" === d.type && (q = this.pinchDown, u = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - d.chartX, 2) + Math.pow(q[0].chartY - d.chartY, 2)) : !1), k(u, !0) && this.pinch(d)) : q && this.reset()) : 2 === d.touches.length && this.pinch(d)
      }, onContainerTouchStart: function (a) {
        this.zoomOption(a);
        this.touch(a, !0)
      }, onContainerTouchMove: function (a) {
        this.touch(a)
      }, onDocumentTouchEnd: function (d) {
        C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(d)
      }
    })
  });
  K(F, "parts/MSPointer.js", [F["parts/Globals.js"]], function (a) {
    var C =
            a.addEvent, I = a.charts, H = a.css, k = a.doc, d = a.extend, q = a.noop, t = a.Pointer, u = a.removeEvent,
        v = a.win, p = a.wrap;
    if (!a.hasTouch && (v.PointerEvent || v.MSPointerEvent)) {
      var g = {}, e = !!v.PointerEvent, m = function () {
        var b = [];
        b.item = function (a) {
          return this[a]
        };
        a.objectEach(g, function (a) {
          b.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
        });
        return b
      }, l = function (b, e, c, d) {
        "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !I[a.hoverChartIndex] || (d(b), d = I[a.hoverChartIndex].pointer, d[e]({
          type: c, target: b.currentTarget,
          preventDefault: q, touches: m()
        }))
      };
      d(t.prototype, {
        onContainerPointerDown: function (a) {
          l(a, "onContainerTouchStart", "touchstart", function (a) {
            g[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
          })
        }, onContainerPointerMove: function (a) {
          l(a, "onContainerTouchMove", "touchmove", function (a) {
            g[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
            g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget)
          })
        }, onDocumentPointerUp: function (a) {
          l(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete g[a.pointerId]
          })
        },
        batchMSEvents: function (a) {
          a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
          a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
          a(k, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
        }
      });
      p(t.prototype, "init", function (a, e, c) {
        a.call(this, e, c);
        this.hasZoom && H(e.container, {"-ms-touch-action": "none", "touch-action": "none"})
      });
      p(t.prototype, "setDOMEvents", function (a) {
        a.apply(this);
        (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
      });
      p(t.prototype, "destroy", function (a) {
        this.batchMSEvents(u);
        a.call(this)
      })
    }
  });
  K(F, "parts/Legend.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.css, H = a.discardElement, k = a.defined, d = a.fireEvent, q = a.isFirefox,
        t = a.marginNames, u = a.merge, v = a.pick, p = a.setAnimation, g = a.stableSort, e = a.win, m = a.wrap;
    a.Legend = function (a, b) {
      this.init(a, b)
    };
    a.Legend.prototype = {
      init: function (a, b) {
        this.chart = a;
        this.setOptions(b);
        b.enabled && (this.render(), C(this.chart, "endResize", function () {
          this.legend.positionCheckboxes()
        }),
            this.proximate ? this.unchartrender = C(this.chart, "render", function () {
              this.legend.proximatePositions();
              this.legend.positionItems()
            }) : this.unchartrender && this.unchartrender())
      }, setOptions: function (a) {
        var b = v(a.padding, 8);
        this.options = a;
        this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = u(this.itemStyle, a.itemHiddenStyle));
        this.itemMarginTop = a.itemMarginTop || 0;
        this.padding = b;
        this.initialItemY = b - 5;
        this.symbolWidth = v(a.symbolWidth, 16);
        this.pages = [];
        this.proximate = "proximate" === a.layout &&
            !this.chart.inverted
      }, update: function (a, b) {
        var e = this.chart;
        this.setOptions(u(!0, this.options, a));
        this.destroy();
        e.isDirtyLegend = e.isDirtyBox = !0;
        v(b, !0) && e.redraw();
        d(this, "afterUpdate")
      }, colorizeItem: function (a, b) {
        a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
        if (!this.chart.styledMode) {
          var e = this.options, c = a.legendItem, l = a.legendLine, g = a.legendSymbol, m = this.itemHiddenStyle.color,
              e = b ? e.itemStyle.color : m, k = b ? a.color || m : m, p = a.options && a.options.marker, n = {fill: k};
          c && c.css({
            fill: e,
            color: e
          });
          l && l.attr({stroke: k});
          g && (p && g.isMarker && (n = a.pointAttribs(), b || (n.stroke = n.fill = m)), g.attr(n))
        }
        d(this, "afterColorizeItem", {item: a, visible: b})
      }, positionItems: function () {
        this.allItems.forEach(this.positionItem, this);
        this.chart.isResizing || this.positionCheckboxes()
      }, positionItem: function (a) {
        var b = this.options, e = b.symbolPadding, b = !b.rtl, c = a._legendItemPos, d = c[0], c = c[1], l = a.checkbox;
        if ((a = a.legendGroup) && a.element) a[k(a.translateY) ? "animate" : "attr"]({
          translateX: b ? d : this.legendWidth - d - 2 * e - 4,
          translateY: c
        });
        l && (l.x = d, l.y = c)
      }, destroyItem: function (a) {
        var b = a.checkbox;
        ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (b) {
          a[b] && (a[b] = a[b].destroy())
        });
        b && H(a.checkbox)
      }, destroy: function () {
        function a(a) {
          this[a] && (this[a] = this[a].destroy())
        }

        this.getAllItems().forEach(function (b) {
          ["legendItem", "legendGroup"].forEach(a, b)
        });
        "clipRect up down pager nav box title group".split(" ").forEach(a, this);
        this.display = null
      }, positionCheckboxes: function () {
        var a = this.group && this.group.alignAttr,
            b, e = this.clipHeight || this.legendHeight, c = this.titleHeight;
        a && (b = a.translateY, this.allItems.forEach(function (f) {
          var d = f.checkbox, g;
          d && (g = b + c + d.y + (this.scrollOffset || 0) + 3, I(d, {
            left: a.translateX + f.checkboxOffset + d.x - 20 + "px",
            top: g + "px",
            display: this.proximate || g > b - 6 && g < b + e - 6 ? "" : "none"
          }))
        }, this))
      }, renderTitle: function () {
        var a = this.options, b = this.padding, e = a.title, c = 0;
        e.text && (this.title || (this.title = this.chart.renderer.label(e.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}),
        this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)), e.width || this.title.css({width: this.maxLegendWidth + "px"}), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: c}));
        this.titleHeight = c
      }, setText: function (e) {
        var b = this.options;
        e.legendItem.attr({text: b.labelFormat ? a.format(b.labelFormat, e, this.chart.time) : b.labelFormatter.call(e)})
      }, renderItem: function (a) {
        var b = this.chart, e = b.renderer, c = this.options, d = this.symbolWidth, g = c.symbolPadding,
            l = this.itemStyle, m = this.itemHiddenStyle, k = "horizontal" === c.layout ? v(c.itemDistance, 20) : 0,
            n = !c.rtl, E = a.legendItem, z = !a.series, A = !z && a.series.drawLegendSymbol ? a.series : a,
            D = A.options, D = this.createCheckboxForItem && D && D.showCheckbox, k = d + g + k + (D ? 20 : 0),
            h = c.useHTML, p = a.options.className;
        E || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (p ? " " + p : "") + (z ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = E = e.text("",
            n ? d + g : -g, this.baseline || 0, h), b.styledMode || E.css(u(a.visible ? l : m)), E.attr({
          align: n ? "left" : "right",
          zIndex: 2
        }).add(a.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(b.styledMode ? 12 : l.fontSize, E), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, E.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, E, h));
        D && !a.checkbox && this.createCheckboxForItem(a);
        this.colorizeItem(a, a.visible);
        !b.styledMode &&
        l.width || E.css({width: (c.itemWidth || this.widthOption || b.spacingBox.width) - k});
        this.setText(a);
        b = E.getBBox();
        a.itemWidth = a.checkboxOffset = c.itemWidth || a.legendItemWidth || b.width + k;
        this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
        this.totalItemWidth += a.itemWidth;
        this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
      }, layoutItem: function (a) {
        var b = this.options, e = this.padding, c = "horizontal" === b.layout, d = a.itemHeight,
            g = b.itemMarginBottom || 0, l = this.itemMarginTop,
            m = c ? v(b.itemDistance, 20) : 0, k = this.maxLegendWidth,
            b = b.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : a.itemWidth;
        c && this.itemX - e + b > k && (this.itemX = e, this.lastLineHeight && (this.itemY += l + this.lastLineHeight + g), this.lastLineHeight = 0);
        this.lastItemY = l + this.itemY + g;
        this.lastLineHeight = Math.max(d, this.lastLineHeight);
        a._legendItemPos = [this.itemX, this.itemY];
        c ? this.itemX += b : (this.itemY += l + d + g, this.lastLineHeight = d);
        this.offsetWidth = this.widthOption || Math.max((c ? this.itemX - e - (a.checkbox ? 0 : m) : b) + e, this.offsetWidth)
      },
      getAllItems: function () {
        var a = [];
        this.chart.series.forEach(function (b) {
          var e = b && b.options;
          b && v(e.showInLegend, k(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === e.legendType ? b.data : b)))
        });
        d(this, "afterGetAllItems", {allItems: a});
        return a
      }, getAlignment: function () {
        var a = this.options;
        return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
      }, adjustMargins: function (a, b) {
        var e = this.chart, c = this.options, d = this.getAlignment(),
            g = void 0 !== e.options.title.margin ? e.titleOffset + e.options.title.margin : 0;
        d && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (f, l) {
          f.test(d) && !k(a[l]) && (e[t[l]] = Math.max(e[t[l]], e.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * c[l % 2 ? "x" : "y"] + v(c.margin, 12) + b[l] + (0 === l && (0 === e.titleOffset ? 0 : g))))
        })
      }, proximatePositions: function () {
        var e = this.chart, b = [], f = "left" === this.options.align;
        this.allItems.forEach(function (c) {
          var d, g;
          g = f;
          var l;
          c.yAxis && c.points && (c.xAxis.options.reversed &&
          (g = !g), d = a.find(g ? c.points : c.points.slice(0).reverse(), function (b) {
            return a.isNumber(b.plotY)
          }), g = c.legendGroup.getBBox().height, l = c.yAxis.top - e.plotTop, c.visible ? (d = d ? d.plotY : c.yAxis.height, d += l - .3 * g) : d = l + c.yAxis.height, b.push({
            target: d,
            size: g,
            item: c
          }))
        }, this);
        a.distribute(b, e.plotHeight);
        b.forEach(function (a) {
          a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos
        })
      }, render: function () {
        var e = this.chart, b = e.renderer, f = this.group, c, m, r, k = this.box, p = this.options, B = this.padding;
        this.itemX = B;
        this.itemY =
            this.initialItemY;
        this.lastItemY = this.offsetWidth = 0;
        this.widthOption = a.relativeLength(p.width, e.spacingBox.width - B);
        c = e.spacingBox.width - 2 * B - p.x;
        -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (c /= 2);
        this.maxLegendWidth = this.widthOption || c;
        f || (this.group = f = b.g("legend").attr({zIndex: 7}).add(), this.contentGroup = b.g().attr({zIndex: 1}).add(f), this.scrollGroup = b.g().add(this.contentGroup));
        this.renderTitle();
        c = this.getAllItems();
        g(c, function (a, b) {
          return (a.options && a.options.legendIndex || 0) -
              (b.options && b.options.legendIndex || 0)
        });
        p.reversed && c.reverse();
        this.allItems = c;
        this.display = m = !!c.length;
        this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
        c.forEach(this.renderItem, this);
        c.forEach(this.layoutItem, this);
        c = (this.widthOption || this.offsetWidth) + B;
        r = this.lastItemY + this.lastLineHeight + this.titleHeight;
        r = this.handleOverflow(r);
        r += B;
        k || (this.box = k = b.rect().addClass("highcharts-legend-box").attr({r: p.borderRadius}).add(f), k.isNew = !0);
        e.styledMode || k.attr({
          stroke: p.borderColor,
          "stroke-width": p.borderWidth || 0, fill: p.backgroundColor || "none"
        }).shadow(p.shadow);
        0 < c && 0 < r && (k[k.isNew ? "attr" : "animate"](k.crisp.call({}, {
          x: 0,
          y: 0,
          width: c,
          height: r
        }, k.strokeWidth())), k.isNew = !1);
        k[m ? "show" : "hide"]();
        e.styledMode && "none" === f.getStyle("display") && (c = r = 0);
        this.legendWidth = c;
        this.legendHeight = r;
        m && (b = e.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (k = b.y + e.titleOffset, b = u(b, {y: 0 < e.titleOffset ? k += e.options.title.margin : k})), f.align(u(p, {
          width: c, height: r, verticalAlign: this.proximate ?
              "top" : p.verticalAlign
        }), !0, b));
        this.proximate || this.positionItems();
        d(this, "afterRender")
      }, handleOverflow: function (a) {
        var b = this, e = this.chart, c = e.renderer, d = this.options, g = d.y, l = this.padding,
            g = e.spacingBox.height + ("top" === d.verticalAlign ? -g : g) - l, m = d.maxHeight, k, n = this.clipRect,
            E = d.navigation, z = v(E.animation, !0), A = E.arrowSize || 12, D = this.nav, h = this.pages, p,
            q = this.allItems, t = function (a) {
              "number" === typeof a ? n.attr({height: a}) : n && (b.clipRect = n.destroy(), b.contentGroup.clip());
              b.contentGroup.div && (b.contentGroup.div.style.clip =
                  a ? "rect(" + l + "px,9999px," + (l + a) + "px,0)" : "auto")
            }, L = function (a) {
              b[a] = c.circle(0, 0, 1.3 * A).translate(A / 2, A / 2).add(D);
              e.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
              return b[a]
            };
        "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (g /= 2);
        m && (g = Math.min(g, m));
        h.length = 0;
        a > g && !1 !== E.enabled ? (this.clipHeight = k = Math.max(g - 20 - this.titleHeight - l, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight = a, q.forEach(function (a, b) {
          var c = a._legendItemPos[1], e = Math.round(a.legendItem.getBBox().height),
              f = h.length;
          if (!f || c - h[f - 1] > k && (p || c) !== h[f - 1]) h.push(p || c), f++;
          a.pageIx = f - 1;
          p && (q[b - 1].pageIx = f - 1);
          b === q.length - 1 && c + e - h[f - 1] > k && c !== p && (h.push(c), a.pageIx = f);
          c !== p && (p = c)
        }), n || (n = b.clipRect = c.clipRect(0, l, 9999, 0), b.contentGroup.clip(n)), t(k), D || (this.nav = D = c.g().attr({zIndex: 1}).add(this.group), this.up = c.symbol("triangle", 0, 0, A, A).add(D), L("upTracker").on("click", function () {
          b.scroll(-1, z)
        }), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(E.style),
            this.pager.add(D), this.down = c.symbol("triangle-down", 0, 0, A, A).add(D), L("downTracker").on("click", function () {
          b.scroll(1, z)
        })), b.scroll(0), a = g) : D && (t(), this.nav = D.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
        return a
      }, scroll: function (a, b) {
        var e = this.pages, c = e.length, d = this.currentPage + a;
        a = this.clipHeight;
        var g = this.options.navigation, l = this.pager, m = this.padding;
        d > c && (d = c);
        0 < d && (void 0 !== b && p(b, this.chart), this.nav.attr({
          translateX: m, translateY: a + this.padding + 7 + this.titleHeight,
          visibility: "visible"
        }), [this.up, this.upTracker].forEach(function (a) {
          a.attr({"class": 1 === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"})
        }), l.attr({text: d + "/" + c}), [this.down, this.downTracker].forEach(function (a) {
          a.attr({
            x: 18 + this.pager.getBBox().width,
            "class": d === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
          })
        }, this), this.chart.styledMode || (this.up.attr({fill: 1 === d ? g.inactiveColor : g.activeColor}), this.upTracker.css({cursor: 1 === d ? "default" : "pointer"}), this.down.attr({
          fill: d ===
          c ? g.inactiveColor : g.activeColor
        }), this.downTracker.css({cursor: d === c ? "default" : "pointer"})), this.scrollOffset = -e[d - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = d, this.positionCheckboxes())
      }
    };
    a.LegendSymbolMixin = {
      drawRectangle: function (a, b) {
        var e = a.symbolHeight, c = a.options.squareSymbol;
        b.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, c ? e : a.symbolWidth, e, v(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(b.legendGroup)
      },
      drawLineMarker: function (a) {
        var b = this.options, e = b.marker, c = a.symbolWidth, d = a.symbolHeight, g = d / 2, m = this.chart.renderer,
            l = this.legendGroup;
        a = a.baseline - Math.round(.3 * a.fontMetrics.b);
        var k = {};
        this.chart.styledMode || (k = {"stroke-width": b.lineWidth || 0}, b.dashStyle && (k.dashstyle = b.dashStyle));
        this.legendLine = m.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr(k).add(l);
        e && !1 !== e.enabled && c && (b = Math.min(v(e.radius, g), g), 0 === this.symbol.indexOf("url") && (e = u(e, {
          width: d,
          height: d
        }), b = 0), this.legendSymbol =
            e = m.symbol(this.symbol, c / 2 - b, a - b, 2 * b, 2 * b, e).addClass("highcharts-point").add(l), e.isMarker = !0)
      }
    };
    (/Trident\/7\.0/.test(e.navigator && e.navigator.userAgent) || q) && m(a.Legend.prototype, "positionItem", function (a, b) {
      var e = this, c = function () {
        b._legendItemPos && a.call(e, b)
      };
      c();
      e.bubbleLegend || setTimeout(c)
    })
  });
  K(F, "parts/Chart.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.animate, H = a.animObject, k = a.attr, d = a.doc, q = a.Axis, t = a.createElement,
        u = a.defaultOptions, v = a.discardElement, p = a.charts, g = a.css,
        e = a.defined, m = a.extend, l = a.find, b = a.fireEvent, f = a.isNumber, c = a.isObject, w = a.isString,
        r = a.Legend, J = a.marginNames, G = a.merge, B = a.objectEach, n = a.Pointer, E = a.pick, z = a.pInt,
        A = a.removeEvent, D = a.seriesTypes, h = a.splat, y = a.syncTimeout, M = a.win, R = a.Chart = function () {
          this.getArgs.apply(this, arguments)
        };
    a.chart = function (a, b, c) {
      return new R(a, b, c)
    };
    m(R.prototype, {
      callbacks: [], getArgs: function () {
        var a = [].slice.call(arguments);
        if (w(a[0]) || a[0].nodeName) this.renderTo = a.shift();
        this.init(a[0], a[1])
      }, init: function (e,
                         h) {
        var d, f = e.series, n = e.plotOptions || {};
        b(this, "init", {args: arguments}, function () {
          e.series = null;
          d = G(u, e);
          B(d.plotOptions, function (a, b) {
            c(a) && (a.tooltip = n[b] && G(n[b].tooltip) || void 0)
          });
          d.tooltip.userOptions = e.chart && e.chart.forExport && e.tooltip.userOptions || e.tooltip;
          d.series = e.series = f;
          this.userOptions = e;
          var g = d.chart, m = g.events;
          this.margin = [];
          this.spacing = [];
          this.bounds = {h: {}, v: {}};
          this.labelCollectors = [];
          this.callback = h;
          this.isResizing = 0;
          this.options = d;
          this.axes = [];
          this.series = [];
          this.time = e.time &&
          Object.keys(e.time).length ? new a.Time(e.time) : a.time;
          this.styledMode = g.styledMode;
          this.hasCartesianSeries = g.showAxes;
          var l = this;
          l.index = p.length;
          p.push(l);
          a.chartCount++;
          m && B(m, function (a, b) {
            C(l, b, a)
          });
          l.xAxis = [];
          l.yAxis = [];
          l.pointCount = l.colorCounter = l.symbolCounter = 0;
          b(l, "afterInit");
          l.firstRender()
        })
      }, initSeries: function (b) {
        var c = this.options.chart;
        (c = D[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0, this);
        c = new c;
        c.init(this, b);
        return c
      }, orderSeries: function (a) {
        var b = this.series;
        for (a = a ||
            0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
      }, isInsidePlot: function (a, b, c) {
        var e = c ? b : a;
        a = c ? a : b;
        return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
      }, redraw: function (c) {
        b(this, "beforeRedraw");
        var e = this.axes, h = this.series, d = this.pointer, f = this.legend, n = this.userOptions.legend,
            g = this.isDirtyLegend, l, z, k = this.hasCartesianSeries, E = this.isDirtyBox, r, D = this.renderer,
            A = D.isHidden(), p = [];
        this.setResponsive && this.setResponsive(!1);
        a.setAnimation(c, this);
        A && this.temporaryDisplay();
        this.layOutTitles();
        for (c = h.length; c--;) if (r = h[c], r.options.stacking && (l = !0, r.isDirty)) {
          z = !0;
          break
        }
        if (z) for (c = h.length; c--;) r = h[c], r.options.stacking && (r.isDirty = !0);
        h.forEach(function (a) {
          a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), g = !0) : n && (n.labelFormatter || n.labelFormat) && (g = !0));
          a.isDirtyData && b(a, "updatedData")
        });
        g && f && f.options.enabled && (f.render(), this.isDirtyLegend = !1);
        l && this.getStacks();
        k && e.forEach(function (a) {
          a.updateNames();
          a.setScale()
        });
        this.getMargins();
        k && (e.forEach(function (a) {
          a.isDirty &&
          (E = !0)
        }), e.forEach(function (a) {
          var c = a.min + "," + a.max;
          a.extKey !== c && (a.extKey = c, p.push(function () {
            b(a, "afterSetExtremes", m(a.eventArgs, a.getExtremes()));
            delete a.eventArgs
          }));
          (E || l) && a.redraw()
        }));
        E && this.drawChartBox();
        b(this, "predraw");
        h.forEach(function (a) {
          (E || a.isDirty) && a.visible && a.redraw();
          a.isDirtyData = !1
        });
        d && d.reset(!0);
        D.draw();
        b(this, "redraw");
        b(this, "render");
        A && this.temporaryDisplay(!0);
        p.forEach(function (a) {
          a.call()
        })
      }, get: function (a) {
        function b(b) {
          return b.id === a || b.options && b.options.id ===
              a
        }

        var c, e = this.series, h;
        c = l(this.axes, b) || l(this.series, b);
        for (h = 0; !c && h < e.length; h++) c = l(e[h].points || [], b);
        return c
      }, getAxes: function () {
        var a = this, c = this.options, e = c.xAxis = h(c.xAxis || {}), c = c.yAxis = h(c.yAxis || {});
        b(this, "getAxes");
        e.forEach(function (a, b) {
          a.index = b;
          a.isX = !0
        });
        c.forEach(function (a, b) {
          a.index = b
        });
        e.concat(c).forEach(function (b) {
          new q(a, b)
        });
        b(this, "afterGetAxes")
      }, getSelectedPoints: function () {
        var a = [];
        this.series.forEach(function (b) {
          a = a.concat((b[b.hasGroupedData ? "points" : "data"] ||
              []).filter(function (a) {
            return a.selected
          }))
        });
        return a
      }, getSelectedSeries: function () {
        return this.series.filter(function (a) {
          return a.selected
        })
      }, setTitle: function (a, b, c) {
        var e = this, h = e.options, d = e.styledMode, f;
        f = h.title = G(!d && {style: {color: "#333333", fontSize: h.isStock ? "16px" : "18px"}}, h.title, a);
        h = h.subtitle = G(!d && {style: {color: "#666666"}}, h.subtitle, b);
        [["title", a, f], ["subtitle", b, h]].forEach(function (a, b) {
          var c = a[0], h = e[c], f = a[1];
          a = a[2];
          h && f && (e[c] = h = h.destroy());
          a && !h && (e[c] = e.renderer.text(a.text,
              0, 0, a.useHTML).attr({
            align: a.align,
            "class": "highcharts-" + c,
            zIndex: a.zIndex || 4
          }).add(), e[c].update = function (a) {
            e.setTitle(!b && a, b && a)
          }, d || e[c].css(a.style))
        });
        e.layOutTitles(c)
      }, layOutTitles: function (a) {
        var b = 0, c, e = this.renderer, h = this.spacingBox;
        ["title", "subtitle"].forEach(function (a) {
          var c = this[a], d = this.options[a];
          a = "title" === a ? -3 : d.verticalAlign ? 0 : b + 2;
          var f;
          c && (this.styledMode || (f = d.style.fontSize), f = e.fontMetrics(f, c).b, c.css({width: (d.width || h.width + d.widthAdjust) + "px"}).align(m({y: a + f}, d),
              !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + c.getBBox(d.useHTML).height)))
        }, this);
        c = this.titleOffset !== b;
        this.titleOffset = b;
        !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && E(a, !0) && this.isDirtyBox && this.redraw())
      }, getChartSize: function () {
        var b = this.options.chart, c = b.width, b = b.height, h = this.renderTo;
        e(c) || (this.containerWidth = a.getStyle(h, "width"));
        e(b) || (this.containerHeight = a.getStyle(h, "height"));
        this.chartWidth = Math.max(0, c || this.containerWidth || 600);
        this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
      }, temporaryDisplay: function (b) {
        var c = this.renderTo;
        if (b) for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (d.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode; else for (; c && c.style;) {
          d.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, d.body.appendChild(c));
          if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
            display: c.style.display,
            height: c.style.height, overflow: c.style.overflow
          }, b = {
            display: "block",
            overflow: "hidden"
          }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
          c = c.parentNode;
          if (c === d.body) break
        }
      }, setClassName: function (a) {
        this.container.className = "highcharts-container " + (a || "")
      }, getContainer: function () {
        var c, e = this.options, h = e.chart, n, l;
        c = this.renderTo;
        var E = a.uniqueKey(), r, D;
        c || (this.renderTo = c = h.renderTo);
        w(c) && (this.renderTo = c = d.getElementById(c));
        c || a.error(13,
            !0, this);
        n = z(k(c, "data-highcharts-chart"));
        f(n) && p[n] && p[n].hasRendered && p[n].destroy();
        k(c, "data-highcharts-chart", this.index);
        c.innerHTML = "";
        h.skipClone || c.offsetWidth || this.temporaryDisplay();
        this.getChartSize();
        n = this.chartWidth;
        l = this.chartHeight;
        g(c, {overflow: "hidden"});
        this.styledMode || (r = m({
          position: "relative",
          overflow: "hidden",
          width: n + "px",
          height: l + "px",
          textAlign: "left",
          lineHeight: "normal",
          zIndex: 0,
          "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
        }, h.style));
        this.container = c = t("div", {id: E}, r,
            c);
        this._cursor = c.style.cursor;
        this.renderer = new (a[h.renderer] || a.Renderer)(c, n, l, null, h.forExport, e.exporting && e.exporting.allowHTML, this.styledMode);
        this.setClassName(h.className);
        if (this.styledMode) for (D in e.defs) this.renderer.definition(e.defs[D]); else this.renderer.setStyle(h.style);
        this.renderer.chartIndex = this.index;
        b(this, "afterGetContainer")
      }, getMargins: function (a) {
        var c = this.spacing, h = this.margin, d = this.titleOffset;
        this.resetMargins();
        d && !e(h[0]) && (this.plotTop = Math.max(this.plotTop, d +
            this.options.title.margin + c[0]));
        this.legend && this.legend.display && this.legend.adjustMargins(h, c);
        b(this, "getMargins");
        a || this.getAxisMargins()
      }, getAxisMargins: function () {
        var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin;
        a.hasCartesianSeries && a.axes.forEach(function (a) {
          a.visible && a.getOffset()
        });
        J.forEach(function (h, d) {
          e(c[d]) || (a[h] += b[d])
        });
        a.setChartSize()
      }, reflow: function (b) {
        var c = this, h = c.options.chart, f = c.renderTo, n = e(h.width) && e(h.height),
            g = h.width || a.getStyle(f, "width"), h = h.height || a.getStyle(f,
            "height"), f = b ? b.target : M;
        if (!n && !c.isPrinting && g && h && (f === M || f === d)) {
          if (g !== c.containerWidth || h !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = y(function () {
            c.container && c.setSize(void 0, void 0, !1)
          }, b ? 100 : 0);
          c.containerWidth = g;
          c.containerHeight = h
        }
      }, setReflow: function (a) {
        var b = this;
        !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = C(M, "resize", function (a) {
          b.reflow(a)
        }), C(this, "destroy", this.unbindReflow))
      }, setSize: function (c,
                            e, h) {
        var d = this, f = d.renderer, n;
        d.isResizing += 1;
        a.setAnimation(h, d);
        d.oldChartHeight = d.chartHeight;
        d.oldChartWidth = d.chartWidth;
        void 0 !== c && (d.options.chart.width = c);
        void 0 !== e && (d.options.chart.height = e);
        d.getChartSize();
        d.styledMode || (n = f.globalAnimation, (n ? I : g)(d.container, {
          width: d.chartWidth + "px",
          height: d.chartHeight + "px"
        }, n));
        d.setChartSize(!0);
        f.setSize(d.chartWidth, d.chartHeight, h);
        d.axes.forEach(function (a) {
          a.isDirty = !0;
          a.setScale()
        });
        d.isDirtyLegend = !0;
        d.isDirtyBox = !0;
        d.layOutTitles();
        d.getMargins();
        d.redraw(h);
        d.oldChartHeight = null;
        b(d, "resize");
        y(function () {
          d && b(d, "endResize", null, function () {
            --d.isResizing
          })
        }, H(n).duration)
      }, setChartSize: function (a) {
        var c = this.inverted, e = this.renderer, h = this.chartWidth, d = this.chartHeight, f = this.options.chart,
            n = this.spacing, g = this.clipOffset, l, m, z, k;
        this.plotLeft = l = Math.round(this.plotLeft);
        this.plotTop = m = Math.round(this.plotTop);
        this.plotWidth = z = Math.max(0, Math.round(h - l - this.marginRight));
        this.plotHeight = k = Math.max(0, Math.round(d - m - this.marginBottom));
        this.plotSizeX =
            c ? k : z;
        this.plotSizeY = c ? z : k;
        this.plotBorderWidth = f.plotBorderWidth || 0;
        this.spacingBox = e.spacingBox = {x: n[3], y: n[0], width: h - n[3] - n[1], height: d - n[0] - n[2]};
        this.plotBox = e.plotBox = {x: l, y: m, width: z, height: k};
        h = 2 * Math.floor(this.plotBorderWidth / 2);
        c = Math.ceil(Math.max(h, g[3]) / 2);
        e = Math.ceil(Math.max(h, g[0]) / 2);
        this.clipBox = {
          x: c,
          y: e,
          width: Math.floor(this.plotSizeX - Math.max(h, g[1]) / 2 - c),
          height: Math.max(0, Math.floor(this.plotSizeY - Math.max(h, g[2]) / 2 - e))
        };
        a || this.axes.forEach(function (a) {
          a.setAxisSize();
          a.setAxisTranslation()
        });
        b(this, "afterSetChartSize", {skipAxes: a})
      }, resetMargins: function () {
        b(this, "resetMargins");
        var a = this, e = a.options.chart;
        ["margin", "spacing"].forEach(function (b) {
          var h = e[b], d = c(h) ? h : [h, h, h, h];
          ["Top", "Right", "Bottom", "Left"].forEach(function (c, h) {
            a[b][h] = E(e[b + c], d[h])
          })
        });
        J.forEach(function (b, c) {
          a[b] = E(a.margin[c], a.spacing[c])
        });
        a.axisOffset = [0, 0, 0, 0];
        a.clipOffset = [0, 0, 0, 0]
      }, drawChartBox: function () {
        var a = this.options.chart, c = this.renderer, e = this.chartWidth, h = this.chartHeight,
            d = this.chartBackground,
            f = this.plotBackground, n = this.plotBorder, g, l = this.styledMode, m = this.plotBGImage,
            z = a.backgroundColor, k = a.plotBackgroundColor, E = a.plotBackgroundImage, r, D = this.plotLeft,
            A = this.plotTop, p = this.plotWidth, w = this.plotHeight, y = this.plotBox, B = this.clipRect,
            q = this.clipBox, t = "animate";
        d || (this.chartBackground = d = c.rect().addClass("highcharts-background").add(), t = "attr");
        if (l) g = r = d.strokeWidth(); else {
          g = a.borderWidth || 0;
          r = g + (a.shadow ? 8 : 0);
          z = {fill: z || "none"};
          if (g || d["stroke-width"]) z.stroke = a.borderColor, z["stroke-width"] =
              g;
          d.attr(z).shadow(a.shadow)
        }
        d[t]({x: r / 2, y: r / 2, width: e - r - g % 2, height: h - r - g % 2, r: a.borderRadius});
        t = "animate";
        f || (t = "attr", this.plotBackground = f = c.rect().addClass("highcharts-plot-background").add());
        f[t](y);
        l || (f.attr({fill: k || "none"}).shadow(a.plotShadow), E && (m ? m.animate(y) : this.plotBGImage = c.image(E, D, A, p, w).add()));
        B ? B.animate({width: q.width, height: q.height}) : this.clipRect = c.clipRect(q);
        t = "animate";
        n || (t = "attr", this.plotBorder = n = c.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
        l || n.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
        n[t](n.crisp({x: D, y: A, width: p, height: w}, -n.strokeWidth()));
        this.isDirtyBox = !1;
        b(this, "afterDrawChartBox")
      }, propFromSeries: function () {
        var a = this, b = a.options.chart, c, e = a.options.series, h, d;
        ["inverted", "angular", "polar"].forEach(function (f) {
          c = D[b.type || b.defaultSeriesType];
          d = b[f] || c && c.prototype[f];
          for (h = e && e.length; !d && h--;) (c = D[e[h].type]) && c.prototype[f] && (d = !0);
          a[f] = d
        })
      }, linkSeries: function () {
        var a = this, c = a.series;
        c.forEach(function (a) {
          a.linkedSeries.length = 0
        });
        c.forEach(function (b) {
          var c = b.options.linkedTo;
          w(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = E(b.options.visible, c.options.visible, b.visible))
        });
        b(this, "afterLinkSeries")
      }, renderSeries: function () {
        this.series.forEach(function (a) {
          a.translate();
          a.render()
        })
      }, renderLabels: function () {
        var a = this, b = a.options.labels;
        b.items && b.items.forEach(function (c) {
          var e = m(b.style, c.style),
              h = z(e.left) + a.plotLeft, d = z(e.top) + a.plotTop + 12;
          delete e.left;
          delete e.top;
          a.renderer.text(c.html, h, d).attr({zIndex: 2}).css(e).add()
        })
      }, render: function () {
        var a = this.axes, b = this.renderer, c = this.options, e = 0, h, d, f;
        this.setTitle();
        this.legend = new r(this, c.legend);
        this.getStacks && this.getStacks();
        this.getMargins(!0);
        this.setChartSize();
        c = this.plotWidth;
        a.some(function (a) {
          if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return e = 21, !0
        });
        h = this.plotHeight = Math.max(this.plotHeight - e, 0);
        a.forEach(function (a) {
          a.setScale()
        });
        this.getAxisMargins();
        d = 1.1 < c / this.plotWidth;
        f = 1.05 < h / this.plotHeight;
        if (d || f) a.forEach(function (a) {
          (a.horiz && d || !a.horiz && f) && a.setTickInterval(!0)
        }), this.getMargins();
        this.drawChartBox();
        this.hasCartesianSeries && a.forEach(function (a) {
          a.visible && a.render()
        });
        this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
        this.renderSeries();
        this.renderLabels();
        this.addCredits();
        this.setResponsive && this.setResponsive();
        this.hasRendered = !0
      }, addCredits: function (a) {
        var b = this;
        a = G(!0,
            this.options.credits, a);
        a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
          a.href && (M.location.href = a.href)
        }).attr({
          align: a.position.align,
          zIndex: 8
        }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function (a) {
          b.credits = b.credits.destroy();
          b.addCredits(a)
        })
      }, destroy: function () {
        var c = this, e = c.axes, h = c.series, d = c.container, f, n = d && d.parentNode;
        b(c, "destroy");
        c.renderer.forExport ? a.erase(p, c) : p[c.index] = void 0;
        a.chartCount--;
        c.renderTo.removeAttribute("data-highcharts-chart");
        A(c);
        for (f = e.length; f--;) e[f] = e[f].destroy();
        this.scroller && this.scroller.destroy && this.scroller.destroy();
        for (f = h.length; f--;) h[f] = h[f].destroy();
        "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
          var b = c[a];
          b && b.destroy && (c[a] = b.destroy())
        });
        d && (d.innerHTML = "", A(d), n && v(d));
        B(c, function (a, b) {
          delete c[b]
        })
      }, firstRender: function () {
        var c = this, e = c.options;
        if (!c.isReadyToRender || c.isReadyToRender()) {
          c.getContainer();
          c.resetMargins();
          c.setChartSize();
          c.propFromSeries();
          c.getAxes();
          (a.isArray(e.series) ? e.series : []).forEach(function (a) {
            c.initSeries(a)
          });
          c.linkSeries();
          b(c, "beforeRender");
          n && (c.pointer = new n(c, e));
          c.render();
          if (!c.renderer.imgCount && c.onload) c.onload();
          c.temporaryDisplay(!0)
        }
      }, onload: function () {
        [this.callback].concat(this.callbacks).forEach(function (a) {
          a &&
          void 0 !== this.index && a.apply(this, [this])
        }, this);
        b(this, "load");
        b(this, "render");
        e(this.index) && this.setReflow(this.options.chart.reflow);
        this.onload = null
      }
    })
  });
  K(F, "parts/ScrollablePlotArea.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.Chart;
    C(I, "afterSetChartSize", function (C) {
      var k = this.options.chart.scrollablePlotArea;
      (k = k && k.minWidth) && !this.renderer.forExport && (this.scrollablePixels = k = Math.max(0, k - this.chartWidth)) && (this.plotWidth += k, this.clipBox.width += k, C.skipAxes || this.axes.forEach(function (d) {
        1 ===
        d.side ? d.getPlotLinePath = function () {
          var k = this.right, t;
          this.right = k - d.chart.scrollablePixels;
          t = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
          this.right = k;
          return t
        } : (d.setAxisSize(), d.setAxisTranslation())
      }))
    });
    C(I, "render", function () {
      this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
    });
    I.prototype.setUpScrolling = function () {
      this.scrollingContainer = a.createElement("div", {className: "highcharts-scrolling"}, {
            overflowX: "auto",
            WebkitOverflowScrolling: "touch"
          },
          this.renderTo);
      this.innerContainer = a.createElement("div", {className: "highcharts-inner-container"}, null, this.scrollingContainer);
      this.innerContainer.appendChild(this.container);
      this.setUpScrolling = null
    };
    I.prototype.applyFixed = function () {
      var C = this.container, k, d, q = !this.fixedDiv;
      q && (this.fixedDiv = a.createElement("div", {className: "highcharts-fixed"}, {
        position: "absolute",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2
      }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow =
          "visible", this.fixedRenderer = k = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = k.path().attr({
        fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
        zIndex: -1
      }).addClass("highcharts-scrollable-mask").add(), [this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"].forEach(function (a) {
        [].forEach.call(C.querySelectorAll(a),
            function (a) {
              (a.namespaceURI === k.SVG_NS ? k.box : k.box.parentNode).appendChild(a);
              a.style.pointerEvents = "auto"
            })
      }));
      this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
      d = this.chartWidth + this.scrollablePixels;
      a.stop(this.container);
      this.container.style.width = d + "px";
      this.renderer.boxWrapper.attr({
        width: d,
        height: this.chartHeight,
        viewBox: [0, 0, d, this.chartHeight].join(" ")
      });
      this.chartBackground.attr({width: d});
      q && (d = this.options.chart.scrollablePlotArea, d.scrollPositionX && (this.scrollingContainer.scrollLeft =
          this.scrollablePixels * d.scrollPositionX));
      q = this.axisOffset;
      d = this.plotTop - q[0] - 1;
      var q = this.plotTop + this.plotHeight + q[2], t = this.plotLeft + this.plotWidth - this.scrollablePixels;
      this.scrollableMask.attr({d: this.scrollablePixels ? ["M", 0, d, "L", this.plotLeft - 1, d, "L", this.plotLeft - 1, q, "L", 0, q, "Z", "M", t, d, "L", this.chartWidth, d, "L", this.chartWidth, q, "L", t, q, "Z"] : ["M", 0, 0]})
    }
  });
  K(F, "parts/Point.js", [F["parts/Globals.js"]], function (a) {
    var C, I = a.extend, H = a.erase, k = a.fireEvent, d = a.format, q = a.isArray, t = a.isNumber,
        u = a.pick, v = a.uniqueKey, p = a.defined, g = a.removeEvent;
    a.Point = C = function () {
    };
    a.Point.prototype = {
      init: function (a, d, g) {
        this.series = a;
        this.applyOptions(d, g);
        this.id = p(this.id) ? this.id : v();
        this.resolveColor();
        a.chart.pointCount++;
        k(this, "afterInit");
        return this
      }, resolveColor: function () {
        var a = this.series, d;
        d = a.chart.options.chart.colorCount;
        var g = a.chart.styledMode;
        g || this.options.color || (this.color = a.color);
        a.options.colorByPoint ? (g || (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter],
            d = d.length), g = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : g = a.colorIndex;
        this.colorIndex = u(this.colorIndex, g)
      }, applyOptions: function (a, d) {
        var e = this.series, b = e.options.pointValKey || e.pointValKey;
        a = C.prototype.optionsToObject.call(this, a);
        I(this, a);
        this.options = this.options ? I(this.options, a) : a;
        a.group && delete this.group;
        a.dataLabels && delete this.dataLabels;
        b && (this.y = this[b]);
        if (this.isNull = u(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0))) this.formatPrefix =
            "null";
        this.selected && (this.state = "select");
        "name" in this && void 0 === d && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
        void 0 === this.x && e && (this.x = void 0 === d ? e.autoIncrement(this) : d);
        return this
      }, setNestedProperty: function (e, d, g) {
        g.split(".").reduce(function (b, e, c, g) {
          b[e] = g.length - 1 === c ? d : a.isObject(b[e], !0) ? b[e] : {};
          return b[e]
        }, e);
        return e
      }, optionsToObject: function (e) {
        var d = {}, g = this.series, b = g.options.keys, f = b || g.pointArrayMap || ["y"], c = f.length, k = 0, r = 0;
        if (t(e) || null === e) d[f[0]] = e; else if (q(e)) for (!b &&
                                                                 e.length > c && (g = typeof e[0], "string" === g ? d.name = e[0] : "number" === g && (d.x = e[0]), k++); r < c;) b && void 0 === e[k] || (0 < f[r].indexOf(".") ? a.Point.prototype.setNestedProperty(d, e[k], f[r]) : d[f[r]] = e[k]), k++, r++; else "object" === typeof e && (d = e, e.dataLabels && (g._hasPointLabels = !0), e.marker && (g._hasPointMarkers = !0));
        return d
      }, getClassName: function () {
        return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ?
            " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
      }, getZone: function () {
        var a = this.series, d = a.zones, a = a.zoneAxis || "y", g = 0, b;
        for (b = d[g]; this[a] >= b.value;) b = d[++g];
        this.nonZonedColor || (this.nonZonedColor = this.color);
        this.color = b && b.color && !this.options.color ? b.color : this.nonZonedColor;
        return b
      }, destroy: function () {
        var a = this.series.chart, d = a.hoverPoints, l;
        a.pointCount--;
        d && (this.setState(), H(d, this), d.length || (a.hoverPoints = null));
        if (this === a.hoverPoint) this.onMouseOut();
        if (this.graphic || this.dataLabel || this.dataLabels) g(this), this.destroyElements();
        this.legendItem && a.legend.destroyItem(this);
        for (l in this) this[l] = null
      }, destroyElements: function (a) {
        var e = this, d = [], b, f;
        a = a || {graphic: 1, dataLabel: 1};
        a.graphic && d.push("graphic", "shadowGroup");
        a.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
        for (f = d.length; f--;) b = d[f], e[b] && (e[b] = e[b].destroy());
        ["dataLabel",
          "connector"].forEach(function (b) {
          var c = b + "s";
          a[b] && e[c] && (e[c].forEach(function (a) {
            a.element && a.destroy()
          }), delete e[c])
        })
      }, getLabelConfig: function () {
        return {
          x: this.category,
          y: this.y,
          color: this.color,
          colorIndex: this.colorIndex,
          key: this.name || this.category,
          series: this.series,
          point: this,
          percentage: this.percentage,
          total: this.total || this.stackTotal
        }
      }, tooltipFormatter: function (a) {
        var e = this.series, g = e.tooltipOptions, b = u(g.valueDecimals, ""), f = g.valuePrefix || "",
            c = g.valueSuffix || "";
        e.chart.styledMode && (a =
            e.chart.tooltip.styledModeFormat(a));
        (e.pointArrayMap || ["y"]).forEach(function (e) {
          e = "{point." + e;
          if (f || c) a = a.replace(RegExp(e + "}", "g"), f + e + "}" + c);
          a = a.replace(RegExp(e + "}", "g"), e + ":,." + b + "f}")
        });
        return d(a, {point: this, series: this.series}, e.chart.time)
      }, firePointEvent: function (a, d, g) {
        var b = this, e = this.series.options;
        (e.point.events[a] || b.options && b.options.events && b.options.events[a]) && this.importEvents();
        "click" === a && e.allowPointSelect && (g = function (a) {
          b.select && b.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
        });
        k(this, a, d, g)
      }, visible: !0
    }
  });
  K(F, "parts/Series.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.animObject, H = a.arrayMax, k = a.arrayMin, d = a.correctFloat, q = a.defaultOptions,
        t = a.defaultPlotOptions, u = a.defined, v = a.erase, p = a.extend, g = a.fireEvent, e = a.isArray,
        m = a.isNumber, l = a.isString, b = a.merge, f = a.objectEach, c = a.pick, w = a.removeEvent, r = a.splat,
        J = a.SVGElement, G = a.syncTimeout, B = a.win;
    a.Series = a.seriesType("line", null, {
      lineWidth: 2,
      allowPointSelect: !1,
      showCheckbox: !1,
      animation: {duration: 1E3},
      events: {},
      marker: {
        lineWidth: 0,
        lineColor: "#ffffff",
        enabledThreshold: 2,
        radius: 4,
        states: {
          normal: {animation: !0},
          hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
          select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
        }
      },
      point: {events: {}},
      dataLabels: {
        align: "center",
        formatter: function () {
          return null === this.y ? "" : a.numberFormat(this.y, -1)
        },
        padding: 5,
        style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
        verticalAlign: "bottom",
        x: 0,
        y: 0
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: {animation: !0},
        hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}},
        select: {animation: {duration: 0}},
        inactive: {animation: {duration: 50}, opacity: .2}
      },
      stickyTracking: !0,
      turboThreshold: 1E3,
      findNearestPointBy: "x"
    }, {
      isCartesian: !0,
      pointClass: a.Point,
      sorted: !0,
      requireSorting: !0,
      directTouch: !1,
      axisTypes: ["xAxis", "yAxis"],
      colorCounter: 0,
      parallelArrays: ["x", "y"],
      coll: "series",
      cropShoulder: 1,
      init: function (a, b) {
        g(this, "init", {options: b});
        var e = this, d, n = a.series, h;
        e.chart = a;
        e.options = b = e.setOptions(b);
        e.linkedSeries = [];
        e.bindAxes();
        p(e, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
        d = b.events;
        f(d, function (a, b) {
          e.hcEvents && e.hcEvents[b] && -1 !== e.hcEvents[b].indexOf(a) || C(e, b, a)
        });
        if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
        e.getColor();
        e.getSymbol();
        e.parallelArrays.forEach(function (a) {
          e[a + "Data"] || (e[a + "Data"] = [])
        });
        e.points || e.setData(b.data, !1);
        e.isCartesian &&
        (a.hasCartesianSeries = !0);
        n.length && (h = n[n.length - 1]);
        e._i = c(h && h._i, -1) + 1;
        a.orderSeries(this.insert(n));
        g(this, "afterInit")
      },
      insert: function (a) {
        var b = this.options.index, e;
        if (m(b)) {
          for (e = a.length; e--;) if (b >= c(a[e].options.index, a[e]._i)) {
            a.splice(e + 1, 0, this);
            break
          }
          -1 === e && a.unshift(this);
          e += 1
        } else a.push(this);
        return c(e, a.length - 1)
      },
      bindAxes: function () {
        var b = this, c = b.options, e = b.chart, d;
        g(this, "bindAxes", null, function () {
          (b.axisTypes || []).forEach(function (f) {
            e[f].forEach(function (a) {
              d = a.options;
              if (c[f] ===
                  d.index || void 0 !== c[f] && c[f] === d.id || void 0 === c[f] && 0 === d.index) b.insert(a.series), b[f] = a, a.isDirty = !0
            });
            b[f] || b.optionalAxis === f || a.error(18, !0, e)
          })
        })
      },
      updateParallelArrays: function (a, b) {
        var c = a.series, e = arguments, d = m(b) ? function (e) {
          var h = "y" === e && c.toYData ? c.toYData(a) : a[e];
          c[e + "Data"][b] = h
        } : function (a) {
          Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(e, 2))
        };
        c.parallelArrays.forEach(d)
      },
      hasData: function () {
        return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible &&
            this.yData && 0 < this.yData.length
      },
      autoIncrement: function () {
        var a = this.options, b = this.xIncrement, e, d = a.pointIntervalUnit, f = this.chart.time,
            b = c(b, a.pointStart, 0);
        this.pointInterval = e = c(this.pointInterval, a.pointInterval, 1);
        d && (a = new f.Date(b), "day" === d ? f.set("Date", a, f.get("Date", a) + e) : "month" === d ? f.set("Month", a, f.get("Month", a) + e) : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + e), e = a.getTime() - b);
        this.xIncrement = b + e;
        return b
      },
      setOptions: function (a) {
        var e = this.chart, d = e.options, f = d.plotOptions,
            n = (e.userOptions || {}).plotOptions || {}, h = f[this.type], l = b(a);
        a = e.styledMode;
        g(this, "setOptions", {userOptions: l});
        this.userOptions = l;
        e = b(h, f.series, l);
        this.tooltipOptions = b(q.tooltip, q.plotOptions.series && q.plotOptions.series.tooltip, q.plotOptions[this.type].tooltip, d.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, l.tooltip);
        this.stickyTracking = c(l.stickyTracking, n[this.type] && n[this.type].stickyTracking, n.series && n.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ?
            !0 : e.stickyTracking);
        null === h.marker && delete e.marker;
        this.zoneAxis = e.zoneAxis;
        d = this.zones = (e.zones || []).slice();
        !e.negativeColor && !e.negativeFillColor || e.zones || (f = {
          value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
          className: "highcharts-negative"
        }, a || (f.color = e.negativeColor, f.fillColor = e.negativeFillColor), d.push(f));
        d.length && u(d[d.length - 1].value) && d.push(a ? {} : {color: this.color, fillColor: this.fillColor});
        g(this, "afterSetOptions", {options: e});
        return e
      },
      getName: function () {
        return c(this.options.name,
            "Series " + (this.index + 1))
      },
      getCyclic: function (a, b, e) {
        var d, f = this.chart, h = this.userOptions, g = a + "Index", n = a + "Counter",
            l = e ? e.length : c(f.options.chart[a + "Count"], f[a + "Count"]);
        b || (d = c(h[g], h["_" + g]), u(d) || (f.series.length || (f[n] = 0), h["_" + g] = d = f[n] % l, f[n] += 1), e && (b = e[d]));
        void 0 !== d && (this[g] = d);
        this[a] = b
      },
      getColor: function () {
        this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
      },
      getSymbol: function () {
        this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
      },
      findPointIndex: function (a, b) {
        var c = a.id;
        a = a.x;
        var e = this.points, d, h;
        c && (h = (c = this.chart.get(c)) && c.index, void 0 !== h && (d = !0));
        void 0 === h && m(a) && (h = this.xData.indexOf(a, b));
        -1 !== h && void 0 !== h && this.cropped && (h = h >= this.cropStart ? h - this.cropStart : h);
        !d && e[h] && e[h].touched && (h = void 0);
        return h
      },
      drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
      updateData: function (b) {
        var c = this.options, e = this.points, d =
            [], f, h, g, n = this.requireSorting, l = b.length === e.length, k = !0;
        this.xIncrement = null;
        b.forEach(function (b, h) {
          var k, r = a.defined(b) && this.pointClass.prototype.optionsToObject.call({series: this}, b) || {};
          k = r.x;
          if (r.id || m(k)) if (k = this.findPointIndex(r, g), -1 === k || void 0 === k ? d.push(b) : e[k] && b !== c.data[k] ? (e[k].update(b, !1, null, !1), e[k].touched = !0, n && (g = k + 1)) : e[k] && (e[k].touched = !0), !l || h !== k || this.hasDerivedData) f = !0
        }, this);
        if (f) for (b = e.length; b--;) (h = e[b]) && !h.touched && h.remove(!1); else l ? b.forEach(function (a,
                                                                                                               b) {
          e[b].update && a !== e[b].y && e[b].update(a, !1, null, !1)
        }) : k = !1;
        e.forEach(function (a) {
          a && (a.touched = !1)
        });
        if (!k) return !1;
        d.forEach(function (a) {
          this.addPoint(a, !1, null, null, !1)
        }, this);
        return !0
      },
      setData: function (b, d, f, g) {
        var n = this, h = n.points, k = h && h.length || 0, r, E = n.options, p = n.chart, z = null, A = n.xAxis,
            w = E.turboThreshold, B = this.xData, q = this.yData, t = (r = n.pointArrayMap) && r.length, u = E.keys,
            G = 0, v = 1, J;
        b = b || [];
        r = b.length;
        d = c(d, !0);
        !1 !== g && r && k && !n.cropped && !n.hasGroupedData && n.visible && !n.isSeriesBoosting && (J =
            this.updateData(b));
        if (!J) {
          n.xIncrement = null;
          n.colorCounter = 0;
          this.parallelArrays.forEach(function (a) {
            n[a + "Data"].length = 0
          });
          if (w && r > w) {
            for (f = 0; null === z && f < r;) z = b[f], f++;
            if (m(z)) for (f = 0; f < r; f++) B[f] = this.autoIncrement(), q[f] = b[f]; else if (e(z)) if (t) for (f = 0; f < r; f++) z = b[f], B[f] = z[0], q[f] = z.slice(1, t + 1); else for (u && (G = u.indexOf("x"), v = u.indexOf("y"), G = 0 <= G ? G : 0, v = 0 <= v ? v : 1), f = 0; f < r; f++) z = b[f], B[f] = z[G], q[f] = z[v]; else a.error(12, !1, p)
          } else for (f = 0; f < r; f++) void 0 !== b[f] && (z = {series: n}, n.pointClass.prototype.applyOptions.apply(z,
              [b[f]]), n.updateParallelArrays(z, f));
          q && l(q[0]) && a.error(14, !0, p);
          n.data = [];
          n.options.data = n.userOptions.data = b;
          for (f = k; f--;) h[f] && h[f].destroy && h[f].destroy();
          A && (A.minRange = A.userMinRange);
          n.isDirty = p.isDirtyBox = !0;
          n.isDirtyData = !!h;
          f = !1
        }
        "point" === E.legendType && (this.processData(), this.generatePoints());
        d && p.redraw(f)
      },
      processData: function (b) {
        var c = this.xData, e = this.yData, d = c.length, f;
        f = 0;
        var h, g, n = this.xAxis, l, m = this.options;
        l = m.cropThreshold;
        var k = this.getExtremesFromAll || m.getExtremesFromAll,
            r = this.isCartesian, m = n && n.val2lin, p = n && n.isLog, w = this.requireSorting, B, q;
        if (r && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !b) return !1;
        n && (b = n.getExtremes(), B = b.min, q = b.max);
        r && this.sorted && !k && (!l || d > l || this.forceCrop) && (c[d - 1] < B || c[0] > q ? (c = [], e = []) : this.yData && (c[0] < B || c[d - 1] > q) && (f = this.cropData(this.xData, this.yData, B, q), c = f.xData, e = f.yData, f = f.start, h = !0));
        for (l = c.length || 1; --l;) d = p ? m(c[l]) - m(c[l - 1]) : c[l] - c[l - 1], 0 < d && (void 0 === g || d < g) ? g = d : 0 > d && w && (a.error(15, !1, this.chart), w = !1);
        this.cropped =
            h;
        this.cropStart = f;
        this.processedXData = c;
        this.processedYData = e;
        this.closestPointRange = g
      },
      cropData: function (a, b, e, d, f) {
        var h = a.length, g = 0, n = h, l;
        f = c(f, this.cropShoulder);
        for (l = 0; l < h; l++) if (a[l] >= e) {
          g = Math.max(0, l - f);
          break
        }
        for (e = l; e < h; e++) if (a[e] > d) {
          n = e + f;
          break
        }
        return {xData: a.slice(g, n), yData: b.slice(g, n), start: g, end: n}
      },
      generatePoints: function () {
        var a = this.options, b = a.data, c = this.data, e, d = this.processedXData, h = this.processedYData,
            f = this.pointClass, l = d.length, m = this.cropStart || 0, k, w = this.hasGroupedData,
            a = a.keys, B, q = [], t;
        c || w || (c = [], c.length = b.length, c = this.data = c);
        a && w && (this.options.keys = !1);
        for (t = 0; t < l; t++) k = m + t, w ? (B = (new f).init(this, [d[t]].concat(r(h[t]))), B.dataGroup = this.groupMap[t], B.dataGroup.options && (B.options = B.dataGroup.options, p(B, B.dataGroup.options), delete B.dataLabels)) : (B = c[k]) || void 0 === b[k] || (c[k] = B = (new f).init(this, b[k], d[t])), B && (B.index = k, q[t] = B);
        this.options.keys = a;
        if (c && (l !== (e = c.length) || w)) for (t = 0; t < e; t++) t !== m || w || (t += l), c[t] && (c[t].destroyElements(), c[t].plotX = void 0);
        this.data = c;
        this.points = q;
        g(this, "afterGeneratePoints")
      },
      getXExtremes: function (a) {
        return {min: k(a), max: H(a)}
      },
      getExtremes: function (a) {
        var b = this.yAxis, c = this.processedXData, d, f = [], h = 0;
        d = this.xAxis.getExtremes();
        var n = d.min, l = d.max, r, p, w = this.requireSorting ? this.cropShoulder : 0, B, q;
        a = a || this.stackedYData || this.processedYData || [];
        d = a.length;
        for (q = 0; q < d; q++) if (p = c[q], B = a[q], r = (m(B, !0) || e(B)) && (!b.positiveValuesOnly || B.length || 0 < B), p = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped ||
                (c[q + w] || p) >= n && (c[q - w] || p) <= l, r && p) if (r = B.length) for (; r--;) "number" === typeof B[r] && (f[h++] = B[r]); else f[h++] = B;
        this.dataMin = k(f);
        this.dataMax = H(f);
        g(this, "afterGetExtremes")
      },
      translate: function () {
        this.processedXData || this.processData();
        this.generatePoints();
        var a = this.options, b = a.stacking, f = this.xAxis, l = f.categories, k = this.yAxis, h = this.points,
            r = h.length, p = !!this.modifyValue, w, B = this.pointPlacementToXValue(), q = m(B), t = a.threshold,
            x = a.startFromThreshold ? t : 0, G, v, J, C, H = this.zoneAxis || "y", I = Number.MAX_VALUE;
        for (w = 0; w < r; w++) {
          var F = h[w], K = F.x;
          v = F.y;
          var V = F.low, N = b && k.stacks[(this.negStacks && v < (x ? 0 : t) ? "-" : "") + this.stackKey], W, Y;
          k.positiveValuesOnly && null !== v && 0 >= v && (F.isNull = !0);
          F.plotX = G = d(Math.min(Math.max(-1E5, f.translate(K, 0, 0, 0, 1, B, "flags" === this.type)), 1E5));
          b && this.visible && !F.isNull && N && N[K] && (C = this.getStackIndicator(C, K, this.index), W = N[K], Y = W.points[C.key]);
          e(Y) && (V = Y[0], v = Y[1], V === x && C.key === N[K].base && (V = c(m(t) && t, k.min)), k.positiveValuesOnly && 0 >= V && (V = null), F.total = F.stackTotal = W.total, F.percentage =
              W.total && F.y / W.total * 100, F.stackY = v, W.setOffset(this.pointXOffset || 0, this.barW || 0));
          F.yBottom = u(V) ? Math.min(Math.max(-1E5, k.translate(V, 0, 1, 0, 1)), 1E5) : null;
          p && (v = this.modifyValue(v, F));
          F.plotY = v = "number" === typeof v && Infinity !== v ? Math.min(Math.max(-1E5, k.translate(v, 0, 1, 0, 1)), 1E5) : void 0;
          F.isInside = void 0 !== v && 0 <= v && v <= k.len && 0 <= G && G <= f.len;
          F.clientX = q ? d(f.translate(K, 0, 0, 0, 1, B)) : G;
          F.negative = F[H] < (a[H + "Threshold"] || t || 0);
          F.category = l && void 0 !== l[F.x] ? l[F.x] : F.x;
          F.isNull || (void 0 !== J && (I = Math.min(I,
              Math.abs(G - J))), J = G);
          F.zone = this.zones.length && F.getZone()
        }
        this.closestPointRangePx = I;
        g(this, "afterTranslate")
      },
      getValidPoints: function (a, b, c) {
        var e = this.chart;
        return (a || this.points || []).filter(function (a) {
          return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : c || !a.isNull
        })
      },
      setClip: function (a) {
        var b = this.chart, c = this.options, e = b.renderer, d = b.inverted, h = this.clipBox, f = h || b.clipBox,
            g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(),
            n = b[g], l = b[g + "m"];
        n || (a && (f.width = 0, d && (f.x = b.plotSizeX), b[g + "m"] = l = e.clipRect(d ? b.plotSizeX + 99 : -99, d ? -b.plotLeft : -b.plotTop, 99, d ? b.chartWidth : b.chartHeight)), b[g] = n = e.clipRect(f), n.count = {length: 0});
        a && !n.count[this.index] && (n.count[this.index] = !0, n.count.length += 1);
        !1 !== c.clip && (this.group.clip(a || h ? n : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = g);
        a || (n.count[this.index] && (delete n.count[this.index], --n.count.length), 0 === n.count.length && g && b[g] && (h || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())))
      },
      animate: function (a) {
        var b = this.chart, c = I(this.options.animation), e;
        a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
          width: b.plotSizeX,
          x: 0
        }, c), b[e + "m"] && b[e + "m"].animate({
          width: b.plotSizeX + 99,
          x: b.inverted ? 0 : -99
        }, c), this.animate = null)
      },
      afterAnimate: function () {
        this.setClip();
        g(this, "afterAnimate");
        this.finishedAnimating = !0
      },
      drawPoints: function () {
        var a = this.points, b = this.chart, e, d, f, h, g, l = this.options.marker, m, k, r,
            p = this[this.specialGroup] || this.markerGroup;
        e = this.xAxis;
        var w, B = c(l.enabled,
            !e || e.isRadial ? !0 : null, this.closestPointRangePx >= l.enabledThreshold * l.radius);
        if (!1 !== l.enabled || this._hasPointMarkers) for (e = 0; e < a.length; e++) if (d = a[e], g = (h = d.graphic) ? "animate" : "attr", m = d.marker || {}, k = !!d.marker, f = B && void 0 === m.enabled || m.enabled, r = !1 !== d.isInside, f && !d.isNull) {
          f = c(m.symbol, this.symbol);
          w = this.markerAttribs(d, d.selected && "select");
          h ? h[r ? "show" : "hide"](!0).animate(w) : r && (0 < w.width || d.hasImage) && (d.graphic = h = b.renderer.symbol(f, w.x, w.y, w.width, w.height, k ? m : l).add(p));
          if (h && !b.styledMode) h[g](this.pointAttribs(d,
              d.selected && "select"));
          h && h.addClass(d.getClassName(), !0)
        } else h && (d.graphic = h.destroy())
      },
      markerAttribs: function (a, b) {
        var e = this.options.marker, d = a.marker || {}, f = d.symbol || e.symbol, h = c(d.radius, e.radius);
        b && (e = e.states[b], b = d.states && d.states[b], h = c(b && b.radius, e && e.radius, h + (e && e.radiusPlus || 0)));
        a.hasImage = f && 0 === f.indexOf("url");
        a.hasImage && (h = 0);
        a = {x: Math.floor(a.plotX) - h, y: a.plotY - h};
        h && (a.width = a.height = 2 * h);
        return a
      },
      pointAttribs: function (a, b) {
        var e = this.options.marker, d = a && a.options, f = d &&
            d.marker || {}, h = this.color, g = d && d.color, n = a && a.color, d = c(f.lineWidth, e.lineWidth),
            l = a && a.zone && a.zone.color;
        a = 1;
        h = g || l || n || h;
        g = f.fillColor || e.fillColor || h;
        h = f.lineColor || e.lineColor || h;
        b && (e = e.states[b], b = f.states && f.states[b] || {}, d = c(b.lineWidth, e.lineWidth, d + c(b.lineWidthPlus, e.lineWidthPlus, 0)), g = b.fillColor || e.fillColor || g, h = b.lineColor || e.lineColor || h, a = c(b.opacity, e.opacity, a));
        return {stroke: h, "stroke-width": d, fill: g, opacity: a}
      },
      destroy: function (b) {
        var c = this, e = c.chart, d = /AppleWebKit\/533/.test(B.navigator.userAgent),
            n, h, l = c.data || [], m, k;
        g(c, "destroy");
        b || w(c);
        (c.axisTypes || []).forEach(function (a) {
          (k = c[a]) && k.series && (v(k.series, c), k.isDirty = k.forceRedraw = !0)
        });
        c.legendItem && c.chart.legend.destroyItem(c);
        for (h = l.length; h--;) (m = l[h]) && m.destroy && m.destroy();
        c.points = null;
        a.clearTimeout(c.animationTimeout);
        f(c, function (a, b) {
          a instanceof J && !a.survive && (n = d && "group" === b ? "hide" : "destroy", a[n]())
        });
        e.hoverSeries === c && (e.hoverSeries = null);
        v(e.series, c);
        e.orderSeries();
        f(c, function (a, e) {
          b && "hcEvents" === e || delete c[e]
        })
      },
      getGraphPath: function (a, b, c) {
        var e = this, d = e.options, h = d.step, f, g = [], n = [], l;
        a = a || e.points;
        (f = a.reversed) && a.reverse();
        (h = {right: 1, center: 2}[h] || h && 3) && f && (h = 4 - h);
        !d.connectNulls || b || c || (a = this.getValidPoints(a));
        a.forEach(function (f, m) {
          var k = f.plotX, r = f.plotY, p = a[m - 1];
          (f.leftCliff || p && p.rightCliff) && !c && (l = !0);
          f.isNull && !u(b) && 0 < m ? l = !d.connectNulls : f.isNull && !b ? l = !0 : (0 === m || l ? m = ["M", f.plotX, f.plotY] : e.getPointSpline ? m = e.getPointSpline(a, f, m) : h ? (m = 1 === h ? ["L", p.plotX, r] : 2 === h ? ["L", (p.plotX + k) / 2, p.plotY,
            "L", (p.plotX + k) / 2, r] : ["L", k, p.plotY], m.push("L", k, r)) : m = ["L", k, r], n.push(f.x), h && (n.push(f.x), 2 === h && n.push(f.x)), g.push.apply(g, m), l = !1)
        });
        g.xMap = n;
        return e.graphPath = g
      },
      drawGraph: function () {
        var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this),
            e = this.chart.styledMode, d = [["graph", "highcharts-graph"]];
        e || d[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
        d = a.getZonesGraphs(d);
        d.forEach(function (d, f) {
          var h = d[0], g = a[h], n = g ? "animate" : "attr";
          g ? (g.endX = a.preventGraphAnimation ?
              null : c.xMap, g.animate({d: c})) : c.length && (a[h] = g = a.chart.renderer.path(c).addClass(d[1]).attr({zIndex: 1}).add(a.group));
          g && !e && (h = {
            stroke: d[2],
            "stroke-width": b.lineWidth,
            fill: a.fillGraph && a.color || "none"
          }, d[3] ? h.dashstyle = d[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), g[n](h).shadow(2 > f && b.shadow));
          g && (g.startX = c.xMap, g.isArea = c.isArea)
        })
      },
      getZonesGraphs: function (a) {
        this.zones.forEach(function (b, c) {
          c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className ||
              "")];
          this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
          a.push(c)
        }, this);
        return a
      },
      applyZones: function () {
        var a = this, b = this.chart, e = b.renderer, d = this.zones, f, h, g = this.clips || [], l, m = this.graph,
            k = this.area, r = Math.max(b.chartWidth, b.chartHeight), p = this[(this.zoneAxis || "y") + "Axis"], w, B,
            q = b.inverted, t, u, G, v, J = !1;
        d.length && (m || k) && p && void 0 !== p.min && (B = p.reversed, t = p.horiz, m && !this.showLine && m.hide(), k && k.hide(), w = p.getExtremes(), d.forEach(function (d, n) {
          f = B ? t ? b.plotWidth :
              0 : t ? 0 : p.toPixels(w.min) || 0;
          f = Math.min(Math.max(c(h, f), 0), r);
          h = Math.min(Math.max(Math.round(p.toPixels(c(d.value, w.max), !0) || 0), 0), r);
          J && (f = h = p.toPixels(w.max));
          u = Math.abs(f - h);
          G = Math.min(f, h);
          v = Math.max(f, h);
          p.isXAxis ? (l = {x: q ? v : G, y: 0, width: u, height: r}, t || (l.x = b.plotHeight - l.x)) : (l = {
            x: 0,
            y: q ? v : G,
            width: r,
            height: u
          }, t && (l.y = b.plotWidth - l.y));
          q && e.isVML && (l = p.isXAxis ? {
            x: 0,
            y: B ? G : v,
            height: l.width,
            width: b.chartWidth
          } : {x: l.y - b.plotLeft - b.spacingBox.x, y: 0, width: l.height, height: b.chartHeight});
          g[n] ? g[n].animate(l) :
              (g[n] = e.clipRect(l), m && a["zone-graph-" + n].clip(g[n]), k && a["zone-area-" + n].clip(g[n]));
          J = d.value > w.max;
          a.resetZones && 0 === h && (h = void 0)
        }), this.clips = g)
      },
      invertGroups: function (a) {
        function b() {
          ["group", "markerGroup"].forEach(function (b) {
            c[b] && (e.renderer.isVML && c[b].attr({
              width: c.yAxis.len,
              height: c.xAxis.len
            }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
          })
        }

        var c = this, e = c.chart, d;
        c.xAxis && (d = C(e, "resize", b), C(c, "destroy", d), b(a), c.invertGroups = b)
      },
      plotGroup: function (a, b, c, e, d) {
        var h =
            this[a], f = !h;
        f && (this[a] = h = this.chart.renderer.g().attr({zIndex: e || .1}).add(d));
        h.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (u(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (h.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
        h.attr({visibility: c})[f ? "attr" : "animate"](this.getPlotBox());
        return h
      },
      getPlotBox: function () {
        var a = this.chart, b = this.xAxis, c = this.yAxis;
        a.inverted && (b = c, c = this.xAxis);
        return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
      },
      render: function () {
        var a = this, b = a.chart, c, e = a.options, d = !!a.animate && b.renderer.isSVG && I(e.animation).duration,
            h = a.visible ? "inherit" : "hidden", f = e.zIndex, l = a.hasRendered, m = b.seriesGroup, k = b.inverted;
        g(this, "render");
        c = a.plotGroup("group", "series", h, f, m);
        a.markerGroup = a.plotGroup("markerGroup", "markers", h, f, m);
        d && a.animate(!0);
        c.inverted = a.isCartesian || a.invertable ? k : !1;
        a.drawGraph && (a.drawGraph(), a.applyZones());
        a.visible && a.drawPoints();
        a.drawDataLabels && a.drawDataLabels();
        a.redrawPoints && a.redrawPoints();
        a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
        a.invertGroups(k);
        !1 === e.clip || a.sharedClipKey || l || c.clip(b.clipRect);
        d && a.animate();
        l || (a.animationTimeout = G(function () {
          a.afterAnimate()
        }, d));
        a.isDirty = !1;
        a.hasRendered = !0;
        g(a, "afterRender")
      },
      redraw: function () {
        var a = this.chart, b = this.isDirty || this.isDirtyData, e = this.group, d = this.xAxis, f = this.yAxis;
        e && (a.inverted && e.attr({
          width: a.plotWidth,
          height: a.plotHeight
        }), e.animate({translateX: c(d && d.left, a.plotLeft), translateY: c(f && f.top, a.plotTop)}));
        this.translate();
        this.render();
        b && delete this.kdTree
      },
      kdAxisArray: ["clientX", "plotY"],
      searchPoint: function (a, b) {
        var c = this.xAxis, e = this.yAxis, d = this.chart.inverted;
        return this.searchKDTree({
          clientX: d ? c.len - a.chartY + c.pos : a.chartX - c.pos,
          plotY: d ? e.len - a.chartX + e.pos : a.chartY - e.pos
        }, b, a)
      },
      buildKDTree: function (a) {
        function b(a, e, d) {
          var f, h;
          if (h = a && a.length) return f = c.kdAxisArray[e % d], a.sort(function (a,
                                                                                   b) {
            return a[f] - b[f]
          }), h = Math.floor(h / 2), {point: a[h], left: b(a.slice(0, h), e + 1, d), right: b(a.slice(h + 1), e + 1, d)}
        }

        this.buildingKdTree = !0;
        var c = this, e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
        delete c.kdTree;
        G(function () {
          c.kdTree = b(c.getValidPoints(null, !c.directTouch), e, e);
          c.buildingKdTree = !1
        }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
      },
      searchKDTree: function (a, b, c) {
        function e(a, b, c, h) {
          var n = b.point, m = d.kdAxisArray[c % h], k, r, p = n;
          r = u(a[f]) && u(n[f]) ? Math.pow(a[f] - n[f], 2) : null;
          k = u(a[g]) && u(n[g]) ?
              Math.pow(a[g] - n[g], 2) : null;
          k = (r || 0) + (k || 0);
          n.dist = u(k) ? Math.sqrt(k) : Number.MAX_VALUE;
          n.distX = u(r) ? Math.sqrt(r) : Number.MAX_VALUE;
          m = a[m] - n[m];
          k = 0 > m ? "left" : "right";
          r = 0 > m ? "right" : "left";
          b[k] && (k = e(a, b[k], c + 1, h), p = k[l] < p[l] ? k : n);
          b[r] && Math.sqrt(m * m) < p[l] && (a = e(a, b[r], c + 1, h), p = a[l] < p[l] ? a : p);
          return p
        }

        var d = this, f = this.kdAxisArray[0], g = this.kdAxisArray[1], l = b ? "distX" : "dist";
        b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
        this.kdTree || this.buildingKdTree || this.buildKDTree(c);
        if (this.kdTree) return e(a,
            this.kdTree, b, b)
      },
      pointPlacementToXValue: function () {
        var a = this.options.pointPlacement;
        "between" === a && (a = .5);
        m(a) && (a *= c(this.options.pointRange || this.xAxis.pointRange));
        return a
      }
    })
  });
  K(F, "parts/Stacking.js", [F["parts/Globals.js"]], function (a) {
    var C = a.Axis, I = a.Chart, H = a.correctFloat, k = a.defined, d = a.destroyObjectProperties, q = a.format,
        t = a.objectEach, u = a.pick, v = a.Series;
    a.StackItem = function (a, d, e, m, l) {
      var b = a.chart.inverted;
      this.axis = a;
      this.isNegative = e;
      this.options = d;
      this.x = m;
      this.total = null;
      this.points =
          {};
      this.stack = l;
      this.rightCliff = this.leftCliff = 0;
      this.alignOptions = {
        align: d.align || (b ? e ? "left" : "right" : "center"),
        verticalAlign: d.verticalAlign || (b ? "middle" : e ? "bottom" : "top"),
        y: u(d.y, b ? 4 : e ? 14 : -6),
        x: u(d.x, b ? e ? -6 : 6 : 0)
      };
      this.textAlign = d.textAlign || (b ? e ? "right" : "left" : "center")
    };
    a.StackItem.prototype = {
      destroy: function () {
        d(this, this.axis)
      }, render: function (a) {
        var d = this.axis.chart, e = this.options, m = e.format, m = m ? q(m, this, d.time) : e.formatter.call(this);
        this.label ? this.label.attr({text: m, visibility: "hidden"}) :
            this.label = d.renderer.text(m, null, null, e.useHTML).css(e.style).attr({
              align: this.textAlign,
              rotation: e.rotation,
              visibility: "hidden"
            }).add(a);
        this.label.labelrank = d.plotHeight
      }, setOffset: function (a, d) {
        var e = this.axis, g = e.chart, l = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
            b = e.translate(0), b = k(l) && Math.abs(l - b);
        a = g.xAxis[0].translate(this.x) + a;
        e = k(l) && this.getStackBox(g, this, a, l, d, b, e);
        (d = this.label) && e && (d.align(this.alignOptions, null, e), e = d.alignAttr, d[!1 === this.options.crop || g.isInsidePlot(e.x,
            e.y) ? "show" : "hide"](!0))
      }, getStackBox: function (a, d, e, m, l, b, f) {
        var c = d.axis.reversed, g = a.inverted;
        a = f.height + f.pos - (g ? a.plotLeft : a.plotTop);
        d = d.isNegative && !c || !d.isNegative && c;
        return {x: g ? d ? m : m - b : e, y: g ? a - e - l : d ? a - m - b : a - m, width: g ? b : l, height: g ? l : b}
      }
    };
    I.prototype.getStacks = function () {
      var a = this;
      a.yAxis.forEach(function (a) {
        a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
      });
      a.series.forEach(function (d) {
        !d.options.stacking || !0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries || (d.stackKey = d.type + u(d.options.stack,
            ""))
      })
    };
    C.prototype.buildStacks = function () {
      var a = this.series, d = u(this.options.reversedStacks, !0), e = a.length, m;
      if (!this.isXAxis) {
        this.usePercentage = !1;
        for (m = e; m--;) a[d ? m : e - m - 1].setStackedPoints();
        for (m = 0; m < e; m++) a[m].modifyStacks()
      }
    };
    C.prototype.renderStackTotals = function () {
      var a = this.chart, d = a.renderer, e = this.stacks, m = this.stackTotalGroup;
      m || (this.stackTotalGroup = m = d.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
      m.translate(a.plotLeft, a.plotTop);
      t(e, function (a) {
        t(a, function (a) {
          a.render(m)
        })
      })
    };
    C.prototype.resetStacks = function () {
      var a = this, d = a.stacks;
      a.isXAxis || t(d, function (e) {
        t(e, function (d, g) {
          d.touched < a.stacksTouched ? (d.destroy(), delete e[g]) : (d.total = null, d.cumulative = null)
        })
      })
    };
    C.prototype.cleanStacks = function () {
      var a;
      this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), t(a, function (a) {
        t(a, function (a) {
          a.cumulative = a.total
        })
      }))
    };
    v.prototype.setStackedPoints = function () {
      if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
        var d = this.processedXData,
            g = this.processedYData, e = [], m = g.length, l = this.options, b = l.threshold,
            f = u(l.startFromThreshold && b, 0), c = l.stack, l = l.stacking, w = this.stackKey, r = "-" + w,
            q = this.negStacks, t = this.yAxis, B = t.stacks, n = t.oldStacks, E, z, A, D, h, y, v;
        t.stacksTouched += 1;
        for (h = 0; h < m; h++) y = d[h], v = g[h], E = this.getStackIndicator(E, y, this.index), D = E.key, A = (z = q && v < (f ? 0 : b)) ? r : w, B[A] || (B[A] = {}), B[A][y] || (n[A] && n[A][y] ? (B[A][y] = n[A][y], B[A][y].total = null) : B[A][y] = new a.StackItem(t, t.options.stackLabels, z, y, c)), A = B[A][y], null !== v ? (A.points[D] = A.points[this.index] =
            [u(A.cumulative, f)], k(A.cumulative) || (A.base = D), A.touched = t.stacksTouched, 0 < E.index && !1 === this.singleStacks && (A.points[D][0] = A.points[this.index + "," + y + ",0"][0])) : A.points[D] = A.points[this.index] = null, "percent" === l ? (z = z ? w : r, q && B[z] && B[z][y] ? (z = B[z][y], A.total = z.total = Math.max(z.total, A.total) + Math.abs(v) || 0) : A.total = H(A.total + (Math.abs(v) || 0))) : A.total = H(A.total + (v || 0)), A.cumulative = u(A.cumulative, f) + (v || 0), null !== v && (A.points[D].push(A.cumulative), e[h] = A.cumulative);
        "percent" === l && (t.usePercentage =
            !0);
        this.stackedYData = e;
        t.oldStacks = {}
      }
    };
    v.prototype.modifyStacks = function () {
      var a = this, d = a.stackKey, e = a.yAxis.stacks, m = a.processedXData, l, b = a.options.stacking;
      a[b + "Stacker"] && [d, "-" + d].forEach(function (d) {
        for (var c = m.length, f, g; c--;) if (f = m[c], l = a.getStackIndicator(l, f, a.index, d), g = (f = e[d] && e[d][f]) && f.points[l.key]) a[b + "Stacker"](g, f, c)
      })
    };
    v.prototype.percentStacker = function (a, d, e) {
      d = d.total ? 100 / d.total : 0;
      a[0] = H(a[0] * d);
      a[1] = H(a[1] * d);
      this.stackedYData[e] = a[1]
    };
    v.prototype.getStackIndicator = function (a,
                                              d, e, m) {
      !k(a) || a.x !== d || m && a.key !== m ? a = {x: d, index: 0, key: m} : a.index++;
      a.key = [e, d, a.index].join();
      return a
    }
  });
  K(F, "parts/Dynamics.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, I = a.animate, H = a.Axis, k = a.Chart, d = a.createElement, q = a.css, t = a.defined,
        u = a.erase, v = a.extend, p = a.fireEvent, g = a.isNumber, e = a.isObject, m = a.isArray, l = a.merge,
        b = a.objectEach, f = a.pick, c = a.Point, w = a.Series, r = a.seriesTypes, J = a.setAnimation, G = a.splat;
    a.cleanRecursively = function (c, d) {
      var f = {};
      b(c, function (b, g) {
        if (e(c[g], !0) && d[g]) b =
            a.cleanRecursively(c[g], d[g]), Object.keys(b).length && (f[g] = b); else if (e(c[g]) || c[g] !== d[g]) f[g] = c[g]
      });
      return f
    };
    v(k.prototype, {
      addSeries: function (a, b, c) {
        var e, d = this;
        a && (b = f(b, !0), p(d, "addSeries", {options: a}, function () {
          e = d.initSeries(a);
          d.isDirtyLegend = !0;
          d.linkSeries();
          p(d, "afterAddSeries", {series: e});
          b && d.redraw(c)
        }));
        return e
      },
      addAxis: function (a, b, c, e) {
        var d = b ? "xAxis" : "yAxis", g = this.options;
        a = l(a, {index: this[d].length, isX: b});
        b = new H(this, a);
        g[d] = G(g[d] || {});
        g[d].push(a);
        f(c, !0) && this.redraw(e);
        return b
      },
      showLoading: function (a) {
        var b = this, c = b.options, e = b.loadingDiv, f = c.loading, g = function () {
          e && q(e, {
            left: b.plotLeft + "px",
            top: b.plotTop + "px",
            width: b.plotWidth + "px",
            height: b.plotHeight + "px"
          })
        };
        e || (b.loadingDiv = e = d("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = d("span", {className: "highcharts-loading-inner"}, null, e), C(b, "redraw", g));
        e.className = "highcharts-loading";
        b.loadingSpan.innerHTML = a || c.lang.loading;
        b.styledMode || (q(e, v(f.style, {zIndex: 10})),
            q(b.loadingSpan, f.labelStyle), b.loadingShown || (q(e, {
          opacity: 0,
          display: ""
        }), I(e, {opacity: f.style.opacity || .5}, {duration: f.showDuration || 0})));
        b.loadingShown = !0;
        g()
      },
      hideLoading: function () {
        var a = this.options, b = this.loadingDiv;
        b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || I(b, {opacity: 0}, {
          duration: a.loading.hideDuration || 100,
          complete: function () {
            q(b, {display: "none"})
          }
        }));
        this.loadingShown = !1
      },
      propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
      propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
      collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
      update: function (c, e, d, m) {
        var n = this, k = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, h, r, w, q = [];
        p(n, "update", {options: c});
        c.isResponsiveOptions || n.setResponsive(!1, !0);
        c = a.cleanRecursively(c, n.options);
        if (h = c.chart) {
          l(!0, n.options.chart, h);
          "className" in h && n.setClassName(h.className);
          "reflow" in h && n.setReflow(h.reflow);
          if ("inverted" in h || "polar" in h || "type" in h) n.propFromSeries(), r = !0;
          "alignTicks" in h && (r = !0);
          b(h, function (a, b) {
            -1 !== n.propsRequireUpdateSeries.indexOf("chart." + b) && (w = !0);
            -1 !== n.propsRequireDirtyBox.indexOf(b) && (n.isDirtyBox = !0)
          });
          !n.styledMode && "style" in h && n.renderer.setStyle(h.style)
        }
        !n.styledMode && c.colors && (this.options.colors = c.colors);
        c.plotOptions && l(!0, this.options.plotOptions, c.plotOptions);
        b(c, function (a, b) {
          if (n[b] && "function" === typeof n[b].update) n[b].update(a,
              !1); else if ("function" === typeof n[k[b]]) n[k[b]](a);
          "chart" !== b && -1 !== n.propsRequireUpdateSeries.indexOf(b) && (w = !0)
        });
        this.collectionsWithUpdate.forEach(function (a) {
          var b;
          c[a] && ("series" === a && (b = [], n[a].forEach(function (a, c) {
            a.options.isInternal || b.push(f(a.options.index, c))
          })), G(c[a]).forEach(function (c, e) {
            (e = t(c.id) && n.get(c.id) || n[a][b ? b[e] : e]) && e.coll === a && (e.update(c, !1), d && (e.touched = !0));
            if (!e && d) if ("series" === a) n.addSeries(c, !1).touched = !0; else if ("xAxis" === a || "yAxis" === a) n.addAxis(c, "xAxis" ===
                a, !1).touched = !0
          }), d && n[a].forEach(function (a) {
            a.touched || a.options.isInternal ? delete a.touched : q.push(a)
          }))
        });
        q.forEach(function (a) {
          a.remove && a.remove(!1)
        });
        r && n.axes.forEach(function (a) {
          a.update({}, !1)
        });
        w && n.series.forEach(function (a) {
          a.update({}, !1)
        });
        c.loading && l(!0, n.options.loading, c.loading);
        r = h && h.width;
        h = h && h.height;
        a.isString(h) && (h = a.relativeLength(h, r || n.chartWidth));
        g(r) && r !== n.chartWidth || g(h) && h !== n.chartHeight ? n.setSize(r, h, m) : f(e, !0) && n.redraw(m);
        p(n, "afterUpdate", {
          options: c, redraw: e,
          animation: m
        })
      },
      setSubtitle: function (a) {
        this.setTitle(void 0, a)
      }
    });
    v(c.prototype, {
      update: function (a, b, c, d) {
        function g() {
          l.applyOptions(a);
          null === l.y && n && (l.graphic = n.destroy());
          e(a, !0) && (n && n.element && a && a.marker && void 0 !== a.marker.symbol && (l.graphic = n.destroy()), a && a.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()), l.connector && (l.connector = l.connector.destroy()));
          m = l.index;
          h.updateParallelArrays(l, m);
          r.data[m] = e(r.data[m], !0) || e(a, !0) ? l.options : f(a, r.data[m]);
          h.isDirty = h.isDirtyData =
              !0;
          !h.fixedBox && h.hasCartesianSeries && (k.isDirtyBox = !0);
          "point" === r.legendType && (k.isDirtyLegend = !0);
          b && k.redraw(c)
        }

        var l = this, h = l.series, n = l.graphic, m, k = h.chart, r = h.options;
        b = f(b, !0);
        !1 === d ? g() : l.firePointEvent("update", {options: a}, g)
      }, remove: function (a, b) {
        this.series.removePoint(this.series.data.indexOf(this), a, b)
      }
    });
    v(w.prototype, {
      addPoint: function (a, b, c, e, d) {
        var g = this.options, h = this.data, l = this.chart, n = this.xAxis, n = n && n.hasNames && n.names, m = g.data,
            k, r, w = this.xData, q, t;
        b = f(b, !0);
        k = {series: this};
        this.pointClass.prototype.applyOptions.apply(k, [a]);
        t = k.x;
        q = w.length;
        if (this.requireSorting && t < w[q - 1]) for (r = !0; q && w[q - 1] > t;) q--;
        this.updateParallelArrays(k, "splice", q, 0, 0);
        this.updateParallelArrays(k, q);
        n && k.name && (n[t] = k.name);
        m.splice(q, 0, a);
        r && (this.data.splice(q, 0, null), this.processData());
        "point" === g.legendType && this.generatePoints();
        c && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(k, "shift"), m.shift()));
        !1 !== d && p(this, "addPoint", {point: k});
        this.isDirtyData = this.isDirty =
            !0;
        b && l.redraw(e)
      }, removePoint: function (a, b, c) {
        var e = this, d = e.data, g = d[a], h = e.points, l = e.chart, n = function () {
          h && h.length === d.length && h.splice(a, 1);
          d.splice(a, 1);
          e.options.data.splice(a, 1);
          e.updateParallelArrays(g || {series: e}, "splice", a, 1);
          g && g.destroy();
          e.isDirty = !0;
          e.isDirtyData = !0;
          b && l.redraw()
        };
        J(c, l);
        b = f(b, !0);
        g ? g.firePointEvent("remove", null, n) : n()
      }, remove: function (a, b, c, e) {
        function d() {
          g.destroy(e);
          g.remove = null;
          h.isDirtyLegend = h.isDirtyBox = !0;
          h.linkSeries();
          f(a, !0) && h.redraw(b)
        }

        var g = this, h =
            g.chart;
        !1 !== c ? p(g, "remove", null, d) : d()
      }, update: function (b, c) {
        b = a.cleanRecursively(b, this.userOptions);
        p(this, "update", {options: b});
        var e = this, d = e.chart, g = e.userOptions, n, h = e.initialType || e.type,
            m = b.type || g.type || d.options.chart.type,
            k = !(this.hasDerivedData || b.dataGrouping || m && m !== this.type || void 0 !== b.pointStart || b.pointInterval || b.pointIntervalUnit || b.keys),
            w = r[h].prototype, q, t = ["group", "markerGroup", "dataLabelsGroup"],
            B = ["navigatorSeries", "baseSeries"], u = e.finishedAnimating && {animation: !1}, G = {};
        k && (B.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement"), !1 !== b.visible && B.push("area", "graph"), e.parallelArrays.forEach(function (a) {
          B.push(a + "Data")
        }), b.data && this.setData(b.data, !1));
        b = l(g, u, {
          index: void 0 === g.index ? e.index : g.index,
          pointStart: f(g.pointStart, e.xData[0])
        }, !k && {data: e.options.data}, b);
        B = t.concat(B);
        B.forEach(function (a) {
          B[a] = e[a];
          delete e[a]
        });
        e.remove(!1, null, !1, !0);
        for (q in w) e[q] = void 0;
        r[m || h] ? v(e, r[m || h].prototype) : a.error(17, !0, d);
        B.forEach(function (a) {
          e[a] =
              B[a]
        });
        e.init(d, b);
        k && this.points && (n = e.options, !1 === n.visible ? (G.graphic = 1, G.dataLabel = 1) : (n.marker && !1 === n.marker.enabled && (G.graphic = 1), n.dataLabels && !1 === n.dataLabels.enabled && (G.dataLabel = 1)), this.points.forEach(function (a) {
          a && a.series && (a.resolveColor(), Object.keys(G).length && a.destroyElements(G), !1 === n.showInLegend && a.legendItem && d.legend.destroyItem(a))
        }, this));
        b.zIndex !== g.zIndex && t.forEach(function (a) {
          e[a] && e[a].attr({zIndex: b.zIndex})
        });
        e.initialType = h;
        d.linkSeries();
        p(this, "afterUpdate");
        f(c, !0) && d.redraw(k ? void 0 : !1)
      }, setName: function (a) {
        this.name = this.options.name = this.userOptions.name = a;
        this.chart.isDirtyLegend = !0
      }
    });
    v(H.prototype, {
      update: function (a, c) {
        var e = this.chart, d = a && a.events || {};
        a = l(this.userOptions, a);
        e.options[this.coll].indexOf && (e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)] = a);
        b(e.options[this.coll].events, function (a, b) {
          "undefined" === typeof d[b] && (d[b] = void 0)
        });
        this.destroy(!0);
        this.init(e, v(a, {events: d}));
        e.isDirtyBox = !0;
        f(c, !0) && e.redraw()
      },
      remove: function (a) {
        for (var b = this.chart, c = this.coll, e = this.series, d = e.length; d--;) e[d] && e[d].remove(!1);
        u(b.axes, this);
        u(b[c], this);
        m(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
        b[c].forEach(function (a, b) {
          a.options.index = a.userOptions.index = b
        });
        this.destroy();
        b.isDirtyBox = !0;
        f(a, !0) && b.redraw()
      }, setTitle: function (a, b) {
        this.update({title: a}, b)
      }, setCategories: function (a, b) {
        this.update({categories: a}, b)
      }
    })
  });
  K(F, "parts/AreaSeries.js", [F["parts/Globals.js"]], function (a) {
    var C =
        a.color, I = a.pick, H = a.Series, k = a.seriesType;
    k("area", "line", {softThreshold: !1, threshold: 0}, {
      singleStacks: !1, getStackPoints: function (d) {
        var k = [], t = [], u = this.xAxis, v = this.yAxis, p = v.stacks[this.stackKey], g = {}, e = this.index,
            m = v.series, l = m.length, b, f = I(v.options.reversedStacks, !0) ? 1 : -1, c;
        d = d || this.points;
        if (this.options.stacking) {
          for (c = 0; c < d.length; c++) d[c].leftNull = d[c].rightNull = null, g[d[c].x] = d[c];
          a.objectEach(p, function (a, b) {
            null !== a.total && t.push(b)
          });
          t.sort(function (a, b) {
            return a - b
          });
          b = m.map(function (a) {
            return a.visible
          });
          t.forEach(function (a, d) {
            var m = 0, r, w;
            if (g[a] && !g[a].isNull) k.push(g[a]), [-1, 1].forEach(function (n) {
              var m = 1 === n ? "rightNull" : "leftNull", k = 0, q = p[t[d + n]];
              if (q) for (c = e; 0 <= c && c < l;) r = q.points[c], r || (c === e ? g[a][m] = !0 : b[c] && (w = p[a].points[c]) && (k -= w[1] - w[0])), c += f;
              g[a][1 === n ? "rightCliff" : "leftCliff"] = k
            }); else {
              for (c = e; 0 <= c && c < l;) {
                if (r = p[a].points[c]) {
                  m = r[1];
                  break
                }
                c += f
              }
              m = v.translate(m, 0, 1, 0, 1);
              k.push({isNull: !0, plotX: u.translate(a, 0, 0, 0, 1), x: a, plotY: m, yBottom: m})
            }
          })
        }
        return k
      }, getGraphPath: function (a) {
        var d = H.prototype.getGraphPath,
            k = this.options, u = k.stacking, v = this.yAxis, p, g, e = [], m = [], l = this.index, b,
            f = v.stacks[this.stackKey], c = k.threshold, w = v.getThreshold(k.threshold), r,
            k = k.connectNulls || "percent" === u, J = function (d, g, n) {
              var k = a[d];
              d = u && f[k.x].points[l];
              var r = k[n + "Null"] || 0;
              n = k[n + "Cliff"] || 0;
              var p, q, k = !0;
              n || r ? (p = (r ? d[0] : d[1]) + n, q = d[0] + n, k = !!r) : !u && a[g] && a[g].isNull && (p = q = c);
              void 0 !== p && (m.push({
                plotX: b,
                plotY: null === p ? w : v.getThreshold(p),
                isNull: k,
                isCliff: !0
              }), e.push({plotX: b, plotY: null === q ? w : v.getThreshold(q), doCurve: !1}))
            };
        a =
            a || this.points;
        u && (a = this.getStackPoints(a));
        for (p = 0; p < a.length; p++) if (g = a[p].isNull, b = I(a[p].rectPlotX, a[p].plotX), r = I(a[p].yBottom, w), !g || k) k || J(p, p - 1, "left"), g && !u && k || (m.push(a[p]), e.push({
          x: p,
          plotX: b,
          plotY: r
        })), k || J(p, p + 1, "right");
        p = d.call(this, m, !0, !0);
        e.reversed = !0;
        g = d.call(this, e, !0, !0);
        g.length && (g[0] = "L");
        g = p.concat(g);
        d = d.call(this, m, !1, k);
        g.xMap = p.xMap;
        this.areaPath = g;
        return d
      }, drawGraph: function () {
        this.areaPath = [];
        H.prototype.drawGraph.apply(this);
        var a = this, k = this.areaPath, t = this.options,
            u = [["area", "highcharts-area", this.color, t.fillColor]];
        this.zones.forEach(function (d, k) {
          u.push(["zone-area-" + k, "highcharts-area highcharts-zone-area-" + k + " " + d.className, d.color || a.color, d.fillColor || t.fillColor])
        });
        u.forEach(function (d) {
          var p = d[0], g = a[p], e = g ? "animate" : "attr", m = {};
          g ? (g.endX = a.preventGraphAnimation ? null : k.xMap, g.animate({d: k})) : (m.zIndex = 0, g = a[p] = a.chart.renderer.path(k).addClass(d[1]).add(a.group), g.isArea = !0);
          a.chart.styledMode || (m.fill = I(d[3], C(d[2]).setOpacity(I(t.fillOpacity, .75)).get()));
          g[e](m);
          g.startX = k.xMap;
          g.shiftUnit = t.step ? 2 : 1
        })
      }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
    })
  });
  K(F, "parts/SplineSeries.js", [F["parts/Globals.js"]], function (a) {
    var C = a.pick;
    a = a.seriesType;
    a("spline", "line", {}, {
      getPointSpline: function (a, H, k) {
        var d = H.plotX, q = H.plotY, t = a[k - 1];
        k = a[k + 1];
        var u, v, p, g;
        if (t && !t.isNull && !1 !== t.doCurve && !H.isCliff && k && !k.isNull && !1 !== k.doCurve && !H.isCliff) {
          a = t.plotY;
          p = k.plotX;
          k = k.plotY;
          var e = 0;
          u = (1.5 * d + t.plotX) / 2.5;
          v = (1.5 * q + a) / 2.5;
          p = (1.5 * d + p) / 2.5;
          g = (1.5 * q + k) / 2.5;
          p !==
          u && (e = (g - v) * (p - d) / (p - u) + q - g);
          v += e;
          g += e;
          v > a && v > q ? (v = Math.max(a, q), g = 2 * q - v) : v < a && v < q && (v = Math.min(a, q), g = 2 * q - v);
          g > k && g > q ? (g = Math.max(k, q), v = 2 * q - g) : g < k && g < q && (g = Math.min(k, q), v = 2 * q - g);
          H.rightContX = p;
          H.rightContY = g
        }
        H = ["C", C(t.rightContX, t.plotX), C(t.rightContY, t.plotY), C(u, d), C(v, q), d, q];
        t.rightContX = t.rightContY = null;
        return H
      }
    })
  });
  K(F, "parts/AreaSplineSeries.js", [F["parts/Globals.js"]], function (a) {
    var C = a.seriesTypes.area.prototype, F = a.seriesType;
    F("areaspline", "spline", a.defaultPlotOptions.area, {
      getStackPoints: C.getStackPoints,
      getGraphPath: C.getGraphPath, drawGraph: C.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
    })
  });
  K(F, "parts/ColumnSeries.js", [F["parts/Globals.js"]], function (a) {
    var C = a.animObject, F = a.color, H = a.extend, k = a.defined, d = a.isNumber, q = a.merge, t = a.pick,
        u = a.Series, v = a.seriesType, p = a.svg;
    v("column", "line", {
      borderRadius: 0,
      crisp: !0,
      groupPadding: .2,
      marker: null,
      pointPadding: .1,
      minPointLength: 0,
      cropThreshold: 50,
      pointRange: null,
      states: {hover: {halo: !1, brightness: .1}, select: {color: "#cccccc", borderColor: "#000000"}},
      dataLabels: {align: null, verticalAlign: null, y: null},
      softThreshold: !1,
      startFromThreshold: !0,
      stickyTracking: !1,
      tooltip: {distance: 6},
      threshold: 0,
      borderColor: "#ffffff"
    }, {
      cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () {
        u.prototype.init.apply(this, arguments);
        var a = this, e = a.chart;
        e.hasRendered && e.series.forEach(function (e) {
          e.type === a.type && (e.isDirty = !0)
        })
      }, getColumnMetrics: function () {
        var a = this, e = a.options, d = a.xAxis, l = a.yAxis, b = d.options.reversedStacks,
            b = d.reversed && !b || !d.reversed && b, f, c = {}, k = 0;
        !1 === e.grouping ? k = 1 : a.chart.series.forEach(function (b) {
          var e = b.options, d = b.yAxis, g;
          b.type !== a.type || !b.visible && a.chart.options.chart.ignoreHiddenSeries || l.len !== d.len || l.pos !== d.pos || (e.stacking ? (f = b.stackKey, void 0 === c[f] && (c[f] = k++), g = c[f]) : !1 !== e.grouping && (g = k++), b.columnIndex = g)
        });
        var r = Math.min(Math.abs(d.transA) * (d.ordinalSlope || e.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
            p = r * e.groupPadding, q = (r - 2 * p) / (k || 1), e = Math.min(e.maxPointWidth ||
            d.len, t(e.pointWidth, q * (1 - 2 * e.pointPadding)));
        a.columnMetrics = {
          width: e,
          offset: (q - e) / 2 + (p + ((a.columnIndex || 0) + (b ? 1 : 0)) * q - r / 2) * (b ? -1 : 1)
        };
        return a.columnMetrics
      }, crispCol: function (a, e, d, l) {
        var b = this.chart, f = this.borderWidth, c = -(f % 2 ? .5 : 0), f = f % 2 ? .5 : 1;
        b.inverted && b.renderer.isVML && (f += 1);
        this.options.crisp && (d = Math.round(a + d) + c, a = Math.round(a) + c, d -= a);
        l = Math.round(e + l) + f;
        c = .5 >= Math.abs(e) && .5 < l;
        e = Math.round(e) + f;
        l -= e;
        c && l && (--e, l += 1);
        return {x: a, y: e, width: d, height: l}
      }, translate: function () {
        var a = this, e =
                a.chart, d = a.options, l = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
            l = a.borderWidth = t(d.borderWidth, l ? 0 : 1), b = a.yAxis, f = d.threshold,
            c = a.translatedThreshold = b.getThreshold(f), p = t(d.minPointLength, 5), r = a.getColumnMetrics(),
            q = r.width, G = a.barW = Math.max(q, 1 + 2 * l), B = a.pointXOffset = r.offset;
        e.inverted && (c -= .5);
        d.pointPadding && (G = Math.ceil(G));
        u.prototype.translate.apply(a);
        a.points.forEach(function (d) {
          var g = t(d.yBottom, c), l = 999 + Math.abs(g), n = q, l = Math.min(Math.max(-l, d.plotY), b.len + l),
              m = d.plotX + B, h = G, r = Math.min(l,
              g), w, u = Math.max(l, g) - r;
          p && Math.abs(u) < p && (u = p, w = !b.reversed && !d.negative || b.reversed && d.negative, d.y === f && a.dataMax <= f && b.min < f && (w = !w), r = Math.abs(r - c) > p ? g - p : c - (w ? p : 0));
          k(d.options.pointWidth) && (n = h = Math.ceil(d.options.pointWidth), m -= Math.round((n - q) / 2));
          d.barX = m;
          d.pointWidth = n;
          d.tooltipPos = e.inverted ? [b.len + b.pos - e.plotLeft - l, a.xAxis.len - m - h / 2, u] : [m + h / 2, l + b.pos - e.plotTop, u];
          d.shapeType = a.pointClass.prototype.shapeType || "rect";
          d.shapeArgs = a.crispCol.apply(a, d.isNull ? [m, c, h, 0] : [m, r, h, u])
        })
      }, getSymbol: a.noop,
      drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () {
        this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
      }, pointAttribs: function (a, e) {
        var d = this.options, g, b = this.pointAttrToOptions || {};
        g = b.stroke || "borderColor";
        var f = b["stroke-width"] || "borderWidth", c = a && a.color || this.color,
            k = a && a[g] || d[g] || this.color || c, r = a && a[f] || d[f] || this[f] || 0,
            b = a && a.dashStyle || d.dashStyle, p = t(d.opacity, 1), u;
        a && this.zones.length && (u = a.getZone(), c = a.options.color || u && u.color || this.color,
        u && (k = u.borderColor || k, b = u.dashStyle || b, r = u.borderWidth || r));
        e && (a = q(d.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, c = a.color || void 0 !== e && F(c).brighten(a.brightness).get() || c, k = a[g] || k, r = a[f] || r, b = a.dashStyle || b, p = t(a.opacity, p));
        g = {fill: c, stroke: k, "stroke-width": r, opacity: p};
        b && (g.dashstyle = b);
        return g
      }, drawPoints: function () {
        var a = this, e = this.chart, k = a.options, l = e.renderer, b = k.animationLimit || 250, f;
        a.points.forEach(function (c) {
          var g = c.graphic, m = g && e.pointCount < b ? "animate" :
              "attr";
          if (d(c.plotY) && null !== c.y) {
            f = c.shapeArgs;
            g && g.element.nodeName !== c.shapeType && (g = g.destroy());
            if (g) g[m](q(f)); else c.graphic = g = l[c.shapeType](f).add(c.group || a.group);
            if (k.borderRadius) g[m]({r: k.borderRadius});
            e.styledMode || g[m](a.pointAttribs(c, c.selected && "select")).shadow(!1 !== c.allowShadow && k.shadow, null, k.stacking && !k.borderRadius);
            g.addClass(c.getClassName(), !0)
          } else g && (c.graphic = g.destroy())
        })
      }, animate: function (a) {
        var e = this, d = this.yAxis, g = e.options, b = this.chart.inverted, f = {}, c = b ? "translateX" :
            "translateY", k;
        p && (a ? (f.scaleY = .001, a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(g.threshold))), b ? f.translateX = a - d.len : f.translateY = a, e.clipBox && e.setClip(), e.group.attr(f)) : (k = e.group.attr(c), e.group.animate({scaleY: 1}, H(C(e.options.animation), {
          step: function (a, b) {
            f[c] = k + b.pos * (d.pos - k);
            e.group.attr(f)
          }
        })), e.animate = null))
      }, remove: function () {
        var a = this, e = a.chart;
        e.hasRendered && e.series.forEach(function (e) {
          e.type === a.type && (e.isDirty = !0)
        });
        u.prototype.remove.apply(a, arguments)
      }
    })
  });
  K(F, "parts/BarSeries.js",
      [F["parts/Globals.js"]], function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
      });
  K(F, "parts/ScatterSeries.js", [F["parts/Globals.js"]], function (a) {
    var C = a.Series, F = a.seriesType;
    F("scatter", "line", {
          lineWidth: 0,
          findNearestPointBy: "xy",
          jitter: {x: 0, y: 0},
          marker: {enabled: !0},
          tooltip: {
            headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
            pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
          }
        },
        {
          sorted: !1,
          requireSorting: !1,
          noSharedTooltip: !0,
          trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
          takeOrdinalPosition: !1,
          drawGraph: function () {
            this.options.lineWidth && C.prototype.drawGraph.call(this)
          },
          applyJitter: function () {
            var a = this, k = this.options.jitter, d = this.points.length;
            k && this.points.forEach(function (q, t) {
              ["x", "y"].forEach(function (u, v) {
                var p, g = "plot" + u.toUpperCase(), e, m;
                k[u] && !q.isNull && (p = a[u + "Axis"], m = k[u] * p.transA, p && !p.isLog && (e = Math.max(0, q[g] - m), p = Math.min(p.len, q[g] + m), v = 1E4 *
                    Math.sin(t + v * d), q[g] = e + (p - e) * (v - Math.floor(v)), "x" === u && (q.clientX = q.plotX)))
              })
            })
          }
        });
    a.addEvent(C, "afterTranslate", function () {
      this.applyJitter && this.applyJitter()
    })
  });
  K(F, "mixins/centered-series.js", [F["parts/Globals.js"]], function (a) {
    var C = a.deg2rad, F = a.isNumber, H = a.pick, k = a.relativeLength;
    a.CenteredSeriesMixin = {
      getCenter: function () {
        var a = this.options, q = this.chart, t = 2 * (a.slicedOffset || 0), u = q.plotWidth - 2 * t,
            q = q.plotHeight - 2 * t, v = a.center,
            v = [H(v[0], "50%"), H(v[1], "50%"), a.size || "100%", a.innerSize || 0],
            p = Math.min(u, q), g, e;
        for (g = 0; 4 > g; ++g) e = v[g], a = 2 > g || 2 === g && /%$/.test(e), v[g] = k(e, [u, q, p, v[2]][g]) + (a ? t : 0);
        v[3] > v[2] && (v[3] = v[2]);
        return v
      }, getStartAndEndRadians: function (a, k) {
        a = F(a) ? a : 0;
        k = F(k) && k > a && 360 > k - a ? k : a + 360;
        return {start: C * (a + -90), end: C * (k + -90)}
      }
    }
  });
  K(F, "parts/PieSeries.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, F = a.CenteredSeriesMixin, H = a.defined, k = F.getStartAndEndRadians, d = a.merge, q = a.noop,
        t = a.pick, u = a.Point, v = a.Series, p = a.seriesType, g = a.setAnimation;
    p("pie", "line", {
      center: [null,
        null],
      clip: !1,
      colorByPoint: !0,
      dataLabels: {
        allowOverlap: !0, connectorPadding: 5, distance: 30, enabled: !0, formatter: function () {
          return this.point.isNull ? void 0 : this.point.name
        }, softConnector: !0, x: 0, connectorShape: "fixedOffset", crookDistance: "70%"
      },
      ignoreHiddenPoint: !0,
      inactiveOtherPoints: !0,
      legendType: "point",
      marker: null,
      size: null,
      showInLegend: !1,
      slicedOffset: 10,
      stickyTracking: !1,
      tooltip: {followPointer: !0},
      borderColor: "#ffffff",
      borderWidth: 1,
      states: {hover: {brightness: .1}}
    }, {
      isCartesian: !1,
      requireSorting: !1,
      directTouch: !0,
      noSharedTooltip: !0,
      trackerGroups: ["group", "dataLabelsGroup"],
      axisTypes: [],
      pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
      animate: function (a) {
        var e = this, d = e.points, b = e.startAngleRad;
        a || (d.forEach(function (a) {
          var c = a.graphic, d = a.shapeArgs;
          c && (c.attr({r: a.startR || e.center[3] / 2, start: b, end: b}), c.animate({
            r: d.r,
            start: d.start,
            end: d.end
          }, e.options.animation))
        }), e.animate = null)
      },
      hasData: function () {
        return !!this.processedXData.length
      },
      updateTotals: function () {
        var a, d = 0, g = this.points,
            b = g.length, f, c = this.options.ignoreHiddenPoint;
        for (a = 0; a < b; a++) f = g[a], d += c && !f.visible ? 0 : f.isNull ? 0 : f.y;
        this.total = d;
        for (a = 0; a < b; a++) f = g[a], f.percentage = 0 < d && (f.visible || !c) ? f.y / d * 100 : 0, f.total = d
      },
      generatePoints: function () {
        v.prototype.generatePoints.call(this);
        this.updateTotals()
      },
      getX: function (a, d, g) {
        var b = this.center, e = this.radii ? this.radii[g.index] : b[2] / 2;
        return b[0] + (d ? -1 : 1) * Math.cos(Math.asin(Math.max(Math.min((a - b[1]) / (e + g.labelDistance), 1), -1))) * (e + g.labelDistance) + (0 < g.labelDistance ? (d ? -1 :
            1) * this.options.dataLabels.padding : 0)
      },
      translate: function (a) {
        this.generatePoints();
        var e = 0, d = this.options, b = d.slicedOffset, f = b + (d.borderWidth || 0), c, g,
            r = k(d.startAngle, d.endAngle), p = this.startAngleRad = r.start, r = (this.endAngleRad = r.end) - p,
            q = this.points, u, n, v = d.dataLabels.distance, d = d.ignoreHiddenPoint, z, A = q.length, D;
        a || (this.center = a = this.getCenter());
        for (z = 0; z < A; z++) {
          D = q[z];
          D.labelDistance = t(D.options.dataLabels && D.options.dataLabels.distance, v);
          this.maxLabelDistance = Math.max(this.maxLabelDistance ||
              0, D.labelDistance);
          c = p + e * r;
          if (!d || D.visible) e += D.percentage / 100;
          g = p + e * r;
          D.shapeType = "arc";
          D.shapeArgs = {
            x: a[0],
            y: a[1],
            r: a[2] / 2,
            innerR: a[3] / 2,
            start: Math.round(1E3 * c) / 1E3,
            end: Math.round(1E3 * g) / 1E3
          };
          g = (g + c) / 2;
          g > 1.5 * Math.PI ? g -= 2 * Math.PI : g < -Math.PI / 2 && (g += 2 * Math.PI);
          D.slicedTranslation = {translateX: Math.round(Math.cos(g) * b), translateY: Math.round(Math.sin(g) * b)};
          u = Math.cos(g) * a[2] / 2;
          n = Math.sin(g) * a[2] / 2;
          D.tooltipPos = [a[0] + .7 * u, a[1] + .7 * n];
          D.half = g < -Math.PI / 2 || g > Math.PI / 2 ? 1 : 0;
          D.angle = g;
          c = Math.min(f, D.labelDistance /
              5);
          D.labelPosition = {
            natural: {
              x: a[0] + u + Math.cos(g) * D.labelDistance,
              y: a[1] + n + Math.sin(g) * D.labelDistance
            },
            "final": {},
            alignment: 0 > D.labelDistance ? "center" : D.half ? "right" : "left",
            connectorPosition: {
              breakAt: {x: a[0] + u + Math.cos(g) * c, y: a[1] + n + Math.sin(g) * c},
              touchingSliceAt: {x: a[0] + u, y: a[1] + n}
            }
          }
        }
      },
      drawGraph: null,
      redrawPoints: function () {
        var a = this, g = a.chart, k = g.renderer, b, f, c, p, r = a.options.shadow;
        !r || a.shadowGroup || g.styledMode || (a.shadowGroup = k.g("shadow").attr({zIndex: -1}).add(a.group));
        a.points.forEach(function (e) {
          var l =
              {};
          f = e.graphic;
          if (!e.isNull && f) {
            p = e.shapeArgs;
            b = e.getTranslate();
            if (!g.styledMode) {
              var m = e.shadowGroup;
              r && !m && (m = e.shadowGroup = k.g("shadow").add(a.shadowGroup));
              m && m.attr(b);
              c = a.pointAttribs(e, e.selected && "select")
            }
            e.delayedRendering ? (f.setRadialReference(a.center).attr(p).attr(b), g.styledMode || f.attr(c).attr({"stroke-linejoin": "round"}).shadow(r, m), e.delayRendering = !1) : (f.setRadialReference(a.center), g.styledMode || d(!0, l, c), d(!0, l, p, b), f.animate(l));
            f.attr({visibility: e.visible ? "inherit" : "hidden"});
            f.addClass(e.getClassName())
          } else f && (e.graphic = f.destroy())
        })
      },
      drawPoints: function () {
        var a = this.chart.renderer;
        this.points.forEach(function (e) {
          e.graphic || (e.graphic = a[e.shapeType](e.shapeArgs).add(e.series.group), e.delayedRendering = !0)
        })
      },
      searchPoint: q,
      sortByAngle: function (a, d) {
        a.sort(function (a, b) {
          return void 0 !== a.angle && (b.angle - a.angle) * d
        })
      },
      drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
      getCenter: F.getCenter,
      getSymbol: q
    }, {
      init: function () {
        u.prototype.init.apply(this, arguments);
        var a = this,
            d;
        a.name = t(a.name, "Slice");
        d = function (e) {
          a.slice("select" === e.type)
        };
        C(a, "select", d);
        C(a, "unselect", d);
        return a
      }, isValid: function () {
        return a.isNumber(this.y, !0) && 0 <= this.y
      }, setVisible: function (a, d) {
        var e = this, b = e.series, f = b.chart, c = b.options.ignoreHiddenPoint;
        d = t(d, c);
        a !== e.visible && (e.visible = e.options.visible = a = void 0 === a ? !e.visible : a, b.options.data[b.data.indexOf(e)] = e.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (b) {
          if (e[b]) e[b][a ? "show" : "hide"](!0)
        }), e.legendItem &&
        f.legend.colorizeItem(e, a), a || "hover" !== e.state || e.setState(""), c && (b.isDirty = !0), d && f.redraw())
      }, slice: function (a, d, k) {
        var b = this.series;
        g(k, b.chart);
        t(d, !0);
        this.sliced = this.options.sliced = H(a) ? a : !this.sliced;
        b.options.data[b.data.indexOf(this)] = this.options;
        this.graphic.animate(this.getTranslate());
        this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
      }, getTranslate: function () {
        return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
      }, haloPath: function (a) {
        var e = this.shapeArgs;
        return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + a, e.r + a, {
          innerR: this.shapeArgs.r - 1,
          start: e.start,
          end: e.end
        })
      }, connectorShapes: {
        fixedOffset: function (a, d, g) {
          var b = d.breakAt;
          d = d.touchingSliceAt;
          return ["M", a.x, a.y].concat(g.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * b.x - d.x, 2 * b.y - d.y, b.x, b.y] : ["L", b.x, b.y]).concat(["L", d.x, d.y])
        }, straight: function (a, d) {
          d = d.touchingSliceAt;
          return ["M", a.x, a.y, "L", d.x, d.y]
        }, crookedLine: function (d, g, k) {
          g = g.touchingSliceAt;
          var b = this.series, e = b.center[0], c = b.chart.plotWidth, l = b.chart.plotLeft, b = d.alignment,
              r = this.shapeArgs.r;
          k = a.relativeLength(k.crookDistance, 1);
          k = "left" === b ? e + r + (c + l - e - r) * (1 - k) : l + (e - r) * k;
          e = ["L", k, d.y];
          if ("left" === b ? k > d.x || k < g.x : k < d.x || k > g.x) e = [];
          return ["M", d.x, d.y].concat(e).concat(["L", g.x, g.y])
        }
      }, getConnectorPath: function () {
        var a = this.labelPosition, d = this.series.options.dataLabels, g = d.connectorShape, b = this.connectorShapes;
        b[g] && (g = b[g]);
        return g.call(this, {x: a.final.x, y: a.final.y, alignment: a.alignment},
            a.connectorPosition, d)
      }
    })
  });
  K(F, "parts/DataLabels.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, F = a.arrayMax, H = a.defined, k = a.extend, d = a.format, q = a.merge, t = a.noop, u = a.pick,
        v = a.relativeLength, p = a.Series, g = a.seriesTypes, e = a.stableSort, m = a.isArray, l = a.splat;
    a.distribute = function (b, d, c) {
      function f(a, b) {
        return a.target - b.target
      }

      var g, k = !0, l = b, m = [], n;
      n = 0;
      var p = l.reducedLen || d;
      for (g = b.length; g--;) n += b[g].size;
      if (n > p) {
        e(b, function (a, b) {
          return (b.rank || 0) - (a.rank || 0)
        });
        for (n = g = 0; n <= p;) n += b[g].size,
            g++;
        m = b.splice(g - 1, b.length)
      }
      e(b, f);
      for (b = b.map(function (a) {
        return {size: a.size, targets: [a.target], align: u(a.align, .5)}
      }); k;) {
        for (g = b.length; g--;) k = b[g], n = (Math.min.apply(0, k.targets) + Math.max.apply(0, k.targets)) / 2, k.pos = Math.min(Math.max(0, n - k.size * k.align), d - k.size);
        g = b.length;
        for (k = !1; g--;) 0 < g && b[g - 1].pos + b[g - 1].size > b[g].pos && (b[g - 1].size += b[g].size, b[g - 1].targets = b[g - 1].targets.concat(b[g].targets), b[g - 1].align = .5, b[g - 1].pos + b[g - 1].size > d && (b[g - 1].pos = d - b[g - 1].size), b.splice(g, 1), k = !0)
      }
      l.push.apply(l,
          m);
      g = 0;
      b.some(function (b) {
        var e = 0;
        if (b.targets.some(function () {
              l[g].pos = b.pos + e;
              if (Math.abs(l[g].pos - l[g].target) > c) return l.slice(0, g + 1).forEach(function (a) {
                delete a.pos
              }), l.reducedLen = (l.reducedLen || d) - .1 * d, l.reducedLen > .1 * d && a.distribute(l, d, c), !0;
              e += l[g].size;
              g++
            })) return !0
      });
      e(l, f)
    };
    p.prototype.drawDataLabels = function () {
      function b(a, b) {
        var c = b.filter;
        return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b &&
        a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
      }

      function e(a, b) {
        var c = [], d;
        if (m(a) && !m(b)) c = a.map(function (a) {
          return q(a, b)
        }); else if (m(b) && !m(a)) c = b.map(function (b) {
          return q(a, b)
        }); else if (m(a) || m(b)) for (d = Math.max(a.length, b.length); d--;) c[d] = q(a[d], b[d]); else c = q(a, b);
        return c
      }

      var c = this, g = c.chart, k = c.options, p = k.dataLabels, t = c.points, B, n = c.hasRendered || 0, v,
          z = u(p.defer, !!k.animation), A = g.renderer,
          p = e(e(g.options.plotOptions && g.options.plotOptions.series && g.options.plotOptions.series.dataLabels, g.options.plotOptions &&
              g.options.plotOptions[c.type] && g.options.plotOptions[c.type].dataLabels), p);
      a.fireEvent(this, "drawDataLabels");
      if (m(p) || p.enabled || c._hasPointLabels) v = c.plotGroup("dataLabelsGroup", "data-labels", z && !n ? "hidden" : "inherit", p.zIndex || 6), z && (v.attr({opacity: +n}), n || C(c, "afterAnimate", function () {
        c.visible && v.show(!0);
        v[k.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
      })), t.forEach(function (f) {
        B = l(e(p, f.dlOptions || f.options && f.options.dataLabels));
        B.forEach(function (e, l) {
          var h = e.enabled && (!f.isNull ||
              f.dataLabelOnNull) && b(f, e), n, m, r, p, q = f.dataLabels ? f.dataLabels[l] : f.dataLabel,
              t = f.connectors ? f.connectors[l] : f.connector, w = !q;
          h && (n = f.getLabelConfig(), m = u(e[f.formatPrefix + "Format"], e.format), n = H(m) ? d(m, n, g.time) : (e[f.formatPrefix + "Formatter"] || e.formatter).call(n, e), m = e.style, r = e.rotation, g.styledMode || (m.color = u(e.color, m.color, c.color, "#000000"), "contrast" === m.color && (f.contrastColor = A.getContrast(f.color || c.color), m.color = e.inside || 0 > u(e.distance, f.labelDistance) || k.stacking ? f.contrastColor : "#000000"),
          k.cursor && (m.cursor = k.cursor)), p = {
            r: e.borderRadius || 0,
            rotation: r,
            padding: e.padding,
            zIndex: 1
          }, g.styledMode || (p.fill = e.backgroundColor, p.stroke = e.borderColor, p["stroke-width"] = e.borderWidth), a.objectEach(p, function (a, b) {
            void 0 === a && delete p[b]
          }));
          !q || h && H(n) ? h && H(n) && (q ? p.text = n : (f.dataLabels = f.dataLabels || [], q = f.dataLabels[l] = r ? A.text(n, 0, -9999).addClass("highcharts-data-label") : A.label(n, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"), l || (f.dataLabel = q), q.addClass(" highcharts-data-label-color-" +
              f.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))), q.options = e, q.attr(p), g.styledMode || q.css(m).shadow(e.shadow), q.added || q.add(v), e.textPath && q.setTextPath(f.getDataLabelPath && f.getDataLabelPath(q) || f.graphic, e.textPath), c.alignDataLabel(f, q, e, null, w)) : (f.dataLabel = f.dataLabel && f.dataLabel.destroy(), f.dataLabels && (1 === f.dataLabels.length ? delete f.dataLabels : delete f.dataLabels[l]), l || delete f.dataLabel, t && (f.connector = f.connector.destroy(), f.connectors && (1 === f.connectors.length ?
              delete f.connectors : delete f.connectors[l])))
        })
      });
      a.fireEvent(this, "afterDrawDataLabels")
    };
    p.prototype.alignDataLabel = function (a, d, c, e, g) {
      var b = this.chart, f = this.isCartesian && b.inverted, l = u(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
          n = u(a.plotY, -9999), m = d.getBBox(), r, p = c.rotation, q = c.align,
          h = this.visible && (a.series.forceDL || b.isInsidePlot(l, Math.round(n), f) || e && b.isInsidePlot(l, f ? e.x + 1 : e.y + e.height - 1, f)),
          t = "justify" === u(c.overflow, "justify");
      if (h && (r = b.renderer.fontMetrics(b.styledMode ? void 0 : c.style.fontSize,
              d).b, e = k({
            x: f ? this.yAxis.len - n : l,
            y: Math.round(f ? this.xAxis.len - l : n),
            width: 0,
            height: 0
          }, e), k(c, {
            width: m.width,
            height: m.height
          }), p ? (t = !1, l = b.renderer.rotCorr(r, p), l = {
            x: e.x + c.x + e.width / 2 + l.x,
            y: e.y + c.y + {top: 0, middle: .5, bottom: 1}[c.verticalAlign] * e.height
          }, d[g ? "attr" : "animate"](l).attr({align: q}), n = (p + 720) % 360, n = 180 < n && 360 > n, "left" === q ? l.y -= n ? m.height : 0 : "center" === q ? (l.x -= m.width / 2, l.y -= m.height / 2) : "right" === q && (l.x -= m.width, l.y -= n ? 0 : m.height), d.placed = !0, d.alignAttr = l) : (d.align(c, null, e), l = d.alignAttr),
              t && 0 <= e.height ? a.isLabelJustified = this.justifyDataLabel(d, c, l, m, e, g) : u(c.crop, !0) && (h = b.isInsidePlot(l.x, l.y) && b.isInsidePlot(l.x + m.width, l.y + m.height)), c.shape && !p)) d[g ? "attr" : "animate"]({
        anchorX: f ? b.plotWidth - a.plotY : a.plotX,
        anchorY: f ? b.plotHeight - a.plotX : a.plotY
      });
      h || (d.attr({y: -9999}), d.placed = !1)
    };
    p.prototype.justifyDataLabel = function (a, d, c, e, g, k) {
      var b = this.chart, f = d.align, l = d.verticalAlign, m, r, p = a.box ? 0 : a.padding || 0;
      m = c.x + p;
      0 > m && ("right" === f ? d.align = "left" : d.x = -m, r = !0);
      m = c.x + e.width - p;
      m > b.plotWidth &&
      ("left" === f ? d.align = "right" : d.x = b.plotWidth - m, r = !0);
      m = c.y + p;
      0 > m && ("bottom" === l ? d.verticalAlign = "top" : d.y = -m, r = !0);
      m = c.y + e.height - p;
      m > b.plotHeight && ("top" === l ? d.verticalAlign = "bottom" : d.y = b.plotHeight - m, r = !0);
      r && (a.placed = !k, a.align(d, null, g));
      return r
    };
    g.pie && (g.pie.prototype.dataLabelPositioners = {
      radialDistributionY: function (a) {
        return a.top + a.distributeBox.pos
      }, radialDistributionX: function (a, d, c, e) {
        return a.getX(c < d.top + 2 || c > d.bottom - 2 ? e : c, d.half, d)
      }, justify: function (a, d, c) {
        return c[0] + (a.half ? -1 :
            1) * (d + a.labelDistance)
      }, alignToPlotEdges: function (a, d, c, e) {
        a = a.getBBox().width;
        return d ? a + e : c - a - e
      }, alignToConnectors: function (a, d, c, e) {
        var b = 0, f;
        a.forEach(function (a) {
          f = a.dataLabel.getBBox().width;
          f > b && (b = f)
        });
        return d ? b + e : c - b - e
      }
    }, g.pie.prototype.drawDataLabels = function () {
      var b = this, d = b.data, c, e = b.chart, g = b.options.dataLabels, k = g.connectorPadding, l, m = e.plotWidth,
          n = e.plotHeight, t = e.plotLeft, v = Math.round(e.chartWidth / 3), A, D = b.center, h = D[2] / 2, y = D[1],
          C, I, L, K, P = [[], []], x, Q, N, T, O = [0, 0, 0, 0], X = b.dataLabelPositioners,
          Z;
      b.visible && (g.enabled || b._hasPointLabels) && (d.forEach(function (a) {
        a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
          width: "auto",
          textOverflow: "clip"
        }), a.dataLabel.shortened = !1)
      }), p.prototype.drawDataLabels.apply(b), d.forEach(function (a) {
        a.dataLabel && (a.visible ? (P[a.half].push(a), a.dataLabel._pos = null, !H(g.style.width) && !H(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > v && (a.dataLabel.css({
          width: .7 *
          v
        }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
      }), P.forEach(function (d, f) {
        var l, r, p = d.length, q = [], w;
        if (p) for (b.sortByAngle(d, f - .5), 0 < b.maxLabelDistance && (l = Math.max(0, y - h - b.maxLabelDistance), r = Math.min(y + h + b.maxLabelDistance, e.plotHeight), d.forEach(function (a) {
          0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, y - h - a.labelDistance), a.bottom = Math.min(y + h + a.labelDistance, e.plotHeight), w = a.dataLabel.getBBox().height || 21, a.distributeBox =
              {target: a.labelPosition.natural.y - a.top + w / 2, size: w, rank: a.y}, q.push(a.distributeBox))
        }), l = r + w - l, a.distribute(q, l, l / 5)), T = 0; T < p; T++) {
          c = d[T];
          L = c.labelPosition;
          C = c.dataLabel;
          N = !1 === c.visible ? "hidden" : "inherit";
          Q = l = L.natural.y;
          q && H(c.distributeBox) && (void 0 === c.distributeBox.pos ? N = "hidden" : (K = c.distributeBox.size, Q = X.radialDistributionY(c)));
          delete c.positionIndex;
          if (g.justify) x = X.justify(c, h, D); else switch (g.alignTo) {
            case "connectors":
              x = X.alignToConnectors(d, f, m, t);
              break;
            case "plotEdges":
              x = X.alignToPlotEdges(C,
                  f, m, t);
              break;
            default:
              x = X.radialDistributionX(b, c, Q, l)
          }
          C._attr = {visibility: N, align: L.alignment};
          C._pos = {x: x + g.x + ({left: k, right: -k}[L.alignment] || 0), y: Q + g.y - 10};
          L.final.x = x;
          L.final.y = Q;
          u(g.crop, !0) && (I = C.getBBox().width, l = null, x - I < k && 1 === f ? (l = Math.round(I - x + k), O[3] = Math.max(l, O[3])) : x + I > m - k && 0 === f && (l = Math.round(x + I - m + k), O[1] = Math.max(l, O[1])), 0 > Q - K / 2 ? O[0] = Math.max(Math.round(-Q + K / 2), O[0]) : Q + K / 2 > n && (O[2] = Math.max(Math.round(Q + K / 2 - n), O[2])), C.sideOverflow = l)
        }
      }), 0 === F(O) || this.verifyDataLabelOverflow(O)) &&
      (this.placeDataLabels(), this.points.forEach(function (a) {
        Z = q(g, a.options.dataLabels);
        if (l = u(Z.connectorWidth, 1)) {
          var c;
          A = a.connector;
          if ((C = a.dataLabel) && C._pos && a.visible && 0 < a.labelDistance) {
            N = C._attr.visibility;
            if (c = !A) a.connector = A = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), e.styledMode || A.attr({
              "stroke-width": l,
              stroke: Z.connectorColor || a.color || "#666666"
            });
            A[c ? "attr" : "animate"]({d: a.getConnectorPath()});
            A.attr("visibility", N)
          } else A && (a.connector = A.destroy())
        }
      }))
    }, g.pie.prototype.placeDataLabels = function () {
      this.points.forEach(function (a) {
        var b = a.dataLabel, c;
        b && a.visible && ((c = b._pos) ? (b.sideOverflow && (b._attr.width = Math.max(b.getBBox().width - b.sideOverflow, 0), b.css({
          width: b._attr.width + "px",
          textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
        }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](c), b.moved = !0) : b && b.attr({y: -9999}));
        delete a.distributeBox
      }, this)
    }, g.pie.prototype.alignDataLabel =
        t, g.pie.prototype.verifyDataLabelOverflow = function (a) {
      var b = this.center, c = this.options, d = c.center, e = c.minSize || 80, g, k = null !== c.size;
      k || (null !== d[0] ? g = Math.max(b[2] - Math.max(a[1], a[3]), e) : (g = Math.max(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? g = Math.max(Math.min(g, b[2] - Math.max(a[0], a[2])), e) : (g = Math.max(Math.min(g, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2), g < b[2] ? (b[2] = g, b[3] = Math.min(v(c.innerSize || 0, g), g), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0);
      return k
    });
    g.column &&
    (g.column.prototype.alignDataLabel = function (a, d, c, e, g) {
      var b = this.chart.inverted, f = a.series, k = a.dlBox || a.shapeArgs,
          l = u(a.below, a.plotY > u(this.translatedThreshold, f.yAxis.len)), m = u(c.inside, !!this.options.stacking);
      k && (e = q(k), 0 > e.y && (e.height += e.y, e.y = 0), k = e.y + e.height - f.yAxis.len, 0 < k && (e.height -= k), b && (e = {
        x: f.yAxis.len - e.y - e.height,
        y: f.xAxis.len - e.x - e.width,
        width: e.height,
        height: e.width
      }), m || (b ? (e.x += l ? 0 : e.width, e.width = 0) : (e.y += l ? e.height : 0, e.height = 0)));
      c.align = u(c.align, !b || m ? "center" : l ? "right" :
          "left");
      c.verticalAlign = u(c.verticalAlign, b || m ? "middle" : l ? "top" : "bottom");
      p.prototype.alignDataLabel.call(this, a, d, c, e, g);
      a.isLabelJustified && a.contrastColor && d.css({color: a.contrastColor})
    })
  });
  K(F, "modules/overlapping-datalabels.src.js", [F["parts/Globals.js"]], function (a) {
    var C = a.Chart, F = a.isArray, H = a.objectEach, k = a.pick, d = a.addEvent, q = a.fireEvent;
    d(C, "render", function () {
      var a = [];
      (this.labelCollectors || []).forEach(function (d) {
        a = a.concat(d())
      });
      (this.yAxis || []).forEach(function (d) {
        d.options.stackLabels &&
        !d.options.stackLabels.allowOverlap && H(d.stacks, function (d) {
          H(d, function (d) {
            a.push(d.label)
          })
        })
      });
      (this.series || []).forEach(function (d) {
        var q = d.options.dataLabels;
        d.visible && (!1 !== q.enabled || d._hasPointLabels) && d.points.forEach(function (d) {
          d.visible && (F(d.dataLabels) ? d.dataLabels : d.dataLabel ? [d.dataLabel] : []).forEach(function (g) {
            var e = g.options;
            g.labelrank = k(e.labelrank, d.labelrank, d.shapeArgs && d.shapeArgs.height);
            e.allowOverlap || a.push(g)
          })
        })
      });
      this.hideOverlappingLabels(a)
    });
    C.prototype.hideOverlappingLabels =
        function (a) {
          var d = this, k = a.length, p = d.renderer, g, e, m, l, b, f, c = function (a, b, c, d, e, f, g, k) {
            return !(e > a + c || e + g < a || f > b + d || f + k < b)
          };
          m = function (a) {
            var b, c, d, e = a.box ? 0 : a.padding || 0;
            d = 0;
            if (a && (!a.alignAttr || a.placed)) return b = a.alignAttr || {
              x: a.attr("x"),
              y: a.attr("y")
            }, c = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height, d = p.fontMetrics(null, a.element).h), {
              x: b.x + (c.translateX || 0) + e,
              y: b.y + (c.translateY || 0) + e - d,
              width: a.width - 2 * e,
              height: a.height - 2 * e
            }
          };
          for (e = 0; e < k; e++) if (g = a[e]) g.oldOpacity =
              g.opacity, g.newOpacity = 1, g.absoluteBox = m(g);
          a.sort(function (a, b) {
            return (b.labelrank || 0) - (a.labelrank || 0)
          });
          for (e = 0; e < k; e++) for (f = (m = a[e]) && m.absoluteBox, g = e + 1; g < k; ++g) if (b = (l = a[g]) && l.absoluteBox, f && b && m !== l && 0 !== m.newOpacity && 0 !== l.newOpacity && (b = c(f.x, f.y, f.width, f.height, b.x, b.y, b.width, b.height))) (m.labelrank < l.labelrank ? m : l).newOpacity = 0;
          a.forEach(function (a) {
            var b, c;
            a && (c = a.newOpacity, a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function () {
              a.hide()
            }, a.alignAttr.opacity = c, a[a.isOld ?
                "animate" : "attr"](a.alignAttr, null, b), q(d, "afterHideOverlappingLabels")) : a.attr({opacity: c})), a.isOld = !0)
          })
        }
  });
  K(F, "parts/Interaction.js", [F["parts/Globals.js"]], function (a) {
    var C = a.addEvent, F = a.Chart, H = a.createElement, k = a.css, d = a.defaultOptions, q = a.defaultPlotOptions,
        t = a.extend, u = a.fireEvent, v = a.hasTouch, p = a.isObject, g = a.Legend, e = a.merge, m = a.pick,
        l = a.Point, b = a.Series, f = a.seriesTypes, c = a.svg, w;
    w = a.TrackerMixin = {
      drawTrackerPoint: function () {
        var a = this, b = a.chart, c = b.pointer, d = function (a) {
          var b = c.getPointFromEvent(a);
          void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
        };
        a.points.forEach(function (a) {
          a.graphic && (a.graphic.element.point = a);
          a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
        });
        a._hasTracking || (a.trackerGroups.forEach(function (e) {
          if (a[e]) {
            a[e].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
              c.onTrackerMouseOut(a)
            });
            if (v) a[e].on("touchstart", d);
            !b.styledMode && a.options.cursor && a[e].css(k).css({cursor: a.options.cursor})
          }
        }), a._hasTracking = !0);
        u(this,
            "afterDrawTracker")
      }, drawTrackerGraph: function () {
        var a = this, b = a.options, d = b.trackByArea, e = [].concat(d ? a.areaPath : a.graphPath), f = e.length,
            g = a.chart, k = g.pointer, l = g.renderer, m = g.options.tooltip.snap, h = a.tracker, p, q = function () {
              if (g.hoverSeries !== a) a.onMouseOver()
            }, t = "rgba(192,192,192," + (c ? .0001 : .002) + ")";
        if (f && !d) for (p = f + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - m, e[p + 2], "L"), (p && "M" === e[p] || p === f) && e.splice(p, 0, "L", e[p - 2] + m, e[p - 1]);
        h ? h.attr({d: e}) : a.graph && (a.tracker = l.path(e).attr({
          visibility: a.visible ?
              "visible" : "hidden", zIndex: 2
        }).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), g.styledMode || a.tracker.attr({
          "stroke-linejoin": "round",
          stroke: t,
          fill: d ? t : "none",
          "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * m)
        }), [a.tracker, a.markerGroup].forEach(function (a) {
          a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function (a) {
            k.onTrackerMouseOut(a)
          });
          b.cursor && !g.styledMode && a.css({cursor: b.cursor});
          if (v) a.on("touchstart", q)
        }));
        u(this, "afterDrawTracker")
      }
    };
    f.column &&
    (f.column.prototype.drawTracker = w.drawTrackerPoint);
    f.pie && (f.pie.prototype.drawTracker = w.drawTrackerPoint);
    f.scatter && (f.scatter.prototype.drawTracker = w.drawTrackerPoint);
    t(g.prototype, {
      setItemEvents: function (a, b, c) {
        var d = this, f = d.chart.renderer.boxWrapper, g = a instanceof l,
            k = "highcharts-legend-" + (g ? "point" : "series") + "-active", m = d.chart.styledMode;
        (c ? b : a.legendGroup).on("mouseover", function () {
          d.allItems.forEach(function (b) {
            a !== b && b.setState("inactive", !g)
          });
          a.setState("hover");
          a.visible && f.addClass(k);
          m || b.css(d.options.itemHoverStyle)
        }).on("mouseout", function () {
          d.styledMode || b.css(e(a.visible ? d.itemStyle : d.itemHiddenStyle));
          d.allItems.forEach(function (b) {
            a !== b && b.setState("", !g)
          });
          f.removeClass(k);
          a.setState()
        }).on("click", function (b) {
          var c = function () {
            a.setVisible && a.setVisible()
          };
          f.removeClass(k);
          b = {browserEvent: b};
          a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : u(a, "legendItemClick", b, c)
        })
      }, createCheckboxForItem: function (a) {
        a.checkbox = H("input", {
          type: "checkbox", className: "highcharts-legend-checkbox",
          checked: a.selected, defaultChecked: a.selected
        }, this.options.itemCheckboxStyle, this.chart.container);
        C(a.checkbox, "click", function (b) {
          u(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
            a.select()
          })
        })
      }
    });
    t(F.prototype, {
      showResetZoom: function () {
        function a() {
          b.zoomOut()
        }

        var b = this, c = d.lang, e = b.options.chart.resetZoomButton, f = e.theme, g = f.states,
            k = "chart" === e.relativeTo || "spaceBox" === e.relativeTo ? null : "plotBox";
        u(this, "beforeShowResetZoom", null, function () {
          b.resetZoomButton = b.renderer.button(c.resetZoom,
              null, null, a, f, g && g.hover).attr({
            align: e.position.align,
            title: c.resetZoomTitle
          }).addClass("highcharts-reset-zoom").add().align(e.position, !1, k)
        });
        u(this, "afterShowResetZoom")
      }, zoomOut: function () {
        u(this, "selection", {resetSelection: !0}, this.zoom)
      }, zoom: function (b) {
        var c = this, d, e = c.pointer, f = !1, g = c.inverted ? e.mouseDownX : e.mouseDownY, k;
        !b || b.resetSelection ? (c.axes.forEach(function (a) {
          d = a.zoom()
        }), e.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function (b) {
          var k = b.axis, h = c.inverted ? k.left : k.top, l = c.inverted ?
              h + k.width : h + k.height, n = k.isXAxis, m = !1;
          if (!n && g >= h && g <= l || n || !a.defined(g)) m = !0;
          e[n ? "zoomX" : "zoomY"] && m && (d = k.zoom(b.min, b.max), k.displayBtn && (f = !0))
        });
        k = c.resetZoomButton;
        f && !k ? c.showResetZoom() : !f && p(k) && (c.resetZoomButton = k.destroy());
        d && c.redraw(m(c.options.chart.animation, b && b.animation, 100 > c.pointCount))
      }, pan: function (a, b) {
        var c = this, d = c.hoverPoints, e;
        u(this, "pan", {originalEvent: a}, function () {
          d && d.forEach(function (a) {
            a.setState()
          });
          ("xy" === b ? [1, 0] : [1]).forEach(function (b) {
            b = c[b ? "xAxis" : "yAxis"][0];
            var d = b.horiz, f = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d],
                h = (b.pointRange || 0) / 2, k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                l = b.getExtremes(), n = b.toValue(g - f, !0) + h * k, k = b.toValue(g + b.len - f, !0) - h * k,
                m = k < n, g = m ? k : n, n = m ? n : k,
                k = Math.min(l.dataMin, h ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                h = Math.max(l.dataMax, h ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)), m = k - g;
            0 < m && (n += m, g = k);
            m = n - h;
            0 < m && (n = h, g -= m);
            b.series.length && g !== l.min && n !== l.max && (b.setExtremes(g,
                n, !1, !1, {trigger: "pan"}), e = !0);
            c[d] = f
          });
          e && c.redraw(!1);
          k(c.container, {cursor: "move"})
        })
      }
    });
    t(l.prototype, {
      select: function (a, b) {
        var c = this, d = c.series, e = d.chart;
        a = m(a, !c.selected);
        c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
          c.selected = c.options.selected = a;
          d.options.data[d.data.indexOf(c)] = c.options;
          c.setState(a && "select");
          b || e.getSelectedPoints().forEach(function (a) {
            a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[d.data.indexOf(a)] = a.options, a.setState(e.hoverPoints ?
                "inactive" : ""), a.firePointEvent("unselect"))
          })
        })
      }, onMouseOver: function (a) {
        var b = this.series.chart, c = b.pointer;
        a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
        c.runPointActions(a, this)
      }, onMouseOut: function () {
        var a = this.series.chart;
        this.firePointEvent("mouseOut");
        this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
          a.setState()
        });
        a.hoverPoints = a.hoverPoint = null
      }, importEvents: function () {
        if (!this.hasImportedEvents) {
          var b = this, c = e(b.series.options.point,
              b.options).events;
          b.events = c;
          a.objectEach(c, function (a, c) {
            C(b, c, a)
          });
          this.hasImportedEvents = !0
        }
      }, setState: function (a, b) {
        var c = Math.floor(this.plotX), d = this.plotY, e = this.series, f = this.state,
            g = e.options.states[a || "normal"] || {}, k = q[e.type].marker && e.options.marker,
            l = k && !1 === k.enabled, h = k && k.states && k.states[a || "normal"] || {}, p = !1 === h.enabled,
            r = e.stateMarkerGraphic, v = this.marker || {}, w = e.chart, C = e.halo, F, x, H, I = k && e.markerAttribs;
        a = a || "";
        if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled ||
                a && (p || l && !1 === h.enabled) || a && v.states && v.states[a] && !1 === v.states[a].enabled)) {
          this.state = a;
          I && (F = e.markerAttribs(this, a));
          if (this.graphic) f && this.graphic.removeClass("highcharts-point-" + f), a && this.graphic.addClass("highcharts-point-" + a), w.styledMode || (x = e.pointAttribs(this, a), H = m(w.options.chart.animation, g.animation), e.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function (a) {
            a && a.animate({opacity: x.opacity}, H)
          }), this.connector && this.connector.animate({opacity: x.opacity}, H)), this.graphic.animate(x,
              H)), F && this.graphic.animate(F, m(w.options.chart.animation, h.animation, k.animation)), r && r.hide(); else {
            if (a && h) {
              f = v.symbol || e.symbol;
              r && r.currentSymbol !== f && (r = r.destroy());
              if (r) r[b ? "animate" : "attr"]({
                x: F.x,
                y: F.y
              }); else f && (e.stateMarkerGraphic = r = w.renderer.symbol(f, F.x, F.y, F.width, F.height).add(e.markerGroup), r.currentSymbol = f);
              !w.styledMode && r && r.attr(e.pointAttribs(this, a))
            }
            r && (r[a && w.isInsidePlot(c, d, w.inverted) ? "show" : "hide"](), r.element.point = this)
          }
          (a = g.halo) && a.size ? (C || (e.halo = C = w.renderer.path().add((this.graphic ||
              r).parentGroup)), C.show()[b ? "animate" : "attr"]({d: this.haloPath(a.size)}), C.attr({
            "class": "highcharts-halo highcharts-color-" + m(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""),
            zIndex: -1
          }), C.point = this, w.styledMode || C.attr(t({
            fill: this.color || e.color,
            "fill-opacity": a.opacity
          }, a.attributes))) : C && C.point && C.point.haloPath && C.animate({d: C.point.haloPath(0)}, null, C.hide);
          u(this, "afterSetState")
        }
      }, haloPath: function (a) {
        return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
            a, this.plotY - a, 2 * a, 2 * a)
      }
    });
    t(b.prototype, {
      onMouseOver: function () {
        var a = this.chart, b = a.hoverSeries;
        if (b && b !== this) b.onMouseOut();
        this.options.events.mouseOver && u(this, "mouseOver");
        this.setState("hover");
        a.hoverSeries = this
      }, onMouseOut: function () {
        var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
        b.hoverSeries = null;
        if (d) d.onMouseOut();
        this && a.events.mouseOut && u(this, "mouseOut");
        !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
        b.series.forEach(function (a) {
          a.setState("", !0)
        })
      },
      setState: function (a, b) {
        var c = this, d = c.options, e = c.graph, f = d.inactiveOtherPoints, g = d.states, k = d.lineWidth,
            l = d.opacity, h = m(g[a || "normal"] && g[a || "normal"].animation, c.chart.options.chart.animation),
            d = 0;
        a = a || "";
        if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (b) {
              b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a))
            }), c.state = a, !c.chart.styledMode)) {
          if (g[a] && !1 === g[a].enabled) return;
          a && (k = g[a].lineWidth || k + (g[a].lineWidthPlus || 0), l = m(g[a].opacity,
              l));
          if (e && !e.dashstyle) for (g = {"stroke-width": k}, e.animate(g, h); c["zone-graph-" + d];) c["zone-graph-" + d].attr(g), d += 1;
          f || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function (a) {
            a && a.animate({opacity: l}, h)
          })
        }
        b && f && c.points && c.points.forEach(function (b) {
          b.setState && b.setState(a)
        })
      }, setVisible: function (a, b) {
        var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, k = c.visible;
        f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
        ["group",
          "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
          if (c[a]) c[a][f]()
        });
        if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
        e && d.legend.colorizeItem(c, a);
        c.isDirty = !0;
        c.options.stacking && d.series.forEach(function (a) {
          a.options.stacking && a.visible && (a.isDirty = !0)
        });
        c.linkedSeries.forEach(function (b) {
          b.setVisible(a, !1)
        });
        g && (d.isDirtyBox = !0);
        u(c, f);
        !1 !== b && d.redraw()
      }, show: function () {
        this.setVisible(!0)
      }, hide: function () {
        this.setVisible(!1)
      }, select: function (a) {
        this.selected =
            a = this.options.selected = void 0 === a ? !this.selected : a;
        this.checkbox && (this.checkbox.checked = a);
        u(this, a ? "select" : "unselect")
      }, drawTracker: w.drawTrackerGraph
    })
  });
  K(F, "parts/Responsive.js", [F["parts/Globals.js"]], function (a) {
    var C = a.Chart, F = a.isArray, H = a.isObject, k = a.pick, d = a.splat;
    C.prototype.setResponsive = function (d, k) {
      var q = this.options.responsive, t = [], p = this.currentResponsive;
      !k && q && q.rules && q.rules.forEach(function (g) {
        void 0 === g._id && (g._id = a.uniqueKey());
        this.matchResponsiveRule(g, t, d)
      }, this);
      k =
          a.merge.apply(0, t.map(function (d) {
            return a.find(q.rules, function (a) {
              return a._id === d
            }).chartOptions
          }));
      k.isResponsiveOptions = !0;
      t = t.toString() || void 0;
      t !== (p && p.ruleIds) && (p && this.update(p.undoOptions, d), t ? (p = this.currentOptions(k), p.isResponsiveOptions = !0, this.currentResponsive = {
        ruleIds: t,
        mergedOptions: k,
        undoOptions: p
      }, this.update(k, d)) : this.currentResponsive = void 0)
    };
    C.prototype.matchResponsiveRule = function (a, d) {
      var q = a.condition;
      (q.callback || function () {
        return this.chartWidth <= k(q.maxWidth, Number.MAX_VALUE) &&
            this.chartHeight <= k(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(q.minWidth, 0) && this.chartHeight >= k(q.minHeight, 0)
      }).call(this) && d.push(a._id)
    };
    C.prototype.currentOptions = function (q) {
      function t(q, p, g, e) {
        var m;
        a.objectEach(q, function (a, b) {
          if (!e && -1 < ["series", "xAxis", "yAxis"].indexOf(b)) for (a = d(a), g[b] = [], m = 0; m < a.length; m++) p[b][m] && (g[b][m] = {}, t(a[m], p[b][m], g[b][m], e + 1)); else H(a) ? (g[b] = F(a) ? [] : {}, t(a, p[b] || {}, g[b], e + 1)) : g[b] = k(p[b], null)
        })
      }

      var u = {};
      t(q, this.options, u, 0);
      return u
    }
  });
  K(F, "masters/highcharts.src.js",
      [F["parts/Globals.js"]], function (a) {
        return a
      });
  F["masters/highcharts.src.js"]._modules = F;
  return F["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map