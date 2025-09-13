import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tools",
  description: "Tools powered by ryu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
