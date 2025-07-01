import { cn, getMediaInfo, getStrapiData, parseContent } from "@/utils";
import { FC } from "react";
import { CustomImage } from "@/components/controls";
import { ContentColumnsModel } from "@/models/dynamic.model";

interface Props {
  options: ContentColumnsModel;
}

const DynamicContentColumns: FC<Props> = ({ options }) => {
  const { title, items=[], gray_bg, hide_title } = getStrapiData(options);

  return (
    <section className={cn(gray_bg ? "bg-veryLightGray" : "bg-white")}>
      <div className={cn("relative overflow-hidden")}>
        <div
          className={cn(
            "container w-full h-full py-16 overflow-hidden"
          )}
        >
          {/* Content */}
          <div className={cn("w-full")}>
            <div className="flex flex-col justify-center mb-6">
              {title && !hide_title && <h2 className="title">{title}</h2>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {Array.isArray(items) &&
                items?.map((item: any, index: number) => (
                  <ContentItem key={index} item={item} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicContentColumns;

const ContentItem = ({ item }: any) => {
  const { title, brief, icon, image } = getStrapiData(item);

  const { imgUrl, alt, width, height } = getMediaInfo(image);
  const {
    imgUrl: iconUrl,
    alt: iconAlt,
    width: iconWidth,
    height: iconHeight,
  } = getMediaInfo(icon);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <CustomImage
          src={imgUrl}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
          <CustomImage
            src={iconUrl}
            alt={iconAlt}
            width={iconWidth}
            height={iconHeight}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          <h3 className="text-white font-semibold text-3xl">{title}</h3>
        </div>
      </div>
      {brief && (
        <div className="text-base text-secondary  gap-y-2">{brief}</div>
      )}
    </div>
  );
};
