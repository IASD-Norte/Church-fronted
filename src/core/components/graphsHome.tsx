import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  useContent,
  useContentReady,
  DEFAULT_INTRO,
  DEFAULT_STATS,
} from "@/features/content";

export default function GraphHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const stats = useContent("stats", DEFAULT_STATS);
  const intro = useContent("home_intro", DEFAULT_INTRO);
  const configReady = useContentReady();
  const [counts, setCounts] = useState<number[]>(() =>
    DEFAULT_STATS.items.map(() => 0),
  );

  useEffect(() => {
    setCounts(stats.items.map(() => 0));
    setHasAnimated(false);
  }, [stats]);

  const animateCount = (index: number, target: number, duration = 1500) => {
    let start = 0;
    const steps = duration / 16;
    const increment = target / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCounts((prev) => {
          const next = [...prev];
          next[index] = target;
          return next;
        });
        clearInterval(counter);
      } else {
        const value = Math.floor(start);
        setCounts((prev) => {
          const next = [...prev];
          next[index] = value;
          return next;
        });
      }
    }, 16);
  };

  useEffect(() => {
    if (!configReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            stats.items.forEach((item, i) => {
              setTimeout(() => animateCount(i, item.value), 100 + i * 100);
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    const node = containerRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasAnimated, configReady, stats]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full bg-[#fcf9f4] dark:bg-black py-20 md:py-32 items-center justify-center"
    >
      <div
        data-cms-section="stats"
        className="w-full max-w-7xl mx-auto px-6 mb-24 md:mb-36"
      >
        <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-y-12 gap-x-4 md:gap-6 lg:gap-14 w-full">
          {stats.items.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              className="contents"
              data-cms={`stats.items.${i}`}
              data-cms-type="list-item"
            >
              {i > 0 ? <Divider /> : null}
              <StatItem count={counts[i] ?? 0} label={item.label} />
            </div>
          ))}
        </div>
      </div>

      <div
        data-cms-section="home_intro"
        className="w-full max-w-6xl mx-auto px-6 flex flex-col block md:flex-row items-center gap-12 lg:gap-24"
      >
        <div className="w-full md:w-1/2 relative">
          <img
            src={intro.imageUrl}
            alt="Iglesia Adventista"
            data-cms="home_intro.imageUrl"
            data-cms-type="image"
            className="w-full h-[400px] md:h-[550px] object-cover rounded-sm shadow-xl"
          />
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-black text-white p-8 hidden sm:flex flex-col items-center justify-center">
            <p
              className="font-serif text-4xl mb-1"
              data-cms="home_intro.badgeNumber"
              data-cms-type="text"
            >
              {intro.badgeNumber}
            </p>
            <p
              className="text-xs tracking-widest uppercase opacity-80 mt-1"
              data-cms="home_intro.badgeLabel"
              data-cms-type="text"
            >
              {intro.badgeLabel}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#16302b]/60 dark:text-zinc-400"
              data-cms="home_intro.eyebrow"
              data-cms-type="text"
            >
              {intro.eyebrow}
            </span>
            <div className="h-[1px] w-12 bg-[#16302b]/30 dark:bg-zinc-700" />
          </div>

          <h2
            className="text-4xl lg:text-[46px] font-serif text-black dark:text-zinc-100 mb-8 leading-[1.1] tracking-tight"
            data-cms="home_intro.heading"
            data-cms-type="text"
          >
            {intro.heading}
          </h2>

          <p
            className="text-black/80 dark:text-zinc-300 md:text-lg leading-relaxed mb-6 font-medium"
            data-cms="home_intro.body"
            data-cms-type="textarea"
          >
            {intro.body}
          </p>

          <blockquote
            className="border-l-2 border-black/30 dark:border-zinc-700 pl-6 mb-10 italic text-black/70 dark:text-zinc-400 text-sm md:text-base leading-relaxed"
            data-cms="home_intro.quote"
            data-cms-type="textarea"
          >
            &quot;{intro.quote}&quot;
          </blockquote>

          <Link
            to="/nosotros"
            className="group flex items-center gap-4 px-8 py-4 border border-black/40 dark:border-zinc-700 text-black dark:text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300"
          >
            SOBRE NOSOTROS{" "}
            <span className="text-xl font-light transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatItem({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full md:w-auto">
      <h3 className="text-[80px] md:text-[90px] lg:text-[110px] font-serif text-black dark:text-zinc-100 mb-0 leading-none">
        {count}
      </h3>
      <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-black dark:text-zinc-400 font-semibold mt-6">
        {label}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden md:block w-12 lg:w-24 h-[1px] bg-[#16302b]/20 dark:bg-zinc-700" />
  );
}
