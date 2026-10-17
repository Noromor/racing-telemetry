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
    sectors: [7000, 14000], dwell: 0.8,
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
    sectors: [1250, 2300], dwell: 0.6, // повороты короткие: малый радиус, дуги короче
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

// Классы машин. Скорости в апексах из таблиц выше - ориентир для Формулы 1;
// для остальных классов они пересчитываются через коэффициент сцепления, зависящий от скорости
// поворота (в медленных шпильках решает механическое сцепление шин и разница меньше,
// в быстрых - прижимная сила, и разница больше).
//  top  - макс. скорость относительно F1 на той же трассе (низкое/высокое антикрыло, мощность)
//  pw   - удельная мощность, Вт/кг (с пилотом и топливом)
//  trac - предел ускорения по сцеплению на выходе из медленного поворота, м/с2
//  brk  - торможение: [mu, k] -> замедление g*(mu + k*v^2), v в м/с (аэродинамика помогает тормозить)
//  grip - [скорость апекса F1, км/ч, отношение скорости класса к F1]
var CLASSES = {
  f1:       { name: "F1",       full: "Формула 1 (2026)",                 color: "#ff3b4e", mass: 800,  power: 750, gears: 8, top: 1.000, trac: 13.0, brk: [1.9, 4.6e-4],
              grip: [[50, 1.00], [300, 1.00]] },
  hypercar: { name: "Hypercar", full: "Hypercar (LMH/LMDh, WEC)",        color: "#ffd23f", mass: 1060, power: 520, gears: 7, top: 0.920, trac: 9.5,  brk: [1.5, 1.9e-4],
              grip: [[50, 0.93], [100, 0.83], [180, 0.77], [260, 0.81], [320, 0.90]] },
  lmp2:     { name: "LMP2",     full: "LMP2 (Oreca 07 Gibson)",          color: "#4fc3f7", mass: 990,  power: 445, gears: 6, top: 0.910, trac: 9.5,  brk: [1.5, 1.8e-4],
              grip: [[50, 0.92], [100, 0.83], [180, 0.76], [260, 0.80], [320, 0.89]] },
  lmp3:     { name: "LMP3",     full: "LMP3 (Ligier JS P325, Duqueine D09)", color: "#7ee08a", mass: 1010, power: 345, gears: 6, top: 0.820, trac: 8.5, brk: [1.4, 1.0e-4],
              grip: [[50, 0.89], [100, 0.78], [180, 0.70], [260, 0.74], [320, 0.81]] },
  gt3:      { name: "GT3",      full: "GT3 / LMGT3",                     color: "#c9a7ff", mass: 1380, power: 410, gears: 6, top: 0.810, trac: 8.0,  brk: [1.3, 0.6e-4],
              grip: [[50, 0.87], [100, 0.74], [180, 0.65], [260, 0.69], [320, 0.77]] }
};
var CLASS_ORDER = ["f1", "hypercar", "lmp2", "lmp3", "gt3"];

function gripRatio(c, v) {
  var g = c.grip;
  if (v <= g[0][0]) return g[0][1];
  for (var i = 1; i < g.length; i++)
    if (v <= g[i][0]) return g[i - 1][1] + (g[i][1] - g[i - 1][1]) * (v - g[i - 1][0]) / (g[i][0] - g[i - 1][0]);
  return g[g.length - 1][1];
}
// скорости в апексах для класса: [название, дистанция, скорость, передача]
function classApex(t, cls) {
  var c = CLASSES[cls || "f1"], vtop = t.vmax * c.top, out = [];
  for (var a = 0; a < t.apex.length; a++) {
    var ap = t.apex[a], sp, gear;
    if (cls === "f1" || !cls) { sp = ap[2]; gear = ap[3]; }
    else {
      sp = Math.min(Math.round(ap[2] * gripRatio(c, ap[2])), Math.round(vtop - 3));
      gear = Math.max(1, Math.min(c.gears, Math.round(c.gears * Math.pow(sp / vtop, 0.9) + 0.2)));
    }
    out.push([ap[0], ap[1], sp, gear]);
  }
  return out;
}

// Профиль круга строится из списка апексов: между апексами машина разгоняется
// (предел - сцепление или мощность минус сопротивление воздуха), перед апексом тормозит.
var DWELL = [16, 0.0017, 0.10]; // полудлина дуги, м = (16 + 0.0017 * V^2) * t.dwell (V апекса, км/ч); рост скорости к краям дуги
function makeTelemetry(t, cls) {
  cls = cls || "f1";
  var c = CLASSES[cls], res = [];
  var step = 10; // метров
  var vtop = t.vmax * c.top / 3.6, pm = c.power * 1000 / c.mass, g = 9.81;
  var apex = classApex(t, cls);
  var n = Math.floor(t.length / step);
  var v = [];
  for (var i = 0; i <= n; i++) v.push(vtop);
  // поворот - не точка: вокруг апекса участок дуги, где скорость близка к минимальной
  for (var a = 0; a < apex.length; a++) {
    var k = Math.round(apex[a][1] / step), va = apex[a][2] / 3.6;
    var hl = Math.round((DWELL[0] + DWELL[1] * apex[a][2] * apex[a][2]) * (t.dwell || 1) / step);
    for (var j = -hl; j <= hl; j++) {
      var q = (k + j + n) % n, x = hl ? j / hl : 0;
      v[q] = Math.min(v[q], va * (1 + DWELL[2] * x * x));
    }
  }
  function accel(u) { // м/с2 при скорости u
    u = Math.max(u, 5);
    return Math.min(c.trac, pm / u) - pm / vtop * (u / vtop) * (u / vtop);
  }
  // проход вперёд (разгон) - два круга, чтобы старт совпал с финишем
  for (var pass = 0; pass < 2; pass++) {
    for (i = 1; i <= n; i++) {
      var prev = v[i - 1];
      var lim = Math.sqrt(Math.max(0, prev * prev + 2 * accel(prev) * step));
      if (v[i] > lim) v[i] = lim;
    }
    v[0] = Math.min(v[0], v[n]);
  }
  // проход назад (торможение)
  for (pass = 0; pass < 2; pass++) {
    for (i = n - 1; i >= 0; i--) {
      var u = v[i + 1], dec = g * (c.brk[0] + c.brk[1] * u * u);
      var lim2 = Math.sqrt(u * u + 2 * dec * step);
      if (v[i] > lim2) v[i] = lim2;
    }
    v[n] = Math.min(v[n], v[0]);
  }
  for (i = 0; i <= n; i++) {
    var sp = v[i] * 3.6;
    var nxt = i < n ? v[i + 1] * 3.6 : sp;
    var thr = 0, brk = 0;
    if (nxt > sp + 0.05) thr = 100;
    else if (nxt < sp - 0.5) brk = Math.min(100, (sp - nxt) / (g * (c.brk[0] + c.brk[1] * v[i] * v[i]) * step / v[i] * 3.6) * 100);
    else thr = sp >= vtop * 3.6 - 1 ? 100 : 60 + 40 * (sp / (vtop * 3.6));
    res.push({ d: i * step, speed: Math.round(sp), throttle: Math.round(thr), brake: Math.round(brk) });
  }
  return res;
}
// время круга по профилю, с
function lapTime(tel) {
  var T = 0;
  for (var i = 1; i < tel.length; i++) T += 10 / ((tel[i].speed + tel[i - 1].speed) / 2 / 3.6);
  return T;
}
function fmtLap(s, dec) {
  var m = Math.floor(s / 60), r = s - m * 60;
  return m + ":" + (r < 10 ? "0" : "") + r.toFixed(dec === undefined ? 1 : dec);
}

// Реальные ориентиры: лучшие круги квалификаций по классам на трассах сайта (сухая трасса).
// [время, с; кто и где; ссылка на источник]
var REF_LAPS = {
  monza: {
    f1:       [81.786,  "П. Гасли, Alpine, квалификация Гран-при Италии 2026", "https://www.formula1.com/en/results/2026/races/1293/italy/qualifying"],
    hypercar: [95.358,  "К. Кобаяси, Toyota GR010, WEC 6 ч Монцы 2023", "https://www.fiawec.com/en/news/toyota-just-shade-ferrari-for-monza-pole/7740"],
    lmp2:     [98.032,  "М. Беш, Oreca 07, ELMS 4 ч Монцы 2022", "https://sportscar365.com/lemans/elms/beche-charges-to-monza-pole-for-tds-racing-x-vaillante"],
    lmp3:     [103.627, "М. Якобсен, Ligier JS P320, ELMS 4 ч Монцы 2022", "https://sportscar365.com/lemans/elms/beche-charges-to-monza-pole-for-tds-racing-x-vaillante"],
    gt3:      [105.000, "Ж. Гунон, Mercedes-AMG GT3, GT World Challenge Монца 2025", "https://www.gt-world-challenge-europe.com/news/3007/qualifying-getspeed-leads-mercedes-amg-one-two-at-monza"]
  },
  spa: {
    f1:       [104.361, "К. Антонелли, Mercedes, квалификация Гран-при Бельгии 2026", "https://www.formula1.com/en/results/2026/awards/pole-positions"],
    hypercar: [120.653, "М. Якобсен, Peugeot 9X8, WEC 6 ч Спа 2026", "https://en.wikipedia.org/wiki/2026_6_Hours_of_Spa-Francorchamps"],
    lmp2:     [121.253, "Л. Делетраз, Oreca 07, ELMS 4 ч Спа 2024", "https://sportscar365.com/lemans/elms/deletraz-takes-4h-spa-pole-in-red-flagged-qualifying/"],
    lmp3:     [131.847, "Г. Жюльен, Ligier JS P320, ELMS 4 ч Спа 2024", "https://sportscar365.com/lemans/elms/deletraz-takes-4h-spa-pole-in-red-flagged-qualifying/"],
    gt3:      [136.612, "А. Давид, Lexus RC F LMGT3, WEC 6 ч Спа 2026", "https://en.wikipedia.org/wiki/2026_6_Hours_of_Spa-Francorchamps"]
  },
  silverstone: {
    f1:       [88.111,  "К. Антонелли, Mercedes, квалификация Гран-при Великобритании 2026", "https://www.formula1.com/en/results/2026/awards/pole-positions"],
    lmp2:     [102.343, "Э. Массон, Oreca 07, ELMS 4 ч Сильверстоуна 2025", "https://www.dailysportscar.com/2025/09/13/masson-powers-vds-panis-racing-to-silverstone-pole.html"],
    lmp3:     [113.038, "Г. Пиблс, Duqueine D09, ELMS 4 ч Сильверстоуна 2025", "https://www.dailysportscar.com/2025/09/13/masson-powers-vds-panis-racing-to-silverstone-pole.html"],
    gt3:      [116.569, "М. Кирххёфер, McLaren 720S GT3 Evo, British GT Silverstone 500 2025", "https://www.dailysportscar.com/2025/04/26/optimum-mclaren-takes-silverstone-500-pole.html"]
  },
  suzuka: {
    f1:       [88.778,  "К. Антонелли, Mercedes, квалификация Гран-при Японии 2026", "https://www.formula1.com/en/results/2026/awards/pole-positions"],
    gt3:      [120.455, "А. Фарфус, BMW M6 GT3, Suzuka 10 Hours 2019", "https://sportscar365.com/sro/igtc/farfus-takes-suzuka-10h-pole"]
  },
  monaco: {
    f1:       [72.051,  "К. Антонелли, Mercedes, квалификация Гран-при Монако 2026", "https://www.formula1.com/en/results/2026/awards/pole-positions"]
  },
  nurburgring: {}
};
