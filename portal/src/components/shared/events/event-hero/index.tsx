"use client";
import React from "react";
import { HeroSwiper } from "@/components/ui/swiper/hero-swiper";
import { SwiperSlide } from "swiper/react";
import { EventHeroItem } from "./event-hero-item";
import { cn } from "@/utils";

export const EventHero = ({ data }: { data: any }) => {
  return (
    <section className={cn("w-full h-[50vh] lg:h-[75vh]")}>
      <HeroSwiper>
        {Array.isArray(data) &&
          data?.map((item, index: number) => {
            return (
              <SwiperSlide key={index}>
                <EventHeroItem key={index} item={item} />;
              </SwiperSlide>
            );
          })}
      </HeroSwiper>
    </section>
  );
};
