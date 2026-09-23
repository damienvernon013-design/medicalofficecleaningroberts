(function () {
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var STORAGE_KEY = 'qm_utm';

  function captureUtm() {
    var params = new URLSearchParams(window.location.search);
    var hasUtm = UTM_KEYS.some(function (k) { return params.has(k); });
    if (!hasUtm) return;
    var data = {};
    UTM_KEYS.forEach(function (k) {
      if (params.has(k)) data[k] = params.get(k);
    });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', captureUtm);
})();
