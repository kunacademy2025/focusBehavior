import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import React from "react";
import { ContactFormWrapper } from ".";

export const ContactModal = ({
  isOpen,
  setOpen,
  contextData,
  page_title,
  source,
  courseId,
  scheduleId,
}: {
  isOpen: boolean;
  setOpen: () => void;
  contextData: any;
  page_title: string;
  source: string;
  courseId?: number;
  scheduleId?: number;
}) => {
  return (
    <>
      <Modal size={"lg"} isOpen={isOpen} onClose={setOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-primary text-lg">Contact Us</h3>
              </ModalHeader>
              <ModalBody>
                <div className="relative w-full">
                  <ContactFormWrapper
                    data={null}
                    contextData={contextData}
                    page_title={page_title}
                    source={source}
                    courseId={courseId}
                    scheduleId={scheduleId}
                    isPopup={true}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
