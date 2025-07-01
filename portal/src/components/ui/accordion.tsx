"use client";
import React from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import parse from "html-react-parser";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { cn } from "@/utils";

export const Accordion = ({
  title,
  brief,
  children,
  onOpenChange,
  isOpen,
  className = "bg-veryLightGray",
}: {
  title: any;
  brief?: any;
  children?: any;
  isOpen: boolean;
  onOpenChange: () => void;
  className?: any;
}) => {
  const [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn("border px-8 rounded-xl border-slate-200", className)}
    >
      <button
        onClick={() => onOpenChange()}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <motion.span
          variants={{
            open: {
              color: "rgb(190, 58, 61,1)",
            },
            closed: {
              color: "rgb(0, 179, 181,0)",
            },
          }}
          className="bg-primary bg-clip-text text-left text-base md:text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "#be3a3d",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          {isOpen ? (
            <div className="bg-primary/15 p-2 rounded-md">
              <FaMinus className="text-primary" />
            </div>
          ) : (
            <FaPlus className="text-primary" />
          )}
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? height : "0px",
          marginBottom: isOpen ? "24px" : "0px",
        }}
        className="overflow-hidden text-zing-900"
      >
        {
          <div ref={ref} className="text-sm md:text-base">
            {children ? children : brief && parse(brief)}
          </div>
        }
      </motion.div>
    </motion.div>
  );
};
