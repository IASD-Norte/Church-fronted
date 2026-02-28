/**
 * Configuración del scroll para la página de Home
 */
export const HOME_SCROLL_CONFIG = {
  panelSelector: "#sectionD, #Anuncios, #section2, #section3, #section4",
  snapDuration: 0.55,
  markers: false,
  disableOnMobile: true,
  endTrigger: "#section4",
} as const;

/**
 * IDs de las secciones del Home
 */
export const HOME_SECTION_IDS = {
  CAROUSEL: "sectionD",
  ANNOUNCEMENTS: "Anuncios",
  GRAPHS: "section2",
  CHURCHES: "section3",
  CALL_TO_ACTION: "section4",
  CONTACT: "Contactanos",
} as const;

/**
 * Textos de la página Home
 */
export const HOME_TEXTS = {
  ANNOUNCEMENTS_TITLE: "Anuncios Importantes",
  CHURCHES_TITLE: "Grupos de Oración en Norte Bucaramanga",
  CALL_TO_ACTION: "Cristo Viene Pronto ¿Estás Preparado?",
  HERO_TITLE_1: "Iglesia Adventista del Séptimo Día – Norte Bucaramanga",
  HERO_TITLE_2: "Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre. Juan 3:16 - Norte de Bucaramanga, Santander",
} as const;

/**
 * Rutas de medios
 */
export const HOME_MEDIA = {
  VIDEO_PATH: "/prueba.mp4",
} as const;

