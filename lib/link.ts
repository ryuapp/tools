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
 * Resolves canonical paths for SEO
 * English pages use root path (/), Japanese pages use /ja
 */
export function resolveCanonicalPath(lang: string, path: string = ""): string {
  if (lang === "ja") {
    return `/ja${path ? `/${path}` : ""}`;
  }

  // English uses root path
  return `${path ? `/${path}` : "/"}`;
}
