import { MousePointerClick } from "lucide-react";
import { ABOUT_LINKS, ABOUT_MEDIA, ABOUT_TEXTS } from "../constants/aboutConfig";

/**
 * Sección Hero de la página About
 */
export function AboutHeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-background mt-20">

      {/* Background Image full bleed */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${ABOUT_MEDIA.HERO_BACKGROUND}')`,
          }}
        />
        {/* Elegant Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col items-center text-center mt-10">

        {/* Top Mini Header / Decorative Elements */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase">
            {ABOUT_TEXTS.VISIT_US}
          </span>
          <div className="hidden md:block h-[1px] w-12 bg-[#dfa83d]/50" />
          <a
            href={ABOUT_LINKS.JOIN_US_HREF}
            className="flex items-center gap-2 group transition-transform text-xs tracking-[0.2em] uppercase hover:scale-105 text-[#dfa83d] font-semibold"
          >
            {ABOUT_TEXTS.JOIN_US}
            <MousePointerClick className="h-4 w-4 text-[#dfa83d] group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Main Title */}
        <div className="max-w-4xl mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-serif text-[#fcf9f4] leading-[1.05] tracking-tight drop-shadow-lg">
            {ABOUT_TEXTS.TITLE_1}
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-[60px] font-serif text-[#dfa83d] leading-[1.1] transform -rotate-1 mt-2">
            {ABOUT_TEXTS.TITLE_2}
          </h2>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-2 md:mb-12 lg:mb-12">
          <p className="text-[#fcf9f4]/90 text-sm md:text-lg leading-relaxed font-medium">
            {ABOUT_TEXTS.DESCRIPTION}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={ABOUT_LINKS.HERO_BUTTON_HREF}
          className="group flex flex-wrap items-center justify-center gap-3 px-6 py-4 mb-3 md:px-8 md:py-4 border border-[#fcf9f4]/40 text-[#fcf9f4] text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#fcf9f4] hover:text-black transition-all duration-300"
        >
          {ABOUT_TEXTS.HERO_BUTTON} <span className="text-base md:text-lg font-light transform group-hover:translate-x-1 transition-transform">→</span>
        </a>

      </div>

    </section>
  );
}