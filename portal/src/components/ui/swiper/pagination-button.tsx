"use client";

import { cn } from "@/utils";

export const SwiperPagination = ({
  activeIndex,
  numberOfBullets,
  goToSlide,
}: any) => {
  return (
    <div className="container w-full h-full flex items-center justify-start gap-x-1 caret-transparent">
      {Array.from({ length: numberOfBullets }).map((_, index) => (
        <div key={index} className="group px-[2px] py-2 cursor-pointer">
          <div
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-primary" : "w-4 bg-lightGray"
            } group-hover:w-8 group-hover:bg-primary`}
          />
        </div>
      ))}
    </div>
  );
};

export const BulletPagination = ({
  activeIndex,
  numberOfBullets,
  goToSlide,
  isPrimary,
}: any) => {
  const maxVisibleBullets = 4; // Max number of bullets to display at once

  // Calculate the start and end index of the visible bullets
  const getVisibleBullets = () => {
    if (numberOfBullets <= maxVisibleBullets) {
      // If the number of bullets is less than or equal to maxVisibleBullets, show all
      return { start: 0, end: numberOfBullets };
    } else {
      // Show a sliding window of bullets around the active index
      const half = Math.floor(maxVisibleBullets / 2);
      let start = Math.max(0, activeIndex - half);
      const end = Math.min(numberOfBullets, start + maxVisibleBullets);

      if (end - start < maxVisibleBullets) {
        start = Math.max(0, end - maxVisibleBullets);
      }

      return { start, end };
    }
  };

  const { start, end } = getVisibleBullets();

  return (
    <div className="container w-full h-full flex items-center justify-end gap-x-1 caret-transparent">
      {Array.from({ length: end - start }).map((_, index) => {
        const bulletIndex = start + index;
        return (
          <div key={bulletIndex} className="group px-[2px] py-2 cursor-pointer">
            <div
              onClick={() => goToSlide(bulletIndex)}
              className={cn(
                "w-3.5 h-3.5 rounded-full transition-all duration-300",
                isPrimary ? "group-hover:bg-primary" : "border border-white group-hover:bg-white",
                isPrimary
                  ? bulletIndex === activeIndex
                    ? "bg-primary"
                    : "bg-primary/25"
                  : bulletIndex === activeIndex
                  ? "bg-white"
                  : "bg-transparent"
              )}
            />
          </div>
        );
      })}
    </div>
  );
};
