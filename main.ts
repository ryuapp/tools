function parseAcceptLanguage(acceptLanguage: string): string {
  if (!acceptLanguage) return "en";

  // Parse Accept-Language header: e.g., "ja;q=0.9,en;q=0.8,en-US;q=0.7"
  const languages = acceptLanguage.split(",").map((lang) => {
    const [code, qValue] = lang.trim().split(";");
    const quality = qValue ? parseFloat(qValue.replace("q=", "")) : 1.0;
    return { code: code.toLowerCase(), quality };
  });

  // Sort by quality (higher is better)
  languages.sort((a, b) => b.quality - a.quality);

  for (const lang of languages) {
    if (lang.code === "ja" || lang.code.startsWith("ja-")) {
      return "ja";
    }
    if (lang.code === "en" || lang.code.startsWith("en-")) {
      return "en";
    }
  }

  return "en";
}

export default {
  fetch(request, env) {
    const pathname = new URL(request.url).pathname;

    // Handle root path - redirect based on Accept-Language
    if (pathname === "/") {
      const acceptLanguage = request.headers.get("Accept-Language") || "";
      const lang = parseAcceptLanguage(acceptLanguage);
      return Response.redirect(new URL(`/${lang}`, request.url).toString());
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<CloudflareEnv>;
