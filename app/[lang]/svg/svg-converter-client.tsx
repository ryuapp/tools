"use client";

import { useCallback, useRef, useState } from "react";
import { DownloadIcon, FileTextIcon, UploadIcon } from "@radix-ui/react-icons";

type Props = {
  translations: {
    uploadButton: string;
    downloadButton: string;
    width: string;
    height: string;
    format: string;
    backgroundColor: string;
    transparent: string;
    loadSvgButton: string;
    dropZoneText: string;
    pasteTabLabel: string;
    uploadTabLabel: string;
    pastePlaceholder: string;
    errorInvalidFile: string;
    errorInvalidSvg: string;
    errorConversion: string;
    preview: string;
    settings: string;
    webpWarning: string;
  };
};

export default function SvgConverterClient({ translations }: Props) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(1024);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [transparent, setTransparent] = useState<boolean>(true);
  const [previousTransparent, setPreviousTransparent] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload");
  const [pastedSvg, setPastedSvg] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const settingsTimeoutRef = useRef<number | null>(null);
  const currentSettingsRef = useRef({
    width,
    height,
    format,
    backgroundColor,
    transparent,
  });

  // Update ref whenever settings change
  currentSettingsRef.current = {
    width,
    height,
    format,
    backgroundColor,
    transparent,
  };

  const convertToImage = useCallback(
    (
      content: string,
      w: number,
      h: number,
      outputFormat: "png" | "jpeg" | "webp",
      bg: string,
      trans: boolean,
    ) => {
      if (!content) {
        setImageUrl("");
        return;
      }

      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Canvas context not available");
          return;
        }

        canvas.width = w;
        canvas.height = h;

        // Set background (JPEG doesn't support transparency)
        if (!trans || outputFormat === "jpeg") {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, w, h);
        }

        const img = new Image();
        const blob = new Blob([content], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0, w, h);

          // Determine MIME type and quality
          let mimeType: string;
          let quality: number | undefined;

          switch (outputFormat) {
            case "png":
              mimeType = "image/png";
              break;
            case "jpeg":
              mimeType = "image/jpeg";
              quality = 0.92;
              break;
            case "webp":
              mimeType = "image/webp";
              quality = 0.92;
              break;
            default:
              throw new Error(
                `Unexpected direction: ${outputFormat satisfies never}`,
              );
          }

          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Revoke previous image URL to prevent memory leaks
                if (imageUrl) {
                  URL.revokeObjectURL(imageUrl);
                }
                const newImageUrl = URL.createObjectURL(blob);
                setImageUrl(newImageUrl);
              }
            },
            mimeType,
            quality,
          );
          URL.revokeObjectURL(url);
        };

        img.onerror = () => {
          console.error("Failed to load SVG image");
          URL.revokeObjectURL(url);
        };

        img.src = url;
      } catch (error) {
        console.error("Conversion error:", error);
      }
    },
    [imageUrl],
  );

  const updateSettingsDebounced = useCallback(() => {
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current);
    }
    settingsTimeoutRef.current = setTimeout(() => {
      if (svgContent) {
        // Use ref to get current values at execution time
        const settings = currentSettingsRef.current;
        convertToImage(
          svgContent,
          settings.width,
          settings.height,
          settings.format,
          settings.backgroundColor,
          settings.transparent,
        );
      }
    }, 500);
  }, [convertToImage, svgContent]);

  const parseSvgDimensions = useCallback((content: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "image/svg+xml");
      const svgElement = doc.querySelector("svg");

      let newWidth = width;
      let newHeight = height;

      if (svgElement) {
        const viewBox = svgElement.getAttribute("viewBox");
        if (viewBox) {
          const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
          if (vbWidth && vbHeight) {
            newWidth = vbWidth;
            newHeight = vbHeight;
            setWidth(vbWidth);
            setHeight(vbHeight);
          }
        } else {
          const w = svgElement.getAttribute("width");
          const h = svgElement.getAttribute("height");
          if (w && h) {
            newWidth = parseInt(w);
            newHeight = parseInt(h);
            setWidth(parseInt(w));
            setHeight(parseInt(h));
          }
        }
      }

      // Convert immediately with the new dimensions
      setTimeout(() => {
        convertToImage(
          content,
          newWidth,
          newHeight,
          format,
          backgroundColor,
          transparent,
        );
      }, 0);
    } catch (error) {
      console.error("Error parsing SVG:", error);
    }
  }, [width, height, format, backgroundColor, transparent, convertToImage]);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type !== "image/svg+xml") {
      alert(translations.errorInvalidFile);
      return;
    }

    // Set filename without extension for PNG download
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setFileName(nameWithoutExt);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSvgContent(content);
      parseSvgDimensions(content);
    };
    reader.readAsText(file);
  }, [
    translations.errorInvalidFile,
    parseSvgDimensions,
  ]);

  const handlePastedSvg = useCallback((content: string) => {
    const trimmedSvg = content.trim();
    if (!trimmedSvg) {
      setSvgContent("");
      setImageUrl("");
      setFileName("");
      return;
    }

    if (!trimmedSvg.includes("<svg")) {
      alert(translations.errorInvalidSvg);
      return;
    }

    // Set default filename for pasted SVG
    setFileName("pasted-svg");

    // Ensure it's a complete SVG
    let completeSvg = trimmedSvg;
    if (!trimmedSvg.startsWith("<?xml") && !trimmedSvg.startsWith("<svg")) {
      completeSvg =
        `<svg xmlns="http://www.w3.org/2000/svg">${trimmedSvg}</svg>`;
    }

    setSvgContent(completeSvg);
    parseSvgDimensions(completeSvg);
  }, [
    translations.errorInvalidSvg,
    parseSvgDimensions,
  ]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload],
  );

  const downloadImage = useCallback(() => {
    if (!imageUrl) return;

    const a = document.createElement("a");
    a.href = imageUrl;
    const extension = format;
    a.download = fileName
      ? `${fileName}.${extension}`
      : `converted.${extension}`;
    a.click();
  }, [imageUrl, fileName, format]);

  return (
    <div className="space-y-6">
      {/* Input Mode Tabs */}
      <div className="relative">
        <div className="flex">
          <button
            type="button"
            onClick={() => setInputMode("upload")}
            className={`flex w-1/2 items-center justify-center gap-2 border-b-2 border-stone-300 px-2 py-2 font-medium text-sm transition-colors dark:border-stone-600 ${
              inputMode === "upload"
                ? "text-stone-900 dark:text-stone-100"
                : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            }`}
          >
            <UploadIcon className="h-4 w-4" />
            {translations.uploadTabLabel}
          </button>
          <button
            type="button"
            onClick={() => setInputMode("paste")}
            className={`flex w-1/2 items-center justify-center gap-2 border-b-2 border-stone-300 px-2 py-2 font-medium text-sm transition-colors dark:border-stone-600 ${
              inputMode === "paste"
                ? "text-stone-900 dark:text-stone-100"
                : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            }`}
          >
            <FileTextIcon className="h-4 w-4" />
            {translations.pasteTabLabel}
          </button>
          {/* Sliding underline */}
          <div
            className={`absolute bottom-0 left-0 h-0.5 w-full origin-[0_0] bg-blue-600 transition-transform duration-300 ease-out ${
              inputMode === "upload"
                ? "translate-x-0 scale-x-[0.5]"
                : "translate-x-[50%] scale-x-[0.5]"
            }`}
          />
        </div>
      </div>

      {/* Input Area */}
      {inputMode === "upload"
        ? (
          <div
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-stone-300 dark:border-stone-600"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon className="mx-auto mb-4 h-12 w-12 text-stone-400" />
            <p className="text-stone-600 dark:text-stone-400">
              {translations.dropZoneText}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )
        : (
          <div className="space-y-4">
            <label htmlFor="svg-textarea" className="sr-only">
              {translations.pastePlaceholder}
            </label>
            <textarea
              id="svg-textarea"
              value={pastedSvg}
              onChange={(e) => {
                setPastedSvg(e.target.value);
                handlePastedSvg(e.target.value);
              }}
              placeholder={translations.pastePlaceholder}
              aria-label={translations.pastePlaceholder}
              className="h-40 w-full rounded-md border border-stone-300 bg-white p-3 font-mono text-sm text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
            />
          </div>
        )}

      {/* Preview and Settings */}
      {svgContent && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-stone-900 dark:text-stone-100">
              {translations.preview}
            </h3>
            {imageUrl && (
              <div className="rounded-lg border border-stone-200 p-4 dark:border-stone-700">
                <img
                  src={imageUrl}
                  alt="Converted Image"
                  className="mx-auto max-w-full"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-stone-900 dark:text-stone-100">
              {translations.settings}
            </h3>
            <div className="rounded-lg border border-stone-200 p-4 dark:border-stone-700">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="w-24 font-medium text-sm text-stone-700 dark:text-stone-300">
                    {translations.width}
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => {
                      setWidth(parseInt(e.target.value) || 100);
                      updateSettingsDebounced();
                    }}
                    className="w-24 rounded-md border border-stone-300 bg-white px-2 py-1 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-24 font-medium text-sm text-stone-700 dark:text-stone-300">
                    {translations.height}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => {
                      setHeight(parseInt(e.target.value) || 100);
                      updateSettingsDebounced();
                    }}
                    className="w-24 rounded-md border border-stone-300 bg-white px-2 py-1 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="w-24 font-medium text-sm text-stone-700 dark:text-stone-300">
                    {translations.format}
                  </label>
                  <select
                    value={format}
                    onChange={(e) => {
                      const newFormat = e.target.value as
                        | "png"
                        | "jpeg"
                        | "webp";
                      const oldFormat = format;
                      setFormat(newFormat);

                      // Handle transparency state when switching formats
                      if (newFormat === "jpeg") {
                        // Save current transparent state before switching to JPEG
                        if (oldFormat !== "jpeg") {
                          setPreviousTransparent(transparent);
                        }
                        setTransparent(false);
                      } else if (oldFormat === "jpeg") {
                        // Restore previous transparent state when switching from JPEG
                        setTransparent(previousTransparent);
                      }

                      updateSettingsDebounced();
                    }}
                    className="rounded-md border border-stone-300 bg-white px-3 py-1 text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                  </select>
                  {format === "webp" && (
                    <span className="text-orange-600 text-xs dark:text-orange-400">
                      {translations.webpWarning}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="w-24 font-medium text-sm text-stone-700 dark:text-stone-300">
                      {translations.backgroundColor}
                    </label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => {
                        setBackgroundColor(e.target.value);
                        updateSettingsDebounced();
                      }}
                      disabled={format !== "jpeg" && transparent}
                      className="h-8 w-16 rounded border border-stone-300 dark:border-stone-600"
                    />
                  </div>
                  <label
                    className={`flex items-center gap-2 pl-26 ${
                      format === "jpeg"
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={transparent}
                      onChange={(e) => {
                        setTransparent(e.target.checked);
                        updateSettingsDebounced();
                      }}
                      disabled={format === "jpeg"}
                      className="rounded border-stone-300 text-blue-600 focus:ring-blue-500 dark:border-stone-600"
                    />
                    <span className="text-sm text-stone-700 dark:text-stone-300">
                      {translations.transparent}
                    </span>
                  </label>
                </div>

                {imageUrl && (
                  <button
                    type="button"
                    onClick={downloadImage}
                    className="flex items-center gap-2 rounded-md bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    {translations.downloadButton}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
