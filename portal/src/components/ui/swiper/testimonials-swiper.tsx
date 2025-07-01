"use client";

import { useState } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from ".";
import { cn } from "@/utils";

import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface TestimonialSwiperProps {
  children: React.ReactNode;
  options?: any;
  className?: string;
  paginationClassName?: string;
  activeIndex?: number;
  setActiveIndex: (index: number) => void;
}

export const TestimonialsSwiper = ({
  children,
  options,
  className,
  paginationClassName,
  setActiveIndex,
}: TestimonialSwiperProps) => {
  const [swiper, setSwiper] = useState<any>(null);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(swiper);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Swiper
        loop={true}
        onSwiper={setSwiper}
        grabCursor={true}
        slidesPerView={1}
        centeredSlides={true}
        modules={[Pagination, Navigation, Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ width: "100%", height: "100%" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        {...options}
      >
        {children}
      </Swiper>
      <div className="flex items-center justify-center gap-x-2 my-6">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};
