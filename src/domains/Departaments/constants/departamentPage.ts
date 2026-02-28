import type { Department, DepartmentSlug } from '../types/types';

export const departmentData: Record<DepartmentSlug, Department> = {
  mayordomia: {
    title: "Departamento de Mayordomía",
    description: "El Ministerio de Mayordomía,  fue organizado para ayudar a los miembros a ser mayordomos eficientes y asistir en la implementación del plan divino de la benevolencia sistemática a través de la iglesia. Puesto que la responsabilidad del mayordomo incluye la correcta administración de todos",
    imageVertical: "https://i.pinimg.com/736x/83/60/04/83600435768fad992d5e45e17d2ddfd5.jpg", // placeholder
    imageHorizontal: "https://i.ytimg.com/vi/kKKY9OHGFT0/maxresdefault.jpg", // placeholder
    sections: [
      {
        heading: "Sobre Nosotros",
        content: "La mayordomía adventista va más allá del dinero: es una respuesta de gratitud a Dios por todo lo que Él nos ha dado —tiempo, talentos, recursos y la vida misma.",
        scripture: "“Del Señor es la tierra y su plenitud; el mundo, y los que en él habitan.” — Salmo 24:1"
      },
      {
        heading: "Principios Clave",
        content: "Diezmos, ofrendas, uso sabio de los recursos, y el principio de que “todo pertenece a Dios”.",
        items: ["Devolver el diezmo fiel", "Ofrendas voluntarias", "Administración responsable"]
      }
    ]
  },
  diaconos: {
    title: "Diáconos y Diaconisas",
    description: "Jesús nos ofrece una visión de la naturaleza de la iglesia cuando usa el símbolo del cuerpo humano en 1 Corintios 12. Cuando nos unimos a la iglesia, llegamos a ser “miembros” del cuerpo de Cristo, y dotados por el Espíritu Santo para desempeñar funciones específicas. Dios desea que las varias partes del cuerpo (los miembros) logren cumplir con efectividad una de las metas principales de la iglesia; hacer discípulos para el Señor.",
    imageVertical: "https://imgv2-1-f.scribdassets.com/img/document/499848691/original/c8e0908f66/1?v=1",
    imageHorizontal: "https://chandlerspanishaz.adventistchurch.org/build/image/264.jpg?w=1024&h=1024&fit=max&s=4528fed0c78c8b5d7bcb147663eb803c",
    sections: [
      {
        heading: "Sobre Nosotros",
        content: "Las diaconisas desempeñan un papel muy importante y complementario al de los diáconos. Ellas están involucradas en diversas actividades de servicio dentro de la iglesia, que incluyen el cuidado y preparación para la Santa Cena, la organización de eventos especiales y la atención a las necesidades de los miembros, especialmente de las mujeres y niños.",
        items: [
          "Visitas a enfermos",
          "Apoyo emocional y espiritual",
          "Cuidado durante la Santa Cena",
          "Colaboración en programas comunitarios"
        ]
      }
    ]
  },
  conquistadores: {
    title: "Club de Conquistadores",
    description: "El Club de Conquistadores, es un departamento de la Iglesia Adventista del Séptimo Día, que trabaja específicamente con la educación cultural, social y religiosa de niños y adolescentes ubicados en el grupo de edad entre 10 y 15 años.​​​",
    imageVertical: "https://i.pinimg.com/originals/ba/7e/36/ba7e365d59464bca818b45245c7e84c6.jpg",
    imageHorizontal: "https://image.slidesharecdn.com/organigramayestructura-230302200428-1669f8ad/75/Organigrama-y-Estructura-del-club-de-conquistadores-pdf-1-2048.jpg",
    sections: [
      {
        heading: "Sobre Nosotros",
        content: "Los Conquistadores son niños y niñas que oscilan entre los 10 y 15 años, y no hace acepción de personas por su condición social, color o religión. Se reúnen una vez por semana con el fin de desarrollar talentos, habilidades, percepciones y el gusto por la naturaleza.",
        items: [
          "Actividades al aire libre",
          "Supervivencia y campismo",
          "Artes manuales",
          "Trabajo en equipo"
        ]
      },
      {
        heading: "Reuniones",
        content: "Domingos de 10:30 a 13:00 horas"
      }
    ]
  },
  "ministerios-personales": {
    title: "Ministerios Personales",
    description: "La misión del Ministerio Personal es proveer recursos y capacitar a los miembros de la iglesia para unir sus esfuerzos con los ministros y oficiales de la iglesia en la proclamación final del evangelio de salvación en Cristo. El objetivo del departamento es involucrar a cada miembro en el servicio activo de ganar almas para Dios.",
    imageVertical: "https://richwoodspanishtx.adventistchurch.org/build/image/220.jpg?or=360&crop=%2C%2C%2C&w=480&h=480&s=ade4d574d787d98d2fca9d946d924f11",
    imageHorizontal: "https://i0.wp.com/adventistasloscreadores.com/wp-content/uploads/2023/11/Min-Personal.png",
    sections: [
      {
        heading: "Misión",
        content: "Capacitar a cada miembro de la iglesia para compartir su fe de manera personal, amable y efectiva, siguiendo el ejemplo de Jesús.",
        items: [
          "Estudios bíblicos personales",
          "Evangelismo en el vecindario",
          "Capacitación en discipulado",
          "Seguimiento a nuevos creyentes"
        ]
      }
    ]
  },
  comunicaciones: {
    title: "Departamento de Comunicaciones",
    description: "El Departamento de Comunicación de la Unión Colombiana del Sur actúa como facilitador para la administración y todos los departamentos de la iglesia en su labor de testificación ante la comunidad, ayudando a transmitir su mensaje de esperanza al mundo.",
    imageVertical: "https://imgv2-1-f.scribdassets.com/img/document/444833391/original/61cb2a216c/1?v=1",
    imageHorizontal: "/images/comunicaciones/image.jpeg",
    sections: [
      {
        heading: "Propósito",
        content: "Gestionar los canales de comunicación de la iglesia (redes sociales, boletines, sitio web) para fortalecer la comunidad y proclamar el mensaje adventista.",
        items: [
          "Gestión de redes sociales",
          "Diseño gráfico institucional",
          "Fotografía y video de eventos",
          "Boletines informativos"
        ]
      }
    ]
  },
  "escuela-sabatica": {
    title: "Escuela Sabática",
    description: "Una de las mejores maneras de estudiar la Biblia y encontrar libertad, sanidad y esperanza en Jesús es interactuar con grupos pequeños de personas que también están profundizando su conocimiento bíblico. El departamento de Escuela Sabática y Ministerios Personales ofrece guías y materiales de estudio bíblico para grupos pequeños que se reúnen los sábados por la mañana y otros días de la semana para estudiar. ",
    imageVertical: "https://imgv2-1-f.scribdassets.com/img/document/379967756/original/d001238f4e/1?v=1",
    imageHorizontal: "https://i.ytimg.com/vi/bvY5dFGPIeE/maxresdefault.jpg",
    sections: [
      {
        heading: "Visión",
        content: "Fomentar el estudio bíblico comunitario como medio para crecer en la fe, la amistad y el servicio.",
        items: [
          "Clases por grupos de edad",
          "Programas especiales sabáticos",
          "Participación en ofrendas misioneras",
          "Formación de maestros"
        ]
      }
    ]
  },
  jovenes: {
    title: "Ministerio de Jóvenes",
    description: "Empoderar a los jóvenes adventistas para que proclamen el mensaje fundamental al mundo a través de proyectos y acciones que los involucren activamente en la misión de la iglesia.",
    imageVertical: "https://imgv2-1-f.scribdassets.com/img/document/719759648/original/34faec57f9/1?v=1",
    imageHorizontal: "https://s3.amazonaws.com/gravitalsoftware/ucn_web/instances/deparment/eb808eca-de13-4182-b339-896c545875a7.jpg",
    sections: [
      {
        heading: "Enfoque",
        content: "Crear un espacio donde los jóvenes encuentren identidad, propósito y comunidad en Cristo.",
        items: [
          "Retiros y congresos",
          "Servicio comunitario",
          "Discipulado grupal",
          "Actividades recreativas con propósito"
        ]
      }
    ]
  },
  universitarios: {
    title: "Ministerio Universitario",
    description: "Después de terminar la escuela secundaria, muchos jóvenes abandonan su hogar para seguir estudios superiores. Algunos de ellos tienen dificultades para encontrar y adaptarse a una nueva iglesia mientras sus padres están a muchos kilómetros de distancia. La falta de presencia y orientación de los padres, así como la falta de apoyo de sus comunidades religiosas, hace que los jóvenes tomen más decisiones por tu cuenta.",
    imageVertical: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWzrglZxGvaXTY5qvYI51GYYcGHmZ0rTIUIQ&s",
    imageHorizontal: "https://i.ytimg.com/vi/UZ7lQjlenBs/maxresdefault.jpg",
    sections: [
      {
        heading: "Objetivo",
        content: "Apoyar a los estudiantes adventistas en su vida académica y espiritual, conectándolos con una comunidad de fe.",
        items: [
          "Grupos de estudio bíblico en campus",
          "Orientación vocacional desde la fe",
          "Eventos interuniversitarios",
          "Apoyo en desafíos espirituales"
        ]
      }
    ]
  },
  educacion: {
    title: "Departamento de Educación",
    description: "La red de Educación Adventista forma parte de la Iglesia Adventista del Séptimo Día. Estamos presentes en más de 165 países, alcanzando a más de 2 millones de familias. En Sudamérica contamos con más de 750 instituciones educativas en todos los niveles, más de 415 mil estudiantes matriculados y el 100% de nuestros docentes comprometidos con una educación de calidad.",
    imageVertical: "https://pbs.twimg.com/media/F02rPulWAA41rfx.jpg",
    imageHorizontal: "https://i.ytimg.com/vi/4eij-RsAmQk/maxresdefault.jpg",
    sections: [
      {
        heading: "Compromiso",
        content: "Promover una visión adventista de la educación que integre fe, aprendizaje y servicio.",
        items: [
          "Apoyo a escuelas adventistas",
          "Cursos para padres y maestros",
          "Recursos pedagógicos cristianos",
          "Fomento de la lectura bíblica"
        ]
      }
    ]
  },
  familia: {
    title: "Ministerio de la Familia",
    description: "Es un ministerio que brinda herramientas para ayudar a las personas a comunicarse de forma más eficaz, profundizar su compromiso matrimonial y ayudarles a ser mejores padres. Ministerios de Familia ayuda a las familias a crecer en amor y a vivir en armonía como la familia de Dios.",
    imageVertical: "https://assets.isu.pub/document-structure/230704231754-380faca68a774ddf2f11a8d40abcf372/v1/477869b5b965e54178323e49e9861b5d.jpeg",
    imageHorizontal: "https://i.ytimg.com/vi/Ljsvv66QOnw/maxresdefault.jpg",
    sections: [
      {
        heading: "Misión",
        content: "Equipar a las familias adventistas para vivir en armonía, amor y fidelidad a los principios bíblicos.",
        items: [
          "Cursos prematrimoniales",
          "Talleres para padres",
          "Dinámicas de reconciliación",
          "Recursos para el culto familiar"
        ]
      }
    ]
  },
  salud: {
    title: "Ministerio de Salud",
    description: "Desde sus inicios, la Iglesia Adventista del Séptimo Día ha promovido el cuidado de la salud y ha mantenido un sistema de instituciones médicas y hospitalares, además de aconsejar un estilo de vida que garantice la prevención de enfermedades.",
    imageVertical: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB_A_EAIgSKmzyhQioajWkD1VZSOSOSWEbw&s",
    imageHorizontal: "https://files.adventistas.org/institucional/es/sites/19/2019/12/capa-letras_vida.png",
    sections: [
      {
        heading: "Visión Holística",
        content: "Promover un estilo de vida saludable basado en los 8 remedios naturales y los principios bíblicos.",
        items: [
          "Charlas sobre nutrición",
          "Programas de ejercicio",
          "Talleres de salud mental",
          "Campañas contra adicciones"
        ]
      }
    ]
  },
  dorcas: {
    title: "Ministerio Dorcas",
    description: "El departamento de Dorcas adventista es un ministerio de mujeres que, inspirado en el ejemplo bíblico de Tabita (Hechos 9), se dedica a servir a la comunidad mediante actos prácticos de amor y compasión. Sus actividades principales incluyen ayudar a los pobres y necesitados con ropa y alimentos, visitar enfermos, ofrecer cursos de capacitación (como cocina o costura) y apoyar eventos de la iglesia.",
    imageVertical: "https://imgv2-2-f.scribdassets.com/img/document/635027407/original/6bc247757b/1?v=1",
    imageHorizontal: "https://i.ytimg.com/vi/Y6RKBplTskE/maxresdefault.jpg",
    sections: [
      {
        heading: "Herencia Bíblica",
        content: "Inspirado en Dorcas (Hechos 9:36), este ministerio realiza obras de misericordia: confección de ropa, mantas, y apoyo a necesitados.",
        items: [
          "Confección de prendas para el invierno",
          "Visitas a hogares vulnerables",
          "Apoyo en emergencias",
          "Capacitación en costura y manualidades"
        ]
      }
    ]
  },
  tesoreria: {
    title: "Tesorería de Iglesia",
    description: "El departamento de tesorería de la Iglesia Adventista se encarga de la administración financiera, la contabilidad y la supervisión de los recursos, incluyendo la gestión de diezmos y ofrendas, la elaboración de presupuestos y el cumplimiento de regulaciones. A nivel global, ha desarrollado sistemas de software como SunPlus para mejorar la transparencia y eficiencia en el manejo de las finanzas de la iglesia, mientras que a nivel local, los tesoreros se encargan de los registros personales de los miembros y de la emisión de recibos. ",
    imageVertical: "https://i.ytimg.com/vi/5zRplIDGvqA/maxresdefault.jpg",
    imageHorizontal: "https://i.ytimg.com/vi/k1MQrTSs0F0/maxresdefault.jpg",
    sections: [
      {
        heading: "Funciones",
        content: "Gestionar los recursos financieros de la iglesia, asegurando que se administren de acuerdo con los principios de la mayordomía cristiana.",
        items: [
          "Supervisión de ingresos y egresos",
          "Registro detallado de transacciones",
          "Remisión fiel del diezmo a la Asociación"
        ]
      },
      {
        heading: "Bases bíblicas",
        content: "“Traigan todo el diezmo a la tesorería, y haya alimento en mi casa.”",
        scripture: "Malaquías 3:10"
      }
    ]
  },
};