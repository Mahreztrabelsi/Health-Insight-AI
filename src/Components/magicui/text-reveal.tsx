"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split("");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[140vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex justify-center  h-[80%]  -mb-72 w-full items-center xxs:p-2  xs:p-2 xm:px-[1rem] xm:py-[1rem] lg:w-11/12"
        }
      >
        <p
          ref={targetRef}
          className={
            "flex flex-wrap justify-center max-xxs:text-xs  max-xs:text-sm md:text-md xs:text-sm xm:text-sm   items-center lg:text-md xl:text-3xl font-bold text-black/20 dark:text-white/20 md:p-2  "
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
