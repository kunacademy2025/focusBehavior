"use client";
import { NavItemProps } from "@/interfaces";
import { Logo } from "./logo";
import { Button, Text } from "rizzui";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  DialogBackdrop,
} from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { social_links } from "@/assets/data/social.data";
import { cn } from "@/utils";
import React from "react";
import { useModal } from "@/context";

import { useUserInfo } from "@/hooks";
import { HiMenuAlt2 } from "react-icons/hi";
import { RenderIcon } from "./nav-menu";
import { routes } from "@/config";
import { useTranslation } from "react-i18next";
import { CurrencySelector } from "../currency-selector";

export const MobileMenu = ({
  isSticky,
  navigation,
  lang,
}: {
  isSticky: boolean;
  navigation: NavItemProps[];
  lang: string;
}) => {
  const { openModal } = useModal();

  const { t } = useTranslation("common", lang);

  const { user, logout } = useUserInfo();

  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "-m-2.5 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 hover:text-primary transition-all duration-300",
          isSticky ? "text-secondary" : "text-white"
        )}
        onClick={() => setMenuOpen(true)}
      >
        <HiMenuAlt2
          aria-hidden="true"
          className="block h-8 w-8 -scale-x-100 group-data-[open]:hidden"
        />
        <XMarkIcon
          aria-hidden="true"
          className="hidden h-8 w-8 group-data-[open]:block"
        />
      </div>
      {/* Mobile Menu */}
      <Dialog
        open={isMenuOpen}
        onClose={setMenuOpen}
        className="relative max-h-full z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-full sm:max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 pb-3 pt-5">
              <Logo className={"h-10 lg:h-10"} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-primary transition-all duration-300"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <ul className="flex flex-col h-full overflow-y-auto border-t border-gray-200 px-4 py-6">
              {navigation.map((item: any, index: number) => {
                return item?.subLinks ? (
                  <Disclosure as="li" key={index}>
                    {({ open }) => (
                      <div
                        className={cn(
                          "flex flex-col transition-all duration-300",
                          open ? "bg-veryLightGray rounded-xl" : "bg-white"
                        )}
                      >
                        <DisclosureButton
                          key={`${index}`}
                          className={cn(
                            "uppercase rounded-xl py-3 px-3 flex items-center text-sm font-medium leading-6",
                            "text-secondary hover:text-primary transition-all duration-300",
                            "hover:bg-veryLightGray",
                            open ? "text-primary" : ""
                          )}
                        >
                          <span className="flex-auto text-start">
                            {item.title}
                          </span>
                          {open ? (
                            <MinusIcon className="w-5 h-5 transition-all duration-300" />
                          ) : (
                            <PlusIcon className="w-5 h-5 transition-all duration-300" />
                          )}
                        </DisclosureButton>
                        <Transition
                          show={open}
                          enter="transition ease-out duration-300"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-200"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <DisclosurePanel>
                            {item?.subLinks.map(
                              (optionItem: any, optionIndex: number) => {
                                return (
                                  <div
                                    key={`${optionItem.id} - ${optionIndex}`}
                                    className="group relative flex items-center gap-x-3 rounded-xl py-1 px-3 text-base leading-6 text-mediumGray hover:text-primary transition-all duration-300 hover:bg-veryLightGray"
                                  >
                                    {optionItem.icon && (
                                      <div className="flex ms-2 h-8 w-8 flex-none items-center justify-center ">
                                        <RenderIcon
                                          icon={optionItem.icon}
                                          className={"w-8 h-8"}
                                        />
                                      </div>
                                    )}
                                    <div className="flex-auto">
                                      <Link
                                        href={optionItem.url}
                                        className="block"
                                        onClick={() => setMenuOpen(false)}
                                      >
                                        {optionItem.title}
                                      </Link>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </DisclosurePanel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                ) : (
                  <li key={index}>
                    <Link
                      href={item.url || "/"}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "uppercase rounded-xl py-3 px-3 flex items-center text-sm font-medium leading-6",
                        "text-secondary hover:text-primary transition-all duration-300",
                        "hover:bg-veryLightGray"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-2 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <CurrencySelector lang={lang} />
              </div>
              <div className="flow-root">
                {user ? (
                  <Link href={routes.accountInfo("", lang)}>
                    <Button
                      variant="text"
                      className="group  hover:bg-primary text-secondary hover:text-white rounded-lg flex items-center justify-between lg:gap-x-4 transition-all duration-300 focus:outline-none"
                    >
                      <FaUser className="text-primary group-hover:text-white w-5 h-5 transition-all duration-300" />
                      <Text className="capitalize whitespace-nowrap font-medium">
                        {user.display_name}
                      </Text>
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="text"
                    className="group hover:underline text-mediumGray hover:text-primary rounded-lg flex items-center justify-between gap-x-4 transition-all duration-300"
                    onClick={() => {
                      setMenuOpen(false);
                      openModal("login");
                    }}
                  >
                    <FaUser className="text-primary w-5 h-5 transition-all duration-300" />
                    <Text className="capitalize whitespace-nowrap font-medium">
                      {t("buttons.login")}
                    </Text>
                  </Button>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <ul
                className={cn(
                  `px-3 flex items-center list-none caret-transparent text-secondary gap-x-4`
                )}
              >
                {social_links.map((item: any, index: number) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.attributes?.url}
                        target="_blank"
                        rel="nofollow"
                        className={cn("transition duration-500 w-9 h-9")}
                        title={item.attributes?.title}
                      >
                        <i
                          className={`fa-brands fa-${item.attributes?.header_class}  hover:text-primary transition duration-300`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
