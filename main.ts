export default {
  fetch(request, env) {
    const pathname = new URL(request.url).pathname;

    // Rewrite paths without locale to /en
    if (
      !pathname.startsWith("/en") && !pathname.startsWith("/ja") &&
      !pathname.startsWith("/_next") && !pathname.startsWith("/favicon")
    ) {
      const newUrl = new URL(`/en${pathname}`, request.url);
      return env.ASSETS.fetch(new Request(newUrl.toString(), request));
    }

    // All other paths are handled by the static assets
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<CloudflareEnv>;
