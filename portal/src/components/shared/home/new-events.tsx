"use client";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { CustomImage } from "@/components/controls";
import { formatDate } from "@/utils";
import React from "react";
import imgUrl from "@/assets/images/Events/03.webp";

export const NewEvents = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <FadeAnimation
          direction="down"
          className="flex flex-col gap-y-3 text-secondary w-full lg:w-9/12 mb-6"
        >
          <span className="text-xl relative w-fit font-light  pr-4 text-primary uppercase shine-text">
            New Events
            <span className="absolute top-1 right-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/90 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </span>
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Discover Exciting New Events: Your Guide to Unforgettable
            Experiences!
          </h2>
          <p className="text-base">
            Explore the latest events and unlock unforgettable experiences. From
            local gatherings to global celebrations, find something new to
            inspire and excite you!
          </p>
        </FadeAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          <FadeAnimation direction="left" className="relative overflow-hidden">
            <CustomImage
              src={imgUrl}
              alt=""
              width={1000}
              height={1000}
              className="w-full h-full max-h-[500px] rounded-2xl object-cover"
            />
          </FadeAnimation>
          <FadeAnimation
            direction="right"
            className="flex flex-col justify-center"
          >
            <div className="text-secondary my-1">
              {formatDate("2024-12-01")}
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <h3 className="title text-2xl xl:text-3xl">
                <span className="text-xl xl:text-2xl">Advanced Programs</span>
                <br /> <span className="font-semibold">by Focus Behavior</span>
              </h3>
              <p className="text-secondary">
                Embark on a transformative journey of self-discovery with our
                advanced programs. Designed to unlock your potential, these
                empowering experiences will elevate your personal growth and
                guide you toward a deeper understanding of yourself. Take the
                next step in your evolution and transform your life with Focus
                Behavior.
              </p>
              <button className="bg-primary text-white hover:bg-primary/85 px-6 py-2 rounded-lg w-fit transition">
                Read More
              </button>
            </div>
          </FadeAnimation>
        </div>
      </div>
    </section>
  );
};
