export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, payment_id } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[confirm-payment] Missing env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          is_paid: true,
          paid_at: new Date().toISOString(),
          payment_id: payment_id || null
        })
      }
    );

    const responseText = await response.text();
    console.log('[confirm-payment] Supabase status:', response.status);
    console.log('[confirm-payment] Supabase body:', responseText);

    if (!response.ok) {
      console.error('[confirm-payment] Supabase PATCH failed:', response.status, responseText);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    let rows = [];
    try { rows = JSON.parse(responseText); } catch (e) { /* ignore */ }
    if (Array.isArray(rows) && rows.length === 0) {
      console.warn('[confirm-payment] 0 rows updated — email not found:', email);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[confirm-payment] fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
