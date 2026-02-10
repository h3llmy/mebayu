"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean; 
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  fullWidth = false,
  className = "",
  ...props
}: FadeInProps) => {
  const getVariants = () => {
    const distance = 20;

    const initial: any = { opacity: 0 };
    const animate: any = { opacity: 1 };

    if (direction === "up") initial.y = distance;
    if (direction === "down") initial.y = -distance;
    if (direction === "left") initial.x = distance;
    if (direction === "right") initial.x = -distance;

    if (direction === "up" || direction === "down") animate.y = 0;
    if (direction === "left" || direction === "right") animate.x = 0;

    return { initial, animate };
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, margin: "-100px" }}
      variants={{
        initial: variants.initial,
        animate: {
          ...variants.animate,
          transition: {
            duration,
            delay,
            ease: "easeOut",
          },
        },
      }}
      className={`${className} ${fullWidth ? "w-full" : ""}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
