"use client"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";

export const DownloadModal = ({
  title,
  url,
  image,
  isOpen,
  onClose,
}: {
  title?: string;
  url: string;
  image?: unknown;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            )}
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
