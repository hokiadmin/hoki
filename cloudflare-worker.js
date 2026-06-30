export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return Response.json(
        { ok: false, error: 'Method not allowed' },
        { status: 405, headers: corsHeaders }
      );
    }

    try {
      const body = await request.json();
      const pin = String(body.pin || '');
      const adminPin = String(env.ADMIN_PIN || '');

      return Response.json(
        { ok: adminPin !== '' && pin === adminPin },
        { headers: corsHeaders }
      );
    } catch (error) {
      return Response.json(
        { ok: false, error: 'Invalid request' },
        { status: 400, headers: corsHeaders }
      );
    }
  }
};
