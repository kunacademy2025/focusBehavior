"use client";
import { NavItemProps } from "@/interfaces";
import { Logo } from "../logo";
import { Button, Text } from "rizzui";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { cn, getMediaInfo } from "@/utils";
import { MaskedIcon } from "@/components/ui/masked-icon";
import React from "react";
import { useModal } from "@/context";
import { FiSearch } from "react-icons/fi";
import { useUserInfo } from "@/hooks";
import { MobileMenu } from "../mobile-menu";
import { NavItem } from "./nav-item";
import { Banner } from "@/components/shared/common";
import Link from "next/link";
import { routes } from "@/config";
import { CurrencySelector } from "../../currency-selector";
import { useTranslation } from "@/i18n/client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const NavMenu = ({
  lang,
  navigation,
  banner,
}: {
  lang: string;
  navigation: NavItemProps[];
  banner: any;
}) => {
  const { openModal } = useModal();

  const { t } = useTranslation("common", lang);

  const { user, logout } = useUserInfo();

  const [isSticky, setIsSticky] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    function windowScroll() {
      const navbar = document.getElementById("navbar");
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        if (navbar !== null) {
          setIsSticky(true);
        }
      } else {
        if (navbar !== null) {
          setIsSticky(false);
        }
      }
    }
    window.addEventListener("scroll", windowScroll);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, []);

  return (
    <>
      <Banner
        isVisible={isBannerVisible}
        setIsVisible={setIsBannerVisible}
        banner={banner}
      />
      <nav
        id="navbar"
        className={cn(
          "h-24 transition-all duration-300",
          isSticky
            ? `fixed ${
                !isBannerVisible || !banner ? "top-0" : "top-12"
              } w-full bg-white z-40 bg-opacity-90 backdrop-blur-lg shadow-sm`
            : "relative z-30"
        )}
      >
        <>
          <div
            className={cn(
              "container w-full h-full flex items-center justify-between"
            )}
          >
            <div className="w-full h-full flex items-center lg:justify-start gap-x-3 sm:gap-x-6 xl:gap-x-10">
              <div className="flex lg:hidden">
                <MobileMenu
                  isSticky={isSticky}
                  navigation={navigation}
                  lang={lang}
                />
              </div>
              <Logo />
              <ul className="hidden lg:flex gap-x-10 text-xs xl:text-sm font-medium h-full">
                {navigation.map((item: any, index: number) => (
                  <NavItem
                    key={index}
                    item={item}
                    isSticky={isSticky}
                    isHovered={hoveredItem === index}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  />
                ))}
              </ul>
            </div>

            <div className="flex lg:flex-1 lg:justify-end gap-x-2 lg:gap-x-4">
              <div className="hidden lg:block">
                <CurrencySelector lang={lang} />
              </div>
              {user ? (
                // <Dropdown className="cursor-pointer">
                //   <DropdownTrigger>
                //     <Button
                //       variant="text"
                //       className="group  hover:bg-primary text-secondary hover:text-white rounded-lg flex items-center justify-between lg:gap-x-4 focus:outline-none"
                //     >
                //       <FaUser className="text-primary group-hover:text-white w-5 h-5 transition" />
                //       <Text
                //         className={cn(
                //           "capitalize whitespace-nowrap font-medium hidden 2xl:block text-white transition",
                //           isSticky
                //             ? "text-secondary group-hover:text-white"
                //             : "text-white"
                //         )}
                //       >
                //         {user?.display_name}
                //       </Text>
                //     </Button>
                //   </DropdownTrigger>
                //   <DropdownMenu aria-label="Static Actions">
                //     <DropdownItem
                //       key="profile"
                //       as="link"
                //       href={routes.accountInfo("", lang)}
                //     >
                //       <Link href={routes.accountInfo("", lang)}>
                //         {t("buttons.my_account")}
                //       </Link>
                //     </DropdownItem>
                //     <DropdownItem
                //       key="logout"
                //       className="text-primary hover:text-primary"
                //       onPress={logout}
                //     >
                //       {t("buttons.logout")}
                //     </DropdownItem>
                //   </DropdownMenu>
                // </Dropdown>
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="group hover:bg-primary text-secondary hover:text-white rounded-lg flex items-center gap-x-2 px-4 py-2 focus:outline-none">
                    <FaUser className="text-primary group-hover:text-white w-5 h-5 transition" />
                    <span
                      className={cn(
                        "capitalize whitespace-nowrap font-medium hidden 2xl:block text-white transition",
                        isSticky
                          ? "text-secondary group-hover:text-white"
                          : "text-white"
                      )}
                    >
                      {user?.display_name}
                    </span>
                  </MenuButton>

                  <MenuItems className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          href={routes.accountInfo("", lang)}
                          className={`block px-4 py-2 text-gray-700 ${
                            active ? "bg-gray-100" : ""
                          }`}
                        >
                          {t("buttons.my_account")}
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`block w-full text-left px-4 py-2 text-red-600 ${
                            active ? "bg-red-100" : ""
                          }`}
                        >
                          {t("buttons.logout")}
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="space-y-1">
                  <Button
                    variant="text"
                    className="hidden lg:flex group bg-veryLightGray hover:bg-primary text-mediumGray hover:text-white rounded-lg  items-center justify-between lg:gap-x-4 transition-all duration-300"
                    onClick={() => openModal("login")}
                  >
                    <Text className="capitalize whitespace-nowrap font-medium hidden 2xl:block">
                      {t("buttons.login")}
                    </Text>
                    <FaUser className="text-primary group-hover:text-white w-5 h-5 transition-all duration-300" />
                  </Button>
                </div>
              )}
              <button className="p-2" onClick={() => openModal("search")}>
                <FiSearch className="w-7 h-7 text-primary" />
              </button>
            </div>
          </div>
        </>
      </nav>
    </>
  );
};

export const RenderIcon = ({
  icon,
  className,
}: {
  icon: any;
  className?: any;
}) => {
  if (typeof icon === "string")
    return <i className={`${icon} fa-lg group-hover/item:text-primary`} />;
  if (typeof icon === "object") {
    const { imgUrl } = getMediaInfo(icon);
    return (
      <MaskedIcon
        imgUrl={imgUrl}
        className={cn("bg-mediumGray group-hover/item:bg-primary", className)}
      />
    );
  }
  return <></>;
};
