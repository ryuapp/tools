/**
 * Resolves link paths for i18n routing
 */
export function resolveLinkPath(lang: string, path: string): string {
  return `/${lang}/${path}`;
}

/**
 * Resolves canonical URLs for SEO
 */
export function resolveCanonicalUrl(lang: string, path: string = ""): string {
  const baseUrl = "https://tools.ryu.app";
  return `${baseUrl}/${lang}${path ? `/${path}` : ""}`;
}
