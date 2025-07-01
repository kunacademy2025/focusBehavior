"use client";

import { useState } from "react";
import { EventCard } from "../card/event-card";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { CarouselSwiper } from "@/components/ui";
import { SwiperSlide } from "swiper/react";
import { eventsData } from "../../../assets/data/events.data";

export const FeaturedEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("upcoming");

  const handleCategoryChange = (key: string) => setSelectedCategory(key);

  return (
    <section className="bg-veryLightGray overflow-hidden">
      <div className="bg-white">
        <div className="container w-full h-full py-16 overflow-hidden">
          <FadeAnimation direction="left">
            <div className="flex flex-col justify-center mb-6">
              <h2 className="title">Discover Upcoming Events</h2>
              <p className="subtitle">
                Stay updated with our latest happenings and gatherings
              </p>
              <div className="mt-4 w- pb-4 border-b">
                {["upcoming", "past"].map((key) => {
                  return (
                    <button
                      key={key}
                      className={`ltr:mr-2 rtl:ml-2 rounded-lg w-32 capitalize hover:bg-primary/85 hover:text-white transition px-4 py-2 ${
                        key === selectedCategory
                          ? "bg-primary text-white"
                          : "text-darkGray bg-zinc-200"
                      }`}
                      onClick={() => handleCategoryChange(key)}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeAnimation>

          <CarouselSwiper>
            {eventsData?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <FadeAnimation direction="up" delay={0.1 * index}>
                  <EventCard item={item} />
                </FadeAnimation>
              </SwiperSlide>
            ))}
          </CarouselSwiper>
        </div>
      </div>
    </section>
  );
};
