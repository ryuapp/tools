import type { Metadata } from "next";
import SvgConverterClient from "./svg-converter-client.tsx";
import { staticLangParams } from "../../../lib/lang.ts";
import { LangPageProps } from "../../../lib/type.ts";
import { resolveCanonicalUrl } from "../../../lib/link.ts";

const content = {
  en: {
    title: "SVG Converter",
    description: "Convert SVG to PNG, JPEG, WebP with custom dimensions",
    uploadButton: "Upload SVG",
    downloadButton: "Download Image",
    width: "Width:",
    height: "Height:",
    format: "Format:",
    backgroundColor: "Background:",
    transparent: "Transparent",
    loadSvgButton: "Load SVG",
    dropZoneText: "Drop SVG file here or click to upload",
    pasteTabLabel: "Paste SVG",
    uploadTabLabel: "Upload File",
    pastePlaceholder: "Paste SVG code here...",
    errorInvalidFile: "Please upload a valid SVG file",
    errorInvalidSvg: "Invalid SVG code",
    errorConversion: "Failed to convert SVG to image",
    preview: "Preview",
    settings: "Settings",
    webpWarning: "Safari not supported",
  },
  ja: {
    title: "SVG変換",
    description: "SVGをPNG, JPEG, WebPに変換（サイズ指定可能）",
    uploadButton: "SVGをアップロード",
    downloadButton: "画像をダウンロード",
    width: "幅:",
    height: "高さ:",
    format: "形式:",
    backgroundColor: "背景色:",
    transparent: "透明",
    loadSvgButton: "SVGを読み込み",
    dropZoneText: "SVGファイルをドロップまたはクリックしてアップロード",
    pasteTabLabel: "SVG貼り付け",
    uploadTabLabel: "ファイルアップロード",
    pastePlaceholder: "SVGコードを貼り付けてください...",
    errorInvalidFile: "有効なSVGファイルをアップロードしてください",
    errorInvalidSvg: "無効なSVGコードです",
    errorConversion: "SVGから画像への変換に失敗しました",
    preview: "プレビュー",
    settings: "設定",
    webpWarning: "Safari非対応",
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
      canonical: resolveCanonicalUrl(lang, "svg"),
    },
  };
}

export default async function SvgConverter({ params }: LangPageProps) {
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
        <SvgConverterClient translations={t} />
      </div>
    </div>
  );
}
