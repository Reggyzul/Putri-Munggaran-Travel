const SUPABASE_BASE_URL = 'https://jidystlcsojdjfzajudh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__GnSHtZVSUCi1S07DsJ6CA_dQMrslOF';

export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const source = url.searchParams.get('source') || 'Cloudflare-Pages-KeepAlive';
  const nowIso = new Date().toISOString();

  try {
    const authPing = await fetch(`${SUPABASE_BASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_ANON_KEY }
    });

    await fetch(`${SUPABASE_BASE_URL}/rest/v1/site_content?on_conflict=id`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({
        id: 'keep_alive_heartbeat',
        data: {
          pinged_at: nowIso,
          source,
          status: 'ACTIVE'
        },
        updated_at: nowIso
      })
    });

    return new Response(
      JSON.stringify({
        ok: true,
        status: 'ACTIVE',
        lastPingAt: nowIso,
        nextPingAt: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
        lastSource: source,
        authHttpStatus: authPing.status,
        message: 'Supabase Keep-Alive berhasil dari Cloudflare Edge!'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: 'WARNING',
        lastPingAt: nowIso,
        message: (err && err.message) || 'Keep-alive error'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
