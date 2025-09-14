import { staticLangParams } from "../../lib/lang.ts";
import { LangLayoutProps } from "../../lib/type.ts";
import "../globals.css";

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
        {children}
      </body>
    </html>
  );
}
