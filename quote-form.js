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

  function getStoredUtm() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function buildUtmSource() {
    var utm = getStoredUtm();
    if (utm.utm_source) return utm.utm_source;
    if (document.referrer) {
      try {
        return new URL(document.referrer).hostname;
      } catch (e) {}
    }
    return 'direct';
  }

  function setFormState(form, state, message) {
    var submitBtn = form.querySelector('.quote-form-submit');
    var msgEl = form.querySelector('.quote-form-message');
    if (!msgEl) {
      msgEl = document.createElement('p');
      msgEl.className = 'quote-form-message';
      form.appendChild(msgEl);
    }
    if (state === 'sending') {
      if (submitBtn) submitBtn.disabled = true;
      msgEl.textContent = 'Sending your request...';
      msgEl.className = 'quote-form-message quote-form-message-pending';
    } else if (state === 'success') {
      if (submitBtn) submitBtn.disabled = false;
      msgEl.textContent = message || 'Thanks — we received your request and will respond next business day.';
      msgEl.className = 'quote-form-message quote-form-message-success';
    } else if (state === 'error') {
      if (submitBtn) submitBtn.disabled = false;
      msgEl.textContent = message || 'Something went wrong. Please call (866) 958-8773 or try again.';
      msgEl.className = 'quote-form-message quote-form-message-error';
    }
  }

  function handleSubmit(form) {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(form);
      var payload = {
        name: formData.get('name'),
        facility: formData.get('facility'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        notes: formData.get('notes'),
        utm_source: buildUtmSource()
      };

      setFormState(form, 'sending');

      fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok && data.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            setFormState(form, 'success');
            form.reset();
          } else {
            setFormState(form, 'error');
          }
        })
        .catch(function () {
          setFormState(form, 'error');
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    captureUtm();
    document.querySelectorAll('form.quote-form').forEach(handleSubmit);
  });
})();
