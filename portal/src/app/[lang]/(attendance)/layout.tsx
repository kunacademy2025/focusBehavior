import React from "react";
import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import "@/assets/styles/styles.css";
import { dir } from "i18next";
import { cn } from "@/utils";
import { Poppins, Noto_Naskh_Arabic, Cairo } from "next/font/google";
import AuthProvider from "@/auth/auth-provider";
import { isAuthorized } from "@/auth";
import { AppProvider } from "@/context";
import { LanguageProvider } from "@/i18n/utils/LanguageContext";
import { Toaster } from "react-hot-toast";

type Params = Promise<{ lang: string }>;

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const cairoArabic = Cairo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-naskh-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Focus Behavior",
};

export default async function layout({
  children,
  params,
}: Readonly<{
  params: Params;
  children: React.ReactNode;
}>) {
  const { lang } = await params;
  const session = await isAuthorized();

  return (
    <html lang={lang} dir={dir(lang)}>
      <body
        className={cn(
          lang === "ar" ? cairoArabic.className : poppins.className,
          `antialiased`
        )}
      >
        <Toaster />
        <AuthProvider session={session}>
          <AppProvider user={session}>
            <LanguageProvider initialLang={lang}>
              <section>{children}</section>;
            </LanguageProvider>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
