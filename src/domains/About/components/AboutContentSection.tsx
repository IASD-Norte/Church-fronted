import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ABOUT_SECTION_IDS } from "../constants/aboutConfig";
import { HistorySection } from "./HistorySection";
import { MissionVisionSection } from "./MissionVisionSection";
import { BeliefsSection } from "./BeliefsSection";
import { BrandSlider } from "./BrandSlider";
import { VerseSection } from "./VerseSection";
import { useContent, DEFAULT_ABOUT_INTRO } from "@/features/content";

/**
 * Sección de contenido principal de la página About
 * Integra todas las subsecciones: Misión, Visión, Valores e Historia
 */
export function AboutContentSection() {
  const [showVerse, setShowVerse] = useState(false);
  const intro = useContent("about_intro", DEFAULT_ABOUT_INTRO);

  return (
    <section
      id={ABOUT_SECTION_IDS.CONTENT}
      data-cms-section="about_intro"
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
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto px-6 lg:px-16 text-center lg:text-left items-center lg:items-start lg:justify-between mb-8">
        <div className="flex flex-col gap-6 w-full lg:w-auto items-center lg:items-start">
          <div className="flex">
            <h2
              data-cms="about_intro.title"
              data-cms-type="text"
              className={cn(
              "text-4xl md:text-5xl lg:text-[56px] font-serif",
              "text-primary dark:text-zinc-100 tracking-tight leading-tight"
            )}>
              {intro.title}
            </h2>
          </div>
          <div className="w-24 h-[1px] bg-[#dfa83d] rounded-full" />
        </div>

        <p
          data-cms="about_intro.subtitle"
          data-cms-type="textarea"
          className="text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed mt-2"
        >
          {intro.subtitle}
        </p>
      </div>

      {/* Subsecciones */}
      <div className="w-full space-y-16">
        {/* Misión y Visión */}
        <MissionVisionSection />

        {/* Separador visual */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </div>

        <BeliefsSection />

        {/* Separador visual */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
        </div>


        <HistorySection />
      </div>


    </section>
  );
}

