export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.searchParams.get("path");
    if (!path) {
      return new Response("Missing path parameter", { status: 400, headers: corsHeaders });
    }

    const key = `views:${path}`;

    if (request.method === "POST") {
      const current = parseInt(await env.ARTICLE_VIEWS.get(key) || "0", 10);
      const newCount = current + 1;
      await env.ARTICLE_VIEWS.put(key, newCount.toString());
      return new Response(newCount.toString(), { status: 200, headers: corsHeaders });
    }

    if (request.method === "GET") {
      const count = await env.ARTICLE_VIEWS.get(key) || "0";

      const badgeData = {
        schemaVersion: 1,
        label: "просмотров",
        message: count,
        color: "informational",
      };

      return new Response(JSON.stringify(badgeData), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  },
};