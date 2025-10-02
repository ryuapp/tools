import type { Metadata } from "next";
import Base64ConverterClient from "./base64-converter-client.tsx";
import { staticLangParams } from "../../../lib/lang.ts";
import { LangPageProps } from "../../../lib/type.ts";
import { resolveCanonicalUrl } from "../../../lib/link.ts";

const content = {
  en: {
    title: "Base64 Encoder/Decoder",
    description: "Convert text to Base64 string, convert Base64 string to text",
    encode: "Encode",
    decode: "Decode",
    leftPlaceholder: "Enter text to encode",
    rightPlaceholder: "Enter Base64 string to decode",
    copy: "Copy",
    copied: "Copied!",
  },
  ja: {
    title: "Base64エンコード/デコード",
    description: "テキストをBase64文字列へ変換、Base64文字列をテキストに変換",
    encode: "エンコード",
    decode: "デコード",
    leftPlaceholder: "エンコードするテキストを入力",
    rightPlaceholder: "デコードするBase64文字列を入力",
    copy: "コピー",
    copied: "コピーしました！",
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
      canonical: resolveCanonicalUrl(lang, "base64"),
    },
  };
}

export default async function Base64Page({ params }: LangPageProps) {
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
        <Base64ConverterClient translations={t} />
      </div>
    </div>
  );
}
