import { Youtube } from "lucide-react";
import { RESOURCES_MEDIA, RESOURCES_SECTION_IDS, RESOURCES_TEXTS } from "../constants/resourcesConfig";

/**
 * Sección de YouTube
 * Muestra información sobre el canal de YouTube de la iglesia con un video embebido
 */
export function YouTubeSection() {
  return (
    <section
      id={RESOURCES_SECTION_IDS.YOUTUBE}
      className="min-h-screen flex items-center bg-background"
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center max-w-7xl px-6 lg:px-16 py-25 gap-12">
        {/* Texto principal */}
        <div
          className="flex-1 space-y-8 flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          data-card="home-text"
        >
          <div className="flex flex-col gap-6 w-full lg:w-auto items-center lg:items-start">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold leading-tight tracking-tight text-primary dark:text-zinc-100">
              {RESOURCES_TEXTS.YOUTUBE_TITLE}{" "}
              <span className="text-red-600 dark:text-red-500">{RESOURCES_TEXTS.YOUTUBE_TITLE_HIGHLIGHT}</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
            {RESOURCES_TEXTS.YOUTUBE_DESCRIPTION_START}{" "}
            <span className="font-semibold text-primary dark:text-zinc-100">
              {RESOURCES_TEXTS.YOUTUBE_DESCRIPTION_HIGHLIGHT}
            </span>{" "}
            {RESOURCES_TEXTS.YOUTUBE_DESCRIPTION_END}
          </p>
          <a
            href={RESOURCES_MEDIA.YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex justify-center items-center gap-4 bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm shadow-md"
          >
            <span>{RESOURCES_TEXTS.YOUTUBE_BUTTON}</span>
            <Youtube className="w-4 h-4" />
          </a>
        </div>

        {/* Video / Media */}
        <div
          className="flex-1 flex justify-center w-full h-full"
          data-card="home-media"
        >
          <div className="relative w-full max-w-2xl">
            <iframe
              className="rounded-sm shadow-xl border border-border/50 w-full aspect-video"
              src={RESOURCES_MEDIA.YOUTUBE_VIDEO_EMBED}
              title={RESOURCES_TEXTS.YOUTUBE_VIDEO_TITLE}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
