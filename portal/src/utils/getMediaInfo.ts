
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const formatImageURL = (relativePath: string | undefined): string => {
  if (!relativePath) {
    return "";
  }
  return `${BASE_IMAGE_URL}${relativePath}`;
};

export const getMediaInfo = (
  img: any
): {
  imgUrl: string;
  name: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  size: number;
  mime: string;
  ext: string;
} => {
  let item = img?.data?.attributes;
  if (!item) item = img?.attributes;
  if (!item) item = img;

  return (
    (item && {
      imgUrl: formatImageURL(item?.url),
      name: item?.name,
      alt:
        item?.alternativeText ||
        item?.caption ||
        item?.name?.toString().replace(item?.ext, ""),
      caption: item?.caption,
      width: item?.width ?? 400,
      height: item?.height ?? 400,
      size: item?.size,
      mime: item?.mime,
      ext: item?.ext,
    }) ||
    {}
  );
};
