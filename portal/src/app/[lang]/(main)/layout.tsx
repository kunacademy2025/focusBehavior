import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import "@/assets/styles/styles.css";
import { dir } from "i18next";
import Script from "next/script";
import { Wrapper } from "@/components/shared/layouts";
import { cn } from "@/utils";
import { Poppins, Noto_Naskh_Arabic, Cairo } from "next/font/google";
import AuthProvider from "@/auth/auth-provider";
import { isAuthorized } from "@/auth";
import { AppProvider } from "@/context";
import { LanguageProvider } from "@/i18n/utils/LanguageContext";
import { Suspense } from "react";
import PixelTracker from "@/components/controls/facebook-pixel/PixelTracker";
import Head from "next/head";

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
  description: "",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Params;
  children: React.ReactNode;
}>) {
  const { lang } = await params;
  const [session] = await Promise.all([isAuthorized()]);

  return (
    <html lang={lang} dir={dir(lang)}>
      <Head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '983297377096000');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=983297377096000&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </Head>
      <body
        className={cn(
          lang === "ar" ? cairoArabic.className : poppins.className,
          `antialiased`
        )}
      >
        <AuthProvider session={session}>
          <AppProvider user={session}>
            <LanguageProvider initialLang={lang}>
              <Wrapper lang={lang}>{children}</Wrapper>
            </LanguageProvider>
          </AppProvider>
        </AuthProvider>

        {/* Facebook Pixel */}
        <Suspense fallback={null}>
          <PixelTracker />
        </Suspense>
      </body>
      <Script
        src="https://kit.fontawesome.com/35a2495988.js"
        crossOrigin="anonymous"
      />
    </html>
  );
}
