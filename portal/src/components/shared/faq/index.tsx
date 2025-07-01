"use client";
import { Accordion } from "@/components/ui";
import React, { useState } from "react";
import FadeAnimation from "@/components/animation/FadeAnimation";
import FAQModel from "@/services/api/collections/faqs/model";

export const Faq = ({
  title,
  brief,
  data,
}: {
  title: string;
  brief: string;
  data: FAQModel[];
}) => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    setOpenIndexes((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(index)) {
        newState.delete(index); // Close the accordion
      } else {
        newState.add(index); // Open the accordion
      }
      return newState;
    });
  };

  return (
    <div className="p-4 md:p-8 bg-white">
      <div className="container py-10">
        <FadeAnimation direction="down" className="mb-6">
          <h2 className="title">{title}</h2>
          <p className="subtitle w-full lg:w-9/12">{brief}</p>
        </FadeAnimation>
        <div className="flex flex-col gap-y-3">
          {data?.map((faq, index) => (
            <FadeAnimation
              inViewOnce={true}
              direction="up"
              delay={0.3 * index}
              key={index}
            >
              <Accordion
                title={faq.question}
                brief={faq.answer}
                isOpen={openIndexes.has(index)}
                onOpenChange={() => handleToggle(index)}
              />
            </FadeAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};
