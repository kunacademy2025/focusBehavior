
"use client"
import { cn } from "@/utils";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { FaCheck } from "react-icons/fa6";

export interface Plan {
  name: string;
  subtitle: string;
  currency: string;
  price: string;
  pricePeriod: string;
  features: string[];
  isHighlighted?: boolean;
  selected?: "M" | "A";
}

export const SubscriptionCard = ({
  name,
  subtitle,
  currency,
  price,
  pricePeriod,
  features,
  isHighlighted = false,
  selected,
}: Plan) => {
  return (
    <div
      className={`w-full bg-white p-6  rounded-xl ${
        isHighlighted ? "shadow-lg border-2 border-primary" : "border border-slate-300"
      }`}
    >
      <p className="text-2xl font-bold mb-2">{name}</p>
      <p className="text-lg mb-6">{subtitle}</p>
      <div className="overflow-hidden mb-8">
        <AnimatePresence mode="wait">
          {selected === "M" ? (
            <motion.p
              key="monthly1"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ ease: "linear", duration: 0.25 }}
              className={cn(
                "text-6xl font-bold",
                isHighlighted ? "text-primary" : ""
              )}
            >
              <span className="block">{currency}</span>
              <span>{price}</span>
              <span className="font-normal text-xl">{pricePeriod}</span>
            </motion.p>
          ) : (
            <motion.p
              key="monthly2"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ ease: "linear", duration: 0.25 }}
              className={cn(
                "text-6xl font-bold",
                isHighlighted ? "text-primary" : ""
              )}
            >
              <span className="block">{currency}</span>
              <span>{price}</span>
              <span className="font-normal text-xl">{pricePeriod}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <FaCheck className="w-5 h-5" />
            <span className="text-base">{feature}</span>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className={cn(
          "w-full py-4 mt-8 font-semibold text-white rounded-lg uppercase",
          isHighlighted ? "bg-primary" : "bg-black"
        )}
      >
        Book Your Ticket
      </motion.button>
    </div>
  );
};
