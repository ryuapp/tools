"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobeIcon } from "@radix-ui/react-icons";

type Props = {
  currentLang: string;
};

export function LanguageSwitcher({ currentLang }: Props) {
  const pathname = usePathname();

  // Remove the current language prefix and get the rest of the path
  const pathWithoutLang = pathname.replace(/^\/(en|ja)/, "") || "/";

  const targetLang = currentLang === "en" ? "ja" : "en";
  const targetPath = `/${targetLang}${pathWithoutLang}`;
  const displayText = currentLang === "en" ? "English" : "日本語";

  return (
    <Link
      href={targetPath}
      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
    >
      <span>{displayText}</span>
      <GlobeIcon className="h-4 w-4" />
    </Link>
  );
}
