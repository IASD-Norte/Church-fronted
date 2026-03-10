import { AboutContentSection } from "../components/AboutContentSection";
import { AboutHeroSection } from "../components/AboutHeroSection";

/**
 * Página principal de About (Nosotros)
 * Organiza todas las secciones de la página "Quiénes Somos"
 * 
 * Estructura:
 * - Hero Section: Presentación con imagen de fondo
 * - Content Section: Misión, Visión, Valores e Historia
 */
export default function About() {

  return (
    <section >
      {/* Sección Hero con background y mensaje principal */}
      <AboutHeroSection />

      {/* Sección de contenido principal con todas las subsecciones */}
      <AboutContentSection />
    </section>
  );
}

