import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook personalizado para manejar scroll automático a secciones
 * Soporta dos modos:
 * 1. Hash en la URL (/nosotros#seccion)
 * 2. Estado de navegación ({ scrollToSection: 'seccion' })
 * 
 * @param delay - Tiempo de espera antes de hacer scroll (ms), por defecto 300ms
 */
export function useScrollToSection(delay: number = 300) {
  const location = useLocation();

  useEffect(() => {
    let sectionId: string | null = null;

    // Verificar si hay un hash en la URL
    if (location.hash) {
      sectionId = location.hash.replace('#', '');
    } 
    // Verificar si hay un estado de navegación con scrollToSection
    else {
      const state = location.state as { scrollToSection?: string } | null;
      sectionId = state?.scrollToSection ?? null;
    }

    if (sectionId) {
      // Esperar a que el componente se renderice completamente
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [location, delay]);
}

