// скрипт для страниц отдельных трасс; id трассы берём из атрибута body
(function () {
  var id = document.body.getAttribute("data-track");
  var t = TRACKS[id];
  if (!t) return;
  var TEL = {}, LAP = {};
  CLASS_ORDER.forEach(function (k) { TEL[k] = makeTelemetry(t, k); LAP[k] = lapTime(TEL[k]); });
  var cur = "f1"; // выбранный класс или "all"
  var ns = "http://www.w3.org/2000/svg";

  // ---------- схема трассы и машины ----------
  var svg = document.getElementById("map"), road = null, len = 0, cars = {};
  var tp = (svg && typeof TRACK_PATHS !== "undefined") ? TRACK_PATHS[id] : null;
  function frac(pos) { // дистанция круга -> доля длины линии на схеме
    var a = tp.anchors;
    if (!a) return pos / t.length;
    var prev = [0, 0];
    for (var i = 0; i <= a.length; i++) {
      var nx = i < a.length ? a[i] : [t.length, 1];
      if (pos <= nx[0]) return prev[1] + (nx[1] - prev[1]) * (pos - prev[0]) / Math.max(1, nx[0] - prev[0]);
      prev = nx;
    }
    return 1;
  }
  if (tp) {
    svg.setAttribute("viewBox", tp.vb);
    road = svg.querySelector(".road");
    road.setAttribute("d", tp.d);
    svg.querySelector(".road-in").setAttribute("d", tp.d);
    len = road.getTotalLength();
    var start = road.getPointAtLength(0);
    var sf = document.createElementNS(ns, "rect");
    sf.setAttribute("x", start.x - 4); sf.setAttribute("y", start.y - 14);
    sf.setAttribute("width", 8); sf.setAttribute("height", 28); sf.setAttribute("class", "sf");
    svg.appendChild(sf);
    for (var a = 0; a < t.apex.length; a++) {
      var p = road.getPointAtLength(len * frac(t.apex[a][1]));
      var circ = document.createElementNS(ns, "circle");
      circ.setAttribute("cx", p.x); circ.setAttribute("cy", p.y); circ.setAttribute("r", 8);
      circ.setAttribute("class", "apex");
      var tt = document.createElementNS(ns, "title");
      tt.textContent = t.apex[a][0];
      circ.appendChild(tt);
      svg.appendChild(circ);
      var tx = document.createElementNS(ns, "text");
      tx.setAttribute("x", p.x + 11); tx.setAttribute("y", p.y - 9);
      tx.textContent = a + 1;
      svg.appendChild(tx);
    }
    var proto = svg.querySelector(".car");
    CLASS_ORDER.slice().reverse().forEach(function (k) {
      var cc = proto.cloneNode(); cc.style.fill = CLASSES[k].color; svg.appendChild(cc);
      var tl = document.createElementNS(ns, "title"); tl.textContent = CLASSES[k].name; cc.appendChild(tl);
      cars[k] = { el: cc, pos: 0 };
    });
    proto.parentNode.removeChild(proto);
    var last = null, speedup = Math.max(12, t.length / 480);
    var move = function (ts) {
      if (last !== null) {
        var dt = Math.min(ts - last, 100) / 1000 * speedup;
        CLASS_ORDER.forEach(function (k) {
          var c = cars[k], tel = TEL[k];
          var vis = cur === "all" || cur === k;
          c.el.style.display = vis ? "" : "none";
          var idx = Math.min(tel.length - 1, Math.floor(c.pos / 10));
          c.pos += tel[idx].speed / 3.6 * dt;
          if (c.pos >= t.length) c.pos -= t.length;
          var pt = road.getPointAtLength(len * frac(c.pos));
          c.el.setAttribute("cx", pt.x); c.el.setAttribute("cy", pt.y);
        });
        var k0 = cur === "all" ? "f1" : cur, i0 = Math.min(TEL[k0].length - 1, Math.floor(cars[k0].pos / 10));
        document.getElementById("cur-speed").textContent = TEL[k0][i0].speed;
      }
      last = ts;
      requestAnimationFrame(move);
    };
    requestAnimationFrame(move);
  }

  // ---------- таблица времени круга по классам ----------
  var lt = document.getElementById("lap-table");
  if (lt) {
    var ref = (typeof REF_LAPS !== "undefined" && REF_LAPS[id]) || {};
    CLASS_ORDER.forEach(function (k) {
      var c = CLASSES[k], r = ref[k], tr = document.createElement("tr");
      tr.setAttribute("data-cls", k);
      var vt = Math.round(t.vmax * c.top);
      var refc = r ? fmtLap(r[0], 3) + '<br><span class="small"><a href="' + r[2] + '" rel="noopener">' + r[1] + "</a></span>" : '<span class="small">нет сопоставимого официального круга</span>';
      var diff = r ? ((LAP[k] / r[0] - 1) * 100) : null;
      tr.innerHTML = '<td><span class="sw" style="background:' + c.color + '"></span>' + c.name + "</td>" +
        '<td class="num">' + vt + "</td>" +
        '<td class="num">' + Math.round(c.power / c.mass * 1000) + "</td>" +
        '<td class="num">' + fmtLap(LAP[k]) + "</td>" +
        '<td class="num">+' + ((LAP[k] / LAP.f1 - 1) * 100).toFixed(1) + " %</td>" +
        "<td>" + refc + (diff !== null ? ' <span class="small">(расчёт ' + (diff >= 0 ? "+" : "") + diff.toFixed(1) + " %)</span>" : "") + "</td>";
      if (k === "f1") tr.children[4].textContent = "-";
      lt.appendChild(tr);
    });
  }

  // ---------- переключатель классов ----------
  var bar = document.getElementById("cls-bar");
  var keys = CLASS_ORDER.concat(["all"]);
  keys.forEach(function (k) {
    var b = document.createElement("button");
    b.type = "button"; b.setAttribute("data-cls", k);
    b.innerHTML = (k === "all" ? '<i style="background:linear-gradient(90deg,#ff3b4e,#ffd23f,#4fc3f7,#7ee08a,#c9a7ff)"></i>Все классы' : '<i style="background:' + CLASSES[k].color + '"></i>' + CLASSES[k].name);
    b.onclick = function () { select(k); };
    bar.appendChild(b);
  });

  function apexTable() {
    var head = document.getElementById("apex-head"), tb = document.getElementById("apex-table");
    tb.innerHTML = "";
    if (cur === "all") {
      head.innerHTML = '<tr><th>№</th><th>Поворот</th><th class="num">Дистанция, м</th>' + CLASS_ORDER.map(function (k) { return '<th class="num">' + CLASSES[k].name + ", км/ч</th>"; }).join("") + "</tr>";
      var all = {}; CLASS_ORDER.forEach(function (k) { all[k] = classApex(t, k); });
      for (var a = 0; a < t.apex.length; a++) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + (a + 1) + "</td><td>" + t.apex[a][0] + '</td><td class="num">' + t.apex[a][1] + "</td>" +
          CLASS_ORDER.map(function (k) { return '<td class="num">' + all[k][a][2] + "</td>"; }).join("");
        tb.appendChild(tr);
      }
    } else {
      head.innerHTML = '<tr><th>№</th><th>Поворот</th><th class="num">Дистанция, м</th><th class="num">Скорость в апексе, км/ч</th><th class="num">Передача</th></tr>';
      var ap = classApex(t, cur);
      for (var b = 0; b < ap.length; b++) {
        var tr2 = document.createElement("tr");
        tr2.innerHTML = "<td>" + (b + 1) + "</td><td>" + ap[b][0] + '</td><td class="num">' + ap[b][1] + '</td><td class="num">' + ap[b][2] + '</td><td class="num">' + ap[b][3] + "</td>";
        tb.appendChild(tr2);
      }
    }
  }

  function charts() {
    var ser = function (k, w) { return { data: TEL[k], color: CLASSES[k].color, width: w }; };
    var list = cur === "all" ? CLASS_ORDER.map(function (k) { return ser(k, 1.5); }) : [ser(cur, 1.8)];
    drawChart(document.getElementById("c-speed"), list, "speed", null, 350, "Скорость, км/ч", t.sectors);
    drawChart(document.getElementById("c-thr"), list, "throttle", null, 100, "Газ, %", t.sectors);
    drawChart(document.getElementById("c-brk"), list, "brake", null, 100, "Тормоз, %", t.sectors);
    var k0 = cur === "all" ? "f1" : cur;
    animateTrace(document.getElementById("c-speed"), TEL[k0], 350, CLASSES[k0].color);
    var leg = document.getElementById("cls-legend");
    leg.innerHTML = list.map(function (s, i) { var k = cur === "all" ? CLASS_ORDER[i] : cur; return '<span><i style="background:' + CLASSES[k].color + '"></i>' + CLASSES[k].name + " - " + fmtLap(LAP[k]) + "</span>"; }).join("");
  }

  function stats() {
    var k0 = cur === "all" ? "f1" : cur, tel = TEL[k0], full = 0, br = 0;
    for (var i = 0; i < tel.length; i++) { if (tel[i].throttle === 100) full++; if (tel[i].brake > 0) br++; }
    document.getElementById("full-thr").textContent = Math.round(full / tel.length * 100);
    document.getElementById("brk-share").textContent = Math.round(br / tel.length * 100);
    document.getElementById("lap-model").textContent = fmtLap(LAP[k0]);
    document.querySelectorAll(".cls-name").forEach(function (e) { e.textContent = cur === "all" ? "все классы" : CLASSES[cur].name; });
    document.querySelectorAll(".cls-name-1").forEach(function (e) { e.textContent = CLASSES[k0].name; });
    var c = CLASSES[k0];
    document.getElementById("cls-info").innerHTML = cur === "all"
      ? "Наложение пяти классов. На схеме едут все пять машин одновременно, со своими профилями скорости: видно, как F1 уходит от GT3 за круг."
      : "<b>" + c.full + "</b>: масса около " + c.mass + " кг, мощность около " + c.power + " кВт (" + Math.round(c.power / c.mass * 1000) + " Вт/кг), макс. скорость на этой трассе " + Math.round(t.vmax * c.top) + " км/ч, торможение до " + (c.brk[0] + c.brk[1] * Math.pow(t.vmax * c.top / 3.6, 2)).toFixed(1) + " g, передач: " + c.gears + ".";
    document.querySelectorAll("#lap-table tr").forEach(function (r) { r.classList.toggle("cur", r.getAttribute("data-cls") === cur); });
  }

  function select(k) {
    cur = k;
    bar.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-cls") === k ? "true" : "false"); });
    apexTable(); charts(); stats();
    try { history.replaceState(null, "", "#" + k); } catch (e) {}
  }
  var h = location.hash.replace("#", "");
  select(keys.indexOf(h) >= 0 ? h : "f1");
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(charts, 150); });
})();
