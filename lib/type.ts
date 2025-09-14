import { ReactNode } from "react";

export type LangLayoutProps = {
  children: ReactNode;
  params: Promise<LangParams>;
};

export type LangPageProps = {
  params: Promise<LangParams>;
};

export type LangParams = { lang: "en" } | { lang: "ja" };
