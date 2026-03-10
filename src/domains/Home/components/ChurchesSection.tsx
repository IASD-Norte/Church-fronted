import { HOME_SECTION_IDS } from "../constants/homeConfig";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

type Church = {
  name: string;
  direccion: string;
  description?: string;
  images?: string[];
};

export function ChurchesSection() {
  const [churches, setChurches] = useState<Church[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/church.json")
      .then((res) => res.json())
      .then((json) => {
        // Filter those with images or assign a default one
        const valid = json.bga.filter((c: Church) => c.images && c.images.length > 0);
        setChurches(valid);
      })
      .catch((err) => console.error("Error cargando iglesias:", err));
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      id={HOME_SECTION_IDS.CHURCHES}
      className="w-full min-h-screen flex flex-col md:flex-row bg-background py-20"
    >
      {/* Left Panel */}
      <div className="w-full md:w-[30%] lg:w-[25%] h-auto md:h-full p-8 md:p-12 flex flex-col justify-between shrink-0 z-10 bg-background border-r border-[#16302b]/10 dark:border-zinc-800 relative shadow-[10px_0_20px_rgba(0,0,0,0.02)] dark:shadow-none">

        <div className="flex flex-col items-start pt-4 md:pt-10">
          <p className="font-['Brush_Script_MT',cursive,serif] italic text-3xl md:text-4xl text-primary mb-2 transform -rotate-2">
            Explora
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-primary dark:text-zinc-100 leading-tight tracking-tight mb-8 md:mb-12">
            Nuestros Grupos Pequeños
          </h2>

          <Link
            to="/grupos"
            className="group flex flex-wrap items-center gap-3 px-6 mb-3 py-3 border border-primary/40 dark:border-zinc-700 text-primary dark:text-zinc-300 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300"
          >
            Todos los grupos <span className="text-lg font-light transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Navigation Arrows (Hidden on very small mobile if needed, but keeping for slide control) */}
        <div className="hidden md:flex items-center gap-4 pb-4 md:pb-10 mt-12 md:mt-0">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-primary/40 dark:border-zinc-700 flex items-center justify-center text-primary dark:text-zinc-300 hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-primary/40 dark:border-zinc-700 flex items-center justify-center text-primary dark:text-zinc-300 hover:bg-primary hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Right Slider Panel */}
      <div
        ref={scrollRef}
        className="flex-1 h-[400px] md:h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {churches.map((church, idx) => (
          <div
            key={idx}
            className="h-full w-[85vw] sm:w-[50vw] md:w-[350px] lg:w-[420px] shrink-0 snap-start relative group cursor-pointer border-r border-primary/40 dark:border-zinc-800 overflow-hidden"
          >
            <img
              src={church.images![0]}
              alt={church.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Gradient Overlay bottom to top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-3 text-white/70 group-hover:text-white/100 transition-colors duration-500">
                <MapPin className="w-4 h-4" />
                <span className="text-xs tracking-widest uppercase font-semibold">{church.direccion}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                {church.name}
              </h3>
            </div>
          </div>
        ))}
        {/* Fill empty state just in case */}
        {churches.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-primary/50 font-medium">
            Cargando grupos...
          </div>
        )}
      </div>
    </section>
  );
}

