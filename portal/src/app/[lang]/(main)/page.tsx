"use server";
import { FeaturedBlogs } from "@/components/shared/blogs";
import { Testimonials } from "@/components/shared/common";
import {
  LatestEvents,
  OldEvents,
  ShowingEvents,
} from "@/components/shared/events";
import { OldEventsHome } from "@/components/shared/events/old-events-home";
import {
  About,
  BecomeMember,
  Hero,
  ImageGrid,
  Search,
} from "@/components/shared/home";
import Sponsors from "@/components/shared/home/Sponsors";
import { fetchHomePageData } from "@/services/aggregators/homepage";
import React from "react";

type Params = Promise<{ lang: string }>;

const HomePage = async ({ params }: { params: Params }) => {
  const { lang } = await params;

  const {
    homePageData,
    testimonialsData,
    blogsData,
    sponsorsData,
    showingEvents,
    upcomingEvents,
    featuredEvents,
    oldEvents,
  } = await fetchHomePageData(lang);

  const {
    hero,
    title,
    intro,
    journey_title,
    journey_intro,
    journey_image,
    about_title,
    about_subtitle,
    about_brief,
    about_image,
    testimonials_intro,
    blog_intro,
    upcoming_events_intro,
    gallery,
  } = homePageData || {};

  return (
    <div className="">
      <div className="overflow-hidden">
        <Hero
          lang={lang}
          data={hero}
          featuredEvents={featuredEvents}
          className="h-[100vh]"
          showScroll={true}
        />
        <Search title={title} intro={intro} lang={lang} />
        {showingEvents?.length > 0 && (
          <ShowingEvents events={showingEvents} lang={lang} />
        )}

        <BecomeMember
          title={journey_title}
          intro={journey_intro}
          image={journey_image}
          lang={lang}
        />
        <About
          title={about_title}
          subtitle={about_subtitle}
          brief={about_brief}
          image={about_image}
          lang={lang}
        />
        {upcomingEvents?.length > 0 && (
          <LatestEvents
            data={upcomingEvents}
            intro={upcoming_events_intro}
            lang={lang}
          />
        )}
        {oldEvents?.length > 0 && (
          <OldEventsHome data={oldEvents} lang={lang} />
        )}

        {testimonialsData?.length > 0 && (
          <Testimonials
            testimonials={testimonialsData}
            intro={testimonials_intro}
            lang={lang}
          />
        )}
      </div>
      {gallery && <ImageGrid lang={lang} gallery={gallery} />}
      <div className="overflow-hidden">
        {blogsData?.length > 0 && (
          <FeaturedBlogs blogs={blogsData} intro={blog_intro} lang={lang} />
        )}
        {sponsorsData?.length > 0 && (
          <Sponsors sponsors={sponsorsData} lang={lang} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
