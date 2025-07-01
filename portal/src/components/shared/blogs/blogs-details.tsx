"use server";
import { getMediaInfo, getStrapiData } from "@/utils";
import { Link } from "@nextui-org/react";
import React, { FC } from "react";
import { DynamicZoneComponent } from "@/components/dynamic";
import moment from "moment";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa6";
import BlogModel from "@/services/api/collections/blogs/model";
import { ShareButton } from "@/components/ui/share-button";
import { CustomImage } from "@/components/controls";
import { routes } from "@/config";
import { getLanguage } from "@/i18n/utils/getLanguage";

interface Props {
  data: BlogModel;
}

export const BlogsDetails: FC<Props> = async ({ data }) => {
  const lang = await getLanguage();
  const { title, main_image, author, date, category, content } = data;

  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  return (
    <article className="bg-white">
      <div className=" bg-veryLightGray py-8">
        <div className="container lg:max-w-6xl flex items-center justify-between">
          <h2 className="flex items-center gap-x-2 font-bold text-2xl mb-10 relative">
            <BackButton url={routes.blogs("", lang)} />
            <span>{title}</span>
          </h2>
          <div className="flex flex-col items-end gap-y-2">
            <ShareButton title={title} />
            <span className="text-sm text-mediumGray uppercase">
              {author && <span className="mx-2">{author} |</span>}
              {moment(date).format("MMM DD, yyyy")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-20">
        <section className="w-full container lg:max-w-6xl text-justify gap-20">
          <div className="bg-white flex flex-col gap-y-10">
            <div className="relative w-full h-full max-h-96 aspect-auto bg-white rounded-lg overflow-hidden">
              {imgUrl && (
                <CustomImage
                  src={imgUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full h-full aspect-auto object-contain object-center"
                />
              )}
            </div>
          </div>
          <div className="mt-8">
            {content?.map((item: any, index: number) => (
              <div key={index} id={`section${item.id.toString()}`}>
                <DynamicZoneComponent content={[item]} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};

const BackButton = ({ url }: { url: string }) => {
  return (
    <Link href={url} className="text-primary hover:text-secondary">
      <FaChevronLeft className="rtl:-scale-x-100" />
    </Link>
  );
};
