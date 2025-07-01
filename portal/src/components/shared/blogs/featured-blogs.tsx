"use client";
import { BlogCard } from "../card/blog-card";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { CarouselSwiper } from "@/components/ui";
import { SwiperSlide } from "swiper/react";
import BlogModel from "@/services/api/collections/blogs/model";
import { useTranslation } from "@/i18n/client";

export const FeaturedBlogs = ({
  blogs,
  intro,
  lang,
}: {
  blogs: BlogModel[];
  intro: string;
  lang: string;
}) => {
  const { t } = useTranslation("common", lang);
  return (
    <section className="bg-veryLightGray overflow-hidden">
      <div className="bg-white">
        <div className="container w-full h-full py-16 overflow-hidden">
          <FadeAnimation direction="left">
            <div className="flex flex-col justify-center mb-6">
              <h2 className="title">{t("titles.explore_blogs")}</h2>
              <p className="subtitle">{intro}</p>
            </div>
          </FadeAnimation>

          <CarouselSwiper>
            {blogs?.map((item: BlogModel, index: number) => (
              <SwiperSlide key={index}>
                <FadeAnimation direction="up" delay={0.1 * index}>
                  <BlogCard {...item} lang={lang} />
                </FadeAnimation>
              </SwiperSlide>
            ))}
          </CarouselSwiper>
        </div>
      </div>
    </section>
  );
};
