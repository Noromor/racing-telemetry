// уведомление о статистике посещений: показывается, пока не нажата кнопка "Понятно"
(function () {
  var KEY = 'apexlog-notice', box = document.getElementById('notice');
  if (!box) return;
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) {}
  var b = document.body;
  // отступ снизу на высоту плашки, чтобы подвал не оставался под ней
  function pad() { b.style.paddingBottom = box.offsetHeight + 'px'; }
  box.hidden = false;
  pad();
  addEventListener('resize', pad);
  box.querySelector('button').addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    box.hidden = true;
    b.style.paddingBottom = '';
    removeEventListener('resize', pad);
  });
})();
