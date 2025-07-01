"use client"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React from "react";
import ReactPlayer from "react-player";

export const VideoModal = ({
  title,
  url,
  isOpen,
  setOpen,
}: {
  title?: string;
  url?: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getVimeoVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  let videoUrl = url;
  if (isYouTube) {
    const youTubeId = getYouTubeVideoId(url);
    videoUrl = `https://www.youtube.com/watch?v=${youTubeId}`;
  } else if (isVimeo) {
    const vimeoId = getVimeoVideoId(url);
    videoUrl = `https://vimeo.com/${vimeoId}`;
  }

  return (
    <>
      <Modal size={"2xl"} isOpen={isOpen} onClose={() => setOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              {title && (
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
              )}
              <ModalBody>
                <div
                  className="relative w-full py-6"
                  style={{ paddingTop: "56.25%" }}
                >
                  {/* 16:9 Aspect Ratio */}
                  <ReactPlayer
                    url={videoUrl}
                    width={"100%"}
                    height="100%"
                    style={{ position: "absolute", top: 0, left: 0 }}
                    controls={true}
                    playing={isOpen}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
