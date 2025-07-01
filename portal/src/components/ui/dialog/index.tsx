"use client";

import { ReactNode, useRef, useEffect } from "react";
import { cn } from "@/utils";

type CustomDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
};

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: CustomDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "rounded-lg p-6 bg-white max-w-md w-full shadow-xl border border-gray-300",
        className
      )}
      onClose={onClose}
    >
      <div className="flex justify-between items-start mb-4">
        {title && (
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        )}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm"
          aria-label="Close dialog"
        >
          ✕
        </button>
      </div>
      <div className="text-sm text-gray-700">{children}</div>
    </dialog>
  );
};
