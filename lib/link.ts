import process from "node:process";

/**
 * Resolves link paths for i18n routing
 */
export function resolveLinkPath(lang: string, path: string): string {
  if (lang === "en") {
    if (process.env.NODE_ENV === "development") {
      return `/en/${path}`;
    }
    return `/${path}`;
  }

  return `/${lang}/${path}`;
}

/**
 * Resolves canonical URLs for SEO
 * English pages use root path (/), Japanese pages use /ja
 */
export function resolveCanonicalUrl(lang: string, path: string = ""): string {
  const baseUrl = "https://tools.ryu.app";

  if (lang === "en") {
    return `${baseUrl}${path ? `/${path}` : ""}`;
  }

  return `${baseUrl}/${lang}${path ? `/${path}` : ""}`;
}
