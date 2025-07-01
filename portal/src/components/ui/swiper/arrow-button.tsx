"use client";

import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";

import { cn } from "@/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Swiper from "swiper";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  swiper: Swiper | null
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!swiper) return;
    swiper.slidePrev();
  }, [swiper]);

  const onNextButtonClick = useCallback(() => {
    if (!swiper) return;
    swiper.slideNext();
  }, [swiper]);

  useEffect(() => {
    if (!swiper) return;

    const updateButtons = () => {
      setPrevBtnDisabled(swiper.isBeginning);
      setNextBtnDisabled(swiper.isEnd);
    };

    swiper.on("slideChange", updateButtons);
    updateButtons();

    return () => {
      swiper.off("slideChange", updateButtons);
    };
  }, [swiper]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className={cn(
        "flex items-center justify-center",
        "bg-white hover:bg-primary focus:bg-primary cursor-pointer",
        "text-primary hover:text-white focus:text-white",
        "border-1 border-gray-200 hover:border-primary focus:border-primary",
        "font-semibold p-2 w-9 h-9 rounded-xl transition-all duration-300"
      )}
      type="button"
      {...restProps}
    >
      <FaArrowLeft className="w-4 h-4" />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className={cn(
        "flex items-center justify-center",
        "bg-white hover:bg-primary focus:bg-primary cursor-pointer",
        "text-primary hover:text-white focus:text-white",
        "border-1 border-gray-200 hover:border-primary focus:border-primary",
        "font-semibold p-2 w-9 h-9 rounded-xl transition-all duration-300"
      )}
      type="button"
      {...restProps}
    >
      <FaArrowRight className="w-4 h-4" />
      {children}
    </button>
  );
};
