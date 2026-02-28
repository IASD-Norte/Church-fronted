// components/ui/splitting-text.tsx
"use client";

import * as React from "react";
import {
  motion,
  type Variants,
  type TargetAndTransition,
  type HTMLMotionProps,
} from "framer-motion";
import { useInView } from "framer-motion";

// -----------------------------
// 🔹 Tipos base
// -----------------------------
type MotionVariants = {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  stagger?: number;
};

type DefaultSplittingTextProps = {
  motionVariants?: MotionVariants;
  inView?: boolean;
  inViewMargin?: string;
  inViewOnce?: boolean;
  delay?: number;
} & HTMLMotionProps<"span">;

type CharsOrWordsSplittingTextProps = DefaultSplittingTextProps & {
  type?: "chars" | "words";
  text: string;
};

type LinesSplittingTextProps = DefaultSplittingTextProps & {
  type: "lines";
  text: string[];
};

type SplittingTextProps =
  | CharsOrWordsSplittingTextProps
  | LinesSplittingTextProps;

// -----------------------------
// 🔹 Variantes por defecto
// -----------------------------
const defaultItemVariant: Variants = {
  hidden: { x: 150, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// -----------------------------
// 🔹 Componente principal
// -----------------------------
export const SplittingText: React.FC<SplittingTextProps> = ({
  text,
  type = "chars",
  motionVariants = {},
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  delay = 0,
  ...props
}) => {
  // Generar items según el tipo
  const items = React.useMemo<React.ReactNode[]>(() => {
    if (Array.isArray(text)) {
      // Si es tipo líneas
      return text.flatMap((line, i) => [
        <React.Fragment key={`line-${i}`}>{line}</React.Fragment>,
        i < text.length - 1 ? <br key={`br-${i}`} /> : null,
      ]);
    }

    if (type === "words") {
      const tokens = text.match(/\S+\s*/g) || [];
      return tokens.map((token, i) => (
        <React.Fragment key={i}>{token}</React.Fragment>
      ));
    }

    // Por defecto: caracteres
    return text.split("").map((char, i) => (
      <React.Fragment key={i}>{char}</React.Fragment>
    ));
  }, [text, type]);

  // Variantes del contenedor
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay / 1000,
        staggerChildren:
          motionVariants.stagger ??
          (type === "chars" ? 0.05 : type === "words" ? 0.2 : 0.3),
      },
    },
  };

  // Variantes de cada elemento
  const itemVariants: Variants = {
    hidden: {
      ...defaultItemVariant.hidden,
      ...(motionVariants.initial || {}),
    },
    visible: {
      ...defaultItemVariant.visible,
      ...(motionVariants.animate || {}),
      transition: {
        ...((defaultItemVariant.visible as TargetAndTransition).transition || {}),
        ...(motionVariants.transition || {}),
      },
    },
  };

  // Control de aparición en viewport
  const localRef = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(localRef, {
      once: inViewOnce,
      margin: inViewMargin as `${number}px ${number}px ${number}px ${number}px`,
  });


  const animateState: "hidden" | "visible" =
    !inView || isInView ? "visible" : "hidden";

  return (
    <motion.span
      ref={localRef}
      initial="hidden"
      animate={animateState}
      variants={containerVariants}
      {...props}
    >
      {items.map((item, index) =>
        item ? (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{
              display: "inline-block",
              whiteSpace: type === "chars" ? "pre" : "normal",
            }}
          >
            {item}
            {type === "words" && " "}
          </motion.span>
        ) : null
      )}
    </motion.span>
  );
};
