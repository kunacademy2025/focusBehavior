"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { cookieName, fallbackLng } from "@/i18n/settings";

interface LanguageContextProps {
  lang: string;
  setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({
  initialLang,
  children,
}: {
  initialLang: string;
  children: React.ReactNode;
}) => {
  const [cookies, setCookie] = useCookies([cookieName]);
  const [lang, setLang] = useState(initialLang ?? fallbackLng);

  useEffect(() => {
    if (cookies.i18next !== lang) {
      setCookie(cookieName, lang, { path: "/" });
    }
  }, [lang, cookies.i18next, setCookie]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
