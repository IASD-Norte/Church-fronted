"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CountdownTimer } from "@/core/components/ui/countdown-timer"; // ajusta el path si cambia

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  date?: string; // fecha del evento
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 font-sans antialiased">
      <div className="relative grid grid-cols-1 gap-32 md:grid-cols-2">
        {/* IMAGEN */}
        <div className="relative h-[420px] lg:h-[480px] w-full">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.5,
                  scale: isActive(index) ? 1 : 0.95,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length - index,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(),
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                {/* BADGE */}
                <div className="absolute top-4 left-4 z-50">
                  <span className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg">
                    Próximamente
                  </span>
                </div>

                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  draggable={false}
                  className="h-full w-full rounded-xl object-cover shadow-2xl"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* TEXTO + CONTADOR */}
        <div className="flex flex-col justify-between py-6">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h3 className="text-5xl font-extrabold font-mono">
              {testimonials[active].name}
            </h3>

            <p className="mt-1 text-base text-gray-500">
              {testimonials[active].designation}
            </p>

            <motion.p className="mt-10 text-lg italic leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 6 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* CONTADOR */}
          {testimonials[active].date && (
            <div className="mt-10 flex justify-center font-mono">
              <CountdownTimer
                targetDate={testimonials[active].date}
                variant="default"
              />
            </div>
          )}

          {/* CONTROLES */}
          <div className="mt-10 flex gap-5 justify-center md:justify-start">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-black/80"
            >
              <IconArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-black/80"
            >
              <IconArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
