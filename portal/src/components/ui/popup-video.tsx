"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import { FaTimes } from "react-icons/fa";
import { useModal } from "@/context";

export const PopupVideo = ({
  isOpen,
  setOpen,
  videoUrl,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  videoUrl?: string;
}) => {
  const { getPayload } = useModal();
  const videoPayload = getPayload("video");

  // Fallback for missing payload
  const videoUrlFromContext: string = typeof videoPayload?.videoUrl === "string" ? videoPayload.videoUrl : videoUrl || "";

  const [videoType, setVideoType] = useState<
    "youtube" | "vimeo" | "local" | "unknown"
  >("local");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("enablepopup");
    } else {
      document.body.classList.remove("enablepopup");
    }
    return () => {
      document.body.classList.remove("enablepopup");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!videoUrlFromContext) return;
    if (
      videoUrlFromContext.includes("youtube.com") ||
      videoUrlFromContext.includes("youtu.be")
    )
      setVideoType("youtube");
    else if (videoUrlFromContext.includes("vimeo.com")) setVideoType("vimeo");
    else if (videoUrlFromContext.endsWith(".mp4")) {
      setVideoType("local");
    } else {
      setVideoType("unknown");
    }
  }, [videoUrlFromContext]);

  const extractVideoId = (url: string) => {
    if (videoType === "youtube") {
      const regExp =
        /(?:youtube\.com.*(?:v=|embed\/|v\/|e\/|watch\?v=)|youtu\.be\/)([^"&?\/ ]{11})/;
      const match = url.match(regExp);
      return match ? match[1] : "";
    } else if (videoType === "vimeo") {
      const regExp = /vimeo\.com\/(\d+)/;
      const match = url.match(regExp);
      return match ? match[1] : "";
    }
    return url;
  };

  const renderVideo = () => {
    if (videoType === "youtube" || videoType === "vimeo") {
      return (
        <ModalVideo
          channel={videoType}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          videoId={extractVideoId(videoUrlFromContext || "")}
        />
      );
    } else if (videoType === "local") {
      return (
        isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-75">
            <div
              className="absolute inset-0"
              onClick={() => setOpen(false)}
            ></div>
            <div className="relative z-10 bg-white p-2 rounded-lg w-full max-w-4xl max-h-full h-auto">
              <video
                controls
                autoPlay
                className="w-full h-auto max-h-[90vh] rounded-lg"
              >
                <source src={videoUrlFromContext} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                className="absolute -top-2 -right-2 text-primary bg-white hover:bg-white rounded-full px-2 py-2 focus:outline-none duration-500"
                onClick={() => setOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )
      );
    }
    return null;
  };

  return isOpen && renderVideo();
};
