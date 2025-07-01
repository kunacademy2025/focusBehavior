"use client";
import { useModal } from "@/context";
import { cn } from "@/utils";
import React from "react";
import { FaPlay } from "react-icons/fa6";

export const PlayButton = ({ url }: { url: string }) => {
  const { openModal } = useModal();
  return (
    <button
      title="play"
      className={cn("bg-transparent hover:bg-transparent text-white py-2")}
      onClick={() =>
        openModal("video", {
          videoUrl: url,
        })
      }
    >
      <FaPlay className="w-8 h-8" />
    </button>
  );
};
