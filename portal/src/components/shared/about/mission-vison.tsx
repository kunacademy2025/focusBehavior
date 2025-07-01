"use client";
import FadeAnimation from "@/components/animation/FadeAnimation";
import { useTranslation } from "@/i18n/client";
import { MediaModel } from "@/models/media.model";
import { getMediaInfo } from "@/utils";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";

export const MissionVision = ({
  mission_title,
  mission_brief,
  mission_image,
  vision_title,
  vision_brief,
  vision_image,
  lang,
}: {
  mission_title: string;
  mission_brief: string;
  mission_image: MediaModel;
  vision_title: string;
  vision_brief: string;
  vision_image: MediaModel;
  lang: string;
}) => {
  const { t } = useTranslation("common");

  const {
    imgUrl: imgUrl1,
    alt: alt1,
    width: width1,
    height: height1,
  } = getMediaInfo(mission_image);

  const {
    imgUrl: imgUrl2,
    alt: alt2,
    width: width2,
    height: height2,
  } = getMediaInfo(vision_image);

  return (
    <div className="p-4 md:p-8 bg-white">
      <div className="container py-10">
        <FadeAnimation direction="down" className="mb-6">
          <h2 className="title">{t("titles.our_mission_vision")}</h2>
          <p className="subtitle w-full lg:w-9/12">
            {t("messages.mission_intro")}
          </p>
        </FadeAnimation>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full">
          <FadeAnimation direction="left">
            <Card
              heading={mission_title}
              description={mission_brief}
              imgSrc={imgUrl1}
            />
          </FadeAnimation>
          <FadeAnimation direction="right">
            <Card
              heading={vision_title}
              description={vision_brief}
              imgSrc={imgUrl2}
            />
          </FadeAnimation>
        </div>
      </div>
    </div>
  );
};

const Card = ({
  heading = "",
  description,
  imgSrc,
  lang,
}: {
  heading?: string;
  description: string;
  imgSrc: string | StaticImageData;
  lang: string;
}) => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.035,
      }}
      whileHover="hover"
      className="w-full h-80 bg-slate-300 overflow-hidden group relative"
    >
      <div
        className="absolute inset-0 saturate-100 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="p-4 relative z-20 h-full text-slate-300 group-hover:text-white transition-colors duration-500 flex flex-col justify-between">
        {/* <FiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" /> */}
        <div className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />

        <div className="relative z-10">
          <h4>
            {heading ? (
              lang != "en" ? (
                <span className="text-4xl mb-2 block">{heading}</span>
              ) : (
                heading
                  .split("")
                  .map((l, i) => <ShiftLetter letter={l} key={i} />)
              )
            ) : (
              <span></span>
            )}
          </h4>
          <p className="text-sm lg:text-base">{description}</p>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/0 to-neutral-950/90 from-[30%]" />
      </div>
    </motion.div>
  );
};

const ShiftLetter = ({ letter }: { letter: string }) => {
  return (
    <div className="inline-block overflow-hidden h-[36px] font-semibold text-3xl">
      <motion.span
        className="flex flex-col min-w-[4px]"
        style={{
          y: "0%",
        }}
        variants={{
          hover: {
            y: "-50%",
          },
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
};
