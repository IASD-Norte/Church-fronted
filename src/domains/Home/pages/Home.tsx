import { useScrollHomeTrigger } from "@/shared/hooks/scrollHomeTrigger";
import { useScrollToSection } from "@/shared/hooks/useScrollToSection";
// import { AnnouncementsSection } from "../components/AnnouncementsSection";
import { CallToActionSection } from "../components/CallToActionSection";
import { CarouselSection } from "../components/CarouselSection";
import { ChurchesSection } from "../components/ChurchesSection";
import { ContactSection } from "../components/ContactSection";
import { GraphSection } from "../components/GraphSection";
import { HeroContactSection } from "../components/HeroContactSection";
import { HOME_SCROLL_CONFIG } from "../constants/homeConfig";

/**
 * Página principal de Home
 * Organiza todas las secciones del landing page
 */
export default function Home() {
  // Configurar el scroll animado para las secciones
  useScrollHomeTrigger(HOME_SCROLL_CONFIG);
  
  // Manejar scroll a secciones cuando se navega desde otras páginas
  useScrollToSection();

  return (
    <main className="w-full min-h-screen bg-background">
      {/* Sección del carousel principal */}
      <CarouselSection />

      {/* Sección de gráficas estadísticas */}
      <GraphSection />

      {/* Sección del mapa e iglesias */}
      <ChurchesSection />

      
      
      {/* Sección de anuncios */}
      {/* <AnnouncementsSection /> */}



      {/* Sección de llamada a la acción */}
      <CallToActionSection />

      {/* Sección hero con video y CTA */}
      <HeroContactSection />

      {/* Sección de contacto */}
      <ContactSection />
    </main>
  );
}

