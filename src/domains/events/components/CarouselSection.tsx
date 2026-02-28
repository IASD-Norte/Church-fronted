import { EventsCarousel } from "@/domains/events/components/eventsCarousel";

/**
 * Sección del carousel de eventos
 * Muestra los próximos eventos en un carousel 3D
 */
export function CarouselSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      
      <div className="w-full shrink-0">
        <EventsCarousel />
      </div>
    </section>
  );
}

