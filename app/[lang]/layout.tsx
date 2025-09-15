import { staticLangParams } from "../../lib/lang.ts";
import { LangLayoutProps } from "../../lib/type.ts";
import "../globals.css";
import { Sidebar } from "../components/sidebar.tsx";
import { ThemeProvider } from "../components/theme-provider.tsx";

export function generateStaticParams() {
  return staticLangParams;
}

export default async function RootLayout({
  children,
  params,
}: LangLayoutProps) {
  const lang = (await params).lang;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar lang={lang} />
            <main className="flex-1 p-4 md:ml-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
