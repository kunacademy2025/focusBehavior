"use server";
import TestimonialModel from "@/services/api/collections/testimonials/model";
import { TestimonialsList } from "./testimonials-list";
import { getTranslation } from "@/i18n";

export const Testimonials = async ({
  testimonials,
  intro,
  lang,
}: {
  testimonials: TestimonialModel[];
  intro: string;
  lang: string;
}) => {
  const midpoint = Math.ceil(testimonials.length / 2);
  const firstHalf = testimonials.slice(0, midpoint);
  const secondHalf = testimonials.slice(midpoint);

  const { t } = await getTranslation("common", lang);

  return (
    <section dir="ltr" className="bg-veryLightGray py-12">
      <div dir={lang === "en" ? "ltr" : "rtl"} className="mb-8 container">
        <h2 className="title">{t("titles.testimonials")}</h2>
        <p className="subtitle">{intro}</p>
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="flex items-center mb-4">
          <TestimonialsList
            testimonials={firstHalf}
            duration={125}
            lang={lang}
          />
          <TestimonialsList
            testimonials={firstHalf}
            duration={125}
            lang={lang}
          />
          <TestimonialsList
            testimonials={firstHalf}
            duration={125}
            lang={lang}
          />
        </div>
        <div className="flex items-center mb-4">
          <TestimonialsList
            testimonials={secondHalf}
            duration={75}
            reverse
            lang={lang}
          />
          <TestimonialsList
            testimonials={secondHalf}
            duration={75}
            reverse
            lang={lang}
          />
          <TestimonialsList
            testimonials={secondHalf}
            duration={75}
            reverse
            lang={lang}
          />
        </div>
      </div>
    </section>
  );
};
