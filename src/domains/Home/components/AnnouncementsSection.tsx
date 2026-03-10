import AnimatedTestimonialsDemo from "@/core/components/anuncios";
import { cn } from "@/shared/lib/utils";
import { HOME_SECTION_IDS, HOME_TEXTS } from "../constants/homeConfig";

export function AnnouncementsSection() {
  return (
    <section
      id={HOME_SECTION_IDS.ANNOUNCEMENTS}
      className="panel flex flex-col bg-background w-full min-h-screen py-20 px-6 lg:px-16 items-center gap-12"
    >
      {/* Header mejorado */}
      <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
        <div className="flex items-center gap-3 justify-center">
          <h1 className={cn(
            "text-foreground font-bold text-5xl lg:text-6xl",
            "tracking-tight"
          )}>
            {HOME_TEXTS.ANNOUNCEMENTS_TITLE}
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Mantente al día con nuestros próximos eventos y actividades especiales
        </p>
      </div>

      {/* Componente de anuncios */}
      <div className="w-full max-w-7xl">
        <AnimatedTestimonialsDemo />
      </div>
    </section>
  );
}

