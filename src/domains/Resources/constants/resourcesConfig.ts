import type { FlipOverlayConfig } from "../types";

/**
 * IDs de las secciones de Resources
 */
export const RESOURCES_SECTION_IDS = {
  FLIP_OVERLAY: "flip-overlay",
  YOUTUBE: "recursos-youtube",
  INSTAGRAM: "recursos-instagram",
  TESTIMONIALS: "recursos-principales",
} as const;

/**
 * Textos de la página Resources
 */
export const RESOURCES_TEXTS = {
  // YouTube Section
  YOUTUBE_TITLE: "Iglesia Adventista Norte",
  YOUTUBE_TITLE_HIGHLIGHT: "En Youtube",
  YOUTUBE_DESCRIPTION_START: "Nos Encontramos en Youtube",
  YOUTUBE_DESCRIPTION_HIGHLIGHT: "Visítanos",
  YOUTUBE_DESCRIPTION_END: "y suscríbete para más contenido.",
  YOUTUBE_BUTTON: "Visítanos",
  YOUTUBE_VIDEO_TITLE: "Presentación Canal",

  // Instagram Section
  INSTAGRAM_TITLE: "Iglesia Adventista Norte",
  INSTAGRAM_TITLE_HIGHLIGHT: "en Instagram",
  INSTAGRAM_DESCRIPTION_START: "Síguenos en nuestra cuenta oficial de Instagram",
  INSTAGRAM_DESCRIPTION_MAIN: ", donde compartimos las buenas nuevas de salvación, actividades de nuestra comunidad y mensajes inspiradores. Con más de 171 publicaciones, 761 seguidores y 509 seguidos, nuestra página es un espacio para conectar con miembros de la Comunidad IASD Norte y mantenerse al día con eventos y proyectos de nuestra iglesia.",
  INSTAGRAM_BUTTON: "Ven y Síguenos",

  // Testimonials Section
  TESTIMONIALS_TITLE: "Recursos Principales",
} as const;

/**
 * URLs y rutas de medios
 */
export const RESOURCES_MEDIA = {
  YOUTUBE_CHANNEL_URL:
    "https://www.youtube.com/@iglesiaadventistanortebuca6594",
  YOUTUBE_VIDEO_EMBED: "https://www.youtube.com/embed/FwbFB7_cJPw",
  INSTAGRAM_URL: "https://www.instagram.com/iglesia__adventista__norte/",
  INSTAGRAM_LOGO: "/logo.jpg",
} as const;

/**
 * Datos del perfil de Instagram
 */
export const INSTAGRAM_PROFILE_DATA = {
  username: "iglesia__adventista__norte",
  name: "Comunicaciones Iglesia Norte",
  bio: "Comunidad\nIASD Norte\nCompartiendo las buenas nuevas de salvación 💌📖\n🟩 Nuestro club: @club_inalfe\n📍Carrera 20 #6-47, Bucaramanga, Santander\n🔗youtube.com/@iglesiaadventistanortebuca6594",
  posts: 171,
  followers: "761",
  following: 509,
} as const;

/**
 * Highlights de Instagram
 */
export const INSTAGRAM_HIGHLIGHTS = [
  {
    id: 1,
    title: "Anuncios",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaD7UnRooezdtaP9r22KQgROCPfkYKIBBAhg&s",
  },
  {
    id: 2,
    title: "Contenido Norte",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75v3zFAUeneXRND24yIvLDr15QNfxS3AR3g&s",
  },
] as const;

/**
 * Configuración del FlipPinnedOverlay
 */
export const FLIP_OVERLAY_CONFIG: FlipOverlayConfig = {
  flipEase: "power2.inOut",
  scrub: 0.25,
} as const;
