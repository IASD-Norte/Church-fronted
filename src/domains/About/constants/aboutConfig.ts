/**
 * Configuración del scroll para la página de Nosotros (About)
 */
export const ABOUT_SCROLL_CONFIG = {
  panelSelector: "#hero__nosotros, #nosotros",
  snapDuration: 0.55,
  markers: false,
  disableOnMobile: true,
  endTrigger: "#nosotros",
} as const;

/**
 * IDs de las secciones de About
 */
export const ABOUT_SECTION_IDS = {
  HERO: "hero__nosotros",
  CONTENT: "quienes-somos",
} as const;

/**
 * Textos de la página Nosotros
 */
export const ABOUT_TEXTS = {
  JOIN_US: "Unete a Nosotros",
  VISIT_US: "Visitanos!",
  TITLE_1: "IGLESIA ADVENTISTA ",
  TITLE_2: "NORTE",
  DESCRIPTION:
    "La Iglesia Adventista del Séptimo Día lleva esperanza al mundo para que las personas vivan con la certeza de que su historia no termina aquí.",
  HERO_BUTTON: "Quiénes Somos",
  CONTENT_TITLE: "¿QUIENES SOMOS?",
  CONTENT_SUBTITLE: 'Basamos nuestros logros no en nuestras fuerzas sino en la bondad y amor a Dios hacia cada uno de sus hijos. Porque "Dios es fiel, su amor es para siempre".',
} as const;

/**
 * Misión y Visión
 */
export const MISSION_VISION = {
  MISSION: {
    TITLE: "Nuestra Misión",
    DESCRIPTION:
      "Glorificar a Dios haciendo discípulos de Jesucristo que, como miembros de la familia de la iglesia, crecen espiritualmente y transforman sus comunidades a través del amor, el servicio y la proclamación del evangelio eterno.",
  },
  VISION: {
    TITLE: "Nuestra Visión",
    DESCRIPTION:
      "Ser una comunidad de fe que inspire y transforme vidas, llevando esperanza y amor a cada corazón, reflejando el carácter de Cristo en todo lo que hacemos y preparando a las personas para su pronto regreso.",
  },
} as const;

/**
 * Valores de la iglesia
 */
export const CHURCH_VALUES = [
  {
    TITLE: "Fe en Cristo",
    DESCRIPTION: "Creemos en Jesús como nuestro Salvador y Señor, fundamento de nuestra esperanza.",
    ICON: "cross",
  },
  {
    TITLE: "Amor al Prójimo",
    DESCRIPTION: "Servimos con compasión y dedicación a nuestra comunidad y al mundo.",
    ICON: "heart",
  },
  {
    TITLE: "Estudio Bíblico",
    DESCRIPTION: "La Biblia es nuestra guía suprema para la fe y la práctica cristiana.",
    ICON: "book",
  },
  {
    TITLE: "Vida Saludable",
    DESCRIPTION: "Promovemos el bienestar integral: físico, mental, espiritual y social.",
    ICON: "sparkles",
  },
  {
    TITLE: "Comunidad",
    DESCRIPTION: "Construimos relaciones genuinas basadas en el respeto y el apoyo mutuo.",
    ICON: "users",
  },
  {
    TITLE: "Esperanza Viva",
    DESCRIPTION: "Vivimos con la esperanza del regreso de Cristo y la vida eterna.",
    ICON: "sun",
  },
] as const;

/**
 * Historia de la iglesia
 */
export const CHURCH_HISTORY = {
  TITLE: "Nuestra Historia",
  SUBTITLE: "Han sido 60 años de hechos maravillosos, 60 años de milagros, 60 años de una fe robusta y 60 años llenos de esperanza, anhelando el advenimiento de nuestro señor Jesucristo.",
  DESCRIPTION:
    "La Iglesia Adventista del Séptimo Día en la región Norte de Bucaramanga ha sido un faro de esperanza y servicio durante años. Desde nuestros humildes comienzos, hemos crecido como una familia de fe comprometida con llevar el amor de Cristo a nuestra comunidad.",
  HIGHLIGHT:
    "Hoy somos una red de congregaciones vibrantes que trabajan unidas para transformar vidas a través de la educación, la salud, y el ministerio espiritual.",
} as const;

/**
 * Rutas y URLs
 */
export const ABOUT_LINKS = {
  JOIN_US_HREF: "/#/#Contactanos",
  HERO_BUTTON_HREF: "#nosotros",
} as const;

/**
 * Imágenes y multimedia
 */
export const ABOUT_MEDIA = {
  HERO_BACKGROUND:
    "https://oidyved.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-10-at-5.50.05-AM.png.webp",
} as const;

/**
 * Creencias fundamentales de la Iglesia Adventista
 */
export const CHURCH_BELIEFS = [
  {
    ICON: "book-open",
    TITLE: "Las Escrituras",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg/1200px-Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg",
    DESCRIPTION:
      "La Biblia, compuesta por el Antiguo y el Nuevo Testamento, es la palabra inspirada de Dios y la única regla infalible de fe y práctica.",
  },
  {
    ICON: "cross",
    TITLE: "La Trinidad:",
    img: "https://www.recursos-biblicos.com/wp-content/uploads/2017/03/La-Trinidad-en-la-Biblia-Estudio.png",
    DESCRIPTION:
      "Existe un solo Dios: Padre, Hijo y Espíritu Santo, una unidad de tres personas coeternas.",
  },
  {
    ICON: "heart",
    TITLE: "Dios Padre",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKJfGwOcYQBkLJnXBYLG1AGCs_U30BmD7nw&s",
    DESCRIPTION:
      "Es el Creador, fuente, sustentador y soberano de toda la creación",
  },
  {
    ICON: "sun",
    TITLE: "Dios Hijo",
    img: "https://periodico-sagrada-familia-diocesis-quintana-roo.com/wp-content/uploads/2021/03/jesus.jpg",
    DESCRIPTION:
      "Jesucristo es eternamente Dios. Se encarnó para redimir a la humanidad mediante su vida sin pecado, muerte sacrificial y resurrección.",
  },
  {
    ICON: "users",
    TITLE: "Dios Espíritu Santo",
    img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGYwD9epGCFfohHLuJt_haZgx5cdrNgakKsGvu5kH7507i88nd2QWW7KHxCWIb_wnOPc0XzmYh-rvbFRdecQvg8zMOp0ZtokDt5gGd98BhMcRC1OIr3bldgpTmpAQxgsa7u9SEsDb_pcU/s1600/1.jpg",
    DESCRIPTION:
      "SActúa en la regeneración y santificación del creyente. Es siempre presente para guiar, consolar e instruir.",
  },
  {
    ICON: "leaf",
    TITLE: "La Creacion",
    img: "https://www.nuevotiempo.cl/wp-content/uploads/2023/02/el-sabado-de-la-creacion.jpg",
    DESCRIPTION:
      "Dios creó el universo en seis días literales recientes, culminando con el descanso sabático en el séptimo día.",
  },
  {
    ICON: "globe",
    TITLE: "La Naturaleza del Hombre",
    img: "https://files.adventistas.org/noticias/es/2020/01/24111545/fundamentos-biblicos-do-sabado-do-setimo-dia.jpg",
    DESCRIPTION:
      "Los seres humanos fueron creados a imagen de Dios con individualidad, poder y libertad para pensar y actuar.",
  },
  {
    ICON: "sparkles",
    TITLE: "El Gran Conflicto",
    img: "https://cdn.slidesharecdn.com/ss_thumbnails/02elgranconflicto-161202143907-thumbnail.jpg?width=640&height=640&fit=bounds",
    DESCRIPTION:
      "La humanidad está involucrada en un conflicto cósmico entre Cristo y Satanás sobre el carácter de Dios, Su ley y Su soberanía sobre el universo.",
  },

  {
    ICON: "sparkles",
    TITLE: "Vida, Muerte y Resurrección de Cristo",
    img: "https://files.adventistas.org/noticias/es/2019/04/19093143/morte-ressurreicao-de-cristo-e-fake-news22.jpg",
    DESCRIPTION:
      "Mediante su vida perfecta y obediencia a la voluntad de Dios, Jesucristo logró nuestra salvación eterna.",
  },
  {
    ICON: "sparkles",
    TITLE: "La Experiencia de Salvación",
    img: "https://logoi.org/wp-content/uploads/2020/03/Salvacion_Legters.jpg",
    DESCRIPTION:
      "La salvación es por gracia mediante la fe en Cristo; incluye justificación, santificación y glorificación.",
  },
  {
    ICON: "sparkles",
    TITLE: "Crecimiento en Cristo",
    img: "https://image.isu.pub/250520194548-64964aaf199e06504729a99f3d95ed5d/jpg/page_1_social_preview.jpg",
    DESCRIPTION:
      "Vivir en Cristo implica crecer espiritualmente mediante el estudio bíblico, la oración y el testimonio.",
  },
  {
    ICON: "sparkles",
    TITLE: "La Iglesia",
    img: "https://files.adventistas.org/noticias/es/2021/10/12145707/el-informe-de-la-secretaria-bosqueja-los-desafios-y-extensas-bendiciones-de-la-iglesia-adventista1.jpg",
    DESCRIPTION:
      "La iglesia es una comunidad de creyentes que confiesan a Jesucristo como Señor y Salvador, unidos para adorar y proclamar el evangelio.",
  },
  {
    ICON: "sparkles",
    TITLE: "El Remanente y su Misión",
    img: "https://media4.egwwritings.org/covers/1762_r.jpg",
    DESCRIPTION:
      "Un pueblo identificado por guardar los mandamientos de Dios y tener el testimonio de Jesús, proclamando los mensajes angélicos al mundo.",
  },
  {
    ICON: "sparkles",
    TITLE: "Unidad en el Cuerpo de Cristo",
    img: "https://files.adventistas.org/noticias/es/2022/04/23144338/crencas-fundamentais-dos-adventistas-unidade-no-corpo-de-cristo.jpeg",
    DESCRIPTION:
      "Todos los creyentes son iguales en Cristo; no hay distinción de raza, cultura o nacionalidad.",
  },
  {
    ICON: "sparkles",
    TITLE: "El Bautismo",
    img: "https://files.adventistas.org/noticias/es/2018/07/19094622/o-batismo-pelos-mortos.jpg",
    DESCRIPTION:
      "El bautismo es un símbolo público de fe en Jesús que representa muerte al pecado y nuevo nacimiento en Cristo.",
  },
  {
    ICON: "sparkles",
    TITLE: "La Cena del Señor",
    img: "https://files.adventistas.org/noticias/es/2022/05/23144357/shutterstock_600525530.jpg",
    DESCRIPTION:
      "Participación simbólica en el cuerpo y la sangre de Jesús como recordatorio de su sacrificio redentor.",
  },
  {
    ICON: "sparkles",
    TITLE: "Dones y Ministerios Espirituales",
    img: "https://blog.orionstereo.org/content/images/2022/05/RoleHS.jpg",
    DESCRIPTION:
      "El Espíritu Santo concede dones a cada creyente para edificar la iglesia y servir a la humanidad.",
  },
  {
    ICON: "sparkles",
    TITLE: "El Don de Profecía",
    img: "https://files.adventistas.org/noticias/es/2019/02/08093311/Imagem13.jpg",
    DESCRIPTION:
      "Se manifiesta en el ministerio profético del pueblo adventista; Elena G. White es reconocida como mensajera del Señor.",
  },
  {
    ICON: "sparkles",
    TITLE: "La Ley de Dios",
    img: "https://image.slidesharecdn.com/19-laleydedios-100323220209-phpapp02/75/19-La-Ley-De-Dios-1-2048.jpg",
    DESCRIPTION:
      "Los Diez Mandamientos expresan la voluntad amorosa e inmutable de Dios para todos los tiempos.",
  },
  {
    ICON: "sparkles",
    TITLE: "El Sábado",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTarhYLPgIeTUfmnAh_XH1I0AUtRSZv5Gkw&s",
    DESCRIPTION:
      "El séptimo día es santo desde la creación; un tiempo especial para adoración y descanso espiritual.",
  },
  {
    ICON: "sparkles",
    TITLE: "Mayordomía Cristiana",
    img: "https://s3.amazonaws.com/gravitalsoftware/ucn_web/websites/resources/pictures/a235b506-168c-463c-9015-a062b96b63c0.jpg",
    DESCRIPTION:
      "Reconocemos que todo pertenece a Dios y somos llamados a administrar fielmente nuestro tiempo, talentos y recursos.",
  },
  {
    ICON: "sparkles",
    TITLE: "Conducta Cristiana",
    img: "https://files.adventistas.org/downloads_v2/es/2013/06/estudios24-principios-de-conducta-cristiana.jpg",
    DESCRIPTION:
      "Vivir conforme a principios bíblicos en salud, relaciones personales e integridad moral.",
  },
  {
    ICON: "sparkles",
    TITLE: "Matrimonio y Familia",
    img: "https://files.adventistas.org/pastor.adventistas.org/es/2018/05/shutterstock_183188573-800x500.jpg",
    DESCRIPTION:
      "Institución divina basada en amor mutuo; fundamento esencial para el desarrollo espiritual.",
  },
  {
    ICON: "sparkles",
    TITLE: "Ministerio de Cristo en el Santuario Celestial",
    img: "https://files.adventistas.org/pastor.adventistas.org/es/2014/11/Jesus-santu%C3%A1rio.jpg",
    DESCRIPTION:
      "Cristo intercede continuamente por nosotros ante el Padre desde su ascensión hasta su regreso glorioso.",
  },
  {
    ICON: "sparkles",
    TITLE: "La Segunda Venida de Cristo",
    img: "https://files.adventistas.org/noticias/es/2016/12/14084808/falta-pouco-ainda-que-falte-muito.jpg",
    DESCRIPTION:
      "Esperanza bienaventurada del regreso visible y personal de Cristo para llevarnos al hogar eterno.",
  },
  {
    ICON: "sparkles",
    TITLE: "Muerte y Resurrección del Hombre",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJv6BcntGgq-11SYtGSOj3rNxfVi_7enAqSQ&s",
    DESCRIPTION:
      "La muerte es un estado de inconsciencia para todos los seres humanos. Los adventistas creen que los muertos permanecen en sus tumbas hasta la resurrección final. En la segunda venida de Cristo, los justos serán resucitados para la vida eterna, mientras que los impíos enfrentarán su juicio después del milenio.",
  },
  {
    ICON: "sparkles",
    TITLE: "El Milenio y el Fin del Pecado",
    img: "https://image.slidesharecdn.com/27-elmilenioyelfindelpecado-100323220240-phpapp01/75/27-El-Milenio-Y-El-Fin-Del-Pecado-1-2048.jpg",
    DESCRIPTION:
      "El milenio es el reinado de mil años de Cristo con sus santos en el cielo entre la primera y la segunda resurrección. Durante este tiempo, los impíos muertos serán juzgados; la Tierra estará desolada, sin habitantes humanos vivos, pero ocupada por Satanás y sus ángeles. Al final del milenio, Cristo y sus santos regresarán a la Tierra; los impíos resucitarán para enfrentar el juicio final.",
  },
  {
    ICON: "sparkles",
    TITLE: "Nueva Tierra",
    img: "https://28estudiosadventistas.wordpress.com/wp-content/uploads/2018/06/new-jerusalem-heaven.jpg?w=800&h=510&crop=1",
    DESCRIPTION:
      "Dios creará una nueva Tierra donde habitará la justicia. En esta nueva creación, no habrá más pecado ni muerte. Los redimidos vivirán en paz y adoración eterna a Dios en un entorno perfecto y armonioso.",
  },
] as const;


/**
 * Textos para la sección de Creencias
 */
export const BELIEFS_SECTION_TEXTS = {
  SECTION_TITLE: "28 Creencias Fundamentales",
  SECTION_SUBTITLE:
    "Como iglesia adventista del séptimo día, nuestra fe se basa en la Biblia y se resume en 28 principios fundamentales. Aquí presentamos algunos pilares de nuestra identidad cristiana y esperanza.",
  CTA_TITLE: "¿Quieres profundizar?",
  CTA_DESCRIPTION:
    "Te invitamos a conocer los 28 Principios Fundamentales de la fe adventista, un resumen fiel de lo que creemos según las Escrituras.",
  CTA_BUTTON_TEXT: "Leer los 28 Principios",
  CTA_LINK: "https://www.adventistas.org/es/creencias/",
} as const;

export const BELIEF_SECTION_IDS = {
  HERO: "hero__creencias",
  CONTENT: "creencias",
} as const;