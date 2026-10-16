// Данные по трассам. Длины, названия поворотов и рекорды - из открытых источников
// (сайты трасс, Википедия), скорости в апексах - по онбордам и симулятору.
var TRACKS = {
  monza: {
    name: "Монца", full: "Autodromo Nazionale Monza", country: "Италия",
    length: 5793, turns: 11, vmax: 342, lap: "1:21.046", rec: "Р. Баррикелло, Ferrari, 2004",
    sectors: [1950, 4000],
    outline: [[60,170],[240,170],[262,160],[262,140],[250,120],[255,95],[240,60],[200,30],[150,25],[120,40],[95,55],[60,60],[35,80],[30,120],[40,155]],
    apex: [
      ["Variante del Rettifilo", 870, 82, 2],
      ["Curva Biassono", 1500, 285, 7],
      ["Variante della Roggia", 2150, 118, 3],
      ["Lesmo 1", 2650, 185, 5],
      ["Lesmo 2", 2950, 172, 4],
      ["Variante Ascari", 3800, 205, 5],
      ["Parabolica (Alboreto)", 5150, 215, 5]
    ]
  },
  spa: {
    name: "Спа-Франкоршам", full: "Circuit de Spa-Francorchamps", country: "Бельгия",
    length: 7004, turns: 19, vmax: 330, lap: "1:44.701", rec: "С. Перес, Red Bull, 2024",
    sectors: [2200, 4900],
    outline: [[70,40],[60,60],[80,75],[110,72],[150,40],[220,25],[270,40],[275,70],[240,90],[230,120],[250,150],[220,175],[170,170],[140,150],[110,160],[70,175],[40,150],[45,110],[55,80],[50,55]],
    apex: [
      ["La Source", 420, 64, 2],
      ["Raidillon", 1050, 292, 7],
      ["Les Combes", 2400, 138, 4],
      ["Bruxelles", 3000, 118, 3],
      ["Pouhon", 3700, 232, 6],
      ["Fagnes", 4300, 168, 5],
      ["Stavelot", 5100, 190, 5],
      ["Blanchimont", 6000, 305, 8],
      ["Bus Stop", 6650, 76, 2]
    ]
  },
  suzuka: {
    name: "Сузука", full: "Suzuka International Racing Course", country: "Япония",
    length: 5807, turns: 18, vmax: 318, lap: "1:30.983", rec: "Л. Хэмилтон, Mercedes, 2019",
    sectors: [2000, 4150],
    outline: [[40,150],[90,165],[130,150],[150,120],[130,100],[110,80],[140,60],[180,55],[210,80],[200,110],[170,125],[150,145],[190,170],[240,165],[270,130],[260,90],[230,40],[180,25],[120,30],[70,60],[40,100]],
    apex: [
      ["Поворот 1", 650, 262, 7],
      ["S-кривые (Esses)", 1200, 198, 5],
      ["Degner 1", 2300, 212, 6],
      ["Degner 2", 2450, 142, 4],
      ["Шпилька (Hairpin)", 2900, 66, 2],
      ["Spoon", 3900, 156, 4],
      ["130R", 4900, 298, 7],
      ["Шикана Casio", 5350, 82, 2]
    ]
  },
  silverstone: {
    name: "Сильверстоун", full: "Silverstone Circuit", country: "Великобритания",
    length: 5891, turns: 18, vmax: 325, lap: "1:27.097", rec: "М. Ферстаппен, Red Bull, 2020",
    sectors: [1800, 4100],
    outline: [[120,175],[180,170],[230,150],[260,120],[250,90],[220,80],[230,50],[200,25],[150,35],[120,60],[80,45],[45,60],[40,100],[60,120],[50,150],[80,172]],
    apex: [
      ["Abbey", 300, 278, 7],
      ["Village", 900, 112, 3],
      ["The Loop", 1100, 72, 2],
      ["Copse", 2000, 292, 7],
      ["Maggotts-Becketts", 2700, 205, 6],
      ["Stowe", 3900, 238, 6],
      ["Vale", 4600, 108, 3],
      ["Club", 5000, 152, 4]
    ]
  },
  nurburgring: {
    name: "Нюрбургринг Нордшляйфе", full: "Nürburgring Nordschleife", country: "Германия",
    length: 20832, turns: 73, vmax: 300, lap: "5:19.546", rec: "Т. Бернхард, Porsche 919 Evo, 2018",
    sectors: [7000, 14000],
    outline: [[87,152],[60,138],[28,122],[47,107],[60,73],[51,52],[91,60],[110,41],[117,27],[110,17],[136,37],[153,47],[165,54],[198,38],[217,73],[225,85],[210,101],[247,94],[256,118],[275,138],[248,138],[206,133],[175,160],[121,160]],
    apex: [
      ["Hatzenbach", 1200, 130, 3],
      ["Hocheichen", 2400, 150, 4],
      ["Flugplatz", 3000, 200, 5],
      ["Schwedenkreuz", 4600, 230, 6],
      ["Aremberg", 5100, 85, 2],
      ["Fuchsröhre", 6000, 240, 6],
      ["Adenauer Forst", 6600, 80, 2],
      ["Metzgesfeld", 7300, 140, 3],
      ["Kallenhard", 8000, 110, 3],
      ["Wehrseifen", 8800, 70, 2],
      ["Breidscheid", 9500, 75, 2],
      ["Ex-Mühle", 9800, 90, 2],
      ["Bergwerk", 10900, 105, 3],
      ["Kesselchen", 11800, 190, 5],
      ["Klostertal", 13000, 120, 3],
      ["Karussell", 13600, 70, 2],
      ["Hohe Acht", 14500, 140, 3],
      ["Wippermann", 15000, 110, 3],
      ["Brünnchen", 15900, 120, 3],
      ["Pflanzgarten", 16600, 170, 4],
      ["Schwalbenschwanz", 17800, 110, 3],
      ["Galgenkopf", 18900, 170, 4],
      ["Tiergarten", 20400, 180, 5]
    ]
  },
  monaco: {
    name: "Монако", full: "Circuit de Monaco", country: "Монако",
    length: 3337, turns: 19, vmax: 290, lap: "1:12.909", rec: "Л. Хэмилтон, Mercedes, 2021",
    sectors: [1250, 2300],
    outline: [[60,150],[90,120],[100,80],[130,50],[170,40],[190,60],[175,80],[200,95],[250,100],[270,130],[240,160],[200,165],[170,150],[130,165],[100,175],[70,170]],
    apex: [
      ["Sainte Devote", 250, 104, 3],
      ["Massenet", 700, 158, 4],
      ["Casino", 850, 118, 3],
      ["Mirabeau", 1100, 74, 2],
      ["Шпилька Fairmont", 1250, 48, 1],
      ["Portier", 1500, 88, 2],
      ["Нувель шикана", 2050, 84, 2],
      ["Tabac", 2300, 168, 4],
      ["Бассейн (Piscine)", 2550, 140, 4],
      ["La Rascasse", 3000, 68, 2],
      ["Anthony Noghes", 3200, 78, 2]
    ]
  }
};

// Профиль круга строится из списка апексов: между апексами машина
// разгоняется, перед апексом тормозит (ограничения по разгону и торможению).
function makeTelemetry(t) {
  var res = [];
  var step = 10; // метров
  var acc = 9.0, dec = 32.0; // м/с2, торможение сильнее разгона
  var n = Math.floor(t.length / step);
  var v = [];
  for (var i = 0; i <= n; i++) v.push(t.vmax / 3.6);
  // ограничения скорости в апексах
  for (var a = 0; a < t.apex.length; a++) {
    var k = Math.round(t.apex[a][1] / step);
    v[k] = Math.min(v[k], t.apex[a][2] / 3.6);
  }
  // проход вперёд (разгон) - два круга чтобы старт совпал с финишем
  for (var pass = 0; pass < 2; pass++) {
    for (i = 1; i <= n; i++) {
      var prev = i === 0 ? v[n] : v[i - 1];
      var lim = Math.sqrt(prev * prev + 2 * acc * step * (1 - prev / (t.vmax / 3.6) * 0.6));
      if (v[i] > lim) v[i] = lim;
    }
    v[0] = Math.min(v[0], v[n]);
  }
  // проход назад (торможение)
  for (pass = 0; pass < 2; pass++) {
    for (i = n - 1; i >= 0; i--) {
      var lim2 = Math.sqrt(v[i + 1] * v[i + 1] + 2 * dec * step);
      if (v[i] > lim2) v[i] = lim2;
    }
  }
  for (i = 0; i <= n; i++) {
    var sp = v[i] * 3.6;
    var nxt = i < n ? v[i + 1] * 3.6 : sp;
    var thr = 0, brk = 0;
    if (nxt > sp + 0.05) thr = 100;
    else if (nxt < sp - 0.5) brk = Math.min(100, (sp - nxt) * 12);
    else thr = 60 + 40 * (sp / t.vmax);
    res.push({ d: i * step, speed: Math.round(sp), throttle: Math.round(thr), brake: Math.round(brk) });
  }
  return res;
}
