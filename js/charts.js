// Простые графики на canvas. Chart.js подключать не стал - хотелось разобраться самому.
function drawChart(canvas, data, key, color, maxY, label, sectors) {
  var dpr = window.devicePixelRatio || 1;
  var w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  var c = canvas.getContext("2d");
  c.scale(dpr, dpr);
  var pl = 40, pb = 20, pt = 15;
  var maxX = data[data.length - 1].d;
  c.clearRect(0, 0, w, h);
  c.font = "10px Verdana";
  c.fillStyle = "#666";
  c.strokeStyle = "#e5e5e5";
  var stepY = maxY > 100 ? 50 : 25;
  for (var y = 0; y <= maxY; y += stepY) {
    var yy = h - pb - (y / maxY) * (h - pb - pt);
    c.beginPath(); c.moveTo(pl, yy); c.lineTo(w - 5, yy); c.stroke();
    c.fillText(Math.round(y), 5, yy + 3);
  }
  for (var x = 0; x <= maxX; x += 1000) {
    var xx = pl + (x / maxX) * (w - pl - 5);
    c.fillText(x / 1000 + " км", xx - 8, h - 5);
  }
  if (sectors) {
    c.strokeStyle = "#999"; c.setLineDash([3, 3]);
    for (var s = 0; s < sectors.length; s++) {
      var sx = pl + (sectors[s] / maxX) * (w - pl - 5);
      c.beginPath(); c.moveTo(sx, pt); c.lineTo(sx, h - pb); c.stroke();
      c.fillText("S" + (s + 2), sx + 3, pt + 8);
    }
    c.setLineDash([]);
  }
  c.strokeStyle = color; c.lineWidth = 1.5;
  c.beginPath();
  for (var i = 0; i < data.length; i++) {
    var px = pl + (data[i].d / maxX) * (w - pl - 5);
    var py = h - pb - (data[i][key] / maxY) * (h - pb - pt);
    if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
  }
  c.stroke();
  c.fillStyle = "#333";
  c.fillText(label, pl + 5, pt - 3);
}

// анимация: точка бежит по графику скорости
function animateTrace(canvas, data, maxY) {
  var c = canvas.getContext("2d");
  var snap = c.getImageData(0, 0, canvas.width, canvas.height);
  var i = 0;
  var w = canvas.clientWidth, h = canvas.clientHeight;
  var dpr = window.devicePixelRatio || 1;
  function frame() {
    c.putImageData(snap, 0, 0);
    var maxX = data[data.length - 1].d;
    var px = 40 + (data[i].d / maxX) * (w - 45);
    var py = h - 20 - (data[i].speed / maxY) * (h - 35);
    c.save(); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = "#c8102e";
    c.beginPath(); c.arc(px, py, 4, 0, 6.3); c.fill();
    c.fillStyle = "#000";
    c.fillText(data[i].speed + " км/ч", Math.min(px + 6, w - 60), py - 6);
    c.restore();
    i = (i + 3) % data.length;
    requestAnimationFrame(frame);
  }
  frame();
}

function pathFromOutline(pts) {
  var d = "M" + pts[0][0] + "," + pts[0][1];
  for (var i = 1; i < pts.length; i++) d += " L" + pts[i][0] + "," + pts[i][1];
  return d + " Z";
}
