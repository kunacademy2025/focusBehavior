"use server";
import React from "react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { SpeakerCard } from "../card";
import SpeakerModel from "@/services/api/collections/speakers/model";
import Pagination from "@/components/ui/pagination";
import { MetaModel } from "@/models/meta.model";
import { routes } from "@/config";
import SearchInput from "@/components/forms/search";

export const SpeakersListing = async ({
  title,
  brief,
  lang,
  data,
  pagination,
}: {
  title: string;
  brief: string;
  lang: string;
  data: SpeakerModel[];
  pagination?: MetaModel;
}) => {
  const { pageCount = 0, page = 1 } = pagination || {};

  return (
    <section className="bg-veryLightGray overflow-hidden">
      <section className="bg-white">
        <div className="container w-full h-full py-16 overflow-hidden">
          <FadeAnimation direction="left">
            <div className="flex flex-col justify-center mb-6">
              <h2 className="title">{title}</h2>
              <p className="subtitle w-full lg:w-9/12">{brief}</p>
            </div>
          </FadeAnimation>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between lg:justify-start pb-6">
            <div className="flex items-center gap-x-4 cursor-pointer">
              <SearchInput />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 ">
            {data?.map((item: any, index: number) => (
              <SpeakerCard key={index} {...item} lang={lang} />
            ))}
          </div>
          <Pagination
            pageCount={pageCount}
            pageIndex={page}
            routeName={routes.speakers("", lang)}
            className="mt-10"
          />
        </div>
      </section>
    </section>
  );
};
