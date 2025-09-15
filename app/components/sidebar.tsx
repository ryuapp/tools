import Link from "next/link";
import { resolveLinkPath } from "../../lib/link.ts";
import { ThemeToggle } from "./theme-toggle.tsx";

type Props = {
  lang: string;
};

const sidebarContent = {
  en: {
    title: "Tools",
    tools: [
      { name: "UUID Generator", path: "uuid" },
    ],
    theme: {
      light: "Light mode",
      dark: "Dark mode",
    },
  },
  ja: {
    title: "ツールズ",
    tools: [
      { name: "UUIDジェネレーター", path: "uuid" },
    ],
    theme: {
      light: "ライトモード",
      dark: "ダークモード",
    },
  },
};

export function Sidebar({ lang }: Props) {
  const t = sidebarContent[lang as keyof typeof sidebarContent];

  return (
    <aside className="w-64 md:w-64 lg:w-64 bg-stone-50 dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 h-screen overflow-y-auto fixed md:static top-0 left-0 z-40 transform -translate-x-full md:translate-x-0 transition-transform">
      <div className="p-4">
        <Link href={`/${lang}`} className="block">
          <h1 className="text-lg font-bold text-stone-900 dark:text-white mb-4">
            {t.title}
          </h1>
        </Link>

        <nav>
          <ul className="space-y-2">
            {t.tools.map((tool) => (
              <li key={tool.path}>
                <Link
                  href={resolveLinkPath(lang, tool.path)}
                  className="block px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-700">
          <ThemeToggle labels={t.theme} />
        </div>
      </div>
    </aside>
  );
}
