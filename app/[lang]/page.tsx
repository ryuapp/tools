import type { Metadata } from "next";
import { resolveCanonicalUrl } from "../../lib/link.ts";
import type { LangPageProps } from "../../lib/type.ts";
import { staticLangParams } from "../../lib/lang.ts";

const content = {
  en: {
    title: "Tools",
  },
  ja: {
    title: "ツールズ",
  },
};

export function generateStaticParams() {
  return staticLangParams;
}

export async function generateMetadata(
  { params }: LangPageProps,
): Promise<Metadata> {
  const lang = (await params).lang;
  const title = lang === "ja" ? "ツールズ" : "Tools";
  const description = "Tools powered by ryu";

  return {
    title,
    description,
    alternates: {
      canonical: resolveCanonicalUrl(lang),
    },
  };
}

export default async function Home({ params }: LangPageProps) {
  const { lang } = await params;
  const t = content[lang];

  return (
    <div className="font-sans flex items-center justify-center h-full p-4">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100">
          {t.title}
        </h1>
      </main>
    </div>
  );
}
