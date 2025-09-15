import type { Metadata } from "next";
import UUIDGeneratorClient from "./uuid-generator-client.tsx";
import { staticLangParams } from "../../../lib/lang.ts";
import { LangPageProps } from "../../../lib/type.ts";
import { resolveCanonicalUrl } from "../../../lib/link.ts";

const content = {
  en: {
    title: "UUID Generator",
    description: "UUID generator supporting v1, v3, v4, v5, v6, v7",
    generateButton: "Generate UUID",
    copyButton: "Copy",
    copied: "Copied!",
    quantity: "Quantity:",
    version: "Version:",
    namespace: "Namespace (UUID):",
    name: "Name:",
    namespacePlaceholder: "e.g., 6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    namePlaceholder: "e.g., example.com",
    timestamp: "Date/Time (optional):",
    timestampPlaceholder: "Select date and time",
    errorV3V5: "Namespace and name are required for v3 and v5",
    errorGeneric: "Failed to generate UUID",
    uppercase: "Uppercase",
  },
  ja: {
    title: "UUID生成",
    description: "v1, v3, v4, v5, v6, v7対応のUUID生成ツール",
    generateButton: "UUID生成",
    copyButton: "コピー",
    copied: "コピーしました！",
    quantity: "個数:",
    version: "バージョン:",
    namespace: "ネームスペース (UUID):",
    name: "名前:",
    namespacePlaceholder: "例: 6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    namePlaceholder: "例: example.com",
    timestamp: "日時 (オプション):",
    timestampPlaceholder: "日時を選択",
    errorV3V5: "v3とv5にはネームスペースと名前が必要です",
    errorGeneric: "UUID生成に失敗しました",
    uppercase: "大文字",
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
    <div className="p-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 font-bold text-3xl text-stone-900 dark:text-stone-100">
          {t.title}
        </h1>
        <p className="mb-8 text-sm text-stone-600 dark:text-stone-400">
          {t.description}
        </p>
        <UUIDGeneratorClient translations={t} />
      </div>
    </div>
  );
}
