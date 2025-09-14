import type { Metadata } from "next";
import UUIDGeneratorClient from "./uuid-generator-client.tsx";
import { staticLangParams } from "../../../lib/lang.ts";
import { LangPageProps } from "../../../lib/type.ts";
import { resolveCanonicalUrl } from "../../../lib/link.ts";

const content = {
  en: {
    title: "UUID Generator",
    description: "UUID generator powered by ryu",
    generateButton: "Generate UUID",
    copyButton: "Copy",
    copied: "Copied!",
    quantity: "Quantity:",
  },
  ja: {
    title: "UUIDジェネレーター",
    description: "UUIDジェネレーター powered by ryu",
    generateButton: "UUID 生成",
    copyButton: "コピー",
    copied: "コピーしました！",
    quantity: "個数:",
  },
};

export function generateStaticParams() {
  return staticLangParams;
}

export async function generateMetadata(
  { params }: LangPageProps,
): Promise<Metadata> {
  const { lang } = await params;
  const t = content[lang];

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: resolveCanonicalUrl(lang, "uuid"),
    },
  };
}

export default async function UUIDGenerator({ params }: LangPageProps) {
  const { lang } = await params;
  const t = content[lang];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
        <UUIDGeneratorClient translations={t} />
      </div>
    </div>
  );
}
