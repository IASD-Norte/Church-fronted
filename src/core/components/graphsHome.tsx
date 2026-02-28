import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function GraphHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [activeMembers, setActiveMembers] = useState(0);
  const [smallGroups, setSmallGroups] = useState(0);
  const [departments, setDepartments] = useState(0);
  const [youth, setYouth] = useState(0);

  const targetNumbers = {
    activeMembers: 300,
    smallGroups: 20,
    departments: 10,
    youth: 50,
  };

  const animateCount = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    target: number,
    duration = 1500
  ) => {
    let start = 0;
    const steps = duration / 16;
    const increment = target / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(counter);
      } else {
        setter(Math.floor(start));
      }
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => animateCount(setActiveMembers, targetNumbers.activeMembers), 100);
            setTimeout(() => animateCount(setSmallGroups, targetNumbers.smallGroups), 200);
            setTimeout(() => animateCount(setDepartments, targetNumbers.departments), 300);
            setTimeout(() => animateCount(setYouth, targetNumbers.youth), 400);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full bg-[#fcf9f4] dark:bg-black py-20 md:py-32 items-center justify-center"
    >
      {/* The Stats Section */}
      <div className="w-full max-w-7xl mx-auto px-6 mb-24 md:mb-36">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-6 lg:gap-14 w-full">
          <StatItem count={activeMembers} label="Miembros Activos" />
          <Divider />
          <StatItem count={smallGroups} label="Grupos Pequeños" />
          <Divider />
          <StatItem count={departments} label="Departamentos" />
          <Divider />
          <StatItem count={youth} label="Niños y Jóvenes" />
        </div>
      </div>

      {/* The Intro Section */}
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col block md:flex-row items-center gap-12 lg:gap-24">

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src="/images/mas/1.jpg"
            alt="Iglesia Adventista"
            className="w-full h-[400px] md:h-[550px] object-cover rounded-sm shadow-xl"
          />
          {/* Decorative small box at the bottom right */}
          <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-black text-white p-8 hidden sm:flex flex-col items-center justify-center">
            <p className="font-serif text-4xl mb-1">07</p>
            <p className="text-xs tracking-widest uppercase opacity-80 mt-1">Septimo Dia</p>
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#16302b]/60 dark:text-zinc-400">
              Nuestra Iglesia Norte
            </span>
            <div className="h-[1px] w-12 bg-[#16302b]/30 dark:bg-zinc-700" />
          </div>

          <h2 className="text-4xl lg:text-[46px] font-serif text-black dark:text-zinc-100 mb-8 leading-[1.1] tracking-tight">
            Elevando estándares de fe y servicio en la comunidad
          </h2>

          <p className="text-black/80 dark:text-zinc-300 md:text-lg leading-relaxed mb-6 font-medium">
            La Iglesia Adventista Norte de Bucaramanga te ofrece un espacio lleno de esperanza,
            estudio profundo de la palabra y un sentido real de pertenencia.
          </p>

          <blockquote className="border-l-2 border-black/30 dark:border-zinc-700 pl-6 mb-10 italic text-black/70 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            "El cuidado, la dedicación y el compromiso de cada uno de los miembros
            de nuestra comunidad son absolutamente maravillosos. Te invitamos a ser
            parte del cuerpo de Cristo con nosotros, donde cada miembro recibe su crecimiento
            para ir edificándose en amor."
          </blockquote>

          <Link
            to="/nosotros"
            className="group flex items-center gap-4 px-8 py-4 border border-black/40 dark:border-zinc-700 text-black dark:text-zinc-300 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all duration-300"
          >
            SOBRE NOSOTROS <span className="text-xl font-light transform group-hover:translate-x-1 transition-transform">→</span>
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
