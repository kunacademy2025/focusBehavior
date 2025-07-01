import { useMemo } from "react";

import { getMediaInfo } from "@/utils/";
import { useIsMobile } from "@/hooks";

export const useResponsiveImage = (desktopImage: any, mobileImage: any) => {
  const isMobile = useIsMobile();
  const image = useMemo(() => {
    if (isMobile && mobileImage) return getMediaInfo(mobileImage);
    return getMediaInfo(desktopImage);
  }, [isMobile, desktopImage, mobileImage]);
  return image;
};
