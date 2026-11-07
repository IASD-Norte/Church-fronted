import { CalendarView } from "@/core/components/calendarEvents";
import { EVENTS_SECTION_IDS } from "@/domains/events/constants/eventsConfig";

/**
 * Sección del calendario de eventos
 * Muestra el calendario interactivo con todos los eventos programados
 */
export function CalendarSection() {
  return (
    <section id={EVENTS_SECTION_IDS.CALENDAR} className="w-full min-h-screen scroll-mt-24 py-20 px-6 lg:px-16 bg-[#fcf9f4] dark:bg-zinc-950">
      {/* Header de la sección */}
      <div className="max-w-7xl mx-auto mb-12">
        <span className="font-['Brush_Script_MT',cursive,serif] text-3xl md:text-4xl text-[#dfa83d] inline-block -rotate-2 mb-2 ml-2">
          Organiza tu tiempo
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif text-primary dark:text-zinc-100 tracking-tight leading-tight mb-4">
          Calendario de Eventos
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-lg font-medium">
          Explora todos nuestros eventos programados y planifica tu participación.
        </p>
      </div>

      {/* Calendario */}
      <div className="max-w-7xl mx-auto">
        <CalendarView />
      </div>
    </section>
  );
}

