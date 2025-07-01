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

export type MetadataWithJsonLD = {
  metadata: Metadata;
  jsonLD: any;
};

export const formatSEO = ({
  strapiSEOObject,
  lang,
  currentUrl,
}: {
  strapiSEOObject: any;
  lang?: string;
  currentUrl?: string;
}): MetadataWithJsonLD => {
  lang = lang || fallbackLng;

  const siteUrl = SITE_URL;
  const siteNameEn = SITE_NAME_EN;
  const siteNameAr = SITE_NAME_AR;
  const shortSiteNameEn = SHORT_SITE_NAME_EN;
  const shortSiteNameAr = SHORT_SITE_NAME_AR;

  const defaultReturn = { metadata: { title: "" }, jsonLD: null };

  if (!strapiSEOObject || typeof strapiSEOObject !== "object")
    return defaultReturn;

  const {
    metaTitle,
    metaDescription,
    metaImage,
    keywords,
    structuredData,
    canonicalURL,
  } = strapiSEOObject;

  const robots = {
    index: true,
    follow: true,
  };

  const { imgUrl, alt, width, height } = getMediaInfo(metaImage);

  let openGraph = {};

  openGraph = {
    title: metaTitle,
    description: metaDescription,
    images: [{ url: imgUrl, width, height, alt }],
  };

  let twitter = {};

  twitter = {
    title: metaTitle,
    description: metaDescription,
    images: [{ url: imgUrl, width, height, alt }],
  };

  const metadata: Partial<Metadata> = {};

  if (metaTitle)
    metadata.title =
      metaTitle.includes(shortSiteNameEn) || metaTitle.includes(shortSiteNameAr)
        ? metaTitle
        : `${metaTitle} | ${lang === "ar" ? siteNameAr : siteNameEn}`;
  if (metaDescription) metadata.description = metaDescription;
  if (keywords && keywords.length > 0) metadata.keywords = keywords;
  if (robots) metadata.robots = robots;
  if (openGraph) metadata.openGraph = openGraph;
  if (twitter) metadata.twitter = twitter;

  metadata.metadataBase = new URL(siteUrl);

  if (canonicalURL) metadata.alternates = { canonical: canonicalURL };
  else if (currentUrl) metadata.alternates = { canonical: currentUrl };

  return {
    metadata: metadata as Metadata,
    jsonLD: generateJsonLD(structuredData),
  };
};

export const generateJsonLD = (structuredData: any) => {
  if (!structuredData) return null;
  return (
    <Script
      id={"jsonLDScript"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
