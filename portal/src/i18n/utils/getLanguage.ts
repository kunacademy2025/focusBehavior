"use server";
import { fallbackLng, languages } from "@/i18n/settings";
import { headers } from "next/headers";

export async function getLanguage(requestLang?: string) {
  const langFromHeader = (await headers()).get("x-i18n-lang");

  const lang =
    requestLang && languages.includes(requestLang)
      ? requestLang
      : langFromHeader && languages.includes(langFromHeader)
      ? langFromHeader
      : fallbackLng;

  return lang || requestLang;
}
