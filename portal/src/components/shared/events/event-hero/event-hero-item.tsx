"use client";
import { getMediaInfo } from "@/utils";
import { MuteButton } from "./mute-button";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { useState } from "react";
import { CustomImage } from "@/components/controls";
import { HeroModel } from "@/models/hero.model";

export const EventHeroItem = ({ item }: { item: HeroModel }) => {
  const { title, brief, media } = item;
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
        <FadeAnimation direction="left" className="flex flex-col items-center">
          {title && <Title text={title} />}
          {brief && <Brief text={brief} />}
        </FadeAnimation>
      </div>

      {type === "video" && <MuteButton muted={muted} toggleMute={toggleMute} />}
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
    className="inset-0 w-full h-full object-cover object-center aspect-video"
  />
);

const Title = ({ text }: { text: string }) => (
  <h1 className="text-white font-bold text-center text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
    {text}
  </h1>
);

const Brief = ({ text }: { text: string }) => (
  <p className="w-full text-sm sm:text-base lg:w-1/2 text-white mt-4 leading-normal text-center">
    {text}
  </p>
);
