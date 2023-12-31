!(function () {
  const t = window.jQuery,
    e = t(window);
  function o(t, e, o, n) {
    const i = (n.x - o.x) * (t.y - o.y) - (n.y - o.y) * (t.x - o.x),
      c = (n.x - o.x) * (e.y - o.y) - (n.y - o.y) * (e.x - o.x),
      s = (e.x - t.x) * (o.y - t.y) - (e.y - t.y) * (o.x - t.x),
      a = (e.x - t.x) * (n.y - t.y) - (e.y - t.y) * (n.x - t.x);
    return 0 >= i * c && 0 >= s * a;
  }
  t(document).on("initEvents.vpf", (n, i) => {
    if ("vpf" !== n.namespace || "fly" !== i.options.itemsStyle) return;
    const c = ".vpf-uid-".concat(i.uid);
    let s = {};
    e.on("mousemove".concat(c), (t) => {
      s = { x: t.clientX, y: t.clientY };
    }),
      i.$item.on(
        "mouseenter".concat(c, " mouseleave").concat(c),
        ".vp-portfolio__item",
        function (e) {
          const n = t(this),
            i = n[0].getBoundingClientRect(),
            c = n.find(".vp-portfolio__item-overlay"),
            a = "mouseenter" === e.type;
          let f = "0%",
            y = "0%";
          const l = { x: e.clientX, y: e.clientY };
          let r = o(
              { x: i.left, y: i.top },
              { x: i.left + i.width, y: i.top },
              l,
              s
            ),
            x = o(
              { x: i.left, y: i.top + i.height },
              { x: i.left + i.width, y: i.top + i.height },
              l,
              s
            ),
            p = o(
              { x: i.left, y: i.top },
              { x: i.left, y: i.top + i.height },
              l,
              s
            ),
            h = o(
              { x: i.left + i.width, y: i.top },
              { x: i.left + i.width, y: i.top + i.height },
              l,
              s
            );
          if (!(r || x || p || h)) {
            const t = (i.width / 2 - l.x + i.left) / (i.width / 2),
              e = (i.height / 2 - l.y + i.top) / (i.height / 2);
            Math.abs(t) > Math.abs(e)
              ? 0 < t
                ? (p = !0)
                : (h = !0)
              : 0 < e
              ? (r = !0)
              : (x = !0);
          }
          r
            ? (y = "-100.1%")
            : x
            ? (y = "100.1%")
            : p
            ? (f = "-100.1%")
            : h && (f = "100.1%"),
            a &&
              (c.css({
                transition: "none",
                transform: "translateX("
                  .concat(f, ") translateY(")
                  .concat(y, ") translateZ(0)"),
              }),
              c[0].offsetHeight),
            c.css({
              transition: ".2s transform ease-in-out",
              transform: "translateX("
                .concat(a ? "0%" : f, ") translateY(")
                .concat(a ? "0%" : y, ") translateZ(0)"),
            });
        }
      );
  }),
    t(document).on("destroyEvents.vpf", (t, o) => {
      if ("vpf" !== t.namespace || "fly" !== o.options.itemsStyle) return;
      const n = ".vpf-uid-".concat(o.uid);
      e.off("mousemove".concat(n)),
        o.$item.off("mouseenter".concat(n, " mouseleave").concat(n));
    });
})();
