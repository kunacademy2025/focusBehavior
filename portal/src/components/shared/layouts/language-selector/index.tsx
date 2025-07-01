"use client";
import React from "react";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/i18n/settings";
import { LanguageItem } from "./select-item";
import { useTranslation } from "@/i18n/client";

const LanguageSelector = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, "common");

  if (languages.length <= 1) return <></>;

  return (
    <div className="">
      <Trans t={t}></Trans>
      <LanguageItem lang={lang} languages={languages} />
    </div>
  );
};

export default LanguageSelector;
