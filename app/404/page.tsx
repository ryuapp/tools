import "../globals.css";
import { ThemeProvider } from "../../components/theme-provider.tsx";

export default function NotFoundPage() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>404 - Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-white text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100">
        <ThemeProvider>
          <div className="flex min-h-screen items-center justify-center p-4 font-sans">
            <main className="flex flex-col items-center text-center">
              <h1 className="font-bold text-6xl text-stone-900 dark:text-stone-100">
                404
              </h1>
              <h2 className="mt-4 font-semibold text-2xl text-stone-700 dark:text-stone-300">
                Page Not Found
              </h2>
              <p className="mt-2 text-stone-600 dark:text-stone-400">
                The page you are looking for does not exist.
              </p>
              <a
                href="/"
                className="mt-6 rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Go Home
              </a>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
