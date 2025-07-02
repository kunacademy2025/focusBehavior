"use client";
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/client";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";

export const ShiftingCountdown = ({ date, lang }: { date: string; lang: string }) => {
  const { t } = useTranslation("common", lang);

  const countdownItems = [
    { unit: "Day", text: t("timer.days") },
    { unit: "Hour", text: t("timer.hours") },
    { unit: "Minute", text: t("timer.minutes") },
    { unit: "Second", text: t("timer.seconds") },
  ];

  return (
    <div className="bg-primary p-4">
      <div className="mx-auto flex w-full max-w-5xl items-center text-white">
        {countdownItems.map((item, index) => (
          <CountdownItem
            key={item.unit}
            unit={item.unit}
            text={item.text}
            isLast={index === countdownItems.length - 1}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};

const CountdownItem = ({
  unit,
  text,
  isLast,
  date,
}: {
  unit: Units;
  text: string;
  isLast: boolean;
  date: string;
}) => {
  const { ref, time } = useTimer(unit, date);

  return (
    <div
      className={`flex h-20 w-1/4 flex-col items-center justify-center gap-1 ${!isLast ? "border-r-[1px] border-black/10" : ""
        } md:gap-2`}
    >
      <div className="relative w-full overflow-hidden text-center">
        <span ref={ref} className="block font-normal text-2xl md:text-3xl">
          {time}
        </span>
      </div>
      <span className="text-xs font-semibold md:text-sm lg:text-base uppercase ">
        {text}
      </span>
    </div>
  );
};

// NOTE: Framer motion exit animations can be a bit buggy when repeating
// keys and tabbing between windows. Instead of using them, we've opted here
// to build our own custom hook for handling the entrance and exit animations
const useTimer = (unit: Units, date: string) => {
  const [ref, animate] = useAnimate();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(date);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};
