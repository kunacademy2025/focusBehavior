"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

import imgUrl1 from "@/assets/images/Events/01.webp";
import imgUrl2 from "@/assets/images/Events/02.webp";
import imgUrl3 from "@/assets/images/Events/04.webp";
import imgUrl4 from "@/assets/images/Events/06.webp";
import imgUrl5 from "@/assets/images/Events/07.webp";
import imgUrl6 from "@/assets/images/Events/08.webp";
import imgUrl7 from "@/assets/images/Events/09.webp";
import { StaticImageData } from "next/image";

export const Gallery = () => {
  return (
    <div className="bg-secondary">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-black/25 to-black/0 p-8 text-2xl text-center font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

type CardType = {
  url: string | StaticImageData;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: imgUrl1,
    title: "Tech Innovators Conference 2024",
    id: 1,
  },
  {
    url: imgUrl2,
    title: "Global Music Festival",
    id: 2,
  },
  {
    url: imgUrl3,
    title: "Art & Design Expo",
    id: 3,
  },
  {
    url: imgUrl4,
    title: "Culinary Delights Fair",
    id: 4,
  },
  {
    url: imgUrl5,
    title: "Green Energy Summit",
    id: 5,
  },
  {
    url: imgUrl6,
    title: "International Book Fair",
    id: 6,
  },
  {
    url: imgUrl7,
    title: "Marathon for Hope",
    id: 7,
  },
];
