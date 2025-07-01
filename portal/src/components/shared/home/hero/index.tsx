"use client";
import React from "react";
import { HeroSwiper } from "@/components/ui/swiper/hero-swiper";
import { SwiperSlide } from "swiper/react";
import { HeroItem } from "./hero-item";
import { cn } from "@/utils";
import { HeroModel } from "@/models/hero.model";
import EventModel from "@/services/api/collections/events/model";
import { EventHero } from "./event-hero";

export const Hero = ({
  data,
  featuredEvents,
  className,
  showScroll = false,
  lang,
}: {
  data: HeroModel[];
  featuredEvents: EventModel[];
  className: string;
  showScroll: boolean;
  lang: string;
}) => {
  return (
    <section className={cn("w-full", className)}>
      <HeroSwiper>
        {Array.isArray(featuredEvents) &&
          featuredEvents?.map((item, index: number) => {
            return (
              <SwiperSlide key={index}>
                <EventHero
                  key={index}
                  item={item}
                  showScroll={showScroll}
                  lang={lang}
                />
              </SwiperSlide>
            );
          })}
        {data &&
          data.length > 0 &&
          Array.isArray(data) &&
          data?.map((item, index: number) => {
            return (
              <SwiperSlide key={index}>
                <HeroItem
                  key={index}
                  item={item}
                  showScroll={showScroll}
                  lang={lang}
                />
              </SwiperSlide>
            );
          })}
      </HeroSwiper>
    </section>
  );
};
