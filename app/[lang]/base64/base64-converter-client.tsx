"use client";

import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
} from "@radix-ui/react-icons";

type Props = {
  translations: {
    encode: string;
    decode: string;
    leftPlaceholder: string;
    rightPlaceholder: string;
    copy: string;
    copied: string;
  };
};

export default function Base64ConverterClient({ translations }: Props) {
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");
  const [copiedLeft, setCopiedLeft] = useState(false);
  const [copiedRight, setCopiedRight] = useState(false);

  const handleEncode = () => {
    try {
      const encoded = btoa(leftValue);
      setRightValue(encoded);
    } catch (_error) {
      setRightValue("Error: Invalid input");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(rightValue);
      setLeftValue(decoded);
    } catch (_error) {
      setLeftValue("Error: Invalid input");
    }
  };

  const handleCopyLeft = async () => {
    try {
      await navigator.clipboard.writeText(leftValue);
      setCopiedLeft(true);
      setTimeout(() => setCopiedLeft(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyRight = async () => {
    try {
      await navigator.clipboard.writeText(rightValue);
      setCopiedRight(true);
      setTimeout(() => setCopiedRight(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex-1">
        <div className="relative">
          <textarea
            id="left"
            value={leftValue}
            onChange={(e) => setLeftValue(e.target.value)}
            placeholder={translations.leftPlaceholder}
            className="min-h-64 w-full rounded-md border border-stone-300 bg-white p-3 font-mono text-sm text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          />
          {leftValue && (
            <button
              type="button"
              onClick={handleCopyLeft}
              className="absolute top-2 right-2 rounded border border-stone-300 bg-white p-2 text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
              aria-label={copiedLeft ? translations.copied : translations.copy}
            >
              {copiedLeft
                ? <CheckIcon className="h-4 w-4" />
                : <CopyIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-2 md:flex-col">
        <button
          type="button"
          onClick={handleEncode}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {translations.encode}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleDecode}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {translations.decode}
        </button>
      </div>

      <div className="flex-1">
        <div className="relative">
          <textarea
            id="right"
            value={rightValue}
            onChange={(e) => setRightValue(e.target.value)}
            placeholder={translations.rightPlaceholder}
            className="min-h-64 w-full rounded-md border border-stone-300 bg-white p-3 font-mono text-sm text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          />
          {rightValue && (
            <button
              type="button"
              onClick={handleCopyRight}
              className="absolute top-2 right-2 rounded border border-stone-300 bg-white p-2 text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
              aria-label={copiedRight ? translations.copied : translations.copy}
            >
              {copiedRight
                ? <CheckIcon className="h-4 w-4" />
                : <CopyIcon className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
