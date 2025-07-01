"use server";

import React from "react";
import { SideContent } from "./side-content";
import { CustomImage } from "@/components/controls";
import { CiImageOff } from "react-icons/ci";
import { EventsOfTheSpeaker } from "../../events/events-of-the-speaker";
import SpeakerModel from "@/services/api/collections/speakers/model";
import { DynamicZoneComponent } from "@/components/dynamic";
import { getMediaInfo } from "@/utils";

export async function SpeakerDetails({
  data,
  lang,
}: {
  data: SpeakerModel;
  lang: string;
}) {
  const { main_image, tags, events, content } = data || {};

  const { imgUrl, alt, width, height } = getMediaInfo(main_image);

  const renderContent = () => {
    return <DynamicZoneComponent content={content} />;
  };

  return (
    <>
      <article className="bg-white">
        <div className="container py-6 lg:py-10">
          <section className="flex flex-col lg:flex-row py-8 lg:gap-x-10 ">
            {/* Information */}
            <div className="order-2 lg:order-1 w-full h-fit lg:w-8/12">
              <div>
                {imgUrl ? (
                  <CustomImage
                    src={imgUrl}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-[auto] mx-auto object-center"
                  />
                ) : (
                  <div className="grid place-content-center w-full h-full aspect-video bg-gray-200 transition-all duration-300">
                    <CiImageOff className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              {((tags && tags?.length > 0) ||
                (content && content?.length > 0)) && (
                <div className="py-6 px-6 lg:px-8 bg-veryLightGray rounded-b-lg">
                  {renderContent()}

                  {tags && tags?.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                      {(tags ?? []).map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="bg-gray-200 text-gray-500 hover:bg-primary hover:text-white py-1 text-sm px-3 inline-flex items-center transition cursor-pointer"
                          >
                            {item?.tag}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              )}
            </div>

            {/*  Details */}
            <div className="order-1 mb-6 lg:mb-0 lg:order-2 w-full lg:w-4/12">
              <SideContent data={data} lang={lang} />
            </div>
          </section>
        </div>
        {events && events.length > 0 && (
          <EventsOfTheSpeaker events={events} lang={lang} />
        )}
      </article>
    </>
  );
}
