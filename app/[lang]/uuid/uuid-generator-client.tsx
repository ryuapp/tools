"use client";

import { useState } from "react";

type Props = {
  translations: {
    generateButton: string;
    copyButton: string;
    copied: string;
    quantity: string;
  };
};

export default function UUIDGeneratorClient({ translations }: Props) {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleGenerate = () => {
    const newUuids = Array.from(
      { length: quantity },
      () => crypto.randomUUID(),
    );
    setUuids(newUuids);
    setCopiedIndex(null);
  };

  const handleCopy = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <div className="mb-8 flex gap-4 space-y-4">
        <div className="my-auto flex items-center gap-4">
          <label
            htmlFor="quantity"
            className="font-medium text-sm text-stone-700 dark:text-stone-300"
          >
            {translations.quantity}
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(1, Math.min(100, parseInt(e.target.value) || 1)),
              )}
            className="w-20 rounded-md border border-stone-300 bg-white px-2 py-1 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {translations.generateButton}
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, index) => (
          <div
            key={index}
            className="flex max-w-xl items-center gap-2 rounded-md bg-stone-100 p-3 font-mono text-sm text-stone-900 dark:bg-stone-800 dark:text-stone-100"
          >
            <span className="flex-1 select-all">{uuid}</span>
            <button
              type="button"
              onClick={() => handleCopy(uuid, index)}
              className="rounded border border-stone-300 bg-white px-3 py-1 text-stone-700 text-xs transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
            >
              {copiedIndex === index
                ? translations.copied
                : translations.copyButton}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
