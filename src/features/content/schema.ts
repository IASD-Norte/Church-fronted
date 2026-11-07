export type HomeHeroSetting = {
  mode: 'clip' | 'live'
  youtubeId: string
  liveUrl: string
  startSeconds: number
  endSeconds: number
  loopDurationMs: number
  headline: string
  playUrl: string
}

export type HomeStatItem = {
  value: number
  label: string
}

export type HomeStatsSetting = {
  items: HomeStatItem[]
}

export type HomeIntroSetting = {
  imageUrl: string
  eyebrow: string
  heading: string
  body: string
  quote: string
  badgeNumber: string
  badgeLabel: string
}

export type MissionSetting = {
  mission: string
  vision: string
}

export type SocialSetting = {
  youtube: string
  instagram: string
  facebook: string
}

export type HomeCtaSetting = {
  headline: string
}

export type HomeHeroContactSetting = {
  title1: string
  title2: string
  buttonText: string
  buttonHref: string
  youtubeId: string
  startSeconds: number
  endSeconds: number
}

export type HomeChurchesSetting = {
  eyebrow: string
  heading: string
  ctaLabel: string
  ctaHref: string
}

export type ContactFormSetting = {
  locationEyebrow: string
  locationHeading: string
  locationBody: string
  formBadge: string
  formScriptHeading: string
  formTitle: string
  formSubtitle: string
  nameLabel: string
  emailLabel: string
  messageLabel: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
  submitLabel: string
  submittingLabel: string
  successTitle: string
  successBody: string
}

export type AboutHeroSetting = {
  backgroundImageUrl: string
  visitLabel: string
  joinLabel: string
  joinHref: string
  title1: string
  title2: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export type AboutIntroSetting = {
  title: string
  subtitle: string
}

export type AboutMissionItem = {
  id: string
  title: string
  description: string
}

export type AboutMissionSetting = {
  items: AboutMissionItem[]
}

export type DepartmentsIndexSetting = {
  heroImageUrl: string
  breadcrumbHome: string
  breadcrumbCurrent: string
  title1: string
  title2: string
  intro: string
  verse: string
  verseRef: string
  cardCta: string
}

export type GruposPageSetting = {
  headerBackgroundUrl: string
  title: string
  imageUrl: string
  leadershipLabel: string
  leadershipMiddle: string
  leadershipHeading: string
  bodyLeft: string
  bodyRight: string
  gridHeading: string
}

export type NavLinkItem = {
  label: string
  href: string
}

export type SiteHeaderSetting = {
  /** Logo sobre fondo claro (navbar con fondo). */
  logoUrl: string
  /** Logo sobre el video de Inicio (navbar transparente). Vacío = logoUrl en blanco. */
  logoOnDarkUrl: string
  homeLabel: string
  aboutLabel: string
  departmentsLabel: string
  resourcesLabel: string
  eventsLabel: string
  contactLabel: string
  aboutImageUrl: string
  aboutLinks: NavLinkItem[]
  aboutPrimaryCtaLabel: string
  aboutPrimaryCtaHref: string
  aboutSecondaryCtaLabel: string
  aboutSecondaryCtaHref: string
  departmentsLinks: NavLinkItem[]
  departmentsCtaLabel: string
}

export type ContentMap = {
  home_hero: HomeHeroSetting
  home_intro: HomeIntroSetting
  stats: HomeStatsSetting
  mission: MissionSetting
  social: SocialSetting
  home_cta: HomeCtaSetting
  home_hero_contact: HomeHeroContactSetting
  home_churches: HomeChurchesSetting
  contact_form: ContactFormSetting
  about_hero: AboutHeroSetting
  about_intro: AboutIntroSetting
  about_mission: AboutMissionSetting
  departments_index: DepartmentsIndexSetting
  grupos_page: GruposPageSetting
  site_header: SiteHeaderSetting
  [key: string]: unknown
}

export const DEFAULT_HERO: HomeHeroSetting = {
  mode: 'clip',
  youtubeId: 'sr6t9YlsQ3I',
  liveUrl: '',
  startSeconds: 7590,
  endSeconds: 7603,
  loopDurationMs: 12900,
  headline: 'Iglesia Adventista Norte Bucaramanga.',
  playUrl: 'https://www.youtube.com/watch?v=sr6t9YlsQ3I&t=7601s',
}

export const DEFAULT_STATS: HomeStatsSetting = {
  items: [
    { value: 300, label: 'Miembros Activos' },
    { value: 20, label: 'Grupos Pequeños' },
    { value: 10, label: 'Departamentos' },
    { value: 50, label: 'Niños y Jóvenes' },
  ],
}

export const DEFAULT_INTRO: HomeIntroSetting = {
  imageUrl: '/images/mas/1.jpg',
  eyebrow: 'Nuestra Iglesia Norte',
  heading: 'Elevando estándares de fe y servicio en la comunidad',
  body: 'La Iglesia Adventista Norte de Bucaramanga te ofrece un espacio lleno de esperanza, estudio profundo de la palabra y un sentido real de pertenencia.',
  quote:
    'El cuidado, la dedicación y el compromiso de cada uno de los miembros de nuestra comunidad son absolutamente maravillosos. Te invitamos a ser parte del cuerpo de Cristo con nosotros, donde cada miembro recibe su crecimiento para ir edificándose en amor.',
  badgeNumber: '07',
  badgeLabel: 'Septimo Dia',
}

export const DEFAULT_MISSION: MissionSetting = {
  mission: 'Hacer discípulos de todas las naciones',
  vision: 'Ser una iglesia que transforma vidas',
}

export const DEFAULT_SOCIAL: SocialSetting = {
  youtube: 'https://youtube.com',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
}

export const DEFAULT_HOME_CTA: HomeCtaSetting = {
  headline: 'Cristo Viene Pronto ¿Estás Preparado?',
}

export const DEFAULT_HOME_HERO_CONTACT: HomeHeroContactSetting = {
  title1: 'Iglesia Adventista del Séptimo Día – Norte Bucaramanga',
  title2:
    'Yo soy el pan de vida; el que a mí viene, nunca tendrá hambre. Juan 3:16 - Norte de Bucaramanga, Santander',
  buttonText: 'Contactanos',
  buttonHref: '#/contact',
  youtubeId: 'LenghWYt7Yc',
  startSeconds: 19,
  endSeconds: 60,
}

export const DEFAULT_HOME_CHURCHES: HomeChurchesSetting = {
  eyebrow: 'Explora',
  heading: 'Nuestros Grupos Pequeños',
  ctaLabel: 'Todos los grupos',
  ctaHref: '/grupos',
}

export const DEFAULT_CONTACT_FORM: ContactFormSetting = {
  locationEyebrow: 'Ubicación',
  locationHeading: 'Encuéntranos en Norte Bucaramanga',
  locationBody:
    'Estamos ubicados en diferentes sectores de la zona norte. ¡Visítanos o escríbenos para más detalles!',
  formBadge: 'Contacto',
  formScriptHeading: 'Escríbenos',
  formTitle: 'Envía tu mensaje o tu petición de oración',
  formSubtitle:
    'Completa el formulario a continuación y estaremos comunicándonos u orando por ti muy pronto.',
  nameLabel: 'Nombre completo',
  emailLabel: 'Correo electrónico',
  messageLabel: '¿Cómo podemos ayudarte?',
  namePlaceholder: 'Tu nombre completo',
  emailPlaceholder: 'tucorreo@ejemplo.com',
  messagePlaceholder: 'Escribe tu mensaje o petición de oración aquí...',
  submitLabel: 'ENVIAR MENSAJE',
  submittingLabel: 'ENVIANDO...',
  successTitle: '¡Mensaje enviado con éxito!',
  successBody: 'Gracias por ponerte en contacto. Dios te bendiga.',
}

export const DEFAULT_ABOUT_HERO: AboutHeroSetting = {
  backgroundImageUrl:
    'https://oidyved.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-10-at-5.50.05-AM.png.webp',
  visitLabel: 'Visitanos!',
  joinLabel: 'Unete a Nosotros',
  joinHref: '/#/#Contactanos',
  title1: 'IGLESIA ADVENTISTA ',
  title2: 'NORTE',
  description:
    'La Iglesia Adventista del Séptimo Día lleva esperanza al mundo para que las personas vivan con la certeza de que su historia no termina aquí.',
  ctaLabel: 'Quiénes Somos',
  ctaHref: '#nosotros',
}

export const DEFAULT_ABOUT_INTRO: AboutIntroSetting = {
  title: '¿QUIENES SOMOS?',
  subtitle:
    'Basamos nuestros logros no en nuestras fuerzas sino en la bondad y amor a Dios hacia cada uno de sus hijos. Porque "Dios es fiel, su amor es para siempre".',
}

export const DEFAULT_ABOUT_MISSION: AboutMissionSetting = {
  items: [
    {
      id: '01',
      title: 'Nuestra Misión',
      description:
        'Glorificar a Dios haciendo discípulos de Jesucristo que, como miembros de la familia de la iglesia, crecen espiritualmente y transforman sus comunidades a través del amor, el servicio y la proclamación del evangelio eterno.',
    },
    {
      id: '02',
      title: 'Nuestra Visión',
      description:
        'Ser una comunidad de fe que inspire y transforme vidas, llevando esperanza y amor a cada corazón, reflejando el carácter de Cristo en todo lo que hacemos y preparando a las personas para su pronto regreso.',
    },
    {
      id: '03',
      title: 'Nuestros Valores',
      description:
        'Promovemos la fe, el servicio, la unidad, el compromiso con la comunidad y la esperanza en Cristo, guiando cada acción de nuestra iglesia local.',
    },
    {
      id: '04',
      title: 'Nuestro Compromiso',
      description:
        'Nos dedicamos a compartir el mensaje del evangelio, acompañar a las familias, fortalecer la juventud y servir con amor siguiendo el ejemplo de Jesús.',
    },
  ],
}

export const DEFAULT_DEPARTMENTS_INDEX: DepartmentsIndexSetting = {
  heroImageUrl:
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2940&auto=format&fit=crop',
  breadcrumbHome: 'Inicio',
  breadcrumbCurrent: 'Departamentos | Ministerios',
  title1: 'Departamentos',
  title2: 'MINISTERIOS',
  intro:
    'La estructura de la iglesia, bajo la dirección del Espíritu Santo, es vital para el crecimiento espiritual de los miembros, y para el cumplimiento de la misión de la iglesia. Es el esqueleto del cuerpo eclesiástico.',
  verse:
    '"Todo el cuerpo, bien concertado y unido entre sí por todas las coyunturas que se ayudan mutuamente, según la actividad propia de cada miembro, recibe su crecimiento para ir edificándose en amor."',
  verseRef: 'Efesios 4:16',
  cardCta: 'Conocer más',
}

export const DEFAULT_GRUPOS_PAGE: GruposPageSetting = {
  headerBackgroundUrl:
    'https://yt3.googleusercontent.com/bLVFMOMC6WM6akoAJrC0VsRc7E82M2ThLV51b9WfLi2SOg_DFxaSxJVwSbyuqFdsU6AV1lYi=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
  title: 'Proyecto | Grupos Pequeños',
  imageUrl: '/images/mas/4.jpg',
  leadershipLabel: 'Liderazgo',
  leadershipMiddle: 'EN',
  leadershipHeading: 'GRUPOS\nPEQUEÑOS',
  bodyLeft:
    'Los grupos pequeños (GP) están compuestos por varias personas que se reúnen una vez a la semana con el propósito de estudiar la Biblia. La IASD toma este modelo de la experiencia de los primeros cristianos. Las reuniones son conducidas por un líder, quien dirige el estudio bíblico, apoyado también por una serie de materiales editados por la IASD. Los objetivos de los GP son: a) incentivar a las personas a experimentar el compañerismo y el crecimiento espiritual.',
  bodyRight:
    'e) promover la multiplicación del grupo con nuevos amigos y futuros miembros de la iglesia. La celebración de la amistad en pequeños grupos es una estrategia apropiada, porque permite fortalecer las relaciones interpersonales basadas en la hermandad y la fe, fomenta el desarrollo de los dones espirituales, favorece lazos de amistad entre los participantes por medio del intercambio de ideas y experiencias, y conduce al estudio profundo de la Palabra de Dios.',
  gridHeading: 'Conoce nuestros grupos',
}

export const DEFAULT_SITE_HEADER: SiteHeaderSetting = {
  logoUrl: '/logo/logo-remove.png',
  logoOnDarkUrl: '',
  homeLabel: 'Inicio',
  aboutLabel: 'Nosotros',
  departmentsLabel: 'Departamentos',
  resourcesLabel: 'Recursos',
  eventsLabel: 'Eventos',
  contactLabel: 'Contactanos',
  aboutImageUrl: '/images/mas/1.jpg',
  aboutLinks: [
    { label: '¿Quiénes Somos?', href: '/nosotros#quienes-somos' },
    { label: 'Creencias', href: '/nosotros#creencias' },
    { label: 'Nuestra Historia', href: '/nosotros#historia' },
    { label: 'Recursos', href: '/recursos' },
  ],
  aboutPrimaryCtaLabel: 'Conócenos más',
  aboutPrimaryCtaHref: '/nosotros',
  aboutSecondaryCtaLabel: 'Contáctanos',
  aboutSecondaryCtaHref: '/contact',
  departmentsLinks: [
    { label: 'Mayordomía', href: '/departamentos/mayordomia' },
    { label: 'Diáconos', href: '/departamentos/diaconos' },
    { label: 'Conquistadores', href: '/departamentos/conquistadores' },
    { label: 'Ministerios Personales', href: '/departamentos/ministerios-personales' },
    { label: 'Comunicaciones', href: '/departamentos/comunicaciones' },
    { label: 'Escuela Sabática', href: '/departamentos/escuela-sabatica' },
    { label: 'Jóvenes', href: '/departamentos/jovenes' },
    { label: 'Universitarios', href: '/departamentos/universitarios' },
    { label: 'Educación', href: '/departamentos/educacion' },
    { label: 'Familia', href: '/departamentos/familia' },
    { label: 'Salud', href: '/departamentos/salud' },
    { label: 'Dorcas', href: '/departamentos/dorcas' },
    { label: 'Tesorería', href: '/departamentos/tesoreria' },
  ],
  departmentsCtaLabel: 'Ver todos los departamentos',
}

export function normalizeStats(
  raw: HomeStatsSetting | Record<string, unknown> | null | undefined,
): HomeStatsSetting {
  if (raw && Array.isArray((raw as HomeStatsSetting).items)) {
    return raw as HomeStatsSetting
  }
  const legacy = (raw ?? {}) as Record<string, unknown>
  return {
    items: [
      {
        value: Number(legacy.members ?? 0),
        label: String(legacy.membersLabel ?? 'Miembros Activos'),
      },
      {
        value: Number(legacy.groups ?? 0),
        label: String(legacy.groupsLabel ?? 'Grupos Pequeños'),
      },
      {
        value: Number(legacy.departments ?? 0),
        label: String(legacy.departmentsLabel ?? 'Departamentos'),
      },
      {
        value: Number(legacy.youth ?? 0),
        label: String(legacy.youthLabel ?? 'Niños y Jóvenes'),
      },
    ],
  }
}
