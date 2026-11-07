import { cn } from "@/shared/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightIcon,
  CalendarX,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { EventDetailsModal } from "@/core/components/EventDetailsModal";
import { EVENTS_SECTION_IDS } from "@/domains/events/constants/eventsConfig";
import { formatEventDateLabel, useUpcomingEvents } from "@/features/events";

const scrollToCalendar = () =>
  document
    .getElementById(EVENTS_SECTION_IDS.CALENDAR)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

export function EventsCarousel() {
  const { events, status } = useUpcomingEvents();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const itemWidth =
      carouselRef.current.querySelector(".carousel-item")?.clientWidth || 0;

    // Scroll by the width of one item + gap
    carouselRef.current.scrollBy({
      left: direction === "left" ? -(itemWidth + 24) : (itemWidth + 24),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const onScroll = () => {
      const itemWidth =
        carousel.querySelector(".carousel-item")?.clientWidth || 1;
      // Adding gap to item width calculation for accurate index
      setCurrentIndex(Math.round(carousel.scrollLeft / (itemWidth + 24)));
    };

    carousel.addEventListener("scroll", onScroll);
    return () => carousel.removeEventListener("scroll", onScroll);
  }, [events.length]);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const getVisibleCards = () => getVisibleCount();
  const maxIndex = Math.max(0, events.length - getVisibleCards());

  return (
    <section
      data-cms-collection="events"
      className="w-full py-20 md:py-32 bg-background"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="font-['Brush_Script_MT',cursive,serif] text-3xl md:text-4xl text-[#dfa83d] inline-block -rotate-2 mb-2 ml-2">
              Nuestros últimos
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-primary dark:text-zinc-100 tracking-tight leading-none">
              Próximos Eventos
            </h2>
          </div>

          <div className="hidden md:block">
            <button type="button" onClick={scrollToCalendar} className="px-8 py-3 border border-primary/40 dark:border-zinc-700 text-xs font-semibold tracking-[0.2em] uppercase text-primary dark:text-zinc-100 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
              Ver Todos &nbsp; <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {status !== "ready" || events.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border py-20 text-center text-muted-foreground">
            {status === "loading" ? (
              <span className="text-sm">Cargando eventos…</span>
            ) : (
              <>
                <CalendarX className="w-8 h-8" />
                <span className="text-sm">
                  {status === "error"
                    ? "No se pudieron cargar los eventos."
                    : "No hay eventos próximos por ahora."}
                </span>
              </>
            )}
          </div>
        ) : (
        /* Carousel Area */
        <div className="relative">
          {/* Navigation Controls Contextual */}
          <div className="hidden lg:flex absolute -left-16 top-1/3 -translate-y-1/2 z-10">
            <button
              onClick={() => handleScroll("left")}
              disabled={currentIndex <= 0}
              className={cn(
                "p-3 rounded-none border border-border/50 bg-background/80 backdrop-blur-sm text-primary dark:text-zinc-300 transition-all hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900",
                currentIndex <= 0 && "opacity-30 cursor-not-allowed hover:bg-background/80 hover:text-primary dark:hover:text-zinc-300"
              )}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden lg:flex absolute -right-16 top-1/3 -translate-y-1/2 z-10">
            <button
              onClick={() => handleScroll("right")}
              disabled={currentIndex >= maxIndex}
              className={cn(
                "p-3 rounded-none border border-border/50 bg-background/80 backdrop-blur-sm text-primary dark:text-zinc-300 transition-all hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900",
                currentIndex >= maxIndex && "opacity-30 cursor-not-allowed hover:bg-background/80 hover:text-primary dark:hover:text-zinc-300"
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="flex overflow-x-scroll gap-6 lg:gap-8 snap-x snap-mandatory scrollbar-hide pb-8"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                data-cms-collection="events"
                data-cms-id={event.id}
                onClick={() => setOpenIndex(index)}
                className="carousel-item snap-start shrink-0 w-[85vw] sm:w-[45vw] xl:w-[calc(33.333%-1.5rem)] flex flex-col group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                {/* Image Card */}
                <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 mb-6">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm tracking-[0.2em] uppercase">
                      {event.typeLabel}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-1">
                  <span className="text-sm font-medium text-muted-foreground mb-3">
                    {formatEventDateLabel(event)}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-serif text-primary dark:text-zinc-100 leading-tight mb-4 group-hover:text-[#dfa83d] transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="mt-auto pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenIndex(index);
                      }}
                      className="inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase text-primary dark:text-zinc-100 group/btn"
                    >
                      Leer Más <ArrowRightIcon className="w-4 h-4 ml-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}

        <EventDetailsModal
          events={openIndex === null ? [] : events}
          initialIndex={openIndex ?? 0}
          onClose={() => setOpenIndex(null)}
        />

        {/* Mobile View All button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button type="button" onClick={scrollToCalendar} className="w-full px-8 py-4 border border-primary/40 dark:border-zinc-700 text-xs font-semibold tracking-[0.2em] uppercase text-primary dark:text-zinc-100 flex items-center justify-center transition-all duration-300">
            Ver Todos &nbsp; <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
