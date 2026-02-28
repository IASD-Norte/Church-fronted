import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/shared/lib/utils";
import { CHURCH_HISTORY } from "../constants/aboutConfig";


export function HistorySection() {
  // Mapeamos tus eventos al formato de la Timeline de Aceternity
  const timelineData = [
    {
      title: "Desde 1924",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Primeros Pasos en Bucaramanga</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Desde 1924 comenzó la evangelización adventista en Bucaramanga, lo que llevó al crecimiento de la iglesia. Se mencionan los 12 primeros miembros bautizados de la iglesia Norte como parte fundamental de su historia.
          </p>
        </div>
      ),
    },
    {
      title: "De 1962 hasta 1970",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">El Legado de la Carrera 20</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Bajo la dirección del Pr. Campo Elías Durán (1962-1970), la iglesia creció exponencialmente y construyó su sede actual en la Carrera 20. Con un aporte simbólico de $1.000 por familia y el esfuerzo unido de apellidos fundadores como los Gamboa y los Jaimes, se consolidó el templo que hoy celebra seis décadas de fe y servicio.
          </p>
        </div>
      ),
    },
    {
      title: "De 1971 hasta 1982",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Expansión y Conquista: El Impulso Misionero</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Entre 1971 y 1982, la iglesia fortaleció su alcance misionero bajo la guía de pastores como Fidel Merchán y Jaime Suárez. Este periodo fue clave para la evangelización rural, logrando fundar congregaciones en Rionegro, Lebrija y Tona que hoy son comunidades establecidas, tales como Montevideo y Vijagual.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="h-40 w-full lg:w-[70%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/1.jpeg" className="w-full h-full object-cover" alt="Historia 1" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "De 1984 hasta 1990",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Estructura y Liderazgo: La Consolidación de la Iglesia</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Entre 1984 y 1990, la iglesia se enfocó en la consolidación interna y legal. Liderada por pastores como Daniel Mora y Guillermo Campos, se organizaron formalmente los departamentos y la Escuela Sabática, logrando además una formación sólida de líderes que profesionalizaron y fortalecieron la estructura de la comunidad.
          </p>
        </div>
      ),
    },
    {
      title: "En el año 1986",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Modernización y Armonía: Renovando la Casa de Dios</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            En 1986, la iglesia modernizó sus instalaciones (bancas, techo y ventilación), permitiendo recibir eventos internacionales como el Congreso Colombo Venezolano. Paralelamente, nació el coro institucional dirigido por el Prof. Juan Alberto Díaz, fusionando el talento musical con la visión misionera de la congregación.
          </p>
          <div className="flex flex-wrap gap-4 w-full mt-6">
            <div className="h-32 md:h-40 w-[30%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/2.jpeg" className="w-full h-full object-cover" alt="Historia 2" />
            </div>
            <div className="h-32 md:h-40 w-[30%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/3.jpeg" className="w-full h-full object-cover" alt="Historia 3" />
            </div>
            <div className="h-32 md:h-40 w-[30%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/4.jpeg" className="w-full h-full object-cover" alt="Historia 4" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "De 1991 hasta 2002",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Visión al Futuro: Infraestructura y Educación</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Entre 1991 y 2002, la iglesia se enfocó en el crecimiento arquitectónico con miras a la educación. Se construyó un edificio de tres pisos destinado a oficinas, clubes y futuras aulas para el Colegio Adventista Libertad. Esta obra fue liderada por una comisión especial de hermanos y pastores, consolidando el equipamiento total de la planta física.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="h-40 w-[45%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/5.jpeg" className="w-full h-full object-cover" alt="Historia 5" />
            </div>
            <div className="h-40 w-[45%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/7.jpeg" className="w-full h-full object-cover" alt="Historia 7" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Del año 2002 hasta el año 2010",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Transformación y Altruismo: Una Nueva Visión</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            De 2002 a 2010, la iglesia adoptó una identidad más social y altruista. Durante esta gestión, se modernizó la infraestructura operativa con una nueva oficina pastoral y se dio un impulso histórico a la música con la actualización del equipo de sonido y la llegada del piano en 2005, renovando así la experiencia de adoración.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="h-40 w-[30%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/8.jpeg" className="w-full h-full object-cover" alt="Historia 8" />
            </div>
            <div className="h-40 w-[45%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/6.jpeg" className="w-full h-full object-cover" alt="Historia 6" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Del año 2010 al 2018",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Educación y Expansión: El Sueño del Colegio Libertad</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Entre 2010 y 2018, la iglesia consolidó su proyecto educativo con el Colegio Libertad, pasando de 80 a 350 estudiantes. Este periodo también destacó por la expansión misionera con la creación de la iglesia Maranatha y mejoras físicas significativas en la fachada y áreas externas del templo.
          </p>
        </div>
      ),
    },
    {
      title: "En el año 2019 hasta hoy",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-2xl md:text-3xl text-primary dark:text-zinc-100 leading-tight">Proezas de Dios y Semillero de Líderes</h4>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
            Desde 2019, liderada por el Pr. Ortega, la iglesia modernizó sus áreas administrativas y tecnológicas (audiovisuales y oficinas). Además de su labor material, se destaca su legado como cuna de pastores y líderes internacionales, cerrando este ciclo de 60 años con gratitud por la fidelidad de Dios y la esperanza del pronto regreso de Jesús.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="h-40 w-[45%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/10.webp" className="w-full h-full object-cover" alt="Historia 10" />
            </div>
            <div className="h-40 w-[45%] bg-[#fcf9f4] border border-border/50 dark:bg-zinc-900 rounded-sm overflow-hidden shadow-sm">
              <img src="images/history/11.webp" className="w-full h-full object-cover" alt="Historia 11" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="historySection" className="w-full bg-background py-16">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-6 lg:px-16 w-full text-center pb-15 lg:text-left items-center lg:items-start lg:justify-between mb-8">
        <div className="flex flex-col gap-6 w-full lg:w-auto items-center lg:items-start">
          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-[56px] font-serif",
              "text-primary dark:text-zinc-100"
            )}
          >
            {CHURCH_HISTORY.TITLE}
          </h2>
          <div className="w-24 h-[1px] bg-[#dfa83d] rounded-full" />
        </div>

        <p className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed mt-2">
          {CHURCH_HISTORY.SUBTITLE}
        </p>
      </div>

      <div className="px-6 lg:px-16 max-w-7xl mx-auto">
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}