import { routes } from "@/config";
import Link from "next/link";
import { useMemo } from "react";
import { highlightText } from "./highlightText";
import { MediaModel } from "@/models/media.model";
import { cn, getMediaInfo } from "@/utils";
import { CustomImage } from "@/components/controls";

interface ResultCardProps {
  result: {
    title: string;
    slug: string;
    image: MediaModel;
    type: "blogs" | "events"; // enforce valid types
  };
  searchTerm: string;
  handleClose: () => void;
}

export const ResultCard = ({
  result,
  searchTerm,
  handleClose,
}: ResultCardProps) => {
  const path = useMemo(() => {
    switch (result.type) {
      case "blogs":
        return routes.blogs(result.slug);
      case "events":
        return routes.events(result.slug);
      default:
        return "#"; // fallback path
    }
  }, [result.type, result.slug]);

  const { imgUrl, alt, width, height } = useMemo(
    () => getMediaInfo(result.image),
    [result.image]
  );

  return (
    <li className="group transition duration-300">
      <Link href={path} onClick={handleClose}>
        <div
          className={cn(
            !result.image &&
              "h-24 bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition-all"
          )}
        >
          {result.image && (
            <div className="overflow-hidden aspect-[4/3]">
              <CustomImage
                src={imgUrl}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
              />
            </div>
          )}
          <h3 className="font-medium text-sm text-white mt-2">
            {highlightText(result.title, searchTerm)}
          </h3>
        </div>
      </Link>
    </li>
  );
};
