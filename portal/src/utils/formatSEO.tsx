import type { Metadata } from "next";

import {
  SITE_URL,
  SITE_NAME_EN,
  SITE_NAME_AR,
  SHORT_SITE_NAME_EN,
  SHORT_SITE_NAME_AR,
} from "@/config/constants";
import { fallbackLng } from "@i18n/settings";
import { getMediaInfo } from "@/utils";
import Script from "next/script";
import { JSX } from "react";
import { SeoModel } from "@/models/seo.model";
import { MediaModel } from "@/models/media.model";

export type MetadataWithJsonLD = {
  metadata: Metadata;
  jsonLD: JSX.Element | null;
};

export const formatSEO = ({
  seo,
  lang,
  currentUrl,
}: {
  seo: SeoModel | null;
  lang?: string;
  currentUrl?: string;
}): MetadataWithJsonLD => {
  lang = lang || fallbackLng;

  if (!seo)
    return {
      metadata: {
        title: generateTitle("", lang),
      },
      jsonLD: null,
    };

  if (!isValidSEOObject(seo)) return getDefaultSEO();

  const {
    metaTitle,
    metaDescription,
    metaImage,
    keywords,
    structuredData,
    canonicalURL,
  } = seo;

  const metadata: Partial<Metadata> = {
    title: generateTitle(metaTitle, lang),
    description: metaDescription || "",
    keywords: keywords?.length > 0 ? keywords : undefined,
    robots: { index: true, follow: true },
    openGraph: generateSocialMetadata(metaTitle, metaDescription, metaImage),
    twitter: generateSocialMetadata(metaTitle, metaDescription, metaImage),
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalURL || currentUrl },
  };

  return {
    metadata: metadata as Metadata,
    jsonLD: generateJsonLD(structuredData),
  };
};

const isValidSEOObject = (seoObject: unknown): boolean =>
  !!seoObject && typeof seoObject === "object" && !Array.isArray(seoObject);

const getDefaultSEO = (): MetadataWithJsonLD => ({
  metadata: { title: "" },
  jsonLD: null,
});

const generateTitle = (metaTitle: string, lang: string): string =>
  metaTitle?.includes(SHORT_SITE_NAME_EN) ||
  metaTitle?.includes(SHORT_SITE_NAME_AR)
    ? metaTitle
    : metaTitle
    ? `${metaTitle} | ${lang === "ar" ? SITE_NAME_AR : SITE_NAME_EN}`
    : lang === "ar"
    ? SITE_NAME_AR
    : SITE_NAME_EN;

const generateSocialMetadata = (
  title: string,
  description: string,
  image: MediaModel
): Partial<Metadata["openGraph"]> => {
  const { imgUrl, alt, width, height } = getMediaInfo(image);
  return {
    title,
    description,
    images: imgUrl ? [{ url: imgUrl, width, height, alt }] : undefined,
  };
};

export const generateJsonLD = (
  structuredData: Record<string, unknown>
): JSX.Element | null => {
  if (!structuredData) return null;
  return (
    <Script
      id={"jsonLDScript"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
