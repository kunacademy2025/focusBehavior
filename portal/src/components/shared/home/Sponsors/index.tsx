"use client";
import FadeAnimation from "@/components/animation/FadeAnimation";
import SponsorModel from "@/services/api/collections/sponsors/model";
import { motion } from "motion/react";
import { LogoItem } from "./logo-item";
import { useTranslation } from "@/i18n/client";

const Sponsors = ({
  sponsors,
  lang,
}: {
  sponsors: SponsorModel[];
  lang: string;
}) => {
  const midpoint = Math.ceil(sponsors.length / 2);
  const firstHalf = sponsors.slice(0, midpoint);
  const secondHalf = sponsors.slice(midpoint);
  const { t } = useTranslation("common", lang);

  return (
    <div className=" pb-10 bg-white">
      <div className="container">
        <FadeAnimation direction="down" className="mb-6">
          <h2 className="title">{t("titles.our_sponsors")}</h2>
        </FadeAnimation>
      </div>
      <div className="relative mt-6 bg-white">
        <div className="relative z-0 flex overflow-hidden">
          <TranslateWrapper>
            {firstHalf.map((item, index: number) => {
              return <LogoItem {...item} key={index} />;
            })}
          </TranslateWrapper>
          <TranslateWrapper>
            {firstHalf.map((item, index: number) => {
              return <LogoItem {...item} key={index} />;
            })}
          </TranslateWrapper>
          <TranslateWrapper>
            {firstHalf.map((item, index: number) => {
              return <LogoItem {...item} key={index} />;
            })}
          </TranslateWrapper>
        </div>
        <div className="relative z-0 flex overflow-hidden">
          <TranslateWrapper reverse>
            {secondHalf.map((item, index: number) => {
              return <LogoItem {...item} key={index} />;
            })}
          </TranslateWrapper>
          <TranslateWrapper reverse>
            {secondHalf.map((item, index: number) => {
              return <LogoItem {...item} key={index} />;
            })}
          </TranslateWrapper>
          <TranslateWrapper reverse>
            {secondHalf.map((item, index: number) => {
              return <LogoItem {...item} key={index} />;
            })}
          </TranslateWrapper>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-white to-white/0" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-white to-white/0" />
      </div>
    </div>
  );
};
export default Sponsors;

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  );
};
