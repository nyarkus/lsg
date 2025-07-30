export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);
    const path = url.searchParams.get("path");
    if (!path) {
      return new Response("Missing path", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const key = `views:${path}`;

    let body, status;
    if (request.method === "POST") {
      const count = await env.ARTICLE_VIEWS.get(key);
      const current = parseInt(await env.ARTICLE_VIEWS.get(key) || "0", 10);
      await env.ARTICLE_VIEWS.put(key, (current + 1).toString());
      body = count || "0";
      status = 200;
    } else if (request.method === "GET") {
      const count = await env.ARTICLE_VIEWS.get(key);
      body = count || "0";
      status = 200;
    } else {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    return new Response(body, {
      status,
      headers: corsHeaders,
    });
  },
};
