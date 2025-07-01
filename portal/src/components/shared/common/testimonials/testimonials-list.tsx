"use client";
import { motion } from "motion/react";
import { TestimonialCard } from "../../card";
import TestimonialModel from "@/services/api/collections/testimonials/model";

export const TestimonialsList = ({
  testimonials,
  reverse = false,
  duration = 50,
  lang,
}: {
  testimonials: TestimonialModel[];
  reverse?: boolean;
  duration?: number;
  lang?: string;
}) => {
  return (
    <motion.div
      dir="ltr"
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {testimonials.map((t, index: number) => {
        return <TestimonialCard key={index} {...t} lang={lang} />;
      })}
    </motion.div>
  );
};
