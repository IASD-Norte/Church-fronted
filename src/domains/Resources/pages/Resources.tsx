import { useScrollToSection } from "@/shared/hooks/useScrollToSection";
import { FlipPinnedOverlay } from "../components/FlipPinnedOverlay";
import { InstagramSection } from "../components/InstagramSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { YouTubeSection } from "../components/YouTubeSection";
import { FLIP_OVERLAY_CONFIG } from "../constants/resourcesConfig";

/**
 * Página de Recursos
 * Muestra los recursos de la iglesia: YouTube, Instagram y materiales descargables
 */
export default function Resources() {
  // Manejar scroll a secciones cuando se navega con hash
  useScrollToSection();
  return (
    <main className="w-full h-full bg-background">
      {/* Sección con efecto flip entre YouTube e Instagram */}
      <FlipPinnedOverlay
        flipEase={FLIP_OVERLAY_CONFIG.flipEase}
        scrub={FLIP_OVERLAY_CONFIG.scrub}
      >
        <YouTubeSection />
        <div className="w-full h-[115%]">
          <InstagramSection />
        </div>
      </FlipPinnedOverlay>

      {/* Sección de recursos principales */}
      <TestimonialsSection />
    </main>
  );
}
