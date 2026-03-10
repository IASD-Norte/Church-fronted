import { Instagram } from "lucide-react";
import { RESOURCES_MEDIA, RESOURCES_SECTION_IDS, RESOURCES_TEXTS } from "../constants/resourcesConfig";
import Phone from "./Phone";

/**
 * Sección de Instagram
 * Muestra información sobre la cuenta de Instagram de la iglesia con una vista de phone
 */
export function InstagramSection() {
  return (
    <section
      id={RESOURCES_SECTION_IDS.INSTAGRAM}
      className="bg-background h-full lg:flex lg:items-center py-20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Media */}
          <div className="lg:col-span-5 flex justify-center xl:justify-start" data-card="about-media">
            <Phone />
          </div>

          {/* Texto */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left" data-card="about-text">
            <h3 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold leading-tight tracking-tight text-primary dark:text-zinc-100 mb-6" data-title="about">
              {RESOURCES_TEXTS.INSTAGRAM_TITLE}{" "}
              <span className="text-pink-600 dark:text-pink-500">{RESOURCES_TEXTS.INSTAGRAM_TITLE_HIGHLIGHT}</span>
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mb-10">
              <strong className="text-primary dark:text-zinc-100">{RESOURCES_TEXTS.INSTAGRAM_DESCRIPTION_START}</strong>
              {RESOURCES_TEXTS.INSTAGRAM_DESCRIPTION_MAIN}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href={RESOURCES_MEDIA.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-4 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm shadow-md"
                aria-label={RESOURCES_TEXTS.INSTAGRAM_BUTTON}
              >
                {RESOURCES_TEXTS.INSTAGRAM_BUTTON}
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
