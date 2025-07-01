"use client";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import { BlogSwiper } from "@/components/ui";
import { EventCardTwo } from "../card/event-card-two";
import EventModel from "@/services/api/collections/events/model";

interface Props {
  events: EventModel[];
  lang: string;
  hasPurchased?: boolean;
}

export const ShowingEvents: FC<Props> = ({ events, lang, hasPurchased }) => {

  return (
    <section className="bg-white overflow-hidden">
      <div className="container w-full h-full py-10">
        <BlogSwiper>
          {events.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <EventCardTwo item={item} lang={lang} hasPurchased={hasPurchased} />
              </SwiperSlide>
            );
          })}
        </BlogSwiper>
      </div>
    </section>
  );
};
