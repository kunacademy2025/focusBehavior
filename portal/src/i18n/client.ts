"use client";

import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import i18next from "i18next";

import { getOptions, languages, cookieName } from "./settings";
import { useLanguage } from "./utils/LanguageContext";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(ns?: string, lng?: string, options?: object) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const { lang } = useLanguage();
  const currentLanguage = lang ?? lng;

  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (
    runsOnServerSide &&
    currentLanguage &&
    i18n.resolvedLanguage !== currentLanguage
  ) {
    i18n.changeLanguage(currentLanguage);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!currentLanguage || i18n.resolvedLanguage === currentLanguage) return;
      i18n.changeLanguage(currentLanguage);
    }, [currentLanguage, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies.i18next === currentLanguage) return;
      setCookie(cookieName, currentLanguage, { path: "/" });
    }, [currentLanguage, cookies.i18next, setCookie]);
  }
  return ret;
}
