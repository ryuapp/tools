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
      { name: "UUID生成", path: "uuid" },
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
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-64 flex-col -translate-x-full transform overflow-y-auto border-r border-stone-200 bg-stone-50 transition-transform md:static md:w-64 md:translate-x-0 lg:w-64 dark:border-stone-700 dark:bg-stone-900">
      <div className="flex-1 p-4">
        <Link href={`/${lang}`} className="block">
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
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4">
        <ThemeToggle labels={t.theme} />
      </div>

      <div className="border-stone-200 border-t p-4 dark:border-stone-700">
        <p className="text-right text-stone-500 text-xs dark:text-stone-400">
          © 2025{" "}
          <a
            href="https://ryu.app"
            className="transition-colors hover:text-stone-700 dark:hover:text-stone-300"
          >
            Ryu
          </a>
        </p>
      </div>
    </aside>
  );
}
