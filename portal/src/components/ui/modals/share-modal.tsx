"use client";
import { useCurrentUrl } from "@/hooks";
import { useUrl } from "@/hooks/useUrl";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  InstapaperShareButton,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import React from "react";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

export const ShareModal = ({
  payload: { title },
  isOpen,
  setOpen,
}: {
  payload: { title: string };
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [copied, setCopied] = useState(false);

  const url = useUrl();

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <Modal
      size={"md"}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      classNames={{
        body: "py-6",
        backdrop: "bg-black/50 backdrop-opacity-40",
        base: "border-secondary bg-white text-secondary",
        header: "border-b-[1px] border-veryLightGray",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Share Modal
            </ModalHeader>

            <ModalBody>
              <div>
                <h6 className="text-base text-secondary">
                  Share this link via
                </h6>
                <div className="mt-4 flex items-center flex-wrap gap-4">
                  <FacebookShareButton url={url} title={title || ""}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={url} title={title || ""}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <TelegramShareButton url={url} title={title || ""}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                  <PinterestShareButton
                    url={url}
                    media={url}
                    title={title || ""}
                  >
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                  <WhatsappShareButton url={url} title={title || ""}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={url} title={title || ""}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <InstapaperShareButton url={url} title={title || ""}>
                    <div className="grid place-content-center rounded-full w-8 h-8 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
                      <FaInstagram className="text-white w-6 h-6" />
                    </div>
                  </InstapaperShareButton>
                  <EmailShareButton url={url} subject={title || ""} body={url}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              </div>
              <div className="mt-4">
                <h6 className="text-sm text-secondary">Or copy link</h6>
                <div className="relative h-10 w-full rounded-lg overflow-hidden border border-gray-300 flex items-center mt-4">
                  <div className="w-full text-sm text-gray-500 flex-1 ml-4 whitespace-pre text-left">
                    {url}
                  </div>
                  <button
                    title="copy"
                    type="button"
                    className="absolute right-0 bg-primary whitespace-nowrap rounded-r-lg px-4 py-3 text-sm text-white transition-all duration-300"
                    onClick={handleCopy}
                  >
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
