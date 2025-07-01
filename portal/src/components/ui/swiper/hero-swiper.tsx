"use client";

import React, { useState } from "react";
import { cn } from "@/utils";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { usePrevNextButtons } from "./arrow-button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
  options?: any;
  className?: string;
}

export const HeroSwiper = ({ children, options, className }: Props) => {
  const [swiper, setSwiper] = useState<any>(null);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(swiper);

  const slidesCount = React.Children.toArray(children).length;

  const swiperOptions = {
    loop: slidesCount > 1,
    effect: "fade",
    grabCursor: true,
    slidesPerView: 1,
    autoplay: { delay: 5000, disableOnInteraction: false },
    modules: [Pagination, Navigation, EffectFade, Autoplay],
    style: { width: "100%", height: "100%" },
    ...options,
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Swiper {...swiperOptions} onSwiper={setSwiper}>
        {children}
      </Swiper>
      {slidesCount > 1 && (
        <>
          <button
            className={cn(
              `absolute top-1/2 transform -translate-y-1/2 z-10 left-2 md:left-4`,
              "bg-white hover:bg-opacity-0 text-primary border-2 border-white hover:text-white hover:opacity-80",
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
              "bg-white hover:bg-opacity-0 text-primary border-2 border-white hover:text-white hover:opacity-80",
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
    </div>
  );
};
