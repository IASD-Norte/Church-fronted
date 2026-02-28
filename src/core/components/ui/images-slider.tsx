"use client";

import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence, type Variants } from "motion/react";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 === images.length ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? images.length - 1 : prev - 1
    );
  };

  // Precargar imágenes
  useEffect(() => {
    const loadImages = async () => {
      const promises = images.map(
        (src) =>
          new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = reject;
          })
      );

      try {
        const loaded = await Promise.all(promises);
        setLoadedImages(loaded);
      } catch (e) {
        console.error("Error loading images", e);
      }
    };

    loadImages();
  }, [images]);

  // Autoplay + teclado
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", onKeyDown);

    let interval: NodeJS.Timeout | undefined;
    if (autoplay) {
      interval = setInterval(handleNext, 5000);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  // ✅ Variants CORREGIDOS
  const slideVariants: Variants = {
    initial: {
      scale: 0.95,
      opacity: 0,
      rotateX: 25,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    upExit: {
      y: "-150%",
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    downExit: {
      y: "150%",
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const ready = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden flex items-center justify-center",
        className
      )}
      style={{ perspective: "1900px" }}
    >
      {ready && children}

      {ready && overlay && (
        <div
          className={cn(
            "absolute inset-0 z-40 bg-black/10",
            overlayClassName
          )}
        />
      )}

      {ready && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="absolute inset-0 h-full w-full object-cover object-center brightness-80"
            draggable={false}
          />
        </AnimatePresence>
      )}
    </div>
  );
};
