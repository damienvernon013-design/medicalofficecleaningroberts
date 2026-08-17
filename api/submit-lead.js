const CRM_ENDPOINT = 'https://thequotemasters.com/crm_api/api.php?action=push_lead';
const INDUSTRY_ID = 23;

function splitName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/);
  const first = parts.shift() || '';
  const last = parts.join(' ') || first;
  return { first, last };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://medicalofficecleaningroberts.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const token = process.env.CRM_API_TOKEN;
  if (!token) {
    res.status(500).json({ ok: false, error: 'Server misconfiguration' });
    return;
  }

  const body = req.body || {};
  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const email = String(body.email || '').trim();
  const facility = String(body.facility || '').trim();
  const service = String(body.service || '').trim();
  const notes = String(body.notes || '').trim();
  const utmSource = String(body.utm_source || '').slice(0, 255);

  if (!name || !phone || !email) {
    res.status(400).json({ ok: false, error: 'Name, phone, and email are required' });
    return;
  }

  const { first, last } = splitName(name);

  const payload = {
    customer: {
      company_name: facility,
      first_name: first,
      last_name: last,
      phone: phone.replace(/[^\d+]/g, ''),
      email,
      email2: '',
      address: '',
      service_address: '',
      notes: [service ? `Service requested: ${service}` : '', notes].filter(Boolean).join(' | ')
    },
    industry: INDUSTRY_ID,
    questions: [],
    appointments: [],
    number_of_quotes: '1',
    utm_source: utmSource
  };

  try {
    const crmResponse = await fetch(CRM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const text = await crmResponse.text();

    if (!crmResponse.ok) {
      res.status(502).json({ ok: false, error: 'CRM submission failed' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ ok: false, error: 'CRM submission failed' });
  }
};
