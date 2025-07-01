"use server";
import { BackToTop } from "@/components/ui/back-to-top";
import React from "react";
import { Header } from "./header";
import { Providers } from "@/components/providers";
import { Footer } from "./footer";
import { FloatingWhatsapp } from "@/components/ui";
import { Toaster } from "react-hot-toast";
import { CountryDetect } from "@/utils";
import { LanguageSwitch } from "./language-switcher";
import { fallbackLng } from "@/i18n/settings";
import { NewsLetterSection } from "../common";
import { BookingProvider } from "@/context/booking.context";
import { HomePageApis } from "@/services/api/page-services/home-page";

interface WrapperProps {
  children: React.ReactNode;
  lang?: string;
}

export const Wrapper: React.FC<WrapperProps> = async ({ children, lang }) => {
  const currentLang = lang ?? fallbackLng;

  const { data: homeData } = await HomePageApis.get({
    queryParams: {
      fields: ["floating_whatsapp_url"],
      locale: lang,
    },
  });

  const { floating_whatsapp_url } = homeData;

  return (
    <div>
      <Providers>
        <CountryDetect />
        <BackToTop />
        <FloatingWhatsapp whatsapp_link={floating_whatsapp_url} />
        <Toaster />
        <Header lang={currentLang} />
        <LanguageSwitch lang={currentLang} />
        <BookingProvider>
          <main className="max-w-[100vw] min-h-screen">{children}</main>
        </BookingProvider>
        <NewsLetterSection lang={currentLang} />
        <Footer lang={currentLang} />
      </Providers>
    </div>
  );
};
