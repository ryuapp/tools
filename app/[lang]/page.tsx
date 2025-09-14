import type { Metadata } from "next";
import Link from "next/link";
import { resolveCanonicalUrl, resolveLinkPath } from "../../lib/link.ts";
import type { LangPageProps } from "../../lib/type.ts";
import { staticLangParams } from "../../lib/lang.ts";

const content = {
  en: {
    title: "Tools",
    tools: [
      { name: "UUID Generator", path: "uuid" },
    ],
  },
  ja: {
    title: "ツールズ",
    tools: [
      { name: "UUIDジェネレーター", path: "uuid" },
    ],
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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <div className="flex flex-col gap-2">
          {t.tools.map((tool) => (
            <Link
              key={tool.path}
              href={resolveLinkPath(lang, tool.path)}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
