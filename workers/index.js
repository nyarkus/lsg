export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.searchParams.get("path");

    if (!path) return new Response("Missing path", { status: 400 });

    const key = `views:${path}`;

    if (request.method === "POST") {
      await env.ARTICLE_VIEWS.put(key, ((parseInt(await env.ARTICLE_VIEWS.get(key) || "0")) + 1).toString());
      return new Response("ok");
    }

    if (request.method === "GET") {
      const count = await env.ARTICLE_VIEWS.get(key);
      return new Response(count || "0");
    }

    return new Response("Method Not Allowed", { status: 405 });
  },
};
