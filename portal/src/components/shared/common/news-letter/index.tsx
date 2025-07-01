"use server";
import React from "react";
import { HomePageApis } from "@/services/api/page-services/home-page";
import { NewsLetter } from "@/components/forms/newsletters";

export const NewsLetterSection = async ({ lang }: { lang: string }) => {
  const { data } = await HomePageApis.get({
    queryParams: {
      fields: ["newsletter_title", "newsletter_intro"],
      populate: {
        newsletter_image: true,
      },
      locale: lang,
    },
  });

  const { newsletter_title, newsletter_intro, newsletter_image } = data;

  return (
    <div className="overflow-hidden">
      <NewsLetter
        title={newsletter_title}
        intro={newsletter_intro}
        image={newsletter_image}
        lang={lang}
      />
    </div>
  );
};
