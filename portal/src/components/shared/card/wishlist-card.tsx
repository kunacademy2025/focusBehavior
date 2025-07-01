import { CustomImage } from "@/components/controls";
import { routes } from "@/config";
import { useWishlist } from "@/context/wishlist.context";
import { useUserInfo } from "@/hooks";
import { getMediaInfo, getStrapiData, getStrapiId } from "@/utils";
import Link from "next/link";
import { useEffect } from "react";
import { CiImageOff } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export const WishlistCard = ({ item, lang }: any) => {
  const { user } = useUserInfo();
  const {
    title,
    type,
    main_image,
    date,
    private_content,
    price,
    video_url,
    slug,
    brief,
    location,
  } = getStrapiData(item);
  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  const courseId = getStrapiId(item);

  const { fetchWishlist, toggleCourseInWishlist, isCourseInWishlist } =
    useWishlist();

  useEffect(() => {
    if (user?.id) {
      fetchWishlist(user.id);
    }
  }, [user]);

  const handleToggleWishlist = async () => {
    await toggleCourseInWishlist(user.id, courseId);
  };

  const isInWishlist = isCourseInWishlist(courseId);

  return (
    <div className="flex p-4 bg-white rounded-2xl shadow-sm border border-gray-200 items-center justify-between group w-full">
      <div className="flex items-center gap-4">
        {main_image?.data ? (
          <Link href={routes.events(slug, lang)}>
            <CustomImage
              src={imgUrl}
              alt={alt}
              width={width}
              height={height}
              className="w-full h-28 aspect-square object-cover rounded-b-2xl rounded-t-2xl transition-all duration-300"
            />
          </Link>
        ) : (
          <div className="grid place-content-center w-full h-full aspect-square bg-gray-200 rounded-b-2xl rounded-t-2xl transition-all duration-300">
            <CiImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="flex flex-col h-28 py-4 px-4 transition-all duration-300 rounded-b-2xl">
          <span className="text-sm text-primary uppercase">{type}</span>
          <Link href={routes.events(slug, lang)}>
            <h4 className="text-darkGray line-clamp-2 text-sm sm:text-base font-bold mt-2">
              {title}
            </h4>
          </Link>
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-center justify-center">
        <button
          title="Add to Wish List"
          type="button"
          onClick={handleToggleWishlist}
        >
          {isInWishlist ? (
            <FaStar className="text-primary w-8 h-8" />
          ) : (
            <FaRegStar className="text-primary w-8 h-8" />
          )}
        </button>
      </div>
    </div>
  );
};
