"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { Swiper } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface LogoSwiperProps {
  children: React.ReactNode;
  options?: any;
  className?: string;
  paginationClassName?: string;
  loop?: boolean;
  centered?: boolean;
}

export const LogoSwiper = ({
  children,
  options,
  className,
  paginationClassName,
  loop,
  centered,
}: LogoSwiperProps) => {
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      const startAutoScroll = () => {
        if (swiper.isEnd) {
          swiper.setTranslate(0);
          swiper.autoplay.start(); // Start autoplay again when reaching the end
        }
      };

      swiper.autoplay.start(); // Ensure autoplay starts when swiper is mounted

      swiper.on("slideChange", () => {
        if (swiper.isEnd) {
          startAutoScroll(); // Call this when the swiper reaches the end
        }
      });

      return () => {
        swiper.off("slideChange"); // Clean up the event listener
      };
    }
  }, [swiper]);

  return (
    <div className={cn("relative w-full h-[30vh]", className)}>
      <Swiper
        loop={loop || false}
        onSwiper={setSwiper}
        grabCursor={true}
        slidesPerView={2.5}
        centerInsufficientSlides={centered || false}
        spaceBetween={80}
        modules={[Pagination, Navigation, Autoplay, FreeMode]}
        style={{ width: "100%", height: "100%" }}
        freeMode={true}
        autoplay={{ delay: 1, disableOnInteraction: false }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 80,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 80,
          },
        }}
        {...options}
      >
        {children}
      </Swiper>
    </div>
  );
};
