// скрипт для страниц отдельных трасс; id трассы берём из атрибута body
(function () {
  var id = document.body.getAttribute("data-track");
  var t = TRACKS[id];
  if (!t) return;
  var tel = makeTelemetry(t);

  // схема трассы
  var svg = document.getElementById("map");
  var road = svg.querySelector(".road");
  road.setAttribute("d", pathFromOutline(t.outline));
  svg.querySelector(".road-in").setAttribute("d", pathFromOutline(t.outline));
  var len = road.getTotalLength();
  var ns = "http://www.w3.org/2000/svg";
  for (var a = 0; a < t.apex.length; a++) {
    var p = road.getPointAtLength(len * t.apex[a][1] / t.length);
    var circ = document.createElementNS(ns, "circle");
    circ.setAttribute("cx", p.x); circ.setAttribute("cy", p.y); circ.setAttribute("r", 4);
    circ.setAttribute("class", "apex");
    var tt = document.createElementNS(ns, "title");
    tt.textContent = t.apex[a][0];
    circ.appendChild(tt);
    svg.appendChild(circ);
    var tx = document.createElementNS(ns, "text");
    tx.setAttribute("x", p.x + 5); tx.setAttribute("y", p.y - 5);
    tx.textContent = a + 1;
    svg.appendChild(tx);
  }
  // машинка едет по трассе со скоростью из телеметрии (ускорено)
  var car = svg.querySelector(".car");
  var pos = 0, last = null;
  var speedup = Math.max(12, t.length / 480); // ускорение, чтобы круг шёл секунд 30-40
  function move(ts) {
    if (last !== null) {
      var idx = Math.min(tel.length - 1, Math.floor(pos / 10));
      pos += tel[idx].speed / 3.6 * (ts - last) / 1000 * speedup;
      if (pos >= t.length) pos = 0;
      var pt = road.getPointAtLength(len * pos / t.length);
      car.setAttribute("cx", pt.x); car.setAttribute("cy", pt.y);
      document.getElementById("cur-speed").textContent = tel[idx].speed;
    }
    last = ts;
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  // таблица апексов
  var tb = document.getElementById("apex-table");
  for (a = 0; a < t.apex.length; a++) {
    var tr = document.createElement("tr");
    tr.innerHTML = "<td>" + (a + 1) + "</td><td>" + t.apex[a][0] + "</td><td>" + t.apex[a][1] +
      "</td><td>" + t.apex[a][2] + "</td><td>" + t.apex[a][3] + "</td>";
    tb.appendChild(tr);
  }

  drawChart(document.getElementById("c-speed"), tel, "speed", "#c8102e", 350, "Скорость, км/ч", t.sectors);
  drawChart(document.getElementById("c-thr"), tel, "throttle", "#2a8a2a", 100, "Газ, %", t.sectors);
  drawChart(document.getElementById("c-brk"), tel, "brake", "#1f4fa8", 100, "Тормоз, %", t.sectors);
  animateTrace(document.getElementById("c-speed"), tel, 350);

  // мини-статистика по кругу
  var full = 0, br = 0;
  for (var i = 0; i < tel.length; i++) { if (tel[i].throttle === 100) full++; if (tel[i].brake > 0) br++; }
  document.getElementById("full-thr").textContent = Math.round(full / tel.length * 100);
  document.getElementById("brk-share").textContent = Math.round(br / tel.length * 100);
})();
