"use client";

import Link from "next/link";
import { useState } from "react";
import { resolveLinkPath } from "../lib/link.ts";
import { ThemeToggle } from "./theme-toggle.tsx";
import { LanguageSwitcher } from "./language-switcher.tsx";
import { GearIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

type Props = {
  lang: string;
};

const sidebarContent = {
  en: {
    title: "Tools",
    tools: [
      { name: "UUID Generator", path: "uuid" },
      { name: "SVG Converter", path: "svg" },
    ],
    theme: {
      light: "Light mode",
      dark: "Dark mode",
    },
  },
  ja: {
    title: "ツールズ",
    tools: [
      { name: "UUID生成", path: "uuid" },
      { name: "SVG変換", path: "svg" },
    ],
    theme: {
      light: "ライトモード",
      dark: "ダークモード",
    },
  },
};

export function Sidebar({ lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const t = sidebarContent[lang as keyof typeof sidebarContent] ||
    sidebarContent.en;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed right-4 bottom-4 z-50 rounded-full bg-stone-100 p-3 text-stone-700 shadow-lg transition-all duration-300 md:hidden dark:bg-stone-800 dark:text-stone-300 ${
          isOpen
            ? "opacity-0 rotate-180 scale-0"
            : "opacity-100 rotate-0 scale-100"
        }`}
        aria-label="Settings"
      >
        <GearIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col transform overflow-y-auto border-r border-stone-200 bg-stone-50 transition-transform md:static md:w-64 md:translate-x-0 lg:w-64 dark:border-stone-700 dark:bg-stone-900 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 p-4">
          <Link
            href={`/${lang}`}
            className="block"
            onClick={() => setIsOpen(false)}
          >
            <h1 className="mb-4 font-bold text-lg text-stone-900 dark:text-white">
              {t.title}
            </h1>
          </Link>

          <nav>
            <ul className="space-y-2">
              {t.tools.map((tool) => (
                <li key={tool.path}>
                  <Link
                    href={resolveLinkPath(lang, tool.path)}
                    className="block rounded-md px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="space-y-2 p-4">
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle labels={t.theme} />
        </div>

        <div className="border-stone-200 border-t p-4 dark:border-stone-700">
          <div className="flex items-center justify-end gap-2">
            <a
              href="https://github.com/ryuapp/tools"
              className="text-stone-500 transition-colors hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300"
              aria-label="GitHub Repository"
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </a>
            <p className="text-stone-500 text-xs dark:text-stone-400">
              © 2025{" "}
              <a
                href="https://ryu.app"
                className="transition-colors hover:text-stone-700 dark:hover:text-stone-300"
              >
                Ryu
              </a>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
