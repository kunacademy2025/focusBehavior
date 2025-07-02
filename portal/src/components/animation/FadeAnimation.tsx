"use client";
import { motion } from "framer-motion";


export enum Direction {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}

const directionRotateVariants = {
  [Direction.LEFT]: {
    hidden: { opacity: 0, x: -60, scale: 0.8, rotate: -10 },
    visible: { opacity: 1, x: 0, scale: 1, rotate: 0 },
  },
  [Direction.RIGHT]: {
    hidden: { opacity: 0, x: 60, scale: 0.8, rotate: 10 },
    visible: { opacity: 1, x: 0, scale: 1, rotate: 0 },
  },
  [Direction.UP]: {
    hidden: { opacity: 0, y: 40, scale: 0.8, rotate: -10 },
    visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  },
  [Direction.DOWN]: {
    hidden: { opacity: 0, y: -40, scale: 0.8, rotate: 10 },
    visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  },
};

const directionVariants = {
  [Direction.LEFT]: {
    hidden: { opacity: 0, x: -60, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  [Direction.RIGHT]: {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  [Direction.UP]: {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  [Direction.DOWN]: {
    hidden: { opacity: 0, y: -40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

const FadeAnimation = ({
  children,
  className = "",
  direction = "up",
  inViewOnce = false,
  delay = 0,
  rotate = false,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "down" | "up";
  inViewOnce?: boolean;
  delay?: number;
  rotate?: boolean;
}>) => {
  const fadeInVariant = rotate
    ? directionRotateVariants[direction] ||
      directionRotateVariants[Direction.UP]
    : directionVariants[direction] || directionVariants[Direction.UP];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: inViewOnce }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        delay,
      }}
      variants={fadeInVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeAnimation;
