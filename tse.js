"use strict";
(self.webpackChunkmy_cubing_ui = self.webpackChunkmy_cubing_ui || []).push([[17, 69], {
    5161: function (e, t, r) {
        r.d(t, {
            M: function () {
                return a
            }, A: function () {
                return c
            }
        });
        var n = r(2559), a = function (e, t) {
            return t ? (0, n.jsx)("span", {className: "badge text-bg-danger record-badge", children: "GR"}) : e ? (0, n.jsx)("span", {
                className: "badge text-bg-success record-badge",
                children: "PB"
            }) : (0, n.jsx)("span", {className: "badge record-badge empty-badge", children: "EE"})
        }, c = function (e, t, r) {
            var c = {margin: "0", color: "", verticalAlign: "text-center"};
            return t ? c.color = "red" : e && (c.color = "green"), (0, n.jsxs)("p", {style: c, children: [a(e, t), " ", r]})
        }
    }, 4079: function (e, t, r) {
        r.d(t, {
            Pt: function () {
                return m
            }, iw: function () {
                return j
            }, oX: function () {
                return d
            }, ar: function () {
                return o
            }
        });
        var n = r(5400), a = r(4383), c = r(8450), s = r(5161), l = (r(390), r(4730)), i = r(2559);

        function o(e) {
            var t = new Map;
            if (null === e || void 0 === e || 0 === e.length) return t;
            for (var r = 0; r < e.length; r++) {
                var n = e[r], a = n.Score.ID.toString() + n.Record.RType.toString();
                t.set(a, n)
            }
            return t
        }

        var d = function (e) {
            return e[e.RecordByAvg = 1] = "RecordByAvg", e[e.RecordBySingle = 2] = "RecordBySingle", e
        }({}), u = function (e, t, r, a) {
            return (0, i.jsx)("div", {
                style: {overflowX: "auto"}, children: (0, i.jsxs)("table", {
                    className: "table table-bordered table-striped table-hover text-center",
                    style: {minWidth: "800px"},
                    children: [(0, i.jsx)("thead", {
                        children: (0, i.jsxs)("tr", {
                            children: [(0, i.jsx)("th", {children: "\u6392\u540d"}), (0, i.jsx)("th", {children: "\u9009\u624b"}), (0, i.jsx)("th", {children: "\u5355\u6b21"}), (0, i.jsx)("th", {children: "\u5e73\u5747"}), (0, i.jsx)("th", {
                                colSpan: e,
                                children: "\u8be6\u60c5"
                            })]
                        })
                    }), (0, i.jsx)("tbody", {
                        children: function () {
                            var l = [];
                            if (void 0 === r || null === r || 0 === r.length) return l;
                            for (var o = 0; o < r.length; o++) {
                                var u = r[o], h = void 0 !== a && void 0 !== a.get(u.ID.toString() + d.RecordBySingle.toString()),
                                    x = void 0 !== a && void 0 !== a.get(u.ID.toString() + d.RecordByAvg.toString()),
                                    p = (0, i.jsxs)(i.Fragment, {children: [(0, i.jsx)("td", {children: (0, c.u)(u.R2, t, !1)}), (0, i.jsx)("td", {children: (0, c.u)(u.R3, t, !1)})]}),
                                    f = (0, i.jsxs)(i.Fragment, {children: [(0, i.jsx)("td", {children: (0, c.u)(u.R4, t, !1)}), (0, i.jsx)("td", {children: (0, c.u)(u.R5, t, !1)})]});
                                e < 3 && (p = (0, i.jsx)(i.Fragment, {})), e < 5 && (f = (0, i.jsx)(i.Fragment, {})), l.push((0, i.jsxs)("tr", {
                                    className: o < 3 ? "table-success" : "",
                                    children: [(0, i.jsx)("td", {className: "idxTd", children: o + 1}), (0, i.jsx)("td", {
                                        children: (0, i.jsx)(n.rU, {
                                            to: "/player?id=" + u.PlayerID,
                                            children: u.PlayerName
                                        })
                                    }), (0, i.jsxs)("td", {children: [(0, s.M)(u.IsBestSingle, h), (0, c.u)(u.Best, t, !1)]}), (0, i.jsxs)("td", {children: [(0, s.M)(u.IsBestAvg, x), (0, c.u)(u.Avg, t, !0)]}), (0, i.jsx)("td", {children: (0, c.u)(u.R1, t, !1)}), p, f]
                                }, "NumberDefaultResultCubeScoresTable" + u.ID))
                            }
                            return l
                        }()
                    })]
                })
            })
        }, h = function (e, t, r) {
            return u(1, e, t, r)
        }, x = function (e, t, r) {
            return u(3, e, t, r)
        }, p = function (e, t, r) {
            return u(5, e, t, r)
        }, f = function (e, t, r) {
            return (0, i.jsxs)("table", {
                className: "table table-bordered table-striped table-hover",
                children: [(0, i.jsx)("thead", {children: (0, i.jsxs)("tr", {children: [(0, i.jsx)("th", {children: "\u6392\u540d"}), (0, i.jsx)("th", {children: "\u9009\u624b"}), (0, i.jsx)("th", {children: "\u5206\u6570"}), (0, i.jsx)("th", {children: "\u8fd8\u539f\u6570"}), (0, i.jsx)("th", {children: "\u5c1d\u8bd5\u6570"}), (0, i.jsx)("th", {children: "\u65f6\u95f4"})]})}), (0, i.jsx)("tbody", {
                    children: function () {
                        var a = [];
                        if (void 0 === t || null === t || 0 === t.length) return a;
                        for (var l = 0; l < t.length; l++) {
                            var o = t[l], u = void 0 !== r && void 0 !== r.get(o.ID.toString() + d.RecordBySingle.toString());
                            a.push((0, i.jsxs)("tr", {
                                children: [(0, i.jsx)("td", {children: l + 1}), (0, i.jsx)("td", {
                                    children: (0, i.jsx)(n.rU, {
                                        to: "/player?id=" + o.PlayerID,
                                        children: o.PlayerName
                                    })
                                }), (0, i.jsxs)("td", {children: ["(", o.R1, " / ", o.R2, ")", (0, s.M)(o.IsBestSingle, u)]}), (0, i.jsx)("td", {children: (0, c.u)(o.R1, e, !1)}), (0, i.jsx)("td", {children: (0, c.u)(o.R2, e, !1)}), (0, i.jsx)("td", {children: (0, c.u)(o.R3, e, !0)})]
                            }, "MBFCube333ScoreTable" + e + o.ID))
                        }
                        return a
                    }()
                })]
            })
        }, j = function (e, t, r) {
            var n = o(r), c = p;
            switch ((0, a.tB)(e)) {
                case 1:
                    c = h;
                    break;
                case 3:
                    c = x
            }
            return l.FO.get(e).RouteType === l.FA.RouteTypeRepeatedly && (c = f), c ? c(e, t, n) : (0, i.jsx)("table", {className: "table table-bordered table-striped"})
        }, m = function (e) {
            if (l.FO.get(e.Project).RouteType === l.FA.RouteTypeRepeatedly) return (0, i.jsxs)("td", {
                colSpan: 5,
                children: [(0, c.u)(e.R1, e.Project, !1), " / ", (0, c.u)(e.R2, e.Project, !1), " (", (0, c.u)(e.R3, l.GR.Cube333, !0), ")"]
            });
            var t = (0, a.tB)(e.Project), r = [(0, i.jsx)("td", {children: (0, c.u)(e.R1, e.Project, !1)})];
            t >= 3 && (r.push((0, i.jsx)("td", {children: (0, c.u)(e.R2, e.Project, !1)})), r.push((0, i.jsx)("td", {children: (0, c.u)(e.R3, e.Project, !1)}))), t >= 5 && (r.push((0, i.jsx)("td", {children: (0, c.u)(e.R4, e.Project, !1)})), r.push((0, i.jsx)("td", {children: (0, c.u)(e.R5, e.Project, !1)})));
            for (var n = r.length + 1; n <= 5; n++) r.push((0, i.jsx)("td", {}));
            return r
        }
    }, 8450: function (e, t, r) {
        r.d(t, {
            s: function () {
                return s
            }, u: function () {
                return c
            }
        });
        var n = r(4730), a = r(2559);

        function c(e, t, r) {
            if (isNaN(e)) return "DNF";
            if (-10001 === e) return "DNS";
            if (-1e4 === e) return "DNF";
            if (n.FO.get(t).RouteType === n.FA.RouteTypeRepeatedly && !r) return e.toFixed(0);
            if (t === n.GR.Cube333FM && r) return e.toFixed(2);
            if (e < 60) return e.toFixed(2);
            var a = Math.floor(e / 60), c = (e % 60).toFixed(2).padStart(5, "0");
            return "".concat(a, ":").concat(c)
        }

        function s(e) {
            return 0 === e || void 0 === e ? (0, a.jsx)("i", {style: {color: "grey"}, children: "DNF"}) : -1 === e ? (0, a.jsx)("i", {
                style: {color: "grey"},
                children: "DNS"
            }) : (0, a.jsx)("i", {style: {color: 1 === e ? "red" : ""}, children: e})
        }
    }, 4383: function (e, t, r) {
        r.d(t, {
            Je: function () {
                return l
            }, Z2: function () {
                return c
            }, tB: function () {
                return a
            }, u9: function () {
                return s
            }
        });
        var n = r(4730);

        function a(e) {
            if (void 0 === e) return 0;
            var t = n.FO.get(e);
            return void 0 === t ? 0 : (0, n.xv)(t.RouteType)
        }

        var c = function (e) {
            var t = n.FO.get(e);
            return void 0 === t || null === t ? e + "" : t.Cn
        }, s = function () {
            var e = [];
            return n.IF.forEach((function (t) {
                e.push(t.Cubes)
            })), e
        }, l = function () {
            var e = [];
            return n.IF.forEach((function (t) {
                t.IsWCA && e.push(t.Cubes)
            })), e
        }
    }, 7293: function (e, t, r) {
        r.d(t, {
            F: function () {
                return c
            }
        });
        var n = r(4383), a = r(2559), c = function (e) {
            var t = "cubing-icon-" + e;
            return (0, a.jsx)("i", {className: "cubing-icon " + t, "data-toggle": "tooltip", "data-placement": "top", title: (0, n.Z2)(e)})
        }
    }, 5415: function (e, t, r) {
        r(390);
        var n = r(5171), a = r(2559);
        t.Z = function () {
            return (0, a.jsx)("div", {
                className: "text-center", children: (0, a.jsxs)(n.ZP, {
                    width: 1920,
                    height: 1280,
                    viewBox: "0 0 1920 1280",
                    backgroundColor: "#eaeced",
                    foregroundColor: "#ffffff",
                    children: [(0, a.jsx)("rect", {x: "51", y: "45", rx: "3", ry: "3", width: "906", height: "17"}), (0, a.jsx)("circle", {
                        cx: "879",
                        cy: "123",
                        r: "11"
                    }), (0, a.jsx)("circle", {cx: "914", cy: "123", r: "11"}), (0, a.jsx)("rect", {x: "104", y: "115", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "305",
                        y: "114",
                        rx: "3",
                        ry: "3",
                        width: "299",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "661", y: "114", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "55",
                        y: "155",
                        rx: "3",
                        ry: "3",
                        width: "897",
                        height: "2"
                    }), (0, a.jsx)("circle", {cx: "880", cy: "184", r: "11"}), (0, a.jsx)("circle", {cx: "915", cy: "184", r: "11"}), (0, a.jsx)("rect", {
                        x: "105",
                        y: "176",
                        rx: "3",
                        ry: "3",
                        width: "141",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "306", y: "175", rx: "3", ry: "3", width: "299", height: "15"}), (0, a.jsx)("rect", {
                        x: "662",
                        y: "175",
                        rx: "3",
                        ry: "3",
                        width: "141",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "56", y: "216", rx: "3", ry: "3", width: "897", height: "2"}), (0, a.jsx)("circle", {cx: "881", cy: "242", r: "11"}), (0, a.jsx)("circle", {
                        cx: "916",
                        cy: "242",
                        r: "11"
                    }), (0, a.jsx)("rect", {x: "106", y: "234", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "307",
                        y: "233",
                        rx: "3",
                        ry: "3",
                        width: "299",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "663", y: "233", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "57",
                        y: "274",
                        rx: "3",
                        ry: "3",
                        width: "897",
                        height: "2"
                    }), (0, a.jsx)("circle", {cx: "882", cy: "303", r: "11"}), (0, a.jsx)("circle", {cx: "917", cy: "303", r: "11"}), (0, a.jsx)("rect", {
                        x: "107",
                        y: "295",
                        rx: "3",
                        ry: "3",
                        width: "141",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "308", y: "294", rx: "3", ry: "3", width: "299", height: "15"}), (0, a.jsx)("rect", {
                        x: "664",
                        y: "294",
                        rx: "3",
                        ry: "3",
                        width: "141",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "58", y: "335", rx: "3", ry: "3", width: "897", height: "2"}), (0, a.jsx)("circle", {cx: "881", cy: "363", r: "11"}), (0, a.jsx)("circle", {
                        cx: "916",
                        cy: "363",
                        r: "11"
                    }), (0, a.jsx)("rect", {x: "106", y: "355", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "307",
                        y: "354",
                        rx: "3",
                        ry: "3",
                        width: "299",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "663", y: "354", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "57",
                        y: "395",
                        rx: "3",
                        ry: "3",
                        width: "897",
                        height: "2"
                    }), (0, a.jsx)("circle", {cx: "882", cy: "424", r: "11"}), (0, a.jsx)("circle", {cx: "917", cy: "424", r: "11"}), (0, a.jsx)("rect", {
                        x: "107",
                        y: "416",
                        rx: "3",
                        ry: "3",
                        width: "141",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "308", y: "415", rx: "3", ry: "3", width: "299", height: "15"}), (0, a.jsx)("rect", {
                        x: "664",
                        y: "415",
                        rx: "3",
                        ry: "3",
                        width: "141",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "55", y: "453", rx: "3", ry: "3", width: "897", height: "2"}), (0, a.jsx)("rect", {
                        x: "51",
                        y: "49",
                        rx: "3",
                        ry: "3",
                        width: "2",
                        height: "465"
                    }), (0, a.jsx)("rect", {x: "955", y: "49", rx: "3", ry: "3", width: "2", height: "465"}), (0, a.jsx)("circle", {cx: "882", cy: "484", r: "11"}), (0, a.jsx)("circle", {
                        cx: "917",
                        cy: "484",
                        r: "11"
                    }), (0, a.jsx)("rect", {x: "107", y: "476", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "308",
                        y: "475",
                        rx: "3",
                        ry: "3",
                        width: "299",
                        height: "15"
                    }), (0, a.jsx)("rect", {x: "664", y: "475", rx: "3", ry: "3", width: "141", height: "15"}), (0, a.jsx)("rect", {
                        x: "55",
                        y: "513",
                        rx: "3",
                        ry: "3",
                        width: "897",
                        height: "2"
                    }), (0, a.jsx)("rect", {x: "52", y: "80", rx: "3", ry: "3", width: "906", height: "17"}), (0, a.jsx)("rect", {
                        x: "53",
                        y: "57",
                        rx: "3",
                        ry: "3",
                        width: "68",
                        height: "33"
                    }), (0, a.jsx)("rect", {x: "222", y: "54", rx: "3", ry: "3", width: "149", height: "33"}), (0, a.jsx)("rect", {
                        x: "544",
                        y: "55",
                        rx: "3",
                        ry: "3",
                        width: "137",
                        height: "33"
                    }), (0, a.jsx)("rect", {x: "782", y: "56", rx: "3", ry: "3", width: "72", height: "33"}), (0, a.jsx)("rect", {x: "933", y: "54", rx: "3", ry: "3", width: "24", height: "33"})]
                })
            })
        }
    }, 5269: function (e, t, r) {
        r.d(t, {
            T: function () {
                return c
            }
        });
        var n = r(8175), a = (r(390), r(2559)), c = function (e) {
            var t = e.Id, r = e.Count, c = e.CurPage, s = e.Size, l = e.Link, i = 1 === c, o = Math.ceil(r / s), d = c === o;
            return (0, a.jsx)(n.Z, {
                children: function () {
                    var u = [], h = "?" + e.PageKey;
                    -1 !== l.indexOf("?") && (h = "&" + e.PageKey), u.push((0, a.jsx)(n.Z.First, {
                        disabled: i,
                        href: "".concat(l).concat(h, "=", 1)
                    }, "".concat(t, "-first"))), u.push((0, a.jsx)(n.Z.Prev, {disabled: i, href: "".concat(l).concat(h, "=").concat(c - 1)}, "".concat(t, "-prev")));
                    var x = Math.max(1, c - Math.floor(3.5)), p = Math.min(o, x + 7 - 1);
                    p - x < 6 && (x = Math.max(1, p - 7 + 1));
                    for (var f = x; f <= p; f++) f <= o && u.push((0, a.jsx)(n.Z.Item, {active: f === c, href: "".concat(l).concat(h, "=").concat(f), children: f}, "".concat(t, "-page-").concat(f)));
                    return u.push((0, a.jsx)(n.Z.Next, {disabled: d, href: "".concat(l).concat(h, "=").concat(c + 1)}, "".concat(t, "-next"))), u.push((0, a.jsx)(n.Z.Last, {
                        disabled: d,
                        href: "".concat(l).concat(h, "=").concat(Math.ceil(r / s))
                    }, "".concat(t, "-last"))), u
                }()
            })
        }
    }, 4228: function (e, t, r) {
        r.d(t, {
            K: function () {
                return c
            }
        });
        r(390);
        var n = r(8551), a = r(2559), c = function (e) {
            if (void 0 === e.Pages || 0 === e.Pages.length) return (0, a.jsx)("div", {});
            var t = (0, n.eV)(), r = void 0 === t[e.SelectedKey] ? e.Pages[0].Id : t[e.SelectedKey], c = e.Center ? " justify-content-center" : "";
            return (0, a.jsxs)("div", {
                children: [(0, a.jsx)("ul", {
                    className: "nav nav-tabs" + c, role: "tablist", children: Array.from(Array(e.Pages.length), (function (t, c) {
                        var s, l = e.Pages[c].Id === r ? "active" : "";
                        return (0, a.jsx)("li", {
                            className: "nav-item",
                            role: "presentation",
                            children: (0, a.jsx)("button", {
                                className: "nav-link " + l,
                                id: e.Id + e.Pages[c].Id + "-tab",
                                "data-bs-toggle": "tab",
                                "data-bs-target": "#" + e.Id + e.Pages[c].Id,
                                type: "button",
                                role: "tab",
                                "aria-controls": e.Id + e.Pages[c].Id,
                                "aria-selected": e.Pages[c].Id === r,
                                onClick: (s = e.Pages[c].Id, function () {
                                    (0, n.$H)(e.SelectedKey, s)
                                }),
                                children: e.Pages[c].Name
                            }, "tab_tabs_button_" + e.Pages[c].Id)
                        }, "tab_tabs_nav_" + e.Pages[c].Id)
                    }))
                }, "tab_tabs_base_ul" + e.Id), (0, a.jsx)("div", {
                    className: "tab-content", children: Array.from(Array(e.Pages.length), (function (t, n) {
                        var c = e.Pages[n].Id === r ? " show active" : "";
                        return (0, a.jsx)("div", {
                            className: "tab-pane fade" + c,
                            id: e.Id + e.Pages[n].Id,
                            role: "tabpanel",
                            "aria-labelledby": e.Id + e.Pages[n].Id + "-tab",
                            tabIndex: n,
                            children: e.Pages[n].Page
                        }, "tabs_pane_" + e.Pages[n].Id)
                    }))
                })]
            }, e.Id)
        }
    }, 8551: function (e, t, r) {
        function n() {
            return function (e) {
                var t = new URLSearchParams(e.split("?")[1]), r = {};
                return t.forEach((function (e, t) {
                    -1 !== e.indexOf("#") ? (r[t] = e.split("#")[0], r["#"] = e.split("#")[1]) : r[t] = e
                })), r
            }(window.location.href)
        }

        function a(e) {
            var t = n();
            return t[e] ? t[e] : ""
        }

        function c(e, t) {
            var r = new URLSearchParams(window.location.search);
            r.has(e) ? r.set(e, t) : r.append(e, t);
            var n = window.location.pathname + "?" + r.toString();
            window.history.pushState({path: n}, "", n)
        }

        function s(e) {
            document.title = e + "| \u5e7f\u5dde\u9b54\u7f18\u9b54\u65b9"
        }

        r.d(t, {
            $H: function () {
                return c
            }, eV: function () {
                return n
            }, nM: function () {
                return a
            }, rE: function () {
                return s
            }
        })
    }, 5017: function (e, t, r) {
        r.r(t), r.d(t, {
            default: function () {
                return ae
            }
        });
        var n = r(5671), a = r(3144), c = r(136), s = r(516), l = r(390), i = r(1122), o = r(4228), d = r(4165), u = r(5861), h = r(4383), x = r(4730), p = r(8551), f = r(8450), j = r(9439);

        function m(e) {
            var t = function (e) {
                if ("DNF" === e) return -1e4;
                if ("DNS" === e) return -10001;
                if (/^\d+(\.\d+)?$/.test(e)) return parseFloat(e);
                if (/^\d{1,2}[:\uff1a]\d{2}(\.\d+)?$/.test(e)) {
                    var t = e.split(/[:\uff1a]/), r = (0, j.Z)(t, 2), n = r[0], a = r[1];
                    return 60 * parseFloat(n) + parseFloat(a)
                }
                if (/^\d{1,2}[:\uff1a]\d{2}[:\uff1a]\d{3}(\.\d+)?$/.test(e)) {
                    var c = e.split(/[:\uff1a]/), s = (0, j.Z)(c, 3), l = s[0], i = s[1], o = s[2];
                    return 3600 * parseFloat(l) + 60 * parseFloat(i) + parseFloat(o)
                }
                return -1e4
            }(e);
            return parseFloat(t.toString())
        }

        var v = r(2559), y = function () {
            }, g = function (e, t, r, n) {
                return (0, v.jsx)("button", {type: "button", className: "btn " + n, "data-bs-toggle": "modal", "data-bs-target": "#" + t, onClick: r, children: e})
            }, b = function (e, t, r, n) {
                var a = r + "Label";
                return (0, v.jsx)("div", {
                    className: "modal fade",
                    id: r,
                    "data-bs-backdrop": "static",
                    "data-bs-keyboard": "false",
                    tabIndex: -1,
                    "aria-labelledby": a,
                    "aria-hidden": "true",
                    children: (0, v.jsx)("div", {
                        className: "modal-dialog modal-xl modal-dialog-centered",
                        children: (0, v.jsxs)("div", {
                            className: "modal-content",
                            children: [(0, v.jsxs)("div", {
                                className: "modal-header",
                                children: [(0, v.jsx)("h1", {className: "modal-title fs-5", id: a, children: e}), (0, v.jsx)("button", {
                                    type: "button",
                                    className: "btn-close",
                                    "data-bs-dismiss": "modal",
                                    "aria-label": "Close"
                                })]
                            }), (0, v.jsx)("div", {className: "modal-body", children: t()}), (0, v.jsxs)("div", {
                                className: "modal-footer",
                                children: [(0, v.jsx)("button", {
                                    type: "button",
                                    className: "btn btn-secondary",
                                    "data-bs-dismiss": "modal",
                                    children: "\u5173\u95ed"
                                }), (0, v.jsx)("button", {type: "button", className: "btn btn-danger", onClick: n, children: "\u786e\u8ba4"})]
                            })]
                        })
                    })
                })
            }, N = r(4079), P = r(8492), _ = r(7293), S = "_player", I = "_contest", C = "_cubes", D = "_playerSelectID", w = "_contestSelectID", R = "_projectSelectID", k = "_roundSelectID",
            A = "_ScoreInputKey_", Z = "text-bg-secondary", F = "_renderPenaltyListKey",
            T = [{name: "\u8d77\u8868\u65f6\u9b54\u65b9\u5728\u8ba1\u65f6\u5668\u4e0a", color: "#007bff", explain: "", add: 2}, {
                name: "\u8d77\u8868\u4e0d\u89c4\u8303",
                color: "#17a2b8",
                explain: "\u5982\u5b58\u5728\u624b\u5fc3\u5411\u9b54\u65b9\u7684\u8d77\u8868\u52a8\u4f5c",
                add: 2
            }, {
                name: "\u8d77\u8868\u65f6\u89e6\u78b0\u9b54\u65b9",
                color: "#28a745",
                explain: "\u4e00\u5207\u6709\u610f\u6216\u65e0\u610f\u5728\u8d77\u8868\u8fc7\u7a0b\u4e2d\u89e6\u78b0\u9b54\u65b9\u7684\u52a8\u4f5c",
                add: 2
            }, {
                name: "\u89c2\u5bdf\u8d85\u8fc715\u79d2",
                color: "#6610f2",
                explain: "\u89c2\u5bdf\u65f6\u95f4\u5927\u4e8e15\u79d2\u5c0f\u4e8e17\u79d2",
                add: 2
            }, {name: "\u62cd\u8868\u65f6\u89e6\u78b0\u9b54\u65b9", color: "#fd7e14", explain: "", add: 2}, {
                name: "\u62cd\u8868\u4e0d\u89c4\u8303",
                color: "#e83e8c",
                explain: "\u5982\u5b58\u5728\u624b\u5fc3\u5411\u9b54\u65b9\u7684\u62cd\u8868\u52a8\u4f5c",
                add: 2
            }, {
                name: "\u62cd\u8868\u540e\u89e6\u78b0\u9b54\u65b9",
                color: "#c90bd0",
                explain: "\u62cd\u8868\u540e\u5b58\u5728\u89e6\u78b0\u52a8\u4f5c",
                add: 2
            }, {
                name: "\u9b54\u65b9\u5b58\u5728\u4e00\u6b65\u8fd8\u539f",
                color: "#ffc107",
                explain: "\u4e0d\u540c\u9b54\u65b9\u6709\u4e0d\u540c\u7684\u9274\u5b9a\u6807\u51c6\uff0c\u4e00\u822c\u4ee51/8\u89d2\u5ea6\u5185\u8fd8\u539f\u4f5c\u4e3a\u754c\u9650",
                add: 2
            }, {name: "\u6ca1\u6709\u83ca\u7206\u6d69\u6d69", color: "#32f548", explain: "\u83ca\u7206\u6d69\u6d69\u624d\u80fd\u7ed9\u4f60\u5e26\u6765\u597d\u6210\u7ee9", add: 2}], B = function () {
                for (var e = [], t = 0; t < T.length; t++) e.push((0, v.jsxs)("li", {
                    className: "list-group-item d-flex justify-content-between align-items-start",
                    children: [(0, v.jsxs)("div", {
                        className: "ms-2 me-auto",
                        children: [(0, v.jsx)("div", {className: "fw-bold", children: T[t].name}), T[t].explain]
                    }), (0, v.jsx)("span", {className: "badge", style: {background: T[t].color}, children: t + 1})]
                }, "renderPenaltyDescription_" + t));
                return (0, v.jsx)("ol", {className: "list-group list-group-numbered", children: e})
            }, M = function () {
                var e = document.getElementById(R), t = document.getElementById(w), r = document.getElementById(D), n = document.getElementById(k), a = document.getElementById("_roundNumberSelectID");
                return {player: r ? r.value : null, contest: t ? t.value : null, project: e ? e.value : "", round: n ? n.value : null, roundNumber: a ? a.value : null}
            }, E = function () {
                for (var e = new Map, t = 0; t < 5; t++) {
                    for (var r = [], n = 0; n < T.length; n++) {
                        var a = F + "_" + (t + 1) + "_" + n, c = document.getElementById(a);
                        null !== c && (c.className.includes(Z) || r.push(n + 1))
                    }
                    e.set(t + 1, r)
                }
                return e
            }, U = function () {
                function e(t) {
                    var r = this;
                    (0, n.Z)(this, e), this.ctx = {
                        Contests: null, ContestsMap: new Map, Players: null, PlayersMap: new Map, Scores: null, DeleteScoreId: -1, UpdateHandle: function () {
                        }
                    }, this._renderPenaltyList = function (e) {
                        for (var t = function (e) {
                            e.currentTarget.className.includes(Z) ? e.currentTarget.className = e.currentTarget.className.replace(Z, "") : (e.currentTarget.className = e.currentTarget.className + " " + Z, r.ctx.UpdateHandle({}))
                        }, n = [], a = 0; a < T.length; a++) n.push((0, v.jsx)("span", {
                            id: F + "_" + e + "_" + a,
                            className: "badge penalty_item " + Z,
                            onClick: t,
                            style: {background: T[a].color, cursor: "pointer"},
                            children: a + 1
                        }, "_renderPenaltyList_Item" + a));
                        return (0, v.jsx)(v.Fragment, {children: n})
                    }, this._playerSelect = function () {
                        var e = [];
                        if (null !== r.ctx.Players && void 0 !== r.ctx.Players.Players) for (var t = r.ctx.Players.Players, n = 0; n < t.length; n++) e.push((0, v.jsxs)("option", {
                            value: t[n].Name,
                            children: [t[n].ID, "\u3001", t[n].Name, " - ", t[n].WcaID]
                        }, "_playerSelectDatalist_id_" + t[n].ID));
                        return (0, v.jsxs)("div", {
                            className: "input-group",
                            children: [(0, v.jsx)("input", {
                                id: D, className: "form-control", list: "_playerSelectDatalist", placeholder: "\u73a9\u5bb6\u540d\u79f0\u6216ID", onChange: function () {
                                    var e = M();
                                    if (null !== e.player && void 0 !== e.player) {
                                        var t = (0, p.eV)()[S], n = e.player;
                                        (0, p.$H)(S, n), t !== n && r.ctx.UpdateHandle({})
                                    }
                                }, defaultValue: (0, p.eV)()[S], "aria-label": "\u73a9\u5bb6\u540d\u79f0\u6216ID", "aria-describedby": "score-input-username"
                            }), (0, v.jsx)("datalist", {id: "_playerSelectDatalist", children: e}, "_playerSelectDatalist"), (0, v.jsx)("span", {
                                className: "input-group-text",
                                style: {cursor: "pointer"},
                                onClick: function () {
                                    document.getElementById(D).value = "", (0, p.$H)(S, ""), r.ctx.UpdateHandle({})
                                },
                                children: "X"
                            })]
                        }, "_playerSelect")
                    }, this._contestSelect = function () {
                        var e = (0, p.eV)()[I], t = [];
                        if (null !== r.ctx.Contests) for (var n = 0; n < r.ctx.Contests.Contests.length; n++) {
                            var a = r.ctx.Contests.Contests[n];
                            a.IsEnd || t.push((0, v.jsx)("option", {value: a.ID, selected: "" !== e ? e === a.ID + "" : 0 === n, children: a.Name}, "ContestSelect" + a.ID))
                        }
                        var c = function () {
                            var e = M();
                            if (null !== e.contest && void 0 !== e.contest) {
                                var t = (0, p.eV)()[I], n = e.contest;
                                (0, p.$H)(I, n), t !== n && r.ctx.UpdateHandle({})
                            }
                        };
                        return (0, v.jsx)("select", {id: w, className: "form-select", onChange: c, onClick: c, children: t}, "ContestSelect")
                    }, this._projectSelect = function () {
                        var e = (0, p.eV)()[C];
                        "" !== e && void 0 !== e || (e = x.GR.Cube333);
                        var t = M(), n = new Map;
                        if (null !== r.ctx.Contests && null !== t.contest) {
                            var a = r.ctx.ContestsMap.get(Number(t.contest));
                            if (void 0 !== a) for (var c = 0; c < a.Rounds.length; c++) n.set(a.Rounds[c].Project, a.Rounds[c].Project)
                        }
                        var s = [];
                        (0, x.rc)().forEach((function (t, r) {
                            var a = [];
                            x.IF.forEach((function (r) {
                                r.Segmentation === t && void 0 !== n.get(r.Cubes) && a.push((0, v.jsx)("option", {
                                    value: r.Cubes,
                                    selected: r.Cubes === e,
                                    children: (0, h.Z2)(r.Cubes)
                                }, "ContestSelect_" + r.Cubes))
                            })), 0 !== a.length && s.push((0, v.jsx)("optgroup", {label: t, children: a}, "ContestSelect_" + r))
                        }));
                        var l = function () {
                            var e = M();
                            if (null !== e.project && void 0 !== e.project) {
                                var t = (0, p.eV)()[C], n = e.project;
                                (0, p.$H)(C, n), t !== n && r.ctx.UpdateHandle({})
                            }
                        };
                        return (0, v.jsx)("select", {id: R, className: "form-select", onChange: l, onClick: l, children: s}, "ContestSelect")
                    }, this._roundSelect = function () {
                        var e = M();
                        if (null === e.contest || null === e.project || null === r.ctx.Contests) return (0, v.jsx)("div", {children: "1"});
                        var t = r.ctx.ContestsMap.get(Number(e.contest));
                        if (void 0 === t || void 0 === t.Rounds) return (0, v.jsx)("div", {children: "2"});
                        for (var n = [], a = 0; a < t.Rounds.length; a++) {
                            var c = t.Rounds[a];
                            c.Project === e.project && 1 === c.Part && n.push((0, v.jsxs)("option", {value: c.ID, children: [(0, _.F)(c.Project), " ", c.Name]}, "_round_key" + c.ID))
                        }
                        return (0, v.jsx)("select", {className: "form-select", id: k, children: n})
                    }, this._roundNumberSelect = function () {
                        return (0, v.jsx)("div", {})
                    }, this.inputUpdate = function (e) {
                        if (e.target.value = e.target.value.replace(/\s+/g, ""), "DNF" !== e.target.value && "DNS" !== e.target.value) if ("D" !== e.target.value && "d" !== e.target.value) if ("S" !== e.target.value && "s" !== e.target.value) {
                            var t = Number(e.target.value);
                            if (isNaN(t)) {
                                var r = /^(\d+(\.\d*)?|\d*[:|\uff1a]\d*\.{0,1}\d{0,3})$/;
                                if (!r.test(e.target.value)) {
                                    var n = e.target.value.match(r);
                                    n ? e.target.value = n[0] : ((0, P.VF)(e.target.value + "\u4e0d\u7b26\u5408\u683c\u5f0f"), e.target.value = "")
                                }
                            } else if (t > 60) {
                                var a = M();
                                e.target.value = (0, f.u)(t, a.project, !1)
                            }
                        } else e.target.value = "DNS"; else e.target.value = "DNF"
                    }, this.scoreInputs = function (e) {
                        return (0, v.jsxs)("tr", {
                            className: "input-center-tr",
                            children: [(0, v.jsx)("td", {children: e}), (0, v.jsx)("td", {
                                colSpan: 3,
                                children: (0, v.jsx)("input", {type: "text", className: "input-group-text", id: A + e, onChange: r.inputUpdate})
                            }), (0, v.jsx)("td", {colSpan: 3, children: r._renderPenaltyList(e)}), (0, v.jsx)("td", {children: (0, v.jsx)("div", {id: A + e + "value"})})]
                        }, A + "tr" + e)
                    }, this.scoreInputList = function () {
                        for (var e = M(), t = [], n = (0, h.tB)(e.project), a = 0; a < n; a++) t.push(r.scoreInputs(a + 1));
                        return t
                    }, this.clearInputHandle = function () {
                        for (var e = 0; e < 6; e++) {
                            var t = A + e, r = document.getElementById(t);
                            null !== r && void 0 !== r && (r.value = "")
                        }
                        for (var n = 0; n < 6; n++) for (var a = 0; a < T.length; a++) {
                            var c = F + "_" + n + "_" + a, s = document.getElementById(c);
                            s && (s.className.includes(Z) || (s.className = s.className + " " + Z))
                        }
                    }, this.getAllScores = function () {
                        for (var e = [], t = 0; t < 5; t++) {
                            var r = A + (t + 1), n = document.getElementById(r);
                            null !== n && ("" !== n.value && e.push(m(n.value)))
                        }
                        return e
                    }, this.onSubmitHandle = (0, u.Z)((0, d.Z)().mark((function e() {
                        var t, n, a, c, s;
                        return (0, d.Z)().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    if (null !== (t = M()).player && null !== t.contest && null !== t.round) {
                                        e.next = 4;
                                        break
                                    }
                                    return (0, P.VF)("\u8bf7\u586b\u73a9\u5bb6\u3001\u6bd4\u8d5b\u3001\u8f6e\u6b21\u4fe1\u606f"), e.abrupt("return");
                                case 4:
                                    if (n = t.project, (a = r.getAllScores()).length === (0, h.tB)(n)) {
                                        e.next = 9;
                                        break
                                    }
                                    return (0, P.VF)("\u5fc5\u987b\u8f93\u5165\u5168\u90e8\u6210\u7ee9"), e.abrupt("return");
                                case 9:
                                    return c = {R1: [], R2: [], R3: [], R4: [], R5: []}, E().forEach((function (e, t) {
                                        switch (t) {
                                            case 1:
                                                c.R1 = e;
                                                break;
                                            case 2:
                                                c.R2 = e;
                                                break;
                                            case 3:
                                                c.R3 = e;
                                                break;
                                            case 4:
                                                c.R4 = e;
                                                break;
                                            case 5:
                                                c.R5 = e
                                        }
                                    })), s = {
                                        PlayerName: t.player,
                                        ContestID: Number(t.contest),
                                        Project: t.project,
                                        RouteNum: Number(t.round),
                                        Penalty: c,
                                        Results: a
                                    }, e.next = 14, i.u.AddScore(s).then((function (e) {
                                        (0, P.VF)("\u6dfb\u52a0\u6210\u529f")
                                    })).catch((function () {
                                        (0, P.VF)("\u6dfb\u52a0\u5931\u8d25")
                                    })).finally((function () {
                                        window.location.reload()
                                    }));
                                case 14:
                                case"end":
                                    return e.stop()
                            }
                        }), e)
                    }))), this._quickInputHandle = function (e) {
                        var t = function (e) {
                            for (var t = 0; t < e.length; t++) {
                                var n = A + (t + 1), a = document.getElementById(n);
                                null !== a && (a.value = e[t])
                            }
                            r._loadScoreValue()
                        };
                        e.target.value = e.target.value.replaceAll("\t", " ");
                        if (/^\d{1}[:0-9. DNFSdnfs]+$/.test(e.target.value)) {
                            t(e.target.value.split(/\s+/))
                        } else {
                            var n = /[\uff1a:][:0-9., ()DNFSdnfs]+$/;
                            if (n.test(e.target.value)) {
                                var a = e.target.value.match(n);
                                if (null === a || 0 === a.length) return;
                                var c = a[0];
                                t((c = (c = c.slice(1)).replaceAll("(", "").replaceAll(")", "").replaceAll("\uff08", "").replaceAll("\uff09", "").replaceAll(" ", "")).split(","))
                            } else ;
                        }
                    }, this._adminScoreBody = function () {
                        return (0, v.jsxs)(v.Fragment, {
                            children: [(0, v.jsx)("tfoot", {
                                children: (0, v.jsx)("tr", {
                                    children: (0, v.jsxs)("td", {
                                        colSpan: 10,
                                        className: "score-buttons",
                                        children: [(0, v.jsxs)("div", {
                                            className: "input-group mb-3",
                                            children: [(0, v.jsx)("input", {
                                                type: "text",
                                                className: "form-control",
                                                placeholder: "\u8f93\u5165\u6210\u7ee9",
                                                "aria-describedby": "quick-input-score",
                                                onChange: r._quickInputHandle
                                            }), (0, v.jsx)("span", {className: "input-group-text", id: "quick-input-score", children: "\u6210\u7ee9\u8f93\u5165"})]
                                        }), (0, v.jsx)("button", {
                                            type: "button",
                                            className: "btn btn-warning",
                                            onClick: r.clearInputHandle,
                                            children: "\u6e05\u7a7a"
                                        }), (0, v.jsx)("button", {type: "button", className: "btn btn-success", onClick: r.onSubmitHandle, children: "\u63d0\u4ea4"})]
                                    })
                                })
                            }), (0, v.jsxs)("tbody", {
                                children: [(0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("th", {children: "\u9009\u624b"}), (0, v.jsx)("td", {
                                        colSpan: 2,
                                        children: r._playerSelect()
                                    }), (0, v.jsx)("th", {children: "\u6bd4\u8d5b"}), (0, v.jsx)("td", {colSpan: 5, children: r._contestSelect()})]
                                }), (0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("th", {children: "\u9879\u76ee"}), (0, v.jsx)("td", {
                                        colSpan: 2,
                                        children: r._projectSelect()
                                    }), (0, v.jsx)("th", {children: "\u8f6e\u6b21"}), (0, v.jsx)("td", {
                                        colSpan: 2,
                                        children: r._roundSelect()
                                    }), (0, v.jsx)("th", {children: "\u6253\u4e71\u5e8f"}), (0, v.jsx)("td", {colSpan: 2, children: r._roundNumberSelect()})]
                                }), (0, v.jsx)("tr", {
                                    children: (0, v.jsx)("td", {
                                        colSpan: 10,
                                        children: "\u6210\u7ee9\u5355"
                                    })
                                }), (0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("td", {children: "\u5e8f\u53f7"}), (0, v.jsx)("td", {
                                        colSpan: 3,
                                        children: "\u5f55\u5165\u6210\u7ee9"
                                    }), (0, v.jsx)("td", {colSpan: 3, children: "\u5224\u7f5a"}), (0, v.jsx)("td", {children: "\u6700\u7ec8\u6210\u7ee9"})]
                                }), r.scoreInputList()]
                            })]
                        })
                    }, this._loadScoresSelect = function () {
                        var e = "", t = "";
                        return (0, u.Z)((0, d.Z)().mark((function n() {
                            var a, c, s, l;
                            return (0, d.Z)().wrap((function (n) {
                                for (; ;) switch (n.prev = n.next) {
                                    case 0:
                                        if (a = M(), c = a.player, null !== (s = a.contest) && null !== c && "" !== s && "" !== c) {
                                            n.next = 6;
                                            break
                                        }
                                        return r.ctx.Scores = null, n.abrupt("return");
                                    case 6:
                                        if (void 0 !== (l = r.ctx.PlayersMap.get(c))) {
                                            n.next = 11;
                                            break
                                        }
                                        return r.ctx.Scores = null, r.ctx.UpdateHandle({}), n.abrupt("return");
                                    case 11:
                                        if (e !== s || t !== c || null === r.ctx.Scores) {
                                            n.next = 13;
                                            break
                                        }
                                        return n.abrupt("return");
                                    case 13:
                                        return n.next = 15, i.u.GetPlayerScoreByContest(Number(l.ID), Number(s)).then((function (e) {
                                            r.ctx.Scores = e, r.ctx.UpdateHandle({})
                                        })).catch().finally((function () {
                                            e = s, t = c
                                        }));
                                    case 15:
                                    case"end":
                                        return n.stop()
                                }
                            }), n)
                        })))
                    }, this._loadScoreValue = function () {
                        for (var e = M(), t = E(), r = 0; r < 5; r++) {
                            var n = A + (r + 1), a = n + "value", c = document.getElementById(n);
                            if (c) {
                                var s = Number(m(c.value)), l = t.get(r + 1), i = "";
                                void 0 !== l && s > -1e4 && (s += 2 * l.length, i = "(+" + 2 * l.length + ")"), document.getElementById(a).innerText = (0, f.u)(s, e.project, !1) + " " + i
                            }
                        }
                    }, this._scoreListTr = function (e, t) {
                        var n = (0, v.jsx)("td", {
                            children: g("\u5220\u9664", r.deleteModalTarget, (function () {
                                r.ctx.DeleteScoreId = e.ID
                            }), "btn-danger btn-sm")
                        });
                        return t || (n = (0, v.jsx)(v.Fragment, {})), x.FO.get(e.Project).RouteType === x.FA.RouteTypeRepeatedly ? (0, v.jsxs)("tr", {children: [n, (0, v.jsxs)("td", {children: [(0, _.F)(e.Project), " ", (0, h.Z2)(e.Project)]}), (0, v.jsx)("td", {children: e.RouteValue.Name}), (0, v.jsx)("td", {children: "-"}), (0, v.jsx)("td", {children: "-"}), (0, N.Pt)(e)]}, "_renderScoreList_tr_" + e.ID) : (0, v.jsxs)("tr", {children: [n, (0, v.jsxs)("td", {children: [(0, _.F)(e.Project), " ", (0, h.Z2)(e.Project)]}), (0, v.jsx)("td", {children: e.RouteValue.Name}), (0, v.jsx)("td", {children: (0, f.u)(e.Best, e.Project, !1)}), (0, v.jsx)("td", {children: (0, f.u)(e.Avg, e.Project, !0)}), (0, N.Pt)(e)]}, "_renderScoreList_tr" + e.ID)
                    }, this.deleteModalTarget = "delete_scores", this._renderScoreList = function () {
                        if (null === r.ctx.Scores) return (0, v.jsx)("div", {});
                        for (var e = [], t = 0; t < r.ctx.Scores.length; t++) {
                            var n = r.ctx.Scores[t];
                            e.push(r._scoreListTr(n, !0))
                        }
                        return (0, v.jsxs)("table", {
                            className: "table table-hover",
                            style: {minWidth: "600px", marginTop: "20px", marginBottom: "30px"},
                            children: [(0, v.jsx)("thead", {
                                children: (0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("th", {children: "\u5220\u9664"}), (0, v.jsx)("th", {children: "\u9879\u76ee"}), (0, v.jsx)("th", {children: "\u8f6e\u6b21"}), (0, v.jsx)("th", {children: "\u5355\u6b21"}), (0, v.jsx)("th", {children: "\u5e73\u5747"}), (0, v.jsx)("th", {
                                        colSpan: 5,
                                        children: "\u8be6\u60c5"
                                    })]
                                }, "renderPageByScore_thead")
                            }), (0, v.jsx)("tbody", {children: e})]
                        })
                    }, this.GetDeleteModal = function () {
                        return b("\u5220\u9664", (function () {
                            if (null === r.ctx.Scores || 0 === r.ctx.Scores.length) return (0, v.jsx)("div", {children: "\u662f\u5426\u5220\u9664\u8be5\u6210\u7ee9"});
                            for (var e = r.ctx.Scores[0], t = 0; t < r.ctx.Scores.length; t++) if (r.ctx.Scores[t].ID === r.ctx.DeleteScoreId) {
                                e = r.ctx.Scores[t];
                                break
                            }
                            return (0, v.jsx)("div", {
                                children: (0, v.jsxs)("table", {
                                    className: "table table-hover table-sm",
                                    style: {width: "90%"},
                                    children: [(0, v.jsx)("thead", {
                                        children: (0, v.jsxs)("tr", {
                                            children: [(0, v.jsx)("th", {children: "\u9879\u76ee"}), (0, v.jsx)("th", {children: "\u8f6e\u6b21"}), (0, v.jsx)("th", {children: "\u5355\u6b21"}), (0, v.jsx)("th", {children: "\u5e73\u5747"}), (0, v.jsx)("th", {
                                                colSpan: 5,
                                                children: "\u8be6\u60c5"
                                            })]
                                        }, "renderPageByScore_thead_delete")
                                    }), (0, v.jsx)("tbody", {children: r._scoreListTr(e, !1)})]
                                })
                            })
                        }), r.deleteModalTarget, (function () {
                            i.u.DeleteScore(r.ctx.DeleteScoreId).then((function () {
                                (0, P.VF)("\u5220\u9664\u6210\u529f")
                            })).catch((function () {
                                (0, P.VF)("\u5220\u9664\u5931\u8d25")
                            })).finally((function () {
                                window.location.reload()
                            }))
                        }))
                    }, this.ctx.UpdateHandle = t, this.loadAllPlayer().then(), this.loadAllContest().then(), setInterval(this._loadScoresSelect(), 100), setInterval(this._loadScoreValue, 100), setInterval((function () {
                        r.ctx.UpdateHandle({})
                    }), 300)
                }

                return (0, a.Z)(e, [{
                    key: "loadAllPlayer", value: function () {
                        var e = (0, u.Z)((0, d.Z)().mark((function e() {
                            var t = this;
                            return (0, d.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, (0, P.yj)(i.b.LoadAllPlayer().then((function (e) {
                                            t.ctx.Players = e[1];
                                            for (var r = 0; r < t.ctx.Players.Size; r++) t.ctx.PlayersMap.set(t.ctx.Players.Players[r].Name, t.ctx.Players.Players[r])
                                        })), "\u7b49\u5f85\u52a0\u8f7d\u73a9\u5bb6\u5217\u8868", "\u52a0\u8f7d\u73a9\u5bb6\u6210\u529f", "\u52a0\u8f7d\u73a9\u5bb6\u6210\u529f");
                                    case 2:
                                    case"end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function () {
                            return e.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "loadAllContest", value: function () {
                        var e = (0, u.Z)((0, d.Z)().mark((function e() {
                            var t = this;
                            return (0, d.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, (0, P.yj)(i.b.LoadAllContest().then((function (e) {
                                            t.ctx.ContestsMap = e[0], t.ctx.Contests = e[1]
                                        })), "\u7b49\u5f85\u52a0\u8f7d\u6bd4\u8d5b\u5217\u8868", "\u52a0\u8f7d\u6bd4\u8d5b\u5217\u8868\u6210\u529f", "\u52a0\u8f7d\u6bd4\u8d5b\u5217\u8868\u5931\u8d25");
                                    case 2:
                                    case"end":
                                        return e.stop()
                                }
                            }), e)
                        })));
                        return function () {
                            return e.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "render", value: function () {
                        return (0, v.jsxs)("div", {
                            style: {marginTop: "20px"},
                            children: [this.GetDeleteModal(), (0, v.jsxs)("table", {
                                className: "table table-bordered text-center table-hover table-responsive",
                                style: {verticalAlign: "text-top"},
                                children: [(0, v.jsx)("thead", {children: (0, v.jsx)("tr", {children: (0, v.jsx)("th", {colSpan: 20, children: "\u6210\u7ee9\u5f55\u5165"})})}), this._adminScoreBody()]
                            }), this._renderScoreList(), B()]
                        })
                    }
                }]), e
            }(), V = r(5400), L = r(1069), H = r(6916), Q = r(5269), W = "create_contest", G = "end_contest", K = function () {
                function e(t) {
                    var r = this;
                    (0, n.Z)(this, e), this.ctx = {
                        Contests: null, EndContestID: -1, UpdateHandle: function () {
                        }
                    }, this.renderContestList = function () {
                        if (null === r.ctx.Contests) return (0, v.jsx)("div", {});
                        for (var e = [], t = function () {
                            var t = r.ctx.Contests.Contests[n], a = (0, v.jsx)(v.Fragment, {children: "\u5df2\u7ed3\u675f"});
                            t.IsEnd || (a = g("\u7ed3\u675f", G, (function () {
                                r.ctx.EndContestID = t.ID
                            }), "btn-danger btn-sm")), e.push((0, v.jsxs)("tr", {
                                children: [(0, v.jsx)("td", {children: (0, L.convertDateString)(t.StartTime)}), (0, v.jsx)("td", {children: (0, L.convertDateString)(t.EndTime)}), (0, v.jsx)("td", {children: (0, L.ContestTypeCn)(t.Type)}), (0, v.jsx)("td", {
                                    children: (0, v.jsx)(V.rU, {
                                        to: "/contest?id=" + t.ID,
                                        children: t.Name
                                    })
                                }), (0, v.jsx)("td", {children: a})]
                            }, "renderContestList_item_contest" + t.ID))
                        }, n = 0; n < r.ctx.Contests.Contests.length; n++) t();
                        return (0, v.jsxs)("table", {
                            className: "table text-center table-striped table-hover",
                            children: [(0, v.jsx)("thead", {
                                children: (0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("th", {scope: "col", children: "\u5f00\u59cb\u65f6\u95f4"}), (0, v.jsx)("th", {
                                        scope: "col",
                                        children: "\u7ed3\u675f\u65f6\u95f4"
                                    }), (0, v.jsx)("th", {scope: "col", children: "\u5f62\u5f0f"}), (0, v.jsx)("th", {scope: "col", children: "\u6bd4\u8d5b\u540d\u79f0"}), (0, v.jsx)("th", {
                                        scope: "col",
                                        children: "\u64cd\u4f5c"
                                    })]
                                })
                            }), (0, v.jsx)("tbody", {children: e})]
                        })
                    }, this.GetEndModal = function () {
                        var e = function () {
                            var e = (0, u.Z)((0, d.Z)().mark((function e() {
                                return (0, d.Z)().wrap((function (e) {
                                    for (; ;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, (0, P.yj)(i.u.EndContest(r.ctx.EndContestID), (0, v.jsx)("p", {children: "\u7b49\u5f85\u7ed3\u675f\u6bd4\u8d5b"}), (0, v.jsx)("p", {children: "\u7ed3\u675f\u6bd4\u8d5b\u6210\u529f"}), (0, v.jsx)("p", {children: "\u7ed3\u675f\u6bd4\u8d5b\u5931\u8d25"}));
                                        case 2:
                                            return e.next = 4, (0, H._R)(1e3).then((function () {
                                                window.location.reload()
                                            }));
                                        case 4:
                                        case"end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }();
                        return b("\u7ed3\u675f", (function () {
                            return (0, v.jsxs)("div", {children: [(0, v.jsx)("h3", {children: "\u662f\u5426\u7ed3\u675f\u6bd4\u8d5b?"}), (0, v.jsx)("p", {children: "\u7ed3\u675f\u6bd4\u8d5b\u5c06\u65e0\u6cd5\u518d\u8bb0\u5f55\u6210\u7ee9"})]})
                        }), G, e)
                    }, this.GetCreateContestModal = function () {
                        var e = "create_contest_inputNameID", t = "create_contest_inputDescriptionID", r = "create_contest_inputTypeID", n = "round_number_", a = "open_pj_", c = function () {
                            var c = (0, u.Z)((0, d.Z)().mark((function c() {
                                var s, l, o, u, x, p, f, j, m, y, g, b, N, _;
                                return (0, d.Z)().wrap((function (c) {
                                    for (; ;) switch (c.prev = c.next) {
                                        case 0:
                                            s = [], l = new Map([[0, "\u5355\u8f6e\u8d5b"]]), o = new Map([[0, "\u521d\u8d5b"], [1, "\u51b3\u8d5b"]]), u = new Map([[0, "\u521d\u8d5b"], [1, "\u590d\u8d5b"], [2, "\u51b3\u8d5b"]]), x = (0, h.u9)(), p = 0;
                                        case 6:
                                            if (!(p < x.length)) {
                                                c.next = 24;
                                                break
                                            }
                                            if (f = x[p], document.getElementById(a + f).checked) {
                                                c.next = 11;
                                                break
                                            }
                                            return c.abrupt("continue", 21);
                                        case 11:
                                            j = document.getElementById(n + f), m = l, c.t0 = j.selectedIndex, c.next = 1 === c.t0 ? 16 : 2 === c.t0 ? 18 : 20;
                                            break;
                                        case 16:
                                            return m = o, c.abrupt("break", 20);
                                        case 18:
                                            return m = u, c.abrupt("break", 20);
                                        case 20:
                                            for (y = 0; y <= j.selectedIndex; y++) s.push({
                                                Project: f,
                                                Number: y + 1,
                                                Part: 1,
                                                Name: (0, h.Z2)(f) + m.get(y),
                                                IsStart: !0,
                                                Final: y === j.selectedIndex,
                                                Upsets: []
                                            });
                                        case 21:
                                            p++, c.next = 6;
                                            break;
                                        case 24:
                                            if (0 !== s.length) {
                                                c.next = 27;
                                                break
                                            }
                                            return (0, P.VF)("\u8f6e\u6b21\u4e0d\u80fd\u4e3a\u7a7a"), c.abrupt("return");
                                        case 27:
                                            if (g = document.getElementById(e), b = document.getElementById(t), N = document.getElementById(r), g.value) {
                                                c.next = 33;
                                                break
                                            }
                                            return (0, P.VF)("\u6bd4\u8d5b\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"), c.abrupt("return");
                                        case 33:
                                            if (b.value) {
                                                c.next = 36;
                                                break
                                            }
                                            return (0, P.VF)("\u5907\u6ce8\u4e0d\u80fd\u4e3a\u7a7a"), c.abrupt("return");
                                        case 36:
                                            return _ = {
                                                Name: g.value,
                                                Description: b.value,
                                                Rounds: s,
                                                Type: N.value,
                                                StartTime: 0,
                                                EndTime: 0
                                            }, c.next = 39, (0, P.yj)(i.u.AddContest(_), (0, v.jsx)("p", {children: "\u7b49\u5f85\u6dfb\u52a0\u6bd4\u8d5b"}), (0, v.jsx)("p", {children: "\u6dfb\u52a0\u6bd4\u8d5b\u6210\u529f"}), (0, v.jsx)("p", {children: "\u6dfb\u52a0\u6bd4\u8d5b\u5931\u8d25"}));
                                        case 39:
                                            (0, H._R)(1e3).then((function () {
                                                window.location.reload()
                                            }));
                                        case 40:
                                        case"end":
                                            return c.stop()
                                    }
                                }), c)
                            })));
                            return function () {
                                return c.apply(this, arguments)
                            }
                        }();
                        return b("\u521b\u5efa", (function () {
                            for (var c = [], s = (0, h.u9)(), l = 0; l < s.length; l++) {
                                var i = s[l];
                                c.push((0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("td", {
                                        children: (0, v.jsxs)("div", {
                                            className: "form-check form-switch",
                                            children: [(0, v.jsx)("input", {
                                                className: "form-check-input",
                                                type: "checkbox",
                                                role: "switch",
                                                id: a + i,
                                                defaultChecked: !0
                                            }), (0, v.jsxs)("label", {className: "form-check-label", htmlFor: a + i, children: ["  ", (0, _.F)(i), " ", (0, h.Z2)(i)]})]
                                        })
                                    }), (0, v.jsx)("td", {
                                        children: (0, v.jsx)("div", {
                                            children: (0, v.jsxs)("select", {
                                                className: "form-select",
                                                id: n + i,
                                                defaultValue: "1",
                                                children: [(0, v.jsx)("option", {value: "1", children: "\u5355\u8f6e\u8d5b(\u521d\u8d5b)"}), (0, v.jsx)("option", {
                                                    value: "2",
                                                    children: "\u53cc\u8f6e\u8d5b(\u521d\u8d5b\u3001\u51b3\u8d5b)"
                                                }), (0, v.jsx)("option", {value: "3", children: "\u4e09\u8f6e\u8d5b(\u521d\u8d5b\u3001\u590d\u8d5b\u3001\u51b3\u8d5b)"})]
                                            })
                                        })
                                    })]
                                }, "create_contest_pj_item_" + i))
                            }
                            var o = [], d = "GetCreateContestModal_select_by_type";
                            (0, x.rc)().forEach((function (e, t) {
                                var r = d + e;
                                o.push((0, v.jsxs)("div", {
                                    className: "form-check form-switch form-check-inline",
                                    children: [(0, v.jsx)("input", {
                                        className: "form-check-input", type: "checkbox", id: r, role: "switch", defaultChecked: !0, onChange: function () {
                                            for (var t = document.getElementById(r), n = 0; n < x.IF.length; n++) {
                                                var c = x.IF[n];
                                                if (c.Segmentation === e) {
                                                    var s = document.getElementById(a + c.Cubes);
                                                    null !== s && (s.checked = t.checked)
                                                }
                                            }
                                        }
                                    }), (0, v.jsx)("label", {className: "form-check-label", htmlFor: r, children: e})]
                                }, r))
                            }));
                            var u = "GetCreateContestModal_select_all_pj";
                            return o.push((0, v.jsxs)("div", {
                                className: "form-check form-switch form-check-inline",
                                children: [(0, v.jsx)("input", {
                                    className: "form-check-input", type: "checkbox", id: u, role: "switch", defaultChecked: !0, onChange: function () {
                                        for (var e = document.getElementById(u), t = 0; t < s.length; t++) {
                                            var r = s[t];
                                            document.getElementById(a + r).checked = e.checked
                                        }
                                        (0, x.rc)().forEach((function (t, r) {
                                            var n = d + t;
                                            document.getElementById(n).checked = e.checked
                                        }))
                                    }
                                }), (0, v.jsx)("label", {className: "form-check-label", htmlFor: u, children: "\u5168\u9009"})]
                            }, u)), (0, v.jsxs)("div", {
                                children: [(0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: e, className: "form-label", children: "\u6bd4\u8d5b\u540d\u79f0"}), (0, v.jsx)("input", {
                                        type: "text",
                                        className: "form-control",
                                        id: e
                                    })]
                                }), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: t, className: "form-label", children: "\u5907\u6ce8"}), (0, v.jsx)("input", {type: "text", className: "form-control", id: t})]
                                }), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: r, className: "form-label", children: "\u6bd4\u8d5b\u5f62\u5f0f"}), (0, v.jsxs)("select", {
                                        className: "form-select",
                                        id: r,
                                        defaultValue: "online",
                                        children: [(0, v.jsx)("option", {value: "online", children: "\u7ebf\u4e0a"}), (0, v.jsx)("option", {
                                            value: "offline",
                                            children: "\u7ebf\u4e0b"
                                        }), (0, v.jsx)("option", {value: "official", children: "\u7ebf\u4e0b\u6b63\u5f0f"})]
                                    })]
                                }), (0, v.jsx)("div", {
                                    className: "mb-3",
                                    children: (0, v.jsxs)("table", {
                                        className: "table text-center table-striped table-hover",
                                        children: [(0, v.jsx)("thead", {
                                            children: (0, v.jsxs)("tr", {
                                                children: [(0, v.jsx)("th", {scope: "col", children: "\u9879\u76ee"}), (0, v.jsx)("th", {
                                                    scope: "col",
                                                    children: "\u8f6e\u6b21"
                                                })]
                                            })
                                        }), (0, v.jsxs)("tbody", {children: [(0, v.jsx)("tr", {children: (0, v.jsx)("th", {colSpan: 2, children: o})}), c]})]
                                    })
                                })]
                            }, "create_inputs")
                        }), W, c)
                    }, this.contestPage = function (e) {
                        if (null === r.ctx.Contests) return (0, v.jsx)("div", {});
                        var t = (0, p.eV)(), n = isNaN(Number(t.contest_page)) ? 1 : Number(t.contest_page),
                            a = {Id: e + "contest_page", Count: r.ctx.Contests.Count, PageKey: "contest_page", CurPage: n, Size: 50, Link: "/xadmin?tabs=contest"};
                        return (0, Q.T)(a)
                    }, this.ctx.UpdateHandle = t, this.loadContestData()
                }

                return (0, a.Z)(e, [{
                    key: "loadContestData", value: function () {
                        var e = this, t = (0, p.eV)(), r = isNaN(Number(t.contest_page)) ? 1 : Number(t.contest_page);
                        i.b.GetContests(r, 50, "").then((function (t) {
                            e.ctx.Contests = t
                        }))
                    }
                }, {
                    key: "render", value: function () {
                        return (0, v.jsxs)("div", {
                            children: [this.GetEndModal(), this.GetCreateContestModal(), (0, v.jsx)("p", {
                                style: {marginTop: "10px", float: "right"},
                                children: g("\u521b\u5efa", W, y, "btn-primary")
                            }), (0, v.jsx)("p", {style: {marginTop: "30px"}}), this.contestPage("up"), this.renderContestList(), this.contestPage("down")]
                        })
                    }
                }]), e
            }(), $ = "player_create_target", O = "player_delete_target", X = "player_update_target", z = function () {
                function e(t) {
                    var r = this;
                    (0, n.Z)(this, e), this.ctx = {
                        Players: null, DeleteID: -1, UpdateID: -1, UpdateHandle: function () {
                        }
                    }, this.renderPlayerTable = function () {
                        var e = [];
                        if (null !== r.ctx.Players) for (var t = function () {
                            var t = r.ctx.Players.Players[n];
                            e.push((0, v.jsxs)("tr", {
                                children: [(0, v.jsx)("td", {children: t.ID}), (0, v.jsx)("td", {children: t.Name}), (0, v.jsx)("td", {children: t.WcaID}), (0, v.jsx)("td", {children: t.ActualName}), (0, v.jsx)("td", {children: t.QQ}), (0, v.jsx)("td", {
                                    children: g("\u5220\u9664", O, (function () {
                                        r.ctx.DeleteID = t.ID
                                    }), "btn-danger")
                                }), (0, v.jsx)("td", {
                                    children: g("\u66f4\u65b0", X, (function () {
                                        r.ctx.UpdateID = t.ID
                                    }), "btn-success")
                                })]
                            }, "renderPlayerTable_item_player_" + t.ID))
                        }, n = 0; n < r.ctx.Players.Players.length; n++) t();
                        return (0, v.jsxs)("table", {
                            className: "table table-striped table-hover",
                            children: [(0, v.jsx)("thead", {
                                children: (0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("th", {colSpan: 1, children: "ID"}), (0, v.jsx)("th", {
                                        colSpan: 1,
                                        children: "\u9009\u624b"
                                    }), (0, v.jsx)("th", {colSpan: 1, children: "WCA ID"}), (0, v.jsx)("th", {colSpan: 1, children: "\u771f\u5b9e\u59d3\u540d"}), (0, v.jsx)("th", {
                                        colSpan: 1,
                                        children: "QQ"
                                    }), (0, v.jsx)("th", {colSpan: 1, children: "\u5220\u9664"}), (0, v.jsx)("th", {colSpan: 1, children: "\u4fee\u6539"})]
                                })
                            }), (0, v.jsx)("tbody", {children: e})]
                        })
                    }, this.getDeleteModal = function () {
                        var e = function () {
                            var e = (0, u.Z)((0, d.Z)().mark((function e() {
                                return (0, d.Z)().wrap((function (e) {
                                    for (; ;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, (0, P.yj)(i.u.DeletePlayer(r.ctx.DeleteID), "\u5220\u9664\u4e2d", "\u5220\u9664\u6210\u529f", "\u5220\u9664\u5931\u8d25");
                                        case 2:
                                            return e.next = 4, (0, H._R)(500).then((function () {
                                                window.location.reload()
                                            }));
                                        case 4:
                                        case"end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }();
                        return b("\u5220\u9664", (function () {
                            if (null === r.ctx.Players) return (0, v.jsx)("div", {children: "\u662f\u5426\u5220\u9664"});
                            for (var e = r.ctx.Players.Players[0], t = 0; t < r.ctx.Players.Players.length; t++) r.ctx.Players.Players[t].ID === r.ctx.DeleteID && (e = r.ctx.Players.Players[t]);
                            return (0, v.jsxs)("div", {
                                children: [(0, v.jsx)("h2", {children: "\u6ce8\u610f\uff1a\u5df2\u4ea7\u751f\u6210\u7ee9\u7684\u9009\u624b\u65e0\u6cd5\u5220\u9664"}), (0, v.jsxs)("h4", {
                                    children: ["\u662f\u5426\u5220\u9664 ", (0, v.jsx)("p", {
                                        style: {
                                            display: "inline",
                                            fontSize: "30px"
                                        }, children: e.Name
                                    }), " ?"]
                                }), (0, v.jsxs)("p", {children: [" - wcaID: ", e.WcaID ? e.WcaID : "\u65e0"]}), (0, v.jsxs)("p", {children: [" - \u771f\u5b9eID: ", e.ActualName ? e.ActualName : "\u65e0"]})]
                            })
                        }), O, e)
                    }, this.createAndUpdateHandle = function (e, t) {
                        var r = e + "Player_name", n = e + "Player_ActualName", a = e + "Player_WcaID", c = e + "Player_QQ", s = document.getElementById(r), l = document.getElementById(n),
                            i = document.getElementById(a), o = document.getElementById(c);
                        "" !== s.value ? t({
                            ID: 0,
                            Name: s.value,
                            WcaID: i.value,
                            ActualName: l.value,
                            TitlesVal: [],
                            QQ: o.value,
                            ContestNumber: 0,
                            RecoveryNumber: 0,
                            ValidRecoveryNumber: 0
                        }) : (0, P.VF)("\u65e0\u6cd5\u8f93\u5165\u7a7a\u540d\u79f0")
                    }, this.getUpdateModal = function () {
                        var e = "updatePlayer_name", t = "updatePlayer_ActualName", n = "updatePlayer_WcaID", a = "updatePlayer_QQ", c = function () {
                            var e = (0, u.Z)((0, d.Z)().mark((function e() {
                                var t;
                                return (0, d.Z)().wrap((function (e) {
                                    for (; ;) switch (e.prev = e.next) {
                                        case 0:
                                            t = function () {
                                                var e = (0, u.Z)((0, d.Z)().mark((function e(t) {
                                                    return (0, d.Z)().wrap((function (e) {
                                                        for (; ;) switch (e.prev = e.next) {
                                                            case 0:
                                                                return e.next = 2, (0, P.yj)(i.u.UpdatePlayer(r.ctx.UpdateID, t), "\u66f4\u65b0\u4e2d", "\u66f4\u65b0\u6210\u529f", "\u66f4\u65b0\u5931\u8d25");
                                                            case 2:
                                                                return e.next = 4, (0, H._R)(500).then((function () {
                                                                    window.location.reload()
                                                                }));
                                                            case 4:
                                                            case"end":
                                                                return e.stop()
                                                        }
                                                    }), e)
                                                })));
                                                return function (t) {
                                                    return e.apply(this, arguments)
                                                }
                                            }(), r.createAndUpdateHandle("update", t);
                                        case 2:
                                        case"end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }();
                        return b("\u66f4\u65b0", (function () {
                            if (null === r.ctx.Players) return (0, v.jsx)("div", {});
                            for (var c = r.ctx.Players.Players[0], s = 0; s < r.ctx.Players.Players.length; s++) if (r.ctx.UpdateID === r.ctx.Players.Players[s].ID) {
                                c = r.ctx.Players.Players[s];
                                break
                            }
                            return (0, v.jsxs)("div", {
                                children: [(0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsxs)("label", {htmlFor: e, className: "form-label", children: ["\u59d3\u540d: (", c.Name, ")"]}), (0, v.jsx)("input", {
                                        type: "text",
                                        className: "form-control",
                                        id: e,
                                        defaultValue: c.Name
                                    }, "update_inputs" + e + "_input" + r.ctx.UpdateID)]
                                }, "update_inputs" + e + "_" + r.ctx.UpdateID), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsxs)("label", {htmlFor: t, className: "form-label", children: ["\u771f\u5b9e\u59d3\u540d: (", c.ActualName, ")"]}), (0, v.jsx)("input", {
                                        type: "text",
                                        className: "form-control",
                                        id: t,
                                        defaultValue: c.ActualName ? c.ActualName : ""
                                    }, "update_inputs" + t + "_input" + r.ctx.UpdateID)]
                                }, "update_inputs" + t + "_" + r.ctx.UpdateID), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsxs)("label", {htmlFor: n, className: "form-label", children: ["WcaID: (", c.WcaID, ")"]}), (0, v.jsx)("input", {
                                        type: "text",
                                        className: "form-control",
                                        id: n,
                                        defaultValue: c.WcaID ? c.WcaID : ""
                                    }, "update_inputs" + n + "_input" + r.ctx.UpdateID)]
                                }, "update_inputs" + n + "_" + r.ctx.UpdateID), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsxs)("label", {htmlFor: a, className: "form-label", children: ["QQ: (", c.QQ, ")"]}), (0, v.jsx)("input", {
                                        type: "text",
                                        className: "form-control",
                                        id: a,
                                        defaultValue: c.QQ ? c.QQ : ""
                                    }, "update_inputs" + a + "_input" + r.ctx.UpdateID)]
                                }, "update_inputs" + a + "_" + r.ctx.UpdateID)]
                            }, "update_inputs" + r.ctx.UpdateID)
                        }), X, c)
                    }, this.getCreateModal = function () {
                        var e = "createPlayer_name", t = "createPlayer_ActualName", n = "createPlayer_WcaID", a = "createPlayer_QQ";
                        return b("\u521b\u5efa", (function () {
                            return (0, v.jsxs)("div", {
                                children: [(0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: e, className: "form-label", children: "\u59d3\u540d"}), (0, v.jsx)("input", {type: "text", className: "form-control", id: e})]
                                }), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: t, className: "form-label", children: "\u771f\u5b9e\u59d3\u540d"}), (0, v.jsx)("input", {
                                        type: "text",
                                        className: "form-control",
                                        id: t
                                    })]
                                }), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: n, className: "form-label", children: "WcaID"}), (0, v.jsx)("input", {type: "text", className: "form-control", id: n})]
                                }), (0, v.jsxs)("div", {
                                    className: "mb-3",
                                    children: [(0, v.jsx)("label", {htmlFor: a, className: "form-label", children: "QQ"}), (0, v.jsx)("input", {type: "text", className: "form-control", id: a})]
                                })]
                            }, "create_inputs")
                        }), $, (function () {
                            var e = function () {
                                var e = (0, u.Z)((0, d.Z)().mark((function e(t) {
                                    return (0, d.Z)().wrap((function (e) {
                                        for (; ;) switch (e.prev = e.next) {
                                            case 0:
                                                return e.next = 2, (0, P.yj)(i.u.AddPlayer(t), "\u6dfb\u52a0\u4e2d", "\u6dfb\u52a0\u6210\u529f", "\u6dfb\u52a0\u5931\u8d25");
                                            case 2:
                                                return e.next = 4, (0, H._R)(500).then((function () {
                                                    window.location.reload()
                                                }));
                                            case 4:
                                            case"end":
                                                return e.stop()
                                        }
                                    }), e)
                                })));
                                return function (t) {
                                    return e.apply(this, arguments)
                                }
                            }();
                            r.createAndUpdateHandle("create", e)
                        }))
                    }, this.playerPage = function (e) {
                        if (null === r.ctx.Players) return (0, v.jsx)("div", {});
                        var t = (0, p.eV)(), n = isNaN(Number(t.player_page)) ? 1 : Number(t.player_page),
                            a = {Id: e + "player_page", Count: r.ctx.Players.Count, PageKey: "player_page", CurPage: n, Size: 50, Link: "/xadmin?tabs=player"};
                        return (0, Q.T)(a)
                    }, this.loadPlayerData = (0, u.Z)((0, d.Z)().mark((function e() {
                        var t, n;
                        return (0, d.Z)().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return t = (0, p.eV)(), n = isNaN(Number(t.player_page)) ? 1 : Number(t.player_page), e.next = 4, i.b.GetPlayers(n, 50).then((function (e) {
                                        r.ctx.Players = e
                                    }));
                                case 4:
                                case"end":
                                    return e.stop()
                            }
                        }), e)
                    }))), this.ctx.UpdateHandle = t, this.loadPlayerData().then()
                }

                return (0, a.Z)(e, [{
                    key: "render", value: function () {
                        return (0, v.jsxs)("div", {
                            children: [this.getDeleteModal(), this.getUpdateModal(), this.getCreateModal(), (0, v.jsx)("p", {
                                style: {marginTop: "10px", float: "right"},
                                children: g("\u521b\u5efa", $, y, "btn-primary")
                            }), (0, v.jsx)("p", {style: {marginTop: "30px"}}), this.playerPage("up"), this.renderPlayerTable(), this.playerPage("down")]
                        })
                    }
                }]), e
            }(), q = function () {
                function e() {
                    var t = this;
                    (0, n.Z)(this, e), this.data = [], i.b.GetXLog().then((function (e) {
                        t.data = e
                    }))
                }

                return (0, a.Z)(e, [{
                    key: "render", value: function () {
                        return (0, v.jsx)("div", {})
                    }
                }]), e
            }(), J = "reset_records", Y = function () {
                function e() {
                    var t = this;
                    (0, n.Z)(this, e), this.ctx = {
                        PreScores: null, DetailID: -1, UpdateHandle: function () {
                        }
                    }, this.approval_score_page = "approval_score_page", this.scoresPage = function () {
                        if (null === t.ctx.PreScores) return (0, v.jsx)("div", {});
                        var e = (0, p.eV)(), r = isNaN(Number(e[t.approval_score_page])) ? 1 : Number(e[t.approval_score_page]),
                            n = {Id: t.approval_score_page, Count: t.ctx.PreScores.Count, PageKey: t.approval_score_page, CurPage: r, Size: 50, Link: "/xadmin?tabs=approval_score"};
                        return (0, Q.T)(n)
                    }, this.neglectModelTarget = "neglect_pre_scores", this.scoresBody = function () {
                        if (null === t.ctx.PreScores) return (0, v.jsx)("div", {});
                        for (var e = t.ctx.PreScores, r = [], n = function () {
                            var n = e.Scores[a], c = (0, v.jsxs)("td", {
                                className: "", children: [g("\u4e0d\u901a\u8fc7", t.neglectModelTarget, (function () {
                                    t.ctx.DetailID = n.ID
                                }), "btn-warning btn-sm col-md"), (0, v.jsx)("button", {
                                    style: {marginLeft: "20px"},
                                    type: "button",
                                    className: "btn btn-success btn-sm col-md",
                                    onClick: (0, u.Z)((0, d.Z)().mark((function e() {
                                        return (0, d.Z)().wrap((function (e) {
                                            for (; ;) switch (e.prev = e.next) {
                                                case 0:
                                                    return e.next = 2, (0, P.yj)(i.u.RecordPreScores(n.ID), "\u6b63\u5728\u5199\u5165\u9884\u5f55\u5165\u6210\u7ee9", "\u5199\u5165\u9884\u5f55\u5165\u6210\u7ee9\u6210\u529f", "\u5199\u5165\u9884\u5f55\u5165\u6210\u7ee9\u5931\u8d25");
                                                case 2:
                                                    return e.next = 4, (0, H._R)(500).then((function () {
                                                        window.location.reload()
                                                    }));
                                                case 4:
                                                case"end":
                                                    return e.stop()
                                            }
                                        }), e)
                                    }))),
                                    children: "\u901a\u8fc7"
                                })]
                            });
                            r.push((0, v.jsxs)("tr", {children: [(0, v.jsx)("td", {children: n.ID}), (0, v.jsx)("td", {children: n.Source}), (0, v.jsx)("td", {children: n.ContestName}), (0, v.jsx)("td", {children: n.PlayerName}), (0, v.jsxs)("td", {children: [(0, _.F)(n.Project), " ", (0, h.Z2)(n.Project)]}), (0, v.jsx)("td", {children: n.RoundName}), (0, N.Pt)(n), (0, v.jsx)("td", {children: c})]}, "scoresBody_tr" + n.ID))
                        }, a = 0; a < e.Scores.length; a++) n();
                        return (0, v.jsxs)("table", {
                            className: "table table-striped table-hover",
                            children: [(0, v.jsx)("thead", {
                                children: (0, v.jsxs)("tr", {
                                    children: [(0, v.jsx)("th", {children: "\u5e8f\u53f7"}), (0, v.jsx)("th", {children: "\u6765\u6e90"}), (0, v.jsx)("th", {children: "\u6bd4\u8d5b"}), (0, v.jsx)("th", {children: "\u9009\u624b"}), (0, v.jsx)("th", {children: "\u9879\u76ee"}), (0, v.jsx)("th", {children: "\u8f6e\u6b21"}), (0, v.jsx)("th", {
                                        colSpan: 5,
                                        children: "\u6210\u7ee9"
                                    }), (0, v.jsx)("th", {children: "\u5ba1\u6838"})]
                                })
                            }), (0, v.jsx)("tbody", {children: r})]
                        })
                    }, this.neglectModal = function () {
                        var e = function () {
                            var e = (0, u.Z)((0, d.Z)().mark((function e() {
                                return (0, d.Z)().wrap((function (e) {
                                    for (; ;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, (0, P.yj)(i.u.NeglectPreScores(t.ctx.DetailID), "\u7b49\u5f85\u53d6\u6d88\u9884\u5f55\u5165\u6210\u7ee9", "\u53d6\u6d88\u9884\u5f55\u5165\u6210\u7ee9\u6210\u529f", "\u53d6\u6d88\u9884\u5f55\u5165\u6210\u7ee9\u5931\u8d25");
                                        case 2:
                                            return e.next = 4, (0, H._R)(1e3).then((function () {
                                                window.location.reload()
                                            }));
                                        case 4:
                                        case"end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }();
                        return b("\u53d6\u6d88", (function () {
                            if (null === t.ctx.PreScores || 0 === t.ctx.PreScores.Scores.length) return (0, v.jsx)("div", {children: "\u662f\u5426\u53d6\u6d88\u8be5\u6210\u7ee9"});
                            if (-1 === t.ctx.DetailID) return (0, v.jsx)("div", {children: "\u662f\u5426\u53d6\u6d88\u8be5\u6210\u7ee9"});
                            for (var e = t.ctx.PreScores.Scores[0], r = 0; r < t.ctx.PreScores.Scores.length; r++) if (t.ctx.PreScores.Scores[r].ID === t.ctx.DetailID) {
                                e = t.ctx.PreScores.Scores[r];
                                break
                            }
                            return (0, v.jsxs)("div", {
                                children: [(0, v.jsx)("h3", {children: "\u662f\u5426\u53d6\u6d88\u6210\u7ee9?"}), (0, v.jsxs)("table", {
                                    className: "table table-hover table-sm",
                                    style: {width: "90%"},
                                    children: [(0, v.jsx)("thead", {
                                        children: (0, v.jsxs)("tr", {
                                            children: [(0, v.jsx)("th", {children: "\u5e8f\u53f7"}), (0, v.jsx)("th", {children: "\u6765\u6e90"}), (0, v.jsx)("th", {children: "\u6bd4\u8d5b"}), (0, v.jsx)("th", {children: "\u9009\u624b"}), (0, v.jsx)("th", {children: "\u9879\u76ee"}), (0, v.jsx)("th", {children: "\u8f6e\u6b21"}), (0, v.jsx)("th", {
                                                colSpan: 5,
                                                children: "\u6210\u7ee9"
                                            })]
                                        }, "neglectModal_key")
                                    }), (0, v.jsx)("tbody", {children: (0, v.jsxs)("tr", {children: [(0, v.jsx)("td", {children: e.ID}), (0, v.jsx)("td", {children: e.Source}), (0, v.jsx)("td", {children: e.ContestName}), (0, v.jsx)("td", {children: e.PlayerName}), (0, v.jsxs)("td", {children: [(0, _.F)(e.Project), " ", (0, h.Z2)(e.Project)]}), (0, v.jsx)("td", {children: e.RoundName}), (0, N.Pt)(e)]}, "neglectModal_key" + e.ID)})]
                                })]
                            })
                        }), t.neglectModelTarget, e)
                    }, this.resetRecordsModal = function () {
                        var e = function () {
                            var e = (0, u.Z)((0, d.Z)().mark((function e() {
                                return (0, d.Z)().wrap((function (e) {
                                    for (; ;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, (0, P.yj)(i.u.ResetRecords(), (0, v.jsx)("p", {children: "\u7b49\u5f85\u91cd\u7f6e\u8bb0\u5f55"}), (0, v.jsx)("p", {children: "\u91cd\u7f6e\u8bb0\u5f55\u6210\u529f"}), (0, v.jsx)("p", {children: "\u91cd\u7f6e\u8bb0\u5f55\u5931\u8d25"}));
                                        case 2:
                                            return e.next = 4, (0, H._R)(1e3).then((function () {
                                                window.location.reload()
                                            }));
                                        case 4:
                                        case"end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }();
                        return b("\u91cd\u7f6e\u8bb0\u5f55", (function () {
                            return (0, v.jsxs)("div", {children: [(0, v.jsx)("h3", {children: "\u662f\u5426\u91cd\u65b0\u8ba1\u7b97\u6240\u6709\u8bb0\u5f55?"}), (0, v.jsx)("p", {children: "\u6240\u6709\u8bb0\u5f55\u5c06\u91cd\u5934\u5f00\u59cb\u8ba1\u7b97"})]})
                        }), J, e)
                    }, this.loadPreScoreData().then()
                }

                return (0, a.Z)(e, [{
                    key: "loadPreScoreData", value: function () {
                        var e = (0, u.Z)((0, d.Z)().mark((function e() {
                            var t, r, n = this;
                            return (0, d.Z)().wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return t = (0, p.eV)(), r = isNaN(Number(t[this.approval_score_page])) ? 1 : Number(t[this.approval_score_page]), e.next = 4, (0, P.yj)(i.u.GetPreScores(r, 50, !1).then((function (e) {
                                            n.ctx.PreScores = e
                                        })), "\u52a0\u8f7d\u9884\u5f55\u5165\u5217\u8868", "\u52a0\u8f7d\u9884\u5f55\u5165\u5217\u8868\u6210\u529f", "\u52a0\u8f7d\u9884\u5f55\u5165\u5931\u8d25");
                                    case 4:
                                    case"end":
                                        return e.stop()
                                }
                            }), e, this)
                        })));
                        return function () {
                            return e.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "render", value: function () {
                        return (0, v.jsxs)("div", {
                            style: {marginTop: "30px"},
                            children: [this.neglectModal(), this.resetRecordsModal(), (0, v.jsx)("p", {
                                style: {marginTop: "20px", float: "right"},
                                children: g("\u91cd\u7f6e\u8bb0\u5f55", J, y, "btn-primary")
                            }), (0, v.jsx)("p", {style: {marginTop: "30px"}}), this.scoresBody(), this.scoresPage()]
                        })
                    }
                }]), e
            }(), ee = function () {
                function e() {
                    (0, n.Z)(this, e), this.data = []
                }

                return (0, a.Z)(e, [{
                    key: "render", value: function () {
                        return (0, v.jsx)("div", {})
                    }
                }]), e
            }(), te = function () {
                function e() {
                    (0, n.Z)(this, e), this.data = []
                }

                return (0, a.Z)(e, [{
                    key: "render", value: function () {
                        return (0, v.jsx)("div", {})
                    }
                }]), e
            }(), re = r(8549), ne = function (e) {
                (0, c.Z)(r, e);
                var t = (0, s.Z)(r);

                function r() {
                    var e;
                    (0, n.Z)(this, r);
                    for (var a = arguments.length, c = new Array(a), s = 0; s < a; s++) c[s] = arguments[s];
                    return (e = t.call.apply(t, [this].concat(c))).update = function () {
                        e.setState({})
                    }, e.state = {
                        AdminScoreRenderCli: null,
                        AdminContestRenderCli: null,
                        AdminPlayerRenderCli: null,
                        AdminXLogRenderCli: null,
                        AdminApprovalScoreRenderCli: null,
                        AdminApprovalScoreVideoRenderCli: null,
                        AdminUserRenderCli: null
                    }, e.ScoreRender = function () {
                        return null === e.state.AdminScoreRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminScoreRenderCli.render()
                    }, e.ContestRender = function () {
                        return null === e.state.AdminContestRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminContestRenderCli.render()
                    }, e.PlayerRender = function () {
                        return null === e.state.AdminPlayerRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminPlayerRenderCli.render()
                    }, e.XLogRender = function () {
                        return null === e.state.AdminXLogRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminXLogRenderCli.render()
                    }, e.AdminApprovalScoreRender = function () {
                        return null === e.state.AdminApprovalScoreRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminApprovalScoreRenderCli.render()
                    }, e.AdminApprovalScoreVideoRender = function () {
                        return null === e.state.AdminApprovalScoreVideoRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminApprovalScoreVideoRenderCli.render()
                    }, e.AdminUserRender = function () {
                        return null === e.state.AdminUserRenderCli ? (0, v.jsx)("div", {}) : e.state.AdminUserRenderCli.render()
                    }, e
                }

                return (0, a.Z)(r, [{
                    key: "componentDidMount", value: function () {
                        (0, re.R)(""), i.u.IsAuth() ? this.setState({
                            AdminScoreRenderCli: new U(this.update),
                            AdminContestRenderCli: new K(this.update),
                            AdminPlayerRenderCli: new z(this.update),
                            AdminXLogRenderCli: new q,
                            AdminApprovalScoreRenderCli: new Y,
                            AdminApprovalScoreVideoRenderCli: new ee,
                            AdminUserRenderCli: new te
                        }) : window.location.href = "/xauth"
                    }
                }, {
                    key: "loginOut", value: function () {
                        i.u.DeleteToken(), window.location.href = "/xauth"
                    }
                }, {
                    key: "render", value: function () {
                        if (!i.u.IsAuth()) return (0, v.jsx)("div", {children: "\u7b49\u5f85\u767b\u5f55"});
                        var e = [{Id: "score", Name: (0, v.jsx)("h4", {children: "\u6210\u7ee9\u5f55\u5165"}), Page: this.ScoreRender()}, {
                            Id: "contest",
                            Name: (0, v.jsx)("h4", {children: "\u6bd4\u8d5b\u7ba1\u7406"}),
                            Page: this.ContestRender()
                        }, {Id: "player", Name: (0, v.jsx)("h4", {children: "\u9009\u624b\u7ba1\u7406"}), Page: this.PlayerRender()}, {
                            Id: "xlog",
                            Name: (0, v.jsx)("h4", {children: "\u65e5\u5fd7\u7ba1\u7406"}),
                            Page: this.XLogRender()
                        }, {Id: "user", Name: (0, v.jsx)("h4", {children: "\u9009\u624b\u5ba1\u6279"}), Page: this.AdminUserRender()}, {
                            Id: "approval_score",
                            Name: (0, v.jsx)("h4", {children: "\u6210\u7ee9\u5ba1\u6279"}),
                            Page: this.AdminApprovalScoreRender()
                        }, {Id: "approval_score_video", Name: (0, v.jsx)("h4", {children: "\u89c6\u9891\u5ba1\u6279"}), Page: this.AdminApprovalScoreVideoRender()}];
                        return (0, v.jsxs)("div", {
                            children: [(0, v.jsx)("button", {
                                type: "button",
                                className: "btn btn-sm btn-danger login-out-btn",
                                onClick: this.loginOut,
                                children: "\u9000\u51fa\u767b\u5f55"
                            }), (0, v.jsx)(o.K, {Id: "admin_tabs", SelectedKey: "tabs", Pages: e, Center: !0})]
                        })
                    }
                }]), r
            }(l.Component), ae = ne
    }, 1069: function (e, t, r) {
        r.r(t), r.d(t, {
            ContestTypeCn: function () {
                return v
            }, convertDateString: function () {
                return j
            }
        });
        var n = r(5671), a = r(3144), c = r(136), s = r(516), l = r(390), i = r(1122), o = r(5400), d = r(8551), u = r(5269), h = r(3499), x = r(8549), p = r(5415), f = r(2559);

        function j(e) {
            var t = new Date(e), r = t.getFullYear();
            if (r < 2e3) return "-";
            var n = t.getMonth() + 1, a = t.getDate();
            return "".concat(r, "\u5e74").concat(n, "\u6708").concat(a, "\u53f7")
        }

        var m = function (e) {
            (0, c.Z)(r, e);
            var t = (0, s.Z)(r);

            function r() {
                var e;
                (0, n.Z)(this, r);
                for (var a = arguments.length, c = new Array(a), s = 0; s < a; s++) c[s] = arguments[s];
                return (e = t.call.apply(t, [this].concat(c))).state = {data: null}, e
            }

            return (0, a.Z)(r, [{
                key: "getData", value: function () {
                    var e = this, t = (0, d.eV)(), r = isNaN(Number(t.page)) ? 1 : Number(t.page), n = isNaN(Number(t.size)) ? 20 : Number(t.size), a = t.type ? t.type : "";
                    i.b.GetContests(r, n, a).then((function (t) {
                        e.setState({data: t})
                    }))
                }
            }, {
                key: "componentWillReceiveProps", value: function (e, t) {
                    this.getData()
                }
            }, {
                key: "componentDidMount", value: function () {
                    (0, x.R)(""), this.getData()
                }
            }, {
                key: "render", value: function () {
                    return this.renderPage()
                }
            }, {
                key: "contestTrBody", value: function (e) {
                    var t = "\u8fdb\u884c\u4e2d";
                    return e.IsEnd && (t = "\u5df2\u7ed3\u675f"), (0, f.jsxs)("tr", {
                        children: [(0, f.jsx)("td", {children: j(e.StartTime)}), (0, f.jsx)("td", {children: j(e.EndTime)}), (0, f.jsx)("td", {children: v(e.Type)}), (0, f.jsx)("td", {
                            children: (0, f.jsx)(o.rU, {
                                to: "/contest?id=" + e.ID,
                                children: e.Name
                            })
                        }), (0, f.jsx)("td", {style: {color: e.IsEnd ? "red" : "green"}, children: t})]
                    }, "contestTrBody_" + e.ID)
                }
            }, {
                key: "renderTable", value: function (e) {
                    var t = this;
                    return (0, f.jsxs)("table", {
                        className: "table text-center table-striped table-hover",
                        children: [(0, f.jsx)("thead", {
                            children: (0, f.jsxs)("tr", {
                                children: [(0, f.jsx)("th", {scope: "col", children: "\u5f00\u59cb\u65f6\u95f4"}), (0, f.jsx)("th", {
                                    scope: "col",
                                    children: "\u7ed3\u675f\u65f6\u95f4"
                                }), (0, f.jsx)("th", {scope: "col", children: "\u5f62\u5f0f"}), (0, f.jsx)("th", {scope: "col", children: "\u6bd4\u8d5b\u540d\u79f0"}), (0, f.jsx)("th", {
                                    scope: "col",
                                    children: "\u72b6\u6001"
                                })]
                            })
                        }), (0, f.jsx)("tbody", {
                            children: e.Contests.map((function (e) {
                                return t.contestTrBody(e)
                            }))
                        })]
                    })
                }
            }, {
                key: "readerPageNav", value: function () {
                    if (null === this.state.data) return (0, f.jsx)("div", {});
                    var e = (0, d.eV)(), t = isNaN(Number(e.page)) ? 1 : Number(e.page),
                        r = {Id: "contests_page", Count: this.state.data.Count, PageKey: "page", CurPage: t, Size: 20, Link: "/contests"};
                    return (0, u.T)(r)
                }
            }, {
                key: "renderSelect", value: function () {
                    for (var e = this, t = [{value: "", label: "\u6240\u6709"}, {value: "online", label: "\u7ebf\u4e0a"}, {value: "offline", label: "\u7ebf\u4e0b"}, {
                        value: "official",
                        label: "\u7ebf\u4e0b\u6b63\u5f0f"
                    }], r = (0, d.eV)(), n = r.type ? r.type : "", a = 0, c = 0; c < t.length; c++) t[c].value === n && (a = c);
                    return (0, f.jsx)("div", {
                        style: {float: "right", maxWidth: "250px"}, children: (0, f.jsx)(h.ZP, {
                            defaultValue: t[a], options: t, onChange: function (t) {
                                if (null !== t) {
                                    var r = (0, d.nM)("type");
                                    t.value !== r && ((0, d.$H)("type", t.value), e.getData())
                                }
                            }
                        })
                    })
                }
            }, {
                key: "renderPage", value: function () {
                    if (null === this.state.data) return (0, f.jsx)(p.Z, {});
                    var e = this.state.data;
                    return (0, f.jsxs)("div", {children: [this.renderSelect(), this.renderTable(e), this.readerPageNav()]})
                }
            }]), r
        }(l.Component), v = function (e) {
            switch (e) {
                case"":
                    return "\u6240\u6709";
                case"online":
                    return "\u7ebf\u4e0a";
                case"offline":
                    return "\u7ebf\u4e0b";
                case"official":
                    return "\u7ebf\u4e0b\u6b63\u5f0f";
                default:
                    return "\u5176\u4ed6"
            }
        };
        t.default = m
    }
}]);
//# sourceMappingURL=17.998b9f46.chunk.js.map