"use client";
import { useEffect, useState } from "react";
import { cn } from "@/utils";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { SwiperPagination } from "./pagination-button";
import React from "react";
import { usePrevNextButtons } from "./arrow-button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
  options?: any;
  className?: string;
  paginationClassName?: string;
}

export const BlogSwiper = ({
  children,
  options,
  className,
  paginationClassName,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [numberOfBullets, setNumberOfBullets] = useState(0);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(swiper);
  const slidesCount = React.Children.toArray(children).length;

  useEffect(() => {
    if (swiper) {
      const totalSlides = swiper.slides.length;
      setNumberOfBullets(Math.ceil(totalSlides / slidesPerView));
    }
  }, [slidesPerView, swiper]);

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
        slidesPerView={2}
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
        {...options}
      >
        {children}
      </Swiper>
      {slidesCount > 1 && (
        <>
          <button
            className={cn(
              `absolute top-1/2 transform -translate-y-1/2 z-10 left-2 md:left-4`,
              "bg-white hover:bg-primary text-primary border-2 border-gray-200 hover:border-primary hover:text-white",
              "inline-flex items-center justify-center focus:outline-none",
              "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full transition duration-300"
            )}
            type="button"
            onClick={onPrevButtonClick}
          >
            <FiChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
          <button
            className={cn(
              `absolute top-1/2 transform -translate-y-1/2 z-10 right-2 md:right-4`,
              "bg-white hover:bg-primary text-primary border-2 border-gray-200 hover:border-primary hover:text-white",
              "inline-flex items-center justify-center focus:outline-none",
              "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full transition duration-300"
            )}
            type="button"
            onClick={onNextButtonClick}
          >
            <FiChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        </>
      )}
      <div
        className={cn(
          "h-12 w-fit ml-auto items-center justify-end inset-x-0 z-10 block mx-auto",
          paginationClassName
        )}
      >
        <SwiperPagination
          activeIndex={activeIndex}
          numberOfBullets={numberOfBullets}
          goToSlide={goToSlide}
        />
      </div>
    </div>
  );
};
