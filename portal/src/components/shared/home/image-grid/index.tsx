"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import imgUrl1 from "@/assets/images/01.webp";
import imgUrl2 from "@/assets/images/02.webp";
import imgUrl3 from "@/assets/images/03.webp";
import imgUrl4 from "@/assets/images/06.webp";
import imgUrl5 from "@/assets/images/05.webp";
import imgUrl6 from "@/assets/images/04.webp";
import { useTranslation } from "@/i18n/client";
import Link from "next/link";
import { routes } from "@/config";
import { MediaModel } from "@/models/media.model";
import { getMediaInfo } from "@/utils";

export const ImageGrid = ({
  lang,
  gallery,
}: {
  lang: string;
  gallery: {
    title: string;
    brief: string;
    images: MediaModel[];
    url: string;
  };
}) => {
  const { title, brief, images, url } = gallery || {};

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      <section ref={targetRef} className="bg-white h-[350vh]">
        <div className="h-screen sticky top-0 z-0 grid grid-cols-3 grid-rows-3 gap-4 p-4 overflow-hidden">
          <Copy
            scrollYProgress={scrollYProgress}
            lang={lang}
            title={title}
            brief={brief}
            url={url}
          />
          <Images scrollYProgress={scrollYProgress} images={images} />
          <Circles />
        </div>
      </section>
    </>
  );
};

const Copy = ({
  scrollYProgress,
  lang,
  title,
  brief,
  url,
}: {
  scrollYProgress: MotionValue<number>;
  lang: string;
  title: string;
  brief: string;
  url: string;
}) => {
  const { t } = useTranslation("common", lang);

  const copyScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.5]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.75], ["0%", "7.5%"]);

  return (
    <motion.div
      style={{
        scale: copyScale,
        opacity: copyOpacity,
        y: copyY,
      }}
      className="absolute px-8 w-full h-screen z-20 flex flex-col items-center justify-center"
    >
      <h1 className="text-stone-950 text-5xl md:text-7xl font-bold text-center max-w-xl">
        {/* {t("titles.discover_world")} */}
        {title}
      </h1>
      <p className="text-stone-600 text-sm md:text-base text-center max-w-xl my-6">
        {/* {t("messages.discover_world")} */}
        {brief}
      </p>
      <div className="flex items-center gap-4">
        <Link href={url || routes.events("", lang)} className="btn-primary">
          {t("buttons.explore_events")}
        </Link>
      </div>
    </motion.div>
  );
};

interface ImagesProps {
  scrollYProgress: MotionValue<number>;
  images: MediaModel[];
}

const Images = ({ scrollYProgress, images }: ImagesProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  const offsets = [
    {
      x: useTransform(scrollYProgress, [0, 1], ["0%", "0%"]),
      y: useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]),
    },
    {
      x: useTransform(scrollYProgress, [0, 1], ["30%", "0%"]),
      y: useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]),
    },
    {
      x: useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]),
      y: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]),
    },
    {
      x: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]),
      y: useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]),
    },
    {
      x: useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]),
      y: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]),
    },
    {
      x: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]),
      y: useTransform(scrollYProgress, [0, 1], ["25%", "0%"]),
    },
  ];

  return (
    <>
      {images.map((image, index) => {
        const { imgUrl, alt, width, height } = getMediaInfo(image);
        return (
          <motion.div
            key={index}
            className="relative z-10"
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              scale,
              x: offsets[index]?.x,
              y: offsets[index]?.y,
            }}
          />
        );
      })}
    </>
  );
};

export default Images;

// const Images = ({
//   scrollYProgress,
//   images,
// }: {
//   scrollYProgress: MotionValue<number>;
//   images: MediaModel[];
// }) => {
//   const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

//   const image1Offset = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

//   const image2OffsetX = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
//   const image2OffsetY = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

//   const image3OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
//   const image3OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

//   const image4OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
//   const image4OffsetY = useTransform(scrollYProgress, [0, 1], ["-145%", "0%"]);

//   const image5OffsetX = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
//   const image5OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

//   const image6OffsetX = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
//   const image6OffsetY = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

//   return (
//     <>
//       <motion.div
//         className="col-span-2 relative z-10"
//         style={{
//           backgroundImage: `url(${imgUrl1.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           scale,
//           x: image1Offset,
//           y: image1Offset,
//         }}
//       />
//       <motion.div
//         className="row-span-2 relative z-10"
//         style={{
//           backgroundImage: `url(${imgUrl2.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           scale,
//           x: image2OffsetX,
//           y: image2OffsetY,
//         }}
//       />

//       <motion.div
//         className="row-span-2 relative z-10"
//         style={{
//           backgroundImage: `url(${imgUrl3.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           scale,
//           x: image3OffsetX,
//           y: image3OffsetY,
//         }}
//       />
//       <motion.div
//         className="relative z-10"
//         style={{
//           backgroundImage: `url(${imgUrl4.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           scale,
//           x: image4OffsetX,
//           y: image4OffsetY,
//         }}
//       />

//       <motion.div
//         className="relative z-10"
//         style={{
//           backgroundImage: `url(${imgUrl5.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           scale,
//           x: image5OffsetX,
//           y: image5OffsetY,
//         }}
//       />
//       <motion.div
//         className="relative z-10"
//         style={{
//           backgroundImage: `url(${imgUrl6.src})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           scale,
//           x: image6OffsetX,
//           y: image6OffsetY,
//         }}
//       />
//     </>
//   );
// };

const Circles = () => (
  <>
    <div className="w-3/5 max-w-[850px] min-w-[400px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 left-0 top-0 -translate-x-[50%] -translate-y-[50%]" />
    <div className="w-1/2 max-w-[600px] min-w-[300px] aspect-square border-[8px] border-slate-200 rounded-full absolute z-0 right-0 bottom-0 translate-x-[50%] translate-y-[50%]" />
  </>
);
