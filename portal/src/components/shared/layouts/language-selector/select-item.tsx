"use client";
import { useTranslation } from "@/i18n/client";
import { fallbackLng } from "@/i18n/settings";
import { cn } from "@/utils";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { useCallback, useMemo } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

export const LanguageItem = ({
  lang,
  languages,
}: {
  lang: string;
  languages: string[];
}) => {
  const { t } = useTranslation(lang);

  const handleChange = useCallback(
    (targetLanguage: string) => {
      if (targetLanguage !== lang) {
        document.cookie = `selected_lang=${targetLanguage}; path=/; max-age=31536000`;

        let href = window.location.pathname;
        if (lang !== fallbackLng) href = href.replace(`/${lang}`, "");
        window.location.href = `/${targetLanguage}${href}`;
      }
    },
    [lang]
  );

  const renderedMenuItems = useMemo(
    () =>
      languages.map((target, index) => (
        <div key={index}>
          {index !== 0 && <MenuSeparator className="my-1 h-px bg-gray-200" />}
          <MenuItem key={index}>
            <button
              className="group flex px-6 items-center justify-center w-full text-black hover:text-primary font-semibold rounded-md py-2 text-sm data-[focus]:bg-primary/10 transition text-center"
              onClick={() => handleChange(target)}
            >
              {t(`languages.${target}`)}
            </button>
          </MenuItem>
        </div>
      )),
    [languages, handleChange, t]
  );

  return (
    <Menu>
      <MenuButton
        data-active
        className="inline-flex items-center gap-2 rounded-full overflow-hidden text-white h-full"
      >
        <BsGlobe2 className="w-5 h-5" />
        <span>{lang === "en" ? "English" : "عربي"}</span>
        <FaChevronDown className="" />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom"
        className={cn(
          "mt-4 z-[99] origin-top-right rounded-lg bg-white p-2 text-sm text-black shadow-lg focus:outline-none",
          "transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        )}
      >
        {renderedMenuItems}
      </MenuItems>
    </Menu>
  );
};
