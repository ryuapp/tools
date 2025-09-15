"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

type Props = {
  labels: {
    light: string;
    dark: string;
  };
};

export function ThemeToggle({ labels }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md">
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-16 animate-pulse">
        </div>
        <div className="h-4 w-4 bg-stone-200 dark:bg-stone-700 rounded animate-pulse">
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-between w-full px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-all duration-300 opacity-0 animate-[fadeIn_300ms_ease-in_forwards]"
      aria-label="Toggle theme"
      style={{ animation: "fadeIn 300ms ease-in forwards" }}
    >
      <span>{theme === "light" ? labels.light : labels.dark}</span>
      {theme === "light"
        ? <SunIcon className="h-4 w-4" />
        : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
