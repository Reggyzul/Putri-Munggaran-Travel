const SUPABASE_BASE_URL = 'https://jidystlcsojdjfzajudh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__GnSHtZVSUCi1S07DsJ6CA_dQMrslOF';

export const onRequestGet = async () => {
  const nowIso = new Date().toISOString();
  const nextIso = new Date(Date.now() + 6 * 3600 * 1000).toISOString();

  try {
    await fetch(`${SUPABASE_BASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_ANON_KEY }
    });

    await fetch(`${SUPABASE_BASE_URL}/rest/v1/site_content`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        id: 'keep_alive_heartbeat',
        data: {
          pinged_at: nowIso,
          source: 'Cloudflare-Pages-KeepAlive',
          status: 'ACTIVE'
        },
        updated_at: nowIso
      })
    });
  } catch {
    // ignore
  }

  return new Response(
    JSON.stringify({
      ok: true,
      status: 'ACTIVE',
      lastPingAt: nowIso,
      nextPingAt: nextIso,
      totalPings: 1,
      lastSource: 'Cloudflare Edge Function',
      message: 'Supabase aktif & terjaga 24/7 melalui Cloudflare Edge.'
    }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
