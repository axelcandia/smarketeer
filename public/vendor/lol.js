(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    /*function createCookie(e, t, n) {
        if (n) {
            var r = new Date;
            r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
            var o = "; expires=" + r.toGMTString()
        } else var o = "";
        alert(e);
        document.cookie = e + "=" + t + o + "; path=/"
    }

    function deleteCookie(e) {
        createCookie(e, "", -10)
    }

    function readCookie(e) {
        for (var t = e + "=", n = document.cookie.split(";"), r = 0; r <
            n.length; r++) {
            for (var o = n[r];
                " " == o.charAt(0);) o = o.substring(1, o.length);
            if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
        }
        return null
    }

    function _loadScript(e, t) {
        var n = document.createElement("script");
        n.type = "text/javascript", n.src = e, "function" == typeof t &&
            (n.onload = t);
        var r = document.getElementsByTagName("script")[0];
        return r.parentNode.insertBefore(n, r), n
    }

    function _objectToQueryJSON(e) {
        var t = JSON.stringify(e);
        return "o=" + encodeURIComponent(t)
    }

    function objectToQuery(e) {
        var t = [];
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                "object" == typeof e[n] && (r = JSON.stringify(e[n])),
                    t.push(encodeURIComponent(n) + "=" +
                        encodeURIComponent(r))
            }
        return t.join("&")
    }

    function _registerAction(e, t) {
        if ("undefined" == typeof e || "object" != typeof e) throw "Invalid config";
        e.__cmd = "__regaction", e.__pid = __pid;
        var n = _getUrl(e, t);
        if (_loadScript(n), __isHooked) {
            var r = _createEvent(e.action, null, t);
            _storeEvent(r)
        }
    }

    function _getVisitId() {
        var e = readCookie(__cookieName);
        return null == e && (e = __defaultCookieID), __currentVisitID =
            e, e
    }

    function _setVisitId(e) {
        __currentVisitID = e, createCookie(__cookieName, e,
            __cookieLifetime), _trackFingerPrint()
    }

    function _reset() {
        deleteCookie(__cookieName)
    }

    function _setPostback(e, t) {
        createCookie(__pbval, e, __cookieLifetime), createCookie(
            __pbact, t, __cookieLifetime)
    }

    function _getPostbackValue() {
        var e = null,
            t = readCookie(__pbval);
        return null != t && (e.name = t, e.value = readCookie(__pbact)),
            e
    }

    function _clearPostBackValues() {
        deleteCookie(__pbact), deleteCookie(__pbval)
    }

    function _getUrl(e, t) {
        var n = document.referrer,
            r = location.href,
            o = __postbackUrl,
            i = _getVisitId();
        o += "?ref=" + encodeURIComponent(n) + "&href=" +
            encodeURIComponent(r) + "&__pid=" + __pid + "&visitid=" +
            encodeURIComponent(i);
        var a = objectToQuery(e);
        o += "&" + a;
        var u = _getPostbackValue();
        null != u && (o += "&postback=" + encodeURIComponent(u.name), o +=
            "&action=" + encodeURIComponent(u.value),
            _clearPostBackValues());
        var l = _getFlashData();
        if ("undefined" != typeof l) {
            var c = objectToQuery(l);
            o += "&" + c
        }
        if ("undefined" != typeof t) {
            var f = objectToQuery(t);
            o += "&" + f
        }
        return o
    }

    function _getFlashData() {
        var e = amplify.store(__flashKey);
        return amplify.store(__flashKey, null), e
    }

    function _storeFlashData(e) {
        amplify.store(__flashKey, e)
    }

    function _submitEvents() {
        function e(e) {
            var t = ("https:" == document.location.protocol ?
                    "https://" : "http://") +
                "ruler.nyltx.com/lib/1.0/ev.js.php?";
            e.sbmUrl = document.location.href;
            var n = _objectToQueryJSON(e);
            _loadScript(t + n)
        }
        var t = amplify.store(__eventKey);
        if (amplify.store(__eventKey, null), t && "undefined" != typeof t)
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                e(r)
            }
        t = amplify.store(__inputKey), t && "undefined" != typeof t &&
            (amplify.store(__inputKey, null), e(t))
    }

    function _createEvent(e, t, n) {
        var r = _makeEventPackage(e);
        return t && (r.elDisplayName = _getNodeDescription(t), r.elSelector =
            _getNodeSelector(t)), n && (r.payload = n), r
    }

    function _storeEvent(e) {
        var t = amplify.store(__eventKey) || [];
        t.push(e), amplify.store(__eventKey, t)
    }

    function _makeEventPackage(e) {
        var t = new Date,
            n = {
                event: e,
                ts: t.getTime().toString(),
                tso: t.getTimezoneOffset(),
                pid: __pid.toString(),
                srcUrl: document.location.href,
                docTitle: document.title,
                siteId: __currentSiteID,
                visitId: __currentVisitID,
                payload: {}
            };
        return n
    }

    function _getNodePayload(e, t) {
        for (var n = {}, r = 0; r < t.length; r++) {
            var o = t[r],
                i = e.getAttribute(o);
            null != i && (n[o] = i)
        }
        return "A" == e.nodeName && e.innerText && e.innerText.length >
            0 && (n.innerText = e.innerText.slice(0, 50)), n
    }

    function _startEventHooking(e, t, n) {
        function r() {
            var e = {
                    referrer: document.referrer
                },
                t = _createEvent("page_load", null, e);
            _storeEvent(t)
        }

        function o(e) {
            function t(t) {
                if (!t) var t = window.event;
                if (t) {
                    var n = t.target;
                    if (n && null != n) {
                        try {
                            var r = _getNodeSelector(n),
                                o = amplify.store(__inputKey) ||
                                _makeEventPackage("change");
                            o.payload[r] = n.value, amplify.store(
                                __inputKey, o)
                        } catch (i) {}
                        return e && "function" == typeof e ? e.apply(
                            this, arguments) : !0
                    }
                }
            }
            return t
        }

        function i(e) {
            function t(t) {
                if (!t) var t = window.event;
                var n = t.relatedTarget || t.toElement;
                if (n && 1 == n.nodeType) {
                    var r = _getNodePayload(n, ["href"]);
                    r.nodeName = n.nodeName;
                    var o = _createEvent("click", n, r);
                    _storeEvent(o)
                }
                return e && "function" == typeof e ? e.apply(
                    this, arguments) : !0
            }
            return t
        }

        function a(e) {
            function t(t) {
                function n(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = _getFormInputId(e[t]),
                            o = _getNodeText(e[t]);
                        "__VIEWSTATE" != n &&
                            "__EVENTVALIDATION" != n && "" !=
                            n && (r[n] = o)
                    }
                }
                if (t) {
                    var r = {},
                        o = Sizzle("input[type!='password']", t
                            .srcElement);
                    n(o);
                    var i = Sizzle("textarea", t.srcElement);
                    for (l = 0; l < i.length; l++) {
                        var a = i[l],
                            u = _getFormInputId(a),
                            c = _getNodeText(a);
                        "" != u && (r[u] = c)
                    }
                    var f = _createEvent("submit", t.srcElement,
                        r);
                    return _storeEvent(f), e && "function" ==
                        typeof e ? e.apply(this, arguments) : !
                        1
                }
            }
            return t
        }
        if (__isHooked = !0, _submitEvents(), e && (document.onclick =
            i(document.onclick)), t && (document.onchange = o(
            document.onchange)), n)
            for (var u = Sizzle("form"), l = 0; l < u.length; l++) {
                var c = u[l];
                c.addEventListener ? c.addEventListener("submit", a(), !
                        1) : c.addEvent ? c.addEvent("onsubmit", a()) :
                    c.onsubmit = a(c.onsubmit)
            }
        r()
    }

    function _getFormInputId(e) {
        var t = e.id;
        return "" == t && (t = e.name), t
    }

    function _getNodeDescription(e) {
        if ("FORM" == e.nodeName) {
            var t = e.getAttribute("action");
            if (null != t) return "form[action='" + t + "']"
        }
        if (e.id) return "#" + e.id;
        var n = e.getAttribute("class"),
            r = e.nodeName.toLowerCase();
        return n && (r += "." + n), r
    }

    function _getSiblingIndex(e) {
        var t = {
            index: 0,
            count: 0
        };
        if (null == e.parentNode) return t;
        for (var n = e.nodeName, r = e.parentNode.firstChild; r; r = r.nextSibling)
            r == e && (t.index = t.count), 1 == r.nodeType && r.nodeName ==
            n && t.count++;
        return t
    }

    function _getNodeSelector(e) {
        if (!e || "BODY" == e.nodeName) return "";
        if (e.id) return "#" + e.id;
        var t = _getSiblingIndex(e),
            n = "",
            r = e.nodeName.toLowerCase();
        return t.count > 1 && (r += ":nth-of-type(" + (t.index + 1) +
            ")"), n = _getNodeSelector(e.parentNode) + " " + r
    }

    function _getNodeText(e) {
        return "LI" == e.nodeName ? e.innerText : "undefined" != typeof e
            .value ? e.value : e.innerText
    }

    function _captureStatic(e) {
        function t(e, t) {
            return t ? e.payloadName + "_" + t : e.payloadName
        }

        function n() {
            try {
                if (!e.items || 0 == e.items.length) return;
                for (var n = {}, r = 0, o = 0; o < e.items.length; o++) {
                    var i = e.items[o],
                        a = Sizzle(i.selector);
                    if ("undefined" != typeof i.offset && !isNaN(i.offset)) {
                        var u = Number(i.offset);
                        a = a.slice(u, u + 1)
                    }
                    for (var l = a.length - 1; l >= 0;) {
                        var c = t(i, l),
                            f = _getNodeText(a[l]);
                        n[c] = f, l--, r++
                    }
                }
                if (0 == r) return;
                _registerAction({
                    action: e.action,
                    uid: e.site_id
                }, n)
            } catch (s) {}
        }
        e.delay > 0 ? window.setTimeout(n, e.delay) : n()
    }

    function _hookFormPost(e) {
        function t(t) {
            function n() {
                try {
                    for (var n = {
                            action: e.action,
                            __hookAction: e.action
                        }, o = Sizzle(e.inputselector, t),
                        i = 0; i < o.length; i++) {
                        var a = o[i],
                            u = _getFormInputId(a);
                        "__VIEWSTATE" != u &&
                            "__EVENTVALIDATION" != u && "" != u &&
                            (n[u] = a.value)
                    }
                    if (_storeFlashData(n), __isHooked) {
                        var l = _createEvent(e.action, t, n);
                        _storeEvent(l)
                    }
                    if (r && "function" == typeof r) return r.apply(
                        this, arguments)
                } catch (c) {}
                return !0
            }
            var r = t.onsubmit;
            return n
        }
        var n = Sizzle(e.formselector);
        if (0 != n.length)
            for (var r = 0; r < n.length; r++) n[r].onsubmit = t(n[r])
    }

    function _polyfillJson(e) {
        return "undefined" == typeof window.JSON ? void _loadScript(
            "//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min.js",
            e) : void(e && "function" == typeof e && e.apply(this))
    }

    function _trackFingerPrint() {
        try {
            var e = {
                    siteid: __currentSiteID,
                    visitid: __currentVisitID,
                    pid: __pid
                },
                t = objectToQuery(e),
                n = ("https:" == document.location.protocol ?
                    "https://" : "http://") +
                "ruler.nyltx.com/lib/1.0/f.php?" + t,
                r = document.createElement("IFRAME");
            r.setAttribute("src", n), r.setAttribute("tabindex", "-1"),
                r.style.width = "0", r.style.height = "0", r.style.display =
                "none", document.body.appendChild(r)
        } catch (o) {}
    }

    function _construct() {
        var e = __raconfig || {
                action: "track",
                uid: "currenturl"
            },
            t = "";
        __pid = (new Date).getTime(), __currentSiteID = __raconfig.uid,
            t = "undefined" != typeof RulerAnalyticsPayload ? _getUrl(e,
                RulerAnalyticsPayload) : _getUrl(e),
            _updateTelFromCache(), _loadScript(t), __currentVisitID !=
            __defaultCookieID && _trackFingerPrint()
    }

    function _runWhenDomReady(e) {
        domready(e)
    }
    var __pid, __pbval = "__pbval",
        __pbact = "__pbact",
        __defaultCookieID = "NULLVID",
        __flashKey = "__raflash",
        __postbackUrl = ("https:" == document.location.protocol ?
            "https://" : "http://") +
        "ruler.nyltx.com/lib/1.0/ra-tracker.js.php",
        __cookieLifetime = 1028,
        __cookieName = "__rasesh",
        __telCookieName = "__ratel",
        __telSelCookieName = "__rasel",
        __telCookieCount = "__racnt",
        __telComplexCookieName = "__racplx",
        __currentSiteID, __currentVisitID, __isHooked = !1;
    "object" != typeof JSON && (JSON = {}),
        function() {
            "use strict";

            function f(e) {
                return 10 > e ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' +
                    e.replace(escapable, function(e) {
                        var t = meta[e];
                        return "string" == typeof t ? t : "\\u" + (
                            "0000" + e.charCodeAt(0).toString(
                                16)).slice(-4)
                    }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, r, o, i, a, u = gap,
                    l = t[e];
                switch (l && "object" == typeof l && "function" ==
                    typeof l.toJSON && (l = l.toJSON(e)), "function" ==
                    typeof rep && (l = rep.call(t, e, l)), typeof l) {
                    case "string":
                        return quote(l);
                    case "number":
                        return isFinite(l) ? String(l) : "null";
                    case "boolean":
                    case "null":
                        return String(l);
                    case "object":
                        if (!l) return "null";
                        if (gap += indent, a = [], "[object Array]" ===
                            Object.prototype.toString.apply(l)) {
                            for (i = l.length, n = 0; i > n; n += 1) a[
                                n] = str(n, l) || "null";
                            return o = 0 === a.length ? "[]" : gap ?
                                "[\n" + gap + a.join(",\n" + gap) +
                                "\n" + u + "]" : "[" + a.join(",") +
                                "]", gap = u, o
                        }
                        if (rep && "object" == typeof rep)
                            for (i = rep.length, n = 0; i > n; n += 1)
                                "string" == typeof rep[n] && (r = rep[n],
                                    o = str(r, l), o && a.push(quote(r) +
                                        (gap ? ": " : ":") + o));
                        else
                            for (r in l) Object.prototype.hasOwnProperty
                                .call(l, r) && (o = str(r, l), o && a.push(
                                    quote(r) + (gap ? ": " : ":") +
                                    o));
                        return o = 0 === a.length ? "{}" : gap ? "{\n" +
                            gap + a.join(",\n" + gap) + "\n" + u + "}" :
                            "{" + a.join(",") + "}", gap = u, o
                }
            }
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON =
                function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() +
                        "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) +
                        "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) +
                        ":" + f(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON =
                Boolean.prototype.toJSON = function() {
                    return this.valueOf()
                });
            var cx =
                /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable =
                /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            "function" != typeof JSON.stringify && (JSON.stringify =
                function(e, t, n) {
                    var r;
                    if (gap = "", indent = "", "number" == typeof n)
                        for (r = 0; n > r; r += 1) indent += " ";
                    else "string" == typeof n && (indent = n); if (rep =
                        t, t && "function" != typeof t && ("object" !=
                            typeof t || "number" != typeof t.length))
                        throw new Error("JSON.stringify");
                    return str("", {
                        "": e
                    })
                }), "function" != typeof JSON.parse && (JSON.parse =
                function(text, reviver) {
                    function walk(e, t) {
                        var n, r, o = e[t];
                        if (o && "object" == typeof o)
                            for (n in o) Object.prototype.hasOwnProperty
                                .call(o, n) && (r = walk(o, n),
                                    void 0 !== r ? o[n] = r :
                                    delete o[n]);
                        return reviver.call(e, t, o)
                    }
                    var j;
                    if (text = String(text), cx.lastIndex = 0, cx.test(
                        text) && (text = text.replace(cx, function(
                        e) {
                        return "\\u" + ("0000" + e.charCodeAt(
                            0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(
                        /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        "@").replace(
                        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                        return j = eval("(" + text + ")"), "function" ==
                            typeof reviver ? walk({
                                "": j
                            }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
        }(), "object" != typeof JSON && (JSON = {}),
        function() {
            "use strict";

            function f(e) {
                return 10 > e ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' +
                    e.replace(escapable, function(e) {
                        var t = meta[e];
                        return "string" == typeof t ? t : "\\u" + (
                            "0000" + e.charCodeAt(0).toString(
                                16)).slice(-4)
                    }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, r, o, i, a, u = gap,
                    l = t[e];
                switch (l && "object" == typeof l && "function" ==
                    typeof l.toJSON && (l = l.toJSON(e)), "function" ==
                    typeof rep && (l = rep.call(t, e, l)), typeof l) {
                    case "string":
                        return quote(l);
                    case "number":
                        return isFinite(l) ? String(l) : "null";
                    case "boolean":
                    case "null":
                        return String(l);
                    case "object":
                        if (!l) return "null";
                        if (gap += indent, a = [], "[object Array]" ===
                            Object.prototype.toString.apply(l)) {
                            for (i = l.length, n = 0; i > n; n += 1) a[
                                n] = str(n, l) || "null";
                            return o = 0 === a.length ? "[]" : gap ?
                                "[\n" + gap + a.join(",\n" + gap) +
                                "\n" + u + "]" : "[" + a.join(",") +
                                "]", gap = u, o
                        }
                        if (rep && "object" == typeof rep)
                            for (i = rep.length, n = 0; i > n; n += 1)
                                "string" == typeof rep[n] && (r = rep[n],
                                    o = str(r, l), o && a.push(quote(r) +
                                        (gap ? ": " : ":") + o));
                        else
                            for (r in l) Object.prototype.hasOwnProperty
                                .call(l, r) && (o = str(r, l), o && a.push(
                                    quote(r) + (gap ? ": " : ":") +
                                    o));
                        return o = 0 === a.length ? "{}" : gap ? "{\n" +
                            gap + a.join(",\n" + gap) + "\n" + u + "}" :
                            "{" + a.join(",") + "}", gap = u, o
                }
            }
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON =
                function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() +
                        "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) +
                        "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) +
                        ":" + f(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON =
                Boolean.prototype.toJSON = function() {
                    return this.valueOf()
                });
            var cx =
                /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable =
                /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            "function" != typeof JSON.stringify && (JSON.stringify =
                function(e, t, n) {
                    var r;
                    if (gap = "", indent = "", "number" == typeof n)
                        for (r = 0; n > r; r += 1) indent += " ";
                    else "string" == typeof n && (indent = n); if (rep =
                        t, t && "function" != typeof t && ("object" !=
                            typeof t || "number" != typeof t.length))
                        throw new Error("JSON.stringify");
                    return str("", {
                        "": e
                    })
                }), "function" != typeof JSON.parse && (JSON.parse =
                function(text, reviver) {
                    function walk(e, t) {
                        var n, r, o = e[t];
                        if (o && "object" == typeof o)
                            for (n in o) Object.prototype.hasOwnProperty
                                .call(o, n) && (r = walk(o, n),
                                    void 0 !== r ? o[n] = r :
                                    delete o[n]);
                        return reviver.call(e, t, o)
                    }
                    var j;
                    if (text = String(text), cx.lastIndex = 0, cx.test(
                        text) && (text = text.replace(cx, function(
                        e) {
                        return "\\u" + ("0000" + e.charCodeAt(
                            0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(
                        /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        "@").replace(
                        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                        return j = eval("(" + text + ")"), "function" ==
                            typeof reviver ? walk({
                                "": j
                            }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
        }(),
        function(e, t) {
            function n(e) {
                return ve.test(e + "")
            }

            function r() {
                var e, t = [];
                return e = function(n, r) {
                    return t.push(n += " ") > T.cacheLength &&
                        delete e[t.shift()], e[n] = r
                }
            }

            function o(e) {
                return e[U] = !0, e
            }

            function i(e) {
                var t = j.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t =
                        null
                }
            }

            function a(e, t, n, r) {
                var o, i, a, u, l, c, f, s, p, m;
                if ((t ? t.ownerDocument || t : z) !== j && O(t), t = t ||
                    j, n = n || [], !e || "string" != typeof e) return n;
                if (1 !== (u = t.nodeType) && 9 !== u) return [];
                if (J && !r) {
                    if (o = _e.exec(e))
                        if (a = o[1]) {
                            if (9 === u) {
                                if (i = t.getElementById(a), !i || !i.parentNode)
                                    return n;
                                if (i.id === a) return n.push(i), n
                            } else if (t.ownerDocument && (i = t.ownerDocument
                                    .getElementById(a)) && F(t, i) && i
                                .id === a) return n.push(i), n
                        } else {
                            if (o[2]) return te.apply(n, t.getElementsByTagName(
                                e)), n;
                            if ((a = o[3]) && q.getElementsByClassName &&
                                t.getElementsByClassName) return te.apply(
                                    n, t.getElementsByClassName(a)),
                                n
                        }
                    if (q.qsa && (!P || !P.test(e))) {
                        if (s = f = U, p = t, m = 9 === u && e, 1 === u &&
                            "object" !== t.nodeName.toLowerCase()) {
                            for (c = d(e), (f = t.getAttribute("id")) ?
                                s = f.replace(xe, "\\$&") : t.setAttribute(
                                    "id", s), s = "[id='" + s + "'] ",
                                l = c.length; l--;) c[l] = s + g(c[l]);
                            p = de.test(e) && t.parentNode || t, m = c.join(
                                ",")
                        }
                        if (m) try {
                            return te.apply(n, p.querySelectorAll(m)),
                                n
                        } catch (y) {} finally {
                            f || t.removeAttribute("id")
                        }
                    }
                }
                return x(e.replace(fe, "$1"), t, n, r)
            }

            function u(e, t) {
                var n = t && e,
                    r = n && (~t.sourceIndex || Y) - (~e.sourceIndex ||
                        Y);
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function l(e, n, r) {
                var o;
                return r ? t : (o = e.getAttributeNode(n)) && o.specified ?
                    o.value : e[n] === !0 ? n.toLowerCase() : null
            }

            function c(e, n, r) {
                var o;
                return r ? t : o = e.getAttribute(n, "type" === n.toLowerCase() ?
                    1 : 2)
            }

            function f(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type ===
                        e
                }
            }

            function p(e) {
                return o(function(t) {
                    return t = +t, o(function(n, r) {
                        for (var o, i = e([], n.length,
                            t), a = i.length; a--;) n[o =
                            i[a]] && (n[o] = !(r[o] =
                            n[o]))
                    })
                })
            }

            function d(e, t) {
                var n, r, o, i, u, l, c, f = $[e + " "];
                if (f) return t ? 0 : f.slice(0);
                for (u = e, l = [], c = T.preFilter; u;) {
                    (!n || (r = se.exec(u))) && (r && (u = u.slice(r[0]
                        .length) || u), l.push(o = [])), n = !1, (r =
                        pe.exec(u)) && (n = r.shift(), o.push({
                        value: n,
                        type: r[0].replace(fe, " ")
                    }), u = u.slice(n.length));
                    for (i in T.filter)!(r = he[i].exec(u)) || c[i] &&
                        !(r = c[i](r)) || (n = r.shift(), o.push({
                            value: n,
                            type: i,
                            matches: r
                        }), u = u.slice(n.length));
                    if (!n) break
                }
                return t ? u.length : u ? a.error(e) : $(e, l).slice(0)
            }

            function g(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++) r +=
                    e[t].value;
                return r
            }

            function m(e, t, n) {
                var r = t.dir,
                    o = n && "parentNode" === r,
                    i = H++;
                return t.first ? function(t, n, i) {
                    for (; t = t[r];)
                        if (1 === t.nodeType || o) return e(t, n, i)
                } : function(t, n, a) {
                    var u, l, c, f = V + " " + i;
                    if (a) {
                        for (; t = t[r];)
                            if ((1 === t.nodeType || o) && e(t, n,
                                a)) return !0
                    } else
                        for (; t = t[r];)
                            if (1 === t.nodeType || o)
                                if (c = t[U] || (t[U] = {}), (l = c[
                                    r]) && l[0] === f) {
                                    if ((u = l[1]) === !0 || u ===
                                        w) return u === !0
                                } else if (l = c[r] = [f], l[1] = e(
                        t, n, a) || w, l[1] === !0) return !0
                }
            }

            function y(e) {
                return e.length > 1 ? function(t, n, r) {
                    for (var o = e.length; o--;)
                        if (!e[o](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function h(e, t, n, r, o) {
                for (var i, a = [], u = 0, l = e.length, c = null != t; l >
                    u; u++)(i = e[u]) && (!n || n(i, r, o)) && (a.push(
                    i), c && t.push(u));
                return a
            }

            function v(e, t, n, r, i, a) {
                return r && !r[U] && (r = v(r)), i && !i[U] && (i = v(i,
                    a)), o(function(o, a, u, l) {
                    var c, f, s, p = [],
                        d = [],
                        g = a.length,
                        m = o || N(t || "*", u.nodeType ? [u] :
                            u, []),
                        y = !e || !o && t ? m : h(m, p, e, u, l),
                        v = n ? i || (o ? e : g || r) ? [] : a :
                        y;
                    if (n && n(y, v, u, l), r)
                        for (c = h(v, d), r(c, [], u, l), f = c
                            .length; f--;)(s = c[f]) && (v[d[f]] = !
                            (y[d[f]] = s));
                    if (o) {
                        if (i || e) {
                            if (i) {
                                for (c = [], f = v.length; f--;)
                                    (s = v[f]) && c.push(y[f] =
                                        s);
                                i(null, v = [], c, l)
                            }
                            for (f = v.length; f--;)(s = v[f]) &&
                                (c = i ? re.call(o, s) : p[f]) >
                                -1 && (o[c] = !(a[c] = s))
                        }
                    } else v = h(v === a ? v.splice(g, v.length) :
                        v), i ? i(null, a, v, l) : te.apply(
                        a, v)
                })
            }

            function _(e) {
                for (var t, n, r, o = e.length, i = T.relative[e[0].type],
                    a = i || T.relative[" "], u = i ? 1 : 0, l = m(
                        function(e) {
                            return e === t
                        }, a, !0), c = m(function(e) {
                        return re.call(t, e) > -1
                    }, a, !0), f = [
                        function(e, n, r) {
                            return !i && (r || n !== A) || ((t = n)
                                .nodeType ? l(e, n, r) : c(e, n,
                                    r))
                        }
                    ]; o > u; u++)
                    if (n = T.relative[e[u].type]) f = [m(y(f), n)];
                    else {
                        if (n = T.filter[e[u].type].apply(null, e[u].matches),
                            n[U]) {
                            for (r = ++u; o > r && !T.relative[e[r].type]; r++)
                            ;
                            return v(u > 1 && y(f), u > 1 && g(e.slice(
                                    0, u - 1)).replace(fe, "$1"), n,
                                r > u && _(e.slice(u, r)), o > r &&
                                _(e = e.slice(r)), o > r && g(e))
                        }
                        f.push(n)
                    }
                return y(f)
            }

            function b(e, t) {
                var n = 0,
                    r = t.length > 0,
                    i = e.length > 0,
                    u = function(o, u, l, c, f) {
                        var s, p, d, g = [],
                            m = 0,
                            y = "0",
                            v = o && [],
                            _ = null != f,
                            b = A,
                            N = o || i && T.find.TAG("*", f && u.parentNode ||
                                u),
                            x = V += null == b ? 1 : Math.random() || .1;
                        for (_ && (A = u !== j && u, w = n); null != (s =
                            N[y]); y++) {
                            if (i && s) {
                                for (p = 0; d = e[p++];)
                                    if (d(s, u, l)) {
                                        c.push(s);
                                        break
                                    }
                                _ && (V = x, w = ++n)
                            }
                            r && ((s = !d && s) && m--, o && v.push(s))
                        }
                        if (m += y, r && y !== m) {
                            for (p = 0; d = t[p++];) d(v, g, u, l);
                            if (o) {
                                if (m > 0)
                                    for (; y--;) v[y] || g[y] || (g[y] =
                                        X.call(c));
                                g = h(g)
                            }
                            te.apply(c, g), _ && !o && g.length > 0 &&
                                m + t.length > 1 && a.uniqueSort(c)
                        }
                        return _ && (V = x, A = b), v
                    };
                return r ? o(u) : u
            }

            function N(e, t, n) {
                for (var r = 0, o = t.length; o > r; r++) a(e, t[r], n);
                return n
            }

            function x(e, t, n, r) {
                var o, i, a, u, l, c = d(e);
                if (!r && 1 === c.length) {
                    if (i = c[0] = c[0].slice(0), i.length > 2 && "ID" ===
                        (a = i[0]).type && 9 === t.nodeType && J && T.relative[
                            i[1].type]) {
                        if (t = (T.find.ID(a.matches[0].replace(Se, Ce),
                            t) || [])[0], !t) return n;
                        e = e.slice(i.shift().value.length)
                    }
                    for (o = he.needsContext.test(e) ? 0 : i.length; o--
                        && (a = i[o], !T.relative[u = a.type]);)
                        if ((l = T.find[u]) && (r = l(a.matches[0].replace(
                                Se, Ce), de.test(i[0].type) &&
                            t.parentNode || t))) {
                            if (i.splice(o, 1), e = r.length && g(i), !
                                e) return te.apply(n, r), n;
                            break
                        }
                }
                return I(e, c)(r, t, !J, n, de.test(e)), n
            }

            function S() {}
            var C, w, T, E, k, I, A, D, O, j, L, J, P, R, B, F, U =
                "sizzle" + -new Date,
                z = e.document,
                q = {},
                V = 0,
                H = 0,
                M = r(),
                $ = r(),
                K = r(),
                Q = !1,
                G = function() {
                    return 0
                },
                W = typeof t,
                Y = 1 << 31,
                Z = [],
                X = Z.pop,
                ee = Z.push,
                te = Z.push,
                ne = Z.slice,
                re = Z.indexOf || function(e) {
                    for (var t = 0, n = this.length; n > t; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                oe =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ie = "[\\x20\\t\\r\\n\\f]",
                ae = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ue = ae.replace("w", "w#"),
                le = "\\[" + ie + "*(" + ae + ")" + ie + "*(?:([*^$|!~]?=)" +
                ie + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ue + ")|)|)" +
                ie + "*\\]",
                ce = ":(" + ae +
                ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
                le.replace(3, 8) + ")*)|.*)\\)|)",
                fe = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
                    ie + "+$", "g"),
                se = new RegExp("^" + ie + "*," + ie + "*"),
                pe = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
                de = new RegExp(ie + "*[+~]"),
                ge = new RegExp("=" + ie + "*([^\\]'\"]*)" + ie + "*\\]",
                    "g"),
                me = new RegExp(ce),
                ye = new RegExp("^" + ue + "$"),
                he = {
                    ID: new RegExp("^#(" + ae + ")"),
                    CLASS: new RegExp("^\\.(" + ae + ")"),
                    TAG: new RegExp("^(" + ae.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + le),
                    PSEUDO: new RegExp("^" + ce),
                    CHILD: new RegExp(
                        "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie +
                        "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie +
                        "*\\)|)", "i"),
                    "boolean": new RegExp("^(?:" + oe + ")$", "i"),
                    needsContext: new RegExp("^" + ie +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        ie + "*((?:-\\d)?\\d*)" + ie +
                        "*\\)|)(?=[^-]|$)", "i")
                },
                ve = /^[^{]+\{\s*\[native \w/,
                _e = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                be = /^(?:input|select|textarea|button)$/i,
                Ne = /^h\d$/i,
                xe = /'|\\/g,
                Se = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                Ce = function(e, t) {
                    var n = "0x" + t - 65536;
                    return n !== n ? t : 0 > n ? String.fromCharCode(n +
                        65536) : String.fromCharCode(n >> 10 | 55296,
                        1023 & n | 56320)
                };
            try {
                te.apply(Z = ne.call(z.childNodes), z.childNodes), Z[z.childNodes
                    .length].nodeType
            } catch (we) {
                te = {
                    apply: Z.length ? function(e, t) {
                        ee.apply(e, ne.call(t))
                    } : function(e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];)
                        ;
                        e.length = n - 1
                    }
                }
            }
            k = a.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, O = a.setDocument = function(e) {
                var r = e ? e.ownerDocument || e : z;
                return r !== j && 9 === r.nodeType && r.documentElement ?
                    (j = r, L = r.documentElement, J = !k(r), q.getElementsByTagName =
                        i(function(e) {
                            return e.appendChild(r.createComment("")), !
                                e.getElementsByTagName("*").length
                        }), q.attributes = i(function(e) {
                            return e.className = "i", !e.getAttribute(
                                "className")
                        }), q.getElementsByClassName = i(function(e) {
                            return e.innerHTML =
                                "<div class='a'></div><div class='a i'></div>",
                                e.firstChild.className = "i", 2 ===
                                e.getElementsByClassName("i").length
                        }), q.sortDetached = i(function(e) {
                            return 1 & e.compareDocumentPosition(j.createElement(
                                "div"))
                        }), q.getById = i(function(e) {
                            return L.appendChild(e).id = U, !r.getElementsByName ||
                                !r.getElementsByName(U).length
                        }), q.getById ? (T.find.ID = function(e, t) {
                            if (typeof t.getElementById !== W && J) {
                                var n = t.getElementById(e);
                                return n && n.parentNode ? [n] : []
                            }
                        }, T.filter.ID = function(e) {
                            var t = e.replace(Se, Ce);
                            return function(e) {
                                return e.getAttribute("id") ===
                                    t
                            }
                        }) : (T.find.ID = function(e, n) {
                            if (typeof n.getElementById !== W && J) {
                                var r = n.getElementById(e);
                                return r ? r.id === e || typeof r.getAttributeNode !==
                                    W && r.getAttributeNode("id").value ===
                                    e ? [r] : t : []
                            }
                        }, T.filter.ID = function(e) {
                            var t = e.replace(Se, Ce);
                            return function(e) {
                                var n = typeof e.getAttributeNode !==
                                    W && e.getAttributeNode(
                                        "id");
                                return n && n.value === t
                            }
                        }), T.find.TAG = q.getElementsByTagName ?
                        function(e, t) {
                            return typeof t.getElementsByTagName !== W ?
                                t.getElementsByTagName(e) : void 0
                        } : function(e, t) {
                            var n, r = [],
                                o = 0,
                                i = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = i[o++];) 1 === n.nodeType &&
                                    r.push(n);
                                return r
                            }
                            return i
                        }, T.find.CLASS = q.getElementsByClassName &&
                        function(e, t) {
                            return typeof t.getElementsByClassName !==
                                W && J ? t.getElementsByClassName(e) :
                                void 0
                        }, R = [], P = [], (q.qsa = n(r.querySelectorAll)) &&
                        (i(function(e) {
                            e.innerHTML =
                                "<select><option selected=''></option></select>",
                                e.querySelectorAll("[selected]")
                                .length || P.push("\\[" + ie +
                                    "*(?:value|" + oe + ")"), e
                                .querySelectorAll(":checked").length ||
                                P.push(":checked")
                        }), i(function(e) {
                            var t = j.createElement("input");
                            t.setAttribute("type", "hidden"), e
                                .appendChild(t).setAttribute(
                                    "t", ""), e.querySelectorAll(
                                    "[t^='']").length && P.push(
                                    "[*^$]=" + ie +
                                    "*(?:''|\"\")"), e.querySelectorAll(
                                    ":enabled").length || P.push(
                                    ":enabled", ":disabled"), e
                                .querySelectorAll("*,:x"), P.push(
                                    ",.*:")
                        })), (q.matchesSelector = n(B = L.webkitMatchesSelector ||
                            L.mozMatchesSelector || L.oMatchesSelector ||
                            L.msMatchesSelector)) && i(function(e) {
                            q.disconnectedMatch = B.call(e, "div"),
                                B.call(e, "[s!='']:x"), R.push("!=",
                                    ce)
                        }), P = P.length && new RegExp(P.join("|")), R =
                        R.length && new RegExp(R.join("|")), F = n(L.contains) ||
                        L.compareDocumentPosition ? function(e, t) {
                            var n = 9 === e.nodeType ? e.documentElement :
                                e,
                                r = t && t.parentNode;
                            return e === r || !(!r || 1 !== r.nodeType ||
                                !(n.contains ? n.contains(r) : e.compareDocumentPosition &&
                                    16 & e.compareDocumentPosition(
                                        r)))
                        } : function(e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e) return !0;
                            return !1
                        }, G = L.compareDocumentPosition ? function(e,
                            t) {
                            if (e === t) return Q = !0, 0;
                            var n = t.compareDocumentPosition && e.compareDocumentPosition &&
                                e.compareDocumentPosition(t);
                            return n ? 1 & n || !q.sortDetached && t.compareDocumentPosition(
                                    e) === n ? e === r || F(z, e) ? -1 :
                                t === r || F(z, t) ? 1 : D ? re.call(D,
                                    e) - re.call(D, t) : 0 : 4 & n ? -1 :
                                1 : e.compareDocumentPosition ? -1 : 1
                        } : function(e, t) {
                            var n, o = 0,
                                i = e.parentNode,
                                a = t.parentNode,
                                l = [e],
                                c = [t];
                            if (e === t) return Q = !0, 0;
                            if (!i || !a) return e === r ? -1 : t === r ?
                                1 : i ? -1 : a ? 1 : D ? re.call(D,
                                    e) - re.call(D, t) : 0;
                            if (i === a) return u(e, t);
                            for (n = e; n = n.parentNode;) l.unshift(n);
                            for (n = t; n = n.parentNode;) c.unshift(n);
                            for (; l[o] === c[o];) o++;
                            return o ? u(l[o], c[o]) : l[o] === z ? -1 :
                                c[o] === z ? 1 : 0
                        }, j) : j
            }, a.matches = function(e, t) {
                return a(e, null, null, t)
            }, a.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== j && O(e), t = t.replace(
                    ge, "='$1']"), q.matchesSelector && J && (!R ||
                    !R.test(t)) && (!P || !P.test(t))) try {
                    var n = B.call(e, t);
                    if (n || q.disconnectedMatch || e.document &&
                        11 !== e.document.nodeType) return n
                } catch (r) {}
                return a(t, j, null, [e]).length > 0
            }, a.contains = function(e, t) {
                return (e.ownerDocument || e) !== j && O(e), F(e, t)
            }, a.attr = function(e, n) {
                (e.ownerDocument || e) !== j && O(e);
                var r = T.attrHandle[n.toLowerCase()],
                    o = r && r(e, n, !J);
                return o === t ? q.attributes || !J ? e.getAttribute(n) :
                    (o = e.getAttributeNode(n)) && o.specified ? o.value :
                    null : o
            }, a.error = function(e) {
                throw new Error(
                    "Syntax error, unrecognized expression: " + e)
            }, a.uniqueSort = function(e) {
                var t, n = [],
                    r = 0,
                    o = 0;
                if (Q = !q.detectDuplicates, D = !q.sortStable && e.slice(
                    0), e.sort(G), Q) {
                    for (; t = e[o++];) t === e[o] && (r = n.push(o));
                    for (; r--;) e.splice(n[r], 1)
                }
                return e
            }, E = a.getText = function(e) {
                var t, n = "",
                    r = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n +=
                            E(e)
                    } else if (3 === o || 4 === o) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += E(t);
                return n
            }, T = a.selectors = {
                cacheLength: 50,
                createPseudo: o,
                match: he,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(Se, Ce), e[3] =
                            (e[4] || e[5] || "").replace(Se, Ce),
                            "~=" === e[2] && (e[3] = " " + e[3] +
                                " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" ===
                            e[1].slice(0, 3) ? (e[3] || a.error(e[0]),
                                e[4] = +(e[4] ? e[5] + (e[6] || 1) :
                                    2 * ("even" === e[3] || "odd" ===
                                        e[3])), e[5] = +(e[7] + e[8] ||
                                    "odd" === e[3])) : e[3] && a.error(
                                e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[5] && e[2];
                        return he.CHILD.test(e[0]) ? null : (e[4] ?
                            e[2] = e[4] : n && me.test(n) && (t =
                                d(n, !0)) && (t = n.indexOf(")",
                                n.length - t) - n.length) && (e[
                                    0] = e[0].slice(0, t), e[2] =
                                n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(Se, Ce).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() ===
                                t
                        }
                    },
                    CLASS: function(e) {
                        var t = M[e + " "];
                        return t || (t = new RegExp("(^|" + ie +
                            ")" + e + "(" + ie + "|$)")) && M(e,
                            function(e) {
                                return t.test("string" ==
                                    typeof e.className && e
                                    .className || typeof e.getAttribute !==
                                    W && e.getAttribute(
                                        "class") || "")
                            })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var o = a.attr(r, e);
                            return null == o ? "!=" === t : t ?
                                (o += "", "=" === t ? o === n :
                                    "!=" === t ? o !== n : "^=" ===
                                    t ? n && 0 === o.indexOf(n) :
                                    "*=" === t ? n && o.indexOf(
                                        n) > -1 : "$=" === t ?
                                    n && o.slice(-n.length) ===
                                    n : "~=" === t ? (" " + o +
                                        " ").indexOf(n) > -1 :
                                    "|=" === t ? o === n || o.slice(
                                        0, n.length + 1) === n +
                                    "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, o) {
                        var i = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            u = "of-type" === t;
                        return 1 === r && 0 === o ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, l) {
                            var c, f, s, p, d, g, m = i !== a ?
                                "nextSibling" :
                                "previousSibling",
                                y = t.parentNode,
                                h = u && t.nodeName.toLowerCase(),
                                v = !l && !u;
                            if (y) {
                                if (i) {
                                    for (; m;) {
                                        for (s = t; s = s[m];)
                                            if (u ? s.nodeName.toLowerCase() ===
                                                h : 1 === s.nodeType
                                            ) return !1;
                                        g = m = "only" === e &&
                                            !g && "nextSibling"
                                    }
                                    return !0
                                }
                                if (g = [a ? y.firstChild : y.lastChild],
                                    a && v) {
                                    for (f = y[U] || (y[U] = {}),
                                        c = f[e] || [], d = c[0] ===
                                        V && c[1], p = c[0] ===
                                        V && c[2], s = d && y.childNodes[
                                            d]; s = ++d && s &&
                                        s[m] || (p = d = 0) ||
                                        g.pop();)
                                        if (1 === s.nodeType &&
                                            ++p && s === t) {
                                            f[e] = [V, d, p];
                                            break
                                        }
                                } else if (v && (c = (t[U] || (
                                        t[U] = {}))[e]) && c[0] ===
                                    V) p = c[1];
                                else
                                    for (;
                                        (s = ++d && s && s[m] ||
                                            (p = d = 0) || g.pop()
                                        ) && ((u ? s.nodeName.toLowerCase() !==
                                            h : 1 !== s.nodeType
                                        ) || !++p || (v &&
                                            ((s[U] || (s[U] = {}))[
                                                e] = [V,
                                                p
                                            ]), s !== t)););
                                return p -= o, p === r || p % r ===
                                    0 && p / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, r = T.pseudos[e] || T.setFilters[e.toLowerCase()] ||
                            a.error("unsupported pseudo: " + e);
                        return r[U] ? r(t) : r.length > 1 ? (n = [e,
                                e, "", t
                            ], T.setFilters.hasOwnProperty(e.toLowerCase()) ?
                            o(function(e, n) {
                                for (var o, i = r(e, t), a =
                                    i.length; a--;) o = re.call(
                                    e, i[a]), e[o] = !(
                                    n[o] = i[a])
                            }) : function(e) {
                                return r(e, 0, n)
                            }) : r
                    }
                },
                pseudos: {
                    not: o(function(e) {
                        var t = [],
                            n = [],
                            r = I(e.replace(fe, "$1"));
                        return r[U] ? o(function(e, t, n, o) {
                            for (var i, a = r(e, null,
                                o, []), u = e.length; u--;)
                                (i = a[u]) && (e[u] = !
                                    (t[u] = i))
                        }) : function(e, o, i) {
                            return t[0] = e, r(t, null, i,
                                n), !n.pop()
                        }
                    }),
                    has: o(function(e) {
                        return function(t) {
                            return a(e, t).length > 0
                        }
                    }),
                    contains: o(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText ||
                                E(t)).indexOf(e) > -1
                        }
                    }),
                    lang: o(function(e) {
                        return ye.test(e || "") || a.error(
                                "unsupported lang: " + e), e =
                            e.replace(Se, Ce).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = J ? t.lang : t.getAttribute(
                                        "xml:lang") || t.getAttribute(
                                        "lang")) return n = n.toLowerCase(),
                                        n === e || 0 === n.indexOf(
                                            e + "-");
                                while ((t = t.parentNode) && 1 ===
                                    t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === L
                    },
                    focus: function(e) {
                        return e === j.activeElement && (!j.hasFocus ||
                            j.hasFocus()) && !!(e.type || e.href ||
                            ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked ||
                            "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex,
                            e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeName > "@" || 3 === e.nodeType ||
                                4 === e.nodeType) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !T.pseudos.empty(e)
                    },
                    header: function(e) {
                        return Ne.test(e.nodeName)
                    },
                    input: function(e) {
                        return be.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type ||
                            "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() &&
                            "text" === e.type && (null == (t = e.getAttribute(
                                    "type")) || t.toLowerCase() ===
                                e.type)
                    },
                    first: p(function() {
                        return [0]
                    }),
                    last: p(function(e, t) {
                        return [t - 1]
                    }),
                    eq: p(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: p(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: p(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: p(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >=
                            0;) e.push(r);
                        return e
                    }),
                    gt: p(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t;)
                            e.push(r);
                        return e
                    })
                }
            };
            for (C in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) T.pseudos[C] = f(C);
            for (C in {
                submit: !0,
                reset: !0
            }) T.pseudos[C] = s(C);
            I = a.compile = function(e, t) {
                    var n, r = [],
                        o = [],
                        i = K[e + " "];
                    if (!i) {
                        for (t || (t = d(e)), n = t.length; n--;) i = _(t[n]),
                            i[U] ? r.push(i) : o.push(i);
                        i = K(e, b(o, r))
                    }
                    return i
                }, T.pseudos.nth = T.pseudos.eq, S.prototype = T.filters =
                T.pseudos, T.setFilters = new S, q.sortStable = U.split("")
                .sort(G).join("") === U, O(), [0, 0].sort(G), q.detectDuplicates =
                Q, i(function(e) {
                    if (e.innerHTML = "<a href='#'></a>", "#" !== e.firstChild
                        .getAttribute("href"))
                        for (var t = "type|href|height|width".split("|"),
                            n = t.length; n--;) T.attrHandle[t[n]] = c
                }), i(function(e) {
                    if (null != e.getAttribute("disabled"))
                        for (var t = oe.split("|"), n = t.length; n--;)
                            T.attrHandle[t[n]] = l
                }), e.Sizzle = a
        }(window),
        function(e, t) {
            function n(e, n) {
                r.addType(e, function(i, a, u) {
                    var l, c, f, s, p = a,
                        d = (new Date).getTime();
                    if (!i) {
                        p = {}, s = [], f = 0;
                        try {
                            for (i = n.length; i = n.key(f++);)
                                o.test(i) && (c = JSON.parse(n.getItem(
                                        i)), c.expires && c.expires <=
                                    d ? s.push(i) : p[i.replace(
                                        o, "")] = c.data);
                            for (; i = s.pop();) n.removeItem(i)
                        } catch (g) {}
                        return p
                    }
                    if (i = "__amplify__" + i, a === t) {
                        if (l = n.getItem(i), c = l ? JSON.parse(
                            l) : {
                            expires: -1
                        }, !(c.expires && c.expires <= d))
                            return c.data;
                        n.removeItem(i)
                    } else if (null === a) n.removeItem(i);
                    else {
                        c = JSON.stringify({
                            data: a,
                            expires: u.expires ? d + u.expires : null
                        });
                        try {
                            n.setItem(i, c)
                        } catch (g) {
                            r[e]();
                            try {
                                n.setItem(i, c)
                            } catch (g) {
                                throw r.error()
                            }
                        }
                    }
                    return p
                })
            }
            var r = e.store = function(e, t, n, o) {
                var o = r.type;
                return n && n.type && n.type in r.types && (o = n.type),
                    r.types[o](e, t, n || {})
            };
            r.types = {}, r.type = null, r.addType = function(e, t) {
                r.type || (r.type = e), r.types[e] = t, r[e] = function(
                    t, n, o) {
                    return o = o || {}, o.type = e, r(t, n, o)
                }
            }, r.error = function() {
                return "amplify.store quota exceeded"
            };
            var o = /^__amplify__/;
            for (var i in {
                localStorage: 1,
                sessionStorage: 1
            }) try {
                window[i].getItem && n(i, window[i])
            } catch (a) {}
            if (window.globalStorage) try {
                    n("globalStorage", window.globalStorage[window.location
                        .hostname]), "sessionStorage" === r.type && (r.type =
                        "globalStorage")
                } catch (a) {}! function() {
                    if (!r.types.localStorage) {
                        var e = document.createElement("div"),
                            n = "amplify";
                        e.style.display = "none", document.getElementsByTagName(
                            "head")[0].appendChild(e);
                        try {
                            e.addBehavior("#default#userdata"), e.load(n)
                        } catch (o) {
                            return void e.parentNode.removeChild(e)
                        }
                        r.addType("userData", function(o, i, a) {
                            e.load(n);
                            var u, l, c, f, s, p = i,
                                d = (new Date).getTime();
                            if (!o) {
                                for (p = {}, s = [], f = 0; u = e.XMLDocument
                                    .documentElement.attributes[f++];
                                ) l = JSON.parse(u.value), l.expires &&
                                    l.expires <= d ? s.push(u.name) :
                                    p[u.name] = l.data;
                                for (; o = s.pop();) e.removeAttribute(
                                    o);
                                return e.save(n), p
                            }
                            if (o = o.replace(
                                /[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,
                                "-"), i === t) {
                                if (u = e.getAttribute(o), l = u ?
                                    JSON.parse(u) : {
                                        expires: -1
                                    }, !(l.expires && l.expires <=
                                        d)) return l.data;
                                e.removeAttribute(o)
                            } else null === i ? e.removeAttribute(o) :
                                (c = e.getAttribute(o), l = JSON.stringify({
                                    data: i,
                                    expires: a.expires ? d +
                                        a.expires : null
                                }), e.setAttribute(o, l));
                            try {
                                e.save(n)
                            } catch (g) {
                                null === c ? e.removeAttribute(o) :
                                    e.setAttribute(o, c), r.userData();
                                try {
                                    e.setAttribute(o, l), e.save(n)
                                } catch (g) {
                                    throw null === c ? e.removeAttribute(
                                        o) : e.setAttribute(o,
                                        c), r.error()
                                }
                            }
                            return p
                        })
                    }
                }(),
                function() {
                    function e(e) {
                        return e === t ? t : JSON.parse(JSON.stringify(
                            e))
                    }
                    var n = {},
                        o = {};
                    r.addType("memory", function(r, i, a) {
                        return r ? i === t ? e(n[r]) : (o[r] && (
                                clearTimeout(o[r]), delete o[r]
                            ), null === i ? (delete n[r], null) :
                            (n[r] = i, a.expires && (o[r] =
                                setTimeout(function() {
                                    delete n[r], delete o[
                                        r]
                                }, a.expires)), i)) : e(n)
                    })
                }()
        }(this.amplify = this.amplify || {});
    var __eventKey = "eventskey",
        __inputKey = "eventsInput";
    return domready(function() {
        _polyfillJson(_construct)
    }), {
        SetVisitId: _setVisitId,
        CacheCurrent: _cacheTelNumbers,
        RegisterAction: _registerAction,
        Reset: _reset,
        SetPostbackValue: _setPostback,
        SetPhoneNumbers: _cacheTelNumbers,
        HookForm: _hookFormPost,
        HookStatic: _captureStatic,
        __sz: Sizzle,
        EvH: _startEventHooking,
        Ready: _runWhenDomReady
    }
}();*/