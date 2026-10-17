// Простые графики на canvas. Без сторонних библиотек. Тёмная тема сайта.
var CHART_THEME = { bg: "#0b1a33", grid: "rgba(255,255,255,.10)", axis: "#9fb0cc", sector: "rgba(255,255,255,.35)", label: "#ffffff" };

// series: [{ data: [...], color: "#..", width: 1.6 }] либо один массив data (тогда color обязателен)
function drawChart(canvas, series, key, color, maxY, label, sectors, maxXfix) {
  if (!series.length || !series[0].data) series = [{ data: series, color: color }];
  var dpr = window.devicePixelRatio || 1;
  var w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  var c = canvas.getContext("2d");
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  var pl = 40, pb = 20, pt = 18;
  var maxX = maxXfix || 0;
  if (!maxX) for (var q = 0; q < series.length; q++) maxX = Math.max(maxX, series[q].data[series[q].data.length - 1].d);
  c.fillStyle = CHART_THEME.bg; c.fillRect(0, 0, w, h);
  c.font = "11px Arial";
  c.fillStyle = CHART_THEME.axis;
  c.strokeStyle = CHART_THEME.grid; c.lineWidth = 1;
  var stepY = maxY > 100 ? 50 : 25;
  for (var y = 0; y <= maxY; y += stepY) {
    var yy = h - pb - (y / maxY) * (h - pb - pt);
    c.beginPath(); c.moveTo(pl, yy); c.lineTo(w - 5, yy); c.stroke();
    c.fillText(Math.round(y), 5, yy + 3);
  }
  var stepX = maxX > 10000 ? 2000 : 1000;
  for (var x = 0; x <= maxX; x += stepX) {
    var xx = pl + (x / maxX) * (w - pl - 5);
    c.beginPath(); c.moveTo(xx, pt); c.lineTo(xx, h - pb); c.stroke();
    c.fillText(x / 1000 + " км", xx - 8, h - 5);
  }
  if (sectors) {
    c.strokeStyle = CHART_THEME.sector; c.setLineDash([3, 3]);
    for (var s = 0; s < sectors.length; s++) {
      var sx = pl + (sectors[s] / maxX) * (w - pl - 5);
      c.beginPath(); c.moveTo(sx, pt); c.lineTo(sx, h - pb); c.stroke();
      c.fillText("S" + (s + 2), sx + 3, pt + 9);
    }
    c.setLineDash([]);
  }
  for (q = 0; q < series.length; q++) {
    var data = series[q].data;
    c.strokeStyle = series[q].color; c.lineWidth = series[q].width || 1.6;
    c.beginPath();
    for (var i = 0; i < data.length; i++) {
      var px = pl + (data[i].d / maxX) * (w - pl - 5);
      var py = h - pb - (data[i][key] / maxY) * (h - pb - pt);
      if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
    }
    c.stroke();
  }
  c.fillStyle = CHART_THEME.label; c.font = "bold 12px Arial";
  c.fillText(label, pl + 5, pt - 5);
}

// анимация: точка бежит по графику скорости (повторный вызов останавливает предыдущую)
var _traceRAF = null;
function animateTrace(canvas, data, maxY, color) {
  if (_traceRAF) cancelAnimationFrame(_traceRAF);
  var c = canvas.getContext("2d");
  var snap = c.getImageData(0, 0, canvas.width, canvas.height);
  var i = 0;
  var w = canvas.clientWidth, h = canvas.clientHeight;
  var dpr = window.devicePixelRatio || 1;
  var maxX = data[data.length - 1].d;
  function frame() {
    c.putImageData(snap, 0, 0);
    var px = 40 + (data[i].d / maxX) * (w - 45);
    var py = h - 20 - (data[i].speed / maxY) * (h - 38);
    c.save(); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = color || "#ff3b4e";
    c.beginPath(); c.arc(px, py, 4.5, 0, 6.3); c.fill();
    c.strokeStyle = "#fff"; c.lineWidth = 1.5; c.stroke();
    c.fillStyle = "#fff"; c.font = "bold 11px Arial";
    c.fillText(data[i].speed + " км/ч", Math.min(px + 7, w - 60), py - 7);
    c.restore();
    i = (i + 3) % data.length;
    _traceRAF = requestAnimationFrame(frame);
  }
  frame();
}

function pathFromOutline(pts) {
  var d = "M" + pts[0][0] + "," + pts[0][1];
  for (var i = 1; i < pts.length; i++) d += " L" + pts[i][0] + "," + pts[i][1];
  return d + " Z";
}
