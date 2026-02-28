
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Seventh-day_Adventist_Church_logo_in_Spanish.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Emblema_del_Club_de_Conquistadores.svg/1971px-Emblema_del_Club_de_Conquistadores.svg.png",
  "https://www.guiasmayores.com/uploads/1/1/3/1/1131412/9251040_1_orig.png",
  "https://adra.org.nz/wp-content/uploads/2019/11/adra-vertical-logo.png",
  "https://www.guiasmayores.com/uploads/1/1/3/1/1131412/gm_globo.png",
];

interface BrandSliderProps {
  onVerseClick: () => void;
}

export function BrandSlider({ onVerseClick }: BrandSliderProps) {
  return (
    <div className="w-full bg-background dark:bg-background py-24 md:py-22 flex flex-col items-center justify-center px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Logos Container */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 mb-16">
          {logos.map((src, i) => (
            <img
              key={`logo-${i}`}
              src={src}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              alt="logo"
            />
          ))}
        </div>

        {/* Main Message */}
        <div className="text-center mb-16 max-w-5xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif text-[#16302b] dark:text-zinc-100 leading-[1.15] tracking-tight">
            Somos una iglesia unida en el propósito de restaurar y amar al prójimo mediante el mensaje de salvación.
          </h2>
        </div>

        {/* Bible Verse Button */}
        <button
          onClick={onVerseClick}
          className="group flex items-center gap-4 px-8 py-4 border border-[#16302b]/40 dark:border-zinc-700 text-[#16302b] dark:text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#16302b] hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300"
        >
          1 CORINTIOS 12:27 <span className="text-xl font-light transform group-hover:translate-x-1 transition-transform">→</span>
        </button>

      </div>
    </div>
  );
}
