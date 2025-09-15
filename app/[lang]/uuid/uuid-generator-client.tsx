"use client";

import { useState } from "react";
import { v1, v3, v4, v5, v6, v7 } from "uuid";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

type Props = {
  translations: {
    generateButton: string;
    copyButton: string;
    copied: string;
    quantity: string;
    version: string;
    namespace: string;
    name: string;
    namespacePlaceholder: string;
    namePlaceholder: string;
    timestamp: string;
    timestampPlaceholder: string;
    errorV3V5: string;
    errorGeneric: string;
    uppercase: string;
  };
};

type UUIDVersion = "v1" | "v3" | "v4" | "v5" | "v6" | "v7";

export default function UUIDGeneratorClient({ translations }: Props) {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [version, setVersion] = useState<UUIDVersion>("v4");
  const [namespace, setNamespace] = useState("");
  const [name, setName] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [uppercase, setUppercase] = useState(false);

  const handleGenerate = () => {
    try {
      const count = (version === "v3" || version === "v5" || version === "v6" ||
          version === "v7")
        ? 1
        : quantity;
      const newUuids = Array.from({ length: count }, () => {
        switch (version) {
          case "v1":
            return v1();
          case "v3":
            if (!namespace || !name) {
              throw new Error(translations.errorV3V5);
            }
            return v3(name, namespace);
          case "v4":
            return v4();
          case "v5":
            if (!namespace || !name) {
              throw new Error(translations.errorV3V5);
            }
            return v5(name, namespace);
          case "v6":
            if (timestamp) {
              const date = new Date(timestamp);
              return v6({ msecs: date.getTime() });
            }
            return v6();
          case "v7":
            if (timestamp) {
              const date = new Date(timestamp);
              return v7({ msecs: date.getTime() });
            }
            return v7();
          default:
            return v4();
        }
      });
      const formattedUuids = uppercase
        ? newUuids.map((uuid) => uuid.toUpperCase())
        : newUuids;
      setUuids(formattedUuids);
      setCopiedIndex(null);
    } catch (error) {
      console.error("Failed to generate UUID:", error);
      alert(error instanceof Error ? error.message : translations.errorGeneric);
    }
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
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="version"
              className="font-medium text-sm text-stone-700 dark:text-stone-300"
            >
              {translations.version}
            </label>
            <select
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value as UUIDVersion)}
              className="rounded-md border border-stone-300 bg-white px-3 py-1 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            >
              <option value="v1">v1</option>
              <option value="v3">v3</option>
              <option value="v4">v4</option>
              <option value="v5">v5</option>
              <option value="v6">v6</option>
              <option value="v7">v7</option>
            </select>
          </div>

          {version !== "v3" && version !== "v5" && version !== "v6" &&
            version !== "v7" && (
            <div className="flex items-center gap-2">
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
          )}
        </div>

        {(version === "v3" || version === "v5") && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="namespace"
                className="mb-1 block font-medium text-sm text-stone-700 dark:text-stone-300"
              >
                {translations.namespace}
              </label>
              <input
                id="namespace"
                type="text"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
                placeholder={translations.namespacePlaceholder}
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block font-medium text-sm text-stone-700 dark:text-stone-300"
              >
                {translations.name}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={translations.namePlaceholder}
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
              />
            </div>
          </div>
        )}

        {(version === "v6" || version === "v7") && (
          <div>
            <label
              htmlFor="timestamp"
              className="mb-1 block font-medium text-sm text-stone-700 dark:text-stone-300"
            >
              {translations.timestamp}
            </label>
            <input
              id="timestamp"
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder={translations.timestampPlaceholder}
              className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleGenerate}
            className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {translations.generateButton}
          </button>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-stone-300 text-blue-600 focus:ring-blue-500 dark:border-stone-600"
            />
            <span className="text-sm text-stone-700 dark:text-stone-300">
              {translations.uppercase}
            </span>
          </label>
        </div>
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
              className="rounded border border-stone-300 bg-white p-2 text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-300 dark:hover:bg-stone-600"
              aria-label={copiedIndex === index
                ? translations.copied
                : translations.copyButton}
            >
              {copiedIndex === index
                ? <CheckIcon className="h-4 w-4" />
                : <CopyIcon className="h-4 w-4" />}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
