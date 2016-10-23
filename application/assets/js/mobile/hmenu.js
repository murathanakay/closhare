(function (e) {
    var t = !1,
        i = !1,
        o = {
            isUrl: function (e) {
                var t = RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
                return t.test(e) ? !0 : !1
            },
            loadContent: function (e, t) {
                e.html(t)
            },
            addPrefix: function (e) {
                var t = e.attr("id"),
                    i = e.attr("class");
                "string" == typeof t && "" !== t && e.attr("id", t.replace(/([A-Za-z0-9_.\-]+)/g, "sbar-id-$1")), "string" == typeof i && "" !== i && "sbar-inner" !== i && e.attr("class", i.replace(/([A-Za-z0-9_.\-]+)/g, "sbar-class-$1")), e.removeAttr("style")
            },
            execute: function (o, n, s) {
                "function" == typeof n ? (s = n, n = "sbar") : n || (n = "sbar");
                var a, d, l, c = e("#" + n),
                    f = e(c.data("body")),
                    u = e("html"),
                    p = c.outerWidth(!0),
                    y = c.data("speed"),
                    v = c.data("side");
                if ("open" === o || "toogle" === o && !c.is(":visible")) {
                    if (c.is(":visible") || t) return;
                    if (i !== !1) return r.close(i, function () {
                        r.open(n)
                    }), void 0;
                    t = !0, "left" === v ? (a = {
                        left: p + "px"
                    }, d = {
                        left: "0px"
                    }) : (a = {
                        right: p + "px"
                    }, d = {
                        right: "0px"
                    }), l = u.scrollTop(), u.css("overflow-x", "hidden").scrollTop(l), f.css({
                        width: f.width(),
                        position: "absolute"
                    }).animate(a, y), c.css("display", "block").animate(d, y, function () {
                        t = !1, i = n, "function" == typeof s && s(n)
                    })
                } else {
                    if (!c.is(":visible") || t) return;
                    t = !0, "left" === v ? (a = {
                        left: 0
                    }, d = {
                        left: "-" + p + "px"
                    }) : (a = {
                        right: 0
                    }, d = {
                        right: "-" + p + "px"
                    }), l = u.scrollTop(), u.removeAttr("style").scrollTop(l), f.animate(a, y), c.animate(d, y, function () {
                        c.removeAttr("style"), f.removeAttr("style"), e("html").removeAttr("style"), t = !1, i = !1, "function" == typeof s && s(n)
                    })
                }
                return false;
            }
        }, r = {
            open: function (e, t) {
                o.execute("open", e, t);
                return false;
            },
            close: function (e, t) {
                o.execute("close", e, t);
                return false;
            },
            toogle: function (e, t) {
                o.execute("toogle", e, t);
                return false;
            }
        };
    e.sbar = function (t) {
        return r[t] ? r[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof t && "string" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sbar"), void 0) : r.toogle.apply(this, arguments)
    }, e.fn.sbar = function (t) {
        var i = e.extend({
            name: "sbar",
            speed: 2,
            side: "right",
            source: null,
            renaming: !0,
            body: "body"
        }, t),
            n = i.name,
            s = e("#" + n);
        if (0 === s.length && (s = e("<div />").attr("id", n).appendTo(e("body"))), s.addClass("sbar").addClass(i.side).data({
            speed: i.speed,
            side: i.side,
            body: i.body
        }), "function" == typeof i.source) {
            var a = i.source(n);
            o.loadContent(s, a)
        } else if ("string" == typeof i.source && o.isUrl(i.source)) e.get(i.source, function (e) {
            o.loadContent(s, e)
        });
        else if ("string" == typeof i.source) {
            var d = "",
                l = i.source.split(",");
            if (e.each(l, function (t, i) {
                d += '<div class="sbar-inner">' + e(i).html() + "</div>"
            }), i.renaming) {
                var c = e("<div />").html(d);
                c.find("*").each(function (t, i) {
                    var r = e(i);
                    o.addPrefix(r)
                }), d = c.html()
            }
            o.loadContent(s, d)
        } else null !== i.source && e.error("Invalid Sbar Source");
        return this.each(function () {
            var t = e(this),
                i = t.data("sbar");
            i || (t.data("sbar", n), t.click(function (e) {
                e.preventDefault(), r.toogle(n)
                return;
            }))
        })
    }
})(jQuery);