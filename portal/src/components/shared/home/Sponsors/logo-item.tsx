import { MaskedIcon } from "@/components/ui";
import { MediaModel } from "@/models/media.model";
import { getMediaInfo } from "@/utils";

export const LogoItem = ({
  image,
  title,
}: {
  image: MediaModel;
  title: string;
}) => {
  const { imgUrl } = getMediaInfo(image);

  return (
    <span className="flex items-center justify-center gap-4 px-4 py-2 md:py-4">
      <MaskedIcon
        imgUrl={imgUrl}
        className="w-10 h-10 bg-primary md:w-12 md:h-12"
        full={true}
      />
      <span className="whitespace-nowrap text-xl font-semibold uppercase md:text-2xl">
        {title}
      </span>
    </span>
  );
};
