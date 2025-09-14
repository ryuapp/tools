import { staticLangParams } from "../../lib/lang.ts";
import { LangLayoutProps } from "../../lib/type.ts";
import "../globals.css";
import { Sidebar } from "../components/sidebar.tsx";

export function generateStaticParams() {
  return staticLangParams;
}

export default async function RootLayout({
  children,
  params,
}: LangLayoutProps) {
  const lang = (await params).lang;

  return (
    <html lang={lang}>
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar lang={lang} />
          <main className="flex-1 p-4 md:ml-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
