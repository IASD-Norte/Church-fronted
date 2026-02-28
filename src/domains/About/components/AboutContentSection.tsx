import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ABOUT_SECTION_IDS, ABOUT_TEXTS } from "../constants/aboutConfig";
import { HistorySection } from "./HistorySection";
import { MissionVisionSection } from "./MissionVisionSection";
import { BeliefsSection } from "./BeliefsSection";
import { BrandSlider } from "./BrandSlider";
import { VerseSection } from "./VerseSection";

/**
 * Sección de contenido principal de la página About
 * Integra todas las subsecciones: Misión, Visión, Valores e Historia
 */
export function AboutContentSection() {
  const [showVerse, setShowVerse] = useState(false);

  return (
    <section
      id={ABOUT_SECTION_IDS.CONTENT}
      className={cn(
        "panel flex flex-col items-center",
        "w-full pb-20 px-4 md:px-8 lg:px-20",
        "bg-background"
      )}
    >

      <div className="pb-20 w-full">
        <BrandSlider onVerseClick={() => setShowVerse(true)} />
      </div>

      <div className={cn(
        "w-full transition-all duration-700 ease-in-out overflow-hidden origin-top",
        showVerse ? "max-h-[1000px] opacity-100 mb-16" : "max-h-0 opacity-0 mb-0"
      )}>
        <VerseSection />
      </div>

      {/* Header principal */}
      <div className="flex flex-col lg:flex-row gap-6 w-full m-16 text-center lg:text-left items-center lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6 w-full lg:w-auto items-center lg:items-start">
          <div className="flex ">
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-extrabold text-center lg:text-left",
              "text-foreground tracking-tight"
            )}>
              {ABOUT_TEXTS.CONTENT_TITLE}
            </h2>
          </div>
          <div className="w-24 h-1 bg-primary rounded-full" />
        </div>

        <p className="text-foreground text-lg md:text-lg max-w-lg leading-relaxed">
          {ABOUT_TEXTS.CONTENT_SUBTITLE}
        </p>
      </div>

      {/* Subsecciones */}
      <div className="w-full space-y-16">
        {/* Misión y Visión */}
        <MissionVisionSection />

        {/* Separador visual */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </div>

        <BeliefsSection />

        {/* Separador visual */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </div>


        <HistorySection />
      </div>


    </section>
  );
}

