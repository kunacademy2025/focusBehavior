"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ForgetPasswordForm } from ".";
import { useTranslation } from "@/i18n/client";

export const ForgetPasswordDrawer = ({
  isOpen,
  setOpen,
  lang,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  lang: string;
}) => {
  const { t } = useTranslation("common", lang);
  return (
    <Dialog
      open={isOpen}
      onClose={setOpen}
      className="max-h-full relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-60 cursor-pointer transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-none bg-white shadow-xl">
                <div className="flex-1 overflow-y-none px-4 py-6 sm:px-6">
                  <div className="sticky z-10 top-0 flex items-start justify-between">
                    <DialogTitle className="text-3xl text-primary">
                      {t("forms.password_reset")}
                    </DialogTitle>
                    <div className="ltr:ml-3 rtl:mr-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="h-full max-h-full w-full flex flex-col justify-center">
                    <ForgetPasswordForm lang={lang} />
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
