"use client";

import { useEffect, useState } from "react";
import { BulletPagination } from ".";
import { cn } from "@/utils";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface Props {
  children: React.ReactNode;
  options?: any;
  className?: string;
  paginationClassName?: string;
}

export const CarouselSwiper = ({
  children,
  options,
  className,
  paginationClassName,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [numberOfBullets, setNumberOfBullets] = useState(0);

  useEffect(() => {
    if (swiper) {
      // Update the number of slides per view based on Swiper's current properties
      const updateSlidesPerView = () => {
        setSlidesPerView(swiper.params.slidesPerView || 1);
        const totalSlides = swiper.slides.length;
        setNumberOfBullets(Math.ceil(totalSlides / slidesPerView));
      };

      updateSlidesPerView();

      // Listen for window resize or breakpoint change
      swiper.on("breakpoint", updateSlidesPerView);

      // Cleanup listener on component unmount or swiper instance change
      return () => {
        if (swiper) {
          swiper.off("breakpoint", updateSlidesPerView);
        }
      };
    }
  }, [swiper, slidesPerView]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (swiper) {
      swiper.slideTo(index * slidesPerView);
    }
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Swiper
        loop={false}
        onSwiper={setSwiper}
        effect={"fade"}
        grabCursor={true}
        slidesPerView={1}
        slidesPerGroupAuto
        spaceBetween={24}
        modules={[Pagination, Navigation, Autoplay]}
        onSlideChange={(e) =>
          setActiveIndex(Math.ceil(e.realIndex / slidesPerView))
        }
        style={{ width: "100%", height: "100%" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        {...options}
      >
        {children}
      </Swiper>
      <div className={cn("h-10  inset-x-0 z-10", paginationClassName)}>
        <BulletPagination
          activeIndex={activeIndex}
          numberOfBullets={numberOfBullets}
          goToSlide={goToSlide}
        />
      </div>
    </div>
  );
};
