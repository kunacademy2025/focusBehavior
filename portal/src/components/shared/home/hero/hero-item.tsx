"use client";
import Link from "next/link";
import { cn, formatDate, getMediaInfo } from "@/utils";
import { MuteButton } from "./mute-button";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { useState } from "react";
import { CustomImage } from "@/components/controls";
import { FaArrowDownLong } from "react-icons/fa6";
import { Link as ScrollLink } from "react-scroll";
import { HeroModel } from "@/models/hero.model";

export const HeroItem = ({
  item,
  showScroll,
  lang,
}: {
  item: HeroModel;
  showScroll: boolean;
  lang: string;
}) => {
  const { title, brief, media, action_buttons } = item;
  const [muted, setMuted] = useState(true);
  const toggleMute = () => setMuted((prevMuted) => !prevMuted);

  const { imgUrl, alt, width, height, mime } = getMediaInfo(media);

  const type = mime.includes("video")
    ? "video"
    : mime.includes("image")
    ? "image"
    : "";

  return (
    <div className="relative w-full h-full">
      <Overlay />
      {type === "video" ? (
        <VideoBackground
          url={imgUrl}
          width={width}
          height={height}
          muted={muted}
          mime={mime}
        />
      ) : (
        <ImageBackground url={imgUrl} alt={alt} width={width} height={height} />
      )}

      <div className="absolute inset-0 container flex flex-col items-center justify-center">
        {/* {category && <CategoryBadge category={category} />} */}
        <FadeAnimation direction="left" className="flex flex-col items-center">
          {title && <Title text={title} />}
          {brief && <Brief text={brief} />}
          {/* {type === "image" && (
            <Details date={date} country={country} location={location} />
          )} */}
          {action_buttons.length > 0 && (
            <ActionButtons buttons={action_buttons} />
          )}
        </FadeAnimation>
      </div>

      {showScroll && (
        <ScrollLink
          to="search-section"
          smooth={true}
          duration={500}
          offset={-143}
          className={cn(
            "absolute left-1/2 transform -translate-x-1/2 bottom-5 p-3",
            "text-white border-2 border-white border-dashed rounded-full shadow-lg",
            "hover:text-primary hover:bg-white transition"
          )}
        >
          <FaArrowDownLong className="w-5 h-5 " />
        </ScrollLink>
      )}
      {type === "video" && (
        <MuteButton muted={muted} toggleMute={toggleMute} lang={lang} />
      )}
    </div>
  );
};

const Overlay = () => (
  <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[30%]" />
);

const VideoBackground = ({
  url,
  muted,
  width,
  height,
  mime,
}: {
  url: string;
  muted: boolean;
  width: number;
  height: number;
  mime: string;
}) => (
  <video
    autoPlay
    loop
    muted={muted}
    className="inset-0 w-full h-full object-cover object-top aspect-video"
  >
    <source src={url} width={width} height={height} type={mime} />
  </video>
);

const ImageBackground = ({
  url,
  alt,
  width,
  height,
}: {
  url: string;
  alt: string;
  width: number;
  height: number;
}) => (
  <CustomImage
    src={url}
    alt={alt}
    width={width}
    height={height}
    className="inset-0 w-full h-full object-cover object-top aspect-video"
  />
);

const CategoryBadge = ({ category }: { category: string }) => (
  <span className="rounded-full bg-primary py-2 px-6 text-white mb-8 min-w-28 text-center">
    {category}
  </span>
);

const Title = ({ text }: { text: string }) => (
  <h1 className="text-white font-bold text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
    {text}
  </h1>
);

const Brief = ({ text }: { text: string }) => (
  <p className="w-full text-sm sm:text-base lg:w-1/2 text-white mt-4 rtl:mt-8 leading-normal text-center">
    {text}
  </p>
);

const ActionButtons = ({
  buttons,
}: {
  buttons: { title: string; link: string }[];
}) => (
  <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-10">
    {buttons.map(({ title, link }, index) => (
      <Link
        key={index}
        href={link}
        className="capitalize border border-white rounded-full py-3 px-4 min-w-32 text-center text-white transition hover:bg-primary hover:border-primary"
      >
        {title}
      </Link>
    ))}
  </div>
);
