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
      <div className="space-y-4 mb-8 flex gap-4">
        <div className="flex items-center gap-4 my-auto">
          <label htmlFor="quantity" className="text-sm font-medium">
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
            className="w-20 px-2 py-1 border rounded-md"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {translations.generateButton}
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-transparent rounded-md font-mono text-sm max-w-xl"
          >
            <span className="flex-1 select-all">{uuid}</span>
            <button
              type="button"
              onClick={() => handleCopy(uuid, index)}
              className="px-3 py-1 bg-white border border-gray-300 dark:bg-transparent rounded hover:bg-gray-50 dark:hover:bg-transparent transition-colors text-xs"
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
