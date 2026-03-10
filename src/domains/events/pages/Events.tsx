import { useScrollToSection } from "@/shared/hooks/useScrollToSection";
import { CalendarSection } from "../components/CalendarSection";
import { CarouselSection } from "../components/CarouselSection";

/**
 * Página principal de Eventos
 * Organiza todas las secciones relacionadas con eventos
 */
export default function Events() {
  // Manejar scroll a secciones cuando se navega con hash
  useScrollToSection();
  return (
    <main className="flex flex-col min-h-screen bg-background w-full">
      {/* Sección del carousel de eventos */}
      <CarouselSection />

      {/* Sección del calendario de eventos */}
      <CalendarSection />

    </main>
  );
}

