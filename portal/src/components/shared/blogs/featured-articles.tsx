"use client";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import { CustomImage } from "@/components/controls";
import { routes } from "@/config";
import { getMediaInfo, getStrapiData } from "@/utils";
import Link from "next/link";
import { CiImageOff } from "react-icons/ci";
import moment from "moment";
import { BlogSwiper } from "@/components/ui";
import BlogModel from "@/services/api/collections/blogs/model";
import { useTranslation } from "@/i18n/client";

interface Props {
  blogs: BlogModel[];
  featured_intro: string;
  lang: string;
}

export const FeaturedArticles: FC<Props> = ({
  blogs,
  featured_intro,
  lang,
}) => {
  const { t } = useTranslation("common", lang);

  return (
    <section className="bg-white overflow-hidden">
      <div className="container w-full h-full py-16">
        <FadeAnimation direction="left">
          <div className="flex flex-col justify-center mb-10">
            <h2 className="title">{t("titles.featured_articles")}</h2>
            <p className="subtitle">{featured_intro}</p>
          </div>
        </FadeAnimation>

        <BlogSwiper>
          {blogs.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <FeatureItem item={item} lang={lang} />
              </SwiperSlide>
            );
          })}
        </BlogSwiper>
      </div>
    </section>
  );
};

const FeatureItem = ({ item, lang }: any) => {
  const { title, slug, author, date, category, main_image } = item;

  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  return (
    <div className="flex flex-col md:flex-row gap-x-8 gap-y-6 group w-full lg:h-[400px]">
      <div className="w-full md:w-5/12 lg:w-6/12">
        {imgUrl ? (
          <Link href={routes.blogs(slug, lang)}>
            <CustomImage
              src={imgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-full lg:h-[400px] object-cover rounded-2xl transition-all duration-300"
            />
          </Link>
        ) : (
          <div className="grid place-content-center h-full lg:h-[400px] aspect-square bg-gray-200 rounded-b-2xl group-hover:rounded-b-none rounded-t-2xl transition-all duration-300">
            <CiImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <div className="w-full md:w-7/12 lg:w-6/12 flex flex-col justify-center py-2 md:py-4 px-4 group-hover:bg-white transition-all duration-300 rounded-b-2xl">
        {/* <span className="text-sm text-primary uppercase py-2 font-medium">
          {category}
        </span> */}
        <Link href={routes.blogs(slug, lang)}>
          <h2 className="text-secondary leading-relaxed text-2xl sm:text-3xl lg:text-4xl font-bold my-2">
            {title}
          </h2>
        </Link>
        <span className="text-sm text-mediumGray mt-4">
          {author && <span className="mx-4">{author}|</span>}
          {moment(date).format("MMM DD, yyyy")}
        </span>
      </div>
    </div>
  );
};
