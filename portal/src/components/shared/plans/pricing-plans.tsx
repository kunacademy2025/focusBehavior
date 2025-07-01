"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plan, SubscriptionCard } from "../card";

export const SlidePricing = ({
  title,
  brief,
}: {
  title: string;
  brief: string;
}) => {
  const [selected, setSelected] = useState<"M" | "A">("M");

  return (
    <section className="w-full text-black bg-white px-4 lg:px-8 py-12 lg:py-24 relative overflow-hidden">
      <Heading
        title={title}
        brief={brief}
        selected={selected}
        setSelected={setSelected}
      />
      <PriceCards selected={selected} />
      <TopLeftCircle />
      <BottomRightCircle />
    </section>
  );
};

const PriceCards = ({ selected }: any) => (
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 w-full max-w-6xl mx-auto relative z-10">
    {plans.map((plan, index) => (
      <SubscriptionCard key={index} {...plan} selected={selected} />
    ))}
  </div>
);

export default PriceCards;

const SELECTED_STYLES = "text-white font-medium rounded-lg py-3 w-28 relative";
const DESELECTED_STYLES =
  "font-medium rounded-lg py-3 w-28 hover:bg-slate-100 transition-colors relative";

interface HeadingProps {
  title: string;
  brief: string;
  selected: "M" | "A";
  setSelected: React.Dispatch<React.SetStateAction<"M" | "A">>;
}

const Heading = ({ title, brief, selected, setSelected }: HeadingProps) => {
  return (
    <div className="mb-12 lg:mb-24 relative z-10">
      <h3 className="font-semibold text-5xl lg:text-7xl text-center mb-6">
        {title}
      </h3>
      <p className="text-center mx-auto max-w-lg mb-8">{brief}</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setSelected("M")}
          className={selected === "M" ? SELECTED_STYLES : DESELECTED_STYLES}
        >
          Monthly
          {selected === "M" && <BackgroundShift />}
        </button>
        <div className="relative">
          <button
            onClick={() => setSelected("A")}
            className={selected === "A" ? SELECTED_STYLES : DESELECTED_STYLES}
          >
            Annual
            {selected === "A" && <BackgroundShift />}
          </button>
          <CTAArrow />
        </div>
      </div>
    </div>
  );
};

const BackgroundShift = () => (
  <motion.span
    layoutId="bg-shift"
    className="absolute inset-0 bg-black rounded-lg -z-10"
  />
);

const CTAArrow = () => (
  <div className="absolute -right-[100px] top-2 sm:top-0">
    <motion.svg
      width="95"
      height="62"
      viewBox="0 0 95 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="scale-50 sm:scale-75"
      initial={{ scale: 0.7, rotate: 5 }}
      animate={{ scale: 0.75, rotate: 0 }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1,
        ease: "easeOut",
      }}
    >
      <path
        d="M14.7705 15.8619C33.2146 15.2843 72.0772 22.1597 79.9754 54.2825"
        stroke="#BE3A3D"
        strokeWidth="3"
      />
      <path
        d="M17.7987 7.81217C18.0393 11.5987 16.4421 15.8467 15.5055 19.282C15.2179 20.3369 14.9203 21.3791 14.5871 22.4078C14.4728 22.7608 14.074 22.8153 13.9187 23.136C13.5641 23.8683 12.0906 22.7958 11.7114 22.5416C8.63713 20.4812 5.49156 18.3863 2.58664 15.9321C1.05261 14.6361 2.32549 14.1125 3.42136 13.0646C4.37585 12.152 5.13317 11.3811 6.22467 10.7447C8.97946 9.13838 12.7454 8.32946 15.8379 8.01289"
        stroke="#BE3A3D"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.svg>
    <span className="block text-xs w-fit bg-primary text-white shadow px-1.5 py-0.5 rounded -mt-1 ltr:ml-8 rtl:mr-8 -rotate-2 font-light italic">
      Save $$$
    </span>
  </div>
);

const TopLeftCircle = () => {
  return (
    <motion.div
      initial={{ rotate: "0deg" }}
      animate={{ rotate: "360deg" }}
      transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      className="w-[450px] h-[450px] rounded-full border-2 border-slate-500 border-dotted absolute z-0 -left-[250px] -top-[200px]"
    />
  );
};

const BottomRightCircle = () => {
  return (
    <motion.div
      initial={{ rotate: "0deg" }}
      animate={{ rotate: "-360deg" }}
      transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      className="w-[450px] h-[450px] rounded-full border-2 border-slate-500 border-dotted absolute z-0 -right-[250px] -bottom-[200px]"
    />
  );
};

const plans: Plan[] = [
  {
    name: "Personal",
    subtitle: "Everything to start",
    currency: "AED",
    price: "899",
    pricePeriod: "/month",
    features: [
      "Access to Day 1 sessions",
      "Digital event materials",
      "Networking opportunities",
      "Post-event recordings",
    ],
  },
  {
    name: "Premium",
    subtitle: "Everything to launch",
    currency: "AED",
    price: "2,999",
    pricePeriod: "/month",
    features: [
      "Full 3-day event access",
      "Digital event materials",
      "Networking opportunities",
      "VIP seating & perks",
    ],
    isHighlighted: true,
  },
  {
    name: "Platinum",
    subtitle: "Everything to launch",
    currency: "AED",
    price: "6,999",
    pricePeriod: "/month",
    features: [
      "Full 3-day VIP access",
      "Exclusive event materials",
      "1-on-1 expert sessions",
      "Post-event follow-up support",
    ],
  },
];
