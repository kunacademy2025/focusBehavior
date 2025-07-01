import { cn, getMediaInfo, getStrapiData } from "@/utils";
import { CustomImage } from "@/components/controls/custom-image";
import { CiImageOff } from "react-icons/ci";
import { PlayButton } from "./play-button";
import { MediaBlockModel } from "@/models/dynamic.model";

export default function DynamicMediaBlock({
  options,
}: {
  options: MediaBlockModel;
}) {
  const { title, hide_title, media, cover, video_url } = getStrapiData(options);
  const {
    imgUrl: initialCoverImgUrl,
    width,
    height,
    alt,
  } = getMediaInfo(cover) || {};

  const { imgUrl: videoUrl } = getMediaInfo(media);
  const targetVideoUrl = video_url || videoUrl;

  return (
    <div className="container py-10">
      {!hide_title && title && (
        <h2 className="text-2xl font-bold text-left mb-6">{title}</h2>
      )}
      <div className="relative bg-white rounded-2xl overflow-hidden cursor-pointer">
        <>
          {initialCoverImgUrl ? (
            <CustomImage
              src={initialCoverImgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full rounded-2xl transition-all duration-300"
            />
          ) : (
            <div className="grid place-content-center w-full h-full aspect-square bg-gray-200 rounded-b-2xl group-hover:rounded-b-none rounded-t-2xl transition-all duration-300">
              <CiImageOff className="w-8 h-8 text-gray-400" />
            </div>
          )}
          {targetVideoUrl && (
            <div
              className={cn(
                "absolute inset-0 bg-black bg-opacity-15",
                "flex items-center justify-center "
              )}
            >
              <PlayButton url={targetVideoUrl} />
            </div>
          )}
        </>
      </div>
    </div>
  );
}
