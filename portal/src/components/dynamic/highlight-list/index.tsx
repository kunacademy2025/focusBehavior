import { FC } from "react";
import { cn, getMediaInfo, getStrapiData } from "@/utils";
import { CustomImage } from "@/components/controls";
import { HighlightListModel } from "@/models/dynamic.model";

interface Props {
  options: HighlightListModel;
}

const DynamicHighlight: FC<Props> = ({ options }) => {
  const { title, items = [], gray_bg, hide_title } = getStrapiData(options);

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
            {title && !hide_title && (
              <div className={"mb-10"}>
                <div className="flex flex-col justify-center">
                  <h2 className="capitalize text-xl lg:text-3xl leading-normal text-primary">
                    {title}
                  </h2>
                </div>
              </div>
            )}
            <div
              className={
                "grid grid-cols-1 lg:grid-cols-5 items-center flex-wrap gap-4"
              }
            >
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

export default DynamicHighlight;

const ContentItem = ({ item }: any) => {
  const { title, brief, icon } = getStrapiData(item);

  const { imgUrl, alt, width, height } = getMediaInfo(icon);

  return (
    <div className="flex flex-col justify-center items-center p-2 gap-y-4">
      <CustomImage
        src={imgUrl}
        alt={alt}
        width={width}
        height={height}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />

      <div className="flex flex-col gap-y-4 items-center justify-center">
        {title && <h4 className="text-lg font-bold text-secondary">{title}</h4>}
        {brief && <p className="text-sm text-center">{brief}</p>}
      </div>
    </div>
  );
};
