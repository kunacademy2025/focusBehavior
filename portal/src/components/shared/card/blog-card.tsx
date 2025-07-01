import { CustomImage } from "@/components/controls";
import { formatDate, getMediaInfo } from "@/utils";
import { CiImageOff } from "react-icons/ci";
import React from "react";
import Link from "next/link";
import { routes } from "@/config";
import BlogModel from "@/services/api/collections/blogs/model";

export const BlogCard = ({
  title,
  slug,
  main_image,
  date,
  category,
  lang,
}: BlogModel) => {
  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  return (
    <>
      <div className="group w-full">
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
          <Link href={routes.blogs(slug, lang)}>
            <>
              {main_image ? (
                <CustomImage
                  src={imgUrl}
                  alt={alt}
                  width={width}
                  height={height}
                  className="w-full aspect-square object-cover rounded-2xl transition-all duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="grid place-content-center w-full h-full aspect-square bg-gray-200 rounded-b-2xl group-hover:rounded-b-none rounded-t-2xl transition-all duration-300">
                  <CiImageOff className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </>
          </Link>
        </div>
        <div className="flex flex-col py-4 px-4 group-hover:bg-white transition-all duration-300 rounded-b-2xl">
          {/* {category && (
            <span className="text-sm text-primary uppercase">{category}</span>
          )} */}
          {date && (
            <span className="text-secondary text-sm mt-2">
              <i className={`fa-regular fa-calendar text-primary fa-lg ltr:mr-2 rtl:ml-2`} />
              {formatDate(date)}
            </span>
          )}
          <Link href={routes.blogs(slug, lang)}>
            <h4 className="text-black text-sm sm:text-base hover:text-primary transition font-bold my-2">
              {title}
            </h4>
          </Link>
        </div>
      </div>
    </>
  );
};
