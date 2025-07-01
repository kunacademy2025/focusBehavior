"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PixelTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pixelId = "983297377096000";

    // Dynamic import to avoid SSR error
    import("react-facebook-pixel")
      .then((ReactPixel) => {
        ReactPixel.default.init(pixelId);
        ReactPixel.default.pageView();
      })
      .catch((err) => {
        console.error("Failed to load Facebook Pixel:", err);
      });
  }, [pathname, searchParams]);

  return null;
};
export default PixelTracker;
