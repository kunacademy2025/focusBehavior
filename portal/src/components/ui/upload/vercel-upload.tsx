"use client";

import { useRef, useState } from "react";
import { endsWith } from "lodash";
import { PiTrashBold } from "react-icons/pi";
import Link from "next/link";
import { cn } from "@/utils";
import { CustomImage } from "@/components/controls";

export const VercelUpload = ({
  file,
  setFile,
  blob,
  setBlob,
  isReadOnly,
}: any) => {
  const [fileName, setFileName] = useState<string | null>(
    blob?.data?.pathname || null
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const maxFileSizeMB = 5; // Maximum file size in MB

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxFileSizeMB) {
        setErrorMessage(
          `File size exceeds the maximum limit of ${maxFileSizeMB}MB.`
        );
        return;
      }

      setFileName(file.name);
      setFile(file);
      setErrorMessage(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setPreviewUrl(result);
        } else {
          console.error("FileReader failed to load the file.");
        }
      };

      reader.onerror = () => {
        console.error("FileReader error:", reader.error);
      };

      reader.readAsDataURL(file);
    }
  };

  function handleRemoveFile() {
    setBlob(null);
    setFile(null);
    setFileName(null);
    setPreviewUrl(null);
    setErrorMessage(null);
  }

  const handleClickContainer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUrl = blob?.data?.url || previewUrl;
  const canBrowse = !blob && !fileName;
  const displayImage = !!(fileName || imageUrl);

  return (
    <>
      <div
        className={cn(
          "bg-white cursor-pointer w-full text-gray-500 font-semibold text-base rounded h-60 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed",
          isReadOnly ? "pointer-events-none" : ""
        )}
        onClick={handleClickContainer}
      >
        {canBrowse && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 mb-2 fill-gray-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload file
            <input
              ref={fileInputRef}
              name="file"
              type="file"
              accept="application/pdf, image/png, image/jpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              PNG, JPG, and PDF are Allowed. Max file size: 5MB.
            </p>
          </>
        )}
        {displayImage && (
          <div className={"relative"}>
            <figure className="group relative h-40 rounded-md bg-gray-50">
              <MediaPreview name={fileName ?? ""} url={imageUrl} />
              {!isReadOnly && (
                <button
                  title="remove"
                  type="button"
                  onClick={() => handleRemoveFile()}
                  className="absolute right-0 top-0 rounded-full bg-gray-700/70 p-1.5 opacity-20 transition duration-300 hover:bg-red-dark group-hover:opacity-100"
                >
                  <PiTrashBold className="text-white" />
                </button>
              )}
            </figure>
          </div>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      {blob && (
        <div className="mx-auto pt-2 mt-2 w-fit">
          <Link
            href={blob?.data?.downloadUrl}
            target="_blank"
            rel={"nofollow"}
            className="py-2 px-4 mx-auto rounded-lg text-white bg-primary hover:bg-primary/85 border-2 border-primary transition-all duration-300"
          >
            Download
          </Link>
        </div>
      )}
    </>
  );
};

function MediaPreview({ name, url }: { name: string; url: string }) {
  if (!url) return null;

  return endsWith(name, ".pdf") ? (
    <object data={url} type="application/pdf" width="100%" height="100%">
      <p>
        Alternative text - include a link <a href={url}>to the PDF!</a>
      </p>
    </object>
  ) : (
    <CustomImage
      src={url}
      alt={name}
      width={160}
      height={160}
      className="mt-2 transform rounded-md object-contain w-40 h-40"
    />
  );
}
