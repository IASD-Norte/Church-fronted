import { cn } from "@/shared/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { CalendarEvent } from "@/domains/events/utils/calendar.utils";
import { addToCalendar } from "@/domains/events/utils/calendar.utils";

// 🔹 Eventos con fechas REALES
const events: CalendarEvent[] = [
  {
    id: 8,
    name: "Retiro Espiritual de Sanidad",
    description:
      "Un encuentro transformador con Dios. Un día de renovación espiritual, oración y sanidad integral.",
    category: "Evento Espiritual",
    dateLabel: "Sábado, 16 de Noviembre de 2025",
    startDate: "2025-11-16T09:00:00-05:00",
    endDate: "2025-11-16T17:00:00-05:00",
    location: "Iglesia Central",
    imageUrl:
      "https://es.armsa.com/wp-content/uploads/2018/01/Capa-Face-Acamp-Verao-ARM-2018-Esp_3000px.jpg",
  },
  {
    id: 9,
    name: "Conferencia de Avivamiento 2025",
    description:
      "Tres días de renovación espiritual, milagros y palabra viva.",
    category: "Conferencia Cristiana",
    dateLabel: "21 al 23 de Noviembre de 2025",
    startDate: "2025-11-21T18:00:00-05:00",
    endDate: "2025-11-23T21:00:00-05:00",
    location: "Auditorio Principal",
    imageUrl:
      "https://files.adventistas.org/downloads_v2/es/2024/10/22185443/Capa.jpg",
  },
  {
    id: 10,
    name: "Noche de Adoración y Milagros",
    description:
      "Una noche donde los cielos se abren. Ven con fe y expectativa.",
    category: "Evento Espiritual",
    dateLabel: "Sábado, 23 de Noviembre de 2025",
    startDate: "2025-11-23T19:00:00-05:00",
    endDate: "2025-11-23T22:00:00-05:00",
    location: "Iglesia Adventista Norte",
    imageUrl: "https://i.ytimg.com/vi/9UKPeLll7Pk/hq720.jpg",
  },
  {
    id: 11,
    name: "Taller de Liderazgo Juvenil",
    description: "Capacitación intensiva para líderes jóvenes.",
    category: "Capacitación Ministerial",
    dateLabel: "Domingo, 17 de Noviembre de 2025",
    startDate: "2025-11-17T08:00:00-05:00",
    endDate: "2025-11-17T13:00:00-05:00",
    location: "Salón Juvenil",
    imageUrl:
      "https://i.ytimg.com/vi/12_uwZnBBVM/maxresdefault.jpg",
  },
  {
    id: 12,
    name: "Campamento Conquistadores",
    description: "Tres días para fortalecer la unión familiar.",
    category: "Campamento Familiar",
    dateLabel: "22 al 24 de Noviembre de 2025",
    startDate: "2025-11-22T08:00:00-05:00",
    endDate: "2025-11-24T17:00:00-05:00",
    location: "Centro Campestre",
    imageUrl:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flags%2C-pathfinders%2C-conquistadores%2C-adventist-design-template-2de78eb0694895dba3344950549a7896_screen.jpg",
  },
];

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
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
  }, []);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const getVisibleCards = () => getVisibleCount();
  const maxIndex = Math.max(0, events.length - getVisibleCards());

  return (
    <section className="w-full py-20 md:py-32 bg-background">
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
            <button className="px-8 py-3 border border-primary/40 dark:border-zinc-700 text-xs font-semibold tracking-[0.2em] uppercase text-primary dark:text-zinc-100 flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
              Ver Todos &nbsp; <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Carousel Area */}
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
                className="carousel-item snap-start shrink-0 w-[85vw] sm:w-[45vw] xl:w-[calc(33.333%-1.5rem)] flex flex-col group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                {/* Image Card */}
                <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900 mb-6">
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-1">
                  <span className="text-sm font-medium text-muted-foreground mb-3">
                    {event.dateLabel}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-serif text-primary dark:text-zinc-100 leading-tight mb-4 group-hover:text-[#dfa83d] transition-colors duration-300 line-clamp-2">
                    {event.name}
                  </h3>

                  <div className="mt-auto pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCalendar(event);
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

        {/* Mobile View All button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button className="w-full px-8 py-4 border border-primary/40 dark:border-zinc-700 text-xs font-semibold tracking-[0.2em] uppercase text-primary dark:text-zinc-100 flex items-center justify-center transition-all duration-300">
            Ver Todos &nbsp; <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
